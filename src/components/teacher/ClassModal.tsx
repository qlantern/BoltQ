import React, { useState } from 'react';
import { X, Upload, Plus, Trash2, Save, Camera } from 'lucide-react';
import PhotoUploadModal from './PhotoUploadModal';

interface ClassData {
  id?: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  type: 'individual' | 'group' | 'workshop';
  format: 'online' | 'offline' | 'both';
  price: {
    individual: number;
    group?: number;
    package?: {
      sessions: number;
      price: number;
      discount: number;
    };
  };
  duration: number;
  maxStudents?: number;
  location?: string;
  images: string[];
  tags: string[];
}

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (classData: ClassData) => void;
  editingClass?: ClassData | null;
}

const ClassModal: React.FC<ClassModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingClass
}) => {
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [formData, setFormData] = useState<ClassData>(() => ({
    title: editingClass?.title || '',
    description: editingClass?.description || '',
    subject: editingClass?.subject || '',
    level: editingClass?.level || 'Beginner',
    type: editingClass?.type || 'individual',
    format: editingClass?.format || 'online',
    price: editingClass?.price || {
      individual: 1000
    },
    duration: editingClass?.duration || 60,
    maxStudents: editingClass?.maxStudents || 1,
    location: editingClass?.location || '',
    images: editingClass?.images || [],
    tags: editingClass?.tags || []
  }));

  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subjectOptions = [
    'Business English', 'Conversational English', 'IELTS Preparation', 'TOEFL Preparation',
    'Academic Writing', 'Kids English', 'Pronunciation', 'Grammar', 'Literature',
    'Test Preparation', 'Interview Preparation', 'Travel English', 'Medical English',
    'Legal English', 'Technical English', 'Creative Writing'
  ];

  const levelOptions = [
    'Beginner', 'Elementary', 'Pre-Intermediate', 'Intermediate', 
    'Upper-Intermediate', 'Advanced', 'Proficiency', 'All Levels'
  ];

  const [customSubject, setCustomSubject] = useState('');
  const [customLevel, setCustomLevel] = useState('');
  const [useCustomSubject, setUseCustomSubject] = useState(false);
  const [useCustomLevel, setUseCustomLevel] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.subject && !customSubject.trim()) newErrors.subject = 'Subject is required';
    if (formData.price.individual <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';
    if (formData.type === 'group' && (!formData.maxStudents || formData.maxStudents <= 1)) {
      newErrors.maxStudents = 'Group classes must allow more than 1 student';
    }
    if (formData.format === 'offline' && !formData.location?.trim()) {
      newErrors.location = 'Location is required for offline classes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const finalSubject = useCustomSubject ? customSubject : formData.subject;
      const finalLevel = useCustomLevel ? customLevel : formData.level;
      
      onSave({
        ...formData,
        subject: finalSubject,
        level: finalLevel,
        id: editingClass?.id
      });
      onClose();
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePriceChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      price: { ...prev.price, [field]: value }
    }));
  };

  const handlePackageChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      price: {
        ...prev.price,
        package: { ...prev.price.package, [field]: value } as any
      }
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handlePhotoUpload = (file: File) => {
    // In a real app, this would upload to a server and return a URL
    const mockUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, mockUrl]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingClass ? 'Edit Class' : 'Create New Class'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Class Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 ${
                          errors.title ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Business English Mastery"
                      />
                      {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 ${
                          errors.description ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Describe what students will learn in this class..."
                      />
                      {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject *
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="preset-subject"
                              checked={!useCustomSubject}
                              onChange={() => setUseCustomSubject(false)}
                              className="text-coral-500 focus:ring-coral-500"
                            />
                            <label htmlFor="preset-subject" className="text-sm text-gray-700">Choose from list</label>
                          </div>
                          {!useCustomSubject ? (
                        <select
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 ${
                            errors.subject ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select subject</option>
                          {subjectOptions.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                          ) : (
                            <input
                              type="text"
                              value={customSubject}
                              onChange={(e) => setCustomSubject(e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 ${
                                errors.subject ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Enter custom subject"
                            />
                          )}
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="custom-subject"
                              checked={useCustomSubject}
                              onChange={() => setUseCustomSubject(true)}
                              className="text-coral-500 focus:ring-coral-500"
                            />
                            <label htmlFor="custom-subject" className="text-sm text-gray-700">Enter custom subject</label>
                          </div>
                        </div>
                        {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Level
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="preset-level"
                              checked={!useCustomLevel}
                              onChange={() => setUseCustomLevel(false)}
                              className="text-coral-500 focus:ring-coral-500"
                            />
                            <label htmlFor="preset-level" className="text-sm text-gray-700">Choose from list</label>
                          </div>
                          {!useCustomLevel ? (
                        <select
                          value={formData.level}
                          onChange={(e) => handleInputChange('level', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                        >
                          {levelOptions.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                          ) : (
                            <input
                              type="text"
                              value={customLevel}
                              onChange={(e) => setCustomLevel(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                              placeholder="Enter custom level"
                            />
                          )}
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="custom-level"
                              checked={useCustomLevel}
                              onChange={() => setUseCustomLevel(true)}
                              className="text-coral-500 focus:ring-coral-500"
                            />
                            <label htmlFor="custom-level" className="text-sm text-gray-700">Enter custom level</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Class Type
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'individual', label: 'Individual' },
                          { value: 'group', label: 'Group' },
                          { value: 'workshop', label: 'Workshop' }
                        ].map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleInputChange('type', option.value)}
                            className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                              formData.type === option.value
                                ? 'border-coral-500 bg-coral-50 text-coral-600'
                                : 'border-gray-200 hover:border-coral-300'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Format
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'online', label: 'Online' },
                          { value: 'offline', label: 'Offline' },
                          { value: 'both', label: 'Both' }
                        ].map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleInputChange('format', option.value)}
                            className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                              formData.format === option.value
                                ? 'border-coral-500 bg-coral-50 text-coral-600'
                                : 'border-gray-200 hover:border-coral-300'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                          min="15"
                          step="15"
                        />
                      </div>

                      {formData.type === 'group' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Students
                          </label>
                          <input
                            type="number"
                            value={formData.maxStudents}
                            onChange={(e) => handleInputChange('maxStudents', parseInt(e.target.value))}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 ${
                              errors.maxStudents ? 'border-red-300' : 'border-gray-300'
                            }`}
                            min="2"
                            max="20"
                          />
                          {errors.maxStudents && <p className="text-red-600 text-sm mt-1">{errors.maxStudents}</p>}
                        </div>
                      )}
                    </div>

                    {(formData.format === 'offline' || formData.format === 'both') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location *
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 ${
                            errors.location ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="e.g., Central Library, Room 204"
                        />
                        {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Pricing */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Individual Price (DZD) *
                      </label>
                      <input
                        type="number"
                        value={formData.price.individual}
                        onChange={(e) => handlePriceChange('individual', parseInt(e.target.value))}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 ${
                          errors.price ? 'border-red-300' : 'border-gray-300'
                        }`}
                        min="100"
                        step="100"
                      />
                      {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                    </div>

                    {formData.type === 'group' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Group Price per Student (DZD)
                        </label>
                        <input
                          type="number"
                          value={formData.price.group || 0}
                          onChange={(e) => handlePriceChange('group', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                          min="50"
                          step="50"
                        />
                      </div>
                    )}

                    {/* Package Pricing */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Package Deal (Optional)</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Sessions</label>
                          <input
                            type="number"
                            value={formData.price.package?.sessions || 0}
                            onChange={(e) => handlePackageChange('sessions', parseInt(e.target.value))}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-coral-500"
                            min="2"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Total Price</label>
                          <input
                            type="number"
                            value={formData.price.package?.price || 0}
                            onChange={(e) => handlePackageChange('price', parseInt(e.target.value))}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-coral-500"
                            min="100"
                            step="100"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Discount %</label>
                          <input
                            type="number"
                            value={formData.price.package?.discount || 0}
                            onChange={(e) => handlePackageChange('discount', parseInt(e.target.value))}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-coral-500"
                            min="0"
                            max="50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Images</h3>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => setShowPhotoUpload(true)}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-coral-500 transition-colors"
                    >
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Add Class Photo</p>
                    </button>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Class ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                        placeholder="Add a tag..."
                      />
                      <button
                        onClick={addTag}
                        className="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm flex items-center"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="ml-2 text-coral-500 hover:text-coral-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingClass ? 'Update Class' : 'Create Class'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={showPhotoUpload}
        onClose={() => setShowPhotoUpload(false)}
        onUpload={handlePhotoUpload}
        type="class"
        title="Upload Class Photo"
      />
    </>
  );
};

export default ClassModal;