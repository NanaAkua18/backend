const ReportFound = require("../models/ReportFound.js")
const User = require("../models/User.js")
const LostItem = require("../models/LostItem.js");

const reportLostItem = async (req, res) => {
  const { contact, message} = req.body
  const {itemId} = req.params
  const {user} = req

  if (!message ||!contact) {
    return res.status(400).json({ message: "All fields are required!" })
  }

  try {
    const item = await LostItem.findById(itemId)
    
    const newReport = new ReportFound({
      reporterContact: contact,
      message,
      reporter: user,
      owner: item.poster,
      item: item,
    })

    await newReport.save()

    res.status(201).json(newReport)
  } catch (error) {
    res.status(500).json({ message: "Error finding item!"})
  }
}

const getUserReportedItems = async (req, res) => {
  try {
    const reporter = await User.findById(req.params.id)
    const reportedItems = await ReportFound.find({ reporter }).populate('item');
    res.json(reportedItems);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const getLostItemReports = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.itemId)
    const reports = await ReportFound.find({item}).populate('item owner');
    res.status(200).json(reports)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "An error occured while fetching reports"})
  }
}

module.exports = {
  reportLostItem,
  getUserReportedItems,
  getLostItemReports
}