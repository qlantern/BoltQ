import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Clock, Users, Monitor, Wifi } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFiltersChange }) => {
  const { t } = useTranslation();
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string[]>([]);
  const [selectedClassType, setSelectedClassType] = useState<string[]>([]);
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const algerianCities = [
    'Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif',
    'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'El Oued', 'Skikda', 'Tiaret', 'Béjaïa'
  ];

  const availability = [
    'Available now', 'Available this week', 'Available weekends', 'Available evenings'
  ];

  const formats = ['Online', 'Offline'];
  const classTypes = ['Individual', 'Group'];

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
            {/* Dual range slider track */}
            <div className="relative h-2 bg-gray-200 rounded-lg">
              <div 
                className="absolute h-2 bg-coral-500 rounded-lg"
                style={{
                  left: `${((priceRange[0] - 500) / (10000 - 500)) * 100}%`,
                  right: `${100 - ((priceRange[1] - 500) / (10000 - 500)) * 100}%`
                }}
              />
            </div>
            
            {/* Range inputs */}
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value < priceRange[1]) {
                  handlePriceChange([value, priceRange[1]]);
                }
              }}
              className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none"
              style={{ pointerEvents: 'auto' }}
            />
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value > priceRange[0]) {
                  handlePriceChange([priceRange[0], value]);
                }
              }}
              className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none"
              style={{ pointerEvents: 'auto' }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 500;
                  if (value >= 500 && value < priceRange[1]) {
                    handlePriceChange([value, priceRange[1]]);
                  }
                }}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                min="500"
                max="9999"
                placeholder="Min"
              />
              <span className="text-xs text-gray-500 font-medium">DZD</span>
            </div>
            <span className="text-gray-400 mx-2">—</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 10000;
                  if (value <= 10000 && value > priceRange[0]) {
                    handlePriceChange([priceRange[0], value]);
                  }
                }}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                min="501"
                max="10000"
                placeholder="Max"
              />
              <span className="text-xs text-gray-500 font-medium">DZD</span>
            </div>
          </div>
          
          <div className="bg-coral-50 border border-coral-200 px-4 py-3 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700 font-medium">Selected Range:</span>
              <span className="font-semibold text-coral-600">
                {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} DZD
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Per hour • {((priceRange[1] - priceRange[0]) / 100).toFixed(0)} price levels
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