const mongoose = require('mongoose');

const foundItemchatMessageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoundItemChat',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    //  sender: {
    //   type: String,
    //   enum: ['owner', 'poster'],
    //   required: true
    // },
    message: String,
  
  },
  { timestamps: true }
);

const FoundItemChatMessage = mongoose.model('FoundItemChatMessage', foundItemchatMessageSchema);

module.exports = FoundItemChatMessage;