const validator = require("validator");
const _ = require("lodash");
const {User} = require("../../model/User");

const validationPostUser = async (req, res, next) => {
  let { email, password, confirm_password, fullName } = req.body;
  let alert_errors = {};
  /** Validate Email */
  if (!email) {
    alert_errors.email = "Email is required";
  }
  else if (!validator.isEmail(email)) {
    alert_errors.email = "Email is invalid"
  }
  else {
    let user = await User.findOne({ email });
    console.log(user);
    
    if (user) {
      alert_errors.email = "Email exists";
    }
  }
 
  /** Validate Password */
  if (!password) {
    alert_errors.password = "Password is required";
  } else if (!validator.isLength(password, { min: 6 })) {
    alert_errors.password = "Password must have at least 6 characters";
  }
  
  /** Validate Confirm_Password */
  if (!confirm_password) {
    alert_errors.confirm_password = "Confirm password is required ";
  } else if (!validator.equals(password, confirm_password)) {
    alert_errors.confirm_password = "Password must match";
  }
  /** Validate Full_Name */
  if(!fullName) { 
    alert_errors.fullName = "Full Name is required ";
  }
 
  if (_.isEmpty(alert_errors)) return next();
  return res.status(400).json(alert_errors);
};

module.exports = {
  validationPostUser
}