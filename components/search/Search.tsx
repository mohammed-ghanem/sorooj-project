"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const Search = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query"); // Get the query parameter from the URL
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query) {
            const fetchSearchResults = async () => {
                setLoading(true);
                setError(null);

                try {
                    const response = await fetch(`/client-api/v1/home/search?query=${encodeURIComponent(query)}`);
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
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">{`نتائج البحث عن : ${ query }`}</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && results.length === 0 && <p>No results found.</p>}
            <ul>
                {results.map((result, index) => (
                    <li key={index} className="mb-2">
                        {/* Customize this based on your API data structure */}
                        <p className="text-gray-800">{result.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
