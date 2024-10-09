'use client'

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import en from '@/app/dictionaries/en.json';  // Import English dictionary
import ar from '@/app/dictionaries/ar.json';  // Import Arabic dictionary
import { useEffect, useState } from 'react';


const FastLinksFooter = () => {
     // Access dynamic [lang] parameter
     const { lang }: { lang?: string } = useParams();
     const [dictionary, setDictionary] = useState<any>(null);
     const [mounted, setMounted] = useState<boolean>(false);
    
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
    
    // Array of links
    const links = [
        { href: `/${lang}`, text: `${dictionary.navigation.home}` },
        { href: '/', text: 'عن المركز' },
        { href: '/', text: ' الدورات المجانية' },
        { href: '/', text: ' احكام وفتاوى' },
        { href: '/', text: '  المكتبة المرئية' },
        { href: '/', text: '  المكتبة الصوتية' },
        { href: '/', text: '  المقالات' },
        { href: '/', text: '  البث المباشر' },
        { href: '/', text: '  الكتب والابحاث' },
    ];

    return (
        <div>
            <h4 className='text-2xl mt-2 lg:mt-0 primaryColor'>روابط سريعة</h4> 
            <div className='row grid grid-cols-2 items-center mt-4 mr-4'>
                {links.map((link, index) => (
                    <div key={index} className='col-span-1 text-white flex items-center mt-2 '>
                        <FontAwesomeIcon icon={faChevronLeft} className='primaryColor mr-2 text-sm ml-2' />
                        <Link href={link.href} className='mainColor font-semibold'>
                            {link.text}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FastLinksFooter;
