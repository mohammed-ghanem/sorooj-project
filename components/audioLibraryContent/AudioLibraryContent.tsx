"use client"
import { useEffect, useState } from "react";
import LangUseParams from "../translate/LangUseParams";
import TranslateHook from "../translate/TranslateHook";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import axios from "axios";
import Image from 'next/image';
import { faCalendarDays, faEnvelope, faFileAudio, faPenToSquare, faShareNodes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Banners from '../banners/Banners'
import defImage from "@/public/assets/images/default.webp"; // Default image
import { faFacebookF, faTelegram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface audioDetails {
    name: string;
    image?: any;
    description: string;
    publish_date: string;
    brief_description: string;
    youtube_link: string;
    audio_file: string;
    view_count: number;
}
interface CategoryDetails {
    name: string
}
const AudioLibraryContent = () => {
    const [audioDetails, setAudioDetails] = useState<audioDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categoryDetails, setCategoryDetails] = useState<CategoryDetails | null>(null);

    // lang param (ar Or en)
    const lang = LangUseParams();
    const translate = TranslateHook();
    const { slug } = useParams();

    useEffect(() => {

        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/audios/${slug}`,
                    {
                        params: { lang },
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,

                        },
                    }
                );
                setAudioDetails(response.data.data.Audio);
                setCategoryDetails(response.data.data.Audio.category);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
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
    if (!audioDetails) {
        return <div>No audio details found.</div>
    }


    return (
        <section>
            <div>
                <Banners src={defImage} parentTitle={`الصوتية`} textPath={"تفاصيل الصوتى"} />
            </div>
            <div className='container mx-auto'
                style={{ direction: "rtl" }}
            >
                <div className='audioDetails my-4 md:my-14 w-[95%] md:w-[80%] mx-auto flex flex-col-reverse lg:grid grid-cols-3 gap-4 items-center'>
                    <div className='audioTitles w-[95%] md:w-[80%] col-span-2'>
                        <h1 className=' text-base md:text-2xl font-bold mainColor'>
                            <FontAwesomeIcon className=' primaryColor text-lg ml-2' icon={faPenToSquare} />
                            {audioDetails.name}
                        </h1>
                        <div className='my-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
                            <span className=" col-span-2">
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>{`المكتبة الصوتية --  ${categoryDetails ? categoryDetails.name : "No Category"} `}</span>
                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faCalendarDays} />
                                    {audioDetails.publish_date}

                                </span>
                            </span>
                            {/* <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faEye} />
                                    {`${audioDetails.view_count} مشاهدة `}
                                </span>
                            </span> */}
                            {/* <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faDownload} />
                                    140 تحميل
                                </span>
                            </span> */}
                        </div>
                        <span>
                            <span >
                                <FontAwesomeIcon className='ml-1 primaryColor' icon={faFileAudio} />
                                {audioDetails.brief_description}
                            </span>
                        </span>

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
                                {/* <div className="flex items-center">
                                    <span className="ml-4 mainColor text-sm font-bold">المفضلة</span>
                                    <span className='ml-4 text-2xl primaryColor opacity-[0.4]'> || </span>
                                    <BooksAddWishList bookDetails={bookDetails} />
                                </div> */}
                            </div>
                        </div>

                    </div>
                    {audioDetails.youtube_link
                        ?
                        <div className='audioImg'>
                            <Image className="max-w-full w-full"
                                src={`https://img.youtube.com/vi/${audioDetails.youtube_link}/maxresdefault.jpg`}
                                width={100} height={100} alt=''
                            />
                        </div>
                        :
                        ""
                    }

                </div>
                <hr className='h-1' />
                {/* start audio with suggest audios */}
                <div className='descriptionCourse w-[95%] md:w-[80%] mx-auto mt-2 mb-24 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8'>
                    <div className='col-span-2'>
                        {
                            audioDetails.youtube_link
                                ?
                                <div className='mb-5'>
                                    <iframe className='w-full h-80'
                                        src={`https://www.youtube.com/embed/${audioDetails.youtube_link}?enablejsapi=1`}
                                        title={audioDetails.name}
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                                        allowFullScreen
                                    />
                                </div>
                                :
                                <div></div>
                        }
                        {
                            audioDetails.audio_file
                                ?
                                <audio controls>
                                    <source src={audioDetails.audio_file} />
                                </audio>
                                :
                                ""
                        }

                    </div>
                    {/* audio suggestion */}
                    {/* <div className='mt-[6px] border-t-2 lg:border-t-0'>
                        <h3 className='mt-[10px] mr-[10px] mb-[30px] ml-[0] font-bold mainColor'>صوتيات مقترحة</h3>
                        <div className='w-[95%] md:w-[80%] grid grid-cols-1 mx-auto gap-8'>
                            <SuggestAudios />
                        </div>
                    </div> */}
                </div>
            </div>



        </section>
    )
}

export default AudioLibraryContent