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

const videoTypes = [
  { value: "promo", label: "Promotional Video" },
  { value: "social", label: "Social Media Video" },
  { value: "slideshow", label: "Slideshow" },
  { value: "story", label: "Visual Story" },
  { value: "ad", label: "Advertisement" },
  { value: "explainer", label: "Explainer Video" },
];

const durations = [
  { value: "15", label: "15 seconds" },
  { value: "30", label: "30 seconds" },
  { value: "60", label: "1 minute" },
  { value: "90", label: "1.5 minutes" },
  { value: "120", label: "2 minutes" },
];

const resolutions = [
  { value: "720p", label: "HD (720p)" },
  { value: "1080p", label: "Full HD (1080p)" },
  { value: "1440p", label: "2K (1440p)" },
  { value: "2160p", label: "4K (2160p)" },
];

export default function VideoGeneration() {
  const [prompt, setPrompt] = useState("");
  const [videoType, setVideoType] = useState("");
  const [duration, setDuration] = useState("30");
  const [resolution, setResolution] = useState("1080p");
  const [fps, setFps] = useState([30]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      // Generate a placeholder video (using a sample video or placeholder)
      const placeholderVideo = "data:video/mp4;base64,"; // This would be a real video in production
      setGeneratedVideo("placeholder-video.mp4");
      setIsGenerating(false);
    }, 5000);
  };

  const downloadVideo = () => {
    // In a real app, this would download the actual generated video
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
            <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
              <Video className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Video Generation</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create engaging videos and visual stories with our advanced AI video
            generation powered by Wan-T2V-14B
          </p>
          <Badge variant="secondary" className="mt-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by Wan-T2V-14B
          </Badge>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
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
                <div className="space-y-2">
                  <Label htmlFor="prompt">Describe Your Video</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the video you want to create... (e.g., 'A promotional video showcasing modern office tools with smooth transitions')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video-type">Video Type</Label>
                  <Select value={videoType} onValueChange={setVideoType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select video type" />
                    </SelectTrigger>
                    <SelectContent>
                      {videoTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((dur) => (
                        <SelectItem key={dur.value} value={dur.value}>
                          {dur.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resolution">Resolution</Label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutions.map((res) => (
                        <SelectItem key={res.value} value={res.value}>
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
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Video
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Video className="h-5 w-5 mr-2" />
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
                  <div className="flex items-center justify-center py-32">
                    <div className="text-center">
                      <RefreshCw className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">
                        Creating your video...
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        This may take a few minutes
                      </p>
                    </div>
                  </div>
                ) : generatedVideo ? (
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg font-semibold">
                          Generated Video Preview
                        </p>
                        <p className="text-sm opacity-75">
                          Duration: {duration}s | Resolution: {resolution}
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
                      <span className="text-white text-sm">0:{duration}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-32 text-muted-foreground">
                    <Video className="h-20 w-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">
                      Enter your prompt and click "Generate Video" to see your
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
