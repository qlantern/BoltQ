import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronLeft, Upload, X, Plus, Check, User, Mail, Phone, MapPin, DollarSign, BookOpen, Globe, Camera, FileText, Award, Youtube, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import TeacherApplicationConfirmation from './TeacherApplicationConfirmation';

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
  specialties: string[];
  languages: string[];
  classTypes: {
    online: boolean;
    offline: boolean;
  };
  
  // Step 3: Documents & Credentials
  cv: File | null;
  profilePhoto: File | null;
  education: Array<{ 
    degree: string; 
    institution: string; 
    year: string; 
    certification?: string;
  }>;
  
  // Step 4: Social Media & Demo Video
  demoVideoUrl: string;
  socialMedia: {
    linkedin: string;
    facebook: string;
    instagram: string;
    x: string;
    tiktok: string;
    custom: Array<{ platform: string; url: string; }>;
  };
}

const BecomeTeacherPage: React.FC<BecomeTeacherPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    specialties: [],
    languages: [],
    classTypes: {
      online: false,
      offline: false
    },
    cv: null,
    profilePhoto: null,
    education: [],
    demoVideoUrl: '',
    socialMedia: {
      linkedin: '',
      facebook: '',
      instagram: '',
      x: '',
      tiktok: '',
      custom: []
    }
  });

  const specialtyOptions = [
    'Business English', 'Conversational English', 'IELTS Preparation', 'TOEFL Preparation',
    'Academic Writing', 'Kids English', 'Pronunciation', 'Grammar', 'Literature',
    'Test Preparation', 'Interview Preparation', 'Travel English'
  ];

  const availableLanguages = [
    'Arabic', 'English', 'French', 'Spanish', 'German', 'Italian', 
    'Portuguese', 'Mandarin', 'Japanese', 'Korean', 'Russian', 'Turkish'
  ];

  const fluencyLevels = [
    { value: 'native', label: 'Native', description: 'Mother tongue' },
    { value: 'fluent', label: 'Fluent', description: 'Near-native proficiency' },
    { value: 'advanced', label: 'Advanced', description: 'High proficiency' },
    { value: 'intermediate', label: 'Intermediate', description: 'Good working knowledge' },
    { value: 'beginner', label: 'Beginner', description: 'Basic knowledge' }
  ];

  const certificationOptions = [
    'TESOL', 'CELTA', 'TEFL', 'Cambridge English Teaching Qualification',
    'IELTS Teaching Certificate', 'TOEFL Teaching Certificate', 'Trinity CertTESOL',
    'Delta (Diploma in Teaching English)', 'MA in Applied Linguistics', 'PhD in English Literature'
  ];

  const [selectedLanguages, setSelectedLanguages] = useState<Array<{ language: string; fluency: string; }>>([]);
  const [customSocialPlatform, setCustomSocialPlatform] = useState('');
  const [customSocialUrl, setCustomSocialUrl] = useState('');

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

  const handleArrayToggle = (field: 'specialties', value: string) => {
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
      education: [...prev.education, { degree: '', institution: '', year: '', certification: '' }]
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

  const addLanguage = (language: string, fluency: string) => {
    const languageString = `${language} (${fluency})`;
    if (!applicationData.languages.includes(languageString)) {
      setApplicationData(prev => ({
        ...prev,
        languages: [...prev.languages, languageString]
      }));
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setApplicationData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== languageToRemove)
    }));
  };

  const addCustomSocialMedia = () => {
    if (customSocialPlatform.trim() && customSocialUrl.trim()) {
      setApplicationData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          custom: [...prev.socialMedia.custom, { 
            platform: customSocialPlatform.trim(), 
            url: customSocialUrl.trim() 
          }]
        }
      }));
      setCustomSocialPlatform('');
      setCustomSocialUrl('');
    }
  };

  const removeCustomSocialMedia = (index: number) => {
    setApplicationData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        custom: prev.socialMedia.custom.filter((_, i) => i !== index)
      }
    }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return applicationData.firstName && applicationData.lastName && applicationData.email && 
               applicationData.phone && applicationData.address.street && applicationData.address.city && 
               applicationData.address.country;
      case 2:
        return applicationData.summary && applicationData.experience > 0 &&
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

  const handleStepClick = (step: number) => {
    // Allow navigation to any step that has been completed or is the next step
    if (step <= currentStep || (step === currentStep + 1 && isStepValid(currentStep))) {
      setCurrentStep(step);
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
      setShowConfirmation(true);
    }, 3000);
  };

  const handleBackToHomeFromConfirmation = () => {
    setShowConfirmation(false);
    onNavigate('home');
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center">
            <button
              onClick={() => handleStepClick(step)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              step < currentStep ? 'bg-coral-500 text-white' :
              step === currentStep ? 'bg-coral-500 text-white' :
              'bg-gray-200 text-gray-600 hover:bg-gray-300'
            } ${step <= currentStep || (step === currentStep + 1 && isStepValid(currentStep)) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              {step < currentStep ? <Check className="h-4 w-4" /> : step}
            </button>
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
            placeholder="+213 555 123 456"
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
              placeholder="Algiers, Oran, Constantine..."
            />
            <input
              type="text"
              value={applicationData.address.country}
              onChange={(e) => handleInputChange('address.country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
              placeholder="Algeria"
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
            Languages & Fluency *
          </label>
          
          {/* Language Selection Interface */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={selectedLanguages[0]?.language || ''}
                  onChange={(e) => {
                    const newLang = { language: e.target.value, fluency: selectedLanguages[0]?.fluency || 'intermediate' };
                    setSelectedLanguages([newLang]);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                >
                  <option value="">Select language</option>
                  {availableLanguages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fluency Level</label>
                <select
                  value={selectedLanguages[0]?.fluency || ''}
                  onChange={(e) => {
                    const newLang = { language: selectedLanguages[0]?.language || '', fluency: e.target.value };
                    setSelectedLanguages([newLang]);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                >
                  <option value="">Select fluency</option>
                  {fluencyLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => {
                if (selectedLanguages[0]?.language && selectedLanguages[0]?.fluency) {
                  addLanguage(selectedLanguages[0].language, selectedLanguages[0].fluency);
                  setSelectedLanguages([]);
                }
              }}
              disabled={!selectedLanguages[0]?.language || !selectedLanguages[0]?.fluency}
              className="w-full px-4 py-2 bg-coral-500 text-white rounded-md hover:bg-coral-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Language
            </button>

            {/* Selected Languages Display */}
            {applicationData.languages.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Selected Languages:</h4>
                <div className="flex flex-wrap gap-2">
                  {applicationData.languages.map((language, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {language}
                      <button
                        onClick={() => removeLanguage(language)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
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
                <p className="text-sm text-gray-600">Teach Algerian students via video calls</p>
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
                <p className="text-sm text-gray-600">In-person lessons in your Algerian city</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  placeholder="Year"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
                <select
                  value={edu.certification || ''}
                  onChange={(e) => updateEducation(index, 'certification', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                >
                  <option value="">Select certification (optional)</option>
                  {certificationOptions.map(cert => (
                    <option key={cert} value={cert}>{cert}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-coral-500" />
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
                <svg className="h-4 w-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
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
                <svg className="h-4 w-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
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
                <svg className="h-4 w-4 mr-1 text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
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
                <svg className="h-4 w-4 mr-1 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X (Twitter)
              </label>
              <input
                type="url"
                value={applicationData.socialMedia.x}
                onChange={(e) => handleInputChange('socialMedia.x', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                placeholder="https://x.com/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg className="h-4 w-4 mr-1 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                TikTok
              </label>
              <input
                type="url"
                value={applicationData.socialMedia.tiktok}
                onChange={(e) => handleInputChange('socialMedia.tiktok', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                placeholder="https://tiktok.com/@yourprofile"
              />
            </div>
          </div>

          {/* Custom Social Media */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-4">Add Custom Social Media</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input
                type="text"
                value={customSocialPlatform}
                onChange={(e) => setCustomSocialPlatform(e.target.value)}
                placeholder="Platform name (e.g., YouTube)"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
              <input
                type="url"
                value={customSocialUrl}
                onChange={(e) => setCustomSocialUrl(e.target.value)}
                placeholder="Profile URL"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
              <button
                type="button"
                onClick={addCustomSocialMedia}
                disabled={!customSocialPlatform.trim() || !customSocialUrl.trim()}
                className="px-4 py-2 bg-coral-500 text-white rounded-md hover:bg-coral-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </button>
            </div>

            {/* Display Custom Social Media */}
            {applicationData.socialMedia.custom.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Custom Social Media:</h5>
                {applicationData.socialMedia.custom.map((social, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">{social.platform}</span>
                      <p className="text-sm text-gray-600">{social.url}</p>
                    </div>
                    <button
                      onClick={() => removeCustomSocialMedia(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              {applicationData.address.city}, {applicationData.address.country}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Professional Information</h4>
            <p className="text-sm text-gray-600">
              {applicationData.experience} years experience
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
          </div>

          {(applicationData.demoVideoUrl || Object.values(applicationData.socialMedia).some(url => url) || applicationData.socialMedia.custom.length > 0) && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Social Media & Video</h4>
              {applicationData.demoVideoUrl && (
                <p className="text-sm text-gray-600">Demo Video: {applicationData.demoVideoUrl}</p>
              )}
              {Object.entries(applicationData.socialMedia).filter(([platform]) => platform !== 'custom').map(([platform, url]) => 
                url && platform !== 'custom' && (
                  <p key={platform} className="text-sm text-gray-600 capitalize">
                    {platform === 'x' ? 'X (Twitter)' : platform}: {url}
                  </p>
                )
              )}
              {applicationData.socialMedia.custom.map((social, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {social.platform}: {social.url}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• We'll review your application within 2-3 business days</li>
            <li>• You'll receive an email with the review results</li>
            <li>• If approved, you can start teaching students in Algeria</li>
            <li>• Once your profile is complete, students can find and book lessons with you</li>
          </ul>
        </div>
      </div>
    </div>
  );

  if (showConfirmation) {
    return (
      <TeacherApplicationConfirmation
        applicationData={{
          firstName: applicationData.firstName,
          lastName: applicationData.lastName,
          email: applicationData.email,
          experience: applicationData.experience,
          specialties: applicationData.specialties,
          hourlyRate: applicationData.hourlyRate
        }}
        onBackToHome={handleBackToHomeFromConfirmation}
      />
    );
  }

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