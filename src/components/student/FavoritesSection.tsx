import React, { useState } from 'react';
import { Heart, Star, MapPin, MessageCircle, Calendar, Search, Filter, Trash2 } from 'lucide-react';
import { mockTeachers } from '../../data/mockData';
import { Teacher } from '../../types';

const FavoritesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'price' | 'recent'>('recent');
  
  // Mock favorite teacher IDs
  const [favoriteTeacherIds] = useState(['1', '2', '3']);
  
  const favoriteTeachers = mockTeachers.filter(teacher => 
    favoriteTeacherIds.includes(teacher.id)
  );

  const filteredTeachers = favoriteTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.pricePerHour - b.pricePerHour;
      case 'recent':
      default:
        return 0; // Keep original order for "recent"
    }
  });

  const handleRemoveFavorite = (teacherId: string) => {
    // In real app, this would call the favorites service
    console.log('Remove favorite:', teacherId);
  };

  const handleBookLesson = (teacher: Teacher) => {
    // Navigate to booking or open booking modal
    console.log('Book lesson with:', teacher.name);
  };

  const handleMessageTeacher = (teacher: Teacher) => {
    // Open messaging interface
    console.log('Message teacher:', teacher.name);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Favorite Teachers</h1>
          <p className="text-gray-600 mt-1">Your saved teachers for quick access</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral-500"
          >
            <option value="recent">Recently Added</option>
            <option value="name">Name A-Z</option>
            <option value="rating">Highest Rated</option>
            <option value="price">Lowest Price</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Favorite Teachers</p>
              <p className="text-2xl font-bold text-coral-500">{favoriteTeachers.length}</p>
            </div>
            <Heart className="h-8 w-8 text-coral-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-yellow-500">
                {(favoriteTeachers.reduce((sum, t) => sum + t.rating, 0) / favoriteTeachers.length).toFixed(1)}
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lessons Booked</p>
              <p className="text-2xl font-bold text-blue-500">12</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      {sortedTeachers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleRemoveFavorite(teacher.id)}
                  className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
                >
                  <Heart className="h-4 w-4 fill-coral-500 text-coral-500" />
                </button>
                {teacher.isOnline && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <div className="w-2 h-2 bg-green-300 rounded-full mr-1 animate-pulse"></div>
                    Online
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{teacher.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {teacher.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold text-gray-900">{teacher.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {teacher.specialties.slice(0, 2).map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-coral-50 text-coral-600 text-xs px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {teacher.specialties.length > 2 && (
                      <span className="text-xs text-gray-500 py-1">
                        +{teacher.specialties.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-lg font-bold text-gray-900">{teacher.pricePerHour} DZD/hour</div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMessageTeacher(teacher)}
                    className="flex-1 bg-teal-500 text-white py-2 px-3 rounded-lg hover:bg-teal-600 text-sm flex items-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </button>
                  <button
                    onClick={() => handleBookLesson(teacher)}
                    className="flex-1 bg-coral-500 text-white py-2 px-3 rounded-lg hover:bg-coral-600 text-sm flex items-center justify-center"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite teachers yet</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery ? 'No teachers match your search' : 'Start adding teachers to your favorites for quick access'}
          </p>
          <button className="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600">
            Find Teachers
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;