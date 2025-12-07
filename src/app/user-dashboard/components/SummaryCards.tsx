import Icon from '@/components/ui/AppIcon';

interface SummaryCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
  change?: string;
}

interface SummaryCardsProps {
  cards: SummaryCard[];
}

export default function SummaryCards({ cards }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-card rounded-xl shadow-card border border-border p-6 hover:shadow-elevation transition-shadow duration-150"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`${card.bgColor} p-3 rounded-lg`}>
              <Icon
                name={card.icon as any}
                size={24}
                className={card.color}
              />
            </div>
            {card.change && (
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded">
                {card.change}
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">{card.title}</h3>
          <p className="text-3xl font-bold text-foreground">{card.value}</p>
        </div>
      ))}
    </div>
  );
}