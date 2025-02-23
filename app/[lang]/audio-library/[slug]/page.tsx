import { Metadata } from "next";
import AudioLibraryContent from "@/components/audioLibraryContent/AudioLibraryContent";

// Dynamic Metadata 
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/audios/${params.slug}?lang=en`, {
            cache: "no-store", // Change to 'force-cache' for caching
        });

        if (!res.ok) throw new Error("Failed to fetch audio data");

        const audio = (await res.json()).data.Audio;

        return {
            title: audio.name || "Default Audio Title",
            description: audio.description || "Default Audio Description",
            keywords: audio.keywords || [],
            openGraph: {
                title: audio.name,
                description: audio.description,
                type: "website",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/audios/${params.slug}`,
            },
            twitter: {
                site: "https://x.com/soroojcenter",
                card: "summary_large_image",
                title: audio.name,
                description: audio.description,
            },
        };
    } catch (error) {
        console.error("Metadata fetch error:", error);
        return { title: "Error", description: "Could not fetch audio details" };
    }
}

// Optional: Enable Edge runtime for faster execution
export const runtime = "edge";

export default function Page() {
    return <AudioLibraryContent />;
}







// import { Metadata } from 'next';
// import axios from 'axios';
// import AudioLibraryContent from '@/components/audioLibraryContent/AudioLibraryContent';

// // Dynamic Metadata 
// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//     try {
//         const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/audios/${params.slug}`,
//             {
//                 params: { lang: 'en' }, // Adjust language as needed
//             }
//         );
//         const audio = response.data.data.Audio;
//         return {
//             title: audio.name || 'Default audio Title',
//             description: audio.description || 'Default audio Description',
//             keywords: audio.keywords,
//             openGraph: {
//                 title: audio.name ,
//                 description: audio.description,
//                 type: "website",
//                 url: `${process.env.NEXT_PUBLIC_BASE_URL}/audios/${params.slug}`,
//             },
//             twitter: {
//                 title: audio.name || 'Default audio Title',
//                 description: audio.description || 'Default audio Description',
//                 card: 'summary_large_image',
//                 site: 'https://x.com/soroojcenter',
//             },
//         };
//     } catch (error) {
//         return {
//             title: 'Error',
//             description: 'Could not fetch audio details',
//         };
//     }
// }

// export default function Page() {
//     return <AudioLibraryContent />;
// }