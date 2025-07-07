import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import twitterIcon from "@/assets/twitter.png";

const QuoteCard = ({ quote, onTweet }) => {
  const quoteText = quote?.text || "";
  const quoteAuthor = quote?.author || "Unknown";

  return (
    <Card
      className="
        rounded-3xl 
        border border-gray-300 
        bg-white 
        shadow-md 
        hover:shadow-xl 
        transition duration-300

        dark:bg-zinc-100 
        dark:border-zinc-400 
        dark:shadow-[0_4px_30px_rgba(200,200,200,0.08)]
      "
    >
      <CardContent className="space-y-4 px-6 py-5">
        <p className="text-lg leading-relaxed font-medium text-gray-800 italic">
          “{quoteText}”
        </p>

        <p className="text-sm text-right text-gray-500 font-semibold">
          — {quoteAuthor}
        </p>

        <div className="flex justify-end">
          <Button
            onClick={onTweet}
            variant="outline"
            className="gap-2 text-gray-700 hover:text-black"
          >
            <img src={twitterIcon} alt="Twitter" className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
