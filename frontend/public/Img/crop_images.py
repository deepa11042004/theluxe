from PIL import Image, ImageChops
import glob
import os

def trim(im):
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

for f in glob.glob('c:/Projects/theluxe/frontend/public/Img/luxe-*.jpeg'):
    img = Image.open(f).convert("RGB")
    cropped = trim(img)
    print(f"Original: {img.size}, Cropped: {cropped.size}")
    
    # Let's save as PNG with transparency for the rounded corners if possible
    # But for now, just crop it and save back
    cropped.save(f.replace('.jpeg', '.png'), "PNG")
    print(f"Saved {f.replace('.jpeg', '.png')}")
