'use client'

import Banners from '../banners/Banners'
import defImage from "@/public/assets/images/default.webp"; // Default image
import LangUseParams from '../translate/LangUseParams';
import TranslateHook from '../translate/TranslateHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faDownload, faEnvelope, faEye, faPenToSquare, faShareNodes, faUser } from '@fortawesome/free-solid-svg-icons';
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { faFacebookF, faTelegram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import soroojImg from "@/public/assets/images/111.webp"; // Default image
import BookDescriptionTabs from '../bookDescriptionTabs/BookDescriptionTabs';

const BookContent = () => {
    // lang param (ar Or en)
    const lang = LangUseParams();
    const translate = TranslateHook();
    return (
        <section>
            <div>
                <Banners src={defImage} textPath={translate ? translate.pages.booksContentPage.bannerPathText : ""} />
            </div>
            <div className='container mx-auto'>
                <div className='bookDetails my-4 md:my-14 w-[95%] md:w-[80%] mx-auto flex flex-col-reverse lg:grid grid-cols-3 gap-4 items-center'>
                    <div className='bookTitles w-[95%] md:w-[80%] col-span-2'>
                        <h1 className=' text-base md:text-2xl font-bold mainColor'>
                            <FontAwesomeIcon className=' primaryColor text-lg ml-2' icon={faPenToSquare} />
                            {/* {courseDetails.course_name} */}
                            حكم الخروج للجهاد بدون إذن ولي الأمر
                        </h1>
                        <p className='primaryColor mt-4'>
                            <FontAwesomeIcon className=' primaryColor ml-2' icon={faUser} />
                            {/* {courseDetails.author_name} */}
                            محمد بن إسماعيل البخاري
                        </p>
                        <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                {/* <span>{`الدورات --  ${categoryDetails ? categoryDetails.name : "No Category"} `}</span> */}
                                <span>الدورات -- الفقة</span>
                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faCalendarDays} />
                                    {/* {courseDetails.publish_date} */}
                                    20-12-2024
                                </span>
                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faEye} />
                                    {/* {`${courseDetails.view_count} مشاهدة `} */}
                                    140 مشاهدة
                                </span>
                            </span>
                            <span>
                                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                                <span>
                                    <FontAwesomeIcon className='ml-1 primaryColor' icon={faDownload} />
                                    140 تحميل
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
                                    <span className="ml-4 mainColor text-sm font-bold">اضف الى المفضلة</span>
                                    {/* <CourseAddWishList courseDetails={courseDetails} /> */}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='courseImg'>
                        <div>
                            <Image className='w-full h-full max-h-60'
                                src={soroojImg}
                                width={100}
                                height={100}
                                alt='course-img' />
                        </div>
                    </div>
                </div>
                <hr className='h-1' />
                {/* start description course with suggest courses */}
                <div className='descriptionbook w-[95%] md:w-[80%] mx-auto mt-2 mb-24 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8'>
                    <div className='col-span-2'>
                        {/* <CourseDescriptionTabs courseDetails={courseDetails} /> */}
                        <BookDescriptionTabs/>
                    </div>
                    {/* course suggestion */}
                    <div className='mt-[6px] border-t-2 lg:border-t-0'>
                        <h3 className='mt-[10px] mr-[10px] mb-[30px] ml-[0] font-bold mainColor'>الكتب المقترحة</h3>
                        <div className='w-[95%] md:w-[80%] grid grid-cols-1 mx-auto gap-8'>
                            {/* <SuggestCourses /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookContent 