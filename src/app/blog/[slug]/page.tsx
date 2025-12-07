import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = params;
  
  // Convert slug to title: replace hyphens with spaces and capitalize
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${title} | CareerMindAI Blog`,
    description: `Read our detailed article about ${title.toLowerCase()}. Expert career advice and insights from CareerMindAI.`
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = params;

  // Convert slug to readable title
  const articleTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Blog Link */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors duration-150"
        >
          <Icon name="ArrowLeftIcon" size={20} />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="bg-surface border border-border rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {articleTitle}
          </h1>
          
          <p className="text-xl text-text-secondary mb-8">
            Full article coming soon
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="text-text-secondary leading-relaxed">
              We're working hard to bring you comprehensive, expert content on this topic. 
              Our team is currently crafting detailed insights and actionable strategies that 
              will help you succeed in your career journey. This article will be published 
              shortly after our official launch.
            </p>
            
            <p className="text-text-secondary leading-relaxed mt-6">
              In the meantime, feel free to explore our other blog posts and career resources. 
              Subscribe to our newsletter to be notified when this article goes live!
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/blog"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-150 text-center"
              >
                Browse All Articles
              </Link>
              <Link
                href="/landing-page#get-started"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-150 text-center"
              >
                Get Started with CareerMindAI
              </Link>
            </div>
          </div>
        </article>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-surface border border-border rounded-lg p-8 text-center">
          <Icon name="EnvelopeIcon" size={48} className="text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Stay Updated
          </h2>
          <p className="text-text-secondary mb-6">
            Subscribe to be notified when new articles are published.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-150 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}