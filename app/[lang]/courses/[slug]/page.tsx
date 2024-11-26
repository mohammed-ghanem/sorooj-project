import { Metadata } from 'next';
import CoursesContent from '@/components/coursesContent/CoursesContent';
import axios from 'axios';

// Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/courses/${params.slug}`,
            {
                params: { lang: 'en' }, // Adjust language as needed
            }
        );
        const course = response.data.data.Courses;

        return {
            title: course.course_name || 'Default Course Title',
            description: course.seo.description || 'Default Course Description',
            keywords: course.seo.keywords,
            openGraph: {
                title: course.course_name,
                description: course.description,
                images: [
                    {
                        url: course.image || 'public/assets/images/course-default.webp',
                        alt: course.course_name,
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

// Default export
export default function Page() {
    return <CoursesContent />;
}










// import CoursesContent from "@/components/coursesContent/CoursesContent";


// export default function coursesContentPage() {
//     return <div><CoursesContent /></div>;

// } 