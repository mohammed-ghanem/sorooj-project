import Image from "next/image"
import { faEye, faCalendar, faBookOpenReader, faUser, faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

interface CoursesCardProps {
    imgSrc: any;
    watchNumber: string;
    datePublish: string;
    courseTitle: string;
    doctorName: string;
    descriptionCourse: string;
    likeBtn?: any;
    pathLinkToContent: any;

}

const CoursesCard: React.FC<CoursesCardProps> = ({ imgSrc, watchNumber, datePublish, courseTitle, doctorName, descriptionCourse, likeBtn, pathLinkToContent }) => {
    const slicedTitle = courseTitle.length > 40 ? courseTitle.slice(0, 35) + '...' : courseTitle;
    return (
        // courses card
        <div className=" bkColor rounded-[15px] overflow-hidden relative">
            <div className="newCourses h-full">
                <Image className="w-full" src={imgSrc} alt="test" height={100} width={100} />
                <div className="px-3">
                    <div className="cardDetails grid grid-cols-2 gap-2 mt-3 font-bold">
                        <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
                            <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
                            <span>{watchNumber}</span>
                        </p>
                        <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
                            <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
                            <span>{datePublish}</span>
                        </p>
                    </div>
                    <h2 className="mt-2">
                        <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
                        <span className="font-bold mainColor text-sm">{slicedTitle}</span>
                    </h2>
                    <h3 className="mt-1">
                        <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
                        <span className="text-[12px] mainColor">{doctorName}</span>
                    </h3>
                    <p className="text-[12px] mainColor flex items-center mt-2">
                        <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor" />
                        <span className=" opacity-[0.8]">{descriptionCourse}</span>
                    </p>

                    {likeBtn
                        &&
                        <button className=" absolute left-[20px] top-[20px] bg-[#fff] p-[10px] rounded-[30px]">
                            {likeBtn}
                        </button>
                    }


                </div>
                <Link href={pathLinkToContent}
                    className="block text-center bkPrimaryColor py-3 mt-[16px] text-white font-bold">
                    بدء
                </Link>
            </div>
        </div>
    )
}

export default CoursesCard





