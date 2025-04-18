import { Inter } from "next/font/google";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";

import "./globals.css";
import {getImagePath} from "@/lib/url";
import Alert from "@/app/_components/alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'SionCodes.',
  description: 'A blog about web development, software, and programming. ',
  openGraph: {
    title: 'SionCodes.',
    description: 'A blog about web development, software, and programming. ',
    url: 'https://sioncodes.com',
    siteName: 'SionCodes.',
    images: [
      {
        url: getImagePath("/assets/blog/documenting-with-tests/cover_small.webp"),
        alt: 'Discovering the world of web development and programming',
      },
    ],
    locale: 'en_EN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script defer data-domain="sioncodes.com" src="https://plausible.io/js/script.js"></script>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
      <Alert
        text="While we code, Ukrainians are fighting for our freedom. Please consider donating:"
        link={{
          url: "https://u24.gov.ua/donate",
          text: "United24 🇺🇦"
        }}
      />
      <ThemeSwitcher />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
