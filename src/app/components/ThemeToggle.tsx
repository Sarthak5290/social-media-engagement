"use client";
import { useState, useEffect } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="px-4 py-2 rounded-md text-foreground bg-secondary hover:bg-secondary-foreground"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
};
