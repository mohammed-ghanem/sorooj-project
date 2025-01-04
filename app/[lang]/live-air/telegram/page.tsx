import Telegram from "@/components/liveAir/Telegram";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "تيليجرام - البث المباشر",
  description: " قناة مركز سرج للدراسات والابحاث - تليجرام",
  keywords: "البث,المباشر,الموقع,الالكترونى,سرج,الدراسات,والابحاث",
  openGraph: {
    title: "البث مباشر",
    description: "  البث المباشر الموقع الالكتروني سرج للدراسات والابحاث",
    images: [
      {
        url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
        alt: "البث المباشر",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function page() {
  return <div><Telegram /></div>
} 