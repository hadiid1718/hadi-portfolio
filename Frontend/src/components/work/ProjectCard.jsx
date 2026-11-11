import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';


export const ProjectCard = ({ project }) => {
  const [showAllTechs, setShowAllTechs] = useState(false);
  
  // Handle both API data and static data formats
  const technologies = Array.isArray(project.technologies) 
    ? project.technologies 
    : (typeof project.technologies === 'string' ? project.technologies.split(',').map(t => t.trim()) : []);
  
  const isHosted = project.hosted === 'Yes' || project.Hosted !== 'No';
  const hostedUrl = project.hostedUrl || project.Hosted;
  
  const displayedTechs = showAllTechs ? technologies : technologies.slice(0, 3);
  
  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-slate-700/60 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 group p-6 hover:bg-slate-800/60 shadow-lg hover:shadow-xl"
         style={{
           background: `linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(30, 41, 59, 0.5) 100%)`,
           backdropFilter: 'blur(10px)'
         }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/80 text-sm font-semibold">{project.category}</span>
        {project.featured && <span className="bg-white/20 text-white text-xs px-2 py-1 rounded">Featured</span>}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-white/90 leading-relaxed mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {displayedTechs.map((tech, techIdx) => (
          <span key={techIdx} className="bg-white/20 text-white px-3 py-1 rounded text-xs">
            {tech}
          </span>
        ))}
        {technologies.length > 3 && !showAllTechs && (
          <button
            onClick={() => setShowAllTechs(true)}
            className="bg-white/20 text-white px-3 py-1 rounded text-xs hover:bg-white/30 transition-all cursor-pointer"
          >
            +{technologies.length - 3} more
          </button>
        )}
        {showAllTechs && technologies.length > 3 && (
          <button
            onClick={() => setShowAllTechs(false)}
            className="bg-white/20 text-white px-3 py-1 rounded text-xs hover:bg-white/30 transition-all cursor-pointer"
          >
            Show less
          </button>
        )}
      </div>

      <div className="border-t border-white/30 pt-3">
        <div className='flex justify-between items-center'>
          <p className={project.status === "Complete" ? "text-white font-semibold" : "text-white/80"}>{project.status}</p>
          <div className="flex gap-3">
            {project.value && <a href={project.value} rel='noopener noreferrer' target='_blank' className="text-white hover:text-white/80 text-sm font-semibold">Github</a>}
            {isHosted && hostedUrl && <a href={hostedUrl} rel='noopener noreferrer' target='_blank' className="text-white hover:text-white/80 text-sm font-semibold">Visit</a>}
          </div>
        </div>        
      </div>
    </div>
  );
};