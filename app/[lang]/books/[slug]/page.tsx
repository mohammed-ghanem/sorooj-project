import BookContent from "@/components/bookContent/BookContent";
import { Metadata } from "next";

// Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books/${params.slug}?lang=en`, {
            cache: "no-store", // Change to 'force-cache' if you want caching
        });

        if (!res.ok) throw new Error("Failed to fetch book data");

        const book = (await res.json()).data.Books;

        return {
            title: book.book_name || "Default Book Title",
            description: book.seo?.description || "Default Book Description",
            keywords: book.seo?.keywords || [],
            openGraph: {
                title: book.book_name,
                description: book.description,
                type: "website",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/books/${params.slug}`,
                images: [{ url: book.image, alt: book.book_name, width: 1200, height: 630 }],
            },
            twitter: {
                title: book.book_name,
                description: book.description,
                card: "summary_large_image",
                site: "https://x.com/soroojcenter",
                images: [{ url: book.image, alt: book.book_name, width: 1200, height: 630 }],
            },
        };
    } catch (error) {
        console.error("Metadata fetch error:", error);
        return { title: "Error", description: "Could not fetch book details" };
    }
}

// Optional: Enable Edge runtime for faster execution
export const runtime = "edge";

export default function Page() {
    return <BookContent />;
}











// import BookContent from "@/components/bookContent/BookContent";
// import { Metadata } from 'next';
// import axios from 'axios';

// // Dynamic Metadata
// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//     try {
//         const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books/${params.slug}`,
//             {
//                 params: { lang: 'en' }, // Adjust language as needed
//             }
//         );
//         const book = response.data.data.Books;

//         return {
//             title: book.book_name || 'Default Course Title',
//             description: book.seo.description || 'Default Course Description',
//             keywords: book.seo.keywords,
//             openGraph: {
//                 title: book.book_name,
//                 description: book.description,
//                 type: "website",
//                 url: `${process.env.NEXT_PUBLIC_BASE_URL}/books/${params.slug}`,
//                 images: [
//                     {
//                         url: book.image,
//                         alt: book.course_name,
//                         width: 1200,
//                         height: 630,
//                     },
//                 ],
//             },
//             twitter: {
//                 title: book.book_name,
//                 description: book.description,
//                 card: 'summary_large_image',
//                 site: 'https://x.com/soroojcenter',
//                 images: [
//                     {
//                         url: book.image,
//                         alt: book.course_name,
//                         width: 1200,
//                         height: 630,
//                     },
//                 ],
//             },
//         };
//     } catch (error) {
//         return {
//             title: 'Error',
//             description: 'Could not fetch course details',
//         };
//     }
// }

// export default function Page() {
//     return <BookContent />;
// }
