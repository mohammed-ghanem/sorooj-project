"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import axios from "axios"
import Swal from "sweetalert2"

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState<string>("")
  const [email, setEmail] = useState<string | null>(null)
  const [source, setSource] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get the email from query string
    const emailParam = searchParams.get("email");
    const sourceParam = searchParams.get("source") || localStorage.getItem('source'); // Check localStorage for source

    if (emailParam) {
      setEmail(emailParam);
    } else {
      // Redirect to forgot password if no email is found
      router.push("/auth/forgot-password");
    }

    if (sourceParam) {
      setSource(sourceParam);
    } else {
      console.error("No source found in URL or localStorage");
      // Optionally redirect to home or an error page
      router.push("/");
    }
  }, [searchParams, router]);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);

    // Get the access token from localStorage
    const token = localStorage.getItem('access_token');

    if (!token) {
      setError("User is not authenticated");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/verify-otp`, {
        email: email,
        code: verificationCode
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Add the access token in the Authorization header
        }
      });

      // Show success message with SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Verification Successful!',
        text: 'Your account has been verified.',
        confirmButtonText: 'OK'
      }).then(() => {
        // Redirect based on the source
        if (source === "signup") {
          // Clear the source from localStorage
          localStorage.removeItem('source');
          localStorage.removeItem('access_token');
          // Redirect to sign-in page if coming from signup
          router.push("/auth/signin");
        } else if (source === "forgot-password") {
          // Clear the source from localStorage
          localStorage.removeItem('source');
          // Redirect to reset password page if coming from forgot password
          router.push(`/auth/reset-password?email=${email}`);
        } else if (source === "resend-otp") {
          // Clear the source from localStorage
          localStorage.removeItem('source');
          window.location.href = "/"
        } else {
          // Default redirect if source is missing
          router.push("/");
        }
      });

    } catch (error: any) {
      // Handle and show error
      setError(error.response?.data?.message || "Invalid code. Please try again.");
    }
  }

  return (
    
      <div>
        <h2>Verify Your Code</h2>
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium">
              Enter the verification code sent to {email}
            </label>
            <input
              type="text"
              id="verification-code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Verify Code
          </button>
        </form>
    </div>
  );
}

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <VerifyCode />
  </Suspense>
);

export default VerifyCode;



// "use client"
// import { useState, useEffect } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import axios from "axios"
// import Swal from "sweetalert2"

// const VerifyCode = () => {
//   const [verificationCode, setVerificationCode] = useState<string>("")
//   const [email, setEmail] = useState<string | null>(null)
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   useEffect(() => {
//     // Get the email from query string
//     const emailParam = searchParams.get("email")
//     if (emailParam) {
//       setEmail(emailParam)
//     } else {
//       // Redirect to forgot password if no email is found
//       router.push("/auth/forgot-password")
//     }
//   }, [searchParams, router])

//   const handleVerifyCode = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Clear previous errors
//     setError(null)

//     // Get the access token from localStorage
//     const token = localStorage.getItem('access_token')

//     if (!token) {
//       setError("User is not authenticated")
//       return
//     }

//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/verify-otp`, {
//         email: email,
//         code: verificationCode
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}` // Add the access token in the Authorization header
//         }
//       })

//       // Show success message with SweetAlert2
//       Swal.fire({
//         icon: 'success',
//         title: 'Verification Successful!',
//         text: 'Your account has been verified. Please reset your password.',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         // Redirect to reset password page after verification
//         router.push(`/auth/reset-password?email=${email}`)
//       })

//     } catch (error: any) {
//       // Handle and show error
//       setError(error.response?.data?.message || "Invalid code. Please try again.")
//     }
//   }

//   return (
//     <div>
//       <h2>Verify Your Code</h2>
//       <form onSubmit={handleVerifyCode} className="space-y-4">
//         <div>
//           <label htmlFor="verification-code" className="block text-sm font-medium">
//             Enter the verification code sent to {email}
//           </label>
//           <input
//             type="text"
//             id="verification-code"
//             value={verificationCode}
//             onChange={(e) => setVerificationCode(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         >
//           Verify Code
//         </button>
//       </form>
//     </div>
//   )
// }

// export default VerifyCode
