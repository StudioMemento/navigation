"""Inline the tested end-of-page bridge into one or more LOCAL page sources.
Usage: python3 integration/install-bridge.py /path/to/services/index.html ...
Each original is preserved as index.html.before-tide-v011. Re-running is safe.
Redeploy each changed external page using its existing build/deploy workflow.
"""
from pathlib import Path
import re, sys
source=Path(__file__).resolve().parent.parent/'public/tide-child-bridge.js'
if len(sys.argv)<2:raise SystemExit('Pass the local index.html path for each external page.')
script=source.read_text()
block='<!-- MEMENTO_TIDE_BRIDGE_V011 -->\n<script>\n'+script+'\n</script>\n<!-- /MEMENTO_TIDE_BRIDGE_V011 -->\n'
for arg in sys.argv[1:]:
    file=Path(arg).resolve();html=file.read_text();backup=file.with_name(file.name+'.before-tide-v011')
    if not backup.exists():backup.write_text(html)
    html=re.sub(r'<!-- MEMENTO_TIDE_BRIDGE_V011 -->.*?<!-- /MEMENTO_TIDE_BRIDGE_V011 -->\n?', '',html,flags=re.S)
    if not re.search('</body>',html,re.I):raise SystemExit(f'Missing </body>: {file}')
    file.write_text(re.sub('</body>',lambda m:block+m.group(),html,count=1,flags=re.I));print(file)
