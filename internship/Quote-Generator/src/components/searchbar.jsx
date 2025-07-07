import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ReloadIcon,
  MagnifyingGlassIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import quotesData from "@/data/quotes.json";

const allTopics = [
  ...new Set(quotesData.map((q) => q.topic?.toLowerCase())),
].filter(Boolean);

const SearchBar = ({ topic, onChange, onReload }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredTopics = allTopics
    .filter(
      (t) =>
        t.includes(topic.toLowerCase()) && topic.trim() !== ""
    )
    .slice(0, 5);

  const handleSelect = (suggestion) => {
    onChange({ target: { value: suggestion } });
    setShowSuggestions(false);
  };

  const handleClear = () => {
    onChange({ target: { value: "" } });
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center border border-gray-300 rounded-xl shadow-sm bg-white overflow-hidden">
        {/* Search Icon */}
        <span className="pl-3 pr-1 text-gray-500">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </span>

        <Input
          value={topic}
          onChange={(e) => {
            onChange(e);
            setShowSuggestions(true);
          }}
          placeholder="Search topic (e.g., success, happiness, failure...)"
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 bg-white text-base"
        />

        {topic && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600"
            title="Clear"
          >
            <Cross2Icon className="w-4 h-4" />
          </Button>
        )}

       
        <Button
          onClick={onReload}
          variant="ghost"
          size="icon"
          title="Reload"
          className="text-gray-500 hover:text-gray-700"
        >
          <ReloadIcon className="w-4 h-4" />
        </Button>
      </div>

    
      {showSuggestions && filteredTopics.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-48 overflow-auto">
          {filteredTopics.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 cursor-pointer transition-colors"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
