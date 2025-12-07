'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
}

interface TestimonialMarqueeProps {
  className?: string;
}

const TestimonialMarquee = ({ className = '' }: TestimonialMarqueeProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Tech Mahindra",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f10a419e-1763296115132.png",
    alt: "Professional Indian woman with long black hair wearing blue blazer smiling at camera",
    rating: 5,
    text: "ResumeMind helped me increase my interview calls by 300%. The ATS optimization is incredible!"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Product Manager",
    company: "Flipkart",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19d0e6f0d-1763295389190.png",
    alt: "Young Indian man with short black hair in navy suit smiling confidently",
    rating: 5,
    text: "The AI-powered resume builder saved me hours. Got my dream job within 2 weeks of using it."
  },
  {
    id: 3,
    name: "Anjali Patel",
    role: "Data Analyst",
    company: "Infosys",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13d1453e1-1763295425553.png",
    alt: "Professional woman with shoulder-length brown hair wearing white shirt in office setting",
    rating: 5,
    text: "The ResumeMind Score gave me clear direction on what to improve. Highly recommended!"
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Marketing Manager",
    company: "Amazon India",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_111961aad-1763296686952.png",
    alt: "Indian man with beard wearing gray blazer and white shirt smiling professionally",
    rating: 5,
    text: "Interview preparation module is outstanding. Helped me crack multiple rounds with confidence."
  },
  {
    id: 5,
    name: "Sneha Reddy",
    role: "UX Designer",
    company: "Swiggy",
    image: "https://images.unsplash.com/photo-1645552973215-33f8753f548e",
    alt: "Young woman with long dark hair wearing black top smiling warmly at camera",
    rating: 5,
    text: "The LinkedIn optimization tool transformed my profile. Started getting recruiter messages daily!"
  },
  {
    id: 6,
    name: "Arjun Mehta",
    role: "Business Analyst",
    company: "Deloitte",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6efa2e3-1763294502705.png",
    alt: "Professional man with short hair wearing dark suit and tie in corporate setting",
    rating: 5,
    text: "Best investment in my career. The cover letter generator alone is worth the subscription."
  }];


  const duplicatedTestimonials = [...testimonials, ...testimonials];

  if (!isHydrated) {
    return (
      <section className={`bg-surface py-16 overflow-hidden ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by 10,000+ Job Seekers
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              See how ResumeMind has helped professionals land their dream jobs
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="flex gap-6">
            {testimonials.slice(0, 3).map((testimonial) =>
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-80 bg-card border border-border rounded-xl p-6 shadow-card">

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) =>
                <Icon key={i} name="StarIcon" size={16} className="text-warning" variant="solid" />
                )}
                </div>
                <p className="text-text-secondary mb-6 line-clamp-3">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                    <AppImage
                    src={testimonial.image}
                    alt={testimonial.alt}
                    className="w-full h-full object-cover" />

                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-text-secondary">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>);

  }

  return (
    <section className={`bg-surface py-16 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted by 10,000+ Job Seekers
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            See how ResumeMind has helped professionals land their dream jobs
          </p>
        </div>
      </div>
      <div className="relative">
        <div
          className="flex gap-6"
          style={{
            animation: isPaused ? 'none' : 'marquee 40s linear infinite'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>

          {duplicatedTestimonials.map((testimonial, index) =>
          <div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-80 bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevation transition-shadow duration-150">

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) =>
              <Icon key={i} name="StarIcon" size={16} className="text-warning" variant="solid" />
              )}
              </div>
              <p className="text-text-secondary mb-6 line-clamp-3">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                  <AppImage
                  src={testimonial.image}
                  alt={testimonial.alt}
                  className="w-full h-full object-cover" />

                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-text-secondary">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>);

};

export default TestimonialMarquee;