'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  error: string;
}

const FileUploadZone = ({ onFileSelect, selectedFile, error }: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      validateAndSelectFile(file);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSelectFile(files[0]);
    }
  };

  const validateAndSelectFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return;
    }

    if (file.size > maxSize) {
      return;
    }

    onFileSelect(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    onFileSelect(null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Upload Resume <span className="text-destructive">*</span>
      </label>
      
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-primary bg-primary/5'
            : error
            ? 'border-destructive bg-destructive/5' :'border-border bg-muted hover:border-primary hover:bg-primary/5'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInputChange}
          className="hidden"
          aria-label="Upload resume file"
        />

        {!selectedFile ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="DocumentArrowUpIcon" size={32} className="text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-foreground font-medium">
                Drag and drop your resume here
              </p>
              <p className="text-sm text-text-secondary">
                or{' '}
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="text-primary hover:text-primary/80 font-medium underline"
                >
                  browse files
                </button>
              </p>
            </div>

            <p className="text-xs text-text-secondary">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-surface p-4 rounded-lg border border-border">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="DocumentTextIcon" size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="ml-4 p-2 rounded-lg hover:bg-destructive/10 transition-colors duration-150 flex-shrink-0"
              aria-label="Remove file"
            >
              <Icon name="XMarkIcon" size={20} className="text-destructive" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive flex items-center space-x-1">
          <Icon name="ExclamationCircleIcon" size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default FileUploadZone;