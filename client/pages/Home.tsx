import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PenTool,
  Image,
  Video,
  Mic,
  Sparkles,
  Users,
  Building2,
  GraduationCap,
  ArrowRight,
  Zap,
  Shield,
  Download,
  Palette,
} from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    icon: PenTool,
    title: "Social Media Generator",
    description:
      "Create unified social media posts and captions optimized for any platform with consistent branding.",
    features: [
      "Platform-Optimized Posts",
      "Engaging Captions",
      "Trending Hashtags",
      "Multi-Format Export",
    ],
    model: "Qwen-Turbo",
    color: "from-purple-500 to-pink-500",
    href: "/social",
  },
  {
    icon: Video,
    title: "Promo Video Studio",
    description:
      "Generate professional 20-second promotional videos from script to final render with unified theming.",
    features: [
      "Script-to-Video Pipeline",
      "Professional Themes",
      "Multi-Format Export",
      "Brand Consistency",
    ],
    model: "Wan-T2V-14B",
    color: "from-orange-500 to-pink-500",
    href: "/promo-video",
  },
  {
    icon: Image,
    title: "Notes to Slides",
    description:
      "Transform raw notes into professional presentations with slide visuals and narrated audio.",
    features: [
      "Auto-Structuring",
      "Visual Slides",
      "Audio Narration",
      "PDF Export",
    ],
    model: "Qwen-Max + Wan",
    color: "from-green-500 to-blue-500",
    href: "/notes-to-slides",
  },
  {
    icon: Mic,
    title: "Team Collaboration",
    description:
      "Collaborative workspace for marketing teams to produce blogs, podcasts, and ads seamlessly.",
    features: [
      "Real-time Editing",
      "Role-based Access",
      "Asset Management",
      "Workflow Tracking",
    ],
    model: "Qwen-Plus + Wan",
    color: "from-purple-500 to-indigo-500",
    href: "/collaboration",
  },
];

const targetAudiences = [
  {
    icon: Building2,
    title: "Small Businesses",
    description: "Scale your content marketing without breaking the budget",
  },
  {
    icon: Users,
    title: "Marketing Teams",
    description: "Streamline content creation and boost campaign efficiency",
  },
  {
    icon: GraduationCap,
    title: "Students & Educators",
    description: "Create engaging educational content and presentations",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate content in seconds, not hours",
  },
  {
    icon: Palette,
    title: "Professional Quality",
    description: "Enterprise-grade AI models for stunning results",
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description: "Download in all popular formats for any platform",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-level security",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20" />
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23a855f7" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-40'
          }
        />

        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Advanced AI Models
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Create{" "}
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                Everything
              </span>{" "}
              in One Platform
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Individual content generators + specialized workflows for text,
              images, videos, and audio. Perfect for small businesses, marketing
              teams, and students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-brand hover:opacity-90 text-lg px-8"
              >
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">AI Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">
                  Content Types
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Availability
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Individual Tools + Workflow Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose individual content generators for specific needs, or use
              specialized workflows for complex projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`h-12 w-12 rounded-lg bg-gradient-to-r ${capability.color} flex items-center justify-center`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {capability.model}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">
                      {capability.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {capability.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-6">
                      {capability.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <div className="h-1.5 w-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Link to={capability.href}>
                      <Button className="w-full group-hover:bg-primary/90">
                        Try {capability.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Creators Like You
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're scaling a business, running campaigns, or educating
              others
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {targetAudiences.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 bg-gradient-brand rounded-xl flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle>{audience.title}</CardTitle>
                    <CardDescription>{audience.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose GenAI Studio?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-brand">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Content Creation?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using GenAI Studio to
            scale their content
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
