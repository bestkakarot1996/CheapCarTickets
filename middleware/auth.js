const jsonwebtoken = require("jsonwebtoken");

const jwtVerify = jsonwebtoken.verify;

const authenticate = async (req, res, next) => {
  try {
    const token = await req.header("token");
    console.log(token, "this is token");
    let decoded = await jwtVerify(token, "kakarot");
    console.log(decoded, "this is decoded");
    
    if (decoded) {
     req.user = decoded;
     return next();
    }
  } catch (error) {
    console.log(error);
    if (error) return res.status(500).send({ message: "Authenticate Not Found" })
    return res.status(500).json(error);
  }
};

const authorize = (userTypeArray) => {
  return (req, res, next) => {
    const { user } = req;
    
    if (userTypeArray.findIndex(elm => elm === user.userType) > -1) return next();
    console.log(user);
    // if (userType === user.userType) return next();
    return res.status(403).json({
      message: "You have logged in! You already have all admin rights "
    })
  }
}
module.exports = {
  authenticate,
  authorize
};

