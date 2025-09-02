import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  Star, 
  MessageCircle, 
  Play,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Search
} from 'lucide-react';

interface Lesson {
  id: string;
  teacher: {
    name: string;
    avatar: string;
    rating: number;
  };
  subject: string;
  date: string;
  time: string;
  duration: number;
  type: 'online' | 'offline';
  status: 'upcoming' | 'completed' | 'cancelled' | 'pending';
  location?: string;
  meetingLink?: string;
  price: number;
  materials?: string[];
  homework?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

const MyLessons: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);

  const lessons: Lesson[] = [
    {
      id: '1',
      teacher: {
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.9
      },
      subject: 'Business English',
      date: '2024-01-20',
      time: '14:00',
      duration: 60,
      type: 'online',
      status: 'upcoming',
      meetingLink: 'https://zoom.us/j/123456789',
      price: 1500,
      materials: ['Business English Workbook Chapter 5', 'Presentation Templates']
    },
    {
      id: '2',
      teacher: {
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.8
      },
      subject: 'IELTS Preparation',
      date: '2024-01-21',
      time: '10:00',
      duration: 90,
      type: 'online',
      status: 'upcoming',
      meetingLink: 'https://zoom.us/j/987654321',
      price: 2000,
      materials: ['IELTS Practice Test 3', 'Writing Task 2 Examples']
    },
    {
      id: '3',
      teacher: {
        name: 'Emma Williams',
        avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 5.0
      },
      subject: 'Conversation Practice',
      date: '2024-01-18',
      time: '16:00',
      duration: 60,
      type: 'offline',
      status: 'completed',
      location: 'Central Library, Room 204',
      price: 1200,
      homework: 'Practice daily conversation topics for 15 minutes',
      feedback: {
        rating: 5,
        comment: 'Excellent progress in pronunciation and confidence!'
      }
    },
    {
      id: '4',
      teacher: {
        name: 'David Rodriguez',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.7
      },
      subject: 'Grammar Fundamentals',
      date: '2024-01-15',
      time: '11:00',
      duration: 60,
      type: 'online',
      status: 'completed',
      price: 800,
      homework: 'Complete exercises 1-5 in grammar workbook',
      feedback: {
        rating: 4,
        comment: 'Good understanding of present perfect tense. Keep practicing!'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesTab = activeTab === 'all' || lesson.status === activeTab;
    const matchesSearch = lesson.teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowLessonModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Lessons</h1>
          <p className="text-gray-600 mt-1">Manage your bookings and track your learning progress</p>
        </div>
        <button className="bg-coral-500 text-white px-4 py-2 rounded-lg hover:bg-coral-600 flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          Book New Lesson
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Lessons</p>
              <p className="text-2xl font-bold text-gray-900">{lessons.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-coral-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">
                {lessons.filter(l => l.status === 'upcoming').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {lessons.filter(l => l.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hours Learned</p>
              <p className="text-2xl font-bold text-purple-600">
                {lessons.filter(l => l.status === 'completed').reduce((total, l) => total + l.duration, 0) / 60}h
              </p>
            </div>
            <Target className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'all' 
                  ? 'bg-coral-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Lessons ({lessons.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'upcoming' 
                  ? 'bg-coral-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming ({lessons.filter(l => l.status === 'upcoming').length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'completed' 
                  ? 'bg-coral-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed ({lessons.filter(l => l.status === 'completed').length})
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {filteredLessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={lesson.teacher.avatar}
                  alt={lesson.teacher.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{lesson.subject}</h3>
                  <p className="text-gray-600">with {lesson.teacher.name}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(lesson.date).toLocaleDateString()} at {lesson.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {lesson.duration} minutes
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      {lesson.type === 'online' ? <Video className="h-4 w-4 mr-1" /> : <MapPin className="h-4 w-4 mr-1" />}
                      {lesson.type}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(lesson.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lesson.status)}`}>
                    {lesson.status}
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-900">{lesson.price} DZD</p>
                
                <div className="flex items-center space-x-2 mt-3">
                  {lesson.status === 'upcoming' && lesson.type === 'online' && (
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm flex items-center">
                      <Play className="h-3 w-3 mr-1" />
                      Join
                    </button>
                  )}
                  <button 
                    onClick={() => handleLessonClick(lesson)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 text-sm"
                  >
                    Details
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm flex items-center">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* Lesson Materials (for upcoming lessons) */}
            {lesson.status === 'upcoming' && lesson.materials && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Lesson Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {lesson.materials.map((material, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Homework (for completed lessons) */}
            {lesson.status === 'completed' && lesson.homework && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Homework Assigned</h4>
                <p className="text-gray-700 text-sm">{lesson.homework}</p>
              </div>
            )}

            {/* Teacher Feedback (for completed lessons) */}
            {lesson.status === 'completed' && lesson.feedback && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Teacher Feedback</h4>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < lesson.feedback!.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm flex-1">{lesson.feedback.comment}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery ? 'Try adjusting your search terms' : 'Book your first lesson to get started'}
          </p>
          <button className="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600">
            Find Teachers
          </button>
        </div>
      )}

      {/* Lesson Details Modal */}
      {showLessonModal && selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Lesson Details</h2>
                <button
                  onClick={() => setShowLessonModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Teacher Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedLesson.teacher.avatar}
                    alt={selectedLesson.teacher.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedLesson.teacher.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{selectedLesson.teacher.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Lesson Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <p className="text-gray-900">{selectedLesson.subject}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <p className="text-gray-900">{selectedLesson.duration} minutes</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                    <p className="text-gray-900">
                      {new Date(selectedLesson.date).toLocaleDateString()} at {selectedLesson.time}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <p className="text-gray-900 capitalize">{selectedLesson.type}</p>
                  </div>
                </div>

                {/* Location or Meeting Link */}
                {selectedLesson.type === 'online' && selectedLesson.meetingLink && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label>
                    <a
                      href={selectedLesson.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {selectedLesson.meetingLink}
                    </a>
                  </div>
                )}

                {selectedLesson.type === 'offline' && selectedLesson.location && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="text-gray-900">{selectedLesson.location}</p>
                  </div>
                )}

                {/* Materials */}
                {selectedLesson.materials && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Materials</label>
                    <div className="space-y-2">
                      {selectedLesson.materials.map((material, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowLessonModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Teacher
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLessons;