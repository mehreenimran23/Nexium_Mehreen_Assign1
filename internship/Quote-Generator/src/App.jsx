import { useEffect, useState } from "react";
import quotesData from "@/data/quotes.json";
import SearchBar from "@/components/searchbar";
import QuoteCard from "@/components/quoteCard";

const QuoteGenerator = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    setQuotes(quotesData);
    setFilteredQuotes([]);
  }, []);

  const getTopicMatches = () => {
    if (topic.trim() === "") return quotes;
    return quotes.filter((q) =>
      q.topic?.toLowerCase().includes(topic.toLowerCase())
    );
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTopic(value);

    if (value.trim() === "") {
      setFilteredQuotes([]);
    } else {
      const matches = getTopicMatches();
      if (matches.length > 0 && value.length >= 3) {
        setFilteredQuotes(matches.slice(0, 3));
      } else {
        setFilteredQuotes([]);
      }
    }
  };

  const handleReload = () => {
    const matches = getTopicMatches();
    const random3 = [...matches].sort(() => 0.5 - Math.random()).slice(0, 3);
    setFilteredQuotes(random3);
  };

  const reloadSingleQuote = (index) => {
    const matches = getTopicMatches();
    let newQuote;
    do {
      newQuote = matches[Math.floor(Math.random() * matches.length)];
    } while (
      filteredQuotes.some((q) => q.text === newQuote.text)
    );

    const updated = [...filteredQuotes];
    updated[index] = newQuote;
    setFilteredQuotes(updated);
  };

  const handleTweet = (quote) => {
    const authorName = quote.author ? quote.author.split(",")[0] : "Unknown";
    const text = encodeURIComponent(`"${quote.text}" - ${authorName}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Optional soft noise background for texture */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.08] z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center mt-14 mb-10 px-4 drop-shadow-sm">
          🌸 Inspirational Quote Generator
        </h1>

        {/* Search bar */}
        <div className="w-[90%] max-w-lg mb-12">
          <SearchBar
            topic={topic}
            onChange={handleChange}
            onReload={handleReload}
          />
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6 pb-20">
          {topic.trim() === "" ? (
            <p className="col-span-full text-center text-gray-600 italic text-lg mt-10">
              Start by entering a topic or selecting one from suggestions ✨
            </p>
          ) : filteredQuotes.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 italic text-lg mt-10">
              No quotes found for "<span className="font-semibold">{topic}</span>" 😕
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
