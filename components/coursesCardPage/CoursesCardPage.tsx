"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Banners from "@/components/banners/Banners";
import CoursesCard from "@/components/coursesCard/CoursesCard";
import CoursesCategoriesBox from "@/components/coursesCategoryBox/CoursesCategoriesBox";
import LangUseParams from "@/components/translate/LangUseParams";
import soroojImg from "@/public/assets/images/default.webp"; // Default image
import Cookies from "js-cookie"; // Import the js-cookie library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import CourseAddWishList from "@/components/courseAddWishList/CourseAddWishList";

const CoursesCardPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Store category ID
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const token = Cookies.get("access_token");

    const lang = LangUseParams();

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses`,
                    {
                        params: {
                            lang,
                            category_id: selectedCategoryId || undefined, // Use category_id
                            page: currentPage, // Add current page to params
                            limit: 9, // Fetch 9 courses per page
                        },
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                            withCredentials: true,
                        },
                    }
                );

                setCourses(response.data.data);
                setTotalPages(response.data.meta.last_page || 1); // Update total pages if available

            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [lang, token, selectedCategoryId, currentPage]); // Re-fetch when category ID changes

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    // active page
                    className={`px-4 py-2 mx-1 rounded ${i === currentPage ? "bkMainColor text-white font-bold" : "bg-gray-200"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };
    if (loading) {
        return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const fetchCourses = courses.map((course: any) => {
        return (
            <CoursesCard
                key={course.id}
                imgSrc={course.image}
                watchNumber={`${course.view_count} مشاهدة`}
                datePublish={course.publish_date}
                courseTitle={course.course_name}
                doctorName={course.author_name}
                descriptionCourse={course.brief_description}
                likeBtn={<CourseAddWishList courseDetails={course} />}
                pathLinkToContent={`/${lang}/courses/${course.slug}`}
            />
        );
    });

    return (
        <div>
            <div>
                <Banners src={soroojImg} parentTitle={`الرئيسية`} textPath="الدورات المجانية" />
            </div>
            <div className="coursesContainer container mx-auto my-20 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 w-[95%] lg:w-[80%]"
                style={{ direction: "rtl" }}
            >
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
                    {/* start Pagination Controls */}
                    {courses.length > 0 ? (
                        <div className="flex justify-center items-center mt-8">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
                            >
                                السابق
                            </button>
                            {/* Render numbered pages */}
                            {renderPageNumbers()}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
                            >
                                التالي
                            </button>
                        </div>
                    ) :
                        ""
                    }
                    {/*end Pagination Controls */}
                </div>
            </div>
        </div>
    );
};

export default CoursesCardPage;