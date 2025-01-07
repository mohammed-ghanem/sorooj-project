"use client"
import { useEffect, useState } from "react";
import LangUseParams from "../translate/LangUseParams";
import TranslateHook from "../translate/TranslateHook";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface audioDetails {
    name: string;
    image?: any;
    description: string;
    publish_date: string;
    author_name: string;
    view_count: number;
    videos: any
    video_url: any
}
interface CategoryDetails {
    name: string
}
const AudioLibraryContent = () => {
    const [audioDetails, setAudioDetails] = useState<audioDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categoryDetails, setCategoryDetails] = useState<CategoryDetails | null>(null);

    // lang param (ar Or en)
    const lang = LangUseParams();
    const translate = TranslateHook();
    const { slug } = useParams();

    useEffect(() => {

        //console.log("fetch time")
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/audios/${slug}`,
                    {
                        params: { lang },
                        headers: {
                            "Content-Type": "application/json",
                            withCredentials: true,

                        },
                    }
                );
                setAudioDetails(response.data.data.Audio);
                setCategoryDetails(response.data.data.Audio.category);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();

    }, [lang, slug]);


    if (loading) {
        return <div className="text-center"><FontAwesomeIcon className="mainColor text-2xl my-4" icon={faSpinner} spin /></div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!audioDetails) {
        return <div>No audio details found.</div>
    }


    return (
        <div>
            <h1>{audioDetails.name}</h1>
            <div>
                <span>{`المكتبة الصوتية --  ${categoryDetails ? categoryDetails.name : "No Category"} `}</span>

            </div>
        </div>
    )
}

export default AudioLibraryContent