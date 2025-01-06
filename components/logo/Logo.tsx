'use client'
import Image from "next/image"
import logo from "@/public/assets/images/logo.png"
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Logo {
    logo?: any;
}
const Logo = () => {
    const [logoImage, setLogoImage] = useState<Logo>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchLogoImage = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/static-pages/social-contacts`,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    });
                setLogoImage(response.data);
            } catch (err) {
                setError("Failed to fetch logo");
            } finally {
                setLoading(false);
            }
        };

        fetchLogoImage();
    }, []);
    if (loading) {
        return <p className=" w-48 h-40 relative m-auto"> </p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    return (
        <Link href={'/'} className=" w-48 h-40 relative m-auto">
            <Image fill src={logoImage.logo} alt="logo" />
        </Link>
    )
}

export default Logo