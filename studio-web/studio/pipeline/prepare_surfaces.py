"""Prepare display artwork and small de-lit material swatches from the owner's photographs."""
from pathlib import Path
import sys
import numpy as np
from PIL import Image, ImageFilter, ImageOps


def prepare(source, out):
    out.mkdir(exist_ok=True, parents=True)
    screen = out / 'screens'; screen.mkdir(exist_ok=True)
    swatches = screen / 'swatches'; swatches.mkdir(exist_ok=True)
    # Windows bars are outside these rectangles. On the ultrawide the tooltip
    # has a higher top edge than the bar. Keep an undistorted centered crop.
    for input_name, name, box, size in (
        ('TV.png', 'tv', (0, 0, 2047, 1148), (1280, 720)),
        ('ULTRAWIDE.png', 'ultrawide', (0, 0, 2047, 784), (1136, 456)),
        ('VERTICAL FULL HD.png', 'vertical', (0, 0, 1068, 1867), (504, 864)),
    ):
        art = Image.open(source / input_name).convert('RGB').crop(box)
        art = ImageOps.fit(art, size, method=Image.Resampling.LANCZOS)
        art.save(screen / f'{name}.webp', format='WEBP', quality=95, method=6)
    # All selection coordinates below refer to an 800px-wide inspection copy.
    crops = {
        'wall': ('DSC06700.JPG', (437, 64, 583, 183)),
        'cloth': ('DSC06712.JPG', (193, 352, 255, 412)),
        # Inside a single tile, away from grout and furniture. The shader lays
        # out grout at room scale independently of the photographed mineral.
        'stone': ('DSC06694.JPG', (538, 484, 575, 521)),
        'pile': ('DSC06712.JPG', (207, 491, 263, 525)),
        'marble': ('DSC06694.JPG', ((347, 417), (433, 389), (495, 415), (400, 440))),
    }
    for name, (file, region) in crops.items():
        original = Image.open(source / file).convert('L')
        k = original.width / 800
        if len(region) == 4 and isinstance(region[0], tuple):
            ordered = [region[i] for i in [0,3,2,1]]
            corners = tuple(k*v for pt in ordered for v in pt)
            crop = original.transform((176,176), Image.Transform.QUAD, corners, Image.Resampling.BICUBIC)
        else:
            crop = original.crop(tuple(round(k*v) for v in region)).resize((176,176), Image.Resampling.LANCZOS)
        base = np.asarray(crop, np.float32)
        # Divide out scene lighting before evaluating reflectance. Do not
        # project photographed contact shadows back into the Cycles lightmap.
        blur = np.asarray(crop.filter(ImageFilter.GaussianBlur(24)), np.float32)
        detail = np.log(4 + base) - np.log(4 + blur)
        detail = np.clip(detail / max(float(np.quantile(np.abs(detail), .96)), .015), -1.4, 1.4)
        amplitude = 32 if name == 'stone' else 63
        tile = np.asarray(np.clip(128 + amplitude*detail, 0, 255),np.uint8)
        horizontal=np.concatenate([tile,np.fliplr(tile)],axis=1)
        out_tile=np.concatenate([horizontal,np.flipud(horizontal)],axis=0)
        Image.fromarray(out_tile).save(swatches / (name+'.webp'),format='WEBP',lossless=True,quality=100,method=6)
    original=Image.open(source/'DSC06700.JPG').convert('RGB'); k=original.width/800
    for name, corners in {
        'execute':[(60,101),(58,196),(141,201),(140,110)],
        'grind':[(157,111),(158,202),(230,205),(231,118)],
        'hustle':[(245,120),(246,205),(311,208),(311,127)],
    }.items():
        pts=tuple(k*v for pt in corners for v in pt)
        texture=original.transform((192,280),Image.Transform.QUAD,pts,Image.Resampling.BICUBIC)
        texture.save(swatches/('print-'+name+'.webp'),format='WEBP',lossless=True,quality=100,method=6)


if __name__ == '__main__':
    prepare(Path(sys.argv[1]), Path(sys.argv[2]))
