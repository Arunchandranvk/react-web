import { PublicLayout } from "@/components/layout";
import { Building2, Target, Users, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "We're obsessed with accuracy. Every feature we build is designed to help you create the most precise estimates possible."
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Our customers are at the heart of everything we do. We listen, learn, and continuously improve based on your feedback."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We hold ourselves to the highest standards. From code quality to customer support, excellence is our baseline."
    },
  ];

  const milestones = [
    { year: "2010", event: "Company founded with a vision to revolutionize construction estimation" },
    { year: "2013", event: "Launched first cloud-based estimation platform" },
    { year: "2016", event: "Reached 100+ enterprise customers" },
    { year: "2019", event: "Introduced AI-powered cost prediction" },
    { year: "2022", event: "Expanded to serve 500+ companies worldwide" },
    { year: "2024", event: "Launched next-generation estimation dashboard" },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground section-padding">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary mb-8">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              BUILDING THE FUTURE OF<br />
              <span className="text-primary">CONSTRUCTION ESTIMATION</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80 leading-relaxed">
              Since 2010, we've been dedicated to helping construction professionals 
              create accurate estimates faster and win more projects.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                EMPOWERING BUILDERS WITH<br />PRECISION TOOLS
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We believe that accurate cost estimation is the foundation of successful construction projects. 
                Our mission is to provide tools that give builders, contractors, and project managers 
                the confidence to bid competitively and deliver profitably.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With over a decade of experience in the construction industry, we understand the challenges 
                you face. That's why we've built a platform that combines powerful technology with 
                industry-specific expertise to deliver estimates you can trust.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-muted border border-border overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1770823556202-2eba715a415b?w=800&q=80"
                  alt="Construction site"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary p-8">
                <p className="text-primary-foreground font-bold text-4xl mono">13+</p>
                <p className="text-primary-foreground/80">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              WHAT DRIVES US FORWARD
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-1 bg-border">
            {values.map((value, index) => (
              <div key={index} className="bg-card p-8 lg:p-12">
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              KEY MILESTONES
            </h2>
          </div>
          
          <div className="border border-border">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="flex gap-6 p-6 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors duration-150"
              >
                <span className="mono text-2xl font-bold text-primary w-20 flex-shrink-0">
                  {milestone.year}
                </span>
                <p className="text-lg">{milestone.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide mx-auto text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">Our Team</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            INDUSTRY EXPERTS & TECH INNOVATORS
          </h2>
          <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Our team combines deep construction industry expertise with cutting-edge technology skills 
            to deliver solutions that truly understand your needs.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
