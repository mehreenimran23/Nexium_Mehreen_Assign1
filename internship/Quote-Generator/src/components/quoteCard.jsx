import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import twitterIcon from "@/assets/twitter.png";

const QuoteCard = ({ quote, onTweet }) => (
  <Card className="bg-white text-black rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
    <CardContent className="space-y-3">
      <p className="text-lg font-semibold">"{quote.text}"</p>
      <p className="text-sm text-muted-foreground">— {quote.author || "Unknown"}</p>
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
