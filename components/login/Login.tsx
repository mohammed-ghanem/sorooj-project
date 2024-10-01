'use client'

import React, { useEffect, useState } from 'react'
import LangBtn from '../buttons/LangBtn'
import Link from 'next/link'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Cookies from 'js-cookie'; // Import js-cookie library

const Login = ({ language }: any) => {
   
    const [userName, setUserName] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        // This code will run only on the client side
        const token = Cookies.get('access_token'); // Retrieve access token from cookies

        if (token) {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    const user = response.data.data.user; // Destructure user and verification status
                    const isVerified = response.data.data.user.is_verified;
                    if (!isVerified) {
                        // Clear the access_token from cookies if the user is not verified
                        Cookies.remove('access_token');
                        setUserName(null); // Reset userName
                    } else {
                        setUserName(user.name); // Set userName if verified
                    }
                })
                .catch(error => {
                    console.error("Error fetching user data", error);
                    Cookies.remove('access_token'); // Clear access_token on error
                    setUserName(null);  // Clear userName on error
                })
                .finally(() => {
                    setLoading(false);  // Stop loading once done
                })
        } else {
            setLoading(false);  // Stop loading if no token
        }
    }, [])

    if (loading) {
        return (
            <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
                <LangBtn />
                <p className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>Loading...</p>
            </div>
        )
    }

    return (
        <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
            <LangBtn />
            {userName ? (
                <Link href={`${language}/auth/profile`} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
                    Welcome, {userName}
                </Link>
            ) : (
                <Link href={`/auth/signin`} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
                    <FontAwesomeIcon icon={faUser} className='ml-1' />
                    Login
                </Link>
            )}
        </div>
    )
}

export default Login



// 'use client'

// import React, { useEffect, useState } from 'react'
// import LangBtn from '../buttons/LangBtn'
// import Link from 'next/link'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import axios from 'axios'
// import Cookies from 'js-cookie'; // Import js-cookie library

// const Login = () => {
//     const [userName, setUserName] = useState<string | null>(null)
//     const [loading, setLoading] = useState<boolean>(true)

//     useEffect(() => {
//         // This code will run only on the client side
//         const token = Cookies.get('access_token'); // Retrieve access token from cookies

//         if (token) {
//             axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//                 .then(response => {
//                     setUserName(response.data.data.user.name)
//                 })
//                 .catch(error => {
//                     // console.error("Error fetching user data", error)
//                     setUserName(null)  // Clear userName on error
//                 })
//                 .finally(() => {
//                     setLoading(false)  // Stop loading once done
//                 })
//         } else {
//             setLoading(false)  // Stop loading if no token
//         }
//     }, [])

//     if (loading) {
//         return (
//             <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
//                 <LangBtn />
//                 <p className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>Loading...</p>
//             </div>
//         )
//     }

//     return (
//         <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
//             <LangBtn />
//             {userName ? (
//                 <Link href={'/auth/profile'} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
//                     Welcome, {userName}
//                 </Link>
//             ) : (
//                 <Link href={"/auth/signin"} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
//                     <FontAwesomeIcon icon={faUser} className='ml-1' />
//                     Login
//                 </Link>
//             )}
//         </div>
//     )
// }

// export default Login



// 'use client'

// import React, { useEffect, useState } from 'react'
// import LangBtn from '../buttons/LangBtn'
// import Link from 'next/link'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import axios from 'axios'


// const Login = () => {
//     const [userName, setUserName] = useState<string | null>(null)
//     const [loading, setLoading] = useState<boolean>(true)

//     useEffect(() => {
//         // This code will run only on the client side
//         const token = localStorage.getItem('access_token')

//         if (token) {
//             axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//                 .then(response => {
//                     setUserName(response.data.data.user.name)
//                 })
//                 .catch(error => {
//                     // console.error("Error fetching user data", error)
//                     setUserName(null)  // Clear userName on error
//                 })
//                 .finally(() => {
//                     setLoading(false)  // Stop loading once done
//                 })
//         } else {
//             setLoading(false)  // Stop loading if no token
//         }
//     }, [])



//     if (loading) {
//         return (
//             <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
//                 <LangBtn />
//                 <p className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>Loading...</p>
//             </div>
//         )
//     }

//     return (
//         <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
//             <LangBtn />
//             {userName ? (
//                 <Link href={'/auth/profile'} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg' >
//                     Welcome, {userName}

//                 </Link>
//             ) : (
//                 <Link href={"/auth/signin"} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
//                     <FontAwesomeIcon icon={faUser} className='ml-1' />
//                     Login
//                 </Link>
//             )}
//         </div>
//     )
// }

// export default Login









