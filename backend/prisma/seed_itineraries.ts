import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ITINERARIES_DATA = [
  {
    title: "Europe For All – Winter Highlights",
    name: "Europe For All – Winter Highlights",
    slug: "europe-for-all-winter-highlights",
    itinerary_code: "EUR-WIN-01",
    short_description: "Experience the magic of winter in Europe across four iconic countries: Switzerland, France, Belgium, and the Netherlands with premier stays, scenic rail, and historic landmarks.",
    overview: "Embark on an enchanting 8-day European winter holiday traveling through the snow-capped alpine vistas of Switzerland, the romantic illuminated avenues of Paris, the gilded gothic squares of Brussels, and the modern design capital of Eindhoven. Featuring first-class rail connections, handpicked 5-star accommodations, guided skip-the-line excursions, and festive gastronomic experiences.",
    region: "Europe",
    country: "Switzerland, France, Belgium, Netherlands",
    category: "INTERNATIONAL",
    duration: "7 Nights / 8 Days",
    tour_type: "Curated Winter Explorer",
    package_type: "Luxury Guided Journey",
    nights: 7,
    days: 8,
    min_travelers: 2,
    max_travelers: 16,
    price_from: 245000,
    price_currency: "INR",
    price_unit: "per person",
    best_time: "November to March",
    recommended_for: "Couples, Families, Winter Vacationers",
    route: "Zurich → Paris → Brussels → Eindhoven",
    hero_image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
    visa_info: "Schengen Visa required for Indian passport holders. Comprehensive visa guidance and document verification assistance provided by Luxe Yatra concierge.",
    booking_info: "Instant confirmation with 25% advance deposit. Balance payable 30 days prior to departure date. Flexible complimentary date modifications up to 21 days prior.",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    display_order: 1,
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop", alt_text: "Paris Eiffel Tower Winter Sunset", caption: "Eiffel Tower illuminated in winter twilight" },
      { image_url: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?q=80&w=1200&auto=format&fit=crop", alt_text: "Lucerne Chapel Bridge Switzerland", caption: "Historic Chapel Bridge over River Reuss in Lucerne" },
      { image_url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop", alt_text: "Zurich Old Town along the Limmat", caption: "Zurich Old Town and Lake Zurich skyline" },
      { image_url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop", alt_text: "Grand Place Brussels Belgium", caption: "Gilded architecture of Grand Place Brussels" },
      { image_url: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1200&auto=format&fit=crop", alt_text: "Amsterdam & Netherlands canals", caption: "Classic Dutch canal architecture and winter lights" }
    ],
    inclusions: [
      { title: "7 Nights Luxury Accommodations (4 & 5-Star Properties)", description: "Premium central hotels in Zurich, Paris, Brussels, and Eindhoven with daily breakfast." },
      { title: "High-Speed First Class Train Travel", description: "TGV Lyria Zurich to Paris and Eurostar Paris to Brussels in comfortable first class seating." },
      { title: "Skip-the-Line Monuments & Museum Access", description: "Priority admission to Eiffel Tower (2nd Level or Summit), Louvre exterior tour, and Atomium." },
      { title: "Romantic Evening Seine River Dinner Cruise", description: "3-course gourmet French dinner with wine while gliding past illuminated monuments." },
      { title: "Guided Orientation & City Tours", description: "Private local expert guides in Zurich, Lucerne, Paris, and Brussels." },
      { title: "Private Airport & Station Limousine Transfers", description: "Seamless door-to-door transfers in climate-controlled executive vehicles." },
      { title: "24/7 Dedicated Concierge Support", description: "Round-the-clock personalized travel support throughout your European vacation." }
    ],
    exclusions: [
      { title: "International Flights (Unless Selected)", description: "Long-haul flights to Zurich and from Amsterdam/Eindhoven unless flight package selected." },
      { title: "Schengen Visa Fee & Insurance", description: "Official embassy visa application charges and mandatory travel medical insurance." },
      { title: "Personal Expenses & Gratuities", description: "Beverages, phone calls, laundry, porterage, and customary driver/guide tips." },
      { title: "Optional Excursions", description: "Mt. Titlis cable car summit pass and Disneyland Paris one-day pass." }
    ],
    faqs: [
      { question: "What is the best time for this European winter tour?", answer: "This tour operates between November and March. November to December offers magical European Christmas markets and festive lights, while January to March offers crisp alpine snowy views." },
      { question: "How does luggage handling work between train journeys?", answer: "Our private chauffeured transfers pick you up from your hotel lobby and drop you directly at the train station platform, ensuring smooth transit." },
      { question: "Are vegetarian/halal meal options available throughout the trip?", answer: "Yes, all included dinners feature curated vegetarian and halal dining alternatives upon request." }
    ],
    attractions: [
      { name: "Eiffel Tower", description: "The iconic iron lady of Paris offering panoramic 360-degree vistas across the French capital.", image_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop" },
      { name: "Champs-Élysées & Arc de Triomphe", description: "The world's most prestigious boulevard crowned by Napoleon's triumphal arch.", image_url: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=1000&auto=format&fit=crop" },
      { name: "Grand Place Brussels", description: "UNESCO World Heritage central square renowned for opulent baroque guildhalls and the gothic Town Hall.", image_url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop" },
      { name: "Chapel Bridge Lucerne", description: "The historic 14th-century covered wooden footbridge spanning diagonally across the River Reuss.", image_url: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?q=80&w=1000&auto=format&fit=crop" },
      { name: "Lion Monument Lucerne", description: "A poignant rock relief commemorating the Swiss Guards carved into a former sandstone quarry.", image_url: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=1000&auto=format&fit=crop" }
    ],
    activities: [
      { name: "Seine River Twilight Cruise", description: "Gourmet multi-course dinner cruise with live acoustic music beneath illuminated bridges.", image_url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000&auto=format&fit=crop" },
      { name: "Artisanal Swiss Chocolate & Fondue Tasting", description: "Authentic culinary session tasting melted Swiss Gruyère and handcrafted Swiss pralines.", image_url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop" }
    ],
    days_data: [
      {
        day_number: 1,
        title: "Arrival in Zurich",
        location: "Zurich, Switzerland",
        description: "Touch down at Zurich Airport (ZRH). Meet your private chauffeur for an executive transfer to your luxury lakeside hotel. After check-in and settling in, take an afternoon stroll along the Bahnhofstrasse and Lake Zurich promenade. In the evening, gather for a welcome authentic Swiss cheese fondue dinner.",
        morning_activities: "Arrival at Zurich Airport (ZRH), VIP meet & greet service, private transfer to luxury hotel.",
        afternoon_activities: "Hotel check-in, orientation walk along world-renowned Bahnhofstrasse and Lake Zurich promenade.",
        evening_activities: "Welcome dinner featuring traditional Swiss Alpine fondue in the historic Lindenhof quarter.",
        meals: "Dinner (Welcome Swiss Specialty)",
        hotel: "Baur au Lac or Swissôtel Zürich (5-Star)",
        transport: "Private Chauffeur Airport Transfer",
        important_notes: "Check-in time is standard 3:00 PM. Early check-in requested subject to availability.",
        image_url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 2,
        title: "Zurich / Lucerne",
        location: "Lucerne & Central Switzerland",
        description: "Enjoy a hearty breakfast before departing on a scenic drive along Lake Lucerne. Embark on a guided walking orientation through Lucerne's charming Old Town, visiting the 14th-century Chapel Bridge and the poignant Lion Monument. Enjoy free time for Swiss watch shopping or an optional cable car ascent to Mt. Titlis.",
        morning_activities: "Buffet breakfast, scenic motorcoach journey through alpine foothills to Lucerne.",
        afternoon_activities: "Guided walking tour of Lucerne Old Town, Chapel Bridge, and Lion Monument; free leisure time for boutique shopping.",
        evening_activities: "Scenic drive back to Zurich, dinner at leisure overlooking Lake Zurich.",
        meals: "Breakfast",
        hotel: "Baur au Lac or Swissôtel Zürich (5-Star)",
        transport: "Private Luxury Coach",
        important_notes: "Comfortable walking shoes recommended for Lucerne's historic cobblestones.",
        image_url: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 3,
        title: "Zurich → Paris",
        location: "Zurich to Paris, France",
        description: "Board the high-speed TGV Lyria train in First Class, crossing the picturesque French countryside into the heart of Paris. Upon arrival at Gare de Lyon, transfer to your hotel. In the evening, dress in smart elegance for a romantic 3-course dinner cruise on the River Seine as the City of Light glows around you.",
        morning_activities: "Breakfast, transfer to Zurich Hauptbahnhof, first-class TGV train journey to Paris.",
        afternoon_activities: "Arrival in Paris, check-in at central luxury property, leisure afternoon on Boulevard Saint-Germain.",
        evening_activities: "Bateaux Parisiens luxury dinner cruise on the Seine with illuminated monument views.",
        meals: "Breakfast, Gourmet Dinner on Seine Cruise",
        hotel: "Hôtel Plaza Athénée or Le Dokhan's Paris (5-Star)",
        transport: "First Class TGV High-Speed Rail & Private Transfer",
        important_notes: "Smart casual dress code required for the Seine dinner cruise.",
        image_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 4,
        title: "Paris Sightseeing",
        location: "Paris, France",
        description: "Discover the legendary landmarks of Paris on a comprehensive city discovery. Ascend the Eiffel Tower for sweeping vistas over Paris, cruise down the glamorous Champs-Élysées, stop for photos at the Arc de Triomphe, and marvel at the glass pyramid of the Louvre Palace. Enjoy an evening at leisure.",
        morning_activities: "Priority access ascent of the Eiffel Tower, panoramic views of Montmartre and the Seine.",
        afternoon_activities: "Drive along the Champs-Élysées, photo stop at the Arc de Triomphe, walk through Tuileries Garden and Louvre Courtyard.",
        evening_activities: "Evening at leisure for dining at a classic Parisian bistro in Le Marais.",
        meals: "Breakfast",
        hotel: "Hôtel Plaza Athénée or Le Dokhan's Paris (5-Star)",
        transport: "Private Sightseeing Coach & Local Guide",
        important_notes: "Keep your passports handy for security checkpoints at major monuments.",
        image_url: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 5,
        title: "Paris → Brussels",
        location: "Paris to Brussels, Belgium",
        description: "Following a fresh croissant breakfast, take an express Eurostar train to Brussels, the capital of the European Union. Check into your hotel and proceed on a walking tour of the gilded Grand Place, one of the most beautiful squares in the world. Sample authentic Belgian waffles, chocolates, and craft brews.",
        morning_activities: "Breakfast at hotel, transfer to Paris Gare du Nord, express Eurostar to Brussels.",
        afternoon_activities: "Check-in at Brussels hotel, guided tour of Grand Place, Manneken Pis, and Royal Galleries of Saint-Hubert.",
        evening_activities: "Belgian chocolate tasting masterclass followed by dinner in Ilôt Sacré.",
        meals: "Breakfast",
        hotel: "Hotel Amigo Brussels (Rocco Forte) or Steigenberger Wiltcher's (5-Star)",
        transport: "Express Eurostar Rail & Private Transfer",
        important_notes: "Warm winter jackets recommended for evening walking tour in the square.",
        image_url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 6,
        title: "Brussels → Eindhoven",
        location: "Brussels, Belgium to Eindhoven, Netherlands",
        description: "Visit the futuristic Atomium monument and the King Baudouin Stadium in Brussels before crossing the scenic Dutch border into Eindhoven, the vibrant design and technology capital of the Netherlands. Check into your stylish boutique hotel and explore the creative Strijp-S industrial quarter.",
        morning_activities: "Breakfast, photo stop at Atomium and Park of Laeken, drive toward the Dutch border.",
        afternoon_activities: "Arrival in Eindhoven, check-in, visit the innovative Philips Museum and design districts.",
        evening_activities: "Dinner in the trendy industrial-chic Strijp-S dining quarter.",
        meals: "Breakfast, Dinner",
        hotel: "Inntel Hotels Art Eindhoven or Kazerne Design Hotel (4/5-Star)",
        transport: "Private Luxury Touring Coach",
        important_notes: "Currency is Euro (€) in both Belgium and Netherlands.",
        image_url: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 7,
        title: "Netherlands / Eindhoven",
        location: "Eindhoven & Brabant Region, Netherlands",
        description: "Immerse yourself in Dutch cultural roots with a visit to Nuenen, the historic Van Gogh Village where Vincent van Gogh produced his early masterpieces. Experience picturesque Dutch windmill landscapes and waterways, culminating in a festive farewell dinner celebrating the memories of your 4-nation European winter journey.",
        morning_activities: "Breakfast, guided excursion to Vincent van Gogh Heritage Village in Nuenen.",
        afternoon_activities: "Scenic drive through North Brabant's traditional canals and historic windmills; leisure shopping in Eindhoven centre.",
        evening_activities: "Festive farewell 3-course dinner with wine pairings at a top culinary venue.",
        meals: "Breakfast, Farewell Dinner",
        hotel: "Inntel Hotels Art Eindhoven or Kazerne Design Hotel (4/5-Star)",
        transport: "Private Touring Coach",
        important_notes: "Packing assistance provided by hotel concierge for next-day departures.",
        image_url: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 8,
        title: "Departure",
        location: "Eindhoven / Amsterdam to Home",
        description: "Enjoy your final European breakfast. Based on your flight timing, enjoy last-minute souvenir shopping for Dutch stroopwafels and souvenirs before your private chauffeur transfers you to Amsterdam Schiphol Airport (AMS) or Eindhoven Airport (EIN) for your homeward flight.",
        morning_activities: "Breakfast at hotel, checkout, last-minute souvenir shopping.",
        afternoon_activities: "Private executive transfer to airport, VAT tax refund processing assistance.",
        evening_activities: "Board international return flight with lifelong memories of your European winter journey.",
        meals: "Breakfast",
        hotel: "Departure",
        transport: "Private Executive Airport Transfer",
        important_notes: "Arrive at the airport 3 hours prior to international departure flights.",
        image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "Australian Highlights",
    name: "Australian Highlights",
    slug: "australian-highlights",
    itinerary_code: "AUS-HIG-02",
    short_description: "Discover the best of Australia from Sydney's iconic harbour and the misty Blue Mountains to the golden beaches of Gold Coast and Melbourne's arts and cafe culture.",
    overview: "A sensational 7-day luxury journey across Australia's eastern seaboard. Experience Sydney Opera House up close, cruise the world's most beautiful harbour, encounter kangaroos in the wild, soak up the sun on Surfers Paradise beaches, and wander Melbourne's vibrant laneways.",
    region: "Oceania",
    country: "Australia",
    category: "INTERNATIONAL",
    duration: "6 Nights / 7 Days",
    tour_type: "Iconic Coast & City",
    package_type: "Luxury Coastal Discovery",
    nights: 6,
    days: 7,
    min_travelers: 2,
    max_travelers: 14,
    price_from: 285000,
    price_currency: "INR",
    price_unit: "per person",
    best_time: "September to May",
    recommended_for: "Adventure Seekers, Nature Lovers, Luxury Travellers",
    route: "Sydney → Gold Coast → Melbourne",
    hero_image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop",
    visa_info: "Australian Subclass 600 Tourist Visa required. Fast-track biometric and documentation processing handled by Luxe Yatra.",
    booking_info: "Guaranteed departures with minimum 2 guests. 25% deposit at time of booking.",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    display_order: 2,
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop", alt_text: "Sydney Opera House and Harbour", caption: "Sydney Opera House under clear Australian skies" },
      { image_url: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?q=80&w=1200&auto=format&fit=crop", alt_text: "Sydney Harbour Bridge", caption: "Sydney Harbour Bridge viewed from Circular Quay" },
      { image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop", alt_text: "Gold Coast Surfers Paradise beach", caption: "Golden sand beaches of the Gold Coast" },
      { image_url: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?q=80&w=1200&auto=format&fit=crop", alt_text: "Melbourne Laneways and Street Art", caption: "Melbourne's iconic Hosier Lane street art" },
      { image_url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1200&auto=format&fit=crop", alt_text: "Blue Mountains Australia", caption: "The Three Sisters rock formation in the Blue Mountains" }
    ],
    inclusions: [
      { title: "6 Nights 5-Star Accommodations", description: "Premium harbour/ocean view rooms in Sydney, Gold Coast, and Melbourne." },
      { title: "Domestic Flights Included", description: "Sydney to Gold Coast and Gold Coast to Melbourne economy flights with 23kg checked baggage." },
      { title: "Sydney Harbour Sunset Yacht Cruise", description: "Catamaran sunset cruise with canapés, Australian wines, and Opera House views." },
      { title: "Blue Mountains Wilderness Discovery Tour", description: "Full-day private guided tour including Scenic World Unlimited Pass." },
      { title: "Currumbin Wildlife Sanctuary VIP Experience", description: "Close-up koala cuddle and kangaroo feeding experience with dedicated naturalist." },
      { title: "Melbourne Laneways & Coffee Culture Walk", description: "Curated walking tour through secret arcades, barista cafes, and street art galleries." }
    ],
    exclusions: [
      { title: "International Flights to/from Australia", description: "Long haul international sectors unless added as airline add-on." },
      { title: "Australia Visa Application Fee", description: "Official ETA / Visa fee." },
      { title: "Personal Expenses & Gratuities", description: "Incidentals, laundry, and alcoholic drinks outside specified events." }
    ],
    faqs: [
      { question: "Can we hold a koala in Gold Coast?", answer: "Yes! Queensland is one of the few Australian states where cuddling a koala is permitted, and our Currumbin Sanctuary pass includes this experience." },
      { question: "What is the baggage limit on Australian domestic flights?", answer: "23 kg checked baggage plus 7 kg hand luggage is included on all domestic sectors." }
    ],
    attractions: [
      { name: "Sydney Opera House", description: "UNESCO masterpiece of 20th-century architecture situated dramatically on Bennelong Point.", image_url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop" },
      { name: "Sydney Harbour Bridge", description: "The famous 'Coathanger' bridge linking Sydney CBD with the North Shore across Port Jackson.", image_url: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?q=80&w=1000&auto=format&fit=crop" },
      { name: "Blue Mountains & Three Sisters", description: "Ancient sandstone rock formation standing above the Jamison Valley covered in eucalyptus haze.", image_url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1000&auto=format&fit=crop" },
      { name: "Gold Coast Surfers Paradise", description: "Endless golden beaches, rolling Pacific surf, and vibrant coastal entertainment.", image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop" },
      { name: "Melbourne Laneways & Federation Square", description: "The cultural heart of Melbourne packed with coffee shops, hidden cocktail bars, and galleries.", image_url: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?q=80&w=1000&auto=format&fit=crop" }
    ],
    activities: [
      { name: "Sydney Harbour Sunset Sail", description: "Luxury catamaran cruise with champagne as the city skyline lights up.", image_url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop" },
      { name: "Scenic World Railway & Cableway", description: "Riding the world's steepest passenger railway down into ancient Jurassic rainforest.", image_url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1000&auto=format&fit=crop" }
    ],
    days_data: [
      {
        day_number: 1,
        title: "Arrival in Sydney",
        location: "Sydney, NSW, Australia",
        description: "G'day and welcome to Australia! Touch down at Sydney Kingsford Smith Airport (SYD), where your private driver will transfer you to your 5-star hotel in Circular Quay or Darling Harbour. Spend the afternoon relaxing or exploring the historic cobblestone precincts of The Rocks.",
        morning_activities: "Arrival at Sydney Airport, private executive transfer to hotel.",
        afternoon_activities: "Hotel check-in, leisurely stroll around Circular Quay and The Rocks heritage area.",
        evening_activities: "Welcome drinks and waterfront dinner overlooking Sydney Harbour.",
        meals: "Dinner (Welcome Waterfront Meal)",
        hotel: "Four Seasons Hotel Sydney or Park Hyatt Sydney (5-Star)",
        transport: "Private Executive Airport Transfer",
        important_notes: "Keep your Australian ETA/Visa copy handy during border clearance.",
        image_url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 2,
        title: "Sydney City & Harbour",
        location: "Sydney, Australia",
        description: "Embark on an unforgettable day in Sydney. Take an exclusive private insider tour of the Sydney Opera House sails and concert halls. Walk across the Sydney Harbour Bridge for breathtaking views. In the late afternoon, board a private luxury yacht for a 2-hour sunset sail across Port Jackson with fine Australian wines.",
        morning_activities: "Private guided tour inside the Sydney Opera House; walking tour across Sydney Harbour Bridge pedestrian walkway.",
        afternoon_activities: "Explore Mrs Macquarie's Chair viewpoint and Royal Botanic Garden; Bondi Beach photo stop.",
        evening_activities: "Exclusive 2-hour sunset harbour yacht cruise with gourmet canapés and sparkling wine.",
        meals: "Breakfast, Evening Canapés on Cruise",
        hotel: "Four Seasons Hotel Sydney (5-Star)",
        transport: "Private Touring Vehicle & Luxury Yacht",
        important_notes: "Sunscreen and hats recommended for outdoor harbour activities.",
        image_url: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 3,
        title: "Blue Mountains",
        location: "Blue Mountains National Park, NSW",
        description: "Travel west into the UNESCO World Heritage-listed Blue Mountains. Marvel at the dramatic Jamison Valley and the iconic Three Sisters rock formation at Echo Point. Experience the thrilling Scenic Railway, Skyway, and Cableway at Scenic World, followed by lunch in the quaint mountain village of Leura.",
        morning_activities: "Scenic drive to Blue Mountains, viewpoint stop at Echo Point overlooking the Three Sisters.",
        afternoon_activities: "Scenic World adventure (Railway, Skyway, Cableway) and rainforest boardwalk; boutique tea in Leura village.",
        evening_activities: "Return to Sydney in early evening; dinner at leisure in Darling Harbour.",
        meals: "Breakfast, Gourmet Lunch",
        hotel: "Four Seasons Hotel Sydney (5-Star)",
        transport: "Private Touring Coach",
        important_notes: "Mountain temperatures can be 5-10°C cooler than Sydney CBD; carry a light jacket.",
        image_url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 4,
        title: "Sydney → Gold Coast",
        location: "Sydney to Gold Coast, Queensland",
        description: "After breakfast, transfer to Sydney Airport for your short flight north to the sub-tropical Gold Coast. Check into your luxury beachfront resort in Surfers Paradise. Spend a glorious afternoon sunbathing, walking the golden sandy beaches, or shopping in Broadbeach.",
        morning_activities: "Breakfast at hotel, private transfer to Sydney Airport, domestic flight to Gold Coast (OOL).",
        afternoon_activities: "Arrival in Gold Coast, transfer to beachfront resort, afternoon relaxation by the ocean.",
        evening_activities: "Sunset cocktail and oceanfront dinner at the legendary Burleigh Pavilion.",
        meals: "Breakfast",
        hotel: "The Langham Gold Coast or JW Marriott Gold Coast Resort & Spa (5-Star)",
        transport: "Domestic Flight & Private Transfers",
        important_notes: "Gold Coast operates on Australian Eastern Standard Time (AEST).",
        image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 5,
        title: "Gold Coast",
        location: "Gold Coast & Hinterland, Queensland",
        description: "Immerse yourself in Australian native wildlife at the Currumbin Wildlife Sanctuary. Enjoy hands-on experiences feeding friendly kangaroos, meeting koalas, and witnessing wild lorikeet feedings. Later, ascend the Skypoint Observation Deck for 360-degree panoramic views of the glittering coastline.",
        morning_activities: "Currumbin Wildlife Sanctuary VIP entry, koala encounter, and kangaroo feeding.",
        afternoon_activities: "Ascent to SkyPoint Observation Deck (Level 77 of Q1 building) for coastal views; beachfront shopping.",
        evening_activities: "Seafood dinner at Marina Mirage overlooking luxury superyachts.",
        meals: "Breakfast",
        hotel: "The Langham Gold Coast (5-Star)",
        transport: "Private Luxury Vehicle",
        important_notes: "Bring cameras and comfortable shoes for wildlife sanctuary trails.",
        image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 6,
        title: "Gold Coast → Melbourne",
        location: "Gold Coast to Melbourne, Victoria",
        description: "Fly south to Melbourne, Australia's arts, fashion, and culinary capital. Check into your hotel in the city center. Set out on an insider walking tour through Melbourne's world-famous graffiti-adorned laneways, hidden arcade cafes, and grand Victorian architecture.",
        morning_activities: "Breakfast, private transfer to Gold Coast Airport, flight to Melbourne (MEL).",
        afternoon_activities: "Arrival in Melbourne, check-in, guided walking tour of Degraves Street, Centre Place, and Hosier Lane.",
        evening_activities: "Dinner along the illuminated Yarra River at Southbank.",
        meals: "Breakfast, Dinner",
        hotel: "The Ritz-Carlton Melbourne or Crown Towers Melbourne (5-Star)",
        transport: "Domestic Flight & Private Transfers",
        important_notes: "Melbourne is famous for 'four seasons in one day' weather; carry layers.",
        image_url: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 7,
        title: "Departure",
        location: "Melbourne to Home",
        description: "Savor Melbourne's celebrated artisan coffee culture with breakfast at a top specialty cafe. Complete any last-minute shopping at Collins Street designer boutiques before your private transfer to Melbourne Tullamarine Airport (MEL) for your flight home.",
        morning_activities: "Breakfast, barista specialty coffee tasting, leisure walk around Federation Square.",
        afternoon_activities: "Private limousine transfer to Melbourne Tullamarine Airport for departure.",
        evening_activities: "Board international flight homeward.",
        meals: "Breakfast",
        hotel: "Departure",
        transport: "Private Airport Limousine",
        important_notes: "Ensure all duty-free purchases are securely packed with receipts for airport TRS refunds.",
        image_url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "Japan Discovery – Tokyo, Kyoto & Osaka",
    name: "Japan Discovery – Tokyo, Kyoto & Osaka",
    slug: "japan-discovery-tokyo-kyoto-osaka",
    itinerary_code: "JPN-DIS-03",
    short_description: "Immerse yourself in the timeless harmony of ancient traditions and ultra-modern innovation across Tokyo, Mt. Fuji, Kyoto, and Osaka with Shinkansen bullet train journeys and 5-star stays.",
    overview: "Embark on an extraordinary 7-day voyage through Japan's Golden Route. Experience Tokyo's dazzling neon districts and sacred shrines, gaze upon sacred Mount Fuji, ride the bullet train in first class, wander through Kyoto's bamboo groves and thousands of vermilion torii gates, and indulge in Osaka's famed culinary wonderland.",
    region: "Asia",
    country: "Japan",
    category: "INTERNATIONAL",
    duration: "6 Nights / 7 Days",
    tour_type: "Heritage & Modern Marvels",
    package_type: "Bespoke Cultural Experience",
    nights: 6,
    days: 7,
    min_travelers: 2,
    max_travelers: 12,
    price_from: 310000,
    price_currency: "INR",
    price_unit: "per person",
    best_time: "March to May & October to December",
    recommended_for: "Culture Enthusiasts, Food Connoisseurs, Explorers",
    route: "Tokyo → Kyoto → Osaka",
    hero_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop",
    visa_info: "Japan e-Visa or Single/Multiple Entry Tourist Visa required. Fast-track concierge visa processing by Luxe Yatra.",
    booking_info: "Deposit of 30% required. Complimentary cancellations up to 30 days prior to departure.",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    display_order: 3,
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop", alt_text: "Kyoto Fushimi Inari Shrine Torii Gates", caption: "Endless vermilion torii gates at Fushimi Inari" },
      { image_url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop", alt_text: "Tokyo Tower and Cityscape", caption: "Tokyo illuminated at night with Tokyo Tower" },
      { image_url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=1200&auto=format&fit=crop", alt_text: "Mount Fuji and Chureito Pagoda", caption: "Iconic view of Mt. Fuji with snowcap" },
      { image_url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop", alt_text: "Arashiyama Bamboo Grove Kyoto", caption: "Towering bamboo grove in Arashiyama, Kyoto" },
      { image_url: "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1200&auto=format&fit=crop", alt_text: "Dotonbori Canal Osaka", caption: "Vibrant neon reflections in Osaka's Dotonbori" }
    ],
    inclusions: [
      { title: "6 Nights Luxury & Ryokan Stays", description: "5-star luxury hotels in Tokyo and Osaka, plus authentic premium Onsen Ryokan experience in Kyoto." },
      { title: "Shinkansen Green Car (First Class) Bullet Train", description: "Tokyo to Kyoto high-speed train tickets with reserved luxury seating and luggage service." },
      { title: "Private Mt. Fuji & Hakone Excursion", description: "Private car, Lake Kawaguchiko cruise, and panoramic cable car." },
      { title: "Exclusive Traditional Tea Ceremony & Kimono Experience", description: "Private cultural masterclass with a tea master in a historic Kyoto teahouse." },
      { title: "Private English-Speaking Certified Guides", description: "Dedicated cultural guides in Tokyo, Kyoto, and Osaka." },
      { title: "Airport VIP Greeter & Chauffeured Transfers", description: "Door-to-door luxury transfers at Haneda/Narita and Kansai Airport." }
    ],
    exclusions: [
      { title: "International Flights to/from Japan", description: "Long haul flight tickets unless requested." },
      { title: "Japan Visa Application Fees", description: "Official consulate visa processing charges." },
      { title: "Personal Gratuities & Porterage", description: "Personal shopping and optional experiences." }
    ],
    faqs: [
      { question: "Is Japanese luggage forwarding (Takkyubin) included?", answer: "Yes, we forward your large suitcases directly from your Tokyo hotel to your Osaka/Kyoto hotel so you can travel hands-free on the Shinkansen." },
      { question: "Can dietary requirements like vegetarian or no pork/seafood be accommodated?", answer: "Yes, our team arranges customized vegetarian, halal, and allergen-free meals at all included dining spots." }
    ],
    attractions: [
      { name: "Shibuya Crossing & Meiji Shrine", description: "The world's busiest pedestrian intersection juxtaposed with Tokyo's most sacred Shinto forest shrine.", image_url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop" },
      { name: "Senso-ji Temple & Asakusa", description: "Tokyo's oldest and most significant Buddhist temple, fronted by the historic Nakamise market street.", image_url: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1000&auto=format&fit=crop" },
      { name: "Mount Fuji & Lake Kawaguchiko", description: "Japan's sacred 3,776-meter volcanic peak reflected on pristine alpine waters.", image_url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=1000&auto=format&fit=crop" },
      { name: "Fushimi Inari Shrine & Arashiyama", description: "Thousands of brilliant orange-red torii gates climbing Mt. Inari and the enchanting bamboo grove.", image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop" },
      { name: "Osaka Castle & Dotonbori", description: "Magnificent 16th-century fortress surrounded by stone moats and the lively culinary canal street.", image_url: "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1000&auto=format&fit=crop" }
    ],
    activities: [
      { name: "Traditional Kyoto Tea Ceremony", description: "Private Zen tea ceremony in a centuries-old garden teahouse.", image_url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1000&auto=format&fit=crop" },
      { name: "Shinkansen Bullet Train Experience", description: "Gliding across the Japanese countryside at 320 km/h in Green Car comfort.", image_url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop" }
    ],
    days_data: [
      {
        day_number: 1,
        title: "Arrival in Tokyo",
        location: "Tokyo, Japan",
        description: "Konnichiwa! Arrive at Tokyo Haneda or Narita Airport where your VIP greeter and private chauffeur welcome you. Transfer to your 5-star hotel overlooking the Tokyo skyline. Spend your evening resting or enjoying a craft cocktail while gazing at the neon lights of Shinjuku or Ginza.",
        morning_activities: "Arrival at Haneda (HND) or Narita (NRT) Airport, VIP meet & greet, private limousine transfer.",
        afternoon_activities: "Check-in at luxury hotel, unpack and relax, orientation walk through Ginza or Shinjuku.",
        evening_activities: "Welcome dinner featuring Japanese Kaiseki or Teppanyaki cuisine.",
        meals: "Dinner (Welcome Kaiseki Dinner)",
        hotel: "The Peninsula Tokyo or Aman Tokyo (5-Star)",
        transport: "Private Limousine Airport Transfer",
        important_notes: "Cash is still widely used in Japan; carry Japanese Yen (JPY) for local stalls.",
        image_url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 2,
        title: "Modern Tokyo",
        location: "Tokyo, Japan",
        description: "Experience the thrilling duality of Tokyo. Begin in Asakusa at Senso-ji, Tokyo's oldest temple, and browse traditional sweets along Nakamise Dori. Cross over to modern Harajuku, visit the tranquil Meiji Shinto Shrine set inside an ancient cedar forest, and stand in awe at the bustling Shibuya Crossing.",
        morning_activities: "Visit Senso-ji Temple and Nakamise-dori shopping street in Asakusa.",
        afternoon_activities: "Guided walk through Meiji Shrine, Takeshita Street in Harajuku, and Shibuya Crossing with Hachiko Statue.",
        evening_activities: "Visit Shibuya Sky observation deck for sunset views, dinner in Roppongi Hills.",
        meals: "Breakfast, Lunch",
        hotel: "The Peninsula Tokyo (5-Star)",
        transport: "Private Luxury Van & Local Guide",
        important_notes: "Modest attire respectful of shrines is recommended.",
        image_url: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 3,
        title: "Mt. Fuji Experience",
        location: "Mount Fuji & Hakone / Kawaguchiko",
        description: "Journey by private vehicle to the Fuji-Five-Lakes region. Marvel at the snow-capped peak of Mount Fuji from the 5th Station (weather permitting) or Lake Kawaguchiko. Cruise on the calm waters of the lake, visit the postcard-perfect Oshino Hakkai spring village, and return to Tokyo by late evening.",
        morning_activities: "Scenic private drive to Mount Fuji 5th Station (2,300m elevation) for panoramic mountain vistas.",
        afternoon_activities: "Sightseeing boat cruise on Lake Kawaguchiko; visit the thatched cottages and crystal springs of Oshino Hakkai.",
        evening_activities: "Return drive to Tokyo; evening at leisure.",
        meals: "Breakfast, Japanese Set Lunch",
        hotel: "The Peninsula Tokyo (5-Star)",
        transport: "Private Touring Vehicle",
        important_notes: "Mt. Fuji visibility depends on weather conditions; clear mornings offer the best views.",
        image_url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 4,
        title: "Tokyo → Kyoto",
        location: "Tokyo to Kyoto, Japan",
        description: "Board the world-famous Shinkansen (Bullet Train) in Green Car (First Class) speed toward Kyoto, Japan's ancient imperial capital. Upon arrival, check into your luxury hotel or traditional Ryokan. In the late afternoon, take a guided twilight stroll through Gion, Kyoto's historic geisha entertainment quarter.",
        morning_activities: "Breakfast, transfer to Tokyo Station, board Shinkansen Bullet Train to Kyoto (approx. 2h 15m).",
        afternoon_activities: "Arrival in Kyoto, check-in, visit Kiyomizu-dera wooden temple overlooking the city hillside.",
        evening_activities: "Guided walking tour through the lantern-lit alleys of Gion and Pontocho Alley.",
        meals: "Breakfast",
        hotel: "The Ritz-Carlton Kyoto or Four Seasons Hotel Kyoto (5-Star)",
        transport: "Shinkansen Green Car & Private Transfers",
        important_notes: "Luggage forwarding service delivers main bags directly from Tokyo to Kyoto.",
        image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 5,
        title: "Kyoto Heritage",
        location: "Kyoto, Japan",
        description: "Immerse yourself in Kyoto's spiritual heart. Early in the morning, hike through thousands of vermilion Torii gates at Fushimi Inari Taisha. Visit Kinkaku-ji (the shimmering Golden Pavilion) and wander beneath the soaring stalks of the Arashiyama Bamboo Grove. Conclude with a private Japanese tea ceremony.",
        morning_activities: "Fushimi Inari Shrine torii gate walk; visit the gold-leaf covered Kinkaku-ji (Golden Pavilion).",
        afternoon_activities: "Walk through Arashiyama Bamboo Grove, visit UNESCO Tenryu-ji Zen garden, and cross Togetsukyo Bridge.",
        evening_activities: "Private authentic Japanese Matcha Tea Ceremony with a certified tea master.",
        meals: "Breakfast, Traditional Kyoto Lunch",
        hotel: "The Ritz-Carlton Kyoto (5-Star)",
        transport: "Private Touring Vehicle & Expert Guide",
        important_notes: "Early departure allows avoiding peak crowds at Fushimi Inari.",
        image_url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 6,
        title: "Kyoto → Osaka",
        location: "Kyoto to Osaka, Japan",
        description: "Transfer from Kyoto to the energetic metropolis of Osaka, known as 'Japan's Kitchen'. Tour the formidable Osaka Castle and its sprawling stone ramparts. In the evening, explore the vibrant neon spectacle of Dotonbori, tasting local street delicacies such as Takoyaki and Okonomiyaki.",
        morning_activities: "Breakfast, private drive from Kyoto to Osaka, tour historic Osaka Castle and museum.",
        afternoon_activities: "Explore Umeda Sky Building floating garden observatory; check-in at Osaka luxury hotel.",
        evening_activities: "Guided culinary street-food tour through Dotonbori, photo stop with Glico Running Man sign.",
        meals: "Breakfast, Farewell Dinner in Dotonbori",
        hotel: "Conrad Osaka or The St. Regis Osaka (5-Star)",
        transport: "Private Touring Vehicle",
        important_notes: "Leave room for sampling Osaka's diverse street culinary specialties.",
        image_url: "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 7,
        title: "Departure",
        location: "Osaka to Home",
        description: "Enjoy breakfast overlooking the Osaka skyline. Complete any last-minute Japanese gift shopping at Shinsaibashi before your private chauffeur transfers you to Kansai International Airport (KIX) or Itami Airport (ITM) for your journey home.",
        morning_activities: "Breakfast, leisure time for Japanese confectionery and cosmetics shopping.",
        afternoon_activities: "Private limousine transfer to Kansai International Airport (KIX).",
        evening_activities: "Board return flight with unforgettable memories of Japan.",
        meals: "Breakfast",
        hotel: "Departure",
        transport: "Private Limousine Airport Transfer",
        important_notes: "Duty-free pickup available past security at Kansai Airport.",
        image_url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "Vietnam Highlights",
    name: "Vietnam Highlights",
    slug: "vietnam-highlights",
    itinerary_code: "VNM-HIG-04",
    short_description: "Discover the captivating culture, emerald karst waters, ancient lantern-lit towns, and vibrant southern energy of Vietnam from Hanoi to Ha Long Bay, Hoi An, and Ho Chi Minh City.",
    overview: "A rich 7-day journey showcasing the cultural soul and natural wonders of Vietnam. Cruise through the mythical limestone karsts of Ha Long Bay aboard an ultra-luxury boutique vessel, walk through the UNESCO lantern-lit alleys of Hoi An Ancient Town, and explore the dynamic metropolis of Saigon.",
    region: "Southeast Asia",
    country: "Vietnam",
    category: "INTERNATIONAL",
    duration: "6 Nights / 7 Days",
    tour_type: "Heritage & Tropical Wonder",
    package_type: "Signature Cruise & Culture",
    nights: 6,
    days: 7,
    min_travelers: 2,
    max_travelers: 14,
    price_from: 165000,
    price_currency: "INR",
    price_unit: "per person",
    best_time: "October to April",
    recommended_for: "Couples, Heritage Lovers, Foodies",
    route: "Hanoi → Ha Long Bay → Da Nang/Hoi An → Ho Chi Minh City",
    hero_image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1600&auto=format&fit=crop",
    visa_info: "Vietnam e-Visa required. Online visa processing assistance provided seamlessly by Luxe Yatra.",
    booking_info: "Guaranteed departures with minimum 2 guests. 25% deposit required.",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    display_order: 4,
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop", alt_text: "Ha Long Bay Emerald Waters and Karsts", caption: "Limestone karsts of Ha Long Bay at sunrise" },
      { image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop", alt_text: "Hoi An Lanterns at Night", caption: "Lantern-lit streets of Hoi An Ancient Town" },
      { image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop", alt_text: "Hanoi Hoan Kiem Lake Pagoda", caption: "Ngoc Son Temple on Hoan Kiem Lake, Hanoi" },
      { image_url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop", alt_text: "Ho Chi Minh City Skyline", caption: "Saigon skyline illuminated along the river" },
      { image_url: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop", alt_text: "Da Nang Golden Bridge", caption: "The iconic Golden Bridge held by stone hands in Da Nang" }
    ],
    inclusions: [
      { title: "5-Star Hotels & Luxury Cruise Suite", description: "Colonial luxury hotels in Hanoi, Hoi An, and Saigon, plus private balcony suite on Ha Long Bay cruise." },
      { title: "Domestic Airfares Included", description: "Hanoi to Da Nang and Da Nang to Ho Chi Minh City flights with baggage." },
      { title: "Overnight 5-Star Ha Long Bay Cruise", description: "Full board dining, kayaking, cave exploration, and Tai Chi on the sundeck." },
      { title: "Hoi An Lantern-Making & Cooking Class", description: "Hands-on Vietnamese culinary experience and silk lantern crafting workshop." },
      { title: "Private Chauffeured Sightseeing & Transfers", description: "All transfers in executive air-conditioned vehicles with private English guides." }
    ],
    exclusions: [
      { title: "International Flights to Hanoi / from Saigon", description: "International flight tickets unless chosen." },
      { title: "Vietnam Visa Processing Fee", description: "Direct government e-visa fee ($25 USD)." },
      { title: "Personal Laundry, Tips & Beverages", description: "Personal spending during leisure time." }
    ],
    faqs: [
      { question: "What is included on the Ha Long Bay overnight cruise?", answer: "All gourmet meals (lunch, dinner, breakfast, brunch), private suite with ocean-view balcony, kayaking, cooking demo, and cave visits." },
      { question: "Is vegetarian food easy to find in Vietnam?", answer: "Yes, Vietnamese cuisine features wonderful vegetarian (Chay) options utilizing fresh herbs, tofu, and rice noodles." }
    ],
    attractions: [
      { name: "Hoan Kiem Lake & Old Quarter", description: "The historic heart of Hanoi featuring 36 artisan streets and the serene Turtle Tower.", image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop" },
      { name: "Ha Long Bay Karsts", description: "UNESCO World Heritage wonderland of thousands of emerald limestone islands rising from the sea.", image_url: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop" },
      { name: "Hoi An Ancient Town & Covered Bridge", description: "Preserved 15th to 19th-century trading port famous for wooden shophouses and Japanese covered bridge.", image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop" },
      { name: "Da Nang Dragon Bridge", description: "Spectacular 666-meter bridge designed in the shape of a golden dragon breathing fire on weekends.", image_url: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop" },
      { name: "War Remnants Museum & Saigon Opera House", description: "Historical and colonial landmarks showcasing Vietnam's profound 20th-century history.", image_url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1000&auto=format&fit=crop" }
    ],
    activities: [
      { name: "Ha Long Bay Kayaking & Cave Visit", description: "Paddling through hidden lagoons and limestone arches into Sung Sot (Surprise) Cave.", image_url: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop" },
      { name: "Hoi An Evening Flower Lantern Release", description: "Floating paper lanterns on the Thu Bon River for good fortune and blessings.", image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop" }
    ],
    days_data: [
      {
        day_number: 1,
        title: "Arrival in Hanoi",
        location: "Hanoi, Vietnam",
        description: "Xin chào! Arrive at Hanoi Noi Bai International Airport (HAN). Transfer in a private limousine to your French colonial luxury hotel in the heart of Hanoi. Enjoy an afternoon cyclo ride through the 36 ancient guild streets of the Old Quarter followed by a traditional Water Puppet theater performance.",
        morning_activities: "VIP airport meet & greet, private limousine transfer to French Quarter hotel.",
        afternoon_activities: "Hotel check-in, 1-hour traditional Cyclo ride around Hoan Kiem Lake and the Old Quarter.",
        evening_activities: "Watch the famous Thang Long Water Puppet show, followed by a welcome Vietnamese feast.",
        meals: "Dinner (Welcome Vietnamese Banquet)",
        hotel: "Sofitel Legend Metropole Hanoi or Capella Hanoi (5-Star)",
        transport: "Private Limousine Airport Transfer",
        important_notes: "Local currency is Vietnamese Dong (VND); USD is also widely accepted.",
        image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 2,
        title: "Hanoi Heritage",
        location: "Hanoi, Vietnam",
        description: "Explore the 1,000-year-old heritage of Hanoi. Visit the Temple of Literature (Vietnam's first university founded in 1070), the Ho Chi Minh Mausoleum complex, and the historic One Pillar Pagoda. In the afternoon, sample authentic Vietnamese egg coffee in a hidden courtyard cafe.",
        morning_activities: "Visit the Temple of Literature, Ho Chi Minh Mausoleum complex, and presidential palace grounds.",
        afternoon_activities: "Visit One Pillar Pagoda and Tran Quoc Pagoda on West Lake; artisan coffee tasting.",
        evening_activities: "Evening at leisure for exploring Hanoi's night market and street cafes.",
        meals: "Breakfast, Lunch",
        hotel: "Sofitel Legend Metropole Hanoi (5-Star)",
        transport: "Private Touring Vehicle & Expert Guide",
        important_notes: "Dress respectfully with shoulders and knees covered for temple visits.",
        image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 3,
        title: "Ha Long Bay",
        location: "Ha Long Bay, Vietnam",
        description: "Journey by luxury limousine coach to Ha Long Bay. Board an ultra-luxury boutique cruise vessel and settle into your ocean-view balcony suite. Sail through thousands of dramatic limestone pillars, kayak into hidden sea caves, and enjoy sunset cocktails on the sundeck followed by a multi-course seafood dinner.",
        morning_activities: "Limousine highway transfer from Hanoi to Tuan Chau Marina, Ha Long Bay.",
        afternoon_activities: "Boarding, welcome drink, gourmet lunch while sailing into the bay; kayaking in Luon Cave.",
        evening_activities: "Sunset cocktail masterclass, 5-course gala dinner, squid fishing under the stars.",
        meals: "Breakfast, Lunch, Dinner (Full Board on Cruise)",
        hotel: "Paradise Elegance Cruise or Orchid Cruise (5-Star Luxury Vessel)",
        transport: "Luxury Limousine Coach & Cruise Vessel",
        important_notes: "Pack an overnight bag for the cruise; main luggage can be stored securely.",
        image_url: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 4,
        title: "Central Vietnam / Da Nang / Hoi An",
        location: "Ha Long Bay to Da Nang & Hoi An",
        description: "Greet the morning with sunrise Tai Chi on the top deck. Explore Sung Sot (Surprise) Cave before enjoying a hearty brunch as the ship cruises back to port. Transfer to Hanoi airport for your flight to Da Nang. On arrival, take a short coastal drive to the magical lantern town of Hoi An.",
        morning_activities: "Sunrise Tai Chi session on sundeck, visit Sung Sot Cave, farewell brunch cruise.",
        afternoon_activities: "Disembarkation, transfer to Hanoi Airport, domestic flight to Da Nang (DAD), transfer to Hoi An resort.",
        evening_activities: "Check-in at riverside luxury resort; evening walk through glowing lantern-lit streets.",
        meals: "Brunch on Cruise",
        hotel: "Anantara Hoi An Resort or Four Seasons Resort The Nam Hai (5-Star)",
        transport: "Domestic Flight & Private Transfers",
        important_notes: "Hoi An pedestrian streets are illuminated by silk lanterns every evening.",
        image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 5,
        title: "Hoi An",
        location: "Hoi An Ancient Town, Vietnam",
        description: "Discover the UNESCO-listed Hoi An Ancient Town on a guided walking tour. Visit the Japanese Covered Bridge, Chinese Assembly Halls, and 200-year-old merchant houses. Participate in a traditional silk lantern-making workshop and take an evening boat ride releasing floating candle lanterns on the river.",
        morning_activities: "Guided walking tour of Hoi An Ancient Town, Japanese Covered Bridge, and Tan Ky Old House.",
        afternoon_activities: "Hands-on lantern-making workshop with a local artisan; tailoring and silk shopping.",
        evening_activities: "Private wooden boat cruise on Thu Bon River releasing floating flower lanterns for good luck.",
        meals: "Breakfast, Lunch",
        hotel: "Anantara Hoi An Resort (5-Star)",
        transport: "Walking Tour & Private Riverboat",
        important_notes: "Hoi An is world-famous for custom 24-hour bespoke tailoring.",
        image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 6,
        title: "Ho Chi Minh City",
        location: "Hoi An to Ho Chi Minh City (Saigon)",
        description: "Transfer to Da Nang Airport for your flight to Ho Chi Minh City (Saigon). Check into your downtown luxury hotel. Explore the War Remnants Museum, the French colonial Notre Dame Cathedral Basilica, the historic Central Post Office designed by Gustave Eiffel, and Ben Thanh Market.",
        morning_activities: "Breakfast, transfer to Da Nang Airport, domestic flight to Ho Chi Minh City (SGN).",
        afternoon_activities: "City tour visiting War Remnants Museum, Reunification Palace, Central Post Office, and Opera House.",
        evening_activities: "Farewell rooftop dinner overlooking the sparkling Saigon skyline.",
        meals: "Breakfast, Farewell Dinner",
        hotel: "The Reverie Saigon or Park Hyatt Saigon (5-Star)",
        transport: "Domestic Flight & Private Transfers",
        important_notes: "Keep valuables close when browsing bustling local markets.",
        image_url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 7,
        title: "Departure",
        location: "Ho Chi Minh City to Home",
        description: "Enjoy a leisurely morning breakfast. Savor a final cup of traditional Vietnamese iced coffee (Ca Phe Sua Da) before your private chauffeur transfers you to Tan Son Nhat International Airport (SGN) for your homeward flight.",
        morning_activities: "Breakfast, last-minute shopping for Vietnamese coffee, ceramics, and silk.",
        afternoon_activities: "Private limousine transfer to Tan Son Nhat Airport.",
        evening_activities: "Board international return flight.",
        meals: "Breakfast",
        hotel: "Departure",
        transport: "Private Limousine Airport Transfer",
        important_notes: "Check terminal info carefully as international and domestic terminals are separate.",
        image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "New Zealand Scenic Escape",
    name: "New Zealand Scenic Escape",
    slug: "new-zealand-scenic-escape",
    itinerary_code: "NZL-SCE-05",
    short_description: "Immerse yourself in Middle-earth landscapes, majestic fjords, geothermal wonders, and alpine grandeur across Auckland, Rotorua, Queenstown, and Milford Sound.",
    overview: "An unforgettable 8-day luxury exploration across New Zealand's North and South Islands. Witness geothermal geysers in Rotorua, fly over snowy alpine peaks into Queenstown, cruise beneath the cascading waterfalls of Milford Sound, and experience world-class Kiwi hospitality.",
    region: "Oceania",
    country: "New Zealand",
    category: "INTERNATIONAL",
    duration: "7 Nights / 8 Days",
    tour_type: "Fjords & Alpine Wonder",
    package_type: "Luxury Wilderness Expedition",
    nights: 7,
    days: 8,
    min_travelers: 2,
    max_travelers: 12,
    price_from: 340000,
    price_currency: "INR",
    price_unit: "per person",
    best_time: "October to April",
    recommended_for: "Adventure Seekers, Nature Lovers, Photographers",
    route: "Auckland → Rotorua → Queenstown → Milford Sound",
    hero_image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1600&auto=format&fit=crop",
    visa_info: "New Zealand NZeTA or Visitor Visa required. Full document assistance and advisory provided.",
    booking_info: "Guaranteed departures with minimum 2 guests. 25% deposit at time of booking.",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    display_order: 5,
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200&auto=format&fit=crop", alt_text: "Milford Sound Mitre Peak New Zealand", caption: "Towering Mitre Peak reflected in Milford Sound" },
      { image_url: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?q=80&w=1200&auto=format&fit=crop", alt_text: "Queenstown Lake Wakatipu and Remarkables", caption: "Queenstown nestled on Lake Wakatipu" },
      { image_url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?q=80&w=1200&auto=format&fit=crop", alt_text: "Auckland Harbour Bridge and Skyline", caption: "Auckland city skyline and Sky Tower" },
      { image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop", alt_text: "Rotorua Geothermal Springs", caption: "Geothermal activity and colorful mineral pools in Rotorua" },
      { image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop", alt_text: "Arrowtown Autumn Scenery", caption: "Historic gold-mining settlement of Arrowtown" }
    ],
    inclusions: [
      { title: "7 Nights 5-Star Luxury Accommodations", description: "Waterfront and alpine lodge rooms in Auckland, Rotorua, and Queenstown." },
      { title: "Domestic North to South Island Flight", description: "Rotorua to Queenstown domestic flight with baggage." },
      { title: "Milford Sound Nature Cruise & Fiordland Coach", description: "Glass-roof luxury coach journey and nature catamaran cruise with gourmet buffet." },
      { title: "Te Puia Maori Cultural & Geothermal Tour", description: "Traditional Haka performance, geothermal geysers, and kiwi bird sanctuary." },
      { title: "Skyline Gondola & Dinner in Queenstown", description: "Gondola ride and panoramic buffet dinner atop Bob's Peak." }
    ],
    exclusions: [
      { title: "International Flights to New Zealand", description: "Long haul international sectors." },
      { title: "NZeTA / Visa Processing Fee", description: "Official New Zealand government electronic visa." },
      { title: "Extreme Adventure Add-ons", description: "Optional bungy jumping, skydiving, or helicopter glacier landings." }
    ],
    faqs: [
      { question: "How long is the Milford Sound excursion from Queenstown?", answer: "The full-day trip takes approximately 12 hours round-trip via a luxury glass-roof touring coach through Fiordland National Park with numerous scenic stops." }
    ],
    attractions: [
      { name: "Sky Tower & Auckland Harbour", description: "Auckland's 328-meter observation needle and the 'City of Sails' vibrant harbour.", image_url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?q=80&w=1000&auto=format&fit=crop" },
      { name: "Rotorua Te Puia Geothermal Valley", description: "Steaming fumaroles, boiling mud pools, and the famous 30-meter Pohutu Geyser.", image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop" },
      { name: "Milford Sound & Mitre Peak", description: "Dubbed the 'Eighth Wonder of the World' by Rudyard Kipling, carved by ancient glaciers.", image_url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1000&auto=format&fit=crop" },
      { name: "Lake Wakatipu & Queenstown Skyline", description: "Lightning bolt-shaped glacial lake framed by the dramatic Remarkables mountain range.", image_url: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?q=80&w=1000&auto=format&fit=crop" },
      { name: "Arrowtown Historic Village", description: "Charming preserved 1860s gold-rush settlement lined with heritage trees and stone cottages.", image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop" }
    ],
    activities: [
      { name: "Milford Sound Catamaran Cruise", description: "Cruising right beside Stirling Falls and watching fur seals bask on glacial rocks.", image_url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1000&auto=format&fit=crop" },
      { name: "Queenstown Skyline Gondola & Luge", description: "Ascending Bob's Peak for the finest panoramic viewpoint in the Southern Hemisphere.", image_url: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?q=80&w=1000&auto=format&fit=crop" }
    ],
    days_data: [
      {
        day_number: 1,
        title: "Arrival in Auckland",
        location: "Auckland, New Zealand",
        description: "Kia Ora and welcome to New Zealand! Arrive at Auckland International Airport (AKL), meet your private driver, and transfer to your luxury hotel on the Viaduct Harbour. Take an evening walk around the waterfront marina filled with world-class yachts and award-winning dining.",
        morning_activities: "Arrival in Auckland, private executive airport transfer.",
        afternoon_activities: "Check-in at luxury hotel, leisure waterfront stroll along Viaduct Basin.",
        evening_activities: "Welcome dinner featuring prime New Zealand beef and fresh seafood.",
        meals: "Dinner (Welcome Dinner)",
        hotel: "Park Hyatt Auckland or SO/ Auckland (5-Star)",
        transport: "Private Executive Transfer",
        important_notes: "Bio-security laws in New Zealand are very strict; declare all hiking gear and food items upon arrival.",
        image_url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 2,
        title: "Auckland City",
        location: "Auckland, New Zealand",
        description: "Discover the highlights of the 'City of Sails'. Ascend the 328-meter Sky Tower for breathtaking 360-degree views stretching across two harbours. Explore the trendy heritage suburb of Ponsonby, Mission Bay beach, and take in the panoramic vista from the volcanic summit of Mount Eden.",
        morning_activities: "Ascend Sky Tower observation deck; drive across Auckland Harbour Bridge.",
        afternoon_activities: "Visit Mount Eden volcanic crater lookout, Mission Bay, and Auckland Domain botanical wintergardens.",
        evening_activities: "Evening at leisure for dining in Britomart precinct.",
        meals: "Breakfast",
        hotel: "Park Hyatt Auckland (5-Star)",
        transport: "Private Touring Coach & Guide",
        important_notes: "Comfortable walking shoes recommended for Mt. Eden crater walk.",
        image_url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 3,
        title: "Auckland → Rotorua",
        location: "Auckland to Rotorua, North Island",
        description: "Travel through the rolling green pastures of the Waikato region. Stop at the magical Waitomo Glowworm Caves for a silent boat ride beneath thousands of living luminescent glowworms. Continue to Rotorua, the geothermal heartland of New Zealand, and relax in natural thermal mineral waters.",
        morning_activities: "Scenic drive south through Waikato farmlands to Waitomo Caves.",
        afternoon_activities: "Guided subterranean boat tour through Waitomo Glowworm Grotto; drive to Rotorua.",
        evening_activities: "Check-in at Rotorua lakeside resort; soak in Polynesian Spa thermal mineral pools.",
        meals: "Breakfast, Lunch",
        hotel: "Pullman Rotorua or Lake Rotorua Luxury Lodge (5-Star)",
        transport: "Private Touring Vehicle",
        important_notes: "Waitomo caves are cool year-round (16°C); carry a light sweater.",
        image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 4,
        title: "Rotorua → Queenstown",
        location: "Rotorua to Queenstown, South Island",
        description: "Visit Te Puia Geothermal Valley to witness the iconic 30-meter Pohutu Geyser in action, see rare kiwi birds in the nocturnal house, and witness an authentic Maori cultural performance. In the afternoon, board your domestic flight to Queenstown, the world's adventure capital nestled on Lake Wakatipu.",
        morning_activities: "Tour Te Puia geothermal park, Pohutu Geyser, and Maori Arts & Crafts Institute.",
        afternoon_activities: "Transfer to Rotorua Airport, domestic flight to Queenstown (ZQN), transfer to alpine hotel.",
        evening_activities: "Ride the Skyline Gondola up Bob's Peak for a grand buffet dinner overlooking Queenstown.",
        meals: "Breakfast, Skyline Gondola Buffet Dinner",
        hotel: "The Rees Hotel or Eichardt's Private Hotel Queenstown (5-Star)",
        transport: "Domestic Flight & Private Transfers",
        important_notes: "Queenstown evenings are crisp; carry warm layers.",
        image_url: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 5,
        title: "Queenstown Adventure",
        location: "Queenstown & Arrowtown, South Island",
        description: "Explore the picturesque 1860s gold-rush settlement of Arrowtown, wandering along tree-lined Buckingham Street and historic Chinese miners' quarters. Tour the renowned Gibbston Valley wine region for pinot noir tastings, and witness courageous bungy jumpers at the historic Kawarau Bridge.",
        morning_activities: "Visit Arrowtown historic village, explore boutique shops and gold-mining museum.",
        afternoon_activities: "Stop at Kawarau Suspension Bridge (birthplace of commercial bungy jumping); wine tasting at Gibbston Valley.",
        evening_activities: "Scenic evening cruise on Lake Wakatipu aboard the vintage steamship TSS Earnslaw.",
        meals: "Breakfast, Wine Tasting & Platter",
        hotel: "The Rees Hotel Queenstown (5-Star)",
        transport: "Private Touring Coach",
        important_notes: "Wine tasting is 18+; non-alcoholic grape juices available.",
        image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 6,
        title: "Milford Sound",
        location: "Fiordland National Park & Milford Sound",
        description: "Depart early on one of the world's most spectacular scenic drives along the Milford Road through Fiordland National Park. Board a luxury nature catamaran cruise beneath sheer granite cliffs, towering Mitre Peak, and cascading waterfalls that thunder directly into the fjord. Return to Queenstown by evening.",
        morning_activities: "Scenic glass-roof coach drive through Homer Tunnel and the glacier-carved Eglinton Valley.",
        afternoon_activities: "2-hour Milford Sound nature cruise, spot fur seals and dolphins; gourmet hot buffet lunch on board.",
        evening_activities: "Return coach drive (or optional scenic helicopter flightback) to Queenstown.",
        meals: "Breakfast, Buffet Lunch on Cruise",
        hotel: "The Rees Hotel Queenstown (5-Star)",
        transport: "Glass-Roof Touring Coach & Catamaran Vessel",
        important_notes: "Waterproof jacket recommended as spray from Stirling Falls reaches the outer deck.",
        image_url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 7,
        title: "Queenstown Leisure",
        location: "Queenstown, South Island",
        description: "Enjoy a day at leisure in Queenstown to tailor your experience. Choose from world-class optional excursions such as a helicopter flight with an alpine glacier landing, an adrenaline-pumping Shotover River jet boat ride, or simply relax at a luxury lakeside spa.",
        morning_activities: "Leisurely breakfast overlooking Lake Wakatipu; optional helicopter glacier landing flight.",
        afternoon_activities: "Optional Shotover Jet boat experience or lakeside spa therapy; souvenir shopping.",
        evening_activities: "Celebratory farewell dinner at a lakeside fine-dining restaurant.",
        meals: "Breakfast, Farewell Dinner",
        hotel: "The Rees Hotel Queenstown (5-Star)",
        transport: "Local Chauffeur Available",
        important_notes: "Optional excursions can be booked directly through our concierge with priority slots.",
        image_url: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 8,
        title: "Departure",
        location: "Queenstown to Home",
        description: "Enjoy your final alpine breakfast overlooking the crystal waters of Lake Wakatipu. Complete packing and check-out before your private limousine transfers you to Queenstown Airport (ZQN) for your flight connections homeward.",
        morning_activities: "Breakfast, hotel check-out, last-minute merino wool and manuka honey shopping.",
        afternoon_activities: "Private executive transfer to Queenstown Airport.",
        evening_activities: "Board homeward flight.",
        meals: "Breakfast",
        hotel: "Departure",
        transport: "Private Airport Limousine Transfer",
        important_notes: "Ensure all honey and liquid purchases comply with aviation security standards in checked luggage.",
        image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "Antarctica Expedition Experience",
    name: "Antarctica Expedition Experience",
    slug: "antarctica-expedition-experience",
    itinerary_code: "ATA-EXP-06",
    short_description: "The ultimate voyage of a lifetime: navigate the legendary Drake Passage to the pristine white wilderness of the Antarctic Peninsula aboard a 5-star ice-class expedition vessel.",
    overview: "Embark on an awe-inspiring 10-day expedition to the Seventh Continent. Encounter vast penguin rookeries, breaching humpback whales, sculpted icebergs the size of cathedrals, and dramatic calving glaciers. Featuring daily Zodiac landings, expert polar naturalists, and luxury onboard amenities.",
    region: "Polar Regions",
    country: "Antarctica, Argentina",
    category: "INTERNATIONAL",
    duration: "9 Nights / 10 Days",
    tour_type: "Polar Expedition Cruise",
    package_type: "Ultra-Luxury Expedition",
    nights: 9,
    days: 10,
    min_travelers: 1,
    max_travelers: 10,
    price_from: 780000,
    price_currency: "INR",
    price_unit: "per person",
    best_time: "November to March",
    recommended_for: "Avid Explorers, Wildlife Enthusiasts, Extreme Photographers",
    route: "Ushuaia → Drake Passage → Antarctic Peninsula → Drake Passage → Ushuaia",
    hero_image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1600&auto=format&fit=crop",
    visa_info: "Argentina tourist visa (or reciprocity/visa waiver) required for transit in Ushuaia. No visa required for Antarctica itself.",
    booking_info: "Comprehensive polar medical questionnaire and expedition insurance mandatory. 30% deposit upon booking.",
    is_flights_included: false,
    is_featured: true,
    status: "PUBLISHED",
    display_order: 6,
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop", alt_text: "Antarctic Icebergs and Glacial Waters", caption: "Sculpted blue icebergs in Antarctic waters" },
      { image_url: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1200&auto=format&fit=crop", alt_text: "Gentoo Penguins on Antarctica Ice", caption: "Gentoo penguins on the Antarctic Peninsula" },
      { image_url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1200&auto=format&fit=crop", alt_text: "Expedition Ship in Antarctica", caption: "Ice-class luxury vessel navigating the Lemaire Channel" },
      { image_url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop", alt_text: "Humpback Whale tail breach in Antarctica", caption: "Humpback whale diving beneath tabular icebergs" },
      { image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop", alt_text: "Ushuaia Tierra del Fuego Mountains", caption: "Ushuaia 'The End of the World' port in Argentina" }
    ],
    inclusions: [
      { title: "8 Nights Onboard 5-Star Luxury Ice-Class Expedition Ship", description: "Private oceanview/balcony stateroom with all gourmet meals, open bar, and 24-hour room service." },
      { title: "1 Night Pre-Cruise 5-Star Hotel in Ushuaia", description: "Luxury mountain resort stay in Ushuaia before embarkation." },
      { title: "Daily Guided Zodiac Landings & Excursions", description: "Multiple daily landings on the Antarctic continent led by polar marine biologists, geologists, and ornithologists." },
      { title: "Complimentary Expedition Parka & Boot Rental", description: "Complimentary custom waterproof expedition parka to keep, plus free insulated Muck boots rental." },
      { title: "All Port Taxes, Fuel Surcharges & IAATO Permits", description: "Complete polar permits and environmental fees included." }
    ],
    exclusions: [
      { title: "International & Domestic Flights to Ushuaia", description: "Flights to/from Buenos Aires and Ushuaia." },
      { title: "Mandatory Emergency Evacuation Insurance", description: "Polar travel medical insurance ($500k minimum evacuation coverage)." },
      { title: "Optional Polar Activities", description: "Sea kayaking and snowshoeing excursions (subject to advance reservation)." }
    ],
    faqs: [
      { question: "How rough is the Drake Passage crossing?", answer: "Conditions range from the gentle 'Drake Lake' to the exciting 'Drake Shake'. Our modern vessels feature advanced active fin stabilizers to ensure smooth sailing." },
      { question: "Can we step foot directly onto the Antarctic continent?", answer: "Yes! Weather permitting, you will make multiple continental landings stepping directly onto the Antarctic landmass." }
    ],
    attractions: [
      { name: "Antarctic Peninsula & Lemaire Channel", description: "The stunning 11-km mountain-lined strait known as 'Kodak Gap' due to its dramatic mirror reflections.", image_url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1000&auto=format&fit=crop" },
      { name: "Gentoo & Chinstrap Penguin Rookeries", description: "Vast breeding colonies of hundreds of thousands of spirited penguins on rocky headlands.", image_url: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1000&auto=format&fit=crop" },
      { name: "Drake Passage & Seabird Sanctuary", description: "The convergence of the Atlantic, Pacific, and Southern Oceans frequented by wandering albatrosses.", image_url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1000&auto=format&fit=crop" },
      { name: "Paradise Bay & Neko Harbour", description: "Breathtaking natural harbours surrounded by massive tidewater glaciers and calving ice.", image_url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop" },
      { name: "Ushuaia & Beagle Channel", description: "The southernmost city on earth surrounded by the snow-dusted Andes and the Martial Glacier.", image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop" }
    ],
    activities: [
      { name: "Zodiac Coastal Safaris & Continental Landings", description: "Cruising right up to leopard seals on ice floes and landing on virgin Antarctic snow.", image_url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1000&auto=format&fit=crop" },
      { name: "The Polar Plunge", description: "The legendary polar tradition of leaping into icy Antarctic waters tethered by a safety harness.", image_url: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1000&auto=format&fit=crop" }
    ],
    days_data: [
      {
        day_number: 1,
        title: "Arrival in Ushuaia",
        location: "Ushuaia, Tierra del Fuego, Argentina",
        description: "Arrive in Ushuaia, Argentina—the southernmost city in the world. Transfer to your luxury mountain resort perched on the edge of the Martial Glacier. Savor panoramic views of the Beagle Channel and enjoy an evening briefing with our expedition leader.",
        morning_activities: "Arrival at Malvinas Argentinas Airport (USH), private transfer to luxury resort.",
        afternoon_activities: "Check-in at Arakur Ushuaia Resort, fitting and distribution of expedition boots and parkas.",
        evening_activities: "Welcome dinner featuring Argentine steak and Patagonian king crab.",
        meals: "Dinner (Patagonian Welcome Dinner)",
        hotel: "Arakur Ushuaia Resort & Spa (5-Star)",
        transport: "Private Executive Transfer",
        important_notes: "Arrive at least 1 day prior to cruise embarkation to safeguard against flight delays.",
        image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 2,
        title: "Embarkation",
        location: "Ushuaia Port to Beagle Channel",
        description: "Spend your morning exploring the historic streets of Ushuaia or Tierra del Fuego National Park. In the afternoon, board your 5-star ice-class expedition ship. Settle into your stateroom as the captain steers the vessel down the scenic Beagle Channel into open waters.",
        morning_activities: "Morning walk through Ushuaia artisan markets or Tierra del Fuego park excursion.",
        afternoon_activities: "Boarding expedition ship at 4:00 PM, mandatory safety drill and lifejacket briefing.",
        evening_activities: "Captain's welcome cocktail reception; sail through the Beagle Channel.",
        meals: "Breakfast, Lunch, Dinner on Ship",
        hotel: "Luxury Ice-Class Expedition Ship",
        transport: "Expedition Cruise Vessel",
        important_notes: "Motion sickness preventative patches recommended before entering the Drake Passage.",
        image_url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 3,
        title: "Drake Passage",
        location: "Drake Passage (Day 1)",
        description: "Cross the historic Drake Passage, the legendary body of water separating South America from Antarctica. Attend fascinating lectures by marine biologists and historians in the ship's theater, and spot giant Wandering Albatrosses soaring effortlessly across the ship's wake.",
        morning_activities: "Breakfast, expert lecture on Antarctic bird species and glaciology.",
        afternoon_activities: "Wildlife watching on open observation decks; photography workshop with National Geographic photographers.",
        evening_activities: "3-course gourmet dinner, relax in onboard heated outdoor jacuzzi.",
        meals: "Breakfast, Lunch, Dinner",
        hotel: "Luxury Ice-Class Expedition Ship",
        transport: "Expedition Cruise Vessel",
        important_notes: "Stabilizers active throughout Drake Passage transit.",
        image_url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 4,
        title: "Drake Passage",
        location: "Drake Passage (Day 2) & Antarctic Convergence",
        description: "Cross the biological boundary of the Antarctic Convergence, where cold polar waters sink beneath warmer sub-Antarctic currents. Spot your very first massive tabular icebergs shimmering in shades of electric blue on the horizon, heralding our approach to the White Continent.",
        morning_activities: "IAATO environmental briefing on visitor guidelines and penguin etiquette.",
        afternoon_activities: "Biosecurity vacuuming of outdoor gear; first sightings of tabular icebergs and Fin whales.",
        evening_activities: "Expedition team daily recap and briefing for tomorrow's first landing.",
        meals: "Breakfast, Lunch, Dinner",
        hotel: "Luxury Ice-Class Expedition Ship",
        transport: "Expedition Cruise Vessel",
        important_notes: "Always maintain minimum 5-meter distance from all Antarctic wildlife.",
        image_url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 5,
        title: "Antarctic Peninsula",
        location: "South Shetland Islands & Antarctic Peninsula",
        description: "Awaken to the otherworldly beauty of Antarctica. Board rugged Zodiac landing craft to make your first landing on the South Shetland Islands. Walk amongst thousands of bustling Gentoo penguins, watch Weddell seals basking on ice floes, and hear the deep thunder of distant glacial ice cracking.",
        morning_activities: "First Zodiac landing at Aitcho or Half Moon Island; observe Chinstrap penguin rookeries.",
        afternoon_activities: "Afternoon Zodiac cruise weaving between sculpted electric-blue icebergs and slumbering leopard seals.",
        evening_activities: "Buffet dinner overlooking snow-clad peaks, evening recap in the observation lounge.",
        meals: "Breakfast, Lunch, Dinner",
        hotel: "Luxury Ice-Class Expedition Ship",
        transport: "Expedition Ship & Heavy-Duty Zodiacs",
        important_notes: "Dress in 3 layers: thermal base, fleece mid-layer, and waterproof outer parka.",
        image_url: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 6,
        title: "Antarctic Peninsula",
        location: "Lemaire Channel & Pléneau Island",
        description: "Navigate through the breathtaking Lemaire Channel, where sheer 1,000-meter cliffs plunge straight into glassy waters filled with sea ice. Zodiac cruise through the 'Iceberg Graveyard' at Pléneau Island, spotting feeding Humpback and Minke whales gliding alongside the boats.",
        morning_activities: "Scenic transit through Lemaire Channel; continental landing at Neko Harbour.",
        afternoon_activities: "Zodiac safari amongst colossal grounded tabular icebergs; whale watching encounters.",
        evening_activities: "Dinner in the main dining room under the 24-hour midnight sun.",
        meals: "Breakfast, Lunch, Dinner",
        hotel: "Luxury Ice-Class Expedition Ship",
        transport: "Expedition Ship & Zodiacs",
        important_notes: "Keep camera batteries in warm pockets inside your jacket to extend battery life in freezing air.",
        image_url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 7,
        title: "Antarctic Peninsula",
        location: "Paradise Bay & Port Lockroy",
        description: "Cruise into the mirror-calm waters of Paradise Bay, surrounded by gigantic tidewater glaciers. Visit the historic British base and museum at Port Lockroy, the world's southernmost operational post office. Brave explorers can participate in the legendary Antarctic Polar Plunge!",
        morning_activities: "Continental landing at Paradise Bay; hike to an elevated viewpoint overlooking the glaciers.",
        afternoon_activities: "Visit historic Port Lockroy to send postcards stamped from Antarctica; optional Polar Plunge event.",
        evening_activities: "Celebratory sundeck polar BBQ with hot mulled wine and music.",
        meals: "Breakfast, Lunch, Polar BBQ Dinner",
        hotel: "Luxury Ice-Class Expedition Ship",
        transport: "Expedition Ship & Zodiacs",
        important_notes: "Postcards mailed from Port Lockroy take 4-8 weeks to arrive internationally via the Royal Mail.",
        image_url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 8,
        title: "Return through Drake Passage",
        location: "Drake Passage Northbound (Day 1)",
        description: "Turn northward and begin the return journey through the Drake Passage. Relax in the ship's wellness spa, attend educational retrospective seminars on Antarctic conservation, and share your favorite wildlife photographs with onboard expedition staff.",
        morning_activities: "Breakfast, final scenic views of the South Shetland Islands as we enter open ocean.",
        afternoon_activities: "Guest photography slideshow and critique with professional photographers.",
        evening_activities: "Gourmet dinner, movie screening in the cinema theater.",
        meals: "Breakfast, Lunch, Dinner",
        hotel: "Luxury Ice-Class Expedition Ship",
        transport: "Expedition Cruise Vessel",
        important_notes: "Take time to back up memory cards and review expedition logs.",
        image_url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 9,
        title: "Drake Passage",
        location: "Drake Passage Northbound (Day 2) to Beagle Channel",
        description: "Approach the tip of South America, rounding the iconic waters of Cape Horn. Re-enter the sheltered waters of the Beagle Channel in the late afternoon. Celebrate the triumphant conclusion of your Antarctic voyage at the Captain's Farewell Gala Dinner.",
        morning_activities: "Seabird observation on deck, final lecture on Antarctic climate science.",
        afternoon_activities: "Enter the calm waters of the Beagle Channel; pack expedition gear.",
        evening_activities: "Captain's Farewell Gala Dinner and Champagne toast with the entire crew.",
        meals: "Breakfast, Lunch, Captain's Gala Dinner",
        hotel: "Luxury Ice-Class Expedition Ship",
        transport: "Expedition Cruise Vessel",
        important_notes: "Gratuities for crew and expedition staff can be settled at the reception desk.",
        image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 10,
        title: "Ushuaia / Disembarkation",
        location: "Ushuaia, Argentina to Home",
        description: "Arrive at Ushuaia pier early in the morning. After a final farewell breakfast aboard, disembark the vessel. Transfer to Ushuaia Airport for your flight to Buenos Aires and onwards homeward, with a heart full of memories from the pristine White Continent.",
        morning_activities: "Final breakfast on board, disembarkation at 8:30 AM, transfer to Ushuaia Airport.",
        afternoon_activities: "Fly to Buenos Aires for international connecting flights.",
        evening_activities: "Board homeward flights with lifetime polar explorer bragging rights.",
        meals: "Breakfast",
        hotel: "Departure",
        transport: "Private Executive Airport Transfer",
        important_notes: "Keep your IAATO Antarctic Explorer certificate safely packed in your carry-on.",
        image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "Bali Island Escape",
    name: "Bali Island Escape",
    slug: "bali-island-escape",
    itinerary_code: "IDN-BAL-07",
    short_description: "Immerse yourself in the lush jungle valleys of Ubud, sacred water temples, cascading rice terraces, and glamorous sunset beaches of Seminyak and Uluwatu.",
    overview: "A luxurious 5-day tropical retreat designed to rejuvenate your senses. Experience private pool villa living in Ubud's spiritual heartland, participate in a sacred water cleansing ceremony at Tirta Empul, marvel at the clifftop temple of Uluwatu at sunset, and indulge in world-class Balinese spa treatments.",
    region: "Southeast Asia",
    country: "Indonesia",
    category: "INTERNATIONAL",
    duration: "4 Nights / 5 Days",
    tour_type: "Tropical Luxury & Wellness",
    package_type: "Private Villa Escape",
    nights: 4,
    days: 5,
    min_travelers: 2,
    max_travelers: 12,
    price_from: 135000,
    price_currency: "INR",
    price_unit: "per person",
    best_time: "April to October",
    recommended_for: "Honeymooners, Wellness Seekers, Families",
    route: "Ubud → Kuta/Seminyak",
    hero_image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1600&auto=format&fit=crop",
    visa_info: "Bali Visa on Arrival (VoA) available for Indian travellers ($35 USD) or online e-VoA. Quick digital customs declaration assistance.",
    booking_info: "Instant confirmation. 25% deposit upon booking with flexible dates.",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    display_order: 7,
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop", alt_text: "Bali Ubud Rice Terraces", caption: "Emerald stepped Tegalalang Rice Terraces in Ubud" },
      { image_url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop", alt_text: "Uluwatu Temple Cliff Sunset Bali", caption: "Dramatic sunset over Uluwatu sea temple" },
      { image_url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop", alt_text: "Balinese Luxury Villa Pool", caption: "Private infinity pool villa in the Ubud jungle" },
      { image_url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1200&auto=format&fit=crop", alt_text: "Tirta Empul Holy Water Temple", caption: "Sacred cleansing pools at Tirta Empul" },
      { image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", alt_text: "Seminyak Beach Sunset", caption: "Golden hour sunset cocktails on Seminyak beach" }
    ],
    inclusions: [
      { title: "2 Nights Private Pool Villa in Ubud + 2 Nights Luxury Resort in Seminyak", description: "Handpicked 5-star private pool luxury villa and 5-star beachfront resort." },
      { title: "Complimentary 90-Minute Balinese Spa Massage", description: "Authentic herbal aromatherapy massage for two at an award-winning wellness sanctuary." },
      { title: "Sacred Tirta Empul Cleansing & Temple Tour", description: "Private spiritual blessing and cleansing ritual led by a local Balinese priest." },
      { title: "Uluwatu Clifftop Temple & Kecak Fire Dance", description: "VIP reserved seating for the dramatic sunset Kecak performance." },
      { title: "Private Chauffeur & Air-Conditioned Vehicle Throughout", description: "Dedicated private English-speaking driver-guide for all sightseeing and transfers." }
    ],
    exclusions: [
      { title: "International Flights to Denpasar", description: "International flight tickets unless added." },
      { title: "Bali Visa on Arrival & Tourist Tax", description: "VoA ($35) and Bali Regional Tourist Levy ($10)." },
      { title: "Personal Gratuities & Alcoholic Beverages", description: "Beverages outside specified welcome receptions." }
    ],
    faqs: [
      { question: "Is a floating breakfast included in the Ubud villa?", answer: "Yes, our package includes a signature floating breakfast in your private villa swimming pool on Day 2." }
    ],
    attractions: [
      { name: "Tegalalang Rice Terraces", description: "UNESCO-nominated cascading emerald rice paddies utilizing the ancient Subak cooperative irrigation system.", image_url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop" },
      { name: "Tirta Empul Holy Water Temple", description: "Ancient 10th-century water temple where sacred volcanic springs are used for spiritual purification.", image_url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1000&auto=format&fit=crop" },
      { name: "Uluwatu Clifftop Temple", description: "Majestic Balinese sea temple perched on a sheer 70-meter limestone cliff overlooking the Indian Ocean.", image_url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000&auto=format&fit=crop" },
      { name: "Ubud Monkey Forest Sanctuary", description: "Sacred jungle sanctuary home to over 1,000 playful long-tailed macaques and ancient banyan trees.", image_url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop" },
      { name: "Seminyak & Kuta Sunset Coast", description: "Vibrant coastal strip known for upscale beach clubs, boutique shopping, and world-class surfing.", image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop" }
    ],
    activities: [
      { name: "Kecak Fire Dance at Sunset", description: "Hypnotic choral chanting and dramatic Ramayana epic performance against the ocean sunset.", image_url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000&auto=format&fit=crop" },
      { name: "Signature Floating Villa Breakfast", description: "Gourmet tropical breakfast served on a floating wooden tray in your private villa pool.", image_url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop" }
    ],
    days_data: [
      {
        day_number: 1,
        title: "Arrival in Bali / Ubud",
        location: "Denpasar Airport to Ubud, Bali",
        description: "Om Swastyastu! Arrive at Ngurah Rai International Airport (DPS). Fast-track through customs with your VIP airport greeter, meet your private chauffeur, and drive into the lush green highlands of Ubud. Check into your private pool villa and unwind with a flower-petal bath and welcome tropical cocktail.",
        morning_activities: "Arrival at Ngurah Rai Airport, VIP fast-track clearance, private transfer to Ubud.",
        afternoon_activities: "Check-in at private pool villa, welcome flower-scented bath and relaxation.",
        evening_activities: "Romantic candlelit welcome dinner overlooking the Ayung River ravine.",
        meals: "Dinner (Candlelit Welcome Dinner)",
        hotel: "Mandapa (Ritz-Carlton Reserve) or Viceroy Bali (5-Star Luxury Villa)",
        transport: "Private Executive SUV Transfer",
        important_notes: "Local currency is Indonesian Rupiah (IDR); card payments accepted at resorts.",
        image_url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 2,
        title: "Ubud Temples and Rice Terraces",
        location: "Ubud, Bali",
        description: "Start the day with a signature floating breakfast in your private pool. Journey to the photogenic Tegalalang Rice Terraces for morning valley views, experience the Bali jungle swing, and participate in a sacred water purification ritual (Melukat) at Tirta Empul holy spring temple.",
        morning_activities: "Floating breakfast in private pool; morning walk along Tegalalang Rice Terraces and Bali Swing.",
        afternoon_activities: "Traditional purification ritual at Tirta Empul Temple with a Balinese sarong; organic jungle cafe lunch.",
        evening_activities: "Visit Ubud Sacred Monkey Forest and artisan woodcarving village of Mas; evening at leisure.",
        meals: "Floating Breakfast, Lunch",
        hotel: "Mandapa (Ritz-Carlton Reserve) or Viceroy Bali",
        transport: "Private Chauffeur & Local Guide",
        important_notes: "Bring a change of dry clothes for the Tirta Empul temple water blessing.",
        image_url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 3,
        title: "Ubud → Kuta/Seminyak",
        location: "Ubud to Seminyak, Bali",
        description: "Enjoy a relaxing 90-minute Balinese couples massage at the villa spa. Depart the highland jungles and head south toward the fashionable coast of Seminyak. Check into your beachfront luxury resort, relax on golden sands, and watch a radiant sunset from a VIP cabana at Potato Head or Ku De Ta.",
        morning_activities: "90-minute authentic Balinese Aromatherapy massage at the resort spa.",
        afternoon_activities: "Check-out, drive south to Seminyak, check-in at beachfront 5-star resort.",
        evening_activities: "VIP sunset lounge reservation at Seminyak beachfront club with cocktails.",
        meals: "Breakfast",
        hotel: "The Seminyak Beach Resort & Spa or W Bali - Seminyak (5-Star)",
        transport: "Private Air-Conditioned SUV",
        important_notes: "Sunscreen and beachwear recommended for coastal afternoon.",
        image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 4,
        title: "South Bali / Uluwatu",
        location: "Seminyak & Uluwatu, Bali",
        description: "Spend a leisurely morning on Seminyak beach. In the afternoon, drive to the southern tip of the Bukit Peninsula to visit the dramatic Uluwatu Temple perched 70 meters above the roaring surf. Witness the mesmerizing Kecak Fire Dance at sunset, followed by a beachfront seafood barbecue dinner in Jimbaran Bay.",
        morning_activities: "Leisurely breakfast, beach time, or boutique shopping at Seminyak Village.",
        afternoon_activities: "Scenic drive to Uluwatu Temple, watch wild monkeys and ocean surf breaks.",
        evening_activities: "VIP open-air Kecak Fire Dance performance at sunset; candlelit seafood BBQ on the sands of Jimbaran Bay.",
        meals: "Breakfast, Jimbaran Seafood BBQ Dinner",
        hotel: "The Seminyak Beach Resort & Spa (5-Star)",
        transport: "Private Touring Vehicle",
        important_notes: "Keep sunglasses and hats secure around wild monkeys at Uluwatu Temple.",
        image_url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 5,
        title: "Departure",
        location: "Seminyak to Denpasar Airport to Home",
        description: "Enjoy a final tropical breakfast overlooking the ocean. Complete any last-minute souvenir shopping for Balinese coffee, handmade batik, and organic spa oils before your private chauffeur transfers you to Ngurah Rai International Airport (DPS) for your flight home.",
        morning_activities: "Breakfast, beach walk, last-minute souvenir and batik shopping.",
        afternoon_activities: "Private executive airport transfer.",
        evening_activities: "Board return flight with refreshed spirit and sun-kissed memories of Bali.",
        meals: "Breakfast",
        hotel: "Departure",
        transport: "Private Executive Transfer",
        important_notes: "Arrive at airport 3 hours prior to international departure.",
        image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "Singapore City & Sentosa",
    name: "Singapore City & Sentosa",
    slug: "singapore-city-sentosa",
    itinerary_code: "SGP-SEN-08",
    short_description: "Experience the gleaming futuristic architecture, Michelin-starred culinary delights, Gardens by the Bay, and premier island entertainment on Sentosa.",
    overview: "A dazzling 5-day escape to the Lion City. Gaze upon futuristic supertrees at Gardens by the Bay, marvel at the iconic Marina Bay Sands infinity pool skyline, wander the heritage streets of Chinatown and Little India, and experience thrill-seeking fun at Universal Studios Singapore on Sentosa Island.",
    region: "Southeast Asia",
    country: "Singapore",
    category: "INTERNATIONAL",
    duration: "4 Nights / 5 Days",
    tour_type: "Modern City & Island Fun",
    package_type: "Family & Luxury Getaway",
    nights: 4,
    days: 5,
    min_travelers: 2,
    max_travelers: 14,
    price_from: 145000,
    price_currency: "INR",
    price_unit: "per person",
    best_time: "Year-round",
    recommended_for: "Families, Urban Explorers, Luxury Shoppers",
    route: "Singapore → Sentosa",
    hero_image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1600&auto=format&fit=crop",
    visa_info: "Singapore Electronic Visa (e-Visa) required for Indian passport holders. Fast 3-day turnaround by Luxe Yatra.",
    booking_info: "Guaranteed daily departures. 25% advance deposit.",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    display_order: 8,
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop", alt_text: "Singapore Marina Bay Sands and Supertree Grove", caption: "Gardens by the Bay supertrees and Marina Bay Sands" },
      { image_url: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=1200&auto=format&fit=crop", alt_text: "Singapore Merlion Park", caption: "The iconic Merlion overlooking Marina Bay" },
      { image_url: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1200&auto=format&fit=crop", alt_text: "Jewel Changi Rain Vortex Waterfall", caption: "World's tallest indoor waterfall at Jewel Changi" },
      { image_url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop", alt_text: "Sentosa Island Beach Resort", caption: "Tropical beaches and entertainment on Sentosa Island" },
      { image_url: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=1200&auto=format&fit=crop", alt_text: "Chinatown Singapore Heritage Shophouses", caption: "Historic colorful shophouses in Singapore's Chinatown" }
    ],
    inclusions: [
      { title: "4 Nights 5-Star Accommodations (City + Sentosa Island)", description: "2 Nights at Marina Bay / Orchard 5-star hotel + 2 Nights at Sentosa Island resort." },
      { title: "Gardens by the Bay Double Conservatories & Supertree Observatory", description: "Direct admission to Cloud Forest (with indoor waterfall) and Flower Dome." },
      { title: "Universal Studios Singapore One-Day Express Pass", description: "Skip-the-line VIP access to all major rides and movie-themed zones." },
      { title: "Scenic Mount Faber Cable Car Pass", description: "Panoramic round-trip cable car ride from the mainland into Sentosa Island." },
      { title: "Private Chauffeured Airport & Sightseeing Transfers", description: "Executive air-conditioned transfers throughout." }
    ],
    exclusions: [
      { title: "International Flights to/from Singapore", description: "Long haul flight tickets unless selected." },
      { title: "Singapore Visa Fee", description: "Consulate e-visa application fee." },
      { title: "Personal Expenses & Gratuities", description: "Shopping, optional casino play, and personal dining." }
    ],
    faqs: [
      { question: "Is Singapore suitable for traveling with children?", answer: "Singapore is globally recognized as one of the most family-friendly, safe, and clean destinations with incredible kid-friendly attractions like Universal Studios and S.E.A. Aquarium." }
    ],
    attractions: [
      { name: "Gardens by the Bay & Supertrees", description: "Futuristic 101-hectare botanical park featuring 50-meter vertical gardens and climate-controlled biomes.", image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1000&auto=format&fit=crop" },
      { name: "Merlion Park & Marina Bay", description: "Singapore's mythical half-lion, half-fish national icon standing proudly before the glittering city skyline.", image_url: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=1000&auto=format&fit=crop" },
      { name: "Universal Studios Singapore (USS)", description: "Southeast Asia's premier Hollywood theme park featuring Battlestar Galactica and Transformers rides.", image_url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000&auto=format&fit=crop" },
      { name: "Chinatown & Buddha Tooth Relic Temple", description: "Historic cultural enclave of traditional herbalists, tea merchants, and an opulent Tang-style temple.", image_url: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=1000&auto=format&fit=crop" },
      { name: "Jewel Changi & Rain Vortex", description: "Architectural masterpiece housing the world's tallest indoor waterfall surrounded by a lush forest valley.", image_url: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1000&auto=format&fit=crop" }
    ],
    activities: [
      { name: "Spectra Light & Water Show", description: "Mesmerizing 15-minute outdoor choreography of dancing fountain jets, lasers, and symphonic music.", image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1000&auto=format&fit=crop" },
      { name: "Mount Faber Cable Car Ride", description: "Gliding high above the harbour and cruise port from Mount Faber to Sentosa Island.", image_url: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=1000&auto=format&fit=crop" }
    ],
    days_data: [
      {
        day_number: 1,
        title: "Arrival in Singapore",
        location: "Singapore",
        description: "Welcome to Singapore! Arrive at world-renowned Changi Airport. Experience the breathtaking Rain Vortex indoor waterfall at Jewel Changi before your private chauffeur transfers you to your 5-star luxury hotel in Marina Bay. In the evening, watch the Spectra Light & Water Show over the bay.",
        morning_activities: "Arrival at Changi Airport (SIN), view Jewel Rain Vortex, private transfer to hotel.",
        afternoon_activities: "Check-in at luxury Marina Bay hotel, leisure walk around Marina Bay Sands promenade.",
        evening_activities: "Watch Spectra Light & Water Show from the waterfront event plaza; dinner at celebrity restaurant.",
        meals: "Dinner (Welcome Dinner)",
        hotel: "The Ritz-Carlton, Millenia Singapore or Marina Bay Sands (5-Star)",
        transport: "Private Executive Airport Transfer",
        important_notes: "Singapore uses Singapore Dollar (SGD); contactless digital payment accepted everywhere.",
        image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 2,
        title: "Singapore City Highlights",
        location: "Singapore City",
        description: "Embark on an enriching city tour. Pose for pictures with the iconic Merlion at Merlion Park, drive through the historic Civic District, explore the rich cultural tapestry and gold shops of Little India, and visit the Buddha Tooth Relic Temple in Chinatown with lunch at a Michelin-rated food stall.",
        morning_activities: "Visit Merlion Park, Padang, and City Hall; explore Little India's vibrant flower markets.",
        afternoon_activities: "Tour Chinatown, visit Buddha Tooth Relic Temple, sampling traditional Dim Sum.",
        evening_activities: "Ascend Marina Bay Sands SkyPark Observation Deck for panoramic sunset city views.",
        meals: "Breakfast, Dim Sum Lunch",
        hotel: "The Ritz-Carlton, Millenia Singapore (5-Star)",
        transport: "Private Luxury Touring Coach",
        important_notes: "Modest dress required inside Buddhist and Hindu temples.",
        image_url: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 3,
        title: "Gardens by the Bay / Sentosa",
        location: "Singapore to Sentosa Island",
        description: "Spend your morning at the futuristic Gardens by the Bay. Walk beneath the 35-meter indoor waterfall in the misty Cloud Forest and admire exotic blooms in the Flower Dome. In the afternoon, take a scenic cable car over the harbour to Sentosa Island and check into your beach resort.",
        morning_activities: "Explore Cloud Forest, Flower Dome, and Supertree Observatory at Gardens by the Bay.",
        afternoon_activities: "Board Mount Faber Cable Car to Sentosa Island, check-in at luxury island resort.",
        evening_activities: "Watch the Wings of Time multi-sensory laser and pyrotechnic water show on Siloso Beach.",
        meals: "Breakfast",
        hotel: "Capella Singapore or The Barracks Hotel Sentosa (5-Star)",
        transport: "Mount Faber Cable Car & Private Transfer",
        important_notes: "Light jackets recommended for the cool air-conditioned domes at Gardens by the Bay.",
        image_url: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 4,
        title: "Leisure / Universal Studios / Attractions",
        location: "Sentosa Island, Singapore",
        description: "Enjoy a full day of thrilling island entertainment. Use your VIP pass to experience the blockbuster movie rides at Universal Studios Singapore, explore the underwater wonders at the S.E.A. Aquarium housing 100,000 marine animals, or relax poolside at a luxury beach club.",
        morning_activities: "Full-day access to Universal Studios Singapore (Transformers 3D, Battlestar Galactica, Jurassic Park).",
        afternoon_activities: "Explore S.E.A. Aquarium or relax at Tanjong Beach Club cabanas.",
        evening_activities: "Farewell dinner at Quayside Isle marina overlooking luxury yachts.",
        meals: "Breakfast, Farewell Dinner",
        hotel: "Capella Singapore (5-Star)",
        transport: "Sentosa Express Monorail & Island Shuttles",
        important_notes: "Express passes allow priority queues at Universal Studios.",
        image_url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 5,
        title: "Departure",
        location: "Singapore to Home",
        description: "Enjoy breakfast overlooking the South China Sea. Spend your final hours indulging in duty-free luxury shopping on Orchard Road or exploring Changi's Canopy Park before boarding your international flight homeward.",
        morning_activities: "Breakfast, check-out, shopping on Orchard Road or Marina Bay Sands Shoppes.",
        afternoon_activities: "Private transfer to Changi Airport, explore Butterfly Garden and Canopy Bridge at Jewel.",
        evening_activities: "Board international return flight.",
        meals: "Breakfast",
        hotel: "Departure",
        transport: "Private Airport Limousine",
        important_notes: "Tax-free shopping refunds can be processed quickly at airport eTRS kiosks.",
        image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "Malaysia Kuala Lumpur & Langkawi",
    name: "Malaysia Kuala Lumpur & Langkawi",
    slug: "malaysia-kuala-lumpur-langkawi",
    itinerary_code: "MYS-KUL-09",
    short_description: "Experience the glittering towers and vibrant street cuisine of Kuala Lumpur followed by the pristine tropical rainforests and turquoise beaches of Langkawi.",
    overview: "A delightful 6-day tropical getaway balancing metropolis energy with island tranquility. Ascend the world-famous Petronas Twin Towers, climb the vibrant 272 steps of Batu Caves, ride the steepest cable car in the world in Langkawi, and island-hop across turquoise Andaman waters.",
    region: "Southeast Asia",
    country: "Malaysia",
    category: "INTERNATIONAL",
    duration: "5 Nights / 6 Days",
    tour_type: "City Skyline & Tropical Rainforest",
    package_type: "Luxury Island & Metropolis",
    nights: 5,
    days: 6,
    min_travelers: 2,
    max_travelers: 14,
    price_from: 155000,
    price_currency: "INR",
    price_unit: "per person",
    best_time: "November to April",
    recommended_for: "Couples, Nature & Beach Lovers, Shoppers",
    route: "Kuala Lumpur → Langkawi",
    hero_image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1600&auto=format&fit=crop",
    visa_info: "Visa-Free entry for Indian passport holders (under current bilateral travel scheme). Digital Malaysia Arrival Card (MDAC) assistance included.",
    booking_info: "Guaranteed departures with minimum 2 guests. 25% advance deposit.",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    display_order: 9,
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200&auto=format&fit=crop", alt_text: "Petronas Twin Towers Kuala Lumpur", caption: "Petronas Twin Towers glowing at night" },
      { image_url: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop", alt_text: "Batu Caves Rainbow Steps Malaysia", caption: "Rainbow stairs and golden Murugan statue at Batu Caves" },
      { image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop", alt_text: "Langkawi Sky Bridge and Cable Car", caption: "Langkawi Sky Bridge suspended above the rainforest" },
      { image_url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop", alt_text: "Langkawi Island Hopping Beach", caption: "White sand beach on Dayang Bunting island in Langkawi" },
      { image_url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?q=80&w=1200&auto=format&fit=crop", alt_text: "Kuala Lumpur Bukit Bintang Skyline", caption: "Vibrant shopping and dining in Bukit Bintang" }
    ],
    inclusions: [
      { title: "5 Nights Luxury Accommodations", description: "2 Nights at 5-star hotel in Kuala Lumpur CBD + 3 Nights at beachfront 5-star luxury resort in Langkawi." },
      { title: "Domestic Flight Included", description: "Kuala Lumpur to Langkawi domestic flight with 20kg checked baggage." },
      { title: "Petronas Twin Towers Skybridge & Observation Deck VIP Access", description: "Skip-the-line admission to the 86th-floor observation deck and 41st-floor double-deck skybridge." },
      { title: "Langkawi SkyCab & SkyBridge Cable Car Pass", description: "VIP gondola pass across Machinchang mountain to the suspended curved pedestrian bridge." },
      { title: "Private Langkawi Island Hopping Speedboat Tour", description: "Private charter boat to Pregnant Maiden Lake, eagle feeding, and Beras Basah Beach." }
    ],
    exclusions: [
      { title: "International Flights to KL / from Langkawi", description: "International flight tickets unless added." },
      { title: "Tourism Tax & Langkawi Tourism Fee", description: "Direct hotel tourism tax (approx. RM 10-15 per room per night)." },
      { title: "Personal Gratuities & Porterage", description: "Personal shopping and incidentals." }
    ],
    faqs: [
      { question: "Is Langkawi a duty-free island?", answer: "Yes! Langkawi has duty-free island status, making chocolate, perfumes, and souvenirs significantly cheaper than the mainland." }
    ],
    attractions: [
      { name: "Petronas Twin Towers", description: "The world's tallest twin towers soaring 452 meters with a futuristic postmodern Islamic architectural design.", image_url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1000&auto=format&fit=crop" },
      { name: "Batu Caves", description: "Limestone hill riddled with caves guarded by a magnificent 42.7-meter golden statue of Lord Murugan.", image_url: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop" },
      { name: "Langkawi SkyCab & Sky Bridge", description: "The world's steepest cable car rising 708 meters above sea level to a curved 125-meter suspension bridge.", image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop" },
      { name: "Bukit Bintang & Jalan Alor", description: "Kuala Lumpur's bustling entertainment hub famous for premier shopping malls and lively night food markets.", image_url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?q=80&w=1000&auto=format&fit=crop" },
      { name: "Pulau Dayang Bunting & Kilim Geoforest", description: "UNESCO Geopark featuring freshwater mountain lakes, ancient mangroves, and majestic sea eagles.", image_url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop" }
    ],
    activities: [
      { name: "Private Speedboat Island Hopping", description: "Cruising between pristine limestone islands with eagle feeding and beach swimming.", image_url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop" },
      { name: "SkyBridge Rainforest Walk", description: "Walking across the suspended bridge with jaw-dropping views over the Andaman Sea and Thailand.", image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop" }
    ],
    days_data: [
      {
        day_number: 1,
        title: "Arrival in Kuala Lumpur",
        location: "Kuala Lumpur, Malaysia",
        description: "Selamat Datang! Arrive at Kuala Lumpur International Airport (KLIA). Meet your private driver for an executive transfer to your 5-star hotel in the Golden Triangle with sweeping views of the Petronas Twin Towers. Spend your evening enjoying a welcome Malaysian feast.",
        morning_activities: "Arrival at KLIA, meet & greet, private executive transfer to central hotel.",
        afternoon_activities: "Check-in at luxury hotel, relax or walk around KLCC Park.",
        evening_activities: "Welcome dinner featuring authentic Malaysian Satay, Nasi Lemak, and Roti Canai.",
        meals: "Dinner (Welcome Dinner)",
        hotel: "Mandarin Oriental Kuala Lumpur or Four Seasons Hotel KL (5-Star)",
        transport: "Private Executive Airport Transfer",
        important_notes: "Local currency is Malaysian Ringgit (MYR).",
        image_url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 2,
        title: "Kuala Lumpur City Tour",
        location: "Kuala Lumpur, Malaysia",
        description: "Ascend the iconic Petronas Twin Towers for breathtaking panoramic views from the Skybridge. Journey to the dramatic Batu Caves, climbing the 272 vibrant rainbow steps to explore the grand cathedral caverns. Tour the King's Palace and Merdeka Square, followed by an evening food walk on Jalan Alor.",
        morning_activities: "VIP admission to Petronas Twin Towers Skybridge and 86th-floor observation deck.",
        afternoon_activities: "Excursion to Batu Caves; photo stops at King's Palace (Istana Negara) and National Mosque.",
        evening_activities: "Evening street-food exploration along bustling Jalan Alor in Bukit Bintang.",
        meals: "Breakfast, Lunch",
        hotel: "Mandarin Oriental Kuala Lumpur (5-Star)",
        transport: "Private Luxury Touring Coach",
        important_notes: "Shoulders and knees must be covered when ascending Batu Caves steps.",
        image_url: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 3,
        title: "Kuala Lumpur → Langkawi",
        location: "Kuala Lumpur to Langkawi Island",
        description: "Transfer to the airport for your short 50-minute domestic flight to the tropical island paradise of Langkawi. Check into your 5-star beachfront rainforest resort. Spend your afternoon walking on powdery white sands, swimming in the warm Andaman Sea, and watching a golden sunset.",
        morning_activities: "Breakfast, transfer to airport, domestic flight to Langkawi (LGK).",
        afternoon_activities: "Arrival in Langkawi, transfer to beachfront resort, check-in and beachside relaxation.",
        evening_activities: "Sunset cocktail and fresh seafood dining by the beach.",
        meals: "Breakfast",
        hotel: "The Datai Langkawi or The St. Regis Langkawi (5-Star Luxury Resort)",
        transport: "Domestic Flight & Private Transfers",
        important_notes: "Langkawi has pristine nature; respect native hornbills and monkeys on resort grounds.",
        image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 4,
        title: "Langkawi Island Discovery",
        location: "Langkawi Island, Malaysia",
        description: "Experience the thrilling Langkawi SkyCab, riding the cable car over dense virgin rainforest to the summit of Mount Machinchang. Walk across the architectural marvel of the curved Langkawi Sky Bridge suspended above the canopy. Visit Eagle Square in Kuah and explore duty-free shopping avenues.",
        morning_activities: "Ride Langkawi SkyCab cable car, walk across the Sky Bridge, 3D Art in Paradise museum.",
        afternoon_activities: "Visit Telaga Tujuh (Seven Wells Waterfalls); photo stop at Giant Eagle Square in Kuah.",
        evening_activities: "Leisure evening at Pantai Cenang beach market.",
        meals: "Breakfast, Lunch",
        hotel: "The Datai Langkawi (5-Star)",
        transport: "Private Touring Vehicle",
        important_notes: "Sky Bridge is at 660 meters elevation; comfortable flat shoes recommended.",
        image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 5,
        title: "Langkawi Island Hopping",
        location: "Langkawi Islands & Andaman Sea",
        description: "Board a private speedboat for an exhilarating island-hopping adventure. Cruise to Pulau Dayang Bunting to swim in the mysterious freshwater Lake of the Pregnant Maiden, witness majestic wild sea eagles diving for food in the mangroves, and relax on the white sands of Beras Basah Island.",
        morning_activities: "Private speedboat charter to Dayang Bunting island and freshwater lake swim.",
        afternoon_activities: "Watch wild Brahminy Kite eagle feeding; swimming and sunbathing at Beras Basah Beach.",
        evening_activities: "Celebratory farewell beachfront candlelit barbecue dinner.",
        meals: "Breakfast, Farewell BBQ Dinner",
        hotel: "The Datai Langkawi (5-Star)",
        transport: "Private Speedboat Charter & SUV",
        important_notes: "Bring swimwear, towels, and waterproof phone bags for island hopping.",
        image_url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 6,
        title: "Departure",
        location: "Langkawi to Home",
        description: "Enjoy a final tropical breakfast listening to the sounds of the rainforest and the gentle waves. Complete last-minute duty-free shopping before your private chauffeur transfers you to Langkawi International Airport (LGK) for your connecting flight homeward.",
        morning_activities: "Breakfast, resort leisure, duty-free chocolate and perfume shopping.",
        afternoon_activities: "Private executive transfer to Langkawi Airport.",
        evening_activities: "Board return flight.",
        meals: "Breakfast",
        hotel: "Departure",
        transport: "Private Executive Airport Transfer",
        important_notes: "Keep duty-free alcohol and tobacco within your home country's customs allowance limits.",
        image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "China Highlights – Beijing & Shanghai",
    name: "China Highlights – Beijing & Shanghai",
    slug: "china-highlights-beijing-shanghai",
    itinerary_code: "CHN-BEI-10",
    short_description: "Discover China's imperial majesty and futuristic ambition from the Great Wall and Forbidden City in Beijing to the glittering skyscrapers and historic Bund in Shanghai.",
    overview: "A grand 7-day journey connecting China's imperial past with its ultra-modern future. Walk the battlements of the Great Wall of China, tour the Forbidden City and Temple of Heaven, travel at 350 km/h on the high-speed Fuxing Bullet Train, and cruise the dazzling Huangpu River along Shanghai's iconic Bund.",
    region: "East Asia",
    country: "China",
    category: "INTERNATIONAL",
    duration: "6 Nights / 7 Days",
    tour_type: "Imperial Wonders & Futuristic Metropolis",
    package_type: "Luxury Heritage Journey",
    nights: 6,
    days: 7,
    min_travelers: 2,
    max_travelers: 14,
    price_from: 265000,
    price_currency: "INR",
    price_unit: "per person",
    best_time: "September to November & March to May",
    recommended_for: "Heritage Explorers, Culture & History Buffs, Photographers",
    route: "Beijing → Shanghai",
    hero_image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1600&auto=format&fit=crop",
    visa_info: "China Tourist Visa (L Visa) required for Indian passport holders. VIP document vetting and biometric appointment guidance provided.",
    booking_info: "Guaranteed departures. 30% advance deposit upon confirmation.",
    is_flights_included: true,
    is_featured: true,
    status: "PUBLISHED",
    display_order: 10,
    gallery_images: [
      { image_url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200&auto=format&fit=crop", alt_text: "Great Wall of China Mutianyu", caption: "The Great Wall of China snaking across mountain ridges" },
      { image_url: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop", alt_text: "Forbidden City Palace Museum Beijing", caption: "Imperial yellow rooftops of the Forbidden City" },
      { image_url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200&auto=format&fit=crop", alt_text: "Shanghai Bund and Pudong Skyline", caption: "Lujiazui futuristic skyscrapers across the Huangpu River" },
      { image_url: "https://images.unsplash.com/photo-1513415564515-763d91423bdd?q=80&w=1200&auto=format&fit=crop", alt_text: "Temple of Heaven Beijing", caption: "The Hall of Prayer for Good Harvests at Temple of Heaven" },
      { image_url: "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?q=80&w=1200&auto=format&fit=crop", alt_text: "Yu Garden classical pavilion Shanghai", caption: "Classical Ming Dynasty pavilions in Yu Garden, Shanghai" }
    ],
    inclusions: [
      { title: "6 Nights 5-Star Luxury Accommodations", description: "Colonial/Heritage luxury properties in Beijing central and Shanghai on The Bund." },
      { title: "Fuxing High-Speed Bullet Train (First Class)", description: "Beijing to Shanghai 350 km/h high-speed rail tickets with reserved luxury seating." },
      { title: "Great Wall Mutianyu VIP Cable Car & Toboggan", description: "Private car, cable car ascent, Great Wall pass, and optional toboggan descent." },
      { title: "Authentic Peking Roast Duck Banquet", description: "Traditional multi-course roast duck dinner with certified master carver at your table." },
      { title: "VIP Huangpu River Luxury Night Cruise", description: "Evening cruise along The Bund with illuminated skyline views and drinks." }
    ],
    exclusions: [
      { title: "International Flights to Beijing / from Shanghai", description: "International flight tickets unless added." },
      { title: "China Visa Application Fees", description: "Official embassy visa processing fee." },
      { title: "Personal Expenses & Gratuities", description: "Shopping, personal meals, and driver/guide tips." }
    ],
    faqs: [
      { question: "How long does the bullet train take from Beijing to Shanghai?", answer: "The modern Fuxing Bullet Train covers the 1,318 km distance in just 4 hours and 18 minutes, reaching top speeds of 350 km/h." },
      { question: "Is internet accessible in China?", answer: "We provide all our guests with eSIMs and private VPN configuration advice to ensure seamless access to WhatsApp, Google, and social media." }
    ],
    attractions: [
      { name: "Great Wall of China (Mutianyu Section)", description: "UNESCO World Wonder spanning rugged forested mountain ridges with restored watchtowers.", image_url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000&auto=format&fit=crop" },
      { name: "Forbidden City (Palace Museum)", description: "The world's largest imperial palace complex home to 24 Ming and Qing Dynasty emperors.", image_url: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000&auto=format&fit=crop" },
      { name: "The Bund & Shanghai Tower", description: "Historic European architectural waterfront facing the world's 2nd tallest skyscraper across the river.", image_url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1000&auto=format&fit=crop" },
      { name: "Temple of Heaven & Hutongs", description: "Imperial sacrificial complex and ancient narrow alleyway residential quarters of old Beijing.", image_url: "https://images.unsplash.com/photo-1513415564515-763d91423bdd?q=80&w=1000&auto=format&fit=crop" },
      { name: "Yu Garden & Nanjing Road", description: "Classical 16th-century Ming Dynasty garden and China's premier illuminated pedestrian shopping avenue.", image_url: "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?q=80&w=1000&auto=format&fit=crop" }
    ],
    activities: [
      { name: "Great Wall Cable Car & Battlement Walk", description: "Ascending Mutianyu Great Wall by cable car and hiking between ancient stone watchtowers.", image_url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000&auto=format&fit=crop" },
      { name: "Huangpu River Night Cruise", description: "VIP river cruise past the glowing European facades of The Bund and futuristic Pudong towers.", image_url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1000&auto=format&fit=crop" }
    ],
    days_data: [
      {
        day_number: 1,
        title: "Arrival in Beijing",
        location: "Beijing, China",
        description: "Ni Hao! Arrive at Beijing Capital (PEK) or Daxing (PKX) International Airport. Meet your private driver for an executive transfer to your luxury hotel. In the evening, gather for an authentic Peking Roast Duck welcome banquet carved table-side by a master chef.",
        morning_activities: "Arrival at Beijing Airport, VIP meet & greet, private limousine transfer.",
        afternoon_activities: "Check-in at luxury central hotel, orientation walk around Wangfujing Street.",
        evening_activities: "Welcome banquet featuring authentic wood-fired Peking Roast Duck.",
        meals: "Dinner (Peking Duck Banquet)",
        hotel: "The Peninsula Beijing or Waldorf Astoria Beijing (5-Star)",
        transport: "Private Executive Airport Transfer",
        important_notes: "Currency is Chinese Yuan (CNY / RMB); Alipay / WeChat Pay linked to international cards is widely used.",
        image_url: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 2,
        title: "Forbidden City / Tiananmen Area",
        location: "Beijing, China",
        description: "Walk across expansive Tiananmen Square, entering through the Meridian Gate into the Forbidden City (Palace Museum). Tour the grand imperial halls of Supreme Harmony and the Emperor's private chambers. In the afternoon, climb the hill in Jingshan Park for a breathtaking panoramic view over the golden roofs of the palace.",
        morning_activities: "Walk through Tiananmen Square, guided tour inside the Forbidden City (Palace Museum).",
        afternoon_activities: "Ascend Jingshan Park hilltop pavilion for panoramic Forbidden City view; explore Beihai Park.",
        evening_activities: "Evening at leisure for exploring Sanlitun dining and entertainment area.",
        meals: "Breakfast, Imperial Dim Sum Lunch",
        hotel: "The Peninsula Beijing (5-Star)",
        transport: "Private Luxury Touring Vehicle & Guide",
        important_notes: "Passports required for entry into Tiananmen Square and Forbidden City.",
        image_url: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 3,
        title: "Great Wall of China",
        location: "Mutianyu Great Wall, Beijing",
        description: "Journey by private vehicle into the mountains north of Beijing to visit the Mutianyu section of the Great Wall. Ascend via enclosed cable car, hike along the ancient stone battlements through watchtowers with views across the peaks, and enjoy an exhilarating toboggan ride down the mountain.",
        morning_activities: "Private drive to Mutianyu Great Wall, cable car ascent to Watchtower 14.",
        afternoon_activities: "Hike along the Great Wall between watchtowers 14 and 20; toboggan descent; farmer's gourmet lunch.",
        evening_activities: "Return to Beijing; relax with a traditional Chinese foot reflexology massage.",
        meals: "Breakfast, Gourmet Lunch near Great Wall",
        hotel: "The Peninsula Beijing (5-Star)",
        transport: "Private Luxury Touring Coach",
        important_notes: "Comfortable hiking shoes and sunscreen recommended on the Great Wall.",
        image_url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 4,
        title: "Temple of Heaven / Beijing Culture",
        location: "Beijing, China",
        description: "Visit the Temple of Heaven where Ming and Qing emperors prayed for bountiful harvests; watch local elders practicing Tai Chi and calligraphy in the park. Take a traditional pedal-rickshaw ride through the narrow Hutong alleyways around Houhai Lake, visiting a traditional courtyard home.",
        morning_activities: "Visit Temple of Heaven and Echo Wall; observe morning Tai Chi masters.",
        afternoon_activities: "Rickshaw ride through Beijing Hutongs, visit a quadrangle courtyard family home, Chinese tea ceremony.",
        evening_activities: "Dinner in the historic Nanluoguxiang courtyard district.",
        meals: "Breakfast, Lunch",
        hotel: "The Peninsula Beijing (5-Star)",
        transport: "Private Touring Vehicle & Rickshaw",
        important_notes: "Chinese tea appreciation ceremony includes tasting fine Oolong, Pu-erh, and Jasmine teas.",
        image_url: "https://images.unsplash.com/photo-1513415564515-763d91423bdd?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 5,
        title: "Beijing → Shanghai",
        location: "Beijing to Shanghai, China",
        description: "Board the ultra-modern Fuxing Bullet Train in First Class, rocketing across 1,300 km of the Chinese countryside at 350 km/h to arrive in Shanghai in just over 4 hours. Check into your luxury hotel on The Bund. In the evening, take a stroll along the historic waterfront promenade.",
        morning_activities: "Breakfast, transfer to Beijing South Railway Station, high-speed bullet train to Shanghai.",
        afternoon_activities: "Arrival at Shanghai Hongqiao Station, transfer and check-in at luxury hotel on The Bund.",
        evening_activities: "Stroll along The Bund promenade overlooking the futuristic skyscrapers of Pudong.",
        meals: "Breakfast",
        hotel: "The Peninsula Shanghai or Fairmont Peace Hotel (5-Star)",
        transport: "Fuxing High-Speed Rail (First Class) & Private Transfers",
        important_notes: "Luggage storage on bullet trains is spacious and secure.",
        image_url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 6,
        title: "Shanghai City",
        location: "Shanghai, China",
        description: "Explore the classical and futuristic sides of Shanghai. Wander through the tranquil Ming Dynasty rockeries of Yu Garden, explore the tree-shaded streets of the French Concession, ascend the 118th-floor observation deck of Shanghai Tower, and embark on a luxury VIP night cruise on the Huangpu River.",
        morning_activities: "Visit Yu Garden and Old City God Temple bazaar; stroll through the leafy French Concession.",
        afternoon_activities: "Cross to Pudong to ascend the 632-meter Shanghai Tower (world's 2nd tallest building).",
        evening_activities: "VIP luxury night cruise on the Huangpu River past the illuminated Bund.",
        meals: "Breakfast, Farewell Dinner",
        hotel: "The Peninsula Shanghai (5-Star)",
        transport: "Private Luxury Touring Vehicle",
        important_notes: "Shanghai Tower elevator travels at 65 km/h, reaching the observation deck in 55 seconds.",
        image_url: "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?q=80&w=1000&auto=format&fit=crop"
      },
      {
        day_number: 7,
        title: "Departure",
        location: "Shanghai to Home",
        description: "Enjoy breakfast overlooking the Huangpu River. Spend your morning shopping along China's premier retail strip, Nanjing Road, before experiencing the 431 km/h Maglev magnetic levitation train or private limousine transfer to Shanghai Pudong International Airport (PVG) for your return flight.",
        morning_activities: "Breakfast, leisurely walk and shopping on Nanjing Road pedestrian street.",
        afternoon_activities: "Private executive transfer to Pudong International Airport.",
        evening_activities: "Board return flight with unforgettable memories of China.",
        meals: "Breakfast",
        hotel: "Departure",
        transport: "Private Airport Limousine / Maglev",
        important_notes: "Ensure all receipts are packed for airport VAT refund counters.",
        image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  }
];

export async function seedItineraries() {
  console.log("Seeding 10 complete, production-ready itineraries...");

  for (const item of ITINERARIES_DATA) {
    console.log(`Processing itinerary: ${item.title} (${item.slug})`);

    // 1. Upsert Itinerary
    const itinerary = await prisma.itinerary.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        name: item.name,
        itinerary_code: item.itinerary_code,
        short_description: item.short_description,
        overview: item.overview,
        region: item.region,
        country: item.country,
        category: item.category,
        duration: item.duration,
        tour_type: item.tour_type,
        package_type: item.package_type,
        nights: item.nights,
        days: item.days,
        min_travelers: item.min_travelers,
        max_travelers: item.max_travelers,
        price_from: item.price_from,
        price_currency: item.price_currency,
        price_unit: item.price_unit,
        best_time: item.best_time,
        recommended_for: item.recommended_for,
        route: item.route,
        hero_image: item.hero_image,
        visa_info: item.visa_info,
        booking_info: item.booking_info,
        is_flights_included: item.is_flights_included,
        is_featured: item.is_featured,
        status: item.status,
        display_order: item.display_order,
        published_at: new Date(),
        deleted_at: null,
      },
      create: {
        title: item.title,
        name: item.name,
        slug: item.slug,
        itinerary_code: item.itinerary_code,
        short_description: item.short_description,
        overview: item.overview,
        region: item.region,
        country: item.country,
        category: item.category,
        duration: item.duration,
        tour_type: item.tour_type,
        package_type: item.package_type,
        nights: item.nights,
        days: item.days,
        min_travelers: item.min_travelers,
        max_travelers: item.max_travelers,
        price_from: item.price_from,
        price_currency: item.price_currency,
        price_unit: item.price_unit,
        best_time: item.best_time,
        recommended_for: item.recommended_for,
        route: item.route,
        hero_image: item.hero_image,
        visa_info: item.visa_info,
        booking_info: item.booking_info,
        is_flights_included: item.is_flights_included,
        is_featured: item.is_featured,
        status: item.status,
        display_order: item.display_order,
        published_at: new Date(),
      },
    });

    // 2. Clear old children for idempotency
    await prisma.itineraryDay.deleteMany({ where: { itinerary_id: itinerary.id } });
    await prisma.itineraryInclusion.deleteMany({ where: { itinerary_id: itinerary.id } });
    await prisma.itineraryExclusion.deleteMany({ where: { itinerary_id: itinerary.id } });
    await prisma.itineraryAttraction.deleteMany({ where: { itinerary_id: itinerary.id } });
    await prisma.itineraryActivity.deleteMany({ where: { itinerary_id: itinerary.id } });
    await prisma.itineraryFAQ.deleteMany({ where: { itinerary_id: itinerary.id } });
    await prisma.itineraryImage.deleteMany({ where: { itinerary_id: itinerary.id } });

    // 3. Create Days
    for (const d of item.days_data) {
      await prisma.itineraryDay.create({
        data: {
          itinerary_id: itinerary.id,
          day_number: d.day_number,
          title: d.title,
          location: d.location,
          description: d.description,
          morning_activities: d.morning_activities,
          afternoon_activities: d.afternoon_activities,
          evening_activities: d.evening_activities,
          meals: d.meals,
          hotel: d.hotel,
          transport: d.transport,
          important_notes: d.important_notes,
          image_url: d.image_url,
          display_order: d.day_number,
        },
      });
    }

    // 4. Create Inclusions
    for (let idx = 0; idx < item.inclusions.length; idx++) {
      const inc = item.inclusions[idx];
      await prisma.itineraryInclusion.create({
        data: {
          itinerary_id: itinerary.id,
          title: inc.title,
          description: inc.description,
          display_order: idx + 1,
        },
      });
    }

    // 5. Create Exclusions
    for (let idx = 0; idx < item.exclusions.length; idx++) {
      const exc = item.exclusions[idx];
      await prisma.itineraryExclusion.create({
        data: {
          itinerary_id: itinerary.id,
          title: exc.title,
          description: exc.description,
          display_order: idx + 1,
        },
      });
    }

    // 6. Create Attractions
    for (let idx = 0; idx < item.attractions.length; idx++) {
      const att = item.attractions[idx];
      await prisma.itineraryAttraction.create({
        data: {
          itinerary_id: itinerary.id,
          name: att.name,
          description: att.description,
          image_url: att.image_url,
          display_order: idx + 1,
        },
      });
    }

    // 7. Create Activities
    for (let idx = 0; idx < item.activities.length; idx++) {
      const act = item.activities[idx];
      await prisma.itineraryActivity.create({
        data: {
          itinerary_id: itinerary.id,
          name: act.name,
          description: act.description,
          image_url: act.image_url,
          display_order: idx + 1,
        },
      });
    }

    // 8. Create FAQs
    for (let idx = 0; idx < item.faqs.length; idx++) {
      const faq = item.faqs[idx];
      await prisma.itineraryFAQ.create({
        data: {
          itinerary_id: itinerary.id,
          question: faq.question,
          answer: faq.answer,
          display_order: idx + 1,
        },
      });
    }

    // 9. Create Images (Hero + Gallery)
    let imgIdx = 1;
    await prisma.itineraryImage.create({
      data: {
        itinerary_id: itinerary.id,
        image_url: item.hero_image,
        alt_text: `${item.title} Hero Image`,
        caption: item.title,
        image_type: "hero",
        is_primary: true,
        display_order: imgIdx++,
      },
    });

    for (const g of item.gallery_images) {
      await prisma.itineraryImage.create({
        data: {
          itinerary_id: itinerary.id,
          image_url: g.image_url,
          alt_text: g.alt_text,
          caption: g.caption,
          image_type: "gallery",
          is_primary: false,
          display_order: imgIdx++,
        },
      });
    }

    console.log(`✓ Completed itinerary: ${item.title} with ${item.days_data.length} days`);
  }

  console.log("🎉 All 10 itineraries and 70 days successfully seeded!");
}

if (require.main === module) {
  seedItineraries()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
