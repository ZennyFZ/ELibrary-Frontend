import { Toolbar, Button, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../apis/UserService";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Select from "@mui/material/Select";

const Header = () => {
  const [t, i18n] = useTranslation("global");
  const handleChangeLanguage = language => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const headerSection = [
    {
      section: t("Home"),
      link: "/"
    },
    {
      section: t("Books"),
      link: "/"
    },
    {
      section: t("About"),
      link: "/about"
    }
  ];

  //get user data for profile, icon, history, . . .
  const [user, setUser] = useState(null);
  function getUserData() {
    getCurrentUser()
      .then(res => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    // getUserData()
  }, []);

  return (
    <div color="inherit" id="header">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <img src="/images/Logo.png" alt="logo" style={{ width: "6rem", height: "5rem" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          {headerSection.map((item, index) => (
            <Link
              to={`${item.link}`}
              key={index}
              style={{ textDecoration: "none", color: "black", marginLeft: "2.5rem" }}
            >
              {item.section}
            </Link>
          ))}
          <Select
            sx={{
              ml: "20px",
              mt: "2px",
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                border: 0
              },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: 0
              }
            }}
            defaultValue={localStorage.getItem("language") ?? "en"}
            onChange={e => {
              handleChangeLanguage(e.target.value);
            }}
          >
            <MenuItem value="en">Eng</MenuItem>
            <MenuItem value="vn">Vn</MenuItem>
          </Select>

          <Link to="/login" style={{ textDecoration: "none", color: "black", marginLeft: "1.5rem" }}>
            <Button variant="outlined" style={{ backgroundColor: "aliceblue" }}>
              Login
            </Button>
          </Link>
        </div>
      </Toolbar>
    </div>
  );
};

export default Header;
