
import LiveAir from "@/components/liveAir/LiveAir";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "البث المباشر- يوتيوب",
  description: " قناة مركز سرج للدراسات والابحاث - يوتيوب",
  keywords: "البث,المباشر,الموقع,الالكترونى,سرج,الدراسات,والابحاث",
  openGraph: {
    title: "البث المباشر- يوتيوب",
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
  return <div><LiveAir /></div>
} 