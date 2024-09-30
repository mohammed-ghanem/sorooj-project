import type { Metadata } from "next";
// import { Inter, Cairo, Almarai, Changa } from "next/font/google";
import "./globals.css";
import '@/src/utils/fontAwesome'; // Import the Font Awesome configuration
import { AntdRegistry } from '@ant-design/nextjs-registry';

import Header from "@/src/components/header/Header";
import Footer from "@/src/components/footer/Footer";
import { Cairo } from 'next/font/google';

// Import Google Font
const cairo = Cairo({
  subsets: ['latin'],
  variable: '--font-cairo', // optional if you're using CSS variables
});

// Import Google fonts
// const inter = Inter({ subsets: ["latin"] });
// export const changa = Changa({
//   subsets: [],
//   weight: ['400'], // Adjust the weights as needed
// });

// export const metadata: Metadata = {
//   title: "مركز سرج للدرسات وبالابحاث ",
//   description: "Generated by create next app",
// };


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
    <html lang={params.lang} dir={params.lang === "ar" ? "rtl" : 'ltr'} className={cairo.className}>
      <body>
        <Header/>
        <AntdRegistry>
          {children}
        </AntdRegistry>
        <Footer />
      </body>
    </html>
  );
}






// import type { Metadata } from "next";
// import { Changa } from "next/font/google";
// import "./globals.css";
// import '../utils/fontAwesome'; // Import the Font Awesome configuration
// import { AntdRegistry } from '@ant-design/nextjs-registry';
// import Header from "@/src/components/header/Header";
// import Footer from "@/src/components/footer/Footer";
// import LocaleProvider from "./LocaleProvider";
// import { getLocale } from "next-intl/server";

// // Import Google fonts
// export const changa = Changa({
//   subsets: [], // Adjust the subsets as needed
//   weight: ['400'], // Adjust the weights as needed
// });

// // Metadata for the page (kept on server)
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const locale = await getLocale();
//   return (
//     <html lang={locale} dir="ltr">
//       <body className={changa.className}>
//         <Header />
//         <AntdRegistry>
//           {/* Move the NextIntl logic to the client-side component */}
//           <LocaleProvider>
//             {children}
//           </LocaleProvider>
//         </AntdRegistry>
//         <Footer />
//       </body>
//     </html>
//   );
// }