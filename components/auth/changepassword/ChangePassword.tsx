"use client"
import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import Cookies from 'js-cookie'; // Import js-cookie library
import Image from 'next/image';
import whiteAuthBk from '@/public/assets/images/Vector.svg';
import loginauth from '@/public/assets/images/loginauth.svg';
import TranslateHook from '../../translate/TranslateHook';
import LangUseParams from "@/components/translate/LangUseParams"
import { z } from "zod";
import FlowerImg from "@/components/flowerImg/FlowerImg";

// Define the Zod schema for strong password validation

const errorMessage = "Password must be at least 8 characters contain uppercase & lowercase letter & at least 1 number /[0-9]/ with at least 1 special character /[@$!%*?&]/ "

const changePasswordSchema = z.object({

  old_password: z.string(),
  password: z
    .string()
    .min(8, errorMessage)
    .regex(/[A-Z]/, errorMessage)
    .regex(/[a-z]/, errorMessage)
    .regex(/[0-9]/, errorMessage)
    .regex(/[@$!%*?&]/, errorMessage),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "confirm password do not match with new password please try again",
  path: ["password_confirmation"],
});

const ChangePassword = () => {
  const [old_password, setOld_password] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [error, setError] = useState<string | null>(null)
  // lang param (ar Or en)
  const lang = LangUseParams() // Access dynamic [lang] parameter
  const translate = TranslateHook();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)  // Clear any previous messages

    // Validate form values using the Zod schema
    const result = changePasswordSchema.safeParse({
      old_password,
      password,
      password_confirmation
    });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const token = Cookies.get('access_token'); // Retrieve access token from cookies

    if (!token) {
      setError("User is not authenticated");
      return;
    }

    // Show loading alert
    Swal.fire({
      title: `${translate ? translate.pages.changePassword.loadingTitle : "Please wait..."}`,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/change-password`, {
        old_password: old_password,
        password: password,
        password_confirmation: password_confirmation
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Close loading and show success alert
      // Close the loading state
      Swal.close();
      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: `${translate ? translate.pages.changePassword.titleSwal : ""}`,
        text: `${translate ? translate.pages.changePassword.textSwal : ""}`,
        confirmButtonText: `${translate ? translate.pages.changePassword.ok : ""}`
      }).then(() => {
        // After closing the SweetAlert, remove the token and redirect to the sign-in page
        Cookies.remove('access_token');
        window.location.href = "/auth/signin";
      });

    } catch (error: any) {
      Swal.close(); // Close the loading state if an error occurs
      setError(error.response?.data?.message || "An error occurred while changing the password");
    }
  }

  return (
    <div className="relative grdianBK overflow-hidden" style={{ direction: "rtl" }}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <div className="my-10" style={{ direction: "ltr" }}>
          <div>
            <h1 className="text-center font-bold text-2xl md:text-4xl mainColor">
              {translate ? translate.pages.changePassword.title : ""}
            </h1>
            <p className="text-center mt-3 mainColor text-lg md:text-2xl">
              {translate ? translate.pages.changePassword.titleDescription : ""}
            </p>
          </div>
          <form onSubmit={handleChangePassword}
            className="p-4 w-[95%] md:w-[80%] mx-auto z-50 relative my-6">
            <div>
              <label
                className={`block text-sm font-bold leading-6 mainColor mb-2
                            ${lang === "en" ? 'text-start' : 'text-end'}`}>
                {translate ? translate.pages.changePassword.oldPassword : ""}
              </label>
              <input
                type="password"
                value={old_password}
                onChange={(e) => setOld_password(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                required
              />
            </div>
            <div className=" my-2">
              <label
                className={`block text-sm font-bold leading-6 mainColor mb-2
                            ${lang === "en" ? 'text-start' : 'text-end'}`}>
                {translate ? translate.pages.changePassword.newPassword : ""}
              </label>
              <input
                type="password"
                id="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                required
              />
            </div>
            <div>
              <label
                className={`block text-sm font-bold leading-6 mainColor mb-2
                            ${lang === "en" ? 'text-start' : 'text-end'}`}>
                {translate ? translate.pages.changePassword.confirmNewPassword : ""}
              </label>
              <input
                type="password"
                id="confirm-password"
                value={password_confirmation}
                onChange={(e) => setPassword_confirmation(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bkPrimaryColor text-white font-light py-3 px-4 mt-5 rounded-lg"
            >
              {translate ? translate.pages.changePassword.sendNewPassword : "send"}
            </button>
          </form>
        </div>
        <div className="relative hidden lg:block">
          <Image src={whiteAuthBk} className="w-full" height={100} alt="authsvg" />
          <Image src={loginauth} fill className="max-w-[70%] max-h-[50%] m-auto" alt="loginauth" />
        </div>
      </div>
      <FlowerImg />
    </div>
  )
}

export default ChangePassword;









// "use client"
// import { useState } from "react"
// import axios from "axios"
// import Swal from "sweetalert2"
// import Cookies from 'js-cookie'; // Import js-cookie library
// import Image from 'next/image';
// import whiteAuthBk from '@/assets/images/Vector.svg';
// import loginauth from '@/assets/images/loginauth.svg';
// import flower from '@/assets/images/flower.svg';
// import TranslateHook from '../../translate/TranslateHook';
// import { useParams } from "next/navigation";

// const ChangePassword = () => {
//   const [old_password, setOld_password] = useState("")
//   const [password, setPassword] = useState("")
//   const [password_confirmation, setPassword_confirmation] = useState("")
//   const [error, setError] = useState<string | null>(null)
//   const { lang }: { lang?: string } = useParams();
//   const translate = TranslateHook();

//   const handleChangePassword = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Clear any previous messages
//     setError(null)

//     if (password !== password_confirmation) {
//       setError("New passwords do not match")
//       return
//     }

//     const token = Cookies.get('access_token'); // Retrieve access token from cookies

//     if (!token) {
//       setError("User is not authenticated")
//       return
//     }

//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/change-password`, {
//         old_password: old_password,
//         password: password,
//         password_confirmation: password_confirmation
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}` // Use token from cookies
//         }
//       })

//       // Show success message using SweetAlert2
//       Swal.fire({
//         icon: 'success',
//         title: `${translate ? translate.pages.changePassword.titleSwal : "Password Changed !"}`,
//         text: `${translate ? translate.pages.changePassword.textSwal : "Your password has been updated successfully, Now login with your new password"}`,
//         confirmButtonText: `${translate ? translate.pages.changePassword.ok : "Ok !"}`
//       }).then(() => {
//         // After closing the SweetAlert, remove the token and redirect to the sign-in page
//         Cookies.remove('access_token'); // Remove token from cookies
//         window.location.href = "/auth/signin"
//       })

//     } catch (error: any) {
//       setError(error.response?.data?.message || "An error occurred while changing the password")
//     }
//   }

//   return (
//     <div className="relative grdianBK overflow-hidden" style={{ direction: "rtl" }}>
//       <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
//         <div className="my-10" style={{ direction: "ltr" }}>
//           <div>
//             <h1 className="text-center font-bold text-2xl md:text-4xl mainColor">
//               {translate ? translate.pages.changePassword.title : ""}
//             </h1>
//             <p className="text-center mt-3 mainColor text-lg md:text-2xl">
//               {translate ? translate.pages.changePassword.titleDescription : ""}
//             </p>
//           </div>
//           <form onSubmit={handleChangePassword}
//             className="p-4 w-[95%] md:w-[80%] mx-auto z-50 relative my-6">
//             <div>
//               <label
//                 className={`block text-sm font-bold leading-6 mainColor mb-2
//                             ${lang === "en" ? 'text-start' : 'text-end'}`}>
//                 {translate ? translate.pages.changePassword.oldPassword : ""}
//               </label>
//               <input
//                 type="password"
//                 value={old_password}
//                 onChange={(e) => setOld_password(e.target.value)}
//                 className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
//                 required
//               />
//             </div>
//             <div className=" my-2">
//               <label
//                 className={`block text-sm font-bold leading-6 mainColor mb-2
//                             ${lang === "en" ? 'text-start' : 'text-end'}`}>
//                 {translate ? translate.pages.changePassword.newPassword : ""}
//               </label>
//               <input
//                 type="password"
//                 id="new-password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 className={`block text-sm font-bold leading-6 mainColor mb-2
//                             ${lang === "en" ? 'text-start' : 'text-end'}`}>
//                 {translate ? translate.pages.changePassword.confirmNewPassword : ""}
//               </label>
//               <input
//                 type="password"
//                 id="confirm-password"
//                 value={password_confirmation}
//                 onChange={(e) => setPassword_confirmation(e.target.value)}
//                 className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
//                 required
//               />
//             </div>
//             {error && <p className="text-red-500">{error}</p>}
//             <button
//               type="submit"
//               className="w-full bkPrimaryColor text-white font-light py-3 px-4 mt-5 rounded-lg"
//             >
//               {translate ? translate.pages.changePassword.sendNewPassword : ""}
//             </button>
//           </form>
//         </div>
//         <div className="relative hidden lg:block">
//           <Image src={whiteAuthBk} className="w-full" height={100} alt="authsvg" />
//           <Image src={loginauth} fill className="max-w-[70%] max-h-[50%] m-auto" alt="loginauth" />
//         </div>
//       </div>
//       <div className="absolute w-[424px] h-[300px] -top-[18px] -right-[76px]">
//         <Image src={flower} fill alt="flowersvg" />
//       </div>
//     </div>
//   )
// }

// export default ChangePassword



