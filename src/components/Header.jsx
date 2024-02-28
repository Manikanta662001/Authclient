import React from "react";
import Avatar from "@mui/material/Avatar";
import "./Header.css";

function Header() {
  return (
    <>
      <header>
        <nav>
          <h1>Mani Cloud</h1>
          <div className="avtar">
            <Avatar>M</Avatar>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
