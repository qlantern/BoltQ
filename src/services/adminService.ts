import { TeacherApplication, ApplicationStatus, AdminUser } from '../types/admin';

class AdminService {
  private isAuthenticated = false;
  private currentAdmin: AdminUser | null = null;
  private applications: TeacherApplication[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock teacher applications
    this.applications = [
      {
        id: 'app-1',
        personalInfo: {
          firstName: 'Emma',
          lastName: 'Thompson',
          email: 'emma.thompson@email.com',
          phone: '+213 555 0123',
          address: {
            street: '123 Main Street',
            city: 'Algiers',
            country: 'Algeria'
          }
        },
        professionalInfo: {
          summary: 'Experienced English teacher with 8 years of teaching experience. Specialized in business English and IELTS preparation. Passionate about helping students achieve their language goals.',
          experience: 8,
          hourlyRate: 2000,
          specialties: ['Business English', 'IELTS Preparation', 'Conversational English'],
          languages: ['English (Native)', 'French (Fluent)', 'Arabic (Intermediate)'],
          classTypes: {
            online: true,
            offline: true
          }
        },
        documents: {
          cv: { name: 'emma_thompson_cv.pdf' } as File,
          profilePhoto: { name: 'emma_photo.jpg' } as File,
          education: [
            {
              degree: 'MA in Applied Linguistics',
              institution: 'University of London',
              year: '2015'
            },
            {
              degree: 'BA in English Literature',
              institution: 'Cambridge University',
              year: '2013'
            }
          ],
          certifications: ['CELTA', 'TESOL', 'IELTS Teaching Certificate']
        },
        socialMedia: {
          demoVideoUrl: 'https://youtube.com/watch?v=demo123',
          profiles: {
            linkedin: 'https://linkedin.com/in/emmathompson',
            facebook: '',
            instagram: '',
            twitter: 'https://twitter.com/emmateaches'
          }
        },
        status: 'pending',
        submittedAt: new Date('2024-01-15T10:30:00Z')
      },
      {
        id: 'app-2',
        personalInfo: {
          firstName: 'Ahmed',
          lastName: 'Benali',
          email: 'ahmed.benali@email.com',
          phone: '+213 555 0456',
          address: {
            street: '456 University Avenue',
            city: 'Oran',
            country: 'Algeria'
          }
        },
        professionalInfo: {
          summary: 'Bilingual English teacher with strong background in academic writing and test preparation. Native Arabic speaker with excellent English proficiency.',
          experience: 5,
          hourlyRate: 1500,
          specialties: ['Academic Writing', 'TOEFL Preparation', 'Grammar'],
          languages: ['Arabic (Native)', 'English (Fluent)', 'French (Intermediate)'],
          classTypes: {
            online: true,
            offline: false
          }
        },
        documents: {
          cv: { name: 'ahmed_benali_cv.pdf' } as File,
          profilePhoto: { name: 'ahmed_photo.jpg' } as File,
          education: [
            {
              degree: 'MA in English Literature',
              institution: 'University of Oran',
              year: '2018'
            }
          ],
          certifications: ['TESOL', 'TOEFL Teaching Certificate']
        },
        socialMedia: {
          demoVideoUrl: '',
          profiles: {
            linkedin: 'https://linkedin.com/in/ahmedbenali',
            facebook: '',
            instagram: '',
            twitter: ''
          }
        },
        status: 'under_review',
        submittedAt: new Date('2024-01-12T14:20:00Z')
      },
      {
        id: 'app-3',
        personalInfo: {
          firstName: 'Sarah',
          lastName: 'Mitchell',
          email: 'sarah.mitchell@email.com',
          phone: '+213 555 0789',
          address: {
            street: '789 Education Boulevard',
            city: 'Constantine',
            country: 'Algeria'
          }
        },
        professionalInfo: {
          summary: 'Enthusiastic English teacher specializing in young learners and kids English. Creative approach to language learning with focus on interactive methods.',
          experience: 3,
          hourlyRate: 1000,
          specialties: ['Kids English', 'Elementary Education', 'Phonics'],
          languages: ['English (Native)', 'Spanish (Fluent)'],
          classTypes: {
            online: true,
            offline: true
          }
        },
        documents: {
          cv: { name: 'sarah_mitchell_cv.pdf' } as File,
          profilePhoto: { name: 'sarah_photo.jpg' } as File,
          education: [
            {
              degree: 'BA in Elementary Education',
              institution: 'University of Constantine',
              year: '2020'
            }
          ],
          certifications: ['TESOL for Young Learners', 'Montessori Certificate']
        },
        socialMedia: {
          demoVideoUrl: 'https://youtube.com/watch?v=demo456',
          profiles: {
            linkedin: '',
            facebook: 'https://facebook.com/sarahteaches',
            instagram: 'https://instagram.com/sarahenglish',
            twitter: ''
          }
        },
        status: 'approved',
        submittedAt: new Date('2024-01-08T09:15:00Z'),
        reviewedAt: new Date('2024-01-10T16:30:00Z'),
        reviewedBy: 'admin'
      },
      {
        id: 'app-4',
        personalInfo: {
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.johnson@email.com',
          phone: '+213 555 0321',
          address: {
            street: '321 Language Center',
            city: 'Algiers',
            country: 'Algeria'
          }
        },
        professionalInfo: {
          summary: 'Professional English instructor with corporate training experience. Insufficient teaching credentials provided.',
          experience: 2,
          hourlyRate: 3000,
          specialties: ['Business English'],
          languages: ['English (Native)'],
          classTypes: {
            online: true,
            offline: false
          }
        },
        documents: {
          cv: { name: 'michael_johnson_cv.pdf' } as File,
          profilePhoto: null,
          education: [],
          certifications: []
        },
        socialMedia: {
          demoVideoUrl: '',
          profiles: {
            linkedin: '',
            facebook: '',
            instagram: '',
            twitter: ''
          }
        },
        status: 'rejected',
        submittedAt: new Date('2024-01-05T11:45:00Z'),
        reviewedAt: new Date('2024-01-07T13:20:00Z'),
        reviewedBy: 'admin',
        rejectionReason: 'Insufficient teaching credentials and experience. Missing required certifications and educational background.'
      }
    ];
  }

  // Simulate API delay
  private delay(ms: number = 800): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async login(username: string, password: string): Promise<boolean> {
    await this.delay();

    // Mock admin credentials
    if (username === 'admin' && password === 'admin123') {
      this.isAuthenticated = true;
      this.currentAdmin = {
        id: 'admin-1',
        username: 'admin',
        email: 'admin@teachbnb.com',
        role: 'admin',
        createdAt: new Date('2024-01-01'),
        lastLogin: new Date()
      };
      return true;
    }

    return false;
  }

  async logout(): Promise<void> {
    await this.delay(300);
    this.isAuthenticated = false;
    this.currentAdmin = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentAdmin(): AdminUser | null {
    return this.currentAdmin;
  }

  async getTeacherApplications(): Promise<TeacherApplication[]> {
    await this.delay();
    
    if (!this.isAuthenticated) {
      throw new Error('Unauthorized');
    }

    // Sort by submission date (newest first)
    return [...this.applications].sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  }

  async getApplicationById(id: string): Promise<TeacherApplication | null> {
    await this.delay();
    
    if (!this.isAuthenticated) {
      throw new Error('Unauthorized');
    }

    return this.applications.find(app => app.id === id) || null;
  }

  async approveApplication(applicationId: string): Promise<void> {
    await this.delay();
    
    if (!this.isAuthenticated) {
      throw new Error('Unauthorized');
    }

    const applicationIndex = this.applications.findIndex(app => app.id === applicationId);
    if (applicationIndex === -1) {
      throw new Error('Application not found');
    }

    this.applications[applicationIndex] = {
      ...this.applications[applicationIndex],
      status: 'approved',
      reviewedAt: new Date(),
      reviewedBy: this.currentAdmin?.username || 'admin'
    };

    // In a real app, this would also create a teacher account
    console.log(`Application ${applicationId} approved - Teacher account would be created`);
  }

  async rejectApplication(applicationId: string, reason: string): Promise<void> {
    await this.delay();
    
    if (!this.isAuthenticated) {
      throw new Error('Unauthorized');
    }

    const applicationIndex = this.applications.findIndex(app => app.id === applicationId);
    if (applicationIndex === -1) {
      throw new Error('Application not found');
    }

    this.applications[applicationIndex] = {
      ...this.applications[applicationIndex],
      status: 'rejected',
      reviewedAt: new Date(),
      reviewedBy: this.currentAdmin?.username || 'admin',
      rejectionReason: reason
    };

    // In a real app, this would send a rejection email
    console.log(`Application ${applicationId} rejected: ${reason}`);
  }

  async updateApplicationStatus(applicationId: string, status: ApplicationStatus, notes?: string): Promise<void> {
    await this.delay();
    
    if (!this.isAuthenticated) {
      throw new Error('Unauthorized');
    }

    const applicationIndex = this.applications.findIndex(app => app.id === applicationId);
    if (applicationIndex === -1) {
      throw new Error('Application not found');
    }

    this.applications[applicationIndex] = {
      ...this.applications[applicationIndex],
      status,
      reviewedAt: new Date(),
      reviewedBy: this.currentAdmin?.username || 'admin',
      notes
    };
  }

  async getApplicationStats(): Promise<{
    total: number;
    pending: number;
    underReview: number;
    approved: number;
    rejected: number;
  }> {
    await this.delay();
    
    if (!this.isAuthenticated) {
      throw new Error('Unauthorized');
    }

    return {
      total: this.applications.length,
      pending: this.applications.filter(app => app.status === 'pending').length,
      underReview: this.applications.filter(app => app.status === 'under_review').length,
      approved: this.applications.filter(app => app.status === 'approved').length,
      rejected: this.applications.filter(app => app.status === 'rejected').length
    };
  }
}

export const adminService = new AdminService();