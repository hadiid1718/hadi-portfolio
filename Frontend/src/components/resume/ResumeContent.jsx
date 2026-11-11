import React, { useState } from "react";
import { experience, projects } from "../utils/Constants";

const DESCRIPTION_LIMIT = 260; // characters shown before "See more"

const skills = [
  "Python", "FastAPI", "React.js", "Node.js", "Express", "MongoDB",
  "Tailwind CSS", "JavaScript (ES6+)", "Socket.io", "SQL", "MySQL",
  "Docker", "RAG", "LangGraph", "CrewAI", "Agentic AI",
];

const aboutItems = [
  { label: "Name", value: "Hadeed Ul Hassan" },
  { label: "Email", value: "hadeed.hassan189@gmail.com" },
  { label: "Experience", value: "1+ year" },
  { label: "Nationality", value: "Pakistani" },
  { label: "Freelance", value: "Available" },
  { label: "Timezone", value: "UTC+5 (flexible worldwide)" },
];

// Accepts "YYYY-MM" or "YYYY-MM-DD". null/undefined shows "Present".
const fmt = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
    : "Present";

// Keeps bullets until the character limit is reached, then cuts the last one with "…"
const getCollapsed = (points, limit) => {
  let used = 0;
  const out = [];
  for (const p of points) {
    if (used + p.length <= limit) {
      out.push(p);
      used += p.length;
    } else {
      const remaining = limit - used;
      if (remaining > 40) out.push(p.slice(0, remaining).trimEnd() + "…");
      break;
    }
  }
  return out;
};

const Entry = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const total = item.description.join("").length;
  const isLong = total > DESCRIPTION_LIMIT;
  const points =
    isLong && !expanded
      ? getCollapsed(item.description, DESCRIPTION_LIMIT)
      : item.description;

  return (
    <div className="space-y-3">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h4 className="text-xl sm:text-2xl font-semibold">{item.title}</h4>
          <p className="text-gray-400">
            {item.company}
            {item.location && ` · ${item.location}`}
          </p>
        </div>
        <p className="text-sm sm:text-base text-gray-400">
          {fmt(item.start)} – {fmt(item.end)}
        </p>
      </div>

      <ul className="list-disc pl-5 space-y-1 text-gray-300 leading-relaxed text-sm sm:text-base">
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-green-400 text-sm font-medium hover:underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};

// Defined outside ExperienceTab so it isn't re-created on every render
const Group = ({ heading, list, prefix, labelKey, selected, onSelect }) => (
  <div className="space-y-2">
    <p className="text-xs uppercase tracking-wider text-gray-500">{heading}</p>
    <div className="flex flex-wrap gap-2">
      {list.map((item) => {
        const key = `${prefix}-${item.id}`;
        const active = selected === key;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`px-3 py-1.5 rounded-md text-sm border transition-all duration-300 ${active
                ? "bg-green-400 text-black border-green-400"
                : "bg-slate-800/40 text-gray-300 border-slate-700 hover:border-green-400/40"
              }`}
          >
            {item[labelKey]}
          </button>
        );
      })}
    </div>
  </div>
);

const ExperienceTab = () => {
  const [selected, setSelected] = useState(`exp-${experience[0].id}`);

  const all = [
    ...experience.map((e) => ({ ...e, key: `exp-${e.id}` })),
    ...projects.map((p) => ({ ...p, key: `proj-${p.id}` })),
  ];
  const current = all.find((i) => i.key === selected) || all[0];

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-green-400">Experience</h2>

      <Group
        heading="Work"
        list={experience}
        prefix="exp"
        labelKey="company"
        selected={selected}
        onSelect={setSelected}
      />
      <Group
        heading="Projects"
        list={projects}
        prefix="proj"
        labelKey="title"
        selected={selected}
        onSelect={setSelected}
      />

      <div className="border-t border-slate-700 pt-6">
        {/* key resets the See more state when you switch entries */}
        <Entry key={current.key} item={current} />
      </div>
    </div>
  );
};

const ResumeContent = ({ activeTab }) => {
  // Works whether your tab buttons send "About" or "about"
  const tab = String(activeTab).toLowerCase();

  return (
    <section className="p-4 sm:p-6 text-white rounded-lg shadow-md max-w-4xl min-h-[300px] transition-all duration-300 overflow-x-hidden">
      {/* About Section */}
      {tab === "about" && (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-400">About Me</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base max-w-3xl mb-8">
            Full stack engineer specializing in agentic AI systems. I design multi-agent
            architectures with LangGraph and CrewAI and build production RAG pipelines that
            stay grounded in real data instead of hallucinating. Founder of Relvyn, a
            three-agent engineering intelligence platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            {aboutItems.map((item) => (
              <div
                key={item.label}
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
      {tab === "skills" && (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-green-400">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 text-gray-300">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-700 px-2 py-1 sm:px-3 rounded-md text-center text-xs sm:text-sm break-words"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {tab === "education" && (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-green-400">Education</h2>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-1">
            <div>
              <h4 className="text-xl sm:text-2xl font-semibold">Quaid-i-Azam University, Islamabad</h4>
              <p className="text-gray-400">BS Information Technology</p>
            </div>
            <p className="text-sm sm:text-base text-gray-400">2022 – 2026</p>
          </div>
          <div className="mt-4 space-y-2">
            <h4 className="text-lg sm:text-xl font-semibold">Coursework</h4>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base break-words">
              Web Programming, Database Management Systems, Advanced Web Engineering,
              Software Engineering, Cybersecurity Fundamentals
            </p>
          </div>
        </div>
      )}

      {/* Experience Section */}
      {tab === "experience" && <ExperienceTab />}
    </section>
  );
};

export default ResumeContent;