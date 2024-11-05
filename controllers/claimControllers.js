const Claim = require("../models/Claim.js")
const User = require("../models/User.js")
const FoundItem = require("../models/FoundItem.js")

const addClaim = async (req, res) => {
  const {reference, key, contact, email} = req.body
  const {itemId} = req.params
  const {user} = req

  if (!reference ||!key ||!contact ||!email) {
    return res.status(400).json({ message: "All fields are required!" })
  }

  try {
    const item = await FoundItem.findById(itemId)
    
    const newClaim = new Claim({
      claimantEmail: email,
      claimantContact: contact,
      claimant: user,
      poster: item.poster,
      item: item,
      key
    })

    await newClaim.save()

    res.status(201).json(newClaim)
  } catch (error) {
    res.status(500).json({ message: "Error finding item!"})
  }
}

const getClaimedItems = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const claimedItems = await Claim.find({ claimant: user }).populate('item');
    res.json(claimedItems);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const getItemClaims = async(req, res) => {
  try {
    const claims = await Claim.find({ item: req.params.itemId }).populate('claimant');
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const approveClaim = async(req, res) => {
  const {contact} = req.body
  try {
    console.log(req.params, req.body)
    const claim = await Claim.findById(req.params.claimId).populate('claimant item');
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    claim.isApproved = true;
    claim.posterContact = contact
    await claim.save();

    // const claimant = await User.findById(claim.claimant._id);
    // const founder = await User.findById(claim.item.poster);    

    res.json({ message: 'Claim approved and contact info sent' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addClaim,
  getClaimedItems,
  getItemClaims,
  approveClaim
}