"use client";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import TranslateHook from '../translate/TranslateHook';
import LangUseParams from '../translate/LangUseParams';

const LastNav = () => {
    // lang
    const lang = LangUseParams();
    const translate = TranslateHook();
    // toggle nav
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: `${translate ? translate.navigation.home : "الرئيسية"}`, href: `/${lang}` },
        { name: `${translate ? translate.navigation.about : "عن المركز"}`, href: `/${lang}/about` },
        { name: `${translate ? translate.navigation.courses : "الدورات المجانية "}`, href: `/${lang}/courses` },
        { name: `${translate ? translate.navigation.books : " الكتب والابحاث"}`, href: `/${lang}/books` },
        { name: `${translate ? translate.navigation.questions : " سؤال وجواب"}`, href: `/${lang}/questions` },
        { name: `${translate ? translate.navigation.videolibirary : " المكتبة المرئية"}`, href: `/${lang}/video-libirary` },
        { name: `${translate ? translate.navigation.audiolibirary : " المكتبة الصوتية"}`, href: `/${lang}/audio-libirary` },
        { name: `${translate ? translate.navigation.liveair : "البث المباشر"}`, href: `/${lang}/liveair` },
        { name: `${translate ? translate.navigation.blog : "المدونة"}`, href: `/${lang}/blogs` },
        { name: `${translate ? translate.navigation.contact : " اتصل بنا"}`, href: `/${lang}/contact-us` },
        { name: `${translate ? translate.navigation.academy : "اكاديمية سرج"}`, href: `https://academy.sorooj.org` },
    ];

    return (
        <nav className="bkPrimaryColor p-4 font-medium relative z-40">
            <div className="container mx-auto flex justify-between items-center">
                <div className="hidden lg:flex m-auto">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-white ml-4 text-[15px] leading-5"
                            {...(index === navLinks.length - 1 ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="lg:hidden">
                    <button onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-white" />
                    </button>
                </div>
            </div>
            <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
                {navLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="block text-white py-2"
                        {...(index === navLinks.length - 1 ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>

    );
};

export default LastNav;