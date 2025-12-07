import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CareerMindAI Blog – Resumes, Interviews, Careers',
  description: 'Expert career advice, resume tips, interview strategies, and AI-powered insights to help you succeed in your job search journey.'
};

export default function BlogPage() {
  const categories = [
  { name: 'All', count: 24 },
  { name: 'Resumes', count: 8 },
  { name: 'Interviews', count: 6 },
  { name: 'LinkedIn', count: 5 },
  { name: 'Careers', count: 5 }];


  const featuredPost = {
    title: 'How to Optimize Your Resume for ATS Systems in 2025',
    excerpt: 'Learn the essential strategies to ensure your resume passes through Applicant Tracking Systems and reaches human recruiters. Discover the latest ATS trends and optimization techniques.',
    category: 'Resumes',
    date: 'December 1, 2025',
    readTime: '8 min read',
    author: 'Priya Sharma',
    image: "https://images.unsplash.com/photo-1713946598377-891884fa90de",
    alt: 'Professional resume document on desk with laptop and coffee'
  };

  const blogPosts = [
  {
    title: '10 Common Resume Mistakes That Cost You Job Interviews',
    excerpt: 'Avoid these critical errors that cause recruiters to reject resumes. From formatting issues to content mistakes, we cover everything you need to know.',
    category: 'Resumes',
    date: 'November 28, 2025',
    readTime: '6 min read',
    author: 'Ananya Patel',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19c2c2edb-1764655212369.png",
    alt: 'Person reviewing resume with red pen marking corrections'
  },
  {
    title: 'Mastering Behavioral Interview Questions: The STAR Method',
    excerpt: 'Prepare for behavioral interviews with the proven STAR technique. Learn how to structure your answers to showcase your skills and experiences effectively.',
    category: 'Interviews',
    date: 'November 25, 2025',
    readTime: '7 min read',
    author: 'Rahul Verma',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0007e95-1763295050768.png",
    alt: 'Professional woman in job interview setting'
  },
  {
    title: 'LinkedIn Profile Optimization: From Zero to Hero',
    excerpt: 'Transform your LinkedIn profile into a powerful job search tool. Discover optimization strategies used by recruiters and top professionals.',
    category: 'LinkedIn',
    date: 'November 22, 2025',
    readTime: '9 min read',
    author: 'Priya Sharma',
    image: "https://images.unsplash.com/photo-1712217559097-cc2aaf698767",
    alt: 'LinkedIn profile on laptop screen with professional networking'
  },
  {
    title: 'Career Transitions: How to Switch Industries Successfully',
    excerpt: 'Navigate career changes with confidence. Learn strategies to highlight transferable skills and position yourself for success in a new industry.',
    category: 'Careers',
    date: 'November 19, 2025',
    readTime: '10 min read',
    author: 'Ananya Patel',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_145ada3b0-1764655212512.png",
    alt: 'Professional planning career change with documents and laptop'
  },
  {
    title: 'The Ultimate Guide to Remote Job Interviews',
    excerpt: 'Master virtual interviews with our comprehensive guide. From technical setup to body language, learn everything you need to impress remotely.',
    category: 'Interviews',
    date: 'November 16, 2025',
    readTime: '8 min read',
    author: 'Rahul Verma',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1972dd9a6-1763294539659.png",
    alt: 'Person in video call interview setup with professional background'
  },
  {
    title: 'How AI is Transforming Resume Writing and Job Applications',
    excerpt: 'Explore how artificial intelligence is revolutionizing the job search process. Learn to leverage AI tools while maintaining authenticity.',
    category: 'Careers',
    date: 'November 13, 2025',
    readTime: '7 min read',
    author: 'Priya Sharma',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0774894-1764655210105.png",
    alt: 'AI and technology concept with digital interface and resume'
  }];


  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            CareerMindAI Blog
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Expert insights, tips, and strategies to accelerate your career growth
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) =>
          <button
            key={category.name}
            className="px-6 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-foreground hover:border-primary transition-all duration-150 font-medium">

              {category.name} <span className="text-xs">({category.count})</span>
            </button>
          )}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-auto bg-muted relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.alt}
                  className="w-full h-full object-cover" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-3">
                  <span className="text-primary font-semibold text-sm">{featuredPost.category}</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">{featuredPost.title}</h2>
                <p className="text-text-secondary mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-text-secondary mb-6">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                  <span>•</span>
                  <span>{featuredPost.author}</span>
                </div>
                <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-150 w-fit">
                  Read Article
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevation transition-shadow duration-200">
              <div className="aspect-video bg-muted relative">
                <img
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-primary font-semibold text-xs uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-text-secondary mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-text-secondary">{post.author}</span>
                  <Link
                    href={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                    className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-150"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-surface border border-border rounded-lg p-8 md:p-12 text-center">
          <Icon name="EnvelopeIcon" size={48} className="text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Never Miss an Update
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest career tips, resume strategies, and interview insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary" />

            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-150 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>);

}