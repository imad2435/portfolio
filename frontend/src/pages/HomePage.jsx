import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import SectionAnimator from '../components/SectionAnimator';

const HomePage = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [infoRes, skillsRes, projectsRes, experiencesRes] = await Promise.all([
          axios.get('/api/personal-info'),
          axios.get('/api/skills'),
          axios.get('/api/projects'),
          axios.get('/api/experiences'),
        ]);
        const workExperiences = experiencesRes.data.filter(exp => exp.category === 'work');
        const educationExperiences = experiencesRes.data.filter(exp => exp.category === 'education');
        setPortfolioData({
          info: infoRes.data,
          skills: skillsRes.data,
          projects: projectsRes.data,
          workExperiences: workExperiences,
          educationExperiences: educationExperiences,
        });
      } catch (err) {
        setError('Failed to load portfolio data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!portfolioData) return <div className="min-h-screen flex items-center justify-center">No data available.</div>;

  return (
    <div>
      <HeroSection info={portfolioData.info} />
      <SectionAnimator><ProjectsSection projects={portfolioData.projects} /></SectionAnimator>
      <SectionAnimator><SkillsSection skills={portfolioData.skills} /></SectionAnimator>
      <SectionAnimator><ExperienceSection workExperiences={portfolioData.workExperiences} educationExperiences={portfolioData.educationExperiences} /></SectionAnimator>
      <SectionAnimator><ContactSection /></SectionAnimator>
    </div>
  );
};

export default HomePage;