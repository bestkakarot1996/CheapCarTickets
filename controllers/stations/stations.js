const { Station } = require("../../model/Station");

const createStations = async (req, res, next) => {
  let { name, address, province } = req.body;
  let newSation = new Station({ name, address, province });
  try {
    let stations = await newSation.save();
    return res.status(201).json(stations);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getSations = async (req, res, next) => {
  try {
    let stations = await Station.find();
    return res.status(200).json(stations);
  } catch (error) {
    return res.status(500).json(error);
  }
};


const getParamsIdStation = async (req, res, next) => {
  try {
    let { id } = req.params;
    let station = await Station.findById(id);
    if(!station) throw new Error("Not Found");
    return res.status(200).json(station);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateStations = async (req, res, next) => {
  let { name, address, province } = req.body;
  try {
    let { id } = req.params;
    let station = await Station.findById(id);
    if(!station) throw new Error("Not Found");
    station.name = name;
    station.address = address;
    station.province = province;

   let newUpdateSation = await station.save();
    return res.status(200).json(newUpdateSation);
  } catch (error) {
    return res.status(500).json(error.message + error);
  }
};

const deleteStations = async (req, res, next) => {
  let { id } = req.params;
  try {
   let result =  await Station.deleteOne({ _id: id });
   console.log(result);
   // if(result.n === 0) throw new ("Not Found")
    return res.status(200).json({message: "Delete Successfuly"});
  } catch (error) {
    return res.status(500).json(error.message + error);
  }
};

module.exports = {
  createStations,
  getSations,
  getParamsIdStation,
  updateStations,
  deleteStations
}