import React from 'react';
import TeacherCard from './TeacherCard';
import { Teacher } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedTeachersCarouselProps {
  teachers: Teacher[];
  onTeacherSelect: (teacher: Teacher) => void;
  onFavorite: (teacherId: string) => void;
  favoritedTeachers: Set<string>;
}

const CARD_WIDTH = 320;
const VISIBLE_CARDS = 3;

const FeaturedTeachersCarousel: React.FC<FeaturedTeachersCarouselProps> = ({
  teachers,
  onTeacherSelect,
  onFavorite,
  favoritedTeachers,
}) => {
  const [startIndex, setStartIndex] = React.useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, teachers.length - VISIBLE_CARDS)
    );
  };

  const visibleTeachers = teachers.slice(startIndex, startIndex + VISIBLE_CARDS);

  return (
    <div className="relative w-full flex items-center justify-center">
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="p-2 rounded-full bg-white shadow hover:bg-coral-100 disabled:opacity-50 absolute left-0 z-10 top-1/2 -translate-y-1/2"
        style={{ marginLeft: '0.5rem' }}
      >
        <ChevronLeft className="h-6 w-6 text-coral-500" />
      </button>
      <div className="flex gap-6 justify-center items-stretch w-full">
        {visibleTeachers.map((teacher) => (
          <div
            key={teacher.id}
            style={{ minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH }}
            className="flex-shrink-0"
            onClick={() => onTeacherSelect(teacher)}
          >
            <TeacherCard
              teacher={teacher}
              onFavorite={onFavorite}
              isFavorited={favoritedTeachers.has(teacher.id)}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={startIndex + VISIBLE_CARDS >= teachers.length}
        className="p-2 rounded-full bg-white shadow hover:bg-coral-100 disabled:opacity-50 absolute right-0 z-10 top-1/2 -translate-y-1/2"
        style={{ marginRight: '0.5rem' }}
      >
        <ChevronRight className="h-6 w-6 text-coral-500" />
      </button>
    </div>
  );
};

export default FeaturedTeachersCarousel;
