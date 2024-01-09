import React from "react";
import "./BookItem.scss";
import { useParams } from "react-router-dom";
function BookItem() {
    const { id } = useParams();
    console.log(id);
    return (
        <div style={{ backgroundColor: "rgb(244 244 244)", paddingBottom: "20px" }}>
            <div className="title"></div>
            <div className="Book-body">
                <div className="half-width" style={{ borderRight: "2px solid #e5dfdf" }}>
                    <img style={{ width: "300px", height: "400px" }} src="https://images.penguinrandomhouse.com/cover/9780593658543" alt="" />
                </div>

                <div className="half-width" style={{ marginTop: "50px" }}>
                    <p style={{ fontSize: "22px", fontWeight: "500" }}>
                        Book Name : <span style={{ color: "green" }}>Who was Langston Hughes</span>
                    </p>
                    <p style={{ fontSize: "22px", fontWeight: "500" }}>
                        Author Name : <span style={{ color: "green" }}>Billy Merrel</span>
                    </p>
                    <p style={{ fontSize: "22px", fontWeight: "500" }}>
                        Price : <span style={{ color: "green" }}>1000$</span>
                    </p>
                    <button>Add To Cart</button>
                </div>
            </div>
        </div>
    );
}

export default BookItem;
