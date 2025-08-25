import React from 'react';
import { 
  DollarSign, 
  Users, 
  Calendar, 
  Star, 
  TrendingUp, 
  Clock,
  BookOpen,
  MessageCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    {
      title: 'Total Earnings',
      value: '45,230 DZD',
      change: '+12.5%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Active Students',
      value: '28',
      change: '+3',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Classes This Week',
      value: '15',
      change: '-2',
      changeType: 'decrease',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Average Rating',
      value: '4.9',
      change: '+0.1',
      changeType: 'increase',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const recentActivities = [
    {
      type: 'booking',
      message: 'New booking from Ahmed Hassan for Business English',
      time: '2 hours ago',
      icon: BookOpen,
      color: 'text-green-600'
    },
    {
      type: 'message',
      message: 'Message from Maria Garcia about lesson materials',
      time: '4 hours ago',
      icon: MessageCircle,
      color: 'text-blue-600'
    },
    {
      type: 'review',
      message: 'New 5-star review from Lisa Park',
      time: '1 day ago',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      type: 'payment',
      message: 'Payment received: 2,000 DZD from John Smith',
      time: '2 days ago',
      icon: DollarSign,
      color: 'text-green-600'
    }
  ];

  const upcomingClasses = [
    {
      student: 'Ahmed Hassan',
      subject: 'Business English',
      time: 'Today, 2:00 PM',
      duration: '1 hour',
      type: 'Online',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      student: 'Maria Garcia',
      subject: 'IELTS Preparation',
      time: 'Tomorrow, 10:00 AM',
      duration: '1.5 hours',
      type: 'Online',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      student: 'Lisa Park',
      subject: 'Conversation Practice',
      time: 'Tomorrow, 4:00 PM',
      duration: '1 hour',
      type: 'Offline',
      avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-coral-500 to-orange-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
        <p className="text-white/90">You have 3 classes scheduled for today. Keep up the great work!</p>
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
                <div className={`flex items-center text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
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
        {/* Upcoming Classes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Classes</h2>
            <button className="text-coral-500 hover:text-coral-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={class_.avatar}
                  alt={class_.student}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{class_.student}</h3>
                  <p className="text-sm text-gray-600">{class_.subject}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {class_.time}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      class_.type === 'Online' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {class_.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{class_.duration}</p>
                </div>
              </div>
            ))}
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
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
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
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Earnings Overview</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-coral-500 text-white rounded-lg">7 Days</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">30 Days</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">90 Days</button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Earnings chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;