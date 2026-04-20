import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://smartplay.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Smartplay — Youth soccer performance intelligence",
    template: "%s — Smartplay",
  },
  description:
    "Smartplay ties a serious soccer week together — session, recovery, film, mindset — and gives athletes, coaches, and parents a view that fits them.",
  applicationName: "Smartplay",
  keywords: [
    "youth soccer",
    "athlete development",
    "training log",
    "performance analytics",
    "recovery",
    "video review",
    "coach software",
    "parent view",
  ],
  authors: [{ name: "Smartplay" }],
  creator: "Smartplay",
  publisher: "Smartplay",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Smartplay",
    title: "Smartplay — Youth soccer performance intelligence",
    description:
      "The week works harder when it's specific. Built for athletes 13–19 and the adults around them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smartplay — Youth soccer performance intelligence",
    description:
      "The week works harder when it's specific. Built for athletes 13–19 and the adults around them.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#06100b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
