
import React from "react";
import NavigationBar from "@/components/home/NavigationBar";
import FooterSection from "@/components/home/FooterSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, Tag, CheckCircle } from "lucide-react";

const Blogs = () => {
  const blogCategories = [
    { id: "practice-tips", name: "Practice Tips" },
    { id: "techniques", name: "Techniques" },
    { id: "theory", name: "Music Theory" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Beginner's Daily Practice Routine (30 Minutes)",
      excerpt: "Build strong foundations in Carnatic violin with this structured, easy-to-follow practice plan.",
      category: "practice-tips",
      date: "May 14, 2025",
      readTime: "5 min read",
      tags: ["Beginners", "Practice", "Routine"],
      content: `
        <div class="space-y-6">
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">Duration: 30 Minutes</span>
            <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">Level: Beginner</span>
          </div>
          <p>Includes: Bowing, Varisais, and Simple Songs</p>
          
          <div class="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-amber-100">
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
          
          <div class="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-amber-100">
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
          
          <div class="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-amber-100">
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
          
          <div class="bg-amber-50 p-5 md:p-6 rounded-lg shadow-sm border border-amber-200">
            <h3 class="text-xl font-medium text-maroon-800 mb-3 flex items-center">
              <span class="mr-2">Tips for Success</span>
            </h3>
            <ul class="list-none space-y-4">
              <li class="flex items-start bg-white p-3 rounded-lg shadow-sm">
                <CheckCircle class="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-800">Record your practice weekly and upload via the student dashboard</span>
              </li>
              <li class="flex items-start bg-white p-3 rounded-lg shadow-sm">
                <CheckCircle class="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-800">Stay consistent – even short daily practice builds long-term skill</span>
              </li>
              <li class="flex items-start bg-white p-3 rounded-lg shadow-sm">
                <CheckCircle class="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-800">Track your daily goals using your Practice Journal</span>
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
      
      <section className="py-16 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 mb-6 text-center">
            Learning Resources & Blogs
          </h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Explore our collection of articles, tips, and techniques to enhance your violin learning experience.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex flex-wrap gap-2 justify-center">
              {blogCategories.map((category) => (
                <span key={category.id} className="bg-white text-maroon-800 px-4 py-2 rounded-full text-sm shadow-sm border border-amber-100">
                  {category.name}
                </span>
              ))}
            </div>
            
            <div className="space-y-12">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-md border-amber-100">
                  <CardHeader className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white">
                    <CardTitle className="text-xl md:text-2xl font-serif">
                      {post.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center text-xs gap-4 mt-2 text-amber-100">
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
                          <span key={i} className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <p className="text-gray-600 mb-6">
                      {post.excerpt}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
};

export default Blogs;
