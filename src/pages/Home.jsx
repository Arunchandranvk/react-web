import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calculator,
  BarChart3,
  Clock,
  Shield,
  Users,
  CheckCircle2,
  ChevronRight,
  Building2,
  TrendingUp,
  FileText,
  Star,
  Zap,
  Sparkles,
} from "lucide-react";

const Home = () => {
  const stats = [
    { value: "15K+", label: "Projects Estimated" },
    { value: "98%",  label: "Accuracy Rate" },
    { value: "500+", label: "Companies Trust Us" },
    { value: "13",   label: "Years Experience" },
  ];

  const features = [
    {
      icon: Calculator,
      title: "Precise Estimates",
      description: "Industry-leading algorithms ensure your cost estimates are accurate down to the last detail.",
      iconCls: "text-blue-600",
      bgCls:   "bg-blue-50",
    },
    {
      icon: Clock,
      title: "Save 80% Time",
      description: "Automate repetitive calculations and generate professional estimates in minutes, not hours.",
      iconCls: "text-orange-500",
      bgCls:   "bg-orange-50",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track project costs, compare estimates, and identify trends with powerful analytics.",
      iconCls: "text-emerald-600",
      bgCls:   "bg-emerald-50",
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade security keeps your project data and client information protected.",
      iconCls: "text-violet-600",
      bgCls:   "bg-violet-50",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with role-based access and real-time project updates.",
      iconCls: "text-blue-600",
      bgCls:   "bg-blue-50",
    },
    {
      icon: FileText,
      title: "Professional Reports",
      description: "Generate branded, detailed reports that impress clients and win more bids.",
      iconCls: "text-orange-500",
      bgCls:   "bg-orange-50",
    },
  ];

  const testimonials = [
    {
      quote: "Real Cost has transformed how we handle estimates. What used to take days now takes hours.",
      author: "Michael Chen",
      role: "Project Manager",
      company: "BuildRight Construction",
      rating: 5,
      image: "https://images.unsplash.com/photo-1659353588150-a9dff1059c54?w=100&h=100&fit=crop",
    },
    {
      quote: "The accuracy of their estimates has helped us win more competitive bids while maintaining healthy margins.",
      author: "Sarah Johnson",
      role: "Lead Estimator",
      company: "Metro Builders Inc",
      rating: 5,
      image: "https://images.unsplash.com/photo-1659353587484-a83a0ddf8aca?w=100&h=100&fit=crop",
    },
  ];

  const trialPerks = [
    "14-day free trial, no credit card required",
    "Full access to all Professional features",
    "Onboarding support included",
    "Cancel anytime",
  ];

  return (
    <PublicLayout>

      {/* ─── Hero ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ background: "#07101F" }}>
        {/* BG image */}
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770823556202-2eba715a415b?w=1920&q=80')" }} />
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />
        {/* Grid */}
        <div className="absolute inset-0 grid-pattern" />
        {/* Glow orbs */}
        <div className="absolute rounded-full blur-3xl pointer-events-none"
          style={{ top:"18%", right:"12%", width:"460px", height:"460px",
            background:"radial-gradient(circle, rgba(37,99,235,0.20) 0%, transparent 70%)" }} />
        <div className="absolute rounded-full blur-3xl pointer-events-none"
          style={{ bottom:"18%", left:"22%", width:"300px", height:"300px",
            background:"radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)" }} />

        <div className="relative z-10 container-wide mx-auto px-6 lg:px-8 py-28">
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold mb-8 animate-scale-in"
              style={{ background:"rgba(37,99,235,0.15)", border:"1px solid rgba(37,99,235,0.28)", color:"#93C5FD" }}>
              <Building2 className="w-3.5 h-3.5" />
              Construction Estimation Software
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 animate-slide-up">
              Build Smarter.<br />
              Estimate <span className="text-gradient">Faster.</span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-fade-in"
              style={{ color:"rgba(255,255,255,0.65)" }}>
              Accurate cost estimates, streamlined workflows, and powerful insights
              for construction professionals who demand precision.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
              <Link to="/register">
                <Button size="lg" className="rounded-xl px-8 h-12 text-base font-semibold text-white w-full sm:w-auto"
                  style={{ background:"hsl(var(--accent))", boxShadow:"0 8px 24px rgba(249,115,22,0.28)" }}
                  data-testid="hero-cta-btn">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="rounded-xl px-8 h-12 text-base font-semibold w-full sm:w-auto"
                  style={{ borderColor:"rgba(255,255,255,0.20)", background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.90)" }}
                  data-testid="hero-pricing-btn">
                  View Pricing
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-10 animate-fade-in">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1659353588150-a9dff1059c54?w=40&h=40&fit=crop",
                  "https://images.unsplash.com/photo-1659353587484-a83a0ddf8aca?w=40&h=40&fit=crop",
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full object-cover"
                    style={{ border:"2px solid rgba(255,255,255,0.20)" }} />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm ml-1" style={{ color:"rgba(255,255,255,0.55)" }}>
                  Trusted by <span className="text-white font-semibold">500+</span> firms
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-white border-b border-border">
        <div className="container-wide mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {stats.map((stat, i) => (
              <div key={i} className={`py-10 px-6 text-center ${i < 2 ? "border-b border-border lg:border-b-0" : ""}`}>
                <p className="stat-number text-foreground mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold mb-5"
              style={{ background:"hsl(var(--primary) / 0.08)", border:"1px solid hsl(var(--primary) / 0.15)", color:"hsl(var(--primary))" }}>
              <Sparkles className="w-3.5 h-3.5" />
              Features
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Everything You Need for<br />
              <span className="text-gradient">Accurate Estimates</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our comprehensive suite of tools helps you create precise estimates,
              manage projects efficiently, and win more bids.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="premium-card-hover p-8 group">
                <div className={`w-12 h-12 ${f.bgCls} ${f.iconCls} rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold mb-2.5">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding section-dark">
        <div className="container-wide mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold mb-6"
                style={{ background:"rgba(249,115,22,0.15)", border:"1px solid rgba(249,115,22,0.28)", color:"#FDBA74" }}>
                <Zap className="w-3.5 h-3.5" />
                Start Today
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Ready to Transform<br />Your Estimating Process?
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color:"rgba(255,255,255,0.55)" }}>
                Join thousands of construction professionals who trust Real Cost
                for accurate, efficient cost estimation.
              </p>
              <ul className="space-y-3 mb-10">
                {trialPerks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background:"rgba(249,115,22,0.15)", border:"1px solid rgba(249,115,22,0.30)" }}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span className="text-sm" style={{ color:"rgba(255,255,255,0.72)" }}>{perk}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register">
                <Button size="lg" className="rounded-xl px-8 h-12 font-semibold text-white"
                  style={{ background:"hsl(var(--accent))", boxShadow:"0 8px 24px rgba(249,115,22,0.28)" }}
                  data-testid="cta-start-trial-btn">
                  Start Your Free Trial
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border:"1px solid rgba(255,255,255,0.09)", boxShadow:"0 20px 40px rgba(0,0,0,0.35)" }}>
                <div className="aspect-video">
                  <img src="https://images.pexels.com/photos/36162732/pexels-photo-36162732.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Construction site" className="w-full h-full object-cover opacity-80" />
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-card-xl border border-border">
                <TrendingUp className="w-5 h-5 text-accent mb-2" />
                <p className="font-bold text-2xl mono text-foreground leading-none">+47%</p>
                <p className="text-muted-foreground text-xs font-medium mt-1">Efficiency Gain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold mb-5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Trusted by Industry<br />Professionals
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card transition-all duration-200 hover:border-primary/20 hover:-translate-y-0.5">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-foreground text-base leading-relaxed mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.author}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-border" />
                  <div>
                    <p className="font-semibold text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </PublicLayout>
  );
};

export default Home;
