import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreVertical,
  Filter,
  Eye,
  Copy,
  Trash2,
  Calendar,
  DollarSign,
  Briefcase,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/App";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/* ── Status config ── */
const STATUS_CONFIG = {
  estimating:   { label: "Estimating",    dot: "#2563EB", cls: "bg-blue-50 text-blue-700",    ring: "ring-blue-200" },
  bidSubmitted: { label: "Bid Submitted", dot: "#6366F1", cls: "bg-indigo-50 text-indigo-700", ring: "ring-indigo-200" },
  accepted:     { label: "Accepted",      dot: "#059669", cls: "bg-emerald-50 text-emerald-700",ring: "ring-emerald-200" },
  inProgress:   { label: "In Progress",   dot: "#F97316", cls: "bg-orange-50 text-orange-700", ring: "ring-orange-200" },
  completed:    { label: "Completed",     dot: "#7C3AED", cls: "bg-violet-50 text-violet-700", ring: "ring-violet-200" },
  rejected:     { label: "Rejected",      dot: "#DC2626", cls: "bg-red-50 text-red-700",       ring: "ring-red-200" },
  draft:        { label: "Draft",         dot: "#94A3B8", cls: "bg-muted text-muted-foreground",ring: "ring-muted" },
  active:       { label: "Active",        dot: "#059669", cls: "bg-emerald-50 text-emerald-700",ring: "ring-emerald-200" },
};

const StatusPill = ({ status, small }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${
      small ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
    } ${cfg.cls}`}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
};

const TABS = [
  { key: "all",          label: "All",           dot: "#64748B" },
  { key: "estimating",   label: "Estimating",    dot: "#2563EB" },
  { key: "bidSubmitted", label: "Bid Submitted",  dot: "#6366F1" },
  { key: "accepted",     label: "Accepted",       dot: "#059669" },
  { key: "inProgress",   label: "In Progress",    dot: "#F97316" },
  { key: "completed",    label: "Completed",      dot: "#7C3AED" },
  { key: "rejected",     label: "Rejected",       dot: "#DC2626" },
];

const Jobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy]       = useState("newest");

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}/projects`, { headers: { "x-user-id": user?.id } });
      setJobs(res.data.map((p) => ({
        id:         p.id,
        jobName:    p.name,
        jobNumber:  `JOB-${p.id.substring(0, 8).toUpperCase()}`,
        client:     p.client || "—",
        dueDate:    new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        totalSales: p.total_cost || 0,
        estimator:  user?.name || "User",
        status:     p.status || "estimating",
        createdAt:  p.created_at,
      })));
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (jobId, status) => {
    try {
      await axios.put(`${API}/projects/${jobId}`, { status }, { headers: { "x-user-id": user?.id } });
      setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, status } : j));
      toast.success("Status updated");
    } catch { toast.error("Failed to update status"); }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await axios.delete(`${API}/projects/${jobId}`, { headers: { "x-user-id": user?.id } });
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      toast.success("Job deleted");
    } catch { toast.error("Failed to delete job"); }
  };

  const tabCount = (key) => key === "all" ? jobs.length : jobs.filter((j) => j.status === key).length;

  const filtered = jobs
    .filter((j) => {
      const q = searchQuery.toLowerCase();
      const matchQ = j.jobName.toLowerCase().includes(q) || j.jobNumber.toLowerCase().includes(q) || j.client.toLowerCase().includes(q);
      const matchT = activeTab === "all" || j.status === activeTab;
      return matchQ && matchT;
    })
    .sort((a, b) => {
      if (sortBy === "newest")     return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")     return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "value-high") return b.totalSales - a.totalSales;
      if (sortBy === "value-low")  return a.totalSales - b.totalSales;
      if (sortBy === "name")       return a.jobName.localeCompare(b.jobName);
      return 0;
    });

  return (
    <AppLayout>

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Jobs</h1>
          <p className="text-muted-foreground text-sm">Manage your estimation projects and bids.</p>
        </div>
        <Link to="/projects/new">
          <Button className="rounded-xl font-semibold text-white bg-primary hover:bg-primary/90"
            style={{ boxShadow: "0 2px 8px hsl(var(--primary) / 0.25)" }}
            data-testid="create-job-btn">
            <Plus className="w-4 h-4 mr-2" />
            Create New Job
          </Button>
        </Link>
      </div>

      {/* ── Status tabs ── */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
        {TABS.map((tab) => {
          const count = tabCount(tab.key);
          const active = activeTab === tab.key;
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
                active
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
              data-testid={`tab-${tab.key}`}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: tab.dot }} />
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Search + sort bar ── */}
      <div className="premium-card p-4 mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <Input placeholder="Search by job name, number, or client…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl border-border/70 focus:border-primary h-10 text-sm"
            data-testid="search-jobs-input" />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 rounded-xl h-10 text-sm border-border/70">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="value-high">Highest Value</SelectItem>
              <SelectItem value="value-low">Lowest Value</SelectItem>
              <SelectItem value="name">Name A–Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Jobs list ── */}
      <div className="premium-card overflow-hidden">

        {/* Table head */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <div className="col-span-4">Job</div>
          <div className="col-span-2">Client</div>
          <div className="col-span-2">Created</div>
          <div className="col-span-2 text-right">Value</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1" />
        </div>

        {/* Body */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading jobs…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center px-6">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <h3 className="font-bold text-base mb-1.5">
              {searchQuery || activeTab !== "all" ? "No matching jobs" : "No jobs yet"}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              {searchQuery || activeTab !== "all"
                ? "Try adjusting your search or filter."
                : "Create your first job to get started."}
            </p>
            {!searchQuery && activeTab === "all" && (
              <Link to="/projects/new">
                <Button className="rounded-xl font-semibold text-white bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Job
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((job) => (
              <div key={job.id}
                className="group px-5 py-4 hover:bg-muted/40 transition-colors"
                data-testid={`job-row-${job.id}`}>

                {/* Desktop row */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <Link to={`/projects/${job.id}`}
                      className="font-semibold text-sm hover:text-primary transition-colors flex items-center gap-1 group/link"
                      data-testid={`job-link-${job.id}`}>
                      {job.jobName}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity text-primary" />
                    </Link>
                    <p className="text-xs text-muted-foreground mono mt-0.5">{job.jobNumber}</p>
                  </div>

                  <div className="col-span-2 text-sm text-muted-foreground truncate">{job.client}</div>

                  <div className="col-span-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                    {job.dueDate}
                  </div>

                  <div className="col-span-2 text-right">
                    <span className="font-bold mono text-sm text-foreground">
                      ${job.totalSales.toLocaleString()}
                    </span>
                  </div>

                  <div className="col-span-1">
                    <Select value={job.status} onValueChange={(v) => updateStatus(job.id, v)}>
                      <SelectTrigger className={`h-7 rounded-lg border-0 text-xs font-semibold px-2 w-auto min-w-0 ${
                        (STATUS_CONFIG[job.status] || STATUS_CONFIG.draft).cls
                      }`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {Object.entries(STATUS_CONFIG).slice(0, 6).map(([val, cfg]) => (
                          <SelectItem key={val} value={val} className="text-sm">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
                              {cfg.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"
                          className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl w-44">
                        <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                          <Link to={`/projects/${job.id}`} className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 rounded-lg cursor-pointer">
                          <Copy className="w-4 h-4 text-muted-foreground" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteJob(job.id)}
                          className="flex items-center gap-2 rounded-lg cursor-pointer text-destructive focus:text-destructive">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Mobile card */}
                <div className="md:hidden space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link to={`/projects/${job.id}`}
                        className="font-semibold text-sm hover:text-primary transition-colors block truncate">
                        {job.jobName}
                      </Link>
                      <p className="text-xs text-muted-foreground mono mt-0.5">{job.jobNumber}</p>
                    </div>
                    <StatusPill status={job.status} small />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {job.dueDate}
                    </span>
                    <span className="font-bold mono text-foreground text-sm">
                      ${job.totalSales.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border bg-muted/20">
            <p className="text-sm text-muted-foreground">
              {filtered.length} of {jobs.length} jobs
            </p>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <DollarSign className="w-3.5 h-3.5" />
              Total:
              <span className="font-bold mono text-foreground ml-0.5">
                ${filtered.reduce((s, j) => s + j.totalSales, 0).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

    </AppLayout>
  );
};

export default Jobs;
