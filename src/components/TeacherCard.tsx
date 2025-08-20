import React from 'react';
import { Star, MapPin, Clock, CheckCircle, Heart } from 'lucide-react';
import { Teacher } from '../types';
import BookingModal from './BookingModal';

interface TeacherCardProps {
  teacher: Teacher;
  onFavorite?: (teacherId: string) => void;
  isFavorited?: boolean;
  onBookingClick?: (teacher: Teacher) => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onFavorite, isFavorited = false, onBookingClick }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookingClick) {
      onBookingClick(teacher);
    } else {
      setIsBookingModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer relative">
        {/* Booking Overlay on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
          <button
            onClick={handleBookingClick}
            className="bg-coral-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-coral-600 transform scale-95 group-hover:scale-100 transition-transform duration-200"
          >
            Book Lesson
          </button>
        </div>

      <div className="relative">
        <img
          src={teacher.avatar}
          alt={teacher.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(teacher.id);
          }}
          className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white transition-colors duration-200"
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-coral-500 text-coral-500' : 'text-gray-600'}`} />
        </button>
        {teacher.isOnline && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <div className="w-2 h-2 bg-green-300 rounded-full mr-1 animate-pulse"></div>
            Online
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Teacher Info */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-coral-500 transition-colors duration-200">
              {teacher.name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {teacher.location}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="font-semibold text-gray-900">{teacher.rating}</span>
              <span className="text-gray-600 text-sm ml-1">({teacher.reviewCount})</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {teacher.lessonsCompleted} lessons
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {teacher.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="bg-coral-50 text-coral-600 text-xs px-2 py-1 rounded-full border border-coral-200"
              >
                {specialty}
              </span>
            ))}
            {teacher.specialties.length > 3 && (
              <span className="text-xs text-gray-500 py-1">
                +{teacher.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {teacher.bio}
        </p>

        {/* Languages */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {teacher.languages.map((language, index) => (
              <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {language}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center text-gray-600 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Responds {teacher.responseTime}
            </div>
            <div className="flex space-x-2">
              {teacher.offersOnlineClasses && (
                <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded border border-blue-200">
                  Online
                </span>
              )}
              {teacher.offersOfflineClasses && (
                <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded border border-green-200">
                  Offline
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">
              {teacher.pricePerHour} DZD
              <span className="text-sm font-normal text-gray-600">/hour</span>
            </div>
          </div>
        </div>

        {/* Experience & Certifications */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
              {teacher.experience} years experience
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
              Certified
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        teacher={teacher}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default TeacherCard;