import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
// Workflow Pages
import SocialGenerator from "./pages/SocialGenerator";
import PromoVideoGenerator from "./pages/PromoVideoGenerator";
import NotesToSlides from "./pages/NotesToSlides";
import MarketingCollaboration from "./pages/MarketingCollaboration";
// Individual Content Generators
import TextGeneration from "./pages/TextGeneration";
import ImageGeneration from "./pages/ImageGeneration";
import VideoGeneration from "./pages/VideoGeneration";
import ImageEditing from "./pages/ImageEditing";
// Advanced Features
import ContentSync from "./pages/ContentSync";
import AIPersonas from "./pages/AIPersonas";
import RealTimeCollab from "./pages/RealTimeCollab";
import ContentRepurposing from "./pages/ContentRepurposing";
import EthicalAI from "./pages/EthicalAI";
import CloudSecurity from "./pages/CloudSecurity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/projects"
            element={
              <Layout>
                <Projects />
              </Layout>
            }
          />
          {/* Workflow Pages */}
          <Route
            path="/social"
            element={
              <Layout>
                <SocialGenerator />
              </Layout>
            }
          />
          <Route
            path="/promo-video"
            element={
              <Layout>
                <PromoVideoGenerator />
              </Layout>
            }
          />
          <Route
            path="/notes-to-slides"
            element={
              <Layout>
                <NotesToSlides />
              </Layout>
            }
          />
          <Route
            path="/collaboration"
            element={
              <Layout>
                <MarketingCollaboration />
              </Layout>
            }
          />
          {/* Individual Content Generators */}
          <Route
            path="/text"
            element={
              <Layout>
                <TextGeneration />
              </Layout>
            }
          />
          <Route
            path="/images"
            element={
              <Layout>
                <ImageGeneration />
              </Layout>
            }
          />
          <Route
            path="/videos"
            element={
              <Layout>
                <VideoGeneration />
              </Layout>
            }
          />
          <Route
            path="/image-editing"
            element={
              <Layout>
                <ImageEditing />
              </Layout>
            }
          />
          {/* Advanced Features */}
          <Route
            path="/content-sync"
            element={
              <Layout>
                <ContentSync />
              </Layout>
            }
          />
          <Route
            path="/ai-personas"
            element={
              <Layout>
                <AIPersonas />
              </Layout>
            }
          />
          <Route
            path="/realtime-collab"
            element={
              <Layout>
                <RealTimeCollab />
              </Layout>
            }
          />
          <Route
            path="/content-repurposing"
            element={
              <Layout>
                <ContentRepurposing />
              </Layout>
            }
          />
          <Route
            path="/ethical-ai"
            element={
              <Layout>
                <EthicalAI />
              </Layout>
            }
          />
          <Route
            path="/cloud-security"
            element={
              <Layout>
                <CloudSecurity />
              </Layout>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
