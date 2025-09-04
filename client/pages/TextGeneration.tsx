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
import StarLoading from "@/components/ui/StarLoading";

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
    <div className="min-h-screen py-16"> {/* Increased top/bottom padding from py-8 to py-16 */}
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Text Generation
          </h1>
          <span className="text-white block mb-4">
            Create compelling content with our advanced AI text generation
          </span>
          <Badge variant="secondary" className="inline-block mb-2">
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
              {/* Move Your Prompt input to the top */}
              <div className="space-y-2">
                <Label htmlFor="prompt">Your Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe what you want to create... (e.g., 'Write a social media post about the benefits of AI in content creation')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  className="resize-none bg-gray-800 bg-opacity-60 text-white placeholder:text-gray-300 border-none shadow-none"
                />
              </div>
              {/* Content Type */}
              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="bg-gray-800 bg-opacity-60 text-white border-none shadow-none">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 bg-opacity-80 text-white">
                    {contentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-white bg-transparent hover:bg-gray-700/60">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Tone & Style */}
              <div className="space-y-2">
                <Label htmlFor="tone">Tone & Style</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="bg-gray-800 bg-opacity-60 text-white border-none shadow-none">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 bg-opacity-80 text-white">
                    {tones.map((toneOption) => (
                      <SelectItem
                        key={toneOption.value}
                        value={toneOption.value}
                        className="text-white bg-transparent hover:bg-gray-700/60"
                      >
                        {toneOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                ) : null}
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
                      className="bg-black text-white border-white"
                    >
                      <Copy className="h-4 w-4 mr-1 text-white" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadContent}
                      className="bg-black text-white border-white"
                    >
                      <Download className="h-4 w-4 mr-1 text-white" />
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
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <StarLoading />
                </div>
              ) : generatedContent ? (
                <div className="rounded-lg p-4 bg-black bg-opacity-40 max-h-[300px] min-h-[300px] overflow-y-auto flex">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-white w-full h-full m-0">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
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
