'use client';

import { useEffect, useState } from 'react';
import CoursesCard from "../coursesCard/CoursesCard";
import LangUseParams from '../translate/LangUseParams';
import { fetchCoursesHome } from '@/utils/fetchCoursesHome';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import './style.css';
 
const NewCourseHome = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lang = LangUseParams();
  const router = useRouter();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await fetchCoursesHome();
        setCourses(coursesData);
      } catch (err: any) {
        setError(err.message);
      } 
    };
    loadCourses();
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

 

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative parentDiv" style={{ direction: "rtl" }}>
      
      <Swiper
        className="mx-auto container"
        style={{ width: "80%" }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 10 },
          1440: { slidesPerView: 4, spaceBetween: 10 },
        }}
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <div onClick={() => handleNavigation(`/${lang}/courses/${course.slug}`)}>
              <CoursesCard
                imgSrc={course.image || '/default-course.jpg'}
                watchNumber={course.view_count + " مشاهدة " || '0'}
                datePublish={course.publish_date || 'Unknown Date'}
                courseTitle={course.course_name || 'Untitled Course'}
                doctorName={course.author_name || 'Unknown Instructor'}
                descriptionCourse={course.brief_description || 'No description available'}
                pathLinkToContent={`/${lang}/courses/${course.slug}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default NewCourseHome;


