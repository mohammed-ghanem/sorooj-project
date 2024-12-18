import React, { useEffect, useState } from 'react';
import CoursesCard from '../coursesCard/CoursesCard';
import axios from 'axios';
import LangUseParams from '../translate/LangUseParams';
import { useParams } from 'next/navigation';
import soroojImg from "@/public/assets/images/default.webp"; // Default image
import BlogCardBox from '../blogCard/BlogCardBox';



const SuggestBlogs = () => {
    const [blogsSuggest, setBlogsSuggest] = useState<[]>([]); // Updated type to array
    const lang = LangUseParams();
    const { slug } = useParams();
    useEffect(() => {
        const fetchSuggestCourses = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/blogs/suggested-blogs`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            withCredentials: true,
                        },
                    }
                );
                setBlogsSuggest(response.data.data.suggested_blogs); // Ensure this is an array
            } catch (error) {
                console.error('Error fetching suggested courses', error);
            }
        };
        fetchSuggestCourses();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4">
            {blogsSuggest.map((blog: any) => (
                <BlogCardBox
                    key={blog.id}
                    imgSrc={blog.image}
                    watchNumber={`${blog.view_count} مشاهدة`}
                    datePublish={blog.publish_date}
                    blogTitle={blog.blog_name}
                    descriptionBlog={blog.brief_description}
                    pathLinkToContent={`/${lang}/blogs/${blog.slug}`}
                />
            ))}
        </div>
    );
};

export default SuggestBlogs;
