"use client"
import Link from 'next/link'
import LangUseParams from '../translate/LangUseParams';
import TranslateHook from '../translate/TranslateHook';

const BooksTitle = () => {
    const lang = LangUseParams();
    const translate = TranslateHook();
    return (
        <div className='container mx-auto w-[95%] lg:w-[80%] flex justify-between items-center my-7'>
            <h2 className='text-xl md:text-2xl font-bold mb-4 primaryColor mr-4'>
                {translate ? translate.pages.homePage.titles.books : "الكتب والابحاث"}
            </h2>
            <Link
                href={`/${lang}/books`}
                className="ml-8 border-[1px] font-bold border-[solid] border-[#424C61] 
                mainColor rounded-[5px] px-[10px]
                py-[6px] hover:bg-[#424C61] hover:text-[#fff]
                hover:ease-in duration-300 mb-4" >
                {translate ? translate.pages.homePage.titles.SeeAll : "عرض الكل"}
            </Link>
        </div>
    )
}
export default BooksTitle