import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./error.scss";

export default function Error() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (count === -1) {
      navigate("/");
    }
  }, [count]);
  return (
    <div style={{ textAlign: "center" }}>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Oops! Nothing was found</h2>
          <p>
            The page you are looking for might have been removed had its name changed or is temporarily unavailable.
            <br />
            <a href="/"> Return to Homepage in {count} seconds. </a>
          </p>
        </div>
      </div>
    </div>
  );
}
