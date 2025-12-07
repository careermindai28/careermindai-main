import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-surface rounded-xl border border-border p-6 hover:shadow-card transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <AppImage
            src={testimonial.image}
            alt={testimonial.alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">
            {testimonial.name}
          </h4>
          <p className="text-xs text-text-secondary truncate">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon
            key={index}
            name="StarIcon"
            size={16}
            variant="solid"
            className={
              index < testimonial.rating ? 'text-warning' : 'text-muted'
            }
          />
        ))}
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">
        {testimonial.text}
      </p>
    </div>
  );
};

export default TestimonialCard;