import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Plus, Trash2, Save, ArrowLeft, Calculator } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/App";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const NewProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    description: "",
    project_type: "residential",
    location: "",
    status: "draft",
  });
  const [costItems, setCostItems] = useState([
    { category: "Materials", description: "", quantity: 1, unit: "units", unit_cost: 0 },
  ]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Project name is required");
      return;
    }

    setLoading(true);

    try {
      const projectData = {
        ...formData,
        cost_items: costItems.filter(item => item.description.trim()),
        total_cost: calculateTotal(),
      };

      const response = await axios.post(`${API}/projects`, projectData, {
        headers: { "x-user-id": user?.id }
      });

      toast.success("Project created successfully!");
      navigate(`/projects/${response.data.id}`);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "renovation", label: "Renovation" },
  ];

  const costCategories = [
    "Materials",
    "Labor",
    "Equipment",
    "Subcontractor",
    "Permits",
    "Overhead",
    "Contingency",
    "Other",
  ];

  const units = ["units", "sqft", "sqm", "linear ft", "hours", "days", "lump sum"];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="rounded-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">New Estimate</h1>
            <p className="text-muted-foreground">Create a new cost estimate</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Project Details */}
          <div className="form-section">
            <h2 className="form-section-title">Project Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-none"
                  placeholder="e.g., Smith Residence Renovation"
                  data-testid="project-name-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client Name</Label>
                <Input
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="rounded-none"
                  placeholder="e.g., John Smith"
                  data-testid="project-client-input"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="project_type">Project Type</Label>
                <Select 
                  value={formData.project_type} 
                  onValueChange={(value) => handleSelectChange("project_type", value)}
                >
                  <SelectTrigger className="rounded-none" data-testid="project-type-select">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="rounded-none"
                  placeholder="e.g., 123 Main St, City"
                  data-testid="project-location-input"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="rounded-none min-h-[100px]"
                placeholder="Brief description of the project scope..."
                data-testid="project-description-input"
              />
            </div>
          </div>

          {/* Cost Items */}
          <div className="form-section">
            <div className="flex items-center justify-between mb-6">
              <h2 className="form-section-title mb-0 pb-0 border-0">Cost Items</h2>
              <Button 
                type="button" 
                onClick={addCostItem}
                variant="outline"
                className="rounded-none"
                data-testid="add-cost-item-btn"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {costItems.map((item, index) => (
                <div key={index} className="border border-border p-4 bg-muted/30">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-2">
                      <Label className="text-xs">Category</Label>
                      <Select 
                        value={item.category} 
                        onValueChange={(value) => handleCostItemChange(index, "category", value)}
                      >
                        <SelectTrigger className="rounded-none mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {costCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <Label className="text-xs">Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => handleCostItemChange(index, "description", e.target.value)}
                        className="rounded-none mt-1"
                        placeholder="Item description"
                        data-testid={`cost-item-description-${index}`}
                      />
                    </div>
                    <div className="col-span-4 md:col-span-1">
                      <Label className="text-xs">Qty</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.quantity}
                        onChange={(e) => handleCostItemChange(index, "quantity", e.target.value)}
                        className="rounded-none mt-1"
                        data-testid={`cost-item-qty-${index}`}
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <Label className="text-xs">Unit</Label>
                      <Select 
                        value={item.unit} 
                        onValueChange={(value) => handleCostItemChange(index, "unit", value)}
                      >
                        <SelectTrigger className="rounded-none mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <Label className="text-xs">Unit Cost ($)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unit_cost}
                        onChange={(e) => handleCostItemChange(index, "unit_cost", e.target.value)}
                        className="rounded-none mt-1"
                        data-testid={`cost-item-price-${index}`}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-1 flex items-end justify-between md:justify-end">
                      <span className="mono font-bold md:hidden">
                        ${(item.quantity * item.unit_cost).toLocaleString()}
                      </span>
                      <Button 
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCostItem(index)}
                        className="text-muted-foreground hover:text-destructive"
                        disabled={costItems.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:flex justify-end mt-2 pt-2 border-t border-border">
                    <span className="mono font-medium">
                      Line Total: ${(item.quantity * item.unit_cost).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total & Actions */}
          <div className="border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold uppercase">Total Estimate</span>
              </div>
              <span className="mono text-3xl font-bold text-primary" data-testid="total-estimate">
                ${calculateTotal().toLocaleString()}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit"
                disabled={loading}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none flex-1"
                data-testid="save-project-btn"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Estimate
                  </>
                )}
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => navigate("/projects")}
                className="rounded-none"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewProject;
