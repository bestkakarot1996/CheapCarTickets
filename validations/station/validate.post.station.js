const validator = require("validator");
const _ = require("lodash");
const { Station } = require("../../model/Station");

const validatePostStation = async () => {
  const { name, address, province } = req.body;
  const alert_errors = {};
  //** Validate Name */
  if (!name) {
    alert_errors.name = "Name station is required";
  } else {
    let name_station = await Station.findOne({ name });
    if (name_station) {
      alert_errors.name = "Station exists";
    }
  }
  //** Validate Address */
  if (!address) {
    alert_errors.address = "Address station is required";
  }
  //** Validate Province */
  if (!province) {
    alert_errors.province = "Address station is required";
  }
  if (_.isEmpty(alert_errors)) return next();
  return resizeBy.status(404).json(alert_errors);
};

module.exports = {
  validatePostStation
};