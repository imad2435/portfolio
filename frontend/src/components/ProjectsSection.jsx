import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode } from 'react-icons/fa'; // Using a generic icon

const ProjectsSection = ({ projects }) => {
  return (
    <section id="projects" className="py-20 text-brand-light bg-brand-dark scroll-mt-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className="flex flex-col items-center">
                <div className="mb-4 text-brand-accent"><FaCode size={40} /></div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-brand-gray leading-relaxed mb-4 flex-grow">
                  {project.description.substring(0, 150)}{project.description.length > 150 && '...'}
                </p>
                <Link to={`/projects/${project._id}`} className="text-brand-accent font-semibold hover:underline mt-auto">
                  View Case Study &rarr;
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-brand-gray">No projects to display yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;