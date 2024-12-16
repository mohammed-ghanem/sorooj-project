'use client'
import { useEffect, useState } from "react";
import comming from "@/public/assets/images/comming.png";
import Image from "next/image";
import Timer from "./Timer";
import flower from "@/public/assets/images/flower.svg";
import fatwaFlower from "@/public/assets/images/fatwa.svg";
import { Carousel, ConfigProvider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock, faLocationDot, faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import logo from "@/public/assets/images/loadingImg.svg"
import "./style.css"


interface Event {
    id: number;
    title: string;
    image: string;
    country_time: string;
    main_title: string;
    event_title: string;
    instructor: string;
    day: string;
    event_date: string;
    time: string;
    location: string;

}

const CommingEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/upcoming-events?event_date=true`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,
                        },
                    }
                );
                setEvents(res.data.data || []); // Assuming API response has a "events" field
                setLoading(false);

                console.log(res.data.data)
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
                    <div className="bg-white right-0 lg:right-[130px] relative z-10 opacity-80 p-8 w-[95%] lg:w-auto rounded-[8px] [box-shadow:1px_1px_10px_#ddd]">
                        <div>
                            <Image className="m-auto" src={logo} width={150} height={150} alt="eventLogo" />
                        </div>
                        <p className="bkMainColor text-white my-5 py-2 px-4 w-[fit-content] m-auto rounded-[6px] font-bold">انتظرونا فى احداث قادمة قريبا</p>
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
                    arrows={events.length > 1} // Show arrows only if more than one event
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
                                <div className="w-[95%] lg:w-auto">
                                    <div className="bg-white block text-white text-center relative right-0 lg:right-[130px]  rounded-[10px] p-[15px] opacity-80">
                                        <div>
                                            <Image className="m-auto" src={logo} width={150} height={150} alt="eventLogo" />
                                        </div>
                                        <div>
                                            <h2 className="mainColor my-4 font-bold">
                                                {event.main_title}
                                            </h2>
                                            <p className="bkMainColor text-white w-[fit-content] m-auto rounded-[3px] p-[8px] font-bold">
                                                {event.event_title}
                                            </p>
                                            <p className="mainColor my-4 font-bold">فضيلة الشيخ الدكتور </p>
                                            <h4 className="bkPrimaryColor font-bold px-4 py-3 text-white w-[fit-content] m-auto rounded-[4px]">
                                                {event.instructor}
                                            </h4>
                                        </div>
                                        <div className="text-right w-1/2 m-auto">
                                            <div className="mt-3">
                                                <FontAwesomeIcon className="primaryColor ml-2" icon={faCalendarDays} />
                                                <span className="mainColor">{event.day}</span>
                                                <span className="mainColor mr-2">{event.event_date}</span>
                                            </div>
                                            <div className="my-2">
                                                <FontAwesomeIcon className="primaryColor ml-2 text-sm" icon={faClock} />
                                                <span className="mainColor">الساعة</span>
                                                <span className="mainColor mr-2">{event.time}</span>
                                                <span className="mainColor mr-2">{event.country_time}</span>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon className="primaryColor ml-2 text-lg" icon={faLocationDot} />
                                                <span className="mainColor">{event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative py-6 lg:py-12">
                                    <Image
                                        src={event.image}
                                        className="w-[95%] lg:w-[80%] mx-auto h-auto lg:h-[400px] [box-shadow:1px_1px_10px_#ddd] rounded-[10px]"
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