"use client"
import { useEffect, useState } from "react";
import AllChannelsBox from "./AllChannelsBox"
import LangUseParams from "../translate/LangUseParams";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
interface LiveTelegram {
    scalar: string;

}

const Telegram = () => {
    const [telegramLiveDetails, setTelegramLiveDetails] = useState<LiveTelegram | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const lang = LangUseParams();


    useEffect(() => {

        const fetchTelegramLive = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/live/telegram-live`,
                    {
                        params: { lang },
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,

                        },
                    }
                );
                setTelegramLiveDetails(response.data.data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTelegramLive();


    }, [lang]);


    if (loading) {
        return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!telegramLiveDetails) {
        return <div className="text-center mainColor font-bold">لا يوجد بث مباشر على قناة تليجرام الان اعد المحاولة قريبا</div>

    }  
    return (
        <section className="container my-8 mx-auto w-[95%] lg:w-[80%]"
            style={{ direction: "rtl" }}>
            <div className="grid grid-cols-3 gap-4 items-center">
                <div className="mx-auto col-span-3 md:col-span-1 w-[95%] md:w-[80%]">
                    <AllChannelsBox />
                </div>
                <div className="mx-auto col-span-3 md:col-span-2 w-[95%] md:w-[80%]">
                    {telegramLiveDetails.scalar
                        ?
                        <Link href={`${telegramLiveDetails.scalar}`}
                            className=" mainColor font-bold">
                            <FontAwesomeIcon className='text-[#37AEE2] text-8xl'
                                icon={faTelegram} />
                            <p className="mt-5">
                                مشاهدة البث المباشر عبر قناة التليجرام
                            </p>
                        </Link>
                        :
                        <div className="text-center mainColor font-bold">لا يوجد بث مباشر على قناة تليجرام الان اعد المحاولة قريبا</div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Telegram