import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Building2, Rocket, Sparkles } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "49",
      period: "per month",
      description: "Perfect for small contractors and individual estimators.",
      features: [
        { text: "Up to 10 projects/month", included: true },
        { text: "Basic cost estimation",   included: true },
        { text: "PDF report export",       included: true },
        { text: "Email support",           included: true },
        { text: "Team collaboration",      included: false },
        { text: "Advanced analytics",      included: false },
        { text: "API access",              included: false },
        { text: "Custom integrations",     included: false },
      ],
      cta: "Start Free Trial",
      featured: false,
      iconCls: "text-blue-500",
      iconBg:  "bg-blue-50",
    },
    {
      name: "Professional",
      icon: Building2,
      price: "149",
      period: "per month",
      description: "Ideal for growing construction companies.",
      features: [
        { text: "Unlimited projects",       included: true },
        { text: "Advanced cost estimation", included: true },
        { text: "All export formats",       included: true },
        { text: "Priority support",         included: true },
        { text: "Up to 10 team members",   included: true },
        { text: "Advanced analytics",       included: true },
        { text: "API access",               included: false },
        { text: "Custom integrations",      included: false },
      ],
      cta: "Start Free Trial",
      featured: true,
      iconCls: "text-white",
      iconBg:  "bg-white/20",
    },
    {
      name: "Enterprise",
      icon: Rocket,
      price: "Custom",
      period: "contact sales",
      description: "For large organizations with complex needs.",
      features: [
        { text: "Unlimited everything",          included: true },
        { text: "Custom estimation models",      included: true },
        { text: "White-label reports",           included: true },
        { text: "24/7 dedicated support",        included: true },
        { text: "Unlimited team members",        included: true },
        { text: "Custom analytics & dashboards", included: true },
        { text: "Full API access",               included: true },
        { text: "Custom integrations",           included: true },
      ],
      cta: "Contact Sales",
      featured: false,
      iconCls: "text-violet-500",
      iconBg:  "bg-violet-50",
    },
  ];

  const faqs = [
    {
      q: "What's included in the free trial?",
      a: "Our 14-day free trial gives you full access to all Professional plan features. No credit card required.",
    },
    {
      q: "Can I change plans later?",
      a: "Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, ACH transfers, and wire transfers for Enterprise customers.",
    },
    {
      q: "Is there a discount for annual billing?",
      a: "Yes! Save 20% when you choose annual billing. Contact our sales team for details.",
    },
  ];

  return (
    <PublicLayout>

      {/* ── Hero ── */}
      <section className="section-padding section-dark text-center">
        <div className="container-narrow mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ background:"rgba(37,99,235,0.15)", border:"1px solid rgba(37,99,235,0.25)", color:"#93C5FD" }}>
            <Sparkles className="w-3.5 h-3.5" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Choose the plan<br />that fits your team.
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color:"rgba(255,255,255,0.55)" }}>
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5 items-start">
            {plans.map((plan, i) => (
              <div key={i}
                className="relative rounded-2xl p-8 transition-all duration-200"
                style={plan.featured ? {
                  background: "linear-gradient(145deg, #1D4ED8, #2563EB, #1E40AF)",
                  boxShadow: "0 20px 40px rgba(37,99,235,0.25)",
                } : {
                  background: "#fff",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.07)",
                }}
                data-testid={`pricing-${plan.name.toLowerCase()}`}
              >
                {/* Popular badge */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background:"hsl(var(--accent))", boxShadow:"0 2px 8px rgba(249,115,22,0.30)" }}>
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 ${plan.iconBg} ${plan.iconCls} rounded-xl flex items-center justify-center`}>
                    <plan.icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-lg font-bold ${plan.featured ? "text-white" : ""}`}>{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-3 flex items-end gap-1.5">
                  <span className={`mono text-5xl font-extrabold leading-none ${plan.featured ? "text-white" : "text-foreground"}`}>
                    {plan.price === "Custom" ? "Custom" : `$${plan.price}`}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className={`text-sm mb-1.5 ${plan.featured ? "text-white/60" : "text-muted-foreground"}`}>/mo</span>
                  )}
                </div>

                <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? "text-white/65" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>

                {/* CTA */}
                <Link to={plan.price === "Custom" ? "/contact" : "/register"}>
                  <Button className={`w-full rounded-xl mb-7 font-semibold ${
                    plan.featured ? "bg-white text-primary hover:bg-white/90" : "text-white"
                  }`}
                  style={!plan.featured ? {
                    background: "hsl(var(--primary))",
                    boxShadow: "0 2px 8px hsl(var(--primary) / 0.22)",
                  } : undefined}
                  data-testid={`pricing-${plan.name.toLowerCase()}-cta`}>
                    {plan.cta}
                  </Button>
                </Link>

                <div className={`border-t mb-6 ${plan.featured ? "border-white/15" : "border-border"}`} />

                <ul className="space-y-3">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      {feat.included ? (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.featured ? "bg-white/20" : "bg-emerald-50"
                        }`}>
                          <Check className={`w-3 h-3 ${plan.featured ? "text-white" : "text-emerald-600"}`} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-muted">
                          <X className="w-3 h-3 text-muted-foreground/40" />
                        </div>
                      )}
                      <span className={`text-sm ${
                        !feat.included
                          ? plan.featured ? "text-white/28" : "text-muted-foreground/45"
                          : plan.featured ? "text-white/85" : "text-foreground"
                      }`}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Save <span className="font-semibold text-foreground">20%</span> with annual billing ·{" "}
            <Link to="/contact" className="font-semibold hover:underline" style={{ color:"hsl(var(--primary))" }}>
              Contact us for a custom quote
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="section-padding bg-muted/40 border-y border-border">
        <div className="container-narrow mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-3 text-base">Everything you need to know about our plans.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="premium-card p-6">
                <h3 className="font-bold text-base mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto px-6 text-center">
          <div className="premium-card p-12">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button className="rounded-xl px-8 font-semibold text-white"
                  style={{ background:"hsl(var(--primary))", boxShadow:"0 2px 8px hsl(var(--primary) / 0.22)" }}>
                  Contact Sales
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="rounded-xl px-8 font-semibold">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>
  );
};

export default Pricing;
