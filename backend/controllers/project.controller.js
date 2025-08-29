const Project = require('../models/project.model');
const Skill = require('../models/skill.model'); // We need this to validate skill IDs

// --- Controller to CREATE a new project ---
// @route   POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const { title, description, image, technologies, github_link, live_link, display_order } = req.body;

    // --- Advanced: Validate that the provided technology IDs actually exist ---
    if (technologies && technologies.length > 0) {
      const foundSkills = await Skill.find({ '_id': { $in: technologies } });
      if (foundSkills.length !== technologies.length) {
        return res.status(400).json({ message: 'One or more technology IDs are invalid.' });
      }
    }

    const newProject = await Project.create({
      title,
      description,
      image,
      technologies,
      github_link,
      live_link,
      display_order
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};
// --- Controller to GET a SINGLE project by ID ---
// @route   GET /api/projects/:id
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('technologies', 'name');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// --- Controller to GET ALL projects ---
// @route   GET /api/projects
exports.getAllProjects = async (req, res) => {
  try {
    // .populate('technologies') is the magic here. It tells Mongoose to
    // replace the skill ObjectIDs with the actual skill documents.
    // We also select only the 'name' field from the populated skills.
    const projects = await Project.find()
      .populate('technologies', 'name')
      .sort({ display_order: 1 }); // Sort by display_order

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// --- Controller to UPDATE a project ---
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    // We can update any or all of the fields
    const updates = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // After updating, we populate the response to send back the full technology objects
    const populatedProject = await updatedProject.populate('technologies', 'name');

    res.status(200).json(populatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// --- Controller to DELETE a project ---
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};