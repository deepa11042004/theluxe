import React from 'react';
import Image from 'next/image';

const KEY_TENETS = [
  {
    id: 1,
    title: "We've Got You Covered",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80", // Mountain
    benefits: [
      "Keystone gives you 7 nights/8 days of holidays every year. If you miss your vacation, you can carry forward up to 14 nights.",
      "Breakfast is on us. Other meals come with special savings.",
      "Protect your long-term holiday goals with future-proof pricing.",
      "Pick a plan based on your preferences with three unique Keys and flexible tenures."
    ]
  },
  {
    id: 2,
    title: "Special Privileges",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", // Forest path
    benefits: [
      "Avail 52, 46, and 24 weeks of holiday access across applicable seasons for EBONY, IVORY, and JADE Keys respectively.",
      "Enjoy 25% discounts on eligible in-resort spends.",
      "Nominate up to 7 family members."
    ]
  },
  {
    id: 3,
    title: "Holiday Benefits",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Beach/ocean
    benefits: [
      "You can start booking your holidays up to 4 months in advance. All bookings are confirmed on a first-come, first-served basis.",
      "The number of rooms you can book and the seasons you travel in are based on your membership plan.",
      "Your membership unlocks thoughtfully crafted experiences for you and your loved ones."
    ]
  }
];

export default function KeyDetails() {
  return (
    <section className="bg-white pb-20 px-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-6xl font-[Vera] tracking-tight text-neutral-900 mb-16 text-center">
            Club Elevate | Key Tenets
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {KEY_TENETS.map((tenet) => (
            <div
              key={tenet.id}
              className="group relative bg-neutral-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200"
            >
              {/* Hero Image with Overlay */}
              <div className="relative h-48 w-full">
                <Image
                  src={tenet.image}
                  alt={tenet.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <h3 className="absolute bottom-4 left-4 right-4 text-white text-xl font-semibold text-center drop-shadow-md">
                  {tenet.title}
                </h3>
              </div>

              {/* Benefits List */}
              <div className="p-6">
                <ul className="space-y-3">
                  {tenet.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}