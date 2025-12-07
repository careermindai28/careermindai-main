'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

interface SkillsFormProps {
  skillCategories: SkillCategory[];
  onUpdate: (categories: SkillCategory[]) => void;
  onAIEnhance: () => void;
}

const SkillsForm = ({ skillCategories, onUpdate, onAIEnhance }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState<{ [key: string]: string }>({});

  const addCategory = () => {
    const newCategory: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: '',
      skills: [],
    };
    onUpdate([...skillCategories, newCategory]);
  };

  const updateCategoryName = (id: string, name: string) => {
    const updated = skillCategories.map((cat) =>
      cat.id === id ? { ...cat, name } : cat
    );
    onUpdate(updated);
  };

  const removeCategory = (id: string) => {
    onUpdate(skillCategories.filter((cat) => cat.id !== id));
  };

  const addSkill = (categoryId: string) => {
    const skillValue = newSkill[categoryId]?.trim();
    if (!skillValue) return;

    const updated = skillCategories.map((cat) =>
      cat.id === categoryId
        ? { ...cat, skills: [...cat.skills, skillValue] }
        : cat
    );
    onUpdate(updated);
    setNewSkill({ ...newSkill, [categoryId]: '' });
  };

  const removeSkill = (categoryId: string, skillIndex: number) => {
    const updated = skillCategories.map((cat) =>
      cat.id === categoryId
        ? { ...cat, skills: cat.skills.filter((_, i) => i !== skillIndex) }
        : cat
    );
    onUpdate(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Skills</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={onAIEnhance}
            className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name="SparklesIcon" size={16} />
            <span>AI Suggest</span>
          </button>
          <button
            onClick={addCategory}
            className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name="PlusIcon" size={16} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {skillCategories.map((category) => (
          <div key={category.id} className="border border-border rounded-lg p-4 bg-surface">
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={category.name}
                onChange={(e) => updateCategoryName(category.id, e.target.value)}
                placeholder="Category name (e.g., Programming Languages)"
                className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground font-medium"
              />
              <button
                onClick={() => removeCategory(category.id)}
                className="ml-2 p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
              >
                <Icon name="TrashIcon" size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {category.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(category.id, index)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <Icon name="XMarkIcon" size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newSkill[category.id] || ''}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, [category.id]: e.target.value })
                }
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(category.id);
                  }
                }}
                placeholder="Type skill and press Enter"
                className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground text-sm"
              />
              <button
                onClick={() => addSkill(category.id)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Icon name="PlusIcon" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {skillCategories.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          <Icon name="LightBulbIcon" size={48} className="mx-auto mb-2 opacity-50" />
          <p>No skill categories added yet. Click "Add Category" to start.</p>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;