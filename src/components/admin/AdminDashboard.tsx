import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Clock, Search, Eye } from 'lucide-react';
import { TeacherApplication, ApplicationStatus } from '../../types/admin';
import { adminService } from '../../services/adminService';
import ApplicationDetailsModal from './ApplicationDetailsModal';

interface AdminDashboardProps {
  onLogout: () => Promise<void>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [applications, setApplications] = useState<TeacherApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<TeacherApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<TeacherApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchQuery, statusFilter]);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getTeacherApplications();
      setApplications(data);
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchQuery) {
      filtered = filtered.filter(app =>
        app.personalInfo.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.personalInfo.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.personalInfo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.professionalInfo.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const handleApprove = async (applicationId: string) => {
    try {
      await adminService.approveApplication(applicationId);
      await loadApplications();
    } catch (error) {
      console.error('Failed to approve application:', error);
    }
  };

  const handleReject = async (applicationId: string, reason: string) => {
    try {
      await adminService.rejectApplication(applicationId, reason);
      await loadApplications();
    } catch (error) {
      console.error('Failed to reject application:', error);
    }
  };

  const handleViewDetails = (application: TeacherApplication) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'under_review': return <Eye className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button
            onClick={() => onLogout?.()}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{applications.length}</p>
            </div>
            <Users className="h-8 w-8 text-coral-500" />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{applications.filter(app => app.status === 'pending').length}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Approved</p>
              <p className="text-3xl font-bold text-green-600">{applications.filter(app => app.status === 'approved').length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Rejected</p>
              <p className="text-3xl font-bold text-red-600">{applications.filter(app => app.status === 'rejected').length}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="under_review">Under Review</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading applications...</div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">No applications found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Teacher Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Specialties</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredApplications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {application.personalInfo.firstName} {application.personalInfo.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {application.personalInfo.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {application.professionalInfo.experience} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {application.professionalInfo.specialties.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)} {application.status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(application)}
                          className="text-coral-600 hover:text-coral-900 mr-4 dark:text-coral-400 dark:hover:text-coral-300"
                        >
                          View
                        </button>
                        {application.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(application.id)}
                              className="text-green-600 hover:text-green-900 mr-4"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(application.id, 'Reason for rejection')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedApplication && (
        <ApplicationDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          application={selectedApplication}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default AdminDashboard;