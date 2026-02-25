'use client'
import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faBookOpen, faCircleQuestion, faSpinner, faSwatchbook, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useEffect, useState } from "react";

import CountUp from "react-countup";
import TranslateHook from "../translate/TranslateHook";
import axios from "axios";

interface CountUpProps {
  start?: number;
  end?: number;
  duration?: number;
  decimals?: number;
}


const Statistics: FC<CountUpProps> = ({ start = 0, end, duration = 8, decimals = 0 }) => {
  // lang
  const translate = TranslateHook();
  const [courseCount, setCourseCount] = useState<any>();
  const [bookCount, setBookCount] = useState<any>();
  const [videoCount, setVideoCount] = useState<any>();
  const [userCount, setUserCount] = useState<any>();
  const [questionCount, setQuestionCount] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    //console.log("fetch time")
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/statistics`,
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        );
        setCourseCount(response.data.data.courses)
        setBookCount(response.data.data.books)
        setVideoCount(response.data.data.videos)
        setQuestionCount(response.data.data.questions)
        setUserCount(response.data.data.subscribers)


      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();

  }, []);

  return (
    <div className='bkColor mt-8 mb-8'>
      <div className="container mx-auto py-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
            <div><FontAwesomeIcon icon={faBookOpen} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div className="flex items-center md:block">
              <CountUp className="primaryColor font-bold text-[35px] mx-3 "
                start={start} end={courseCount} duration={duration} decimals={decimals} />
              <p className="mainColor font-bold opacity-50">
                {translate ? translate.pages.homePage.statistics.FreeCourses : "الدورات المجانية"}
              </p>
            </div>
          </div>
          <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
            <div><FontAwesomeIcon icon={faSwatchbook} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div className="flex items-center md:block">
              <CountUp className="primaryColor font-bold text-[35px] mx-3"
                start={start} end={bookCount} duration={duration} decimals={decimals} />
              <p className="mainColor font-bold opacity-50">
                {translate ? translate.pages.homePage.statistics.Books : "الكتب والابحاث"}
              </p>
            </div>
          </div>
          <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
            <div><FontAwesomeIcon icon={faYoutube} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div className="flex items-center md:block">
              <CountUp className="primaryColor font-bold text-[35px] mx-3"
                start={start} end={videoCount} duration={duration} decimals={decimals} />
              <p className="mainColor font-bold opacity-50">
                {translate ? translate.pages.homePage.statistics.VideoLibirary : "المكتبة المرئية"}
              </p>
            </div>
          </div>
          <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
            <div><FontAwesomeIcon icon={faCircleQuestion} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div className="flex items-center md:block">
              <CountUp className="primaryColor font-bold text-[35px] mx-3"
                start={start} end={questionCount} duration={duration} decimals={decimals} />
              <p className="mainColor font-bold opacity-50">
                {translate ? translate.pages.homePage.statistics.AnswerQuestion : "سؤال وجواب"}
              </p>
            </div>
          </div>
          <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
            <div><FontAwesomeIcon icon={faUserGroup} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div className="flex items-center md:block">
              <CountUp className="primaryColor font-bold text-[35px] mx-3"
                start={start} end={userCount} duration={duration} decimals={decimals} />
              <p className="mainColor font-bold opacity-50">
                {translate ? translate.pages.homePage.statistics.Subscribers : "المشتركين"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics