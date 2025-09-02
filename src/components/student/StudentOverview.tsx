import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  Star, 
  Clock, 
  TrendingUp, 
  Award,
  Users,
  MessageCircle,
  Target,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react';

const StudentOverview: React.FC = () => {
  const stats = [
    {
      title: 'Total Lessons',
      value: '24',
      change: '+3 this week',
      changeType: 'increase',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Hours Learned',
      value: '36.5',
      change: '+4.5 this week',
      changeType: 'increase',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Current Level',
      value: 'B2',
      change: 'Intermediate',
      changeType: 'neutral',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Achievements',
      value: '8',
      change: '+2 this month',
      changeType: 'increase',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const upcomingLessons = [
    {
      id: '1',
      teacher: 'Sarah Johnson',
      teacherAvatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subject: 'Business English',
      date: 'Today',
      time: '2:00 PM',
      duration: 60,
      type: 'Online',
      status: 'confirmed'
    },
    {
      id: '2',
      teacher: 'Michael Chen',
      teacherAvatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subject: 'IELTS Preparation',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: 90,
      type: 'Online',
      status: 'confirmed'
    },
    {
      id: '3',
      teacher: 'Emma Williams',
      teacherAvatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      subject: 'Conversation Practice',
      date: 'Wednesday',
      time: '4:00 PM',
      duration: 60,
      type: 'Offline',
      status: 'pending'
    }
  ];

  const recentActivities = [
    {
      type: 'lesson',
      message: 'Completed Business English lesson with Sarah Johnson',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'message',
      message: 'New message from Michael Chen about homework',
      time: '4 hours ago',
      icon: MessageCircle,
      color: 'text-blue-600'
    },
    {
      type: 'achievement',
      message: 'Earned "Conversation Master" badge',
      time: '1 day ago',
      icon: Award,
      color: 'text-yellow-600'
    },
    {
      type: 'booking',
      message: 'Booked IELTS preparation lesson for tomorrow',
      time: '2 days ago',
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  const learningGoals = [
    {
      title: 'IELTS Score 7.0',
      progress: 75,
      target: 'March 2024',
      status: 'on-track'
    },
    {
      title: 'Business English Fluency',
      progress: 60,
      target: 'April 2024',
      status: 'on-track'
    },
    {
      title: 'Conversation Confidence',
      progress: 85,
      target: 'February 2024',
      status: 'ahead'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-coral-500 to-orange-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Ahmed! 👋</h1>
        <p className="text-white/90">You have 2 lessons scheduled for today. Keep up the great progress!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 
                  stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Lessons */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Lessons</h2>
            <button className="text-coral-500 hover:text-coral-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={lesson.teacherAvatar}
                  alt={lesson.teacher}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{lesson.teacher}</h3>
                  <p className="text-sm text-gray-600">{lesson.subject}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {lesson.date}, {lesson.time}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lesson.type === 'Online' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {lesson.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lesson.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {lesson.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{lesson.duration} min</p>
                  {lesson.status === 'confirmed' && lesson.date === 'Today' && (
                    <button className="mt-1 text-xs bg-coral-500 text-white px-2 py-1 rounded-lg hover:bg-coral-600 flex items-center">
                      <Play className="h-3 w-3 mr-1" />
                      Join
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Learning Goals</h2>
            <button className="text-coral-500 hover:text-coral-600 text-sm font-medium">
              Manage Goals
            </button>
          </div>
          <div className="space-y-4">
            {learningGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{goal.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    goal.status === 'ahead' ? 'bg-green-100 text-green-700' :
                    goal.status === 'on-track' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {goal.status === 'ahead' ? 'Ahead of schedule' :
                     goal.status === 'on-track' ? 'On track' : 'Behind schedule'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      goal.status === 'ahead' ? 'bg-green-500' :
                      goal.status === 'on-track' ? 'bg-blue-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{goal.progress}% complete</span>
                  <span>Target: {goal.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <button className="text-coral-500 hover:text-coral-600 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg bg-white`}>
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-6 bg-coral-50 border border-coral-200 rounded-lg hover:bg-coral-100 transition-colors">
            <div className="text-center">
              <BookOpen className="h-8 w-8 text-coral-500 mx-auto mb-2" />
              <h3 className="font-medium text-coral-700">Find Teachers</h3>
              <p className="text-sm text-coral-600">Browse and book lessons</p>
            </div>
          </button>
          
          <button className="flex items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-center">
              <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium text-blue-700">Message Teachers</h3>
              <p className="text-sm text-blue-600">Ask questions or get help</p>
            </div>
          </button>
          
          <button className="flex items-center justify-center p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium text-green-700">Set Goals</h3>
              <p className="text-sm text-green-600">Track your progress</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;