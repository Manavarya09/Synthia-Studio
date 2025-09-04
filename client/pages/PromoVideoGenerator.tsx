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
import StarLoading from "@/components/ui/StarLoading";

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
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    setStages(
      generationStages.map((s) => ({ ...s, progress: 0, completed: false })),
    );

    try {
      // Start the API call
      const response = await fetch("/api/generate-promo-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          script,
          visualTheme,
          duration,
          aspectRatio,
          quality: quality[0],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate promo video");
      }

      // Simulate progressive generation while waiting for response
      const progressInterval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 5;
        });
      }, 1000);

      const data = await response.json();
      clearInterval(progressInterval);

      // Complete all stages
      setStages((prev) =>
        prev.map((stage) => ({ ...stage, progress: 100, completed: true })),
      );
      setGenerationProgress(100);

      // Set the generated video URL
      setGeneratedVideo(data.videoUrl);
    } catch (error) {
      console.error("Error generating promo video:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`); 
    } finally {
      setIsGenerating(false);
      setCurrentStage(null);
    }
  };

  const downloadVideo = () => {
    if (!generatedVideo) return;
    
    const link = document.createElement("a");
    link.href = generatedVideo;
    link.download = `promo-video-${Date.now()}.mp4`;
    link.target = "_blank";
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
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Promo Video Generator
            </h1>
          </div>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Create professional 20-second promotional videos from script to
            final render with unified visual theming
          </p>
          <Badge variant="secondary" className="mt-4">
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
                {/* Prompt Input */}
                <div className="space-y-2">
                  <Label htmlFor="prompt">Your Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe your promo video..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="resize-none bg-gray-800 bg-opacity-60 text-white placeholder:text-gray-300 border-none shadow-none"
                  />
                </div>
                {/* Theme Select */}
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={visualTheme} onValueChange={setVisualTheme}>
                    <SelectTrigger className="bg-gray-800 bg-opacity-60 text-white border-none shadow-none">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 bg-opacity-80 text-white">
                      {visualThemes.map((themeOption) => (
                        <SelectItem
                          key={themeOption.value}
                          value={themeOption.value}
                          className="text-white bg-transparent hover:bg-gray-700/60"
                        >
                          {themeOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                            <div className="text-xs text-white">
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
                  disabled={!prompt.trim() || isGenerating}
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
                  <div className="w-full h-[300px] flex items-center justify-center relative">
                    <StarLoading />
                  </div>
                ) : generatedVideo ? (
                  <div className="rounded-lg overflow-hidden bg-black bg-opacity-40">
                    <video 
                      src={generatedVideo} 
                      controls 
                      className="w-full h-auto max-h-[400px] rounded-lg"
                      poster="/placeholder.svg"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="p-4">
                      <p className="text-sm text-white/80">
                        Promo video generated successfully! Duration: {duration}s, Aspect Ratio: {aspectRatio}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>
                      Enter your prompt and click "Generate Promo Video" to see your
                      AI-created promotional video here
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
                <CardTitle className="text-lg text-white">
                  Product Launches
                </CardTitle>
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
                <CardTitle className="text-lg text-white">
                  Social Media Ads
                </CardTitle>
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
                <CardTitle className="text-lg text-white">
                  Service Showcases
                </CardTitle>
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
