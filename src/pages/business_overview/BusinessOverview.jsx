import React from "react";
import WhiteLogo from "../../components/WhiteLogo";
import Heading from "./components/Heading";

function BusinessOverview() {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <img
        src="https://picsum.photos/500/500"
        alt="salon"
        style={{
          width: "100%",
          height: "280px",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      />
      <div
        className="top-rounded-card"
        style={{
          position: "absolute",
          marginTop: "230px",
          left: "0px",
          right: "0px",
          boxShadow: "0 -5px rgb(0, 0, 0, 0.19)",
          backgroundColor: "#191919",
        }}
      >
        <header className="menu-bar">
          <div style={{ position: "relative" }}>
            <WhiteLogo height="90px" width="130px" />
            <div
              style={{
                color: "white",
                position: "absolute",
                bottom: "10px",
                right: "10px",
                fontSize: "12px",
              }}
            >
              Hair Salon
            </div>
          </div>
          <button
            style={{
              height: "42px",
              width: "83px",
              borderRadius: "12px",
              fontSize: "10px",
              fontWeight: "600px",
              color: "rgba(0,0,0,1)",
              backgroundColor: "white",
            }}
          >
            BOOK NOW
          </button>
        </header>
        <Heading text="About" />
        <p></p>
        <Heading text="Services" />
        <p></p>
        <Heading text="Policies" />
      </div>
    </div>
  );
}

export default BusinessOverview;
