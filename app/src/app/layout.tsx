import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Serezha Shop — Оригінальні кросівки з США",
  description:
    "Купуй оригінальні кросівки New Balance та ASICS з США. Доставка по Україні без передоплати. Якість гарантована.",
  openGraph: {
    title: "Serezha Shop — Оригінальні кросівки з США",
    description:
      "Купуй оригінальні кросівки New Balance та ASICS з США. Доставка по Україні без передоплати.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#0a0a0f] text-white font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
