
import Image from "next/image"

import books from '@/assets/images/books.webp'
import { faBookOpen, faBookOpenReader, faCalendar, faEye, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const NewBookHome = ({ item }: any) => {
  return (
    // <div className="bg-red-400 h-[400px]">{item.name}</div>

    <div className="flex flex-row 
                    p-[10px] border-[1px]
                    rounded-[6px] [box-shadow:1px_1px_1px_#ccc]">

      <div className="basis-1/4 w-full relative">
        <Image src={books} className=" max-w-full" fill alt="book" />
      </div>
      <div className="basis-3/4 pr-4">
        <h2 className="text-sm font-bold">
          <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor"/>
          <span className="mainColor">تساؤلات وشبهات متعلقة ... </span>
        </h2>
        <div className="cardDetails grid grid-cols-2 gap-2 mt-2 font-bold">
              <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
                <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
                <span>120 مشاهدة</span>
              </p>
              <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
                <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
                <span>24 اغسطس 2024</span>
              </p>
        </div>
            {/* <h3 className="mt-1">
              <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
              <span className="text-[12px] mainColor">الدكتور بندر ابن محمد الميمونى </span>
            </h3> */}
            <p className="text-[12px] mainColor flex items-start mt-2">
              <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor pt-1" />
              <span className=" opacity-[0.8]">برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد</span>
            </p>
      </div>

    </div>
  )
}

export default NewBookHome