'use client'

import Image from "next/image"
import test from '@/public/assets/images/test.jpg'
import { faEye, faCalendar, faBookOpenReader, faUser, faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import CoursesCard from "../coursesCard/CoursesCard"

const newCourseHome = ({ item }: any) => {

  return (

    // <div>
    //   <CoursesCard
    //       imgSrc={undefined}
    //       watchNumber={""}
    //       datePublish={""}
    //       courseTitle={""}
    //       doctorName={item.name}
    //       descriptionCourse={""}>
    //     </CoursesCard>
    // </div>

    
    
    // courses card
    <div className=" bkColor rounded-[15px] overflow-hidden">
      <div className="newCourses h-full">
        <Image className="w-full" src={test} alt="test" height={100}/>
        <div className="px-3">
          <div className="cardDetails grid grid-cols-2 gap-2 mt-3 font-bold">
            <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
              <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
              <span>120 مشاهدة</span>
            </p>
            <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
              <span>24 اغسطس 2024</span>
            </p>
          </div>
          <h2 className="mt-2">
            <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
            <span className="font-bold mainColor">شرح العقيدة الوسطية</span>
          </h2>
          <h3 className="mt-1">
            <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
            <span className="text-[12px] mainColor">الدكتور بندر ابن محمد الميمونى </span>
          </h3>
          <p className="text-[12px] mainColor flex items-center mt-2">
            <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor" />
            <span className=" opacity-[0.8]">برنامج محطات فى العقيدة المحور الثانى بعنوان مفهوم التوحيد</span>
          </p>
          {/* <h2>{item.name}</h2> */}
        </div>
        <Link href={`/`}
          className="block text-center bkPrimaryColor py-3 mt-[16px] text-white font-bold">
          بدء
        </Link>
      </div>
    </div>
  )
}

export default newCourseHome

