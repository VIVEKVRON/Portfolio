"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only show once per session ideally, but for demo we show on mount
    setIsMounted(true);
    // document.body.style.overflow = "hidden"; // Prevent scrolling while splash is active
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    // document.body.style.overflow = "auto";
  };

  if (!isMounted) return null;

  const text = "VIVEK V RON".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          className={`fixed inset-0 z-[200] bg-background flex justify-center items-center cursor-pointer overflow-hidden ${!isVisible ? 'pointer-events-none' : ''}`}
          onClick={handleEnter}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        >
          {/* Blueprint Grid */}
          <motion.div 
            className="absolute inset-0 bg-blueprint opacity-50"
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          ></motion.div>

          {/* Top/Bottom Curtains for exit effect */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-background border-b border-border/30"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1/2 bg-background border-t border-border/30"
            exit={{ y: "100%" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          ></motion.div>

          {/* Center Framing Corners */}
          <motion.div 
            className="absolute w-[600px] h-[200px]"
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-muted-foreground/30"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-muted-foreground/30"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-muted-foreground/30"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-muted-foreground/30"></div>
          </motion.div>

          {/* Typography */}
          <div className="relative z-10 flex gap-8 md:gap-16 items-center">
            {text.map((char, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-6xl font-sans tracking-widest text-foreground font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  y: -50,
                  x: (i - text.length / 2) * 20 // Spread out horizontally
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: isVisible ? i * 0.1 : i * 0.05,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Instruction */}
          <motion.div 
            className="absolute bottom-[20%] text-muted-foreground font-mono text-xs uppercase tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Click anywhere to enter
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
