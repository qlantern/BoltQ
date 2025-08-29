import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin,
  Video,
  Edit3,
  Trash2,
  ExternalLink,
  Eye
} from 'lucide-react';
import ScheduleDetailsModal from './ScheduleDetailsModal';

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

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

const SchedulingSystem: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: Date; time: string } | null>(null);
  const [availabilityToggle, setAvailabilityToggle] = useState<Map<string, boolean>>(new Map());
  const [clickTimeout, setClickTimeout] = useState<number | null>(null);

  // Enhanced mock schedule data with more comprehensive examples
  const schedule: DaySchedule[] = [
    {
      date: new Date(2024, 0, 22), // Today
      slots: [
        {
          id: '1',
          time: '09:00',
          duration: 60,
          student: {
            name: 'Ahmed Hassan',
            avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          subject: 'Business English',
          type: 'online',
          status: 'pending',
          meetingLink: 'https://zoom.us/j/123456789'
        },
        {
          id: '2',
          time: '11:00',
          duration: 90,
          student: {
            name: 'Maria Garcia',
            avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          subject: 'IELTS Preparation',
          type: 'online',
          status: 'approved',
          meetingLink: 'https://meet.google.com/abc-defg-hij'
        },
        {
          id: '3',
          time: '14:00',
          duration: 60,
          student: {
            name: 'Lisa Park',
            avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          subject: 'Conversation Practice',
          type: 'offline',
          status: 'upcoming',
          location: 'Central Library, Room 204'
        },
        {
          id: '4',
          time: '16:00',
          duration: 60,
          student: {
            name: 'John Smith',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          subject: 'Grammar Review',
          type: 'online',
          status: 'finished',
          meetingLink: 'https://zoom.us/j/987654321'
        }
      ]
    },
    {
      date: new Date(2024, 0, 23), // Tomorrow
      slots: [
        {
          id: '5',
          time: '10:00',
          duration: 60,
          student: {
            name: 'Sarah Wilson',
            avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          subject: 'Academic Writing',
          type: 'online',
          status: 'approved',
          meetingLink: 'https://zoom.us/j/555666777'
        },
        {
          id: '6',
          time: '15:00',
          duration: 90,
          student: {
            name: 'David Brown',
            avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          subject: 'Business Presentation',
          type: 'offline',
          status: 'pending',
          location: 'Downtown Office, Conference Room A'
        }
      ]
    },
    {
      date: new Date(2024, 0, 24), // Day after tomorrow
      slots: [
        {
          id: '7',
          time: '09:00',
          duration: 60,
          student: {
            name: 'Emma Thompson',
            avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          subject: 'TOEFL Preparation',
          type: 'online',
          status: 'upcoming',
          meetingLink: 'https://zoom.us/j/111222333'
        },
        {
          id: '8',
          time: '13:00',
          duration: 60,
          student: {
            name: 'Robert Kim',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          subject: 'Interview Preparation',
          type: 'offline',
          status: 'approved',
          location: 'City Center, Meeting Room B'
        },
        {
          id: '9',
          time: '17:00',
          duration: 90,
          student: {
            name: 'Anna Rodriguez',
            avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          subject: 'Advanced Grammar',
          type: 'online',
          status: 'finished',
          meetingLink: 'https://zoom.us/j/444555666'
        }
      ]
    }
  ];

  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getSlotForDateTime = (date: Date, time: string) => {
    const daySchedule = schedule.find(s => 
      s.date.toDateString() === date.toDateString()
    );
    return daySchedule?.slots.find(slot => slot.time === time);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800 border-red-300';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'finished': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'available': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSlotClick = (date: Date, time: string, slot?: TimeSlot) => {
    const slotKey = `${date.toDateString()}-${time}`;
    
    if (clickTimeout) {
      // Double click - open modal
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      
      if (slot) {
        setSelectedSlot(slot);
      } else {
        setSelectedDateTime({ date, time });
      }
      setShowScheduleModal(true);
    } else {
      // Single click - toggle availability (only for empty slots)
      if (!slot) {
        const timeout = setTimeout(() => {
          setAvailabilityToggle(prev => {
            const newMap = new Map(prev);
            newMap.set(slotKey, !newMap.get(slotKey));
            return newMap;
          });
          setClickTimeout(null);
        }, 300);
        setClickTimeout(timeout);
      } else {
        // For existing slots, single click opens modal
        setSelectedSlot(slot);
        setShowScheduleModal(true);
      }
    }
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const handlePrev = () => {
    if (viewMode === 'day') navigateDay('prev');
    else if (viewMode === 'week') navigateWeek('prev');
    else navigateMonth('prev');
  };

  const handleNext = () => {
    if (viewMode === 'day') navigateDay('next');
    else if (viewMode === 'week') navigateWeek('next');
    else navigateMonth('next');
  };

  const getCalendarTitle = () => {
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const weekDays = getWeekDays(currentDate);

  const renderDayView = () => {
    const daySchedule = schedule.find(s => s.date.toDateString() === currentDate.toDateString());
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 text-center border-b border-gray-200">
          <div className="text-lg font-medium text-gray-900">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
          {timeSlots.map(time => {
            const slot = daySchedule?.slots.find(s => s.time === time);
            const slotKey = `${currentDate.toDateString()}-${time}`;
            const isAvailable = availabilityToggle.get(slotKey) || false;
            return (
              <div key={time} className="grid grid-cols-4 border-b border-gray-100 last:border-b-0">
                <div className="p-3 bg-gray-50 border-r border-gray-200 text-sm text-gray-600 font-medium">
                  {time}
                </div>
                <div 
                  className={`col-span-3 p-2 min-h-[60px] relative cursor-pointer transition-colors ${
                    slot ? 'hover:bg-gray-50' : isAvailable ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSlotClick(currentDate, time, slot)}
                >
                  {slot ? (
                    <div className={`p-2 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow ${getStatusColor(slot.status)}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {slot.type === 'online' ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                        <span className="text-xs font-medium truncate">{slot.subject}</span>
                      </div>
                      {slot.student && (
                        <div className="flex items-center space-x-1">
                          <img src={slot.student.avatar} alt={slot.student.name} className="w-4 h-4 rounded-full object-cover" />
                          <span className="text-xs truncate">{slot.student.name}</span>
                        </div>
                      )}
                      <div className="text-xs mt-1 opacity-75">{slot.duration}min</div>
                    </div>
                  ) : (
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isAvailable ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                      {isAvailable ? (
                        <div className="text-xs text-blue-600 font-medium">Available</div>
                      ) : (
                        <Plus className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Week Header */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="p-4 bg-gray-50 border-r border-gray-200">
          <span className="text-sm font-medium text-gray-600">Time</span>
        </div>
        {weekDays.map((day, index) => (
          <div key={index} className="p-4 bg-gray-50 text-center border-r border-gray-200 last:border-r-0">
            <div className="text-sm font-medium text-gray-900">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className={`text-lg font-bold mt-1 ${
              day.toDateString() === new Date().toDateString() 
                ? 'text-coral-500' 
                : 'text-gray-700'
            }`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="max-h-96 overflow-y-auto">
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-8 border-b border-gray-100 last:border-b-0">
            <div className="p-3 bg-gray-50 border-r border-gray-200 text-sm text-gray-600 font-medium">
              {time}
            </div>
            {weekDays.map((day, dayIndex) => {
              const slot = getSlotForDateTime(day, time);
              const slotKey = `${day.toDateString()}-${time}`;
              const isAvailable = availabilityToggle.get(slotKey) || false;
              
              return (
                <div 
                  key={dayIndex} 
                  className={`p-2 border-r border-gray-100 last:border-r-0 min-h-[60px] relative cursor-pointer transition-colors ${
                    slot ? 'hover:bg-gray-50' : 
                    selectedSlots.has(slotKey) ? 'bg-coral-100' :
                    isAvailable ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSlotClick(day, time, slot)}
                  onMouseDown={() => handleMouseDown(day, time, slot)}
                  onMouseEnter={() => handleMouseEnter(day, time, slot)}
                >
                  {slot ? (
                    <div className={`p-2 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow ${getStatusColor(slot.status)}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {slot.type === 'online' ? (
                          <Video className="h-3 w-3" />
                        ) : (
                          <MapPin className="h-3 w-3" />
                        )}
                        <span className="text-xs font-medium truncate">{slot.subject}</span>
                      </div>
                      {slot.student && (
                        <div className="flex items-center space-x-1">
                          <img
                            src={slot.student.avatar}
                            alt={slot.student.name}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span className="text-xs truncate">{slot.student.name}</span>
                        </div>
                      )}
                      <div className="text-xs mt-1 opacity-75">
                        {slot.duration}min
                      </div>
                    </div>
                  ) : (
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                      isAvailable 
                        ? 'opacity-100' 
                        : 'opacity-0 hover:opacity-100'
                    }`}>
                      {isAvailable ? (
                        <div className="text-xs text-blue-600 font-medium">Available</div>
                      ) : (
                        <Plus className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    const days = [];
    // Add blank days for the start of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`blank-start-${i}`} className="border-r border-b border-gray-200 min-h-[100px]"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const daySchedule = schedule.find(s => s.date.toDateString() === date.toDateString());
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div 
          key={day} 
          className={`p-2 border-r border-b border-gray-200 cursor-pointer hover:bg-gray-50 min-h-[100px] ${isToday ? 'bg-coral-50' : ''}`}
          onClick={() => {
            setCurrentDate(date);
            setViewMode('day');
          }}
        >
          <div className={`font-bold ${isToday ? 'text-coral-500' : ''}`}>{day}</div>
          {daySchedule && daySchedule.slots.length > 0 && (
            <div className="text-xs mt-1 text-gray-600">
              {daySchedule.slots.length} lesson{daySchedule.slots.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      );
    }
    
    const totalCells = Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7;
    for (let i = days.length; i < totalCells; i++) {
        days.push(<div key={`blank-end-${i}`} className="border-r border-b border-gray-200 min-h-[100px]"></div>);
    }

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7">
          {weekdays.map(day => (
            <div key={day} className="p-4 bg-gray-50 text-center border-r border-b border-gray-200 font-medium text-gray-900">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days}
        </div>
      </div>
    );
  };

  const renderCalendarView = () => {
    switch (viewMode) {
      case 'day':
        return renderDayView();
      case 'week':
        return renderWeekView();
      case 'month':
        return renderMonthView();
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'day' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'week' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'month' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <ExternalLink className="h-4 w-4 mr-2" />
            Sync Calendar
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <button
          onClick={handlePrev}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <h2 className="text-lg font-semibold text-gray-900">
          {getCalendarTitle()}
        </h2>
        
        <button
          onClick={handleNext}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {renderCalendarView()}

      {/* Schedule Legend - Moved below calendar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-sm text-gray-700">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
            <span className="text-sm text-gray-700">Approved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span className="text-sm text-gray-700">Upcoming</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
            <span className="text-sm text-gray-700">Finished</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <Plus className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">Click to schedule</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>How to use:</strong> Single click empty slots to toggle availability. Double click any slot to open details or schedule a lesson.
          </p>
        </div>
      </div>
      {/* Today's Schedule Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          {schedule.find(s => s.date.toDateString() === new Date().toDateString())?.slots.map((slot) => (
            <div key={slot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{slot.time}</div>
                  <div className="text-xs text-gray-500">{slot.duration}min</div>
                </div>
                
                {slot.student && (
                  <img
                    src={slot.student.avatar}
                    alt={slot.student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{slot.subject}</h4>
                  {slot.student && (
                    <p className="text-sm text-gray-600">{slot.student.name}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-1">
                    {slot.type === 'online' ? (
                      <div className="flex items-center text-xs text-blue-600">
                        <Video className="h-3 w-3 mr-1" />
                        Online
                      </div>
                    ) : (
                      <div className="flex items-center text-xs text-green-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {slot.location}
                      </div>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(slot.status)}`}>
                      {slot.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {slot.meetingLink && (
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                )}
                <button 
                  onClick={() => {
                    setSelectedSlot(slot);
                    setShowScheduleModal(true);
                  }}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )) || (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No lessons scheduled for today</p>
            </div>
          )}
        </div>
      </div>


      {/* Booking Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Booking Preferences</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum booking notice
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
                  <option>2 hours</option>
                  <option>4 hours</option>
                  <option>1 day</option>
                  <option>2 days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum advance booking
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
                  <option>1 week</option>
                  <option>2 weeks</option>
                  <option>1 month</option>
                  <option>3 months</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Automation Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Allow recurring bookings</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-coral-500">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Auto-confirm bookings</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Details Modal */}
      <ScheduleDetailsModal
        isOpen={showScheduleModal}
        onClose={() => {
          setShowScheduleModal(false);
          setSelectedSlot(null);
          setSelectedDateTime(null);
        }}
        slot={selectedSlot}
        dateTime={selectedDateTime}
      />
    </div>
  );
};

export default SchedulingSystem;