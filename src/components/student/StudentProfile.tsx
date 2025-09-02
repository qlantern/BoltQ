import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X,
  Camera,
  Award,
  Target,
  BookOpen,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'Ahmed',
    lastName: user?.lastName || 'Hassan',
    email: user?.email || 'ahmed.hassan@email.com',
    phone: '+213 555 123 456',
    location: 'Algiers, Algeria',
    dateOfBirth: '1995-03-15',
    learningGoals: ['Business English', 'IELTS Preparation'],
    currentLevel: 'Intermediate (B2)',
    preferredLearningStyle: 'Visual and Interactive',
    availability: {
      weekdays: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['Morning (9-12)', 'Evening (18-21)']
    },
    bio: 'Motivated English learner working towards career advancement. Interested in business communication and international certifications.'
  });

  const learningStats = {
    totalLessons: 24,
    hoursLearned: 36.5,
    currentStreak: 7,
    achievements: 8,
    favoriteTeachers: 3,
    averageRating: 4.8
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-coral-500 to-orange-500">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        <div className="relative px-6 pb-6">
          <div className="flex items-end -mt-16 mb-6">
            <div className="relative">
              <img
                src={user?.avatar || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-2 right-2 bg-coral-500 text-white p-2 rounded-full hover:bg-coral-600">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="ml-6 flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-600">{profileData.currentLevel} English Learner</p>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profileData.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Member since Jan 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
          <BookOpen className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{learningStats.totalLessons}</p>
          <p className="text-sm text-gray-600">Total Lessons</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
          <Clock className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{learningStats.hoursLearned}h</p>
          <p className="text-sm text-gray-600">Hours Learned</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
          <Target className="h-6 w-6 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{learningStats.currentStreak}</p>
          <p className="text-sm text-gray-600">Day Streak</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
          <Award className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{learningStats.achievements}</p>
          <p className="text-sm text-gray-600">Achievements</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
          <Heart className="h-6 w-6 text-coral-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{learningStats.favoriteTeachers}</p>
          <p className="text-sm text-gray-600">Favorites</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
          <Star className="h-6 w-6 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{learningStats.averageRating}</p>
          <p className="text-sm text-gray-600">Avg Rating</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            ) : (
              <p className="text-gray-900">{profileData.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            ) : (
              <p className="text-gray-900">{profileData.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <p className="text-gray-900">{profileData.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            ) : (
              <p className="text-gray-900">{profileData.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            ) : (
              <p className="text-gray-900">{profileData.location}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            ) : (
              <p className="text-gray-900">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Level</label>
            {isEditing ? (
              <select
                value={profileData.currentLevel}
                onChange={(e) => handleInputChange('currentLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              >
                <option value="Beginner (A1)">Beginner (A1)</option>
                <option value="Elementary (A2)">Elementary (A2)</option>
                <option value="Intermediate (B1)">Intermediate (B1)</option>
                <option value="Intermediate (B2)">Intermediate (B2)</option>
                <option value="Advanced (C1)">Advanced (C1)</option>
                <option value="Proficient (C2)">Proficient (C2)</option>
              </select>
            ) : (
              <p className="text-gray-900">{profileData.currentLevel}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Learning Style</label>
            {isEditing ? (
              <select
                value={profileData.preferredLearningStyle}
                onChange={(e) => handleInputChange('preferredLearningStyle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              >
                <option value="Visual and Interactive">Visual and Interactive</option>
                <option value="Auditory">Auditory</option>
                <option value="Reading and Writing">Reading and Writing</option>
                <option value="Kinesthetic">Kinesthetic</option>
                <option value="Mixed">Mixed</option>
              </select>
            ) : (
              <p className="text-gray-900">{profileData.preferredLearningStyle}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Learning Goals</label>
            <div className="flex flex-wrap gap-2">
              {profileData.learningGoals.map((goal, index) => (
                <span
                  key={index}
                  className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            ) : (
              <p className="text-gray-700">{profileData.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Availability Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Days</label>
            <div className="flex flex-wrap gap-2">
              {profileData.availability.weekdays.map((day, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Times</label>
            <div className="flex flex-wrap gap-2">
              {profileData.availability.timeSlots.map((slot, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Statistics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{learningStats.totalLessons}</p>
            <p className="text-sm text-gray-600">Total Lessons</p>
          </div>
          <div className="text-center">
            <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{learningStats.hoursLearned}h</p>
            <p className="text-sm text-gray-600">Hours Learned</p>
          </div>
          <div className="text-center">
            <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{learningStats.currentStreak}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>
          <div className="text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{learningStats.achievements}</p>
            <p className="text-sm text-gray-600">Achievements</p>
          </div>
          <div className="text-center">
            <Heart className="h-8 w-8 text-coral-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{learningStats.favoriteTeachers}</p>
            <p className="text-sm text-gray-600">Favorites</p>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{learningStats.averageRating}</p>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;