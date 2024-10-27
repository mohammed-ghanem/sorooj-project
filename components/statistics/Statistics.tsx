'use client'
import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faBookOpen, faCircleQuestion, faSwatchbook, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react";

import CountUp from "react-countup";

interface CountUpProps {
  start?: number;
  end?: number;
  duration?: number;
  decimals?: number;
}


const Statistics: FC<CountUpProps> = ({ start = 0, end, duration = 8, decimals = 0 }) => {
  return (
    <div className='bkColor mt-8 mb-8'>
      <div className="container mx-auto py-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/*  */}
          <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
            <div><FontAwesomeIcon icon={faBookOpen} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div className="flex items-center md:block">
              <CountUp className="primaryColor font-bold text-[35px] mx-3 "
                start={start} end={28} duration={duration} decimals={decimals} />
              <p className="mainColor font-bold opacity-50">الدورات المجانية</p>
            </div>
          </div>
          {/* ***************  for test remove this after life publish*/}
          <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
            <div><FontAwesomeIcon icon={faSwatchbook} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div className="flex items-center md:block">
              <CountUp className="primaryColor font-bold text-[35px] mx-3"
                start={start} end={47} duration={duration} decimals={decimals} />
              <p className="mainColor font-bold opacity-50">الكتب والابحاث</p>
            </div>
          </div>
          <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
            <div><FontAwesomeIcon icon={faYoutube} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div className="flex items-center md:block">
              <CountUp className="primaryColor font-bold text-[35px] mx-3"
                start={start} end={247} duration={duration} decimals={decimals} />
              <p className="mainColor font-bold opacity-50">المكتبة المرئية</p>
            </div>
          </div>
          <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
            <div><FontAwesomeIcon icon={faCircleQuestion} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div className="flex items-center md:block">
              <CountUp className="primaryColor font-bold text-[35px] mx-3"
                start={start} end={124} duration={duration} decimals={decimals} />
              <p className="mainColor font-bold opacity-50">سؤال وجواب</p>
            </div>
          </div>
          <div className="statisticsCard flex items-center justify-start md:justify-center mr-5">
            <div><FontAwesomeIcon icon={faUserGroup} className="primaryColor text-[40px] ml-[20px]" /></div>
            <div className="flex items-center md:block">
              <CountUp className="primaryColor font-bold text-[35px] mx-3"
                start={start} end={560} duration={duration} decimals={decimals} />
              <p className="mainColor font-bold opacity-50">المشتركين</p>
            </div>
          </div>
          {/* *************** */}
        </div>
      </div>
    </div>
  )
}

export default Statistics