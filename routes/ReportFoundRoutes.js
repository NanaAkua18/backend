const express = require("express");
const { verifyToken } = require("../controllers/authController");
const { reportLostItem, getUserReportedItems, getLostItemReports } = require("../controllers/reportFoundController");

const router = express.Router()

router.post("/add/:itemId", verifyToken, reportLostItem)
router.get("/profile/:id", getUserReportedItems)
router.get("/profile/:id", getUserReportedItems)
router.get("/lost-report/:itemId", getLostItemReports)

module.exports = router