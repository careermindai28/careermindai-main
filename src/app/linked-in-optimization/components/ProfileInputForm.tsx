'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProfileInputFormProps {
  onGenerate: (data: ProfileFormData) => void;
  isGenerating: boolean;
}

export interface ProfileFormData {
  currentRole: string;
  targetPosition: string;
  industry: string;
  keySkills: string[];
  yearsOfExperience: string;
  existingProfile: string;
  tone: 'professional' | 'creative' | 'executive';
}

const ProfileInputForm = ({ onGenerate, isGenerating }: ProfileInputFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    currentRole: '',
    targetPosition: '',
    industry: '',
    keySkills: [],
    yearsOfExperience: '',
    existingProfile: '',
    tone: 'professional',
  });

  const [skillInput, setSkillInput] = useState('');

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Marketing',
    'Sales',
    'Education',
    'Consulting',
    'Engineering',
    'Design',
    'Human Resources',
    'Operations',
    'Product Management',
  ];

  const experienceLevels = [
    '0-2 years',
    '2-5 years',
    '5-10 years',
    '10-15 years',
    '15+ years',
  ];

  const handleAddSkill = () => {
    if (skillInput.trim() && formData.keySkills.length < 10) {
      setFormData({
        ...formData,
        keySkills: [...formData.keySkills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData({
      ...formData,
      keySkills: formData.keySkills.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const isFormValid = formData.currentRole && formData.targetPosition && formData.industry && formData.keySkills.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="currentRole" className="block text-sm font-medium text-foreground mb-2">
            Current Role *
          </label>
          <input
            type="text"
            id="currentRole"
            value={formData.currentRole}
            onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
            placeholder="e.g., Senior Software Engineer"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
            required
          />
        </div>

        <div>
          <label htmlFor="targetPosition" className="block text-sm font-medium text-foreground mb-2">
            Target Position *
          </label>
          <input
            type="text"
            id="targetPosition"
            value={formData.targetPosition}
            onChange={(e) => setFormData({ ...formData, targetPosition: e.target.value })}
            placeholder="e.g., Engineering Manager"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
            required
          />
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-2">
            Industry *
          </label>
          <select
            id="industry"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
            required
          >
            <option value="">Select Industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">
            Years of Experience
          </label>
          <select
            id="experience"
            value={formData.yearsOfExperience}
            onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
          >
            <option value="">Select Experience</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-foreground mb-2">
          Key Skills * (Add up to 10)
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            id="skills"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            placeholder="Type a skill and press Enter"
            className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
            disabled={formData.keySkills.length >= 10}
          />
          <button
            type="button"
            onClick={handleAddSkill}
            disabled={!skillInput.trim() || formData.keySkills.length >= 10}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.keySkills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="hover:text-accent/70 transition-colors duration-150"
              >
                <Icon name="XMarkIcon" size={16} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="tone" className="block text-sm font-medium text-foreground mb-2">
          Profile Tone
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['professional', 'creative', 'executive'] as const).map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => setFormData({ ...formData, tone })}
              className={`px-4 py-2 rounded-lg border transition-all duration-150 ${
                formData.tone === tone
                  ? 'border-primary bg-primary/10 text-primary' :'border-input hover:border-primary/50'
              }`}
            >
              {tone.charAt(0).toUpperCase() + tone.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="existingProfile" className="block text-sm font-medium text-foreground mb-2">
          Existing LinkedIn Profile (Optional)
        </label>
        <textarea
          id="existingProfile"
          value={formData.existingProfile}
          onChange={(e) => setFormData({ ...formData, existingProfile: e.target.value })}
          placeholder="Paste your current LinkedIn headline and summary here for optimization..."
          rows={6}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isGenerating}
        className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 font-medium flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
            Generating Optimized Content...
          </>
        ) : (
          <>
            <Icon name="SparklesIcon" size={20} />
            Generate LinkedIn Content
          </>
        )}
      </button>
    </form>
  );
};

export default ProfileInputForm;