const express = require("express");
const { verifyToken } = require("../controllers/authController");
const {addRetrieveChat, closeChat, getUserFoundChats, getUserFoundChat} = require('../controllers/foundItemChatController')

const router = express.Router()

router.post("/chat", verifyToken, addRetrieveChat)
router.get("/profile/:userId", getUserFoundChats)
router.get("/close/:chatId", verifyToken, closeChat)
router.get("/user-chats/:chatId", getUserFoundChat);

module.exports = router
