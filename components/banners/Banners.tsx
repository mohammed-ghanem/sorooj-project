import Image from "next/image";

import TranslateHook from "../translate/TranslateHook";

interface BannersProps {
    src: any;
    textPath?: string
}

const Banners: React.FC<BannersProps> = ({ src, textPath }) => {
    // lang param (ar Or en)
    const translate = TranslateHook();
    return (
        <div>
            <div className="w-full h-[150px] lg:h-[220px] relative overflow-hidden">
                <Image src={src} fill alt="banner" />
                <span className="absolute bkPrimaryColor  px-[2px] md:px-[20px] py-[10px] rounded-tl-[15px] rounded-br-none rounded-tr-[15px] rounded-bl-none left-2/4 -bottom-[22px] -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <span>{translate ? translate.navigation.home : ""}</span>
                    <span> -- </span>
                    <span>{textPath}</span>
                </span>
            </div>
        </div>
    );
};

export default Banners;
