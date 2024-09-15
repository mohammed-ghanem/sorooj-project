"use client"
import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"

const UserProfile = () => {
    const [userName, setUserName] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        if (token) {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUserName(response.data.data.user.name)
                    setUserEmail(response.data.data.user.email)
                })
                .catch(error => {
                    setUserName(null)  // Clear userName on error
                })
                .finally(() => {
                    setLoading(false)  // Stop loading once done
                })
        } else {
            setLoading(false)  // Stop loading if no token
        }
    }, [])

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('access_token')  // Remove the token from localStorage
        setUserName(null)  // Clear user info
        setUserEmail(null)
        window.location.href = "/"
    }

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
                                </Link>    
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <p>No user data available</p>
                    )}
                </>
            )}
        </div>
    )
}

export default UserProfile
