'use client';

import { useState } from 'react';

interface ToneOption {
  id: string;
  label: string;
  description: string;
  example: string;
}

interface ToneSelectorProps {
  selectedTone: string;
  onToneSelect: (toneId: string) => void;
}

const ToneSelector = ({ selectedTone, onToneSelect }: ToneSelectorProps) => {
  const [showExample, setShowExample] = useState<string | null>(null);

  const toneOptions: ToneOption[] = [
    {
      id: 'professional',
      label: 'Professional',
      description: 'Formal and business-appropriate',
      example: 'I am writing to express my strong interest in the Software Engineer position at your esteemed organization.',
    },
    {
      id: 'enthusiastic',
      label: 'Enthusiastic',
      description: 'Energetic and passionate',
      example: "I'm thrilled to apply for the Software Engineer role! Your company's innovative approach to technology truly excites me.",
    },
    {
      id: 'conservative',
      label: 'Conservative',
      description: 'Traditional and reserved',
      example: 'I wish to submit my application for the Software Engineer position. My qualifications align well with your requirements.',
    },
    {
      id: 'creative',
      label: 'Creative',
      description: 'Unique and expressive',
      example: 'Imagine a developer who codes with the precision of a surgeon and the creativity of an artist—that could be me at your company.',
    },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-3">
        Select Tone <span className="text-error">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {toneOptions.map((tone) => (
          <div key={tone.id} className="relative">
            <button
              type="button"
              onClick={() => onToneSelect(tone.id)}
              onMouseEnter={() => setShowExample(tone.id)}
              onMouseLeave={() => setShowExample(null)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-150 text-left ${
                selectedTone === tone.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 bg-surface'
              }`}
            >
              <p className="text-sm font-semibold text-foreground mb-1">{tone.label}</p>
              <p className="text-xs text-text-secondary">{tone.description}</p>
            </button>

            {showExample === tone.id && (
              <div className="absolute z-50 left-0 right-0 top-full mt-2 p-3 bg-surface border border-border rounded-lg shadow-modal">
                <p className="text-xs text-text-secondary mb-1 font-medium">Example:</p>
                <p className="text-xs text-foreground italic">&quot;{tone.example}&quot;</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;