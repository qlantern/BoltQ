import React from 'react';
import { MapPin, Mail, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const algerianCities = [
    'Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Sétif', 'Sidi Bel Abbès'
  ];

  const teachingSpecialties = [
    'Business English', 'IELTS Preparation', 'TOEFL Preparation', 'Conversational English',
    'Academic Writing', 'Kids English', 'Pronunciation', 'Grammar'
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-coral-400">TeachBnB Algeria</h3>
            <p className="text-gray-400 mb-4">
              Connecting English learners with qualified teachers across Algeria. 
              Learn from certified instructors in your city or online.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => onNavigate('search')}
                  className="hover:text-white transition-colors"
                >
                  Find English Teachers in Algeria
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('search')}
                  className="hover:text-white transition-colors"
                >
                  IELTS Preparation Teachers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('search')}
                  className="hover:text-white transition-colors"
                >
                  Business English Instructors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('search')}
                  className="hover:text-white transition-colors"
                >
                  Online English Classes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('search')}
                  className="hover:text-white transition-colors"
                >
                  Offline English Lessons
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('signup')}
                  className="hover:text-white transition-colors"
                >
                  Sign Up as Student
                </button>
              </li>
            </ul>
          </div>

          {/* For Teachers */}
          <div>
            <h4 className="font-semibold mb-4">For Teachers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => onNavigate('become-teacher')}
                  className="hover:text-white transition-colors"
                >
                  Become an English Teacher
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('become-teacher')}
                  className="hover:text-white transition-colors"
                >
                  Teacher Application Process
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('teacher-dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Teacher Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('become-teacher')}
                  className="hover:text-white transition-colors"
                >
                  Teaching Requirements
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('become-teacher')}
                  className="hover:text-white transition-colors"
                >
                  Earn Money Teaching English
                </button>
              </li>
            </ul>
          </div>

          {/* Cities in Algeria */}
          <div>
            <h4 className="font-semibold mb-4">English Teachers by City</h4>
            <ul className="space-y-2 text-gray-400">
              {algerianCities.slice(0, 6).map((city) => (
                <li key={city}>
                  <button 
                    onClick={() => onNavigate('search')}
                    className="hover:text-white transition-colors"
                    title={`Find English teachers in ${city}, Algeria`}
                  >
                    English Teachers in {city}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => onNavigate('search')}
                  className="hover:text-white transition-colors text-coral-400"
                >
                  View All Cities →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact TeachBnB Algeria</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Algiers, Algeria</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:support@teachbnb.dz" className="hover:text-white transition-colors">
                    support@teachbnb.dz
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:+213123456789" className="hover:text-white transition-colors">
                    +213 123 456 789
                  </a>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4">Legal & Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('admin-login')}
                    className="hover:text-white transition-colors"
                  >
                    Admin Access
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 mt-8 pt-8 border-t border-gray-800">
            <p>&copy; 2024 TeachBnB Algeria. All rights reserved.</p>
            <p className="text-sm mt-2">
              Connecting English learners with qualified teachers across Algeria since 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;