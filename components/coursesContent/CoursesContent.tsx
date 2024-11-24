"use client"
import Banners from '../banners/Banners'
import defImage from "@/public/assets/images/default.webp"; // Default image
import TranslateHook from "../translate/TranslateHook";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faEye, faPenToSquare, faShareNodes, faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faFacebookF, faTwitter, faInstagram, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import coueseImg from "@/public/assets/images/courseImg.jpg"
import soroojImg from "@/public/assets/images/111.webp"; // Default image
import VideoTabsCourse from '../videoCourseTab/VideoTabsCourse';
import CourseDescriptionTabs from '../courseDescriptionTabs/CourseDescriptionTabs';

import test from '@/public/assets/images/test.png'
import CoursesCard from '../coursesCard/CoursesCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LangUseParams from '../translate/LangUseParams';
import { useParams } from "next/navigation"; // For retrieving route parameters



interface CourseDetails {
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


const CoursesContent = () => {
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails | null>(null);
  // lang param (ar Or en)
  const lang = LangUseParams();
  const translate = TranslateHook();
  const { id } = useParams();

  useEffect(() => {
    // Fetch courses data
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses/courses/${id}`,
          {
            params: { lang }, // Pass the language as a query parameter
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data.Courses)
        setCourseDetails(response.data.data.Courses); // Update state with fetched courses
        setCategoryDetails(response.data.data.Courses.category)
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  if (!courseDetails) {
    return <div>No course details found.</div>;
  }


  const socialMediaLinks = [
    { href: "https://www.facebook.com", icon: faFacebookF },
    { href: "https://www.twitter.com", icon: faTwitter },
    { href: "https://www.whatsapp.com", icon: faWhatsapp },
    { href: "https://www.instagram.com", icon: faInstagram },
    { href: "https://www.telegram.com", icon: faTelegram }
  ];
  return (
    <section>
      <div>
        <Banners src={defImage} textPath={translate ? translate.pages.coursesContentPage.bannerPathText : ""} />
      </div>
      <div className='container mx-auto'>
        <div className='courseDetails my-4 md:my-14 w-[95%] md:w-[80%] mx-auto flex flex-col-reverse lg:grid grid-cols-3 gap-4 items-center'>
          <div className='courseTitles w-[95%] md:w-[80%] col-span-2'>
            <h1 className=' text-base md:text-2xl font-bold mainColor'>
              <FontAwesomeIcon className=' primaryColor text-lg ml-2' icon={faPenToSquare} />
              {courseDetails.course_name}

            </h1>
            <p className='primaryColor mt-4'>
              <FontAwesomeIcon className=' primaryColor ml-2' icon={faUser} />
              {courseDetails.author_name}
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
                  {courseDetails.publish_date}
                </span>
              </span>
              <span>
                <span className='text-2xl primaryColor opacity-[0.4]'> || </span>
                <span>
                  <FontAwesomeIcon className='ml-1 primaryColor' icon={faEye} />
                  {`${courseDetails.view_count} مشاهدة `}
                </span>
              </span>
            </div>
            <div className='shareContent mt-4'>

              <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center' >
                <div className='block md:flex items-center col-span-2'>
                  <h4 className='mainColor text-sm font-bold ml-4 mb-2 md:mb-0'>
                    <FontAwesomeIcon className=' primaryColor ml-2' icon={faShareNodes} />
                    مشاركة عبر :
                  </h4>
                  {socialMediaLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className='ml-3 '
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon className='text-[#9F854E] text-xl
                                            border-[1px] border-[solid] border-[#9F854E] rounded-[30px] p-[5px] w-[22px]
                                            hover:border-[#424C61] hover:bg-[#424C61] hover:text-[#fff] hover:ease-in duration-300'
                        icon={social.icon} />
                    </Link>
                  ))}
                </div>
                <div className='flex items-center'>
                  <span className='ml-4 mainColor text-sm font-bold'>اضف الى المفضلة</span>
                  <button className=''>
                    <FontAwesomeIcon className=' primaryColor text-2xl' icon={faHeart} />
                  </button>
                </div>

              </div>
            </div>

            <div className='testCourse mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
              <div className='col-span-2'>
                <button className='bkMainColor text-white px-[20px] py-[10px] rounded-[6px]'>
                  اشترك فى الدورة مجانا
                </button>
              </div>
              <div>
                <button className='bkMainColor text-white px-[20px] py-[10px] rounded-[6px]'>
                  بدء الاختبار
                </button>
              </div>
            </div>

          </div>
          <div className='courseImg'>
            <div>
              <Image className='w-full h-full max-h-60'
                src={courseDetails?.image || soroojImg}
                width={100}
                height={100}
                alt='course-img' />
            </div>
          </div>
        </div>
        <hr className='h-1' />
        {/* start all videos course */}
        <div className='videosCourse mt-2 md:mt-8'>
          <VideoTabsCourse />
        </div>
        {/* end all videos course */}
        <hr className='h-1' />
        {/* start description course with suggest courses */}
        <div className='descriptionCourse w-[95%] md:w-[80%] mx-auto mt-2 mb-24 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8'>
          <div className='col-span-2'>
            <CourseDescriptionTabs />
          </div>
          {/* course suggestion */}
          <div className='mt-[24px] border-t-2 lg:border-t-0'>
            <h3 className='mt-[10px] mr-[10px] mb-[30px] ml-[0] font-bold '>الدورات المقترحة</h3>
            <div className='w-[95%] md:w-[80%] grid grid-cols-1 mx-auto gap-8'>
              <CoursesCard
                imgSrc={test}
                watchNumber={"120 مشاهدة"}
                datePublish={"24 اغسطس 2024"}
                courseTitle={"شرح الفقة الوسطى"}
                doctorName={"الدكتور حمد بن محمد الهاجرى"}
                descriptionCourse={"برنامج محطات فى العقيدة المحور الثانى"}
                pathLinkToContent={`بدء`}
              />
              <CoursesCard
                imgSrc={test}
                watchNumber={"120 مشاهدة"}
                datePublish={"24 اغسطس 2024"}
                courseTitle={"شرح الفقة الوسطى"}
                doctorName={"الدكتور حمد بن محمد الهاجرى"}
                descriptionCourse={"برنامج محطات فى العقيدة المحور الثانى"}
                pathLinkToContent={`بدء`}
              />
              <CoursesCard
                imgSrc={test}
                watchNumber={"120 مشاهدة"}
                datePublish={"24 اغسطس 2024"}
                courseTitle={"شرح الفقة الوسطى"}
                doctorName={"الدكتور حمد بن محمد الهاجرى"}
                descriptionCourse={"برنامج محطات فى العقيدة المحور الثانى"}
                pathLinkToContent={`بدء`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoursesContent





{/* <div className="container mx-auto my-20 w-[95%] lg:w-[80%]">
          <h1 className="text-2xl font-bold mb-4">{courseDetails.course_name}</h1>
          <img src={courseDetails.image || soroojImg.src} alt={courseDetails.course_name} className="mb-4" />
          <p className="text-gray-700">{courseDetails.description}</p>
          <p className="mt-4">Published on: {courseDetails.publish_date}</p>
          <p>Instructor: {courseDetails.author_name}</p>
          <p>Views: {courseDetails.view_count}</p>
        </div> */}
