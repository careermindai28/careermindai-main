'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProgressItem {
  title: string;
  description: string;
  percentage: number;
  icon: string;
  color: string;
}

interface ProgressTrackingProps {
  items: ProgressItem[];
}

export default function ProgressTracking({ items }: ProgressTrackingProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Your Progress</h2>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`${item.color} p-2 rounded-lg flex-shrink-0`}>
                  <Icon
                    name={item.icon as any}
                    size={20}
                    className="text-white"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-text-secondary mt-1">{item.description}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-foreground">{item.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${item.color}`}
                style={{ width: isHydrated ? `${item.percentage}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="LightBulbIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Pro Tip</h4>
            <p className="text-xs text-text-secondary">
              Complete your profile and use all tools to maximize your job search success rate. 
              Users with 100% profile completion get 3x more interview callbacks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}