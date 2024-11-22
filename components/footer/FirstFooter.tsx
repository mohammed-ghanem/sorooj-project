import Image from "next/image"
import logo from "@/public/assets/images/logo.png"
import SocialMedia from "../socialMedia/SocialMedia"
import SubscribeForm from "../subscribers/SubscribeForm"

const FirstFooter = () => {
    return (
        <div>
            <div className='container lg:mx-auto row grid grid-cols-1 lg:grid-cols-2 items-center'>
                <div className='col-span-1 md:col-span-1 block md:flex justify-around items-center'>
                    <div className=" w-48 h-40 relative">
                        <Image fill src={logo} alt="logo" />
                    </div>
                    <div className="relative z-10">
                        <h4 className="mainColor font-bold text-lg mb-5 mr-3 lg:mr-0">تواصل معنا علي  :</h4>
                        <SocialMedia />
                    </div>
                </div>
                <div className='col-span-1 md:col-span-1'>
                    <SubscribeForm />
                </div>
            </div>
        </div>
    )
}

export default FirstFooter