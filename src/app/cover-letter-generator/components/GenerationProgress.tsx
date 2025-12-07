'use client';

import Icon from '@/components/ui/AppIcon';

interface GenerationProgressProps {
  isGenerating: boolean;
  currentStep: number;
}

const GenerationProgress = ({ isGenerating, currentStep }: GenerationProgressProps) => {
  const steps = [
    { id: 1, label: 'Analyzing job description', icon: 'MagnifyingGlassIcon' },
    { id: 2, label: 'Matching your experience', icon: 'DocumentTextIcon' },
    { id: 3, label: 'Crafting personalized content', icon: 'PencilSquareIcon' },
    { id: 4, label: 'Finalizing cover letter', icon: 'CheckCircleIcon' },
  ];

  if (!isGenerating) return null;

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground text-center mb-6">
        Generating Your Cover Letter
      </h3>

      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              currentStep >= step.id ? 'bg-primary/10' : 'bg-muted'
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep > step.id
                  ? 'bg-success text-success-foreground'
                  : currentStep === step.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary'
              }`}
            >
              {currentStep > step.id ? (
                <Icon name="CheckIcon" size={16} />
              ) : (
                <Icon name={step.icon as any} size={16} />
              )}
            </div>
            <p
              className={`text-sm font-medium ${
                currentStep >= step.id ? 'text-foreground' : 'text-text-secondary'
              }`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerationProgress;