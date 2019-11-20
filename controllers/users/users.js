const { User } = require("../../model/User");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { promisify } = require("util"); 


const createUsers = async (req, res, next) => {
  let { email, password, fullName, phone } = req.body;
  try {
    let newUser = await new User({ email, password, fullName, phone });
    let checkEmailExists = await User.findOne({ email });
    if (checkEmailExists) throw new Error("Email Exists");

    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/** LOGIN USER */
const comparePassword = bcrypt.compare;
const jwtSign = jsonwebtoken.sign;

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    
    if (!user) throw new Error("User Not Found");

    let isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error(" Password is incorrect");

    const payload  = {
      email: user.email,
      userType: user.userType
    }
    let token = await jwtSign(payload, "kakarot", {expiresIn: 3600});
    return res.status(200).json({message: "Login successfuly", token})

  } catch (error) {
    if(error) return res.status(500).json(error.message);
    return res.status(500).json(error.message);
  }

};


/** END LOGIN USER  */

const getUsers = async (req, res, next) => {
  try {
    let users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }

};

const getUserParamsId = async (req, res, next) => {
  let { id } = req.params;
  try {
    let user = await User.findById(id);
    if (!user) throw new Error("User Not Found");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


module.exports = {
  createUsers,
  getUsers,
  getUserParamsId,
  loginUser
}