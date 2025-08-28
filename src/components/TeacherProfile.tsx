import React, { useState } from 'react';
import { Star, MapPin, Globe, Clock, CheckCircle, Calendar, MessageCircle, Heart, ArrowLeft, Play } from 'lucide-react';
import { Teacher, Review } from '../types';
import { mockReviews } from '../data/mockData';
import BookingModal from './BookingModal';
import { useAuth } from '../contexts/AuthContext';
import { useMessaging } from '../hooks/useMessaging';
import MessageCenter from './messaging/MessageCenter';

interface TeacherProfileProps {
  teacher: Teacher;
  onBack: () => void;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher, onBack }) => {
  const [selectedTab, setSelectedTab] = useState('about');
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMessageCenterOpen, setIsMessageCenterOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string>();
  
  const { user } = useAuth();
  
  // Use authenticated user ID or fallback to mock ID
  const currentUserId = user?.id || 'user-2';
  
  const { startConversation } = useMessaging(currentUserId);

  const handleMessageTeacher = async () => {
    try {
      const conversation = await startConversation(
        teacher.id,
        teacher.name,
        teacher.avatar,
        'teacher'
      );
      setSelectedConversationId(conversation.id);
      setIsMessageCenterOpen(true);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      // Fallback: just open message center
      setIsMessageCenterOpen(true);
    }
  };

  const handleBackToSearch = () => {
    onBack();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center text-coral-500 hover:text-coral-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to search
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Teacher Image */}
            <div className="flex-shrink-0">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-32 h-32 rounded-xl object-cover"
              />
            </div>

            {/* Teacher Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{teacher.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {teacher.location}
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{teacher.rating}</span>
                      <span className="text-gray-600 ml-1">({teacher.reviewCount} reviews)</span>
                    </div>
                    <div className="text-gray-600">{teacher.lessonsCompleted} lessons completed</div>
                    {teacher.isOnline && (
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                        Online now
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-coral-500 text-coral-500' : 'text-gray-600'}`} />
                  </button>
                  <button 
                    onClick={handleMessageTeacher}
                    className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 flex items-center"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </button>
                  <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-coral-500 text-white px-6 py-2 rounded-lg hover:bg-coral-600 flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Lesson
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-lg p-4 border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{teacher.pricePerHour} DZD</div>
                  <div className="text-sm text-gray-600">per hour</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{teacher.experience}</div>
                  <div className="text-sm text-gray-600">years experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{teacher.responseTime.split(' ')[1]}</div>
                  <div className="text-sm text-gray-600">response time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{teacher.languages.length}</div>
                  <div className="text-sm text-gray-600">languages</div>
                </div>
              </div>

              {/* Class Types */}
              <div className="mt-4 flex justify-center space-x-4">
                {teacher.offersOnlineClasses && (
                  <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Online Classes
                  </div>
                )}
                {teacher.offersOfflineClasses && (
                  <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg border border-green-200 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Offline Classes
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'about', label: 'About' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'availability', label: 'Availability' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === tab.id
                        ? 'border-coral-500 text-coral-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {selectedTab === 'about' && (
              <div className="space-y-8">
                {/* Bio */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">About me</h3>
                  <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
                </div>

                {/* Class Types */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Class Types Offered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teacher.offersOnlineClasses && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <h4 className="font-semibold text-blue-800">Online Classes</h4>
                        </div>
                        <p className="text-blue-700 text-sm">
                          Interactive video lessons from the comfort of your home. Perfect for flexible scheduling across Algeria.
                        </p>
                      </div>
                    )}
                    {teacher.offersOfflineClasses && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <h4 className="font-semibold text-green-800">Offline Classes</h4>
                        </div>
                        <p className="text-green-700 text-sm">
                          Face-to-face lessons in {teacher.location}. Ideal for personalized attention and local learning experience.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Teaching Specialties</h3>
                  <div className="flex flex-wrap gap-3">
                    {teacher.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-coral-50 text-coral-600 px-4 py-2 rounded-full border border-coral-200"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Languages I speak</h3>
                  <div className="space-y-2">
                    {teacher.languages.map((language, index) => (
                      <div key={index} className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{language}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Education</h3>
                  <div className="space-y-3">
                    {teacher.education.map((edu, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-700">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                  <div className="space-y-3">
                    {teacher.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Student Reviews</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold mr-2">{teacher.rating}</span>
                    <span className="text-gray-600">({teacher.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {mockReviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.studentAvatar}
                          alt={review.studentName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{review.studentName}</h4>
                            <span className="text-sm text-gray-600">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">· {review.lessonType}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'availability' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Schedule a lesson</h3>
                  <p className="text-gray-600 mb-4">Select a time that works for you. All times are shown in your local timezone.</p>
                  
                  <div className="bg-white rounded-lg border p-4">
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Calendar integration coming soon!</p>
                      <p className="text-sm text-gray-500 mt-2">For now, please message the teacher to schedule your lesson.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">{teacher.pricePerHour} DZD</div>
                <div className="text-gray-600">per hour</div>
              </div>

              <div className="space-y-4 mb-6">
                <button className="w-full bg-coral-500 text-white py-3 px-4 rounded-lg hover:bg-coral-600 font-semibold flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Lesson
                </button>
                {teacher.offersOnlineClasses && teacher.offersOfflineClasses && (
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 text-sm font-medium">
                      Online Class
                    </button>
                    <button className="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 text-sm font-medium">
                      Offline Class
                    </button>
                  </div>
                )}
                <button className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 font-semibold flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </div>

              <div className="text-center text-sm text-gray-600">
                <Clock className="h-4 w-4 inline mr-1" />
                Usually responds {teacher.responseTime}
              </div>

              <div className="space-y-4 mb-6">
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-coral-500 text-white py-3 px-4 rounded-lg hover:bg-coral-600 font-semibold flex items-center justify-center"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Lesson
                </button>
                {teacher.offersOnlineClasses && teacher.offersOfflineClasses && (
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 text-sm font-medium">
                      Online Class
                    </button>
                    <button className="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 text-sm font-medium">
                      Offline Class
                    </button>
                  </div>
                )}
                <button className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 font-semibold flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </button>
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
        onBackToHome={handleBackToSearch}
      />

      {/* Message Center */}
      <MessageCenter
        isOpen={isMessageCenterOpen}
        onClose={() => setIsMessageCenterOpen(false)}
        currentUserId={currentUserId}
        initialConversationId={selectedConversationId}
      />
    </div>
  );
};

export default TeacherProfile;