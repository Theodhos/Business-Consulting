import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tide-global.com"),
  title: {
    default: `${site.name} — ${site.division}`,
    template: `%s — ${site.name}`,
  },
  description:
    "A boutique private client immigration advisory firm in Johannesburg, serving high-net-worth individuals, investors, executives and families seeking South African residence.",
  openGraph: {
    type: "website",
    siteName: `${site.name} ${site.division}`,
    locale: "en_ZA",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:bg-gold focus:px-5 focus:py-3 focus:font-sans focus:text-[11px] focus:font-semibold focus:uppercase focus:tracking-[0.18em] focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex flex-grow flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
