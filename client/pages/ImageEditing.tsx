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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Edit3,
  Upload,
  Download,
  Sparkles,
  RefreshCw,
  Settings,
  Image as ImageIcon,
} from "lucide-react";
import StarLoading from "@/components/ui/StarLoading";

export default function ImageEditing() {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedImages, setEditedImages] = useState<string[]>([]);
  const [originalImage, setOriginalImage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const promptParam = params.get("prompt");
    if (promptParam) setEditPrompt(promptParam);
  }, [location.search]);

  const handleEdit = async () => {
    if (!imageUrl.trim() || !editPrompt.trim()) return;

    setIsEditing(true);
    setEditedImages([]);

    try {
      const res = await fetch("/api/edit-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          editPrompt,
          negativePrompt,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      const data: { editedImages: string[]; model: string; originalImage: string } = await res.json();
      setEditedImages(data.editedImages);
      setOriginalImage(data.originalImage);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setEditedImages([
        "data:image/svg+xml;base64," +
          btoa(
            "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'><rect width='100%' height='100%' fill='#fee2e2'/><text x='20' y='110' font-family='Arial' font-size='14' fill='#991b1b'>Error editing image</text></svg>",
          ),
      ]);
    } finally {
      setIsEditing(false);
    }
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "edited-image-" + (index + 1) + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Image Editing</h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Edit and transform your images with AI-powered editing capabilities
          </p>
          <Badge variant="secondary" className="mt-4">
            Powered by Qwen-Image-Edit
          </Badge>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  Edit Settings
                </CardTitle>
                <CardDescription>
                  Upload an image and describe the changes you want to make
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 overflow-auto">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Upload Image</Label>
                  <div className="flex flex-col gap-2">
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="bg-gray-800 bg-opacity-60 text-white border-none shadow-none"
                    />
                    <span className="text-xs text-gray-400">Or paste an image URL below</span>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="bg-gray-800 bg-opacity-60 text-white placeholder:text-gray-300 border-none shadow-none"
                    />
                  </div>
                </div>

                {/* Original Image Preview */}
                {imageUrl && (
                  <div className="space-y-2">
                    <Label>Original Image</Label>
                    <div className="border rounded-lg overflow-hidden bg-gray-800 bg-opacity-60">
                      <img
                        src={imageUrl}
                        alt="Original"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Edit Prompt */}
                <div className="space-y-2">
                  <Label htmlFor="edit-prompt">Edit Instructions</Label>
                  <Textarea
                    id="edit-prompt"
                    placeholder="Describe what changes you want to make to the image... (e.g., 'Change the person to a standing position, bending over to hold the dog's front paws')"
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    rows={6}
                    className="resize-none bg-gray-800 bg-opacity-60 text-white placeholder:text-gray-300 border-none shadow-none"
                  />
                </div>

                {/* Negative Prompt */}
                <div className="space-y-2">
                  <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
                  <Textarea
                    id="negative-prompt"
                    placeholder="What you don't want in the edited image..."
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    rows={3}
                    className="resize-none bg-gray-800 bg-opacity-60 text-white placeholder:text-gray-300 border-none shadow-none"
                  />
                </div>

                <Button
                  onClick={handleEdit}
                  disabled={!imageUrl.trim() || !editPrompt.trim() || isEditing}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                  size="lg"
                >
                  {isEditing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Editing Image...
                    </>
                  ) : (
                    <>
                      Edit Image
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
                <CardTitle className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Edited Images
                </CardTitle>
                <CardDescription>
                  Your AI-edited images will appear here
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] flex flex-col">
                {isEditing ? (
                  <div className="w-full flex-1 flex items-center justify-center relative">
                    <StarLoading />
                  </div>
                ) : editedImages.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4 flex-1 overflow-auto">
                    {editedImages.map((imageUrl, index) => (
                      <div key={index} className="group relative">
                        <img
                          src={imageUrl}
                          alt={`Edited image ${index + 1}`}
                          className="w-full rounded-lg border bg-muted"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => downloadImage(imageUrl, index)}
                            className="bg-gray-900/40 backdrop-blur-sm hover:bg-gray-900/60"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center flex-1 flex flex-col items-center justify-center text-muted-foreground">
                    <Upload className="h-12 w-12 mb-4 opacity-50" />
                    <p>
                      Upload an image and describe your edits to see the AI-transformed results here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            Image Editing Features
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-white">Smart Editing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  AI understands your editing instructions and applies them intelligently.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-white">Natural Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Seamless edits that look natural and professionally done.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-white">Multiple Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Support for various image formats and upload methods.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-white">Instant Download</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Download your edited images immediately after processing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
