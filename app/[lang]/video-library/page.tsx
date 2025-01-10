import VideoGallery from "@/components/lightGallery/VideoGallery"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المكتبة المرئية',
  description: 'المكتبة المرئية مركز سرج للدرسات والابحاث ',
  keywords: 'مركز,سرج,للدراسات,وبالابحاث,,دراسة,المذاهب,الفكرية,المعاصرة,منارة,البحث,العلمى,التعليم,المتخصص,الدينية,الفلسفية,السياسية',
  robots: 'index, follow',
  openGraph: {
    url: '',
    title: 'المكتبة المرئية',
    description: 'المكتبة المرئية مركز سرج للدرسات والابحاث ',
    images: [
      {
        url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
        width: 1200,
        height: 630,
        alt: 'المكتبة المرئية مركز سرج للدرسات والابحاث',
      },
    ],
  },
}
const page = () => {
  return (
    <div>
      videos
      {/* <VideoGallery /> */}
    </div>
  )
}

export default page