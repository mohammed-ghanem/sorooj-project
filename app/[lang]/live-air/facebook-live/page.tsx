import FacebookLive from "@/components/liveAir/FacebookLive";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: " فيسبوك - البث المباشر",
  description: " قناة مركز سرج للدراسات والابحاث - فيسبوك",
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
  return <div><FacebookLive/></div>
} 