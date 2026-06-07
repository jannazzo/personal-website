import type { Metadata, Viewport } from "next";
import { newsreader, hanken } from "./fonts";
import { revealFlagScript } from "./motion-script";
import { RevealMotion } from "./reveal-motion";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luke Jannazzo",
  description:
    "Luke Jannazzo — student, builder, and organizer in Columbia, SC. Founder of Inspire Columbia, President of Kappa Theta Pi, COO of LX Aer.",
  openGraph: {
    title: "Luke Jannazzo",
    description: "Student, builder, and organizer in Columbia, SC.",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline script below toggles the `reveal-js`
    // class on <html> before React hydrates.
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Sets the reveal-js flag before first paint; see app/motion-script.ts. */}
        <script dangerouslySetInnerHTML={{ __html: revealFlagScript }} />
        {children}
        <RevealMotion />
      </body>
    </html>
  );
}
