"use client"

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';  // Import the js-cookie library
import Banners from '@/components/banners/Banners';
import banner from "@/assets/images/books.png"
import ProfileBoxCategories from '../profileBoxCategories/ProfileBoxCategories';
import 'react-phone-input-2/lib/style.css'
import './style.css'
import PhoneInput from 'react-phone-input-2'
import TranslateHook from '../../translate/TranslateHook';
import LangUseParams from "@/components/translate/LangUseParams"
import FlowerImg from '@/components/flowerImg/FlowerImg';
import router from 'next/router';


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
  const lang = LangUseParams() // Access dynamic [lang] parameter
  const translate = TranslateHook();



  const [form, setForm] = useState<FormData>({
    first_name: firstName,
    last_name: lastName,
    email: email,
    mobile: phone,
  })



  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      // Redirect if token is missing (user is logged out)
      router.push(`/${lang}/auth/signin`);
      return;
    }
    const fetchProfile = async () => {
      setLoading(true);
      try {
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
  }, [lang]);

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
        text: `${translate ? translate.pages.userProfile.editSuccess : ""}`,
        confirmButtonText: `${translate ? translate.pages.userProfile.ok : ""}`,
      }).then(() => {
        window.location.href = `/${lang}` // Redirect to home page after successful update
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
        <Banners src={banner} textPath={translate ? translate.pages.userProfile.editProfileTitle : ""} />
      </div>
      <div className=' relative'>
        {/* flower img */}
        <FlowerImg />
        {/* flower img */}
        <div className="container mx-auto w-full md:w-[80%] my-20 grid grid-cols-1 lg:grid-cols-3 gap-2 relative z-50">
          <div>
            <ProfileBoxCategories />
          </div>
          <div className="col-span-2">
            <div className="userBoxDetails w-[95%] mx-auto rounded-[6px] mt-4 p-4 bkBox [box-shadow:1px_1px_10px_#ddd]">
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-2'>
                  <div>
                    <label className='mainColor'>
                      {translate ? translate.pages.userProfile.firstName : ""}
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={loading}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="mainColor">
                      {translate ? translate.pages.userProfile.lastName : ""}
                    </label>
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
                  <label className="mainColor">
                    {translate ? translate.pages.userProfile.email : ""}
                  </label>
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
                    {translate ? translate.pages.userProfile.phoneNumber : ""}
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

                <button type="submit" disabled={loading}
                  className="bkMainColor text-white block m-auto px-[22px] py-[10px] rounded-[4px] [box-shadow:1px_1px_10px_#ddd]">
                  {loading ? 'Updating...' : `${translate ? translate.pages.userProfile.edit : ""}`}
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
// import Cookies from 'js-cookie';  // Import the js-cookie library
// import Banners from '@/components/banners/Banners';
// import banner from "@/assets/images/books.png"
// import ProfileBoxCategories from '../profileBoxCategories/ProfileBoxCategories';
// import 'react-phone-input-2/lib/style.css'
// import './style.css'
// import PhoneInput from 'react-phone-input-2'
// import TranslateHook from '../../translate/TranslateHook';
// import LangUseParams from "@/components/translate/LangUseParams"
// import FlowerImg from '@/components/flowerImg/FlowerImg';


// interface FormData {
//   first_name: string
//   last_name: string
//   email: string
//   mobile: string
//   gender?: string
// }

// const UpdateProfile = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
//   // lang param (ar Or en)
//   const lang = LangUseParams() // Access dynamic [lang] parameter
//   const translate = TranslateHook();



//   const [form, setForm] = useState<FormData>({
//     first_name: firstName,
//     last_name: lastName,
//     email: email,
//     mobile: phone,
//   })



//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       try {
//         const token = Cookies.get('access_token');  // Retrieve token from cookies
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/profile`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setFirstName(data.data.user.first_name);
//         setLastName(data.data.user.last_name);
//         setEmail(data.data.user.email);
//         setPhone(data.data.user.mobile);  // Set phone number

//         setForm({
//           first_name: data.data.user.first_name,
//           last_name: data.data.user.last_name,
//           email: data.data.user.email,
//           mobile: data.data.user.mobile,
//         });

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
//       const token = Cookies.get('access_token');  // Retrieve token from cookies
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/auth/update-profile`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,  // Use token from cookies
//         },
//         body: JSON.stringify({ first_name: firstName, last_name: lastName, email, mobile: phone }),
//       });
//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to update profile');
//       }

//       // SweetAlert2 notification
//       Swal.fire({
//         icon: 'success',
//         //title: `${translate ? translate.pages.userProfile.editSuccess : ""}`,
//         text: `${translate ? translate.pages.userProfile.editSuccess : ""}`,
//         confirmButtonText: `${translate ? translate.pages.userProfile.ok : ""}`,
//       }).then(() => {
//         window.location.href = `/${lang}` // Redirect to home page after successful update
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
//     <section>
//       <div>
//         <Banners src={banner} textPath={translate ? translate.pages.userProfile.editProfileTitle : ""} />
//       </div>
//       {/* show error or successfully */}
//       {/* {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">Profile updated successfully!</p>} */}
//       {/* show error or successfully */}
//       <div className=' relative'>
//         {/* flower img */}
//         <FlowerImg />
//         {/* flower img */}
//         <div className="container mx-auto w-full md:w-[80%] my-20 grid grid-cols-1 lg:grid-cols-3 gap-2 relative z-50">
//           <div>
//             <ProfileBoxCategories />
//           </div>
//           <div className="col-span-2">
//             <div className="userBoxDetails w-[95%] mx-auto rounded-[6px] mt-4 p-4 bkBox [box-shadow:1px_1px_10px_#ddd]">
//               <form onSubmit={handleSubmit}>
//                 <div className='grid grid-cols-2 gap-2'>
//                   <div>
//                     <label className='mainColor'>
//                       {translate ? translate.pages.userProfile.firstName : ""}
//                     </label>
//                     <input
//                       type="text"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       disabled={loading}
//                       className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="mainColor">
//                       {translate ? translate.pages.userProfile.lastName : ""}
//                     </label>
//                     <input
//                       type="text"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       disabled={loading}
//                       className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
//                     />
//                   </div>
//                 </div>
//                 <div className='mt-2'>
//                   <label className="mainColor">
//                     {translate ? translate.pages.userProfile.email : ""}
//                   </label>
//                   <input
//                     type="email"
//                     value={email}
//                     disabled
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none hover:cursor-not-allowed"
//                   />
//                 </div>


//                 <div className="mt-3 mb-5" style={{ direction: "ltr" }}>
//                   <label className={`block leading-6 mainColor mb-1
//                                                 ${lang === "en" ? 'text-start' : 'text-end'}`
//                   }>
//                     {translate ? translate.pages.userProfile.phoneNumber : ""}
//                   </label>
//                   <PhoneInput
//                     country={'kw'}
//                     value={phone}
//                     onChange={(value) => setPhone(value)}

//                     inputClass="mt-1 block w-full pl-[52px] pr-[0] py-[20px] border border-gray-300 rounded-md shadow-sm"
//                     inputProps={{
//                       name: 'phone',
//                       required: true,
//                       autoFocus: true
//                     }}
//                   />
//                   {/* {errors.mobile && <p className="text-red-500">{errors.mobile}</p>} */}
//                 </div>

//                 <button type="submit" disabled={loading}
//                   className="bkMainColor text-white block m-auto px-[22px] py-[10px] rounded-[4px] [box-shadow:1px_1px_10px_#ddd]">
//                   {loading ? 'Updating...' : `${translate ? translate.pages.userProfile.edit : ""}`}
//                 </button>
//               </form>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UpdateProfile;