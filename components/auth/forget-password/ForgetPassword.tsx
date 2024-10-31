"use client"
import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useParams, useRouter } from "next/navigation"
import Cookies from 'js-cookie'; // Import js-cookie library
import Image from 'next/image';
import whiteAuthBk from '@/assets/images/Vector.svg';
import fogetPass from '@/assets/images/forget.svg';
import flower from '@/assets/images/flower.svg';
import TranslateHook from '../../translate/TranslateHook';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter() // Initialize router
  const { lang }: { lang?: string } = useParams();
  const translate = TranslateHook();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    // Clear previous errors
    setError(null)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/forget-password`, {
        email: email
      })
      const { access_token } = response.data.data; // Extract access_token from response
      // Save access_token in cookies
      // Cookies.set('access_token', access_token); // handle it with exprires time
      Cookies.set('access_token', access_token, { expires: 1, secure: true, sameSite: 'Strict' });

      // Show success message with SweetAlert2
      Swal.fire({
        icon: 'success',
        title: `${translate ? translate.pages.forgotPassword.VerificationLinkSent : "Verification link sent!"}`,
        text: `${translate ? translate.pages.forgotPassword.checkEmail : "Please check your email."}`,
        confirmButtonText: `${translate ? translate.pages.signin.ok : "OK"}`
      }).then(() => {
        // Store the source in cookies
        Cookies.set('source', 'forgot-password'); // Store source in cookies
        // Redirect to the verify code page
        router.push(`/auth/verify-code?email=${email}`);
      });
    } catch (error: any) {
      // Handle and show error
      setError(error.response?.data?.message || "An error occurred. Please try again.")
    }
  }
  return (
    <div className="relative grdianBK overflow-hidden" style={{ direction: "rtl" }}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <div className="my-10" style={{ direction: "ltr" }}>
          <div>
            <h1 className="text-center font-bold text-2xl md:text-4xl mainColor">
              {translate ? translate.pages.forgotPassword.title : ""}
            </h1>
            <p className="text-center mt-3 mainColor text-lg md:text-2xl">
              {translate ? translate.pages.forgotPassword.titleDescription : ""}
            </p>
          </div>
          <form onSubmit={handleForgotPassword}
                className="p-4 w-[95%] md:w-[80%] mx-auto z-50 relative my-6">
            <div>
              <label
                className={`block text-sm font-bold leading-6 mainColor mb-3
                            ${lang === "en" ? 'text-start' : 'text-end'}`}>
                {translate ? translate.pages.signin.email : ""}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                required
              />
            </div>
              {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bkPrimaryColor text-white font-light py-3 px-4 mt-5 rounded-lg"
            >
              {translate ? translate.pages.forgotPassword.sendVerifyCode : ""}
            </button>
          </form>
        </div>
        <div className="relative hidden lg:block">
          <Image src={whiteAuthBk} className="w-full" height={100} alt="authsvg" />
          <Image src={fogetPass} fill className="max-w-[70%] max-h-[50%] m-auto" alt="loginauth" />
        </div>
      </div>
      <div className="absolute w-[424px] h-[300px] -top-[18px] -right-[76px]">
        <Image src={flower} fill alt="flowersvg" />
      </div>
    </div>
  )
}

export default ForgotPassword


