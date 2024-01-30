import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getBooks } from "../../apis/BookService";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../apis/UserService";

function BookCollection() {
  const [books, setBooks] = useState([]);

  const getBookById = () => {
    getCurrentUser().then(res => {
      setBooks(res.data.user.bookList);
      console.log(res.data.user.bookList);
    });
  };

  useEffect(() => {
    getBookById();
  }, []);
  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };
  const chunkedBooks = chunkArray(books, 3);

  return (
    <TableContainer component={Paper} style={{ width: 1000, paddingLeft: 30 }}>
      <div>
        <h1>My Book Collection</h1>
        <div>
          {chunkedBooks.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "115px"
              }}
            >
              {row.map((book, index) => (
                <div
                  key={index}
                  style={{
                    height: "350px",
                    width: "230px",
                    textAlign: "center",
                    padding: "15px",
                    marginBottom: "50px",
                    backgroundColor: "rgb(248 246 246)",
                    marginRight: "100px"
                  }}
                >
                  <img src={book.image} alt="" style={{ width: "200px", height: "200px" }} />
                  <h3 style={{ borderTop: "1px solid #d5c6c6", height: "70px" }}>{book.title}</h3>
                  <div>
                    <Button
                      className="ChooseBook"
                      style={{
                        backgroundColor: "#29943d",
                        marginLeft: "10px",
                        padding: "7px 10px"
                      }}
                    >
                      {" "}
                      <Link
                        to={`/pdf/${book._id}`}
                        style={{ color: "white" }}
                        state={{ Link: `${book.file}`, name: `${book.title}` }}
                      >
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </TableContainer>
  );
}

export default BookCollection;
