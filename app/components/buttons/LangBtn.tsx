import { useEffect } from 'react';
import Cookies from 'js-cookie';
import setLang from '@/app/utils/actions';

const LangBtn = () => {
  // const switchLanguage = (locale: string) => {
  //   Cookies.set('locale', locale, { path: '/' });
  //   console.log(`Locale set to: ${locale}`);
  //   window.location.reload();
  // };

  // useEffect(() => {
  //   const currentLocale = Cookies.get('locale');
  //   console.log('Current Locale:', currentLocale);
  // }, []); // Log current locale on mount

  return (
    <div>
      <select onChange={(e)=>setLang(e.target.value)}>
        <option value="ar">العربية</option>
        <option value="en">English</option>
        {/* Add more options as needed */}
      </select>
      {/* <button onClick={(e) => setLang(e.target.value)}>العربية</button>
      <button onClick={(e) => setLang(e.target.value)}>English</button> */}
    </div>
  );
};

export default LangBtn;



// // components/LanguageSwitcher.tsx
// import Cookies from 'js-cookie';
// const LangBtn = () => {
  
//   const switchLanguage = (locale: string) => {
//     // Set the locale in cookies
//     Cookies.set('locale', locale);
//     // Force a reload or redirect to apply the new locale
//     window.location.reload(); // Reload the page to reflect changes
//   };

//   return (
//     <div>
//       <button onClick={() => switchLanguage('ar')}>العربية</button>
//       <button onClick={() => switchLanguage('en')}>English</button>
//     </div>
//   );
// };

// export default LangBtn;








// import { faGlobe } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




// const LangBtn = () => {
//   return (
//     <div>
//       <FontAwesomeIcon icon={faGlobe} className=" ml-8 cursor-pointer primaryColor text-2xl		"/>
//     </div>
//   )
// }

// export default LangBtn