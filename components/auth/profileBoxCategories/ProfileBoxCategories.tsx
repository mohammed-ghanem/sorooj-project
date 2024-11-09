import Link from 'next/link'
import "./style.css"
import { faBook, faClipboardQuestion, faHeart, faLock, faMessage, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LangUseParams from "@/components/translate/LangUseParams"
import Swal from "sweetalert2"
import Cookies from "js-cookie" // Import the js-cookie library



const ProfileBoxCategories = ({ setUserName }: any) => {
    // lang param (ar Or en)
    const lang = LangUseParams()

    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You will be logged out from your account!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, logout!',
                cancelButtonText: 'Cancel',
            });

            if (result.isConfirmed) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access_token')}`,  // Use token from cookies
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to logout');
                }

                // Remove the token from cookies and clear user info
                Cookies.remove('access_token');
                setUserName(null);

                await Swal.fire({
                    icon: 'success',
                    title: 'Logged out!',
                    text: 'You have been successfully logged out.',
                    confirmButtonText: 'OK',
                });

                window.location.href = `/${lang}`;
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Handle any errors (optional)
        }
    };
    return (
        <div className='w-[95%] md:w-[70%] mx-auto relative overflow-hidden rounded-[14px] [box-shadow:1px_1px_6px_#ddd] '>
            <h2 className='font-bold p-4 bkPrimaryColor text-white'>حسابى</h2>
            <div className=''>
                <ul className='profileList'>
                    <li className='bkColor'>
                        <Link href={`/${lang}/auth/profile`}>
                            <FontAwesomeIcon className='primaryColor' icon={faUser} />
                            <span className='mr-3 mainColor text-sm font-bold'>البيانات الشخصية</span>
                        </Link>
                    </li>
                    <li className='bkColor'>
                        <Link href={''}>
                            <FontAwesomeIcon className='primaryColor' icon={faBook} />
                            <span className='mr-3 mainColor text-sm font-bold'>دوراتى</span>
                        </Link>
                    </li>
                    <li className=' bkColor'>
                        <Link href={''}>
                            <FontAwesomeIcon className='primaryColor' icon={faHeart} />
                            <span className='mr-3 mainColor text-sm font-bold'>المواضيع المفضلة</span>
                        </Link>
                    </li>
                    <li className='bkColor'>
                        <Link href={''}>
                            <FontAwesomeIcon className='primaryColor' icon={faClipboardQuestion} />
                            <span className='mr-3 mainColor text-sm font-bold'>اسئلتى</span>
                        </Link>
                    </li>
                    <li className='bkColor'>
                        <Link href={''}>
                            <FontAwesomeIcon className='primaryColor' icon={faMessage} />
                            <span className='mr-3 mainColor text-sm font-bold'>تعليقاتى</span>
                        </Link>
                    </li>
                    <li className='bkColor'>
                        <Link href={`/${lang}/auth/change-password`}>
                            <FontAwesomeIcon className='primaryColor' icon={faLock} />
                            <span className='mr-3 mainColor text-sm font-bold'>تغيير كلمة المرور</span>
                        </Link>
                    </li>
                    <li className='bkMainColor text-white'>
                        <Link href={''}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span className='mr-3' onClick={handleLogout}>تسجيل الخروج</span>
                        </Link>
                    </li>


                </ul>
            </div>
        </div>
    )
}

export default ProfileBoxCategories