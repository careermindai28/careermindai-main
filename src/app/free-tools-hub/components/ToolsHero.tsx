import Icon from '@/components/ui/AppIcon';

interface ToolsHeroProps {
  className?: string;
}

const ToolsHero = ({ className = '' }: ToolsHeroProps) => {
  return (
    <div className={`bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-xl border border-border p-8 lg:p-12 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Icon name="WrenchScrewdriverIcon" size={16} />
          <span>Free Career Tools</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Powerful Tools to Boost Your Career
        </h1>
        
        <p className="text-lg text-text-secondary mb-8">
          Access professional-grade career utilities completely free. Analyze job descriptions, optimize your resume, and improve your chances of landing interviews.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="text-3xl font-bold text-primary mb-1">2,847</div>
            <div className="text-sm text-text-secondary">Analyses Today</div>
          </div>
          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="text-3xl font-bold text-accent mb-1">50K+</div>
            <div className="text-sm text-text-secondary">Active Users</div>
          </div>
          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="text-3xl font-bold text-secondary mb-1">100%</div>
            <div className="text-sm text-text-secondary">Free Forever</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsHero;