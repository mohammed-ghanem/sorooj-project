"use client"
import { useState } from "react"
import axios from "axios"
import { axiroWithCredentials, axiosDefaultConfig } from "@/app/utils/axiosConfig";

axiroWithCredentials;
axiosDefaultConfig;


const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear any previous messages
    setError(null)
    setSuccess(null)

    if (newPassword !== confirmPassword) {
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
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setSuccess("Password changed successfully")
      // Optionally, redirect user after successful password change
      window.location.href = "/auth/profile"

    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred while changing password")
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
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

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
