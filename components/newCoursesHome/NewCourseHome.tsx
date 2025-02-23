

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import CoursesCard from "../coursesCard/CoursesCard";
import LangUseParams from '../translate/LangUseParams';
import { fetchCoursesHome } from '@/utils/fetchCoursesHome';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css';
import './style.css';

const NewCourseHome = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false); // New state for handling navigation loading
  const [error, setError] = useState<string | null>(null);
  const lang = LangUseParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await fetchCoursesHome();
        setCourses(coursesData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  useEffect(() => {
    setNavigating(false); // Reset navigation loading when pathname changes
  }, [pathname]);

  const handleNavigation = (href: string) => {
    if (href === pathname) return;
    setNavigating(true);
    router.push(href);
  };

  if (loading) {
    return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Loading Spinner on Navigation */}
      {navigating && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <FontAwesomeIcon className="text-white text-4xl" icon={faSpinner} spin />
        </div>
      )}

      <div className="parentDiv relative" style={{ "direction": "rtl" }}>
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
              <CoursesCard
                imgSrc={course.image || '/default-course.jpg'}
                watchNumber={course.view_count + " مشاهدة " || '0'}
                datePublish={course.publish_date || 'Unknown Date'}
                courseTitle={course.course_name || 'Untitled Course'}
                doctorName={course.author_name || 'Unknown Instructor'}
                descriptionCourse={course.brief_description || 'No description available'}
                pathLinkToContent={`/${lang}/courses/${course.slug}`}
                onClick={() => handleNavigation(`/${lang}/courses/${course.slug}`)} // Handle click with spinner
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default NewCourseHome;








// 'use client';

// import { useEffect, useState } from 'react';
// import CoursesCard from "../coursesCard/CoursesCard";
// import LangUseParams from '../translate/LangUseParams';
// import { fetchCoursesHome } from '@/utils/fetchCoursesHome';
// import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import 'swiper/css/autoplay';
// import 'swiper/css';
// import './style.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
 
// const NewCourseHome = () => {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const lang = LangUseParams();

//   useEffect(() => {
//     const loadCourses = async () => {
//       try {
//         const coursesData = await fetchCoursesHome(); // Reuse the exported function
//         setCourses(coursesData);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     loadCourses();
//   }, []);

//   if (loading) {
//     return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
//   }
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="parentDiv relative" style={{ "direction": "rtl" }}>
//       <Swiper
//         className="mx-auto container"
//         style={{ width: "80%" }}
//         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
//         spaceBetween={10} // Set space between slides
//         slidesPerView={4} // Adjust the number of slides visible at once
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         breakpoints={{
//           320: {   // Mobile
//             slidesPerView: 1,
//             spaceBetween: 10,
//           },
//           640: {   // Small screens
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//           768: {   // Medium screens (tablets)
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//           1024: {  // Larger screens (desktops)
//             slidesPerView: 4,
//             spaceBetween: 10,
//           },
//           1440: {  // Larger screens (desktops)
//             slidesPerView: 4,
//             spaceBetween: 10,
//           },
//         }}
//       >
//         {courses.map((course) => (
//           <SwiperSlide key={course.id}>
//             <CoursesCard
//               imgSrc={course.image || '/default-course.jpg'} // Provide a default image if not available
//               watchNumber={course.view_count  + " مشاهدة " || '0'} // Replace with the correct key for watch count
//               datePublish={course.publish_date || 'Unknown Date'} // Replace with the correct key for the date
//               courseTitle={course.course_name || 'Untitled Course'} // Replace with the correct key for title
//               doctorName={course.author_name || 'Unknown Instructor'} // Replace with the correct key for doctor name
//               descriptionCourse={course.brief_description || 'No description available'}
//               pathLinkToContent={`/${lang}/courses/${course.slug}`}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };
// export default NewCourseHome;