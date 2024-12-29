"use client";

import { useState, useEffect } from "react"; 
import Cookies from "js-cookie"; // Import the js-cookie library
import Banners from "@/components/banners/Banners";
import banner from "@/public/assets/images/default.webp";
import ProfileBoxCategories from "../profileBoxCategories/ProfileBoxCategories";
import TranslateHook from "../../translate/TranslateHook";
import LangUseParams from "@/components/translate/LangUseParams";
import FlowerImg from "@/components/flowerImg/FlowerImg";
import Image from "next/image";
import Link from "next/link";
import axios from "axios"; // Import Axios
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";

const MyCourses = () => {
  const [courses, setCourses] = useState([]); // State for storing courses data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error handling
  const lang = LangUseParams(); // Access dynamic [lang] parameter
  const translate = TranslateHook();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get access token from cookies
        const token = Cookies.get("access_token");

        if (!token) {
          throw new Error("User is not authenticated");
        }

        // Fetch courses data
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/profile/get-courses-subscriptions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update state with fetched data
        setCourses(response.data.data);
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;

  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <div>
        <Banners src={banner} textPath={translate ? translate.pages.userProfile.title : ""} />
      </div>

      <div className="relative">
        <FlowerImg />

        <div className="container mx-auto w-full md:w-[80%] my-20 grid grid-cols-1 lg:grid-cols-3 gap-2 items-center relative z-50">
          <div>
            <ProfileBoxCategories />
          </div>
          <div className="bkBox w-[95%] mx-auto col-span-2 p-5">
            <h2 className="w-[fit-content] bkPrimaryColor px-[14px] py-[6px] font-bold rounded-[5px] text-[#fff] mb-[20px]">دوراتى التعليمية</h2>
            {courses.length > 0
              ?
              courses.map((course: any) => (
                <div
                  key={course.id} 
                  className="grid gap-2 grid-cols-12 items-center mb-4 bg-[#fff] p-[14px] rounded-[5px] [box-shadow:1px_1px_10px_#ddd]"
                >
                  <div className="col-span-12 lg:col-span-2">
                    <Image className="w-full lg:w-auto" src={course.image} width={180} height={200} alt="courseImg" />
                  </div>
                  <div className="col-span-12 lg:col-span-8">
                    <h3 className="font-bold text-sm mainColor">{course.course_name}</h3>
                    <p className="font-bold my-1 text-xs text-neutral-600">{course.brief_description}</p>
                    <p className="mainColor font-bold text-xs">
                      <FontAwesomeIcon className={`primaryColor text-xs ml-1`} icon={faUser} />
                      {course.author_name}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-2 block text-end">
                    <Link
                      href={`/${lang}/courses/${course.slug}`}
                      className="bkMainColor py-1 px-5 text-white text-xs rounded-[5px] font-bold"
                    >
                      استمرار
                    </Link>
                  </div>
                </div>
              ))
              :
              <div className="mainColor text-center font-bold"> لست مشترك فى اى دورة تعليمية !! </div>
            }

          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCourses;