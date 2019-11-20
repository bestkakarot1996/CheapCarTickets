const express = require("express");
const { connectDatabase } = require("./connectDatabase");
const initRouter  = require("./routes/api");

connectDatabase();

const app = express();
app.use(express.json());
app.use("/", initRouter )

const port = 8080;
app.listen(port, () => {
  console.log("Connect Server Successfuly to port 8080");
})

