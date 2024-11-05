const express = require('express');
const { addFoundItem, getFoundItems, getFoundItem, getCategoryItems, getUserProfileFoundItems, getFoundReports } = require('../controllers/foundItemsController');
const {verifyToken} = require('../controllers/authController.js')

const router = express.Router()

router.post("/add", verifyToken, addFoundItem)
router.get("/category/:category", getCategoryItems)
router.get("/:id", getFoundItem)
router.get("/", getFoundItems)
router.get("/profile/:id", getUserProfileFoundItems)
router.post('/reports', getFoundReports)

module.exports = router