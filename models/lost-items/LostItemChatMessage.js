const mongoose = require('mongoose');

const lostItemchatMessageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LostItemChat',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: String,
  
  },
  { timestamps: true }
);

const LostItemChatMessage = mongoose.model('LostItemChatMessage', lostItemchatMessageSchema);

module.exports = LostItemChatMessage;