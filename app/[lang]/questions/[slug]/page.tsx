import { Metadata } from "next";
import QustionContentPage from "@/components/questionsPage/QustionContentPage";

// Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/fatwa/${params.slug}?lang=en`, {
            cache: "no-store", // Change to 'force-cache' for caching
        });

        if (!res.ok) throw new Error("Failed to fetch fatwa data");

        const fatwa = (await res.json()).data.FatwaAnswer;
        const question = fatwa.fatwa_question?.question || "Default Question Title";

        return {
            title: question,
            description: question,
            keywords: question,
            openGraph: {
                title: question,
                description: question,
                type: "website",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/fatwa/${params.slug}`,
                images: [
                    {
                        url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
                        alt: question,
                        width: 1200,
                        height: 630,
                    },
                ],
            },
            twitter: {
                site: "https://x.com/soroojcenter",
                card: "summary_large_image",
                title: question,
                description: question,
                images: [
                    {
                        url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
                        alt: question,
                        width: 1200,
                        height: 630,
                    },
                ],
            },
        };
    } catch (error) {
        console.error("Metadata fetch error:", error);
        return { title: "Error", description: "Could not fetch fatwa details" };
    }
}

// Optional: Enable Edge runtime for faster execution
export const runtime = "edge";

export default function Page() {
    return <QustionContentPage />;
}









// import QustionContentPage from "@/components/questionsPage/QustionContentPage"
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
//     const fatwa = response.data.data.FatwaAnswer;
//     return {
//       title: fatwa.fatwa_question.question,
//       description: fatwa.fatwa_question.question,
//       keywords: fatwa.fatwa_question.question,
//       openGraph: {
//         title: fatwa.fatwa_question.question,
//         description: fatwa.fatwa_question.question,
//         type: "website",
//         url: `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/fatwa/${params.slug}`,
//         images: [
//           {
//             url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
//             alt: fatwa.fatwa_question.qusetion,
//             width: 1200,
//             height: 630,
//           },
//         ],
//       },
//       twitter: {
//         site: 'https://x.com/soroojcenter',
//         card: 'summary_large_image',
//         title: fatwa.fatwa_question.question,
//         description: fatwa.fatwa_question.question,
//         images: [
//           {
//             url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
//             alt: fatwa.fatwa_question.question,
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

// // Default export
// export default function Page() {
//   return <QustionContentPage />;
// }
