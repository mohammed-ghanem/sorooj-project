import { Metadata } from "next";
import LiveAir from "../../../components/liveAir/LiveAir";

export const metadata: Metadata = {
  title: "البث المباشر",
  description: "   البث المباشر الالكتروني سرج للدراسات والابحاث",
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

export default function aboutUs() {
  return <div><LiveAir /></div>
} 