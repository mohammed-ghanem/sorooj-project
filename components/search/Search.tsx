"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import searchIcon from "@/public/assets/images/searchIcon.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import TranslateHook from "@/components/translate/TranslateHook";
import Link from "next/link";
import LangUseParams from "../translate/LangUseParams";

const Search = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query"); // Get the query parameter from the URL
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const lang = LangUseParams(); // Access dynamic [lang] parameter
    const translate = TranslateHook();


    useEffect(() => {
        if (query) {
            const fetchSearchResults = async () => {
                setLoading(true);
                setError(null);

                try {
                    // Make a POST request with the query in the body
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/search`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ query }),
                    });
                    console.log(response)

                    if (!response.ok) {
                        throw new Error("Failed to fetch search results");
                    }

                    const data = await response.json();
                    setResults(data.data || []);
                } catch (err: any) {
                    setError(err.message || "An error occurred");
                } finally {
                    setLoading(false);
                }
            };

            fetchSearchResults();
        }
    }, [query]);

    return (
        <div className="container mx-auto w-[95%] lg:w-[80%] p-4 ">
            <h1 className="text-xl py-4 px-2 rounded-lg font-bold mb-4 mainColor bkColor">
                {` نتائج البحث عن : `}
                <span className="text-sm"> {query} </span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
                <div className="w-full">
                    <Image
                        className=" max-w-full"
                        src={searchIcon} width={320} height={100} alt="searchIcon" />
                </div>
                <div className=" col-span-2">
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && results.length === 0
                        &&
                        <p className="bkColor py-4 px-2 text-center font-bold mainColor">لا توجد نتائج للبحث</p>
                    }
                    <ul className="bkColor py-4 px-2">
                        {results.map((result, index) => (
                            <li
                                key={index}
                                className="grid gap-2 grid-cols-12 items-center mb-4 bg-[#fff] p-[14px] rounded-[5px] [box-shadow:1px_1px_10px_#ddd]"
                            >
                                <div className="col-span-12 lg:col-span-2">
                                    <Image className="w-full lg:w-auto" src={result.image} width={180} height={200} alt="courseImg" />
                                </div>
                                <div className="col-span-12 lg:col-span-8">
                                    <h3 className="font-bold text-sm mainColor">{result.name}</h3>
                                    <p className="font-bold my-1 text-xs text-neutral-600">{result.brief_description}</p>
                                </div>
                                <div className="col-span-12 lg:col-span-2 block text-end">
                                    <Link
                                        href={`/${lang}/${result.type}/${result.slug}`}
                                        className="bkMainColor py-1 px-5 text-white text-xs rounded-[5px] font-bold"
                                    >
                                        {translate ? translate.pages.userProfile.view : ""}
                                    </Link>
                                </div>
                            </li>



                            // <li key={index} className="mb-2">
                            //     <p className="text-gray-800">{result.name}</p>
                            // </li>
                        ))}
                    </ul>
                </div>
            </div>


        </div>
    );
};

const SearchWithSuspense = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Search />
        </Suspense>
    );
};

export default SearchWithSuspense;



// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// const Search = () => {
//     const searchParams = useSearchParams();
//     const query = searchParams.get("query"); // Get the query parameter from the URL
//     const [results, setResults] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         if (query) {
//             const fetchSearchResults = async () => {
//                 setLoading(true);
//                 setError(null);

//                 try {
//                     const response = await fetch(`/client-api/v1/home/search?query=${encodeURIComponent(query)}`);
//                     if (!response.ok) {
//                         throw new Error("Failed to fetch search results");
//                     }
//                     const data = await response.json();
//                     setResults(data.data || []);
//                 } catch (err: any) {
//                     setError(err.message || "An error occurred");
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchSearchResults();
//         }
//     }, [query]);

//     return (
//         <div className="p-4">
//             <h1 className="text-xl font-bold mb-4">{`نتائج البحث عن : ${ query }`}</h1>
//             {loading && <p>Loading...</p>}
//             {error && <p className="text-red-500">{error}</p>}
//             {!loading && !error && results.length === 0 && <p>No results found.</p>}
//             <ul>
//                 {results.map((result, index) => (
//                     <li key={index} className="mb-2">
//                         {/* Customize this based on your API data structure */}
//                         <p className="text-gray-800">{result.name}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };


// const SearchWithSuspense = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Search />
//     </Suspense>
//   );
// };

// export default SearchWithSuspense;
