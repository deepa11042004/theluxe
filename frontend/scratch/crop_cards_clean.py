import os
from PIL import Image, ImageDraw

files = [
    ("WhatsApp Image 2026-09-20 at 5.59.13 PM.jpeg", "card-signature.png"),
    ("WhatsApp Image 2026-09-20 at 5.59.13 PMm.jpeg", "card-prestige.png"),
    ("WhatsApp Image 2026-09-20 at 5.59.14 PMk.jpeg", "card-black.png"),
]

src_dir = r"c:\Projects\theluxe\frontend\public"
dst_dir = r"c:\Projects\theluxe\frontend\public\Img"

for src_name, dst_name in files:
    src_path = os.path.join(src_dir, src_name)
    dst_path = os.path.join(dst_dir, dst_name)
    
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    
    # Let's find the exact bounding box of the card (where color is not white/light grey)
    # The gold border has r,g,b where not all > 230
    pixels = img.load()
    
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # If not background
            if not (r > 225 and g > 225 and b > 225):
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    print(f"{src_name}: card bbox = ({min_x}, {min_y}, {max_x}, {max_y}), size = {max_x - min_x}x{max_y - min_y}")
    
    # Crop to bounding box
    cropped = img.crop((min_x, min_y, max_x + 1, max_y + 1))
    cw, ch = cropped.size
    
    # Create rounded corner mask
    # Standard card corner radius is approx 5-6% of card width
    radius = int(cw * 0.052)
    
    mask = Image.new("L", (cw, ch), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (cw, ch)], radius=radius, fill=255)
    
    # Apply rounded mask
    result = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    result.paste(cropped, (0, 0), mask=mask)
    
    result.save(dst_path, "PNG", optimize=True)
    print(f"Saved cleanly cropped & rounded transparent card to {dst_path}")
