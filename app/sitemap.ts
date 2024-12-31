import { MetadataRoute } from "next";
import axios from "axios";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch static url data
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
        { url: "https://www.sorooj.org/ar/privacy-policy", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/terms", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/delete-account", lastModified: new Date() },
    ];

    // Fetch dynamic courses data
    const coursesResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses`);
    const CoursesData = coursesResponse.data.data

    // Map dynamic data to sitemap format
    const coursesUrls = CoursesData.map((item: { slug: string; created_at: string }) => ({
        url: `https://www.sorooj.org/ar/${item.slug}`,
        lastModified: new Date(item.created_at), // Use the last modified date from the API
    }));

    //************************************************** */

    // Fetch dynamic books data
    const booksResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books`);
    const booksData = booksResponse.data.data

    // Map dynamic data to sitemap format
    const booksUrls = booksData.map((item: { slug: string; created_at: string }) => ({
        url: `https://www.sorooj.org/ar/${item.slug}`,
        lastModified: new Date(item.created_at), // Use the last modified date from the API
    }));
    //************************************************** */
    // Fetch dynamic blogs data
    const blogsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/blogs`);
    const blogsData = blogsResponse.data.data
    // Map dynamic data to sitemap format
    const blogsUrls = blogsData.map((item: { slug: string; created_at: string }) => ({
        url: `https://www.sorooj.org/ar/${item.slug}`,
        lastModified: new Date(item.created_at), // Use the last modified date from the API
    }));
    //************************************************** */
    // Fetch dynamic questions data
    const questionsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/fatwa/get-questions`);
    const questionsData = questionsResponse.data.data
    // Map dynamic data to sitemap format
    const questionsUrls = questionsData.map((item: { slug: string; created_at: string }) => ({
        url: `https://www.sorooj.org/ar/${item.slug}`,
        lastModified: new Date(item.created_at), // Use the last modified date from the API
    }));



    return [...staticUrls, ...coursesUrls, ...booksUrls, ...blogsUrls, ...questionsUrls];
}