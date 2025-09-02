import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedTeachersCarousel from './components/FeaturedTeachersCarousel';
import SearchResults from './components/SearchResults';
import TeacherProfile from './components/TeacherProfile';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import BecomeTeacherPage from './components/BecomeTeacherPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import SEOLinkStructure from './components/SEOLinkStructure';
import { mockTeachers } from './data/mockData';
import { Teacher } from './types';
import { adminService } from './services/adminService';

type AppView = 'home' | 'search' | 'profile' | 'signup' | 'signin' | 'become-teacher' | 'admin-login' | 'admin-dashboard' | 'teacher-dashboard' | 'student-dashboard';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
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

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedTeacher(null);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as AppView);
    setSelectedTeacher(null);
  };

  const handleAdminLogin = () => {
    setCurrentView('admin-dashboard');
  };

  const handleAdminLogout = async () => {
    await adminService.logout();
    setCurrentView('home');
  };

  return (
    <>
      {/* Auth pages */}
      {currentView === 'signup' && (
        <ProtectedRoute requireGuest onRedirect={handleNavigate}>
          <SignUpPage onNavigate={handleNavigate} />
        </ProtectedRoute>
      )}

      {currentView === 'signin' && (
        <ProtectedRoute requireGuest onRedirect={handleNavigate}>
          <SignInPage onNavigate={handleNavigate} />
        </ProtectedRoute>
      )}

      {currentView === 'become-teacher' && (
        <BecomeTeacherPage onNavigate={handleNavigate} />
      )}

      {/* Admin pages */}
      {currentView === 'admin-login' && (
        <AdminLogin onLogin={handleAdminLogin} onNavigate={handleNavigate} />
      )}

      {currentView === 'admin-dashboard' && (
        <ProtectedRoute
          requireAuth
          // role protection for admin
          onRedirect={handleNavigate}
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Access Required</h2>
                <p className="text-gray-600 mb-6">Please sign in as an administrator to access this page.</p>
                <button 
                  onClick={() => handleNavigate('admin-login')}
                  className="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600"
                >
                  Admin Login
                </button>
              </div>
            </div>
          }
        >
          {user?.role === 'admin' ? (
            <AdminDashboard onLogout={handleAdminLogout} />
          ) : (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Account Required</h2>
                <p className="text-gray-600 mb-6">This dashboard is only available for admin accounts.</p>
                <button 
                  onClick={() => handleNavigate('admin-login')}
                  className="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600"
                >
                  Admin Login
                </button>
              </div>
            </div>
          )}
        </ProtectedRoute>
      )}

      {currentView === 'teacher-dashboard' && (
        <ProtectedRoute 
          requireAuth 
          onRedirect={handleNavigate}
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Teacher Access Required</h2>
                <p className="text-gray-600 mb-6">Please sign in with a teacher account to access the dashboard.</p>
                <button 
                  onClick={() => handleNavigate('signin')}
                  className="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600"
                >
                  Sign In
                </button>
              </div>
            </div>
          }
        >
          {user?.role === 'teacher' ? (
            <TeacherDashboard />
          ) : (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Teacher Account Required</h2>
                <p className="text-gray-600 mb-6">This dashboard is only available for teacher accounts.</p>
                <button 
                  onClick={() => handleNavigate('become-teacher')}
                  className="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600"
                >
                  Apply to Become a Teacher
                </button>
              </div>
            </div>
          )}
        </ProtectedRoute>
      )}

      {currentView === 'student-dashboard' && (
        <ProtectedRoute 
          requireAuth 
          onRedirect={handleNavigate}
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Access Required</h2>
                <p className="text-gray-600 mb-6">Please sign in to access your student dashboard.</p>
                <button 
                  onClick={() => handleNavigate('signin')}
                  className="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600"
                >
                  Sign In
                </button>
              </div>
            </div>
          }
        >
          {user?.role === 'student' ? (
            <StudentDashboard />
          ) : (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Account Required</h2>
                <p className="text-gray-600 mb-6">This dashboard is only available for student accounts.</p>
                <button 
                  onClick={() => handleNavigate('signup')}
                  className="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600"
                >
                  Create Student Account
                </button>
              </div>
            </div>
          )}
        </ProtectedRoute>
      )}

      {currentView === 'profile' && selectedTeacher && (
        <div>
          <Header onNavigate={handleNavigate} />
          <TeacherProfile teacher={selectedTeacher} onBack={handleBackToSearch} />
        </div>
      )}

      {currentView === 'search' && (
        <div>
          <Header onNavigate={handleNavigate} />
          <SearchResults 
            teachers={mockTeachers}
            onTeacherSelect={handleTeacherSelect}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {currentView === 'home' && (
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Header onNavigate={handleNavigate} />
          
          {/* Hero Section */}
          <div className="cursor-pointer">
            <Hero 
              onSearchClick={handleSearchTeachers}
              onBecomeTeacherClick={() => setCurrentView('become-teacher')}
            />
          </div>

          {/* Featured Teachers Section */}
          {!isAuthenticated && (
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Featured English Teachers in Algeria
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Discover our top-rated Algerian teachers who have helped thousands of local students 
                  achieve their English learning goals.
                </p>
              </div>

              <div className="mt-8">
                <FeaturedTeachersCarousel
                  teachers={mockTeachers}
                  onTeacherSelect={handleTeacherSelect}
                  onFavorite={handleFavorite}
                  favoritedTeachers={favoritedTeachers}
                />
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
          )}

          {/* How It Works Section */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  How TeachBnB Works in Algeria
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Learning English in Algeria has never been easier
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-coral-100 dark:bg-coral-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-coral-600 dark:text-coral-300">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">Find Your Teacher</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Browse through our qualified Algerian teachers, read reviews, and find the perfect match for your learning style and goals.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-teal-600 dark:text-teal-300">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">Book Your Lesson</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Schedule lessons at your convenience in Algeria. Choose from online or in-person sessions to fit your schedule.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">Start Learning</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Begin your personalized English learning journey with local expert guidance and achieve your language goals faster.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-coral-500 to-orange-500">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your English Learning Journey in Algeria?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of Algerian students who have improved their English with our expert local teachers.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <button 
                  onClick={handleSearchTeachers}
                  className="bg-white text-coral-500 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold transition-colors duration-200"
                >
                  Find a Teacher
                </button>
                <button 
                  onClick={() => setCurrentView('become-teacher')}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-coral-500 font-semibold transition-colors duration-200"
                >
                  Become a Teacher
                </button>
              </div>
            </div>
          </section>

          {/* SEO Link Structure Section */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  English Learning in Algeria
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Discover qualified English teachers, specialized courses, and learning opportunities 
                  across Algeria's major cities.
                </p>
              </div>
              <SEOLinkStructure onNavigate={handleNavigate} />
            </div>
          </section>

          {/* Footer */}
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

export interface AdminDashboardProps {
  onLogout?: () => Promise<void>;
}