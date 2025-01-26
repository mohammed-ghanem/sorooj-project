"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileBoxCategories from "../profileBoxCategories/ProfileBoxCategories";
import FlowerImg from "@/components/flowerImg/FlowerImg";
import Banners from "@/components/banners/Banners";
import banner from "@/public/assets/images/default.webp";
import LangUseParams from "@/components/translate/LangUseParams";
import TranslateHook from "@/components/translate/TranslateHook";
import Image from "next/image";
import Link from "next/link";



interface Book {
    id: number;
    book_name: string;
    slug: string;
    author_name: string;
    image: string;
    brief_description: string;
    publish_date: string;
    is_favorite: boolean;
    order_position: number;
}

interface Course {
    id: number;
    course_name: string;
    slug: string;
    author_name: string;
    image: string;
    course_content: string;
    brief_description: string;
    view_count: number;
    is_favorite: boolean;
    is_subscribed: boolean;
    order_position: number;
}

interface FavoriteItem {
    id: number;
    type: "books" | "courses";
    _type: string;
    book?: Book;
    course?: Course;
}

interface ApiResponse {
    data: FavoriteItem[];
    links: any;
    meta: any;
    status: number;
}

const MyFavorites = () => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const lang = LangUseParams(); // Access dynamic [lang] parameter
    const translate = TranslateHook();
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = Cookies.get("access_token");

                if (!token) {
                    throw new Error("User is not authenticated");
                }

                const response = await axios.get<ApiResponse>(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/profile/get-all-favorites?limit=5`,
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

                setFavorites(response.data.data);
                setTotalPages(response.data.meta.last_page || 1); // Update total pages if available
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to fetch favorites");
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
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

    if (loading) {
        return (
            <div className="text-center">
                <FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin />
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section>
            <div>
                <Banners src={banner} parentTitle={`الرئيسية`} textPath={translate ? translate.pages.userProfile.title : ""} />
            </div>
            <div className="relative">
                <FlowerImg />
                <div className="container mx-auto w-full md:w-[80%] my-20 grid grid-cols-1 lg:grid-cols-3 gap-2 items-center relative z-50">
                    <div>
                        <ProfileBoxCategories />
                    </div>
                    <div className="bkBox w-[95%] mx-auto col-span-2 p-5" style={{ "direction": "rtl" }}>

                        <h2 className={`w-[fit-content] 
                            bkPrimaryColor px-[14px] py-[6px]
                            font-bold rounded-[5px] text-[#fff] mb-[20px]
                            ${lang === "en" ? "mr-auto" : "ml-auto"}
                            `}>

                            {translate ? translate.pages.userProfile.myFavorites : ""}
                        </h2>

                        {favorites.length === 0 && (
                            <div className="mainColor text-center font-bold">
                                {translate ? translate.pages.userProfile.noFavorites : ""}
                            </div>
                        )}
                        {favorites.map((favorite: any) => {
                            if (favorite.type === "books" && favorite.book) {
                                return (

                                    <div
                                        className="grid gap-2 grid-cols-12 items-center mb-4 bg-[#fff] p-[14px] rounded-[5px] [box-shadow:1px_1px_10px_#ddd]"
                                        key={favorite.id}>

                                        <div className="col-span-12 lg:col-span-2">
                                            <Image className="w-full lg:max-h-20" src={favorite.book.image} width={180} height={200} alt="fav" />
                                        </div>
                                        <div className="col-span-12 lg:col-span-8">
                                            <h3 className="font-bold text-sm mainColor">{favorite.book.book_name}</h3>
                                            <p className="font-bold my-1 text-xs text-neutral-600">{favorite.book.brief_description}</p>
                                            <p className="mainColor font-bold text-xs">
                                                <FontAwesomeIcon className={`primaryColor text-xs ml-1`} icon={faUser} />
                                                {favorite.book.author_name}
                                            </p>
                                        </div>
                                        <div className="col-span-12 lg:col-span-2 block text-end">
                                            <Link
                                                href={`/${lang}/${favorite.type}/${favorite.book.slug}`}
                                                className="bkMainColor py-1 px-5 text-white text-xs rounded-[5px] font-bold"
                                            >
                                                {translate ? translate.pages.userProfile.view : ""}
                                            </Link>
                                        </div>
                                    </div>

                                );
                            } else if (favorite.type === "courses" && favorite.course) {
                                return (
                                    <div
                                        className="grid gap-2 grid-cols-12 items-center mb-4 bg-[#fff] p-[14px] rounded-[5px] [box-shadow:1px_1px_10px_#ddd]"
                                        key={favorite.id}>

                                        <div className="col-span-12 lg:col-span-2">
                                            <Image className="w-full lg:w-auto lg:max-h-20" src={favorite.course.image} width={180} height={200} alt="fav" />
                                        </div>
                                        <div className="col-span-12 lg:col-span-8">
                                            <h3 className="font-bold text-sm mainColor">{favorite.course.course_name}</h3>
                                            <p className="font-bold my-1 text-xs text-neutral-600">{favorite.course.brief_description}</p>
                                            <p className="mainColor font-bold text-xs">
                                                <FontAwesomeIcon className={`primaryColor text-xs ml-1`} icon={faUser} />
                                                {favorite.course.author_name}
                                            </p>
                                        </div>
                                        <div className="col-span-12 lg:col-span-2 block text-end">
                                            <Link
                                                href={`/${lang}/${favorite.type}/${favorite.course.slug}`}
                                                className="bkMainColor py-1 px-5 text-white text-xs rounded-[5px] font-bold"
                                            >
                                                {translate ? translate.pages.userProfile.view : ""}
                                            </Link>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        {/* start Pagination Controls */}
                        {
                            favorites.length > 0 ? (
                                <div className="flex justify-center items-center mt-8">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
                                    >
                                        {translate ? translate.pages.userProfile.prev : ""}
                                    </button>
                                    {/* Render numbered pages */}
                                    {renderPageNumbers()}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
                                    >
                                        {translate ? translate.pages.userProfile.next : ""}
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
    );
};

export default MyFavorites;