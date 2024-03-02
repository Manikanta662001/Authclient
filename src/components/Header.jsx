import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./Header.css";
import { useUserContext } from "./authContext/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/utils";

function Header() {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn, setCurrentUser, setIsLoggedIn } =
    useUserContext();
  console.log(currentUser, isLoggedIn, "88");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    if (!isLoggedIn) {
      navigate("*");
    } else {
      navigate("/dashboard");
    }
  };
  const handleLogout = () => {
    setAnchorEl(null);
    setCurrentUser({});
    setIsLoggedIn(false);
    setCookie("", 0);
  };
  return (
    <>
      <header>
        <nav>
          <h1>Mani Cloud</h1>
          <div className="avtar">
            {currentUser?.name ? (
              <Avatar onClick={handleClick}>
                {currentUser?.name[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar onClick={handleClick}></Avatar>
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              {isLoggedIn && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
            </Menu>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
