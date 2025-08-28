import React, { useState } from 'react';
import { 
  Shield, 
  Bell, 
  Globe, 
  CreditCard, 
  User, 
  Lock,
  Eye,
  EyeOff,
  Save,
  AlertTriangle
} from 'lucide-react';

const SettingsSection: React.FC = () => {
  const [privacySettings, setPrivacySettings] = useState({
    showEmail: false,
    showPhone: false,
    showLocation: true,
    showRating: true,
    allowMessages: true,
    showAvailability: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailBookings: true,
    emailMessages: true,
    emailReviews: true,
    pushBookings: true,
    pushMessages: false,
    pushReviews: true,
    smsBookings: false,
    smsReminders: true
  });

  const [accountSettings, setAccountSettings] = useState({
    language: 'en',
    timezone: 'UTC+1',
    currency: 'DZD',
    autoAcceptBookings: false,
    requireDeposit: true,
    cancellationPolicy: '24h'
  });

  const handlePrivacyChange = (setting: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleAccountChange = (setting: string, value: any) => {
    setAccountSettings(prev => ({ ...prev, [setting]: value }));
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
        {/* Privacy Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <Shield className="h-6 w-6 text-coral-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Show email to students</span>
                <p className="text-xs text-gray-500">Students can see your email address</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.showEmail} 
                onChange={(value) => handlePrivacyChange('showEmail', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Show phone number</span>
                <p className="text-xs text-gray-500">Students can see your phone number</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.showPhone} 
                onChange={(value) => handlePrivacyChange('showPhone', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Show location</span>
                <p className="text-xs text-gray-500">Display your city/location publicly</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.showLocation} 
                onChange={(value) => handlePrivacyChange('showLocation', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Show rating & reviews</span>
                <p className="text-xs text-gray-500">Display ratings and student reviews</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.showRating} 
                onChange={(value) => handlePrivacyChange('showRating', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Allow messages</span>
                <p className="text-xs text-gray-500">Students can send you direct messages</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.allowMessages} 
                onChange={(value) => handlePrivacyChange('allowMessages', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Show availability</span>
                <p className="text-xs text-gray-500">Display your available time slots</p>
              </div>
              <ToggleSwitch 
                checked={privacySettings.showAvailability} 
                onChange={(value) => handlePrivacyChange('showAvailability', value)} 
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <Bell className="h-6 w-6 text-coral-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Email Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">New bookings</span>
                  <ToggleSwitch 
                    checked={notificationSettings.emailBookings} 
                    onChange={(value) => handleNotificationChange('emailBookings', value)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">New messages</span>
                  <ToggleSwitch 
                    checked={notificationSettings.emailMessages} 
                    onChange={(value) => handleNotificationChange('emailMessages', value)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">New reviews</span>
                  <ToggleSwitch 
                    checked={notificationSettings.emailReviews} 
                    onChange={(value) => handleNotificationChange('emailReviews', value)} 
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Push Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">New bookings</span>
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
                  <span className="text-sm text-gray-700">New reviews</span>
                  <ToggleSwitch 
                    checked={notificationSettings.pushReviews} 
                    onChange={(value) => handleNotificationChange('pushReviews', value)} 
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">SMS Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Urgent bookings</span>
                  <ToggleSwitch 
                    checked={notificationSettings.smsBookings} 
                    onChange={(value) => handleNotificationChange('smsBookings', value)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Lesson reminders</span>
                  <ToggleSwitch 
                    checked={notificationSettings.smsReminders} 
                    onChange={(value) => handleNotificationChange('smsReminders', value)} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-coral-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={accountSettings.language}
                onChange={(e) => handleAccountChange('language', e.target.value)}
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
                value={accountSettings.timezone}
                onChange={(e) => handleAccountChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              >
                <option value="UTC+1">UTC+1 (Algeria)</option>
                <option value="UTC+0">UTC+0 (GMT)</option>
                <option value="UTC-5">UTC-5 (EST)</option>
                <option value="UTC+2">UTC+2 (EET)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                value={accountSettings.currency}
                onChange={(e) => handleAccountChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              >
                <option value="DZD">DZD (Algerian Dinar)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Auto-accept bookings</span>
                <p className="text-xs text-gray-500">Automatically approve booking requests</p>
              </div>
              <ToggleSwitch 
                checked={accountSettings.autoAcceptBookings} 
                onChange={(value) => handleAccountChange('autoAcceptBookings', value)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Require deposit</span>
                <p className="text-xs text-gray-500">Students must pay deposit to book</p>
              </div>
              <ToggleSwitch 
                checked={accountSettings.requireDeposit} 
                onChange={(value) => handleAccountChange('requireDeposit', value)} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
              <select
                value={accountSettings.cancellationPolicy}
                onChange={(e) => handleAccountChange('cancellationPolicy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              >
                <option value="24h">24 hours notice</option>
                <option value="48h">48 hours notice</option>
                <option value="1week">1 week notice</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <Lock className="h-6 w-6 text-coral-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Security</h2>
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
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <div className="text-sm text-orange-600 font-medium">Recommended</div>
              </div>
            </button>

            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Login Sessions</h3>
                  <p className="text-sm text-gray-600">Manage your active sessions</p>
                </div>
                <Eye className="h-5 w-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="lg:col-span-2">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-red-900">Deactivate Account</h3>
                  <p className="text-sm text-red-700">Temporarily disable your teacher profile</p>
                </div>
                <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
                  Deactivate
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
      </div>
    </div>
  );
};

export default SettingsSection;