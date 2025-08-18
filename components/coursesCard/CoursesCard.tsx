
import { useState } from "react";
import Image from "next/image";
import { faEye, faCalendar, faBookOpenReader, faUser, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Spin } from "antd";
import { useRouter } from "next/navigation";

interface CoursesCardProps {
    imgSrc: any;
    watchNumber: string;
    datePublish: string;
    courseTitle: string;
    doctorName?: any;
    descriptionCourse: string;
    likeBtn?: any;
    pathLinkToContent: any;
}

const CoursesCard: React.FC<CoursesCardProps> = ({ imgSrc, watchNumber, datePublish, courseTitle, doctorName, descriptionCourse, likeBtn, pathLinkToContent }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //     e.preventDefault(); // Prevent default navigation to handle loading manually
    //     setLoading(true);
    //     router.push(pathLinkToContent);
    // };

    const slicedTitle = courseTitle.length > 30 ? courseTitle.slice(0, 30) + '...' : courseTitle;
    const slicedDescription = descriptionCourse.length > 38 ? descriptionCourse.slice(0, 38) + '...' : descriptionCourse;
    const slicedDoctor = doctorName?.length > 35 ? doctorName.slice(0, 35) + "..." : doctorName;

    return (
        <>
            {/* Fullscreen Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Spin size="large" className="custom_spinner" />
                </div>
            )}

            {/* Course Card */}
            <div className="bkColor rounded-[15px] overflow-hidden relative">
                <div className="newCourses h-full">
                    <Image className="w-full max-w-full" src={imgSrc} alt={`${courseTitle.slice(0, 20)} ...`}
                        height={100} width={100} />
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
                            <span className="font-bold mainColor text-sm">{slicedTitle}</span>
                        </h2>
                        <h3 className="mt-1">
                            <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
                            <span className="text-[12px] mainColor">{slicedDoctor}</span>
                        </h3>
                        <p className="text-[12px] mainColor flex items-center mt-2">
                            <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor" />
                            <span className="opacity-[0.8]">{slicedDescription}</span>
                        </p>

                        {likeBtn && (
                            <span className="absolute left-[20px] top-[20px] bg-[#fff] pt-[8px] px-[8px] pb-[6px] rounded-[30px]">
                                {likeBtn}
                            </span>
                        )}
                    </div>

                    {/* Link with Loading Effect */}
                    <Link href={pathLinkToContent}
                        //onClick={handleClick}
                        className="block text-center bkPrimaryColor py-3 mt-[16px] text-white font-bold">
                        بدء
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CoursesCard;








// import Image from "next/image"
// import { faEye, faCalendar, faBookOpenReader, faUser, faBookOpen } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import Link from "next/link"

// interface CoursesCardProps {
//     imgSrc: any;
//     watchNumber: string;
//     datePublish: string;
//     courseTitle: string;
//     doctorName?: any;
//     descriptionCourse: string;
//     likeBtn?: any;
//     pathLinkToContent: any;
// }

// const CoursesCard: React.FC<CoursesCardProps> = ({ imgSrc, watchNumber, datePublish, courseTitle, doctorName, descriptionCourse, likeBtn, pathLinkToContent }) => {
//     const slicedTitle = courseTitle.length > 30 ? courseTitle.slice(0, 30) + '...' : courseTitle;
//     const slicedDescription = descriptionCourse.length > 38 ? descriptionCourse.slice(0, 38) + '...' : descriptionCourse;
//     const slicedDoctor = doctorName.length > 35 ? doctorName.slice (0,35) + "..." : doctorName
//     return (
//         // courses card
//         <div className=" bkColor rounded-[15px] overflow-hidden relative">
//             <div className="newCourses h-full">
//                 <Image className="w-full max-w-full" src={imgSrc} alt={`${courseTitle.slice(0, 20)} ...`}
//                     height={100} width={100} />
//                 <div className="px-3">
//                     <div className="cardDetails grid grid-cols-2 gap-2 mt-3 font-bold">
//                         <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
//                             <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
//                             <span>{watchNumber}</span>
//                         </p>
//                         <p className="text-[10px] mainColor opacity-[0.8] flex items-center justify-center">
//                             <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
//                             <span>{datePublish}</span>
//                         </p>
//                     </div>
//                     <h2 className="mt-2">
//                         <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
//                         <span className="font-bold mainColor text-sm">{slicedTitle}</span>
//                     </h2>
//                     <h3 className="mt-1">
//                         <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
//                         <span className="text-[12px] mainColor">{slicedDoctor}</span>
//                     </h3>
//                     <p className="text-[12px] mainColor flex items-center mt-2">
//                         <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor" />
//                         <span className=" opacity-[0.8]">{slicedDescription}</span>
//                     </p>

//                     {likeBtn
//                         &&
//                         <span className=" absolute left-[20px] top-[20px] bg-[#fff] pt-[8px] px-[8px] pb-[6px] rounded-[30px]">
//                             {likeBtn}
//                         </span>
//                     }


//                 </div>
//                 <Link href={pathLinkToContent}
//                     className="block text-center bkPrimaryColor py-3 mt-[16px] text-white font-bold">
//                     بدء
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default CoursesCard





