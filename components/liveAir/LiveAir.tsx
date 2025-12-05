"use client"
import { useEffect, useState } from "react";
import AllChannelsBox from "./AllChannelsBox"
import LangUseParams from "../translate/LangUseParams";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
interface LiveYoutube {
    scalar: string;

}
const LiveAir = () => {
    const [youTubeLiveDetails, setYouTubeLiveDetails] = useState<LiveYoutube | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const lang = LangUseParams();


    useEffect(() => {

        const fetchYoutubeLive = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/live/youtube-live`,
                    {
                        params: { lang },
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,

                        },
                    }
                );
                setYouTubeLiveDetails(response.data.data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchYoutubeLive();


    }, [lang]);


    if (loading) {
        return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <section className="container my-8 mx-auto w-[95%] lg:w-[80%] "
            style={{ direction: "rtl" }}> 
            <div className="grid grid-cols-3 gap-4 items-center">
                <div className="mx-auto col-span-3 md:col-span-1 w-[95%] lg:w-[80%]">
                    <AllChannelsBox />
                </div>
                <div className="mx-auto col-span-3 md:col-span-2 w-[95%] lg:w-[80%]">
                    {youTubeLiveDetails
                        ?
                        <iframe className='w-full h-96'
                            src={`https://www.youtube.com/embed/${youTubeLiveDetails}?enablejsapi=1`}
                            title="answerVideo"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            loading="lazy"
                            
                        />
                        :
                        <div className="mainColor text-center font-bold">لا يوجد بث مباشر على قناة اليوتيوب الان اعد المحاولة قريبا</div>
                    }
                </div>
            </div>
        </section>
    )
}

export default LiveAir