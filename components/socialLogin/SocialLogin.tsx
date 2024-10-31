import facebook from '@/assets/images/facebook.svg'
import google from '@/assets/images/google.svg'
import Image from 'next/image' 
import TranslateHook from '../translate/TranslateHook';




const SocialLogin = () => {

    const translate = TranslateHook();


    return (
        <div className='text-center'>
            <p className='text-gray-300'>
                ــــــــــــــــــــــــــــــــــــــــــ
                <span className='mainColor mx-2'> {translate ? translate.socialLogin.or : ""}</span>
                ــــــــــــــــــــــــــــــــــــــــــ
            </p>
            <div className='socialLogin w-[95%] md:w-[70%] mx-auto my-6 grid grid-cols-1 md:grid-cols-2 gap-1'>
                <div className='bg-[#faf9f6] p-[10px] rounded-[5px] [box-shadow:1px_1px_6px_#ddd]'>
                    <a href={`#`} className='flex items-center justify-center text-sm'>
                        {translate ? translate.socialLogin.facebook : ""}
                        <Image src={facebook} className='ml-2' width={30} height={30} alt="facebook icon" />
                    </a>
                </div>
                <div className='bg-[#faf9f6] p-[10px] rounded-[5px] [box-shadow:1px_1px_6px_#ddd]'>
                    <a href={`#`} className='flex items-center justify-center'>
                        {translate ? translate.socialLogin.google : ""}
                        <Image src={google} className='ml-2' width={30} height={30} alt="google icon" />
                    </a>

                </div>
            </div>
        </div>
    )
}
export default SocialLogin