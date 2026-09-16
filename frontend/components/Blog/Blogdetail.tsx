/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, Share2, ArrowRight, User, BookOpen } from "lucide-react";

interface BlogDetailProps {
  slug: string;
}

const STATIC_FALLBACK_BLOGS: Record<string, any> = {
  "1": {
    id: 1,
    slug: "a-dram-of-ones-own-private-distillery-tours-exclusive-tastings",
    title: "A Dram of One's Own: Private Distillery Tours & Exclusive Tastings",
    category: "PRIVILEGES",
    author: "The Luxe Yatra Editorial",
    date: "January 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1760943013869-65a30a4fafd1?w=1200&auto=format&fit=crop&q=80",
    excerpt: "Embark on an extraordinary journey through hidden cellars and private distilleries across the Scottish Highlands and Japanese Alps.",
    content: `
      <p className="lead">Embarking on a journey through the world's most prestigious distilleries is more than a tasting—it is an immersive dive into centuries of heritage, craftsmanship, and quiet luxury.</p>

      <h2>The Highlands & Speyside: Legends in Wood & Malt</h2>
      <p>In Scotland's historic Speyside region, private doors open to vaulted barrel houses where single malts age silently in rare Oloroso sherry casks. Guided by master blenders, members enjoy unblended cask-strength drams drawn directly from vintage hogsheads that date back to the 1970s.</p>

      <blockquote className="my-8 pl-6 border-l-2 border-[#B38E46] italic font-serif text-xl text-neutral-800">
        "True luxury in spirits lies not in the age printed on the label, but in the intimacy of discovering a cask that will never be replicated."
      </blockquote>

      <h2>The Japanese Alps: Craft, Precision & Mountain Water</h2>
      <p>High in the snow-draped peaks of Yamazaki and Hakushu, private distillery tours offer an extraordinary glimpse into Japan's master craft. Here, copper pot stills shaped by hand sit amidst untouched pine forests, producing whiskies famed for delicate floral notes and subtle peat smoke.</p>

      <h2>Curated Tastings & Private Cask Selection</h2>
      <p>Through The Luxe Yatra privileges, members receive VIP access to private tasting salons, rare archive releases, and custom cask acquisition opportunities with personal sommelier assistance.</p>
    `,
  },
  "2": {
    id: 2,
    slug: "how-the-luxe-yatra-offers-luxury-access-to-private-estates",
    title: "How The Luxe Yatra Offers Luxury Access to Private Estates",
    category: "LIFESTYLE",
    author: "Privilege Access Desk",
    date: "February 18, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Unlock doors to historic châteaux, cliffside villas, and private island retreats reserved exclusively for our members.",
    content: `
      <p className="lead">The modern luxury traveler seeks privacy, authenticity, and effortless elegance above all else. Private estates offer a sanctuary removed from commercial hospitality.</p>

      <h2>Secluded Châteaux & Historic Manor Houses</h2>
      <p>From the rolling vineyards of the Loire Valley to private estates in Tuscany, our members unlock exclusive access to private residences with full butler service, private chefs, and helicopter landing pads.</p>

      <h2>Tailored Hospitality & Absolute Discretion</h2>
      <p>Every stay is customized down to personal preferences, from curated wine cellars stocked with rare vintages to bespoke wellness therapies delivered in private spa pavilions.</p>
    `,
  },
  "3": {
    id: 3,
    slug: "seven-great-hidden-island-escapes-to-rent-this-summer",
    title: "Seven Great Hidden Island Escapes to Rent This Summer",
    category: "DESTINATIONS",
    author: "Island Escapes Desk",
    date: "March 05, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
    excerpt: "From secluded Mediterranean havens to untouched South Pacific sanctuaries, discover remote island living at its finest.",
    content: `
      <p className="lead">Escape the crowds and immerse yourself in pristine marine reserves, private white-sand beaches, and turquoise lagoons across the globe.</p>

      <h2>1. The Maldives: Private Atoll Sanctuaries</h2>
      <p>Overwater villas with glass floor panels, direct ocean access, and private infinity pools overlooking coral reefs teeming with marine life.</p>

      <h2>2. The Cyclades, Greece: Secluded Aegean Retreats</h2>
      <p>Whitewashed villas perched high above blue waters, offering total seclusion, sunset infinity pools, and private yacht charters.</p>
    `,
  },
  "4": {
    id: 4,
    slug: "unveiling-indias-most-regal-palace-stays-heritage-havens",
    title: "Unveiling India's Most Regal Palace Stays & Heritage Havens",
    category: "DESTINATIONS",
    author: "Curated Journeys",
    date: "April 14, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Experience royal hospitality, centuries-old architecture, and bespoke dining in Rajasthan’s premier heritage sanctuaries.",
    content: `
      <p className="lead">India's royal heritage lives on in iconic palaces turned luxury havens, where guests live like royalty amidst grand courtyards and marble fountains.</p>

      <h2>Udaipur: The Lake Palace & City Palaces</h2>
      <p>Floating gracefully on Lake Pichola, experience private boat arrivals, peacock-adorned gardens, and royal dining beneath starry skies.</p>

      <h2>Jaipur & Jodhpur: Fortresses of Splendor</h2>
      <p>Immerse yourself in grand suites featuring hand-painted frescoes, private courtyard plunge pools, and royal concierge experiences.</p>
    `,
  },
  "5": {
    id: 5,
    slug: "the-future-of-luxury-hospitality-high-touch-concierge-services",
    title: "The Future of Luxury Hospitality: High-Touch Concierge Services",
    category: "PRESS",
    author: "Global Insights Desk",
    date: "May 20, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    excerpt: "How personalized itineraries and 24/7 dedicated lifestyle managers are redefining expectations for high-net-worth travelers.",
    content: `
      <p className="lead">Luxury is shifting from marble lobbies to hyper-personalized human connections and anticipatory service.</p>

      <h2>Anticipatory Personalization</h2>
      <p>Modern concierge teams do not just fulfill requests—they anticipate needs before they are voiced, arranging seamless transfers and tailored experiences.</p>
    `,
  },
  "6": {
    id: 6,
    slug: "maximizing-your-luxe-club-membership-insider-tips-vouchers",
    title: "Maximizing Your Luxe Club Membership: Insider Tips & Vouchers",
    category: "PRIVILEGES",
    author: "Luxe Club Concierge",
    date: "June 02, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Learn how to leverage complimentary room upgrades, dining credits, and partner airline perks for seamless travel.",
    content: `
      <p className="lead">Your Luxe Club membership unlocks a gateway of curated privileges, complimentary stay vouchers, and preferred partner rates.</p>

      <h2>1. Redeem Your Welcome Vouchers Early</h2>
      <p>Take full advantage of your ₹50,000 welcome voucher portfolio across domestic and international luxury resort partner stays.</p>

      <h2>2. Utilize Dedicated Concierge Booking</h2>
      <p>Connect directly with your personal Luxe Concierge manager for room upgrades, early check-in, and complimentary spa benefits.</p>
    `,
  },
};

export default function BlogDetail({ slug }: BlogDetailProps) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogDetail() {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/blogs/${slug}`);
        const json = await res.json();
        if (json.success && json.data) {
          const item = json.data;
          const primaryImg =
            item.images?.find((img: any) => img.is_featured)?.image_url ||
            item.images?.[0]?.image_url ||
            "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1200&q=80";

          const formattedDate = item.published_at
            ? new Date(item.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Recently Published";

          setBlog({
            id: item.id,
            title: item.title,
            category: item.category?.name?.toUpperCase() || "LUXE EDITORIAL",
            author: item.author_name || "The Luxe Yatra Editorial",
            date: formattedDate,
            readTime: `${item.reading_time || 5} min read`,
            image: primaryImg,
            excerpt: item.excerpt,
            content: item.content || item.description || `<p className="leading-relaxed text-neutral-700">${item.excerpt || "Exclusive story from The Luxe Yatra."}</p>`,
          });
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Failed to fetch blog detail from API:", err);
      }

      // Check static fallback map
      const staticMatch =
        STATIC_FALLBACK_BLOGS[slug] ||
        Object.values(STATIC_FALLBACK_BLOGS).find(
          (b) => b.slug === slug || b.id.toString() === slug
        ) ||
        STATIC_FALLBACK_BLOGS["6"];

      setBlog(staticMatch);
      setLoading(false);
    }

    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#B38E46] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#B38E46]">Loading Story...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-32 px-6 text-center">
        <h2 className="text-3xl font-serif text-neutral-900 mb-4">Story Not Found</h2>
        <p className="text-sm text-neutral-600 mb-8 max-w-md">
          The editorial article you are looking for is unavailable or has been moved.
        </p>
        <Link
          href="/blogs"
          className="border border-[#B38E46] text-[#B38E46] px-6 py-2.5 text-xs tracking-[0.25em] uppercase font-medium hover:bg-[#B38E46] hover:text-white transition-all rounded-sm"
        >
          Return to All Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white text-neutral-900 pb-24">
      {/* 1. Header Navigation Bar */}
      <div className="w-full bg-neutral-50 border-b border-neutral-200/80 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B38E46] hover:text-[#967536] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">
            {blog.category}
          </span>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-16 pb-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B38E46]/10 border border-[#B38E46]/30 text-[#B38E46] text-[10px] uppercase tracking-widest font-semibold rounded-sm mb-6">
          <Tag className="w-3 h-3" />
          <span>{blog.category}</span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-neutral-900 leading-[1.15] mb-6 max-w-3xl">
          {blog.title}
        </h1>

        {blog.excerpt && (
          <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed max-w-2xl mb-8">
            {blog.excerpt}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-neutral-500 font-medium border-y border-neutral-100 py-4 w-full">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#B38E46]" />
            <span>{blog.author}</span>
          </div>
          <span className="text-neutral-300">•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#B38E46]" />
            <span>{blog.date}</span>
          </div>
          <span className="text-neutral-300">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#B38E46]" />
            <span>{blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* 3. Main Cover Image */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-none overflow-hidden shadow-xl border border-neutral-200/80">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      {/* 4. Article Content Body */}
      <div className="max-w-3xl mx-auto px-6">
        <div
          className="prose prose-lg prose-neutral max-w-none 
            prose-headings:font-serif prose-headings:font-medium prose-headings:text-neutral-900 prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:text-sm prose-p:sm:text-base prose-p:mb-6 prose-p:font-light
            prose-a:text-[#B38E46] prose-a:underline hover:prose-a:text-[#967536]
            prose-blockquote:border-l-[#B38E46] prose-blockquote:italic prose-blockquote:text-neutral-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Share & Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-medium">
            <Share2 className="w-4 h-4 text-[#B38E46]" />
            <span>Share this Editorial</span>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 border border-[#B38E46] text-[#B38E46] px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#B38E46] hover:text-white transition-all rounded-sm"
          >
            <span>Explore More Stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
