import React, { useState } from "react";
import "./Menu.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className="menu-button" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
      {isOpen && (
        <div className="menu-content">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
