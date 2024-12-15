import { useEffect, useState } from "react";
import { Moon, Sun } from 'lucide-react';
export function ModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.body.classList.toggle("dark", isDarkMode);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode, mounted]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  if (!mounted) return null;

  return (
    <div
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <div className="flex items-center">
         <Sun className="mr-4 h-4 w-4" />
         <span>Switch to Light Mode</span>
        </div>
      ) : (
        <div className="flex items-center">
         <Moon className="mr-4 h-4 w-4" />
         <span>Switch to Dark Mode</span>
        </div>
      )}
    </div>
  );
}

