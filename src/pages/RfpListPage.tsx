import React, { useState, useEffect } from 'react';
import { Filter, Search, ArrowUpDown, ChevronLeft, ChevronRight, Bookmark, Home, List, User, Calendar, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/animations/FadeIn';
import RfpCard from '../components/rfp/RfpCard';
import { Link } from 'react-router-dom';
import { useStudies } from '../hooks/useStudies';
import { transformStudyToRfpCard } from '../utils/studyTransforms';
import { THERAPEUTIC_AREAS, STUDY_STATUSES, STUDY_PHASES } from '../constants/therapeuticAreas';
import { useBookmarks } from '../hooks/useBookmarks';
import { exportToCSV } from '../utils/exportUtils';

const RfpListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPhases, setSelectedPhases] = useState<string[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { bookmarkedRfps, toggleBookmark, isBookmarked } = useBookmarks();

  const { 
    studies, 
    isLoading, 
    error,
    totalCount,
    hasNextPage,
    loadNextPage,
    refresh
  } = useStudies({
    pageSize: 20,
    therapeuticArea: selectedArea,
    status: selectedStatuses.length === 1 ? selectedStatuses[0] : selectedStatuses.length > 1 ? 
      `(${selectedStatuses.join(' OR ')})` : '',
    phase: selectedPhases.length === 1 ? selectedPhases[0] : selectedPhases.length > 1 ? 
      `(${selectedPhases.map(p => `PHASE_${p}`).join(' OR ')})` : '',
    sort: [`LastUpdatePostDate:${sortDirection}`],
  });

  // Reset page when filters change
  useEffect(() => {
    refresh();
  }, [selectedArea, selectedStatuses, selectedPhases, shouldRefresh, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleBookmarkToggle = () => {
    setShowBookmarked(prev => !prev);
    setShouldRefresh(prev => !prev);
  };

  const handleExport = () => {
    const fileName = `rfp-export-${new Date().toISOString().split('T')[0]}`;
    exportToCSV(studies, fileName);
  };

  const handlePhaseToggle = (phaseValue: string) => {
    setSelectedPhases(prev => 
      prev.includes(phaseValue)
        ? prev.filter(p => p !== phaseValue)
        : [...prev, phaseValue]
    );
  };

  const handleStatusToggle = (statusValue: string) => {
    setSelectedStatuses(prev => 
      prev.includes(statusValue)
        ? prev.filter(s => s !== statusValue)
        : [...prev, statusValue]
    );
  };

  return (
    <div className="min-h-screen bg-neutral-lightest pb-16 md:pb-8 md:pt-8">
      <div className="max-w-7xl mx-auto px-0 md:px-4 lg:px-8">
        <FadeIn>
          <div className="flex justify-between items-center p-4 md:p-0 md:mb-4 bg-white md:bg-transparent border-b md:border-none">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-primary">RFPs</h1>
              <p className="text-sm text-neutral hidden md:block">Browse and filter the latest opportunities</p>
            </div>
          </div>
        </FadeIn>

        {/* Search and Filters */}
        <FadeIn>
          <div className="space-y-4 mb-6">
            {/* Search Bar */}
            <div className="bg-white md:rounded-lg md:shadow-sm p-4 border-b md:border">
              <div className="relative max-w-3xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-neutral focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light text-sm"
                  placeholder="Search RFPs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="bg-white md:rounded-lg md:shadow-sm p-4 border-b md:border">
              <div className="flex flex-wrap items-center gap-4">
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="min-w-[200px] pl-3 pr-10 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                >
                  <option value="">All Therapeutic Areas</option>
                  {THERAPEUTIC_AREAS.map(area => (
                    <option key={area.value} value={area.value}>
                      {area.label}
                    </option>
                  ))}
                </select>

                <div
                  className="relative min-w-[200px]"
                >
                  <div
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 text-sm border border-gray-300 rounded-md hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => document.getElementById('phase-dropdown')?.classList.toggle('hidden')}
                  >
                    <span>
                      {selectedPhases.length === 0 
                        ? 'All Phases' 
                        : `${selectedPhases.length} Phase${selectedPhases.length > 1 ? 's' : ''} Selected`}
                    </span>
                    <ArrowUpDown className="h-4 w-4 ml-2 text-gray-400" />
                  </div>
                  <div 
                    id="phase-dropdown"
                    className="absolute z-50 hidden w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
                  >
                    <div className="p-2 space-y-1">
                      {STUDY_PHASES.map(phase => (
                        <label
                          key={phase.value}
                          className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedPhases.includes(phase.value)}
                            onChange={() => handlePhaseToggle(phase.value)}
                            className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{phase.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="relative min-w-[200px]"
                >
                  <div
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 text-sm border border-gray-300 rounded-md hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => document.getElementById('status-dropdown')?.classList.toggle('hidden')}
                  >
                    <span>
                      {selectedStatuses.length === 0 
                        ? 'All Statuses' 
                        : `${selectedStatuses.length} Status${selectedStatuses.length > 1 ? 'es' : ''} Selected`}
                    </span>
                    <ArrowUpDown className="h-4 w-4 ml-2 text-gray-400" />
                  </div>
                  <div 
                    id="status-dropdown"
                    className="absolute z-50 hidden w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
                  >
                    <div className="p-2 space-y-1">
                      {STUDY_STATUSES.map(status => (
                        <label
                          key={status.value}
                          className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedStatuses.includes(status.value)}
                            onChange={() => handleStatusToggle(status.value)}
                            className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{status.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-grow"></div>

                <button
                  onClick={toggleSortDirection}
                  className="flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Date
                  <ArrowUpDown 
                    className={`ml-1 h-4 w-4 transition-transform ${
                      sortDirection === 'desc' ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                <button
                  onClick={handleExport}
                  className="flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-md transition-colors hover:bg-indigo-100 border border-indigo-100"
                  title="Export RFPs from the last 30 days as CSV"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export (30 days)
                </button>
                
                <Bookmark
                  className={`h-5 w-5 cursor-pointer ${
                    showBookmarked ? 'text-primary fill-primary' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={handleBookmarkToggle}
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-600">
            <p>Error loading studies. Please try again later.</p>
          </div>
        )}

        {/* RFP Cards Grid */}
        <div className="bg-white md:bg-transparent divide-y md:divide-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-4 mb-8">
          <AnimatePresence>
            {studies
              ?.filter(study => !showBookmarked || isBookmarked(study.protocolSection.identificationModule.nctId))
              .map((study, index) => study && (
                study && (
                  <FadeIn key={study.protocolSection.identificationModule.nctId} delay={index * 0.1}>
                    <RfpCard 
                      {...transformStudyToRfpCard(study)}
                      isBookmarked={isBookmarked(study.protocolSection.identificationModule.nctId)}
                      onBookmarkToggle={() => toggleBookmark(study.protocolSection.identificationModule.nctId)}
                    />
                  </FadeIn>
                )
              )).filter(Boolean).map((element, index) => (
              <React.Fragment key={`fragment-${index}`}>
                {element}
              </React.Fragment>
            ))}
          </AnimatePresence>
          {showBookmarked && studies.filter(study => isBookmarked(study.protocolSection.identificationModule.nctId)).length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              <p>No bookmarked RFPs yet.</p>
              <p className="text-sm mt-2">Click the bookmark icon on any RFP to save it for later.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4">
          {totalCount > 0 && (
            <p className="text-sm text-gray-600">
              Showing {studies.length} of {totalCount} results
            </p>
          )}
          <button
            onClick={loadNextPage}
            disabled={!hasNextPage || isLoading}
            className="ml-4 px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            ) : (
              <>
                Load More
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
          <div className="flex justify-around items-center h-16">
            <Link to="/" className="flex flex-col items-center justify-center text-neutral hover:text-primary">
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/rfps" className="flex flex-col items-center justify-center text-primary">
              <List className="h-6 w-6" />
              <span className="text-xs mt-1">RFPs</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center justify-center text-neutral hover:text-primary">
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RfpListPage;