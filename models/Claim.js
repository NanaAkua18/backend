const mongoose = require('mongoose')

const claimSchema = new mongoose.Schema(
  {
    claimantEmail: {
      type: String,
      required: [true, 'Email required!']
    },
    claimantContact: {
      type: String,
      required: [true, 'Contact required!']
    },
    posterContact:  String,
    claimant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoundItem',
      required: true
    },
    key: {
      type: String,
      required: true
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const Claim = mongoose.model('Claim', claimSchema)

module.exports = Claim
