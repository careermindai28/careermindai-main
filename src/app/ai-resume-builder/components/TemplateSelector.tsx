'use client';


import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  alt: string;
  category: 'classic' | 'modern' | 'two-column';
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  const templates: Template[] = [
  {
    id: 'classic-1',
    name: 'Classic Professional',
    description: 'Traditional single-column layout with clear sections',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1c52f4930-1764616381547.png",
    alt: 'Classic resume template with traditional single-column layout showing header, experience, and education sections',
    category: 'classic'
  },
  {
    id: 'modern-1',
    name: 'Modern Minimalist',
    description: 'Clean design with accent colors and modern typography',
    thumbnail: "https://images.unsplash.com/photo-1698047681432-006d2449c631",
    alt: 'Modern resume template with minimalist design featuring blue accent colors and contemporary fonts',
    category: 'modern'
  },
  {
    id: 'two-column-1',
    name: 'Two-Column Executive',
    description: 'Professional two-column layout maximizing space',
    thumbnail: "https://images.unsplash.com/photo-1565177793427-588f5b1e696e",
    alt: 'Two-column resume template with sidebar for skills and main content area for experience',
    category: 'two-column'
  }];


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Choose Template</h3>
        <span className="text-sm text-text-secondary">{templates.length} templates</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) =>
        <button
          key={template.id}
          onClick={() => onTemplateSelect(template.id)}
          className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-200 text-left ${
          selectedTemplate === template.id ?
          'border-primary shadow-card' :
          'border-border hover:border-primary/50'}`
          }>

            <div className="aspect-[4/5] relative overflow-hidden bg-muted">
              <AppImage
              src={template.thumbnail}
              alt={template.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

              {selectedTemplate === template.id &&
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1.5">
                  <Icon name="CheckIcon" size={16} />
                </div>
            }
            </div>
            <div className="p-3 bg-surface">
              <h4 className="font-medium text-foreground mb-1">{template.name}</h4>
              <p className="text-xs text-text-secondary line-clamp-2">{template.description}</p>
            </div>
          </button>
        )}
      </div>
    </div>);

};

export default TemplateSelector;