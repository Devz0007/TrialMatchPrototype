import React from 'react';
import { MapPin, Users, Calendar, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

export interface RfpCardProps {
  area: string;
  disease: string;
  country: string;
  sponsor: string;
  type: string;
  status: string;
  phase: string | number;
  size: number;
  sites: number;
  minAge: string;
  maxAge: string;
  idctgov: string;
  isBookmarked?: boolean;
  lastUpdateDate?: string;
  onBookmarkToggle?: (id: string) => void;
}

const RfpCard: React.FC<RfpCardProps> = ({
  area,
  disease,
  country,
  sponsor,
  type,
  status,
  phase,
  size,
  sites,
  minAge,
  maxAge,
  idctgov,
  isBookmarked = false,
  lastUpdateDate,
  onBookmarkToggle,
}) => {
  return (
    <motion.div
      className="bg-white p-4 border-b last:border-b-0 md:border md:rounded-lg md:shadow-sm md:hover:shadow-md transition-all duration-200"
      whileHover={{ scale: 1.01 }}
      layout
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <div className="space-y-2 flex-1">
          <a
            href={`https://clinicaltrials.gov/study/${idctgov}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block text-base font-medium text-primary hover:text-primary-light transition-colors duration-200"
            aria-label={`View ${disease} study details on ClinicalTrials.gov`}
          >
            <span className="inline-flex items-center gap-1">
              {disease}
              <svg
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </span>
          </a>
          <p className="text-sm text-neutral flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light/10 text-primary">
              Phase {phase}
            </span>
            • {sponsor}
          </p>
        </div>
        
        <button
          onClick={onBookmarkToggle}
          className="p-1.5 hover:bg-gray-50 rounded-full transition-colors duration-200 cursor-pointer"
        >
          <Bookmark
            className={`h-5 w-5 ${
              isBookmarked ? 'fill-primary text-primary' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      {/* Details Grid */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral">
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          <span>{size} participants • {sites} sites</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          <span>{country}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{minAge} - {maxAge}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex justify-between items-center">
        <span className={`text-xs font-medium px-2 py-1 rounded ${
          status === 'RECRUITING' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
        {lastUpdateDate && (
          <span className="text-xs text-gray-500">
            Updated {new Date(lastUpdateDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default RfpCard;