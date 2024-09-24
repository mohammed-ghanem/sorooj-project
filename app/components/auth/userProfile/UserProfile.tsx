"use client"
import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import Cookies from "js-cookie"  // Import the js-cookie library

const UserProfile = () => {
    const [userName, setUserName] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        // Get the token from cookies instead of localStorage
        const token = Cookies.get('access_token');

        if (token) {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUserName(response.data.data.user.name)
                    setUserEmail(response.data.data.user.email)
                })
                .catch(error => {
                    console.error('Error fetching profile:', error);
                    setUserName(null);  // Clear userName on error
                })
                .finally(() => {
                    setLoading(false)  // Stop loading once done
                })
        } else {
            setLoading(false)  // Stop loading if no token
        }
    }, [])

    // Logout handler
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
                setUserEmail(null);

                await Swal.fire({
                    icon: 'success',
                    title: 'Logged out!',
                    text: 'You have been successfully logged out.',
                    confirmButtonText: 'OK',
                });

                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Handle any errors (optional)
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {userName ? (
                        <div>
                            <h2>Welcome, {userName}</h2>
                            <p>Email: {userEmail}</p>
                            <Link href={"/auth/change-password"} >
                                change password
                            </Link>    
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Logout
                            </button>
                            <Link href={"/auth/update-profile"}>update my profile</Link>
                        </div>
                    ) : (
                        <p>loading...</p>
                    )}
                </>
            )}
        </div>
    )
}

export default UserProfile

// "use client"
// import axios from "axios"
// import Link from "next/link"
// import { useState, useEffect } from "react"
// import Swal from "sweetalert2"

// const UserProfile = () => {
//     const [userName, setUserName] = useState<string | null>(null)
//     const [userEmail, setUserEmail] = useState<string | null>(null)
//     const [loading, setLoading] = useState<boolean>(true)

//     useEffect(() => {
//         const token = localStorage.getItem('access_token')

//         if (token) {
//             axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//                 .then(response => {
//                     setUserName(response.data.data.user.name)
//                     setUserEmail(response.data.data.user.email)
//                 })
//                 .catch(error => {
//                     setUserName(null)  // Clear userName on error
//                 })
//                 .finally(() => {
//                     setLoading(false)  // Stop loading once done
//                 })
//         } else {
//             setLoading(false)  // Stop loading if no token
//         }
//     }, [])

//     // Logout handler
//     const handleLogout = async () => {
//         try {
//             // Show SweetAlert2 confirmation dialog
//             const result = await Swal.fire({
//               title: 'Are you sure?',
//               text: "You will be logged out from your account!",
//               icon: 'warning',
//               showCancelButton: true,
//               confirmButtonText: 'Yes, logout!',
//               cancelButtonText: 'Cancel',
//             });
        
//             // If user confirms logout
//             if (result.isConfirmed) {
//               // Make a POST request to the logout API endpoint
//               const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/logout`, {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Add token for authorization
//                 },
//               });
        
//               if (!response.ok) {
//                 throw new Error('Failed to logout');
//               }
        
//               // If logout is successful, remove the token and clear user info
//               localStorage.removeItem('access_token');
//               setUserName(null);  // Clear user info
//               setUserEmail(null);
        
//               // Show SweetAlert2 success alert
//               await Swal.fire({
//                 icon: 'success',
//                 title: 'Logged out!',
//                 text: 'You have been successfully logged out.',
//                 confirmButtonText: 'OK',
//               });
        
//               // Redirect to the home page
//               window.location.href = '/';
//             }
//           } catch (error) {
//             console.error('Logout error:', error);
//             // Handle any errors (optional)
//           }
//       };
      

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     {userName ? (
//                         <div>
//                             <h2>Welcome, {userName}</h2>
//                                 <p>Email: {userEmail}</p>
//                                 <Link href={"/auth/change-password"} >
//                                     change password
//                                 </Link>    
//                             <button
//                                 onClick={handleLogout}
//                                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
//                             >
//                                 Logout
//                                 </button>
//                             <Link href={"/auth/update-profile"}>update my profile</Link>
//                         </div>
//                     ) : (
//                         <p>loading...</p>
//                     )}
//                 </>
//             )}
//         </div>
//     )
// }

// export default UserProfile
