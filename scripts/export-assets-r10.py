#!/usr/bin/env python3
"""Export generated square masters to the existing responsive NAV filenames.

Only resizing and format compression are applied. Source PNG bytes remain intact.
Run: python3 scripts/export-assets-r10.py
"""
from hashlib import sha256
from io import BytesIO
from pathlib import Path
import json

from PIL import Image, __version__ as pillow_version

ROOT = Path(__file__).resolve().parents[1]
SLUGS = ("studio", "services", "projects", "levelup", "start")
MASTERS = (*SLUGS, "gallery-alternate")
SIZES = (96, 480, 960, 1254)
MAX_BYTES = 1_500_000


def digest(data):
    return sha256(data).hexdigest()


def main():
    sources, decoded = [], {}
    for name in MASTERS:
        path = ROOT / "art" / f"{name}.png"
        data = path.read_bytes()
        with Image.open(BytesIO(data)) as image:
            image.load()
            if image.format != "PNG" or image.width != image.height or image.width < 1024:
                raise ValueError(f"Master must be a square PNG >=1024px: {name}")
            sources.append({"name": name, "path": f"art/{name}.png", "width": image.width,
                            "height": image.height, "bytes": len(data), "sha256": digest(data)})
            decoded[name] = image.convert("RGB")

    pending, outputs = {}, []
    for name in SLUGS:
        for size in SIZES:
            image = decoded[name].resize((size, size), Image.Resampling.LANCZOS)
            output = BytesIO()
            image.save(output, format="WEBP", quality=85, method=6)
            relative = f"dist/assets/scenes/{name}-{size}.webp"
            data = output.getvalue()
            pending[relative] = data
            outputs.append({"source": name, "path": relative, "format": "WEBP", "width": size,
                            "height": size, "quality": 85, "bytes": len(data), "sha256": digest(data)})
        image = decoded[name].resize((1254, 1254), Image.Resampling.LANCZOS)
        output = BytesIO()
        image.save(output, format="JPEG", quality=88, subsampling=0, optimize=True, progressive=True)
        relative = f"dist/assets/scenes/{name}.jpg"
        data = output.getvalue()
        pending[relative] = data
        outputs.append({"source": name, "path": relative, "format": "JPEG", "width": 1254,
                        "height": 1254, "quality": 88, "bytes": len(data), "sha256": digest(data)})

    output_dir = ROOT / "dist/assets/scenes"
    expected_names = {Path(path).name for path in pending}
    extra_bytes = sum(path.stat().st_size for path in output_dir.iterdir()
                      if path.is_file() and path.name not in expected_names)
    scene_bytes = sum(len(data) for data in pending.values()) + extra_bytes
    if scene_bytes >= MAX_BYTES:
        raise ValueError(f"Scene budget exceeded before writing: {scene_bytes} >= {MAX_BYTES}")
    for relative, data in pending.items():
        (ROOT / relative).write_bytes(data)
    manifest = {"version": "R10", "generator": "built-in image_gen",
                "exporter": {"script": "scripts/export-assets-r10.py", "pillow": pillow_version,
                             "operations": ["LANCZOS resize", "WebP/JPEG compression"],
                             "webpQuality": 85, "jpegQuality": 88},
                "sources": sources, "outputs": outputs, "sceneBytes": scene_bytes,
                "sceneBudgetBytes": MAX_BYTES}
    (ROOT / "art/manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print("R10_ASSETS_EXPORTED", json.dumps({"masters": len(sources), "outputs": len(outputs),
                                              "sceneBytes": scene_bytes}))


if __name__ == "__main__":
    main()
