const express = require("express");
const stationRouter = require("../controllers/stations/index");
const userRouter = require("../controllers/users/index");
const tripRouter = require("../controllers/trips/index");
const router = express.Router();

router.use("/api/stations", stationRouter);
router.use("/api/users", userRouter);
router.use("/api/trips", tripRouter)


module.exports = router;

