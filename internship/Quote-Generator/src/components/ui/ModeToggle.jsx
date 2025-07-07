import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode)
     {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } 
    
    else 
    {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  let iconToShow;
  if (darkMode) 
  {
    iconToShow = <Sun className="h-5 w-5" />;
  } 
  
  else
  {
    iconToShow = <Moon className="h-5 w-5" />;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setDarkMode(!darkMode)}
    >
      {iconToShow}
    </Button>
  );
}
