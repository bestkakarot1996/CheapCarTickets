const { Trip } = require("../../model/Trip");
const { Seat } = require("../../model/Seat");
const seatController = require("../../controllers/seat/seats");


const createTrips = async (req, res, next) => {
  let { tripname, fromStation, toStation, startTime, price } = req.body;
  try {
    let newTrip = await new Trip({ tripname, fromStation, toStation, startTime, price });

    await seatController.seatCodes.forEach((codeseat) => {
      let newSeat = new Seat({ codeseat });
      newTrip.seats.push(newSeat);
      console.log(newSeat);
    });
    let trip = await newTrip.save();
    return res.status(201).json(trip)
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTrips = async (req, res, next) => {
  try {
    let trips = await Trip.find();
    return res.status(200).json(trips);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTripParamsId = async (req, res, next) => {
  let { id } = req.params;
  try {
    let trips = await Trip.findById({ _id: id });
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateTrip = async (req, res, next) => {
  let { id } = req.params;
  let { tripname, fromStation, toStation, startTime, price } = req.body;
  try {
    let newTrip = await Trip.findById({ _id: id });
    if(!newTrip) throw new SyntaxError("Trip Not Found")
    newTrip.tripname = tripname;
    newTrip.fromStation = fromStation;
    newTrip.toStation = toStation;
    newTrip.startTime = startTime;
    newTrip.price = price;
    let trip = await newTrip.save();
    return res.status(200).json(trip);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteTrip = async (req, res, next) => {
  let { id } = req.params;
  try {
    let result =  await Trip.deleteOne({_id: id});
    if(!result.n === 0) throw new SyntaxError("Trip Not Found");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


module.exports = {
  createTrips,
  getTrips,
  getTripParamsId,
  updateTrip,
  deleteTrip
};

