import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../components/common/Link';
import { ProjectCard } from '../components/work/ProjectCard';
import { workAPI } from '../services/apiService';

export const WorkPage = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useStaticData, setUseStaticData] = useState(false);

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    try {
      setLoading(true);
      const response = await workAPI.getAll();
      console.log('[WorkPage] Loaded works:', response);
      
      if (response.works && response.works.length > 0) {
        setWorks(response.works);
      } else {
        // Fallback to static data if no works from API
        console.log('[WorkPage] No works from API, using static data');
        setWorks(projects);
        setUseStaticData(true);
      }
    } catch (error) {
      console.error('[WorkPage] Error loading works:', error);
      // Fallback to static data on error
      setWorks(projects);
      setUseStaticData(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase mb-4 block">
              Portfolio
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Featured Work
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A selection of projects showcasing expertise in full-stack development, cloud architecture, and scalable solutions.
            </p>
            {useStaticData && (
              <p className="text-sm text-yellow-400 mt-4">
                💡 Tip: Add works in Admin Dashboard to see them here!
              </p>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-400">Loading works...</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                {works.map((project, idx) => (
                  <ProjectCard key={project._id || idx} project={project} />
                ))}
              </div>

              {works.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400">No works found yet.</p>
                </div>
              )}
            </>
          )}

          <div className="text-center mt-16">
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center gap-2">
              Discuss Your Project
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};