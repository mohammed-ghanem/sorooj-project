// 'use client';

// import dynamic from 'next/dynamic';
// import LangBtn from '../buttons/LangBtn';

// // Dynamic import with a loading placeholder
// const BtnLogin = dynamic(() => import('./BtnLogin'), {
//     ssr: false,
//     loading: () => (
//         <div className="m-auto flex items-center mt-5 mb-3 md:mb-auto md:mt-auto">
//             <LangBtn />
//             <p className="text-white bkMainColor px-[26px] py-[10px] rounded-lg">Loading Login...</p>
//         </div>
//     ),
// });

// const ParentComponent = () => {
//     return (
//         <div>
//             <h1>Welcome to the Page</h1>
//             {/* Render BtnLogin dynamically */}
//             <BtnLogin />
//         </div>
//     );
// };

// export default ParentComponent;
