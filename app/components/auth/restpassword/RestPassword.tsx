"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import Cookies from "js-cookie" // Import js-cookie library

const RestPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setError(null)

    // Validate password confirmation
    if (newPassword !== passwordConfirmation) {
      setError("Passwords do not match.")
      return
    }

    const token = Cookies.get("access_token") // Retrieve token from cookies

    if (!token) {
      setError("User is not authenticated.")
      return
    }

    try {
      // Make the API request to reset the password
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/reset-password`, {
        password: newPassword,
        password_confirmation: passwordConfirmation
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the access_token from cookies in the header
        }
      })

      // Show success message with SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Successful!',
        text: 'You can now log in with your new password.',
        confirmButtonText: 'OK'
      }).then(() => {
        // Clear the form and redirect to sign-in page
        setNewPassword("")
        setPasswordConfirmation("")
        Cookies.remove("access_token") // Optionally clear token after password reset
        router.push("/auth/signin")
      })

    } catch (error: any) {
      // Handle and show error
      setError(error.response?.data?.message || "An error occurred while resetting the password.")
    }
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="password-confirmation" className="block text-sm font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            id="password-confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default RestPassword


// "use client"
// import { useState } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"
// import Swal from "sweetalert2"

// const RestPassword = () => {
//   const [newPassword, setNewPassword] = useState<string>("")
//   const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()

  

//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Clear previous errors
//     setError(null)


//     if (newPassword !== passwordConfirmation) {
//       setError("Passwords do not match.")
//       return
//     }

//     const token = localStorage.getItem("access_token")

//     if (!token) {
//       setError("User is not authenticated.")
//       return
//     }

//     try {
//       // Make the API request to reset the password
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/reset-password`, {
//         password: newPassword,
//         password_confirmation: passwordConfirmation
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}` // Pass the access_token in the header
//         }
//       })

//       // Show success message with SweetAlert2
//       Swal.fire({
//         icon: 'success',
//         title: 'Password Reset Successful!',
//         text: 'You can now log in with your new password.',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         // Clear the form and redirect to sign-in page
//         setNewPassword("")
//         setPasswordConfirmation("")
//         localStorage.removeItem("access_token") // Optionally clear token after password reset
//         router.push("/auth/signin")
//       })

//     } catch (error: any) {
//       // Handle and show error
//       setError(error.response?.data?.message || "An error occurred while resetting the password.")
//     }
//   }

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleResetPassword} className="space-y-4">
//         <div>
//           <label htmlFor="new-password" className="block text-sm font-medium">
//             New Password
//           </label>
//           <input
//             type="password"
//             id="new-password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password-confirmation" className="block text-sm font-medium">
//             Confirm New Password
//           </label>
//           <input
//             type="password"
//             id="password-confirmation"
//             value={passwordConfirmation}
//             onChange={(e) => setPasswordConfirmation(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//   )
// }

// export default RestPassword
