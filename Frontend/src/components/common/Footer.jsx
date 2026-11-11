import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from './Link';
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4 }}
       className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Hadeed<span className="text-blue-400"> .</span>
            </h3>
            <p className="text-slate-400">
              Frontend, Backend and MERN stack developer delivering secure, scalable solutions from concept to production.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-slate-400 hover:text-blue-400 transition-colors">Home</Link>
              <Link to="/services" className="block text-slate-400 hover:text-blue-400 transition-colors">Services</Link>
              <Link to="/work" className="block text-slate-400 hover:text-blue-400 transition-colors">Work</Link>
              <Link to="/contact" className="block text-slate-400 hover:text-blue-400 transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/hadiid1718" rel='noopener noreferer' target='_blank' className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors">
                <Github className="text-slate-300" size={20} />
              </a>
              <a href="http://linkedin.com/in/hadeed-ul-hassan-b91453376" rel='noopener noreferrer' className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors">
                <Linkedin className="text-slate-300" size={20} />
              </a>
              <Link to="/contact" className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors">
                <Mail className="text-slate-300" size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>&copy; 2025 Hadeed. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
};