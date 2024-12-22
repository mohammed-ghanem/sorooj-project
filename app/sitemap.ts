import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch courses data from  API
    const coursesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses`);
    const courses = await coursesResponse.json();
    // Fetch books data from  API
    const booksResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books`);
    const books = await booksResponse.json();
    // Fetch questions data from  API
    const questionsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/get-questions`);
    const questions = await questionsResponse.json();
    // Fetch blog data from  API
    const blogResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/blogs`);
    const blogs = await blogResponse.json();

    // Generate dynamic course URLs
    const courseUrls = courses.map((course: { slug: string; created_at: string }) => ({
        url: `https://www.sorooj.org/ar/courses/${course.slug}`,
        lastModified: new Date(course.created_at), // Use the course's last updated date
    }));
    // Generate dynamic book URLs
    const bookUrls = books.map((book: { slug: string; created_at: string }) => ({
        url: `https://www.sorooj.org/ar/books/${book.slug}`,
        lastModified: new Date(book.created_at), // Use the book's last updated date
    }));
    // Generate dynamic question URLs
    const questionUrls = questions.map((question: { slug: string; created_at: string }) => ({
        url: `https://www.sorooj.org/ar/questions/${question.slug}`,
        lastModified: new Date(question.created_at), // Use the question's last updated date
    }));
    // Generate dynamic blog URLs
    const blogUrls = blogs.map((blog: { slug: string; created_at: string }) => ({
        url: `https://www.sorooj.org/ar/blogs/${blog.slug}`,
        lastModified: new Date(blog.created_at), // Use the blog's last updated date
    }));


    // Static pages
    const staticUrls = [
        { url: "https://www.sorooj.org/ar/about", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/courses", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/books", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/questions", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/video-libirary", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/audio-libirary", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/liveair", lastModified: new Date() },
        { url: "https://www.sorooj.org/ar/contact-us", lastModified: new Date() },
    ];

    // Combine static URLs with blog URLs
    return [
        ...staticUrls,
        ...blogUrls,
        ...courseUrls,
        ...bookUrls,
        ...questionUrls,
    ];
}