const validator = require("validator");
const _ = require("lodash");
const {User} = require("../../model/User");

const validateLoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const alert_errors = {};
  /** Validate Email */
  if (!email) {
    alert_errors.email = "Email is required"
  } else if (!validator.isEmail(email)) {
    alert_errors.email = "Email is invalid"
  } else {
    let user = await User.findOne({ email });
    
    if (!user) {
      alert_errors.email = "Email or Password not found";
    }
  }
  /** Validate Passowrd */
  if (!password) {
    alert_errors.password = "Password is required";
  }
  if (_.isEmpty(alert_errors)) return next();
  return res.status(404).json(alert_errors);
};

module.exports = {
  validateLoginUser
};