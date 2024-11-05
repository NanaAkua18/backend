const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name required!"],
    },
    date_lost: {
      type: Date,
      required: [true, "Item lost date required!"],
    },
    category: {
      type: String,
      required: [true, "Item category required!"],
    },
    subcategory: {
      type: String,
      required: [true, "Item subcategory required!"],
    },
    itemImages: {
      type: [String],
      required: [true, "Iten image(s) required!"],
    },
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isIdentifiable: {
      type: Boolean,
      default: false,
    },
    contact: String,
    location_lost: String,
    ownerName: String,
    itemID: String,
    isFound: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const LostItem = mongoose.model("LostItem", lostItemSchema);

module.exports = LostItem;
