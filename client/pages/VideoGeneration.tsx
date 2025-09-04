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
import {
  Video,
  Download,
  Sparkles,
  RefreshCw,
  Settings,
  Play,
  Pause,
} from "lucide-react";
import StarLoading from "@/components/ui/StarLoading";

const videoTypes = [
  { value: "promo", label: "Promotional Video" },
  { value: "social", label: "Social Media Video" },
  { value: "slideshow", label: "Slideshow" },
  { value: "story", label: "Visual Story" },
  { value: "ad", label: "Advertisement" },
  { value: "explainer", label: "Explainer Video" },
];

const resolutions = [
  { value: "720p", label: "HD (720p)" },
  { value: "1080p", label: "Full HD (1080p)" },
  { value: "1440p", label: "2K (1440p)" },
  { value: "2160p", label: "4K (2160p)" },
];

// Map resolution names to exact DashScope size strings
const resolutionMap: Record<string, string> = {
  "480p": "832×480",
  "720p": "1280×720",
  "1080p": "1920×1080",
  "1440p": "1440×1440",
  "2160p": "3840×2160",
};

export default function VideoGeneration() {
  const location = useLocation();
  const [prompt, setPrompt] = useState("");
  const [videoType, setVideoType] = useState("");
  const [resolution, setResolution] = useState("1080p");
  const [fps, setFps] = useState([30]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const promptParam = params.get("prompt");
    if (promptParam) setPrompt(promptParam);
  }, [location.search]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedVideo(null);

    try {
      const size = resolutionMap[resolution] || "1280×720"; // map to exact size

      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          videoType,
          resolution: size, // send size string
          fps: fps[0],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      const data: { videoUrl: string; model: string } = await res.json();
      setGeneratedVideo(data.videoUrl);
    } catch (err) {
      setGeneratedVideo("error");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadVideo = () => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = "generated-video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            {/* Green box removed */}
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Video Generation
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create engaging videos and visual stories with our advanced AI video
            generation powered by Wan-T2V-14B
          </p>
          <Badge variant="secondary" className="mt-4">
            Powered by Wan-T2V-14B
          </Badge>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 flex flex-col min-h-[400px]">
            <Card className="h-full flex-1 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Video Settings
                </CardTitle>
                <CardDescription>
                  Configure your video generation parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <Label htmlFor="prompt">Your Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe your video..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="resize-none bg-gray-800 bg-opacity-60 text-white placeholder:text-gray-300 border-none shadow-none"
                  />
                </div>
                {/* Video Type */}
                <div className="space-y-2">
                  <Label htmlFor="video-type">Video Type</Label>
                  <Select value={videoType} onValueChange={setVideoType}>
                    <SelectTrigger className="bg-gray-800 bg-opacity-60 text-white border-none shadow-none">
                      <SelectValue placeholder="Select video type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 bg-opacity-80 text-white">
                      {videoTypes.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                          className="text-white bg-transparent hover:bg-gray-700/60"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Resolution styled to match Video Type */}
                <div className="space-y-2">
                  <Label htmlFor="resolution">Resolution</Label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger className="bg-gray-800 bg-opacity-60 text-white border-none shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 bg-opacity-80 text-white">
                      {resolutions.map((res) => (
                        <SelectItem key={res.value} value={res.value} className="text-white bg-transparent hover:bg-gray-700/60">
                          {res.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fps">Frame Rate: {fps[0]} FPS</Label>
                  <Slider
                    value={fps}
                    onValueChange={setFps}
                    max={60}
                    min={24}
                    step={6}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      
                      Generate Video
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-3 flex flex-col min-h-[400px]">
            <Card className="h-full flex-1 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    {/* Video icon removed */}
                    Generated Video
                  </span>
                  {generatedVideo && (
                    <Button variant="outline" size="sm" onClick={downloadVideo}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  Your AI-generated video will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="w-full h-[300px] flex items-center justify-center relative">
                    <StarLoading />
                  </div>
                ) : generatedVideo ? (
                  generatedVideo === "error" ? (
                    <div className="text-center py-16 text-red-600">
                      Failed to generate video. Please try again.
                    </div>
                  ) : (
                    <div className="relative bg-black rounded-lg overflow-hidden">
                      <video
                        src={generatedVideo}
                        controls
                        className="w-full aspect-video"
                      />
                    </div>
                  )
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>
                      Enter your prompt and click "Generate Content" to see your
                      AI-created video here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Video Generation Features
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Multiple Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create promotional videos, social content, and visual stories.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Custom Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate videos from 15 seconds to 2 minutes long.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">High Resolution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Export in HD, Full HD, 2K, or 4K resolution.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Professional Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cinematic quality with customizable frame rates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
