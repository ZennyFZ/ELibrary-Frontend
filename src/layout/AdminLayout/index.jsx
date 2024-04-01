import React from "react";
import logo from "/images/Logo.png";
import "./AdminLayout.scss";
import CategoryIcon from "@mui/icons-material/Category";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const menu = [
  { name: "Orders", url: "ordersDetail", icon: <ShoppingBagIcon /> },
  { name: "Book", url: "manageBook", icon: <AutoStoriesIcon /> },
  { name: "Category", url: "manageCategory", icon: <CategoryIcon /> }
];

export function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lastURL = pathname.split("/").pop();

  return (
    <div style={{ background: "#F5F5F5", height: "100vh", overflow: "auto" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ background: "white", width: "250px", display: "flex", flexFlow: "column" }}>
          <img style={{ margin: "16px auto", width: "80px", height: "80px" }} src={logo} />
          <Divider />
          <List>
            {menu.map((item, index) => (
              <ListItem
                onClick={() => {
                  navigate(item.url);
                }}
                disablePadding
                key={index}
                className={item.url === lastURL ? "selected-menu" : null}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "initial",
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: "center"
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <div style={{ width: "calc(100vw - 250px)" }}>
          <Header />
          <div style={{ margin: "24px" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
