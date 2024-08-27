 
import Login from "../login/Login"
import Logo from "../logo/Logo"
import SerachInput from "../searchBar/SerachInput"

const LogoNav = () => {
    return (
        <div className="container mx-auto justify-center row items-center grid md:grid-cols-3 gap-2 sm:grid-cols-1">
            <Logo />
            <SerachInput />
            <Login />
        </div>
    )
}

export default LogoNav