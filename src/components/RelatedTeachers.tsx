import React from 'react';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { Teacher } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface RelatedTeachersProps {
  currentTeacher: Teacher;
  allTeachers: Teacher[];
  onTeacherSelect: (teacher: Teacher) => void;
  maxSuggestions?: number;
}

const RelatedTeachers: React.FC<RelatedTeachersProps> = ({
  currentTeacher,
  allTeachers,
  onTeacherSelect,
  maxSuggestions = 3
}) => {
  const { user } = useAuth();

  // Find related teachers based on specialties and location
  const relatedTeachers = allTeachers
    .filter(teacher => teacher.id !== currentTeacher.id)
    .filter(teacher => {
      // Same specialties
      const hasCommonSpecialty = teacher.specialties.some(specialty =>
        currentTeacher.specialties.includes(specialty)
      );
      // Same location (city)
      const sameCity = teacher.location.split(',')[0] === currentTeacher.location.split(',')[0];
      
      return hasCommonSpecialty || sameCity;
    })
    .sort((a, b) => {
      // Prioritize by rating and review count
      return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
    })
    .slice(0, maxSuggestions);

  if (relatedTeachers.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Similar Teachers in Algeria
        </h3>
        <button 
          onClick={() => {/* Navigate to search with filters */}}
          className="text-coral-500 hover:text-coral-600 dark:text-coral-400 dark:hover:text-coral-300 text-sm font-medium flex items-center"
        >
          View all
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {relatedTeachers.map((teacher) => (
          <button
            key={teacher.id}
            onClick={() => onTeacherSelect(teacher)}
            className="w-full flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 text-left"
            aria-label={`View ${teacher.name}'s profile - ${teacher.specialties.join(', ')} teacher in ${teacher.location}`}
          >
            <img
              src={teacher.avatar}
              alt={`${teacher.name} - English teacher`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                {teacher.name}
              </h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-3 w-3" />
                <span>{teacher.location}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {teacher.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {teacher.pricePerHour} DZD/lesson
                </span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </button>
        ))}
      </div>

      {user?.role === 'student' && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Looking for something specific? 
            <button 
              onClick={() => {/* Navigate to search */}}
              className="text-coral-500 hover:text-coral-600 dark:text-coral-400 dark:hover:text-coral-300 ml-1 underline"
            >
              Search all teachers in Algeria
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatedTeachers;