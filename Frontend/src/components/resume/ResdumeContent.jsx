import React from "react";

const ResumeContent = ({ activeTab }) => {
  return (
    <section className="p-4 sm:p-6 text-whit rounded-lg shadow-md max-w-4xl min-h-[300px] transition-all duration-300 overflow-x-hidden">
      {/* About Section */}
      {activeTab === "About" && (

  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-400">
      About Me
    </h2>

    <p className="text-gray-300 leading-relaxed text-sm sm:text-base max-w-3xl mb-8">
      I’m a passionate and detail-oriented Full-Stack Developer specializing in the MERN stack 
      (MongoDB, Express, React, Node.js). I have hands-on experience in both frontend and backend 
      development, designing scalable systems, building APIs, and creating intuitive, responsive user 
      interfaces. With a strong foundation in SQL and MySQL, I strive to deliver efficient, reliable, 
      and optimized digital solutions that make a meaningful impact.
    </p>

   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
  {[
    { label: "Name", value: "Hadeed Ul Hassan" },
    { label: "Email", value: "hadeed.hassan189@gmail.com" },
    { label: "Phone", value: "+92 336 9908189" },
    { label: "Experience", value: "2+ years" },
    { label: "Nationality", value: "Pakistan" },
    { label: "Freelance", value: "Available" },
    { label: "Timezone", value: "UTC+5 (flexible worldwide)" },
  ].map((item, idx) => (
    <div
      key={idx}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-800/40 border border-slate-700 rounded-lg px-4 py-3 gap-2 hover:border-green-400/40 transition-all duration-300"
    >
      <h4 className="font-mono text-green-400 whitespace-nowrap flex-shrink-0">{item.label}:</h4>
      <p className="text-gray-200 text-sm break-all overflow-hidden text-right w-full">{item.value}</p>
    </div>
  ))}
</div>
  </div>
)}


    

      {/* Skills Section */}
      {activeTab === "skills" && (
        <div >
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-green-400">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 text-gray-300">
            <span className="bg-gray-700 px-2 py-1 sm:px-3 rounded-md text-center text-xs sm:text-sm break-words">React.js</span>
            <span className="bg-gray-700 px-2 py-1 sm:px-3 rounded-md text-center text-xs sm:text-sm break-words">Node.js</span>
            <span className="bg-gray-700 px-2 py-1 sm:px-3 rounded-md text-center text-xs sm:text-sm break-words">Express</span>
            <span className="bg-gray-700 px-2 py-1 sm:px-3 rounded-md text-center text-xs sm:text-sm break-words">MongoDB</span>
            <span className="bg-gray-700 px-2 py-1 sm:px-3 rounded-md text-center text-xs sm:text-sm break-words">Tailwind CSS</span>
            <span className="bg-gray-700 px-2 py-1 sm:px-3 rounded-md text-center text-xs sm:text-sm break-words">JavaScript (ES6+)</span>
            <span className="bg-gray-700 px-2 py-1 sm:px-3 rounded-md text-center text-xs sm:text-sm break-words">Socket.io</span>
            <span className="bg-gray-700 px-2 py-1 sm:px-3 rounded-md text-center text-xs sm:text-sm break-words">SQL</span>
            <span className="bg-gray-700 px-2 py-1 sm:px-3 rounded-md text-center text-xs sm:text-sm break-words">MySQL</span>
          </div>
        </div>
      )}

      { activeTab === 'education' && (
        <div>
               <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-green-400">Education</h2>
              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3">
                <h4 className="text-xl sm:text-2xl font-semibold ">Quaid I Azam university, Islamabad</h4>
                <p className="text-center text-sm">(2022 - 2026)</p>
              </div>
              <div className="mt-3 space-y-3">
                <h4 className="text-xl sm:text-2xl font-semibold ">Course Work:</h4>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base break-words">Web Programming, DataBase Management Systems (SQL), Adv. Web Engineering, Software Engineering, Computer Architecture</p>
              </div>

        </div>
      )}

      { activeTab === 'experience' && (
        <div className="space-y-6">

          <h1 className="text-xl sm:text-2xl font-semibold mb-3 text-green-400">Experience</h1>
          <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between">
            <h4 className="text-xl sm:text-2xl font-semibold">Jaynext IT, Lahore</h4>
            <p>(01/07/2025 - 01/09/2025)</p>
          </div>
          <p className="">Completed A 2 month remote internship at Jaynex IT, Lahore</p>
        </div>
      )}
    </section>
  );
};

export default ResumeContent;