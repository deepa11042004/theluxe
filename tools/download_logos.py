import os
import sys
from icrawler.builtin import BingImageCrawler, GoogleImageCrawler

# Ensure UTF-8 output encoding for Windows console
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# Complete list of hotel brands provided
hotels = [
    # Section 01: India
    "TAJ", "Oberoi HOTELS & RESORTS", "THE LEELA PALACES HOTELS RESORTS", 
    "RAFFLES INDIA", "ĀMAN INDIA", "SUJÁN LUXURY", "ANANTARA HOTELS RESORTS SPAS", 
    "ITC HOTELS RESPONSIBLE LUXURY", "The Oberoi BEACH RESORTS", "IHCL SELECT", 
    "CGH EARTH EXPERIENCES", "EVOLVE BACK", "WILDFLOWER HALL SHIMLA", 
    "THE POSTCARD HOTELS", "TAJ EXOTICA RESORT & SPA",
    
    # Section 02: Asia
    "ĀMAN HOTELS AND RESORTS", "CAPELLA HOTELS AND RESORTS", "ROSEWOOD HOTELS & RESORTS", 
    "BVLGARI HOTELS & RESORTS", "SIX SENSES HOTELS AND RESORTS", "SHANGRI-LA HOTELS AND RESORTS", 
    "PARK HYATT", "ST REGIS HOTELS & RESORTS", "THE RITZ-CARLTON HOTELS & RESORTS", 
    "BANYAN TREE HOTELS AND RESORTS", "COMO HOTELS AND RESORTS", "Alila HOTELS AND RESORTS", 
    "W HOTELS", "Andaz HOTELS", "1 HOTELS", "SONEVA HOTELS & RESORTS",
    
    # Section 03: Worldwide
    "FOUR SEASONS HOTELS AND RESORTS", "MANDARIN ORIENTAL THE HOTEL GROUP", 
    "THE PENINSULA HOTELS", "One&Only RESORTS", "Cheval Blanc", "BELMOND", 
    "Fairmont HOTELS & RESORTS", "RAFFLES", "WALDORF ASTORIA HOTELS & RESORTS", 
    "CONRAD HOTELS & RESORTS", "EDITION", "SLS HOTELS", "MONDRIAN HOTELS", 
    "GLENEAGLES TOWN & COUNTRY ESTATE"
]

# Base directory to store downloaded logos
base_dir = "hotel_logos"
os.makedirs(base_dir, exist_ok=True)

for brand in hotels:
    # Format folder name (e.g., "TAJ", "Four_Seasons")
    safe_folder_name = "".join(c if c.isalnum() else "_" for c in brand).strip("_")
    target_dir = os.path.join(base_dir, safe_folder_name)
    os.makedirs(target_dir, exist_ok=True)
    
    print(f"Downloading logos for: {brand}...")
    
    # Search query targeting transparent or high-res vector logos
    search_query = f"{brand} hotel brand logo png vector transparent"
    
    try:
        # Try GoogleImageCrawler first
        try:
            google_crawler = GoogleImageCrawler(
                storage={'root_dir': target_dir},
                log_level=40 # WARNING / ERROR only
            )
            google_crawler.crawl(
                keyword=search_query, 
                max_num=3, 
                file_idx_offset='auto'
            )
        except Exception:
            pass

        # If Google crawler produced no files (e.g. parser broken/blocked), fallback to BingImageCrawler
        existing_files = os.listdir(target_dir)
        if not existing_files:
            bing_crawler = BingImageCrawler(
                storage={'root_dir': target_dir},
                log_level=40
            )
            bing_crawler.crawl(
                keyword=search_query, 
                max_num=3, 
                file_idx_offset='auto'
            )
    except Exception as e:
        print(f"Error downloading {brand}: {e}")

print("All downloads completed! Check the 'hotel_logos' folder.")
