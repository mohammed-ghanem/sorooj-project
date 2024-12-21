"use client"
import Link from "next/link"
import LangUseParams from '../translate/LangUseParams';
import TranslateHook from "../translate/TranslateHook";

const AnswerTitle = () => {
    const lang = LangUseParams();
    const translate = TranslateHook();
    return (
        <div className='container mx-auto flex justify-between items-center mt-16'>
            <h6 className='text-2xl font-bold mb-4 primaryColor mr-4'>
                {translate ? translate.pages.homePage.titles.AnswerQuestion : "سؤال وجواب"}

            </h6>
            <Link
                href={`/${lang}/questions`}
                className="ml-8 border-[1px] font-bold border-[solid] border-[#424C61] 
                mainColor rounded-[5px] px-[10px]
                py-[6px] hover:bg-[#424C61] hover:text-[#fff]
                hover:ease-in duration-300 mb-4" >
                {translate ? translate.pages.homePage.titles.SeeAll : "عرض الكل"}
            </Link>
        </div>
    )
}
export default AnswerTitle