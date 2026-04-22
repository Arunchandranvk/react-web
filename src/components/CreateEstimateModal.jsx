import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Plus, Trash2, Save, Calculator } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/App";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PROJECT_TYPES = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "renovation", label: "Renovation" },
];

const COST_CATEGORIES = [
  "Materials", "Labor", "Equipment", "Subcontractor",
  "Permits", "Overhead", "Contingency", "Other",
];

const UNITS = ["units", "sqft", "sqm", "linear ft", "hours", "days", "lump sum"];

const EMPTY_ITEM = { category: "Materials", description: "", quantity: 1, unit: "units", unit_cost: 0 };

const CreateEstimateModal = ({ open, onOpenChange, onCreated }) => {
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
  const [costItems, setCostItems] = useState([{ ...EMPTY_ITEM }]);

  const reset = () => {
    setFormData({ name: "", client: "", description: "", project_type: "residential", location: "", status: "draft" });
    setCostItems([{ ...EMPTY_ITEM }]);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelectChange = (name, value) => setFormData({ ...formData, [name]: value });

  const handleItemChange = (index, field, value) => {
    const updated = [...costItems];
    updated[index][field] = field === "quantity" || field === "unit_cost" ? parseFloat(value) || 0 : value;
    setCostItems(updated);
  };

  const addItem = () => setCostItems([...costItems, { ...EMPTY_ITEM }]);

  const removeItem = (index) => {
    if (costItems.length > 1) setCostItems(costItems.filter((_, i) => i !== index));
  };

  const total = costItems.reduce((sum, item) => sum + item.quantity * item.unit_cost, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { toast.error("Project name is required"); return; }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API}/projects`,
        { ...formData, cost_items: costItems.filter((i) => i.description.trim()), total_cost: total },
        { headers: { "x-user-id": user?.id } }
      );
      toast.success("Estimate created!");
      onOpenChange(false);
      reset();
      if (onCreated) onCreated(res.data);
      else navigate(`/projects/${res.data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to create estimate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border sticky top-0 bg-background z-10">
          <DialogTitle className="text-xl font-bold">New Estimate</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
          {/* Project Details */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Project Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="modal-name">Project Name *</Label>
                <Input id="modal-name" name="name" value={formData.name} onChange={handleChange}
                  required className="rounded-xl" placeholder="e.g., Smith Residence Renovation"
                  data-testid="project-name-input" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="modal-client">Client Name</Label>
                <Input id="modal-client" name="client" value={formData.client} onChange={handleChange}
                  className="rounded-xl" placeholder="e.g., John Smith"
                  data-testid="project-client-input" />
              </div>
              <div className="space-y-1.5">
                <Label>Project Type</Label>
                <Select value={formData.project_type} onValueChange={(v) => handleSelectChange("project_type", v)}>
                  <SelectTrigger className="rounded-xl" data-testid="project-type-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {PROJECT_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="modal-location">Location</Label>
                <Input id="modal-location" name="location" value={formData.location} onChange={handleChange}
                  className="rounded-xl" placeholder="e.g., 123 Main St, City"
                  data-testid="project-location-input" />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <Label htmlFor="modal-description">Description</Label>
              <Textarea id="modal-description" name="description" value={formData.description}
                onChange={handleChange} className="rounded-xl min-h-[80px]"
                placeholder="Brief description of the project scope…"
                data-testid="project-description-input" />
            </div>
          </div>

          {/* Cost Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Cost Items
              </h2>
              <Button type="button" variant="outline" size="sm" onClick={addItem}
                className="rounded-xl" data-testid="add-cost-item-btn">
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {costItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-4 bg-muted/20">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 sm:col-span-2">
                      <Label className="text-xs">Category</Label>
                      <Select value={item.category} onValueChange={(v) => handleItemChange(i, "category", v)}>
                        <SelectTrigger className="rounded-xl mt-1 h-9 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {COST_CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-12 sm:col-span-4">
                      <Label className="text-xs">Description</Label>
                      <Input value={item.description}
                        onChange={(e) => handleItemChange(i, "description", e.target.value)}
                        className="rounded-xl mt-1 h-9 text-sm" placeholder="Item description"
                        data-testid={`cost-item-description-${i}`} />
                    </div>
                    <div className="col-span-4 sm:col-span-1">
                      <Label className="text-xs">Qty</Label>
                      <Input type="number" min="0" step="0.01" value={item.quantity}
                        onChange={(e) => handleItemChange(i, "quantity", e.target.value)}
                        className="rounded-xl mt-1 h-9 text-sm"
                        data-testid={`cost-item-qty-${i}`} />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <Label className="text-xs">Unit</Label>
                      <Select value={item.unit} onValueChange={(v) => handleItemChange(i, "unit", v)}>
                        <SelectTrigger className="rounded-xl mt-1 h-9 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {UNITS.map((u) => (
                            <SelectItem key={u} value={u}>{u}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <Label className="text-xs">Unit Cost ($)</Label>
                      <Input type="number" min="0" step="0.01" value={item.unit_cost}
                        onChange={(e) => handleItemChange(i, "unit_cost", e.target.value)}
                        className="rounded-xl mt-1 h-9 text-sm"
                        data-testid={`cost-item-price-${i}`} />
                    </div>
                    <div className="col-span-12 sm:col-span-1 flex sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-1 sm:pt-5">
                      <span className="mono text-xs font-bold sm:hidden text-muted-foreground">
                        ${(item.quantity * item.unit_cost).toLocaleString()}
                      </span>
                      <Button type="button" variant="ghost" size="icon"
                        onClick={() => removeItem(i)} disabled={costItems.length === 1}
                        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="hidden sm:flex justify-end mt-2 pt-2 border-t border-border">
                    <span className="mono text-xs text-muted-foreground">
                      Line Total: <span className="font-semibold text-foreground">${(item.quantity * item.unit_cost).toLocaleString()}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total & Actions */}
          <div className="border border-border rounded-xl bg-card p-5 sticky bottom-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                <span className="font-bold uppercase text-sm tracking-wide">Total Estimate</span>
              </div>
              <span className="mono text-2xl font-bold text-primary" data-testid="total-estimate">
                ${total.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" disabled={loading}
                className="flex-1 rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold"
                data-testid="save-project-btn">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Estimate
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => { onOpenChange(false); reset(); }}
                className="rounded-xl">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEstimateModal;
