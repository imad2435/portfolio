import React from 'react';
import { FaBrain, FaCloud, FaShieldAlt } from 'react-icons/fa'; // Example icons

const services = [
  {
    icon: <FaBrain size={40} />,
    title: 'Artificial Intelligence',
    description: 'We develop advanced algorithms to analyze vast datasets, enabling predictive insights and smarter decision-making.'
  },
  {
    icon: <FaCloud size={40} />,
    title: 'Cloud Solutions',
    description: 'We create interconnected systems that collect and exchange data in real-time, paving the way for smarter environments.'
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: 'Cyber Security',
    description: 'Leveraging AI to process and interpret data, we enable cutting-edge applications like autonomous systems and quality control.'
  }
];

const NewServices = () => {
  return (
    <section className="py-20 text-brand-light">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4 text-brand-accent">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-brand-gray leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewServices;