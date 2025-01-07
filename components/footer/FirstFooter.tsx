"use client"

import SocialMedia from "../socialMedia/SocialMedia"
import SubscribeForm from "../subscribers/SubscribeForm"
import Logo from "../logo/Logo"
import TranslateHook from "../translate/TranslateHook";
import LangUseParams from "../translate/LangUseParams";


const FirstFooter = () => {
    const translate = TranslateHook();
    const lang = LangUseParams()
    return (
        <div>
            <div className='container lg:mx-auto row grid grid-cols-1 lg:grid-cols-2 items-center'>
                <div className='col-span-1 md:col-span-1 block md:flex justify-around items-center'>
                    <Logo />

                    <div className="relative z-10">
                        <h4 className={`mainColor font-bold text-lg mb-5 mr-3 lg:mr-0 `}>
                            {translate ? translate.pages.homePage.footer.title : "تواصل معنا على :"}
                        </h4>
                        <SocialMedia />
                    </div>
                </div>
                <div className='col-span-1 md:col-span-1' >
                    <SubscribeForm />
                </div>
            </div>
        </div>
    )
}

export default FirstFooter


// ${lang === "en" ? "text-end pl-2" : "text-start pr-2"}