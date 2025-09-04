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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Brain,
  Plus,
  Edit3,
  Trash2,
  TrendingUp,
  User,
  Sparkles,
  RefreshCw,
  Eye,
  Copy,
  Settings,
  BarChart3,
  Zap,
  Target,
} from "lucide-react";

interface AIPersona {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  tone: string;
  style: string;
  expertise: string[];
  adaptationLevel: number;
  usageCount: number;
  successRate: number;
  learningData: {
    editFeedback: number;
    userPreferences: string[];
    contentTypes: string[];
  };
}

interface PersonaMetrics {
  totalGenerations: number;
  adaptationScore: number;
  userSatisfaction: number;
  learningProgress: number;
}

export default function AIPersonas() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPersona, setNewPersona] = useState({
    name: "",
    description: "",
    tone: "",
    style: "",
    expertise: [],
  });

  const personas: AIPersona[] = [
    {
      id: "1",
      name: "Marketing Maven",
      description:
        "Expert in persuasive marketing content with data-driven insights",
      tone: "Professional yet engaging",
      style: "Persuasive with clear CTAs",
      expertise: ["Marketing", "Sales", "Social Media", "Email Campaigns"],
      adaptationLevel: 85,
      usageCount: 342,
      successRate: 92,
      learningData: {
        editFeedback: 45,
        userPreferences: [
          "Shorter paragraphs",
          "More bullet points",
          "Action-oriented language",
        ],
        contentTypes: ["Social Posts", "Email Campaigns", "Landing Pages"],
      },
    },
    {
      id: "2",
      name: "Technical Writer",
      description:
        "Specialized in clear, accurate technical documentation and tutorials",
      tone: "Clear and instructional",
      style: "Step-by-step with examples",
      expertise: [
        "Technical Writing",
        "Documentation",
        "Tutorials",
        "API Guides",
      ],
      adaptationLevel: 78,
      usageCount: 156,
      successRate: 94,
      learningData: {
        editFeedback: 23,
        userPreferences: [
          "Code examples",
          "Visual aids",
          "Troubleshooting sections",
        ],
        contentTypes: ["Documentation", "Tutorials", "Technical Blogs"],
      },
    },
    {
      id: "3",
      name: "Creative Storyteller",
      description: "Crafts compelling narratives and engaging brand stories",
      tone: "Warm and narrative-driven",
      style: "Story-based with emotion",
      expertise: [
        "Storytelling",
        "Brand Content",
        "Creative Writing",
        "Video Scripts",
      ],
      adaptationLevel: 91,
      usageCount: 289,
      successRate: 88,
      learningData: {
        editFeedback: 67,
        userPreferences: [
          "Character development",
          "Emotional hooks",
          "Visual imagery",
        ],
        contentTypes: ["Brand Stories", "Video Scripts", "Creative Content"],
      },
    },
    {
      id: "4",
      name: "Data Analyst",
      description:
        "Transforms complex data into accessible insights and reports",
      tone: "Analytical and objective",
      style: "Data-driven with visualizations",
      expertise: ["Data Analysis", "Reports", "Research", "Statistics"],
      adaptationLevel: 72,
      usageCount: 98,
      successRate: 96,
      learningData: {
        editFeedback: 15,
        userPreferences: [
          "Charts and graphs",
          "Executive summaries",
          "Actionable insights",
        ],
        contentTypes: ["Reports", "Data Stories", "Research Summaries"],
      },
    },
  ];

  const toneOptions = [
    "Professional",
    "Casual",
    "Friendly",
    "Authoritative",
    "Conversational",
    "Persuasive",
    "Educational",
    "Inspirational",
    "Analytical",
    "Creative",
  ];

  const styleOptions = [
    "Clear and Concise",
    "Detailed and Comprehensive",
    "Story-driven",
    "Data-focused",
    "Action-oriented",
    "Question-based",
    "Step-by-step",
    "Visual-heavy",
  ];

  const expertiseOptions = [
    "Marketing",
    "Sales",
    "Technical Writing",
    "Creative Writing",
    "Data Analysis",
    "Social Media",
    "Email Campaigns",
    "Blog Writing",
    "Video Scripts",
    "Reports",
    "Documentation",
    "Tutorials",
    "Brand Content",
    "Research",
    "Customer Support",
  ];

  const getPersonaMetrics = (persona: AIPersona): PersonaMetrics => {
    return {
      totalGenerations: persona.usageCount,
      adaptationScore: persona.adaptationLevel,
      userSatisfaction: persona.successRate,
      learningProgress: Math.min(
        100,
        (persona.learningData.editFeedback / 50) * 100,
      ),
    };
  };

  const handleCreatePersona = () => {
    if (!newPersona.name || !newPersona.description) return;

    // In a real app, this would save to the backend
    console.log("Creating persona:", newPersona);
    setIsCreating(false);
    setNewPersona({
      name: "",
      description: "",
      tone: "",
      style: "",
      expertise: [],
    });
  };

  const handleTestPersona = (personaId: string) => {
    // In a real app, this would trigger a test generation
    console.log("Testing persona:", personaId);
  };

  const handleClonePersona = (personaId: string) => {
    const persona = personas.find((p) => p.id === personaId);
    if (persona) {
      setNewPersona({
        name: `${persona.name} (Copy)`,
        description: persona.description,
        tone: persona.tone,
        style: persona.style,
        expertise: persona.expertise,
      });
      setIsCreating(true);
    }
  };

  const getAdaptationColor = (level: number) => {
    if (level >= 80) return "text-green-600";
    if (level >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <Brain className="h-8 w-8 mr-3 text-primary" />
              AI Personas
            </h1>
            <p className="text-muted-foreground mt-2">
              Dynamic AI assistants that adapt to your style and learn from your
              edits
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Persona
            </Button>
            <Badge variant="secondary" className="flex items-center">
              Powered by Qwen-Plus
            </Badge>
          </div>
        </div>

        {isCreating && (
          <Card className="mb-8 border-2 border-dashed border-primary/20">
            <CardHeader>
              <CardTitle>Create New AI Persona</CardTitle>
              <CardDescription>
                Define a specialized AI assistant with custom style, tone, and
                expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="persona-name">Persona Name *</Label>
                    <Input
                      id="persona-name"
                      placeholder="e.g., Marketing Maven, Technical Expert"
                      value={newPersona.name}
                      onChange={(e) =>
                        setNewPersona((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="persona-description">Description *</Label>
                    <Textarea
                      id="persona-description"
                      placeholder="Describe this persona's purpose and specialties..."
                      value={newPersona.description}
                      onChange={(e) =>
                        setNewPersona((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="persona-tone">Tone</Label>
                    <Select
                      value={newPersona.tone}
                      onValueChange={(value) =>
                        setNewPersona((prev) => ({ ...prev, tone: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map((tone) => (
                          <SelectItem key={tone} value={tone}>
                            {tone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="persona-style">Writing Style</Label>
                    <Select
                      value={newPersona.style}
                      onValueChange={(value) =>
                        setNewPersona((prev) => ({ ...prev, style: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        {styleOptions.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreatePersona}
                  disabled={!newPersona.name || !newPersona.description}
                >
                  Create Persona
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="personas" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personas">My Personas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="learning">Learning Data</TabsTrigger>
          </TabsList>

          <TabsContent value="personas" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personas.map((persona) => {
                const metrics = getPersonaMetrics(persona);
                return (
                  <Card
                    key={persona.id}
                    className="hover:shadow-lg transition-all cursor-pointer"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                              {persona.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {persona.name}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {persona.usageCount} uses
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`text-xs ${getAdaptationColor(persona.adaptationLevel)}`}
                              >
                                {persona.adaptationLevel}% adapted
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {persona.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Persona Attributes */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tone:</span>
                          <span className="font-medium">{persona.tone}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Style:</span>
                          <span className="font-medium">{persona.style}</span>
                        </div>
                      </div>

                      {/* Expertise Tags */}
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Expertise:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {persona.expertise.slice(0, 3).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {persona.expertise.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{persona.expertise.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="space-y-2 pt-2 border-t">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            Success Rate
                          </span>
                          <span className="font-medium text-green-600">
                            {persona.successRate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            Adaptation Level
                          </span>
                          <span
                            className={`font-medium ${getAdaptationColor(persona.adaptationLevel)}`}
                          >
                            {persona.adaptationLevel}%
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleTestPersona(persona.id)}
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          Test
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleClonePersona(persona.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPersona(persona.id)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {personas.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Personas
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {Math.round(
                      personas.reduce((sum, p) => sum + p.successRate, 0) /
                        personas.length,
                    )}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg Success Rate
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {personas.reduce((sum, p) => sum + p.usageCount, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Generations
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {Math.round(
                      personas.reduce((sum, p) => sum + p.adaptationLevel, 0) /
                        personas.length,
                    )}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg Adaptation
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Persona Performance Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personas.map((persona) => (
                    <div key={persona.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{persona.name}</span>
                        <span className="text-muted-foreground">
                          {persona.successRate}% success
                        </span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${persona.successRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Learning & Adaptation Insights
                </CardTitle>
                <CardDescription>
                  How your personas learn and improve from user feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {personas.slice(0, 2).map((persona) => (
                    <div key={persona.id} className="space-y-4">
                      <h4 className="font-medium flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
                            {persona.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {persona.name}
                      </h4>

                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Edit Feedback:
                          </span>
                          <span className="ml-2 font-medium">
                            {persona.learningData.editFeedback} corrections
                          </span>
                        </div>

                        <div>
                          <span className="text-muted-foreground">
                            Learned Preferences:
                          </span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {persona.learningData.userPreferences.map(
                              (pref, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {pref}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>

                        <div>
                          <span className="text-muted-foreground">
                            Content Focus:
                          </span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {persona.learningData.contentTypes.map(
                              (type, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {type}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
