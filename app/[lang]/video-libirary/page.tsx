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
        url: '',
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
      <VideoGallery />
    </div>
  )
}

export default page