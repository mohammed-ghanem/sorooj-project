import QustionContentPage from "@/components/questionsPage/QustionContentPage"
// import { Metadata } from 'next';
// import axios from 'axios';

// // Dynamic Metadata
// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/fatwa/${params.slug}`,
//       {
//         params: { lang: 'en' }, // Adjust language as needed
//       }
//     );
//     const fatwa = response.data.data;

//     return {
//       title: fatwa.qusetion || 'سؤال وجواب',
//       description: fatwa.qusetion || 'طلب فتوى',
//       keywords: fatwa.qusetion,
//       openGraph: {
//         title: fatwa.qusetion,
//         description: fatwa.qusetion,
//         type: "website",
//         url: `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/fatwa/${params.slug}`,
//         images: [
//           {
//             url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
//             alt: fatwa.qusetion,
//             width: 1200,
//             height: 630,
//           },
//         ],
//       },
//       twitter: {
//         site: 'https://x.com/soroojcenter',
//         card: 'summary_large_image',
//         title: fatwa.qusetion,
//         description: fatwa.qusetion,
//         images: [
//           {
//             url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
//             alt: fatwa.qusetion,
//             width: 1200,
//             height: 630,
//           },
//         ],
//       },
//     };
//   } catch (error) {
//     return {
//       title: 'Error',
//       description: 'Could not fetch course details',
//     };
//   }
// }

// Default export
export default function Page() {
  return <QustionContentPage />;
}
