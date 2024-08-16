import React, { useContext, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./VerticalSwiper.module.css";

// import required modules
import { Pagination } from "swiper/modules";
import Space from "../Space";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { BusinessContext } from "../../providers/BusinessProvider";
import { DateTime } from "luxon";

function VerticalSwiper() {
  const { business } = useContext(BusinessContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (business.id) {
      const fetchBookings = async () => {
        try {
          const businessDocRef = doc(db, "businesses", business.id);

          // Reference the 'bookings' subcollection of this document
          const bookingsCollectionRef = collection(businessDocRef, "bookings");

          // Get the documents in the 'bookings' subcollection
          const querySnapshot = await getDocs(bookingsCollectionRef);

          // Map over documents and extract data
          const bookingsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(bookingsData);

          const upcomingBookings = bookingsData.filter(
            (booking) => booking.date && booking.date.toDate() >= Date.now()
          );

          upcomingBookings.sort((a, b) => a.date.toDate() - b.date.toDate());

          // Update state with bookings data
          setBookings(upcomingBookings);
          setLoading(false);
        } catch (error) {
          console.log(error);
          alert("Error fetching bookings: ", error);
          setLoading(false);
        }
      };
      fetchBookings();
    }
  }, [business.id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <Swiper
      direction={"vertical"}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={styles.swiper}
    >
      {bookings.map((booking) => (
        <SwiperSlide className={styles.swiperSlide} key={booking.id}>
          <div>
            <span>
              <span style={{ fontSize: "50px" }}>
                {booking.date
                  .toDate()
                  .toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .toUpperCase()}
              </span>
            </span>
            <Space height="5px" />
            <span style={{ fontSize: "16px" }}>
              Client: {booking.firstName} {booking.lastName}
            </span>
            <Space height="2px" />
            <span style={{ fontSize: "16px" }}>
              Treatment: {booking.service.service}
            </span>
            <Space height="2px" />
            <span style={{ fontSize: "16px" }}>Staff: {booking.staff}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default VerticalSwiper;
