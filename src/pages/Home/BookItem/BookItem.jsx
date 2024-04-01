import React, { useEffect, useState } from "react";
import "./BookItem.scss";
import { useParams } from "react-router-dom";
import { getBook } from "../../../apis/BookService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Cart/CartSlice";

function BookItem() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  console.log(book);
  const dispatch = useDispatch();
  const handleAddToCart = book => {
    dispatch(addToCart(book));
  };
  useEffect(() => {
    getBook(id).then(res => {
      setBook(res.data);
    });
  }, []);
  return (
    <div style={{ backgroundColor: "rgb(244 244 244)", paddingBottom: "20px" }}>
      <div className="title"></div>
      <div className="Book-body" style={{ backgroundColor: "rgb(239 242 255)" }}>
        <div className="half-width" style={{ marginLeft: "40px" }}>
          <p style={{ fontSize: "22px", fontWeight: "500" }}>
            <h2>{book?.book?.title}</h2>
          </p>
          <p>
            {" "}
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>Description : </span> <br />
            <span style={{ color: "rgb(114 109 109)" }}>{book?.book?.description}</span>
          </p>
          <p style={{ fontSize: "22px", fontWeight: "500" }}>
            Author Name : <span>{book?.book?.author}</span>
          </p>
          <p style={{ fontSize: "22px", fontWeight: "500" }}>
            Page : <span>{book?.book?.pages}</span>
          </p>
          <p style={{ fontSize: "22px", fontWeight: "500" }}>
            Price : <span style={{ color: "#236d23" }}>{book?.book?.price} VND</span>
          </p>
          <button
            onClick={() => {
              handleAddToCart(book?.book);
            }}
          >
            Add To Cart
          </button>
        </div>
        <div
          className="half-width"
          style={{ backgroundColor: "white", borderRadius: "100% 0% 42% 58% / 41% 100% 0% 59% " }}
        >
          <img
            style={{
              marginTop: "20px",
              paddingLeft: "37px",
              width: "90%",
              height: "90%",
              marginLeft: "45px",
              borderRadius: "110px"
            }}
            src={book?.book?.image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default BookItem;
