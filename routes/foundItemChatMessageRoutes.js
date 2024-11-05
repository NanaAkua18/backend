const express = require("express");
const { verifyToken } = require("../controllers/authController");
const {addMessage} = require("../controllers/foundItemChatMessageController")

const router = express.Router()

router.post("/new-message", verifyToken, addMessage)

module.exports = router