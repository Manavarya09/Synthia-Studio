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
  Mic,
  Download,
  Sparkles,
  RefreshCw,
  Settings,
  Play,
  Pause,
  Volume2,
} from "lucide-react";
import StarLoading from "@/components/ui/StarLoading";

const audioTypes = [
  { value: "narration", label: "Video Narration" },
  { value: "podcast", label: "Podcast Audio" },
  { value: "voiceover", label: "Voice Over" },
  { value: "educational", label: "Educational Audio" },
  { value: "commercial", label: "Commercial Ad" },
  { value: "announcement", label: "Announcement" },
];

const voices = [
  { value: "female-professional", label: "Female Professional" },
  { value: "male-professional", label: "Male Professional" },
  { value: "female-friendly", label: "Female Friendly" },
  { value: "male-friendly", label: "Male Friendly" },
  { value: "female-narrator", label: "Female Narrator" },
  { value: "male-narrator", label: "Male Narrator" },
];

const languages = [
  { value: "en-us", label: "English (US)" },
  { value: "en-uk", label: "English (UK)" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
];

export default function AudioGeneration() {
  const location = useLocation();
  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");
  const [audioType, setAudioType] = useState("");
  const [voice, setVoice] = useState("");
  const [language, setLanguage] = useState("en-us");
  const [speed, setSpeed] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const promptParam = params.get("prompt");
    if (promptParam) setPrompt(promptParam);
  }, [location.search]);

  useEffect(() => {
    setText(prompt);
  }, [prompt]);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    setGeneratedAudio(null);
    try {
      const res = await fetch("/api/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          audioType,
          voice,
          language,
          speed: speed[0],
          pitch: pitch[0],
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `Request failed: ${res.status}`);
      }
      const data: { audioUrl: string; model: string } = await res.json();
      setGeneratedAudio(data.audioUrl);
      setTimeout(() => {
        const el = document.getElementById(
          "generated-audio-el",
        ) as HTMLAudioElement | null;
        el?.load();
      }, 0);
    } catch (err) {
      setGeneratedAudio("error");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAudio = () => {
    if (!generatedAudio || generatedAudio === "error") return;
    const link = document.createElement("a");
    link.href = generatedAudio;
    link.download = "generated-audio.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePlay = () => {
    if (!generatedAudio || generatedAudio === "error") return;
    const el = document.getElementById(
      "generated-audio-el",
    ) as HTMLAudioElement | null;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
              <Mic className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Audio Generation</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional narration and voice overs with our advanced AI
            audio generation powered by Qwen-Audio
          </p>
          <Badge variant="secondary" className="mt-4">
            Powered by Qwen-Audio
          </Badge>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Audio Settings
                </CardTitle>
                <CardDescription>
                  Configure your audio generation parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <Label htmlFor="prompt">Your Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe your audio..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="resize-none bg-gray-800 bg-opacity-60 text-white placeholder:text-gray-300 border-none shadow-none"
                  />
                </div>
                {/* Audio Type */}
                <div className="space-y-2">
                  <Label htmlFor="audio-type">Audio Type</Label>
                  <Select value={audioType} onValueChange={setAudioType}>
                    <SelectTrigger className="bg-gray-800 bg-opacity-60 text-white border-none shadow-none">
                      <SelectValue placeholder="Select audio type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 bg-opacity-80 text-white">
                      {audioTypes.map((type) => (
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

                <div className="space-y-2">
                  <Label htmlFor="voice">Voice</Label>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((voiceOption) => (
                        <SelectItem
                          key={voiceOption.value}
                          value={voiceOption.value}
                        >
                          {voiceOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speed">Speed: {speed[0]}x</Label>
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pitch">Pitch: {pitch[0]}x</Label>
                  <Slider
                    value={pitch}
                    onValueChange={setPitch}
                    max={1.5}
                    min={0.7}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!text.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90"
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
                      Generate Audio
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
                    <Volume2 className="h-5 w-5 mr-2" />
                    Generated Audio
                  </span>
                  {generatedAudio && (
                    <Button variant="outline" size="sm" onClick={downloadAudio}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  Your AI-generated audio will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="w-full h-[300px] flex items-center justify-center relative">
                    <StarLoading />
                  </div>
                ) : generatedAudio ? (
                  <div className="space-y-6">
                    <audio
                      id="generated-audio-el"
                      src={generatedAudio || undefined}
                      onLoadedMetadata={(e) =>
                        setDuration(
                          Math.floor(
                            (e.currentTarget as HTMLAudioElement).duration || 0,
                          ),
                        )
                      }
                      onTimeUpdate={(e) =>
                        setCurrentTime(
                          Math.floor(
                            (e.currentTarget as HTMLAudioElement).currentTime ||
                              0,
                          ),
                        )
                      }
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />
                    {/* Audio Player */}
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-6">
                      <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                          <div className="h-24 w-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            {isPlaying ? (
                              <div className="flex space-x-1">
                                <div className="w-1 h-8 bg-gray-900/80 rounded animate-pulse"></div>
                                <div className="w-1 h-6 bg-gray-900/80 rounded animate-pulse delay-75"></div>
                                <div className="w-1 h-10 bg-gray-900/80 rounded animate-pulse delay-150"></div>
                                <div className="w-1 h-4 bg-gray-900/80 rounded animate-pulse delay-225"></div>
                              </div>
                            ) : (
                              <Mic className="h-10 w-10 text-white" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-center mb-6">
                        <h3 className="font-semibold text-lg">
                          Generated Audio Preview
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Voice: {voice} | Language: {language} | Speed:{" "}
                          {speed[0]}x
                        </p>
                      </div>

                      {/* Audio Controls */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-center">
                          <Button
                            variant="ghost"
                            size="lg"
                            onClick={togglePlay}
                            className="h-16 w-16 rounded-full bg-gray-900/40 hover:bg-gray-900/60"
                          >
                            {isPlaying ? (
                              <Pause className="h-8 w-8" />
                            ) : (
                              <Play className="h-8 w-8" />
                            )}
                          </Button>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                          </div>
                          <div className="w-full bg-gray-900/40 rounded-full h-2">
                            <div
                              className="bg-gray-900/80 rounded-full h-full transition-all duration-1000"
                              style={{
                                width:
                                  duration > 0
                                    ? `${(currentTime / duration) * 100}%`
                                    : "0%",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Waveform Visualization */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-center h-16 space-x-1">
                        {Array.from({ length: 50 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-primary/60 w-1 rounded transition-all duration-75"
                            style={{
                              height: `${Math.random() * 60 + 10}px`,
                              opacity:
                                isPlaying && i < (currentTime / duration) * 50
                                  ? 1
                                  : 0.3,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>
                      Enter your prompt and click "Generate Content" to see your
                      AI-created audio here
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
            Audio Generation Features
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Natural Voices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose from professional male and female voices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Multiple Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate audio in English, Spanish, French, and more.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customizable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Adjust speed, pitch, and tone to match your needs.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">High Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional-grade audio output for any use case.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
