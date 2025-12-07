'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SocialShareProps {
  className?: string;
}

const SocialShare = ({ className = '' }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = 'Check out these free career tools from CareerMindAI!';
    let url = '';

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className={`bg-surface rounded-xl border border-border shadow-card p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Share These Tools</h3>
        <p className="text-text-secondary">Help others discover free career resources</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center space-x-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] px-4 py-2 rounded-lg transition-all duration-150 border border-[#1DA1F2]/20"
        >
          <Icon name="ShareIcon" size={18} />
          <span className="font-medium">Twitter</span>
        </button>

        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center space-x-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] px-4 py-2 rounded-lg transition-all duration-150 border border-[#0A66C2]/20"
        >
          <Icon name="ShareIcon" size={18} />
          <span className="font-medium">LinkedIn</span>
        </button>

        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center space-x-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] px-4 py-2 rounded-lg transition-all duration-150 border border-[#1877F2]/20"
        >
          <Icon name="ShareIcon" size={18} />
          <span className="font-medium">Facebook</span>
        </button>

        <button
          onClick={() => handleShare('whatsapp')}
          className="flex items-center space-x-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] px-4 py-2 rounded-lg transition-all duration-150 border border-[#25D366]/20"
        >
          <Icon name="ShareIcon" size={18} />
          <span className="font-medium">WhatsApp</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center space-x-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-all duration-150 border border-border"
        >
          <Icon name={copied ? 'CheckIcon' : 'LinkIcon'} size={18} />
          <span className="font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-sm text-text-secondary">
          Share with your network and help others advance their careers
        </p>
      </div>
    </div>
  );
};

export default SocialShare;