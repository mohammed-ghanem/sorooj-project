"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const LastNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'الرئيسية', href: '/' },
        { name: 'عن المركز', href: '#' },
        { name: 'الدروس', href: '/lesson' },
        { name: 'المحاضرات', href: '#' },
        { name: 'الخطب', href: '#' },
        { name: 'المقالات', href: '#' },
        { name: 'كتب وابحاث', href: '#' },
        { name: 'احكام وفتاوى', href: '#' },
        { name: 'مطويات', href: '#' },
        { name: 'تصميمات دعوية', href: '#' },
        { name: 'المكتبة', href: '#' },
        { name: 'البث المباشر', href: '#' },
        { name: 'اتصل بنا', href: '#' },
        { name: 'المنصة التعليمية', href: '#' },
    ];

    return (
        <nav className="bkPrimaryColor p-4 ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="hidden lg:flex m-auto">
                    {navLinks.map((link, index) => (
                        <Link key={index} href={link.href} className="text-white ml-2 text-[15px] leading-5 ">
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
