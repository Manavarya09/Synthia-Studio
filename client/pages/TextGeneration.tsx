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
import {
  PenTool,
  Copy,
  Download,
  Sparkles,
  RefreshCw,
  Settings,
} from "lucide-react";

const contentTypes = [
  { value: "social-post", label: "Social Media Post" },
  { value: "blog", label: "Blog Article" },
  { value: "marketing-copy", label: "Marketing Copy" },
  { value: "caption", label: "Caption" },
  { value: "script", label: "Video Script" },
  { value: "email", label: "Email Content" },
];

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "formal", label: "Formal" },
  { value: "creative", label: "Creative" },
  { value: "persuasive", label: "Persuasive" },
];

export default function TextGeneration() {
  const location = useLocation();
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("");
  const [tone, setTone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const promptParam = params.get("prompt");
    if (promptParam) setPrompt(promptParam);
  }, [location.search]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedContent("");

    try {
      const res = await fetch("/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, contentType, tone }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      const data: { content: string; model: string } = await res.json();
      setGeneratedContent(data.content);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setGeneratedContent(`Error: ${message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const downloadContent = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "generated-content.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <PenTool className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Text Generation
            </h1>
          </div>
          <span className="text-white">
            Create compelling content with our advanced AI text generation
          </span>
          <Badge variant="secondary" className="mt-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by Qwen-Max
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Content Settings
              </CardTitle>
              <CardDescription>
                Configure your content generation parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone & Style</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((toneOption) => (
                      <SelectItem
                        key={toneOption.value}
                        value={toneOption.value}
                      >
                        {toneOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Your Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe what you want to create... (e.g., 'Write a social media post about the benefits of AI in content creation')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
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
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Generated Content</span>
                {generatedContent && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadContent}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                Your AI-generated content will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : generatedContent ? (
                <div className="bg-muted/50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <PenTool className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Enter your prompt and click "Generate Content" to see your
                    AI-created text here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            Text Generation Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Multiple Formats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Generate social media posts, blog articles, marketing copy,
                  and more.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-white">Tone Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Adjust the tone and style to match your brand voice perfectly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-white">Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Copy to clipboard or download as text files for easy sharing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
