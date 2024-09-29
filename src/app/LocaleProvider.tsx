// 'use client'; // Client-side logic for locale switching

// import { useEffect, useState } from 'react';
// import { NextIntlClientProvider } from 'next-intl';
// import Cookies from 'js-cookie';

// const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
//   const [locale, setLocale] = useState('ar'); // Default locale state
//   const [messages, setMessages] = useState({}); // Default messages state

//   // Function to load messages and update the locale
//   const loadMessages = async (newLocale: string) => {
//     const newMessages = await import(`../../messages/${newLocale}.json`);
//     setMessages(newMessages.default);
//     setLocale(newLocale);
//   };

//   // UseEffect to detect language cookie changes
//   useEffect(() => {
//     // Initial load from the cookie
//     const initialLocale = Cookies.get('language') || 'ar';
//     loadMessages(initialLocale);

//     // Function to check for cookie changes
//     const checkCookieChange = () => {
//       const currentLocale = Cookies.get('language') || 'ar';
//       if (currentLocale !== locale) {
//         console.log(`Language cookie changed to: ${currentLocale}`);
//         loadMessages(currentLocale);
//       }
//     };

//     // Set an interval to check for cookie changes
//     const interval = setInterval(checkCookieChange, 1000);

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, [locale]);

//   // Update the lang attribute in the <html> element
//   useEffect(() => {
//     document.documentElement.lang = locale; // Set the lang attribute on the html element
//   }, [locale]);

//   return (
//     <NextIntlClientProvider locale={locale} messages={messages}>
//       {children}
//     </NextIntlClientProvider>
//   );
// };

// export default LocaleProvider;
