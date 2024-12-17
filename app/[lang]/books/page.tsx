import BookCardPage from '@/components/bookCardPage/BookCardPage'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " كتب وابحاث مركز سرج للدراسات والابحاث",
  description: "  كتب وابحاث مركز سرج منارة البحث العلمى والمذاهب الفكرية المعاصرة",
  keywords: ",كتب,ابحاث,مركز,سرج,للدراسات,والابحاث,المذاهب,الفكرية,المعاصرة",
  openGraph: {
    title: "دورات تعليمية بمركز سرج للدراسات والابحاث",
    description: "كتب وابحاث  مركز سرج منارة البحث العلمى والمذاهب الفكرية المعاصرة",
    images: [
      {
        url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
        alt: " مركز سرج للدراسات والابحاث",
        width: 1200,
        height: 630,
      },
    ],
  },
};
const page = () => {
  return (
    <div><BookCardPage /></div>
  )
}

export default page