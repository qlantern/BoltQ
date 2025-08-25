import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Edit3, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  MapPin,
  Globe,
  Award,
  BookOpen,
  Star,
  Users
} from 'lucide-react';

const ProfileManagement: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    bio: 'Passionate English teacher with 8+ years of experience helping students achieve their language goals. Specialized in business communication and exam preparation.',
    location: 'London, UK',
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'],
    specialties: ['Business English', 'IELTS Preparation', 'Conversation'],
    experience: 8,
    hourlyRate: 2000,
    education: [
      'MA in Applied Linguistics - University College London',
      'BA in English Literature - Oxford University'
    ],
    certifications: ['CELTA', 'TESOL', 'Cambridge English Teaching Qualification'],
    profileVisibility: 'public'
  });

  const [privacySettings, setPrivacySettings] = useState({
    showEmail: false,
    showPhone: false,
    showLocation: true,
    showRating: true,
    allowMessages: true,
    showAvailability: true
  });

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

  const handlePrivacyChange = (setting: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
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

      {/* Cover Photo Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-coral-500 to-orange-500">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          {isEditing && (
            <button
              onClick={() => setShowCoverUpload(true)}
              className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-white text-gray-700 p-2 rounded-lg transition-colors"
            >
              <Camera className="h-4 w-4" />
            </button>
          )}
          <div className="absolute bottom-4 left-6 text-white">
            <h2 className="text-xl font-bold">Cover Photo</h2>
            <p className="text-white/80 text-sm">Recommended: 1200x300px</p>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="relative px-6 pb-6">
          <div className="flex items-end -mt-16 mb-6">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
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
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-gray-600">(127 reviews)</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profileData.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  1,240 lessons completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="md:col-span-2">
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                  />
                ) : (
                  <p className="text-gray-700">{profileData.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profileData.experience}
                      onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.experience} years</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (DZD)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profileData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.hourlyRate} DZD</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map((language, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <div className="space-y-2">
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="flex items-center">
                      <Award className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{edu}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                <div className="space-y-2">
                  {profileData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show email to students</span>
                <button
                  onClick={() => handlePrivacyChange('showEmail', !privacySettings.showEmail)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacySettings.showEmail ? 'bg-coral-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacySettings.showEmail ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show phone number</span>
                <button
                  onClick={() => handlePrivacyChange('showPhone', !privacySettings.showPhone)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacySettings.showPhone ? 'bg-coral-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacySettings.showPhone ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show location</span>
                <button
                  onClick={() => handlePrivacyChange('showLocation', !privacySettings.showLocation)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacySettings.showLocation ? 'bg-coral-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacySettings.showLocation ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show rating & reviews</span>
                <button
                  onClick={() => handlePrivacyChange('showRating', !privacySettings.showRating)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacySettings.showRating ? 'bg-coral-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacySettings.showRating ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Allow messages</span>
                <button
                  onClick={() => handlePrivacyChange('allowMessages', !privacySettings.allowMessages)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacySettings.allowMessages ? 'bg-coral-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacySettings.allowMessages ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show availability</span>
                <button
                  onClick={() => handlePrivacyChange('showAvailability', !privacySettings.showAvailability)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacySettings.showAvailability ? 'bg-coral-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacySettings.showAvailability ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Preview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Preview</h3>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Eye className="h-4 w-4 mr-2" />
              View as Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;