'use client'
import { useState } from 'react';
import Banners from '../banners/Banners'
import aboutImg from '@/public/assets/images/11111.png'
import cardImg from '@/public/assets/images/card.png'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import borderImg from "@/public/assets/images/borderImage.png"
import aboutFrame from "@/public/assets/images/aboutFrame.png"

const AboutUs = () => {

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };
    return (
        <div>
            <Banners src={aboutImg} textPath={"عن المركز"} />
            <div className="mt-20">
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
                            <Image className='relative -z-10 mx-auto h-96' src={borderImg} alt='border' />
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
                <section className='relative w-full h-full my-7'>
                    <Image className='-z-10' src={aboutFrame} fill alt='' />
                    <div className='container mx-auto' >
                        <div className='p-7 container mx-auto my-20 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 w-[95%] lg:w-[80%] text-white'>
                            <div className=''>title</div>
                            <div className='col-span-3 grid grid-cols-3 gap-10'>
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AboutUs