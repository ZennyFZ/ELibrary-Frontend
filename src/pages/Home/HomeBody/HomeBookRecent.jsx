import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "../Home.scss";
import { Link } from "react-router-dom";
import { getBooks } from "../../../apis/BookService";
import { addToCart } from "../../Cart/CartSlice";
import { useDispatch } from 'react-redux'

function HomeBookRecent() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks().then((res) => {
            setBooks(res.data.bookList);
        });
    }, []);
    console.log(books);
    // Hàm để chia mảng thành các dòng
    const chunkArray = (array, size) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };

    // Chia mảng thành các dòng có 3 phần tử
    const chunkedBooks = chunkArray(books, 4);

    //Thêm vào giỏ hàng
    const dispatch = useDispatch();
    const handleAddToCart = (book) => {
        dispatch(addToCart(book))
    }

    return (
        <div>
            <div>
                <h1 style={{ textAlign: "center" }}>Recent Book</h1>
                {chunkedBooks.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: "flex", justifyContent: "center", marginLeft: "115px" }}>
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
                                    marginRight: "100px",
                                }}
                            >
                                <img src={book.image} alt="" style={{ width: "200px", height: "200px" }} />
                                <h3 style={{ borderTop: "1px solid #d5c6c6", height: "70px" }}>{book.title}</h3>
                                <div>
                                    <Button className="ChooseBook" style={{ backgroundColor: "#ba2c39", color: "white" }} onClick={() => { handleAddToCart(book) }}>
                                        Add Cart
                                    </Button>
                                    <Button className="ChooseBook" style={{ backgroundColor: "#29943d", marginLeft: "10px", padding: "7px 10px" }}>
                                        {" "}
                                        <Link to={`/book/${book._id}`} style={{ color: "white" }}>
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
    );
}

export default HomeBookRecent;
