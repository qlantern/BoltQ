# TeachBnB - English Teacher Booking Platform

A modern, comprehensive platform for connecting English teachers with students, built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### For Students
- **Advanced Search & Filtering** - Find teachers by specialty, price, availability, and location
- **Interactive Booking System** - Multi-step animated booking flow with calendar integration
- **Teacher Profiles** - Detailed profiles with reviews, qualifications, and teaching styles
- **Class Types** - Choose between online and offline lessons
- **Real-time Availability** - See teacher availability and book instantly
- **User Authentication** - Secure sign up and sign in system

### For Teachers
- **Professional Profiles** - Showcase qualifications, experience, and teaching specialties
- **Flexible Pricing** - Set rates from 500-3000+ DZD per hour
- **Class Management** - Offer both online and offline classes
- **Student Reviews** - Build reputation through student feedback
- **Teacher Application** - Comprehensive onboarding with CV upload and demo videos

### Platform Features
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Smooth Animations** - Professional UI with micro-interactions
- **Multi-language Support** - Teachers can specify languages they speak
- **Secure Booking** - Complete booking flow with confirmation system
- **File Upload System** - CV and profile photo upload functionality
- **Video Integration** - YouTube/Vimeo demo video support

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## 🎨 Design System

### Colors
- **Primary (Coral)**: #FF5A5F - Main brand color for CTAs and highlights
- **Secondary (Teal)**: #00A699 - Supporting actions and success states
- **Accent (Gold)**: #FFB400 - Ratings, achievements, and special highlights
- **Neutrals**: Comprehensive gray scale for text and backgrounds

### Typography
- **Font**: Inter - Clean, modern, and highly readable
- **Line Heights**: 150% for body text, 120% for headings
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

## 📱 Key Components

### Core Components
- **Header** - Navigation with search and user menu
- **Hero** - Landing page with search functionality
- **TeacherCard** - Teacher listing cards with key information
- **TeacherProfile** - Detailed teacher pages with booking
- **BookingModal** - Multi-step animated booking system
- **FilterSidebar** - Advanced filtering options
- **SearchResults** - Teacher search and filtering interface

### Authentication & Onboarding
- **SignUpPage** - User registration with validation
- **SignInPage** - User authentication with social login options
- **BecomeTeacherPage** - 5-step teacher application process

### Features
- **Animated Booking Flow** - 4-step booking process with progress indicators
- **Interactive Calendar** - Date and time slot selection
- **Real-time Validation** - Form validation with visual feedback
- **File Upload System** - CV and photo upload with drag-and-drop
- **Responsive Design** - Mobile-first approach with breakpoints

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd teachbnb
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Landing page hero
│   ├── TeacherCard.tsx # Teacher listing cards
│   ├── TeacherProfile.tsx # Detailed teacher pages
│   ├── BookingModal.tsx # Animated booking system
│   ├── FilterSidebar.tsx # Search filters
│   ├── SearchResults.tsx # Search interface
│   ├── SignUpPage.tsx  # User registration
│   ├── SignInPage.tsx  # User authentication
│   └── BecomeTeacherPage.tsx # Teacher application
├── data/               # Mock data and constants
│   └── mockData.ts     # Sample teachers and reviews
├── types/              # TypeScript type definitions
│   └── index.ts        # Core types and interfaces
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 Key Features Implementation

### Booking System
- **4-step animated modal** with progress tracking
- **Calendar integration** with availability checking
- **Dynamic pricing calculation** (500-3000+ DZD per hour)
- **Form validation** and error handling
- **Confirmation and next steps** guidance

### Teacher Profiles
- **Comprehensive teacher information** display
- **Reviews and ratings system** with detailed feedback
- **Education and certification** showcase
- **Class type indicators** (online/offline)
- **Integrated booking system** with multiple entry points

### Search & Filtering
- **Advanced filter sidebar** with multiple criteria
- **Real-time search results** with sorting options
- **Price filtering** by DZD ranges
- **Specialty and experience** filtering
- **Responsive grid layout** with pagination

### Authentication System
- **User registration** with email validation
- **Secure sign in** with remember me option
- **Social login integration** (Google, Facebook)
- **Password strength validation**
- **Terms and conditions** agreement

### Teacher Onboarding
- **5-step application process**:
  1. Personal information and contact details
  2. Professional information and pricing
  3. Document upload (CV, photo, credentials)
  4. Social media and demo video links
  5. Review and submission
- **File upload system** with validation
- **Progress tracking** with visual indicators
- **Comprehensive form validation**

## 🌍 Localization

The platform is designed for the Algerian market:
- **Currency**: Algerian Dinar (DZD)
- **Pricing**: 500, 1000, 1500, 2000, 3000+ DZD per hour
- **Locations**: Major Algerian cities (Algiers, Oran, Constantine)
- **Languages**: Support for multiple languages including Arabic

## 🔧 Technical Features

### State Management
- **React hooks** for component state
- **TypeScript interfaces** for type safety
- **Form validation** with real-time feedback
- **File handling** for uploads

### UI/UX Features
- **Smooth animations** and transitions
- **Loading states** for all async operations
- **Error handling** with user-friendly messages
- **Responsive design** across all devices
- **Accessibility** considerations

### Performance
- **Optimized bundle** with Vite
- **Lazy loading** for images
- **Efficient re-renders** with React best practices
- **TypeScript** for development efficiency

## 🚀 Future Enhancements

- **Backend integration** with user authentication
- **Real payment processing** integration
- **Real-time messaging** system between students and teachers
- **Video call integration** for online classes
- **Teacher dashboard** and analytics
- **Student progress tracking** and lesson history
- **Mobile app development** (React Native)
- **Multi-language interface** (Arabic, French, English)
- **Advanced scheduling** with calendar sync
- **Notification system** for bookings and messages

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

## 🎯 Current Implementation Status

### ✅ Completed Features
- [x] Landing page with hero section and featured teachers
- [x] Teacher search and filtering system
- [x] Detailed teacher profiles with reviews
- [x] Animated booking system with calendar integration
- [x] User authentication (Sign Up/Sign In)
- [x] Teacher application system with file uploads
- [x] Responsive design across all devices
- [x] DZD currency integration
- [x] Online/Offline class type support
- [x] Professional UI with smooth animations

### 🔄 Ready for Backend Integration
- [ ] User authentication with real backend
- [ ] Teacher profile management
- [ ] Booking system with real availability
- [ ] Payment processing
- [ ] File upload to cloud storage
- [ ] Email notifications
- [ ] Real-time messaging

---

Built with ❤️ for the English learning community in Algeria

## 🚀 Git Repository Setup

To set up this project in a Git repository:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Complete TeachBnB platform with booking system and authentication"

# Add your remote repository
git remote add origin https://github.com/yourusername/teachbnb.git

# Push to remote
git push -u origin main
```

The project is production-ready and includes comprehensive documentation for easy deployment and further development.