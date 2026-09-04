import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const PERMISSIONS = [
  "dashboard.view",
  "hotel.view",
  "hotel.create",
  "hotel.update",
  "hotel.delete",
  "hotel.publish",
  "destination.view",
  "destination.create",
  "destination.update",
  "destination.delete",
  "destination.publish",
  "itinerary.view",
  "itinerary.create",
  "itinerary.update",
  "itinerary.delete",
  "itinerary.publish",
  "blog.view",
  "blog.create",
  "blog.update",
  "blog.delete",
  "blog.publish",
  "media.view",
  "media.upload",
  "media.update",
  "media.delete",
  "user.view",
  "user.create",
  "user.update",
  "user.delete",
  "profile.view",
  "profile.update",
  "audit.view",
];

const BLOG_CATEGORIES = [
  { name: "Destinations", slug: "destinations" },
  { name: "Privileges", slug: "privileges" },
  { name: "Lifestyle", slug: "lifestyle" },
  { name: "Press", slug: "press" },
  { name: "Curated Journeys", slug: "curated-journeys" },
  { name: "Global Insights", slug: "global-insights" },
  { name: "Member Benefits", slug: "member-benefits" },
];

const HOTELS_DATA = [
  {
    name: "Taj Lake Palace",
    slug: "taj-lake-palace",
    city: "Udaipur",
    state_province: "Rajasthan",
    country: "India",
    region: "North India",
    address: "Jag Niwas, Lake Pichola, Udaipur, Rajasthan 313001",
    short_description: "A floating white-marble palace in the middle of Lake Pichola.",
    description: "A floating white-marble palace in the middle of Lake Pichola offering unparalleled royal hospitality and romantic sunset views over the Aravalli hills.",
    luxury_category: "HERITAGE & PALACE",
    hotel_type: "Palace Resort",
    official_website: "https://www.tajhotels.com/en-in/taj/taj-lake-palace-udaipur/",
    amenities: JSON.stringify(["Royal Butler Service", "Private Boat Transfer", "Jharokha Dining"]),
    is_featured: true,
    is_popular: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://cdn.sanity.io/images/ocl5w36p/ihcl_prod/1c0c270e8d67352d82a51cc9a9c89c994bc882fe-1280x1760.jpg", is_primary: true, alt_text: "Taj Lake Palace Exterior" }
    ]
  },
  {
    name: "Ananda in the Himalayas",
    slug: "ananda-in-the-himalayas",
    city: "Rishikesh",
    state_province: "Uttarakhand",
    country: "India",
    region: "North India",
    address: "The Palace Estate, Narendra Nagar, Uttarakhand 249175",
    short_description: "A world-renowned luxury wellness sanctuary set on a 100-acre palace estate.",
    description: "A world-renowned luxury wellness sanctuary set on a 100-acre palace estate overlooking the spiritual Ganges River valley.",
    luxury_category: "MOUNTAIN & WELLNESS",
    hotel_type: "Wellness Sanctuary",
    official_website: "https://www.anandaspa.com/",
    amenities: JSON.stringify(["Ayurvedic Spa", "Yoga & Meditation", "Organic Gourmet"]),
    is_featured: true,
    is_popular: true,
    status: "PUBLISHED",
    images: [
      { image_url: "/Img/Untitled design (15).webp", is_primary: true, alt_text: "Ananda in the Himalayas" }
    ]
  },
  {
    name: "The Oberoi Amarvilas",
    slug: "the-oberoi-amarvilas",
    city: "Agra",
    state_province: "Uttar Pradesh",
    country: "India",
    region: "North India",
    address: "Taj East Gate Rd, Taj Nagari, Phase 1, Agra, Uttar Pradesh 282001",
    short_description: "Located just 600 meters from the Taj Mahal.",
    description: "Located just 600 meters from the Taj Mahal, every room and suite offers uninterrupted, breathtaking views of the monument of love.",
    luxury_category: "HERITAGE & PALACE",
    hotel_type: "Luxury Resort",
    official_website: "https://www.oberoihotels.com/hotels-in-agra-amarvilas-resort/",
    amenities: JSON.stringify(["Taj Mahal Views", "Private Balconies", "Terrace Dining"]),
    is_featured: true,
    is_popular: true,
    status: "PUBLISHED",
    images: [
      { image_url: "/Img/e3371e9e.avif", is_primary: true, alt_text: "The Oberoi Amarvilas" }
    ]
  },
  {
    name: "Soneva Fushi",
    slug: "soneva-fushi",
    city: "Baa Atoll",
    state_province: "Baa Atoll",
    country: "Maldives",
    region: "Indian Ocean",
    address: "Kunfunadhoo Island, Baa Atoll, Maldives",
    short_description: "An idyllic island hideaway featuring spacious beachfront and overwater villas.",
    description: "An idyllic island hideaway featuring spacious beachfront and overwater villas with private pools, glassblowing studio, and open-air cinema.",
    luxury_category: "BEACH & ISLAND",
    hotel_type: "Island Resort",
    official_website: "https://soneva.com/resorts/soneva-fushi/",
    amenities: JSON.stringify(["Private Pool", "Barefoot Luxury", "Observatory"]),
    is_featured: true,
    is_popular: true,
    status: "PUBLISHED",
    images: [
      { image_url: "/Img/soneva-fushi.jpg", is_primary: true, alt_text: "Soneva Fushi Villa" }
    ]
  },
  {
    name: "Amanbagh Retreat",
    slug: "amanbagh-retreat",
    city: "Alwar",
    state_province: "Rajasthan",
    country: "India",
    region: "North India",
    address: "Ajabgarh, Alwar, Rajasthan 301027",
    short_description: "A modern oasis carved out of pink sandstone.",
    description: "A modern oasis carved out of pink sandstone, surrounded by mature palm groves and ancient ruined temples near Sariska National Park.",
    luxury_category: "WILDLIFE & SAFARI",
    hotel_type: "Heritage Retreat",
    official_website: "https://www.aman.com/resorts/amanbagh",
    amenities: JSON.stringify(["Tiger Safaris", "Sandstone Pool Suites", "Heritage Walks"]),
    is_featured: true,
    is_popular: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://www.aman.com/sites/default/files/2023-01/Amanbagh%2C%20India%20-%20Main%20Building%2C%20Pool%20View-3.jpg", is_primary: true, alt_text: "Amanbagh Pool View" }
    ]
  },
  {
    name: "The Leela Palace Kovalam",
    slug: "the-leela-palace-kovalam",
    city: "Kovalam",
    state_province: "Kerala",
    country: "India",
    region: "South India",
    address: "Beach Rd, Kovalam, Trivandrum, Kerala 695527",
    short_description: "Perched high on a clifftop overlooking the Arabian Sea.",
    description: "Perched high on a clifftop overlooking the Arabian Sea, blending authentic Malabar coastal luxury with world-class beach access.",
    luxury_category: "BEACH & ISLAND",
    hotel_type: "Coastal Resort",
    official_website: "https://www.theleela.com/the-leela-kovalam-a-raviz-hotel",
    amenities: JSON.stringify(["Cliff-Top Infinity Pool", "Ayurvedic Treatments", "Beach Club"]),
    is_featured: true,
    is_popular: true,
    status: "PUBLISHED",
    images: [
      { image_url: "/Img/Intro_1035x600_5.webp", is_primary: true, alt_text: "The Leela Palace Kovalam" }
    ]
  }
];

const DESTINATIONS_DATA = [
  // National
  {
    name: "Aman-i-Khas",
    slug: "aman-i-khas",
    city: "Ranthambore",
    state_region: "Rajasthan",
    country: "India",
    continent: "Asia",
    destination_type: "national",
    short_description: "Wilderness safari experience in Ranthambore.",
    description: "Experience the raw wilderness of Ranthambore National Park in ultimate luxury, featuring air-conditioned tents and guided safari excursions.",
    is_featured: true,
    is_popular: true,
    is_india_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Aman-i-Khas Safari" }
    ]
  },
  {
    name: "Taj Lake Palace Destination",
    slug: "taj-lake-palace-destination",
    city: "Udaipur",
    state_region: "Rajasthan",
    country: "India",
    continent: "Asia",
    destination_type: "national",
    short_description: "Majestic 18th-century floating palace.",
    description: "A majestic 18th-century palace floating on Lake Pichola, offering legendary hospitality and unparalleled romantic views of the City Palace.",
    is_featured: true,
    is_popular: true,
    is_india_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Taj Lake Palace Destination" }
    ]
  },
  {
    name: "The Oberoi Amarvilas Destination",
    slug: "the-oberoi-amarvilas-destination",
    city: "Agra",
    state_region: "Uttar Pradesh",
    country: "India",
    continent: "Asia",
    destination_type: "national",
    short_description: "Uninterrupted Taj Mahal views.",
    description: "Wake up to breathtaking, uninterrupted views of the Taj Mahal from your private balcony, wrapped in Moorish and Mughal architectural luxury.",
    is_featured: true,
    is_popular: true,
    is_india_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Oberoi Amarvilas View" }
    ]
  },
  {
    name: "Evolve Back Kabini",
    slug: "evolve-back-kabini",
    city: "Kabini",
    state_region: "Karnataka",
    country: "India",
    continent: "Asia",
    destination_type: "national",
    short_description: "Kuruba tribal inspired safari resort.",
    description: "Inspired by local Kuruba tribal design, this safari resort offers a sweeping view of the Kabini River and unparalleled wildlife sightings in the wild.",
    is_featured: true,
    is_popular: true,
    is_india_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Evolve Back Kabini" }
    ]
  },
  {
    name: "Kumarakom Lake Resort Destination",
    slug: "kumarakom-lake-resort-destination",
    city: "Kumarakom",
    state_region: "Kerala",
    country: "India",
    continent: "Asia",
    destination_type: "national",
    short_description: "Pristine Kerala backwaters retreat.",
    description: "Reconnect with nature along the pristine backwaters of Kerala, featuring luxury heritage villas reconstructed from traditional ancestral homes.",
    is_featured: true,
    is_popular: true,
    is_india_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Kumarakom Lake Resort" }
    ]
  },
  {
    name: "Wildflower Hall Shimla",
    slug: "wildflower-hall-shimla",
    city: "Shimla",
    state_region: "Himachal Pradesh",
    country: "India",
    continent: "Asia",
    destination_type: "national",
    short_description: "Pristine mountain sanctuary at 8,250 feet.",
    description: "Located 8,250 feet above sea level in the Himalayas, experience pristine mountain air, pine forests, and an outdoor heated whirlpool with panoramic valley views.",
    is_featured: true,
    is_popular: true,
    is_india_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Wildflower Hall Shimla" }
    ]
  },

  // International
  {
    name: "Soneva Jani",
    slug: "soneva-jani",
    city: "Noonu Atoll",
    state_region: "Noonu Atoll",
    country: "Maldives",
    continent: "Asia",
    destination_type: "international",
    short_description: "Overwater villas with retractable roofs.",
    description: "A sanctuary of overwater villas with retractable roofs to stargaze from bed and private water slides into the turquoise lagoon.",
    is_featured: true,
    is_popular: true,
    is_international_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Soneva Jani Water Slides" }
    ]
  },
  {
    name: "Amangiri Utah",
    slug: "amangiri-utah",
    city: "Canyon Point",
    state_region: "Utah",
    country: "USA",
    continent: "North America",
    destination_type: "international",
    short_description: "Modernist desert oasis in American Southwest.",
    description: "Tucked into a protected valley in the American Southwest, this modernist oasis blends seamlessly with the red-rock desert landscape.",
    is_featured: true,
    is_popular: true,
    is_international_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Amangiri Red Rock" }
    ]
  },
  {
    name: "Villa d'Este Lake Como",
    slug: "villa-deste-lake-como",
    city: "Lake Como",
    state_region: "Lombardy",
    country: "Italy",
    continent: "Europe",
    destination_type: "international",
    short_description: "Timeless elegance on the shores of Lake Como.",
    description: "A legendary hotel of timeless elegance, surrounded by 25 acres of manicured gardens, overlooking the serene waters of Lake Como.",
    is_featured: true,
    is_popular: true,
    is_international_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Villa d'Este Lake Como" }
    ]
  },
  {
    name: "Hoshinoya Kyoto",
    slug: "hoshinoya-kyoto",
    city: "Kyoto",
    state_region: "Kansai",
    country: "Japan",
    continent: "Asia",
    destination_type: "international",
    short_description: "Historic riverside ryokan on the Oi River.",
    description: "Accessible by a tranquil boat ride down the Oi River, this historic riverside ryokan offers a perfect blend of Japanese tradition and modern luxury.",
    is_featured: true,
    is_popular: true,
    is_international_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Hoshinoya Kyoto Boat Ride" }
    ]
  },
  {
    name: "Singita Boulders Lodge",
    slug: "singita-boulders-lodge",
    city: "Sabi Sand",
    state_region: "Mpumalanga",
    country: "South Africa",
    continent: "Africa",
    destination_type: "international",
    short_description: "Organic safari lodge along the Sand River.",
    description: "An organic masterpiece resting along the banks of the Sand River, providing front-row seats to frequent big game sightings in the bush.",
    is_featured: true,
    is_popular: true,
    is_international_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Singita Boulders Lodge Safari" }
    ]
  },
  {
    name: "Canaves Oia Suites",
    slug: "canaves-oia-suites",
    city: "Santorini",
    state_region: "Cyclades",
    country: "Greece",
    continent: "Europe",
    destination_type: "international",
    short_description: "Cliffside suites with Aegean caldera views.",
    description: "Carved into the volcanic cliffside, enjoy panoramic vistas of the Aegean Sea and the caldera from your private infinity plunge pool.",
    is_featured: true,
    is_popular: true,
    is_international_destination: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80", is_primary: true, alt_text: "Canaves Oia Caldera View" }
    ]
  }
];

const ITINERARIES_DATA = [
  {
    id: "1",
    title: "Dubai — Desert Dreams & City Glamour",
    slug: "dubai-desert-dreams-city-glamour",
    short_description: "Explore Jumeirah Mosque, Gold Souk, Dubai Mall, Spice Souk, and the historic Bastakiya Square.",
    overview: "Explore Jumeirah Mosque, Gold Souk, Dubai Mall, Spice Souk, and the historic Bastakiya Square. Drive past Atlantis, The Palm, and end with an unforgettable desert safari experience.",
    region: "Middle East",
    category: "Luxury & Adventure",
    nights: 5,
    days: 6,
    min_travelers: 2,
    max_travelers: 16,
    price_from: 124999,
    price_currency: "INR",
    price_unit: "per person",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1739900292622-a7f860175aad?w=500&auto=format&fit=crop&q=60", is_primary: true, alt_text: "Dubai Skyline" },
      { image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80", is_primary: false, alt_text: "Burj Khalifa" }
    ],
    days_list: [
      { day_number: 1, title: "Welcome to the City of Gold", description: "Arrive at Dubai International Airport (DXB). Meet our representative and transfer to your premium hotel." },
      { day_number: 2, title: "Burj Khalifa & Modern Wonders", description: "Visit the towering Burj Khalifa for breathtaking views from the observation deck." },
      { day_number: 3, title: "Historic Souks & Bastakiya Square", description: "Step back in time at Al Fahidi Historical Neighborhood. Take a traditional Abra water taxi ride across Dubai Creek." },
      { day_number: 4, title: "Thrilling Desert Safari", description: "Head out into the golden dunes for a high-energy dune bashing adventure with camel rides and BBQ dinner." },
      { day_number: 5, title: "Palm Jumeirah & Marina Cruise", description: "Drive past Atlantis, The Palm. Step aboard a luxury wooden Dhow cruise at Dubai Marina." },
      { day_number: 6, title: "Departure from Dubai", description: "Enjoy a final breakfast at your hotel before transferring to the airport for your return flight." }
    ]
  },
  {
    id: "2",
    title: "Goa — Sun, Sand & Soul",
    slug: "goa-sun-sand-soul",
    short_description: "Goa offers much more than its famous party scene. Rich legacy, history, culture, and sun-soaked beaches.",
    overview: "Goa offers much more than its famous party scene. Rich legacy, history, culture, and sun-soaked beaches make it a perfect destination for every kind of traveller seeking joy.",
    region: "West India",
    category: "Leisure & Beach",
    nights: 4,
    days: 5,
    min_travelers: 2,
    max_travelers: 20,
    price_from: 48500,
    price_currency: "INR",
    price_unit: "per person",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=500&auto=format&fit=crop&q=60", is_primary: true, alt_text: "Goa Beach Sunset" }
    ],
    days_list: [
      { day_number: 1, title: "Arrive in Tropical Goa", description: "Fly into Goa Airport and transfer to your beachside resort." },
      { day_number: 2, title: "North Goa Beach Hopping & Fort Aguada", description: "Explore the 17th-century Fort Aguada. Spend the afternoon exploring Calangute and Baga." },
      { day_number: 3, title: "Latin Quarter & Churches of Old Goa", description: "Visit Basilica of Bom Jesus and walk through colorful Fontainhas." },
      { day_number: 4, title: "Dudhsagar Waterfalls & Spice Plantation", description: "Journey to Dudhsagar Waterfalls and tour a spice plantation." },
      { day_number: 5, title: "Depart Goa", description: "Lazy breakfast and transfer to airport." }
    ]
  },
  {
    id: "3",
    title: "Bali — Enchanting Island of Gods",
    slug: "bali-enchanting-island-of-gods",
    short_description: "Bali's enchanting beauty, rich culture, and serene beaches create an unforgettable experience.",
    overview: "Bali's enchanting beauty, rich culture, and serene beaches create an unforgettable experience. Whether you seek adventure or relaxation, Bali has it all for you.",
    region: "Southeast Asia",
    category: "Wellness & Nature",
    nights: 6,
    days: 7,
    min_travelers: 1,
    max_travelers: 12,
    price_from: 98000,
    price_currency: "INR",
    price_unit: "per person",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?w=500&auto=format&fit=crop&q=60", is_primary: true, alt_text: "Bali Temple" }
    ],
    days_list: [
      { day_number: 1, title: "Arrive in Bali - Drive to Ubud", description: "Arrive at Ngurah Rai Airport and transfer to Ubud." },
      { day_number: 2, title: "Ubud Monkey Forest & Rice Terraces", description: "Walk through Sacred Monkey Forest and Tegallalang Rice Terraces." },
      { day_number: 3, title: "Holy Water Purification & Waterfall Trek", description: "Purification ritual at Tirta Empul and Tegenungan Waterfall trek." },
      { day_number: 4, title: "Mount Batur Sunrise Volcano Trek", description: "Sunrise trek up Mount Batur and lake hot springs." },
      { day_number: 5, title: "Seminyak & Sunset Kecak Dance at Uluwatu", description: "Visit cliffside Uluwatu Temple for Kecak Fire Dance." },
      { day_number: 6, title: "Nusa Penida Island Escape", description: "Speedboat to Nusa Penida, T-Rex Kelingking Beach." },
      { day_number: 7, title: "Depart Bali", description: "Balinese massage and transfer to airport." }
    ]
  },
  {
    id: "4",
    title: "Thailand — Tropical Temples & Turquoise Islands",
    slug: "thailand-tropical-temples-turquoise-islands",
    short_description: "Immerse yourself in Bangkok's ornate grand palaces, taste traditional street food treasures.",
    overview: "Immerse yourself in Bangkok's ornate grand palaces, taste traditional street food treasures, and escape to Phuket's white-sand horizons and Phang Nga Bay limestone wonders.",
    region: "Southeast Asia",
    category: "Adventure & Sightseeing",
    nights: 6,
    days: 7,
    min_travelers: 2,
    max_travelers: 15,
    price_from: 89000,
    price_currency: "INR",
    price_unit: "per person",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1513568720563-6a5b8c6caab3?w=500&auto=format&fit=crop&q=60", is_primary: true, alt_text: "Thailand Island" }
    ],
    days_list: [
      { day_number: 1, title: "Arrive in Vibrant Bangkok", description: "Transfer to hotel and Chinatown street food tour." },
      { day_number: 2, title: "Grand Palace & Chao Phraya River Cruise", description: "Tour Grand Palace and Emerald Buddha temple." },
      { day_number: 3, title: "Fly to Phuket & Beach Sunset", description: "Flight to Phuket and sunset at Promthep Cape." },
      { day_number: 4, title: "Phi Phi Islands Speedboat Tour", description: "Speedboat tour to Maya Bay and Pileh Lagoon." },
      { day_number: 5, title: "James Bond Island & Sea Caves", description: "Phang Nga Bay cruise and James Bond Island." },
      { day_number: 6, title: "Elephant Sanctuary & Culinary Lesson", description: "Rescued elephants interaction and Thai cooking class." },
      { day_number: 7, title: "Depart Thailand", description: "Phuket Old Town stroll and flight home." }
    ]
  },
  {
    id: "5",
    title: "Kashmir — Heaven on Earth & Alpine Wonders",
    slug: "kashmir-heaven-on-earth-alpine-wonders",
    short_description: "Relax on a luxury Shikara cruise over Dal Lake, wander through historic Mughal terrace gardens.",
    overview: "Relax on a luxury Shikara cruise over Dal Lake, wander through historic Mughal terrace gardens, and breathe in the snow-dusted peak vistas of Gulmarg and Pahalgam valleys.",
    region: "North India",
    category: "Scenic & Nature",
    nights: 5,
    days: 6,
    min_travelers: 2,
    max_travelers: 12,
    price_from: 65000,
    price_currency: "INR",
    price_unit: "per person",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://plus.unsplash.com/premium_photo-1697730150003-26a1d469adb4?w=500&auto=format&fit=crop&q=60", is_primary: true, alt_text: "Kashmir Shikara" }
    ],
    days_list: [
      { day_number: 1, title: "Welcome to Srinagar Houseboats", description: "Check into carved wooden houseboat on Dal Lake." },
      { day_number: 2, title: "Mughal Terrace Gardens", description: "Explore Shalimar Bagh and Nishat Bagh." },
      { day_number: 3, title: "Alpine Gulmarg & Gondola Lift", description: "Asia's highest cable car to Apharwat Peak." },
      { day_number: 4, title: "Pahalgam — Valley of Shepherds", description: "Visit saffron fields and Betaab Valley." },
      { day_number: 5, title: "Glaciers of Sonamarg", description: "Thajiwas Glacier pony ride." },
      { day_number: 6, title: "Farewell Kashmir", description: "Pashmina shopping and departure." }
    ]
  },
  {
    id: "6",
    title: "Shimla — The Regal Queen of Hills",
    slug: "shimla-the-regal-queen-of-hills",
    short_description: "Stroll the historic pedestrian Mall Road, visit colonial Jakhoo Temple structures.",
    overview: "Stroll the historic pedestrian Mall Road, visit colonial Jakhoo Temple structures, and journey down to Kufri's panoramic pine woodlands for a perfect Himalayan getaway.",
    region: "North India",
    category: "Hills & Heritage",
    nights: 3,
    days: 4,
    min_travelers: 2,
    max_travelers: 10,
    price_from: 35000,
    price_currency: "INR",
    price_unit: "per person",
    is_flights_included: false,
    is_featured: false,
    status: "PUBLISHED",
    images: [
      { image_url: "https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?w=500&auto=format&fit=crop&q=60", is_primary: true, alt_text: "Shimla Hills" }
    ],
    days_list: [
      { day_number: 1, title: "Scenic Drive to Shimla", description: "Drive up pine-covered Himalayan foothills." },
      { day_number: 2, title: "British Colonial Heritage Walk & Mall Road", description: "Tour Viceregal Lodge and Mall Road." },
      { day_number: 3, title: "Excursion to Kufri Forests", description: "Horse riding trails and Himalayan Nature Park." },
      { day_number: 4, title: "Toy Train Ride & Return", description: "UNESCO Kalka-Shimla Toy Train ride." }
    ]
  },
  {
    id: "7",
    title: "Nainital — Emerald Lakes & Misty Ridges",
    slug: "nainital-emerald-lakes-misty-ridges",
    short_description: "Set sail on the historic, pear-shaped Naini Lake, experience breathtaking views.",
    overview: "Set sail on the historic, pear-shaped Naini Lake, experience breathtaking views from Snow View Point tramways, and uncover peaceful nature trails across surrounding cloud-kissed peaks.",
    region: "North India",
    category: "Lake Retreat",
    nights: 3,
    days: 4,
    min_travelers: 2,
    max_travelers: 10,
    price_from: 32000,
    price_currency: "INR",
    price_unit: "per person",
    is_flights_included: false,
    is_featured: false,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1683567386578-738d9cc9b62c?w=500&auto=format&fit=crop&q=60", is_primary: true, alt_text: "Nainital Emerald Lake" }
    ],
    days_list: [
      { day_number: 1, title: "Welcome to the Lake District", description: "Naini Lake boating during afternoon." },
      { day_number: 2, title: "Snow View Tramway & Naina Devi Temple", description: "Cable car ride to Snow View Point." },
      { day_number: 3, title: "Three Lakes Tour: Bhimtal, Sattal, Naukuchiatal", description: "Explore neighboring forest lakes." },
      { day_number: 4, title: "Mall Road Shopping & Departure", description: "Aromatic candle shopping and departure." }
    ]
  }
];

const BLOG_POSTS_DATA = [
  {
    title: "A Dram of One's Own: Private Distillery Tours & Exclusive Tastings",
    slug: "a-dram-of-ones-own-private-distillery-tours",
    excerpt: "Embark on an extraordinary journey through hidden cellars and private distilleries across the Scottish Highlands and Japanese Alps.",
    content: "Embark on an extraordinary journey through hidden cellars and private distilleries across the Scottish Highlands and Japanese Alps. Our members gain rare access to master blenders, vintage casks, and private tasting rooms closed to the general public.",
    tag: "The Luxe Yatra Press",
    author_name: "The Luxe Yatra Editorial",
    author_bio: "Curated insights from luxury travel connoisseurs.",
    reading_time: 5,
    category_slug: "privileges",
    is_featured: true,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1760943013869-65a30a4fafd1?w=800&auto=format&fit=crop&q=80", alt_text: "Distillery Tasting", is_featured: true }
    ]
  },
  {
    title: "How The Luxe Yatra Offers Luxury Access to Private Estates",
    slug: "how-the-luxe-yatra-offers-luxury-access-to-private-estates",
    excerpt: "Unlock doors to historic châteaux, cliffside villas, and private island retreats reserved exclusively for our members.",
    content: "Unlock doors to historic châteaux, cliffside villas, and private island retreats reserved exclusively for our members. Experience unmatched privacy, dedicated butler service, and tailored gastronomy.",
    tag: "Privilege Access",
    author_name: "Privilege Access Team",
    author_bio: "Private estate management & bespoke stays.",
    reading_time: 4,
    category_slug: "lifestyle",
    is_featured: false,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800&q=80", alt_text: "Private Estate Villa", is_featured: true }
    ]
  },
  {
    title: "Seven Great Hidden Island Escapes to Rent This Summer",
    slug: "seven-great-hidden-island-escapes-to-rent-this-summer",
    excerpt: "From secluded Mediterranean havens to untouched South Pacific sanctuaries, discover remote island living at its finest.",
    content: "From secluded Mediterranean havens to untouched South Pacific sanctuaries, discover remote island living at its finest. Here is our handpicked selection of private islands for ultimate seclusion.",
    tag: "Island Escapes",
    author_name: "Island Escapes Desk",
    author_bio: "Specialists in private island buyouts.",
    reading_time: 6,
    category_slug: "destinations",
    is_featured: false,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80", alt_text: "Private Island Beach", is_featured: true }
    ]
  },
  {
    title: "Unveiling India's Most Regal Palace Stays & Heritage Havens",
    slug: "unveiling-indias-most-regal-palace-stays-heritage-havens",
    excerpt: "Experience royal hospitality, centuries-old architecture, and bespoke dining in Rajasthan’s premier heritage sanctuaries.",
    content: "Experience royal hospitality, centuries-old architecture, and bespoke dining in Rajasthan’s premier heritage sanctuaries. From Udaipur to Jaipur, live like royalty.",
    tag: "Curated Journeys",
    author_name: "Heritage Desk",
    author_bio: "Curator of royal heritage journeys.",
    reading_time: 7,
    category_slug: "destinations",
    is_featured: false,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80", alt_text: "Rajasthan Palace Architecture", is_featured: true }
    ]
  },
  {
    title: "The Future of Luxury Hospitality: High-Touch Concierge Services",
    slug: "the-future-of-luxury-hospitality-high-touch-concierge-services",
    excerpt: "How personalized itineraries and 24/7 dedicated lifestyle managers are redefining expectations for high-net-worth travelers.",
    content: "How personalized itineraries and 24/7 dedicated lifestyle managers are redefining expectations for high-net-worth travelers. The new era of travel prioritizes frictionless service and emotional connection.",
    tag: "Global Insights",
    author_name: "Global Insights Desk",
    author_bio: "Luxury hospitality industry analysts.",
    reading_time: 5,
    category_slug: "press",
    is_featured: false,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", alt_text: "Concierge Lounge", is_featured: true }
    ]
  },
  {
    title: "Maximizing Your Luxe Club Membership: Insider Tips & Vouchers",
    slug: "maximizing-your-luxe-club-membership-insider-tips-vouchers",
    excerpt: "Learn how to leverage complimentary room upgrades, dining credits, and partner airline perks for seamless travel.",
    content: "Learn how to leverage complimentary room upgrades, dining credits, and partner airline perks for seamless travel. Unlock VIP status at top tier luxury hotel collections worldwide.",
    tag: "Member Benefits",
    author_name: "Luxe Club Concierge",
    author_bio: "Dedicated membership services.",
    reading_time: 4,
    category_slug: "member-benefits",
    is_featured: false,
    status: "PUBLISHED",
    images: [
      { image_url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", alt_text: "Luxe Club Privilege Card", is_featured: true }
    ]
  }
];

async function main() {
  console.log("Seeding Phase 1 data...");

  // 1. Permissions
  const permMap = new Map<string, string>();
  for (const permName of PERMISSIONS) {
    const perm = await prisma.permission.upsert({
      where: { name: permName },
      update: {},
      create: {
        name: permName,
        description: `Permission for ${permName}`,
      },
    });
    permMap.set(permName, perm.id);
  }

  // 2. Roles
  const superAdminRole = await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: {
      name: "SUPER_ADMIN",
      description: "Super Administrator with full access",
    },
  });

  const contentManagerRole = await prisma.role.upsert({
    where: { name: "CONTENT_MANAGER" },
    update: {},
    create: {
      name: "CONTENT_MANAGER",
      description: "Can manage and publish all content",
    },
  });

  const editorRole = await prisma.role.upsert({
    where: { name: "EDITOR" },
    update: {},
    create: {
      name: "EDITOR",
      description: "Can create and edit draft content",
    },
  });

  // 3. Assign Role Permissions
  for (const [, permId] of permMap) {
    await prisma.rolePermission.upsert({
      where: {
        role_id_permission_id: {
          role_id: superAdminRole.id,
          permission_id: permId,
        },
      },
      update: {},
      create: {
        role_id: superAdminRole.id,
        permission_id: permId,
      },
    });
  }

  const contentManagerPerms = PERMISSIONS.filter(
    (p) => !p.startsWith("user.") && p !== "audit.view"
  );
  for (const permName of contentManagerPerms) {
    const permId = permMap.get(permName)!;
    await prisma.rolePermission.upsert({
      where: {
        role_id_permission_id: {
          role_id: contentManagerRole.id,
          permission_id: permId,
        },
      },
      update: {},
      create: {
        role_id: contentManagerRole.id,
        permission_id: permId,
      },
    });
  }

  const editorPerms = PERMISSIONS.filter(
    (p) =>
      p.endsWith(".view") ||
      p.endsWith(".create") ||
      p.endsWith(".update") ||
      p.endsWith(".upload")
  );
  for (const permName of editorPerms) {
    const permId = permMap.get(permName)!;
    await prisma.rolePermission.upsert({
      where: {
        role_id_permission_id: {
          role_id: editorRole.id,
          permission_id: permId,
        },
      },
      update: {},
      create: {
        role_id: editorRole.id,
        permission_id: permId,
      },
    });
  }

  // 4. Default Super Admin User
  const passwordHash = await bcrypt.hash("Admin@123456", 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@theluxeyatra.com" },
    update: { password_hash: passwordHash, role_id: superAdminRole.id },
    create: {
      name: "Super Admin",
      email: "admin@theluxeyatra.com",
      password_hash: passwordHash,
      role_id: superAdminRole.id,
      status: "ACTIVE",
    },
  });

  // 5. Blog Categories
  const categoryMap = new Map<string, string>();
  for (let i = 0; i < BLOG_CATEGORIES.length; i++) {
    const cat = BLOG_CATEGORIES[i];
    const createdCat = await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, display_order: i },
      create: {
        name: cat.name,
        slug: cat.slug,
        display_order: i,
        status: "ACTIVE",
      },
    });
    categoryMap.set(cat.slug, createdCat.id);
  }

  // 6. Hotels
  console.log("Seeding Hotels...");
  for (const hData of HOTELS_DATA) {
    const { images, ...hotelFields } = hData;
    const hotel = await prisma.hotel.upsert({
      where: { slug: hotelFields.slug },
      update: {
        ...hotelFields,
        created_by: superAdmin.id,
        published_at: new Date(),
      },
      create: {
        ...hotelFields,
        created_by: superAdmin.id,
        published_at: new Date(),
      },
    });

    // Seed Hotel Images
    if (images && images.length > 0) {
      await prisma.hotelImage.deleteMany({ where: { hotel_id: hotel.id } });
      for (let idx = 0; idx < images.length; idx++) {
        await prisma.hotelImage.create({
          data: {
            hotel_id: hotel.id,
            image_url: images[idx].image_url,
            alt_text: images[idx].alt_text,
            is_primary: images[idx].is_primary,
            display_order: idx,
          },
        });
      }
    }
  }

  // 7. Destinations
  console.log("Seeding Destinations...");
  for (const dData of DESTINATIONS_DATA) {
    const { images, ...destFields } = dData;
    const destination = await prisma.destination.upsert({
      where: { slug: destFields.slug },
      update: {
        ...destFields,
        created_by: superAdmin.id,
        published_at: new Date(),
      },
      create: {
        ...destFields,
        created_by: superAdmin.id,
        published_at: new Date(),
      },
    });

    if (images && images.length > 0) {
      await prisma.destinationImage.deleteMany({ where: { destination_id: destination.id } });
      for (let idx = 0; idx < images.length; idx++) {
        await prisma.destinationImage.create({
          data: {
            destination_id: destination.id,
            image_url: images[idx].image_url,
            alt_text: images[idx].alt_text,
            is_primary: images[idx].is_primary,
            display_order: idx,
          },
        });
      }
    }
  }

  // 8. Itineraries
  console.log("Seeding Itineraries...");
  for (const iData of ITINERARIES_DATA) {
    const { images, days_list, ...itineraryFields } = iData;
    const itinerary = await prisma.itinerary.upsert({
      where: { slug: itineraryFields.slug },
      update: {
        ...itineraryFields,
        created_by: superAdmin.id,
        published_at: new Date(),
      },
      create: {
        ...itineraryFields,
        created_by: superAdmin.id,
        published_at: new Date(),
      },
    });

    if (images && images.length > 0) {
      await prisma.itineraryImage.deleteMany({ where: { itinerary_id: itinerary.id } });
      for (let idx = 0; idx < images.length; idx++) {
        await prisma.itineraryImage.create({
          data: {
            itinerary_id: itinerary.id,
            image_url: images[idx].image_url,
            alt_text: images[idx].alt_text,
            is_primary: images[idx].is_primary,
            display_order: idx,
          },
        });
      }
    }

    if (days_list && days_list.length > 0) {
      await prisma.itineraryDay.deleteMany({ where: { itinerary_id: itinerary.id } });
      for (let idx = 0; idx < days_list.length; idx++) {
        await prisma.itineraryDay.create({
          data: {
            itinerary_id: itinerary.id,
            day_number: days_list[idx].day_number,
            title: days_list[idx].title,
            description: days_list[idx].description,
            display_order: idx,
          },
        });
      }
    }
  }

  // 9. Blogs
  console.log("Seeding Blogs...");
  for (const bData of BLOG_POSTS_DATA) {
    const { images, category_slug, tag, ...blogFields } = bData;
    const categoryId = categoryMap.get(category_slug) || null;

    const blog = await prisma.blog.upsert({
      where: { slug: blogFields.slug },
      update: {
        ...blogFields,
        category_id: categoryId,
        created_by: superAdmin.id,
        published_at: new Date(),
      },
      create: {
        ...blogFields,
        category_id: categoryId,
        created_by: superAdmin.id,
        published_at: new Date(),
      },
    });

    if (images && images.length > 0) {
      await prisma.blogImage.deleteMany({ where: { blog_id: blog.id } });
      for (let idx = 0; idx < images.length; idx++) {
        await prisma.blogImage.create({
          data: {
            blog_id: blog.id,
            image_url: images[idx].image_url,
            alt_text: images[idx].alt_text,
            is_featured: images[idx].is_featured,
            display_order: idx,
          },
        });
      }
    }
  }

  console.log("Database seeded successfully with all Hotels, Destinations, Itineraries, and Blogs!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
