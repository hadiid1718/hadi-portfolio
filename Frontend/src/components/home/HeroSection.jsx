import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../common/Link';
import MyCv from "../../assets/Hadeed Ul Hassan.pdf"
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
          show: { transition: { staggerChildren: 0.15 } }
        }}
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="inline-block"
        >
          <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase">
            Full Stack Engineer — With Agentic AI
          </span>
        </motion.div>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
          }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
        >
          Delivering investor platforms, Web products, and compliance automation
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
          }}
          className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
        >
          From idea to secure production. Fractional platform leadership and hands-on build support worldwide — powered by modern full-stack engineering and agentic AI workflows.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
          }}
          className="flex flex-wrap justify-center gap-4 pt-4"
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
};