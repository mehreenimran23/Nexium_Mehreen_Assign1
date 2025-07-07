import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import twitterIcon from "@/assets/twitter.png";

const QuoteCard = ({ quote, onTweet }) => (
  <Card className="rounded-3xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition duration-300">
    <CardContent className="space-y-4 px-6 py-5">
      {/* Quote Text */}
      <p className="text-lg leading-relaxed font-medium text-gray-800 italic">
        “{quote.text}”
      </p>

      {/* Author */}
      <p className="text-sm text-right text-muted-foreground font-semibold">
        — {quote.author || "Unknown"}
      </p>

      {/* Action */}
      <div className="flex justify-end">
        <Button onClick={onTweet} variant="outline" className="gap-2">
          <img src={twitterIcon} alt="Twitter" className="w-4 h-4" />
          Tweet
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default QuoteCard;
