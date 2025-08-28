import React from 'react';
import { CheckCircle, Clock, Mail, FileText, User, Award, MessageCircle, Phone } from 'lucide-react';

interface TeacherApplicationConfirmationProps {
  applicationData: {
    firstName: string;
    lastName: string;
    email: string;
    experience: number;
    specialties: string[];
    hourlyRate: number;
  };
  onBackToHome: () => void;
}

const TeacherApplicationConfirmation: React.FC<TeacherApplicationConfirmationProps> = ({
  applicationData,
  onBackToHome
}) => {
  const applicationId = `TA-${Date.now().toString().slice(-8)}`;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-coral-500 to-orange-500 px-8 py-12 text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Application Submitted!</h1>
            <p className="text-xl text-white opacity-90">
              Thank you for applying to become a TeachBnB teacher
            </p>
          </div>

          <div className="px-8 py-8">
            {/* Application Summary */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Application Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <User className="h-6 w-6 text-coral-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Name:</span> {applicationData.firstName} {applicationData.lastName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span> {applicationData.email}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Award className="h-6 w-6 text-coral-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Teaching Profile</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Experience:</span> {applicationData.experience} years
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Rate:</span> {applicationData.hourlyRate} DZD/hour
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-coral-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Specialties</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {applicationData.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Review Process Timeline */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Review Process</h2>
              
              <div className="relative">
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Application Received</h3>
                      <p className="text-gray-600 text-sm">Your application has been successfully submitted</p>
                      <p className="text-xs text-gray-500 mt-1">Just now</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Document Review</h3>
                      <p className="text-gray-600 text-sm">Our team will review your CV, credentials, and teaching materials</p>
                      <p className="text-xs text-gray-500 mt-1">1-2 business days</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Interview Process</h3>
                      <p className="text-gray-600 text-sm">If approved, we'll schedule a brief video interview</p>
                      <p className="text-xs text-gray-500 mt-1">2-3 business days</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Profile Creation</h3>
                      <p className="text-gray-600 text-sm">Once approved, we'll help you create your teacher profile</p>
                      <p className="text-xs text-gray-500 mt-1">3-5 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Information</h3>
              <div className="space-y-3 text-blue-800">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">
                    <strong>Email Confirmation:</strong> You'll receive a confirmation email at {applicationData.email} within the next few minutes
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">
                    <strong>Response Time:</strong> We typically respond to applications within 2-3 business days
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">
                    <strong>Additional Documents:</strong> We may request additional documentation during the review process
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">
                    <strong>Background Check:</strong> All approved teachers undergo a background verification process
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-coral-500" />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">teachers@teachbnb.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-teal-500" />
                  <div>
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-600">+213 123 456 789</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Tip:</strong> Keep your application ID handy when contacting support: <span className="font-mono">{applicationId}</span>
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-green-900 mb-4">While You Wait</h3>
              <div className="space-y-3 text-green-800">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Prepare for your potential interview by reviewing common teaching scenarios
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Think about your teaching philosophy and unique approach to English education
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Consider creating sample lesson plans for your specialties
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Explore our teacher resources and community guidelines
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={onBackToHome}
                className="bg-coral-500 text-white py-3 px-8 rounded-lg hover:bg-coral-600 font-semibold transition-colors duration-200 text-lg"
              >
                Back to Home
              </button>
            </div>

            {/* Application Reference */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Application ID: <span className="font-mono font-medium text-gray-700">{applicationId}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Please save this ID for your records
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherApplicationConfirmation;