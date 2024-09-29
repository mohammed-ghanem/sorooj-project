
import React from 'react'

const LangBtn = () => {
  return (
    <div>
      <select >
        <option value="en">English</option>
        <option value="ar">arabic</option>
      </select>
    </div>
  )
}

export default LangBtn

// 'use client';

// import React from 'react';
// import Cookies from 'js-cookie';

// const LangBtn = () => {
//   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newLang = e.target.value;
//     Cookies.set('language', newLang, { path: '/' }); // Set cookie
//     console.log(`Cookie set: language=${newLang}`); // Debugging line

//     // Force a reload to ensure the server recognizes the cookie change
//     window.location.reload();
//   };

//   return (
//     <div>
//       <select onChange={handleLanguageChange}>
//         <option value="en">English</option>
//         <option value="ar">Arabic</option>
//         <option value="en">English</option>
//       </select>
//     </div>
//   );
// };

// export default LangBtn;


