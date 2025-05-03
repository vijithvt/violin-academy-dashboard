
import React from "react";
import NavigationBar from "@/components/home/NavigationBar";
import FooterSection from "@/components/home/FooterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, Tag, CheckCircle } from "lucide-react";

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
      title: "Beginner's Daily Practice Routine (30 Minutes)",
      excerpt: "Build strong foundations in Carnatic violin with this structured, easy-to-follow practice plan.",
      category: "practice-tips",
      date: "May 3, 2025",
      readTime: "5 min read",
      tags: ["Beginners", "Practice", "Routine"],
      content: `
        <div class="space-y-6">
          <div class="flex items-center space-x-3">
            <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">⏱️ Duration: 30 Minutes</span>
            <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">Level: Beginner</span>
          </div>
          <p>Includes: Bowing, Varisais, and Simple Songs</p>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
            <h3 class="text-xl font-medium text-maroon-800 mb-3">1. Warm-up: Bowing & Posture</h3>
            <p class="font-medium">Time: 5 Minutes</p>
            <p class="mb-3">Open string bowing (Sa–Pa–Sa)</p>
            <p class="font-medium mb-1">Focus on:</p>
            <ul class="list-none space-y-1">
              <li class="flex items-center"><span class="text-amber-600 mr-2">▸</span> Smooth, steady tone</li>
              <li class="flex items-center"><span class="text-amber-600 mr-2">▸</span> Proper bow hold</li>
              <li class="flex items-center"><span class="text-amber-600 mr-2">▸</span> Upright posture</li>
            </ul>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
            <h3 class="text-xl font-medium text-maroon-800 mb-3">2. Varisa Practice</h3>
            <p class="font-medium">Time: 15 Minutes</p>
            <p class="mb-3">Practice each varisai slowly with sruti alignment.</p>
            <p class="font-medium mb-1">Breakdown:</p>
            <ul class="list-none space-y-3">
              <li class="ml-4">Sarali Varisai – 5 min</li>
              <li class="ml-4">Janta Varisai – 5 min</li>
              <li class="ml-4">Madhyasthayi & Melstayi Varisai – 5 min</li>
            </ul>
            <p class="mt-3 flex items-center">
              <span class="text-amber-600 mr-2">🎧</span> Use a metronome or app for keeping perfect rhythm.
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
            <h3 class="text-xl font-medium text-maroon-800 mb-3">3. Simple Songs</h3>
            <p class="font-medium">Time: 10 Minutes</p>
            <p class="mb-3">Practice one or two from the list below daily:</p>
            <ul class="list-none space-y-1 mb-4">
              <li class="ml-4">Shyamale Meenakshi (Sriranjani)</li>
              <li class="ml-4">Shakti Sahitha Ganapathim (Naatai)</li>
              <li class="ml-4">National Anthem (Jana Gana Mana)</li>
            </ul>
            <p class="font-medium mb-1">Focus:</p>
            <ul class="list-none space-y-1">
              <li class="flex items-center"><span class="text-amber-600 mr-2">▸</span> Clear swaras</li>
              <li class="flex items-center"><span class="text-amber-600 mr-2">▸</span> Bow control</li>
              <li class="flex items-center"><span class="text-amber-600 mr-2">▸</span> Emotional expression</li>
            </ul>
          </div>
          
          <div class="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
            <h3 class="text-xl font-medium text-maroon-800 mb-3 flex items-center">
              <span class="mr-2">📝</span> Tips for Success
            </h3>
            <ul class="list-none space-y-3">
              <li class="flex items-start">
                <CheckCircle class="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Record your practice weekly and upload via the student dashboard</span>
              </li>
              <li class="flex items-start">
                <CheckCircle class="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Stay consistent – even short daily practice builds long-term skill</span>
              </li>
              <li class="flex items-start">
                <CheckCircle class="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Track your daily goals using your Practice Journal</span>
              </li>
            </ul>
          </div>
        </div>
      `
    }
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
                <div className="space-y-12">
                  {blogPosts
                    .filter(post => category.id === "all" || post.category === category.id)
                    .map((post) => (
                      <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                          <h2 className="text-2xl font-serif font-bold text-maroon-800 mb-3">
                            {post.title}
                          </h2>
                          <div className="flex flex-wrap items-center text-xs text-gray-500 gap-4 mb-4">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.readTime}
                            </div>
                            <div className="flex items-center">
                              <FileText className="h-3 w-3 mr-1" />
                              {post.date}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {post.tags.map((tag, i) => (
                                <span key={i} className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-6">
                            {post.excerpt}
                          </p>
                          <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>
                      </div>
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
