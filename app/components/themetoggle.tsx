'use client';

import * as motion from "motion/react-client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark";

  return (
    <button
      className={`
      flex border-0 h-6 w-12 md:w-14 md:h-7 rounded-3xl cursor-pointer items-center p-1
      ${isDark ? "justify-end bg-zinc-500" : "justify-start bg-zinc-400/70"}`
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <motion.div
        className={`w-4 h-4 md:w-5.5 md:h-5.5 rounded-full ${isDark ? "bg-zinc-100" : "bg-zinc-900"} `}
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  )
}