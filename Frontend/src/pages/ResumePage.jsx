import { Outlet } from "react-router-dom";
import ResumeContent from "../components/resume/ResdumeContent";
import ResumeSidebar from "../components/resume/ResumeSidebar";
import { useState } from "react";


export const ResumePage = () => {
  
  const [activeTab, setActiveTab] = useState("About");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase mb-4 block">
              Resume
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              My <span className="text-green-400">Resume</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A snapshot of my skills, experience, and projects that highlight my passion for building scalable, user-centric web applications with modern technologies.
            </p>
          </div>

      
        </div>
      </section>


      {/* Section -2 */}
      <section>
       <div className="flex flex-col lg:flex-row mb-5 justify-center items-center   text-white">
      <div className=" border-b lg:border-r border-gray-700">
        <ResumeSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className=" w-3/4 p-8 mt-10">
        <ResumeContent activeTab={activeTab} />
      </div>
    </div>
      </section>
    </div>
  );
};