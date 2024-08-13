import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./VerticalSwiper.module.css";

// import required modules
import { Pagination } from "swiper/modules";
import Space from "../Space";

function VerticalSwiper() {
  return (
    <Swiper
      direction={"vertical"}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={styles.swiper}
    >
      <SwiperSlide className={styles.swiperSlide}>
        <div>
          <span>
            <span style={{ fontSize: "50px" }}>10:30</span>
            <span style={{ fontSize: "30px" }}>AM</span>
          </span>
          <Space height="5px" />
          <span style={{ fontSize: "16px" }}>Client: Paul Okoye</span>
          <Space height="2px" />
          <span style={{ fontSize: "16px" }}>Treatment: Hair cut</span>
          <Space height="2px" />
          <span style={{ fontSize: "16px" }}>Staff: Ololade</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
    </Swiper>
  );
}

export default VerticalSwiper;
