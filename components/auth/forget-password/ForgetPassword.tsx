"use client"
import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'; // Import js-cookie library

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter() // Initialize router

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setError(null)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/forget-password`, {
        email: email
      })
      
      const { access_token } = response.data.data; // Extract access_token from response
      console.log(response)

      // Save access_token in cookies
      Cookies.set('access_token', access_token);

      // Show success message with SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Verification Link Sent!',
        text: 'Please check your email for the verification link.',
        confirmButtonText: 'OK'
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
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Enter your email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Send Verification Code
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword



// "use client"
// import { useState } from "react"
// import axios from "axios"
// import Swal from "sweetalert2"
// import { useRouter } from "next/navigation"

// const ForgotPassword = () => {
//   const [email, setEmail] = useState<string>("")
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter() // Initialize router

//   const handleForgotPassword = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Clear previous errors
//     setError(null)

//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/forget-password`, {
//         email: email
//       })
//         const { access_token } = response.data.data; // Extract access_token from response
//         console.log(response)
//       // Save access_token in localStorage
//       localStorage.setItem('access_token', access_token)

//       // Show success message with SweetAlert2
//       // After forgot password success
//       Swal.fire({
//         icon: 'success',
//         title: 'Verification Link Sent!',
//         text: 'Please check your email for the verification link.',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         // Store the source in localStorage
//         localStorage.setItem('source', 'forgot-password');
//         // Redirect to the verify code page
//         router.push(`/auth/verify-code?email=${email}`);
//       });


//     } catch (error: any) {
//       // Handle and show error
//       setError(error.response?.data?.message || "An error occurred. Please try again.")
//     }
//   }

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleForgotPassword} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium">
//             Enter your email address
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         >
//           Send Verification Code
//         </button>
//       </form>
//     </div>
//   )
// }

// export default ForgotPassword





