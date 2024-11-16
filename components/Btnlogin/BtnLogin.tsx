'use client'

import React, { useEffect, useState } from 'react';
import LangBtn from '../buttons/LangBtn';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import { useParams } from 'next/navigation';
import en from '@/app/dictionaries/en.json'; // Import English dictionary
import ar from '@/app/dictionaries/ar.json'; // Import Arabic dictionary

const BtnLogin = () => {
    // Access dynamic [lang] parameter
    const { lang }: { lang?: string } = useParams();

    // Default state initialization to avoid rendering blocks
    const [dictionary, setDictionary] = useState(lang === 'ar' ? ar : en);
    const [userName, setUserName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Update dictionary dynamically if `lang` changes
    useEffect(() => {
        setDictionary(lang === 'ar' ? ar : en);
    }, [lang]);

    // Fetch user data and check authentication
    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('access_token'); // Retrieve access token from cookies
            const isVerified = Cookies.get('is_verified') === 'true';

            if (token && isVerified) {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    const user = response.data.data.user; // Extract user details
                    setUserName(user.first_name);
                } catch (error) {
                    console.error('Error fetching user data', error);
                    setUserName(null); // Reset userName if there's an error
                } finally {
                    setLoading(false); // Ensure loading is stopped
                }
            } else {
                setLoading(false); // No token, no loading
            }
        };

        fetchUserData();
    }, []);

    // Render loading placeholder while fetching data
    if (loading) {
        return (
            <div className="m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto">
                <LangBtn />
                <p className="text-white bkMainColor px-[26px] py-[10px] rounded-lg">
                    Loading...
                </p>
            </div>
        );
    }

    // Render final content
    return (
        <div className="m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto">
            <LangBtn />
            {userName ? (
                <a
                    href={`/${lang}/auth/profile`}
                    className="flex text-white bkMainColor px-[26px] py-[10px] rounded-lg"
                >
                    <h1 className="mx-1">
                        {dictionary?.welcome?.welcome || 'Loading...'}
                    </h1>
                    {userName}
                </a>
            ) : (
                <a
                    href={`/${lang}/auth/signin`}
                    className="text-white bkMainColor px-[26px] py-[10px] rounded-lg"
                >
                    <FontAwesomeIcon icon={faUser} className="ml-1" />
                    <span className="mx-1">
                        {dictionary?.authLinks?.login || 'Loading...'}
                    </span>
                </a>
            )}
        </div>
    );
};

export default BtnLogin;




// 'use client'

// import React, { useEffect, useState } from 'react'
// import LangBtn from '../buttons/LangBtn'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import axios from 'axios'
// import Cookies from 'js-cookie'; // Import js-cookie library
// import { useParams } from 'next/navigation'
// import en from '@/app/dictionaries/en.json';  // Import English dictionary
// import ar from '@/app/dictionaries/ar.json';  // Import Arabic dictionary
 
// const BtnLogin = () => {
//     // Access dynamic [lang] parameter
//     const { lang }: { lang?: string } = useParams();
//     const [dictionary, setDictionary] = useState<any>(null);
//    // const [mounted, setMounted] = useState<boolean>(false);

//     const [userName, setUserName] = useState<string | null>(null)
//     const [loading, setLoading] = useState<boolean>(true)


//     // useEffect(() => {
//     //     // Dynamically set the dictionary based on the current language
//     //     if (lang === 'en') {
//     //         setDictionary(en);
//     //     } else if (lang === 'ar') {
//     //         setDictionary(ar);
//     //     }
//     // }, [lang]);

//     useEffect(() => {
//         // This code will run only on the client side
//         const token = Cookies.get('access_token'); // Retrieve access token from cookies
//         const isVerified = Cookies.get('is_verified') === 'true';

//         if (lang === 'en') {
//             setDictionary(en);
//         } else if (lang === 'ar') {
//             setDictionary(ar);
//         }

//         if (token && isVerified) {
//             axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//                 .then(response => {
//                     const user = response.data.data.user; // Destructure user and verification status
//                     setUserName(user.first_name);
//                 })
//                 .catch(error => {
//                     console.error("Error fetching user data", error);
//                     setUserName(null);  // Clear userName on error
//                 })
//                 .finally(() => {
//                     setLoading(false);  // Stop loading once done
//                 })
//         } else {
//             setLoading(false);  // Stop loading if no token
           
//         }
//     }, [lang])

//     // useEffect(() => {
//     //     setMounted(true); // Ensure the component is mounted before accessing params
//     // }, []);

//     // if (!mounted) return null; // Avoid rendering before the component is mounted


//     // if (loading) {
//     //     return (
//     //         <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
//     //             <LangBtn />
//     //             <p className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>Loading.....</p>
//     //         </div>
//     //     )
//     // }
 
//     return (
//         <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
//             <LangBtn />
//             {userName ? (
//                 <a href={`/${lang}/auth/profile`} className='flex text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
//                     <h1 className=' mx-1'> {dictionary ? dictionary.welcome.welcome : "Loading..."} </h1>
//                     {userName}
//                 </a>
//             ) : (
//                 <a href={`/${lang}/auth/signin`} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
//                     <FontAwesomeIcon icon={faUser} className='ml-1' />
//                     <span className='mx-1'>{dictionary ? dictionary.authLinks.login : "Loading..."}</span>
//                 </a>
//             )}
//         </div>
//     )
// }

// export default BtnLogin









