"use client";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import TranslateHook from '../translate/TranslateHook';

const LastNav = () => {
    // lang
    const { lang }: { lang?: string } = useParams();
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
        { name: `${translate ? translate.navigation.libirary : " المكتبة"}`, href: `/${lang}/libirary` },
        { name: `${translate ? translate.navigation.liveair : "البث المباشر"}`, href: `/${lang}/liveair` },
        { name: `${translate ? translate.navigation.blog : "المدونة"}`, href: `/${lang}/blog` },
        { name: `${translate ? translate.navigation.contact : " اتصل بنا"}`, href: `/${lang}/contact-us` },
        { name: `${translate ? translate.navigation.academy : "اكاديمية سرج"}`, href: `/${lang}/sorooj-academy` },
    ];

    return (
        <nav className="bkPrimaryColor p-4 font-medium relative z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="hidden lg:flex m-auto">
                    {navLinks.map((link, index) => (
                        <Link key={index} href={link.href} className="text-white ml-4 text-[15px] leading-5 ">
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
                    <Link key={index} href={link.href} className="block text-white py-2 ">
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default LastNav;