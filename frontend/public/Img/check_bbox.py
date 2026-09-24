from PIL import Image, ImageChops
import glob
import os

for f in glob.glob('c:/Projects/theluxe/frontend/public/Img/luxe-*.jpeg'):
    img = Image.open(f).convert("RGBA")
    
    # Create a white background image to calculate difference
    bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
    diff = ImageChops.difference(img, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    
    print(f"{os.path.basename(f)}: Bbox {bbox}")
    
    if bbox:
        # crop to bounding box
        cropped = img.crop(bbox)
        
        # create mask for rounded corners? Or just leave it as is.
        # Actually, if we just crop it, it still might have white corners.
        # But let's first see the bbox.
