import React, { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import TeacherCard from './TeacherCard';
import FilterSidebar from './FilterSidebar';
import { Teacher } from '../types';

interface SearchResultsProps {
  teachers: Teacher[];
  onTeacherSelect: (teacher: Teacher) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ teachers, onTeacherSelect }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [favoritedTeachers, setFavoritedTeachers] = useState<Set<string>>(new Set());

  const handleFavorite = (teacherId: string) => {
    setFavoritedTeachers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(teacherId)) {
        newSet.delete(teacherId);
      } else {
        newSet.add(teacherId);
      }
      return newSet;
    });
  };

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'newest', label: 'Newest Teachers' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">English Teachers</h1>
                <p className="text-gray-600 mt-1">{teachers.length} teachers available</p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coral-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Filter Button (Mobile) */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>

                {/* View Toggle */}
                <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                  <button className="bg-white shadow-sm rounded-md px-3 py-1 text-sm font-medium text-gray-900">
                    Grid
                  </button>
                  <button className="text-gray-500 hover:text-gray-900 px-3 py-1 text-sm font-medium">
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {teachers.map(teacher => (
                <div key={teacher.id} onClick={() => onTeacherSelect(teacher)}>
                  <TeacherCard
                    teacher={teacher}
                    onFavorite={handleFavorite}
                    isFavorited={favoritedTeachers.has(teacher.id)}
                  />
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-coral-500 text-white px-8 py-3 rounded-lg hover:bg-coral-600 font-semibold">
                Load More Teachers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;