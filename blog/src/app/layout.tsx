import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import cn from "classnames";
import { ThemeScript } from "./_components/theme-switcher";

import "./globals.css";
import { getImagePath } from "@/lib/url";
import UkraineDonationBanner from "@/app/_components/ukraine-donation-banner";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://sioncodes.com"),
  title: "SionCodes.",
  description: "A blog about web development, software, and programming. ",
  openGraph: {
    title: "SionCodes.",
    description: "A blog about web development, software, and programming. ",
    url: "https://sioncodes.com",
    siteName: "SionCodes.",
    images: [
      {
        url: getImagePath("/assets/blog/documenting-with-tests/cover_small.webp"),
        alt: "Discovering the world of web development and programming",
      },
    ],
    locale: "en_EN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(sans.variable, serif.variable, mono.variable)}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#0e1424" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <Script
          defer
          data-domain="sioncodes.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <ThemeScript />
        <div className="scroll-progress" aria-hidden="true" />
        <UkraineDonationBanner />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
