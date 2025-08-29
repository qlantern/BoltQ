import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X, MapPin, Search } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange?: (filters: FilterState) => void;
}

interface FilterState {
  priceRanges: string[];
  experienceLevels: string[];
  specialties: string[];
  classTypes: string[];
  ratings: number[];
}

const [priceRange, setPriceRange] = useState([500, 3000]);
const [locationSearch, setLocationSearch] = useState('');

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose, onFiltersChange }) => {
  const [openSections, setOpenSections] = useState({
    price: true,
    experience: true,
    specialties: true,
    availability: true,
    rating: true
  });
  const [priceRange, setPriceRange] = useState([500, 3000]);
  const [locationSearch, setLocationSearch] = useState('');

  const [filters, setFilters] = useState<FilterState>({
    priceRanges: [],
    experienceLevels: [],
    specialties: [],
    classTypes: [],
    ratings: []
  });

  const handleFilterChange = (category: keyof FilterState, value: string | number, checked: boolean) => {
    const newFilters = { ...filters };
    if (checked) {
      (newFilters[category] as any[]).push(value);
    } else {
      newFilters[category] = (newFilters[category] as any[]).filter(item => item !== value);
    }
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRanges: [],
      experienceLevels: [],
      specialties: [],
      classTypes: [],
      ratings: [],
      locations: []
    };
    setFilters(clearedFilters);
    setPriceRange([500, 3000]);
    setLocationSearch('');
    setPriceRange([500, 3000]);
    setLocationSearch('');
    onFiltersChange?.(clearedFilters);
  };

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
          title="Price per hour (DZD)"
          isOpen={openSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-4">
            <div className="px-3">
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
                <span>{priceRange[0]} DZD</span>
                <span>{priceRange[1]} DZD</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newMin = parseInt(e.target.value);
                    if (newMin <= priceRange[1]) {
                      setPriceRange([newMin, priceRange[1]]);
                    }
                  }}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value);
                    if (newMax >= priceRange[0]) {
                      setPriceRange([priceRange[0], newMax]);
                    }
                  }}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.priceRanges.includes('under-1000')}
                  onChange={(e) => handleFilterChange('priceRanges', 'under-1000', e.target.checked)}
                  className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Under 1,000 DZD</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.priceRanges.includes('1000-1500')}
                  onChange={(e) => handleFilterChange('priceRanges', '1000-1500', e.target.checked)}
                  className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">1,000 - 1,500 DZD</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.priceRanges.includes('1500-2000')}
                  onChange={(e) => handleFilterChange('priceRanges', '1500-2000', e.target.checked)}
                  className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">1,500 - 2,000 DZD</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.priceRanges.includes('over-2000')}
                  onChange={(e) => handleFilterChange('priceRanges', 'over-2000', e.target.checked)}
                  className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Over 2,000 DZD</span>
              </label>
            </div>
          </div>
        </FilterSection>

        {/* Location Search */}
        <FilterSection
          title="Location"
          isOpen={openSections.location}
          onToggle={() => toggleSection('location')}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              placeholder="Search by city..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="mt-3 space-y-2">
            {['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif'].map((city) => (
              <label key={city} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{city}</span>
              </label>
            ))}
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
              <input 
                type="checkbox" 
                checked={filters.experienceLevels.includes('new')}
                onChange={(e) => handleFilterChange('experienceLevels', 'new', e.target.checked)}
                className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">New teacher (0-1 years)</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.experienceLevels.includes('experienced')}
                onChange={(e) => handleFilterChange('experienceLevels', 'experienced', e.target.checked)}
                className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Experienced (2-5 years)</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.experienceLevels.includes('expert')}
                onChange={(e) => handleFilterChange('experienceLevels', 'expert', e.target.checked)}
                className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
              />
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
                <input 
                  type="checkbox" 
                  checked={filters.specialties.includes(specialty)}
                  onChange={(e) => handleFilterChange('specialties', specialty, e.target.checked)}
                  className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{specialty}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection
          title="Class Format & Type"
          isOpen={openSections.availability}
          onToggle={() => toggleSection('availability')}
        >
          <div className="space-y-3">
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Format</h5>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={filters.classTypes.includes('online')}
                    onChange={(e) => handleFilterChange('classTypes', 'online', e.target.checked)}
                    className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Online Classes</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={filters.classTypes.includes('offline')}
                    onChange={(e) => handleFilterChange('classTypes', 'offline', e.target.checked)}
                    className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Offline Classes</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class Type</h5>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={filters.classTypes.includes('individual')}
                    onChange={(e) => handleFilterChange('classTypes', 'individual', e.target.checked)}
                    className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Individual Classes</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={filters.classTypes.includes('group')}
                    onChange={(e) => handleFilterChange('classTypes', 'group', e.target.checked)}
                    className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Group Classes</span>
                </label>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Availability</h5>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={filters.classTypes.includes('available-now')}
                    onChange={(e) => handleFilterChange('classTypes', 'available-now', e.target.checked)}
                    className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Available now</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={filters.classTypes.includes('available-week')}
                    onChange={(e) => handleFilterChange('classTypes', 'available-week', e.target.checked)}
                    className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Available this week</span>
                </label>
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Availability - Old section removed and replaced above */}
        <FilterSection
          title="Class Type (Legacy)"
          isOpen={false}
          onToggle={() => {}}
        >
          <div className="hidden">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.classTypes.includes('online')}
                onChange={(e) => handleFilterChange('classTypes', 'online', e.target.checked)}
                className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Online Classes</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.classTypes.includes('offline')}
                onChange={(e) => handleFilterChange('classTypes', 'offline', e.target.checked)}
                className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Offline Classes</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.classTypes.includes('available-now')}
                onChange={(e) => handleFilterChange('classTypes', 'available-now', e.target.checked)}
                className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Available now</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.classTypes.includes('available-week')}
                onChange={(e) => handleFilterChange('classTypes', 'available-week', e.target.checked)}
                className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Available this week</span>
            </label>
          </div>

        {/* Rating */}
        <FilterSection
          title="Rating"
          isOpen={openSections.rating}
          onToggle={() => toggleSection('rating')}
        >
          <div className="space-y-3">
            {[5, 4, 3, 2].map((rating) => (
              <label key={rating} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.ratings.includes(rating)}
                  onChange={(e) => handleFilterChange('ratings', rating, e.target.checked)}
                  className="mr-3 rounded border-gray-300 dark:border-gray-600 text-coral-500 focus:ring-coral-500 bg-gray-100 dark:bg-gray-700" 
                />
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
        <button 
          onClick={clearAllFilters}
          className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
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