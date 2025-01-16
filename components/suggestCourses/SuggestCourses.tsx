import React, { useEffect, useState } from 'react';
import CoursesCard from '../coursesCard/CoursesCard';
import axios from 'axios';
import LangUseParams from '../translate/LangUseParams';
import soroojImg from "@/public/assets/images/default.webp"; // Default image

interface Course {
    id: number;
}

const SuggestCourses = ({ currentCourseId }: any) => {
    const [coursesSuggest, setCoursesSuggest] = useState<Course[]>([]);
    const lang = LangUseParams();
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
                const suggestedCourses = response.data.data.suggested_courses || [];

                // Filter courses by id instead of slug
                const filteredCourses = suggestedCourses.filter(
                    (course: Course) => course.id !== currentCourseId
                );
                // Set the filtered courses to state
                setCoursesSuggest(filteredCourses);

                //  setCoursesSuggest(response.data.data.suggested_courses); // Ensure this is an array

            } catch (error) {
                console.error('Error fetching suggested courses', error);
            }
        };
        fetchSuggestCourses();

    }, [currentCourseId]);

    return (
        <div className="grid grid-cols-1 gap-4">
            {coursesSuggest.length > 0
                ?
                coursesSuggest.map((course: any) => (

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
                ))

                :
                "لا يوجد دورات مقترحة "
            }

        </div>
    );
};

export default SuggestCourses;
