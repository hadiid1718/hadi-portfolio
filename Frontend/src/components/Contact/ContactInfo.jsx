import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const icons = {
  Mail: Mail,
  Github: Github,
  Linkedin: Linkedin
};

export const ContactInfo = () => {
  const contactItems = [
    { icon: 'Mail', title: 'Email', value: 'hadeed.hassan189@gmail.com', name: 'Mail' },
    { icon: 'Github', title: 'GitHub', value: 'https://github.com/hadiid1718/', name: "Github" },
    { icon: 'Linkedin', title: 'LinkedIn', value: 'http://linkedin.com/in/hadeed-ul-hassan-b91453376', name: "LinkedIn" }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
        <div className="space-y-6">
          {contactItems.map((item, idx) => {
            const Icon = icons[item.icon];
            return (
              <div key={idx} className="flex gap-4 items-start">
                <div className="bg-blue-500/20 rounded-lg p-3 flex-shrink-0">
                  <Icon className="text-blue-400" size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <a 
                    href={item.value} 
                    rel='noopener noreferrer' 
                    className="text-slate-300 hover:text-blue-400 transition-colors break-all text-sm sm:text-base"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Availability</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          I am currently available for freelance projects and fractional platform leadership roles. Response time is typically within 24 hours.
        </p>
        <div className="inline-flex items-center gap-2 text-green-400">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-semibold">Available for new projects</span>
        </div>
      </div>
    </div>
  );
};