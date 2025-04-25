class Booking {
  constructor(object) {
    this.id = object?.id ?? null;
    this.date = object?.date ?? "";
    this.treatment = object?.treatment ?? "";
    this.staff = object?.staff ?? "";
    this.client = object?.client ?? "";
    this.phone = object?.phone ?? "";
    this.status = object?.status ?? "upcoming";
  }

  toMap() {
    return {
      id: this.id,
      date: this.date,
      treatment: this.treatment,
      staff: this.staff,
      client: this.client,
      phone: this.phone,
      status: this.status,
    };
  }
}

export default Booking;
