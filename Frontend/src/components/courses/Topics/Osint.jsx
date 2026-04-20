import React from 'react'
import { motion } from 'framer-motion'
import OsintTool from './OsintTool'

const Osint = () => {
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
                Osint
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Topic: <span className="text-green-400">Open Source Intelligence</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                OSINT (Open Source Intelligence) involves collecting and analyzing publicly available information from open sources such as social media, websites, and public records. It is widely used in cybersecurity and investigations to gather insights while staying within legal and ethical boundaries.

              </p>

            </div>

          </div>
        </section>
        {/* section--2 */}
        <section>
          <OsintTool />
        </section>
      </motion.div>
    </>
  )
}

export default Osint
