'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  achievements: string[];
}

interface EducationFormProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

const EducationForm = ({ education, onUpdate }: EducationFormProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

  const addEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: [],
    };
    onUpdate([...education, newEducation]);
    setExpandedId(newEducation.id);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate(updated);
  };

  const removeEducation = (id: string) => {
    onUpdate(education.filter((edu) => edu.id !== id));
  };

  const addAchievement = (educationId: string) => {
    const updated = education.map((edu) =>
      edu.id === educationId
        ? { ...edu, achievements: [...edu.achievements, ''] }
        : edu
    );
    onUpdate(updated);
  };

  const updateAchievement = (educationId: string, index: number, value: string) => {
    const updated = education.map((edu) =>
      edu.id === educationId
        ? {
            ...edu,
            achievements: edu.achievements.map((ach, i) => (i === index ? value : ach)),
          }
        : edu
    );
    onUpdate(updated);
  };

  const removeAchievement = (educationId: string, index: number) => {
    const updated = education.map((edu) =>
      edu.id === educationId
        ? { ...edu, achievements: edu.achievements.filter((_, i) => i !== index) }
        : edu
    );
    onUpdate(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Icon name="PlusIcon" size={16} />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-3">
        {education.map((edu, index) => (
          <div key={edu.id} className="border border-border rounded-lg bg-surface">
            <button
              onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">
                  {edu.degree || `Education ${index + 1}`}
                </h4>
                {edu.institution && (
                  <p className="text-sm text-text-secondary truncate">{edu.institution}</p>
                )}
              </div>
              <Icon
                name={expandedId === edu.id ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                size={20}
                className="text-text-secondary flex-shrink-0 ml-2"
              />
            </button>

            {expandedId === edu.id && (
              <div className="p-4 pt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Institution <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="Indian Institute of Technology, Mumbai"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Degree <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Technology"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Field of Study <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Computer Science"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      placeholder="Mumbai, Maharashtra"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      GPA/Percentage
                    </label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="8.5/10 or 85%"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Start Date <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      End Date <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-foreground">
                      Achievements & Activities
                    </label>
                    <button
                      onClick={() => addAchievement(edu.id)}
                      className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      <Icon name="PlusIcon" size={14} />
                      <span>Add Achievement</span>
                    </button>
                  </div>

                  {edu.achievements.length > 0 && (
                    <div className="space-y-2">
                      {edu.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start space-x-2">
                          <span className="text-text-secondary mt-3">•</span>
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) =>
                              updateAchievement(edu.id, achIndex, e.target.value)
                            }
                            placeholder="Dean's List, President of Tech Club, Published research paper"
                            className="flex-1 px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
                          />
                          <button
                            onClick={() => removeAchievement(edu.id, achIndex)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors mt-1"
                          >
                            <Icon name="TrashIcon" size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2 border-t border-border">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="flex items-center space-x-1 text-sm text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <Icon name="TrashIcon" size={16} />
                    <span>Remove Education</span>
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

export default EducationForm;