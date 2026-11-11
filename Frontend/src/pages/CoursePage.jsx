import { Outlet } from "react-router-dom";
import { useState } from "react";
import CourseTabs from "../components/courses/CourseTabs";


 const CoursePage = () => {
  
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase mb-4 block">
              Course
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              My <span className="text-green-400">Courses</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              An in-depth exploration of various cybersecurity topics, designed to equip learners with practical skills and knowledge to navigate the digital landscape securely.
            </p>
            <p className="text-sm text-red-500 max-w-3xl mx-auto">
                <strong>Note: These course are built to learn for only educational purposes. These are not to harm, theft any person.</strong>
            </p>
          </div>

      
        </div>
      </section>


      {/* Section -2 */}
      <section>
       <div className="flex flex-col lg:flex-row mb-5 justify-center items-center   text-white">
     <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
 
    </div>
      </section>
    </div>
  );
};

export default CoursePage;