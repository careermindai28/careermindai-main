'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

interface ExperienceFormProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
  onAIEnhance: (experienceId: string) => void;
}

const ExperienceForm = ({ experiences, onUpdate, onAIEnhance }: ExperienceFormProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: [''],
    };
    onUpdate([...experiences, newExperience]);
    setExpandedId(newExperience.id);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate(updated);
  };

  const removeExperience = (id: string) => {
    onUpdate(experiences.filter((exp) => exp.id !== id));
  };

  const addAchievement = (experienceId: string) => {
    const updated = experiences.map((exp) =>
      exp.id === experienceId
        ? { ...exp, achievements: [...exp.achievements, ''] }
        : exp
    );
    onUpdate(updated);
  };

  const updateAchievement = (experienceId: string, index: number, value: string) => {
    const updated = experiences.map((exp) =>
      exp.id === experienceId
        ? {
            ...exp,
            achievements: exp.achievements.map((ach, i) => (i === index ? value : ach)),
          }
        : exp
    );
    onUpdate(updated);
  };

  const removeAchievement = (experienceId: string, index: number) => {
    const updated = experiences.map((exp) =>
      exp.id === experienceId
        ? { ...exp, achievements: exp.achievements.filter((_, i) => i !== index) }
        : exp
    );
    onUpdate(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
        <button
          onClick={addExperience}
          className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Icon name="PlusIcon" size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-3">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="border border-border rounded-lg bg-surface">
            <button
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">
                  {exp.position || `Experience ${index + 1}`}
                </h4>
                {exp.company && (
                  <p className="text-sm text-text-secondary truncate">{exp.company}</p>
                )}
              </div>
              <Icon
                name={expandedId === exp.id ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                size={20}
                className="text-text-secondary flex-shrink-0 ml-2"
              />
            </button>

            {expandedId === exp.id && (
              <div className="p-4 pt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Company Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Tech Corp India"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Position <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="Senior Software Engineer"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      placeholder="Bangalore, Karnataka"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Start Date <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground disabled:opacity-50"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => {
                          updateExperience(exp.id, 'current', e.target.checked);
                          if (e.target.checked) {
                            updateExperience(exp.id, 'endDate', '');
                          }
                        }}
                        className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                      />
                      <span className="text-sm text-foreground">Currently working here</span>
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-foreground">
                      Key Achievements <span className="text-destructive">*</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onAIEnhance(exp.id)}
                        className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        <Icon name="SparklesIcon" size={14} />
                        <span>AI Enhance</span>
                      </button>
                      <button
                        onClick={() => addAchievement(exp.id)}
                        className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        <Icon name="PlusIcon" size={14} />
                        <span>Add Point</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start space-x-2">
                        <span className="text-text-secondary mt-3">•</span>
                        <textarea
                          value={achievement}
                          onChange={(e) =>
                            updateAchievement(exp.id, achIndex, e.target.value)
                          }
                          placeholder="Led team of 5 engineers to deliver project 2 weeks ahead of schedule, resulting in 30% cost savings"
                          rows={2}
                          className="flex-1 px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground resize-none"
                        />
                        {exp.achievements.length > 1 && (
                          <button
                            onClick={() => removeAchievement(exp.id, achIndex)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors mt-1"
                          >
                            <Icon name="TrashIcon" size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-text-secondary mt-2">
                    Use action verbs and quantify achievements (e.g., "Increased sales by 25%")
                  </p>
                </div>

                <div className="flex justify-end pt-2 border-t border-border">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="flex items-center space-x-1 text-sm text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <Icon name="TrashIcon" size={16} />
                    <span>Remove Experience</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;