import { Metadata } from 'next';
import axios from 'axios';
import AudioLibraryContent from '@/components/audioLibraryContent/AudioLibraryContent';

// Dynamic Metadata 
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/audios/${params.slug}`,
            {
                params: { lang: 'en' }, // Adjust language as needed
            }
        );
        const audio = response.data.data.Audio;
        return {
            title: audio.name || 'Default audio Title',
            description: audio.description || 'Default audio Description',
            keywords: audio.keywords,
            openGraph: {
                title: audio.name ,
                description: audio.description,
                type: "website",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/audios/${params.slug}`,
            },
            twitter: {
                title: audio.name || 'Default audio Title',
                description: audio.description || 'Default audio Description',
                card: 'summary_large_image',
                site: 'https://x.com/soroojcenter',
            },
        };
    } catch (error) {
        return {
            title: 'Error',
            description: 'Could not fetch audio details',
        };
    }
}

export default function Page() {
    return <AudioLibraryContent />;
}