import React from "react";
import { useNavigate } from "react-router-dom";

function Card(prop) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/business_overview`);
  };

  return (
    <div className={prop.className} onClick={handleClick}>
      <div className="menu-bar">
        <p style={{ fontSize: "15px", fontWeight: "600", textAlign: "left" }}>
          Aphro Hair Salon
        </p>
        <img
          src="https://picsum.photos/55/50"
          alt="salon"
          style={{ borderRadius: "15px" }}
        ></img>
      </div>
      <div className="menu-bar">
        <p style={{ fontSize: "10px", textAlign: "left" }}>
          152 Elegushi, Lekki Lagos
        </p>
        <span>&gt;</span>
      </div>
    </div>
  );
}

export default Card;
