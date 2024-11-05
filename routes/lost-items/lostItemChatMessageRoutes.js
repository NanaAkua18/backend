const express = require("express");
const { verifyToken } = require("../../controllers/authController");
const {addMessage} = require("../../controllers/lost-items/lostItemChatMessageController")

const router = express.Router()

router.post("/new-message", addMessage)

module.exports = router