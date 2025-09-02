import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Clock, Users, Monitor, Wifi } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFiltersChange }) => {
  const { t } = useTranslation();
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string[]>([]);
  const [selectedClassType, setSelectedClassType] = useState<string[]>([]);
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const languages = [
    'Arabic', 'French', 'English', 'Spanish', 'German', 'Italian', 'Chinese', 'Japanese'
  ];

  const algerianCities = [
    'Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif',
    'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'El Oued', 'Skikda', 'Tiaret', 'Béjaïa'
  ];

  const availability = [
    'Available now', 'Available this week', 'Available weekends', 'Available evenings'
  ];

  const formats = ['Online', 'Offline'];
  const classTypes = ['Individual', 'Group'];

  const handleLanguageChange = (language: string) => {
    const updated = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(updated);
    updateFilters({ languages: updated });
  };

  const handleAvailabilityChange = (option: string) => {
    const updated = selectedAvailability.includes(option)
      ? selectedAvailability.filter(a => a !== option)
      : [...selectedAvailability, option];
    setSelectedAvailability(updated);
    updateFilters({ availability: updated });
  };

  const handleFormatChange = (format: string) => {
    const updated = selectedFormat.includes(format)
      ? selectedFormat.filter(f => f !== format)
      : [...selectedFormat, format];
    setSelectedFormat(updated);
    updateFilters({ format: updated });
  };

  const handleClassTypeChange = (type: string) => {
    const updated = selectedClassType.includes(type)
      ? selectedClassType.filter(t => t !== type)
      : [...selectedClassType, type];
    setSelectedClassType(updated);
    updateFilters({ classType: updated });
  };

  const handleLocationChange = (location: string) => {
    const updated = selectedLocations.includes(location)
      ? selectedLocations.filter(l => l !== location)
      : [...selectedLocations, location];
    setSelectedLocations(updated);
    updateFilters({ locations: updated });
  };

  const handlePriceChange = (newRange: number[]) => {
    setPriceRange(newRange);
    updateFilters({ priceRange: newRange });
  };

  const updateFilters = (newFilters: any) => {
    onFiltersChange({
      languages: selectedLanguages,
      availability: selectedAvailability,
      format: selectedFormat,
      classType: selectedClassType,
      locations: selectedLocations,
      priceRange,
      ...newFilters
    });
  };

  const filteredCities = algerianCities.filter(city =>
    city.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <div className="w-80 bg-white p-6 shadow-lg rounded-lg h-fit">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{t('filters')}</h3>
      
      {/* Price Range Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            {t('pricePerHour')}
          </label>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb absolute top-0"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange([parseInt(e.target.value) || 500, priceRange[1]])}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                min="500"
                max="10000"
              />
              <span className="text-xs text-gray-500">DZD</span>
            </div>
            <span className="text-gray-400">-</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value) || 10000])}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                min="500"
                max="10000"
              />
              <span className="text-xs text-gray-500">DZD</span>
            </div>
          </div>
          
          <div className="bg-blue-50 px-3 py-2 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Range:</span>
              <span className="font-medium text-blue-600">
                {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} DZD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            Location
          </label>
        </div>
        
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cities..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="max-h-40 overflow-y-auto space-y-2">
          {filteredCities.map((city) => (
            <label key={city} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                checked={selectedLocations.includes(city)}
                onChange={() => handleLocationChange(city)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{city}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages Filter */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          {t('languages')}
        </label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {languages.map((language) => (
            <label key={language} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(language)}
                onChange={() => handleLanguageChange(language)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{language}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Format Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Monitor className="w-4 h-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            Format
          </label>
        </div>
        <div className="space-y-2">
          {formats.map((format) => (
            <label key={format} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                checked={selectedFormat.includes(format)}
                onChange={() => handleFormatChange(format)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center gap-2">
                {format === 'Online' ? <Wifi className="w-4 h-4 text-green-500" /> : <MapPin className="w-4 h-4 text-blue-500" />}
                <span className="text-sm text-gray-700">{format}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Class Type Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            Class Type
          </label>
        </div>
        <div className="space-y-2">
          {classTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                checked={selectedClassType.includes(type)}
                onChange={() => handleClassTypeChange(type)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            {t('availability')}
          </label>
        </div>
        <div className="space-y-2">
          {availability.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                checked={selectedAvailability.includes(option)}
                onChange={() => handleAvailabilityChange(option)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};