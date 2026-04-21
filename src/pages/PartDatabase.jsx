import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Download,
  ChevronRight,
  ChevronLeft,
  Package,
  Edit,
  Trash2,
  MoreVertical,
  Tag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAuth } from "@/App";

const PartDatabase = () => {
  const { user } = useAuth();
  const [categories] = useState([
    { id: 1,  name: "BULB",    count: 6  },
    { id: 2,  name: "COMBKO",  count: 4  },
    { id: 3,  name: "WIRE",    count: 8  },
    { id: 4,  name: "RW90",    count: 3  },
    { id: 5,  name: "COVER",   count: 5  },
    { id: 6,  name: "SCREW",   count: 12 },
    { id: 7,  name: "ANCHOR",  count: 7  },
    { id: 8,  name: "EMT",     count: 9  },
    { id: 9,  name: "BX",      count: 4  },
    { id: 10, name: "BOLTS",   count: 15 },
    { id: 11, name: "HOOKS",   count: 6  },
    { id: 12, name: "CHAIN",   count: 3  },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [unitSystem, setUnitSystem] = useState("imperial");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [addPartOpen, setAddPartOpen] = useState(false);
  const [newPart, setNewPart] = useState({
    description: "",
    per: "EA",
    unit: "Each",
    netPrice: 0,
    l1: 0,
    l2: 0,
    l3: 0,
  });

  useEffect(() => {
    fetchParts();
  }, [selectedCategory]);

  const fetchParts = async () => {
    setLoading(true);
    setTimeout(() => {
      setParts([
        { id: 1, no: 1, description: "BATTERY UNIT-360W",         date: "03-21-2026", per: "EA", unit: "Each", netPrice: 0.00, priceAdj: 0, priceUpdated: 0.00, l1: 1.50, l2: 2.00, l3: 2.50, partNumber: "BUL-BAT-7D9C57F5" },
        { id: 2, no: 2, description: "EXIT SIGN RUNNING MAN",      date: "03-21-2026", per: "EA", unit: "Each", netPrice: 0.00, priceAdj: 0, priceUpdated: 0.00, l1: 0.50, l2: 0.60, l3: 0.80, partNumber: "BUL-EXI-1B460EA7" },
        { id: 3, no: 3, description: "POT",                        date: "03-21-2026", per: "EA", unit: "Each", netPrice: 0.00, priceAdj: 0, priceUpdated: 0.00, l1: 0.60, l2: 0.70, l3: 0.80, partNumber: "BUL-POT-2F7912F8" },
        { id: 4, no: 4, description: "BOOM TRUCK 1 DAY",           date: "03-21-2026", per: "EA", unit: "Each", netPrice: 0.00, priceAdj: 0, priceUpdated: 0.00, l1: 1.00, l2: 2.00, l3: 2.50, partNumber: "BUL-BOO-512558A5" },
        { id: 5, no: 5, description: "EXTERIOR POLE LIGHT",        date: "03-21-2026", per: "EA", unit: "Each", netPrice: 0.00, priceAdj: 0, priceUpdated: 0.00, l1: 6.00, l2: 8.00, l3: 10.00, partNumber: "BUL-EXT-4927FF2B" },
        { id: 6, no: 6, description: "TYPE TYPE WALL-INDUSTRIAL",  date: "03-21-2026", per: "EA", unit: "Each", netPrice: 0.00, priceAdj: 0, priceUpdated: 0.00, l1: 1.00, l2: 1.10, l3: 1.20, partNumber: "BUL-TYP-BF7E2B37" },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleAddPart = () => {
    const partData = {
      id: parts.length + 1,
      no: parts.length + 1,
      ...newPart,
      date: new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }).replace(/\//g, "-"),
      priceAdj: 0,
      priceUpdated: 0,
      partNumber: `${selectedCategory.name.substring(0, 3)}-${newPart.description.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    };
    setParts([...parts, partData]);
    setAddPartOpen(false);
    setNewPart({ description: "", per: "EA", unit: "Each", netPrice: 0, l1: 0, l2: 0, l3: 0 });
    toast.success("Part added successfully");
  };

  const deletePart = (partId) => {
    setParts(parts.filter((p) => p.id !== partId));
    toast.success("Part deleted");
  };

  const filteredParts = parts.filter(
    (part) =>
      part.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.partNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-64px)]">
        <div className="flex gap-4 lg:gap-6 min-h-[calc(100vh-64px)]">

        {/* ── Category Sidebar ── */}
        <div
          className={`bg-card border border-border rounded-2xl shadow-sm transition-all duration-300 flex flex-col flex-shrink-0 overflow-hidden ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          {/* Sidebar header */}
          <div className="p-4 border-b border-border flex items-center justify-between min-h-[60px]">
            {!sidebarCollapsed && (
              <div>
                <h2 className="font-bold text-sm">Categories</h2>
                <p className="text-xs text-muted-foreground">{categories.length} total</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded-lg w-8 h-8 flex-shrink-0 ml-auto"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Category list */}
          <div className="flex-1 overflow-auto py-2 px-2 space-y-0.5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm transition-all duration-150 ${
                  selectedCategory.id === category.id
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted font-medium"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedCategory.id === category.id
                      ? "bg-primary/15"
                      : "bg-muted"
                  }`}
                >
                  <Package
                    className={`w-3.5 h-3.5 ${
                      selectedCategory.id === category.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 truncate">{category.name}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                        selectedCategory.id === category.id
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {category.count}
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Add category */}
          {!sidebarCollapsed && (
            <div className="p-3 border-t border-border">
              <Button variant="outline" className="w-full rounded-lg" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
          )}
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto min-w-0 bg-card border border-border rounded-2xl shadow-sm">

          {/* Page header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Database</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-foreground font-semibold">{selectedCategory.name}</span>
              </div>
              <h1 className="text-2xl font-bold">{selectedCategory.name} Parts</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {parts.length} parts in this category
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Button variant="outline" className="rounded-xl gap-2" size="sm">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Dialog open={addPartOpen} onOpenChange={setAddPartOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl gap-2 bg-primary text-white hover:bg-primary/90 shadow-sm" size="sm">
                    <Plus className="w-4 h-4" />
                    Add Part
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl sm:rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>Add Part to {selectedCategory.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-2">
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <Input
                        value={newPart.description}
                        onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
                        className="mt-1.5 rounded-xl"
                        placeholder="Enter part description"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-sm font-medium">L1 Price</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newPart.l1}
                          onChange={(e) => setNewPart({ ...newPart, l1: parseFloat(e.target.value) || 0 })}
                          className="mt-1.5 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">L2 Price</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newPart.l2}
                          onChange={(e) => setNewPart({ ...newPart, l2: parseFloat(e.target.value) || 0 })}
                          className="mt-1.5 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">L3 Price</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newPart.l3}
                          onChange={(e) => setNewPart({ ...newPart, l3: parseFloat(e.target.value) || 0 })}
                          className="mt-1.5 rounded-xl"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleAddPart}
                      className="w-full rounded-xl bg-primary text-white hover:bg-primary/90 mt-2"
                    >
                      Add Part
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Filters bar */}
          <div className="premium-card p-4 mb-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Unit system toggle */}
                <div className="flex items-center bg-muted rounded-xl p-1 gap-1">
                  <button
                    onClick={() => setUnitSystem("imperial")}
                    className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-all duration-150 ${
                      unitSystem === "imperial"
                        ? "bg-white text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Imperial
                  </button>
                  <button
                    onClick={() => setUnitSystem("metric")}
                    className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-all duration-150 ${
                      unitSystem === "metric"
                        ? "bg-white text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Metric
                  </button>
                </div>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search parts or part number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Parts table */}
          <div className="premium-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground w-10">#</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground min-w-[200px]">Description</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Date</th>
                    <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Per</th>
                    <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Unit</th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Net Price</th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Adj %</th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground">L1</th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground">L2</th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground">L3</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Part #</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={12} className="text-center py-16 text-muted-foreground">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        Loading parts…
                      </td>
                    </tr>
                  ) : filteredParts.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="text-center py-16">
                        <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Package className="w-7 h-7 text-muted-foreground/50" />
                        </div>
                        <h3 className="font-bold mb-1">No parts found</h3>
                        <p className="text-muted-foreground text-sm mb-5">
                          {searchQuery ? "Try a different search term" : "Add your first part to this category"}
                        </p>
                        {!searchQuery && (
                          <Button
                            onClick={() => setAddPartOpen(true)}
                            className="rounded-xl bg-primary text-white hover:bg-primary/90"
                            size="sm"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Part
                          </Button>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredParts.map((part, index) => (
                      <tr
                        key={part.id}
                        className={`border-b border-border hover:bg-primary/[0.03] transition-colors group ${
                          index % 2 === 0 ? "" : "bg-muted/20"
                        }`}
                      >
                        <td className="px-4 py-3.5 text-muted-foreground font-medium">{part.no}</td>
                        <td className="px-4 py-3.5 font-semibold text-foreground">{part.description}</td>
                        <td className="px-4 py-3.5 text-muted-foreground">{part.date}</td>
                        <td className="px-4 py-3.5 text-center">
                          <span className="bg-muted text-muted-foreground text-xs font-semibold px-2 py-1 rounded-md">
                            {part.per}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-muted-foreground">{part.unit}</td>
                        <td className="px-4 py-3.5 text-right mono text-muted-foreground">
                          ${part.netPrice?.toFixed(2)}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <span className="text-emerald-600 font-semibold">{part.priceAdj}%</span>
                        </td>
                        <td className="px-4 py-3.5 text-right mono font-semibold text-foreground">
                          {part.l1?.toFixed(2)}
                        </td>
                        <td className="px-4 py-3.5 text-right mono font-semibold text-foreground">
                          {part.l2?.toFixed(2)}
                        </td>
                        <td className="px-4 py-3.5 text-right mono font-semibold text-foreground">
                          {part.l3?.toFixed(2)}
                        </td>
                        <td className="px-4 py-3.5 text-muted-foreground mono text-xs">{part.partNumber}</td>
                        <td className="px-4 py-3.5">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl">
                              <DropdownMenuItem className="gap-2 rounded-lg">
                                <Edit className="w-4 h-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deletePart(part.id)}
                                className="gap-2 rounded-lg text-destructive focus:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            {filteredParts.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3.5 border-t border-border bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  {filteredParts.length === parts.length
                    ? `${parts.length} parts`
                    : `${filteredParts.length} of ${parts.length} parts`}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">L1:</span>
                    <span className="font-semibold mono">${filteredParts.reduce((s, p) => s + p.l1, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">L2:</span>
                    <span className="font-semibold mono">${filteredParts.reduce((s, p) => s + p.l2, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">L3:</span>
                    <span className="font-semibold mono">${filteredParts.reduce((s, p) => s + p.l3, 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </AppLayout>
  );
};

export default PartDatabase;
