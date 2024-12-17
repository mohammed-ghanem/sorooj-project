"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banners from '../banners/Banners'
import defImage from "@/public/assets/images/default.webp"; // Default image
import { faCalendarDays, faEnvelope, faEye, faPenToSquare, faShareNodes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { faFacebookF, faTelegram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import BlogDescriptionTabs from '../blogDescriptionTabs/BlogDescriptionTabs';
import { useEffect, useState } from 'react';
import LangUseParams from '../translate/LangUseParams';
import TranslateHook from '../translate/TranslateHook';
import { useParams } from 'next/navigation';
import Cookies from "js-cookie"; // Import the js-cookie library
import axios from 'axios';
import SuggestBlogs from '../blogDescriptionTabs/SuggestBlogs';
interface BlogDetails {
    course_name: string;
    image?: string;
    description: string;
    publish_date: string;
    author_name: string;
    view_count: number;
}
interface CategoryDetails {
    name: string
}
interface CourseVideos {
    name: string,
    video_url: string,
    course_id: number,
    publish_date: string
}

const BlogContent = () => {
    const [blogDetails, setBlogDetails] = useState<BlogDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categoryDetails, setCategoryDetails] = useState<CategoryDetails | null>(null);

    // lang param (ar Or en)
    const lang = LangUseParams();
    const translate = TranslateHook();
    const { slug } = useParams();
    const token = Cookies.get("access_token");

    useEffect(() => {

        //console.log("fetch time")
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/blogs/${slug}`,
                    {
                        params: { lang },
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                            withCredentials: true,

                        },
                    }
                );
                setBlogDetails(response.data.data.blogs);
                setCategoryDetails(response.data.data.blogs.category);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();

    }, [lang, slug, token]);


    if (loading) {
        return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!blogDetails) {
        return <div>No course details found.</div>
    }

    return (
        <div>
            <div>
                <Banners src={defImage} textPath="تفاصيل المدونة" />
            </div>
            <div className='container mx-auto'>
                <div className='blogDetails my-4 md:my-14 w-[95%] md:w-[80%] mx-auto flex flex-col-reverse lg:grid grid-cols-3 gap-4 items-center'>
                    <div className='blogTitles w-[95%] md:w-[80%] col-span-2'>
                        <h1 className=' text-base md:text-2xl font-bold mainColor'>
                            <FontAwesomeIcon className=' primaryColor text-lg ml-2' icon={faPenToSquare} />
                            عنوان المدونة

                        </h1>
                        <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                {/* <span>{`المدونة --  ${categoryDetails ? categoryDetails.name : "No Category"} `}</span> */}
                                <span>{`المدونة --  اخبار `}</span>

                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faCalendarDays} />
                                    20/12/2024
                                </span>
                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faEye} />
                                    {/* {`${courseDetails.view_count} مشاهدة `} */}
                                    {`250 مشاهدة `}

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
                            </div>
                        </div>
                    </div>
                    <div className='blogImg'>
                        <div>
                            <Image className='w-full h-full max-h-60'
                                src={defImage}
                                width={100}
                                height={100}
                                alt='course-img' />
                        </div>
                    </div>
                </div>
                <hr className='h-1' />
                {/* start description blog with suggest blogs */}
                <div className='descriptionCourse w-[95%] md:w-[80%] mx-auto mt-2 mb-24 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8'>
                    <div className='col-span-2'>
                        {/* <CourseDescriptionTabs courseDetails={courseDetails} /> */}
                        blog tabs
                        <BlogDescriptionTabs blogDetails={blogDetails} />
                    </div>
                    {/* blog suggestion */}
                    <div className='mt-[6px] border-t-2 lg:border-t-0'>
                        <h3 className='mt-[10px] mr-[10px] mb-[30px] ml-[0] font-bold mainColor'>الدورات المقترحة</h3>
                        <div className='w-[95%] md:w-[80%] grid grid-cols-1 mx-auto gap-8'>
                            <SuggestBlogs />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogContent