
import ContactUs from '@/components/contactUs/ContactUs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description: ' تواصل معنا مركز سرج للدرسات والابحاث ',
  keywords: 'مركز,سرج,للدراسات,وبالابحاث,,دراسة,المذاهب,الفكرية,المعاصرة,منارة,البحث,العلمى,التعليم,المتخصص,الدينية,الفلسفية,السياسية',
  robots: 'index, follow',
  openGraph: {
    url: '',
    title: 'تواصل معنا',
    description: ' تواصل معنا مركز سرج للدرسات والابحاث ',
    images: [
      {
        url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
        width: 1200,
        height: 630,
        alt: ' تواصل معنا مركز سرج للدرسات والابحاث',
      },
    ],
  },
}
const page = () => {
  return (
    <div><ContactUs /></div>
  )
}

export default page