import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const FastLinksFooter = () => {
    // Array of links
    const links = [
        { href: '/', text: 'الرئيسية' },
        { href: '/', text: 'عن المركز' },
        { href: '/', text: 'الدروس' }, 
        { href: '/', text: ' المحاضرات' },
        { href: '/', text: ' احكام وفتاوى' },
        { href: '/', text: '  المكتبة المرئية' },
        { href: '/', text: '  المكتبة الصوتية' },
        { href: '/', text: '  المقالات' },
        { href: '/', text: '  البث المباشر' },
        { href: '/', text: '  الكتب والابحاث' },
    ];

    return (
        <div>
            <h4 className='text-2xl mt-2 lg:mt-0'>روابط سريعة</h4>
            <div className='row grid grid-cols-2 items-center mt-4 mr-4'>
                {links.map((link, index) => (
                    <div key={index} className='col-span-1 text-white flex items-center mt-2 '>
                        <FontAwesomeIcon icon={faChevronLeft} className='mr-2 text-sm ml-2' />
                        <Link href={link.href}>
                            {link.text}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FastLinksFooter;
