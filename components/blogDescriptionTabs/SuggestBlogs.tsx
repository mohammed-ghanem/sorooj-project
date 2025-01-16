import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LangUseParams from '../translate/LangUseParams';
import BlogCardBox from '../blogCard/BlogCardBox';
interface Blog {
    id: number;
}
const SuggestBlogs = ({ currentBlogDetails }: any) => {
    const [blogsSuggest, setBlogsSuggest] = useState<[]>([]); // Updated type to array
    const lang = LangUseParams();
    //const { slug } = useParams();
    useEffect(() => {
        const fetchSuggestBlogs = async () => {
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

                const suggestedBlogs = response.data.data.suggested_blogs || [];

                // Filter courses by id instead of slug
                const filteredBlogs = suggestedBlogs.filter(
                    (blog: Blog) => blog.id !== currentBlogDetails
                );
                // Set the filtered courses to state
                setBlogsSuggest(filteredBlogs);
                //setBlogsSuggest(response.data.data.suggested_blogs); // Ensure this is an array
            } catch (error) {
                console.error('Error fetching suggested blogs', error);
            }
        };
        fetchSuggestBlogs();
    }, [currentBlogDetails]);

    return (
        <div className="grid grid-cols-1 gap-4">
            {blogsSuggest.length > 0
                ?
                blogsSuggest.map((blog: any) => (
                    <BlogCardBox
                        key={blog.id}
                        imgSrc={blog.image}
                        watchNumber={`${blog.view_count} مشاهدة`}
                        datePublish={blog.publish_date}
                        blogTitle={blog.blog_name}
                        descriptionBlog={blog.brief_description}
                        pathLinkToContent={`/${lang}/blog/${blog.slug}`}
                    />
                ))
                :
                "لا يوجد مدونات مقترحة"
            }
        </div>
    );
};

export default SuggestBlogs;
