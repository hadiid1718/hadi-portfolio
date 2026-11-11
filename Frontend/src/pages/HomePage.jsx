import React from 'react';
import { Hero } from '../components/home/HeroSection';
import { ImpactSection } from '../components/home/ImpactSection';
import { StatsSection } from '../components/home/StatsSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Hero />
      <ImpactSection />
      <StatsSection />
    </div>
  );
};