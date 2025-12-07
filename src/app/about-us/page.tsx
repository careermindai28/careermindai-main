import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'About CareerMindAI – Our Story & Mission',
  description: 'Learn about CareerMindAI\'s mission to empower job seekers with AI-powered resume optimization, career tools, and the ResumeMind Score™ engine built in Mumbai, India.'
};

export default function AboutUsPage() {
  const values = [
  {
    icon: 'CheckCircleIcon',
    title: 'ATS-First Resumes',
    description: 'We prioritize ATS compatibility to ensure your resume gets past automated screening systems and into human hands.'
  },
  {
    icon: 'GlobeAltIcon',
    title: 'Real-World Job Market Insight',
    description: 'Built for both Indian and global job markets, we understand the unique challenges job seekers face in different regions.'
  },
  {
    icon: 'LightBulbIcon',
    title: 'Simple, Actionable Feedback',
    description: 'Our AI provides clear, actionable recommendations that you can implement immediately to improve your career materials.'
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Privacy & Security First',
    description: 'Your career data is protected with industry-standard security. We never request government ID numbers or sell your information.'
  }];


  const achievements = [
  { label: 'Resumes Analyzed', value: '50,000+' },
  { label: 'Job Seekers Helped', value: '25,000+' },
  { label: 'Average Score Improvement', value: '35%' },
  { label: 'Success Rate', value: '92%' }];


  const team = [
  {
    name: 'Priya Sharma',
    role: 'Founder & CEO',
    bio: 'Former HR leader with 12+ years of experience in recruitment and talent acquisition across Indian and global markets.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1244494bb-1763294112072.png",
    alt: 'Professional woman in business attire smiling at camera'
  },
  {
    name: 'Rahul Verma',
    role: 'Head of AI & Technology',
    bio: 'AI/ML engineer specializing in natural language processing and resume optimization algorithms with experience at top tech companies.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1107d17e6-1763294280373.png",
    alt: 'Professional man in business casual attire with confident expression'
  },
  {
    name: 'Ananya Patel',
    role: 'Head of Career Strategy',
    bio: 'Career coach and resume expert who has helped thousands of professionals transition to their dream roles.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f02f01a9-1763299638319.png",
    alt: 'Professional woman with glasses in corporate setting'
  }];


  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            About CareerMindAI
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            CareerMindAI is an AI-powered career platform built to help job seekers create ATS-optimized resumes, 
            cover letters, LinkedIn profiles, and interview preparation – powered by our ResumeMind Score<sup>TM</sup> engine 
            and built in Mumbai, India, for both Indian and global job markets.
          </p>
        </div>

        {/* Achievement Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement) =>
          <div key={achievement.label} className="bg-surface border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{achievement.value}</div>
              <div className="text-sm text-text-secondary">{achievement.label}</div>
            </div>
          )}
        </div>

        {/* Mission Statement */}
        <div className="bg-surface border border-border rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Mission</h2>
          <div className="max-w-4xl mx-auto space-y-4 text-text-secondary leading-relaxed">
            <p>
              CareerMindAI was founded with a simple yet powerful vision: to democratize access to high-quality career 
              development tools that were previously only available through expensive career coaches and resume writing services.
            </p>
            <p>
              We recognized a critical gap in the market – most resume builders created generic, template-based resumes that 
              failed to pass Applicant Tracking Systems (ATS) and didn't account for the nuances of different job markets. 
              Job seekers, especially in India and emerging markets, deserved better.
            </p>
            <p>
              Our ResumeMind Score<sup>TM</sup> engine was developed by combining insights from thousands of successful job 
              applications, HR expertise, and cutting-edge AI technology. It analyzes your resume against real-world job 
              market standards and provides actionable feedback that helps you stand out in both automated screenings and 
              human reviews.
            </p>
          </div>
        </div>

        {/* What We Believe */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">What We Believe</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) =>
            <div key={value.title} className="bg-surface border border-border rounded-lg p-6">
                <div className="mb-4">
                  <Icon name={value.icon as any} size={40} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) =>
            <div key={member.name} className="bg-surface border border-border rounded-lg overflow-hidden">
                <div className="aspect-square bg-muted relative">
                  <img
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-surface border border-border rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            The ResumeMind Score<sup>TM</sup> Engine
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 text-text-secondary leading-relaxed">
            <p>
              Our proprietary ResumeMind Score<sup>TM</sup> engine is the result of extensive research into what makes 
              resumes successful in today's job market. It combines:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>ATS compatibility analysis to ensure your resume passes automated screening</li>
              <li>Keyword optimization based on industry-specific job requirements</li>
              <li>Formatting and structure recommendations for maximum readability</li>
              <li>Content quality assessment using natural language processing</li>
              <li>Real-time suggestions for improvement across all career documents</li>
            </ul>
            <p className="font-medium">
              We're transparent about our AI capabilities: while our tools provide powerful assistance, we always 
              recommend human review of AI-generated content before submission to employers.
            </p>
          </div>
        </div>

        {/* Built in Mumbai */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-text-secondary flex items-center justify-center gap-2">
            <Icon name="MapPinIcon" size={20} className="text-primary" />
            <span className="font-medium">Built in Mumbai, India • Used worldwide</span>
          </p>
        </div>
      </main>

      <FooterSection />
    </div>);

}