import type { Metadata } from 'next';
import AdminNavigation from '@/components/common/AdminNavigation';
import Breadcrumb from '@/components/common/Breadcrumb';
import AdminDashboardInteractive from './components/AdminDashboardInteractive';

export const metadata: Metadata = {
  title: 'Admin Dashboard - CareerMindAI',
  description: 'Comprehensive platform oversight with analytics, user management, and content control for CareerMindAI administrators.',
};

interface Metrics {
  totalUsers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  conversionRate: number;
}

interface Activity {
  id: number;
  type: 'registration' | 'subscription' | 'upgrade' | 'cancellation';
  user: string;
  action: string;
  timestamp: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  plan: 'Free' | 'Starter' | 'Pro';
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
}

interface RevenueData {
  month: string;
  revenue: number;
  subscriptions: number;
}

interface HealthMetric {
  id: number;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  value: string;
  threshold: string;
}

const mockMetrics: Metrics = {
  totalUsers: 12847,
  activeSubscriptions: 3256,
  monthlyRevenue: 4875000,
  conversionRate: 25.3,
};

const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'registration',
    user: 'Priya Sharma',
    action: 'New user registration',
    timestamp: '2 minutes ago',
  },
  {
    id: 2,
    type: 'subscription',
    user: 'Rahul Verma',
    action: 'Subscribed to Starter plan',
    timestamp: '15 minutes ago',
  },
  {
    id: 3,
    type: 'upgrade',
    user: 'Anjali Patel',
    action: 'Upgraded from Starter to Pro',
    timestamp: '1 hour ago',
  },
  {
    id: 4,
    type: 'registration',
    user: 'Vikram Singh',
    action: 'New user registration',
    timestamp: '2 hours ago',
  },
  {
    id: 5,
    type: 'cancellation',
    user: 'Neha Gupta',
    action: 'Cancelled Starter subscription',
    timestamp: '3 hours ago',
  },
];

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    plan: 'Pro',
    status: 'Active',
    joinDate: '15/11/2025',
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    plan: 'Starter',
    status: 'Active',
    joinDate: '20/11/2025',
  },
  {
    id: 3,
    name: 'Rajesh Mehta',
    email: 'rajesh.mehta@example.com',
    plan: 'Free',
    status: 'Active',
    joinDate: '22/11/2025',
  },
  {
    id: 4,
    name: 'Pooja Desai',
    email: 'pooja.desai@example.com',
    plan: 'Pro',
    status: 'Active',
    joinDate: '25/11/2025',
  },
  {
    id: 5,
    name: 'Karan Joshi',
    email: 'karan.joshi@example.com',
    plan: 'Starter',
    status: 'Inactive',
    joinDate: '28/11/2025',
  },
  {
    id: 6,
    name: 'Divya Nair',
    email: 'divya.nair@example.com',
    plan: 'Free',
    status: 'Active',
    joinDate: '29/11/2025',
  },
  {
    id: 7,
    name: 'Arjun Kapoor',
    email: 'arjun.kapoor@example.com',
    plan: 'Pro',
    status: 'Active',
    joinDate: '30/11/2025',
  },
  {
    id: 8,
    name: 'Meera Iyer',
    email: 'meera.iyer@example.com',
    plan: 'Starter',
    status: 'Suspended',
    joinDate: '01/12/2025',
  },
  {
    id: 9,
    name: 'Sanjay Rao',
    email: 'sanjay.rao@example.com',
    plan: 'Free',
    status: 'Active',
    joinDate: '01/12/2025',
  },
  {
    id: 10,
    name: 'Kavita Bose',
    email: 'kavita.bose@example.com',
    plan: 'Pro',
    status: 'Active',
    joinDate: '01/12/2025',
  },
];

const mockRevenueData: RevenueData[] = [
  { month: 'Jul', revenue: 3250000, subscriptions: 2100 },
  { month: 'Aug', revenue: 3680000, subscriptions: 2350 },
  { month: 'Sep', revenue: 4120000, subscriptions: 2680 },
  { month: 'Oct', revenue: 4450000, subscriptions: 2920 },
  { month: 'Nov', revenue: 4875000, subscriptions: 3256 },
  { month: 'Dec', revenue: 5200000, subscriptions: 3500 },
];

const mockHealthMetrics: HealthMetric[] = [
  {
    id: 1,
    name: 'Server Uptime',
    status: 'healthy',
    value: '99.98%',
    threshold: '99.9%',
  },
  {
    id: 2,
    name: 'API Response Time',
    status: 'healthy',
    value: '145ms',
    threshold: '200ms',
  },
  {
    id: 3,
    name: 'Error Rate',
    status: 'warning',
    value: '0.08%',
    threshold: '0.1%',
  },
  {
    id: 4,
    name: 'Database Load',
    status: 'healthy',
    value: '62%',
    threshold: '80%',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminNavigation />
      <main className="flex-1 lg:ml-72">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Breadcrumb />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary">
              Monitor platform performance, manage users, and oversee system health
            </p>
          </div>

          <AdminDashboardInteractive
            metrics={mockMetrics}
            activities={mockActivities}
            users={mockUsers}
            revenueData={mockRevenueData}
            healthMetrics={mockHealthMetrics}
          />
        </div>
      </main>
    </div>
  );
}