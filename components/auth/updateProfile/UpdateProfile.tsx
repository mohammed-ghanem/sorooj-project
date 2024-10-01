"use client"

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';  // Import the js-cookie library

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
        setName(data.data.user.name);
        setEmail(data.data.user.email);
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
        body: JSON.stringify({ name, email }),
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
        window.location.href = "/" // Redirect to home page after successful update
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
    <div>
      <h1>Update Profile</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Profile updated successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="input-field"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
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


