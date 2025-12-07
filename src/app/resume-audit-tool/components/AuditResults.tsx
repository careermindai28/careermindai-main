'use client';

import Icon from '@/components/ui/AppIcon';

interface Strength {
  title: string;
  description: string;
}

interface Improvement {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface ATSRecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

interface AuditResultsData {
  resumeMindScore: number;
  strengths: Strength[];
  improvements: Improvement[];
  atsCompatibility: number;
  atsRecommendations: ATSRecommendation[];
}

interface AuditResultsProps {
  results: AuditResultsData | null;
  onExportPDF: () => void;
  onStartOver: () => void;
}

const AuditResults = ({ results, onExportPDF, onStartOver }: AuditResultsProps) => {
  if (!results) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-success/10 text-success';
      case 'medium':
        return 'bg-accent/10 text-accent';
      case 'low':
        return 'bg-muted text-text-secondary';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Audit Results</h2>
          <p className="text-sm text-text-secondary mt-1">
            Comprehensive analysis of your resume
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onExportPDF}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-surface border border-border text-foreground hover:bg-muted transition-all duration-150"
          >
            <Icon name="ArrowDownTrayIcon" size={20} />
            <span className="font-medium">Export PDF</span>
          </button>
          <button
            onClick={onStartOver}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150"
          >
            <Icon name="ArrowPathIcon" size={20} />
            <span className="font-medium">New Audit</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${getScoreBackground(results.resumeMindScore)} border border-border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              ResumeMind Score<sup>TM</sup>
            </h3>
            <Icon name="ChartBarIcon" size={24} className={getScoreColor(results.resumeMindScore)} />
          </div>
          <div className="flex items-end space-x-2">
            <span className={`text-5xl font-bold ${getScoreColor(results.resumeMindScore)}`}>
              {results.resumeMindScore}
            </span>
            <span className="text-2xl text-text-secondary mb-2">/100</span>
          </div>
          <p className="text-sm text-text-secondary mt-2">
            {results.resumeMindScore >= 80
              ? 'Excellent! Your resume is well-optimized'
              : results.resumeMindScore >= 60
              ? 'Good start, but room for improvement'
              : 'Needs significant improvements'}
          </p>
        </div>

        <div className={`p-6 rounded-xl ${getScoreBackground(results.atsCompatibility)} border border-border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">ATS Compatibility</h3>
            <Icon name="ShieldCheckIcon" size={24} className={getScoreColor(results.atsCompatibility)} />
          </div>
          <div className="flex items-end space-x-2">
            <span className={`text-5xl font-bold ${getScoreColor(results.atsCompatibility)}`}>
              {results.atsCompatibility}
            </span>
            <span className="text-2xl text-text-secondary mb-2">%</span>
          </div>
          <p className="text-sm text-text-secondary mt-2">
            {results.atsCompatibility >= 80
              ? 'Highly compatible with ATS systems'
              : results.atsCompatibility >= 60
              ? 'Moderate ATS compatibility' :'Low ATS compatibility - needs work'}
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="CheckCircleIcon" size={24} className="text-success" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Strengths</h3>
        </div>

        <div className="space-y-3">
          {results.strengths.map((strength, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-success/5 border border-success/20"
            >
              <h4 className="font-medium text-foreground mb-1">{strength.title}</h4>
              <p className="text-sm text-text-secondary">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <Icon name="ExclamationTriangleIcon" size={24} className="text-warning" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Areas for Improvement</h3>
        </div>

        <div className="space-y-3">
          {results.improvements.map((improvement, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-muted border border-border"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-medium text-foreground">{improvement.title}</h4>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium uppercase ${getPriorityColor(
                    improvement.priority
                  )}`}
                >
                  {improvement.priority}
                </span>
              </div>
              <p className="text-sm text-text-secondary">{improvement.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="CpuChipIcon" size={24} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">ATS Recommendations</h3>
        </div>

        <div className="space-y-3">
          {results.atsRecommendations.map((recommendation, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-muted border border-border"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-medium text-foreground">{recommendation.title}</h4>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium uppercase ${getImpactColor(
                    recommendation.impact
                  )}`}
                >
                  {recommendation.impact} impact
                </span>
              </div>
              <p className="text-sm text-text-secondary">{recommendation.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Icon name="LightBulbIcon" size={24} className="text-accent flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Next Steps</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start space-x-2">
                <span className="text-accent mt-1">•</span>
                <span>Use our AI Resume Builder to implement these improvements</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent mt-1">•</span>
                <span>Generate a tailored cover letter for this position</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent mt-1">•</span>
                <span>Prepare for interviews with our AI-powered practice tool</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditResults;