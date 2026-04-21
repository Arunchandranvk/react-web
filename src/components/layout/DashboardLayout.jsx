import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Calculator, 
  LayoutDashboard, 
  FolderOpen, 
  Plus, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/App";

export const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/projects", icon: FolderOpen, label: "Projects" },
    { href: "/projects/new", icon: Plus, label: "New Estimate" },
  ];

  const isActive = (href) => location.pathname === href;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-14 flex items-center px-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 -ml-2"
          data-testid="mobile-sidebar-toggle"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link to="/dashboard" className="flex items-center gap-2 ml-2">
          <div className="w-7 h-7 bg-primary flex items-center justify-center">
            <Calculator className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold uppercase text-sm">Real Cost</span>
        </Link>
      </header>

      <div className="dashboard-grid">
        {/* Sidebar */}
        <aside className={`
          sidebar fixed lg:sticky top-0 left-0 h-screen z-40 w-64 transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-border">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold uppercase tracking-tight">Real Cost</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4">
              <div className="px-3 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3">
                  Menu
                </span>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`sidebar-nav-item mx-2 ${isActive(item.href) ? "active" : ""}`}
                  data-testid={`sidebar-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User Section */}
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-9 h-9 bg-muted flex items-center justify-center border border-border">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 rounded-none text-muted-foreground hover:text-destructive"
                onClick={handleLogout}
                data-testid="logout-btn"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="main-content min-h-screen lg:pt-0 pt-14">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
