import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  AlertCircle,
  RefreshCw,
  FileText,
  Image,
  Video,
  Mic,
  Link,
  GitBranch,
  Clock,
  Sparkles,
  Eye,
  Edit3,
} from "lucide-react";

interface ContentItem {
  id: string;
  type: "text" | "image" | "video" | "audio";
  title: string;
  status: "synced" | "pending" | "conflicts" | "updating";
  lastSync: string;
  contentPreview: string;
  linkedContent: {
    type: string;
    id: string;
    status: string;
  }[];
}

interface SyncOperation {
  id: string;
  sourceType: string;
  targetTypes: string[];
  status: "processing" | "completed" | "failed";
  progress: number;
  timestamp: string;
}

export default function ContentSync() {
  const [activeSync, setActiveSync] = useState<SyncOperation | null>(null);
  const [autoSync, setAutoSync] = useState(true);

  const contentItems: ContentItem[] = [
    {
      id: "1",
      type: "text",
      title: "Product Launch Blog Post",
      status: "synced",
      lastSync: "2 minutes ago",
      contentPreview:
        "Introducing our revolutionary AI-powered productivity platform...",
      linkedContent: [
        { type: "Social Post", id: "1a", status: "synced" },
        { type: "Video Script", id: "1b", status: "synced" },
        { type: "Audio Narration", id: "1c", status: "synced" },
      ],
    },
    {
      id: "2",
      type: "video",
      title: "Feature Demo Video",
      status: "pending",
      lastSync: "5 minutes ago",
      contentPreview: "30-second demonstration of key platform features",
      linkedContent: [
        { type: "Blog Excerpt", id: "2a", status: "pending" },
        { type: "Social Clips", id: "2b", status: "updating" },
        { type: "Podcast Segment", id: "2c", status: "pending" },
      ],
    },
    {
      id: "3",
      type: "image",
      title: "Brand Guidelines Infographic",
      status: "conflicts",
      lastSync: "1 hour ago",
      contentPreview:
        "Visual representation of brand colors, fonts, and usage guidelines",
      linkedContent: [
        { type: "Style Guide Text", id: "3a", status: "conflicts" },
        { type: "Presentation Slides", id: "3b", status: "conflicts" },
        { type: "Social Graphics", id: "3c", status: "synced" },
      ],
    },
  ];

  const recentSyncOperations: SyncOperation[] = [
    {
      id: "sync-1",
      sourceType: "Text",
      targetTypes: ["Video Script", "Social Post", "Audio"],
      status: "completed",
      progress: 100,
      timestamp: "2 minutes ago",
    },
    {
      id: "sync-2",
      sourceType: "Video",
      targetTypes: ["Blog Excerpt", "Social Clips"],
      status: "processing",
      progress: 65,
      timestamp: "Currently running",
    },
    {
      id: "sync-3",
      sourceType: "Image",
      targetTypes: ["Presentation", "Social Graphics"],
      status: "failed",
      progress: 0,
      timestamp: "1 hour ago",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "conflicts":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "updating":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "conflicts":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "updating":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "audio":
        return <Mic className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleSyncContent = (contentId: string) => {
    const newSync: SyncOperation = {
      id: `sync-${Date.now()}`,
      sourceType: "Manual Trigger",
      targetTypes: ["All Linked Content"],
      status: "processing",
      progress: 0,
      timestamp: "Just now",
    };
    setActiveSync(newSync);

    // Simulate sync progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setActiveSync((prev) => (prev ? { ...prev, progress } : null));

      if (progress >= 100) {
        clearInterval(interval);
        setActiveSync((prev) =>
          prev ? { ...prev, status: "completed" } : null,
        );
        setTimeout(() => setActiveSync(null), 2000);
      }
    }, 800);
  };

  const resolveConflicts = (contentId: string) => {
    // In a real app, this would open a conflict resolution interface
    console.log(`Resolving conflicts for content ${contentId}`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <RefreshCw className="h-8 w-8 mr-3 text-primary" />
              Content Synchronization
            </h1>
            <p className="text-muted-foreground mt-2">
              Unified content management with automatic cross-format
              synchronization
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Auto-sync</span>
              <Button
                variant={autoSync ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoSync(!autoSync)}
                className={autoSync ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {autoSync ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <Badge variant="secondary" className="flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Qwen-Max + Wan
            </Badge>
          </div>
        </div>

        {/* Active Sync Status */}
        {activeSync && (
          <Card className="mb-8 border-blue-200 bg-blue-50/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                  <div>
                    <h3 className="font-medium">
                      Content Synchronization in Progress
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Syncing {activeSync.sourceType} to{" "}
                      {activeSync.targetTypes.join(", ")}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-blue-500/10 text-blue-700 border-blue-200"
                >
                  {activeSync.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{activeSync.progress}%</span>
                </div>
                <Progress value={activeSync.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content Items</TabsTrigger>
            <TabsTrigger value="sync-history">Sync History</TabsTrigger>
            <TabsTrigger value="relationships">Content Map</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <div className="grid gap-6">
              {contentItems.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getContentIcon(item.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {item.title}
                          </CardTitle>
                          <CardDescription>
                            Last synced: {item.lastSync}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <Badge
                          variant="outline"
                          className={getStatusColor(item.status)}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Content Preview */}
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.contentPreview}
                      </p>
                    </div>

                    {/* Linked Content */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Link className="h-4 w-4 mr-2" />
                        Linked Content ({item.linkedContent.length})
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {item.linkedContent.map((linked, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm"
                          >
                            <span>{linked.type}</span>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(linked.status)}
                              <span className="text-xs text-muted-foreground">
                                {linked.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.status === "conflicts" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200"
                            onClick={() => resolveConflicts(item.id)}
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Resolve Conflicts
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleSyncContent(item.id)}
                          disabled={!!activeSync}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Sync Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sync-history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Synchronization Operations</CardTitle>
                <CardDescription>
                  Track all content synchronization activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSyncOperations.map((operation) => (
                    <div
                      key={operation.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                          {operation.status === "processing" ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : operation.status === "completed" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {operation.sourceType} →{" "}
                            {operation.targetTypes.join(", ")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {operation.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {operation.status === "processing" && (
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={operation.progress}
                              className="w-24 h-2"
                            />
                            <span className="text-sm text-muted-foreground">
                              {operation.progress}%
                            </span>
                          </div>
                        )}
                        <Badge
                          variant="outline"
                          className={
                            operation.status === "completed"
                              ? "text-green-700 border-green-200"
                              : operation.status === "processing"
                                ? "text-blue-700 border-blue-200"
                                : "text-red-700 border-red-200"
                          }
                        >
                          {operation.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relationships" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="h-5 w-5 mr-2" />
                  Content Relationship Map
                </CardTitle>
                <CardDescription>
                  Visual representation of content connections and dependencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <GitBranch className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">
                    Interactive Content Map
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Visualize how your content is connected across all formats
                    and workflows
                  </p>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sync Statistics */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-500">98.5%</div>
              <div className="text-sm text-muted-foreground">
                Sync Success Rate
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">
                Total Sync Operations
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-500">2.3s</div>
              <div className="text-sm text-muted-foreground">
                Average Sync Time
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-500">24</div>
              <div className="text-sm text-muted-foreground">
                Active Content Items
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
