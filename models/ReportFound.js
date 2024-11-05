const mongoose = require('mongoose')

const reportFoundSchema = new mongoose.Schema(
  {
    reporterContact: {
      type: String,
      required: [true, 'Contact required!']
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LostItem',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    isCollected: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const ReportFound = mongoose.model('ReportFound', reportFoundSchema)

module.exports = ReportFound
