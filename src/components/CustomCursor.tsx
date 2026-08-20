"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth out the position for a trailing effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add listener for all interactive elements to trigger hover state
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Attach hover listeners to specific tags
    const interactiveTags = document.querySelectorAll("a, button, input, textarea, select, [role='button'], [tabindex='0']");
    interactiveTags.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    // Observer to handle dynamically added elements (like links in projects carousel)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const newInteractives = document.querySelectorAll("a, button, input, textarea, select, [role='button'], [tabindex='0']");
          newInteractives.forEach((el) => {
            // Remove first to avoid duplicates
            el.removeEventListener("mouseenter", handleHoverStart);
            el.removeEventListener("mouseleave", handleHoverEnd);
            el.addEventListener("mouseenter", handleHoverStart);
            el.addEventListener("mouseleave", handleHoverEnd);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      interactiveTags.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  // If on mobile/touch, maybe we don't render it. (Optional: check matchMedia pointer: coarse)
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Exact position dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-foreground pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: 45 // Diamond shape
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Smooth trailing outer ring */}
      <motion.div
        className="fixed top-0 left-0 border pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--foreground)",
          backgroundColor: isHovering ? "var(--foreground)" : "transparent",
        }}
        animate={{
          width: isHovering ? 48 : isClicking ? 24 : 32,
          height: isHovering ? 48 : isClicking ? 24 : 32,
          borderRadius: isHovering ? "50%" : "0%", // Square normally, circle on hover
          rotate: isHovering ? 0 : 45, // Diamond normally
          opacity: isVisible ? (isHovering ? 0.2 : 0.5) : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Corner crosshairs on the outer ring (only visible when not hovering) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          opacity: (isVisible && !isHovering) ? 1 : 0
        }}
      >
        <div className="absolute top-1/2 left-0 w-1 h-px bg-foreground -translate-x-full -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-1 h-px bg-foreground translate-x-full -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-px h-1 bg-foreground -translate-x-1/2 -translate-y-full" />
        <div className="absolute bottom-0 left-1/2 w-px h-1 bg-foreground -translate-x-1/2 translate-y-full" />
      </motion.div>
    </>
  );
}
