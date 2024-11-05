const express = require("express");
const { addClaim, getClaimedItems, approveClaim, getItemClaims } = require("../controllers/claimControllers");
const { verifyToken } = require("../controllers/authController");

const router = express.Router()

router.post("/add/:itemId", verifyToken, addClaim)
router.get("/profile/:id", getClaimedItems)
router.get("/:itemId", getItemClaims)
router.post("/approve/:claimId", approveClaim)

module.exports = router