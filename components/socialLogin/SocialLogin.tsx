"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import facebook from "@/public/assets/images/facebook.svg";
import google from "@/public/assets/images/google.svg";
import TranslateHook from "../translate/TranslateHook";

const SocialLogin = () => {
    const translate = TranslateHook();

    // Handle token extraction and storage
    useEffect(() => {
        // Check if the URL contains a token in the query string
        const queryString = window.location.search;
        if (queryString) {
            const params = new URLSearchParams(queryString);
            const token = params.get("token");

            if (token) {
                // Debugging: Log the token
                console.log("Extracted Token:", token);

                // Store the token securely in cookies
                Cookies.set("access_token", token, { expires: 7, secure: true });

                console.log("Token saved to cookie");

                // Redirect to the desired page
                setTimeout(() => {
                    window.location.href = "https://www.sorooj.org";
                }, 500);
            } else {
                console.error("No token found in the URL.");
            }
        }
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

            <div className="socialLogin w-[95%] md:w-[70%] mx-auto my-6 grid grid-cols-1 md:grid-cols-2 gap-1">
                {/* Facebook Login Button */}
                <div
                    className="bg-[#faf9f6] p-[10px] rounded-[5px] [box-shadow:1px_1px_6px_#ddd] cursor-pointer"
                    onClick={() => handleLogin("facebook")}
                >
                    <div className="flex items-center justify-center text-sm">
                        {translate?.socialLogin.facebook}
                        <Image src={facebook} className="ml-2" width={30} height={30} alt="Facebook icon" />
                    </div>
                </div>

                {/* Google Login Button */}
                <div
                    className="bg-[#faf9f6] p-[10px] rounded-[5px] [box-shadow:1px_1px_6px_#ddd] cursor-pointer"
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