import React from "react";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img
        src="./assets/images/aphro_logo_black.png"
        className="App-logo"
        alt="logo"
        style={{
          animation: "App-logo-spin infinite 20s linear",
          height: "150px",
          width: "150px",
        }}
      />
    </div>
  );
}

export default Loading;
