import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Video, Plus, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ScheduleSlot {
  id: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'approved' | 'upcoming' | 'finished';
  studentName?: string;
  subject: string;
  type: 'individual' | 'group';
  format: 'online' | 'offline';
  location?: string;
  price: number;
  isAvailable?: boolean;
}

export const SchedulingSystem: React.FC = () => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Mock schedule data with color-coded statuses
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([
    {
      id: '1',
      date: '2025-01-20',
      time: '09:00',
      duration: 60,
      status: 'pending',
      studentName: 'Ahmed Benali',
      subject: 'French Conversation',
      type: 'individual',
      format: 'online',
      price: 2500
    },
    {
      id: '2',
      date: '2025-01-20',
      time: '14:00',
      duration: 90,
      status: 'approved',
      studentName: 'Fatima Kadi',
      subject: 'English Grammar',
      type: 'individual',
      format: 'offline',
      location: 'Algiers Center',
      price: 3000
    },
    {
      id: '3',
      date: '2025-01-21',
      time: '10:00',
      duration: 120,
      status: 'upcoming',
      studentName: 'Group Class A',
      subject: 'Arabic Literature',
      type: 'group',
      format: 'online',
      price: 4500
    },
    {
      id: '4',
      date: '2025-01-19',
      time: '16:00',
      duration: 60,
      status: 'finished',
      studentName: 'Youssef Mansouri',
      subject: 'Spanish Basics',
      type: 'individual',
      format: 'online',
      price: 2000
    },
    {
      id: '5',
      date: '2025-01-22',
      time: '11:00',
      duration: 60,
      status: 'pending',
      studentName: 'Amina Zerrouki',
      subject: 'German Conversation',
      type: 'individual',
      format: 'offline',
      location: 'Oran',
      price: 2800
    },
    {
      id: '6',
      date: '2025-01-23',
      time: '15:00',
      duration: 90,
      status: 'approved',
      studentName: 'Group Class B',
      subject: 'English Business',
      type: 'group',
      format: 'online',
      price: 5000
    }
  ]);

  const [availableSlots, setAvailableSlots] = useState<string[]>([
    '2025-01-20-11:00',
    '2025-01-21-14:00',
    '2025-01-22-09:00',
    '2025-01-23-10:00'
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800 border-red-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'finished': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'finished': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleSlotClick = (slot: ScheduleSlot) => {
    setSelectedSlot(slot);
    setShowModal(true);
    setIsEditing(false);
  };

  const handleSlotDoubleClick = (slot: ScheduleSlot) => {
    setSelectedSlot(slot);
    setShowModal(true);
    setIsEditing(true);
  };

  const handleAvailabilityToggle = (dateTime: string) => {
    setAvailableSlots(prev => 
      prev.includes(dateTime) 
        ? prev.filter(slot => slot !== dateTime)
        : [...prev, dateTime]
    );
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const generateWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const timeSlots = generateTimeSlots();
  const weekDates = generateWeekDates();

  return (
    <div className="space-y-6">
      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weekly Schedule
            </h3>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header */}
              <div className="grid grid-cols-8 gap-1 mb-2">
                <div className="p-2 text-xs font-medium text-gray-500">Time</div>
                {weekDates.map((date) => (
                  <div key={date} className="p-2 text-xs font-medium text-gray-700 text-center">
                    <div>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className="text-gray-500">{new Date(date).getDate()}</div>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 gap-1 mb-1">
                  <div className="p-2 text-xs text-gray-500 font-medium">{time}</div>
                  {weekDates.map((date) => {
                    const dateTime = `${date}-${time}`;
                    const slot = scheduleSlots.find(s => s.date === date && s.time === time);
                    const isAvailable = availableSlots.includes(dateTime);

                    if (slot) {
                      return (
                        <div
                          key={dateTime}
                          className={`p-1 rounded cursor-pointer border transition-all hover:shadow-md ${getStatusColor(slot.status)}`}
                          onClick={() => handleSlotClick(slot)}
                          onDoubleClick={() => handleSlotDoubleClick(slot)}
                        >
                          <div className="text-xs">
                            <div className="flex items-center gap-1 mb-1">
                              {getStatusIcon(slot.status)}
                              <span className="font-medium truncate">{slot.studentName}</span>
                            </div>
                            <div className="text-gray-600 truncate">{slot.subject}</div>
                            <div className="flex items-center gap-1 mt-1">
                              {slot.format === 'online' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                              <span>{slot.type === 'group' ? <Users className="w-3 h-3" /> : '1:1'}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={dateTime}
                        className={`p-2 rounded cursor-pointer border-2 border-dashed transition-all hover:bg-gray-50 ${
                          isAvailable 
                            ? 'border-green-300 bg-green-50 hover:bg-green-100' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleAvailabilityToggle(dateTime)}
                      >
                        <div className="text-xs text-center text-gray-500">
                          {isAvailable ? 'Available' : 'Set Available'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Legend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Schedule Legend</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
            <span className="text-gray-700">Pending classes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
            <span className="text-gray-700">Approved classes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
            <span className="text-gray-700">Upcoming classes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
            <span className="text-gray-700">Finished classes</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600">
            <strong>Single click:</strong> Toggle availability • <strong>Double click:</strong> Open class details
          </p>
        </div>
      </div>

      {/* Class Details Modal */}
      {showModal && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {isEditing ? 'Edit Class' : 'Class Details'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedSlot.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSlot.status)}`}>
                    {selectedSlot.status.charAt(0).toUpperCase() + selectedSlot.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Student:</span>
                    <p className="font-medium">{selectedSlot.studentName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Subject:</span>
                    <p className="font-medium">{selectedSlot.subject}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Date & Time:</span>
                    <p className="font-medium">
                      {new Date(selectedSlot.date).toLocaleDateString()} at {selectedSlot.time}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <p className="font-medium">{selectedSlot.duration} minutes</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <div className="flex items-center gap-1">
                      {selectedSlot.type === 'group' ? <Users className="w-4 h-4" /> : <span>1:1</span>}
                      <span className="font-medium capitalize">{selectedSlot.type}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Format:</span>
                    <div className="flex items-center gap-1">
                      {selectedSlot.format === 'online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                      <span className="font-medium capitalize">{selectedSlot.format}</span>
                    </div>
                  </div>
                  {selectedSlot.location && (
                    <div className="col-span-2">
                      <span className="text-gray-500">Location:</span>
                      <p className="font-medium">{selectedSlot.location}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">Price:</span>
                    <p className="font-medium">{selectedSlot.price.toLocaleString()} DZD</p>
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Save Changes
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {!isEditing && selectedSlot.status === 'pending' && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                        Approve
                      </button>
                      <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                        Decline
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};