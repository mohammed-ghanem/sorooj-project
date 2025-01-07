"use client"
import LangUseParams from '../translate/LangUseParams';
import TranslateHook from '../translate/TranslateHook';

const MoreWatchTitle = () => {
    const lang = LangUseParams();
    const translate = TranslateHook();
    return (
        <div className='container mx-auto w-[95%] lg:w-[80%] flex justify-between items-center mt-16'>
            <h4 className='text-xl md:text-2xl font-bold mb-4 primaryColor mr-4'>
                {translate ? translate.pages.homePage.titles.MoreWatching : "الاكثر مشاهدة"}
            </h4>
        </div>
    )
}
export default MoreWatchTitle