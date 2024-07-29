import React from "react";

function Space(prop) {
  return (
    <div
      style={{
        height: prop.height,
        width: prop.width,
        flexGrow: prop.flexGrow,
      }}
    ></div>
  );
}

export default Space;
