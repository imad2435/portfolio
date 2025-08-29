const PersonalInfo = require('../models/personalInfo.model');

// --- Controller to GET the personal info ---
// There's only one, so we use findOne()
exports.getPersonalInfo = async (req, res) => {
  try {
    const info = await PersonalInfo.findOne();
    if (!info) return res.status(404).json({ message: 'Personal info not found. Please create one.' });
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching personal info', error: error.message });
  }
};

// --- Controller to CREATE or UPDATE the personal info ---
// This is called an "upsert" operation.
exports.upsertPersonalInfo = async (req, res) => {
  try {
    const updates = req.body;
    // findOneAndUpdate with `upsert: true` is the magic here.
    // The empty `{}` filter matches the first document it finds.
    // `upsert: true` tells Mongoose: "If you find a document, update it. If not, create it."
    const info = await PersonalInfo.findOneAndUpdate({}, updates, {
      new: true, // Return the new, updated document
      upsert: true, // Create the document if it doesn't exist
      runValidators: true,
    });
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: 'Error saving personal info', error: error.message });
  }
};