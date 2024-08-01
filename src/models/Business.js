import { collection, addDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

class Staff {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  toMap() {
    return {
      name: this.name,
      price: this.price,
    };
  }
}

class Service {
  constructor(service, staff, duration, notes) {
    this.service = service;
    this.staff = staff;
    this.notes = notes;
    this.duration = duration;
  }

  toMap() {
    return {
      service: this.service,
      staff: this.staff,
      duration: this.duration,
      notes: this.notes,
    };
  }
}

class Business {
  constructor(object) {
    this.id = object?.id ?? null;
    this.email = object?.email ?? "";
    this.businessName = object?.businessName ?? "";
    this.streetAddress = object?.streetAddress ?? "";
    this.city = object?.city ?? "";
    this.country = object?.country ?? "";
    this.logo = object?.logo ?? "";
    this.businessHours = object?.businessHours ?? {
      Monday: { Status: "Open", Open: "9:00AM", Close: "9:00PM" },
      Tuesday: { Status: "Open", Open: "9:00AM", Close: "9:00PM" },
      Wednesday: { Status: "Open", Open: "9:00AM", Close: "9:00PM" },
      Thursday: { Status: "Open", Open: "9:00AM", Close: "9:00PM" },
      Friday: { Status: "Open", Open: "9:00AM", Close: "9:00PM" },
      Saturday: { Status: "Open", Open: "9:00AM", Close: "9:00PM" },
      Sunday: { Status: "Open", Open: "9:00AM", Close: "9:00PM" },
    };
    this.services = object?.services ?? [];
    this.staff = object?.staff ?? [];
  }

  getInfo() {
    return {
      id: this.id,
      email: this.email,
      businessName: this.businessName,
      streetAddress: this.streetAddress,
      city: this.city,
      country: this.country,
      logo: this.logo,
      businessHours: this.businessHours,
      services: this.services,
      staff: this.staff,
    };
  }

  // Method to update user's name
  updateBusinessName(newName) {
    this.businessName = newName;
  }

  // Method to update user's email
  updateEmail(newEmail) {
    this.email = newEmail;
  }

  // Method to update user's email
  updateStreetAddress(newStreetAddress) {
    this.streetAddress = newStreetAddress;
  }

  // Method to update user's email
  updateCity(newCity) {
    this.city = newCity;
  }

  // Method to update user's email
  updateCountry(newCountry) {
    this.country = newCountry;
  }

  // Method to update user's email
  updateLogo(newLogo) {
    this.logo = newLogo;
  }

  // Method to update user's email
  updateBusinessHours({ day, status = "Closed", open = "", close = "" }) {
    this.businessHours[day] = { Status: status, Open: open, Close: close };
  }

  // Method to update user's email
  addService(newService) {
    this.services.push(newService.toMap());
  }

  // Method to update user's email
  addStaff(newStaff) {
    this.staff.push(newStaff);
  }

  clone() {
    return new Business(this.getInfo());
  }

  async register() {
    let password = localStorage.getItem("password");

    await createUserWithEmailAndPassword(auth, this.email, password).then(
      (userCredential) => {
        this.id = userCredential.user.uid;
      }
    );

    if (this.logo != "") {
      const imageRef = storageRef(storage, `${this.id}/logo`);
      try {
        const snapshot = await uploadBytes(imageRef, this.logo);
        const url = await getDownloadURL(snapshot.ref);
        this.logo = url;
      } catch (error) {
        console.log(error.message);
      }
    }

    const docRef = addDoc(collection(db, "businesses"), this.getInfo());
  }
}

export default Business;

export { Service, Staff };
