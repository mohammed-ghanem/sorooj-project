'use client'
import Banners from '../banners/Banners'
import defImage from "@/public/assets/images/default.webp"; // Default image
import LangUseParams from '../translate/LangUseParams';
import TranslateHook from '../translate/TranslateHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faDownload, faEnvelope, faEye, faPenToSquare, faShareNodes, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { faFacebookF, faTelegram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import BookDescriptionTabs from '../bookDescriptionTabs/BookDescriptionTabs';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import BooksAddWishList from '../bookAddWishList/BooksAddWishList';
import Cookies from "js-cookie"; // Import the js-cookie library
import SuggestBooks from '../suggestBooks/SuggestBooks';



interface BookDetails {
    id: any;
    book_name: string;
    image?: any;
    description: string;
    publish_date: string;
    author_name: string;
    view_count: number;
    download_count: number;
}
interface CategoryDetails {
    name: string
}

const BookContent = () => {
    const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categoryDetails, setCategoryDetails] = useState<CategoryDetails | null>(null);
    // lang param (ar Or en)
    const lang = LangUseParams();
    const translate = TranslateHook();
    const { slug } = useParams();
    const token = Cookies.get("access_token");

    useEffect(() => {

        const fetchBooks = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books/${slug}`,
                    {
                        params: { lang },
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                            withCredentials: true,

                        },
                    }
                );
                const bookData = response.data.data.Books
                setBookDetails(bookData);
                setCategoryDetails(bookData.category);
                // Increment view count
                incrementViewCount(bookData.slug, bookData.view_count);

            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        // Function to increment the view count
        const incrementViewCount = async (slug: string | number, currentViewCount: number) => {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books/set-view-count/${slug}`,
                    { view_count: currentViewCount + 1 }, // Send the required view_count field
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                            withCredentials: true,
                        },
                    }
                );
                // Optimistically update the view count locally
                setBookDetails((prev) =>
                    prev ? { ...prev, view_count: currentViewCount + 1 } : prev
                );
            } catch (err: any) {
                console.error("Failed to increment view count:", err.response?.data?.message || err.message);
            }
        };
        fetchBooks();

    }, [lang, slug, token]);


    if (loading) {
        return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;

    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!bookDetails) {
        return <div>No book details found.</div>
    }
    ///////////////////////////////////////////////////////////////
    return (
        <section>
            <div>
                <Banners src={defImage} parentTitle={`الكتب`} textPath="تفاصيل الكتاب" />
            </div>
            <div className='container mx-auto' style={{ direction: "rtl" }}>
                <div className='bookDetails my-4 md:my-14 w-[95%] md:w-[80%] mx-auto flex flex-col-reverse lg:grid grid-cols-3 gap-4 items-center'>
                    <div className='bookTitles w-[95%] md:w-[80%] col-span-2'>
                        <h1 className=' text-base md:text-2xl font-bold mainColor'>
                            <FontAwesomeIcon className=' primaryColor text-lg ml-2' icon={faPenToSquare} />
                            {bookDetails.book_name}
                        </h1>
                        <p className='primaryColor mt-4'>
                            <FontAwesomeIcon className=' primaryColor ml-2' icon={faUser} />
                            {bookDetails.author_name}
                        </p>
                        <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>{`الدورات --  ${categoryDetails ? categoryDetails.name : "No Category"} `}</span>
                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faCalendarDays} />
                                    {bookDetails.publish_date}

                                </span>
                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faEye} />
                                    {`${bookDetails.view_count} مشاهدة `}
                                </span>
                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faDownload} />
                                    {`${bookDetails.download_count} تحميل `}
                                </span>
                            </span>
                        </div>

                        <div className='shareContent mt-4'>
                            <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center'>
                                <div className='block md:flex items-center col-span-2'>
                                    <h4 className='mainColor text-sm font-bold ml-4 mb-2 md:mb-0'>
                                        <FontAwesomeIcon className='primaryColor ml-2' icon={faShareNodes} />
                                        مشاركة عبر :
                                    </h4>

                                    {/* Facebook */}
                                    <FacebookShareButton
                                        url={window.location.href} // Current page URL
                                        className='ml-3'
                                    >
                                        <FontAwesomeIcon
                                            className='text-[#9F854E] text-xl border-[1px] border-[solid] border-[#9F854E] rounded-[30px] p-[5px] w-[22px]
                                            hover:border-[#424C61] hover:bg-[#424C61] hover:text-[#fff] hover:ease-in duration-300'
                                            icon={faFacebookF}
                                        />
                                    </FacebookShareButton>

                                    {/* Twitter */}
                                    <TwitterShareButton
                                        url={window.location.href}
                                        className='ml-3'
                                    >
                                        <FontAwesomeIcon
                                            className='text-[#9F854E] text-xl border-[1px] border-[solid] border-[#9F854E] rounded-[30px] p-[5px] w-[22px]
                      hover:border-[#424C61] hover:bg-[#424C61] hover:text-[#fff] hover:ease-in duration-300'
                                            icon={faTwitter}
                                        />
                                    </TwitterShareButton>

                                    {/* WhatsApp */}
                                    <WhatsappShareButton
                                        url={window.location.href}
                                        className='ml-3'
                                    >
                                        <FontAwesomeIcon
                                            className='text-[#9F854E] text-xl border-[1px] border-[solid] border-[#9F854E] rounded-[30px] p-[5px] w-[22px]
                      hover:border-[#424C61] hover:bg-[#424C61] hover:text-[#fff] hover:ease-in duration-300'
                                            icon={faWhatsapp}
                                        />
                                    </WhatsappShareButton>

                                    {/* Telegram */}
                                    <TelegramShareButton
                                        url={window.location.href}
                                        className='ml-3'
                                    >
                                        <FontAwesomeIcon
                                            className='text-[#9F854E] text-xl border-[1px] border-[solid] border-[#9F854E] rounded-[30px] p-[5px] w-[22px]
                                                 hover:border-[#424C61] hover:bg-[#424C61] hover:text-[#fff] hover:ease-in duration-300'
                                            icon={faTelegram}
                                        />
                                    </TelegramShareButton>
                                    {/* Email */}
                                    <EmailShareButton
                                        url={window.location.href}
                                        className='ml-3'
                                    >
                                        <FontAwesomeIcon
                                            className='text-[#9F854E] text-xl border-[1px] border-[solid] border-[#9F854E] rounded-[30px] p-[5px] w-[22px]
                                            hover:border-[#424C61] hover:bg-[#424C61] hover:text-[#fff] hover:ease-in duration-300'
                                            icon={faEnvelope}
                                        />
                                    </EmailShareButton>
                                </div>
                                <div className="flex items-center">
                                    <span className="ml-4 mainColor text-sm font-bold">المفضلة</span>
                                    <span className='ml-4 text-2xl primaryColor opacity-[0.4]'> || </span>
                                    <BooksAddWishList bookDetails={bookDetails} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='bookImg'>
                        <div>
                            <Image className='w-full h-full max-h-60'
                                src={bookDetails.image}
                                width={100}
                                height={100}
                                alt='book-img' />
                        </div>
                    </div>
                </div>
                <hr className='h-1' />
                {/* start description course with suggest courses */}
                <div className='descriptionbook w-[95%] md:w-[80%] mx-auto mt-2 mb-24 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8'>
                    <div className=''>
                        <BookDescriptionTabs bookDetails={bookDetails} />
                    </div>
                    <div className='mt-[6px] border-t-2 lg:border-t-0'>
                        <h3 className='mt-[10px] mr-[10px] mb-[30px] ml-[0] font-bold mainColor'>الكتب المقترحة</h3>
                        <div className='w-[95%] md:w-[80%] grid grid-cols-1 mx-auto gap-8'>
                            <SuggestBooks currentBookId={bookDetails.id} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookContent 