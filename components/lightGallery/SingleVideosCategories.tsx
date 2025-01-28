"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faPenNib, faPenToSquare, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Banners from "@/components/banners/Banners";
import defImage from "@/public/assets/images/default.webp"; // Default image
import Image from 'next/image';
import VideoGalleryCategories from "@/components/lightGallery/VideoGalleryCategories";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import share from 'lightgallery/plugins/share'
import fullscreen from 'lightgallery/plugins/fullscreen'
import autoplay from 'lightgallery/plugins/autoplay';
import "./style.css"
import { useSearchParams } from "next/navigation";

type Category = {
    id: number;
    name: string;
    subcategories?: Category[];
    description: string;
    youtube_link: string;
    publish_date: string;
    category: any;
    videos_count:number
};

const SingleVideosCategories = () => {
    const [category, setCategory] = useState<Category[] | null>(null); // Adjusted type to array
    const [loading, setLoading] = useState(true);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Store category ID
    const [totalPages, setTotalPages] = useState<number>(1); // Total pages
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1", 30);
    const { id } = useParams();

    useEffect(() => {
        const fetchCategory = async () => {
            if (!id) return;

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/videos?category_id=${id}`,
                    {
                        params: {
                            category_id: selectedCategoryId || undefined,
                            limit: 12,
                            page: currentPage,
                        },
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,
                        },
                    }
                );

                setCategory(response.data.data); // Ensure `data` is an array
                setTotalPages(response.data.meta?.last_page || 1);
            } catch (error) {
                console.error("Error fetching category data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id, selectedCategoryId, currentPage]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            window.location.href = `?page=${page}`
        }
    };

    const renderPageNumbers = () => {
        return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 rounded ${page === currentPage ? "bkMainColor text-white font-bold" : "bg-gray-200"
                    }`}
            >
                {page}
            </button>
        ));
    };
    if (loading) {
        return (
            <div className="text-center">
                <FontAwesomeIcon
                    className="mainColor text-2xl my-4"
                    icon={faSpinner}
                    spin
                />
            </div>
        );
    }

    if (!category || category.length === 0) {
        return <div>No categories found.</div>;
    }

    // print category name
    const categoryName = category[0]?.category?.name || "";


    // Map over `category` only if it's not null
    const allVideos = category.map((box) => (
        <a
            key={box.id}
            className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#ddd] cursor-pointer"
            data-src={`https://www.youtube.com/embed/${box.youtube_link}?enablejsapi=1`}
            data-poster={`https://img.youtube.com/vi/${box.youtube_link}/maxresdefault.jpg`}
            data-sub-html={box.description}
        >
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-30 z-30">
                    <FontAwesomeIcon
                        icon={faCirclePlay}
                        className="text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]"
                    />
                </div>
                <div className="absolute text-white w-96 font-bold text-[10px] flex items-center px-2 top-3 left-0 z-40 opacity-85">
                    <span className='font-cairo text-[10px] w-fit font-bold mainColor absolute top-[6px] left-[6px] bkColor px-[8px] py-[3px] rounded-[15px]'>{box.publish_date}</span>
                </div>

                <Image
                    className="max-w-full w-full"
                    src={`https://img.youtube.com/vi/${box.youtube_link}/maxresdefault.jpg`}
                    width={100}
                    height={100}
                    alt={box.name}
                />
            </div>
            <div className="flex items-center px-2 pt-2">
                <span>
                    <FontAwesomeIcon className="primaryColor ml-2" icon={faPenNib} />
                </span>
                <h2 className="mainColor font-bold text-[12px]">
                    {box.name.length > 40
                        ?
                        box.name.slice(0, 40) + "..."
                        : box.name
                    }
                </h2>
            </div>
            <div className="flex items-center px-2 py-2">
                <span>
                    <FontAwesomeIcon className="primaryColor ml-2" icon={faPenToSquare} />
                </span>
                <p className="mainColor font-bold text-[10px]">
                    {box.description.length > 100
                        ? box.description.slice(0, 100) + "..."
                        : box.description
                    }
                </p>
            </div>
        </a>
    ));

    return (
        <div>
            <div>
                <Banners src={defImage} parentTitle={`المرئية`} textPath={`${categoryName}`} />
            </div>
            <div className='container my-10 mx-auto w-[80%] grid grid-cols-1 lg:grid-cols-4 gap-4'
                style={{ direction: "rtl" }}>
                <div><VideoGalleryCategories onCategorySelect={(categoryId) => setSelectedCategoryId(categoryId)} /></div>

                {allVideos.length > 0
                    ?
                    <LightGallery
                        key={selectedCategoryId} // Add key to force re-initialization
                        elementClassNames={`col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4`}
                        mode="lg-fade"
                        speed={500}
                        videojsOptions={{ muted: false }}
                        plugins={[lgThumbnail, lgZoom, lgVideo, fullscreen, share, autoplay]}
                    >
                        {allVideos}
                    </LightGallery>
                    :
                    <div className="text-center text-gray-500 font-bold">لا توجد فيديوهات متاحة فى هذا القسم</div>

                }
            </div>
            {category.length > 0 && (
                <div className="flex justify-center items-center my-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
                    >
                        السابق
                    </button>
                    {renderPageNumbers()}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 mainColor rounded disabled:opacity-50"
                    >
                        التالي
                    </button>
                </div>
            )}
        </div>

    )
};

export default SingleVideosCategories;
