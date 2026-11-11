import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../components/common/Link';
import { ServiceCard } from '../components/services/ServiceCard';
import { serviceAPI } from '../services/apiService';

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useStaticData, setUseStaticData] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      console.log('[loadServices] Fetching services from API');
      const servicesRes = await serviceAPI.getAll();
      console.log('[loadServices] Response:', servicesRes);

      if (servicesRes.services && servicesRes.services.length > 0) {
        console.log('[loadServices] Using API data:', servicesRes.services.length, 'services');
        setServices(servicesRes.services);
        setUseStaticData(false);
      } else {
        console.log('[loadServices] API returned empty, using static data');
        setServices(staticServices);
        setUseStaticData(true);
      }
    } catch (error) {
      console.error('[loadServices] Error:', error);
      console.log('[loadServices] Falling back to static data');
      setServices(staticServices);
      setUseStaticData(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase mb-4 block">
              What I Offer
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Services
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive development solutions tailored to your business needs, from concept to deployment.
            </p>
          </div>

          {useStaticData && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm">
              💡 Tip: You're viewing static services. Add services from the admin panel to see them here.
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-400">Loading services...</p>
            </div>
          ) : services.length > 0 ? (
            <div className="space-y-12">
              {services.map((service, idx) => (
                <ServiceCard key={service._id || idx} service={service} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">No services available</p>
            </div>
          )}

          <div className="text-center mt-16">
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center gap-2">
              Start Your Project
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};