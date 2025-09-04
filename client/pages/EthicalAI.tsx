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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Users,
  Eye,
  FileText,
  BarChart3,
  Target,
  Brain,
  Search,
  Scale,
  Award,
  Lightbulb,
} from "lucide-react";

interface ContentAnalysis {
  id: string;
  title: string;
  content: string;
  analysis: {
    plagiarismScore: number;
    biasFlag: boolean;
    qualityScore: number;
    readabilityScore: number;
    inclusivityScore: number;
    factAccuracy: number;
  };
  improvements: {
    category: "plagiarism" | "bias" | "quality" | "readability" | "inclusivity";
    severity: "low" | "medium" | "high";
    description: string;
    suggestion: string;
  }[];
  status: "pass" | "warning" | "fail";
  lastChecked: string;
}

interface EthicsMetrics {
  totalChecks: number;
  passRate: number;
  avgQualityScore: number;
  flaggedContent: number;
  improvedContent: number;
}

export default function EthicalAI() {
  const [contentToCheck, setContentToCheck] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

  const contentAnalyses: ContentAnalysis[] = [
    {
      id: "1",
      title: "AI Product Launch Blog Post",
      content:
        "Our revolutionary AI platform leverages cutting-edge machine learning to transform business operations...",
      analysis: {
        plagiarismScore: 5.2,
        biasFlag: false,
        qualityScore: 87.5,
        readabilityScore: 82.0,
        inclusivityScore: 91.0,
        factAccuracy: 94.0,
      },
      improvements: [
        {
          category: "quality",
          severity: "medium",
          description: "Technical jargon may reduce accessibility",
          suggestion:
            "Consider simplifying technical terms or providing definitions for broader audience understanding",
        },
        {
          category: "readability",
          severity: "low",
          description: "Some sentences are complex",
          suggestion: "Break down longer sentences for improved readability",
        },
      ],
      status: "pass",
      lastChecked: "2 hours ago",
    },
    {
      id: "2",
      title: "Marketing Campaign Copy",
      content:
        "Transform your business with AI! Our platform helps companies streamline operations and boost productivity...",
      analysis: {
        plagiarismScore: 2.1,
        biasFlag: true,
        qualityScore: 76.0,
        readabilityScore: 89.0,
        inclusivityScore: 68.0,
        factAccuracy: 88.0,
      },
      improvements: [
        {
          category: "bias",
          severity: "high",
          description: "Gendered language detected in business context",
          suggestion:
            "Use inclusive language like 'business leaders' instead of 'businessmen'",
        },
        {
          category: "inclusivity",
          severity: "medium",
          description: "Limited cultural perspectives represented",
          suggestion:
            "Include diverse examples and use cases that reflect different backgrounds",
        },
        {
          category: "quality",
          severity: "medium",
          description: "Claims lack supporting evidence",
          suggestion:
            "Add statistics or case studies to support productivity claims",
        },
      ],
      status: "warning",
      lastChecked: "4 hours ago",
    },
    {
      id: "3",
      title: "Technical Documentation",
      content:
        "The API implementation requires careful consideration of security protocols and data handling practices...",
      analysis: {
        plagiarismScore: 15.8,
        biasFlag: false,
        qualityScore: 92.0,
        readabilityScore: 74.0,
        inclusivityScore: 85.0,
        factAccuracy: 96.0,
      },
      improvements: [
        {
          category: "plagiarism",
          severity: "high",
          description: "Significant content overlap with external sources",
          suggestion:
            "Rewrite sections in original language or properly cite sources",
        },
        {
          category: "readability",
          severity: "medium",
          description: "Technical complexity may limit accessibility",
          suggestion:
            "Add examples and step-by-step explanations for complex concepts",
        },
      ],
      status: "fail",
      lastChecked: "6 hours ago",
    },
  ];

  const ethicsMetrics: EthicsMetrics = {
    totalChecks: 1247,
    passRate: 78.5,
    avgQualityScore: 84.2,
    flaggedContent: 45,
    improvedContent: 89,
  };

  const handleAnalyzeContent = async () => {
    if (!contentToCheck.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis process
    const steps = [
      "Plagiarism Check",
      "Bias Detection",
      "Quality Assessment",
      "Readability Analysis",
      "Generating Report",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
    }

    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number, reverse = false) => {
    if (reverse) {
      if (score <= 30) return "text-green-600";
      if (score <= 60) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (score >= 80) return "text-green-600";
      if (score >= 60) return "text-yellow-600";
      return "text-red-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "fail":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "plagiarism":
        return <Search className="h-4 w-4" />;
      case "bias":
        return <Scale className="h-4 w-4" />;
      case "quality":
        return <Award className="h-4 w-4" />;
      case "readability":
        return <Eye className="h-4 w-4" />;
      case "inclusivity":
        return <Users className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const selectedAnalysisData = contentAnalyses.find(
    (a) => a.id === selectedAnalysis,
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <Shield className="h-8 w-8 mr-3 text-primary" />
              Ethical AI Monitoring
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive content analysis for plagiarism, bias, quality, and
              ethical compliance
            </p>
          </div>
          <Badge variant="secondary" className="flex items-center">
            Powered by Qwen-Audit
          </Badge>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Content Analysis Input */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Content Analysis
                </CardTitle>
                <CardDescription>
                  Analyze content for ethical compliance and quality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Content to Analyze
                  </label>
                  <Textarea
                    placeholder="Paste your content here for ethical AI analysis..."
                    value={contentToCheck}
                    onChange={(e) => setContentToCheck(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                  <div className="text-xs text-muted-foreground">
                    {contentToCheck.length} characters
                  </div>
                </div>

                <Button
                  onClick={handleAnalyzeContent}
                  disabled={!contentToCheck.trim() || isAnalyzing}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Run Ethical Analysis
                    </>
                  )}
                </Button>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analysis Progress</span>
                      <span>{Math.round(analysisProgress)}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metrics Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ethics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-xl font-bold text-green-600">
                      {ethicsMetrics.passRate}%
                    </div>
                    <div className="text-muted-foreground">Pass Rate</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-xl font-bold text-primary">
                      {ethicsMetrics.avgQualityScore}
                    </div>
                    <div className="text-muted-foreground">Avg Quality</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-xl font-bold text-blue-600">
                      {ethicsMetrics.totalChecks}
                    </div>
                    <div className="text-muted-foreground">Total Checks</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-xl font-bold text-purple-600">
                      {ethicsMetrics.improvedContent}
                    </div>
                    <div className="text-muted-foreground">Improved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recent">Recent Analysis</TabsTrigger>
                <TabsTrigger value="details">Analysis Details</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Analysis Results</CardTitle>
                    <CardDescription>
                      Review ethical compliance and quality assessments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contentAnalyses.map((analysis) => (
                        <div
                          key={analysis.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedAnalysis === analysis.id
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedAnalysis(analysis.id)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{analysis.title}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {analysis.content}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={getStatusColor(analysis.status)}
                            >
                              {analysis.status === "pass" && (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              {analysis.status === "warning" && (
                                <AlertTriangle className="h-3 w-3 mr-1" />
                              )}
                              {analysis.status === "fail" && (
                                <XCircle className="h-3 w-3 mr-1" />
                              )}
                              {analysis.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <div
                                className={`font-medium ${getScoreColor(analysis.analysis.plagiarismScore, true)}`}
                              >
                                {analysis.analysis.plagiarismScore}%
                              </div>
                              <div className="text-muted-foreground text-xs">
                                Plagiarism
                              </div>
                            </div>
                            <div className="text-center">
                              <div
                                className={`font-medium ${getScoreColor(analysis.analysis.qualityScore)}`}
                              >
                                {analysis.analysis.qualityScore}
                              </div>
                              <div className="text-muted-foreground text-xs">
                                Quality
                              </div>
                            </div>
                            <div className="text-center">
                              <div
                                className={
                                  analysis.analysis.biasFlag
                                    ? "font-medium text-red-600"
                                    : "font-medium text-green-600"
                                }
                              >
                                {analysis.analysis.biasFlag
                                  ? "Detected"
                                  : "None"}
                              </div>
                              <div className="text-muted-foreground text-xs">
                                Bias
                              </div>
                            </div>
                          </div>

                          {analysis.improvements.length > 0 && (
                            <div className="mt-3 pt-3 border-t">
                              <div className="text-xs text-muted-foreground">
                                {analysis.improvements.length} improvement
                                {analysis.improvements.length !== 1 ? "s" : ""}{" "}
                                suggested
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                {selectedAnalysisData ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedAnalysisData.title}</CardTitle>
                      <CardDescription>
                        Detailed analysis and improvement recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Detailed Scores */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Plagiarism Score
                            </span>
                            <span
                              className={`font-bold ${getScoreColor(selectedAnalysisData.analysis.plagiarismScore, true)}`}
                            >
                              {selectedAnalysisData.analysis.plagiarismScore}%
                            </span>
                          </div>
                          <Progress
                            value={
                              selectedAnalysisData.analysis.plagiarismScore
                            }
                            className="h-2"
                          />

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Quality Score
                            </span>
                            <span
                              className={`font-bold ${getScoreColor(selectedAnalysisData.analysis.qualityScore)}`}
                            >
                              {selectedAnalysisData.analysis.qualityScore}
                            </span>
                          </div>
                          <Progress
                            value={selectedAnalysisData.analysis.qualityScore}
                            className="h-2"
                          />

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Readability
                            </span>
                            <span
                              className={`font-bold ${getScoreColor(selectedAnalysisData.analysis.readabilityScore)}`}
                            >
                              {selectedAnalysisData.analysis.readabilityScore}
                            </span>
                          </div>
                          <Progress
                            value={
                              selectedAnalysisData.analysis.readabilityScore
                            }
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Inclusivity
                            </span>
                            <span
                              className={`font-bold ${getScoreColor(selectedAnalysisData.analysis.inclusivityScore)}`}
                            >
                              {selectedAnalysisData.analysis.inclusivityScore}
                            </span>
                          </div>
                          <Progress
                            value={
                              selectedAnalysisData.analysis.inclusivityScore
                            }
                            className="h-2"
                          />

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Fact Accuracy
                            </span>
                            <span
                              className={`font-bold ${getScoreColor(selectedAnalysisData.analysis.factAccuracy)}`}
                            >
                              {selectedAnalysisData.analysis.factAccuracy}
                            </span>
                          </div>
                          <Progress
                            value={selectedAnalysisData.analysis.factAccuracy}
                            className="h-2"
                          />

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Bias Detection
                            </span>
                            <span
                              className={
                                selectedAnalysisData.analysis.biasFlag
                                  ? "font-bold text-red-600"
                                  : "font-bold text-green-600"
                              }
                            >
                              {selectedAnalysisData.analysis.biasFlag
                                ? "Issues Found"
                                : "Clear"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Improvement Recommendations */}
                      <div>
                        <h4 className="font-medium mb-4 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Improvement Recommendations
                        </h4>
                        <div className="space-y-3">
                          {selectedAnalysisData.improvements.map(
                            (improvement, index) => (
                              <div
                                key={index}
                                className="border rounded-lg p-4"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    {getCategoryIcon(improvement.category)}
                                    <span className="font-medium capitalize">
                                      {improvement.category}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className={getSeverityColor(
                                        improvement.severity,
                                      )}
                                    >
                                      {improvement.severity} severity
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {improvement.description}
                                </p>
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 text-sm">
                                  <strong>Suggestion:</strong>{" "}
                                  {improvement.suggestion}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">
                        Select an analysis from the recent results to view
                        details
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="trends" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Quality Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>This Week</span>
                          <span className="font-medium text-green-600">
                            +5.2%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>This Month</span>
                          <span className="font-medium text-green-600">
                            +12.8%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Overall Trend</span>
                          <span className="font-medium text-green-600">
                            Improving
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Issue Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Readability</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={65} className="w-16 h-2" />
                            <span className="text-sm font-medium">65%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Bias</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={23} className="w-16 h-2" />
                            <span className="text-sm font-medium">23%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Plagiarism</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={12} className="w-16 h-2" />
                            <span className="text-sm font-medium">12%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
