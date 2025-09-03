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
  Image,
  Download,
  Sparkles,
  RefreshCw,
  Settings,
  Palette,
} from "lucide-react";

const imageTypes = [
  { value: "social-media", label: "Social Media Graphics" },
  { value: "promotional", label: "Promotional Images" },
  { value: "slide-visual", label: "Slide Visuals" },
  { value: "brand-asset", label: "Brand Assets" },
  { value: "illustration", label: "Illustrations" },
  { value: "photo-realistic", label: "Photo-realistic" },
];

const styles = [
  { value: "modern", label: "Modern" },
  { value: "minimalist", label: "Minimalist" },
  { value: "vibrant", label: "Vibrant" },
  { value: "professional", label: "Professional" },
  { value: "artistic", label: "Artistic" },
  { value: "retro", label: "Retro" },
];

const aspectRatios = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Landscape (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "4:3", label: "Standard (4:3)" },
  { value: "3:2", label: "Photo (3:2)" },
];

// Map user-friendly aspect ratios to DashScope allowed sizes
const ASPECT_RATIO_TO_SIZE: Record<string, string> = {
  "1:1": "1328*1328",
  "16:9": "1664*928",
  "9:16": "928*1664",
  "4:3": "1472*1140",
  "3:2": "1140*1472",
};

export default function ImageGeneration() {
  const location = useLocation();
  const [prompt, setPrompt] = useState("");
  const [imageType, setImageType] = useState("");
  const [style, setStyle] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quality, setQuality] = useState([80]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const promptParam = params.get("prompt");
    if (promptParam) setPrompt(promptParam);
  }, [location.search]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImages([]);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          imageType,
          style,
          // Map the aspect ratio to DashScope size
          aspectRatio: ASPECT_RATIO_TO_SIZE[aspectRatio] || "1328*1328",
          quality: quality[0],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      const data: { images: string[]; model: string } = await res.json();
      setGeneratedImages(data.images);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setGeneratedImages([
        "data:image/svg+xml;base64," +
          btoa(
            "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'><rect width='100%' height='100%' fill='#fee2e2'/><text x='20' y='110' font-family='Arial' font-size='14' fill='#991b1b'>Error generating images</text></svg>",
          ),
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated-image-" + (index + 1) + ".svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
              <Image className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Image Generation</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create stunning visuals and graphics with our advanced AI image
            generation powered by Wan-I2V-14B-720P
          </p>
          <Badge variant="secondary" className="mt-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by Wan-I2V-14B-720P
          </Badge>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Image Settings
                </CardTitle>
                <CardDescription>
                  Configure your image generation parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Describe Your Image</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the image you want to create... (e.g., 'A modern office workspace with plants and natural lighting')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image-type">Image Type</Label>
                  <Select value={imageType} onValueChange={setImageType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select image type" />
                    </SelectTrigger>
                    <SelectContent>
                      {imageTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map((styleOption) => (
                        <SelectItem
                          key={styleOption.value}
                          value={styleOption.value}
                        >
                          {styleOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aspectRatios.map((ratio) => (
                        <SelectItem key={ratio.value} value={ratio.value}>
                          {ratio.label}
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
                    min={10}
                    step={10}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90"
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
                      Generate Images
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
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Generated Images
                </CardTitle>
                <CardDescription>
                  Your AI-generated images will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="flex items-center justify-center py-24">
                    <div className="text-center">
                      <RefreshCw className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Creating your images...
                      </p>
                    </div>
                  </div>
                ) : generatedImages.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {generatedImages.map((imageUrl, index) => (
                      <div key={index} className="group relative">
                        <img
                          src={imageUrl}
                          alt={`Generated image ${index + 1}`}
                          className="w-full rounded-lg border bg-muted"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => downloadImage(imageUrl, index)}
                            className="bg-gray-900/40 backdrop-blur-sm hover:bg-gray-900/60"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 text-muted-foreground">
                    <Image className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>
                      Enter your prompt and click "Generate Images" to see your
                      AI-created visuals here
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
            Image Generation Features
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Multiple Styles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose from various artistic styles and visual approaches.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Custom Ratios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate images in any aspect ratio for different platforms.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">High Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Adjust quality settings for optimal results.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instant Download</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Download your generated images in multiple formats.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
