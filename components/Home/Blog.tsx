"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const BLOG_POSTS = [
  {
    id: 1,
    title: "A Dram of One's Own: Private Distillery Tours",
    date: "January 12, 2026",
    image:
      "https://images.unsplash.com/photo-1760943013869-65a30a4fafd1?w=800&auto=format&fit=crop&q=80",
    link: "/blogs/1",
  },
  {
    id: 2,
    title: "How The Luxe Yatra Offers Luxury Access to Estates",
    date: "February 18, 2026",
    image:
      "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/2",
  },
  {
    id: 3,
    title: "Seven Great Hidden Island Escapes to Rent This Summer",
    date: "March 05, 2026",
    image:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/3",
  },
];

export default function Blog() {
  return (
    <section className="bg-white py-16 md:py-24 px-6 sm:px-12 lg:px-16 w-full overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center flex flex-col items-center mb-12 md:mb-16">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            LATEST ARTICLES & INSIGHTS
          </div>
          <h2 className="text-4xl md:text-8xl font-serif tracking-tight text-black mb-4">
            Blogs
          </h2>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="group cursor-pointer flex flex-col bg-transparent rounded-none border-0 overflow-hidden"
            >
              {/* Image Container with Hover Overlay (Image 2) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden shrink-0 bg-neutral-100 rounded-none">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Golden Tint Hover Overlay with Centered READ MORE */}
                <div className="absolute inset-0 bg-[#B38E46]/65 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-white text-xs tracking-[0.35em] font-medium uppercase border-b border-white pb-1">
                    READ MORE
                  </span>
                </div>
              </div>

              {/* Content Area below Image */}
              <div className="pt-6 pb-2 flex flex-col flex-1 gap-2.5">
                {/* Title */}
                <h3 className="text-xl md:text-2xl text-neutral-900 leading-snug font-light" style={{ fontFamily: "var(--work-font), sans-serif", fontWeight: 300 }}>
                  {post.title}
                </h3>

                {/* Date */}
                <p className="text-sm italic font-light text-neutral-500 tracking-wide">
                  {post.date}
                </p>

                {/* READ MORE Link */}
                <div className="pt-2">
                  <Link
                    href={post.link}
                    className="inline-block text-xs tracking-[0.25em] font-medium text-neutral-600 uppercase"
                  >
                    READ MORE
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <Link
            href="/blogs"
            className="border border-[#B38E46] text-[#B38E46] px-6 py-2.5 text-xs tracking-[0.25em] font-medium uppercase hover:bg-[#B38E46] hover:text-white transition-colors cursor-pointer rounded-md"
          >
            VIEW ALL
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
