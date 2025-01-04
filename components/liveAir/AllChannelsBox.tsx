import Image from "next/image"
// import mixlr from "@/public/assets/images/mixlr.svg"
import youtube from "@/public/assets/images/youtube.svg"
import telegram from "@/public/assets/images/telegram.svg"
import Link from "next/link"
import LangUseParams from "../translate/LangUseParams"


const AllChannelsBox = () => {
    const lang = LangUseParams();
    return (
        <div className="bkBox rounded-md overflow-hidden flex md:block items-center">
            <div className="bkPrimaryColor px-2 py-3 font-bold text-white text-center ">قنوات البث المباشر</div>
            <Link href={`/${lang}/live-air/youtube`} className="flex justify-center h-24">
                <Image src={youtube} width={250} height={100} alt="youtube" />
            </Link>
            <hr className="h-1 bkMainColor hidden md:block" />
            <Link href={`/${lang}/live-air/telegram`} className="flex justify-center h-24">
                <Image src={telegram} width={250} height={100} alt="youtube" />
            </Link>
            {/* <hr className="h-1 bkMainColor" />
            <Link href={`/${lang}/live-air/mixlr`} className="flex justify-center h-24">
                <Image src={mixlr} width={200} height={100} alt="mixlr" />
            </Link> */}
        </div>
    )
}

export default AllChannelsBox