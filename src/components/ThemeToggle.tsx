import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isDarkMode ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDarkMode ? (
          <Moon className="w-2.5 h-2.5 text-gray-600" />
        ) : (
          <Sun className="w-2.5 h-2.5 text-yellow-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
