import React, { useState } from 'react';
import { Filter, Grid, List, X } from 'lucide-react';
import TeacherCard from './TeacherCard';
import { FilterSidebar } from './FilterSidebar';
import MarketplaceFooter from './MarketplaceFooter';
import { Teacher } from '../types';
import useBreakpoint from '../hooks/useBreakpoint';
import ResponsiveGrid from './ResponsiveGrid';
import TouchButton from './TouchButton';

interface SearchResultsProps {
  teachers: Teacher[];
  onTeacherSelect: (teacher: Teacher) => void;
  onNavigate?: (view: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ teachers, onTeacherSelect, onNavigate }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [favoritedTeachers, setFavoritedTeachers] = useState<Set<string>>(new Set());
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [displayedCount, setDisplayedCount] = useState(12);
  const { isMobile, isTablet } = useBreakpoint();

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
        {/* Filter Sidebar - Desktop */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-0">
            <FilterSidebar 
              onFiltersChange={handleFiltersChange}
            />
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsFilterOpen(false)}>
            <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg min-h-touch min-w-touch flex items-center justify-center"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <FilterSidebar 
                  onFiltersChange={handleFiltersChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
            <div className={`flex items-center justify-between ${
              isMobile ? 'flex-col space-y-3' : 'flex-row'
            }`}>
              <div className={isMobile ? 'text-center' : ''}>
                <h1 className={`font-semibold text-gray-900 dark:text-white ${
                  isMobile ? 'text-xl' : 'text-2xl'
                }`}>English Teachers</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                  {filteredTeachers.length} of {teachers.length} teachers available
                </p>
              </div>

              <div className={`flex items-center space-x-3 ${
                isMobile ? 'w-full justify-between' : ''
              }`}>
                {/* Mobile Filter Button */}
                <TouchButton
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(true)}
                  className={`lg:hidden ${isMobile ? 'flex-1' : ''}`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </TouchButton>

                {/* View Mode Toggle - Hidden on mobile */}
                {!isMobile && (
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-coral-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-coral-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className={`border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    isMobile ? 'flex-1' : ''
                  }`}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <ResponsiveGrid
              cols={{
                mobile: 1,
                tablet: 2,
                desktop: 3,
                largeDesktop: 4
              }}
              gap={isMobile ? "gap-4" : "gap-6"}
            >
              {filteredTeachers.slice(0, displayedCount).map(teacher => (
                <div key={teacher.id} onClick={() => onTeacherSelect(teacher)}>
                  <TeacherCard
                    teacher={teacher}
                    onFavorite={handleFavorite}
                    isFavorited={favoritedTeachers.has(teacher.id)}
                  />
                </div>
              ))}
            </ResponsiveGrid>

            {/* Load More */}
            {displayedCount < filteredTeachers.length && (
              <div className="text-center mt-12">
                <TouchButton
                  onClick={loadMoreTeachers}
                  size="lg"
                  className="px-8"
                >
                  Load More Teachers ({filteredTeachers.length - displayedCount} remaining)
                </TouchButton>
              </div>
            )}
            
            {/* Additional Navigation */}
            <div className="mt-6">
              <div className="bg-coral-50 dark:bg-coral-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-coral-900 dark:text-coral-100 mb-2">
                  New to TeachBnB?
                </h4>
                <p className="text-sm text-coral-800 dark:text-coral-200 mb-3">
                  Learn how our platform connects you with the best English teachers in Algeria.
                </p>
                <TouchButton
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate?.('home')}
                  className="text-coral-600 dark:text-coral-400 hover:text-coral-700 dark:hover:text-coral-300 p-0"
                >
                  Learn more about TeachBnB →
                </TouchButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Marketplace Footer */}
      {onNavigate && <MarketplaceFooter onNavigate={onNavigate} />}
    </div>
  );
};

export default SearchResults;