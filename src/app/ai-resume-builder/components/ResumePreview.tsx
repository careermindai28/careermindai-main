'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
}

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

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

interface ResumePreviewProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skillCategories: SkillCategory[];
  selectedTemplate: string;
}

const ResumePreview = ({
  personalInfo,
  experiences,
  education,
  skillCategories,
  selectedTemplate,
}: ResumePreviewProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  if (!isHydrated) {
    return (
      <div className="bg-white rounded-lg shadow-card p-8 min-h-[800px] animate-pulse">
        <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="p-8 space-y-6" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="text-center border-b-2 border-primary pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
            {personalInfo.email && (
              <span className="flex items-center">
                <Icon name="EnvelopeIcon" size={14} className="mr-1" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center">
                <Icon name="PhoneIcon" size={14} className="mr-1" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center">
                <Icon name="MapPinIcon" size={14} className="mr-1" />
                {personalInfo.location}
              </span>
            )}
          </div>
          {(personalInfo.linkedin || personalInfo.portfolio) && (
            <div className="flex flex-wrap justify-center gap-3 text-sm text-primary mt-2">
              {personalInfo.linkedin && (
                <span className="flex items-center">
                  <Icon name="LinkIcon" size={14} className="mr-1" />
                  {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.portfolio && (
                <span className="flex items-center">
                  <Icon name="GlobeAltIcon" size={14} className="mr-1" />
                  {personalInfo.portfolio}
                </span>
              )}
            </div>
          )}
        </div>

        {personalInfo.summary && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
              <div className="w-1 h-6 bg-primary mr-2"></div>
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-1 h-6 bg-primary mr-2"></div>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 text-sm">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                      {exp.achievements.map((achievement, index) => (
                        achievement && <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-1 h-6 bg-primary mr-2"></div>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-gray-700 text-sm">{edu.institution}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                  {edu.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                      {edu.achievements.map((achievement, index) => (
                        achievement && <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {skillCategories.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-1 h-6 bg-primary mr-2"></div>
              Skills
            </h2>
            <div className="space-y-2">
              {skillCategories.map((category) => (
                category.skills.length > 0 && (
                  <div key={category.id}>
                    <span className="font-semibold text-gray-900 text-sm">{category.name}: </span>
                    <span className="text-gray-700 text-sm">{category.skills.join(', ')}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;