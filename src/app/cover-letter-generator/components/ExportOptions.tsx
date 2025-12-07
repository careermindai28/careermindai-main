'use client';

import Icon from '@/components/ui/AppIcon';

interface ExportOptionsProps {
  onExport: (format: string) => void;
}

const ExportOptions = ({ onExport }: ExportOptionsProps) => {
  const exportFormats = [
    {
      id: 'pdf',
      label: 'Download PDF',
      icon: 'DocumentArrowDownIcon',
      description: 'Professional PDF format',
    },
    {
      id: 'email',
      label: 'Email Ready',
      icon: 'EnvelopeIcon',
      description: 'Copy for email body',
    },
    {
      id: 'docx',
      label: 'Download DOCX',
      icon: 'DocumentTextIcon',
      description: 'Editable Word document',
    },
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Export Options</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {exportFormats.map((format) => (
          <button
            key={format.id}
            type="button"
            onClick={() => onExport(format.id)}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-150 group"
          >
            <Icon
              name={format.icon as any}
              size={32}
              className="text-text-secondary group-hover:text-primary transition-colors duration-150 mb-2"
            />
            <p className="text-sm font-medium text-foreground mb-1">{format.label}</p>
            <p className="text-xs text-text-secondary text-center">{format.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExportOptions;