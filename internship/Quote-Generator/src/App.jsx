import { useEffect, useState } from "react";
import quotesData from "@/data/quotes.json";
import SearchBar from "@/components/searchbar";
import QuoteCard from "@/components/quoteCard";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const QuoteGenerator = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [topic, setTopic] = useState("");
  const [finalTopic, setFinalTopic] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    setQuotes(quotesData);
  }, []);

  useEffect(() => {
    if (finalTopic.trim() === "") 
    {
      setFilteredQuotes([]);
    } 
    else 
    {
      const matches = [];
      for (let i = 0; i < quotes.length; i++) {
        const q = quotes[i];
        if (q) {
          if (q.topic)
           {
            if (typeof q.topic === "string") 
            {
              if (q.topic.toLowerCase().includes(finalTopic.toLowerCase())) 
              {
                matches.push(q);
              }
            }
          }
        }
      }
      setFilteredQuotes(matches.slice(0, 3));
    }
  }, [finalTopic, quotes]);

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSearch = () => {
    setFinalTopic(topic);
  };

  const handleReload = () => {
    const matches = [];
    for (let i = 0; i < quotes.length; i++) {
      const q = quotes[i];
      if (q) {
        if (q.topic) {
          if (typeof q.topic === "string") {
            if (q.topic.toLowerCase().includes(finalTopic.toLowerCase())) 
            {
              matches.push(q);
            }
          }
        }
      }
    }
    const shuffled = [...matches].sort(() => 0.5 - Math.random());
    const random3 = shuffled.slice(0, 3);
    setFilteredQuotes(random3);
  };

  const reloadSingleQuote = (index) => {
    const matches = [];
    for (let i = 0; i < quotes.length; i++) 
      {
      const q = quotes[i];
      if (q)
       {
        if (q.topic) 
          {
          if (typeof q.topic === "string") 
            {
            if (q.topic.toLowerCase().includes(finalTopic.toLowerCase())) {
              matches.push(q);
            }
          }
        }
      }
    }

    let newQuote = null;
    do {
      const randomIndex = Math.floor(Math.random() * matches.length);
      newQuote = matches[randomIndex];
    } 
    while (
      newQuote &&
      filteredQuotes.some((q) => q && q.text === newQuote.text)
    );

    const updated = [...filteredQuotes];
    updated[index] = newQuote;
    setFilteredQuotes(updated);
  };

  const handleTweet = (quote) => {
    let authorName = "Unknown";
    if (quote) {
      if (quote.author) 
      {
        if (typeof quote.author === "string") 
        {
          authorName = quote.author.split(",")[0];
        }
      }
    }
    const text = encodeURIComponent("\"" + quote.text + "\" - " + authorName);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDarkMode(html.classList.contains("dark"));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-zinc-900 dark:to-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="absolute top-4 right-4">
          <Button
            size="icon"
            onClick={toggleDarkMode}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md transition-transform hover:scale-105"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mt-14 mb-10 px-4 text-gray-800 dark:text-gray-100">
          🌸 The Quote Vault
        </h1>

        <div className="w-[90%] max-w-lg mb-12">
          <SearchBar
            topic={topic}
            onChange={handleChange}
            onReload={handleReload}
            onSearch={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6 pb-20">
          {finalTopic.trim() === "" ? (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-400 italic text-lg mt-10">
              Start by entering a topic or selecting one from suggestions ✨
            </p>
          ) : filteredQuotes.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 italic text-lg mt-10">
              No quotes found for <span className="font-semibold">{finalTopic}</span> 😕
            </p>
          ) : (
            filteredQuotes.map((quote, i) => (
              <QuoteCard
                key={i}
                quote={quote}
                onTweet={() => handleTweet(quote)}
                onReload={() => reloadSingleQuote(i)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
