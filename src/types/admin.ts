export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export interface TeacherApplication {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      country: string;
    };
  };
  professionalInfo: {
    summary: string;
    experience: number;
    hourlyRate: number;
    specialties: string[];
    languages: string[];
    classTypes: {
      online: boolean;
      offline: boolean;
    };
  };
  documents: {
    cv: File | null;
    profilePhoto: File | null;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
    certifications: string[];
  };
  socialMedia: {
    demoVideoUrl: string;
    profiles: {
      linkedin: string;
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
  status: ApplicationStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
  notes?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
  createdAt: Date;
  lastLogin?: Date;
}

export interface ApplicationReview {
  id: string;
  applicationId: string;
  reviewerId: string;
  action: 'approve' | 'reject' | 'request_changes';
  reason?: string;
  notes?: string;
  createdAt: Date;
}