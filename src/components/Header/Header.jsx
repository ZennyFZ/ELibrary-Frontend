import { AppBar, Toolbar, Button, Avatar, Tooltip, IconButton, Typography, MenuItem, Menu, Icon} from "@mui/material";
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
        {
          section: "Cart",
          link: "/cart",
      },
    ];


    //get user data for profile, icon, history, . . .
    const [user, setUser] = useState(null);
    function getUserData() {
        getCurrentUser().then(res => {
          setUser(res.data.user);
          console.log(res.data.user)
        }).catch(err => {
          console.log(err);
        })
      }

      useEffect(()=>{
        // getUserData()
    },[])
    //show profile
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
        <AppBar color="inherit" style={{ position: "static", width: "98.85vw" }} id="header">
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
            {/* Check Đăng Nhập */}
            
            {user ? (
              <div>
              <Tooltip title="Thông tin cá nhân" style={{ textDecoration: "none", color: "black", marginLeft: "5.5rem" }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/broken-image.jpg"/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "40px" }}
                id="account-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                Pa
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/user" style={{ textDecoration: "none", color: "#000000DE" }}>
                      Thông tin cá nhân
                    </Link>
                  </Typography>
                </MenuItem>

                {user?.role === "admin" ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/admin" style={{ textDecoration: "none", color: "#000000DE" }}>
                      Quản lí
                    </Link>
                  </Typography>
                </MenuItem>
                ) : (
                  <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/" style={{ textDecoration: "none", color: "#000000DE" }}>
                      Kho sách
                    </Link>
                  </Typography>
                </MenuItem>
                )}
                
                <MenuItem>
                  <Typography textAlign="center" 
                  // onClick={() => logout()}
                  >
                    Đăng Xuất
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button>
                  <div className="NavItem">
                    Đăng Nhập
                  </div>
                </Button>
              </Link>
            )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
