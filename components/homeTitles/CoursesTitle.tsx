"use client"
import Link from 'next/link'
import LangUseParams from '../translate/LangUseParams';

const CoursesTitle = () => {
    const lang = LangUseParams();
    return (
        <div className='container mx-auto flex justify-between items-center'>
            <h1 className='text-xl md:text-2xl font-bold mb-4 primaryColor mr-4'>الدورات التعليمية</h1> 
            <Link
                href={`/${lang}/courses`}
                className="ml-8 border-[1px] font-bold border-[solid] border-[#424C61] 
                mainColor rounded-[5px] px-[10px]
                py-[6px] hover:bg-[#424C61] hover:text-[#fff]
                hover:ease-in duration-300 mb-4" >عرض الكل</Link>
        </div>
    )
}
export default CoursesTitle