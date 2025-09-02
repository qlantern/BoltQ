import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import TeacherCard from './TeacherCard';
import { FilterSidebar } from './FilterSidebar';
import { Teacher } from '../types';

interface SearchResultsProps {
  teachers: Teacher[];
  onTeacherSelect: (teacher: Teacher) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ teachers, onTeacherSelect }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [favoritedTeachers, setFavoritedTeachers] = useState<Set<string>>(new Set());
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [displayedCount, setDisplayedCount] = useState(12);

  React.useEffect(() => {
    setFilteredTeachers(teachers);
  }, [teachers]);

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

  const handleFiltersChange = (filters: any) => {
    let filtered = [...teachers];

    // Apply price filters
    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter(teacher => {
        return filters.priceRanges.some((range: string) => {
          switch (range) {
            case 'under-1000': return teacher.pricePerHour < 1000;
            case '1000-1500': return teacher.pricePerHour >= 1000 && teacher.pricePerHour <= 1500;
            case '1500-2000': return teacher.pricePerHour >= 1500 && teacher.pricePerHour <= 2000;
            case 'over-2000': return teacher.pricePerHour > 2000;
            default: return true;
          }
        });
      });
    }

    // Apply experience filters
    if (filters.experienceLevels.length > 0) {
      filtered = filtered.filter(teacher => {
        return filters.experienceLevels.some((level: string) => {
          switch (level) {
            case 'new': return teacher.experience <= 1;
            case 'experienced': return teacher.experience >= 2 && teacher.experience <= 5;
            case 'expert': return teacher.experience >= 6;
            default: return true;
          }
        });
      });
    }

    // Apply specialty filters
    if (filters.specialties.length > 0) {
      filtered = filtered.filter(teacher =>
        teacher.specialties.some(specialty =>
          filters.specialties.includes(specialty)
        )
      );
    }

    // Apply class type filters
    if (filters.classTypes.length > 0) {
      filtered = filtered.filter(teacher => {
        return filters.classTypes.some((type: string) => {
          switch (type) {
            case 'online': return teacher.offersOnlineClasses;
            case 'offline': return teacher.offersOfflineClasses;
            case 'available-now': return teacher.availability === 'available';
            case 'available-week': return teacher.availability !== 'offline';
            default: return true;
          }
        });
      });
    }

    // Apply rating filters
    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings);
      filtered = filtered.filter(teacher => teacher.rating >= minRating);
    }

    setFilteredTeachers(filtered);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    let sorted = [...filteredTeachers];

    switch (newSortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.pricePerHour - b.pricePerHour);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.pricePerHour - a.pricePerHour);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        // For demo purposes, sort by name as we don't have creation dates
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // recommended
        sorted.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
        break;
    }

    setFilteredTeachers(sorted);
  };

  const loadMoreTeachers = () => {
    setDisplayedCount(prev => prev + 12);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
          onFiltersChange={handleFiltersChange}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">English Teachers</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {filteredTeachers.length} of {teachers.length} teachers available
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  className="lg:hidden bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }>
              {filteredTeachers.slice(0, displayedCount).map(teacher => (
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
            {displayedCount < filteredTeachers.length && (
              <div className="text-center mt-12">
                <button 
                  onClick={loadMoreTeachers}
                  className="bg-coral-500 text-white px-8 py-3 rounded-lg hover:bg-coral-600 font-semibold"
                >
                  Load More Teachers ({filteredTeachers.length - displayedCount} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;