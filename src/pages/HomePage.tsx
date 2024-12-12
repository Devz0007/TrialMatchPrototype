
//RSS Code

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Search, Shield, Bell } from 'lucide-react';
import MarketingSection from '../components/marketing/MarketingSection';
import { motion, useScroll, useTransform } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Find the perfect
                  </motion.span>
                  <motion.span
                    className="block text-primary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Clinical Trial RFPs
                  </motion.span>
                </h1>
                <motion.p
                  className="mt-3 text-base text-neutral sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Connect with leading pharmaceutical companies and access the latest RFPs tailored to your therapeutic areas. Stay ahead with real-time notifications and weekly reports.
                </motion.p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/rfps')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-light transition-colors duration-200 md:py-4 md:text-lg md:px-10"
                  >
                    Browse RFPs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-3 sm:mt-0 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-light/20 hover:bg-primary-light/30 transition-colors duration-200 md:py-4 md:text-lg md:px-10"
                  >
                    Create Profile
                  </motion.button>
                </div>

               {/* Add RSS Feed Button */}
<div className="mt-6">
  <Link to="/rss-feed">
    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200">
      View RSS Feed
    </button>
  </Link>
</div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <motion.img
            style={{ y }}
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
            alt="Scientific research"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to find the right RFPs
            </p>
          </div>

          {/* ... (remaining content) */}
        </div>
      </div>

      {/* Marketing Section */}
      <MarketingSection />
    </div>
  );
};

export default HomePage;