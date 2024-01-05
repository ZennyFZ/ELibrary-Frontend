import React from "react";
import "./Home.scss";
function HomeIntro() {
    return (
        <div className="book-intro" style={{ height: "200px", width: "100%" }}>
            <div style={{ color: "white", textAlign: "center", fontSize: "45px", paddingTop: "20px", fontWeight: "500" }}>E-Library</div>
            <div style={{ color: "white", textAlign: "center", fontSize: "20px", paddingTop: "20px", fontWeight: "500" }}>Unlock a world of knowledge with E-Library: Where pages come alive.</div>
        </div>
    );
}

export default HomeIntro;
