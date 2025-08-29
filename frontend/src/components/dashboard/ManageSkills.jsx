import React, { useState, useEffect } from 'react';
// Import our new authenticated api instance
import api from '../../utils/api';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for the new skill form
  const [newSkillName, setNewSkillName] = useState('');
  
  // State for editing a skill
  const [editingSkill, setEditingSkill] = useState(null); // Will hold the skill object being edited
  const [editingSkillName, setEditingSkillName] = useState('');

  // Function to fetch skills
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await api.get('/skills');
      setSkills(response.data);
    } catch (err) {
      setError('Failed to fetch skills.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/skills', { name: newSkillName });
      setNewSkillName(''); // Clear input
      fetchSkills(); // Refresh the list
    } catch (err) {
      setError('Failed to create skill. Is it a duplicate?');
    }
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/skills/${editingSkill._id}`, { name: editingSkillName });
      setEditingSkill(null); // Exit editing mode
      setEditingSkillName('');
      fetchSkills(); // Refresh the list
    } catch (err) {
      setError('Failed to update skill.');
    }
  };

  const handleDelete = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.delete(`/skills/${skillId}`);
        fetchSkills(); // Refresh the list
      } catch (err) {
        setError('Failed to delete skill.');
      }
    }
  };

  // When the "Edit" button is clicked
  const startEditing = (skill) => {
    setEditingSkill(skill);
    setEditingSkillName(skill.name);
  };
  
  // When "Cancel" is clicked in the edit form
  const cancelEditing = () => {
    setEditingSkill(null);
    setEditingSkillName('');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Skills</h2>
      
      {/* --- ADD SKILL FORM --- */}
      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-2">Add New Skill</h3>
        <form onSubmit={handleCreate} className="flex gap-4">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="e.g., React.js"
            required
            className="flex-grow bg-gray-700 text-white rounded p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Add Skill
          </button>
        </form>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}
      
      {/* --- EDIT SKILL FORM (modal-like overlay) --- */}
      {editingSkill && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
           <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg">
             <h3 className="text-xl font-semibold mb-4">Edit Skill</h3>
             <form onSubmit={handleUpdate}>
               <input
                 type="text"
                 value={editingSkillName}
                 onChange={(e) => setEditingSkillName(e.target.value)}
                 required
                 className="w-full bg-gray-700 text-white rounded p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
               />
               <div className="mt-6 flex justify-end space-x-4">
                  <button type="button" onClick={cancelEditing} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
               </div>
             </form>
           </div>
        </div>
      )}

      {/* --- SKILLS TABLE --- */}
      <div className="bg-gray-800 rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Skill Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="2" className="text-center py-4">Loading...</td></tr>
            ) : (
              skills.map((skill) => (
                <tr key={skill._id} className="border-b border-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{skill.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => startEditing(skill)} className="text-indigo-400 hover:text-indigo-300">Edit</button>
                    <button onClick={() => handleDelete(skill._id)} className="text-red-400 hover:text-red-300 ml-4">Delete</button>
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

export default ManageSkills;