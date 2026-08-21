"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    tag: "The Luxe Yatra Press",
    title: "A Dram of One's Own: Private Distillery Tours",
    image:
      "https://images.unsplash.com/photo-1760943013869-65a30a4fafd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJpdmF0ZSUyMGRlc3RpbmF0aW9ufGVufDB8fDB8fHww",
    link: "#",
  },
  {
    id: 2,
    tag: "The Luxe Yatra Press",
    title:
      "How The Luxe Yatra Offers Luxury Travelers Access to Private Estates",
    image:
      "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
  {
    id: 3,
    tag: "The Luxe Yatra Press",
    title: "Seven Great Hidden Island Escapes to Rent This Summer",
    image:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
  {
    id: 4,
    tag: "The Luxe Yatra Press",
    title: "A Dram of One's Own: Private Distillery Tours",
    image:
      "https://images.unsplash.com/photo-1760943013869-65a30a4fafd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJpdmF0ZSUyMGRlc3RpbmF0aW9ufGVufDB8fDB8fHww",
    link: "#",
  },
  {
    id: 5,
    tag: "The Luxe Yatra Press",
    title:
      "How The Luxe Yatra Offers Luxury Travelers Access to Private Estates",
    image:
      "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
  {
    id: 6,
    tag: "The Luxe Yatra Press",
    title: "Seven Great Hidden Island Escapes to Rent This Summer",
    image:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
];

export default function Blog() {
  return (
    <section className="bg-white py-24 px-6 sm:px-12 lg:px-16 w-full overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* 2. Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="group cursor-pointer flex flex-col bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden shrink-0 bg-neutral-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 flex flex-col grow justify-between">
                <div>
                  {/* Meta Row: Tag and External Icon */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] md:text-xs font-[Vera] font-bold tracking-widest text-[#B38E46] uppercase">
                      {post.tag}
                    </span>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#B38E46] transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-[Vera] font-bold tracking-tight text-neutral-900 leading-snug group-hover:text-[#B38E46] transition-colors duration-200">
                    {post.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
