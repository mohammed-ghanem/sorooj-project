
import { getDictionary } from '@/app/[lang]/dictionaries';
import BtnToggle from './BtnToggle';

const LastNav = async ({ language }: any) => {
    const dict = await getDictionary(language);
   
    const navLinks = [
        {index : 1 , name: `${dict.navigation.home}`,href:`/${language}`},
        {index : 2 , name: 'عن المركز', href: '#' },
        // {index : 3 , name: `${dict.navigation.lesson}`,href:`${language}/lesson`},
        {index : 4 , name: 'الدورات المجانية', href: '#' },
        // {index : 5 , name: 'الخطب', href: '#' },
        // {index : 6 , name: 'المقالات', href: '#' },
        {index : 7 , name: 'كتب وابحاث', href: '#' },
        {index : 8 , name: 'سؤال وجواب', href: '#' },
        // {index : 9 , name: 'مطويات', href: '#' },
        {index : 10 , name: 'اخبار', href: '#' },
        {index : 11 , name: 'المكتبة', href: '#' },
        {index : 12 , name: 'البث المباشر', href: '#' },
        {index : 13 , name: 'اتصل بنا', href: '#' },
        {index : 14 , name: 'أكاديمية سرج', href: '#' },
    ];

    return (
        <nav className="bkPrimaryColor p-4 ">
            <BtnToggle navLinks={navLinks } />
        </nav>
    );
};

export default LastNav;





// "use client";
// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';

// const LastNav: React.FC = () => {
    
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };
//     const navLinks = [
//         { name: 'الرئيسية', href: '/' },
//         { name: 'عن المركز', href: '#' },
//         { name: 'الدروس', href: '/lesson' },
//         { name: 'المحاضرات', href: '#' },
//         { name: 'الخطب', href: '#' },
//         { name: 'المقالات', href: '#' },
//         { name: 'كتب وابحاث', href: '#' },
//         { name: 'احكام وفتاوى', href: '#' },
//         { name: 'مطويات', href: '#' },
//         { name: 'تصميمات دعوية', href: '#' },
//         { name: 'المكتبة', href: '#' },
//         { name: 'البث المباشر', href: '#' },
//         { name: 'اتصل بنا', href: '#' },
//         { name: 'المنصة التعليمية', href: '#' },
//     ];

//     return (
//         <nav className="bkPrimaryColor p-4 ">
//             <div className="container mx-auto flex justify-between items-center">
//                 <div className="hidden lg:flex m-auto">
//                     {navLinks.map((link, index) => (
//                         <Link key={index} href={link.href} className="text-white ml-2 text-[15px] leading-5 ">
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
//                     <Link key={index} href={link.href} className="block text-white py-2 ">
//                         {link.name}
//                     </Link>
//                 ))}
//             </div>
//         </nav>
//     );
// };

// export default LastNav;
