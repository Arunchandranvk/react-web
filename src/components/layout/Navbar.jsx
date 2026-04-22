import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calculator, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/App";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const solid = true;

  const navLinks = [
    { href: "/",         label: "Home" },
    { href: "/about",    label: "About" },
    { href: "/pricing",  label: "Pricing" },
    { href: "/insights", label: "Insights" },
    { href: "/contact",  label: "Contact" },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm"
          : ""
      }`}
    >
      <nav className="container-wide mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" data-testid="navbar-logo">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
              style={{ boxShadow: "0 2px 8px hsl(var(--primary) / 0.30)" }}>
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <span className={`hidden sm:inline font-extrabold text-base tracking-tight transition-colors duration-300 ${
              solid ? "text-foreground" : "text-white"
            }`}>
              Real Cost
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                  isActive(link.href)
                    ? solid ? "text-primary bg-primary/10" : "text-foreground bg-white/90"
                    : solid
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                      : "text-foreground/90 bg-white/70 hover:text-foreground hover:bg-white/90"
                }`}
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <Link to="/dashboard">
                <Button size="sm"
                  className={`rounded-lg text-sm font-semibold ${
                    solid
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-white/90 text-foreground hover:bg-white border border-border"
                  }`}
                  data-testid="nav-dashboard-btn">
                  Dashboard
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm"
                    className={`rounded-lg text-sm font-semibold ${
                      solid
                        ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                        : "text-foreground bg-white/80 hover:text-foreground hover:bg-white"
                    }`}
                    data-testid="nav-login-btn">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm"
                    className="rounded-lg text-sm font-semibold bg-accent text-white hover:bg-accent/90"
                    style={{ boxShadow: "0 2px 8px hsl(var(--accent) / 0.30)" }}
                    data-testid="nav-register-btn">
                    <Zap className="w-3.5 h-3.5 mr-1.5" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              solid ? "text-foreground hover:bg-muted" : "text-foreground bg-white/80 hover:bg-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="mobile-menu md:hidden">
          <div className="mobile-menu-content">
            <Link to="/" className="flex items-center gap-3 mb-4" onClick={() => setMobileOpen(false)}>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"
                style={{ boxShadow: "0 4px 12px hsl(var(--primary) / 0.30)" }}>
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold">Real Cost</span>
            </Link>

            <div className="flex flex-col w-full gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}
                  className={`text-lg font-semibold px-5 py-3.5 rounded-xl text-center transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col w-full gap-3 mt-4">
              {user ? (
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-xl py-5 bg-primary text-white font-semibold">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl py-5 font-semibold">Sign In</Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full rounded-xl py-5 text-white font-semibold bg-accent hover:bg-accent/90">
                      <Zap className="w-4 h-4 mr-2" />Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
