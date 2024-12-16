import BookCardPage from '@/components/bookCardPage/BookCardPage'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "كتب وابحاث مركز سرج للدرسات والابحاث ",
  description: " كتب وابحاث مركز سرج كافة الاخبار والاحداث والدروس والمحاضرات المتعلفة بمركز سرج للدراسات والبحث العلمى منارة وفهم المذاهب الفكرية المعاصرة",
  keywords: "مركز,سرج,للدراسات,والابحاث,المذاهب,الفكرية,كتب,ابحاث,المعاصرة",
  openGraph: {
    title: "كتب وابحاث مركز سرج للدراسات والابحاث",
    description: "كتب وابحاث مركز سرج للدراسات والابحاث منارة البحث العلمى والمذاهب الفكرية المعاصرة",
    images: [
      {
        url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
        alt: "كتب وابحاث مركز سرج للدراسات والابحاث",
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