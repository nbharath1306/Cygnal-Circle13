import type { Metadata } from "next";
import { instrumentSerif, satoshi } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Circle13 — Connect",
  description: "Circle13 team link hub. Connect, explore, and collaborate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${satoshi.variable}`}>
      <body className="bg-bg-primary text-text-primary min-h-dvh">
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
