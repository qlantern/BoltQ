import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const [openSections, setOpenSections] = useState({
    price: true,
    experience: true,
    specialties: true,
    availability: true,
    rating: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ title, children, isOpen, onToggle }: {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-900 dark:text-white mb-4"
      >
        {title}
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && <div className="space-y-3">{children}</div>}
    </div>
  );

  const sidebarContent = (
    <div className="bg-white dark:bg-gray-800 h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Price Range */}
        <FilterSection
          title="Price per hour"
          isOpen={openSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Under 1,000 DZD</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">1,000 - 1,500 DZD</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">1,500 - 2,000 DZD</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Over 2,000 DZD</span>
            </label>
          </div>
        </FilterSection>

        {/* Experience */}
        <FilterSection
          title="Experience"
          isOpen={openSections.experience}
          onToggle={() => toggleSection('experience')}
        >
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">New teacher (0-1 years)</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Experienced (2-5 years)</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Expert (6+ years)</span>
            </label>
          </div>
        </FilterSection>

        {/* Specialties */}
        <FilterSection
          title="Teaching Specialties"
          isOpen={openSections.specialties}
          onToggle={() => toggleSection('specialties')}
        >
          <div className="space-y-3">
            {[
              'Business English',
              'Conversational English',
              'IELTS Preparation',
              'TOEFL Preparation',
              'Academic Writing',
              'Kids English',
              'Pronunciation',
              'Grammar',
              'Literature',
              'Test Preparation'
            ].map((specialty) => (
              <label key={specialty} className="flex items-center">
                <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{specialty}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection
          title="Class Type"
          isOpen={openSections.availability}
          onToggle={() => toggleSection('availability')}
        >
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Online Classes</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Offline Classes</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Available now</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Available this week</span>
            </label>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection
          title="Rating"
          isOpen={openSections.rating}
          onToggle={() => toggleSection('rating')}
        >
          <div className="space-y-3">
            {[5, 4, 3, 2].map((rating) => (
              <label key={rating} className="flex items-center">
                <input type="checkbox" className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" />
                <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                  {rating}+ stars
                  <div className="flex ml-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-sm ${i < rating ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-600'}`}
                      />
                    ))}
                  </div>
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Clear All Filters */}
        <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
          Clear all filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="relative w-80 max-w-xs bg-white dark:bg-gray-800 h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;