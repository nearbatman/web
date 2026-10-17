import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content";
import { Loader, loaderBootScript } from "@/components/layout/Loader";
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
  title: { default: site.title, template: `%s | ${site.ticker}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.ticker,
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
    // the boot script may add html.loader-active before react hydrates
    <html lang="en" className={`${bigShoulders.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: loaderBootScript }} />
        <Loader />
        {children}
        <div aria-hidden className="vignette" />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
