"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

const SocialLogin = () => {
    useEffect(() => {
        console.log("Window location:", window.location.href); // Log full URL
        console.log("Search params:", window.location.search); // Log query string

        const queryString = window.location.search;
        if (queryString) {
            const params = new URLSearchParams(queryString);
            const token = params.get("token");
            console.log("Extracted Token:", token); // Debugging

            if (token) {
                // Decode the token if necessary
                const decodedToken = decodeURIComponent(token);
                console.log("Decoded Token:", decodedToken); // Debugging

                // Store the token in a cookie
                Cookies.set("access_token", decodedToken, { expires: 7, secure: true });
                console.log("Token saved to cookies");

                // Clear query params from the URL
                const cleanUrl = window.location.origin + window.location.pathname;
                window.history.replaceState(null, "", cleanUrl);
            } else {
                console.error("No token found in query params");
            }
        } else {
            console.error("No query string found in URL");
        }
    }, []);

    return null; // This component doesn't render anything visible
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