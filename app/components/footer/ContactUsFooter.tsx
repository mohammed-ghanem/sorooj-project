import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const ContactUsFooter = () => {
    // Simulating fetched data
    const fakeData = [
        { title: 'للرجال', phone: '966555555555' },
        { title: 'للنساء', phone: '96644444444' },
    ];
    const websiteEmail = {
        email: 'contact@example.com',
    }

    return (
        <div>
            <h4 className='text-2xl mt-2 lg:mt-0'>تواصل معنا</h4>
            <div className='mt-4 mr-4'>
                {fakeData.map((contact, index) => (
                    <div key={index} className='mb-2 flex items-center'>

                        <FontAwesomeIcon icon={faWhatsapp} className='ml-2 text-2xl' />
                        <span>
                            {contact.title} :
                            <span className='ml-2 mr-2'>
                                <Link
                                    href={`https://api.whatsapp.com/send?phone=${contact.phone}`}
                                    target='_blank'
                                    title={`تواصل مع ${contact.title}`}
                                    rel='nofollow'
                                >
                                    {contact.phone}
                                </Link>
                            </span>
                        </span>
                    </div>
                ))}

                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faEnvelope} className='ml-2 text-2xl' />
                    <Link href={`mailto:${websiteEmail.email}`} title="" >
                        {websiteEmail.email}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactUsFooter;
