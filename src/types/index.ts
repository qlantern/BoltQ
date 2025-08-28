export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  location: string;
  languages: string[];
  specialties: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  availability: 'available' | 'busy' | 'offline';
  bio: string;
  education: string[];
  certifications: string[];
  responseTime: string;
  lessonsCompleted: number;
  isOnline: boolean;
  offersOnlineClasses: boolean;
  offersOfflineClasses: boolean;
  videoIntro?: string;
}

export interface Review {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
  lessonType: string;
}

export interface BookingRequest {
  teacherId: string;
  studentId: string;
  date: string;
  time: string;
  duration: number;
  lessonType: string;
  specialRequests?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isTeacher: boolean;
}