import React, { useEffect, useState } from 'react';

import axios from 'axios';
import LangUseParams from '../translate/LangUseParams';
import { useParams } from 'next/navigation';
import soroojImg from "@/public/assets/images/111.webp"; // Default image
import BooksCard from '../booksCard/BooksCard';
import BooksAddWishList from '../bookAddWishList/BooksAddWishList';

const SuggestBooks = () => {
    const [booksSuggest, setBooksSuggest] = useState<[]>([]); // Updated type to array
    const lang = LangUseParams();
    const { slug } = useParams();
    useEffect(() => {
        const fetchSuggestBooks = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books/suggested-books`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            withCredentials: true,
                        },
                    }
                );
                setBooksSuggest(response.data.data.suggested_Books); // Ensure this is an array
               // console.log(response.data.data.suggested_Books)
            } catch (error) {
                console.error('Error fetching suggested Books', error);
            }
        };
        fetchSuggestBooks();
    }, []);
   
    return (
        <div className="grid grid-cols-1 gap-4">
            {booksSuggest.map((book: any) => (
                <BooksCard
                    key={book.id}
                    imgSrc={book.image_url || soroojImg}
                    bookTitle={book.book_name}
                    watchNumber={book.view_count}
                    datePublish={book.publish_date}
                    doctorName={book.author_name}
                    descriptionCourse={book.brief_description}
                    //likeBtn={<BooksAddWishList bookDetails={book} />}
                    pathLinkToContent={`/${lang}/books/${slug}`}
                />

            ))}
        </div>
    );
};

export default SuggestBooks