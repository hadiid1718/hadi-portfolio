


import React from 'react'
import { Link } from '../../common/Link'

const AndroidHackingTool = () => {
    const RatsTool = [
        {
            id: "androrat",
            name: "AndroRAT",
            path: "/androrat",
            description:
                "AndroRAT is a remote administration tool designed for Android devices, commonly studied in cybersecurity research to understand mobile threats, permissions abuse, and command-and-control behavior."
        },
        {
            id: "evil-droid",
            name: "Evil-Droid",
            path: "/evil-droid",
            description:
                "Evil-Droid is a security research tool used to demonstrate how malicious payloads can be embedded within Android applications, helping learners understand Android security risks and defense strategies."
        },
        {
            id: "thefatrat",
            name: "TheFatRat",
            path: "/thefatrat",
            description:
                "TheFatRat is a post-exploitation framework widely analyzed in ethical hacking labs to study payload generation concepts, attack vectors, and how antivirus evasion techniques work at a theoretical level."
        }
    ]
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">

            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Here are the following tools that are gonna help you to learn Android Hacking.
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {RatsTool.map((rattool) => (
                    <div
                        key={rattool.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6
                          hover:-translate-y-2 transition-all duration-300
                          hover:shadow-xl hover:shadow-black/40"
                    >
                        <h2 className="text-xl font-semibold text-white mb-3">
                            {rattool.name}
                        </h2>

                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {rattool.description}
                        </p>

                        <Link
                            to={rattool.path}
                            className="inline-block text-indigo-400 hover:text-indigo-300 font-medium transition"
                        >
                            Learn More →
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AndroidHackingTool
