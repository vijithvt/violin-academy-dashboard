
import React from "react";
import NavigationBar from "@/components/home/NavigationBar";
import FooterSection from "@/components/home/FooterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, Tag } from "lucide-react";

const Blogs = () => {
  const blogCategories = [
    { id: "all", name: "All Posts" },
    { id: "techniques", name: "Techniques" },
    { id: "practice-tips", name: "Practice Tips" },
    { id: "theory", name: "Music Theory" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Perfecting Your Bow Grip",
      excerpt: "Learn the proper techniques for holding the violin bow to produce the best sound quality.",
      category: "techniques",
      date: "April 28, 2025",
      readTime: "5 min read",
      tags: ["Beginners", "Technique", "Bow Control"]
    },
    {
      id: 2,
      title: "Understanding Carnatic Ragas",
      excerpt: "A comprehensive guide to understanding the fundamental concepts of Carnatic ragas.",
      category: "theory",
      date: "April 21, 2025",
      readTime: "8 min read",
      tags: ["Intermediate", "Theory", "Ragas"]
    },
    {
      id: 3,
      title: "Daily Practice Routine for Beginners",
      excerpt: "Establish an effective practice routine to build a strong foundation in violin playing.",
      category: "practice-tips",
      date: "April 15, 2025",
      readTime: "6 min read",
      tags: ["Beginners", "Practice", "Routine"]
    },
    {
      id: 4,
      title: "Fingering Techniques for Fast Passages",
      excerpt: "Master advanced fingering techniques to play fast-paced musical passages with ease.",
      category: "techniques",
      date: "April 7, 2025",
      readTime: "10 min read",
      tags: ["Advanced", "Fingering", "Speed"]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <NavigationBar />
      
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-maroon-900 mb-6 text-center">
            Learning Resources & Blogs
          </h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Explore our collection of articles, tips, and techniques to enhance your violin learning experience. These resources are designed for students at all levels.
          </p>

          <Tabs defaultValue="all" className="max-w-4xl mx-auto">
            <TabsList className="mb-8 grid grid-cols-2 md:grid-cols-4">
              {blogCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-sm">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {blogCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid gap-6 md:grid-cols-2">
                  {blogPosts
                    .filter(post => category.id === "all" || post.category === category.id)
                    .map((post) => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl text-maroon-800 hover:text-maroon-600 transition-colors">
                            <a href={`#blog/${post.id}`}>{post.title}</a>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <CardDescription className="text-gray-600">
                            {post.excerpt}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className="pt-2 border-t border-gray-100 flex flex-wrap items-center text-xs text-gray-500 gap-3">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {post.date}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1 w-full">
                            {post.tags.map((tag, i) => (
                              <span key={i} className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
};

export default Blogs;
