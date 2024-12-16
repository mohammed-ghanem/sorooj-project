import type { Metadata } from "next";
import "./globals.css";
import '@/utils/fontAwesome'; // Import the Font Awesome configuration
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import OverlaySpinnerManager from "@/components/overlaySpinner/OverlaySpinnerManager";



export const metadata: Metadata = {
  title: "مركز سرج  لدراسة المذاهب الفكرية المعاصرة ",
  description: "مركز سُرُجْ - منارة للبحث العلمى والتعليم المتخصص فى استكشاف وفهم المذاهب الفكرية المعاصرة , بما فى ذلك الدينية والفلسفية والسياسية من اجل تمكين المتعلمين فى اتخاذ قرارات مستنيرة فى ظل التنوع الفكرى المتزايد",
  keywords: "مركز,سرج,للدراسات,والابحاث,المذاهب,الفكرية,المعاصرة",
  openGraph: {
    title: " مركز سرج للدراسات والابحاث",
    description: " مركز سرج للدراسات والابحاث منارة البحث العلمى والمذاهب الفكرية المعاصرة",
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


export async function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
}

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {


  return (
    <html lang={params.lang} dir={params.lang === "ar" ? "rtl" : 'ltr'}>
      <body>
        <OverlaySpinnerManager />
        <Header />
        <AntdRegistry>
          {children}
        </AntdRegistry>
        <Footer />
      </body>
    </html>
  );
}