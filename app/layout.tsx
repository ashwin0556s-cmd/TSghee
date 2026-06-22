import type { Metadata } from "next";
import { Noto_Serif_Tamil, Playfair_Display, Poppins } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const notoTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  weight: ["600", "700"],
  variable: "--font-noto-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TS Ghee Store | Premium Dairy Products in Trichy",
  description:
    "Farm fresh ghee, butter, paneer, curd, milk, cheese and palkova from TS Ghee Store, Tiruchirapalli. Order online for home delivery.",
  keywords: ["TS Ghee Store", "Trichy dairy", "ghee", "butter", "paneer", "milk delivery", "farm fresh"],
  openGraph: {
    title: "TS Ghee Store | Premium Dairy Products",
    description: "Farm fresh dairy products delivered to your doorstep in Trichy.",
    url: "https://tsgheestore.com",
    siteName: "TS Ghee Store",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TS Ghee Store",
    description: "Premium dairy products from Trichy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} ${notoTamil.variable} font-body`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
