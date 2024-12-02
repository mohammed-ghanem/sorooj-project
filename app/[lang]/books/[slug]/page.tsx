import BookContent from "@/components/bookContent/BookContent";
import { Metadata } from 'next';
import axios from 'axios';

// Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books/${params.slug}`,
            {
                params: { lang: 'en' }, // Adjust language as needed
            } 
        );
        const book = response.data.data.Books;

        return {
            title: book.book_name || 'Default Course Title',
            description: book.seo.description || 'Default Course Description',
            keywords: book.seo.keywords,
            openGraph: {
                title: book.book_name,
                description: book.description,
                images: [
                    {
                        url: book.image ,
                        alt: book.course_name,
                        width: 1200,
                        height: 630,
                    },
                ],
            },
        };
    } catch (error) {
        return {
            title: 'Error',
            description: 'Could not fetch course details',
        };
    }
}

export default function Page() {
  return <BookContent />;
}
