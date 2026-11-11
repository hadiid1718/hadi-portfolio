import React from 'react'
import { Link } from '../../common/Link'

const OsintTool = () => {
const osintTool = [
  {
    id: "mr-holmes",
    name: "Mr. Holmes",
    path: "/mr-holmes",
    description:
      "Mr. Holmes is an OSINT framework used for gathering publicly available information related to usernames, emails, and domains. It is commonly studied to understand how digital footprints can be traced across the internet."
  },
  {
    id: "hound",
    name: "Hound",
    path: "/hound",
    description:
      "Hound is an open-source intelligence tool designed to collect and analyze information from open sources. It helps learners understand automated data gathering and correlation techniques used in OSINT investigations."
  },
  {
    id: "whois",
    name: "WHOIS Lookup",
    path: "/whois",
    description:
      "WHOIS is a widely used service that provides publicly available domain registration details such as ownership, registration dates, and name servers, making it a core resource in OSINT research."
  },
  {
    id: "centerops",
    name: "CenterOps",
    path: "/centerops",
    description:
      "CenterOps.net is an OSINT website offering multiple network and domain analysis tools. It is used to explore DNS records, IP information, and related infrastructure data from open sources."
  },
  {
    id: "wappalyzer",
    name: "Wappalyzer",
    path: "/wappalyzer",
    description:
      "Wappalyzer is a browser extension that identifies the technologies used to build a website, such as frameworks, CMS, analytics, and servers, helping users understand web technology stacks."
  }
];

  return (
    <div>
        <div className="max-w-7xl mx-auto px-6 py-16">

            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Here are the following tools that are gonna help you to learn Osint of anything..
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {osintTool.map((ostool) => (
                    <div
                        key={ostool.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6
                          hover:-translate-y-2 transition-all duration-300
                          hover:shadow-xl hover:shadow-black/40"
                    >
                        <h2 className="text-xl font-semibold text-white mb-3">
                            {ostool.name}
                        </h2>

                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {ostool.description}
                        </p>

                        <Link
                            to={ostool.path}
                            className="inline-block text-indigo-400 hover:text-indigo-300 font-medium transition"
                        >
                            Learn More →
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    </div>
  )
}

export default OsintTool
