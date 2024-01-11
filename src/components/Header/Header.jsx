import { AppBar, Toolbar, Button} from "@mui/material";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../apis/UserService";
import { useState } from "react";
import { useEffect } from "react";
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
            section: "About",
            link: "/about",
        },
    ];


    //get user data for profile, icon, history, . . .
    const [user, setUser] = useState(null);
    function getUserData() {
        getCurrentUser().then(res => {
          setUser(res.data);
          console.log(res.data)
        }).catch(err => {
          console.log(err);
        })
      }

      useEffect(()=>{
        getUserData()
    },[])

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
