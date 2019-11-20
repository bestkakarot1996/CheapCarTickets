const mongoose = require("mongoose");

let connectDatabase = () => {
  return mongoose.connect("mongodb://localhost:27017/app-vexere", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
    .then(() => console.log("Connect Database MongoDB Successfuly"))
    .catch(console.log)
}

module.exports = {
  connectDatabase: connectDatabase
};