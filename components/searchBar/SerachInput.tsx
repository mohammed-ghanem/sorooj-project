import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SerachInput = () => {
    return (
        <div className=''>
            <div className='  relative flex items-center border-2 rounded-md border-regal-blue p-2 text-sm '>
                <input className='block w-full text-gray-900 bg-transparent dark:placeholder-gray-400 dark:text-whit outline-0 p-1'
                    type="text" placeholder="البحث" />
                <FontAwesomeIcon className=' absolute  left-0 w-10 h-10 p-4 bg-regal-blue text-white cursor-pointer' icon={faMagnifyingGlass} />
            </div>
        </div>
    )
}

export default SerachInput