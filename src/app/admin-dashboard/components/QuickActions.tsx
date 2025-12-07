import Icon from '@/components/ui/AppIcon';

interface QuickAction {
  id: number;
  label: string;
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions = ({ actions }: QuickActionsProps) => {
  const colorClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    success: 'bg-success hover:bg-success/90 text-success-foreground',
    warning: 'bg-warning hover:bg-warning/90 text-warning-foreground',
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-150 shadow-card hover:shadow-elevation ${colorClasses[action.color]}`}
          >
            <Icon name={action.icon as any} size={20} />
            <span className="text-sm">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;