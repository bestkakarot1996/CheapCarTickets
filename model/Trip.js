const mongoose = require("mongoose");
const { SeatSchema } = require("./Seat");


const TripSchema = new mongoose.Schema({
  tripname: { type: String, required: true },
  fromStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station"
  },
  toStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station"
  },
  startTime: { type: Date, required: true },
  seats: [SeatSchema],
  price: { type: Number, required: true }
});

let Trip = mongoose.model("Trip", TripSchema, "Trip");

module.exports = {
  TripSchema,
  Trip
}

