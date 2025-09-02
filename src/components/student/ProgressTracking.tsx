import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Calendar, 
  BookOpen, 
  Star,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface SkillProgress {
  skill: string;
  level: string;
  progress: number;
  target: number;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: 'milestone' | 'streak' | 'skill' | 'social';
}

const ProgressTracking: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const skillsProgress: SkillProgress[] = [
    { skill: 'Speaking', level: 'B2', progress: 75, target: 100, color: 'bg-blue-500' },
    { skill: 'Listening', level: 'B2+', progress: 85, target: 100, color: 'bg-green-500' },
    { skill: 'Reading', level: 'C1', progress: 90, target: 100, color: 'bg-purple-500' },
    { skill: 'Writing', level: 'B1+', progress: 65, target: 100, color: 'bg-orange-500' },
    { skill: 'Grammar', level: 'B2', progress: 80, target: 100, color: 'bg-red-500' },
    { skill: 'Vocabulary', level: 'B2+', progress: 88, target: 100, color: 'bg-teal-500' }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Lesson Complete',
      description: 'Completed your first English lesson',
      icon: '🎯',
      earnedAt: new Date('2024-01-05'),
      category: 'milestone'
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Attended lessons 5 days in a row',
      icon: '🔥',
      earnedAt: new Date('2024-01-12'),
      category: 'streak'
    },
    {
      id: '3',
      title: 'Grammar Master',
      description: 'Scored 90%+ on grammar assessment',
      icon: '📚',
      earnedAt: new Date('2024-01-15'),
      category: 'skill'
    },
    {
      id: '4',
      title: 'Social Butterfly',
      description: 'Participated in 3 group conversations',
      icon: '🦋',
      earnedAt: new Date('2024-01-18'),
      category: 'social'
    }
  ];

  const weeklyProgress = [
    { week: 'Week 1', hours: 4, lessons: 3 },
    { week: 'Week 2', hours: 6, lessons: 4 },
    { week: 'Week 3', hours: 5, lessons: 3 },
    { week: 'Week 4', hours: 8, lessons: 5 }
  ];

  const learningGoals = [
    {
      title: 'IELTS Score 7.0',
      current: 6.5,
      target: 7.0,
      deadline: 'March 2024',
      progress: 75,
      status: 'on-track'
    },
    {
      title: 'Business English Certification',
      current: 'B2',
      target: 'C1',
      deadline: 'May 2024',
      progress: 60,
      status: 'on-track'
    },
    {
      title: 'Conversation Fluency',
      current: 'Intermediate',
      target: 'Advanced',
      deadline: 'April 2024',
      progress: 85,
      status: 'ahead'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Progress</h1>
          <p className="text-gray-600 mt-1">Track your English learning journey and achievements</p>
        </div>
        <div className="flex space-x-2">
          {['week', 'month', 'year'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period as any)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors capitalize ${
                selectedPeriod === period
                  ? 'bg-coral-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills Assessment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsProgress.map((skill, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{skill.skill}</h3>
                <span className="text-sm font-medium text-gray-600">{skill.level}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${skill.color}`}
                  style={{ width: `${skill.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{skill.progress}%</span>
                <span>Next: {skill.level === 'B1+' ? 'B2' : skill.level === 'B2' ? 'B2+' : skill.level === 'B2+' ? 'C1' : 'C1+'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Goals */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Learning Goals</h2>
            <button className="text-coral-500 hover:text-coral-600 text-sm font-medium">
              Set New Goal
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
                    {goal.status === 'ahead' ? 'Ahead' : goal.status === 'on-track' ? 'On track' : 'Behind'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Current: {goal.current} → Target: {goal.target}
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
                  <span>Due: {goal.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Achievements</h2>
            <button className="text-coral-500 hover:text-coral-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Earned {achievement.earnedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Weekly Progress</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-coral-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Lessons</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 flex items-end justify-between space-x-4">
          {weeklyProgress.map((week, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full flex flex-col space-y-1">
                <div 
                  className="bg-coral-500 rounded-t"
                  style={{ height: `${(week.hours / 8) * 100}px` }}
                ></div>
                <div 
                  className="bg-blue-500 rounded-b"
                  style={{ height: `${(week.lessons / 5) * 80}px` }}
                ></div>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-gray-900">{week.week}</p>
                <p className="text-xs text-gray-500">{week.hours}h • {week.lessons} lessons</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;