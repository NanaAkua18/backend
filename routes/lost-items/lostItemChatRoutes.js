const express = require("express");
const { verifyToken } = require("../../controllers/authController");
const {addRetrieveChat, closeChat, getUserLostChats, getUserLostChat} = require('../../controllers/lost-items/lostItemChatController')

const router = express.Router()

router.post("/chat", verifyToken, addRetrieveChat)
router.get("/profile/:userId", getUserLostChats)
router.get("/close/:chatId", verifyToken, closeChat)
router.get("/user-chats/:chatId", getUserLostChat);

module.exports = router
