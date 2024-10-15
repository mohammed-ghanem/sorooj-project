
import Image from "next/image"

import books from '@/assets/images/books.webp'
import { faBookOpen, faBookOpenReader, faCalendar, faEye, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const NewBookHome = ({ item }: any) => {
  return (
    // <div className="bg-red-400 h-[400px]">{item.name}</div>

    <div className=" block md:flex
                    h-auto
                    md:h-[120px]
                    border-[1px]
                    rounded-[6px] [box-shadow:1px_1px_1px_#ccc]">

      <div className="flex-auto w-full h-[120px] md:h-auto md:w-32 relative">
        <Image src={books} className=" max-w-full" fill alt="book" />
      </div>

      <div className="flex-auto w-full md:w-64 px-[10px] py-[5px] my-[10px] md:my-auto">
        <h2 className="text-sm font-bold">
          <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
          <span className="mainColor">تساؤلات وشبهات متعلقة .... </span>
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
        <h3 className="">
          <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
          <span className="text-[12px] mainColor">الدكتور بندر ابن محمد الميمونى </span>
        </h3>
        <p className="text-[12px] mainColor flex items-start">
          <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor pt-1" />
          <span className=" opacity-[0.8]">برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد ...</span>
        </p>
      </div>

    </div>
  )
}

export default NewBookHome