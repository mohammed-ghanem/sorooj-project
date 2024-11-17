'use client';

import React, { useEffect, useState } from 'react';
import LangBtn from '../buttons/LangBtn';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';

const BtnLogin = () => {
    const { lang }: { lang?: string } = useParams();
    const [dictionary, setDictionary] = useState<any>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Dynamically import the dictionaries based on language
    useEffect(() => {
        const loadDictionary = async () => {
            try {
                if (lang === 'ar') {
                    const arDict = await import('@/app/dictionaries/ar.json');
                    setDictionary(arDict.default);
                } else {
                    const enDict = await import('@/app/dictionaries/en.json');
                    setDictionary(enDict.default);
                }
            } catch (error) {
                console.error('Error loading .. dictionary:', error);
            }
        };

        loadDictionary();
    }, [lang]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('access_token');
            const isVerified = Cookies.get('is_verified') === 'true';

            if (token && isVerified) {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    const user = response.data.data.user;
                    setUserName(user.first_name);
                } catch (error) {
                    console.error('Error fetching user data', error);
                    setUserName(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);


    return (
        <div className="m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto">
            <LangBtn />
            {userName ? (
                <a
                    href={`/${lang}/auth/profile`}
                    className="flex text-white bkMainColor px-[26px] py-[10px] rounded-lg"
                >
                    <h1 className="mx-1">{dictionary.welcome.welcome}</h1>
                    {userName}
                </a>
            ) : (
                <a
                    href={`/${lang}/auth/signin`}
                    className="text-white bkMainColor px-[26px] py-[10px] rounded-lg"
                >
                    <FontAwesomeIcon icon={faUser} className="ml-1" />
                    <span className='mx-1'>{dictionary ? dictionary.authLinks.login : "Loading..."}</span>
                </a>
            )}
        </div>
    );
};

export default BtnLogin;

















// 'use client'

// import React, { useEffect, useState, Suspense } from 'react'
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
//     // const [mounted, setMounted] = useState<boolean>(false);

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
//         <Suspense fallback={<div>Loading sus......</div>}>
//             <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
//                 <LangBtn />
//                 {userName ? (
//                     <a href={`/${lang}/auth/profile`} className='flex text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
//                         <h1 className=' mx-1'> {dictionary ? dictionary.welcome.welcome : "Loading..."} </h1>
//                         {userName}
//                     </a>
//                 ) : (
//                     <a href={`/${lang}/auth/signin`} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
//                         <FontAwesomeIcon icon={faUser} className='ml-1' />
//                         <span className='mx-1'>{dictionary ? dictionary.authLinks.login : "Loading..."}</span>
//                     </a>
//                 )}
//             </div>
//         </Suspense>

//     )
// }

// export default BtnLogin









