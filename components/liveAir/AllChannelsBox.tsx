import Image from "next/image"
import mixlr from "@/public/assets/images/mixlr.svg"
import youtube from "@/public/assets/images/youtube.svg"
import telegram from "@/public/assets/images/telegram.svg"


const AllChannelsBox = () => {
    return (
        <div className="bkBox rounded-md overflow-hidden">
            <div className="bkPrimaryColor px-2 py-3 font-bold text-white">القنوات</div>
            <div className="mb-2 flex justify-center">
                <Image src={youtube} width={250} height={100} alt="youtube" />
            </div>
            <div className="my-2 flex justify-center bg-[#37AEE2] items-center">
                <Image src={telegram} width={250} height={40} alt="youtube" />
            </div>
            <div className="my-2 flex justify-center">
                <Image src={mixlr} width={200} height={100} alt="mixlr" />
            </div>
        </div>
    )
}

export default AllChannelsBox