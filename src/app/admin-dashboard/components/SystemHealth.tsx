'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface HealthMetric {
  id: number;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  value: string;
  threshold: string;
}

interface SystemHealthProps {
  metrics: HealthMetric[];
}

const SystemHealth = ({ metrics }: SystemHealthProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const getStatusColor = (status: HealthMetric['status']) => {
    const colorMap = {
      healthy: 'text-success',
      warning: 'text-warning',
      critical: 'text-error',
    };
    return colorMap[status];
  };

  const getStatusIcon = (status: HealthMetric['status']) => {
    const iconMap = {
      healthy: 'CheckCircleIcon',
      warning: 'ExclamationTriangleIcon',
      critical: 'XCircleIcon',
    };
    return iconMap[status];
  };

  if (!isHydrated) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">System Health</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">System Health</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150">
          View Details
        </button>
      </div>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Icon
                name={getStatusIcon(metric.status) as any}
                size={20}
                className={getStatusColor(metric.status)}
              />
              <div>
                <p className="text-sm font-medium text-foreground">{metric.name}</p>
                <p className="text-xs text-text-secondary mt-1">
                  {metric.value} / {metric.threshold}
                </p>
              </div>
            </div>
            <span
              className={`text-xs font-medium uppercase ${getStatusColor(metric.status)}`}
            >
              {metric.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemHealth;