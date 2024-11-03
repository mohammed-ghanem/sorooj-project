import BtnLogin from "../Btnlogin/BtnLogin"
import Logo from "../logo/Logo"
import SerachInput from "../searchBar/SerachInput"

 


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