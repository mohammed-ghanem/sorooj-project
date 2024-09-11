import type { Metadata } from "next";
import { Inter, Cairo, Almarai, Changa } from "next/font/google";
import "./globals.css";
import '../utils/fontAwesome'; // Import the Font Awesome configuration
import { AntdRegistry } from '@ant-design/nextjs-registry';

import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";

// Import Google fonts
const inter = Inter({ subsets: ["latin"] });
export const changa = Changa({
  subsets: [],
  weight: ['400'], // Adjust the weights as needed
});

// export const metadata: Metadata = {
//   title: "مركز سرج للدرسات وبالابحاث ",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={changa.className}>
        <Header />
        <AntdRegistry>{children}</AntdRegistry>
        <Footer />
      </body>
    </html>
  );
}




// import type { Metadata } from "next";
// import { Inter, Cairo, Almarai, Changa } from "next/font/google";
// import "./globals.css";
// import '../utils/fontAwesome'; // Import the Font Awesome configuration
// import { AntdRegistry } from '@ant-design/nextjs-registry';

// import Footer from "@/components/footer/Footer";
// import Header from "@/components/header/Header";





// // export const cairo = Cairo({
// //   subsets: ['latin'],
// //   weight: ['400', '700'], // Adjust the weights as needed
// // });

// export const changa = Changa({
//   subsets: [],
//   weight: ['400'], // Adjust the weights as needed
// });



// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="ar" dir="rtl">

//       <body className={changa.className}>
//         <Header />
//           <AntdRegistry>{children}</AntdRegistry>
//         <Footer />
//       </body>
//     </html>
//   );
// }
