"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface BlogPost {
  id: number;
  category: string;
  tag: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  link: string;
}

const CATEGORIES = ["ALL ARTICLES", "DESTINATIONS", "PRIVILEGES", "LIFESTYLE", "PRESS"];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "PRIVILEGES",
    tag: "The Luxe Yatra Press",
    title: "A Dram of One's Own: Private Distillery Tours & Exclusive Tastings",
    date: "January 12, 2026",
    readTime: "5 min read",
    excerpt: "Embark on an extraordinary journey through hidden cellars and private distilleries across the Scottish Highlands and Japanese Alps.",
    image: "https://images.unsplash.com/photo-1760943013869-65a30a4fafd1?w=800&auto=format&fit=crop&q=80",
    featured: true,
    link: "/blogs/1",
  },
  {
    id: 2,
    category: "LIFESTYLE",
    tag: "Privilege Access",
    title: "How The Luxe Yatra Offers Luxury Access to Private Estates",
    date: "February 18, 2026",
    readTime: "4 min read",
    excerpt: "Unlock doors to historic châteaux, cliffside villas, and private island retreats reserved exclusively for our members.",
    image: "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/2",
  },
  {
    id: 3,
    category: "DESTINATIONS",
    tag: "Island Escapes",
    title: "Seven Great Hidden Island Escapes to Rent This Summer",
    date: "March 05, 2026",
    readTime: "6 min read",
    excerpt: "From secluded Mediterranean havens to untouched South Pacific sanctuaries, discover remote island living at its finest.",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/3",
  },
  {
    id: 4,
    category: "DESTINATIONS",
    tag: "Curated Journeys",
    title: "Unveiling India's Most Regal Palace Stays & Heritage Havens",
    date: "April 14, 2026",
    readTime: "7 min read",
    excerpt: "Experience royal hospitality, centuries-old architecture, and bespoke dining in Rajasthan’s premier heritage sanctuaries.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/4",
  },
  {
    id: 5,
    category: "PRESS",
    tag: "Global Insights",
    title: "The Future of Luxury Hospitality: High-Touch Concierge Services",
    date: "May 20, 2026",
    readTime: "5 min read",
    excerpt: "How personalized itineraries and 24/7 dedicated lifestyle managers are redefining expectations for high-net-worth travelers.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/5",
  },
  {
    id: 6,
    category: "PRIVILEGES",
    tag: "Member Benefits",
    title: "Maximizing Your Luxe Club Membership: Insider Tips & Vouchers",
    date: "June 02, 2026",
    readTime: "4 min read",
    excerpt: "Learn how to leverage complimentary room upgrades, dining credits, and partner airline perks for seamless travel.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/6",
  },
];

export default function Blogsec() {
  const [activeCategory, setActiveCategory] = useState("ALL ARTICLES");
  const [blogPostsList, setBlogPostsList] = useState<BlogPost[]>(BLOG_POSTS);

  React.useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/v1/blogs?limit=50");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const dbBlogs: BlogPost[] = json.data.map((blog: any, idx: number) => {
            const primaryImg =
              blog.images?.find((img: any) => img.is_featured)?.image_url ||
              blog.images?.[0]?.image_url ||
              "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800&q=80";

            const formattedDate = blog.published_at
              ? new Date(blog.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Recently Published";

            return {
              id: blog.id || idx + 100,
              category: blog.category?.name?.toUpperCase() || "PRIVILEGES",
              tag: blog.author_name || "The Luxe Yatra Editorial",
              title: blog.title,
              date: formattedDate,
              readTime: `${blog.reading_time || 5} min read`,
              excerpt: blog.excerpt || "Exclusive luxury travel story.",
              image: primaryImg,
              featured: blog.is_featured || idx === 0,
              link: `/blogs/${blog.slug}`,
            };
          });

          const dbTitles = new Set(dbBlogs.map((b) => b.title.toLowerCase().trim()));
          const remainingStatic = BLOG_POSTS.filter((b) => !dbTitles.has(b.title.toLowerCase().trim()));
          setBlogPostsList([...dbBlogs, ...remainingStatic]);
        }
      } catch (err) {
        console.error("Failed to fetch public blogs:", err);
      }
    }
    fetchBlogs();
  }, []);

  const filteredPosts =
    activeCategory === "ALL ARTICLES"
      ? blogPostsList
      : blogPostsList.filter((post) => post.category === activeCategory);

  const featuredPost = blogPostsList.find((p) => p.featured) || blogPostsList[0];

  return (
    <section className="bg-white py-16 md:py-24 px-6 sm:px-12 lg:px-16 w-full overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center mb-12 md:mb-16">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            LATEST ARTICLES & INSIGHTS
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
            The Luxe Journal
          </h2>
          <p className="font-[Vera] text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600 tracking-wide">
            Explore curated travel stories, destination spotlights, exclusive member privileges, and luxury lifestyle guides.
          </p>

          {/* Small Golden Vertical Divider */}
          <div className="flex justify-center my-8">
            <div className="w-[1.5px] h-12 md:h-16 bg-[#B38E46]/80"></div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-3 md:gap-4 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs tracking-[0.2em] font-medium uppercase transition-all duration-300 rounded-sm cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#B38E46] text-white shadow-md"
                  : "bg-white border border-neutral-300 text-neutral-600 hover:border-[#B38E46] hover:text-[#B38E46]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FEATURED SPOTLIGHT ARTICLE (when ALL ARTICLES selected) */}
        {activeCategory === "ALL ARTICLES" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16 group cursor-pointer border border-neutral-200/90 rounded-none overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-12 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Image Side */}
            <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto w-full overflow-hidden shrink-0">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-[#B38E46] text-white text-[10px] tracking-[0.3em] uppercase px-3.5 py-1.5 font-medium flex items-center gap-1.5 shadow-md rounded-sm">
                <Sparkles className="w-3 h-3" /> FEATURED STORY
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between text-neutral-900 bg-white">
              <div>
                <span className="text-xs font-[Vera] font-bold tracking-widest text-[#B38E46] uppercase block mb-3">
                  {featuredPost.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif leading-snug text-neutral-900 group-hover:text-[#B38E46] transition-colors mb-4">
                  {featuredPost.title}
                </h3>
                <p className="font-[Vera] text-xs md:text-sm text-neutral-600 leading-relaxed font-light mb-6">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs italic font-light text-neutral-500 mb-6 border-t border-neutral-200 pt-4">
                  <span>{featuredPost.date}</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Link
                  href={featuredPost.link}
                  className="inline-flex items-center gap-2 border border-[#B38E46] text-[#B38E46] px-6 py-3 text-xs tracking-[0.25em] font-medium uppercase hover:bg-[#B38E46] hover:text-white transition-all duration-300 rounded-sm cursor-pointer"
                >
                  READ FEATURED ARTICLE <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* BLOG CARDS GRID (Homepage Luxury Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="group cursor-pointer flex flex-col bg-transparent rounded-none border-0 overflow-hidden"
            >
              {/* Image Container with Hover Overlay (matching Homepage Blog.tsx) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden shrink-0 bg-neutral-100 rounded-none border border-neutral-200/60">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                <span className="text-[10px] md:text-xs font-[Vera] font-bold tracking-widest text-[#B38E46] uppercase">
                  {post.tag}
                </span>

                {/* Title */}
                <h3
                  className="text-xl md:text-2xl text-neutral-900 leading-snug font-light group-hover:text-[#B38E46] transition-colors duration-200"
                  style={{ fontFamily: "var(--work-font), sans-serif", fontWeight: 300 }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="font-[Vera] text-xs text-neutral-600 leading-relaxed font-light line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Date & Read Time */}
                <div className="flex items-center justify-between text-xs italic font-light text-neutral-500 tracking-wide pt-1">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                {/* READ MORE Link */}
                <div className="pt-2">
                  <Link
                    href={post.link}
                    className="inline-block text-xs tracking-[0.25em] font-medium text-neutral-600 uppercase group-hover:text-[#B38E46] transition-colors"
                  >
                    READ MORE &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NEWSLETTER CTA BOX */}
        <div className="mt-20 pt-16 border-t border-neutral-200">
          <div className="bg-[rgb(25,25,112)] text-white p-8 md:p-14 text-center rounded-none relative overflow-hidden flex flex-col items-center">
            <div className="text-xs tracking-[0.4em] text-white uppercase font-light mb-4" style={{ color: "#ffffff" }}>
              THE LUXE JOURNAL NEWSLETTER
            </div>
            <h3 className="text-2xl md:text-4xl font-serif text-white mb-4 max-w-2xl" style={{ color: "#ffffff" }}>
              Subscribe for Exclusive Travel Stories & Private Offers
            </h3>
            <p className="font-[Vera] text-xs md:text-sm text-white max-w-lg mb-8 font-light leading-relaxed opacity-95" style={{ color: "#ffffff" }}>
              Receive curated destination guides, private estate access alerts, and member privileges directly to your inbox.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-5 py-3 text-xs bg-white text-black placeholder-neutral-500 border border-transparent focus:outline-none focus:border-[#B38E46] rounded-sm"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 bg-[#B38E46] hover:bg-[#997734] text-white text-xs tracking-[0.2em] uppercase font-medium transition-colors shrink-0 cursor-pointer rounded-sm"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
