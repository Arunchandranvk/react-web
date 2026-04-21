import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Trash2, 
  Save, 
  ArrowLeft, 
  Calculator,
  Download,
  Edit,
  X
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/App";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    description: "",
    project_type: "residential",
    location: "",
    status: "draft",
  });
  const [costItems, setCostItems] = useState([]);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`${API}/projects/${id}`, {
        headers: { "x-user-id": user?.id }
      });
      setProject(response.data);
      setFormData({
        name: response.data.name,
        client: response.data.client || "",
        description: response.data.description || "",
        project_type: response.data.project_type || "residential",
        location: response.data.location || "",
        status: response.data.status || "draft",
      });
      setCostItems(response.data.cost_items || []);
    } catch (error) {
      toast.error("Failed to load project");
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCostItemChange = (index, field, value) => {
    const updated = [...costItems];
    updated[index][field] = field === "quantity" || field === "unit_cost" ? parseFloat(value) || 0 : value;
    setCostItems(updated);
  };

  const addCostItem = () => {
    setCostItems([...costItems, { category: "Materials", description: "", quantity: 1, unit: "units", unit_cost: 0 }]);
  };

  const removeCostItem = (index) => {
    if (costItems.length > 1) {
      setCostItems(costItems.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    return costItems.reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const projectData = {
        ...formData,
        cost_items: costItems.filter(item => item.description.trim()),
        total_cost: calculateTotal(),
      };

      const response = await axios.put(`${API}/projects/${id}`, projectData, {
        headers: { "x-user-id": user?.id }
      });

      setProject(response.data);
      setEditing(false);
      toast.success("Project saved successfully!");
    } catch (error) {
      toast.error("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const getChartData = () => {
    const categoryTotals = {};
    costItems.forEach(item => {
      const total = item.quantity * item.unit_cost;
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + total;
    });
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  };

  const COLORS = ['#1E3A5F', '#D4AF37', '#0F2340', '#4A90B8', '#C9A227', '#2E5A7C', '#8B7355', '#5C7A99'];

  const projectTypes = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "renovation", label: "Renovation" },
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "archived", label: "Archived" },
  ];

  const costCategories = ["Materials", "Labor", "Equipment", "Subcontractor", "Permits", "Overhead", "Contingency", "Other"];
  const units = ["units", "sqft", "sqm", "linear ft", "hours", "days", "lump sum"];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading project...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/projects")}
              className="rounded-none"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{project?.name}</h1>
              <p className="text-muted-foreground">{project?.client || "No client"}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {editing ? (
              <>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: project.name,
                      client: project.client || "",
                      description: project.description || "",
                      project_type: project.project_type || "residential",
                      location: project.location || "",
                      status: project.status || "draft",
                    });
                    setCostItems(project.cost_items || []);
                  }}
                  className="rounded-none"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none"
                  data-testid="save-changes-btn"
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline"
                  className="rounded-none"
                  data-testid="export-btn"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button 
                  onClick={() => setEditing(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none"
                  data-testid="edit-btn"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Details */}
            <div className="border border-border bg-card p-6">
              <h2 className="font-bold uppercase tracking-wider mb-6 pb-2 border-b border-border">
                Project Details
              </h2>
              
              {editing ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Project Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="rounded-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client">Client</Label>
                      <Input
                        id="client"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className="rounded-none"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Project Type</Label>
                      <Select value={formData.project_type} onValueChange={(v) => handleSelectChange("project_type", v)}>
                        <SelectTrigger className="rounded-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((t) => (
                            <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={formData.status} onValueChange={(v) => handleSelectChange("status", v)}>
                        <SelectTrigger className="rounded-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="rounded-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="rounded-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Project Type</p>
                    <p className="font-medium capitalize">{project?.project_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <span className={`badge-status ${project?.status}`}>{project?.status}</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="font-medium">{project?.location || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Created</p>
                    <p className="font-medium">{new Date(project?.created_at).toLocaleDateString()}</p>
                  </div>
                  {project?.description && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Description</p>
                      <p>{project.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cost Items */}
            <div className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
                <h2 className="font-bold uppercase tracking-wider">Cost Breakdown</h2>
                {editing && (
                  <Button type="button" onClick={addCostItem} variant="outline" className="rounded-none" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                )}
              </div>

              {editing ? (
                <div className="space-y-4">
                  {costItems.map((item, index) => (
                    <div key={index} className="border border-border p-4 bg-muted/30">
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-6 md:col-span-2">
                          <Label className="text-xs">Category</Label>
                          <Select value={item.category} onValueChange={(v) => handleCostItemChange(index, "category", v)}>
                            <SelectTrigger className="rounded-none mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {costCategories.map((c) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-6 md:col-span-4">
                          <Label className="text-xs">Description</Label>
                          <Input
                            value={item.description}
                            onChange={(e) => handleCostItemChange(index, "description", e.target.value)}
                            className="rounded-none mt-1"
                          />
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <Label className="text-xs">Qty</Label>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleCostItemChange(index, "quantity", e.target.value)}
                            className="rounded-none mt-1"
                          />
                        </div>
                        <div className="col-span-4 md:col-span-2">
                          <Label className="text-xs">Unit</Label>
                          <Select value={item.unit} onValueChange={(v) => handleCostItemChange(index, "unit", v)}>
                            <SelectTrigger className="rounded-none mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {units.map((u) => (
                                <SelectItem key={u} value={u}>{u}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-3 md:col-span-2">
                          <Label className="text-xs">Unit Cost</Label>
                          <Input
                            type="number"
                            value={item.unit_cost}
                            onChange={(e) => handleCostItemChange(index, "unit_cost", e.target.value)}
                            className="rounded-none mt-1"
                          />
                        </div>
                        <div className="col-span-1 flex items-end justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeCostItem(index)}
                            disabled={costItems.length === 1}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-border">
                  <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                    <div className="col-span-2">Category</div>
                    <div className="col-span-4">Description</div>
                    <div className="col-span-2 text-right">Qty</div>
                    <div className="col-span-2 text-right">Unit Cost</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                  {costItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-3 border-b border-border last:border-b-0 items-center">
                      <div className="col-span-2 text-sm">{item.category}</div>
                      <div className="col-span-4">{item.description}</div>
                      <div className="col-span-2 text-right mono">{item.quantity} {item.unit}</div>
                      <div className="col-span-2 text-right mono">${item.unit_cost.toLocaleString()}</div>
                      <div className="col-span-2 text-right mono font-medium">${(item.quantity * item.unit_cost).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Total */}
            <div className="border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-primary" />
                <span className="font-bold uppercase">Total Estimate</span>
              </div>
              <p className="mono text-4xl font-bold text-primary" data-testid="project-total">
                ${calculateTotal().toLocaleString()}
              </p>
            </div>

            {/* Chart */}
            {costItems.length > 0 && (
              <div className="border border-border bg-card p-6">
                <h3 className="font-bold uppercase tracking-wider mb-4">Cost Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getChartData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {getChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `$${value.toLocaleString()}`}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
