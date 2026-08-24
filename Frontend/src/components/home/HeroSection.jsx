import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../common/Link';
import MyCv from "../../assets/Hadeed Ul Hassan.pdf";
import { motion } from "framer-motion";

export const Hero = () => {
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
    <section className="pt-32 pb-20 px-6 min-h-[80vh] flex items-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        className="max-w-4xl mx-auto text-center space-y-6"
      >

        {/* Professional Identity */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="inline-block"
        >
          <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase">
            Full-Stack Developer & Agentic AI Engineer
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7 }
            }
          }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
        >
          Building Modern Web Products & Intelligent AI Systems
        </motion.h1>

        {/* Introduction */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7 }
            }
          }}
          className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
        >
          I build scalable web applications, AI agents, automation
          systems, and API-driven products that turn complex ideas
          into practical digital solutions.
        </motion.p>

        {/* Supporting Expertise */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7 }
            }
          }}
          className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto"
        >
          Experienced across React, JavaScript, Node.js, REST APIs,
          AI agents, LLM integrations, automation workflows, and
          modern full-stack development.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7 }
            }
          }}
          className="flex flex-wrap justify-center gap-4 pt-4"
        >
          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center gap-2"
          >
            Let's Work Together
            <ArrowRight size={20} />
          </Link>

          <Link
            to="/work"
            className="border-2 border-slate-700 hover:border-blue-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
          >
            View My Work
          </Link>

          <button
            onClick={downloadAndOpenCV}
            className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Download CV
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
};