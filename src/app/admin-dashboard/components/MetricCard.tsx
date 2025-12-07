import Icon from '@/components/ui/AppIcon';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}

const MetricCard = ({ title, value, change, trend, icon, color }: MetricCardProps) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };

  const trendColor = trend === 'up' ? 'text-success' : 'text-error';

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card hover:shadow-elevation transition-shadow duration-150">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-secondary font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
          <div className="flex items-center space-x-1">
            <Icon
              name={trend === 'up' ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'}
              size={16}
              className={trendColor}
            />
            <span className={`text-sm font-medium ${trendColor}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-text-secondary">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon name={icon as any} size={24} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;