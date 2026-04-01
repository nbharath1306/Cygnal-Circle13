import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
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
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-[#F5F5F7] min-h-dvh font-[family-name:var(--font-apple)]">
        {children}
      </body>
    </html>
  );
}
