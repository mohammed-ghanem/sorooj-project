"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Banners from "@/components/banners/Banners";
import CoursesCard from "@/components/coursesCard/CoursesCard";
import CoursesCategoriesBox from "@/components/coursesCategoryBox/CoursesCategoriesBox";
import LangUseParams from "@/components/translate/LangUseParams";
import soroojImg from "@/public/assets/images/111.webp"; // Default image
import AddWishList from "@/components/addWishList/AddWishList";
import Cookies from "js-cookie"; // Import the js-cookie library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const Page = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Store category ID
  const token = Cookies.get("access_token");

  const lang = LangUseParams();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/courses`,
          {
            params: { lang, category_id: selectedCategoryId || undefined }, // Use category_id
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              withCredentials: true,
            },
          }
        );

        setCourses(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [lang, token, selectedCategoryId]); // Re-fetch when category ID changes

  if (loading) {
    return <div className="text-center"><FontAwesomeIcon className="mainColor" icon={faSpinner} spin /></div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const fetchCourses = courses.map((course: any) => {
    return (
      <CoursesCard
        key={course.id}
        imgSrc={course.image || soroojImg}
        watchNumber={`${course.view_count} مشاهدة`}
        datePublish={course.publish_date}
        courseTitle={course.course_name}
        doctorName={course.author_name}
        descriptionCourse={course.brief_description}
        likeBtn={<AddWishList courseDetails={course} />}
        pathLinkToContent={`/${lang}/courses/${course.slug}`}
      />
    );
  });

  return (
    <div>
      <div>
        <Banners src={soroojImg} textPath="الدورات المجانية" />
      </div>
      <div className="coursesContainer container mx-auto my-20 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 w-[95%] lg:w-[80%]">
        <div className="my-5 lg:my-0">
          <CoursesCategoriesBox
            onCategorySelect={(categoryId) => setSelectedCategoryId(categoryId)} // Pass category ID updater
          />
        </div>
        <div className="lg:col-span-3">
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fetchCourses}
              </div>
            ) : (
              <div className="text-center text-gray-500 font-bold">لا توجد دورات متاحة فى هذا القسم</div>
            )}
        </div>
        {/* <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fetchCourses}
          </div>
        </div> */} 
      </div>
    </div>
  );
};

export default Page;





// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Banners from "@/components/banners/Banners";
// import CoursesCard from "@/components/coursesCard/CoursesCard";
// import CategoriesBox from "@/components/categoryBox/CategoriesBox";
// import LangUseParams from "@/components/translate/LangUseParams";
// import soroojImg from "@/public/assets/images/111.webp"; // Default image
// import AddWishList from "@/components/addWishList/AddWishList";
// import Cookies from "js-cookie"; // Import the js-cookie library


// const Page = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const token = Cookies.get('access_token');
  
//   // lang param (ar Or en)
//   const lang = LangUseParams();

//   useEffect(() => {
//     // Fetch courses data
//     const fetchCourses = async () => {


//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/courses`,
//           {
//             params: { lang }, // Pass the language as a query parameter
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//               withCredentials: true,
//             },
//           }
//         );
//         console.log(response.data.data)

//         setCourses(response.data.data); // Update state with fetched courses
//       } catch (err: any) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [lang, token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const fetchCourses = courses.map((course: any) => {
//     return (
//       <CoursesCard
//         key={course.id}
//         imgSrc={course.image || soroojImg} // Use default image if not provided
//         watchNumber={`${course.view_count} مشاهدة`}
//         datePublish={course.publish_date}
//         courseTitle={course.course_name}
//         doctorName={course.author_name}
//         descriptionCourse={course.brief_description} 
//         likeBtn={<AddWishList courseDetails={course} />}
//         pathLinkToContent={`/${lang}/courses/${course.slug}`} // Link to course details
//       />
//     ) 
//   })
//   return (
//     <div>
//       <div>
//         <Banners src={soroojImg} textPath="الدورات المجانية" />
//       </div>
//       <div className="coursesContainer container mx-auto my-20 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 w-[95%] lg:w-[80%]">
//         <div className="my-5 lg:my-0">
//           <CategoriesBox />
//         </div>
//         <div className="lg:col-span-3">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {fetchCourses}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;