const User = require('../../models/User.js');
const LostItemChat = require('../../models/lost-items/LostItemChat.js');
const LostItem = require('../../models/LostItem.js');
const LostItemChatMessage = require('../../models/lost-items/LostItemChatMessage.js');

const addMessage = async (req, res) => {
  const { chatId, message, senderId } = req.body;

  if (!chatId || !message || !senderId) {
    return res.status(400).json({ message: "All fields are required." })
  }

  try {
    const sender = await User.findById(senderId)
    const chat = await LostItemChat.findById(chatId)
    if (!chat) {
      return res.json({message: "Couldn't find chat"})
    }

    const newMessage = new LostItemChatMessage({ chat, message, sender });
    await newMessage.save();
    res.status(201).json({newMessage, message: "Message saved" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving new message" });
  }
};


module.exports = {
  addMessage,
};
