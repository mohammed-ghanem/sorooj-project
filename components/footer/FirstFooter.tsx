import Image from "next/image"
import footerLogo from '@/assets/images/logofooter.png'
import SocialMedia from "../socialMedia/SocialMedia"
import SubscribeForm from "../subscribers/SubscribeForm"

const FirstFooter = () => {
    return (
        <div>
            <div className='container mx-auto row grid grid-cols-1 lg:grid-cols-2 items-center'>
                <div className='col-span-1 md:col-span-1 block md:flex justify-around items-center'>
                    <div className=" w-48 h-40 relative">
                        <Image fill src={footerLogo} alt="logo" />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-5">تواصل معنا علي  :</p>
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