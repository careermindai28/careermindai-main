'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'in-progress':
        return 'bg-warning/10 text-warning';
      case 'pending':
        return 'bg-muted text-text-secondary';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (!isHydrated) {
      return timestamp;
    }
    return timestamp;
  };

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-150">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="ClockIcon" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No recent activity</p>
            <p className="text-sm text-text-secondary mt-1">Start using our tools to see your activity here</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted transition-colors duration-150"
            >
              <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                <Icon
                  name={activity.icon as any}
                  size={20}
                  className="text-primary"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{activity.title}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(activity.status)} flex-shrink-0`}>
                    {getStatusLabel(activity.status)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{activity.description}</p>
                <span className="text-xs text-text-secondary">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}