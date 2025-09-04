import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  Download,
  Sparkles,
  RefreshCw,
  Settings,
  Play,
  Pause,
  FileText,
  Mic,
  Image,
  Video,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";

const contentTypes = [
  { value: "blog", label: "Blog Article", icon: FileText },
  { value: "podcast", label: "Podcast Episode", icon: Mic },
  { value: "ads", label: "Advertisement Campaign", icon: Image },
];

const collaboratorRoles = [
  {
    value: "content-writer",
    label: "Content Writer",
    permissions: ["write", "edit"],
  },
  { value: "designer", label: "Designer", permissions: ["design", "visual"] },
  {
    value: "strategist",
    label: "Marketing Strategist",
    permissions: ["strategy", "approve"],
  },
  { value: "reviewer", label: "Reviewer", permissions: ["review", "comment"] },
];

interface Collaborator {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline" | "editing";
  lastActive: string;
}

interface ProjectAsset {
  type: "blog" | "podcast" | "ads";
  title: string;
  status: "draft" | "review" | "approved";
  assignee: string;
  progress: number;
  url?: string;
}

export default function MarketingCollaboration() {
  const [projectOutline, setProjectOutline] = useState("");
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([
    "blog",
  ]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "Sarah Chen",
      role: "content-writer",
      avatar: "/avatars/sarah.jpg",
      status: "online",
      lastActive: "Active now",
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      role: "designer",
      avatar: "/avatars/marcus.jpg",
      status: "editing",
      lastActive: "2 minutes ago",
    },
    {
      id: "3",
      name: "Emma Thompson",
      role: "strategist",
      avatar: "/avatars/emma.jpg",
      status: "offline",
      lastActive: "1 hour ago",
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [projectAssets, setProjectAssets] = useState<ProjectAsset[]>([]);
  const [collaborationStatus, setCollaborationStatus] = useState("");

  const handleGenerateProject = async () => {
    if (!projectOutline.trim() || selectedContentTypes.length === 0) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    setCollaborationStatus("Initializing project...");

    // Simulate progressive generation
    const stages = [
      "Creating project structure...",
      "Generating initial content drafts...",
      "Assigning tasks to collaborators...",
      "Setting up collaboration workflows...",
      "Finalizing project setup...",
    ];

    for (let i = 0; i < stages.length; i++) {
      setCollaborationStatus(stages[i]);

      for (let progress = 0; progress <= 100; progress += 25) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        setGenerationProgress(
          ((i * 100 + progress) / (stages.length * 100)) * 100,
        );
      }
    }

    // Generate mock project assets
    const mockAssets: ProjectAsset[] = [];

    selectedContentTypes.forEach((type) => {
      switch (type) {
        case "blog":
          mockAssets.push({
            type: "blog",
            title: "Blog Article Draft",
            status: "draft",
            assignee: "Sarah Chen",
            progress: 75,
            url: "blog-draft.html",
          });
          break;
        case "podcast":
          mockAssets.push({
            type: "podcast",
            title: "Podcast Episode Script & Audio",
            status: "review",
            assignee: "Marcus Rodriguez",
            progress: 50,
            url: "podcast-episode.mp3",
          });
          break;
        case "ads":
          mockAssets.push({
            type: "ads",
            title: "Advertisement Campaign Assets",
            status: "draft",
            assignee: "Emma Thompson",
            progress: 25,
            url: "ad-campaign.zip",
          });
          break;
      }
    });

    setTimeout(() => {
      setProjectAssets(mockAssets);
      setCollaborationStatus("Project ready for collaboration");
      setIsGenerating(false);
    }, 1000);
  };

  const handleContentTypeToggle = (type: string) => {
    setSelectedContentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const downloadAsset = (asset: ProjectAsset) => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = asset.url || `${asset.type}-asset.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "review":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "approved":
        return "bg-green-500/10 text-green-700 border-green-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getCollaboratorStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "editing":
        return "bg-blue-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Marketing Collaboration
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Collaborative content creation workspace for marketing teams to
            produce blogs, podcasts, and advertisements
          </p>
          <Badge variant="secondary" className="mt-4">
            Powered by Qwen-Plus + Wan
          </Badge>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Project Setup Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Project Setup
                </CardTitle>
                <CardDescription>
                  Configure your marketing collaboration project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-outline">Project Outline *</Label>
                  <Textarea
                    id="project-outline"
                    placeholder="Describe your marketing project... (e.g., Launch campaign for new AI productivity tool targeting small businesses)"
                    value={projectOutline}
                    onChange={(e) => setProjectOutline(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Content Types *</Label>
                  {contentTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.value}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={type.value}
                          checked={selectedContentTypes.includes(type.value)}
                          onCheckedChange={() =>
                            handleContentTypeToggle(type.value)
                          }
                        />
                        <Label
                          htmlFor={type.value}
                          className="flex items-center cursor-pointer"
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {type.label}
                        </Label>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <Label>Team Members</Label>
                  <div className="space-y-2">
                    {collaborators.map((collaborator) => (
                      <div
                        key={collaborator.id}
                        className="flex items-center justify-between p-2 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {collaborator.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getCollaboratorStatusColor(collaborator.status)}`}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {collaborator.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {
                                collaboratorRoles.find(
                                  (r) => r.value === collaborator.role,
                                )?.label
                              }
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {collaborator.lastActive}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Collaborator
                  </Button>
                </div>

                <Button
                  onClick={handleGenerateProject}
                  disabled={
                    !projectOutline.trim() ||
                    selectedContentTypes.length === 0 ||
                    isGenerating
                  }
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    "Start Collaboration"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Collaboration Workspace */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Collaboration Workspace
                  </span>
                  {projectAssets.length > 0 && (
                    <Badge variant="outline">
                      {projectAssets.length} assets
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Multi-user content creation and review workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Project Setup</span>
                        <span>{Math.round(generationProgress)}%</span>
                      </div>
                      <Progress value={generationProgress} className="h-2" />
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">
                        {collaborationStatus}
                      </p>
                    </div>
                  </div>
                ) : projectAssets.length > 0 ? (
                  <Tabs defaultValue="assets" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="assets">Assets</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                      <TabsTrigger value="chat">Team Chat</TabsTrigger>
                    </TabsList>

                    <TabsContent value="assets" className="space-y-4">
                      <div className="space-y-4">
                        {projectAssets.map((asset, index) => {
                          const Icon =
                            contentTypes.find((t) => t.value === asset.type)
                              ?.icon || FileText;
                          return (
                            <Card key={index}>
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <Icon className="h-5 w-5 text-primary" />
                                    <div>
                                      <CardTitle className="text-base">
                                        {asset.title}
                                      </CardTitle>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <Badge
                                          variant="outline"
                                          className={getStatusColor(
                                            asset.status,
                                          )}
                                        >
                                          {asset.status}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                          Assigned to {asset.assignee}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => downloadAsset(asset)}
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span>{asset.progress}%</span>
                                  </div>
                                  <Progress
                                    value={asset.progress}
                                    className="h-2"
                                  />
                                  <div className="flex justify-between items-center">
                                    <Button variant="outline" size="sm">
                                      <MessageSquare className="h-4 w-4 mr-1" />
                                      Comment
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      Review
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm">
                              <span className="font-medium">Sarah Chen</span>{" "}
                              completed the blog article draft
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />2 minutes ago
                            </div>
                          </div>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>

                        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>MR</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm">
                              <span className="font-medium">
                                Marcus Rodriguez
                              </span>{" "}
                              is working on podcast visuals
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />5 minutes ago
                            </div>
                          </div>
                          <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
                        </div>

                        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>ET</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm">
                              <span className="font-medium">Emma Thompson</span>{" "}
                              reviewed campaign strategy
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />1 hour ago
                            </div>
                          </div>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="chat" className="space-y-4">
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div className="bg-muted/50 rounded-lg p-3 flex-1">
                            <div className="font-medium text-sm">
                              Sarah Chen
                            </div>
                            <div className="text-sm mt-1">
                              Just finished the blog draft! Ready for review.
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              2 minutes ago
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>ET</AvatarFallback>
                          </Avatar>
                          <div className="bg-muted/50 rounded-lg p-3 flex-1">
                            <div className="font-medium text-sm">
                              Emma Thompson
                            </div>
                            <div className="text-sm mt-1">
                              Great work! I'll review it shortly. Marcus, how's
                              the podcast coming along?
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              5 minutes ago
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>MR</AvatarFallback>
                          </Avatar>
                          <div className="bg-muted/50 rounded-lg p-3 flex-1">
                            <div className="font-medium text-sm">
                              Marcus Rodriguez
                            </div>
                            <div className="text-sm mt-1">
                              Working on the audio mix now. Should have it ready
                              for review in an hour.
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              3 minutes ago
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type a message..."
                          className="flex-1"
                        />
                        <Button size="sm">Send</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-32 text-muted-foreground">
                    <Users className="h-20 w-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">
                      Set up your project outline and content types to start
                      collaborating
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Collaboration Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Collaboration Features
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real-time Editing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Multiple team members can work on content simultaneously with
                  live updates.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Role-based Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Control access levels for writers, designers, strategists, and
                  reviewers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workflow Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Track progress from draft to approval with automated status
                  updates.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Unified Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Generate and manage blogs, podcasts, and ads in one workspace.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
