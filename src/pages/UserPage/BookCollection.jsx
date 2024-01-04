import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
const BookCollection = () => {
  const books = [
    { id: 1, title: "Book 1", author: "Author 1" },
    { id: 2, title: "Book 2", author: "Author 2" },
    { id: 3, title: "Book 3", author: "Author 3" },
  ];

  return (
    <TableContainer component={Paper} style={{ width: 1000, paddingLeft: 30 }}>
      <div>
        <h1>My Book Collection</h1>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>By {book.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </TableContainer>
  );
};

export default BookCollection;
