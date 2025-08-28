import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, BookOpen, Globe, Award, FileText, Download, CheckCircle, XCircle } from 'lucide-react';
import { TeacherApplication } from '../../types/admin';

interface ApplicationDetailsModalProps {
  application: TeacherApplication;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (applicationId: string) => void;
  onReject: (applicationId: string, reason: string) => void;
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  application,
  isOpen,
  onClose,
  onApprove,
  onReject
}) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(application.id, rejectionReason);
      setShowRejectModal(false);
      setRejectionReason('');
      onClose();
    }
  };

  const handleApprove = () => {
    onApprove(application.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Teacher Application Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-coral-500" />
              Personal Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-gray-900">{application.personalInfo.firstName} {application.personalInfo.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{application.personalInfo.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{application.personalInfo.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="text-gray-900">
                    {application.personalInfo.address.city}, {application.personalInfo.address.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-coral-500" />
              Professional Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
                <p className="text-gray-900 leading-relaxed">{application.professionalInfo.summary}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <p className="text-gray-900">{application.professionalInfo.experience} years</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hourly Rate</label>
                  <p className="text-gray-900">{application.professionalInfo.hourlyRate} DZD/hour</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Teaching Specialties</label>
                <div className="flex flex-wrap gap-2">
                  {application.professionalInfo.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                <div className="flex flex-wrap gap-2">
                  {application.professionalInfo.languages.map((language, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class Types</label>
                <div className="flex space-x-4">
                  {application.professionalInfo.classTypes.online && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Online Classes
                    </span>
                  )}
                  {application.professionalInfo.classTypes.offline && (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      Offline Classes
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-coral-500" />
              Documents & Credentials
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CV/Resume</label>
                  {application.documents.cv ? (
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-900">{application.documents.cv.name}</span>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500">Not provided</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                  {application.documents.profilePhoto ? (
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-900">{application.documents.profilePhoto.name}</span>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500">Not provided</p>
                  )}
                </div>
              </div>

              {application.documents.education.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                  <div className="space-y-2">
                    {application.documents.education.map((edu, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          {edu.degree} - {edu.institution} ({edu.year})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {application.documents.certifications.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                  <div className="flex flex-wrap gap-2">
                    {application.documents.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Media & Demo Video */}
          {(application.socialMedia.demoVideoUrl || Object.values(application.socialMedia.profiles).some(url => url)) && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-coral-500" />
                Social Media & Demo Video
              </h3>
              <div className="bg-gray-50 rounded-lg p-6">
                {application.socialMedia.demoVideoUrl && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Demo Video</label>
                    <a
                      href={application.socialMedia.demoVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {application.socialMedia.demoVideoUrl}
                    </a>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(application.socialMedia.profiles).map(([platform, url]) => 
                    url && (
                      <div key={platform}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">{platform}</label>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {url}
                        </a>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Application Status */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Status</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    {application.status.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(application.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {application.status === 'pending' && (
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowRejectModal(true)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 flex items-center"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Application</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this application:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              placeholder="Enter rejection reason..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Reject Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetailsModal;