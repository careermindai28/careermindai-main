import Icon from '@/components/ui/AppIcon';

interface TrustSignal {
  icon: string;
  title: string;
  description: string;
}

interface TrustSignalsProps {
  signals: TrustSignal[];
}

const TrustSignals = ({ signals }: TrustSignalsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {signals.map((signal, index) => (
        <div
          key={index}
          className="bg-surface rounded-xl border border-border p-6 text-center hover:shadow-card transition-all duration-300"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Icon
              name={signal.icon as any}
              size={24}
              className="text-primary"
            />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {signal.title}
          </h3>
          <p className="text-sm text-text-secondary">{signal.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustSignals;