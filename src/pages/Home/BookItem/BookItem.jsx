import React, { useEffect, useState } from "react";
import "./BookItem.scss";
import { useParams } from "react-router-dom";
import { getBook } from "../../../apis/BookService";


function BookItem() {
    const { id } = useParams();
    const [book, setBook] = useState({});
    console.log(book);
    useEffect(() => {
        getBook(id).then((res) => {
            setBook(res.data);
        });
    }, []);
    return (
        <div style={{ backgroundColor: "rgb(244 244 244)", paddingBottom: "20px" }}>
            <div className="title"></div>
            <div className="Book-body">
                <div className="half-width" style={{ borderRight: "2px solid #e5dfdf" }}>
                    <img style={{ width: "400px", height: "400px" }} src={book?.book?.image} alt="" />
                </div>

                <div className="half-width" style={{ marginTop: "50px" }}>
                    <p style={{ fontSize: "22px", fontWeight: "500" }}>
                        Book Name : <span style={{ color: "green" }}>{book?.book?.title}</span>
                    </p>
                    <p style={{ fontSize: "22px", fontWeight: "500" }}>
                        Author Name : <span style={{ color: "green" }}>{book?.book?.author}</span>
                    </p>
                    <p style={{ fontSize: "22px", fontWeight: "500" }}>
                        Price : <span style={{ color: "green" }}>{book?.book?.price} $</span>
                    </p>
                    <button>Add To Cart</button>
                </div>
            </div>
        </div>
    );
}

export default BookItem;
