import React, { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';

const therapeuticAreas = [
  'Oncology',
  'Cardiovascular',
  'Neurology',
  'Immunology',
  'Infectious Diseases',
  'Rare Diseases',
  'Pediatrics',
  'Metabolic Disorders',
  'Respiratory',
  'Dermatology',
  'Ophthalmology',
  'Hematology',
];

const ProfilePage = () => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');

  const toggleArea = (area: string) => {
    setSelectedAreas(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log({ companyName, email, selectedAreas });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
            <p className="mt-2 text-gray-600">
              Customize your profile to receive relevant RFP notifications
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your company name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            {/* Therapeutic Areas */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Therapeutic Areas</h2>
              <p className="text-sm text-gray-600">
                Select the therapeutic areas that match your company's expertise
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {therapeuticAreas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium ${
                      selectedAreas.includes(area)
                        ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {area}
                    {selectedAreas.includes(area) ? (
                      <X className="h-4 w-4 ml-2" />
                    ) : (
                      <Plus className="h-4 w-4 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;