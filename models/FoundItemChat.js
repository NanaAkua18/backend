const mongoose = require('mongoose');

const foundItemchatSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoundItem',
      required: true
    },
     owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    poster: {
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

const FoundItemChat = mongoose.model('FoundItemChat', foundItemchatSchema);

module.exports = FoundItemChat;