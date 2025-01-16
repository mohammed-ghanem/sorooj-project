import BtnLogin from "../Btnlogin/BtnLogin"
import Logo from "../logo/Logo"
import SerachInput from "../searchBar/SearchInput"




const LogoNav = () => {
    return (
        <div className="container bg-white mx-auto row items-center grid grid-cols-1 md:grid-cols-3">
            <Logo />
            <SerachInput />
            <BtnLogin />
        </div>
    )
}

export default LogoNav





// 'use client';

// import { useEffect, useState } from 'react';
// import BtnLogin from "../Btnlogin/BtnLogin";
// import Logo from "../logo/Logo";
// import SerachInput from "../searchBar/SerachInput";

// const LogoNav = () => {
//     const [showBtnLogin, setShowBtnLogin] = useState(false);

//     useEffect(() => {
//         // Delay the rendering of BtnLogin until after the page has loaded
//         const timer = setTimeout(() => {
//             setShowBtnLogin(true);
//         }, 2000); // You can adjust the delay (e.g., 100ms or more) if needed

//         return () => clearTimeout(timer); // Cleanup timer
//     }, []);

//     return (
//         <div className="container bg-white mx-auto row items-center grid grid-cols-1 md:grid-cols-3">
//             <Logo />
//             <SerachInput />
//             {showBtnLogin && <BtnLogin />}
//         </div>


//     );
// };

// export default LogoNav;






