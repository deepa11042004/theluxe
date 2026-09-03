export interface ItineraryItem {
  id: string;
  country: string;
  title: string;
  description: string;
  duration: string;
  badge: string;
  image: string;
  youtubeId: string;
}

export interface ItineraryDay {
  day: string;
  title: string;
  text: string;
}

export interface DetailedItinerary extends ItineraryItem {
  images: string[];
  groupSize: string;
  flightsIncl: boolean;
  tourType: string;
  days: ItineraryDay[];
}

export const itineraryData: DetailedItinerary[] = [
  {
    id: "1",
    country: "United Arab Emirates",
    title: "Dubai — Desert Dreams & City Glamour",
    description:
      "Explore Jumeirah Mosque, Gold Souk, Dubai Mall, Spice Souk, and the historic Bastakiya Square. Drive past Atlantis, The Palm, and end with an unforgettable desert safari experience.",
    duration: "5 Nights / 6 Days",
    badge: "✈️ 5 Nights",
    image:
      "https://images.unsplash.com/photo-1739900292622-a7f860175aad?w=500&auto=format&fit=crop&q=60",
    youtubeId: "Hs4arPj29_I",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHViYWl8ZW58MHx8MHx8fDA%3D", //
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1628859017536-c2f1d69f3c84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGR1YmFpfGVufDB8fDB8fHww",
    ],
    groupSize: "2 - 16 travelers",
    flightsIncl: true,
    tourType: "Luxury & Adventure",
    days: [
      {
        day: "Day 1",
        title: "Welcome to the City of Gold",
        text: "Arrive at Dubai International Airport (DXB). Meet our representative and transfer to your premium hotel. Spend the evening relaxing or taking a stroll to marvel at the illuminated skyline.",
      },
      {
        day: "Day 2",
        title: "Burj Khalifa & Modern Wonders",
        text: "Visit the towering Burj Khalifa for breathtaking views from the observation deck. Walk through the expansive Dubai Mall and experience the dramatic choreographed Dubai Fountain show at night.",
      },
      {
        day: "Day 3",
        title: "Historic Souks & Bastakiya Square",
        text: "Step back in time at Al Fahidi Historical Neighborhood. Take a traditional Abra water taxi ride across Dubai Creek, and explore the aromatic Spice Souk and the glittering Gold Souk.",
      },
      {
        day: "Day 4",
        title: "Thrilling Desert Safari",
        text: "Head out into the golden dunes for a high-energy dune bashing adventure. Ride camels, try sandboarding, and conclude the night with a traditional BBQ dinner and Tanoura dance under the desert stars.",
      },
      {
        day: "Day 5",
        title: "Palm Jumeirah & Marina Cruise",
        text: "Drive past Atlantis, The Palm, and stop for pictures. In the evening, step aboard a luxury wooden Dhow cruise at Dubai Marina. Enjoy a international buffet dinner as you float past glowing skyscrapers.",
      },
      {
        day: "Day 6",
        title: "Departure from Dubai",
        text: "Enjoy a final breakfast at your hotel. Buy last-minute souvenirs at local markets before transferring to the airport for your return flight home.",
      },
    ],
  },
  {
    id: "2",
    country: "India",
    title: "Goa — Sun, Sand & Soul",
    description:
      "Goa offers much more than its famous party scene. Rich legacy, history, culture, and sun-soaked beaches make it a perfect destination for every kind of traveller seeking joy.",
    duration: "4 Nights / 5 Days",
    badge: "🏝️ 4 Nights",
    image:
      "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=500&auto=format&fit=crop&q=60",
    youtubeId: "BoFGjD9Bv-k",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&w=500&q=80",
    ],
    groupSize: "2 - 20 travelers",
    flightsIncl: true,
    tourType: "Leisure & Beach",
    days: [
      {
        day: "Day 1",
        title: "Arrive in Tropical Goa",
        text: "Fly into Goa Airport and transfer to your beachside resort. Unpack and unwind. Spend a relaxed evening enjoying fresh seafood at a local beach shack.",
      },
      {
        day: "Day 2",
        title: "North Goa Beach Hopping & Fort Aguada",
        text: "Explore the 17th-century Fort Aguada. Spend the afternoon exploring the lively sands and water sports at Calangute, Baga, and Anjuna beaches.",
      },
      {
        day: "Day 3",
        title: "Latin Quarter & Churches of Old Goa",
        text: "Visit the Basilica of Bom Jesus, holding the remains of St. Francis Xavier. Wander through the colorful Portuguese-style streets of Fontainhas, the heritage Latin Quarter.",
      },
      {
        day: "Day 4",
        title: "Dudhsagar Waterfalls & Spice Plantation",
        text: "Journey to the spectacular Dudhsagar Waterfalls. Afterward, tour a nearby spice plantation to see how cardamom and cinnamon are grown, accompanied by a traditional buffet lunch.",
      },
      {
        day: "Day 5",
        title: "Depart Goa",
        text: "Have a lazy breakfast, take a final swim in the ocean, and purchase local Goan cashews before transferring to the airport for your flight back.",
      },
    ],
  },
  {
    id: "3",
    country: "Indonesia",
    title: "Bali — Enchanting Island of Gods",
    description:
      "Bali's enchanting beauty, rich culture, and serene beaches create an unforgettable experience. Whether you seek adventure or relaxation, Bali has it all for you.",
    duration: "6 Nights / 7 Days",
    badge: "🌺 6 Nights",
    image:
      "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?w=500&auto=format&fit=crop&q=60",
    youtubeId: "BFS9n4B_2xA",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80",
    ],
    groupSize: "1 - 12 travelers",
    flightsIncl: true,
    tourType: "Wellness & Nature",
    days: [
      {
        day: "Day 1",
        title: "Arrive in Bali - Drive to Ubud",
        text: "Arrive at Ngurah Rai Airport. Meet your guide and transfer to Ubud, the cultural heart of Bali. Rest and adjust to the tropical island pace.",
      },
      {
        day: "Day 2",
        title: "Ubud Monkey Forest & Rice Terraces",
        text: "Walk through the sacred Ubud Monkey Forest. Visit the historic Ubud Palace and shop at the local market. Finish the afternoon admiring the emerald Tegallalang Rice Terraces.",
      },
      {
        day: "Day 3",
        title: "Holy Water Purification & Waterfall Trek",
        text: "Partake in a purification ritual at Tirta Empul water temple. Afterward, hike down to the lush, roaring Tegenungan Waterfall for gorgeous photos.",
      },
      {
        day: "Day 4",
        title: "Mount Batur Sunrise Volcano Trek",
        text: "Wake up early for a guided sunrise trek up Mount Batur. Enjoy breakfast cooked by volcanic steam at the summit, then soak in natural lakeside hot springs.",
      },
      {
        day: "Day 5",
        title: "Seminyak & Sunset Kecak Dance at Uluwatu",
        text: "Travel to coastal Seminyak. Later, visit the dramatic cliffside Uluwatu Temple to watch the hypnotic Kecak Fire Dance as the sun sets over the ocean.",
      },
      {
        day: "Day 6",
        title: "Nusa Penida Island Escape",
        text: "Take a speed boat to Nusa Penida. Visit the famous T-Rex-shaped Kelingking Beach, swim in the natural infinity pool at Angel's Billabong, and photograph Broken Beach.",
      },
      {
        day: "Day 7",
        title: "Depart Bali",
        text: "Enjoy a leisurely breakfast and a final Balinese massage before checking out and heading to the airport for your flight home.",
      },
    ],
  },
  {
    id: "4",
    country: "Thailand",
    title: "Thailand — Tropical Temples & Turquoise Islands",
    description:
      "Immerse yourself in Bangkok's ornate grand palaces, taste traditional street food treasures, and escape to Phuket's white-sand horizons and Phang Nga Bay limestone wonders.",
    duration: "6 Nights / 7 Days",
    badge: "🇹🇭 6 Nights",
    image:
      "https://images.unsplash.com/photo-1513568720563-6a5b8c6caab3?w=500&auto=format&fit=crop&q=60",
    youtubeId: "8m8ReerO060",
    images: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1139&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1513568720563-6a5b8c6caab3?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    groupSize: "2 - 15 travelers",
    flightsIncl: true,
    tourType: "Adventure & Sightseeing",
    days: [
      {
        day: "Day 1",
        title: "Arrive in Vibrant Bangkok",
        text: "Arrive in Bangkok and transfer to your hotel. In the evening, explore the bustling food stands of Chinatown or take a tuk-tuk ride around the illuminated city.",
      },
      {
        day: "Day 2",
        title: "Grand Palace & Chao Phraya River Cruise",
        text: "Tour the breathtaking Grand Palace and the Temple of the Emerald Buddha. Take a longtail boat along the canals and visit Wat Arun (Temple of Dawn).",
      },
      {
        day: "Day 3",
        title: "Fly to Phuket & Beach Sunset",
        text: "Take a morning flight to Phuket. Transfer to your beach resort. Spend the day lounging on the sand and catch the golden sunset from Promthep Cape.",
      },
      {
        day: "Day 4",
        title: "Phi Phi Islands Speedboat Tour",
        text: "Set out on a speedboat excursion. Snorkel at Maya Bay (made famous by the movie The Beach), swim in Pileh Lagoon, and visit Monkey Beach.",
      },
      {
        day: "Day 5",
        title: "James Bond Island & Sea Caves",
        text: "Explore Phang Nga Bay by cruise. Canoe through spectacular limestone sea caves and visit Khao Phing Kan, the iconic James Bond Island.",
      },
      {
        day: "Day 6",
        title: "Elephant Sanctuary & Culinary Lesson",
        text: "Interact ethically with rescued elephants at a local sanctuary. In the evening, join a hands-on culinary class to learn the art of cooking Pad Thai and Green Curry.",
      },
      {
        day: "Day 7",
        title: "Depart Thailand",
        text: "Stroll through historic Phuket Old Town, pick up local spices and silks, then transfer to the airport for your international flight home.",
      },
    ],
  },
  {
    id: "5",
    country: "India (Kashmir)",
    title: "Kashmir — Heaven on Earth & Alpine Wonders",
    description:
      "Relax on a luxury Shikara cruise over Dal Lake, wander through historic Mughal terrace gardens, and breathe in the snow-dusted peak vistas of Gulmarg and Pahalgam valleys.",
    duration: "5 Nights / 6 Days",
    badge: "🏔️ 5 Nights",
    image:
      "https://plus.unsplash.com/premium_photo-1697730150003-26a1d469adb4?w=500&auto=format&fit=crop&q=60",
    youtubeId: "h3zk-cwS8hU",
    images: [
      "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=500&q=80",
    ],
    groupSize: "2 - 12 travelers",
    flightsIncl: true,
    tourType: "Scenic & Nature",
    days: [
      {
        day: "Day 1",
        title: "Welcome to Srinagar Houseboats",
        text: "Arrive in Srinagar. Transfer to a premium carved wooden houseboat on the serene Dal Lake. Enjoy a peaceful evening Shikara boat ride during sunset.",
      },
      {
        day: "Day 2",
        title: "Mughal Terrace Gardens",
        text: "Explore Shalimar Bagh, Nishat Bagh, and Chashme Shahi Mughal gardens. Visit the historical Shankaracharya Temple on a hilltop with views of the entire valley.",
      },
      {
        day: "Day 3",
        title: "Alpine Gulmarg & Gondola Lift",
        text: "Drive to Gulmarg, the 'Meadow of Flowers'. Take the highest cable car in Asia to Apharwat Peak for breathtaking views of snow-capped mountains.",
      },
      {
        day: "Day 4",
        title: "Pahalgam — Valley of Shepherds",
        text: "Travel to Pahalgam. Pass through the Pampore saffron fields. Explore the pristine waters and Pine trees of Aru Valley and Betaab Valley.",
      },
      {
        day: "Day 5",
        title: "Glaciers of Sonamarg",
        text: "Take a day excursion to Sonamarg, the 'Meadow of Gold'. Take a pony ride up to the stunning Thajiwas Glacier and listen to the flowing Sindh River.",
      },
      {
        day: "Day 6",
        title: "Farewell Kashmir",
        text: "Browse local markets for exquisite Pashmina shawls, paper mache crafts, and fresh walnuts before boarding your flight at Srinagar Airport.",
      },
    ],
  },
  {
    id: "6",
    country: "India (Himachal)",
    title: "Shimla — The Regal Queen of Hills",
    description:
      "Stroll the historic pedestrian Mall Road, visit colonial Jakhoo Temple structures, and journey down to Kufri's panoramic pine woodlands for a perfect Himalayan getaway.",
    duration: "3 Nights / 4 Days",
    badge: "🌲 3 Nights",
    image:
      "https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?w=500&auto=format&fit=crop&q=60",
    youtubeId: "4hlZuEqgus0",
    images: [
      "https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1641735735000-c9719ac2740b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500&q=80",
    ],
    groupSize: "2 - 10 travelers",
    flightsIncl: false,
    tourType: "Hills & Heritage",
    days: [
      {
        day: "Day 1",
        title: "Scenic Drive to Shimla",
        text: "Drive up into the pine-covered Himalayan foothills to Shimla. Check into your heritage hotel. Spend the evening relaxing and feeling the crisp mountain air.",
      },
      {
        day: "Day 2",
        title: "British Colonial Heritage Walk & Mall Road",
        text: "Tour the Viceregal Lodge, the colonial-era summer residence of the British Viceroy. Stroll down the pedestrian Mall Road, visit Christ Church, and take in the view from the Ridge.",
      },
      {
        day: "Day 3",
        title: "Excursion to Kufri Forests",
        text: "Drive to Kufri for horse riding trails and panoramic valley vistas. Explore the Himalayan Nature Park, home to leopards, musk deer, and Himalayan monals.",
      },
      {
        day: "Day 4",
        title: "Toy Train Ride & Return",
        text: "Embark on the UNESCO World Heritage Kalka-Shimla Toy Train ride through scenic tunnels and mountain villages, before beginning your journey back.",
      },
    ],
  },
  {
    id: "7",
    country: "India (Uttarakhand)",
    title: "Nainital — Emerald Lakes & Misty Ridges",
    description:
      "Set sail on the historic, pear-shaped Naini Lake, experience breathtaking views from Snow View Point tramways, and uncover peaceful nature trails across surrounding cloud-kissed peaks.",
    duration: "3 Nights / 4 Days",
    badge: "⛵ 3 Nights",
    image:
      "https://images.unsplash.com/photo-1683567386578-738d9cc9b62c?w=500&auto=format&fit=crop&q=60",
    youtubeId: "joyX1OsTs20",
    images: [
      "https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=500&q=80",
    ],
    groupSize: "2 - 10 travelers",
    flightsIncl: false,
    tourType: "Lake Retreat",
    days: [
      {
        day: "Day 1",
        title: "Welcome to the Lake District",
        text: "Drive up from the plains to Nainital. Check in, and spend the late afternoon enjoying a tranquil boat ride on the emerald Naini Lake, surrounded by hills.",
      },
      {
        day: "Day 2",
        title: "Snow View Tramway & Naina Devi Temple",
        text: "Ride the cable car to Snow View Point for a panorama of Nanda Devi and other snow peaks. Pay respects at Naina Devi Temple on the edge of the lake.",
      },
      {
        day: "Day 3",
        title: "Three Lakes Tour: Bhimtal, Sattal, Naukuchiatal",
        text: "Explore Bhimtal with its island aquarium, the seven interconnected forest lakes of Sattal, and Naukuchiatal, the nine-cornered lake perfect for kayaking.",
      },
      {
        day: "Day 4",
        title: "Mall Road Shopping & Departure",
        text: "Shop for local pinecone crafts and Nainital's famous multi-layered aromatic candles before commencing your return journey home.",
      },
    ],
  },
];
