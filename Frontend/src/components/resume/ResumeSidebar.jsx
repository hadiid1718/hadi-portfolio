import React from "react";

const ResumeSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "About", name: "About me" },
    { id: "experience", name: "Experience" },
    { id: "education", name: "Education" },
    { id: "skills", name: "Skills" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-2">
      {tabs.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`border border-white bg-gray-800 m-3 text-center w-[120px] rounded-md px-3 py-1 transition ${
            activeTab === item.id
              ? "bg-green-500 text-white"
              : "hover:bg-gray-700 text-gray-300"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default ResumeSidebar;
