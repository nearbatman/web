import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
  // next has no metric overrides for this family
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bigShoulders.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <div aria-hidden className="grain" />
        <div aria-hidden className="page-veil" />
      </body>
    </html>
  );
}
