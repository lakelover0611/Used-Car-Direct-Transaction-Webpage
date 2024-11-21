const express = require("express");
const router = express.Router();

const carinfo = require("../controllers/main");
//const searchCar = require("../controllers/mainSearch");
const { deleteCar, updateCar } = require("../controllers/detail");
const updateFavorite = require("../controllers/mainFavorite");

router.get("/", carinfo);
//router.get("/search", searchCar);
router.delete("/:id", deleteCar);
router.put("/:id", updateCar);
router.put("/favorite/:id", updateFavorite);

module.exports = router;
