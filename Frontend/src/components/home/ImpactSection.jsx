import React from 'react';
import {  Code,  Gamepad, File } from 'lucide-react';
import { impactItems } from '../utils/Constants';
import { motion } from "framer-motion";


const icons = {
  'U Sleep': Code,
  'Acquisitions - Secure REST API': Code,
  'README Generator SaaS': File
};

export const ImpactSection = () => {
  return (
    <section className="py-20 px-6">
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0}}
       className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          Recent Impact
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {impactItems.map((item, idx) => {
            const Icon = icons[item.title];
            return (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-6">
                  <Icon className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};