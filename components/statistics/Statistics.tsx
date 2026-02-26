"use client";

import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faBookOpen,
  faCircleQuestion,
  faSwatchbook,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import TranslateHook from "../translate/TranslateHook";
import axios from "axios";
import dynamic from "next/dynamic";

const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
});

interface StatisticsProps {
  start?: number;
  duration?: number;
  decimals?: number;
}

const Statistics: FC<StatisticsProps> = ({
  start = 0,
  duration = 2,
  decimals = 0,
}) => {
  const translate = TranslateHook();

  const [mounted, setMounted] = useState(false);

  const [courseCount, setCourseCount] = useState<number>(0);
  const [bookCount, setBookCount] = useState<number>(0);
  const [videoCount, setVideoCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);

  // تأكيد mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // جلب البيانات
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/statistics`,
          {
            withCredentials: true,
          }
        );

        const data = response.data?.data;

        setCourseCount(Number(data?.courses) || 0);
        setBookCount(Number(data?.books) || 0);
        setVideoCount(Number(data?.videos) || 0);
        setQuestionCount(Number(data?.questions) || 0);
        setUserCount(Number(data?.subscribers) || 0);
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message);
      }
    };

    fetchStatistics();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // لا تعرض CountUp قبل mount
  if (!mounted) return null;

  const renderCard = (
    icon: any,
    value: number,
    label: string
  ) => (
    <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
      <div>
        <FontAwesomeIcon
          icon={icon}
          className="primaryColor text-[40px] ml-[20px]"
        />
      </div>
      <div className="flex items-center md:block">
        <CountUp
          className="primaryColor font-bold text-[35px] mx-3"
          start={start}
          end={value}
          duration={duration}
          decimals={decimals}
        />
        <p className="mainColor font-bold opacity-50">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="bkColor mt-8 mb-8">
      <div className="container mx-auto py-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {renderCard(
            faBookOpen,
            courseCount,
            translate?.pages.homePage.statistics.FreeCourses ||
              "الدورات المجانية"
          )}
          {renderCard(
            faSwatchbook,
            bookCount,
            translate?.pages.homePage.statistics.Books ||
              "الكتب والابحاث"
          )}
          {renderCard(
            faYoutube,
            videoCount,
            translate?.pages.homePage.statistics.VideoLibirary ||
              "المكتبة المرئية"
          )}
          {renderCard(
            faCircleQuestion,
            questionCount,
            translate?.pages.homePage.statistics.AnswerQuestion ||
              "سؤال وجواب"
          )}
          {renderCard(
            faUserGroup,
            userCount,
            translate?.pages.homePage.statistics.Subscribers ||
              "المشتركين"
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;










// 'use client'
// import { faYoutube } from "@fortawesome/free-brands-svg-icons"
// import { faBookOpen, faCircleQuestion, faSwatchbook, faUserGroup } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { FC, useEffect, useState } from "react";


// import TranslateHook from "../translate/TranslateHook";
// import axios from "axios";

// import dynamic from "next/dynamic";

// const CountUp = dynamic(() => import("react-countup"), {
//   ssr: false,
// });

// interface CountUpProps {
//   start?: number;
//   end?: number;
//   duration?: number;
//   decimals?: number;
// }


// const Statistics: FC<CountUpProps> = ({ start = 0, end, duration = 8, decimals = 0 }) => {
//   const [mounted, setMounted] = useState(false);
//   // lang
//   const translate = TranslateHook();
//   const [courseCount, setCourseCount] = useState<any>();
//   const [bookCount, setBookCount] = useState<any>();
//   const [videoCount, setVideoCount] = useState<any>();
//   const [userCount, setUserCount] = useState<any>();
//   const [questionCount, setQuestionCount] = useState<any>();
//   const [error, setError] = useState<string | null>(null);


  
//   useEffect(() => {

//     //console.log("fetch time")
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/statistics`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               withCredentials: true,
//             },
//           }
//         );
//         setCourseCount(response.data.data.courses)
//         setBookCount(response.data.data.books)
//         setVideoCount(response.data.data.videos)
//         setQuestionCount(response.data.data.questions)
//         setUserCount(response.data.data.subscribers)


//       } catch (err: any) {
//         setError(err.response?.data?.message || err.message);
//       }
//     };
//     fetchCourses();

//   }, []);

  

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

  
//   return (
//     <div className='bkColor mt-8 mb-8'>
//       <div className="container mx-auto py-6">
//         <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
//             <div><FontAwesomeIcon icon={faBookOpen} className="primaryColor text-[40px] ml-[20px]" /></div>
//             <div className="flex items-center md:block">
//               <CountUp className="primaryColor font-bold text-[35px] mx-3 "
//                 start={start} end={courseCount} duration={duration} decimals={decimals} />
//               <p className="mainColor font-bold opacity-50">
//                 {translate ? translate.pages.homePage.statistics.FreeCourses : "الدورات المجانية"}
//               </p>
//             </div>
//           </div>
//           <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
//             <div><FontAwesomeIcon icon={faSwatchbook} className="primaryColor text-[40px] ml-[20px]" /></div>
//             <div className="flex items-center md:block">
//               <CountUp className="primaryColor font-bold text-[35px] mx-3"
//                 start={start} end={bookCount} duration={duration} decimals={decimals} />
//               <p className="mainColor font-bold opacity-50">
//                 {translate ? translate.pages.homePage.statistics.Books : "الكتب والابحاث"}
//               </p>
//             </div>
//           </div>
//           <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
//             <div><FontAwesomeIcon icon={faYoutube} className="primaryColor text-[40px] ml-[20px]" /></div>
//             <div className="flex items-center md:block">
//               <CountUp className="primaryColor font-bold text-[35px] mx-3"
//                 start={start} end={videoCount} duration={duration} decimals={decimals} />
//               <p className="mainColor font-bold opacity-50">
//                 {translate ? translate.pages.homePage.statistics.VideoLibirary : "المكتبة المرئية"}
//               </p>
//             </div>
//           </div>
//           <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
//             <div><FontAwesomeIcon icon={faCircleQuestion} className="primaryColor text-[40px] ml-[20px]" /></div>
//             <div className="flex items-center md:block">
//               <CountUp className="primaryColor font-bold text-[35px] mx-3"
//                 start={start} end={questionCount} duration={duration} decimals={decimals} />
//               <p className="mainColor font-bold opacity-50">
//                 {translate ? translate.pages.homePage.statistics.AnswerQuestion : "سؤال وجواب"}
//               </p>
//             </div>
//           </div>
//           <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
//             <div><FontAwesomeIcon icon={faUserGroup} className="primaryColor text-[40px] ml-[20px]" /></div>
//             <div className="flex items-center md:block">
//               <CountUp className="primaryColor font-bold text-[35px] mx-3"
//                 start={start} end={userCount} duration={duration} decimals={decimals} />
//               <p className="mainColor font-bold opacity-50">
//                 {translate ? translate.pages.homePage.statistics.Subscribers : "المشتركين"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Statistics