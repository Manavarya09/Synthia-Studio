import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sparkles, History as HistoryIcon } from "lucide-react";
import { useState } from "react";
import Spline from "@splinetool/react-spline";
import HamburgerMenu from "./HamburgerMenu";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { label: "Home", value: "home", page: "/" },
  {
    label: "Content Tools",
    value: "content",
    children: [
      { label: "Text", value: "text", page: "/text" },
      { label: "Images", value: "images", page: "/images" },
      { label: "Videos", value: "videos", page: "/videos" },
      { label: "Audio", value: "audio", page: "/audio" },
    ],
  },
  {
    label: "Creator Tools",
    value: "creator",
    children: [
      { label: "Social Posts", value: "social", page: "/social" },
      { label: "Promo Videos", value: "promo", page: "/promo-video" },
      { label: "Notes to Slides", value: "slides", page: "/notes-to-slides" },
      { label: "Team Collab", value: "collab", page: "/collaboration" },
    ],
  },
  {
    label: "Advanced",
    value: "advanced",
    children: [
      { label: "Content Sync", value: "content-sync", page: "/content-sync" },
      { label: "AI Personas", value: "ai-personas", page: "/ai-personas" },
      { label: "Real-time Collab", value: "realtime-collab", page: "/realtime-collab" },
      { label: "Repurposing", value: "repurposing", page: "/content-repurposing" },
      { label: "Ethical AI", value: "ethical-ai", page: "/ethical-ai" },
      { label: "Cloud Sec", value: "cloud-sec", page: "/cloud-security" },
    ],
  },
  { label: "History", value: "history", page: "/history", icon: HistoryIcon },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(navigation[0].value);

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
      
      {/* Header with Hamburger Menu and Logo */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4">
        <HamburgerMenu tools={navigation} selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        <img src="/logo.svg" alt="Logo" className="h-12 w-auto" />
      </div>
      
      <main className="flex-1 w-full pt-20">{children}</main>
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
