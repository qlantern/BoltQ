import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Copy,
  Star,
  Users,
  DollarSign,
  MapPin,
  Video,
  Clock,
  BookOpen,
  Camera,
  Upload,
  Tag,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import ClassModal from './ClassModal';
import GroupEnrollmentModal from './GroupEnrollmentModal';

interface ClassListing {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  type: 'individual' | 'group' | 'workshop';
  format: 'online' | 'offline' | 'both';
  price: {
    individual: number;
    group?: number;
    package?: {
      sessions: number;
      price: number;
      discount: number;
    };
  };
  duration: number;
  maxStudents?: number;
  currentEnrollment?: number;
  location?: string;
  images: string[];
  isActive: boolean;
  rating: number;
  totalBookings: number;
  createdAt: Date;
  tags: string[];
}

const ListingManagement: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<ClassListing | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'active' | 'inactive'>('all');
  const [classTypeFilter, setClassTypeFilter] = useState<'all' | 'individual' | 'group'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set());

  const [listings, setListings] = useState<ClassListing[]>([
    {
      id: '1',
      title: 'Business English Mastery',
      description: 'Comprehensive business English course covering presentations, meetings, negotiations, and professional communication.',
      subject: 'Business English',
      level: 'Intermediate to Advanced',
      type: 'individual',
      format: 'both',
      price: {
        individual: 2000,
        package: {
          sessions: 10,
          price: 18000,
          discount: 10
        }
      },
      duration: 60,
      location: 'Central London or Online',
      images: [
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      ],
      isActive: true,
      rating: 4.9,
      totalBookings: 127,
      createdAt: new Date('2024-01-01'),
      tags: ['Business', 'Professional', 'Presentations', 'Meetings', 'Negotiations', 'Corporate']
    },
    {
      id: '2',
      title: 'IELTS Preparation Intensive',
      description: 'Intensive IELTS preparation focusing on all four skills: Reading, Writing, Listening, and Speaking.',
      subject: 'IELTS Preparation',
      level: 'All Levels',
      type: 'individual',
      format: 'online',
      price: {
        individual: 2500,
        package: {
          sessions: 8,
          price: 18000,
          discount: 10
        }
      },
      duration: 90,
      images: [
        'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      ],
      isActive: true,
      rating: 4.8,
      totalBookings: 89,
      createdAt: new Date('2024-01-15'),
      tags: ['IELTS', 'Test Prep', 'Academic', 'Intensive', 'Speaking', 'Writing']
    },
    {
      id: '3',
      title: 'Conversational English Workshop',
      description: 'Fun and interactive group sessions to improve speaking confidence and fluency in everyday situations.',
      subject: 'Conversation',
      level: 'Beginner to Intermediate',
      type: 'group',
      format: 'both',
      price: {
        individual: 1500,
        group: 800
      },
      duration: 90,
      maxStudents: 6,
      currentEnrollment: 4,
      location: 'Community Center or Online',
      images: [
        'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      ],
      isActive: true,
      rating: 4.7,
      totalBookings: 45,
      createdAt: new Date('2024-02-01'),
      tags: ['Conversation', 'Group', 'Speaking', 'Confidence', 'Interactive', 'Fun']
    },
    {
      id: '4',
      title: 'Advanced Grammar Masterclass',
      description: 'Deep dive into complex English grammar structures for advanced learners.',
      subject: 'Grammar',
      level: 'Advanced',
      type: 'group',
      format: 'online',
      price: {
        individual: 1800,
        group: 900
      },
      duration: 120,
      maxStudents: 8,
      currentEnrollment: 6,
      images: [
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      ],
      isActive: false,
      rating: 4.6,
      totalBookings: 32,
      createdAt: new Date('2024-01-20'),
      tags: ['Grammar', 'Advanced', 'Structures', 'Complex']
    }
  ]);

  const filteredListings = listings.filter(listing => {
    const matchesFilter = filterType === 'all' || 
      (filterType === 'active' && listing.isActive) ||
      (filterType === 'inactive' && !listing.isActive);
    
    const matchesClassType = classTypeFilter === 'all' || listing.type === classTypeFilter;
    
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesClassType && matchesSearch;
  });

  const toggleListingStatus = (id: string) => {
    setListings(prev => prev.map(listing => 
      listing.id === id ? { ...listing, isActive: !listing.isActive } : listing
    ));
  };

  const duplicateListing = (listing: ClassListing) => {
    const newListing = {
      ...listing,
      id: Date.now().toString(),
      title: `${listing.title} (Copy)`,
      totalBookings: 0,
      createdAt: new Date()
    };
    setListings(prev => [newListing, ...prev]);
  };

  const handleEditListing = (listing: ClassListing) => {
    setSelectedListing(listing);
    setShowEditModal(true);
  };

  const handleViewEnrollment = (listing: ClassListing) => {
    setSelectedListing(listing);
    setShowEnrollmentModal(true);
  };

  const handleSaveListing = (classData: any) => {
    if (classData.id) {
      // Update existing listing
      setListings(prev => prev.map(listing => 
        listing.id === classData.id ? { ...listing, ...classData } : listing
      ));
    } else {
      // Create new listing
      const newListing = {
        ...classData,
        id: Date.now().toString(),
        isActive: true,
        rating: 0,
        totalBookings: 0,
        createdAt: new Date()
      };
      setListings(prev => [newListing, ...prev]);
    }
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedListing(null);
  };

  const toggleExpandedTags = (listingId: string) => {
    setExpandedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(listingId)) {
        newSet.delete(listingId);
      } else {
        newSet.add(listingId);
      }
      return newSet;
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600 mt-1">Manage your class listings and pricing</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Class
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-coral-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Listings</p>
              <p className="text-2xl font-bold text-green-600">
                {listings.filter(l => l.isActive).length}
              </p>
            </div>
            <Eye className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-blue-600">
                {listings.reduce((sum, l) => sum + l.totalBookings, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-yellow-600">
                {(listings.reduce((sum, l) => sum + l.rating, 0) / listings.length).toFixed(1)}
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                filterType === 'all' 
                  ? 'bg-coral-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Classes ({listings.length})
            </button>
            <button
              onClick={() => setFilterType('active')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                filterType === 'active' 
                  ? 'bg-coral-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({listings.filter(l => l.isActive).length})
            </button>
            <button
              onClick={() => setFilterType('inactive')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                filterType === 'inactive' 
                  ? 'bg-coral-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inactive ({listings.filter(l => !l.isActive).length})
            </button>
            
            {/* Class Type Filter */}
            <div className="border-l border-gray-300 pl-2 ml-2">
              <button
                onClick={() => setClassTypeFilter('all')}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  classTypeFilter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setClassTypeFilter('individual')}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ml-2 ${
                  classTypeFilter === 'individual' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Individual ({listings.filter(l => l.type === 'individual').length})
              </button>
              <button
                onClick={() => setClassTypeFilter('group')}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ml-2 ${
                  classTypeFilter === 'group' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Group ({listings.filter(l => l.type === 'group').length})
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Image */}
            <div className="relative h-48">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  listing.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {listing.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="bg-white/90 text-gray-800 px-2 py-1 text-xs font-medium rounded-full capitalize">
                  {listing.type}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {listing.title}
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{listing.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {listing.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {listing.subject} • {listing.level}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {listing.duration} minutes
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  {listing.format === 'online' ? (
                    <Video className="h-4 w-4 mr-2" />
                  ) : listing.format === 'offline' ? (
                    <MapPin className="h-4 w-4 mr-2" />
                  ) : (
                    <Globe className="h-4 w-4 mr-2" />
                  )}
                  {listing.format === 'both' ? 'Online & Offline' : listing.format}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {listing.type === 'group' && listing.maxStudents ? (
                    <span>
                      {listing.currentEnrollment || 0}/{listing.maxStudents} enrolled
                      {listing.type === 'group' && (
                        <button
                          onClick={() => handleViewEnrollment(listing)}
                          className="ml-2 text-blue-600 hover:text-blue-800 text-xs underline"
                        >
                          View Details
                        </button>
                      )}
                    </span>
                  ) : (
                    `${listing.totalBookings} bookings`
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {listing.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-coral-100 text-coral-700 px-2 py-1 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {listing.tags.length > 3 && (
                  <button
                    onClick={() => toggleExpandedTags(listing.id)}
                    className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-full hover:bg-gray-200 flex items-center"
                  >
                    {expandedTags.has(listing.id) ? (
                      <>
                        <ChevronUp className="h-3 w-3 mr-1" />
                        Show less
                      </>
                    ) : (
                      <>
                        +{listing.tags.length - 3} more
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Expanded Tags */}
              {expandedTags.has(listing.id) && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {listing.tags.slice(3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-coral-100 text-coral-700 px-2 py-1 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Group Enrollment Status */}
              {listing.type === 'group' && listing.maxStudents && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Enrollment Status</span>
                    <span className="text-sm text-blue-700">
                      {listing.currentEnrollment || 0}/{listing.maxStudents} spots filled
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${((listing.currentEnrollment || 0) / listing.maxStudents) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-blue-700 mt-1">
                    {listing.maxStudents - (listing.currentEnrollment || 0)} spots remaining
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      {listing.type === 'group' && listing.price.group 
                        ? listing.price.group 
                        : listing.price.individual} DZD
                    </span>
                    <span className="text-sm text-gray-600">
                      /{listing.type === 'group' ? 'student' : 'session'}
                    </span>
                  </div>
                  {listing.price.package && (
                    <div className="text-right">
                      <div className="text-sm text-green-600 font-medium">
                        Package: {listing.price.package.price} DZD
                      </div>
                      <div className="text-xs text-gray-500">
                        {listing.price.package.sessions} sessions • {listing.price.package.discount}% off
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditListing(listing)}
                    className="p-2 text-gray-600 hover:text-coral-500 hover:bg-coral-50 rounded-lg"
                    title="Edit"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => duplicateListing(listing)}
                    className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg"
                    title="Duplicate"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => toggleListingStatus(listing.id)}
                  className={`flex items-center px-3 py-1 text-sm rounded-lg transition-colors ${
                    listing.isActive
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {listing.isActive ? (
                    <>
                      <EyeOff className="h-3 w-3 mr-1" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Eye className="h-3 w-3 mr-1" />
                      Activate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery ? 'Try adjusting your search terms' : 'Create your first class to get started'}
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 mx-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Class
          </button>
        </div>
      )}

      {/* Create Class Modal */}
      <ClassModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveListing}
      />

      {/* Edit Class Modal */}
      <ClassModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedListing(null);
        }}
        onSave={handleSaveListing}
        editingClass={selectedListing}
      />

      {/* Group Enrollment Modal */}
      <GroupEnrollmentModal
        isOpen={showEnrollmentModal}
        onClose={() => {
          setShowEnrollmentModal(false);
          setSelectedListing(null);
        }}
        listing={selectedListing}
      />
    </div>
  );
};

export default ListingManagement;