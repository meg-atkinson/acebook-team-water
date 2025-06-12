const express = require("express");
const router = express.Router();

const ProdsController = require("../controllers/prods");
const tokenChecker = require("../middleware/tokenChecker");

// Protect all prod routes with token checker
router.use(tokenChecker);

// Send a prod
router.post("/", ProdsController.sendProd);

// Get prods received by the logged-in user
router.get("/received", ProdsController.getReceivedProds);

module.exports = router;