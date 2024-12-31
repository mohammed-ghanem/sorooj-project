import AboutUs from "@/components/aboutUs/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن مركز سرج للدرسات والابحاث ",
  description: " عن مركز سرج كافة الاخبار والاحداث والدروس والمحاضرات المتعلفة بمركز سرج للدراسات والبحث العلمى منارة وفهم المذاهب الفكرية المعاصرة",
  keywords: "مركز,سرج,للدراسات,والابحاث,المذاهب,الفكرية,المعاصرة",
  openGraph: {
      title: "عن مركز سرج للدراسات والابحاث",
      description: "عن مركز سرج للدراسات والابحاث منارة البحث العلمى والمذاهب الفكرية المعاصرة",
      images: [
          {
              url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
              alt: "عن مركز سرج للدراسات والابحاث",
              width: 1200,
              height: 630,
          },
      ],
  },
};

export default function aboutUs() {
  return <div><AboutUs /></div>
} 