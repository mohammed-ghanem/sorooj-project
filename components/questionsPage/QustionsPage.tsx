"use client";
import Banners from "../banners/Banners";
import defImage from "@/public/assets/images/default.webp"; // Default image
import { faCircleQuestion, faLessThan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import NewFatwaBtn from "./NewFatwaBtn";
import LangUseParams from "@/components/translate/LangUseParams";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';
import noQues from "@/public/assets/images/noques.svg"

const QustionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const lang = LangUseParams();

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/fatwa/get-questions`,
                    {
                        params: {
                            lang,
                            page: currentPage, // Add current page to params
                            limit: 10
                        },
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,
                        },
                    }
                );

                setQuestions(response.data.data);
                setTotalPages(response.data.meta.last_page || 1); // Update total pages if available
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [lang, currentPage]);

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
        return (
            <div className="text-center">
                <FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    const allQuestions = questions.map((question: any) => (
        <div key={question.id} className="questionsBox grid grid-cols-12 px-5 pt-4">
            <p className="col-span-10 mainColor font-bold text-sm">
                {question.question.length > 150 ? question.question.slice(0, 150) + ' ... ' : question.question}
            </p>
            <div className="col-span-2 text-left">
                <Link
                    prefetch={true}
                    className="primaryColor border-b-2 border-customGold"
                    href={`/${lang}/questions/${question.slug}`}
                >
                    الاجابة
                    <FontAwesomeIcon className="text-xs mr-2" icon={faLessThan} />
                </Link>
            </div>
            <hr className="col-span-12 mt-4 h-[2px] opacity-35 bkPrimaryColor" />
        </div>
    ));

    return (
        <div>
            <div>
                <Banners src={defImage} parentTitle={`الرئيسية`} textPath="سؤال وجواب" />
            </div>
            <div className="my-14 container mx-auto w-[95%] md:w-[80%] grid grid-cols-1 lg:grid-cols-5 gap-10"
                style={{ direction: "rtl" }}
            >
                <div className="col-span-2 h-80">
                    <h1 className="primaryColor font-bold ">سؤال وجواب</h1>
                    <p className="mainColor mt-3 font-bold">
                        اليك اسئلة واجوبة وكل ما تحتاج السؤال عنة
                    </p>
                    <div className="bkBox p-[14px] rounded-[8px] mt-5">
                        <div className="flex items-center">
                            <FontAwesomeIcon className="primaryColor ml-2 text-2xl" icon={faCircleQuestion} />
                            <h2 className="mainColor font-bold">هل لديك اسئلة اخرى !</h2>
                        </div>
                        <p className="mainColor p-4">
                            اذا كانت لديك استفسارات اضافية فلا تتردد فى طرحها وسنقوم بالرد عليك فى اقرب وقت ممكن
                        </p>
                        <div className="text-end">
                            <NewFatwaBtn />
                        </div>
                    </div>
                </div>
                <div className="bkBox col-span-3 rounded-[10px] [box-shadow:1px_1px_7px_#ddd]">
                    {
                        allQuestions.length > 0
                            ?
                            allQuestions
                            :
                            <div className="text-center text-gray-500 font-bold">
                                <Image className='mx-auto' src={noQues} width={500} height={500} alt='no question' />
                                <p>لا يوجد اسئلة متاحة</p>
                            </div>
                    }
                    {/* start Pagination Controls */}
                    {allQuestions.length > 0 ? (
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

export default QustionsPage;
