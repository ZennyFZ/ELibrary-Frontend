import React, { useEffect, useState } from "react";
import { getBooks } from "../../../apis/BookService";

function HomeFooter() {
    const [books, setBooks] = useState([]);
    const getAllBooks = () => {
        getBooks().then((res) => {
            setBooks(res.data.bookList);
        });
    };
    useEffect(() => {
        getBooks().then((res) => {
            setBooks(res.data.bookList);
        });
    }, []);
    console.log(books);
    return (
        <div>
            {books.map((item) => (
                <span>{item.author}</span>
            ))}
        </div>
    );
}

export default HomeFooter;
