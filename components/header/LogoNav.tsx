 
import Login from "../login/Login"
import Logo from "../logo/Logo"
import SerachInput from "../searchBar/SerachInput"

const LogoNav = () => {
    return (
        <div className="container mx-auto row items-center grid grid-cols-1 md:grid-cols-3">
            <Logo />
            <SerachInput />
            <Login />
        </div>
    )
}

export default LogoNav