'use client'

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import LangUseParams from '../translate/LangUseParams';
import { useEffect, useState } from 'react';
import TranslateHook from '../translate/TranslateHook';


const FastLinksFooter = () => {
     // Access dynamic [lang] parameter
     const lang = LangUseParams();
     const translate = TranslateHook();
    // Array of links
    const links = [
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
        <div>
            <h4 className='text-2xl mt-2 lg:mt-0 primaryColor'>روابط سريعة</h4> 
            <div className='row grid grid-cols-2 items-center mt-4 mr-4'>
                {links.map((link, index) => (
                    <div key={index} className='col-span-1 text-white flex items-center mt-2 '>
                        <FontAwesomeIcon icon={faChevronLeft} className='primaryColor mr-2 text-sm ml-2' />
                        <Link href={link.href} className='mainColor font-semibold text-sm'>
                            {link.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FastLinksFooter;
