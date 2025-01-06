"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";

const Terms = () => {
    const [terms, setTerms] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/static-pages/terms-conditions`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                setTerms(response.data.data.scalar); // Assuming the terms content is in `data.data`
            } catch (err) {
                setError("Failed to fetch terms and conditions. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTerms();
    }, []);

    if (loading) {
        return (
            <div className="text-center my-5">
                <FontAwesomeIcon className="mainColor text-2xl" icon={faSpinner} spin />
            </div>
        );
    }

    if (error) {
        return <div className="text-center my-5 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto my-5 w-[95%] lg:w-[80%]" style={{ direction: "rtl" }}>
            {terms ? parse(terms) : <div className="text-gray-500">No terms available.</div>}
        </div>
    );
};

export default Terms;
