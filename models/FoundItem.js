const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name required!']
    },
    date_found: {
      type: Date,
      required: [true, 'Item date required!']
    },
    category: {
      type: String,
      required: [true, 'Item category required!']
    },
    subcategory: {
      type: String,
      required: [true, 'Item category required!']
    },
    itemImages: {
      type: [String],
      required: [true, 'Iten image(s) required!']
    },
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      required: false
    },
    isIdentifiable: {
      type: Boolean,
      default: false
    },
    location_found: String,
    ownerName: String,
    itemID: String,
    isFound: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const FoundItem = mongoose.model('FoundItem', foundItemSchema);

module.exports = FoundItem;