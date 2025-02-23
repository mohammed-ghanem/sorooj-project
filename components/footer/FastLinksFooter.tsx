'use client'

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import LangUseParams from '../translate/LangUseParams';
import TranslateHook from '../translate/TranslateHook';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';


const FastLinksFooter = () => {
    // Access dynamic [lang] parameter
    const lang = LangUseParams();
    const translate = TranslateHook();
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);



    const handleNavigation = (href: string) => {
        if (href === pathname) return;
        setLoading(true);
        router.push(href);
    };

    useEffect(() => {
        setLoading(false);
    }, [pathname]);

    // Array of links
    const links = [
        { name: `${translate ? translate.navigation.home : " الرئيسية"}`, href: `/${lang}` },
        { name: `${translate ? translate.navigation.about : "عن المركز"}`, href: `/${lang}/about` },
        { name: `${translate ? translate.navigation.courses : "الدورات المجانية "}`, href: `/${lang}/courses` },
        { name: `${translate ? translate.navigation.books : " الكتب والابحاث"}`, href: `/${lang}/books` },
        { name: `${translate ? translate.navigation.questions : " سؤال وجواب"}`, href: `/${lang}/questions` },
        { name: `${translate ? translate.navigation.videolibirary : " المكتبة المرئية"}`, href: `/${lang}/video-library` },
        { name: `${translate ? translate.navigation.audiolibirary : " المكتبة الصوتية"}`, href: `/${lang}/audio-library` },
        { name: `${translate ? translate.navigation.liveair : "البث المباشر"}`, href: `/${lang}/live-air` },
        { name: `${translate ? translate.navigation.blog : "المدونة"}`, href: `/${lang}/blogs` },
        { name: `${translate ? translate.navigation.contact : " اتصل بنا"}`, href: `/${lang}/contact-us` },
        { name: `${translate ? translate.navigation.terms : "الشروط والاحكام"}`, href: `/${lang}/terms` },
        { name: `${translate ? translate.navigation.policy : "سياسة الخصوصية"}`, href: `/${lang}/privacy-policy` },
        { name: `${translate ? translate.navigation.deleteAccount : "حذف حسابك"}`, href: `/${lang}/delete-account` },
        { name: `${translate ? translate.navigation.academy : "اكاديمية سرج"}`, href: `https://academy.sorooj.org`, external: true },
    ];

    return (
        <>
            {/* Loading Spinner */}
            {loading && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <Spin size="large" className="custom_spinner" />
                </div>
            )}

            <div>
                <h4 className='text-2xl mt-2 lg:mt-0 primaryColor'>
                    {translate ? translate.pages.homePage.footer.fastLinks : ""}
                </h4>
                <div className='row grid grid-cols-2 items-center mt-4 mr-4'>
                    {links.map((link, index) => (
                        link.external ? (

                            <div key={index} className='col-span-1 mainColor flex items-center mt-2 '>
                                <FontAwesomeIcon icon={faChevronLeft} className='primaryColor mr-2 text-sm ml-2' />
                                <Link
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mainColor text-[13px] font-bold"
                                >
                                    {link.name}
                                </Link>
                            </div>


                        ) : (
                            <button
                                key={index}
                                onClick={() => handleNavigation(link.href)}
                                className="mainColor font-bold ml-4 text-[13px] leading-5 text-start mt-2" 
                            >
                                <FontAwesomeIcon icon={faChevronLeft} className='primaryColor mr-2 text-sm ml-2' />
                                {link.name}
                            </button>
                        )
                    ))}

                </div>
            </div>

        </>

    );
};

export default FastLinksFooter;






// 'use client'

// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Link from 'next/link';
// import LangUseParams from '../translate/LangUseParams';
// import TranslateHook from '../translate/TranslateHook';


// const FastLinksFooter = () => {
//     // Access dynamic [lang] parameter
//     const lang = LangUseParams();
//     const translate = TranslateHook();
//     // Array of links
//     const links = [
//         { name: `${translate ? translate.navigation.home : " الرئيسية"}`, href: `/${lang}` },
//         { name: `${translate ? translate.navigation.about : "عن المركز"}`, href: `/${lang}/about` },
//         { name: `${translate ? translate.navigation.courses : "الدورات المجانية "}`, href: `/${lang}/courses` },
//         { name: `${translate ? translate.navigation.books : " الكتب والابحاث"}`, href: `/${lang}/books` },
//         { name: `${translate ? translate.navigation.questions : " سؤال وجواب"}`, href: `/${lang}/questions` },
//         { name: `${translate ? translate.navigation.videolibirary : " المكتبة المرئية"}`, href: `/${lang}/video-library` },
//         { name: `${translate ? translate.navigation.audiolibirary : " المكتبة الصوتية"}`, href: `/${lang}/audio-library` },
//         { name: `${translate ? translate.navigation.liveair : "البث المباشر"}`, href: `/${lang}/live-air` },
//         { name: `${translate ? translate.navigation.blog : "المدونة"}`, href: `/${lang}/blogs` },
//         { name: `${translate ? translate.navigation.contact : " اتصل بنا"}`, href: `/${lang}/contact-us` },
//         { name: `${translate ? translate.navigation.terms : "الشروط والاحكام"}`, href: `/${lang}/terms` },
//         { name: `${translate ? translate.navigation.policy : "سياسة الخصوصية"}`, href: `/${lang}/privacy-policy` },
//         { name: `${translate ? translate.navigation.deleteAccount : "حذف حسابك"}`, href: `/${lang}/delete-account` },
//         { name: `${translate ? translate.navigation.academy : "اكاديمية سرج"}`, href: `https://academy.sorooj.org` },
//     ];

//     return ( 
//         <div>
//             <h4 className='text-2xl mt-2 lg:mt-0 primaryColor'>
//             {translate ? translate.pages.homePage.footer.fastLinks : ""}
//             </h4>
//             <div className='row grid grid-cols-2 items-center mt-4 mr-4'>
//                 {links.map((link, index) => (
//                     <div key={index} className='col-span-1 text-white flex items-center mt-2 '>
//                         <FontAwesomeIcon icon={faChevronLeft} className='primaryColor mr-2 text-sm ml-2' />
//                         <Link href={link.href} className='mainColor font-semibold text-sm'>
//                             {link.name}
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default FastLinksFooter;