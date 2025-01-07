'use client'
import axios from 'axios';
import FastLinksFooter from './FastLinksFooter'
import ContactUsFooter from './ContactUsFooter'
import React, { useEffect, useState } from 'react';
import TranslateHook from '../translate/TranslateHook';


interface AboutFooter {
    aboutCenterHome?: any;
}
const LastFooter = () => {
    const [contactLinks, setContactLinks] = useState<AboutFooter>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const translate = TranslateHook();


    useEffect(() => {
        const fetchAboutFooter = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/static-pages/social-contacts`,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    });
                setContactLinks(response.data.data);
            } catch (err) {
                setError("Failed to fetch social media links. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAboutFooter();
    }, []);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    return (
        <div className='mt-8 relative z-10 pb-8'>
            <div className=" container mx-auto row grid grid-cols-1 lg:grid-cols-3">
                <div className='text-white mr-2 md:mr-9'>
                    <h4 className='text-2xl mt-1 lg:mt-0 primaryColor'>
                        {translate ? translate.pages.homePage.footer.aboutCenter : ""}
                    </h4>
                    <p className='mr-4 mt-8 leading-[2.0] mainColor font-semibold text-xs text-right'>
                        {contactLinks ? contactLinks.aboutCenterHome : ""}
                    </p>
                </div>
                <div className='text-white mr-2 md:mr-9'>
                    <FastLinksFooter />
                </div>
                <div className='text-white mr-2 md:mr-9'>
                    <ContactUsFooter />
                </div>
                <div itemScope itemType="https://schema.org/Organization"></div>
            </div>
        </div>
    )
}

export default LastFooter