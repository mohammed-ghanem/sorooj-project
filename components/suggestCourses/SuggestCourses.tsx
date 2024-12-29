import React, { useEffect, useState } from 'react';
import CoursesCard from '../coursesCard/CoursesCard';
import axios from 'axios';
import LangUseParams from '../translate/LangUseParams';
import { useParams } from 'next/navigation';
import soroojImg from "@/public/assets/images/default.webp"; // Default image



const SuggestCourses = () => {
    const [coursesSuggest, setCoursesSuggest] = useState<[]>([]); // Updated type to array
    const lang = LangUseParams();
    const { slug } = useParams();
    useEffect(() => {
        const fetchSuggestCourses = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/suggested-courses`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            withCredentials: true,
                        },
                    }
                );
                setCoursesSuggest(response.data.data.suggested_courses); // Ensure this is an array
               
            } catch (error) {
                console.error('Error fetching suggested courses', error);
            }
        }; 
        fetchSuggestCourses();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4">
            {coursesSuggest.map((course: any) => (

                <CoursesCard
                    key={course.id}
                    imgSrc={course.image || soroojImg}
                    watchNumber={`${course.view_count} مشاهدة`}
                    datePublish={course.publish_date}
                    courseTitle={course.course_name}
                    doctorName={course.author_name}
                    descriptionCourse={course.brief_description}
                    pathLinkToContent={`/${lang}/courses/${course.slug}`}
                />
            ))}
        </div>
    );
};

export default SuggestCourses;
