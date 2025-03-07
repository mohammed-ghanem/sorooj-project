"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banners from '../banners/Banners'
import defImage from "@/public/assets/images/default.webp"; // Default image
import { faCalendarDays, faDownload, faEnvelope, faEye, faPenToSquare, faShareNodes, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { faFacebookF, faTelegram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import BlogDescriptionTabs from '../blogDescriptionTabs/BlogDescriptionTabs';
import { useEffect, useState } from 'react';
import LangUseParams from '../translate/LangUseParams';
import { useParams } from 'next/navigation';
import axios from 'axios';
import SuggestBlogs from '../blogDescriptionTabs/SuggestBlogs';
import VideoBlogTab from '../videoBlogTab/VideoBlogTab';
interface BlogDetails {
    id: any;
    blog_name: string;
    image?: any;
    description: string;
    publish_date: string;
    author_name: string;
    view_count: number;
    download_count: number;
    videos: any;
    video_url: any;
    attachments: any;
    audio_file: any
}
interface CategoryDetails {
    name: string
}
interface BlogVideos {
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
    const [blogVideos, setBlogVideos] = useState<BlogVideos[]>([]);



    // lang param (ar Or en)
    const lang = LangUseParams();
    const { slug } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/blogs/${slug}`,
                    {
                        params: { lang },
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,

                        },
                    }
                );

                const blogData = response.data.data.Blogs
                setBlogDetails(blogData);
                setCategoryDetails(blogData.category);
                setBlogVideos(blogData.videos || []);

                // Increment view count
                incrementViewCount(blogData.slug, blogData.view_count);

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
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/blogs/set-view-count/${slug}`,
                    { view_count: currentViewCount + 1 }, // Send the required view_count field
                    {
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,
                        },
                    }
                );
                // Optimistically update the view count locally
                setBlogDetails((prev) =>
                    prev ? { ...prev, view_count: currentViewCount + 1 } : prev
                );
            } catch (err: any) {
                console.error("Failed to increment view count:", err.response?.data?.message || err.message);
            }
        };

        fetchBlog();

    }, [lang, slug]);


    if (loading) {
        return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!blogDetails) {
        return <div>No blog details found.</div>
    }

    return (
        <div>
            <div>
                <Banners src={defImage} parentTitle={`المدونة`} textPath="تفاصيل المدونة" />
            </div>
            <div className='container mx-auto'
                style={{ direction: "rtl" }}
            >
                <div className='blogDetails my-4 md:my-14 w-[95%] md:w-[80%] mx-auto flex flex-col-reverse lg:grid grid-cols-3 gap-4 items-center'>
                    <div className='blogTitles w-[95%] md:w-[80%] col-span-2'>
                        <h1 className=' text-base md:text-2xl font-bold mainColor'>
                            <FontAwesomeIcon className=' primaryColor text-lg ml-2' icon={faPenToSquare} />
                            {blogDetails.blog_name}

                        </h1>
                        <p className='primaryColor mt-4'>
                            <FontAwesomeIcon className=' primaryColor ml-2' icon={faUser} />
                            {blogDetails.author_name}
                        </p>
                        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>{`المدونة --  ${categoryDetails ? categoryDetails.name : "No Category"} `}</span>
                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faCalendarDays} />
                                    {blogDetails.publish_date}
                                </span>
                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faEye} />
                                    {`${blogDetails.view_count} مشاهدة `}
                                </span>
                            </span>
                            {
                                blogDetails.attachments && blogDetails.attachments.length > 0
                                    ? (
                                        <span>
                                            <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                            <span>
                                                <FontAwesomeIcon className='ml-1 primaryColor' icon={faDownload} />
                                                {`${blogDetails.download_count} تحميل `}
                                            </span>
                                        </span>
                                    )
                                    : null
                            }

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
                                src={blogDetails.image}
                                width={100}
                                height={100}
                                alt='course-img' />
                        </div>
                    </div>
                </div>
                {/* blog audio file */}

                {
                    <div className='my-5'>
                        {blogDetails.audio_file
                            ?
                            <div>
                                <hr className='h-1 mb-5' />
                                <audio className='mx-auto w-[95%] md:w-[70%]' controls>
                                    <source src={blogDetails.audio_file} />
                                </audio>
                            </div>
                            :
                            ""}
                    </div>

                }

                {/* blog videos */}
                <div>
                    {blogVideos.length > 0 && blogVideos[0].video_url !== null ? (
                        <div>
                            <hr className='h-1' />
                            <div className='my-5'>
                                <VideoBlogTab blogVideos={blogVideos} />
                            </div>
                        </div>
                    ) : null}
                </div>
               
                <hr className='h-1' />
                {/* start description blog with suggest blogs */}
                <div className='descriptionCourse w-[95%] md:w-[80%] mx-auto mt-2 mb-24 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8'>
                    <div className='col-span-2'>
                        <BlogDescriptionTabs blogDetails={blogDetails} />
                    </div>
                    {/* blog suggestion */}
                    <div className='mt-[6px] border-t-2 lg:border-t-0'>
                        <h3 className='mt-[10px] mr-[10px] mb-[30px] ml-[0] font-bold mainColor'>مدونات المقترحة</h3>
                        <div className='w-[95%] md:w-[80%] grid grid-cols-1 mx-auto gap-8'>
                            <SuggestBlogs currentBlogDetails={blogDetails.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogContent