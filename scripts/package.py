"""Create a deployment ZIP after npm test and npm run build."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import sys
root = Path(__file__).resolve().parent.parent
output = Path(sys.argv[1]).resolve() if len(sys.argv)>1 else root.parent/'MEMENTO_TIDE_VERCEL_v010.zip'
excluded = {'.openai', '.git', 'node_modules', '__qa__', '__pycache__'}
with ZipFile(output, 'w', ZIP_DEFLATED, compresslevel=6) as archive:
    for file in sorted(root.rglob('*')):
        relative = file.relative_to(root)
        if not file.is_file() or any(part in excluded for part in relative.parts):
            continue
        if file.suffix=='.zip' or file.name.startswith('qa-'):
            continue
        archive.write(file, relative.as_posix())
print(output)
print(f'{output.stat().st_size:,} bytes')
