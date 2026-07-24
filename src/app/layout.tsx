import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
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
    "A boutique private client immigration advisory firm in Sandton, serving high-net-worth individuals, investors, executives and families seeking South African residence.",
  openGraph: {
    type: "website",
    siteName: `${site.name} ${site.division}`,
    locale: "en_ZA",
  },
  robots: { index: true, follow: true },
};

/**
 * Phones get the real layout, never a zoomed-out desktop one. `maximumScale` is
 * left alone deliberately — pinch-zoom stays available.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1A3A5C",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full overflow-x-clip`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-clip w-full" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:bg-gold focus:px-5 focus:py-3 focus:font-sans focus:text-[11px] focus:font-semibold focus:uppercase focus:tracking-[0.18em] focus:text-ink"
        >
          Skip to content
        </a>
        <SiteChrome>
          <Navbar />
        </SiteChrome>
        <main id="main" className="flex flex-grow flex-col">
          {children}
        </main>
        <SiteChrome>
          <Footer />
        </SiteChrome>
      </body>
    </html>
  );
}
