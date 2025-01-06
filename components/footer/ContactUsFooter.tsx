"use client"
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react'; 

interface SocialLinks {
    phones?: any;
    email?: string;
    man?: string;
    women?: string
}
const ContactUsFooter = () => {
    const [contactLinks, setContactLinks] = useState<SocialLinks>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // Simulating fetched data



    useEffect(() => {
        const fetchContactLinks = async () => {
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

        fetchContactLinks();
    }, []);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <h4 className='text-2xl mt-2 lg:mt-0 primaryColor'>تواصل معنا</h4>
            <div className='mt-4 mr-4 text-sm'>

                <div className='mb-2 flex items-center'>

                    <FontAwesomeIcon icon={faWhatsapp} className='ml-2 text-2xl primaryColor' />
                    <span className='mainColor font-semibold'>
                        للرجال :
                        <span className='ml-2 mr-2 '>
                            <Link
                                href={`https://api.whatsapp.com/send?phone=${contactLinks.phones.man}`}
                                target='_blank'
                                title={`تواصل مع ${contactLinks.phones.man}`}
                                rel='nofollow'
                                className='mainColor'
                            >
                                {contactLinks.phones.man}
                            </Link>
                        </span>
                    </span>
                </div>
                <div className='mb-2 flex items-center'>

                    <FontAwesomeIcon icon={faWhatsapp} className='ml-2 text-2xl primaryColor' />
                    <span className='mainColor font-semibold'>
                        للنساء :
                        <span className='ml-2 mr-2 '>
                            <Link
                                href={`https://api.whatsapp.com/send?phone=${contactLinks.phones.women}`}
                                target='_blank'
                                title={`تواصل مع ${contactLinks.phones.women}`}
                                rel='nofollow'
                                className='mainColor'
                            >
                                {contactLinks.phones.women}
                            </Link>
                        </span>
                    </span>
                </div>


                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faEnvelope} className='ml-2 text-2xl primaryColor' />
                    <Link href={`mailto:${contactLinks.email}`} className='mainColor font-semibold' title="" >
                        {contactLinks.email}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactUsFooter;
