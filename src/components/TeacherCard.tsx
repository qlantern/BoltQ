import React from 'react';
import { Star, MapPin, Clock, CheckCircle, Heart, MessageCircle, Calendar } from 'lucide-react';
import { Teacher } from '../types';
import { useAuth } from '../contexts/AuthContext';
import BookingModal from './BookingModal';
import { useMessaging } from '../hooks/useMessaging';
import useBreakpoint from '../hooks/useBreakpoint';

interface TeacherCardProps {
  teacher: Teacher;
  onFavorite?: (teacherId: string) => void;
  isFavorited?: boolean;
  onBookingClick?: (teacher: Teacher) => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onFavorite, isFavorited = false, onBookingClick }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const { user } = useAuth();
  const { isMobile } = useBreakpoint();
  
  // Use authenticated user ID or fallback to mock ID
  const currentUserId = user?.id || 'user-2';
  
  const { startConversation } = useMessaging(currentUserId);

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check authentication for booking
    if (!user) {
      // Redirect to sign in if not authenticated
      alert('Please sign in to book a lesson');
      return;
    }
    
    if (onBookingClick) {
      onBookingClick(teacher);
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const handleMessageClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check authentication for messaging
    if (!user) {
      alert('Please sign in to send messages');
      return;
    }
    
    try {
      await startConversation(
        teacher.id,
        teacher.name,
        teacher.avatar,
        'teacher'
      );
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer relative flex flex-col">
        {/* Desktop Booking Overlay on Hover */}
        {!isMobile && user && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
            <div className="flex space-x-3">
              <button
                onClick={handleMessageClick}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transform scale-95 group-hover:scale-100 transition-transform duration-200 flex items-center min-h-touch"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </button>
              <button
                onClick={handleBookingClick}
                className="bg-coral-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-coral-600 transform scale-95 group-hover:scale-100 transition-transform duration-200 flex items-center min-h-touch"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Lesson
              </button>
            </div>
          </div>
        )}

        <div className="relative">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className={`w-full object-cover object-center rounded-t-xl transition-transform duration-300 ${
              isMobile ? 'h-48' : 'h-56 group-hover:scale-105'
            }`}
          />
          
          {user?.role === 'student' && onFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavorite?.(teacher.id);
              }}
              className={`absolute top-3 right-3 bg-white/90 dark:bg-gray-700/90 rounded-full hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 ${
                isMobile ? 'p-3 min-h-touch min-w-touch' : 'p-2'
              } flex items-center justify-center`}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-coral-500 text-coral-500' : 'text-gray-600 dark:text-gray-300'}`} />
            </button>
          )}
          
          {teacher.isOnline && (
            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <div className="w-2 h-2 bg-green-300 rounded-full mr-1 animate-pulse"></div>
              Online
            </div>
          )}

          {/* Mobile: Always visible action buttons overlay */}
          {isMobile && user && (
            <div className="absolute bottom-3 left-3 right-3 flex space-x-2">
              <button
                onClick={handleMessageClick}
                className="flex-1 bg-teal-500/90 backdrop-blur-sm text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-200 flex items-center justify-center min-h-touch"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Message</span>
              </button>
              <button
                onClick={handleBookingClick}
                className="flex-1 bg-coral-500/90 backdrop-blur-sm text-white py-3 rounded-lg font-semibold hover:bg-coral-600 transition-colors duration-200 flex items-center justify-center min-h-touch"
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Book</span>
              </button>
            </div>
          )}
        </div>

        <div className={`flex-1 flex flex-col ${isMobile ? 'p-4' : 'p-6'}`}>
          {/* Teacher Info */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-gray-900 dark:text-white group-hover:text-coral-500 transition-colors duration-200 truncate ${
                isMobile ? 'text-base' : 'text-lg'
              }`}>
                {teacher.name}
              </h3>
              <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mt-1">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{teacher.location}</span>
              </div>
            </div>
            <div className="text-right ml-3 flex-shrink-0">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{teacher.rating}</span>
                <span className="text-gray-600 dark:text-gray-300 text-xs ml-1">({teacher.reviewCount})</span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {teacher.lessonsCompleted} lessons
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-4 flex-1">
            <div className="flex flex-wrap gap-1">
              {teacher.specialties.slice(0, isMobile ? 2 : 3).map((specialty, index) => (
                <span
                  key={index}
                  className="bg-coral-50 dark:bg-coral-900 text-coral-600 dark:text-coral-300 text-xs px-2 py-1 rounded-full border border-coral-200 dark:border-coral-700"
                >
                  {specialty}
                </span>
              ))}
              {teacher.specialties.length > (isMobile ? 2 : 3) && (
                <span className="text-xs text-gray-500 dark:text-gray-400 py-1">
                  +{teacher.specialties.length - (isMobile ? 2 : 3)} more
                </span>
              )}
            </div>
          </div>

          {/* Bio removed as requested */}

          {/* Languages */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {teacher.languages.slice(0, isMobile ? 3 : 4).map((language, index) => (
                <span key={index} className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {language}
                </span>
              ))}
              {teacher.languages.length > (isMobile ? 3 : 4) && (
                <span className="text-xs text-gray-500 dark:text-gray-400 py-1">
                  +{teacher.languages.length - (isMobile ? 3 : 4)}
                </span>
              )}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-wrap gap-1">
              {teacher.offersOnlineClasses && (
                <span className="bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded border border-blue-200 dark:border-blue-700">
                  Online
                </span>
              )}
              {teacher.offersOfflineClasses && (
                <span className="bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs px-2 py-1 rounded border border-green-200 dark:border-green-700">
                  Offline
                </span>
              )}
            </div>
            <div className="text-right ml-2 flex-shrink-0">
              <div className={`font-bold text-gray-900 dark:text-white ${
                isMobile ? 'text-base' : 'text-lg'
              }`}>
                {teacher.pricePerHour} DZD
                {isMobile && <span className="text-xs text-gray-500">/lesson</span>}
                {!isMobile && <span className="text-sm text-gray-500">/lesson</span>}
              </div>
            </div>
          </div>

          {/* Experience & Certifications */}
          <div className={`pt-3 border-t border-gray-200 dark:border-gray-700 ${
            isMobile ? 'mt-3' : 'mt-4'
          }`}>
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
                <span className="truncate">{teacher.experience} years exp.</span>
              </div>
              <div className="flex items-center ml-2">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
                <span>Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        teacher={teacher}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBackToHome={() => {
          setIsBookingModalOpen(false);
          // Could navigate to home if needed
        }}
      />
    </>
  );
};

export default TeacherCard;