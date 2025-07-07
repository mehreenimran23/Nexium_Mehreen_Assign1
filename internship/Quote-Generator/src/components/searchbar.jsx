import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ReloadIcon,
  MagnifyingGlassIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import quotesData from "@/data/quotes.json";

let rawTopics = [];
for (let i = 0; i < quotesData.length; i++) 
  {
  const q = quotesData[i];
  if (q && q.topic && typeof q.topic === "string") 
  {
    rawTopics.push(q.topic.toLowerCase());
  }
}
const allTopics = [...new Set(rawTopics)];

const SearchBar = ({ topic, onChange, onReload, onSearch }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredTopics = [];
  for (let i = 0; i < allTopics.length; i++) 
    {
    const t = allTopics[i];
    if (t.includes(topic.toLowerCase()) && topic.trim() !== "")
     {
      filteredTopics.push(t);
    }
    if (filteredTopics.length === 5) break;
  }

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
    <div className="w-full max-w-xl mx-auto space-y-2">
      
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="flex flex-1 items-center border border-gray-300 rounded-xl shadow-sm bg-white overflow-hidden">
          <span className="pl-3 pr-1 text-gray-500">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </span>

          <Input
            value={topic}
            onChange={(e) => {
              onChange(e);
              setShowSuggestions(true);
            }}

            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (typeof onSearch === "function") 
                {
                  onSearch();
                }
              }
            }}
            placeholder="Search topic (e.g., success, happiness...)"
            className="border-0 bg-white text-black placeholder-gray-500 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex gap-2 justify-end">
          {topic !== "" && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClear}
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              title="Clear"
            >
              <Cross2Icon className="w-4 h-4" />
            </Button>
          )}

          <Button
            onClick={onReload}
            variant="outline"
            size="icon"
            title="Reload"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            <ReloadIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      
      {showSuggestions && filteredTopics.length > 0 && (
        <ul className="z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto text-sm">
          {filteredTopics.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-2 text-gray-700 hover:bg-pink-50 cursor-pointer transition-colors"
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
