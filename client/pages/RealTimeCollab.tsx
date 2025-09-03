import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  MessageSquare,
  GitBranch,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit3,
  Eye,
  Sparkles,
  Brain,
  RefreshCw,
  Lock,
  Unlock,
  Save,
  History,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
} from "lucide-react";

interface Collaborator {
  id: string;
  name: string;
  role: "editor" | "reviewer" | "admin" | "viewer";
  status: "online" | "editing" | "offline";
  avatar?: string;
  currentSection?: string;
  lastAction: string;
  permissions: string[];
}

interface Version {
  id: string;
  timestamp: string;
  author: string;
  authorType: "human" | "ai";
  changes: string;
  approved: boolean;
  comments: number;
}

interface AISuggestion {
  id: string;
  type: "grammar" | "style" | "content" | "structure";
  suggestion: string;
  confidence: number;
  appliedBy?: string;
  status: "pending" | "accepted" | "rejected";
}

export default function RealTimeCollab() {
  const location = useLocation();
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState(`# Product Launch Strategy

## Executive Summary
Our revolutionary AI-powered productivity platform is ready for market launch. This comprehensive strategy outlines our approach to capturing the small business and enterprise markets through targeted campaigns and strategic partnerships.

## Market Analysis
The productivity software market has grown by 23% year-over-year, with AI-enhanced tools leading the growth. Our research indicates that 67% of small businesses are actively seeking AI solutions to improve efficiency.

## Launch Timeline
- Phase 1: Beta testing with select customers (Month 1-2)
- Phase 2: Public launch and marketing campaign (Month 3)
- Phase 3: Feature expansion and partnerships (Month 4-6)

## Expected Outcomes
We project 10,000 sign-ups in the first quarter and $500K ARR by year-end.`);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null,
  );

  const collaborators: Collaborator[] = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "editor",
      status: "editing",
      currentSection: "Market Analysis",
      lastAction: "Editing content",
      permissions: ["read", "write", "comment"],
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      role: "reviewer",
      status: "online",
      lastAction: "Added comment",
      permissions: ["read", "comment", "approve"],
    },
    {
      id: "3",
      name: "Emma Thompson",
      role: "admin",
      status: "online",
      lastAction: "Approved changes",
      permissions: ["read", "write", "comment", "approve", "manage"],
    },
    {
      id: "4",
      name: "AI Assistant",
      role: "editor",
      status: "online",
      lastAction: "Suggested improvements",
      permissions: ["read", "suggest"],
    },
  ];

  const versions: Version[] = [
    {
      id: "v1.8",
      timestamp: "2 minutes ago",
      author: "Sarah Chen",
      authorType: "human",
      changes: "Updated market analysis with latest data",
      approved: false,
      comments: 2,
    },
    {
      id: "v1.7",
      timestamp: "15 minutes ago",
      author: "AI Assistant",
      authorType: "ai",
      changes: "Improved readability and structure",
      approved: true,
      comments: 0,
    },
    {
      id: "v1.6",
      timestamp: "1 hour ago",
      author: "Marcus Rodriguez",
      authorType: "human",
      changes: "Added timeline details",
      approved: true,
      comments: 1,
    },
    {
      id: "v1.5",
      timestamp: "2 hours ago",
      author: "Emma Thompson",
      authorType: "human",
      changes: "Initial draft creation",
      approved: true,
      comments: 0,
    },
  ];

  const aiSuggestions: AISuggestion[] = [
    {
      id: "1",
      type: "content",
      suggestion:
        "Consider adding a competitive analysis section to strengthen the market analysis",
      confidence: 92,
      status: "pending",
    },
    {
      id: "2",
      type: "style",
      suggestion:
        "The expected outcomes section could benefit from more specific metrics and confidence intervals",
      confidence: 87,
      status: "pending",
    },
    {
      id: "3",
      type: "structure",
      suggestion:
        "Adding a risk assessment section would provide a more comprehensive strategy",
      confidence: 84,
      status: "pending",
    },
    {
      id: "4",
      type: "grammar",
      suggestion: "Change 'year-over-year' to 'year over year' for consistency",
      confidence: 95,
      status: "accepted",
      appliedBy: "Sarah Chen",
    },
  ];

  const getStatusColor = (status: string) => {
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500/10 text-purple-700 border-purple-200";
      case "editor":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "reviewer":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "viewer":
        return "bg-gray-500/10 text-gray-700 border-gray-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "grammar":
        return <CheckCircle className="h-4 w-4" />;
      case "style":
        return <Edit3 className="h-4 w-4" />;
      case "content":
        return <Lightbulb className="h-4 w-4" />;
      case "structure":
        return <GitBranch className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case "grammar":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "style":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "content":
        return "bg-purple-500/10 text-purple-700 border-purple-200";
      case "structure":
        return "bg-orange-500/10 text-orange-700 border-orange-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const handleSuggestionAction = (
    suggestionId: string,
    action: "accept" | "reject",
  ) => {
    console.log(`${action} suggestion ${suggestionId}`);
  };

  const handleSaveVersion = () => {
    console.log("Saving new version...");
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const promptParam = params.get("prompt");
    if (promptParam) setPrompt(promptParam);
  }, [location.search]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <Users className="h-8 w-8 mr-3 text-primary" />
              Real-Time Collaboration
            </h1>
            <p className="text-muted-foreground mt-2">
              Collaborative editing with AI suggestions and intelligent version
              control
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Qwen-Turbo
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3 space-y-6">
            {/* Editor Header */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Launch Strategy Document</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-2">
                      <span>Last saved: 2 minutes ago</span>
                      <Badge
                        variant="outline"
                        className="text-green-700 border-green-200"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        All changes saved
                      </Badge>
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <History className="h-4 w-4 mr-1" />
                      History
                    </Button>
                    <Button size="sm" onClick={handleSaveVersion}>
                      <Save className="h-4 w-4 mr-1" />
                      Save Version
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Collaborative Editor */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {collaborators
                          .filter((c) => c.status !== "offline")
                          .map((collaborator) => (
                            <div key={collaborator.id} className="relative">
                              <Avatar className="h-8 w-8 border-2 border-white">
                                <AvatarFallback className="text-xs">
                                  {collaborator.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(collaborator.status)}`}
                              />
                            </div>
                          ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {
                          collaborators.filter((c) => c.status !== "offline")
                            .length
                        }{" "}
                        active
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? (
                          <Lock className="h-4 w-4 mr-1" />
                        ) : (
                          <Unlock className="h-4 w-4 mr-1" />
                        )}
                        {isEditing ? "Stop Editing" : "Start Editing"}
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Start collaborating on your content..."
                      rows={20}
                      className="font-mono text-sm leading-relaxed resize-none"
                      disabled={!isEditing}
                    />

                    {/* Collaboration Indicators */}
                    {collaborators.find((c) => c.status === "editing") && (
                      <div className="absolute top-2 right-2 flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm rounded-lg p-2">
                        <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
                        <span className="text-sm text-blue-700">
                          Sarah is editing...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI Suggestions
                  <Badge variant="secondary" className="ml-2">
                    {aiSuggestions.filter((s) => s.status === "pending").length}{" "}
                    pending
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Real-time AI-powered suggestions to improve your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiSuggestions
                    .filter((s) => s.status === "pending")
                    .map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className={getSuggestionColor(suggestion.type)}
                            >
                              {getSuggestionIcon(suggestion.type)}
                              <span className="ml-1 capitalize">
                                {suggestion.type}
                              </span>
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {suggestion.confidence}% confidence
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {suggestion.suggestion}
                        </p>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() =>
                              handleSuggestionAction(suggestion.id, "accept")
                            }
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() =>
                              handleSuggestionAction(suggestion.id, "reject")
                            }
                          >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Comment
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Collaborators */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Active Collaborators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {collaborator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(collaborator.status)}`}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {collaborator.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {collaborator.lastAction}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={getRoleColor(collaborator.role)}
                      >
                        {collaborator.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Version History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Version History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {versions.slice(0, 4).map((version) => (
                    <div
                      key={version.id}
                      className="border-l-2 border-muted pl-3 relative"
                    >
                      <div className="absolute -left-1.5 top-2 h-3 w-3 bg-primary rounded-full" />
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {version.id}
                          </span>
                          <Badge
                            variant={
                              version.authorType === "ai"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {version.authorType === "ai" ? (
                              <Brain className="h-3 w-3 mr-1" />
                            ) : (
                              <Users className="h-3 w-3 mr-1" />
                            )}
                            {version.author}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {version.changes}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {version.timestamp}
                          </span>
                          <div className="flex items-center space-x-2">
                            {version.approved && (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            )}
                            {version.comments > 0 && (
                              <span className="text-muted-foreground">
                                {version.comments} comment
                                {version.comments !== 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Collaboration Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Session Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Edits</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      AI Suggestions
                    </span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accepted</span>
                    <span className="font-medium text-green-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Session Time</span>
                    <span className="font-medium">2h 14m</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
