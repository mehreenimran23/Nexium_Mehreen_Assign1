import { useEffect, useState } from "react";
import quotesData from "@/data/quotes.json";
import SearchBar from "@/components/SearchBar";
import QuoteCard from "@/components/QuoteCard";

const QuoteGenerator = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [topic, setTopic] = useState("");
  const [allTopics, setAllTopics] = useState([]);

  useEffect(() => {
    setQuotes(quotesData);
    const topics = [];
    for (let i = 0; i < quotesData.length; i++) {
      const q = quotesData[i];
      if (q && typeof q.topic === "string") {
        topics.push(q.topic.toLowerCase().trim());
      }
    }
    const uniqueTopics = [...new Set(topics)];
    setAllTopics(uniqueTopics);
  }, []);

  const getTopicMatches = (input) => {
    const target = input.toLowerCase().trim();
    const result = [];
    for (let i = 0; i < quotes.length; i++) {
      const q = quotes[i];
      if (q && q.topic && q.topic.toLowerCase().trim() === target) 
      {
        result.push(q);
      }
    }
    return result;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTopic(value);
    setFilteredQuotes([]);
  };

  const handleSelectTopic = (selected) => {
    const matches = getTopicMatches(selected);
    const random = matches.sort(() => 0.5 - Math.random()).slice(0, 3);
    setFilteredQuotes(random);
    setTopic(selected);
  };

  const handleReload = () => {
    const matches = getTopicMatches(topic);
    const random = matches.sort(() => 0.5 - Math.random()).slice(0, 3);
    setFilteredQuotes(random);
  };

  const reloadSingleQuote = (index) => {
    const matches = getTopicMatches(topic);
    if (matches.length === 0) return;

    let newQuote = null;
    let attempts = 0;

    while (attempts < 10) {
      const candidate = matches[Math.floor(Math.random() * matches.length)];
      let isDuplicate = false;

      for (let i = 0; i < filteredQuotes.length; i++) 
        {
        if (filteredQuotes[i].text === candidate.text) 
        {
          isDuplicate = true;
          break;
        }
      }

      if (!isDuplicate) 
    {
        newQuote = candidate;
        break;
      }

      attempts++;
    }

    if (newQuote !== null) 
    {
      const updated = [...filteredQuotes];
      updated[index] = newQuote;
      setFilteredQuotes(updated);
    }
  };

  const handleTweet = (quote) => {
    let author = "Unknown";
    if (quote.author && typeof quote.author === "string")
     {
      author = quote.author.split(",")[0];
    }
    const text = encodeURIComponent(`"${quote.text}" - ${author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-zinc-900 dark:to-zinc-950">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mt-14 mb-10 px-4 text-zinc-800 dark:text-zinc-100">
          🌸The Quote Vault
        </h1>

        <div className="w-[90%] max-w-lg mb-12">
          <SearchBar
            topic={topic}
            onChange={handleChange}
            onReload={handleReload}
            allTopics={allTopics}
            onSelectTopic={handleSelectTopic}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6 pb-20">
          {(() => {
            if (topic.trim() === "")
             {
              return (
                <p className="col-span-full text-center text-zinc-500 dark:text-zinc-400 italic text-lg mt-10">
                  Start by entering a topic or selecting one from suggestions ✨
                </p>
              );
            } 
            else
             {
              if (filteredQuotes.length === 0) 
                {
                return (
                  <p className="col-span-full text-center text-zinc-500 italic text-lg mt-10">
                    No quotes found for <span className="font-semibold">{topic}</span> 😕
                  </p>
                );
              } 
              else
               {
                const cards = [];
                for (let i = 0; i < filteredQuotes.length; i++) 
                {
                  const quote = filteredQuotes[i];
                  cards.push(

                    <QuoteCard
                      key={i}
                      quote={quote}
                      onTweet={() => handleTweet(quote)}
                      onReload={() => reloadSingleQuote(i)}
                    />
                  );
                }
                return cards;
              }
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
