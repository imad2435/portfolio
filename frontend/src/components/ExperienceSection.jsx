import React from 'react';

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return 'Present';
  const options = { year: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ExperienceSection = ({ workExperiences, educationExperiences }) => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Experience & Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Work Experience Column */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center text-white">Work Experience</h3>
            <div className="relative border-l-2 border-apex-purple/30 pl-8">
              {workExperiences && workExperiences.length > 0 ? (
                workExperiences.map(exp => (
                  <div key={exp._id} className="mb-10 relative">
                    <div className="absolute -left-[34px] top-1 w-4 h-4 bg-apex-purple rounded-full border-4 border-apex-dark ring-4 ring-apex-purple"></div>
                    <p className="font-bold text-lg text-white">{exp.title}</p>
                    <p className="text-apex-purple font-semibold">{exp.company}</p>
                    <p className="text-sm text-apex-gray">{formatDate(exp.start_date)} - {formatDate(exp.end_date)}</p>
                    <div className="mt-2 text-apex-gray leading-relaxed whitespace-pre-line">{exp.description}</div>
                  </div>
                ))
              ) : (
                <p className="text-apex-gray">No work experience added yet.</p>
              )}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center text-white">Education</h3>
            <div className="relative border-l-2 border-apex-gray/30 pl-8">
              {educationExperiences && educationExperiences.length > 0 ? (
                educationExperiences.map(edu => (
                  <div key={edu._id} className="mb-10 relative">
                    <div className="absolute -left-[34px] top-1 w-4 h-4 bg-apex-gray rounded-full border-4 border-apex-dark ring-4 ring-apex-gray"></div>
                    <p className="font-bold text-lg text-white">{edu.title}</p>
                    <p className="text-apex-gray font-semibold">{edu.company}</p>
                    <p className="text-sm text-apex-gray">{formatDate(edu.start_date)} - {formatDate(edu.end_date)}</p>
                    <div className="mt-2 text-apex-gray leading-relaxed whitespace-pre-line">{edu.description}</div>
                  </div>
                ))
              ) : (
                <p className="text-apex-gray">No education history added yet.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;