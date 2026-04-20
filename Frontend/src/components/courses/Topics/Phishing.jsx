import React from 'react'
import { motion } from "framer-motion";
import PhisingTools from './PhisingTools';

const Phishing = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <section className='pt-32 pb-20 px-6'>
          <div className='max-w-7xl mx-auto'>
            <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase mb-4 block">
              Phishing
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Topic: <span className="text-green-400">Phishing</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
             Phishing is a deceptive cyberattack technique where attackers impersonate trusted entities to trick users into revealing sensitive information like passwords or financial details. It commonly occurs through fake emails, messages, or websites designed to look legitimate.

            </p>
      
          </div>

          </div>
        </section>
        {/* section--2 */}
        <section>
         <PhisingTools/>
        </section>
      </motion.div>
    </>
  )
}

export default Phishing
