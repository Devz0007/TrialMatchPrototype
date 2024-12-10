import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAreas: string[];
  onAreaChange: (area: string) => void;
}

const therapeuticAreas = [
  'Oncology',
  'Cardiovascular',
  'Neurology',
  'Immunology',
  'Infectious Diseases',
  'Rare Diseases',
  'Pediatrics',
  'Metabolic Disorders',
];

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  selectedAreas,
  onAreaChange,
}) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500" />
              <h2 className="ml-2 text-lg font-medium text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Therapeutic Areas
              </h3>
              <div className="space-y-2">
                {therapeuticAreas.map((area) => (
                  <label
                    key={area}
                    className="flex items-center space-x-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAreas.includes(area)}
                      onChange={() => onAreaChange(area)}
                      className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;