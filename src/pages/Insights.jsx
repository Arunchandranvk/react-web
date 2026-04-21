import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const Insights = () => {
  const articles = [
    {
      id: 1,
      title: "5 Common Estimation Mistakes That Cost Contractors Thousands",
      excerpt: "Learn about the most frequent errors in construction cost estimation and how to avoid them to protect your profit margins.",
      category: "Best Practices",
      author: "Michael Chen",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1770823556202-2eba715a415b?w=600&q=80",
    },
    {
      id: 2,
      title: "How AI is Transforming Construction Cost Estimation",
      excerpt: "Discover how artificial intelligence and machine learning are revolutionizing the way we estimate construction costs.",
      category: "Technology",
      author: "Sarah Johnson",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/36162732/pexels-photo-36162732.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      title: "Material Cost Trends to Watch in 2025",
      excerpt: "An analysis of material prices and supply chain factors that will impact construction costs in the coming year.",
      category: "Industry Trends",
      author: "David Park",
      date: "Dec 5, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1659353588150-a9dff1059c54?w=600&q=80",
    },
    {
      id: 4,
      title: "Winning More Bids: The Art of Competitive Estimation",
      excerpt: "Strategies for creating accurate yet competitive estimates that help you win more projects without sacrificing margins.",
      category: "Business",
      author: "Lisa Martinez",
      date: "Nov 28, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1659353587484-a83a0ddf8aca?w=600&q=80",
    },
    {
      id: 5,
      title: "The Complete Guide to Labor Cost Estimation",
      excerpt: "Everything you need to know about estimating labor costs accurately, from productivity rates to overtime calculations.",
      category: "Guides",
      author: "Robert Wilson",
      date: "Nov 20, 2024",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1770823556202-2eba715a415b?w=600&q=80",
    },
    {
      id: 6,
      title: "Software Integration: Connecting Your Estimation Tools",
      excerpt: "How to integrate your estimation software with accounting, project management, and other business systems.",
      category: "Technology",
      author: "Emily Brown",
      date: "Nov 15, 2024",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/36162732/pexels-photo-36162732.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const categories = ["All", "Best Practices", "Technology", "Industry Trends", "Business", "Guides"];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              INDUSTRY<br />
              <span className="text-primary">INSIGHTS</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Expert articles, guides, and analysis to help you master construction 
              cost estimation and grow your business.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-card border-b border-border">
        <div className="container-wide mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap border transition-colors duration-150 ${
                  category === "All" 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-border">
            {articles.map((article) => (
              <article key={article.id} className="insight-card bg-card">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            STAY UPDATED
          </h2>
          <p className="text-secondary-foreground/80 text-lg mb-8">
            Subscribe to our newsletter for the latest insights, tips, and industry news.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              data-testid="newsletter-email-input"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors duration-150 flex items-center justify-center gap-2"
              data-testid="newsletter-subscribe-btn"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Insights;
