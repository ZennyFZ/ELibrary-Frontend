import React from "react";
import "../Home.scss";
function HomeBookRecent() {
    const bookData = [
        {
            name: "Book 1",
            script: "Script 1",
            img: "https://media.istockphoto.com/id/157482029/photo/stack-of-books.webp?b=1&s=170667a&w=0&k=20&c=pNbP11aM5NeRs9NgpmpsNbBhIYmH6xUti3Hij6qR040=",
        },
        {
            name: "Book 2",
            script: "Script 2",
            img: "https://lh3.googleusercontent.com/PfPvgDNI5yErGynpKI0D-QV0ZgRZi16XqXuoZ0W7wLfKf5TNvhGOT8FCuvso7fEMAo0n3tWgtfJ2wrXVwKErIC18CDuqFw=s1400",
        },
        {
            name: "Book 3",
            script: "Script 3",
            img: "https://img.freepik.com/free-vector/watercolor-stack-books-illustration_52683-82849.jpg",
        },
        {
            name: "Book 4",
            script: "Script 4",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnh9dCYH4Cm5c6NYGSo93pvY6IDLGNJ7tfDw&usqp=CAU",
        },
        {
            name: "Book 5",
            script: "Script 5",
            img: "https://thumbs.dreamstime.com/b/stack-books-isolated-6597303.jpg",
        },
        {
            name: "Book 6",
            script: "Script 6",
            img: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg",
        },
        {
            name: "Book 7",
            script: "Script 7",
            img: "https://png.pngtree.com/png-clipart/20190117/ourlarge/pngtree-hand-painted-teachers-day-a-stack-of-books-book-png-image_432486.jpg",
        },
        {
            name: "Book 8",
            script: "Script 8",
            img: "https://img.freepik.com/premium-photo/stack-books-with-floral-pattern-cover_789916-70.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1704240000&semt=sph",
        },
    ];

    // Hàm để chia mảng thành các dòng
    const chunkArray = (array, size) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };

    // Chia mảng thành các dòng có 3 phần tử
    const chunkedBooks = chunkArray(bookData, 4);

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
                                    textAlign: "center",
                                    padding: "15px",
                                    marginBottom: "50px",
                                    backgroundColor: "rgb(248 246 246)",
                                    marginRight: "100px",
                                }}
                            >
                                <img src={book.img} alt="" style={{ width: "200px", height: "200px" }} />
                                <h3 style={{ borderTop: "1px solid #d5c6c6" }}>{book.name}</h3>
                                <p className="abc">{book.script}</p>
                                <div>
                                    <button className="ChooseBook" style={{ backgroundColor: "#ba2c39", color: "white" }}>
                                        Add Cart
                                    </button>
                                    <button className="ChooseBook" style={{ backgroundColor: "#29943d", color: "white", marginLeft: "10px" }}>
                                        View
                                    </button>
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
