import React, { useState } from 'react';
import { X, Users, Calendar, Clock, MapPin, Video, Mail, MessageCircle, Phone, Star, Eye } from 'lucide-react';

interface ClassListing {
  id: string;
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
  currentEnrollment?: number;
  location?: string;
  images: string[];
  isActive: boolean;
  rating: number;
  totalBookings: number;
  createdAt: Date;
  tags: string[];
}

interface EnrolledStudent {
  id: string;
  name: string;
  avatar: string;
  email: string;
  enrolledAt: Date;
  status: 'active' | 'pending' | 'completed' | 'dropped';
  sessionsAttended: number;
  totalSessions: number;
  lastActivity: Date;
}

interface GroupEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: ClassListing | null;
}

const GroupEnrollmentModal: React.FC<GroupEnrollmentModalProps> = ({
  isOpen,
  onClose,
  listing
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'waitlist'>('overview');

  // Mock enrolled students data
  const enrolledStudents: EnrolledStudent[] = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      email: 'ahmed.hassan@email.com',
      enrolledAt: new Date('2024-01-10'),
      status: 'active',
      sessionsAttended: 8,
      totalSessions: 10,
      lastActivity: new Date('2024-01-20')
    },
    {
      id: '2',
      name: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      email: 'maria.garcia@email.com',
      enrolledAt: new Date('2024-01-12'),
      status: 'active',
      sessionsAttended: 7,
      totalSessions: 10,
      lastActivity: new Date('2024-01-19')
    },
    {
      id: '3',
      name: 'Lisa Park',
      avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      email: 'lisa.park@email.com',
      enrolledAt: new Date('2024-01-15'),
      status: 'pending',
      sessionsAttended: 0,
      totalSessions: 10,
      lastActivity: new Date('2024-01-15')
    },
    {
      id: '4',
      name: 'John Smith',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      email: 'john.smith@email.com',
      enrolledAt: new Date('2024-01-08'),
      status: 'active',
      sessionsAttended: 9,
      totalSessions: 10,
      lastActivity: new Date('2024-01-21')
    }
  ];

  const waitlistStudents = [
    {
      id: '5',
      name: 'David Brown',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      email: 'david.brown@email.com',
      waitlistedAt: new Date('2024-01-18'),
      position: 1
    },
    {
      id: '6',
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      email: 'emma.wilson@email.com',
      waitlistedAt: new Date('2024-01-19'),
      position: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'dropped': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen || !listing) return null;

  const spotsRemaining = (listing.maxStudents || 0) - (listing.currentEnrollment || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{listing.title}</h2>
              <p className="text-gray-600">Group Class Enrollment Management</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Class Overview */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{listing.currentEnrollment || 0}</div>
                <div className="text-sm text-gray-600">Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-coral-500">{spotsRemaining}</div>
                <div className="text-sm text-gray-600">Spots Left</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{waitlistStudents.length}</div>
                <div className="text-sm text-gray-600">Waitlisted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{listing.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>

            {/* Enrollment Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Enrollment Progress</span>
                <span className="text-sm text-gray-600">
                  {Math.round(((listing.currentEnrollment || 0) / (listing.maxStudents || 1)) * 100)}% full
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-coral-500 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((listing.currentEnrollment || 0) / (listing.maxStudents || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', count: null },
                { id: 'students', label: 'Enrolled Students', count: enrolledStudents.length },
                { id: 'waitlist', label: 'Waitlist', count: waitlistStudents.length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-coral-500 text-coral-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Class Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{listing.duration} minutes per session</span>
                    </div>
                    <div className="flex items-center">
                      {listing.format === 'online' ? (
                        <Video className="h-4 w-4 text-gray-400 mr-2" />
                      ) : (
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      )}
                      <span>{listing.format === 'both' ? 'Online & Offline' : listing.format}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span>Max {listing.maxStudents} students</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Pricing</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Per Student:</span>
                      <span className="font-medium">{listing.price.group || listing.price.individual} DZD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Revenue:</span>
                      <span className="font-medium text-green-600">
                        {(listing.currentEnrollment || 0) * (listing.price.group || listing.price.individual)} DZD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Potential Revenue:</span>
                      <span className="font-medium text-blue-600">
                        {(listing.maxStudents || 0) * (listing.price.group || listing.price.individual)} DZD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Enrollment Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Classes with 80%+ enrollment tend to have higher completion rates</li>
                  <li>• Consider offering early bird discounts to fill remaining spots</li>
                  <li>• Engage with waitlisted students to maintain their interest</li>
                  <li>• Update class description based on student feedback</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-4">
              {enrolledStudents.map((student) => (
                <div key={student.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            Enrolled {student.enrolledAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {student.sessionsAttended}/{student.totalSessions} sessions
                      </div>
                      <div className="text-xs text-gray-500">
                        Last active: {student.lastActivity.toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Progress</span>
                      <span className="text-xs text-gray-600">
                        {Math.round((student.sessionsAttended / student.totalSessions) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(student.sessionsAttended / student.totalSessions) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'waitlist' && (
            <div className="space-y-4">
              {waitlistStudents.length > 0 ? (
                waitlistStudents.map((student) => (
                  <div key={student.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {student.position}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-600">{student.email}</p>
                          <p className="text-xs text-gray-500">
                            Waitlisted {student.waitlistedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                          Accept
                        </button>
                        <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300">
                          Remove
                        </button>
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No students on waitlist</p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
            <div className="flex space-x-3">
              {listing.type === 'group' && (
                <>
                  <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <Mail className="h-4 w-4 mr-2" />
                    Email All Students
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Session
                  </button>
                </>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupEnrollmentModal;