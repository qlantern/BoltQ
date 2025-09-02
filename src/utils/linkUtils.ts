// Utility functions for internal linking and SEO

export interface LinkAttributes {
  href?: string;
  title?: string;
  'aria-label'?: string;
  rel?: string;
  target?: string;
}

// Generate SEO-friendly anchor text variations
export const generateAnchorTextVariations = (
  baseText: string,
  context: 'teacher' | 'search' | 'booking' | 'general'
): string[] => {
  const variations: string[] = [];

  switch (context) {
    case 'teacher':
      variations.push(
        `${baseText}`,
        `Learn with ${baseText}`,
        `Book lessons with ${baseText}`,
        `${baseText}'s teaching profile`,
        `View ${baseText}'s qualifications`
      );
      break;
    
    case 'search':
      variations.push(
        'Find English teachers in Algeria',
        'Browse qualified instructors',
        'Search Algerian English tutors',
        'Discover local teachers',
        'Explore teacher profiles'
      );
      break;
    
    case 'booking':
      variations.push(
        'Book English lessons',
        'Schedule your first lesson',
        'Reserve a class today',
        'Start learning English',
        'Book now'
      );
      break;
    
    case 'general':
      variations.push(
        baseText,
        `Learn more about ${baseText}`,
        `Explore ${baseText}`,
        `Get started with ${baseText}`
      );
      break;
  }

  return variations;
};

// Generate proper link attributes for accessibility and SEO
export const generateLinkAttributes = (
  targetView: string,
  anchorText: string,
  description?: string
): LinkAttributes => {
  const attributes: LinkAttributes = {
    title: description || anchorText,
    'aria-label': description || anchorText,
  };

  // Add specific attributes based on link type
  if (targetView.includes('external')) {
    attributes.target = '_blank';
    attributes.rel = 'noopener noreferrer';
  }

  return attributes;
};

// URL structure recommendations for future implementation
export const urlStructure = {
  // Main pages
  home: '/',
  search: '/teachers',
  teacherProfile: '/teachers/:id/:name',
  becomeTeacher: '/become-teacher',
  
  // Authentication
  signup: '/signup',
  signin: '/signin',
  
  // Dashboards
  studentDashboard: '/student/dashboard',
  teacherDashboard: '/teacher/dashboard',
  adminDashboard: '/admin/dashboard',
  
  // Specialized searches (for future SEO pages)
  ieltsTeachers: '/teachers/ielts-preparation',
  businessEnglish: '/teachers/business-english',
  conversationClasses: '/teachers/conversation',
  onlineClasses: '/teachers/online',
  offlineClasses: '/teachers/offline',
  
  // Location-based (for future implementation)
  algiersTeachers: '/teachers/algiers',
  oranTeachers: '/teachers/oran',
  constantineTeachers: '/teachers/constantine',
  
  // Static pages (for future implementation)
  about: '/about',
  howItWorks: '/how-it-works',
  pricing: '/pricing',
  faq: '/faq',
  contact: '/contact',
  terms: '/terms',
  privacy: '/privacy'
};

// Best practices for internal linking
export const linkingBestPractices = {
  // Use descriptive anchor text
  anchorText: {
    good: ['Find IELTS teachers in Algeria', 'Book Business English lessons', 'Sarah Johnson - English teacher'],
    avoid: ['Click here', 'Read more', 'Link']
  },
  
  // Optimal link density (2-5% of total content)
  linkDensity: {
    recommended: '2-5%',
    maximum: '10%'
  },
  
  // Link placement priorities
  placement: {
    high: ['Navigation menu', 'Content body', 'Related content sections'],
    medium: ['Sidebar', 'Footer', 'Breadcrumbs'],
    low: ['Author bio', 'Social sharing']
  },
  
  // Link attributes for accessibility
  accessibility: {
    required: ['aria-label for icon-only links', 'title for additional context'],
    recommended: ['descriptive text', 'focus indicators', 'keyboard navigation']
  }
};

// Generate structured data for breadcrumbs (for future SEO implementation)
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};