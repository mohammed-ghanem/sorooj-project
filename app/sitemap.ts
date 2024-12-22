import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // const fetchWithFallback = async (url: string) => {
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
    //         return await response.json();
    //     } catch (error) {
    //         console.error(error);
    //         return [];
    //     }
    // };

    // const endpoints = ["courses", "books", "blogs"];
    // const [courses, books, questions, blogs] = await Promise.all(
    //     endpoints.map((endpoint) =>
    //         fetchWithFallback(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/${endpoint}`)
    //     )
    // );

    // const courseUrls = courses.map((course: { slug: string; created_at: string }) => ({
    //     url: `https://www.sorooj.org/ar/courses/${course.slug}`,
    //     lastModified: course.created_at ? new Date(course.created_at) : new Date(),
    // }));

    // const bookUrls = books.map((book: { slug: string; created_at: string }) => ({
    //     url: `https://www.sorooj.org/ar/books/${book.slug}`,
    //     lastModified: book.created_at ? new Date(book.created_at) : new Date(),
    // }));

    // const blogUrls = blogs.map((blog: { slug: string; created_at: string }) => ({
    //     url: `https://www.sorooj.org/ar/blogs/${blog.slug}`,
    //     lastModified: blog.created_at ? new Date(blog.created_at) : new Date(),
    // }));

    const staticUrls = [
        { url: "https://www.sorooj.org/ar/about", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/courses", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/books", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/blogs", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/questions", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/video-libirary", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/audio-libirary", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/liveair", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/contact-us", lastModified: new Date() },
    ];
 
    return [...staticUrls];
}