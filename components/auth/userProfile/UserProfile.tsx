'use client'
import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import Cookies from "js-cookie" // Import the js-cookie library
import { useParams, useRouter } from 'next/navigation'; // Use useParams for dynamic [lang] segment


const UserProfile = () => {
    const [userName, setUserName] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter(); // Use Next.js router for navigation
    const { lang }: { lang?: string } = useParams(); // Access dynamic [lang] parameter
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        // Get the token from cookies instead of localStorage
        const token = Cookies.get('access_token');
        const isVerified = Cookies.get('is_verified') === 'true';

        // console.log(token , isVerified)
       
        if (token && isVerified) {

            console.log(token , isVerified)
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUserName(response.data.data.user.first_name)
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
            // setLoading(false)  // Stop loading if no token
             // Redirect unverified users or those without a token to the sign-in page
             Cookies.remove('access_token');
             Cookies.remove('is_verified');
             router.push(`/${lang}/auth/signin`);
           
          
        }
    }, [router , lang])

    useEffect(() => {
        setMounted(true); // Ensure the component is mounted before accessing params
    }, []);

    if (!mounted) return null; // Avoid rendering before the component is mounted

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

                window.location.href = `/${lang}`;
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Handle any errors (optional)
        }
    };

    return (
        <div>
             {loading ? (
                <p>Loading.... for test before handle icon loading</p>
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
                            {/* Use the lang value from route params in the link */}
                            <Link href={`/${lang}/auth/update-profile`}>update my profile</Link>
                        </div>
                    ) : (
                        <p>loading...</p>
                    )}
                </>
            )}
        </div>
    )
}

export default UserProfile;