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
//         const token = localStorage.getItem('accessToken')

//         if (token) {
//             axios.get('http://localhost:5005/me', { headers: { Authorization: `Bearer ${token}` } })
//                 .then(response => {
//                     setUserName(response.data.name)
//                 })
//                 .catch(error => {
//                     console.error("Error fetching user data", error)
//                     setUserName(null)
//                 })
//                 .finally(() => {
//                     setLoading(false)
//                 })
//         } else {
//             setLoading(false)
//         }
//     }, [])

//     // During loading or if userName is null, show appropriate content
//     if (loading) {
//         return <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
//             <LangBtn />
//             <p className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>Loading...</p>
//         </div>
//     }

//     return (
//         <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
//             <LangBtn />
//             {userName ? (
//                 <span className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
//                     {userName}
//                 </span>
//             ) : (
//                 <Link href={"/signin"} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
//                     <FontAwesomeIcon icon={faUser} className='ml-1' />
//                     login
//                 </Link>
//             )}
//         </div>
//     )
// }

// export default Login



// // 'use client'

// // import React from 'react'
// // import LangBtn from '../buttons/LangBtn'
// // import Link from 'next/link'
// // import { faUser } from '@fortawesome/free-solid-svg-icons'
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import UserProfile from '../userProfile/UserProfile'

// // const Login = () => {
// //     // Check if accessToken exists
// //     const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
// //     const isLoggedIn = !!token

// //     return (
// //         <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
// //             <LangBtn />
// //             {isLoggedIn ? (
// //                 <span className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
// //                     {/* Display user's name or other user-specific information here if available */}
// //                     <UserProfile />
// //                 </span>
// //             ) : (
// //                 <Link href={"/signin"} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
// //                     <FontAwesomeIcon icon={faUser} className='ml-1' />
// //                     login
// //                 </Link>
// //             )}
// //         </div>
// //     )
// // }

// // export default Login






'use client'

import React from 'react'
import LangBtn from '../buttons/LangBtn'
import Link from 'next/link'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = () => {
    // This will only run on the client side
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    const isLoggedIn = !!token

    return (
        <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
            <LangBtn />
            {isLoggedIn ? (
                <span className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
                    {/* Display user's name or other user-specific information here if available */}
                    Welcome
                </span>
            ) : (
                <Link href={"/signin"} className='text-white bkMainColor px-[26px] py-[10px] rounded-lg'>
                    <FontAwesomeIcon icon={faUser} className='ml-1' />
                    login
                </Link>
            )}
        </div>
    )
}

export default Login
