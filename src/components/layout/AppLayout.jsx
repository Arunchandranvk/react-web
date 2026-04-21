import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Database,
  PlayCircle,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Calculator,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/App";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/jobs",      icon: Briefcase,        label: "Jobs" },
  { href: "/calendar",  icon: Calendar,         label: "Calendar" },
  { href: "/database",  icon: Database,         label: "Database" },
  { href: "/tutorials", icon: PlayCircle,       label: "Tutorials" },
];

export const AppLayout = ({ children, title }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (href) => location.pathname === href;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "RC";

  return (
    <div className="min-h-screen bg-background">

      {/* ── Top Navigation Bar ── */}
      <header
        className="bg-secondary sticky top-0 z-50"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 1px 0 rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center h-15 px-4 lg:px-6 gap-2" style={{ height: "60px" }}>

          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 flex-shrink-0 mr-6"
            data-testid="app-logo"
          >
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center"
              style={{ boxShadow: "0 2px 8px rgba(249,115,22,0.3)" }}>
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-white text-sm tracking-tight hidden sm:block">
              REAL COST
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center h-full flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="relative flex items-center gap-2 px-4 h-full text-sm font-semibold transition-colors duration-150"
                style={{
                  color: isActive(item.href) ? "#fff" : "rgba(255,255,255,0.50)",
                }}
                onMouseEnter={(e) => !isActive(item.href) && (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                onMouseLeave={(e) => !isActive(item.href) && (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {/* Active accent underline */}
                {isActive(item.href) && (
                  <span
                    className="absolute bottom-0 left-3 right-3 rounded-t-full"
                    style={{ height: "2px", background: "hsl(var(--accent))" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Search */}
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                style={{ color: "rgba(255,255,255,0.25)" }} />
              <Input
                placeholder="Search..."
                className="h-8 pl-9 pr-3 text-sm rounded-lg border-0 text-white placeholder:text-white/25 w-48 focus:w-56 transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
            </div>

            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              <Bell className="w-5 h-5" />
              <span
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full ring-2"
                style={{ background: "hsl(var(--accent))", ringColor: "hsl(var(--secondary))" }}
              />
            </button>

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors"
                  style={{ color: "#fff" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  data-testid="user-menu-trigger"
                >
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, hsl(221,83%,53%), hsl(258,83%,65%))" }}
                  >
                    {initials}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-semibold text-white leading-tight">{user?.name || "User"}</p>
                    <p className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {user?.company || ""}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" style={{ color: "rgba(255,255,255,0.30)" }} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 rounded-xl shadow-card-lg">
                <div className="px-3 py-2.5 border-b border-border">
                  <p className="font-semibold text-sm truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
                <DropdownMenuItem className="cursor-pointer rounded-lg my-0.5">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-lg my-0.5">
                  <Settings className="w-4 h-4 mr-2 text-muted-foreground" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive cursor-pointer rounded-lg my-0.5"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors text-white"
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden px-3 pb-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold mb-0.5 transition-all"
                style={{
                  background: isActive(item.href) ? "rgba(255,255,255,0.10)" : "transparent",
                  color: isActive(item.href) ? "#fff" : "rgba(255,255,255,0.55)",
                }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Optional page heading */}
      {title && (
        <div className="border-b border-border px-6 py-4 bg-background">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      )}

      {/* Page content */}
      <main className="p-4 lg:p-6 xl:p-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
