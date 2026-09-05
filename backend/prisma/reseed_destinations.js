const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const realDestinations = [
  {
    name: "Along the Holy Ganges in Varanasi",
    slug: "varanasi",
    short_description: "Experience ancient spiritual ghats, evening Ganga Aarti ceremonies, and rich cultural traditions in India's spiritual capital.",
    description: "Varanasi, one of the world's oldest continually inhabited cities, sits on the banks of the sacred Ganges River. Known for its atmospheric narrow lanes, ancient temples, floating candle ceremonies, and timeless spiritual energy.",
    country: "India",
    state_region: "Uttar Pradesh",
    city: "Varanasi",
    continent: "Asia",
    destination_type: "National",
    best_time_to_visit: "October to March",
    ideal_duration: "3 - 4 Days",
    currency: "INR (₹)",
    language: "Hindi, English",
    categories: "SPIRITUAL, HERITAGE, CULTURE",
    is_featured: true,
    is_popular: true,
    is_india_destination: true,
    is_international_destination: false,
    display_order: 1,
    status: "PUBLISHED",
    published_at: new Date(),
    images: [
      {
        image_url: "https://images.unsplash.com/photo-1627938823193-fd13c1c867dd?q=80&w=1170&auto=format&fit=crop",
        alt_text: "Ganges River Ghats in Varanasi",
        caption: "Varanasi Ghats at Sunset",
        image_type: "cover",
        is_primary: true
      }
    ]
  },
  {
    name: "Royal Rajasthan & Palaces",
    slug: "rajasthan",
    short_description: "Immerse yourself in grand royal forts, golden desert dunes, and majestic heritage palaces across Jaipur, Udaipur, and Jaisalmer.",
    description: "Rajasthan is the land of Maharajas, grand palaces, formidable forts, and vibrant desert traditions. Explore the Pink City of Jaipur, the Lake City of Udaipur, and the Golden City of Jaisalmer.",
    country: "India",
    state_region: "Rajasthan",
    city: "Jaipur",
    continent: "Asia",
    destination_type: "National",
    best_time_to_visit: "October to March",
    ideal_duration: "7 - 10 Days",
    currency: "INR (₹)",
    language: "Hindi, Rajasthani, English",
    categories: "ROYAL, PALACES, HERITAGE",
    is_featured: true,
    is_popular: true,
    is_india_destination: true,
    is_international_destination: false,
    display_order: 2,
    status: "PUBLISHED",
    published_at: new Date(),
    images: [
      {
        image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Amber Fort Jaipur",
        caption: "Royal Forts of Rajasthan",
        image_type: "cover",
        is_primary: true
      }
    ]
  },
  {
    name: "Green Hills & Backwaters of Kerala",
    slug: "kerala",
    short_description: "Cruising tranquil emerald backwaters on luxury houseboats, misty tea gardens of Munnar, and Ayurvedic wellness sanctuaries.",
    description: "Known as God's Own Country, Kerala is a tropical paradise of palm-fringed backwaters, serene hill stations, aromatic spice plantations, and ancient Ayurvedic wellness traditions.",
    country: "India",
    state_region: "Kerala",
    city: "Kochi",
    continent: "Asia",
    destination_type: "National",
    best_time_to_visit: "September to March",
    ideal_duration: "5 - 7 Days",
    currency: "INR (₹)",
    language: "Malayalam, English",
    categories: "NATURE, BACKWATERS, WELLNESS",
    is_featured: true,
    is_popular: true,
    is_india_destination: true,
    is_international_destination: false,
    display_order: 3,
    status: "PUBLISHED",
    published_at: new Date(),
    images: [
      {
        image_url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Kerala Houseboats on Backwaters",
        caption: "Tranquil Backwaters of Alleppey",
        image_type: "cover",
        is_primary: true
      }
    ]
  },
  {
    name: "Taj Mahal & The Golden Triangle",
    slug: "agra-golden-triangle",
    short_description: "Witness the monumental beauty of the Taj Mahal, Agra Fort, and historic grandeur of northern India.",
    description: "The Golden Triangle connects Delhi, Agra, and Jaipur, forming India's premier luxury heritage route. Stand in awe of the Taj Mahal, a world wonder built out of white marble as a monument to love.",
    country: "India",
    state_region: "Uttar Pradesh",
    city: "Agra",
    continent: "Asia",
    destination_type: "National",
    best_time_to_visit: "October to March",
    ideal_duration: "4 - 6 Days",
    currency: "INR (₹)",
    language: "Hindi, English",
    categories: "MONUMENTS, HISTORY, HERITAGE",
    is_featured: true,
    is_popular: true,
    is_india_destination: true,
    is_international_destination: false,
    display_order: 4,
    status: "PUBLISHED",
    published_at: new Date(),
    images: [
      {
        image_url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Taj Mahal Agra",
        caption: "Monument of Love Taj Mahal",
        image_type: "cover",
        is_primary: true
      }
    ]
  },
  {
    name: "Kyoto & Mount Fuji in Honshu",
    slug: "japan-kyoto",
    short_description: "In the heart of Honshu — serene bamboo groves, historic Shinto shrines, cherry blossoms, and views of Mount Fuji.",
    description: "Experience the timeless elegance of Japan, from Kyoto's traditional wooden machiya townhouses and zen rock gardens to the iconic snow-capped peak of Mount Fuji and Tokyo's ultra-luxury omakase dining.",
    country: "Japan",
    state_region: "Kansai",
    city: "Kyoto",
    continent: "Asia",
    destination_type: "International",
    best_time_to_visit: "March to May, October to November",
    ideal_duration: "7 - 12 Days",
    currency: "JPY (¥)",
    language: "Japanese, English",
    categories: "CULTURE, NATURE, HERITAGE",
    is_featured: true,
    is_popular: true,
    is_india_destination: false,
    is_international_destination: true,
    display_order: 5,
    status: "PUBLISHED",
    published_at: new Date(),
    images: [
      {
        image_url: "https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=1170&auto=format&fit=crop",
        alt_text: "Mount Fuji and Cherry Blossoms",
        caption: "Mount Fuji, Japan",
        image_type: "cover",
        is_primary: true
      }
    ]
  },
  {
    name: "Santorini & The Cyclades Islands",
    slug: "santorini-greece",
    short_description: "Iconic whitewashed villas over blue-domed caldera cliffs, Mediterranean sunsets, and private yacht charters.",
    description: "Perched high on dramatic volcanic cliffs above the Aegean Sea, Santorini is Greece's most romantic island. Enjoy private plunge pools, world-class volcanic wines, and famous Aegean sunsets.",
    country: "Greece",
    state_region: "South Aegean",
    city: "Oia",
    continent: "Europe",
    destination_type: "International",
    best_time_to_visit: "April to October",
    ideal_duration: "5 - 7 Days",
    currency: "EUR (€)",
    language: "Greek, English",
    categories: "ISLAND, ROMANCE, BEACH",
    is_featured: true,
    is_popular: true,
    is_india_destination: false,
    is_international_destination: true,
    display_order: 6,
    status: "PUBLISHED",
    published_at: new Date(),
    images: [
      {
        image_url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Santorini White Villas",
        caption: "Santorini Caldera View",
        image_type: "cover",
        is_primary: true
      }
    ]
  },
  {
    name: "Baa Atoll & Maldives Islands",
    slug: "maldives-atolls",
    short_description: "Pristine turquoise lagoons, overwater luxury bungalows, vibrant coral reefs, and unscripted barefoot luxury.",
    description: "The Maldives offers an unmatched tropical paradise with private island resorts, overwater villas with glass floor panels, swimming with manta rays, and world-class spa retreats.",
    country: "Maldives",
    state_region: "Baa Atoll",
    city: "Male",
    continent: "Asia",
    destination_type: "International",
    best_time_to_visit: "November to April",
    ideal_duration: "4 - 7 Days",
    currency: "USD ($)",
    language: "Dhivehi, English",
    categories: "ISLAND, OVERWATER VILLAS, LUXURY",
    is_featured: true,
    is_popular: true,
    is_india_destination: false,
    is_international_destination: true,
    display_order: 7,
    status: "PUBLISHED",
    published_at: new Date(),
    images: [
      {
        image_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Maldives Overwater Resort",
        caption: "Baa Atoll Maldives",
        image_type: "cover",
        is_primary: true
      }
    ]
  },
  {
    name: "Lake Como & Amalfi Coast",
    slug: "lake-como-italy",
    short_description: "Grand lakeside villas, dramatic alpine cliffs, private Riva boat cruises, and Michelin-starred Italian dining.",
    description: "Surrounded by steep green mountains and elegant 19th-century aristocrat estates, Lake Como is Italy's most famous luxury lake destination.",
    country: "Italy",
    state_region: "Lombardy",
    city: "Como",
    continent: "Europe",
    destination_type: "International",
    best_time_to_visit: "May to October",
    ideal_duration: "4 - 6 Days",
    currency: "EUR (€)",
    language: "Italian, English",
    categories: "LAKE, VILLAS, ROMANCE",
    is_featured: true,
    is_popular: true,
    is_india_destination: false,
    is_international_destination: true,
    display_order: 8,
    status: "PUBLISHED",
    published_at: new Date(),
    images: [
      {
        image_url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Lake Como Italy",
        caption: "Villas on Lake Como",
        image_type: "cover",
        is_primary: true
      }
    ]
  },
  {
    name: "The Roof of the World with Sky Train",
    slug: "tibet-china",
    short_description: "Experience the spiritual majesty of Lhasa, Potala Palace, and the architectural wonder of the Great Wall.",
    description: "Journey across the high Tibetan plateau on the world's highest railway, visiting ancient Buddhist monasteries and majestic Himalayan mountain peaks.",
    country: "China",
    state_region: "Tibet",
    city: "Lhasa",
    continent: "Asia",
    destination_type: "International",
    best_time_to_visit: "May to October",
    ideal_duration: "8 - 12 Days",
    currency: "CNY (¥)",
    language: "Tibetan, Mandarin, English",
    categories: "MOUNTAIN, CULTURE, ADVENTURE",
    is_featured: true,
    is_popular: true,
    is_india_destination: false,
    is_international_destination: true,
    display_order: 9,
    status: "PUBLISHED",
    published_at: new Date(),
    images: [
      {
        image_url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Great Wall of China",
        caption: "Great Wall & High Altitude Plateau",
        image_type: "cover",
        is_primary: true
      }
    ]
  },
  {
    name: "Eternity Along The Nile & Pyramids",
    slug: "egypt-nile",
    short_description: "Private dahabiya cruises along the Nile, ancient temples of Luxor, and the timeless Pyramids of Giza.",
    description: "Step back 5,000 years into ancient history. Explore the Great Pyramids of Giza, the Sphinx, Tutankhamun's gold treasure, and sail the majestic Nile River in ultimate comfort.",
    country: "Egypt",
    state_region: "Cairo & Luxor",
    city: "Giza",
    continent: "Africa",
    destination_type: "International",
    best_time_to_visit: "October to April",
    ideal_duration: "7 - 10 Days",
    currency: "EGP (E£)",
    language: "Arabic, English",
    categories: "HISTORY, MONUMENTS, RIVER CRUISE",
    is_featured: true,
    is_popular: true,
    is_india_destination: false,
    is_international_destination: true,
    display_order: 10,
    status: "PUBLISHED",
    published_at: new Date(),
    images: [
      {
        image_url: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Pyramids of Giza Egypt",
        caption: "Ancient Pyramids of Giza",
        image_type: "cover",
        is_primary: true
      }
    ]
  }
];

async function main() {
  console.log('Clearing old destination data...');
  await prisma.destinationImage.deleteMany();
  await prisma.itineraryDestination.deleteMany();
  await prisma.destination.deleteMany();

  console.log('Inserting authentic destination data...');
  for (const item of realDestinations) {
    const { images, ...destData } = item;
    const created = await prisma.destination.create({
      data: {
        ...destData,
        images: {
          create: images
        }
      }
    });
    console.log(`Created Destination: ${created.name} (${created.country})`);
  }

  console.log('Destination seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
