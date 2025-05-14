
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageProtection } from "@/components/ui/image-protection";
import { Share, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BrochureType = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  downloadUrl: string;
};

const brochures: BrochureType[] = [
  {
    id: "home-tuition",
    title: "Home Tuition Program",
    description: "One-on-one personalized violin lessons in the comfort of your home.",
    imageSrc: "/lovable-uploads/e58c9bd4-20fc-42cb-8eb5-40f1d3483f4b.png",
    downloadUrl: "/lovable-uploads/e58c9bd4-20fc-42cb-8eb5-40f1d3483f4b.png"
  },
  {
    id: "online-class",
    title: "Online Learning Program",
    description: "Learn violin from anywhere with our interactive online classes.",
    imageSrc: "/lovable-uploads/6b8c4f2e-e217-47eb-9d47-c1a8ed576634.png", 
    downloadUrl: "/lovable-uploads/6b8c4f2e-e217-47eb-9d47-c1a8ed576634.png"
  },
  {
    id: "batch-class",
    title: "Group Learning Program",
    description: "Join our group violin classes for collaborative learning.",
    imageSrc: "/lovable-uploads/f02d4c17-6866-41de-944a-9ff258463736.png",
    downloadUrl: "/lovable-uploads/f02d4c17-6866-41de-944a-9ff258463736.png"
  }
];

const BrochureDownloads: React.FC = () => {
  const { toast } = useToast();

  const handleDownload = (brochure: BrochureType) => {
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = brochure.downloadUrl;
    link.download = `${brochure.title.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: `${brochure.title} brochure is downloading.`,
    });
  };

  const handleShare = async (brochure: BrochureType) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: brochure.title,
          text: brochure.description,
          url: window.location.origin + brochure.downloadUrl,
        });
        
        toast({
          title: "Shared successfully",
          description: "The brochure link has been shared.",
        });
      } catch (error) {
        console.error("Error sharing:", error);
        
        // Fallback to copy to clipboard
        handleCopyLink(brochure);
      }
    } else {
      handleCopyLink(brochure);
    }
  };

  const handleCopyLink = (brochure: BrochureType) => {
    const url = window.location.origin + brochure.downloadUrl;
    navigator.clipboard.writeText(url);
    
    toast({
      title: "Link copied",
      description: "Brochure link copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Program Brochures</h2>
        <p className="text-muted-foreground">
          Download and share brochures for different violin learning programs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brochures.map((brochure) => (
          <Card key={brochure.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{brochure.title}</CardTitle>
              <CardDescription>{brochure.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <AspectRatio ratio={3/4} className="bg-muted">
                  <ImageProtection
                    src={brochure.imageSrc}
                    alt={`${brochure.title} Brochure`}
                    className="rounded-none object-cover h-full w-full"
                  />
                </AspectRatio>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => handleShare(brochure)}
              >
                <Share className="h-4 w-4" />
                Share
              </Button>
              <Button 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => handleDownload(brochure)}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrochureDownloads;
