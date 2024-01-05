import React from "react";
import "./HeaderList.scss";
function HeaderAbout() {
    return (
        <div>
            <div className="header-about">
                <p style={{ marginBottom: "165px" }}>ABOUT US</p>
            </div>
            <div className="contact-content">
                <div className="about-info">
                    <div>
                        <p>
                            <span style={{ fontWeight: "bold" }}>Introduction :</span> Welcome to our online library website! We are thrilled to
                            provide you with a convenient and accessible way to explore a vast collection of books, articles, and resources from the
                            comfort of your own home.
                        </p>
                        <p>
                            <span style={{ fontWeight: "bold" }}>Overview :</span> Our online library offers a diverse range of materials across
                            various genres, including fiction, non-fiction, academic literature, research papers, magazines, and more. Whether you're
                            a passionate reader, a student, or a knowledge seeker, our library is designed to cater to your interests and learning
                            needs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAbout;
