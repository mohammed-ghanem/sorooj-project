'use client'
import Banners from "@/components/banners/Banners"
import BooksCard from "@/components/booksCard/BooksCard";
import soroojImg from "@/public/assets/images/default.webp"; // Default image
import bookdef from "@/public/assets/images/bookdef.png";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import the js-cookie library
import LangUseParams from "@/components/translate/LangUseParams";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import BooksCategoriesBox from "@/components/booksCategoryBox/BooksCategoriesBox";
import BooksAddWishList from "@/components/bookAddWishList/BooksAddWishList";

const BookCardPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Store category ID
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const token = Cookies.get("access_token");
    const lang = LangUseParams();

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books`,
                    {
                        params: {
                            lang,
                            category_id: selectedCategoryId || undefined, // Use category_id
                            page: currentPage // Add current page to params
                        },
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                            withCredentials: true,
                        },
                    }
                );

                setBooks(response.data.data);
                setTotalPages(response.data.meta.last_page || 1); // Update total pages if available

            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
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
        return <div className="text-center"><FontAwesomeIcon className="mainColor" icon={faSpinner} spin /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    const fetchBooks = books.map((book: any) => {
        return (
            <BooksCard
                key={book.id}
                imgSrc={book.image_url || bookdef}
                bookTitle={book.book_name}
                watchNumber={book.view_count}
                datePublish={book.publish_date}
                doctorName={book.author_name}
                descriptionCourse={book.brief_description}
                likeBtn={<BooksAddWishList bookDetails={book} />}
                pathLinkToContent={`/${lang}/books/${book.slug}`}
            />
        );
    });


    return (
        <div>
            <div>
                <Banners src={soroojImg} textPath="الكتب والابحاث" />
            </div>
            <div className="bookContainer container mx-auto my-20 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 w-[95%] lg:w-[80%]">
                <div className="my-5 lg:my-0">
                    <BooksCategoriesBox onCategorySelect={(categoryId) => setSelectedCategoryId(categoryId)} />
                </div>
                <div className="lg:col-span-3">
                    {books.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fetchBooks}
                        </div>

                    ) : (
                        <div className="text-center text-gray-500 font-bold">لا توجد كتب او ابحاث متاحة فى هذا القسم</div>
                    )}
                    {/* start Pagination Controls */}
                    {books.length > 0 ? (
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

export default BookCardPage