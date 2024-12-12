/*
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RfpListPage from './pages/RfpListPage';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <motion.div 
        className="min-h-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rfps" element={<RfpListPage />} />
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}

export default App;
*/
//RSS Feed code
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RfpListPage from './pages/RfpListPage';
import RssFeedPage from './pages/RssFeedPage';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <motion.div 
        className="min-h-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rfps" element={<RfpListPage />} />
          <Route path="/rss-feed" element={<RssFeedPage />} /> {/* Add this route */}
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}

export default App;