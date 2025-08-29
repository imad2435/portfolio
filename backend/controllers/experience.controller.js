const Experience = require('../models/experience.model');

exports.createExperience = async (req, res) => {
  try {
    const newExperience = await Experience.create(req.body);
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(500).json({ message: 'Error creating experience', error: error.message });
  }
};

exports.getAllExperiences = async (req, res) => {
  try {
    // We can fetch work and education experiences separately if needed, or all at once.
    // For now, let's get them all, sorted by most recent start date.
    const experiences = await Experience.find().sort({ start_date: -1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences', error: error.message });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedExperience) return res.status(404).json({ message: 'Experience not found' });
    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(500).json({ message: 'Error updating experience', error: error.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) return res.status(404).json({ message: 'Experience not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting experience', error: error.message });
  }
};