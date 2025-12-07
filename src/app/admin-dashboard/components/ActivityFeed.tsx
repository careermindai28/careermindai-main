import Icon from '@/components/ui/AppIcon';

interface Activity {
  id: number;
  type: 'registration' | 'subscription' | 'upgrade' | 'cancellation';
  user: string;
  action: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    const iconMap = {
      registration: 'UserPlusIcon',
      subscription: 'CheckCircleIcon',
      upgrade: 'ArrowUpCircleIcon',
      cancellation: 'XCircleIcon',
    };
    return iconMap[type];
  };

  const getActivityColor = (type: Activity['type']) => {
    const colorMap = {
      registration: 'text-primary',
      subscription: 'text-success',
      upgrade: 'text-secondary',
      cancellation: 'text-error',
    };
    return colorMap[type];
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-muted ${getActivityColor(activity.type)}`}>
              <Icon name={getActivityIcon(activity.type) as any} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium">{activity.user}</p>
              <p className="text-sm text-text-secondary">{activity.action}</p>
              <p className="text-xs text-text-secondary mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;