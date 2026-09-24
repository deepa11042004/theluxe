from PIL import Image
import glob
import os

def make_corners_transparent(img_path):
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    
    # We want to replace pixels that are very close to white with transparent,
    # but only if they are in the corners or outside the rounded part.
    # The easiest way is to use a flood fill from the 4 corners.
    
    from PIL import ImageDraw
    
    # Actually, a simpler way is to just do a floodfill from the 4 corners.
    # PIL's floodfill doesn't support alpha easily, so we can do it manually or use ImageDraw.floodfill.
    # ImageDraw.floodfill fills with a solid color.
    # Let's fill the corners with a unique magic color, then replace that magic color with transparent.
    
    magic_color = (255, 0, 255, 255) # Magenta
    
    ImageDraw.floodfill(img, (0, 0), magic_color, thresh=15)
    ImageDraw.floodfill(img, (img.width-1, 0), magic_color, thresh=15)
    ImageDraw.floodfill(img, (0, img.height-1), magic_color, thresh=15)
    ImageDraw.floodfill(img, (img.width-1, img.height-1), magic_color, thresh=15)
    
    new_data = []
    for item in img.getdata():
        if item == magic_color:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(img_path, "PNG")
    print(f"Processed {img_path}")

for f in glob.glob('c:/Projects/theluxe/frontend/public/Img/luxe-*.png'):
    make_corners_transparent(f)
