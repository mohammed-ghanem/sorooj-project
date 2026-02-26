'use client';

import { faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import LangBtn from '../buttons/LangBtn';
import LangUseParams from '../translate/LangUseParams';
import TranslateHook from '../translate/TranslateHook';

const BtnLogin = () => {
    const lang = LangUseParams()
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication status
    const [isLoading, setIsLoading] = useState(true); // Tracks loading state
    const translate = TranslateHook();

    useEffect(() => {
        const checkAuthStatus = async () => {
            // Simulate async behavior with a timeout
            await new Promise(resolve => setTimeout(resolve, 2000));

            const accessToken = Cookies.get('access_token');
            const isVerified = Cookies.get('is_verified');

            if (accessToken && isVerified) {
                setIsAuthenticated(true);
            }
            setIsLoading(false); // Set loading to false after checking
        };

        checkAuthStatus();
    }, [lang, router]);

    return (
        <div className='m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto'>
            <LangBtn />
            <a
                href={(isAuthenticated ? `/${lang}/auth/profile` : `/${lang}/auth/signin`)}
                className="text-white bkMainColor px-[26px] py-[10px] rounded-lg"
            >
                <FontAwesomeIcon icon={faUser} className="ml-1" />
                <span className="mx-1">
                    {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin className="ml-1" />
                    ) : isAuthenticated ? (
                        `${translate ? translate.pages.userProfile.title : "حسابى"}`
                    ) : (
                        `${translate ? translate.pages.signin.loginButton : "تسجيل الدخول"}`
                    )}
                </span>
            </a>
        </div>
    );
};

export default BtnLogin;