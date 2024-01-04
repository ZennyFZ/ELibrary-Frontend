import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    const headerSection = ["Home", "Books", "Contact", "About"];

    return (
        <AppBar color="inherit" style={{ position: "static", width: "98.9vw" }}>
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <a href="#">
                        <img src="" alt="" style={{ width: "auto", height: 40 }} />
                    </a>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {headerSection.map((section, index) => (
                        <Link to={`/${section}`} key={index} style={{ textDecoration: "none", color: "black", marginLeft: "0.5rem" }}>
                            {section}
                        </Link>
                    ))}
                    <Button variant="contained" color="primary" style={{ marginLeft: "2rem" }}>
                        Login
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
