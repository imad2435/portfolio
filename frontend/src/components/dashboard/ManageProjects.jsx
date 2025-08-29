import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- NEW: State to hold all available skills for the checkboxes ---
  const [allSkills, setAllSkills] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    github_link: '',
    live_link: '',
    // --- NEW: 'technologies' is now an array to hold the selected skill IDs ---
    technologies: [], 
  });

  const fetchProjectsAndSkills = async () => {
    try {
      setLoading(true);
      // Fetch both projects and skills at the same time
      const [projectsRes, skillsRes] = await Promise.all([
        api.get('/projects'),
        api.get('/skills')
      ]);
      setProjects(projectsRes.data);
      setAllSkills(skillsRes.data);
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsAndSkills();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW: Handler for checkbox changes ---
  const handleSkillChange = (skillId) => {
    // Check if the skill ID is already in our technologies array
    if (formData.technologies.includes(skillId)) {
      // If it is, remove it (unchecking the box)
      setFormData(prev => ({
        ...prev,
        technologies: prev.technologies.filter(id => id !== skillId)
      }));
    } else {
      // If it's not, add it (checking the box)
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, skillId]
      }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // The formData.technologies is already a perfect array of IDs, so we can send it directly
      await api.post('/projects', formData);
      // Reset the form
      setFormData({ title: '', description: '', image: '', github_link: '', live_link: '', technologies: [] });
      fetchProjectsAndSkills(); // Refresh the list
    } catch (err) {
      setError('Failed to create project.');
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjectsAndSkills();
      } catch (err) {
        setError('Failed to delete project.');
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Projects</h2>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full bg-gray-700 p-2 rounded"/>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full bg-gray-700 p-2 rounded"/>
          <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required className="w-full bg-gray-700 p-2 rounded"/>
          <input name="github_link" value={formData.github_link} onChange={handleChange} placeholder="GitHub Link" className="w-full bg-gray-700 p-2 rounded"/>
          <input name="live_link" value={formData.live_link} onChange={handleChange} placeholder="Live Link" className="w-full bg-gray-700 p-2 rounded"/>
          
          {/* --- THIS IS THE NEW CHECKBOX SECTION --- */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-700 p-4 rounded-lg">
              {allSkills.length > 0 ? (
                allSkills.map(skill => (
                  <label key={skill._id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.technologies.includes(skill._id)}
                      onChange={() => handleSkillChange(skill._id)}
                      className="h-4 w-4 bg-gray-600 border-gray-500 text-indigo-500 focus:ring-indigo-500 rounded"
                    />
                    <span className="text-white">{skill.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-gray-400">No skills found. Please add skills first.</p>
              )}
            </div>
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Add Project
          </button>
        </form>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}
      
      <div className="bg-gray-800 rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Technologies</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="text-center py-4">Loading...</td></tr>
            ) : (
              projects.map((project) => (
                <tr key={project._id} className="border-b border-gray-700">
                  <td className="px-6 py-4">{project.title}</td>
                  <td className="px-6 py-4">{project.technologies.map(t => t.name).join(', ')}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(project._id)} className="text-red-400 hover:text-red-300 ml-4">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProjects;