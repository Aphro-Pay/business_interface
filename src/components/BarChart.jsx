import React from "react";
import Space from "./Space";

function Bar(prop) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span>{prop.count}</span>
      <Space height="5px" />
      <div
        style={{
          height: prop.height,
          width: "30px",
          backgroundColor: "#CCD9EB",
          borderRadius: "10px",
        }}
      ></div>
      <Space height="5px" />
      <span>{prop.day}</span>
    </div>
  );
}

function BarChart() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F0F2F5",
        height: "180px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#F0F2F5",
          alignItems: "end",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <Bar day="Mon" height="60px" count="" />
        <Bar day="Tue" height="120px" count="" />
        <Bar day="Wed" height="60px" count="" />
        <Bar day="Thur" height="40px" count="" />
        <Bar day="Fri" height="100px" count="10" />
        <Bar day="Sat" height="50px" count="" />
        <Bar day="Sun" height="40px" count="" />
      </div>
    </div>
  );
}

export default BarChart;
