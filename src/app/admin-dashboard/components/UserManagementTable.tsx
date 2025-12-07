'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface User {
  id: number;
  name: string;
  email: string;
  plan: 'Free' | 'Starter' | 'Pro';
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
}

interface UserManagementTableProps {
  users: User[];
}

const UserManagementTable = ({ users }: UserManagementTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: User['status']) => {
    const colorMap = {
      Active: 'bg-success/10 text-success',
      Inactive: 'bg-muted text-text-secondary',
      Suspended: 'bg-error/10 text-error',
    };
    return colorMap[status];
  };

  const getPlanColor = (plan: User['plan']) => {
    const colorMap = {
      Free: 'bg-muted text-text-secondary',
      Starter: 'bg-primary/10 text-primary',
      Pro: 'bg-secondary/10 text-secondary',
    };
    return colorMap[plan];
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h3 className="text-lg font-semibold text-foreground">User Management</h3>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Icon
                name="MagnifyingGlassIcon"
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-4 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Plans</option>
              <option value="Free">Free</option>
              <option value="Starter">Starter</option>
              <option value="Pro">Pro</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-text-secondary">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(user.plan)}`}
                  >
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">{user.joinDate}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:text-primary/80 transition-colors duration-150">
                    <Icon name="EllipsisVerticalIcon" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-border flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{' '}
          {filteredUsers.length} users
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Previous
          </button>
          <span className="text-sm text-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;