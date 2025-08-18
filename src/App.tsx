import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TeacherCard from './components/TeacherCard';
import SearchResults from './components/SearchResults';
import TeacherProfile from './components/TeacherProfile';
import { mockTeachers } from './data/mockData';
import { Teacher } from './types';

type AppView = 'home' | 'search' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
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

  const handleTeacherSelect = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setCurrentView('profile');
  };

  const handleSearchTeachers = () => {
    setCurrentView('search');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedTeacher(null);
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedTeacher(null);
  };

  if (currentView === 'profile' && selectedTeacher) {
    return (
      <div>
        <Header />
        <TeacherProfile teacher={selectedTeacher} onBack={handleBackToSearch} />
      </div>
    );
  }

  if (currentView === 'search') {
    return (
      <div>
        <Header />
        <SearchResults 
          teachers={mockTeachers}
          onTeacherSelect={handleTeacherSelect}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div onClick={handleSearchTeachers} className="cursor-pointer">
        <Hero />
      </div>

      {/* Featured Teachers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured English Teachers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our top-rated teachers who have helped thousands of students 
              achieve their English learning goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTeachers.map(teacher => (
              <div key={teacher.id} onClick={() => handleTeacherSelect(teacher)}>
                <TeacherCard
                  teacher={teacher}
                  onFavorite={handleFavorite}
                  isFavorited={favoritedTeachers.has(teacher.id)}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={handleSearchTeachers}
              className="bg-coral-500 text-white px-8 py-3 rounded-lg hover:bg-coral-600 font-semibold transition-colors duration-200"
            >
              View All Teachers
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How TeachBnB Works
            </h2>
            <p className="text-lg text-gray-600">
              Learning English has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-coral-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-coral-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Your Teacher</h3>
              <p className="text-gray-600">
                Browse through our qualified teachers, read reviews, and find the perfect match for your learning style and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Book Your Lesson</h3>
              <p className="text-gray-600">
                Schedule lessons at your convenience. Choose from one-time sessions or ongoing courses to fit your schedule.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-yellow-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Learning</h3>
              <p className="text-gray-600">
                Begin your personalized English learning journey with expert guidance and achieve your language goals faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-coral-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your English Learning Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who have improved their English with our expert teachers.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button 
              onClick={handleSearchTeachers}
              className="bg-white text-coral-500 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold transition-colors duration-200"
            >
              Find a Teacher
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-coral-500 font-semibold transition-colors duration-200">
              Become a Teacher
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TeachBnB</h3>
              <p className="text-gray-400">
                Connecting English learners with qualified teachers worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Students</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find Teachers</a></li>
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Teachers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Become a Teacher</a></li>
                <li><a href="#" className="hover:text-white">Teacher Resources</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TeachBnB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;