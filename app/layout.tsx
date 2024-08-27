import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '../utils/fontAwesome'; // Import the Font Awesome configuration
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";


import { Cairo } from '@next/font/google';

export const cairo = Cairo({
  subsets: ['latin'],
  weight: ['400', '700'], // Adjust the weights as needed
});


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">

      <body className={cairo.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
