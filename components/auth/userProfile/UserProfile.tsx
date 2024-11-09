'use client'
import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"
import Cookies from "js-cookie" // Import the js-cookie library
import { useRouter } from 'next/navigation'; // Use useParams for dynamic [lang] segment
import Image from 'next/image';
import flower from '@/assets/images/flower.svg';
import Banners from "@/components/banners/Banners"
import banner from "@/assets/images/books.png"
import ProfileBoxCategories from "../profileBoxCategories/ProfileBoxCategories"
import LangUseParams from "@/components/translate/LangUseParams"


const UserProfile = () => {
    const [userName, setUserName] = useState<string | null>(null)
    const [userLastName, setUserLastName] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [userMobile, setUserMobile] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter(); // Use Next.js router for navigation

    // lang param (ar Or en)
    const lang = LangUseParams() // Access dynamic [lang] parameter


    useEffect(() => {
        // Get the token from cookies instead of localStorage
        const token = Cookies.get('access_token');
        const isVerified = Cookies.get('is_verified') === 'true';

        if (token && isVerified) {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUserName(response.data.data.user.first_name)
                    setUserLastName(response.data.data.user.last_name)
                    setUserEmail(response.data.data.user.email)
                    setUserMobile(response.data.data.user.mobile)
                })
                .catch(error => {
                    console.error('Error fetching profile:', error);
                    setUserName(null);  // Clear userName on error
                    setUserLastName(null)
                })
                .finally(() => {
                    setLoading(false)  // Stop loading once done
                })
        } else {
            // setLoading(false)  // Stop loading if no token
            // Redirect unverified users or those without a token to the sign-in page
            Cookies.remove('access_token');
            Cookies.remove('is_verified');
            router.push(`/${lang}/auth/signin`);
        }
    }, [router, lang])


    return (
        <section>
            <div>
                <Banners src={banner} textPath="حسابى" />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className=" relative">
                    {/* flower img */}
                    <div className=' absolute w-[320px] md:w-[424px] h-[300px] -top-[99px] -right-[76px]'>
                        <Image src={flower} fill alt='flowersvg' />
                    </div>
                    <div className=' absolute w-[320px] md:w-[424px] h-[300px] -bottom-[99px] left-[5px]'>
                        <Image src={flower} fill alt='flowersvg' />
                    </div>
                    {/* flower img */}
                    {userName ? (
                        <div className="container mx-auto w-full md:w-[80%] my-20 grid grid-cols-1 lg:grid-cols-3 gap-2 relative z-50">
                            <div>
                                <ProfileBoxCategories setUserName={setUserName} />
                            </div> 
                            <div className="col-span-2">
                                {/* <h2 className="w-[fit-content] p-[10px] rounded-[6px] bkMainColor text-white font-bold">
                                    اهلا بك {userName} {userLastName}
                                </h2> */} 
   
                                <div className="userBoxDetails w-[95%] mx-auto rounded-[6px] mt-4 p-4 bkBox">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="mainColor">الاسم الاول : </label>
                                            <p className="bg-[#fff] p-[10px] rounded-[4px]  mt-2">{userName}</p>
                                        </div>
                                        <div>
                                            <label className="mainColor">الاسم الاخير : </label>
                                            <p className="bg-[#fff] p-[10px] rounded-[4px]  mt-2">{userLastName}</p>
                                        </div>
                                    </div> 
                                    <div className="mt-2">
                                        <label className="mainColor"> البريد الالكترونى : </label>
                                        <p className="bg-[#fff] p-[10px]  rounded-[4px] mt-2">{userEmail}</p>
                                    </div>
                                    <div className="mt-2">
                                        <label className="mainColor">  رقم الهاتف : </label>
                                        <p className="bg-[#fff] p-[10px]  rounded-[4px] mt-2">{userMobile}</p>
                                    </div>

                                    {/* change password */}
                                    <div className="grid grid-cols-2 gap-2 mt-5">
                                        <Link className="text-white bkMainColor w-[fit-content] px-[20px] py-[10px] rounded-[6px]" href={`/${lang}/auth/update-profile`}>
                                            تعديل البيانات
                                        </Link>
                                        {/* <Link className="text-white bkMainColor w-[fit-content] px-[20px] py-[10px] rounded-[6px]" href={`/${lang}/auth/change-password`} >
                                            تغيير كلمة المرور
                                        </Link> */}
                                    </div>
                                </div>


                                {/* <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                >
                                    Logout
                                </button> */}

                            </div>
                        </div>
                    ) : (
                        <p>error to fetch the api data please try again later</p>
                    )}
                </div>
            )}
        </section>
    )
}

export default UserProfile;