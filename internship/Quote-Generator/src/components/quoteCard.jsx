import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import twitterIcon from "@/assets/twitter.png";

const QuoteCard = ({ quote, onTweet }) => {
  let quoteText = "";
  if (quote && quote.text)
  {
    quoteText = quote.text;
  }

  let quoteAuthor = "Unknown";
  if (quote && quote.author)
   {
    quoteAuthor = quote.author;
  }

  return (
    <Card className="rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white shadow-md hover:shadow-xl transition duration-300">
      <CardContent className="space-y-4 px-6 py-5">
        
        <p className="text-lg leading-relaxed font-medium text-gray-800 italic dark:text-zinc-900">
          “{quoteText}”
        </p>

        
        <p className="text-sm text-right text-gray-500 dark:text-zinc-600 font-semibold">
          — {quoteAuthor}
        </p>

      
        <div className="flex justify-end">
          <Button
            onClick={onTweet}
            variant="outline"
            className="gap-2 text-gray-700 hover:text-black dark:text-gray-600 dark:hover:text-black"
          >
            <img src={twitterIcon} alt="Twitter" className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
