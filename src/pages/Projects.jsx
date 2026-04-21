import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter,
  ArrowRight,
  FileText,
  MoreVertical,
  Trash2,
  Copy,
  Archive
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/App";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API}/projects`, {
        headers: { "x-user-id": user?.id }
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      await axios.delete(`${API}/projects/${id}`, {
        headers: { "x-user-id": user?.id }
      });
      setProjects(projects.filter(p => p.id !== id));
      toast.success("Project deleted");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const duplicateProject = async (project) => {
    try {
      const response = await axios.post(`${API}/projects`, {
        ...project,
        name: `${project.name} (Copy)`,
        status: "draft",
      }, {
        headers: { "x-user-id": user?.id }
      });
      setProjects([response.data, ...projects]);
      toast.success("Project duplicated");
    } catch (error) {
      toast.error("Failed to duplicate project");
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      draft: "badge-status draft",
      active: "badge-status active",
      completed: "badge-status completed",
      archived: "badge-status archived",
    };
    return statusStyles[status] || statusStyles.draft;
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.client?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ["all", "draft", "active", "completed", "archived"];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage your cost estimates</p>
          </div>
          <Link to="/projects/new">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none" data-testid="new-project-btn">
              <Plus className="w-4 h-4 mr-2" />
              New Estimate
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-none"
              data-testid="search-projects-input"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-1">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-sm font-medium border transition-colors ${
                    statusFilter === status
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                  data-testid={`filter-${status}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="border border-border bg-card">
          {loading ? (
            <div className="p-12 text-center text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent animate-spin mx-auto mb-2"></div>
              Loading projects...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-bold mb-2">
                {searchQuery || statusFilter !== "all" ? "No matching projects" : "No projects yet"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your filters" 
                  : "Create your first estimate to get started"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Link to="/projects/new">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Estimate
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 border-b border-border text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="col-span-5">Project</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Total Cost</div>
                <div className="col-span-2 text-right">Updated</div>
                <div className="col-span-1"></div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-border">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-colors"
                  >
                    <div className="col-span-5">
                      <Link 
                        to={`/projects/${project.id}`}
                        className="font-medium hover:text-primary transition-colors"
                        data-testid={`project-link-${project.id}`}
                      >
                        {project.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{project.client || "No client"}</p>
                    </div>
                    <div className="col-span-2">
                      <span className={getStatusBadge(project.status)}>
                        {project.status}
                      </span>
                    </div>
                    <div className="col-span-2 text-right mono font-medium">
                      ${project.total_cost?.toLocaleString() || "0"}
                    </div>
                    <div className="col-span-2 text-right text-sm text-muted-foreground">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild>
                            <Link to={`/projects/${project.id}`} className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => duplicateProject(project)} className="flex items-center gap-2">
                            <Copy className="w-4 h-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deleteProject(project.id)}
                            className="flex items-center gap-2 text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
