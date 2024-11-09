import Link from 'next/link'
import "./style.css"
import { faBook, faClipboardQuestion, faHeart, faLock, faMessage, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { renderToString } from 'react-dom/server';
import Swal from "sweetalert2"
import Cookies from "js-cookie" // Import the js-cookie library
import TranslateHook from '../../translate/TranslateHook';
import LangUseParams from "@/components/translate/LangUseParams"



const ProfileBoxCategories = () => {
    // lang param (ar Or en)
    const lang = LangUseParams() // Access dynamic [lang] parameter
    const translate = TranslateHook();
    const logoutIcon = renderToString(<FontAwesomeIcon className='bkBox p-[10px] rounded-[6px] text-[44px] primaryColor' icon={faRightFromBracket} />);
    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                title: `<div><p>${logoutIcon}</p><h2>${translate ? translate.pages.profileCategory.logoutTitle : ""}</h2></div>`,
                text: `${translate ? translate.pages.profileCategory.logoutDescription : ""}`,
                showCancelButton: true,
                confirmButtonText: `${translate ? translate.pages.profileCategory.logout : ""}`,
                cancelButtonText: `${translate ? translate.pages.profileCategory.cancel : ""}`,
            });

            if (result.isConfirmed) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/logout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Cookies.get('access_token')}` },
                });

                if (!response.ok) throw new Error('Failed to logout');
                Cookies.remove('access_token');
                await Swal.fire({
                    icon: 'success',
                    title: `${translate ? translate.pages.profileCategory.logout : ""}`,
                    text: `${translate ? translate.pages.profileCategory.logoutSuccess : ""}`,
                    confirmButtonText: `${translate ? translate.pages.profileCategory.ok : ""}`,
                });
                window.location.href = `/${lang}`
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    return (
        <div className='w-[95%] md:w-[70%] mx-auto relative overflow-hidden rounded-[14px] [box-shadow:1px_1px_6px_#ddd] '>
            <h2 className='font-bold p-4 bkPrimaryColor text-white'>
                {translate ? translate.pages.userProfile.title : ""}
            </h2>
            <div className=''>
                <ul className='profileList'>
                    <li className='bkColor'>
                        <Link href={`/${lang}/auth/profile`}>
                            <FontAwesomeIcon className={`primaryColor ${lang === "en" ? 'mr-2' : 'mr-0'}`} icon={faUser} />
                            <span className='mr-3 mainColor text-sm font-bold'>
                                {translate ? translate.pages.profileCategory.personalInfo : ""}
                            </span>
                        </Link>
                    </li>
                    <li className='bkColor'>
                        <Link href={''}>
                            <FontAwesomeIcon className={`primaryColor ${lang === "en" ? 'mr-2' : 'mr-0'}`} icon={faBook} />
                            <span className='mr-3 mainColor text-sm font-bold'>
                                {translate ? translate.pages.profileCategory.myCourses : ""}
                            </span>
                        </Link>
                    </li>
                    <li className=' bkColor'>
                        <Link href={''}>
                            <FontAwesomeIcon className={`primaryColor ${lang === "en" ? 'mr-2' : 'mr-0'}`} icon={faHeart} />
                            <span className='mr-3 mainColor text-sm font-bold'>
                                {translate ? translate.pages.profileCategory.favoriteSubjects : ""}
                            </span>
                        </Link>
                    </li>
                    <li className='bkColor'>
                        <Link href={''}>
                            <FontAwesomeIcon className={`primaryColor ${lang === "en" ? 'mr-2' : 'mr-0'}`} icon={faClipboardQuestion} />
                            <span className='mr-3 mainColor text-sm font-bold'>
                                {translate ? translate.pages.profileCategory.myQuestions : ""}
                            </span>
                        </Link>
                    </li>
                    <li className='bkColor'>
                        <Link href={''}>
                            <FontAwesomeIcon className={`primaryColor ${lang === "en" ? 'mr-2' : 'mr-0'}`} icon={faMessage} />
                            <span className='mr-3 mainColor text-sm font-bold'>
                                {translate ? translate.pages.profileCategory.comments : ""}
                            </span>
                        </Link>
                    </li>
                    <li className='bkColor'>
                        <Link href={`/${lang}/auth/change-password`}>
                            <FontAwesomeIcon className={`primaryColor ${lang === "en" ? 'mr-2' : 'mr-0'}`} icon={faLock} />
                            <span className='mr-3 mainColor text-sm font-bold'>
                                {translate ? translate.pages.profileCategory.changePassword : ""}
                            </span>
                        </Link>
                    </li>
                    <li className='bkMainColor text-white'>
                        <Link href={''}>
                            <FontAwesomeIcon className={`text-white ${lang === "en" ? 'mr-2' : 'mr-0'}`} icon={faRightFromBracket} />
                            <span className='mr-3' onClick={handleLogout}>
                                {translate ? translate.pages.profileCategory.logout : ""}
                            </span>
                        </Link>
                    </li>


                </ul>
            </div>
        </div>
    )
}

export default ProfileBoxCategories