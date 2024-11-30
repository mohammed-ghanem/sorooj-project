import { faBookOpen, faBookOpenReader, faCalendar, faEye, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from "next/image"
import Link from 'next/link';

interface BooksCardProps {
    imgSrc: any;
    bookTitle: string;
    watchNumber: string;
    datePublish: string;
    doctorName: string;
    descriptionCourse: string;
    likeBtn?: any;
    pathLinkToContent: any;
}


const BooksCard: React.FC<BooksCardProps> = ({
    pathLinkToContent, imgSrc, bookTitle, watchNumber, datePublish, doctorName, descriptionCourse, likeBtn
}) => {
    return (
        <div className='bkPrimaryColor [box-shadow:1px_1px_7px_#424c61] p-[10px] rounded-tl-[15px] rounded-br-[15px] rounded-tr-none rounded-bl-none'>
            <div className='bg-white rounded-tl-[15px] rounded-br-[15px] rounded-tr-none rounded-bl-none border-[1px] border-[solid] border-[#fff]
                    rounded-[6px]'>
                <Link href={pathLinkToContent}>
                    <div className='pt-[12px] px-[14px] pb-[4px]'>
                        <h2 className="text-sm font-bold">
                            <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
                            <span className="mainColor">{`${bookTitle.slice(0, 50)} ...`}</span>
                        </h2>
                    </div>
                    <div className=" block md:flex
                    h-auto
                    p-2
                    ">

                        <div className="flex-auto w-full h-[120px] md:h-auto md:w-56 relative rounded-tl-none rounded-br-[0px] md:rounded-br-[10px] md:rounded-tr-none rounded-bl-none overflow-hidden">
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
                                <span className=" opacity-[0.8]">{`${descriptionCourse.slice(0, 32)} ...`}</span>
                            </p>
                        </div>

                    </div>
                </Link>
            </div>


        </div>
    )
}

export default BooksCard