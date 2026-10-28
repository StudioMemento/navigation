"""Install the bridge in a LOCAL page. Re-running is safe.
Usage: python integration/install-bridge.py --profile studio /repo/index.html
"""
from pathlib import Path
import argparse,html,re,shutil
p=argparse.ArgumentParser()
p.add_argument('--profile',choices=['studio','services','projects','levelup','start'],required=True)
p.add_argument('index',type=Path)
args=p.parse_args();file=args.index.resolve()
source=Path(__file__).resolve().parent.parent/'public/tide-child-bridge.js'
attrs={
 'studio':{'end-selector':'.nav-item[data-zone="3"][aria-current="page"]','reset-selector':'.nav-item[data-zone="0"]'},
 'projects':{'scroll-root':'#viewport'},
 'levelup':{'end-selector':'#pagination button:last-child[aria-current="true"]','reset-selector':'#pagination button:first-child','next-selector':'#pagination button[aria-current="true"] + button'},
 'start':{'block-selector':'#mm-compose:not([hidden])'},
}.get(args.profile,{})
text=file.read_text();backup=file.with_name(file.name+'.before-tide-v012')
if not backup.exists():shutil.copyfile(file,backup)
text=re.sub(r'<!-- MEMENTO_TIDE_BRIDGE_V\d+ -->.*?<!-- /MEMENTO_TIDE_BRIDGE_V\d+ -->\s*','',text,flags=re.S)
text=re.sub(r'<script\b[^>]*src=[\"\']/tide-child-bridge\.js[\"\'][^>]*>\s*</script>\s*','',text,flags=re.I)
if not re.search('</body>',text,re.I):raise SystemExit('Missing </body>')
tag='<script src="/tide-child-bridge.js" defer'+''.join(' data-tide-'+k+'="'+html.escape(v,quote=True)+'"' for k,v in attrs.items())+'></script>\n'
file.write_text(re.sub('</body>',lambda m:tag+m.group(),text,count=1,flags=re.I))
shutil.copyfile(source,file.parent/'tide-child-bridge.js')
print(file)
