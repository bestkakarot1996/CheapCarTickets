const express = require("express");
const controllerStation = require("./stations");

const router = express.Router();

router.post("/", controllerStation.createStations);
router.get("/", controllerStation.getSations);
router.get("/:id", controllerStation.getParamsIdStation);
router.put("/:id", controllerStation.updateStations); //id day ne ba
router.delete("/:id", controllerStation.deleteStations);

module.exports = router;


