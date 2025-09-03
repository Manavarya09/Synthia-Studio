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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Download,
  Sparkles,
  RefreshCw,
  Settings,
  Play,
  Pause,
  FileText,
  Eye,
  Wand2,
} from "lucide-react";

const visualThemes = [
  {
    value: "corporate",
    label: "Corporate",
    description: "Professional, clean, business-focused",
  },
  {
    value: "energetic",
    label: "Energetic",
    description: "Dynamic, vibrant, high-energy",
  },
  {
    value: "minimal",
    label: "Minimal",
    description: "Clean, simple, elegant design",
  },
  {
    value: "tech",
    label: "Tech",
    description: "Modern, futuristic, technology-focused",
  },
  {
    value: "lifestyle",
    label: "Lifestyle",
    description: "Warm, personal, human-centered",
  },
];

const durations = [
  { value: 15, label: "15 seconds" },
  { value: 20, label: "20 seconds" },
  { value: 30, label: "30 seconds" },
  { value: 45, label: "45 seconds" },
  { value: 60, label: "1 minute" },
];

const aspectRatios = [
  {
    value: "16:9",
    label: "Landscape (16:9)",
    description: "YouTube, websites",
  },
  {
    value: "1:1",
    label: "Square (1:1)",
    description: "Instagram posts, Facebook",
  },
  {
    value: "9:16",
    label: "Vertical (9:16)",
    description: "Instagram Stories, TikTok",
  },
  { value: "4:5", label: "Portrait (4:5)", description: "Instagram feed" },
];

interface GenerationStage {
  stage: string;
  description: string;
  progress: number;
  completed: boolean;
}

export default function PromoVideoGenerator() {
  const location = useLocation();
  const [prompt, setPrompt] = useState("");
  const [script, setScript] = useState("");
  const [visualTheme, setVisualTheme] = useState("corporate");
  const [duration, setDuration] = useState(20);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [quality, setQuality] = useState([80]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<GenerationStage | null>(
    null,
  );
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const generationStages: GenerationStage[] = [
    {
      stage: "Script Analysis",
      description: "Analyzing script content and pacing",
      progress: 0,
      completed: false,
    },
    {
      stage: "Visual Planning",
      description: "Creating visual storyboard",
      progress: 0,
      completed: false,
    },
    {
      stage: "Scene Generation",
      description: "Generating individual scenes",
      progress: 0,
      completed: false,
    },
    {
      stage: "Audio Sync",
      description: "Synchronizing audio and visuals",
      progress: 0,
      completed: false,
    },
    {
      stage: "Final Rendering",
      description: "Rendering final video",
      progress: 0,
      completed: false,
    },
  ];

  const [stages, setStages] = useState(generationStages);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const promptParam = params.get("prompt");
    if (promptParam) setPrompt(promptParam);
  }, [location.search]);

  const handleGenerate = async () => {
    if (!script.trim()) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    setStages(
      generationStages.map((s) => ({ ...s, progress: 0, completed: false })),
    );

    // Simulate progressive generation
    for (let i = 0; i < stages.length; i++) {
      setCurrentStage(stages[i]);

      // Simulate stage progression
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setStages((prev) =>
          prev.map((stage, idx) =>
            idx === i ? { ...stage, progress } : stage,
          ),
        );
        setGenerationProgress(
          ((i * 100 + progress) / (stages.length * 100)) * 100,
        );
      }

      setStages((prev) =>
        prev.map((stage, idx) =>
          idx === i ? { ...stage, completed: true } : stage,
        ),
      );
    }

    // Final result
    setTimeout(() => {
      setGeneratedVideo("promo-video.mp4");
      setIsGenerating(false);
      setCurrentStage(null);
    }, 1000);
  };

  const downloadVideo = () => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = `promo-video-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const selectedTheme = visualThemes.find((t) => t.value === visualTheme);
  const selectedRatio = aspectRatios.find((r) => r.value === aspectRatio);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <Video className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Promo Video Generator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional 20-second promotional videos from script to
            final render with unified visual theming
          </p>
          <Badge variant="secondary" className="mt-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by Wan-T2V-14B
          </Badge>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Settings Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Video Configuration
                </CardTitle>
                <CardDescription>
                  Configure your promotional video settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="script">Video Script *</Label>
                  <Textarea
                    id="script"
                    placeholder="Enter your promotional script... (e.g., 'Discover the future of productivity with our AI-powered platform. Transform your workflow in seconds, not hours. Join thousands of satisfied customers today!')"
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <div className="text-xs text-muted-foreground">
                    {script.length} characters (~
                    {Math.ceil(script.length / 150)} seconds)
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Visual Theme</Label>
                  <Select value={visualTheme} onValueChange={setVisualTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {visualThemes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          <div>
                            <div className="font-medium">{theme.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {theme.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTheme && (
                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      {selectedTheme.description}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={duration.toString()}
                    onValueChange={(value) => setDuration(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((dur) => (
                        <SelectItem
                          key={dur.value}
                          value={dur.value.toString()}
                        >
                          {dur.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ratio">Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aspectRatios.map((ratio) => (
                        <SelectItem key={ratio.value} value={ratio.value}>
                          <div>
                            <div className="font-medium">{ratio.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {ratio.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">Quality: {quality[0]}%</Label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    max={100}
                    min={60}
                    step={10}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!script.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Promo Video
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Video className="h-5 w-5 mr-2" />
                    Video Generation
                  </span>
                  {generatedVideo && (
                    <Button variant="outline" size="sm" onClick={downloadVideo}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  Your promotional video will be generated here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="space-y-6">
                    {/* Overall Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Generation Progress</span>
                        <span>{Math.round(generationProgress)}%</span>
                      </div>
                      <Progress value={generationProgress} className="h-2" />
                    </div>

                    {/* Current Stage */}
                    {currentStage && (
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{currentStage.stage}</h4>
                          <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {currentStage.description}
                        </p>
                        <Progress
                          value={currentStage.progress}
                          className="h-1"
                        />
                      </div>
                    )}

                    {/* Stages List */}
                    <div className="space-y-3">
                      {stages.map((stage, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              stage.completed
                                ? "bg-green-500 text-white"
                                : currentStage?.stage === stage.stage
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {stage.completed ? "✓" : index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {stage.stage}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {stage.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : generatedVideo ? (
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="script">Script</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>

                    <TabsContent value="preview" className="space-y-4">
                      <div className="relative bg-black rounded-lg overflow-hidden">
                        <div
                          className={`${aspectRatio === "16:9" ? "aspect-video" : aspectRatio === "1:1" ? "aspect-square" : aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-[4/5]"} bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center`}
                        >
                          <div className="text-center text-white">
                            <Video className="h-16 w-16 mx-auto mb-4" />
                            <p className="text-lg font-semibold">
                              Promotional Video
                            </p>
                            <p className="text-sm opacity-75">
                              {duration}s | {aspectRatio} |{" "}
                              {selectedTheme?.label}
                            </p>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={togglePlay}
                            className="text-white hover:bg-white/20"
                          >
                            {isPlaying ? (
                              <Pause className="h-5 w-5" />
                            ) : (
                              <Play className="h-5 w-5" />
                            )}
                          </Button>
                          <div className="flex-1 mx-4 bg-white/20 rounded-full h-2">
                            <div className="bg-white rounded-full h-full w-1/3"></div>
                          </div>
                          <span className="text-white text-sm">
                            0:{duration}
                          </span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="script" className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <FileText className="h-4 w-4 mr-2" />
                          <span className="font-medium">Original Script</span>
                        </div>
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                          {script}
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Video Specs</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div>Duration: {duration} seconds</div>
                            <div>Aspect Ratio: {aspectRatio}</div>
                            <div>Quality: {quality[0]}%</div>
                            <div>Theme: {selectedTheme?.label}</div>
                          </div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Generated Assets</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div>✓ Storyboard scenes</div>
                            <div>✓ Visual transitions</div>
                            <div>✓ Text overlays</div>
                            <div>✓ Audio synchronization</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-32 text-muted-foreground">
                    <Video className="h-20 w-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">
                      Enter your script and configuration to generate your
                      promotional video
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Perfect For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Launches</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Create compelling product introduction videos with
                  professional visuals and messaging.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Media Ads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Generate platform-optimized promotional content for Instagram,
                  Facebook, and LinkedIn.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Showcases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Highlight your services with engaging visual storytelling and
                  clear value propositions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
