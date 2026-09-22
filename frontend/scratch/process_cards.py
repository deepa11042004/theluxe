import os
from PIL import Image, ImageChops, ImageDraw

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
    print(f"{src_name}: size = {w}x{h}")
    
    # Check bounding box of non-white pixels (where white is close to 255,255,255)
    # The gold border surrounds the card. Outside the gold border is white background and some faint shadow.
    # Let's find where the gold border is or convert white background into transparent.
    
    # We can create a mask where pixels that are pure white or near white on the outside become transparent.
    # Flood fill transparency from corners (0,0), (w-1,0), (0,h-1), (w-1,h-1).
    from collections import deque
    
    pixels = img.load()
    visited = set()
    queue = deque([(0, 0), (w-1, 0), (0, h-1), (w-1, h-1), (1, 1), (w-2, 1), (1, h-2), (w-2, h-2)])
    
    for pt in queue:
        visited.add(pt)
        
    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixels[x, y]
        
        # Check if pixel is near white/light grey (background/shadow outside the gold border)
        # Gold border has strong color (r>150, g>120, b<100 etc) or card content is dark
        # The background is r > 230, g > 230, b > 230
        is_bg = (r > 220 and g > 220 and b > 220)
        
        if is_bg:
            # Set alpha based on lightness
            # If pure white (255), alpha 0
            pixels[x, y] = (r, g, b, 0)
            
            for nx, ny in [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]:
                if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    nr, ng, nb, _ = pixels[nx, ny]
                    if nr > 215 and ng > 215 and nb > 215:
                        queue.append((nx, ny))
                        
    img.save(dst_path, "PNG")
    print(f"Saved transparent PNG to {dst_path}")
