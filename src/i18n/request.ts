// import { getRequestConfig } from 'next-intl/server';
// import { cookies } from 'next/headers';

// export default getRequestConfig(async () => {
//   const languageCookie = cookies().get('language')?.value; // Get the language from cookie

//   console.log(`Current language from cookie: ${languageCookie}`); // Debug

//   const locale = languageCookie || 'en'; // Default to 'en' if cookie is undefined

//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default
//   };
// });


// import { getRequestConfig } from 'next-intl/server';
// import { cookies } from 'next/headers';
 
// export default getRequestConfig(async () => {
//   // Provide a static locale, fetch a user setting,
//   // read from `cookies()`, `headers()`, etc.
//     const test = cookies().get('language')
//     console.log(`test ${test}`)
//   const locale = 'en';
 
//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default
//   };
// });



// import { getRequestConfig } from 'next-intl/server';
// import { cookies } from 'next/headers';

// export default getRequestConfig(async () => {
//     // Provide a static locale, fetch a user setting,
//     // read from `cookies()`, `headers()`, etc.
//     const locale = cookies().get('language')?.value ? cookies().get('language')?.value : 'ar';
//     return {
//         locale,
//         messages: (await import(`../../messages/${locale}.json`)).default
//     };
// });