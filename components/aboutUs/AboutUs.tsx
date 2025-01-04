'use client'
import { useEffect, useState } from 'react';
import Banners from '../banners/Banners'
import aboutImg from '@/public/assets/images/default.webp'
import cardImg from '@/public/assets/images/dee.svg'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import aboutFrame from "@/public/assets/images/aboutFrame.png"
import target from "@/public/assets/images/target.png"
import earth from "@/public/assets/images/earth.png"
import title from "@/public/assets/images/title.png"
import SoroojPath from './SoroojPath';
import axios from 'axios';
import parse from "html-react-parser";

type StaticPageData = {
    [x: string]: any;
    content?: string;
    video?: string;
    points?: string[];
    scalar?: string;
};

const AboutUs: React.FC = () => {
    const [about, setAbout] = useState<StaticPageData>({});
    const [vision, setVision] = useState<StaticPageData>({});
    const [message, setMessage] = useState<StaticPageData>({});
    const [objects, setObjects] = useState<StaticPageData>({});
    const [trackTitle, setTrackTitle] = useState<StaticPageData>({});
    const [mission, setMission] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const fetchData = async (endpoint: string, setter: (data: StaticPageData) => void) => {
        try {
            const response = await axios.get<StaticPageData>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/static-pages/${endpoint}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setter(response.data);
        } catch (error) {
            console.error(`Error fetching ${endpoint} data:`, error);
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            await Promise.all([
                fetchData('about-center', setAbout),
                fetchData('vision', setVision),
                fetchData('message', setMessage),
                fetchData('general-objectives', setObjects),
                fetchData('tracks-center-areas', setTrackTitle),
                fetchData('center-mechanism', (data) => setMission(data.data.points || [])),
            ]);

            setLoading(false);
        };
        fetchAllData();
    }, []);


    const handlePlay = () => {
        setIsPlaying(true);
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }


    const fetchMission = mission.map((point: any) => (
        <div
            key={point.index}
            className="border-dashed border-2 rounded-[6px] w-full bg-customGray mx-auto h-[140px] flex items-center justify-center font-bold px-3 md:px-6 lg:px-10 xl:px-16"
        >
            {point.title}
        </div>
    ));

    return (
        <div>
            <Banners src={aboutImg} textPath={"عن المركز"} />
            <div className="mt-20" style={{ direction: "rtl" }}>
                <section className='container mx-auto aboutText'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 w-[95%] lg:w-[80%] mx-auto'>
                        <div className='w-[95%] md:w-[80%] mx-auto'>
                            <h2 className='text-base md:text-2xl font-bold mainColor border-b-2 border-customGold w-[fit-content] pb-[4px]'>عن المركز</h2>
                            <p className='leading-[1.9] mt-[20px] pr-3 lg:pr-[40px]'>
                                {about.data.content}
                            </p>
                        </div>
                        <div className="relative w-full max-w-lg mx-auto bg-black">
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
                                        <button onClick={handlePlay} className="absolute right-1 md:-right-[30px] text-white text-4xl border-[10px] border-[solid] border-[#fff] rounded-[35px] pt-[3px] pr-[12px] pb-px pl-[14px] bg-[#947e51] text-[24px] [box-shadow:1px_1px_10px_#333]">
                                            <FontAwesomeIcon icon={faPlay} />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* YouTube Video */}
                            {isPlaying && (
                                <iframe
                                    className="w-full aspect-video"
                                    src={`https://www.youtube.com/embed/${about.data.video}?autoplay=1`} // Replace `your-video-id` with the actual YouTube video ID
                                    title="YouTube video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    </div>
                </section>
                {/*  */}
                <section className='mission mt-16'>
                    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 w-[95%] xl:w-[80%] mx-auto'>
                        <div className="w-[95%] relative h-full m-auto">
                            <div className=' absolute h-[60px] w-[120px] right-[30px] -top-[20px]'>
                                <span className='absolute font-bold text-[#fff] text-[18px] right-[34px] top-[15px]'>الرؤية</span>
                                <Image className='-z-10' src={title} fill alt='title' />
                            </div>
                            <p className='mt-[10px] pt-[60px] px-[10px] md:px-[30px] pb-[30px] mx-auto leading-[2.1] border-[1px] border-[solid] border-customGold rounded-[10px]'>
                                {vision.data.content}
                            </p>
                        </div>

                        <div className="w-[95%] relative h-full m-auto mt-8 lg:mt-0">
                            <div className=' absolute h-[60px] w-[120px] right-[30px] -top-[20px]'>
                                <span className='absolute font-bold text-[#fff] text-[18px] right-[31px] top-[15px]'>الرسالة</span>
                                <Image className='-z-10' src={title} fill alt='title' />
                            </div>
                            <p className='mt-[10px] pt-[60px] px-[10px] md:px-[30px] pb-[30px] mx-auto leading-[2.1] border-[1px] border-[solid] border-customGold rounded-[10px]'>
                                {message.data.content}
                            </p>
                        </div>
                    </div>
                </section>
                {/*  */}

                <section className='ourTarget mt-14'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10 w-[95%] xl:w-[80%] mx-auto items-center'>
                        <div className='relative bkPrimaryColor p-5 [box-shadow:1px_1px_7px_#424c61] h-auto'>
                            <Image src={target} className='rounded-tl-[35px] rounded-br-[35px] rounded-tr-none rounded-bl-none border-[1px] border-[solid] border-[#fff] p-[10px]' alt='target' />
                        </div>
                        <div className='mt-3 lg:mt-0 col-span-2 bkColor rounded-[6px] px-[15px] lg:px-[40px] py-[20px]'>
                            <h3 className='text-base md:text-l font-bold mainColor border-b-2 border-customGold w-[fit-content] pb-[4px]'>الاهداف العامة</h3>
                            <p className=''>
                                {parse(objects.data.scalar)}
                            </p>
                        </div>
                    </div>
                </section>
                {/*  */}
                <section className='container mx-auto w-[95%] py-10 my-10 lg:my-20 relative h-full'>
                    <Image className='-z-10 px-5' src={earth} fill alt='earth' />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 w-[95%] xl:w-[80%] mx-auto items-center'>
                        <div className='mb-8 lg:mb-0'>
                            <h4 className='text-base md:text-l font-bold mainColor border-b-2 border-customGold w-[fit-content] pb-[4px]'>
                                مسارات ومجالات المركز
                            </h4>
                            <p className='leading-[1.9] mt-[20px] pr-3 lg:pr-[20px]'>
                                {trackTitle.data.content}
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
                            {fetchMission}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default AboutUs





{/*  */ }
{/* <section className='managements mb-10 mt-4'>
                    <h6 className="text-base mx-auto mb-10 md:text-2xl font-bold mainColor border-b-2 border-customGold w-[fit-content] pb-[4px]">اعضاء مجلس الادارة</h6>
                    <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-10 w-[95%] lg:w-[80%] text-center items-center'>

                        <div className='bg-customGold w-[80%] mx-auto md:w-full  rounded-tl-[18px] rounded-br-[18px] rounded-tr-none rounded-bl-none [box-shadow:1px_1px_7px_#424c61]'>
                            <div className='flex justify-center'>
                                <Image className='border-[1px] border-[solid] border-[#fff] p-[10px] rounded-tl-[10px] rounded-br-[10px] rounded-tr-none rounded-bl-none mt-[20px] [box-shadow:2px_2px_1px_#424c61]' src={man1} alt='' />
                            </div>
                            <div className='mb-6'>
                                <h4 className='text-white font-bold mt-3'>د حمد الهاجرى</h4>
                                <p className='text-white mt-3'>رئيس مجلس الادارة</p>
                            </div>
                        </div>

                        <div className='bg-customGold w-[80%] mx-auto md:w-full  rounded-tl-[18px] rounded-br-[18px] rounded-tr-none rounded-bl-none [box-shadow:1px_1px_7px_#424c61]'>
                            <div className='flex justify-center'>
                                <Image className='border-[1px] border-[solid] border-[#fff] p-[10px] rounded-tl-[10px] rounded-br-[10px] rounded-tr-none rounded-bl-none mt-[20px] [box-shadow:2px_2px_1px_#424c61]' src={man1} alt='' />
                            </div>
                            <div className='mb-6'>
                                <h4 className='text-white font-bold mt-3'>د حمد الهاجرى</h4>
                                <p className='text-white mt-3'>رئيس مجلس الادارة</p>
                            </div>
                        </div>

                        <div className='bg-customGold w-[80%] mx-auto md:w-full  rounded-tl-[18px] rounded-br-[18px] rounded-tr-none rounded-bl-none [box-shadow:1px_1px_7px_#424c61]'>
                            <div className='flex justify-center'>
                                <Image className='border-[1px] border-[solid] border-[#fff] p-[10px] rounded-tl-[10px] rounded-br-[10px] rounded-tr-none rounded-bl-none mt-[20px] [box-shadow:2px_2px_1px_#424c61]' src={man1} alt='' />
                            </div>
                            <div className='mb-6'>
                                <h4 className='text-white font-bold mt-3'>د حمد الهاجرى</h4>
                                <p className='text-white mt-3'>رئيس مجلس الادارة</p>
                            </div>
                        </div>

                        <div className='bg-customGold w-[80%] mx-auto md:w-full  rounded-tl-[18px] rounded-br-[18px] rounded-tr-none rounded-bl-none [box-shadow:1px_1px_7px_#424c61]'>
                            <div className='flex justify-center'>
                                <Image className='border-[1px] border-[solid] border-[#fff] p-[10px] rounded-tl-[10px] rounded-br-[10px] rounded-tr-none rounded-bl-none mt-[20px] [box-shadow:2px_2px_1px_#424c61]' src={man1} alt='' />
                            </div>
                            <div className='mb-6'>
                                <h4 className='text-white font-bold mt-3'>د حمد الهاجرى</h4>
                                <p className='text-white mt-3'>رئيس مجلس الادارة</p>
                            </div>
                        </div>

                        <div className='bg-customGold w-[80%] mx-auto md:w-full  rounded-tl-[18px] rounded-br-[18px] rounded-tr-none rounded-bl-none [box-shadow:1px_1px_7px_#424c61]'>
                            <div className='flex justify-center'>
                                <Image className='border-[1px] border-[solid] border-[#fff] p-[10px] rounded-tl-[10px] rounded-br-[10px] rounded-tr-none rounded-bl-none mt-[20px] [box-shadow:2px_2px_1px_#424c61]' src={man1} alt='' />
                            </div>
                            <div className='mb-6'>
                                <h4 className='text-white font-bold mt-3'>د حمد الهاجرى</h4>
                                <p className='text-white mt-3'>رئيس مجلس الادارة</p>
                            </div>
                        </div>


                    </div>
                </section> */}