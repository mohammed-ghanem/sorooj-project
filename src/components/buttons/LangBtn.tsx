
import React from 'react'

const LangBtn = () => {
  return (
    <div>LangBtn</div>
  )
}

export default LangBtn

// import LocaleSwitcherSelect from './LocaleSwitcherSelect'; // Path to your switcher component

// const LangBtn = () => {

//   const languageOptions = ['en', 'ar']; // Add more languages as needed
//   return (
//     <div>
//       <LocaleSwitcherSelect defaultValue="en" items={languageOptions} label="Choose Language" />
//     </div>
//   )
// }

// export default LangBtn


// import { setUserLocale } from '@/app/utils/actions';
// import { useTransition } from 'react';

// // Define your supported locales
// type Locale = 'en' | 'ar'; // Add more if necessary

// interface Props {
//   defaultValue: Locale;
//   label: string;
// }

// export default function LocaleSwitcherSelect({ defaultValue, label }: Props) { // Default to an empty array
//   const [isPending, startTransition] = useTransition();

//   function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
//     const value = event.target.value as Locale; // Explicitly cast the value to the 'Locale' type
//     startTransition(() => {
//       setUserLocale(value); // Now TypeScript knows 'value' is a valid Locale
//     });
//   }

//   return (
//     <div>
//       <label htmlFor="locale-select" className="block mb-2 text-sm font-medium">
//         {label}
//       </label>
//       <select
//         id="locale-select"
//         defaultValue={defaultValue}
//         onChange={onChange}
//         className="block w-full p-2 border border-gray-300 rounded"
//       >
//         <option value="ar">العربية</option>
//            <option value="en">English</option>
//       </select>
//       {/* {isPending && <p>Switching language...</p>} */}
//     </div>
//   );
// }



// // import { useEffect } from 'react';
// // import Cookies from 'js-cookie';
// // import setLang from '@/app/utils/actions';

// // const LangBtn = () => {
// //   // const switchLanguage = (locale: string) => {
// //   //   Cookies.set('locale', locale, { path: '/' });
// //   //   console.log(`Locale set to: ${locale}`);
// //   //   window.location.reload();
// //   // };

// //   // useEffect(() => {
// //   //   const currentLocale = Cookies.get('locale');
// //   //   console.log('Current Locale:', currentLocale);
// //   // }, []); // Log current locale on mount

// //   return (
// //     <div>
// //       <select onChange={(e)=>setLang(e.target.value)}>
// //         <option value="ar">العربية</option>
// //         <option value="en">English</option>
// //         {/* Add more options as needed */}
// //       </select>
// //       {/* <button onClick={(e) => setLang(e.target.value)}>العربية</button>
// //       <button onClick={(e) => setLang(e.target.value)}>English</button> */}
// //     </div>
// //   );
// // };

// // export default LangBtn;



// // // // components/LanguageSwitcher.tsx
// // // import Cookies from 'js-cookie';
// // // const LangBtn = () => {
  
// // //   const switchLanguage = (locale: string) => {
// // //     // Set the locale in cookies
// // //     Cookies.set('locale', locale);
// // //     // Force a reload or redirect to apply the new locale
// // //     window.location.reload(); // Reload the page to reflect changes
// // //   };

// // //   return (
// // //     <div>
// // //       <button onClick={() => switchLanguage('ar')}>العربية</button>
// // //       <button onClick={() => switchLanguage('en')}>English</button>
// // //     </div>
// // //   );
// // // };

// // // export default LangBtn;








// // // import { faGlobe } from "@fortawesome/free-solid-svg-icons"
// // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




// // // const LangBtn = () => {
// // //   return (
// // //     <div>
// // //       <FontAwesomeIcon icon={faGlobe} className=" ml-8 cursor-pointer primaryColor text-2xl		"/>
// // //     </div>
// // //   )
// // // }

// // // export default LangBtn