const User = require('../../models/User.js')
const LostItemChat = require('../../models/lost-items/LostItemChat.js')
const LostItem = require('../../models/LostItem.js')
const LostItemChatMessage = require('../../models/lost-items/LostItemChatMessage.js')

const addRetrieveChat = async (req, res) => {
  const { itemId, founderId } = req.body

  if (!itemId || !founderId) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  try {
    const item = await LostItem.findById(itemId)
    const founder = await User.findById(founderId)
    const owner = item.poster

    const chatExist = await LostItemChat.findOne({ item, owner, founder })
      .populate({
        path: 'item',
        select: 'name itemImages description poster'
      })
      .populate('owner', 'name reference')
      .populate('founder', 'name reference')

    if (chatExist) {
      const chatMessages = await LostItemChatMessage.find({ chat: chatExist })
        .sort({ createdAt: -1 })
        .populate('sender', '_id reference')
      return res.json({ chatMessages: chatMessages, lostItemChat: chatExist })
    }

    const newLostItemChat = new LostItemChat({ item, owner, founder })
    await newLostItemChat.save()
    res.status(201).json({ lostItemChat: newLostItemChat, chatMessages: [] })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'An error occurred while retrieving item chat.' })
  }
}

const closeChat = async (req, res) => {
  const { chatId } = req.params

  try {
    const chat = await LostItemChat.findById(chatId)
    if (!chat) {
      return res.json({ message: 'Chat not found' })
    }
    chat.isClosed = true
    await chat.save()
    return res.json({ message: 'Chat closed!' })
  } catch (error) {
    console.log(error)
    return res.json({ message: 'Error closing found item chat' })
  }
}


const getUserLostChats = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)
    const lostChats = await LostItemChat.find({
      $or: [{ owner: user }, { founder: user }]
    }).populate('item owner founder')

    res.status(200).json({lostChats})
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getUserLostChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await LostItemChat.findById(chatId)
      .populate({
        path: "item",
        select: "name itemImages description poster",
      })
      .populate("founder", "name reference")
      .populate("owner", "name reference");

    if (!chat) {
      return res.json({ message: 'Chat not found' })
    }

    const chatMessages = await LostItemChatMessage.find({ chat })
      .sort({ createdAt: -1 })
      .populate("sender", "_id reference");

    res.status(201).json({ lostItemChat: chat, chatMessages });
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving item chat." });
  }
};

module.exports = {
  addRetrieveChat,
  closeChat,
  getUserLostChats,
  getUserLostChat
}
