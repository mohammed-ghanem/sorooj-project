"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banners from "../banners/Banners"
import defImage from "@/public/assets/images/default.webp"; // Default image
import NewFatwaBtn from "./NewFatwaBtn";
import { faCircleQuestion, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LangUseParams from "../translate/LangUseParams";
import { useParams } from "next/navigation";
import axios from "axios";
import parse from "html-react-parser";



interface AnswerDetails {
    answer_content: string;
    audio_file: any;
    youtube_link: string;
    fatwa_question: any;
    question: string;

}
const QustionContentPage = () => {
    const [answerDetails, setAnswerDetails] = useState<AnswerDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const lang = LangUseParams();
    const { slug } = useParams(); 

    useEffect(() => {

        const fetchAnswer = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/fatwa/${slug}`,
                    {
                        params: { lang },
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,

                        },
                    }
                );
                setAnswerDetails(response.data.data.FatwaAnswer);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAnswer();


    }, [lang, slug]);


    if (loading) {
        return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!answerDetails) {
        return <div>No answer content details found.</div>
    }


    return (
        <div>
            <div>
                <Banners src={defImage} parentTitle={`سؤال وجواب`} textPath="الاجابة" />
            </div>
            <div className="answersContent container w-[95%] md:w-[80%] mx-auto my-16 grid grid-cols-12 gap-10"
             style={{ direction: "rtl" }}>
                <div className="col-span-12 lg:col-span-8">
                    <div className="askSection">
                        <h1 className="font-bold text-sm text-white bkPrimaryColor p-[14px] rounded-[8px] w-fit">السؤال</h1>
                        <p className="p-4 mainColor">
                            {answerDetails.fatwa_question.question}
                        </p>
                    </div>
                    <div className="answerSection">
                        <h2 className="font-bold text-sm text-white bkPrimaryColor p-[14px] rounded-[8px] w-fit">الاجابة</h2>
                        <p className="p-4 mainColor leading-[2.1]">
                            {answerDetails.answer_content ? parse(answerDetails.answer_content) : ""}
                        </p>

                        {answerDetails.audio_file
                            ?
                            <audio controls className="w-[80%] md:w-full">
                                <source src={answerDetails.audio_file} type="audio/mpeg" />
                            </audio>
                            : ""
                        }

                        {answerDetails.youtube_link
                            ?
                            <iframe className='w-full h-80'
                                src={`https://www.youtube.com/embed/${answerDetails.youtube_link}?enablejsapi=1`}
                                title="answerVideo"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                                allowFullScreen
                            />
                            :
                            ""
                        }

                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <div className="bkBox p-[14px] rounded-[8px] mt-5">
                        <div className="flex items-center">
                            <FontAwesomeIcon className="primaryColor ml-2 text-2xl" icon={faCircleQuestion} />
                            <h2 className="mainColor font-bold">هل لديك اسئلة اخرى ! </h2>
                        </div>
                        <p className="mainColor p-4">
                            اذا كانت لديك استفسارات اضافية فلا تتردد فى طرحها وسنقوم بالرد عليك فى اقرب وقت ممكن
                        </p>
                        <div className="text-end">
                            <NewFatwaBtn />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QustionContentPage