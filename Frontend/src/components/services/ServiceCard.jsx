import React from 'react';
import { ArrowRight, Layout, Code, Server, Layers } from 'lucide-react';

const icons = {
  'Full Stack Development': Layout,
  'Frontend Development': Code,
  'Backend Development': Server
};

export const ServiceCard = ({ service, index }) => {
  // Get the icon, fallback to Layers if not found
  const Icon = icons[service.title] || Layers;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <div className="mb-6">
            <Icon className="text-blue-400" size={48} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {service.title}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {service.technologies && service.technologies.map((tech, techIdx) => (
              <span key={techIdx} className="bg-slate-700/50 text-slate-300 px-4 py-2 rounded-lg text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Key Features:</h3>
          {service.features && service.features.map((feature, featureIdx) => (
            <div key={featureIdx} className="flex items-start gap-3">
              <div className="bg-blue-500/20 rounded-full p-1 mt-1">
                <ArrowRight size={16} className="text-blue-400" />
              </div>
              <span className="text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};