'use client'
import { useEffect, useState } from "react";
import comming from "@/public/assets/images/comming.png";
import Image from "next/image";
import Timer from "./Timer";
import flower from "@/public/assets/images/flower.svg";
import fatwaFlower from "@/public/assets/images/fatwa.svg";
import { Carousel, ConfigProvider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


interface Event {
    id: number;
    title: string;
    description: string;
    start: string;
    end: string;
    image: string;
}

const CommingEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/upcoming-events?end=true`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,
                        },
                    }
                );
                setEvents(res.data.data || []); // Assuming API response has a "events" field
                setLoading(false);
            } catch (error) {
                console.error("Error fetching events:", error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div className="text-center"><FontAwesomeIcon className="mainColor" icon={faSpinner} spin /></div>;
    }
    if (!events.length) {
        return <div className="text-center my-20">
            <div className=' container mx-auto bkBox my-20 w-[80%]  [box-shadow:1px_1px_7px_#ddd] rounded-[10px]'>
                <div className='relative overflow-hidden grid grid-cols-2 gap-4 items-center'>
                    <div className="">
                        <div className="bkMainColor text-white text-center relative right-[130px] rounded-[10px] p-[60px] opacity-80 z-10">
                            <h2 className="font-bold text-2xl">انتظرونا قريبا فى احداث قادمة</h2>
                        </div>
                    </div>
                    <div className='relative py-12'>
                        <Image src={comming} className='w-[80%] mx-auto h-[350px] [box-shadow:1px_1px_10px_#424C61] rounded-[10px]' alt='target' />
                    </div>

                    <div className="absolute right-0 bottom-0">
                        <Image src={fatwaFlower} alt="flower" />
                    </div>
                    <div className=' absolute w-[320px] md:w-[424px] h-[300px] -top-[99px] right-[0px]'>
                        <Image src={flower} fill alt='flowersvg' />
                    </div>
                </div>
            </div >
        </div>;
    }
    return (
        <section className="my-24">
            <ConfigProvider
                theme={{
                    components: {
                        Carousel: {
                            arrowSize: 36,
                        },
                    },
                }}
            >
                <Carousel
                    arrows
                    infinite
                    autoplaySpeed={7000}
                    autoplay
                    fade
                    dots={false}
                    className="content: none container mx-auto bkBox my-44 w-[95%] md:w-[80%]  [box-shadow:1px_1px_7px_#ddd] rounded-[10px]"
                >
                    {events.map((event) => (
                        <div key={event.id} className="h-auto">
                            <div
                                style={{ direction: "rtl" }}
                                className="pb-10 lg:pb-0 font-cairo relative overflow-hidden flex flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-2 gap-4 items-center"
                            >
                                <div>
                                    <div className="bkMainColor text-white text-center relative right-0 lg:right-[130px] rounded-[10px] p-5 lg:p-14 opacity-80 z-10">
                                        <h2 className="font-bold text-xl">{event.title}</h2>
                                        <Timer targetDate={event.end} />
                                        <div className="mt-3">
                                            <p>{event.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative py-6 lg:py-12">
                                    <Image
                                        //   src={event.image || comming}
                                        src={comming}
                                        className="w-[95%] lg:w-[80%] mx-auto h-auto lg:h-[400px] [box-shadow:1px_1px_10px_#424C61] rounded-[10px]"
                                        alt={event.title}
                                        width={400}
                                        height={400}
                                    />
                                </div>
                                <div className="absolute right-0 bottom-0">
                                    <Image src={fatwaFlower} alt="flower" />
                                </div>
                                <div className="absolute w-[320px] md:w-[424px] h-[300px] -top-[99px] right-[0px]">
                                    <Image src={flower} fill alt="flowersvg" />
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </ConfigProvider>
        </section>
    );
};

export default CommingEvents;






// import comming from "@/public/assets/images/comming.png"
// import Image from 'next/image';
// import Timer from "./Timer";
// import flower from '@/public/assets/images/flower.svg';
// import fatwaFlower from '@/public/assets/images/fatwa.svg'
// import { Carousel, ConfigProvider } from 'antd';

// const CommingEvents: React.FC = () => {

//     // test time fetch data
//     const targetDate = "2024-12-31T23:59:59Z"

//     return (
//         <section className="my-24">
//             <ConfigProvider
//                 theme={{
//                     components: {
//                         Carousel: {
//                             arrowSize: 36,
//                         },
//                     },
//                 }}
//             >
//                 <Carousel
//                     arrows
//                      infinite={true}
//                     autoplaySpeed={10000}
//                     autoplay={true}
//                     fade
//                     dots={false}
//                     className="content: none container mx-auto bkBox my-44 w-[95%] md:w-[80%]  [box-shadow:1px_1px_7px_#ddd] rounded-[10px]"
//                 >
//                     {/* fetch data from here */}
//                     <div className="h-auto">
//                         <div style={{ direction: "rtl" }} className='pb-10 lg:pb-0 font-cairo relative overflow-hidden flex flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-2 gap-4 items-center'>
//                             <div className="">
//                                 <div className="bkMainColor text-white text-center relative right-0 lg:right-[130px] rounded-[10px] p-5 lg:p-14 opacity-80 z-10">
//                                     <h2 className="font-bold text-xl">انطلاق البرنامج التدريبي “ محطات في العقيده “</h2>
//                                     <Timer targetDate={targetDate} />
//                                     <div className="mt-3">
//                                         <p>المحور الأول: مفهوم الإيمان بالله (٥ حلقات) يلقيه د. محمد هشام طاهري </p>
//                                         <p>المحور الثاني: مفهوم التوحيد (٥حلقات) يلقيها: الشيخ بندر بن محمد الميموني</p>
//                                     </div>

//                                 </div>
//                             </div>
//                             <div className='relative py-6 lg:py-12'>
//                                 <Image src={comming} className='w-[95%] lg:w-[80%] mx-auto h-auto lg:h-[400px] [box-shadow:1px_1px_10px_#424C61] rounded-[10px]' alt='target' />
//                             </div>

//                             <div className="absolute right-0 bottom-0">
//                                 <Image src={fatwaFlower} alt="flower" />
//                             </div>
//                             <div className=' absolute w-[320px] md:w-[424px] h-[300px] -top-[99px] right-[0px]'>
//                                 <Image src={flower} fill alt='flowersvg' />
//                             </div>
//                         </div>
//                     </div>


//                     <div className="h-auto">
//                         <div style={{ direction: "rtl" }} className='pb-10 lg:pb-0 font-cairo relative overflow-hidden flex flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-2 gap-4 items-center'>
//                             <div className="">
//                                 <div className="bkMainColor text-white text-center relative right-0 lg:right-[130px] rounded-[10px] p-5 lg:p-14 opacity-80 z-10">
//                                     <h2 className="font-bold text-xl">انطلاق البرنامج التدريبي “ محطات في العقيده “</h2>
//                                     <Timer targetDate={targetDate} />
//                                     <div className="mt-3">
//                                         <p>المحور الأول: مفهوم الإيمان بالله (٥ حلقات) يلقيه د. محمد هشام طاهري </p>
//                                         <p>المحور الثاني: مفهوم التوحيد (٥حلقات) يلقيها: الشيخ بندر بن محمد الميموني</p>
//                                     </div>

//                                 </div>
//                             </div>
//                             <div className='relative py-6 lg:py-12'>
//                                 <Image src={comming} className='w-[95%] lg:w-[80%] mx-auto h-auto lg:h-[400px] [box-shadow:1px_1px_10px_#424C61] rounded-[10px]' alt='target' />
//                             </div>

//                             <div className="absolute right-0 bottom-0">
//                                 <Image src={fatwaFlower} alt="flower" />
//                             </div>
//                             <div className=' absolute w-[320px] md:w-[424px] h-[300px] -top-[99px] right-[0px]'>
//                                 <Image src={flower} fill alt='flowersvg' />
//                             </div>
//                         </div>
//                     </div>


//                 </Carousel>
//             </ConfigProvider>

//         </section>
//     )
// }

// export default CommingEvents





{/* <div className=' container mx-auto bkBox my-44 w-[80%]  [box-shadow:1px_1px_7px_#ddd] rounded-[10px]'>
                    <div className='relative overflow-hidden grid grid-cols-2 gap-4 items-center'>
                        <div className="">
                            <div className="bkMainColor text-white text-center relative right-[130px] rounded-[10px] p-[60px] opacity-80 z-10">
                                <h2 className="font-bold text-2xl">انطلاق البرنامج التدريبي “ محطات في العقيده “</h2>
                                <Timer targetDate={targetDate} />
                                <div className="mt-3">
                                    <p>المحور الأول: مفهوم الإيمان بالله (٥ حلقات) يلقيه د. محمد هشام طاهري </p>
                                    <p>المحور الثاني: مفهوم التوحيد (٥حلقات) يلقيها: الشيخ بندر بن محمد الميموني</p>
                                </div>

                            </div>
                        </div>
                        <div className='relative py-12'>
                            <Image src={comming} className='w-[80%] mx-auto h-[350px] [box-shadow:1px_1px_10px_#424C61] rounded-[10px]' alt='target' />
                        </div>
                        
                        <div className="absolute right-0 bottom-0">
                            <Image src={fatwaFlower} alt="flower" />
                        </div>
                        <div className=' absolute w-[320px] md:w-[424px] h-[300px] -top-[99px] right-[0px]'>
                            <Image src={flower} fill alt='flowersvg' />
                        </div>
                    </div>
                </div > */}