import React from 'react';
import { CheckCircle, Calendar, Clock, User, MapPin, MessageCircle, Phone, Mail } from 'lucide-react';
import { Teacher } from '../types';

interface BookingConfirmationProps {
  teacher: Teacher;
  bookingDetails: {
    classType: 'online' | 'offline';
    date: string;
    time: string;
    duration: number;
    focusArea: string;
    totalPrice: number;
  };
  onClose: () => void;
  onBackToHome: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  teacher,
  bookingDetails,
  onClose,
  onBackToHome
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Request Sent!</h2>
            <p className="text-lg text-gray-600">
              Your lesson request has been successfully submitted to {teacher.name}
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Teacher Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{teacher.name}</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {teacher.location}
                  </p>
                </div>
              </div>

              {/* Class Type */}
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  bookingDetails.classType === 'online' ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <div>
                  <p className="font-semibold text-gray-900 capitalize">
                    {bookingDetails.classType} Class
                  </p>
                  <p className="text-sm text-gray-600">
                    {bookingDetails.classType === 'online' ? 'Video call lesson' : 'In-person lesson'}
                  </p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-coral-500" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {formatDate(bookingDetails.date)}
                  </p>
                  <p className="text-sm text-gray-600">at {bookingDetails.time}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-coral-500" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {bookingDetails.duration === 1 ? '1 hour' : `${bookingDetails.duration} hours`}
                  </p>
                  <p className="text-sm text-gray-600">{bookingDetails.focusArea}</p>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Price:</span>
                <span className="text-2xl font-bold text-coral-500">
                  {bookingDetails.totalPrice} DZD
                </span>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-blue-900">Teacher Review</p>
                  <p className="text-sm text-blue-800">
                    {teacher.name} will review your booking request and respond within {teacher.responseTime}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-blue-900">Confirmation & Payment</p>
                  <p className="text-sm text-blue-800">
                    Once approved, you'll receive confirmation details and payment instructions
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-blue-900">Lesson Preparation</p>
                  <p className="text-sm text-blue-800">
                    {bookingDetails.classType === 'online' 
                      ? 'You\'ll receive a video call link and lesson materials'
                      : 'Meeting location and preparation details will be shared'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-teal-500" />
                <div>
                  <p className="font-medium text-gray-900">Message {teacher.name}</p>
                  <p className="text-sm text-gray-600">Ask questions about your lesson</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-coral-500" />
                <div>
                  <p className="font-medium text-gray-900">Contact Support</p>
                  <p className="text-sm text-gray-600">support@teachbnb.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBackToHome}
              className="flex-1 bg-coral-500 text-white py-3 px-6 rounded-lg hover:bg-coral-600 font-semibold transition-colors duration-200"
            >
              Back to Home
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 font-semibold transition-colors duration-200"
            >
              Close
            </button>
          </div>

          {/* Booking Reference */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Booking Reference: <span className="font-mono font-medium">BK-{Date.now().toString().slice(-8)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;