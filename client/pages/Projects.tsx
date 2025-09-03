import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderOpen,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Clock,
  FileText,
  Video,
  Image,
  Mic,
  Users,
  Archive,
  Trash2,
  Share2,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  type: "social" | "promo-video" | "notes-to-slides" | "collaboration";
  status: "draft" | "completed" | "archived";
  lastModified: string;
  size: string;
  collaborators?: number;
  assets: {
    type: string;
    count: number;
  }[];
}

const projectTypes = [
  { value: "all", label: "All Projects" },
  { value: "social", label: "Social Media", icon: FileText },
  { value: "promo-video", label: "Promo Videos", icon: Video },
  { value: "notes-to-slides", label: "Presentations", icon: Image },
  { value: "collaboration", label: "Team Projects", icon: Users },
];

const statusFilters = [
  { value: "all", label: "All Status" },
  { value: "draft", label: "Draft" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const mockProjects: Project[] = [
    {
      id: "1",
      name: "Q4 Product Launch Campaign",
      type: "collaboration",
      status: "completed",
      lastModified: "2 hours ago",
      size: "24.5 MB",
      collaborators: 3,
      assets: [
        { type: "Blog Articles", count: 2 },
        { type: "Social Posts", count: 8 },
        { type: "Promo Videos", count: 3 },
      ],
    },
    {
      id: "2",
      name: "AI Productivity Tool Social Campaign",
      type: "social",
      status: "draft",
      lastModified: "1 day ago",
      size: "1.2 MB",
      assets: [
        { type: "Social Posts", count: 12 },
        { type: "Captions", count: 12 },
        { type: "Hashtags", count: 6 },
      ],
    },
    {
      id: "3",
      name: "Company Overview Presentation",
      type: "notes-to-slides",
      status: "completed",
      lastModified: "3 days ago",
      size: "15.8 MB",
      assets: [
        { type: "Slides", count: 24 },
        { type: "Audio Narration", count: 1 },
        { type: "PDF Export", count: 1 },
      ],
    },
    {
      id: "4",
      name: "Feature Demo Video Series",
      type: "promo-video",
      status: "draft",
      lastModified: "5 days ago",
      size: "89.3 MB",
      assets: [
        { type: "Promo Videos", count: 5 },
        { type: "Scripts", count: 5 },
        { type: "Storyboards", count: 5 },
      ],
    },
    {
      id: "5",
      name: "Customer Success Stories",
      type: "collaboration",
      status: "archived",
      lastModified: "2 weeks ago",
      size: "45.2 MB",
      collaborators: 5,
      assets: [
        { type: "Case Studies", count: 3 },
        { type: "Video Testimonials", count: 6 },
        { type: "Social Snippets", count: 18 },
      ],
    },
  ];

  const getProjectIcon = (type: string) => {
    const iconMap = {
      social: FileText,
      "promo-video": Video,
      "notes-to-slides": Image,
      collaboration: Users,
    };
    return iconMap[type as keyof typeof iconMap] || FileText;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "completed":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "archived":
        return "bg-gray-500/10 text-gray-700 border-gray-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getProjectTypeLabel = (type: string) => {
    return projectTypes.find((pt) => pt.value === type)?.label || type;
  };

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || project.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const downloadProject = (project: Project) => {
    // In a real app, this would create and download a zip file with all project assets
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTotalAssets = (project: Project) => {
    return project.assets.reduce((total, asset) => total + asset.count, 0);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <FolderOpen className="h-8 w-8 mr-3 text-primary" />
              My Projects
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and export all your AI-generated content across workflows
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? "List View" : "Grid View"}
            </Button>
            <Button className="bg-gradient-brand hover:opacity-90">
              <Share2 className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Projects</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by project name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Label htmlFor="type">Project Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
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
              <div className="w-full md:w-48">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusFilters.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredProjects.map((project) => {
            const Icon = getProjectIcon(project.type);

            return viewMode === "grid" ? (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base line-clamp-2">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {getProjectTypeLabel(project.type)}
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge
                      variant="outline"
                      className={getStatusColor(project.status)}
                    >
                      {project.status}
                    </Badge>
                    {project.collaborators && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        {project.collaborators}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Assets ({getTotalAssets(project)})
                    </div>
                    <div className="space-y-1">
                      {project.assets.slice(0, 3).map((asset, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-xs text-muted-foreground"
                        >
                          <span>{asset.type}</span>
                          <span>{asset.count}</span>
                        </div>
                      ))}
                      {project.assets.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{project.assets.length - 3} more types
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {project.lastModified}
                    </div>
                    <div>{project.size}</div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadProject(project)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card
                key={project.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {project.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getProjectTypeLabel(project.type)} •{" "}
                          {getTotalAssets(project)} assets • {project.size}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={getStatusColor(project.status)}
                      >
                        {project.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {project.lastModified}
                      </div>
                      {project.collaborators && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          {project.collaborators}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadProject(project)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || typeFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your filters or search terms"
                : "Create your first project to get started"}
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/social">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Social Campaign
                </Button>
              </Link>
              <Link to="/promo-video">
                <Button variant="outline">
                  <Video className="h-4 w-4 mr-2" />
                  Promo Video
                </Button>
              </Link>
              <Link to="/notes-to-slides">
                <Button variant="outline">
                  <Image className="h-4 w-4 mr-2" />
                  Presentation
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {filteredProjects.length > 0 && (
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {filteredProjects.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Projects
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {filteredProjects.reduce(
                    (total, project) => total + getTotalAssets(project),
                    0,
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Generated Assets
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {
                    filteredProjects.filter((p) => p.status === "completed")
                      .length
                  }
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {filteredProjects
                    .reduce((total, project) => {
                      const sizeNum = parseFloat(project.size);
                      return total + sizeNum;
                    }, 0)
                    .toFixed(1)}{" "}
                  MB
                </div>
                <div className="text-sm text-muted-foreground">Total Size</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
