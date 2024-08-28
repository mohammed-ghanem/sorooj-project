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
        { name: 'الرئيسية', href: '#' },
        { name: 'عن المركز', href: '#' },
        { name: 'الدروس', href: '#' },
        { name: 'المحاضرات', href: '#' },
    ];

    return (
        <nav className="bkPrimaryColor p-4 ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="hidden md:flex m-auto">
                    {navLinks.map((link, index) => (
                        <Link key={index} href={link.href} className="text-white ml-3 font-bold">
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-white" />
                    </button>
                </div>
            </div>
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
                {navLinks.map((link, index) => (
                    <Link key={index} href={link.href} className="block text-white py-2 font-bold">
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default LastNav;
