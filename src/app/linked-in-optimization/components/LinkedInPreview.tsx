'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface LinkedInPreviewProps {
  headline: string;
  summary: string;
  profileData: {
    name: string;
    currentRole: string;
    location: string;
    connections: string;
    profileImage: string;
    profileImageAlt: string;
  };
}

const LinkedInPreview = ({ headline, summary, profileData }: LinkedInPreviewProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">LinkedIn Preview</h3>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1.5 rounded text-sm transition-colors duration-150 ${
              viewMode === 'desktop' ?'bg-surface text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
            }`}
          >
            <Icon name="ComputerDesktopIcon" size={16} className="inline mr-1" />
            Desktop
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1.5 rounded text-sm transition-colors duration-150 ${
              viewMode === 'mobile' ?'bg-surface text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
            }`}
          >
            <Icon name="DevicePhoneMobileIcon" size={16} className="inline mr-1" />
            Mobile
          </button>
        </div>
      </div>

      <div
        className={`bg-surface border border-border rounded-lg overflow-hidden transition-all duration-300 ${
          viewMode === 'mobile' ? 'max-w-sm mx-auto' : ''
        }`}
      >
        <div className="bg-gradient-to-r from-primary to-accent h-20" />

        <div className="px-6 pb-6">
          <div className="flex items-start gap-4 -mt-12 mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-surface overflow-hidden bg-muted flex-shrink-0">
              <AppImage
                src={profileData.profileImage}
                alt={profileData.profileImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 mt-14">
              <h2 className="text-xl font-bold text-foreground mb-1">{profileData.name}</h2>
              <p className="text-sm text-text-secondary mb-2">{profileData.location}</p>
              <p className="text-xs text-accent">{profileData.connections} connections</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-base font-medium text-foreground leading-relaxed">
                {headline || 'Your optimized headline will appear here'}
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-2">About</h3>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                {summary || 'Your optimized summary will appear here'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="InformationCircleIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium mb-1">Preview Note</p>
            <p className="text-xs text-text-secondary">
              This preview shows how your optimized content will appear on LinkedIn. Actual appearance may vary slightly based on LinkedIn&apos;s current design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPreview;