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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Sparkles,
  RefreshCw,
  Settings,
  Play,
  Pause,
  Presentation,
  Volume2,
  Eye,
  BookOpen,
} from "lucide-react";

const slideStyles = [
  {
    value: "modern",
    label: "Modern",
    description: "Clean, contemporary design with bold typography",
  },
  {
    value: "classic",
    label: "Classic",
    description: "Traditional academic style with serif fonts",
  },
  {
    value: "minimal",
    label: "Minimal",
    description: "Simple, focused design with lots of whitespace",
  },
  {
    value: "creative",
    label: "Creative",
    description: "Colorful, engaging design for presentations",
  },
];

const voiceStyles = [
  {
    value: "neutral",
    label: "Neutral",
    description: "Professional, clear delivery",
  },
  {
    value: "enthusiastic",
    label: "Enthusiastic",
    description: "Energetic, engaging presentation style",
  },
  {
    value: "academic",
    label: "Academic",
    description: "Scholarly, educational tone",
  },
  {
    value: "conversational",
    label: "Conversational",
    description: "Friendly, approachable delivery",
  },
];

const subjects = [
  { value: "business", label: "Business & Management" },
  { value: "technology", label: "Technology & Engineering" },
  { value: "science", label: "Science & Research" },
  { value: "education", label: "Education & Training" },
  { value: "marketing", label: "Marketing & Sales" },
  { value: "general", label: "General Topics" },
];

interface GeneratedOutput {
  slides: string[];
  slideVisuals: string[];
  narrationAudio: string;
  slidesPdf: string;
  summary: string;
}

export default function NotesToSlides() {
  const location = useLocation();
  const [prompt, setPrompt] = useState("");
  const [rawNotes, setRawNotes] = useState("");
  const [slideStyle, setSlideStyle] = useState("modern");
  const [voiceStyle, setVoiceStyle] = useState("neutral");
  const [subject, setSubject] = useState("general");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState("");
  const [generatedOutput, setGeneratedOutput] =
    useState<GeneratedOutput | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const promptParam = params.get("prompt");
    if (promptParam) setPrompt(promptParam);
  }, [location.search]);

  const handleGenerate = async () => {
    if (!rawNotes.trim()) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    setError(null);

    try {
      setCurrentStage("Sending notes to AI...");
      const response = await fetch("/api/notes-to-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: rawNotes, slideStyle, voiceStyle, subject }),
      });
      if (!response.ok) throw new Error("API error: " + (await response.text()));
      const data = await response.json();
      console.log('Raw AI response:', data.content); // Debug log
      let output;
      try {
        output = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
      } catch {
        output = {
          slides: [typeof data.content === "string" ? data.content : JSON.stringify(data.content)],
          slideVisuals: [],
          narrationAudio: "",
          slidesPdf: "",
          summary: "Could not parse AI response. See raw output above."
        };
      }
      setGeneratedOutput(output);
      setIsGenerating(false);
      setCurrentStage("");
    } catch (err: any) {
      setError(err.message || "Failed to generate presentation.");
      setIsGenerating(false);
      setCurrentStage("");
    }
  };

  const downloadAsset = (assetType: string, filename: string) => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    if (!generatedOutput) return;

    // In a real app, this would create a zip file with all assets
    const files = [
      "presentation-slides.pdf",
      "presentation-narration.mp3",
      "slide-visuals.zip",
      "presentation-summary.txt",
    ];

    files.forEach((file) => downloadAsset("all", file));
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const selectedSlideStyle = slideStyles.find((s) => s.value === slideStyle);
  const selectedVoiceStyle = voiceStyles.find((v) => v.value === voiceStyle);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <Presentation className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Notes to Slides</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your raw notes into professional presentations with slide
            visuals and narrated audio
          </p>
          <Badge variant="secondary" className="mt-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by Qwen-Max + Wan
          </Badge>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Settings Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Presentation Settings
                </CardTitle>
                <CardDescription>
                  Configure your notes conversion parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="notes">Raw Notes *</Label>
                  <Textarea
                    id="notes"
                    placeholder="Paste your notes here... (e.g., meeting notes, research findings, study materials, lecture content)"
                    value={rawNotes}
                    onChange={(e) => setRawNotes(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                  <div className="text-xs text-muted-foreground">
                    {rawNotes.length} characters (~
                    {Math.ceil(rawNotes.split("\n").length / 2)} estimated
                    slides)
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Area</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subj) => (
                        <SelectItem key={subj.value} value={subj.value}>
                          {subj.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slide-style">Slide Style</Label>
                  <Select value={slideStyle} onValueChange={setSlideStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {slideStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          <div>
                            <div className="font-medium">{style.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {style.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice-style">Narration Voice</Label>
                  <Select value={voiceStyle} onValueChange={setVoiceStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {voiceStyles.map((voice) => (
                        <SelectItem key={voice.value} value={voice.value}>
                          <div>
                            <div className="font-medium">{voice.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {voice.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!rawNotes.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Convert to Presentation
                    </>
                  )}
                </Button>

                {/* Error Message */}
                {error && (
                  <div className="text-red-500 text-center my-4">{error}</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Presentation className="h-5 w-5 mr-2" />
                    Generated Presentation
                  </span>
                  {generatedOutput && (
                    <Button variant="outline" size="sm" onClick={downloadAll}>
                      <Download className="h-4 w-4 mr-1" />
                      Download All
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  Your multi-modal presentation will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Conversion Progress</span>
                        <span>{Math.round(generationProgress)}%</span>
                      </div>
                      <Progress value={generationProgress} className="h-2" />
                    </div>

                    {currentStage && (
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">{currentStage}</p>
                      </div>
                    )}
                  </div>
                ) : generatedOutput ? (
                  <Tabs defaultValue="slides" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="slides">Slides</TabsTrigger>
                      <TabsTrigger value="visuals">Visuals</TabsTrigger>
                      <TabsTrigger value="audio">Audio</TabsTrigger>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                    </TabsList>

                    <TabsContent value="slides" className="space-y-4">
                      <div className="space-y-4">
                        {generatedOutput.slides.map((slide, index) => (
                          <Card key={index}>
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">
                                  Slide {index + 1}
                                </CardTitle>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    downloadAsset(
                                      "slide",
                                      `slide-${index + 1}.txt`,
                                    )
                                  }
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="bg-muted/50 rounded p-3">
                                <pre className="whitespace-pre-wrap text-sm font-sans">
                                  {slide}
                                </pre>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="visuals" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {generatedOutput.slideVisuals.map((visual, index) => (
                          <Card key={index}>
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm">
                                  Slide {index + 1} Visual
                                </CardTitle>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    downloadAsset("visual", visual)
                                  }
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                                <div className="text-center text-muted-foreground">
                                  <Eye className="h-8 w-8 mx-auto mb-2" />
                                  <p className="text-sm">
                                    Slide Visual Preview
                                  </p>
                                  <p className="text-xs">
                                    Style: {selectedSlideStyle?.label}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="audio" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              Presentation Narration
                            </CardTitle>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                downloadAsset(
                                  "audio",
                                  generatedOutput.narrationAudio,
                                )
                              }
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                          <CardDescription>
                            AI-generated narration for your presentation
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-6">
                            <div className="flex items-center justify-center mb-6">
                              <div className="relative">
                                <div className="h-20 w-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                  {isPlayingAudio ? (
                                    <div className="flex space-x-1">
                                      <div className="w-1 h-6 bg-gray-900/80 rounded animate-pulse"></div>
                                      <div className="w-1 h-8 bg-gray-900/80 rounded animate-pulse delay-75"></div>
                                      <div className="w-1 h-4 bg-gray-900/80 rounded animate-pulse delay-150"></div>
                                    </div>
                                  ) : (
                                    <Volume2 className="h-8 w-8 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="text-center mb-6">
                              <h4 className="font-semibold">
                                Complete Presentation Audio
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Voice: {selectedVoiceStyle?.label} | Duration:
                                ~5 minutes
                              </p>
                            </div>

                            <div className="flex items-center justify-center">
                              <Button
                                variant="ghost"
                                size="lg"
                                onClick={toggleAudio}
                                className="h-14 w-14 rounded-full bg-gray-900/40 hover:bg-gray-900/60"
                              >
                                {isPlayingAudio ? (
                                  <Pause className="h-6 w-6" />
                                ) : (
                                  <Play className="h-6 w-6" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="summary" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <BookOpen className="h-5 w-5 mr-2" />
                            Presentation Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="bg-muted/50 rounded-lg p-4">
                              <p className="text-sm leading-relaxed">
                                {generatedOutput.summary}
                              </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-muted/50 rounded-lg p-4">
                                <h4 className="font-medium mb-2">
                                  Content Structure
                                </h4>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <div>
                                    • {generatedOutput.slides.length} slides
                                    generated
                                  </div>
                                  <div>
                                    • Visual style: {selectedSlideStyle?.label}
                                  </div>
                                  <div>
                                    • Voice style: {selectedVoiceStyle?.label}
                                  </div>
                                  <div>
                                    • Subject:{" "}
                                    {
                                      subjects.find((s) => s.value === subject)
                                        ?.label
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted/50 rounded-lg p-4">
                                <h4 className="font-medium mb-2">
                                  Generated Assets
                                </h4>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <div>✓ PDF presentation slides</div>
                                  <div>✓ Individual slide visuals</div>
                                  <div>✓ Complete audio narration</div>
                                  <div>✓ Text-based slide content</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-32 text-muted-foreground">
                    <Presentation className="h-20 w-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">
                      Paste your notes and click "Convert to Presentation" to
                      generate your multi-modal presentation
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Perfect For Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Perfect For Students & Educators
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Study Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Convert lecture notes and research into structured
                  presentations for better understanding.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Teaching Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Transform curriculum content into engaging presentations with
                  visual aids and narration.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Presentations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Create professional presentations from project documentation
                  and research findings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
