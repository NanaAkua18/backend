const express = require("express");
const { submitFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.post("/add", submitFeedback);

module.exports = router;
