const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  codeseat: { type: String, required: true },
  isBooked: { type: Boolean, default: false }, //  isAvailable = false => ghế trống >< ghế đã có người booked
});

const Seat = mongoose.model("Seat", SeatSchema, "Seat");

module.exports = {
  Seat,
  SeatSchema
}