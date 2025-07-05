import * as React from "react";
import { cn } from '../../lib/utils';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full rounded-lg border bg-card text-card-foreground shadow-sm p-4",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 text-sm", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export { Card, CardContent };
