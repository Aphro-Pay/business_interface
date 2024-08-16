import {
  IonPage,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonContent,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../../components/Header";
import { addOutline, book } from "ionicons/icons";
import styles from "./Bookings.module.css";
import Space from "../../../components/Space";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ComingSoon from "../../../components/ComingSoon";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { DateTime } from "luxon";

function Bookings() {
  const { business } = useContext(BusinessContext);
  const history = useHistory();
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

          bookingsData.sort((a, b) => b.date - a.date);

          // Update state with bookings data
          setBookings(bookingsData);
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

  const addBooking = () => {
    history.push("/tabs/bookings/add");
  };
  return (
    <IonPage>
      <IonContent>
        <div className="tab-content">
          <Header
            mainText="Bookings"
            type="tabView"
            enableIcon="y"
            icon={addOutline}
            onClick={addBooking}
          />
          {/* <div>
            <IonSegment color="light" value="default">
              <IonSegmentButton value="default">
                <IonLabel>Status</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="date">
                <IonLabel>Date</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="treatment">
                <IonLabel>Treatment</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>*/}

          <Space height="20px" />
          {bookings.map((booking, index) => (
            <div className={styles.flexRow} key={index}>
              <div style={{ display: "inline-block" }}>
                <div className={styles.day}>
                  {DateTime.fromJSDate(booking.date.toDate()).monthShort}{" "}
                  {booking.day}
                </div>
                <Space height="5px" />
                <div className={styles.time}>
                  {booking.service.service}. {booking.staff}
                </div>
                <Space height="3px" />
                <div className={styles.time}>
                  {booking.firstName} {booking.lastName} . {booking.phoneNumber}
                </div>
              </div>
              <Space flexGrow="1"></Space>
              <h4 style={{ fontWeight: "500" }}>
                {booking.date.toDate() < Date.now() ? "Past" : "Upcoming"}
              </h4>
            </div>
          ))}
          <div
            className="flexColumn"
            style={{ justifyContent: "center", flex: 0.8 }}
          ></div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(Bookings);
