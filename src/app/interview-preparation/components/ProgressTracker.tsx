'use client';

interface CategoryProgress {
  category: string;
  completed: number;
  total: number;
  icon: string;
}

interface ProgressTrackerProps {
  progress: CategoryProgress[];
}

const ProgressTracker = ({ progress }: ProgressTrackerProps) => {
  const totalCompleted = progress.reduce((sum, cat) => sum + cat.completed, 0);
  const totalQuestions = progress.reduce((sum, cat) => sum + cat.total, 0);
  const overallProgress = totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Preparation Progress</h3>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm font-semibold text-primary">{overallProgress}%</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary mt-2">
          {totalCompleted} of {totalQuestions} questions practiced
        </p>
      </div>

      <div className="space-y-3">
        {progress.map((category) => {
          const categoryProgress = category.total > 0 ? Math.round((category.completed / category.total) * 100) : 0;
          return (
            <div key={category.category} className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{category.category}</span>
                <span className="text-xs text-text-secondary">
                  {category.completed}/{category.total}
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${categoryProgress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;