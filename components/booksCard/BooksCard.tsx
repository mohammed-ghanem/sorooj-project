import { faBookOpen, faBookOpenReader, faCalendar, faEye, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from "next/image"
import Link from 'next/link';
import { useState } from "react";
import { Spin } from "antd";
import { useRouter } from "next/navigation";

interface BooksCardProps {
    imgSrc: any;
    bookTitle: string;
    watchNumber: string;
    datePublish: string;
    doctorName: string;
    descriptionBook: string;
    likeBtn?: any;
    pathLinkToContent: any;
}


const BooksCard: React.FC<BooksCardProps> = ({
    pathLinkToContent, imgSrc, bookTitle, watchNumber, datePublish, doctorName, descriptionBook, likeBtn
}) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Prevent default navigation to handle loading manually
        setLoading(true);
        router.push(pathLinkToContent);
    };


    const slicedTitle = bookTitle.length > 38 ? bookTitle.slice(0, 38) + '...' : bookTitle;
    const slicedDes = descriptionBook.length > 30 ? descriptionBook.slice(0, 30) + '...' : descriptionBook;
    return (
        <>

            {/* Fullscreen Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Spin size="large" className="custom_spinner" />
                </div>
            )}
            {/* book Card */}
            <div className='bkPrimaryColor [box-shadow:1px_1px_7px_#ddd] p-[10px] rounded-tl-[15px] rounded-br-[15px] rounded-tr-none rounded-bl-none'>
                <div className='bg-white rounded-tl-[15px] rounded-br-[15px] rounded-tr-none rounded-bl-none border-[1px] border-[solid] border-[#fff]
                    rounded-[6px]'>
                    <div className='relative'>
                        <div className='pt-[12px] px-[14px] pb-[4px]'>
                            <h2 className="text-sm font-bold">
                                <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
                                <span className="mainColor">{slicedTitle}</span>
                            </h2>
                        </div>
                        <div className=" block md:flex h-auto p-2 ">
                            <div className="flex-auto w-full h-[120px] md:h-auto md:w-60 relative rounded-tl-none rounded-br-[0px] md:rounded-br-[10px] md:rounded-tr-none rounded-bl-none overflow-hidden">
                                <Image src={imgSrc} className=" max-w-full" fill alt="book" />
                            </div>

                            <div className="flex-auto rounded-tl-[0px] md:rounded-tl-[10px] rounded-br-[0] rounded-tr-[0] rounded-bl-[0] bg-white w-full md:w-96 px-[10px] py-[10px] my-[0px] md:my-auto">
                                <div className="cardDetails grid grid-cols-2 gap-2 mt-2 font-bold">
                                    <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
                                        <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
                                        <span>{watchNumber} مشاهدة</span>
                                    </p>
                                    <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
                                        <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
                                        <span>{datePublish}</span>
                                    </p>
                                </div>
                                <h3 className="my-2">
                                    <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
                                    <span className="text-[12px] mainColor">{doctorName}</span>
                                </h3>
                                <p className="text-[12px] mainColor flex items-start">
                                    <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor pt-1" />
                                    <span className=" opacity-[0.8]">{slicedDes}</span>
                                </p>
                                <Link
                                    href={pathLinkToContent} onClick={handleClick}
                                    className='mr-auto mt-2 block w-[fit-content] px-[10px] py-[6px] rounded-[4px] bkMainColor text-[#fff] font-bold text-[14px]'>
                                    المزيد
                                </Link>
                            </div>
                            {likeBtn
                                &&
                                <span className=" absolute left-[14px] top-[7px] z-30 bg-[#fff] pt-[8px] px-[8px] pb-[6px] rounded-[30px]">
                                    {likeBtn}
                                </span>
                            }
                        </div>
                    </div>
                </div>


            </div>

        </>

    )
}

export default BooksCard