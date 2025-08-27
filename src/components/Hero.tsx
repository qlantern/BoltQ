import React from 'react';
import { Search, Star, Users, BookOpen, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import TeacherCard from './TeacherCard';
import { mockTeachers } from '../data/mockData';

interface HeroProps {
  onSearchClick?: () => void;
  onBecomeTeacherClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
  const { user, isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [favoritedTeachers, setFavoritedTeachers] = React.useState<Set<string>>(new Set());

  return (
    <div className="relative bg-gradient-to-br from-coral-500 via-coral-400 to-orange-400">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Perfect
            <span className="block text-yellow-200">English Teacher in Algeria</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with qualified English teachers across Algeria. 
            Learn at your own pace with local and online teachers.
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-2">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    placeholder="What do you want to learn? (Business English, IELTS, Conversation...) - Algeria"
                    className="w-full px-6 py-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                  />
                </div>
                <button
                  className="w-full md:w-auto bg-coral-500 text-white px-8 py-4 rounded-lg hover:bg-coral-600 transition-colors duration-200 flex items-center justify-center font-semibold"
                  onClick={onSearchClick}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Teachers
                </button>
              </div>
            </div>
          </div>

          {/* Featured Teachers Carousel */}
          {isAuthenticated && (
            <div className="max-w-6xl mx-auto mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Featured Teachers in Algeria
                </h2>
                <p className="text-lg text-white/80">
                  Discover top-rated English teachers in your area
                </p>
              </div>

              <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden rounded-xl">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: Math.ceil(mockTeachers.length / 3) }).map((_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                          {mockTeachers.slice(slideIndex * 3, (slideIndex + 1) * 3).map(teacher => (
                            <div key={teacher.id} className="transform hover:scale-105 transition-transform duration-200">
                              <TeacherCard
                                teacher={teacher}
                                onFavorite={user?.role === 'student' ? (teacherId: string) => {
                                  setFavoritedTeachers(prev => {
                                    const newSet = new Set(prev);
                                    if (newSet.has(teacherId)) {
                                      newSet.delete(teacherId);
                                    } else {
                                      newSet.add(teacherId);
                                    }
                                    return newSet;
                                  });
                                } : undefined}
                                isFavorited={favoritedTeachers.has(teacher.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentSlide(prev => 
                    prev === 0 ? Math.ceil(mockTeachers.length / 3) - 1 : prev - 1
                  )}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setCurrentSlide(prev => 
                    prev === Math.ceil(mockTeachers.length / 3) - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-white/80">Teachers in Algeria</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">15,000+</div>
              <div className="text-white/80">Lessons in Algeria</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-white/80">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-white/80">Student Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

                {/* Dots Indicator */}
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: Math.ceil(mockTeachers.length / 3) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

export default Hero;