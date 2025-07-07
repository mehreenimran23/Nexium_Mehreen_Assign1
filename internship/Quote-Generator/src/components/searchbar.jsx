import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ReloadIcon,
  MagnifyingGlassIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import quotesData from "@/data/quotes.json";

const rawTopics = quotesData
  .filter((q) => q && q.topic && typeof q.topic === "string")
  .map((q) => q.topic.toLowerCase());

const allTopics = [...new Set(rawTopics)];

const SearchBar = ({ topic, onChange, onReload, onSearch }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredTopics = allTopics
    .filter(
      (t) => t.includes(topic.toLowerCase()) && topic.trim() !== ""
    )
    .slice(0, 5);

  const handleSelect = (suggestion) => {
    onChange({ target: { value: suggestion } });
    setShowSuggestions(false);
    
    if (typeof onSearch === "function")
     {
      onSearch();
    }
  };

  const handleClear = () => {
    onChange({ target: { value: "" } });
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        
        <div className="relative flex-grow w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </span>

          <Input
            value={topic}
            onChange={(e) => {
              onChange(e);
              setShowSuggestions(true);
            }}
            onKeyDown={(e) => {

              if (e.key === "Enter")
               {
                e.preventDefault();
                if (typeof onSearch === "function")
                {
                  onSearch();
                }
              }
            }}

            placeholder="Search topic (e.g., success, happiness, failure...)"
            className="w-full pl-10 pr-3 bg-white text-black placeholder-gray-500 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

       
        <div className="flex gap-1 shrink-0">
          {topic !== "" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="text-gray-500 hover:text-black"
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
            className="text-gray-500 hover:text-black"
          >
            <ReloadIcon className="w-4 h-4" />
          </Button>
        </div>
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
