
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Upload, 
  X, 
  FileImage, 
  Tag 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BlogImage {
  id: string;
  url: string;
  file?: File;
  previewUrl?: string;
}

const BlogPostEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<BlogImage[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: BlogImage[] = [];
      
      Array.from(e.target.files).forEach(file => {
        const previewUrl = URL.createObjectURL(file);
        newImages.push({
          id: Math.random().toString(36).substring(2, 9),
          url: "",
          file,
          previewUrl
        });
      });
      
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
  };

  const addTag = () => {
    if (currentTag.trim() !== "" && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real implementation, you would:
      // 1. Upload images to Supabase storage
      // 2. Save blog post data to Supabase database

      toast({
        title: "Blog post saved!",
        description: "Your blog post has been successfully saved.",
      });
      
      // Reset the form
      setTitle("");
      setContent("");
      setCategory("");
      setImages([]);
      setTags([]);
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Blog Post</CardTitle>
        <CardDescription>
          Share educational content, announcements, or practice tips with your students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Blog Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter blog title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input 
              id="category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              placeholder="e.g., Practice Tips, Music Theory, Announcements"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Write your blog post content here..."
              className="min-h-[200px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="block mb-2">Tags</Label>
            <div className="flex items-center gap-2 mb-2">
              <Input 
                value={currentTag} 
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={addTag}
                variant="outline"
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map(tag => (
                <div 
                  key={tag} 
                  className="bg-maroon-100 text-maroon-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-maroon-600 hover:text-maroon-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="block mb-2">Images</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center border-gray-300 bg-gray-50">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="space-y-2">
                  <div className="mx-auto h-12 w-12 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-maroon-700 hover:text-maroon-500">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </Label>
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {images.map(image => (
                  <div key={image.id} className="relative border rounded-md overflow-hidden">
                    <img 
                      src={image.previewUrl} 
                      alt="Upload preview" 
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute top-1 right-1 p-1 bg-red-50 text-red-500 rounded-full hover:bg-red-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setTitle("");
                setContent("");
                setCategory("");
                setImages([]);
                setTags([]);
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-maroon-700 hover:bg-maroon-800"
            >
              {isLoading ? "Publishing..." : "Publish Blog Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogPostEditor;
