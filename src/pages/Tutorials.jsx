import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlayCircle, Clock, Search, BookOpen, Video, FileText, ChevronRight } from "lucide-react";

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { key: "all", label: "All Tutorials" },
    { key: "getting-started", label: "Getting Started" },
    { key: "estimates", label: "Estimates" },
    { key: "database", label: "Database" },
    { key: "advanced", label: "Advanced" },
  ];

  const tutorials = [
    { 
      id: 1, 
      title: "Getting Started with Real Cost", 
      description: "Learn the basics of navigating the Real Cost platform and setting up your first project.",
      duration: "5:30", 
      category: "getting-started",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      views: 1234,
    },
    { 
      id: 2, 
      title: "Creating Your First Estimate", 
      description: "Step-by-step guide to creating accurate cost estimates for your construction projects.",
      duration: "8:45", 
      category: "estimates",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      views: 892,
    },
    { 
      id: 3, 
      title: "Managing Jobs & Projects", 
      description: "Organize and track multiple jobs efficiently using the jobs management system.",
      duration: "6:20", 
      category: "getting-started",
      thumbnail: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&q=80",
      views: 756,
    },
    { 
      id: 4, 
      title: "Using the Part Database", 
      description: "Master the part database to quickly add materials and labor to your estimates.",
      duration: "7:15", 
      category: "database",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      views: 1102,
    },
    { 
      id: 5, 
      title: "Calendar & Scheduling", 
      description: "Use the calendar feature to track deadlines and schedule project milestones.",
      duration: "4:50", 
      category: "getting-started",
      thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80",
      views: 543,
    },
    { 
      id: 6, 
      title: "Exporting Reports", 
      description: "Generate professional PDF reports and export data for clients and stakeholders.",
      duration: "3:40", 
      category: "advanced",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      views: 678,
    },
    { 
      id: 7, 
      title: "Advanced Pricing Strategies", 
      description: "Learn how to use pricing tiers and adjustments for competitive bidding.",
      duration: "9:15", 
      category: "advanced",
      thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80",
      views: 445,
    },
    { 
      id: 8, 
      title: "Team Collaboration Features", 
      description: "Share projects with team members and collaborate on estimates in real-time.",
      duration: "5:55", 
      category: "advanced",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
      views: 389,
    },
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || tutorial.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredTutorial = tutorials[0];

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Tutorials</h1>
          <p className="text-muted-foreground">Learn how to use Real Cost effectively</p>
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-none"
          />
        </div>
      </div>

      {/* Featured Tutorial */}
      <div className="bg-card border border-border mb-8 overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-video lg:aspect-auto">
            <img 
              src={featuredTutorial.thumbnail} 
              alt={featuredTutorial.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer hover:bg-black/50 transition-colors">
              <div className="w-20 h-20 bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <PlayCircle className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-2 py-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {featuredTutorial.duration}
            </div>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
              <Video className="w-4 h-4" />
              Featured Tutorial
            </div>
            <h2 className="text-2xl font-bold mb-3">{featuredTutorial.title}</h2>
            <p className="text-muted-foreground mb-6">{featuredTutorial.description}</p>
            <div className="flex items-center gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                <PlayCircle className="w-4 h-4 mr-2" />
                Watch Now
              </Button>
              <span className="text-sm text-muted-foreground">{featuredTutorial.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`
              px-4 py-2 text-sm font-medium border whitespace-nowrap transition-colors
              ${activeCategory === category.key 
                ? "bg-secondary text-secondary-foreground border-secondary" 
                : "bg-card text-foreground border-border hover:border-primary/50"
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Tutorials Grid */}
      {filteredTutorials.length === 0 ? (
        <div className="bg-card border border-border p-12 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-bold mb-2">No tutorials found</h3>
          <p className="text-muted-foreground">Try adjusting your search or category filter</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTutorials.map((tutorial) => (
            <div 
              key={tutorial.id}
              className="bg-card border border-border overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="relative aspect-video">
                <img 
                  src={tutorial.thumbnail} 
                  alt={tutorial.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {tutorial.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {tutorial.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{tutorial.views.toLocaleString()} views</span>
                  <span className="flex items-center gap-1">
                    Watch
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Section */}
      <div className="mt-12 bg-secondary text-secondary-foreground p-8">
        <div className="max-w-2xl mx-auto text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-3">Need More Help?</h2>
          <p className="text-secondary-foreground/80 mb-6">
            Can't find what you're looking for? Check out our documentation or contact our support team.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" className="rounded-none border-white/30 text-white hover:bg-white/10">
              View Documentation
            </Button>
            <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Tutorials;
