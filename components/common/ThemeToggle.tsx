"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Defer rendering icons until client-side hydration completes
  useEffect(() => {
    setMounted(true);
  }, []);

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <Button variant="ghost" size="icon" onClick={cycle}>
      {mounted && theme === "light" && <Sun size={16} />}
      {mounted && theme === "dark" && <Moon size={16} />}
      {mounted && (theme === "system" || !theme) && <Monitor size={16} />}
    </Button>
  );
}