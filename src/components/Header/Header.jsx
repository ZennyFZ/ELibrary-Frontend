import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    const headerSection = [
        {
            section: "Home",
            link: "/",
        },
        {
            section: "Books",
            link: "/",
        },
        {
            section: "Premium",
            link: "/",
        },
        {
            section: "About",
            link: "/about",
        },
    ];

    return (
        <AppBar color="inherit" style={{ position: "static", width: "98.9vw" }} id="header">
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <img src="/images/Logo.png" alt="logo" style={{ width: "6rem", height: "5rem" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {headerSection.map((item, index) => (
                        <Link to={`${item.link}`} key={index} style={{ textDecoration: "none", color: "black", marginLeft: "2.5rem" }}>
                            {item.section}
                        </Link>
                    ))}
                    <Link to="/login" style={{ textDecoration: "none", color: "black", marginLeft: "5.5rem" }}>
                        <Button variant="outlined" style={{ backgroundColor: "aliceblue" }}>
                            Login
                        </Button>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
