import React, { useState } from 'react';
import { 
  Bell, 
  Globe, 
  Shield, 
  CreditCard, 
  User, 
  Lock,
  Save,
  AlertTriangle,
  Mail,
  Smartphone,
  Calendar
} from 'lucide-react';

const StudentSettings: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailBookings: true,
    emailMessages: true,
    emailReminders: true,
    pushBookings: true,
    pushMessages: false,
    pushReminders: true,
    smsReminders: false,
    weeklyProgress: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showProgress: false,
    allowTeacherContact: true,
    shareAchievements: true,
    publicReviews: true
  });

  const [learningSettings, setLearningSettings] = useState({
    language: 'en',
    timezone: 'UTC+1',
    preferredLessonLength: 60,
    autoBookReminders: true,
    homeworkReminders: true,
    goalTracking: true
  });

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handlePrivacyChange = (setting: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleLearningChange = (setting: string, value: any) => {
    setLearningSettings(prev => ({ ...prev, [setting]: value }));
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-coral-500' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button className="flex items-center px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <Bell className="h-6 w-6 text-coral-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Lesson bookings</span>
                    <p className="text-xs text-gray-500">Confirmations and updates</p>
                  </div>
                  <ToggleSwitch 
                    checked={notificationSettings.emailBookings} 
                    onChange={(value) => handleNotificationChange('emailBookings', value)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">New messages</span>
                    <p className="text-xs text-gray-500">From teachers and support</p>
                  </div>
                  <ToggleSwitch 
                    checked={notificationSettings.emailMessages} 
                    onChange={(value) => handleNotificationChange('emailMessages', value)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Lesson reminders</span>
                    <p className="text-xs text-gray-500">24h and 1h before lessons</p>
                  </div>
                  <ToggleSwitch 
                    checked={notificationSettings.emailReminders} 
                    onChange={(value) => handleNotificationChange('emailReminders', value)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Weekly progress</span>
                    <p className="text-xs text-gray-500">Learning summary reports</p>
                  </div>
                  <ToggleSwitch 
                    checked={notificationSettings.weeklyProgress} 
                    onChange={(value) => handleNotificationChange('weeklyProgress', value)} 
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <Smartphone className="h-4 w-4 mr-2" />
                Push Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Lesson bookings</span>
                  <ToggleSwitch 
                    checked={notificationSettings.pushBookings} 
                    onChange={(value) => handleNotificationChange('pushBookings', value)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">New messages</span>
                  <ToggleSwitch 
                    checked={notificationSettings.pushMessages} 
                    onChange={(value) => handleNotificationChange('pushMessages', value)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Lesson reminders</span>
                  <ToggleSwitch 
                    checked={notificationSettings.pushReminders} 
                    onChange={(value) => handleNotificationChange('pushReminders', value)} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <Shield className="h-6 w-6 text-coral-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Show profile to teachers</span>
                <p className="text-xs text-gray-500">Teachers can view your learning profile</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.showProfile} 
                onChange={(value) => handlePrivacyChange('showProfile', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Share progress publicly</span>
                <p className="text-xs text-gray-500">Show achievements on public profile</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.showProgress} 
                onChange={(value) => handlePrivacyChange('showProgress', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Allow teacher contact</span>
                <p className="text-xs text-gray-500">Teachers can message you directly</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.allowTeacherContact} 
                onChange={(value) => handlePrivacyChange('allowTeacherContact', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Share achievements</span>
                <p className="text-xs text-gray-500">Show badges and milestones</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.shareAchievements} 
                onChange={(value) => handlePrivacyChange('shareAchievements', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Public reviews</span>
                <p className="text-xs text-gray-500">Show your teacher reviews publicly</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.publicReviews} 
                onChange={(value) => handlePrivacyChange('publicReviews', value)} 
              />
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <BookOpen className="h-6 w-6 text-coral-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Learning Preferences</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interface Language</label>
              <select
                value={learningSettings.language}
                onChange={(e) => handleLearningChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={learningSettings.timezone}
                onChange={(e) => handleLearningChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              >
                <option value="UTC+1">UTC+1 (Algeria)</option>
                <option value="UTC+0">UTC+0 (GMT)</option>
                <option value="UTC-5">UTC-5 (EST)</option>
                <option value="UTC+2">UTC+2 (EET)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Lesson Length</label>
              <select
                value={learningSettings.preferredLessonLength}
                onChange={(e) => handleLearningChange('preferredLessonLength', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Auto-booking reminders</span>
                <p className="text-xs text-gray-500">Remind me to book regular lessons</p>
              </div>
              <ToggleSwitch 
                checked={learningSettings.autoBookReminders} 
                onChange={(value) => handleLearningChange('autoBookReminders', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Homework reminders</span>
                <p className="text-xs text-gray-500">Remind me about assignments</p>
              </div>
              <ToggleSwitch 
                checked={learningSettings.homeworkReminders} 
                onChange={(value) => handleLearningChange('homeworkReminders', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Goal tracking</span>
                <p className="text-xs text-gray-500">Track progress towards learning goals</p>
              </div>
              <ToggleSwitch 
                checked={learningSettings.goalTracking} 
                onChange={(value) => handleLearningChange('goalTracking', value)} 
              />
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <Lock className="h-6 w-6 text-coral-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Account Security</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Change Password</h3>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </div>
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add extra security to your account</p>
                </div>
                <div className="text-sm text-orange-600 font-medium">Recommended</div>
              </div>
            </button>

            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Login History</h3>
                  <p className="text-sm text-gray-600">View recent account activity</p>
                </div>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
          <h2 className="text-xl font-semibold text-red-900">Account Management</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg">
            <div>
              <h3 className="font-medium text-red-900">Pause Learning</h3>
              <p className="text-sm text-red-700">Temporarily pause your learning journey</p>
            </div>
            <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
              Pause Account
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg">
            <div>
              <h3 className="font-medium text-red-900">Delete Account</h3>
              <p className="text-sm text-red-700">Permanently delete your account and all data</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;