"use client"
import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { axiroWithCredentials, axiosDefaultConfig } from "@/app/utils/axiosConfig";

axiroWithCredentials;
axiosDefaultConfig;

const ChangePassword = () => {
  const [old_password, setOld_password] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear any previous messages
    setError(null)

    if (password !== password_confirmation) {
      setError("New passwords do not match")
      return
    }

    const token = localStorage.getItem('access_token')

    if (!token) {
      setError("User is not authenticated")
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/change-password`, {
        old_password: old_password,
        password: password,
        password_confirmation: password_confirmation
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Password Changed!',
        text: 'Your password has been updated successfully. You will now be redirected to the sign-in page.',
        confirmButtonText: 'OK'
      }).then(() => {
        // After closing the SweetAlert, remove the token and redirect to the sign-in page
        localStorage.removeItem('access_token')
        window.location.href = "/auth/signin"
      })

    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred while changing the password")
    }
  }

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium">
            Current Password
          </label>
          <input
            type="password"
            id="current-password"
            value={old_password}
            onChange={(e) => setOld_password(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
    </div>
  )
}

export default ChangePassword



