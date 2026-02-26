"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

const DeleteAccount = () => {
  const [deleteAccount, setDeleteAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchDeleteAccount = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/static-pages/delete-account`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setDeleteAccount(response.data.data.scalar); // Assuming the terms content is in `data.data`
      } catch (err) {
        setError("Failed to  deleteAccount data . Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeleteAccount();
  }, []);

  

  if (error) {
    return <div className="text-center my-5 text-red-500">{error}</div>;
  }

  return (
    <div className='container mx-auto my-5 w-[95%] lg:w-[80%]' style={{ "direction": "rtl" }}>
      {deleteAccount ? parse(deleteAccount) : <div className="text-gray-500">No delete Account data available.</div>}
    </div>
  )
}

export default DeleteAccount