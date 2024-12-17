import BookCardPage from '@/components/bookCardPage/BookCardPage'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "دورات تعليمية بمركز سرج للدراسات والابحاث",
  description: "دورات تعليمية مجانية منارة البحث العلمى والمذاهب الفكرية المعاصرة",
  keywords: ",دورات,تعليمية,مركز,سرج,للدراسات,والابحاث,المذاهب,الفكرية,المعاصرة",
  openGraph: {
    title: "دورات تعليمية بمركز سرج للدراسات والابحاث",
    description: "دورات تعليمية مجانية منارة البحث العلمى والمذاهب الفكرية المعاصرة",
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