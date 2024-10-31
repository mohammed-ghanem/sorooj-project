"use client"
import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import Cookies from 'js-cookie'; // Import js-cookie library
import Image from 'next/image';
import whiteAuthBk from '@/assets/images/Vector.svg';
import loginauth from '@/assets/images/loginauth.svg';
import flower from '@/assets/images/flower.svg';
import TranslateHook from '../../translate/TranslateHook';
import { useParams } from "next/navigation";

const ChangePassword = () => {
  const [old_password, setOld_password] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { lang }: { lang?: string } = useParams();
  const translate = TranslateHook();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear any previous messages
    setError(null)

    if (password !== password_confirmation) {
      setError("New passwords do not match")
      return
    }

    const token = Cookies.get('access_token'); // Retrieve access token from cookies

    if (!token) {
      setError("User is not authenticated")
      return
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/change-password`, {
        old_password: old_password,
        password: password,
        password_confirmation: password_confirmation
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Use token from cookies
        }
      })

      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: `${translate ? translate.pages.changePassword.titleSwal : "Password Changed !"}`,
        text: `${translate ? translate.pages.changePassword.textSwal : "Your password has been updated successfully, Now login with your new password"}`,
        confirmButtonText: `${translate ? translate.pages.changePassword.ok : "Ok !"}`
      }).then(() => {
        // After closing the SweetAlert, remove the token and redirect to the sign-in page
        Cookies.remove('access_token'); // Remove token from cookies
        window.location.href = "/auth/signin"
      })

    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred while changing the password")
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
              {translate ? translate.pages.changePassword.sendNewPassword : ""}
            </button>
          </form>
        </div>
        <div className="relative hidden lg:block">
          <Image src={whiteAuthBk} className="w-full" height={100} alt="authsvg" />
          <Image src={loginauth} fill className="max-w-[70%] max-h-[50%] m-auto" alt="loginauth" />
        </div>
      </div>
      <div className="absolute w-[424px] h-[300px] -top-[18px] -right-[76px]">
        <Image src={flower} fill alt="flowersvg" />
      </div>
    </div>
  )
}

export default ChangePassword




// "use client"
// import { useState } from "react"
// import axios from "axios"
// import Swal from "sweetalert2"
// import { axiroWithCredentials, axiosDefaultConfig } from "@/app/utils/axiosConfig";

// axiroWithCredentials;
// axiosDefaultConfig;

// const ChangePassword = () => {
//   const [old_password, setOld_password] = useState("")
//   const [password, setPassword] = useState("")
//   const [password_confirmation, setPassword_confirmation] = useState("")
//   const [error, setError] = useState<string | null>(null)

//   const handleChangePassword = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Clear any previous messages
//     setError(null)

//     if (password !== password_confirmation) {
//       setError("New passwords do not match")
//       return
//     }

//     const token = localStorage.getItem('access_token')

//     if (!token) {
//       setError("User is not authenticated")
//       return
//     }

//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/change-password`, {
//         old_password: old_password,
//         password: password,
//         password_confirmation: password_confirmation
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })

//       // Show success message using SweetAlert2
//       Swal.fire({
//         icon: 'success',
//         title: 'Password Changed!',
//         text: 'Your password has been updated successfully. You will now be redirected to the sign-in page.',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         // After closing the SweetAlert, remove the token and redirect to the sign-in page
//         localStorage.removeItem('access_token')
//         window.location.href = "/auth/signin"
//       })

//     } catch (error: any) {
//       setError(error.response?.data?.message || "An error occurred while changing the password")
//     }
//   }

//   return (
//     <div>
//       <h2>Change Password</h2>
//       <form onSubmit={handleChangePassword} className="space-y-4">
//         <div>
//           <label htmlFor="current-password" className="block text-sm font-medium">
//             Current Password
//           </label>
//           <input
//             type="password"
//             id="current-password"
//             value={old_password}
//             onChange={(e) => setOld_password(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="new-password" className="block text-sm font-medium">
//             New Password
//           </label>
//           <input
//             type="password"
//             id="new-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="confirm-password" className="block text-sm font-medium">
//             Confirm New Password
//           </label>
//           <input
//             type="password"
//             id="confirm-password"
//             value={password_confirmation}
//             onChange={(e) => setPassword_confirmation(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         >
//           Change Password
//         </button>
//       </form>
//     </div>
//   )
// }

// export default ChangePassword



