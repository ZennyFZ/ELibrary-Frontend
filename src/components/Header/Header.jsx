import { AppBar, Toolbar, Button, Avatar, Tooltip, IconButton, Typography, MenuItem, Menu, Icon } from "@mui/material";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../apis/UserService";
import { useState } from "react";
import { useEffect } from "react";
import { logout } from "../../apis/UserService";
import { useTranslation } from "react-i18next";
import VNIcon from "/images/VNFlag.png";
import USIcon from "/images/USFlag.png";

const Header = () => {
  const { t, i18n } = useTranslation("global");
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [languageIcon, setLanguageIcon] = useState(USIcon);
  const open = Boolean(anchorElLanguage);

  const handleOpenMenu = event => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseMenu = language => {
    setAnchorElLanguage(null);
    if (language === "vn" || language === "en") {
      language === "vn" ? setLanguageIcon(VNIcon) : setLanguageIcon(USIcon);
      i18n.changeLanguage(language);
      localStorage.setItem("language", language);
    }
  };
  const handleLogout = () => {
    logout()
      .then(res => {
        window.location.href = "/";
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const headerSection = [
    {
      section: t("Home"),
      link: "/"
    },
    {
      section: t("Books"),
      link: "/books"
    },
    {
      section: t("Book Trade"),
      link: "/booktrading"
    },
    {
      section: t("About"),
      link: "/about"
    },
    {
      section: t("Cart"),
      link: "/cart"
    }
  ];

  //get user data for profile, icon, history, . . .
  const [user, setUser] = useState(null);
  function getUserData() {
    getCurrentUser()
      .then(res => {
        setUser(res.data.user);
        console.log(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    getUserData();
  }, []);

  //show profile
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    getUserData();
    let language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
      language === "vn" ? setLanguageIcon(VNIcon) : null;
    }
  }, []);

  return (
    <div color="inherit" style={{ position: "static", width: "98.85vw" }} id="header">
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

          <img
            id="languageIcon"
            className="h-[25px] ml-6 cursor-pointer"
            aria-controls={open ? "languageMenu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleOpenMenu}
            src={languageIcon}
          />

          <Menu
            id="languageMenu"
            anchorEl={anchorElLanguage}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "languageIcon"
            }}
          >
            <MenuItem onClick={() => handleCloseMenu("vn")}>
              <img className="h-[25px]" src={VNIcon} />
              <div className="ml-2">VN</div>
            </MenuItem>
            <MenuItem onClick={() => handleCloseMenu("en")}>
              <img className="h-[25px]" src={USIcon} />
              <div className="ml-2">ENG</div>
            </MenuItem>
          </Menu>
          {/* Check Đăng Nhập */}

          {user ? (
            <div>
              <Tooltip
                title={t("Account info")}
                style={{ textDecoration: "none", color: "black", marginLeft: "2.5rem" }}
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/broken-image.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "40px" }}
                id="account-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/user" style={{ textDecoration: "none", color: "#000000DE" }}>
                      {t("Account info")}
                    </Link>
                  </Typography>
                </MenuItem>

                {user?.role === "admin" ? (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/admin" style={{ textDecoration: "none", color: "#000000DE" }}>
                        {t("Manage")}
                      </Link>
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/" style={{ textDecoration: "none", color: "#000000DE" }}>
                        {t("My books")}
                      </Link>
                    </Typography>
                  </MenuItem>
                )}

                <MenuItem>
                  <Typography textAlign="center" onClick={() => handleLogout()}>
                    {t("Logout")}
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: "none", marginLeft: "2.5rem" }}>
              <Button>
                <div className="NavItem">{t("Login")}</div>
              </Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </div>
  );
};

export default Header;
