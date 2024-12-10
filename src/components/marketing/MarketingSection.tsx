import React from 'react';
import { TrendingUp, Users, Clock, BarChart, ArrowRight } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import { motion } from 'framer-motion';

const statCardVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
  }
};

const formButtonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: { scale: 0.98 }
};

const MarketingSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="lg:text-center mb-12">
            <motion.h2 
              className="text-base text-indigo-600 font-semibold tracking-wide uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Proven Results
            </motion.h2>
            <motion.p 
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Transform Your RFP Process
            </motion.p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform helps CROs streamline their RFP process and improve response rates
          </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Stats Section */}
          <FadeIn direction="left" delay={0.2}>
            <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Platform Statistics
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm"
                variants={statCardVariants}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                  <span className="ml-2 text-sm text-gray-500">Success Rate</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">85%</p>
                <p className="text-sm text-gray-500">Higher response rate</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm"
                variants={statCardVariants}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-indigo-600" />
                  <span className="ml-2 text-sm text-gray-500">Users</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">2.5k+</p>
                <p className="text-sm text-gray-500">Active companies</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm"
                variants={statCardVariants}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-indigo-600" />
                  <span className="ml-2 text-sm text-gray-500">Time Saved</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">60%</p>
                <p className="text-sm text-gray-500">Faster processing</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm"
                variants={statCardVariants}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center">
                  <BarChart className="h-6 w-6 text-indigo-600" />
                  <span className="ml-2 text-sm text-gray-500">Growth</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">3x</p>
                <p className="text-sm text-gray-500">YoY improvement</p>
              </motion.div>
            </div>
          </div>
          </FadeIn>

          {/* Lead Gen Form */}
          <FadeIn direction="right" delay={0.4}>
            <div className="bg-gray-50 rounded-xl p-8">
            <motion.h3 
              className="text-lg font-semibold text-gray-900 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Request a Demo Today
            </motion.h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Business Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Company Size
                </label>
                <select
                  id="size"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>Select size</option>
                  <option>1-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-500 employees</option>
                  <option>500+ employees</option>
                </select>
              </div>
              <motion.button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                variants={formButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <span>Request a Demo</span>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </motion.button>
            </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default MarketingSection;