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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Cloud,
  Shield,
  Lock,
  Server,
  Database,
  Network,
  AlertTriangle,
  CheckCircle,
  Settings,
  Activity,
  Download,
  Upload,
  Eye,
  RefreshCw,
  Zap,
  Globe,
  Key,
  FileText,
  BarChart3,
  Clock,
  Users,
} from "lucide-react";

interface VPCConfig {
  id: string;
  name: string;
  region: string;
  status: "active" | "inactive" | "deploying" | "error";
  encryption: boolean;
  compliance: string[];
  resources: {
    instances: number;
    storage: string;
    bandwidth: string;
  };
  security: {
    firewalls: number;
    accessControls: number;
    encryptionLevel: string;
  };
  lastAudit: string;
  uptime: number;
}

interface SecurityMetrics {
  threatsBlocked: number;
  complianceScore: number;
  encryptionCoverage: number;
  accessAttempts: number;
  vulnerabilities: number;
}

interface DeploymentJob {
  id: string;
  name: string;
  type: "model-training" | "inference" | "data-processing" | "backup";
  status: "running" | "completed" | "failed" | "queued";
  progress: number;
  startTime: string;
  estimatedCompletion?: string;
  resources: string;
}

export default function CloudSecurity() {
  const [selectedVPC, setSelectedVPC] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [newVPCName, setNewVPCName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const vpcConfigs: VPCConfig[] = [
    {
      id: "vpc-001",
      name: "Production GenAI Environment",
      region: "China East 1 (Hangzhou)",
      status: "active",
      encryption: true,
      compliance: ["SOC 2", "ISO 27001", "GDPR", "China Cybersecurity Law"],
      resources: {
        instances: 12,
        storage: "2.5 TB",
        bandwidth: "1 Gbps",
      },
      security: {
        firewalls: 3,
        accessControls: 15,
        encryptionLevel: "AES-256",
      },
      lastAudit: "2 days ago",
      uptime: 99.9,
    },
    {
      id: "vpc-002",
      name: "Development & Testing",
      region: "China North 2 (Beijing)",
      status: "active",
      encryption: true,
      compliance: ["SOC 2", "ISO 27001"],
      resources: {
        instances: 6,
        storage: "500 GB",
        bandwidth: "500 Mbps",
      },
      security: {
        firewalls: 2,
        accessControls: 8,
        encryptionLevel: "AES-256",
      },
      lastAudit: "1 week ago",
      uptime: 99.5,
    },
    {
      id: "vpc-003",
      name: "AI Model Training Cluster",
      region: "China South 1 (Shenzhen)",
      status: "deploying",
      encryption: true,
      compliance: ["SOC 2", "China Cybersecurity Law"],
      resources: {
        instances: 24,
        storage: "10 TB",
        bandwidth: "10 Gbps",
      },
      security: {
        firewalls: 4,
        accessControls: 20,
        encryptionLevel: "AES-256",
      },
      lastAudit: "Pending",
      uptime: 0,
    },
  ];

  const securityMetrics: SecurityMetrics = {
    threatsBlocked: 1247,
    complianceScore: 94,
    encryptionCoverage: 100,
    accessAttempts: 8934,
    vulnerabilities: 2,
  };

  const deploymentJobs: DeploymentJob[] = [
    {
      id: "job-001",
      name: "Qwen-Max Model Fine-tuning",
      type: "model-training",
      status: "running",
      progress: 67,
      startTime: "2 hours ago",
      estimatedCompletion: "4 hours remaining",
      resources: "GPU Cluster (8x V100)",
    },
    {
      id: "job-002",
      name: "Content Generation Inference",
      type: "inference",
      status: "completed",
      progress: 100,
      startTime: "6 hours ago",
      resources: "CPU Cluster (4x ECS)",
    },
    {
      id: "job-003",
      name: "User Data Encryption Backup",
      type: "backup",
      status: "running",
      progress: 23,
      startTime: "30 minutes ago",
      estimatedCompletion: "2 hours remaining",
      resources: "Storage Service",
    },
  ];

  const regions = [
    "China East 1 (Hangzhou)",
    "China North 2 (Beijing)",
    "China South 1 (Shenzhen)",
    "China East 2 (Shanghai)",
    "China North 1 (Qingdao)",
  ];

  const handleDeployVPC = async () => {
    if (!newVPCName || !selectedRegion) return;

    setIsDeploying(true);
    setDeploymentProgress(0);

    // Simulate VPC deployment
    const steps = [
      "Creating VPC",
      "Configuring Security Groups",
      "Setting up Encryption",
      "Enabling Monitoring",
      "Finalizing Deployment",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setDeploymentProgress(((i + 1) / steps.length) * 100);
    }

    setIsDeploying(false);
    setNewVPCName("");
    setSelectedRegion("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "deploying":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "inactive":
        return "bg-gray-500/10 text-gray-700 border-gray-200";
      case "error":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "failed":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "queued":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getJobIcon = (type: string) => {
    switch (type) {
      case "model-training":
        return <Zap className="h-4 w-4" />;
      case "inference":
        return <Database className="h-4 w-4" />;
      case "data-processing":
        return <Server className="h-4 w-4" />;
      case "backup":
        return <Shield className="h-4 w-4" />;
      default:
        return <Cloud className="h-4 w-4" />;
    }
  };

  const selectedVPCData = vpcConfigs.find((vpc) => vpc.id === selectedVPC);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <Cloud className="h-8 w-8 mr-3 text-primary" />
              Cloud Security Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Secure Alibaba Cloud VPC deployment and management for AI model
              training and inference
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Alibaba Cloud PAI + Model Studio
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* VPC Management */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="vpc-overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="vpc-overview">VPC Overview</TabsTrigger>
                <TabsTrigger value="deployments">Deployments</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="audit">Audit Logs</TabsTrigger>
              </TabsList>

              <TabsContent value="vpc-overview" className="space-y-6">
                {/* New VPC Deployment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Deploy New VPC Environment
                    </CardTitle>
                    <CardDescription>
                      Create a secure, isolated cloud environment for AI
                      workloads
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vpc-name">VPC Name</Label>
                        <Input
                          id="vpc-name"
                          placeholder="e.g., GenAI Production Environment"
                          value={newVPCName}
                          onChange={(e) => setNewVPCName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="region">Region</Label>
                        <Select
                          value={selectedRegion}
                          onValueChange={setSelectedRegion}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            {regions.map((region) => (
                              <SelectItem key={region} value={region}>
                                {region}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      onClick={handleDeployVPC}
                      disabled={!newVPCName || !selectedRegion || isDeploying}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                      size="lg"
                    >
                      {isDeploying ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Deploying VPC...
                        </>
                      ) : (
                        <>
                          <Cloud className="h-4 w-4 mr-2" />
                          Deploy Secure VPC
                        </>
                      )}
                    </Button>

                    {isDeploying && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Deployment Progress</span>
                          <span>{Math.round(deploymentProgress)}%</span>
                        </div>
                        <Progress value={deploymentProgress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Existing VPCs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Existing VPC Environments</CardTitle>
                    <CardDescription>
                      Manage and monitor your secure cloud environments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vpcConfigs.map((vpc) => (
                        <div
                          key={vpc.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedVPC === vpc.id
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedVPC(vpc.id)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium flex items-center">
                                <Network className="h-4 w-4 mr-2" />
                                {vpc.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {vpc.region}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {vpc.encryption && (
                                <Lock className="h-4 w-4 text-green-500" />
                              )}
                              <Badge
                                variant="outline"
                                className={getStatusColor(vpc.status)}
                              >
                                {vpc.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Instances:
                              </span>
                              <span className="ml-2 font-medium">
                                {vpc.resources.instances}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Storage:
                              </span>
                              <span className="ml-2 font-medium">
                                {vpc.resources.storage}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Uptime:
                              </span>
                              <span className="ml-2 font-medium text-green-600">
                                {vpc.uptime}%
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t">
                            <div className="flex flex-wrap gap-1">
                              {vpc.compliance.map((standard, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {standard}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deployments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Active Deployment Jobs
                    </CardTitle>
                    <CardDescription>
                      Monitor AI model training, inference, and data processing
                      jobs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deploymentJobs.map((job) => (
                        <div key={job.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                {getJobIcon(job.type)}
                              </div>
                              <div>
                                <h4 className="font-medium">{job.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {job.resources}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={getJobStatusColor(job.status)}
                            >
                              {job.status}
                            </Badge>
                          </div>

                          {job.status === "running" && (
                            <div className="space-y-2 mb-3">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{job.progress}%</span>
                              </div>
                              <Progress value={job.progress} className="h-2" />
                            </div>
                          )}

                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Started: {job.startTime}</span>
                            {job.estimatedCompletion && (
                              <span>{job.estimatedCompletion}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Security Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Threats Blocked</span>
                          <span className="font-bold text-red-600">
                            {securityMetrics.threatsBlocked}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Compliance Score</span>
                          <span className="font-bold text-green-600">
                            {securityMetrics.complianceScore}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Encryption Coverage</span>
                          <span className="font-bold text-blue-600">
                            {securityMetrics.encryptionCoverage}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Access Attempts</span>
                          <span className="font-bold text-purple-600">
                            {securityMetrics.accessAttempts}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Open Vulnerabilities</span>
                          <span
                            className={`font-bold ${securityMetrics.vulnerabilities > 0 ? "text-red-600" : "text-green-600"}`}
                          >
                            {securityMetrics.vulnerabilities}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Security Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">
                              End-to-End Encryption
                            </span>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">
                              Multi-Factor Authentication
                            </span>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">VPC Isolation</span>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Threat Detection</span>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">DDoS Protection</span>
                          </div>
                          <Badge variant="outline">Monitoring</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="audit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Security Audit Logs
                      </span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded text-sm">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Security audit completed successfully</span>
                        </div>
                        <span className="text-muted-foreground">
                          2 hours ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded text-sm">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-4 w-4 text-blue-500" />
                          <span>Encryption keys rotated automatically</span>
                        </div>
                        <span className="text-muted-foreground">
                          6 hours ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded text-sm">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span>Failed login attempt detected and blocked</span>
                        </div>
                        <span className="text-muted-foreground">
                          8 hours ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded text-sm">
                        <div className="flex items-center space-x-3">
                          <Users className="h-4 w-4 text-purple-500" />
                          <span>
                            New user access granted with limited permissions
                          </span>
                        </div>
                        <span className="text-muted-foreground">1 day ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* VPC Details */}
            {selectedVPCData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">VPC Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">
                        {selectedVPCData.name}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Region:</span>
                          <span>{selectedVPCData.region}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Encryption:
                          </span>
                          <span className="text-green-600">AES-256</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Firewalls:
                          </span>
                          <span>{selectedVPCData.security.firewalls}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Access Controls:
                          </span>
                          <span>{selectedVPCData.security.accessControls}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Last Audit:
                          </span>
                          <span>{selectedVPCData.lastAudit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SOC 2 Type II</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ISO 27001</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GDPR</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">China Cybersecurity Law</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Security Report
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Run Security Scan
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Rotate Encryption Keys
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Audit Trail
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
