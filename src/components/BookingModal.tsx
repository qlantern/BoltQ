import React, { useState, useMemo } from 'react';
import { X, Calendar, Clock, DollarSign, User, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Teacher } from '../types';
import BookingConfirmation from './BookingConfirmation';

interface BookingModalProps {
  teacher: Teacher;
  isOpen: boolean;
  onClose: () => void;
  onBackToHome?: () => void;
}

interface BookingData {
  classType: 'online' | 'offline' | '';
  date: string;
  time: string;
  duration: number;
  focusArea: string;
  specialRequests: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ teacher, isOpen, onClose, onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    classType: '',
    date: '',
    time: '',
    duration: 1,
    focusArea: '',
    specialRequests: ''
  });

  const focusAreas = [
    'Business English',
    'Conversational English',
    'IELTS Preparation',
    'TOEFL Preparation',
    'Academic Writing',
    'Grammar & Vocabulary',
    'Pronunciation',
    'Interview Preparation',
    'Travel English',
    'General English'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];

  const isStep1Valid = useMemo(() => {
    return bookingData.classType !== '';
  }, [bookingData.classType]);

  const isStep2Valid = useMemo(() => {
    return bookingData.date !== '' && bookingData.time !== '';
  }, [bookingData.date, bookingData.time]);

  const isStep3Valid = useMemo(() => {
    return bookingData.duration > 0 && bookingData.focusArea !== '';
  }, [bookingData.duration, bookingData.focusArea]);

  const calculatePrice = () => {
    return teacher.pricePerHour * bookingData.duration;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onClose();
    resetForm();
  };

  const handleBackToHomeFromConfirmation = () => {
    setShowConfirmation(false);
    onClose();
    resetForm();
    if (onBackToHome) {
      onBackToHome();
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setBookingData({
      classType: '',
      date: '',
      time: '',
      duration: 1,
      focusArea: '',
      specialRequests: ''
    });
  };

  const renderProgressBar = () => (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step < currentStep ? 'bg-coral-500 text-white' :
            step === currentStep ? 'bg-coral-500 text-white' :
            'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
          </div>
          {step < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              step < currentStep ? 'bg-coral-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Class Type</h3>
        <p className="text-gray-600">How would you like to learn with {teacher.name}?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teacher.offersOnlineClasses && (
          <button
            onClick={() => setBookingData(prev => ({ ...prev, classType: 'online' }))}
            className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
              bookingData.classType === 'online'
                ? 'border-coral-500 bg-coral-50'
                : 'border-gray-200 hover:border-coral-300'
            }`}
          >
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <h4 className="font-semibold text-lg">Online Classes</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Learn from anywhere with video calls. Perfect for flexible scheduling and students worldwide.
            </p>
            <div className="text-sm text-blue-600 font-medium">
              ✓ Video call lessons ✓ Screen sharing ✓ Digital materials
            </div>
          </button>
        )}

        {teacher.offersOfflineClasses && (
          <button
            onClick={() => setBookingData(prev => ({ ...prev, classType: 'offline' }))}
            className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
              bookingData.classType === 'offline'
                ? 'border-coral-500 bg-coral-50'
                : 'border-gray-200 hover:border-coral-300'
            }`}
          >
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <h4 className="font-semibold text-lg">Offline Classes</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Face-to-face lessons in {teacher.location}. Ideal for personalized attention and hands-on learning.
            </p>
            <div className="text-sm text-green-600 font-medium">
              ✓ In-person interaction ✓ Physical materials ✓ Local experience
            </div>
          </button>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Date & Time</h3>
        <p className="text-gray-600">Choose when you'd like to have your lesson</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            Select Date
          </label>
          <input
            type="date"
            value={bookingData.date}
            onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="h-4 w-4 inline mr-1" />
            Select Time
          </label>
          <select
            value={bookingData.time}
            onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
          >
            <option value="">Choose time</option>
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Availability:</strong> This teacher typically has 70% of time slots available. 
          You'll receive confirmation within 24 hours.
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Lesson Details</h3>
        <p className="text-gray-600">Customize your learning experience</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Lesson Duration
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[1, 1.5, 2].map(duration => (
            <button
              key={duration}
              onClick={() => setBookingData(prev => ({ ...prev, duration }))}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                bookingData.duration === duration
                  ? 'border-coral-500 bg-coral-50 text-coral-600'
                  : 'border-gray-200 hover:border-coral-300'
              }`}
            >
              <div className="font-semibold">{duration === 1 ? '1 hour' : `${duration} hours`}</div>
              <div className="text-sm text-gray-600">{teacher.pricePerHour * duration} DZD</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Focus Area *
        </label>
        <select
          value={bookingData.focusArea}
          onChange={(e) => setBookingData(prev => ({ ...prev, focusArea: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
        >
          <option value="">Select focus area</option>
          {focusAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Special Requests (Optional)
        </label>
        <textarea
          value={bookingData.specialRequests}
          onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
          placeholder="Any specific topics you'd like to focus on or special requirements..."
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Summary</h3>
        <p className="text-gray-600">Review your lesson details</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <img src={teacher.avatar} alt={teacher.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h4 className="font-semibold text-gray-900">{teacher.name}</h4>
            <p className="text-sm text-gray-600">{teacher.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Class Type</div>
            <div className="font-semibold capitalize">{bookingData.classType} Class</div>
          </div>
          <div>
            <div className="text-gray-600">Date & Time</div>
            <div className="font-semibold">{bookingData.date} at {bookingData.time}</div>
          </div>
          <div>
            <div className="text-gray-600">Duration</div>
            <div className="font-semibold">{bookingData.duration === 1 ? '1 hour' : `${bookingData.duration} hours`}</div>
          </div>
          <div>
            <div className="text-gray-600">Focus Area</div>
            <div className="font-semibold">{bookingData.focusArea}</div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Price:</span>
            <span className="text-2xl font-bold text-coral-500">{calculatePrice()} DZD</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Your booking request will be sent to {teacher.name}</li>
          <li>• You'll receive confirmation within {teacher.responseTime}</li>
          <li>• {bookingData.classType === 'online' ? 'Video call link will be provided' : 'Meeting location will be confirmed'}</li>
          <li>• Payment will be processed after teacher confirmation</li>
        </ul>
      </div>
    </div>
  );

  if (!isOpen) return null;

  if (showConfirmation) {
    return (
      <BookingConfirmation
        teacher={teacher}
        bookingDetails={{
          classType: bookingData.classType as 'online' | 'offline',
          date: bookingData.date,
          time: bookingData.time,
          duration: bookingData.duration,
          focusArea: bookingData.focusArea,
          totalPrice: calculatePrice()
        }}
        onClose={handleConfirmationClose}
        onBackToHome={handleBackToHomeFromConfirmation}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Book a Lesson</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Bar */}
          {renderProgressBar()}

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>

          {/* Navigation Buttons */}
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

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !isStep1Valid) ||
                  (currentStep === 2 && !isStep2Valid) ||
                  (currentStep === 3 && !isStep3Valid)
                }
                className={`flex items-center px-6 py-2 rounded-lg font-medium ${
                  ((currentStep === 1 && isStep1Valid) ||
                   (currentStep === 2 && isStep2Valid) ||
                   (currentStep === 3 && isStep3Valid))
                    ? 'bg-coral-500 text-white hover:bg-coral-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleBookingSubmit}
                className="bg-coral-500 text-white px-8 py-2 rounded-lg font-medium hover:bg-coral-600 flex items-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Send Booking Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;