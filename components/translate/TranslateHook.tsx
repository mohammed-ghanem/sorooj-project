// import { useParams } from 'next/navigation'
// import en from '@/app/dictionaries/en.json';  // Import English dictionary
// import ar from '@/app/dictionaries/ar.json';  // Import Arabic dictionary
// import { useEffect, useState } from 'react';



// const TranslateHook = () => {

//     const { lang }: { lang?: string } = useParams();
//     const [dictionary, setDictionary] = useState<any>(null);



//     useEffect(() => {
//         // Dynamically set the dictionary based on the current language
//         if (lang === 'en') {
//             setDictionary(en);
//         } else if (lang === 'ar') {
//             setDictionary(ar);
//         }
//     }, [lang]);

//     return (
//         dictionary
//     )
// }

// export default TranslateHook








// import { useParams } from 'next/navigation'
// import en from '@/app/dictionaries/en.json';  // Import English dictionary
// import ar from '@/app/dictionaries/ar.json';  // Import Arabic dictionary
// import { useEffect, useState } from 'react';

// // Define a type for the dictionary
// interface Dictionary {
//     title?: string;
//     description?: string;
//     // Add other translation keys as needed
// }

// const TranslateHook = () => {

//     const { lang } = useParams<{ lang?: string }>();
//     const [dictionary, setDictionary] = useState<Dictionary | null>(null); // Use null or a specific type

//     useEffect(() => {
//         // Always set a dictionary based on lang
//         if (lang === 'en') {
//             setDictionary(en as Dictionary);
//         } else if (lang === 'ar') {
//             setDictionary(ar as Dictionary);
//         } else {
//             setDictionary(null); // Handle unsupported languages
//         }
//     }, [lang]);

//     return dictionary; // Return the dictionary or null
// };

// export default TranslateHook