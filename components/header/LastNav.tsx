"use client";
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import TranslateHook from '../translate/TranslateHook';
import LangUseParams from '../translate/LangUseParams';
import { Spin } from 'antd';

const LastNav = () => {
    const lang = LangUseParams();
    const translate = TranslateHook();
    const pathname = usePathname();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleNavigation = (href: string) => {
        if (href === pathname) return;
        setLoading(true);
        router.push(href);
    };

    useEffect(() => {
        setLoading(false);
    }, [pathname]);

    const navLinks = [
        { name: translate?.navigation?.home || "الرئيسية", href: `/${lang}` },
        { name: translate?.navigation?.about || "عن المركز", href: `/${lang}/about` },
        { name: translate?.navigation?.courses || "الدورات المجانية", href: `/${lang}/courses` },
        { name: translate?.navigation?.books || "الكتب والابحاث", href: `/${lang}/books` },
        { name: translate?.navigation?.questions || "سؤال وجواب", href: `/${lang}/questions` },
        { name: translate?.navigation?.videolibirary || "المكتبة المرئية", href: `/${lang}/video-library` },
        { name: translate?.navigation?.audiolibirary || "المكتبة الصوتية", href: `/${lang}/audio-library` },
        { name: translate?.navigation?.liveair || "البث المباشر", href: `/${lang}/live-air` },
        { name: translate?.navigation?.blog || "المدونة", href: `/${lang}/blogs` },
        { name: translate?.navigation?.contact || "اتصل بنا", href: `/${lang}/contact-us` },
        { name: translate?.navigation?.academy || "اكاديمية سرج", href: "https://academy.sorooj.org", external: true },
    ];

    return (
        <>
            {/* Loading Spinner */}
            {loading && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <Spin size="large" className="custom-spinner" />
                </div>
            )}

            <nav className="bkPrimaryColor p-4 font-medium relative z-40">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex m-auto">
                        {navLinks.map((link, index) => (
                            link.external ? (
                                <a 
                                    key={index} 
                                    href={link.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-white ml-4 text-[15px] leading-5"
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => handleNavigation(link.href)}
                                    className="text-white ml-4 text-[15px] leading-5"
                                >
                                    {link.name}
                                </button>
                            )
                        ))}
                    </div>

                    {/* Mobile Navigation Toggle */}
                    <div className="lg:hidden">
                        <button onClick={toggleMenu}>
                            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
                    {navLinks.map((link, index) => (
                        link.external ? (
                            <a 
                                key={index} 
                                href={link.href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block text-white py-2"
                            >
                                {link.name}
                            </a>
                        ) : (
                            <button
                                key={index}
                                onClick={() => {
                                    handleNavigation(link.href);
                                    closeMenu();
                                }}
                                className="block text-white py-2"
                            >
                                {link.name}
                            </button>
                        )
                    ))}
                </div>
            </nav>
        </>
    );
};

export default LastNav;





// "use client";
// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';
// import TranslateHook from '../translate/TranslateHook';
// import LangUseParams from '../translate/LangUseParams';

// const LastNav = () => {
//     // lang
//     const lang = LangUseParams();
//     const translate = TranslateHook();
//     // toggle nav
//     const [isOpen, setIsOpen] = useState(false);
//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };
//     const closeMenu = () => {
//         setIsOpen(false);
//     };

//     const navLinks = [
//         { name: `${translate ? translate.navigation.home : "الرئيسية"}`, href: `/${lang}` },
//         { name: `${translate ? translate.navigation.about : "عن المركز"}`, href: `/${lang}/about` },
//         { name: `${translate ? translate.navigation.courses : "الدورات المجانية "}`, href: `/${lang}/courses` },
//         { name: `${translate ? translate.navigation.books : " الكتب والابحاث"}`, href: `/${lang}/books` },
//         { name: `${translate ? translate.navigation.questions : " سؤال وجواب"}`, href: `/${lang}/questions` },
//         { name: `${translate ? translate.navigation.videolibirary : " المكتبة المرئية"}`, href: `/${lang}/video-library` },
//         { name: `${translate ? translate.navigation.audiolibirary : " المكتبة الصوتية"}`, href: `/${lang}/audio-library` },
//         { name: `${translate ? translate.navigation.liveair : "البث المباشر"}`, href: `/${lang}/live-air` },
//         { name: `${translate ? translate.navigation.blog : "المدونة"}`, href: `/${lang}/blogs` },
//         { name: `${translate ? translate.navigation.contact : " اتصل بنا"}`, href: `/${lang}/contact-us` },
//         { name: `${translate ? translate.navigation.academy : "اكاديمية سرج"}`, href: `https://academy.sorooj.org` },
//     ];

//     return (
//         <nav className="bkPrimaryColor p-4 font-medium relative z-40">
//             <div className="container mx-auto flex justify-between items-center">
//                 <div className="hidden lg:flex m-auto">
//                     {navLinks.map((link, index) => (
//                         <Link
//                             prefetch={true}
//                             key={index}
//                             href={link.href}
//                             className="text-white ml-4 text-[15px] leading-5"
//                             {...(index === navLinks.length - 1 ? { target: "_blank", rel: "noopener noreferrer" } : {})}
//                         >
//                             {link.name}

//                         </Link>
//                     ))}
//                 </div>
//                 <div className="lg:hidden">
//                     <button onClick={toggleMenu}>
//                         <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-white" />
//                     </button>
//                 </div>
//             </div>
//             <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
//                 {navLinks.map((link, index) => (
//                     <Link
//                         onClick={closeMenu}
//                         key={index}
//                         href={link.href}
//                         className="block text-white py-2"
//                         {...(index === navLinks.length - 1 ? { target: "_blank", rel: "noopener noreferrer" } : {})}
//                     >
//                         {link.name}
//                     </Link>
//                 ))}
//             </div>
//         </nav>

//     );
// };

// export default LastNav;