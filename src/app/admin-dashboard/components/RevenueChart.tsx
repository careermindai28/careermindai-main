'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface RevenueData {
  month: string;
  revenue: number;
  subscriptions: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  const [dateRange, setDateRange] = useState('6months');

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-lg font-semibold text-foreground">Revenue Trends</h3>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
          </select>
          <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors duration-150">
            <Icon name="ArrowDownTrayIcon" size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="w-full h-80" aria-label="Revenue Trends Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Bar dataKey="revenue" fill="#2563EB" name="Revenue (₹)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="subscriptions" fill="#0891B2" name="Subscriptions" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;