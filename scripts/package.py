"""Create the frozen Vercel delivery and verify every archived member."""
from pathlib import Path
from hashlib import sha256
from zipfile import ZipFile, ZIP_DEFLATED
import argparse, json

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--output', type=Path, required=True)
args = parser.parse_args()
output = args.output.resolve()
if output.exists():
    raise SystemExit('Refusing to overwrite an existing frozen ZIP: ' + str(output))
allowed_dirs = {'public', 'source', 'scripts', 'licenses', 'reports'}
allowed_files = {'README.md', 'package.json', 'vercel.json', '.vercelignore'}
excluded_names = {'preview_server.json', 'package_report.json'}
files = []
for path in sorted(ROOT.rglob('*')):
    if path.is_symlink():
        raise SystemExit('Symlink not allowed: ' + str(path))
    if not path.is_file():
        continue
    relative = path.relative_to(ROOT)
    if relative.parts[0] not in allowed_dirs and str(relative) not in allowed_files:
        continue
    if any(part in {'__pycache__', 'node_modules', '.git', '.vercel'} for part in relative.parts):
        continue
    if path.suffix in {'.log', '.pyc', '.zip'} or path.name in excluded_names:
        continue
    files.append((path, relative.as_posix()))
manifest = {'project': 'MEMENTO_TIDE', 'package': 'VERCEL_v009', 'date': '2026-10-28',
            'deployRoot': '.', 'outputDirectory': 'public',
            'scope': 'Static landing, five page destinations, local Services catalog, family v007, world v008, browser routing v009',
            'files': []}
for path, relative in files:
    content = path.read_bytes()
    manifest['files'].append({'path': relative, 'bytes': len(content), 'sha256': sha256(content).hexdigest()})
manifest_bytes = (json.dumps(manifest, indent=2, ensure_ascii=False) + '\n').encode('utf-8')
output.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(output, 'x', compression=ZIP_DEFLATED, compresslevel=6) as archive:
    for (path, relative), row in zip(files, manifest['files']):
        content = path.read_bytes()
        if sha256(content).hexdigest() != row['sha256']:
            raise RuntimeError('File changed while packaging: ' + relative)
        archive.writestr(relative, content)
    archive.writestr('MANIFEST_VERCEL_V009.json', manifest_bytes)
with ZipFile(output) as archive:
    if archive.testzip() is not None:
        raise RuntimeError('CRC check failed')
    assert len(archive.namelist()) == len(files) + 1
    for row in manifest['files']:
        data = archive.read(row['path'])
        assert len(data) == row['bytes'] and sha256(data).hexdigest() == row['sha256'], row['path']
    assert archive.read('MANIFEST_VERCEL_V009.json') == manifest_bytes
report = {'archive': str(output), 'bytes': output.stat().st_size,
          'sha256': sha256(output.read_bytes()).hexdigest(), 'members': len(files) + 1,
          'manifestSha256': sha256(manifest_bytes).hexdigest(),
          'crc': 'PASS', 'allArchivedFileHashes': 'PASS',
          'publishedToVercel': False}
output.with_suffix('.manifest.json').write_bytes(manifest_bytes)
output.with_suffix('.report.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
(ROOT / 'reports' / 'package_report.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
print(json.dumps(report))
