"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Banners from "@/components/banners/Banners";
import CoursesCard from "@/components/coursesCard/CoursesCard";
import CategoriesBox from "@/components/categoryBox/CategoriesBox";
import LangUseParams from "@/components/translate/LangUseParams";
import soroojImg from "@/public/assets/images/111.webp"; // Default image




const Page = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // lang param (ar Or en)
  const lang = LangUseParams();

  useEffect(() => {
    // Fetch courses data
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/courses`,
          {
            params: { lang }, // Pass the language as a query parameter
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data)

        setCourses(response.data.data); // Update state with fetched courses
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [lang]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  // function getSlug(item: string) {
  //   return item.replace(/ /g, "_").replace(/\./g, "").toLowerCase()
  // }

  const fetchCourses = courses.map((course: any) =>
    <CoursesCard
      key={course.id}
      imgSrc={course.image || soroojImg} // Use default image if not provided
      watchNumber={`${course.view_count} مشاهدة`}
      datePublish={course.publish_date}
      courseTitle={course.course_name}
      doctorName={course.author_name}
      descriptionCourse={course.description}
      likeBtn={"like"}
      pathLinkToContent={`/${lang}/courses/${course.id}`} // Link to course details
    />
  )

  return (
    <div>
      <div>
        <Banners src={soroojImg} textPath="الدورات المجانية" />
      </div>
      <div className="coursesContainer container mx-auto my-20 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 w-[95%] lg:w-[80%]">
        <div className="my-5 lg:my-0">
          <CategoriesBox />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fetchCourses}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;









// "use client"

// import Banners from "@/components/banners/Banners"
// import CoursesCard from "@/components/coursesCard/CoursesCard"
// import test from '@/public/assets/images/test.jpg'
// import soroojImg from "@/public/assets/images/111.webp"; // Default image
// import CategoriesBox from "@/components/categoryBox/CategoriesBox";
// import LangUseParams from "@/components/translate/LangUseParams"



// const page = () => {
//   // lang param (ar Or en)
//   const lang = LangUseParams()
//   // test id remove it when i get real data response
//   return (
//     <div>
//       <div>
//         <div>
//           <Banners src={soroojImg} textPath="الدورات المجانية" />
//         </div>
//         <div className="coursesContainer container mx-auto my-20 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 w-[95%] lg:w-[80%]">
//           <div className="my-5 lg:my-0">
//             <CategoriesBox />
//           </div>
//           <div className=" lg:col-span-3">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <CoursesCard
//                 imgSrc={test}
//                 watchNumber={"120 مشاهدة"}
//                 datePublish={"24 اغسطس 2024"}
//                 courseTitle={"شرح الفقة الوسطى"}
//                 doctorName={"الدكتور حمد بن محمد الهاجرى"}
//                 descriptionCourse={"برنامج محطات فى العقيدة المحور الثانى"}
//                 likeBtn={"like"}
//                 pathLinkToContent={`/courses/${course.id}`} // Link to course details
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default page