// import { useTranslation } from 'react-i18next';

// const LangBtn = () => {
//     const { i18n } = useTranslation();

//     const changeLanguage = (lng: string) => {
//         i18n.changeLanguage(lng);
//     };

//     return (
//         <div>
//             <button onClick={() => changeLanguage('en')}>English</button>
//             <button onClick={() => changeLanguage('ar')}>Arabic</button>
//         </div>
//     );
// };

// export default LangBtn;


const LangBtn = () => {
  
  
  return (
    <div>
      <button>En</button>
       <button>ar</button>
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


