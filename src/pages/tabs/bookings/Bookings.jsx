import { IonPage, IonContent, IonIcon } from "@ionic/react";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { addOutline, chevronDownOutline } from "ionicons/icons";
import styles from "./Bookings.module.css";
import Space from "../../../components/Space";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";

function Bookings() {
  const history = useHistory();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTreatmentDropdown, setShowTreatmentDropdown] = useState(false);
  const [selectedStatusText, setSelectedStatusText] = useState("Status");
  const [selectedDateText, setSelectedDateText] = useState("Date");
  const [selectedTreatmentText, setSelectedTreatmentText] =
    useState("Treatment");
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedTreatment, setSelectedTreatment] = useState("all");

  const statusOptions = ["All", "Upcoming", "Past"];
  const dateOptions = ["Today", "This Week", "This Month"];
  const treatmentOptions = ["Manicure", "Pedicure", "Hair Cut"]; // Add your treatments here

  //const bookings = business.bookings ?? [];

  const mockBookings = [
    {
      date: "Aug 10",
      treatment: "Manicure",
      staff: "Bukola",
      client: "Ice Prince",
      phone: "08033019874",
      status: "past",
    },
    {
      date: "Aug 14",
      treatment: "Manicure",
      staff: "Bukola",
      client: "Lamii Wonder",
      phone: "08033019874",
      status: "upcoming",
    },
    // Add more mock bookings as needed
  ];

  const handleDateFilter = (bookingDate, filter) => {
    const today = moment().format("MMM DD");
    const bookingMoment = moment(bookingDate, "MMM DD");

    switch (filter.toLowerCase()) {
      case "today":
        return bookingDate === today;
      case "this week":
        return bookingMoment.isSame(moment(), "week");
      case "this month":
        return bookingMoment.isSame(moment(), "month");
      default:
        return true;
    }
  };

  const clearFilters = () => {
    setSelectedStatus("all");
    setSelectedStatusText("Status");
    setSelectedDate("all");
    setSelectedDateText("Date");
    setSelectedTreatment("all");
    setSelectedTreatmentText("Treatment");
  };

  const bookings = mockBookings.filter((booking) => {
    const statusMatch =
      selectedStatus === "all" || booking.status === selectedStatus;
    const treatmentMatch =
      selectedTreatment === "all" || booking.treatment === selectedTreatment;
    const dateMatch =
      selectedDate === "all" || handleDateFilter(booking.date, selectedDate);
    return statusMatch && treatmentMatch && dateMatch;
  });

  const addBooking = () => {
    history.push("/tabs/bookings/add");
  };
  /*
  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];*/

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowStatusDropdown(false);
      setShowDateDropdown(false);
      setShowTreatmentDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
            marginTop="0px"
          />

          <div className={styles.filterContainer}>
            <div className={styles.filterGroup}>
              <div className={styles.filterWrapper}>
                <button
                  className={`${styles.filterButton} ${
                    selectedStatusText !== "Status"
                      ? styles.filterButtonActive
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowStatusDropdown(!showStatusDropdown);
                    setShowDateDropdown(false);
                    setShowTreatmentDropdown(false);
                  }}
                >
                  {selectedStatusText} <IonIcon icon={chevronDownOutline} />
                </button>
                {showStatusDropdown && (
                  <div className={styles.dropdown}>
                    {statusOptions.map((option) => (
                      <div
                        key={option}
                        className={styles.dropdownOption}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStatus(option.toLowerCase());
                          setSelectedStatusText(option);
                          setShowStatusDropdown(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.filterWrapper}>
                <button
                  className={`${styles.filterButton} ${
                    selectedDateText !== "Date" ? styles.filterButtonActive : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDateDropdown(!showDateDropdown);
                    setShowStatusDropdown(false);
                    setShowTreatmentDropdown(false);
                  }}
                >
                  {selectedDateText} <IonIcon icon={chevronDownOutline} />
                </button>
                {showDateDropdown && (
                  <div className={styles.dropdown}>
                    {dateOptions.map((option) => (
                      <div
                        key={option}
                        className={styles.dropdownOption}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDate(option.toLowerCase());
                          setSelectedDateText(option);
                          setShowDateDropdown(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.filterWrapper}>
                <button
                  className={`${styles.filterButton} ${
                    selectedTreatmentText !== "Treatment"
                      ? styles.filterButtonActive
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTreatmentDropdown(!showTreatmentDropdown);
                    setShowStatusDropdown(false);
                    setShowDateDropdown(false);
                  }}
                >
                  {selectedTreatmentText} <IonIcon icon={chevronDownOutline} />
                </button>
                {showTreatmentDropdown && (
                  <div className={styles.dropdown}>
                    {treatmentOptions.map((option) => (
                      <div
                        key={option}
                        className={styles.dropdownOption}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTreatment(option);
                          setSelectedTreatmentText(option);
                          setShowTreatmentDropdown(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {(selectedStatusText !== "Status" ||
              selectedDateText !== "Date" ||
              selectedTreatmentText !== "Treatment") && (
              <button className={styles.clearButton} onClick={clearFilters}>
                Clear Filters
              </button>
            )}
          </div>

          <Space height="10px" />
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div className={styles.flexRow} key={index}>
                <div style={{ display: "inline-block" }}>
                  <div className={styles.day}>{booking.date}</div>
                  <div className={styles.time}>
                    {booking.treatment} · {booking.staff}
                  </div>
                  <div className={styles.time}>
                    {booking.client} · {booking.phone}
                  </div>
                </div>
                <Space width="100%"></Space>
                <h4 style={{ fontWeight: "500" }}>
                  {booking.status === "upcoming" ? "Upcoming" : "Past"}
                </h4>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", color: "#666" }}>
              👑 <br />
              Stay calm <br /> No bookings found
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(Bookings);
