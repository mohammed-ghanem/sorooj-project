import Image from "next/image"
import logo from "../../assets/images/logo.png"

const Logo = () => {
    return (
        <div className=" w-48 h-40 relative m-auto">
            <Image fill src={logo} alt="logo" />
        </div>
    )
}

export default Logo