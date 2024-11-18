// components/OverlaySpinner.tsx
import Image from 'next/image';
import loadingImg from '@/assets/images/loadingImg.svg'


const OverlaySpinner: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 grid items-center justify-center bkColor">
            <Image width={250} height={250} src={loadingImg} alt="Loading..." />
            <div className='flex justify-center fixed top-[65%] w-full'>
                <div className='h-4 w-4 bkPrimaryColor rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-4 w-4 mx-2 bkPrimaryColor rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-4 w-4 bkPrimaryColor rounded-full animate-bounce'></div>
            </div>
            {/* <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div> */}
        </div>
    );
};

export default OverlaySpinner;
