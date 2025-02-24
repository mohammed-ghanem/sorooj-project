import Image from "next/image"
import { faEye, faCalendar, faBookOpenReader, faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface BlogCardProps {
    imgSrc: any;
    watchNumber: string;
    datePublish: string;
    blogTitle: string;
    doctorName?: any;
    descriptionBlog: string;
    likeBtn?: any;
    pathLinkToContent: any;

}

const BlogCardBox: React.FC<BlogCardProps> = ({ imgSrc, watchNumber, datePublish, blogTitle, doctorName, descriptionBlog, likeBtn, pathLinkToContent }) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Prevent default navigation to handle loading manually
        setLoading(true);
        router.push(pathLinkToContent);
    };

    const slicedDescription = descriptionBlog.length > 40 ? descriptionBlog.slice(0, 40) + '...' : descriptionBlog;
    return (

        <>
            {/* Fullscreen Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Spin size="large" className="custom_spinner" />
                </div>
            )}
            {/* Blog Card */}
            <div className=" bkColor rounded-[15px] overflow-hidden relative">
                <div className="h-full">
                    <Image className="w-full max-w-full h-52" src={imgSrc} alt={blogTitle}
                        height={200} width={100} />
                    <div className="px-3">
                        <div className="cardDetails grid grid-cols-2 gap-2 mt-3 font-bold">
                            <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
                                <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
                                <span>{watchNumber}</span>
                            </p>
                            <p className="text-[10px] mainColor opacity-[0.8] flex items-center justify-center">
                                <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
                                <span>{datePublish}</span>
                            </p>
                        </div>
                        <h2 className="mt-2">
                            <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
                            <span className="font-bold mainColor text-sm">{blogTitle}</span>
                        </h2>
                        <p className="text-[12px] mainColor flex items-center mt-2">
                            <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor" />
                            <span className=" opacity-[0.8]">{slicedDescription}</span>
                        </p>

                        {likeBtn
                            &&
                            <span className=" absolute left-[20px] top-[20px] bg-[#fff] pt-[6px] px-[10px] pb-[4px] rounded-[30px]">
                                {likeBtn}
                            </span>
                        }
                    </div>
                    <Link href={pathLinkToContent} onClick={handleClick}
                        className="block text-center bkPrimaryColor py-3 mt-[16px] text-white font-bold">
                        عرض
                    </Link>
                </div>
            </div>
        </>

    )
}

export default BlogCardBox