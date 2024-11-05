const User = require('../models/User.js')
const FoundItemChat = require('../models/FoundItemChat.js')
const FoundItem = require('../models/FoundItem.js')
const FoundItemChatMessage = require('../models/FoundItemChatMessage.js')

const addRetrieveChat = async (req, res) => {
  const { itemId, ownerId } = req.body

  if (!itemId || !ownerId) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  try {
    const item = await FoundItem.findById(itemId)
    const owner = await User.findById(ownerId)
    const poster = item.poster

    //const chatExist = await FoundItemChat.findOne({item, poster, owner}).populate('item poster owner')
    const chatExist = await FoundItemChat.findOne({ item, poster, owner })
      .populate({
        path: 'item',
        select: 'name itemImages description poster'
      })
      .populate('poster', 'name reference')
      .populate('owner', 'name reference')

    if (chatExist) {
      const chatMessages = await FoundItemChatMessage.find({ chat: chatExist })
        .sort({ createdAt: -1 })
        .populate('sender', '_id reference')
      return res.json({ chatMessages: chatMessages, foundItemChat: chatExist })
    }

    const newFountItemChat = new FoundItemChat({ item, owner, poster })
    await newFountItemChat.save()
    res.status(201).json({ foundItemChat: newFountItemChat, chatMessages: [] })
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
    const chat = await FoundItemChat.findById(chatId)
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

const getUserFoundChats = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)
    const foundChats = await FoundItemChat.find({
      $or: [{ owner: user }, { poster: user }]
    }).populate('item owner poster')

    res.status(200).json({foundChats})
  } catch (error) {
    res.status(500).json(error.message)
  }
}


const getUserFoundChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await FoundItemChat.findById(chatId)
      .populate({
        path: "item",
        select: "name itemImages description poster",
      })
      .populate("poster", "name reference")
      .populate("owner", "name reference");

    const chatMessages = await FoundItemChatMessage.find({ chat })
      .sort({ createdAt: -1 })
      .populate("sender", "_id reference");

    res.status(201).json({ foundItemChat: chat, chatMessages });
    
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
  getUserFoundChats,
  getUserFoundChat,
};

