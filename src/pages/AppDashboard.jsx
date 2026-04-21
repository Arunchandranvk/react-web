import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  FolderOpen,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  BarChart3,
  FileText,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useAuth } from "@/App";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-card-lg">
      <p className="text-xs font-semibold text-muted-foreground mb-1">{label}</p>
      <p className="text-base font-bold text-foreground mono">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

const AppDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalEstimated: 0,
    activeProjects: 0,
    completedProjects: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, projectsRes] = await Promise.all([
        axios.get(`${API}/dashboard/stats`, { headers: { "x-user-id": user?.id } }),
        axios.get(`${API}/projects?limit=5`,  { headers: { "x-user-id": user?.id } }),
      ]);
      setStats({
        totalProjects:     statsRes.data.totalProjects || 0,
        totalEstimated:    statsRes.data.totalEstimated || 0,
        activeProjects:    statsRes.data.activeProjects || 0,
        completedProjects: (statsRes.data.totalProjects - statsRes.data.activeProjects) || 0,
      });
      setRecentProjects(projectsRes.data || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 67000 },
  ];

  const statCards = [
    {
      label:     "Total Projects",
      value:     stats.totalProjects,
      icon:      FolderOpen,
      change:    "+12%",
      positive:  true,
      iconCls:   "text-blue-600",
      iconBg:    "bg-blue-50",
      topColor:  "#2563EB",
    },
    {
      label:     "Total Estimated",
      value:     `$${(stats.totalEstimated / 1000).toFixed(0)}K`,
      icon:      DollarSign,
      change:    "+8%",
      positive:  true,
      iconCls:   "text-emerald-600",
      iconBg:    "bg-emerald-50",
      topColor:  "#059669",
    },
    {
      label:     "Active Projects",
      value:     stats.activeProjects,
      icon:      Clock,
      change:    "+3",
      positive:  true,
      iconCls:   "text-orange-500",
      iconBg:    "bg-orange-50",
      topColor:  "#F97316",
    },
    {
      label:     "Completed",
      value:     stats.completedProjects,
      icon:      CheckCircle,
      change:    "+5",
      positive:  true,
      iconCls:   "text-violet-600",
      iconBg:    "bg-violet-50",
      topColor:  "#7C3AED",
    },
  ];

  const projectStatuses = [
    { label: "Estimating",    count: stats.activeProjects,    dot: "#2563EB", value: 0 },
    { label: "Bid Submitted", count: 0,                       dot: "#6366F1", value: 0 },
    { label: "Accepted",      count: 0,                       dot: "#059669", value: 0 },
    { label: "In Progress",   count: 0,                       dot: "#F97316", value: 0 },
    { label: "Completed",     count: stats.completedProjects, dot: "#7C3AED", value: stats.totalEstimated },
  ];

  const getStatusBadge = (status) => {
    const map = {
      draft:      "bg-muted text-muted-foreground",
      active:     "bg-emerald-50 text-emerald-700",
      completed:  "bg-blue-50 text-blue-700",
      estimating: "bg-amber-50 text-amber-700",
    };
    return map[status] || map.draft;
  };

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <AppLayout>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Good morning, {firstName} 👋</h1>
          <p className="text-muted-foreground text-sm">Here's what's happening with your projects today.</p>
        </div>
        <Link to="/projects/new">
          <Button className="rounded-xl font-semibold text-white"
            style={{ background:"hsl(var(--primary))", boxShadow:"0 2px 8px hsl(var(--primary) / 0.25)" }}
            data-testid="new-estimate-btn">
            <Plus className="w-4 h-4 mr-2" />
            New Estimate
          </Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, i) => (
          <div key={i} className="premium-card p-5 transition-all duration-200 hover:-translate-y-0.5"
            style={{ borderTop: `3px solid ${card.topColor}` }}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${card.iconBg} ${card.iconCls} rounded-xl flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                card.positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
              }`}>
                {card.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold mono mb-0.5">
              {loading ? <span className="inline-block w-16 h-7 skeleton-pulse" /> : card.value}
            </p>
            <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">

        {/* Revenue area chart */}
        <div className="lg:col-span-2 premium-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <h2 className="font-bold text-base">Revenue Overview</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly estimation revenue</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
              <Activity className="w-3.5 h-3.5" />
              +18.4%
            </span>
          </div>
          <div className="px-2 pt-4 pb-2">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ left: -10, right: 8, top: 4, bottom: 0 }}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="hsl(221,83%,53%)" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(221,83%,53%)" strokeWidth={2.5}
                    fill="url(#grad)" dot={false} activeDot={{ r: 4, fill: "hsl(221,83%,53%)", strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Project status */}
        <div className="premium-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-bold text-base">Project Status</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Distribution by stage</p>
          </div>
          <div className="px-6 py-4 space-y-3.5">
            {projectStatuses.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm mono">{s.count}</span>
                  <span className="text-xs text-muted-foreground mono">${(s.value / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">Total Value</span>
              <span className="font-bold text-base mono">${(stats.totalEstimated / 1000).toFixed(0)}K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent projects */}
      <div className="premium-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-bold text-base">Recent Projects</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Your latest estimation projects</p>
          </div>
          <Link to="/jobs" className="flex items-center gap-1 text-sm font-semibold hover:underline"
            style={{ color:"hsl(var(--primary))" }}>
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading projects...</p>
          </div>
        ) : recentProjects.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-muted-foreground/40" />
            </div>
            <h3 className="font-bold mb-1.5">No projects yet</h3>
            <p className="text-muted-foreground text-sm mb-6">Create your first estimate to get started.</p>
            <Link to="/projects/new">
              <Button className="rounded-xl font-semibold text-white"
                style={{ background:"hsl(var(--primary))", boxShadow:"0 2px 8px hsl(var(--primary) / 0.25)" }}>
                <Plus className="w-4 h-4 mr-2" />
                Create Estimate
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentProjects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/40 group"
                data-testid={`project-row-${project.id}`}>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-blue-100"
                    style={{ background:"hsl(var(--primary) / 0.09)" }}>
                    <FolderOpen className="w-4 h-4" style={{ color:"hsl(var(--primary))" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">{project.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.client || "No client assigned"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="mono font-semibold text-sm min-w-[88px] text-right">
                    ${project.total_cost?.toLocaleString() || "0"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </AppLayout>
  );
};

export default AppDashboard;
