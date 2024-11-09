import Image from 'next/image';
import flower from '@/assets/images/flower.svg';

const FlowerImg = () => {
    return (
        <>
            <div className=' absolute w-[320px] md:w-[424px] h-[300px] -top-[99px] right-[0px]'>
                <Image src={flower} fill alt='flowersvg' />
            </div>
            <div className=' absolute w-[320px] md:w-[424px] h-[300px] -bottom-[99px] left-[5px]'>
                <Image src={flower} fill alt='flowersvg' />
            </div>
        </>
    )
}

export default FlowerImg