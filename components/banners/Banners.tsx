import Image from "next/image";

interface BannersProps {
    src: any;
}

const Banners: React.FC<BannersProps> = ({ src }) => {
    return (
        <div>
            <div className="w-full h-[225px] relative">
                <Image src={src} fill alt="banner"/>
            </div>
        </div>
    );
};

export default Banners;
