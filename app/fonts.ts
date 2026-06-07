import { Newsreader, Hanken_Grotesk } from "next/font/google";

// Display serif. Optical sizing (`opsz`) is enabled and italic is loaded for the
// tagline; the variable axes cover the 300–600 weight range used by the design.
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-newsreader",
});

// UI / label sans. Variable font, so the 400–700 weights used by the design are
// all available without listing them.
export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});
