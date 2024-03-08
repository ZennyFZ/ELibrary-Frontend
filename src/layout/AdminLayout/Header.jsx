import React from "react";
import { Menu, Avatar, MenuItem, IconButton, Badge } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../../apis/UserService";

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const avt = Boolean(anchorEl);
  const [user, setUser] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function getUserData() {
    getCurrentUser()
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    logout()
      .then(res => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/"); // navigate to home after logout
        console.log(res.status);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "30px 40px" }}>
        <div>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>Hello, admin</div>
          <div style={{ color: "#757575", fontSize: "14px", fontWeight: "400" }}>Have a nice day</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton style={{ marginRight: "24px" }}>
            <Badge color="info" invisible={false} size="small" variant="dot">
              <NotificationsIcon fontSize="small" color="action" />
            </Badge>
          </IconButton>
          <div style={{ display: "flex", borderLeft: "1px solid #C2C2C2", paddingLeft: "24px" }}>
            <Avatar alt="Remy Sharp" src="" />
            <div style={{ marginLeft: "16px" }}>
              <div style={{ fontWeight: "600", lineHeight: "150%" }}>{user?.name}</div>
              <div style={{ fontWeight: "400", fontSize: "12px" }}>Admin</div>
            </div>
            <div>
              <IconButton aria-label="delete" size="small" onClick={handleClick}>
                <KeyboardArrowDownIcon
                  id="arrow-down"
                  aria-controls={avt ? "arrow-down-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={avt ? "true" : undefined}
                />
              </IconButton>
              <Menu
                id="arrow-down-menu"
                anchorEl={anchorEl}
                open={avt}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "arrow-down"
                }}
              >
                <MenuItem>
                  <Link to="/" style={{ textDecoration: "none", color: "#000000DE" }}>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
