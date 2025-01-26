import {
  IonPage,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonContent,
  IonIcon,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { chevronDownOutline } from "ionicons/icons";
import styles from "./Payments.module.css";
import Space from "../../../components/Space";
import { useHistory } from "react-router-dom";

function Payments() {
  const history = useHistory();
  const [selectedMethod, setSelectedMethod] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedTreatment, setSelectedTreatment] = useState("all");
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTreatmentDropdown, setShowTreatmentDropdown] = useState(false);
  const [selectedMethodText, setSelectedMethodText] = useState("Method");
  const [selectedDateText, setSelectedDateText] = useState("Date");
  const [selectedTreatmentText, setSelectedTreatmentText] =
    useState("Treatment");

  const methodOptions = ["Card", "Cash", "Transfer"];
  const dateOptions = ["Today", "This Week", "This Month"];
  const treatmentOptions = ["Manicure", "Pedicure", "Hair Cut"];

  const mockPayments = [
    {
      date: "Aug 10",
      amount: "N30,000",
      method: "Card",
      treatment: "Manicure",
    },
    {
      date: "Aug 10",
      amount: "N15,000",
      method: "Card",
      treatment: "Pedicure",
    },
    {
      date: "Aug 10",
      amount: "N7,500",
      method: "Card",
      treatment: "Hair Cut",
    },
  ];

  const clearFilters = () => {
    setSelectedMethod("all");
    setSelectedMethodText("Method");
    setSelectedDate("all");
    setSelectedDateText("Date");
  };

  const payments = mockPayments.filter((payment) => {
    const methodMatch =
      selectedMethod === "all" || payment.method === selectedMethod;
    const dateMatch = selectedDate === "all" || payment.date === selectedDate;
    return methodMatch && dateMatch;
  });

  useEffect(() => {
    const handleClickOutside = () => {
      setShowMethodDropdown(false);
      setShowDateDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDetailsClick = () => {
    history.push("/tabs/payments/transaction_details");
  };

  return (
    <IonPage>
      <IonContent>
        <div className="tab-content">
          <Header type="tabView" mainText="Payments" />

          <div className={styles.filterContainer}>
            <div className={styles.filterGroup}>
              {/* Similar filter buttons structure as Bookings */}
              {/* Method Filter */}
              <div className={styles.filterWrapper}>
                <button
                  className={`${styles.filterButton} ${
                    selectedMethodText !== "Method"
                      ? styles.filterButtonActive
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMethodDropdown(!showMethodDropdown);
                    setShowDateDropdown(false);
                  }}
                >
                  {selectedMethodText} <IonIcon icon={chevronDownOutline} />
                </button>
                {showMethodDropdown && (
                  <div className={styles.dropdown}>
                    {methodOptions.map((option) => (
                      <div
                        key={option}
                        className={styles.dropdownOption}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMethod(option);
                          setSelectedMethodText(option);
                          setShowMethodDropdown(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Date and Treatment filters similar to Method filter */}
              <div className={styles.filterWrapper}>
                <button
                  className={`${styles.filterButton} ${
                    selectedDateText !== "Date" ? styles.filterButtonActive : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDateDropdown(!showDateDropdown);
                    setShowMethodDropdown(false);
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
            </div>

            {(selectedMethodText !== "Method" ||
              selectedDateText !== "Date") && (
              <button className={styles.clearButton} onClick={clearFilters}>
                Clear Filters
              </button>
            )}
          </div>

          <Space height="20px" />
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <div className={styles.flexRow} key={index}>
                <div style={{ display: "inline-block" }}>
                  <div className={styles.day}>{payment.date}</div>
                  <div className={styles.time}>
                    {payment.amount} · {payment.method}
                  </div>
                </div>
                <Space width="100%" />
                <button
                  className={styles.detailsButton}
                  onClick={handleDetailsClick}
                >
                  Details
                </button>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", color: "#666" }}>
              💰 <br />
              No payments found
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(Payments);
