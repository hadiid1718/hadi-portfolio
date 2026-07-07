import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../common/Link';
import profileImage from "../../assets/profile.jpg"
import MyCv from "../../assets/Hadeed Ul Hassan.pdf"
import { motion } from "framer-motion";
export const Hero = () => {
  const [imageRotation, setImageRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setImageRotation({
      x: (y - 0.5) * 20,
      y: (x - 0.5) * -20
    });
  };

  const handleMouseLeave = () => {
    setImageRotation({ x: 0, y: 0 });
  };
  const downloadAndOpenCV = () => {
    const cvUrl = MyCv;

    // Download the CV
    const downloadLink = document.createElement('a');
    downloadLink.href = cvUrl;
    downloadLink.download = 'Hadeed Ul Hassan.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Open in new tab
    window.open(cvUrl, '_blank');
  };

  return (
    <section className="pt-32 pb-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}

        className="max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase">
                Frontend & Backend Engineer
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Delivering investor platforms, Web products, and compliance automation
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              From idea to secure production. Fractional platform leadership and hands-on build support available worldwide.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center gap-2">
                Get in Touch
                <ArrowRight size={20} />
              </Link>
              <Link to="/work" className="border-2 border-slate-700 hover:border-blue-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
                View Work
              </Link>
              <button
                onClick={downloadAndOpenCV}
                className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Download CV
              </button>

            </div>
          </div>

          <div className="relative perspective-1000" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="relative transition-transform duration-300 ease-out" style={{ transform: `rotateX(${imageRotation.x}deg) rotateY(${imageRotation.y}deg)` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-slate-800 rounded-2xl p-8 overflow-hidden">
                <div className="absolute inset-0 rounded-2xl animate-spin" style={{
                  animationDuration: '8s',
                  background: 'conic-gradient(from 0deg, #4ade80, #22c55e, #16a34a, #15803d, #166534, #14532d, #166534, #15803d, #16a34a, #22c55e, #4ade80)'
                }}></div>
                <div className="absolute inset-0 m-[2px] bg-slate-800 rounded-2xl"></div>
                <div className="relative aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-6xl font-bold">
                  <img src={profileImage} alt="image-profile" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};