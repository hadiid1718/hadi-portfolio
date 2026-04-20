
import React from "react";
import { Link } from "../common/Link";

const CourseTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: "Phishing", name: "Phishing", path: "/phishing" },
        { id: "AndroidHacking", name: "Rats", path: "/andrat" },
        { id: "osint", name: "Osint", path: "/osint" },

    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {tabs.map((item) => (
                <Link
                    to={item.path}
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`border border-white bg-gray-800 m-3 text-center w-[120px] rounded-md px-3 py-1 transition ${activeTab === item.id
                            ? "bg-green-500 text-white"
                            : "hover:bg-gray-700 text-gray-300"
                        }`}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
};

export default CourseTabs;
