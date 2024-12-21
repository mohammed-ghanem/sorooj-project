"use client"
import Link from 'next/link'
import LangUseParams from '../translate/LangUseParams';
import TranslateHook from '../translate/TranslateHook';

const CoursesTitle = () => {
    const lang = LangUseParams();
    const translate = TranslateHook();
    return (
        <div className='container mx-auto flex justify-between items-center'>
            <h1 className='text-xl md:text-2xl font-bold mb-4 primaryColor mr-4'>
                {translate ? translate.pages.homePage.titles.EducationalCourses : "الدورات المجانية"}
            </h1>
            <Link
                href={`/${lang}/courses`}
                className="ml-8 border-[1px] font-bold border-[solid] border-[#424C61] 
                mainColor rounded-[5px] px-[10px]
                py-[6px] hover:bg-[#424C61] hover:text-[#fff] first-letter:
                hover:ease-in duration-300 mb-4" >
                {translate? translate.pages.homePage.titles.SeeAll : "عرض الكل"}
                </Link>
        </div>
    )
}
export default CoursesTitle