'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCalendar, faBookOpenReader, faUser, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import def from '@/public/assets/images/test.jpg'

const MoreWatching = () => {
    const [mostViewed, setMostViewed] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMostViewed = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/most-viewed`);
            setMostViewed(res.data.data.most_viewed || []); // Adjust based on your API response structure
            console.log(res.data.data.most_viewed)
        } catch (err: any) {
            setError(err.message || 'Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMostViewed();
    }, []);

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <section className="container mx-auto w-[80%] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:gap-4">
            {mostViewed.map((item) => (
                <div key={item.id} className="bkColor rounded-[15px] overflow-hidden relative mb-4">
                    <div className="newCourses h-full">
                        <Image
                            className="w-full"
                            src={item.image || def} // Fallback image
                            alt={item.title}
                            width={300}
                            height={200}
                        />
                        <div className="px-3">
                            <div className="cardDetails grid grid-cols-2 gap-2 mt-3 font-bold">
                                <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
                                    <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
                                    <span>{item.view_count} مشاهدة</span>
                                </p>
                                <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
                                    <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
                                    <span>{item.publish_date}</span>
                                </p>
                            </div>
                            <h2 className="mt-2">
                                <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
                                <span className="font-bold mainColor text-sm">{`${item.name.slice(0, 32)} ...`}</span>
                            </h2>
                            <h3 className="mt-1">
                                <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
                                <span className="text-[12px] mainColor">{item.author_name}</span>
                            </h3>
                            <p className="text-[12px] mainColor flex items-center mt-2">
                                <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor" />
                                <span className="opacity-[0.8]">{`${item.brief_description.slice(0, 38)} ...`}</span>
                            </p>
                        </div>
                        <Link
                            href={`/details/${item.id}`}
                            className="block text-center bkPrimaryColor py-3 mt-[16px] text-white font-bold"
                        >
                            مشاهدة
                        </Link>
                    </div>
                    <span className="categoryName font-cairo text-[10px] font-bold mainColor absolute top-[6px] left-[6px] bkColor px-[8px] py-[3px] rounded-[15px]">
                        {item.type}
                    </span>
                </div>
            ))}
        </section>
    );
};

export default MoreWatching;





// 'use client'

// import { faEye, faCalendar, faBookOpenReader, faUser, faBookOpen } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import test from '@/public/assets/images/test.png'
// import Image from "next/image"
// import Link from 'next/link'


// const MoreWatching = () => {
//     return (
//         <section className=' container mx-auto w-[80%] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:gap-4'>
//             <div className=" bkColor rounded-[15px] overflow-hidden relative mb-4">
//                 <div className="newCourses h-full">
//                     <Image className="w-full" src={test} alt="test" height={100} />
//                     <div className="px-3">
//                         <div className="cardDetails grid grid-cols-2 gap-2 mt-3 font-bold">
//                             <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
//                                 <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
//                                 <span>120 مشاهدة</span>
//                             </p>
//                             <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
//                                 <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
//                                 <span>24 اغسطس 2024</span>
//                             </p>
//                         </div>
//                         <h2 className="mt-2">
//                             <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
//                             <span className="font-bold mainColor">شرح العقيدة الوسطية</span>
//                         </h2>
//                         <h3 className="mt-1">
//                             <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
//                             <span className="text-[12px] mainColor">الدكتور بندر ابن محمد الميمونى </span>
//                         </h3>
//                         <p className="text-[12px] mainColor flex items-center mt-2">
//                             <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor" />
//                             <span className=" opacity-[0.8]">برنامج محطات فى العقيدة المحور الثانى بعنوان مفهوم التوحيد</span>
//                         </p>
//                     </div>
//                     <Link href={`/`}
//                         className="block text-center bkPrimaryColor py-3 mt-[16px] text-white font-bold">
//                         مشاهدة
//                     </Link>
//                 </div>
//                 <span className='categoryName font-cairo text-[10px] font-bold mainColor absolute top-[6px] left-[6px] bkColor px-[8px] py-[3px] rounded-[15px]'>
//                     دورة تعليمية
//                 </span>
//             </div>
//             {/*  */}
//             <div className=" bkColor rounded-[15px] overflow-hidden relative mb-4">
//                 <div className="newCourses h-full">
//                     <Image className="w-full" src={test} alt="test" height={100} />
//                     <div className="px-3">
//                         <div className="cardDetails grid grid-cols-2 gap-2 mt-3 font-bold">
//                             <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
//                                 <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
//                                 <span>120 مشاهدة</span>
//                             </p>
//                             <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
//                                 <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
//                                 <span>24 اغسطس 2024</span>
//                             </p>
//                         </div>
//                         <h2 className="mt-2">
//                             <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
//                             <span className="font-bold mainColor">شرح العقيدة الوسطية</span>
//                         </h2>
//                         <h3 className="mt-1">
//                             <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
//                             <span className="text-[12px] mainColor">الدكتور بندر ابن محمد الميمونى </span>
//                         </h3>
//                         <p className="text-[12px] mainColor flex items-center mt-2">
//                             <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor" />
//                             <span className=" opacity-[0.8]">برنامج محطات فى العقيدة المحور الثانى بعنوان مفهوم التوحيد</span>
//                         </p>
//                     </div>
//                     <Link href={`/`}
//                         className="block text-center bkPrimaryColor py-3 mt-[16px] text-white font-bold">
//                         مشاهدة
//                     </Link>
//                 </div>
//                 <span className='categoryName font-cairo text-[10px] font-bold mainColor absolute top-[6px] left-[6px] bkColor px-[8px] py-[3px] rounded-[15px]'>
//                     كتب وابحاث
//                 </span>
//             </div>
//             <div className=" bkColor rounded-[15px] overflow-hidden relative mb-4">
//                 <div className="newCourses h-full">
//                     <Image className="w-full" src={test} alt="test" height={100} />
//                     <div className="px-3">
//                         <div className="cardDetails grid grid-cols-2 gap-2 mt-3 font-bold">
//                             <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
//                                 <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
//                                 <span>120 مشاهدة</span>
//                             </p>
//                             <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
//                                 <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
//                                 <span>24 اغسطس 2024</span>
//                             </p>
//                         </div>
//                         <h2 className="mt-2">
//                             <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
//                             <span className="font-bold mainColor">شرح العقيدة الوسطية</span>
//                         </h2>
//                         <h3 className="mt-1">
//                             <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
//                             <span className="text-[12px] mainColor">الدكتور بندر ابن محمد الميمونى </span>
//                         </h3>
//                         <p className="text-[12px] mainColor flex items-center mt-2">
//                             <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor" />
//                             <span className=" opacity-[0.8]">برنامج محطات فى العقيدة المحور الثانى بعنوان مفهوم التوحيد</span>
//                         </p>
//                     </div>
//                     <Link href={`/`}
//                         className="block text-center bkPrimaryColor py-3 mt-[16px] text-white font-bold">
//                         مشاهدة
//                     </Link>
//                 </div>
//                 <span className='categoryName font-cairo text-[10px] font-bold mainColor absolute top-[6px] left-[6px] bkColor px-[8px] py-[3px] rounded-[15px]'>
//                     كتب وابحاث
//                 </span>
//             </div>
//             <div className=" bkColor rounded-[15px] overflow-hidden relative mb-4">
//                 <div className="newCourses h-full">
//                     <Image className="w-full" src={test} alt="test" height={100} />
//                     <div className="px-3">
//                         <div className="cardDetails grid grid-cols-2 gap-2 mt-3 font-bold">
//                             <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
//                                 <FontAwesomeIcon icon={faEye} className="ml-1 primaryColor" />
//                                 <span>120 مشاهدة</span>
//                             </p>
//                             <p className="text-[10px] mainColor opacity-[0.8] flex items-center">
//                                 <FontAwesomeIcon icon={faCalendar} className="ml-1 primaryColor" />
//                                 <span>24 اغسطس 2024</span>
//                             </p>
//                         </div>
//                         <h2 className="mt-2">
//                             <FontAwesomeIcon icon={faBookOpenReader} className="ml-1 primaryColor" />
//                             <span className="font-bold mainColor">شرح العقيدة الوسطية</span>
//                         </h2>
//                         <h3 className="mt-1">
//                             <FontAwesomeIcon icon={faUser} className="ml-1 primaryColor" />
//                             <span className="text-[12px] mainColor">الدكتور بندر ابن محمد الميمونى </span>
//                         </h3>
//                         <p className="text-[12px] mainColor flex items-center mt-2">
//                             <FontAwesomeIcon icon={faBookOpen} className="ml-1 primaryColor" />
//                             <span className=" opacity-[0.8]">برنامج محطات فى العقيدة المحور الثانى بعنوان مفهوم التوحيد</span>
//                         </p>
//                     </div>
//                     <Link href={`/`}
//                         className="block text-center bkPrimaryColor py-3 mt-[16px] text-white font-bold">
//                         مشاهدة
//                     </Link>
//                 </div>
//                 <span className='categoryName font-cairo text-[10px] font-bold mainColor absolute top-[6px] left-[6px] bkColor px-[8px] py-[3px] rounded-[15px]'>
//                     كتب وابحاث
//                 </span>
//             </div>
//         </section>
//     )
// }

// export default MoreWatching