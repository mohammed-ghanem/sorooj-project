"use client"

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';  // Import the js-cookie library
import LangUseParams from "@/components/translate/LangUseParams"
import Image from 'next/image';
import flower from '@/assets/images/flower.svg';
import Banners from '@/components/banners/Banners';
import banner from "@/assets/images/books.png"
import ProfileBoxCategories from '../profileBoxCategories/ProfileBoxCategories';
import 'react-phone-input-2/lib/style.css'
import './style.css'
import PhoneInput from 'react-phone-input-2'


interface FormData {
  first_name: string
  last_name: string
  email: string
  mobile: string
  gender?: string
}

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  // lang param (ar Or en)
  const lang = LangUseParams()



  const [form, setForm] = useState<FormData>({
    first_name: firstName,
    last_name: lastName,
    email: email,
    mobile: phone,
  })



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = Cookies.get('access_token');  // Retrieve token from cookies
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFirstName(data.data.user.first_name);
        setLastName(data.data.user.last_name);
        setEmail(data.data.user.email);
        setPhone(data.data.user.mobile);  // Set phone number
        setForm({
          first_name: data.data.user.first_name,
          last_name: data.data.user.last_name,
          email: data.data.user.email,
          mobile: data.data.user.mobile,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = Cookies.get('access_token');  // Retrieve token from cookies
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Use token from cookies
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, mobile: phone }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }

      // SweetAlert2 notification
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully!',
        confirmButtonText: 'OK',
      }).then(() => {
        window.location.href = `/${lang}/` // Redirect to home page after successful update
      });

      setSuccess(true);
      setLoading(false);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <div>
        <Banners src={banner} textPath="تعديل بيانات" />
      </div>
      {/* show error or successfully */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Profile updated successfully!</p>}
      {/* show error or successfully */}
      <div className=' relative'>
        {/* flower img */}
        <div className=' absolute w-[320px] md:w-[424px] h-[300px] -top-[99px] -right-[76px]'>
          <Image src={flower} fill alt='flowersvg' />
        </div>
        <div className=' absolute w-[320px] md:w-[424px] h-[300px] -bottom-[99px] left-[5px]'>
          <Image src={flower} fill alt='flowersvg' />
        </div>
        {/* flower img */}
        <div className="container mx-auto w-full md:w-[80%] my-20 grid grid-cols-1 lg:grid-cols-3 gap-2 relative z-50">
          <div>
            <ProfileBoxCategories />
          </div>
          <div className="col-span-2">
            <div className="userBoxDetails w-[95%] mx-auto rounded-[6px] mt-4 p-4 bkBox">
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-2'>
                  <div>
                    <label className='mainColor'>الاسم الاول</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={loading}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="mainColor">الاسم الاخير</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={loading}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                    />
                  </div>
                </div>
                <div className='mt-2'>
                  <label className="mainColor">البريد الالكترونى</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none hover:cursor-not-allowed"
                  />
                </div>


                <div className="mt-3 mb-5" style={{ direction: "ltr" }}>
                  <label className={`block leading-6 mainColor mb-1
                                                ${lang === "en" ? 'text-start' : 'text-end'}`
                  }>
                    رقم الهاتف
                  </label>
                  <PhoneInput
                    country={'kw'}
                    value={phone}
                    onChange={(value) => setPhone(value)}

                    inputClass="mt-1 block w-full pl-[52px] pr-[0] py-[20px] border border-gray-300 rounded-md shadow-sm"
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true
                    }}
                  />
                  {/* {errors.mobile && <p className="text-red-500">{errors.mobile}</p>} */}
                </div>


                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;


// "use client"

// import { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';

// const UpdateProfile = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//           },
//         });
//         const data = await response.json();
//         setName(data.data.user.name);
//         setEmail(data.data.user.email);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch profile data');
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/update-profile`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//         },
//         body: JSON.stringify({ name, email }),
//       });
//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to update profile');
//       }

//       // SweetAlert2 notification
//       Swal.fire({
//         icon: 'success',
//         title: 'Profile Updated',
//         text: 'Your profile has been updated successfully!',
//         confirmButtonText: 'OK',
//       }).then(() => {
//         window.location.href = "/" // Redirect to home page after successful update
//       });

//       setSuccess(true);
//       setLoading(false);
//     } catch (err: any) {
//       console.error('Error:', err);
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Update Profile</h1>

//       {/*       
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">Profile updated successfully!</p>}
//       */}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             disabled={loading}
//             className="input-field"
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             disabled
//             className="input-field"
//           />
//         </div>
//         <button type="submit" disabled={loading} className="btn-primary">
//           {loading ? 'Updating...' : 'Update Profile'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;


