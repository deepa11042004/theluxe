import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Work_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "@/components/PublicLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Elegant serif used for brand wordmarks / logotypes across the site (e.g. brand cards, brand modal).
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--work-font",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--cormorant-font",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.theluxeyatra.com"),
  title: {
    default: "The Luxe Yatra | Bespoke Luxury Travel & Curated Journeys",
    template: "%s | The Luxe Yatra",
  },
  description:
    "Discover the world's most exclusive destinations, 5-star handpicked resorts, bespoke luxury itineraries, and personalized concierge experiences with The Luxe Yatra.",
  keywords: [
    "luxury travel",
    "bespoke journeys",
    "The Luxe Yatra",
    "luxury hotels",
    "exclusive resorts",
    "curated itineraries",
    "private villas",
    "luxury vacations",
  ],
  authors: [{ name: "The Luxe Yatra" }],
  creator: "The Luxe Yatra",
  publisher: "The Luxe Yatra",
  alternates: {
    canonical: "https://www.theluxeyatra.com",
  },
  openGraph: {
    title: "The Luxe Yatra | Bespoke Luxury Travel & Curated Journeys",
    description:
      "Discover the world's most exclusive destinations, 5-star handpicked resorts, bespoke luxury itineraries, and personalized concierge experiences.",
    url: "https://www.theluxeyatra.com",
    siteName: "The Luxe Yatra",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Luxe Yatra | Bespoke Luxury Travel",
    description:
      "Bespoke luxury travel, handpicked 5-star resorts, and curated itineraries.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googleb2f1b5dd734bcd42",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${workSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
