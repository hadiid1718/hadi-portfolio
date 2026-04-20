import React from "react";
import { Link } from "../../common/Link";

const PhisingTools = () => {

  const toolsCard = [
    {
      id: "zphisher",
      name: "Z Phisher",
      path: "/zphisher",
      description:
        "Zphisher is an automated phishing tool that simplifies the process of creating and deploying phishing campaigns. It offers a user-friendly interface and pre-built templates."
    },
    {
      id: "max-phisher",
      name: "Max Phisher",
      path: "/max-phisher",
      description:
        "Max Phisher is a comprehensive phishing framework designed for security professionals and ethical hackers with advanced customization."
    },
    {
      id: "CyberPhish",
      name: "CyberPhish",
      path: "/cyberphish",
      description:
        "CyberPhish is a phishing simulation tool aimed at training users to identify and respond to phishing threats effectively."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Here are the following tools that are gonna help you to learn phishing.
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {toolsCard.map((tool) => (
          <div
            key={tool.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6
                       hover:-translate-y-2 transition-all duration-300
                       hover:shadow-xl hover:shadow-black/40"
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              {tool.name}
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {tool.description}
            </p>

            <Link
              to={tool.path}
              className="inline-block text-indigo-400 hover:text-indigo-300 font-medium transition"
            >
              Learn More →
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PhisingTools;
