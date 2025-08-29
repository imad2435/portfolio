import React from 'react';

const SkillsSection = ({ skills }) => {
  return (
    <section id="skills" className="py-20 bg-apex-card">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">My Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <div key={skill._id} className="bg-apex-dark text-apex-white text-lg font-semibold px-6 py-3 rounded-full shadow-md border border-white/10">
                {skill.name}
              </div>
            ))
          ) : (
            <p className="text-center text-apex-gray">No skills added yet.</p>
          )}

        </div>
      </div>
    </section>
  );
};

export default SkillsSection;