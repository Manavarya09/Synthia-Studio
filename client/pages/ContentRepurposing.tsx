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
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Repeat,
  Download,
  Calendar as CalendarIcon,
  Clock,
  Target,
  Sparkles,
  RefreshCw,
  Share2,
  Image,
  Video,
  FileText,
  Mic,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  CheckCircle,
  BarChart3,
  Wand2,
  Eye,
} from "lucide-react";

interface SourceContent {
  id: string;
  title: string;
  type: "blog" | "video" | "podcast" | "presentation";
  preview: string;
  wordCount: number;
  duration?: string;
  createdAt: string;
}

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  formats: string[];
  maxLength?: number;
  aspectRatio?: string;
  bestPractices: string[];
}

interface RepurposedContent {
  id: string;
  platform: string;
  format: string;
  title: string;
  content: string;
  status: "generating" | "ready" | "scheduled" | "published";
  scheduledTime?: string;
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export default function ContentRepurposing() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isRepurposing, setIsRepurposing] = useState(false);
  const [repurposingProgress, setRepurposingProgress] = useState(0);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    new Date(),
  );

  const sourceContents: SourceContent[] = [
    {
      id: "1",
      title: "AI in Small Business: A Complete Guide",
      type: "blog",
      preview:
        "Artificial Intelligence is transforming how small businesses operate, from customer service automation to predictive analytics...",
      wordCount: 2400,
      createdAt: "2 days ago",
    },
    {
      id: "2",
      title: "Product Demo: AI Features Walkthrough",
      type: "video",
      preview:
        "Comprehensive demonstration of our AI-powered features and how they can improve productivity for teams...",
      wordCount: 800,
      duration: "8:45",
      createdAt: "1 week ago",
    },
    {
      id: "3",
      title: "Future of Work Podcast Episode #23",
      type: "podcast",
      preview:
        "Deep dive into how AI tools are reshaping workplace dynamics and what it means for the future of employment...",
      wordCount: 3200,
      duration: "45:30",
      createdAt: "3 days ago",
    },
    {
      id: "4",
      title: "Quarterly Business Review Presentation",
      type: "presentation",
      preview:
        "Our Q3 performance, key metrics, market insights, and strategic direction for the upcoming quarter...",
      wordCount: 1200,
      createdAt: "1 day ago",
    },
  ];

  const platforms: Platform[] = [
    {
      id: "twitter",
      name: "Twitter/X",
      icon: Twitter,
      formats: ["Tweet Thread", "Single Tweet", "Quote Tweet"],
      maxLength: 280,
      bestPractices: [
        "Use hashtags strategically",
        "Keep threads under 10 tweets",
        "Include visuals",
      ],
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      formats: ["Professional Post", "Article", "Story"],
      maxLength: 3000,
      bestPractices: [
        "Professional tone",
        "Industry insights",
        "Engagement questions",
      ],
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      formats: ["Feed Post", "Story", "Reel", "Carousel"],
      aspectRatio: "1:1, 9:16",
      bestPractices: [
        "Visual-first content",
        "Stories under 15s",
        "Use trending hashtags",
      ],
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: Facebook,
      formats: ["Post", "Story", "Video"],
      bestPractices: [
        "Community focus",
        "Longer-form content",
        "Native video preferred",
      ],
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      formats: ["Video", "Short", "Community Post"],
      aspectRatio: "16:9, 9:16",
      bestPractices: [
        "Strong thumbnails",
        "SEO optimized titles",
        "Engaging first 15s",
      ],
    },
  ];

  const [repurposedContent, setRepurposedContent] = useState<
    RepurposedContent[]
  >([
    {
      id: "1",
      platform: "twitter",
      format: "Tweet Thread",
      title: "🧵 AI in Small Business: Key Insights",
      content:
        "1/8 Artificial Intelligence isn't just for tech giants anymore. Small businesses are leveraging AI to compete and thrive. Here's what you need to know 👇\n\n2/8 Customer Service Revolution: AI chatbots handle 80% of routine inquiries, freeing up human agents for complex issues...",
      status: "ready",
      engagement: { likes: 156, shares: 23, comments: 12 },
    },
    {
      id: "2",
      platform: "linkedin",
      format: "Professional Post",
      title: "How AI is Leveling the Playing Field for Small Businesses",
      content:
        "The narrative that AI is only for Fortune 500 companies is outdated. Today's small businesses are using AI tools to:\n\n• Automate customer service with intelligent chatbots\n• Analyze customer data for better decision-making\n• Optimize marketing campaigns in real-time...",
      status: "scheduled",
      scheduledTime: "Tomorrow at 9:00 AM",
    },
    {
      id: "3",
      platform: "instagram",
      format: "Carousel",
      title: "AI Tools Every Small Business Should Know",
      content:
        "Slide 1: AI isn't just for big tech companies anymore!\nSlide 2: Customer Service - AI chatbots save 40% on support costs\nSlide 3: Marketing - Predictive analytics boost ROI by 25%...",
      status: "ready",
      engagement: { likes: 89, shares: 15, comments: 7 },
    },
  ]);

  const handleRepurpose = async () => {
    if (!selectedContent || selectedPlatforms.length === 0) return;

    setIsRepurposing(true);
    setRepurposingProgress(0);

    // Simulate repurposing process
    const totalSteps = selectedPlatforms.length * 3; // 3 steps per platform
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setRepurposingProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setIsRepurposing(false);
        // Would add generated content to repurposedContent state
      }
    }, 800);
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId],
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "scheduled":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "generating":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "published":
        return "bg-purple-500/10 text-purple-700 border-purple-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "blog":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "podcast":
        return <Mic className="h-4 w-4" />;
      case "presentation":
        return <Image className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const selectedSourceContent = sourceContents.find(
    (c) => c.id === selectedContent,
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <Repeat className="h-8 w-8 mr-3 text-primary" />
              Smart Content Repurposing
            </h1>
            <p className="text-muted-foreground mt-2">
              Transform one piece of content into multi-platform optimized
              variants with AI
            </p>
          </div>
          <Badge variant="secondary" className="flex items-center">
            Powered by Qwen-Max + Wan
          </Badge>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Source Content Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Source Content</CardTitle>
                <CardDescription>
                  Choose the content you want to repurpose across platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sourceContents.map((content) => (
                    <div
                      key={content.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedContent === content.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedContent(content.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getContentIcon(content.type)}
                          <span className="font-medium text-sm">
                            {content.title}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {content.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {content.preview}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{content.wordCount} words</span>
                        <span>{content.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedSourceContent && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {getContentIcon(selectedSourceContent.type)}
                      <span className="font-medium">
                        {selectedSourceContent.title}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedSourceContent.preview}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>Words: {selectedSourceContent.wordCount}</span>
                      {selectedSourceContent.duration && (
                        <span>Duration: {selectedSourceContent.duration}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Platform Selection & Configuration */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Target Platforms</CardTitle>
                <CardDescription>
                  Select the platforms where you want to distribute your
                  repurposed content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.id);

                    return (
                      <div
                        key={platform.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handlePlatformToggle(platform.id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{platform.name}</span>
                          </div>
                          <Checkbox checked={isSelected} readOnly />
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">
                            Formats: {platform.formats.join(", ")}
                          </div>
                          {platform.maxLength && (
                            <div className="text-xs text-muted-foreground">
                              Max length: {platform.maxLength} chars
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            Best practices: {platform.bestPractices[0]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Repurposing Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Repurposing Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Publishing Schedule
                      </Label>
                      <Select defaultValue="immediate">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">
                            Publish Immediately
                          </SelectItem>
                          <SelectItem value="schedule">
                            Schedule for Later
                          </SelectItem>
                          <SelectItem value="draft">Save as Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Content Optimization
                      </Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="seo" defaultChecked />
                          <Label htmlFor="seo" className="text-sm">
                            SEO optimization
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="hashtags" defaultChecked />
                          <Label htmlFor="hashtags" className="text-sm">
                            Auto-generate hashtags
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="cta" defaultChecked />
                          <Label htmlFor="cta" className="text-sm">
                            Include call-to-action
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Tone Adaptation
                      </Label>
                      <Select defaultValue="platform-optimized">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maintain">
                            Maintain Original Tone
                          </SelectItem>
                          <SelectItem value="platform-optimized">
                            Platform Optimized
                          </SelectItem>
                          <SelectItem value="casual">More Casual</SelectItem>
                          <SelectItem value="professional">
                            More Professional
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Content Length
                      </Label>
                      <Select defaultValue="optimal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short & Punchy</SelectItem>
                          <SelectItem value="optimal">
                            Platform Optimal
                          </SelectItem>
                          <SelectItem value="detailed">
                            Detailed & Comprehensive
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleRepurpose}
                    disabled={
                      !selectedContent ||
                      selectedPlatforms.length === 0 ||
                      isRepurposing
                    }
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                    size="lg"
                  >
                    {isRepurposing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Repurposing Content...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Repurpose Content ({selectedPlatforms.length} platforms)
                      </>
                    )}
                  </Button>

                  {isRepurposing && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(repurposingProgress)}%</span>
                      </div>
                      <Progress value={repurposingProgress} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Generated Content */}
        {repurposedContent.length > 0 && (
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Repurposed Content</span>
                  <Badge variant="outline">
                    {repurposedContent.length} variants generated
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Review and manage your platform-optimized content variants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Variants</TabsTrigger>
                    <TabsTrigger value="ready">Ready</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {repurposedContent.map((content) => {
                        const platform = platforms.find(
                          (p) => p.id === content.platform,
                        );
                        const Icon = platform?.icon || Share2;

                        return (
                          <Card
                            key={content.id}
                            className="hover:shadow-md transition-shadow"
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Icon className="h-4 w-4" />
                                  <span className="font-medium text-sm">
                                    {platform?.name}
                                  </span>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={getStatusColor(content.status)}
                                >
                                  {content.status}
                                </Badge>
                              </div>
                              <CardTitle className="text-base line-clamp-2">
                                {content.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="bg-muted/50 rounded p-3">
                                <p className="text-sm line-clamp-4">
                                  {content.content}
                                </p>
                              </div>

                              {content.engagement && (
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{content.engagement.likes} likes</span>
                                  <span>
                                    {content.engagement.shares} shares
                                  </span>
                                  <span>
                                    {content.engagement.comments} comments
                                  </span>
                                </div>
                              )}

                              {content.scheduledTime && (
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {content.scheduledTime}
                                </div>
                              )}

                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Preview
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="mt-6">
                    <div className="grid md:grid-cols-4 gap-6">
                      <Card>
                        <CardContent className="p-6 text-center">
                          <div className="text-2xl font-bold text-primary">
                            156
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Repurposing Jobs
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6 text-center">
                          <div className="text-2xl font-bold text-green-500">
                            92%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Success Rate
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6 text-center">
                          <div className="text-2xl font-bold text-blue-500">
                            24
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Avg. Variants per Job
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6 text-center">
                          <div className="text-2xl font-bold text-purple-500">
                            4.2x
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Content Multiplication
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
