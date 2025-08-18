# TeachBnB - English Teacher Booking Platform

A modern, comprehensive platform for connecting English teachers with students, built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### For Students
- **Advanced Search & Filtering** - Find teachers by specialty, price, availability, and location
- **Interactive Booking System** - Multi-step booking flow with calendar integration
- **Teacher Profiles** - Detailed profiles with reviews, qualifications, and teaching styles
- **Class Types** - Choose between online and offline lessons
- **Real-time Availability** - See teacher availability and book instantly

### For Teachers
- **Professional Profiles** - Showcase qualifications, experience, and teaching specialties
- **Flexible Pricing** - Set rates from 500-3000+ DZD per hour
- **Class Management** - Offer both online and offline classes
- **Student Reviews** - Build reputation through student feedback

### Platform Features
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Smooth Animations** - Professional UI with micro-interactions
- **Multi-language Support** - Teachers can specify languages they speak
- **Secure Booking** - Complete booking flow with confirmation system

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
- **BookingModal** - Multi-step booking system
- **FilterSidebar** - Advanced filtering options
- **SearchResults** - Teacher search and filtering interface

### Features
- **Animated Booking Flow** - 4-step booking process with progress indicators
- **Interactive Calendar** - Date and time slot selection
- **Real-time Validation** - Form validation with visual feedback
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
│   ├── BookingModal.tsx # Booking system
│   ├── FilterSidebar.tsx # Search filters
│   └── SearchResults.tsx # Search interface
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
- Multi-step modal with progress tracking
- Calendar integration with availability checking
- Dynamic pricing calculation
- Form validation and error handling
- Confirmation and next steps

### Teacher Profiles
- Comprehensive teacher information
- Reviews and ratings system
- Education and certification display
- Class type indicators (online/offline)
- Booking integration

### Search & Filtering
- Advanced filter sidebar
- Real-time search results
- Sorting options
- Responsive grid layout
- Pagination support

## 🌍 Localization

The platform is designed for the Algerian market:
- **Currency**: Algerian Dinar (DZD)
- **Pricing**: 500, 1000, 1500, 2000, 3000+ DZD per hour
- **Locations**: Major Algerian cities (Algiers, Oran, Constantine)
- **Languages**: Support for multiple languages including Arabic

## 🚀 Future Enhancements

- User authentication and profiles
- Real-time messaging system
- Payment integration
- Video call integration for online classes
- Teacher dashboard and analytics
- Student progress tracking
- Mobile app development
- Multi-language interface

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

---

Built with ❤️ for the English learning community in Algeria