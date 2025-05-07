
import { useEffect, useState } from "react";
import { MessageSquareQuote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Demo quotes - in a real implementation, these could come from a database
const quotes = [
  { text: "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.", author: "Plato" },
  { text: "Music expresses that which cannot be put into words and that which cannot remain silent.", author: "Victor Hugo" },
  { text: "Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife.", author: "Kahlil Gibran" },
  { text: "After silence, that which comes nearest to expressing the inexpressible is music.", author: "Aldous Huxley" }
];

const QuoteCard = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Rotate quotes every 10 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 10000);
    
    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <Card className="bg-gradient-to-r from-maroon-800 to-amber-800 text-white mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <MessageSquareQuote className="h-6 w-6 mr-2" />
          Music Quote of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="italic text-lg">"{quotes[currentQuote].text}"</blockquote>
        <p className="text-right text-amber-100 mt-2">— {quotes[currentQuote].author}</p>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
