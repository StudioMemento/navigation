"""Package the exact public Services media referenced by the supplied catalog."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import Request, urlopen
import hashlib, json, re, shutil

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT.parents[1]
SOURCE = ROOT / 'source' / 'services'
if not SOURCE.exists():
    SOURCE = PROJECT / 'web' / 'services'
DEST = ROOT / 'public' / 'services'
ORIGIN = 'https://mementoservizi.vercel.app/'
source_dir = ROOT / 'source' / 'services'
source_dir.mkdir(parents=True, exist_ok=True)
for file in SOURCE.iterdir():
    if file.is_file():
        if file.resolve() != (source_dir / file.name).resolve():
            shutil.copy2(file, source_dir / file.name)

texts = '\n'.join(p.read_text(encoding='utf-8-sig') for p in SOURCE.iterdir()
                  if p.suffix in ('.html', '.js', '.css'))
assets = set(re.findall(r'assets/[A-Za-z0-9_./-]+\.(?:webp|png|jpg|jpeg|svg|woff2|mp4)', texts))
icons = {'caret-right', 'x'}
icons.update(re.findall(r"icon\(['\"]([a-z0-9-]+)['\"]", texts))
assets.update(f'assets/icons/{icon}.svg' for icon in icons)

def fetch(relative):
    target = DEST / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    url = ORIGIN + relative
    if target.exists():
        content = target.read_bytes()
        content_type = 'cached'
    else:
        with urlopen(Request(url, headers={'User-Agent': 'MementoTidePackaging/1.0'}), timeout=45) as response:
            content_type = response.headers.get('Content-Type', '')
            content = response.read()
        if content_type.startswith('text/html'):
            raise ValueError(f'HTML returned for media: {url}')
        target.write_bytes(content)
    return {'path': '/services/' + relative, 'source': url, 'bytes': len(content),
            'sha256': hashlib.sha256(content).hexdigest(), 'contentType': content_type}

rows = []
errors = []
with ThreadPoolExecutor(max_workers=6) as pool:
    futures = {pool.submit(fetch, relative): relative for relative in sorted(assets)}
    for future, relative in futures.items():
        try:
            rows.append(future.result())
        except Exception as error:
            errors.append({'path': relative, 'error': str(error)})
report = {'source': ORIGIN, 'date': '2026-10-28', 'method': 'Exact static asset references from supplied Services source; no recursive site crawl',
          'files': rows, 'errors': errors, 'totalBytes': sum(row['bytes'] for row in rows)}
(ROOT / 'reports' / 'services_media_manifest.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'files': len(rows), 'bytes': report['totalBytes'], 'errors': errors}))
if errors:
    raise SystemExit(1)
