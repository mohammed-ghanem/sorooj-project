"use client"
import Image from 'next/image';
import Banners from '../banners/Banners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defImage from "@/public/assets/images/default.webp"; // Default image
import AudioCategories from './AudioCategories';
import { faClock, faMicrophoneLines, faPenNib, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LangUseParams from "../translate/LangUseParams";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const AudioLibirary = () => {
    const [allAudio, setAllAudio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Store category ID
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const lang = LangUseParams();

    useEffect(() => {
        const fetchAllAudio = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/audios`,
                    {
                        params: {
                            lang,
                            category_id: selectedCategoryId || undefined, // Use category_id
                            page: currentPage // Add current page to params
                        },
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,
                        },
                    }
                );

                setAllAudio(response.data.data);
                setTotalPages(response.data.meta.last_page || 1); // Update total pages if available
               
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllAudio();
    }, [lang, selectedCategoryId, currentPage]); // Re-fetch when category ID changes

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

    const fetchAllAudioBox = allAudio.map((audio: any) => (
        <Link key={audio.id}
            href={`/${lang}/audio-library/${audio.slug}`}
            className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#ddd] cursor-pointer"
        >
            <div className='relative overflow-hidden'>
                <div className='absolute inset-0 bg-black bg-opacity-30 z-30'>
                    <FontAwesomeIcon icon={faMicrophoneLines} className='text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]' />
                </div>
                <div className='absolute text-white font-bold text-[10px] flex items-center px-2 top-3 left-0 z-40 opacity-85'>
                    <span><FontAwesomeIcon className='ml-2' icon={faClock} /></span>
                    <span className=''>
                        {audio.publish_date}
                    </span>
                </div>

                <Image className="max-w-full w-full"
                    src={`https://img.youtube.com/vi/${audio.youtube_link}/maxresdefault.jpg`}
                    width={100} height={100} alt=''
                />
            </div>
            <div className='flex items-center px-2 pt-2'>
                <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenNib} /></span>
                <h2 className='mainColor font-bold text-[12px]'>
                    {audio.name}
                </h2>
            </div>
            <div className='flex items-center px-2 py-2'>
                <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenToSquare} /></span>
                <p className='mainColor font-bold text-[10px]'>
                    {audio.brief_description}
                </p>
            </div>
        </Link>
    ));


    return (
        <div>
            <div>
                <Banners src={defImage} textPath="المكتبة الصوتية" />
            </div>
            <div className='container my-10 mx-auto w-[80%] grid grid-cols-1 lg:grid-cols-4 gap-4'>
                <div>
                    <AudioCategories
                        onCategorySelect={(categoryId) => setSelectedCategoryId(categoryId)}
                    />
                </div>
                <div className='lg:col-span-3'>
                    {allAudio.length > 0 ? (
                        <div className='col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4'>
                            {fetchAllAudioBox}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 font-bold">لا توجد صوتيات متاحة فى هذا القسم</div>
                    )}

                    {/* start Pagination Controls */}
                    {allAudio.length > 0 ? (
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
    )
}

export default AudioLibirary