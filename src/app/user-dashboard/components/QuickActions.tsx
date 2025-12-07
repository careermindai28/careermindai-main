import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="group flex items-start space-x-4 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-150"
          >
            <div className={`${action.color} p-3 rounded-lg flex-shrink-0`}>
              <Icon
                name={action.icon as any}
                size={24}
                className="text-white"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-150 mb-1">
                {action.title}
              </h3>
              <p className="text-xs text-text-secondary line-clamp-2">
                {action.description}
              </p>
            </div>
            <Icon
              name="ChevronRightIcon"
              size={20}
              className="text-text-secondary group-hover:text-primary transition-colors duration-150 flex-shrink-0"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}