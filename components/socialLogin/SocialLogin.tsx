"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import facebook from "@/public/assets/images/facebook.svg";
import google from "@/public/assets/images/google.svg";
import TranslateHook from "../translate/TranslateHook";

const SocialLogin = () => {
    const translate = TranslateHook();

    // Function to extract token from the URL and store it in cookies
    const handleToken = () => {
        // Check if the URL contains a token in the query string
        const queryString = window.location.search;
        if (queryString) {
            const params = new URLSearchParams(queryString);
            const token = params.get("token");

            if (token) {
                // console.log("Extracted Token:", token); // Debugging: Log the token

                // Store the token securely in cookies
                Cookies.set("access_token", token, { expires: 7, secure: true });
                Cookies.set("is_verified", "true", { expires: 7, secure: true });
                // console.log("Token saved to cookies"); // Debugging

                // Clear the query string from the URL
                // const cleanUrl = window.location.origin + window.location.pathname;
                // window.history.replaceState(null, "", cleanUrl);
                window.location.href = "https://www.sorooj.org"

                return true; // Indicate token was processed
            }
        }
        return false; // Indicate no token was found
    };

    useEffect(() => {
        // Call the token handling function
        handleToken();
    }, []);

    // Handle social login redirection
    const handleLogin = (provider: string) => {
        const baseUrl = "https://dashboard.sorooj.org/client-api/v1/auth";
        const redirectUrl = `${baseUrl}/${provider}/redirect`;

        // Redirect the user to the provider's login page
        window.location.href = redirectUrl;
    };

    return (
        <div className="text-center">
            <p className="text-gray-300">
                ــــــــــــــــــــــــــــــــــــــــــ
                <span className="mainColor mx-2">{translate?.socialLogin.or}</span>
                ــــــــــــــــــــــــــــــــــــــــــ
            </p>

            <div className="socialLogin w-[95%]  md:w-[50%] mx-auto my-6 grid grid-cols-1 md:grid-cols-1 gap-1  relative z-30">
                {/* Facebook Login Button */}
                {/* <div
                    className="bg-[#faf9f6] p-[10px] rounded-[5px] [box-shadow:1px_1px_6px_#ddd] cursor-pointer"
                    onClick={() => handleLogin("facebook")}
                >
                    <div className="flex items-center justify-center text-sm">
                        {translate?.socialLogin.facebook}
                        <Image src={facebook} className="ml-2" width={30} height={30} alt="Facebook icon" />
                    </div>
                </div> */}

                {/* Google Login Button */}
                <div
                    className="bg-[#faf9f6] flex p-[10px] rounded-[5px] [box-shadow:1px_1px_6px_#ddd] justify-center cursor-pointer"
                    onClick={() => handleLogin("google")}
                >
                    <div className="flex items-center justify-center text-sm">
                        {translate?.socialLogin.google}
                        <Image src={google} className="ml-2" width={30} height={30} alt="Google icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;









// "use client";
// import facebook from "@/public/assets/images/facebook.svg";
// import google from "@/public/assets/images/google.svg";
// import Image from "next/image";
// import TranslateHook from "../translate/TranslateHook";

// const SocialLogin = () => {
//      const translate = TranslateHook();
//     return (
//         <div className="text-center">
//             <p className="text-gray-300">
//                 ــــــــــــــــــــــــــــــــــــــــــ
//                 <span className="mainColor mx-2">{translate ? translate.socialLogin.or : ""}</span>
//                 ــــــــــــــــــــــــــــــــــــــــــ
//             </p>
//             <div className="socialLogin w-[95%] md:w-[70%] mx-auto my-6 grid grid-cols-1 md:grid-cols-2 gap-1">
//                 <div className="bg-[#faf9f6] p-[10px] rounded-[5px] [box-shadow:1px_1px_6px_#ddd]">
//                     <a href="#" className="flex items-center justify-center text-sm">
//                         {translate ? translate.socialLogin.facebook : ""}
//                         <Image src={facebook} className="ml-2" width={30} height={30} alt="facebook icon" />
//                     </a>
//                 </div>
//                 <div className="bg-[#faf9f6] p-[10px] rounded-[5px] [box-shadow:1px_1px_6px_#ddd]">
//                     <a href={''} className="flex items-center justify-center">
//                         {translate ? translate.socialLogin.google : ""}
//                         <Image src={google} className="ml-2" width={30} height={30} alt="google icon" />
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SocialLogin;









// import facebook from '@/public/assets/images/facebook.svg'
// import google from '@/public/assets/images/google.svg'
// import Image from 'next/image' 
// import TranslateHook from '../translate/TranslateHook';




// const SocialLogin = () => {

//     const translate = TranslateHook();


//     return (
//         <div className='text-center'>
//             <p className='text-gray-300'>
//                 ــــــــــــــــــــــــــــــــــــــــــ
//                 <span className='mainColor mx-2'> {translate ? translate.socialLogin.or : ""}</span>
//                 ــــــــــــــــــــــــــــــــــــــــــ
//             </p>
//             <div className='socialLogin w-[95%] md:w-[70%] mx-auto my-6 grid grid-cols-1 md:grid-cols-2 gap-1'>
//                 <div className='bg-[#faf9f6] p-[10px] rounded-[5px] [box-shadow:1px_1px_6px_#ddd]'>
//                     <a href={`#`} className='flex items-center justify-center text-sm'>
//                         {translate ? translate.socialLogin.facebook : ""}
//                         <Image src={facebook} className='ml-2' width={30} height={30} alt="facebook icon" />
//                     </a>
//                 </div>
//                 <div className='bg-[#faf9f6] p-[10px] rounded-[5px] [box-shadow:1px_1px_6px_#ddd]'>
//                     <a href={`#`} className='flex items-center justify-center'>
//                         {translate ? translate.socialLogin.google : ""}
//                         <Image src={google} className='ml-2' width={30} height={30} alt="google icon" />
//                     </a>

//                 </div>
//             </div>
//         </div>
//     )
// }
// export default SocialLogin