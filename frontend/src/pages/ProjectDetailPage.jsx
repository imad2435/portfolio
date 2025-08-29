import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SectionAnimator from '../components/SectionAnimator';

const ProjectDetailPage = () => {
  // useParams() is a hook from react-router-dom that gives us the dynamic part of the URL.
  // In our case, it will be an object like { projectId: '...' }
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // This function runs when the component mounts
    const fetchProject = async () => {
      try {
        // Fetch data for the specific project using its ID from the URL
        const response = await axios.get(`/api/projects/${projectId}`);
        setProject(response.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError('Could not find the requested project.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    
    // Scroll to the top of the page when the component loads
    window.scrollTo(0, 0);

  }, [projectId]); // The effect re-runs if the projectId changes

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-apex-white">Loading Project...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-apex-accent">{error}</div>;
  }

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center text-apex-white">Project data is not available.</div>;
  }

  // --- Render the Project Case Study ---
  return (
    <div className="bg-apex-dark text-apex-white min-h-screen">
            <div className="container mx-auto px-6 py-12">
        <SectionAnimator>
          <div className="max-w-4xl mx-auto">
            
            {/* Back to Home Link */}
            <Link to="/#projects" className="text-apex-purple hover:underline mb-8 inline-block">&larr; Back to all projects</Link>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>
            
            <div className="mb-8 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech._id} className="inline-block bg-apex-card rounded-full px-4 py-2 text-sm font-semibold text-apex-gray border border-white/10">
                  {tech.name}
                </span>
              ))}
            </div>
            
            <img src={project.image} alt={project.title} className="w-full h-auto rounded-lg shadow-2xl mb-8" />

            <div className="prose prose-invert lg:prose-xl max-w-none text-apex-gray leading-relaxed whitespace-pre-line">
              {project.description}
            </div>

            <div className="flex justify-center items-center gap-4 mt-12">
              {project.live_link && (
                <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="text-white font-bold py-3 px-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transform hover:scale-105 transition duration-300">
                  View Live Site
                </a>
              )}
              {project.github_link && (
                <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 border border-gray-600 text-gray-300 font-semibold py-3 px-8 rounded-full hover:bg-gray-700 hover:border-gray-500 transform hover:scale-105 transition duration-300">
                  GitHub Repository
                </a>
              )}
            </div>
          </div>
        </SectionAnimator>
      </div>
    </div>
  );
};

export default ProjectDetailPage;