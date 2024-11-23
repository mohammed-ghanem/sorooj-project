'use client'
import { useState } from 'react';
import Banners from '../banners/Banners'
import aboutImg from '@/public/assets/images/11111.png'
import cardImg from '@/public/assets/images/card.png'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlay } from '@fortawesome/free-solid-svg-icons';
import aboutFrame from "@/public/assets/images/aboutFrame.png"
import target from "@/public/assets/images/target.png"


import borderImg from "@/public/assets/images/borderImage.png"
import border from "@/public/assets/images/border.png"
import SoroojPath from './SoroojPath';


const AboutUs = () => {

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };
    return (
        <div>
            <Banners src={aboutImg} textPath={"عن المركز"} />
            <div className="mt-20" style={{ direction: "rtl" }}>
                <section className='container mx-auto aboutText'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 w-[95%] lg:w-[80%] mx-auto'>
                        <div className='w-[95%] md:w-[80%] mx-auto'>
                            <h2 className='text-base md:text-2xl font-bold mainColor border-b-2 border-customGold w-[fit-content] pb-[4px]'>عن المركز</h2>
                            <p className='leading-[1.9] mt-[20px] pr-3 lg:pr-[40px]'>
                                مركز سُرج للدراسات والأبحاث , هو مركز علمي دعوي بحثي يعني بتأصيل العقيدة الإسلامية
                                وتعزيز الفطرة الإيمانية وتحصين المجتمع المسلم من الحرب علي الفطرة والإيمان والإسلام , وضرورة تقرير قواعد الشرح الصحيحة المستمدة من القران الكريم والسنه النبوية , وفق منهج السلف الصالح
                            </p>
                        </div>
                        <div className="relative w-full max-w-lg mx-auto">
                            {/* Cover Image */}
                            {!isPlaying && (
                                <div className="">
                                    <div className='relative '>
                                        <Image
                                            src={cardImg} // Replace with your cover image URL
                                            alt="Video cover"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center bg-black bg-opacity-50">
                                        <button onClick={handlePlay} className="absolute -right-[30px] text-white text-4xl border-[10px] border-[solid] border-[#fff] rounded-[35px] pt-[3px] pr-[12px] pb-px pl-[14px] bg-[#947e51] text-[24px] [box-shadow:1px_1px_10px_#333]">
                                            <FontAwesomeIcon icon={faPlay} />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* YouTube Video */}
                            {isPlaying && (
                                <iframe
                                    className="w-full aspect-video"
                                    src="https://www.youtube.com/embed/3-9uWAOCdq8?autoplay=1" // Replace `your-video-id` with the actual YouTube video ID
                                    title="YouTube video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    </div>
                </section>
                {/*  */}
                {/* <section className='mission mt-16'>
                    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 w-[95%] xl:w-[80%] mx-auto'>
                        <div className="w-[95%] relative h-full m-auto">
                            <Image className='relative -z-10 mx-auto h-96' src={border} alt='border' />
                            <span className='absolute font-bold text-[#fff] top-[18px] right-[70px] text-[28px]'>الرؤية</span>
                            <p className='mt-[10px] p-[40px] md:p-[50px] lg:p-[30px]  mx-auto relative -top-[45%] leading-[2.1]'>مركز سُرج للدراسات والأبحاث , هو مركز علمي دعوي بحثي يعني بتأصيل العقيدة الإسلامية وتعزيز الفطرة الإيمانية وتحصين المجتمع المسلم من الحرب علي الفطرة والإيمان والإسلام , وضرورة تقرير قواعد الشرح الصحيحة المستمدة من القران الكريم والسنه النبوية , وفق منهج السلف الصالح</p>
                        </div>

                        <div className="w-[95%] relative h-full m-auto">
                            <Image className='relative -z-10 mx-auto h-96' src={borderImg} alt='border' />
                            <span className='absolute font-bold text-[#fff] top-[18px] right-[70px] text-[28px]'>الرسالة</span>
                            <p className='mt-[10px] p-[40px] md:p-[50px] lg:p-[30px]  mx-auto relative -top-[45%] leading-[2.1]'>
                                في ظل الهجمات الشرسة علي المسلمين في شتي المجالات والسبل والوسائل , يسعي المركز إلي إيجاد بيئة علمية فطرية إيمانية , ترسخ اليقين وسلامة المعتقد وتعني بنشر محاسن الإسلام , والسعي في ثبات منظومة الأسرة والمجتمع , مع الدعوة إلي الإيمان لهداية بقية المذاهب والأديان مع بناء الحصن المنيع ضد كل هجمة  مهما كان حجمها باستثمار كافة الجهود , وكافة الوسائل الحديثة والمتطورة والتقليدية في ي تحقيق تلك الأهداف , ليشمل جميع فئات المجتمع , من المربين والمؤثرين والمتأثرين والمتشككين
                            </p>
                        </div>
                    </div>
                </section> */}
                {/*  */}

                <section className='ourTarget mt-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10 w-[95%] xl:w-[80%] mx-auto items-center'>
                        <div className='relative bkPrimaryColor p-5 [box-shadow:1px_1px_7px_#424c61]'>
                            <Image src={target} className='rounded-tl-[35px] rounded-br-[35px] rounded-tr-none rounded-bl-none border-[1px] border-[solid] border-[#fff] p-[10px]' alt='target' />
                        </div>
                        <div className='mt-3 lg:mt-0 col-span-2 bkColor rounded-[6px] px-[15px] lg:px-[40px] py-[20px]'>
                            <h3 className='text-base md:text-l font-bold mainColor border-b-2 border-customGold w-[fit-content] pb-[4px]'>الاهداف العامة</h3>
                            <ul className='mt-3'>
                                <li className='mt-2'>
                                    <div className='flex'>
                                        <FontAwesomeIcon className='primaryColor ml-2' icon={faMinus} />
                                        <span className='mainColor'>تأصيل العقيدة الصحيحة المستمدة من الكتاب والسنه وفق منهج سلف الأمه</span>
                                    </div>
                                </li>
                                <li className='mt-2'>
                                    <div className='flex'>
                                        <FontAwesomeIcon className='primaryColor ml-2' icon={faMinus} />
                                        <span className='mainColor'>بث ونشر محاسن الإسلام وتحصيل الأمان العقدي.</span>
                                    </div>
                                </li>
                                <li className='mt-2'>
                                    <div className='flex'>
                                        <FontAwesomeIcon className='primaryColor ml-2' icon={faMinus} />
                                        <span className='mainColor'>ترسيخ المسلمات الدينية والثوابت الإيمانية.</span>
                                    </div>

                                </li>
                                <li className='mt-2'>
                                    <div className='flex'>
                                        <FontAwesomeIcon className='primaryColor ml-2' icon={faMinus} />
                                        <span className='mainColor'>تحصين المسلمين ووقاية الشباب والأسرة المسلمة من آثار الأفكار والشبهات المعاصرة.</span>
                                    </div>
                                </li>
                                <li className='mt-2'>
                                    <div className='flex'>
                                        <FontAwesomeIcon className='primaryColor ml-2' icon={faMinus} />
                                        <span className='mainColor'>تحصين المسلمين ووقاية الشباب والأسرة المسلمة من آثار الأفكار والشبهات المعاصرة.</span>
                                    </div>
                                </li>
                                <li className='mt-2'>
                                    <div className='flex'>
                                        <FontAwesomeIcon className='primaryColor ml-2' icon={faMinus} />
                                        <span className='mainColor'>الإعداد البحثي لطلاب العلم والدعاة وفق قواعد البحث العلمي لتخريج نخبة من المختصين
                                            في مجال الكتابة العلمية بجميع أشكالها مع طرح المواضيع البحثية المتفقة مع رؤية ورسالة
                                            المركز.</span>
                                    </div>
                                </li>
                                <li className='mt-2'>
                                    <div className='flex'>
                                        <FontAwesomeIcon className='primaryColor ml-2' icon={faMinus} />
                                        <span className='mainColor'>رصد أبرز المذاهب الفكرية المعاصرة وتتبع منابعها ومخرجاتها ومراكزها والتعامل معها وفق
                                            منهج أهل السنة والجماعة.</span>
                                    </div>
                                </li>
                                <li className='mt-2'>
                                    <div className='flex'>
                                        <FontAwesomeIcon className='primaryColor ml-2' icon={faMinus} />
                                        <p className='mainColor'>تقديم المحتوى المرئي والمسموع والمطبوع، بآل ي ات وبرامج حديثة عبر المنصات المتاحة ووسائل
                                            التواصل الجتماعي مع إظهار جهود أهل السنة والجماعة في مسائل تعزيز اليقين، والرد
                                            على الشبهات .</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                {/*  */}
                <section className='my-10 lg:my-20 relative w-full h-full'>
                    {/* <Image className='-z-10' src={aboutFrame} fill alt='' /> */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 w-[95%] xl:w-[80%] mx-auto items-center'>
                        <div className='mb-8 lg:mb-0'>
                            <h4 className='text-base md:text-l font-bold mainColor border-b-2 border-customGold w-[fit-content] pb-[4px]'>
                                مسارات ومجالات المركز
                            </h4>
                            <p className='leading-[1.9] mt-[20px] pr-3 lg:pr-[20px]'>
                                استكشاف المسارات الاربعة المتنوعة التى يقدمها المركز والتى تشمل مجالات التعليم والبحث العلمى والابتكار التكنولوجى والتنمية المستدامة مما يتيح للمتدربين والباحثين فرصة فريدة لتوسيع افاقهم وتحقيق اهدافهم المهنية فى بيئة تعليمية متكاملة
                            </p>
                        </div>
                        <div>
                            <SoroojPath />
                        </div>
                    </div>
                </section>
                {/*  */}
                <section className='relative w-full h-full my-7'>
                    <Image className='-z-10' src={aboutFrame} fill alt='' />
                    <div className='container mx-auto' >
                        <h3 className='text-center text-white font-bold pt-8 text-3xl'>ألية عمل المركز</h3>
                        <div className='p-0 lg:p-7 container mx-auto my-10 pb-5 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10 w-[95%] lg:w-[80%] text-white text-center items-center'>
                            <div className='border-dashed border-2 rounded-[6px] w-full bg-customGray mx-auto h-[140px] flex items-center justify-center font-bold px-3 md:px-6 lg:px-10 xl:px-16'>تصوير وتسجيل البرامج المرئية والمسموعه</div>
                            <div className='border-dashed border-2 rounded-[6px] w-full bg-customGray mx-auto h-[140px] flex items-center justify-center font-bold px-3 md:px-6 lg:px-10 xl:px-16'>الدورات العلمية المختصه</div>
                            <div className='border-dashed border-2 rounded-[6px] w-full bg-customGray mx-auto h-[140px] flex items-center justify-center font-bold px-3 md:px-6 lg:px-10 xl:px-16'>أكادمية سرج العملية لتأصيل طلاب العلم وتأهيل الدعاة في برامج دراسية سنوية</div>
                            <div className='border-dashed border-2 rounded-[6px] w-full bg-customGray mx-auto h-[140px] flex items-center justify-center font-bold px-3 md:px-6 lg:px-10 xl:px-16'>الندوات والحوارات البناءه</div>
                            <div className='border-dashed border-2 rounded-[6px] w-full bg-customGray mx-auto h-[140px] flex items-center justify-center font-bold px-3 md:px-6 lg:px-10 xl:px-16'>المحاضرات والكلمات</div>
                            <div className='border-dashed border-2 rounded-[6px] w-full bg-customGray mx-auto h-[140px] flex items-center justify-center font-bold px-3 md:px-6 lg:px-10 xl:px-16'>الفتاوي والاستشارات واللقاءات المفتوحه</div>
                            <div className='border-dashed border-2 rounded-[6px] w-full bg-customGray mx-auto h-[140px] flex items-center justify-center font-bold px-3 md:px-6 lg:px-10 xl:px-16'>تاليف الكتب المختصه والأبحاث المحكمة والمقالات</div>
                            <div className='border-dashed border-2 rounded-[6px] w-full bg-customGray mx-auto h-[140px] flex items-center justify-center font-bold px-3 md:px-6 lg:px-10 xl:px-16'>تأصيل طلاب العلم وتأهيل الدعاة</div>
                            <div className='border-dashed border-2 rounded-[6px] w-full bg-customGray mx-auto h-[140px] flex items-center justify-center font-bold px-3 md:px-6 lg:px-10 xl:px-16'>نشر الفوائد العلمية والدعوية عبر وسائل التواصل</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AboutUs