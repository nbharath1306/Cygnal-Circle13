import { Inter } from "next/font/google";

/**
 * Apple uses SF Pro. On the web, apple.com falls back to Inter /
 * system-ui. Inter with the right weights and optical sizing
 * is the closest match available on Google Fonts.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-apple",
});

// Keep these aliases so layout.tsx doesn't break
export const instrumentSerif = inter;
export const satoshi = inter;
