import BlogContent from '@/components/blogContent/BlogContent'
import { Metadata } from 'next';
import axios from 'axios';

// Dynamic Metadata 
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/blogs/${params.slug}`,
            {
                params: { lang: 'en' }, // Adjust language as needed
            }
        );
        const blog = response.data.data.Blogs;

        return {
            title: blog.blog_name || 'Default blog Title',
            description: blog.seo.description || 'Default blog Description',
            keywords: blog.seo.keywords,
            openGraph: {
                title: blog.blog_name,
                description: blog.description,
                type: "website",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params.slug}`,
                images: [
                    {
                        url: blog.image,
                        alt: blog.blog_name,
                        width: 1200,
                        height: 630,
                    },
                ],
            },
            twitter: {
                title: blog.blog_name,
                description: blog.description,
                card: 'summary_large_image',
                site: 'https://x.com/soroojcenter',
                images: [
                    {
                        url: blog.image,
                        alt: blog.blog_name,
                        width: 1200,
                        height: 630,
                    },
                ],
            },
        };
    } catch (error) {
        return {
            title: 'Error',
            description: 'Could not fetch blog details',
        };
    }
}

export default function Page() {
    return <BlogContent />;
}