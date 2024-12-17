import Image from 'next/image';
import Banners from '../banners/Banners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defImage from "@/public/assets/images/default.webp"; // Default image
import AudioCategories from './AudioCategories';
import { faCirclePlay, faClock, faMicrophoneLines, faPenNib, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const AudioLibirary = () => {
    return (
        <div>
            <div>
                <Banners src={defImage} textPath="المكتبة الصوتية" />
            </div>
            <div className='container my-10 mx-auto w-[80%] grid grid-cols-1 lg:grid-cols-4 gap-4'>
                <div>
                    <AudioCategories />
                </div>
                <div className='col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    <Link
                        href={``}
                        className="gallery-item bkBox rounded-[8px] overflow-hidden [box-shadow:1px_1px_7px_#ddd] cursor-pointer"
                    >
                        <div className='relative overflow-hidden'>
                            <div className='absolute inset-0 bg-black bg-opacity-30 z-30'>
                                <FontAwesomeIcon icon={faMicrophoneLines} className='text-white opacity-65 text-5xl absolute mx-auto left-0 right-0 top-1/3 [box-shadow:1px_1px_10px_#424c61] rounded-[30px]' />
                            </div>
                            <div className='absolute text-white font-bold text-[10px] flex items-center px-2 top-3 left-0 z-40 opacity-85'>
                                <span><FontAwesomeIcon className='ml-2' icon={faClock} /></span>
                                <span className=''>
                                    2024-11-27
                                </span>
                            </div>

                            <Image className="max-w-full w-full"
                                src="https://img.youtube.com/vi/T7Ot43Hd4oo/maxresdefault.jpg"
                                width={100} height={100} alt=''
                            />

                        </div>
                        <div className='flex items-center px-2 pt-2'>
                            <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenNib} /></span>
                            <h2 className='mainColor font-bold text-[12px]'>
                                فى ابطال اصول الملحدين
                            </h2>
                        </div>
                        <div className='flex items-center px-2 py-2'>
                            <span><FontAwesomeIcon className='primaryColor ml-2' icon={faPenToSquare} /></span>
                            <p className='mainColor font-bold text-[10px]'>
                                وصف مختصر عن ابطال اصول الملحدين
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AudioLibirary