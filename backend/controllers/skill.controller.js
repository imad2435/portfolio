const Skill = require('../models/skill.model');

// --- Controller to CREATE a new skill ---
// @route   POST /api/skills
exports.createSkill = async (req, res) => {
  try {
    // We get the 'name' from the body of the incoming request
    const { name } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ message: 'Skill name is required.' });
    }

    const newSkill = await Skill.create({ name });
    res.status(201).json(newSkill); // 201 Created
  } catch (error) {
    // Handle potential errors, like a duplicate skill name
    res.status(500).json({ message: 'Error creating skill', error: error.message });
  }
};

// --- Controller to GET ALL skills ---
// @route   GET /api/skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ name: 1 }); // Find all skills and sort alphabetically
    res.status(200).json(skills); // 200 OK
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

// --- Controller to UPDATE a skill ---
// @route   PUT /api/skills/:id
exports.updateSkill = async (req, res) => {
  try {
    const { name } = req.body;
    const skillId = req.params.id;

    const updatedSkill = await Skill.findByIdAndUpdate(
      skillId,
      { name },
      { new: true, runValidators: true } // Options: return the updated document and run schema validators
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill', error: error.message });
  }
};

// --- Controller to DELETE a skill ---
// @route   DELETE /api/skills/:id
exports.deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    const deletedSkill = await Skill.findByIdAndDelete(skillId);

    if (!deletedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill', error: error.message });
  }
};