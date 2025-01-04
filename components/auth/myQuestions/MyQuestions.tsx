"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import the js-cookie library
import Banners from "@/components/banners/Banners";
import banner from "@/public/assets/images/default.webp";
import ProfileBoxCategories from "../profileBoxCategories/ProfileBoxCategories";
import TranslateHook from "../../translate/TranslateHook";
import LangUseParams from "@/components/translate/LangUseParams";
import FlowerImg from "@/components/flowerImg/FlowerImg";
import Link from "next/link";
import axios from "axios"; // Import Axios
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const MyQuestions = () => {
    const [myQuestions, setMyQuestions] = useState([]); // State for storing myQuestions data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const [error, setError] = useState<string | null>(null); // State for error handling
    const lang = LangUseParams(); // Access dynamic [lang] parameter
    const translate = TranslateHook();


    useEffect(() => {
        const fetchMyQuestions = async () => {
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
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/profile/get-my-questions`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            limit: 5,
                            page: currentPage, // Pass current page as a query parameter
                        },
                    }
                );

                // Update state with fetched data
                setMyQuestions(response.data.data);
                setTotalPages(response.data.meta.last_page || 1); // Update total pages if available
            } catch (error: any) {
                setError(error.response?.data?.message || "Failed to fetch myQuestions");
            } finally {
                setLoading(false);
            }
        };

        fetchMyQuestions();
    }, [currentPage]);

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
                    <div className="bkBox w-[95%] mx-auto col-span-2 p-5" style={{ "direction": "rtl" }}>
                        <h2 className="w-[fit-content] bkPrimaryColor px-[14px] py-[6px] font-bold rounded-[5px] text-[#fff] mb-[20px]">اسئلتى</h2>
                        {myQuestions.length > 0
                            ?
                            myQuestions.map((fatwa: any) => (
                                <div
                                    key={fatwa.id}
                                    className="grid gap-2 grid-cols-12 items-center mb-4 bg-[#fff] p-[14px] rounded-[5px] [box-shadow:1px_1px_10px_#ddd]"
                                >
                                    <div className="col-span-12 lg:col-span-10">
                                        <h3 className="font-bold text-sm mainColor">
                                            {fatwa.question.length > 80 ? fatwa.question.slice(0, 80) + "..." : fatwa.question}
                                        </h3>
                                    </div>
                                    <div className="col-span-12 lg:col-span-2 block text-end">
                                        <Link
                                            href={`/${lang}/questions/${fatwa.slug}`}
                                            className="bkMainColor py-1 px-5 text-white text-xs rounded-[5px] font-bold"
                                        >
                                            الاجابة
                                        </Link>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="mainColor text-center font-bold"> ليس لديك اسئلة !! </div>
                        }

                        {/* start Pagination Controls */}
                        {
                            myQuestions.length > 0 ? (
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
        </section>
    )
}

export default MyQuestions