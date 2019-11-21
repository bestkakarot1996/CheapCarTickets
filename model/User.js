const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  //confirmPassword: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  userType: { type: String, default: "client" }
});


UserSchema.pre("save", async function (next) {
  const user = this; // this is obj user 
  if (!user.isModified("password")) return next();
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

const User = mongoose.model("User", UserSchema, "User");

module.exports = {
  User,
  UserSchema
};