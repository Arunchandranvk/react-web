import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  FolderOpen, 
  TrendingUp, 
  DollarSign, 
  FileText,
  ArrowRight,
  Clock
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@/App";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalEstimated: 0,
    activeProjects: 0,
    avgAccuracy: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, projectsRes] = await Promise.all([
        axios.get(`${API}/dashboard/stats`, {
          headers: { "x-user-id": user?.id }
        }),
        axios.get(`${API}/projects?limit=5`, {
          headers: { "x-user-id": user?.id }
        }),
      ]);
      setStats(statsRes.data);
      setRecentProjects(projectsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      icon: FolderOpen, 
      label: "Total Projects", 
      value: stats.totalProjects,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    { 
      icon: DollarSign, 
      label: "Total Estimated", 
      value: `$${(stats.totalEstimated / 1000000).toFixed(1)}M`,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    { 
      icon: Clock, 
      label: "Active Projects", 
      value: stats.activeProjects,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    { 
      icon: TrendingUp, 
      label: "Avg Accuracy", 
      value: `${stats.avgAccuracy}%`,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      draft: "badge-status draft",
      active: "badge-status active",
      completed: "badge-status completed",
      archived: "badge-status archived",
    };
    return statusStyles[status] || statusStyles.draft;
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0] || "User"}</h1>
            <p className="text-muted-foreground">Here's an overview of your estimation activity</p>
          </div>
          <Link to="/projects/new">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none" data-testid="new-estimate-btn">
              <Plus className="w-4 h-4 mr-2" />
              New Estimate
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 bg-border mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-card p-6 border-r border-border last:border-r-0">
              <div className={`w-10 h-10 ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="mono text-2xl font-bold mb-1">{loading ? "—" : stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="border border-border bg-card">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-bold uppercase tracking-wider">Recent Projects</h2>
            <Link to="/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent animate-spin mx-auto mb-2"></div>
              Loading...
            </div>
          ) : recentProjects.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-bold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">Create your first estimate to get started</p>
              <Link to="/projects/new">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Estimate
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentProjects.map((project) => (
                <Link 
                  key={project.id} 
                  to={`/projects/${project.id}`}
                  className="estimate-row flex items-center justify-between p-4 hover:bg-muted/30"
                  data-testid={`project-row-${project.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{project.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{project.client}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={getStatusBadge(project.status)}>
                      {project.status}
                    </span>
                    <span className="mono font-medium text-right min-w-[100px]">
                      ${project.total_cost?.toLocaleString() || "0"}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
