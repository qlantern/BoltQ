import React, { useState } from 'react';
import { X, Calendar, Clock, User, MapPin, Video, Save, Trash2, MessageCircle, Phone } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  duration: number;
  student?: {
    name: string;
    avatar: string;
  };
  subject: string;
  type: 'online' | 'offline';
  status: 'pending' | 'approved' | 'upcoming' | 'finished' | 'available';
  location?: string;
  meetingLink?: string;
}

interface ScheduleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot?: TimeSlot | null;
  dateTime?: { date: Date; time: string } | null;
}

const ScheduleDetailsModal: React.FC<ScheduleDetailsModalProps> = ({
  isOpen,
  onClose,
  slot,
  dateTime
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    subject: slot?.subject || '',
    duration: slot?.duration || 60,
    type: slot?.type || 'online',
    location: slot?.location || '',
    meetingLink: slot?.meetingLink || '',
    notes: ''
  });

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      // Delete logic here
      onClose();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800 border-red-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'finished': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isOpen) return null;

  const isNewSlot = !slot;
  const displayDate = slot ? new Date() : dateTime?.date;
  const displayTime = slot?.time || dateTime?.time;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isNewSlot ? 'Schedule New Lesson' : 'Lesson Details'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Date and Time Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-coral-500" />
                <span className="font-medium text-gray-900">
                  {displayDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-coral-500" />
                <span className="font-medium text-gray-900">{displayTime}</span>
              </div>
            </div>
          </div>

          {/* Student Information (if exists) */}
          {slot?.student && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3">Student Information</h3>
              <div className="flex items-center space-x-3">
                <img
                  src={slot.student.avatar}
                  alt={slot.student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">{slot.student.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </button>
                    <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </button>
                  </div>
                </div>
                {slot.status && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(slot.status)}`}>
                    {slot.status}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Lesson Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              {isEditing || isNewSlot ? (
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                  placeholder="e.g., Business English, IELTS Preparation"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{slot?.subject}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                {isEditing || isNewSlot ? (
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{slot?.duration} minutes</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class Type</label>
                {isEditing || isNewSlot ? (
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'online' | 'offline' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg capitalize">{slot?.type}</p>
                )}
              </div>
            </div>

            {(formData.type === 'offline' || slot?.type === 'offline') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {isEditing || isNewSlot ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                    placeholder="e.g., Central Library, Room 204"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{slot?.location}</p>
                )}
              </div>
            )}

            {(formData.type === 'online' || slot?.type === 'online') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label>
                {isEditing || isNewSlot ? (
                  <input
                    type="url"
                    value={formData.meetingLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                    placeholder="https://zoom.us/j/..."
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex-1">{slot?.meetingLink}</p>
                    {slot?.meetingLink && (
                      <a
                        href={slot.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Video className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                placeholder="Add any notes about this lesson..."
                disabled={!isEditing && !isNewSlot}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <div className="flex space-x-2">
              {slot && !isEditing && (
                <button
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              
              {!isEditing && !isNewSlot ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-6 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600"
                >
                  Edit Details
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex items-center px-6 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isNewSlot ? 'Schedule Lesson' : 'Save Changes'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetailsModal;