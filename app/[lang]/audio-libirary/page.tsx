import AudioLibirary from '@/components/audioLibirary/AudioLibirary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المكتبة الصوتية',
  description: 'المكتبة الصوتية مركز سرج للدرسات والابحاث ',
  keywords: 'مركز,سرج,للدراسات,وبالابحاث,,دراسة,المذاهب,الفكرية,المعاصرة,منارة,البحث,العلمى,التعليم,المتخصص,الدينية,الفلسفية,السياسية',
  robots: 'index, follow',
  openGraph: {
    url: '',
    title: 'المكتبة الصوتية',
    description: 'المكتبة الصوتية مركز سرج للدرسات والابحاث ',
    images: [
      {
        url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
        width: 1200,
        height: 630,
        alt: 'المكتبة الصوتية مركز سرج للدرسات والابحاث',
      },
    ],
  },
}

const page = () => {
  return (
    <div><AudioLibirary /></div>
  )
}

export default page