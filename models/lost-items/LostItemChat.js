const mongoose = require('mongoose');

const lostItemchatSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LostItem',
      required: true
    },
     owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isClosed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const LostItemChat = mongoose.model('LostItemChat', lostItemchatSchema);

module.exports = LostItemChat;