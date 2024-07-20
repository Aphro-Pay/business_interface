import React from "react";
import Space from "./Space";

function ComingSoon() {
  return (
    <div className="flexColumn">
      <div
        className="flexRow"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <img
          src="/assets/images/aphro_pay_logo.jpg"
          alt="logo"
          width="25%"
          className="App-logo"
        />
      </div>
      <Space height="15px" />
      <span style={{ textAlign: "center", color: "#004096" }}>
        Coming Soon!
      </span>
    </div>
  );
}

export default ComingSoon;
