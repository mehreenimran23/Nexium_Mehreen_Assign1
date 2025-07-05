import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const QuoteInput = ({ topic, onChange, onReload }) => {
  return (
    <div className="flex items-center gap-3 w-full max-w-xl mx-auto">
      <Input
        type="text"
        value={topic}
        onChange={onChange}
        placeholder="Enter a topic (e.g. success, love, life)"
        className="h-10 text-base bg-white"
      />
      <Button
        onClick={onReload}
        size="icon"
        className="rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow hover:scale-105 transition-transform"
        title="Reload Quotes"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuoteInput;
