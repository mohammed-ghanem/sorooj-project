"use client";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import en from '@/app/dictionaries/en.json';  // Import English dictionary
import ar from '@/app/dictionaries/ar.json';  // Import Arabic dictionary

const LastNav: React.FC = () => {
     // Access dynamic [lang] parameter
     const { lang }: { lang?: string } = useParams();
     const [dictionary, setDictionary] = useState<any>(null);
     const [mounted, setMounted] = useState<boolean>(false);
    
    
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Dynamically set the dictionary based on the current language
        if (lang === 'en') {
            setDictionary(en);
        } else if (lang === 'ar') {
            setDictionary(ar);
        }
    }, [lang]);

    useEffect(() => {
        setMounted(true); // Ensure the component is mounted before accessing params
    }, []);

    if (!mounted) return null; // Avoid rendering before the component is mounted



    const navLinks = [
        { name: `${dictionary.navigation.home}`, href: `/${lang}` },
        { name: 'عن المركز', href: '#' },
        { name: 'الدورات المجانية', href: '#' },
        { name: 'الكتب والابحاث', href: '#' },
        { name: 'سؤال وجواب', href: '#' },
        { name: 'المكتبة', href: '#' },
        { name: 'البث المباشر', href: '#' },
        { name: 'المدونة', href: '#' },
        { name: 'اتصل بنا', href: '#' },
        { name: 'اكاديمية سرج', href: '#' },
    ];

    return (
        <nav className="bkPrimaryColor p-4 ">
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







// import { getDictionary } from '@/app/[lang]/dictionaries';
// import BtnToggle from './BtnToggle';

// const LastNav = async ({ language }: any) => {
//     const dict = await getDictionary(language);
   
//     const navLinks = [
//         {index : 1 , name: `${dict.navigation.home}`,href:`/${language}`},
//         {index : 2 , name: 'عن المركز', href: '#' },
//         {index : 4 , name: 'الدورات المجانية', href: '#' },
//         {index : 7 , name: 'كتب وابحاث', href: '#' },
//         {index : 8 , name: 'سؤال وجواب', href: '#' },
//         {index : 10 , name: 'اخبار', href: '#' },
//         {index : 11 , name: 'المكتبة', href: '#' },
//         {index : 12 , name: 'البث المباشر', href: '#' },
//         {index : 13 , name: 'اتصل بنا', href: '#' },
//         {index : 14 , name: 'أكاديمية سرج', href: '#' },
//     ];

//     return (
//         <nav className="bkPrimaryColor p-4 ">
//             <BtnToggle navLinks={navLinks } />
//         </nav>
//     );
// };

// export default LastNav;
