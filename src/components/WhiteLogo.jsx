import React from "react";

function BlackLogo(prop) {
  return (
    <img
      src="./assets/images/aphro_logo_white.png"
      className="App-logo"
      alt="logo"
      style={{ width: prop.width, height: prop.height }}
    />
  );
}

export default BlackLogo;
