import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronLeft, Upload, X, Plus, Check, User, Mail, Phone, MapPin, DollarSign, BookOpen, Globe, Camera, FileText, Award, Youtube, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

interface BecomeTeacherPageProps {
  onNavigate: (view: string) => void;
}

interface TeacherApplicationData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  
  // Step 2: Professional Information
  summary: string;
  experience: number;
  hourlyRate: number;
  specialties: string[];
  languages: string[];
  classTypes: {
    online: boolean;
    offline: boolean;
  };
  
  // Step 3: Documents & Credentials
  cv: File | null;
  profilePhoto: File | null;
  education: Array<{ degree: string; institution: string; year: string; }>;
  certifications: string[];
  
  // Step 4: Social Media & Demo Video
  demoVideoUrl: string;
  socialMedia: {
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

const BecomeTeacherPage: React.FC<BecomeTeacherPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [applicationData, setApplicationData] = useState<TeacherApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      country: ''
    },
    summary: '',
    experience: 0,
    hourlyRate: 1000,
    specialties: [],
    languages: [],
    classTypes: {
      online: false,
      offline: false
    },
    cv: null,
    profilePhoto: null,
    education: [],
    certifications: [],
    demoVideoUrl: '',
    socialMedia: {
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: ''
    }
  });

  const specialtyOptions = [
    'Business English', 'Conversational English', 'IELTS Preparation', 'TOEFL Preparation',
    'Academic Writing', 'Kids English', 'Pronunciation', 'Grammar', 'Literature',
    'Test Preparation', 'Interview Preparation', 'Travel English'
  ];

  const languageOptions = [
    'English (Native)', 'English (Fluent)', 'Arabic (Native)', 'Arabic (Fluent)',
    'French (Native)', 'French (Fluent)', 'Spanish (Fluent)', 'German (Fluent)',
    'Italian (Fluent)', 'Portuguese (Fluent)', 'Mandarin (Fluent)', 'Japanese (Fluent)'
  ];

  const certificationOptions = [
    'TESOL', 'CELTA', 'TEFL', 'Cambridge English Teaching Qualification',
    'IELTS Teaching Certificate', 'TOEFL Teaching Certificate', 'Trinity CertTESOL',
    'Delta (Diploma in Teaching English)', 'MA in Applied Linguistics', 'PhD in English Literature'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setApplicationData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof TeacherApplicationData],
          [child]: value
        }
      }));
    } else {
      setApplicationData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayToggle = (field: 'specialties' | 'languages' | 'certifications', value: string) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileUpload = (field: 'cv' | 'profilePhoto', file: File) => {
    setApplicationData(prev => ({ ...prev, [field]: file }));
  };

  const addEducation = () => {
    setApplicationData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', year: '' }]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setApplicationData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return applicationData.firstName && applicationData.lastName && applicationData.email && 
               applicationData.phone && applicationData.address.street && applicationData.address.city && 
               applicationData.address.country;
      case 2:
        return applicationData.summary && applicationData.experience > 0 && applicationData.hourlyRate > 0 &&
               applicationData.specialties.length > 0 && applicationData.languages.length > 0 &&
               (applicationData.classTypes.online || applicationData.classTypes.offline);
      case 3:
        return applicationData.cv && applicationData.profilePhoto;
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Application submitted successfully! We will review your application and get back to you within 2-3 business days.');
      onNavigate('home');
    }, 3000);
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step < currentStep ? 'bg-coral-500 text-white' :
              step === currentStep ? 'bg-coral-500 text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              {step < currentStep ? <Check className="h-4 w-4" /> : step}
            </div>
            {step < 5 && (
              <div className={`w-16 h-1 mx-2 ${
                step < currentStep ? 'bg-coral-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>Personal</span>
        <span>Professional</span>
        <span>Documents</span>
        <span>Social & Video</span>
        <span>Review</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="h-5 w-5 mr-2 text-coral-500" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={applicationData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              value={applicationData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
              placeholder="Doe"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            Email Address *
          </label>
          <input
            type="email"
            value={applicationData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            Phone Number *
          </label>
          <input
            type="tel"
            value={applicationData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
            placeholder="+213 123 456 789"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          Address *
        </label>
        <div className="space-y-3">
          <input
            type="text"
            value={applicationData.address.street}
            onChange={(e) => handleInputChange('address.street', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
            placeholder="Street Address"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={applicationData.address.city}
              onChange={(e) => handleInputChange('address.city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
              placeholder="City"
            />
            <input
              type="text"
              value={applicationData.address.country}
              onChange={(e) => handleInputChange('address.country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
              placeholder="Country"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-coral-500" />
          Professional Information
        </h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional Summary *
          </label>
          <textarea
            value={applicationData.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
            placeholder="Tell us about your teaching experience, qualifications, and what makes you a great English teacher..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience *
            </label>
            <select
              value={applicationData.experience}
              onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
            >
              <option value={0}>Select experience</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map(year => (
                <option key={year} value={year}>
                  {year} {year === 1 ? 'year' : 'years'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Hourly Rate (DZD) *
            </label>
            <select
              value={applicationData.hourlyRate}
              onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
            >
              <option value={500}>500 DZD/hour</option>
              <option value={1000}>1,000 DZD/hour</option>
              <option value={1500}>1,500 DZD/hour</option>
              <option value={2000}>2,000 DZD/hour</option>
              <option value={3000}>3,000+ DZD/hour</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Teaching Specialties * (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {specialtyOptions.map(specialty => (
              <label key={specialty} className="flex items-center">
                <input
                  type="checkbox"
                  checked={applicationData.specialties.includes(specialty)}
                  onChange={() => handleArrayToggle('specialties', specialty)}
                  className="mr-2 rounded border-gray-300 text-coral-500 focus:ring-coral-500"
                />
                <span className="text-sm text-gray-700">{specialty}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Globe className="h-4 w-4 mr-1" />
            Languages * (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {languageOptions.map(language => (
              <label key={language} className="flex items-center">
                <input
                  type="checkbox"
                  checked={applicationData.languages.includes(language)}
                  onChange={() => handleArrayToggle('languages', language)}
                  className="mr-2 rounded border-gray-300 text-coral-500 focus:ring-coral-500"
                />
                <span className="text-sm text-gray-700">{language}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Class Types Offered * (Select at least one)
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={applicationData.classTypes.online}
                onChange={(e) => handleInputChange('classTypes.online', e.target.checked)}
                className="mr-3 rounded border-gray-300 text-coral-500 focus:ring-coral-500"
              />
              <div>
                <span className="font-medium text-gray-900">Online Classes</span>
                <p className="text-sm text-gray-600">Teach students via video calls from anywhere</p>
              </div>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={applicationData.classTypes.offline}
                onChange={(e) => handleInputChange('classTypes.offline', e.target.checked)}
                className="mr-3 rounded border-gray-300 text-coral-500 focus:ring-coral-500"
              />
              <div>
                <span className="font-medium text-gray-900">Offline Classes</span>
                <p className="text-sm text-gray-600">In-person lessons in your local area</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-coral-500" />
          Documents & Credentials
        </h3>

        {/* CV Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CV/Resume * (PDF, DOC, DOCX - Max 5MB)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-coral-500 transition-colors">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('cv', e.target.files[0])}
              className="hidden"
              id="cv-upload"
            />
            <label htmlFor="cv-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {applicationData.cv ? applicationData.cv.name : 'Click to upload your CV'}
              </p>
            </label>
          </div>
        </div>

        {/* Profile Photo Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Photo * (JPG, PNG - Max 2MB)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-coral-500 transition-colors">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('profilePhoto', e.target.files[0])}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {applicationData.profilePhoto ? applicationData.profilePhoto.name : 'Click to upload your photo'}
              </p>
            </label>
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <button
              type="button"
              onClick={addEducation}
              className="text-coral-500 hover:text-coral-600 text-sm flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Education
            </button>
          </div>
          {applicationData.education.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder="Degree/Qualification"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  placeholder="Institution"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  placeholder="Year"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Award className="h-4 w-4 mr-1" />
            Teaching Certifications (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certificationOptions.map(cert => (
              <label key={cert} className="flex items-center">
                <input
                  type="checkbox"
                  checked={applicationData.certifications.includes(cert)}
                  onChange={() => handleArrayToggle('certifications', cert)}
                  className="mr-2 rounded border-gray-300 text-coral-500 focus:ring-coral-500"
                />
                <span className="text-sm text-gray-700">{cert}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Youtube className="h-5 w-5 mr-2 text-coral-500" />
          Social Media & Demo Video
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          These fields are optional but highly recommended to showcase your personality and teaching style.
        </p>

        {/* Demo Video */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Demo Video URL (YouTube or Vimeo)
          </label>
          <input
            type="url"
            value={applicationData.demoVideoUrl}
            onChange={(e) => handleInputChange('demoVideoUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
            placeholder="https://youtube.com/watch?v=..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload a 2-3 minute video introducing yourself and your teaching style
          </p>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Social Media Profiles</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Linkedin className="h-4 w-4 mr-1 text-blue-600" />
                LinkedIn
              </label>
              <input
                type="url"
                value={applicationData.socialMedia.linkedin}
                onChange={(e) => handleInputChange('socialMedia.linkedin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Facebook className="h-4 w-4 mr-1 text-blue-600" />
                Facebook
              </label>
              <input
                type="url"
                value={applicationData.socialMedia.facebook}
                onChange={(e) => handleInputChange('socialMedia.facebook', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                placeholder="https://facebook.com/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Instagram className="h-4 w-4 mr-1 text-pink-600" />
                Instagram
              </label>
              <input
                type="url"
                value={applicationData.socialMedia.instagram}
                onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Twitter className="h-4 w-4 mr-1 text-blue-400" />
                Twitter
              </label>
              <input
                type="url"
                value={applicationData.socialMedia.twitter}
                onChange={(e) => handleInputChange('socialMedia.twitter', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                placeholder="https://twitter.com/yourprofile"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Check className="h-5 w-5 mr-2 text-coral-500" />
          Review & Submit
        </h3>
        
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
            <p className="text-sm text-gray-600">
              {applicationData.firstName} {applicationData.lastName} • {applicationData.email} • {applicationData.phone}
            </p>
            <p className="text-sm text-gray-600">
              {applicationData.address.street}, {applicationData.address.city}, {applicationData.address.country}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Professional Information</h4>
            <p className="text-sm text-gray-600">
              {applicationData.experience} years experience • {applicationData.hourlyRate} DZD/hour
            </p>
            <p className="text-sm text-gray-600">
              Specialties: {applicationData.specialties.join(', ')}
            </p>
            <p className="text-sm text-gray-600">
              Languages: {applicationData.languages.join(', ')}
            </p>
            <p className="text-sm text-gray-600">
              Class Types: {[
                applicationData.classTypes.online && 'Online',
                applicationData.classTypes.offline && 'Offline'
              ].filter(Boolean).join(', ')}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
            <p className="text-sm text-gray-600">
              CV: {applicationData.cv?.name || 'Not uploaded'}
            </p>
            <p className="text-sm text-gray-600">
              Profile Photo: {applicationData.profilePhoto?.name || 'Not uploaded'}
            </p>
            <p className="text-sm text-gray-600">
              Education: {applicationData.education.length} entries
            </p>
            <p className="text-sm text-gray-600">
              Certifications: {applicationData.certifications.length} selected
            </p>
          </div>

          {(applicationData.demoVideoUrl || Object.values(applicationData.socialMedia).some(url => url)) && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Social Media & Video</h4>
              {applicationData.demoVideoUrl && (
                <p className="text-sm text-gray-600">Demo Video: {applicationData.demoVideoUrl}</p>
              )}
              {Object.entries(applicationData.socialMedia).map(([platform, url]) => 
                url && (
                  <p key={platform} className="text-sm text-gray-600 capitalize">
                    {platform}: {url}
                  </p>
                )
              )}
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• We'll review your application within 2-3 business days</li>
            <li>• You'll receive an email with the review results</li>
            <li>• If approved, you can start creating your teacher profile</li>
            <li>• Once your profile is complete, students can find and book lessons with you</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-coral-500 hover:text-coral-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to TeachBnB
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Teacher</h1>
            <p className="text-gray-600">Join our community of qualified English teachers</p>
          </div>

          {renderProgressBar()}

          <div className="mb-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-2 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className={`flex items-center px-6 py-2 rounded-lg font-medium ${
                  isStepValid(currentStep)
                    ? 'bg-coral-500 text-white hover:bg-coral-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center px-8 py-2 bg-coral-500 text-white rounded-lg font-medium hover:bg-coral-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeTeacherPage;