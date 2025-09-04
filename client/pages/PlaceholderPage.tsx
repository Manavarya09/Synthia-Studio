import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Construction, ArrowLeft, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface PlaceholderPageProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function PlaceholderPage({
  title = "Coming Soon",
  description = "This page is under development",
  icon: Icon = Construction,
}: PlaceholderPageProps) {
  const location = useLocation();
  const pageName = location.pathname.split("/")[1] || "page";
  const capitalizedPageName =
    pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center">
          <Card className="border-2 border-dashed border-muted-foreground/25">
            <CardHeader className="pb-6">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center">
                  <Icon className="h-10 w-10 text-muted-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl">
                {title === "Coming Soon"
                  ? `${capitalizedPageName} ${title}`
                  : title}
              </CardTitle>
              <CardDescription className="text-lg">
                {description === "This page is under development"
                  ? `The ${pageName} section is currently being built and will be available soon.`
                  : description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  What to expect:
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Advanced AI-powered content generation</li>
                  <li>• Intuitive and user-friendly interface</li>
                  <li>• Professional-quality results</li>
                  <li>• Multiple export and sharing options</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Button className="w-full sm:w-auto bg-gradient-brand hover:opacity-90">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Request This Feature
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Want to be notified when this feature is ready?{" "}
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Join our updates list
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
