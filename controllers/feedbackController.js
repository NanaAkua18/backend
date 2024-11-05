const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  const { email, feedback, rating } = req.body;

  if (!email || !feedback || !rating) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newFeedback = new Feedback({ email, feedback, rating });
    await newFeedback.save();
    res.status(201).json({feedback: newFeedback, message: "Feedback submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while submitting feedback." });
  }
};

module.exports = {
  submitFeedback,
};
