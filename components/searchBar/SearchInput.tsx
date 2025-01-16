"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            // Navigate to the search page with the query as a parameter
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="w-[95%] mx-auto">
            <div className="md:w-full relative flex items-center border-2 rounded-md border-regal-blue p-2 text-sm">
                <input
                    className="block w-full text-gray-900 bg-transparent dark:placeholder-gray-400 dark:text-white outline-0 p-1"
                    type="text"
                    placeholder="البحث"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <FontAwesomeIcon
                    className="absolute left-0 w-10 h-4 p-4 bg-regal-blue text-white cursor-pointer"
                    icon={faMagnifyingGlass}
                    onClick={handleSearch}
                />
            </div>
        </div>
    );
};

export default SearchInput;




// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// const SerachInput = () => {
//     return (
//         <div className='w-[95%] mx-auto'>
//             <div className=' md:w-full relative flex items-center border-2 rounded-md border-regal-blue p-2 text-sm '>
//                 <input className='block w-full text-gray-900 bg-transparent dark:placeholder-gray-400 dark:text-whit outline-0 p-1'
//                     type="text" placeholder="البحث" />
//                 <FontAwesomeIcon className=' absolute  left-0 w-10 h-4 p-4 bg-regal-blue text-white cursor-pointer' icon={faMagnifyingGlass} />
//             </div>
//         </div>
//     )
// }

// export default SerachInput