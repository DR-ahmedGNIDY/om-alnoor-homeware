import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CartDrawer } from "@/components/ui/CartDrawer";

export const metadata: Metadata = {
  title: "Pharma One Cosmetics - كل منتجات التجميل في مكان واحد",
  description: "أكثر من 7000 منتج من أكثر من 100 براند عالمي. تسوق الآن أفضل منتجات التجميل والعناية بالبشرة والشعر والعطور.",
  keywords: "تجميل, عطور, مكياج, عناية بالبشرة, عناية بالشعر, Dior, Chanel, MAC, Huda Beauty, CeraVe, The Ordinary",
  authors: [{ name: "Pharma One Cosmetics" }],
  openGraph: {
    title: "Pharma One Cosmetics",
    description: "كل منتجات التجميل في مكان واحد",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-black text-cream font-arabic min-h-screen overflow-x-hidden">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
