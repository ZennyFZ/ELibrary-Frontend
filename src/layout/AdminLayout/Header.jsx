import React from "react";
import { Menu, Avatar, MenuItem, IconButton, Badge } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const avt = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate("/");
  };
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
              <div style={{ fontWeight: "600", lineHeight: "150%" }}>Nguyen Van A</div>
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
                  "aria-labelledby": "arrow-down",
                }}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
