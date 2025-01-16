import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LangUseParams from '../translate/LangUseParams';
import { useParams } from 'next/navigation';
import BooksCard from '../booksCard/BooksCard';

interface Book {
    id: number;
}
const SuggestBooks = ({ currentBookId }: any) => {
    const [booksSuggest, setBooksSuggest] = useState<Book[]>([]);
    const lang = LangUseParams();
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

                const suggestedBooks = response.data.data.suggested_Books || [];

                // Filter courses by id instead of slug
                const filteredBooks = suggestedBooks.filter(
                    (book: Book) => book.id !== currentBookId
                );
                // Set the filtered books to state
                setBooksSuggest(filteredBooks);

                //setBooksSuggest(response.data.data.suggested_Books); // Ensure this is an array
            } catch (error) {
                console.error('Error fetching suggested Books', error);
            }
        };
        fetchSuggestBooks();
    }, [currentBookId]);
    return (
        <div className="grid grid-cols-1 gap-4">
            {booksSuggest.length > 0
                ?
                booksSuggest.map((book: any) => (
                    <BooksCard
                        key={book.id}
                        imgSrc={book.image}
                        bookTitle={book.book_name}
                        watchNumber={book.view_count}
                        datePublish={book.publish_date}
                        doctorName={book.author_name}
                        descriptionBook={book.brief_description}
                        //likeBtn={<BooksAddWishList bookDetails={book} />}
                        pathLinkToContent={`/${lang}/books/${book.slug}`}
                    />

                ))
                :
                "لا يوجد كتب وابحاث مقترحة"
            }

        </div>
    );
};

export default SuggestBooks



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import LangUseParams from '../translate/LangUseParams';
// import { useParams } from 'next/navigation';
// import BooksCard from '../booksCard/BooksCard';


// const SuggestBooks = () => {
//     const [booksSuggest, setBooksSuggest] = useState<[]>([]); // Updated type to array
//     const lang = LangUseParams();
//     const { slug } = useParams();
//     useEffect(() => {
//         const fetchSuggestBooks = async () => {
//             try {
//                 const response = await axios.get(
//                     `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/books/suggested-books`,
//                     {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             withCredentials: true,
//                         },
//                     }
//                 );
//                 setBooksSuggest(response.data.data.suggested_Books); // Ensure this is an array
//             } catch (error) {
//                 console.error('Error fetching suggested Books', error);
//             }
//         };
//         fetchSuggestBooks();
//     }, []);
//     return (
//         <div className="grid grid-cols-1 gap-4">
//             {booksSuggest.map((book: any) => (
//                 <BooksCard
//                     key={book.id}
//                     imgSrc={book.image}
//                     bookTitle={book.book_name}
//                     watchNumber={book.view_count}
//                     datePublish={book.publish_date}
//                     doctorName={book.author_name}
//                     descriptionBook={book.brief_description}
//                     //likeBtn={<BooksAddWishList bookDetails={book} />}
//                     pathLinkToContent={`/${lang}/books/${book.slug}`}
//                 />

//             ))}
//         </div>
//     );
// };

// export default SuggestBooks