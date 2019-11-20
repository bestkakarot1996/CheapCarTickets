const express = require("express");
const controllerTrip = require("./trips");

const router = express.Router();

router.post("/", controllerTrip.createTrips);
router.get("/", controllerTrip.getTrips);
router.get("/:id", controllerTrip.getTripParamsId);
router.put("/:id", controllerTrip.updateTrip);
router.delete("/:id", controllerTrip.deleteTrip);

module.exports = router;


