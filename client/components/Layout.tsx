import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PenTool,
  Image,
  Video,
  Mic,
  Sparkles,
  Menu,
  X,
  FolderOpen,
  Share2,
  Presentation,
  Users,
  RefreshCw,
  Brain,
  Shield,
  Repeat,
  Cloud,
} from "lucide-react";
import { useState } from "react";
import Spline from "@splinetool/react-spline";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Home", href: "/", icon: Sparkles, category: "main" },
  { name: "Projects", href: "/projects", icon: FolderOpen, category: "main" },
  // Individual Content Generators
  { name: "Text", href: "/text", icon: PenTool, category: "generators" },
  { name: "Images", href: "/images", icon: Image, category: "generators" },
  { name: "Videos", href: "/videos", icon: Video, category: "generators" },
  { name: "Audio", href: "/audio", icon: Mic, category: "generators" },
  // Specialized Workflows
  {
    name: "Social Posts",
    href: "/social",
    icon: Share2,
    category: "workflows",
  },
  {
    name: "Promo Videos",
    href: "/promo-video",
    icon: Video,
    category: "workflows",
  },
  {
    name: "Notes to Slides",
    href: "/notes-to-slides",
    icon: Presentation,
    category: "workflows",
  },
  {
    name: "Team Collab",
    href: "/collaboration",
    icon: Users,
    category: "workflows",
  },
  // Advanced Features
  {
    name: "Content Sync",
    href: "/content-sync",
    icon: RefreshCw,
    category: "advanced",
  },
  {
    name: "AI Personas",
    href: "/ai-personas",
    icon: Brain,
    category: "advanced",
  },
  {
    name: "Real-time Collab",
    href: "/realtime-collab",
    icon: Users,
    category: "advanced",
  },
  {
    name: "Repurposing",
    href: "/content-repurposing",
    icon: Repeat,
    category: "advanced",
  },
  {
    name: "Ethical AI",
    href: "/ethical-ai",
    icon: Shield,
    category: "advanced",
  },
  {
    name: "Cloud Security",
    href: "/cloud-security",
    icon: Cloud,
    category: "advanced",
  },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location.pathname === "/";

  return (
    <div className={`min-h-screen w-full relative ${isHome ? 'bg-background' : ''}`}>
      {!isHome && (
        <div className="fixed inset-0 -z-10 w-full h-full">
          <Spline
            scene="https://prod.spline.design/mHxBByShoKLfoEba/scene.splinecode"
            style={{ width: "100vw", height: "100vh" }}
          />
        </div>
      )}
      <header className="border-b border-transparent bg-transparent backdrop-blur-none supports-[backdrop-filter]:bg-transparent sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-brand bg-clip-text text-transparent">
                GenAI Studio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation
                .filter((item) => item.category === "main")
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

              {/* Dropdown for Content Tools */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent">
                  <PenTool className="h-4 w-4" />
                  <span>Content Tools</span>
                  <span className="text-xs">▼</span>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="p-2">
                    <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                      Generators
                    </div>
                    {navigation
                      .filter((item) => item.category === "generators")
                      .map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                              "flex items-center space-x-2 px-2 py-1.5 rounded text-sm transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent",
                            )}
                          >
                            <Icon className="h-3 w-3" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    <div className="text-xs font-medium text-muted-foreground mb-2 mt-3 px-2">
                      Workflows
                    </div>
                    {navigation
                      .filter((item) => item.category === "workflows")
                      .map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                              "flex items-center space-x-2 px-2 py-1.5 rounded text-sm transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent",
                            )}
                          >
                            <Icon className="h-3 w-3" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Dropdown for Advanced Features */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent">
                  <Sparkles className="h-4 w-4" />
                  <span>Advanced</span>
                  <span className="text-xs">▼</span>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="p-2">
                    {navigation
                      .filter((item) => item.category === "advanced")
                      .map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                              "flex items-center space-x-2 px-2 py-1.5 rounded text-sm transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent",
                            )}
                          >
                            <Icon className="h-3 w-3" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button className="bg-gradient-brand hover:opacity-90">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-border/40 py-4 max-h-96 overflow-y-auto">
              <nav className="flex flex-col space-y-2">
                {/* Main Navigation */}
                {navigation
                  .filter((item) => item.category === "main")
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}

                {/* Content Generators */}
                <div className="pt-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-3">
                    Content Generators
                  </div>
                  {navigation
                    .filter((item) => item.category === "generators")
                    .map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ml-2",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                </div>

                {/* Workflows */}
                <div className="pt-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-3">
                    Specialized Workflows
                  </div>
                  {navigation
                    .filter((item) => item.category === "workflows")
                    .map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ml-2",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                </div>

                {/* Advanced Features */}
                <div className="pt-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-3">
                    Advanced Features
                  </div>
                  {navigation
                    .filter((item) => item.category === "advanced")
                    .map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ml-2",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-gradient-brand hover:opacity-90">
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 w-full">{children}</main>

      <footer className="border-t border-border/40 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-6 w-6 bg-gradient-brand rounded-md flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold bg-gradient-brand bg-clip-text text-transparent">
                GenAI Studio
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 GenAI Studio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
