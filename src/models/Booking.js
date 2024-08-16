import { collection, addDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { business } from "ionicons/icons";

class Service {
  constructor(service, price, notes) {
    this.service = service;
    this.price = price;
    this.notes = notes;
  }

  toMap() {
    return {
      service: this.service,
      price: this.price,
      notes: this.notes,
    };
  }
}

class Booking {
  constructor(object) {
    this.id = object?.id ?? null;
    this.email = object?.email ?? "";
    this.firstName = object?.firstName ?? "";
    this.lastName = object?.lastName ?? "";
    this.phoneNumber = object?.phoneNumber ?? "";
    this.date = object?.date ?? null;
    this.service = object?.service ?? null;
    this.staff = object?.staff ?? "";
  }

  getInfo() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      date: this.date,
      service: this.service,
      staff: this.staff,
    };
  }

  // Method to update user's name
  updateFirstName(newFirstName) {
    this.firstName = newFirstName;
  }

  // Method to update user's email
  updateLastName(newLastName) {
    this.lastName = newLastName;
  }

  // Method to update user's email
  updateEmail(newEmail) {
    this.email = newEmail;
  }

  // Method to update user's email
  updatePhoneNumber(newPhoneNumber) {
    this.phoneNumber = newPhoneNumber;
  }

  // Method to update user's email
  updateDate(newDate) {
    this.date = newDate;
  }

  // Method to update user's email
  updateService(newService) {
    this.service = newService;
  }

  // Method to update user's email
  updateStaff(newStaff) {
    this.staff = newStaff;
  }

  updateTime(newTime) {
    this.date = this.date.set(newTime);
  }

  clone() {
    return new Booking(this.getInfo());
  }

  async register() {
    console.log(this.getInfo());
    const docId = localStorage.getItem("businessId");

    let bookingDate = this.date;

    //const bookingPath = `/bookings/${year}/${month}/${day}`;
    const docRef = doc(db, "businesses", docId);
    // Reference to the year document
    const bookingCollectionRef = collection(docRef, `bookings`);

    // Set the booking document
    await addDoc(bookingCollectionRef, {
      ...this.getInfo(),
      date: Timestamp.fromDate(new Date(this.date.toMillis())),
      year: bookingDate.year,
      month: String(bookingDate.month).padStart(2, "0"),
      day: String(bookingDate.day).padStart(2, "0"),
    });

    /*
    const docRef = doc(db, "businesses", docId);
    localStorage.clear();
    // Update the document with the new item in the list
    await updateDoc(docRef, {
      bookings: arrayUnion({
        ...this.getInfo(),
        date: Timestamp.fromDate(new Date(this.date.toMillis())),
      }),
    });*/
  }
}

export default Booking;

export { Service };
