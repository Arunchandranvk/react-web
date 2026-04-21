import { Link } from "react-router-dom";
import { Calculator, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { href: "/about", label: "About Us" },
      { href: "/pricing", label: "Pricing" },
      { href: "/insights", label: "Insights" },
      { href: "/contact", label: "Contact" },
    ],
    legal: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/terms#privacy", label: "Privacy Policy" },
    ],
  };

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      {/* Main Footer */}
      <div className="container-wide mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl uppercase tracking-tight text-white">
                Real Cost Estimating
              </span>
            </Link>
            <p className="text-secondary-foreground/70 max-w-md leading-relaxed mb-6">
              Building the best estimation software for construction professionals. 
              Accurate estimates, streamlined workflows, and powerful insights for your projects.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:info@realcostestimating.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                info@realcostestimating.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                (123) 456-7890
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                123 Construction Ave, Building City, BC 12345
              </span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
            <p>© 2010-{currentYear} Real Cost Estimating Company. All rights reserved.</p>
            <p className="mono text-xs">Built for precision. Designed for professionals.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
