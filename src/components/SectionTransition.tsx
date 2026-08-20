"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface SectionTransitionProps {
  from: string;
  to: string;
}

export default function SectionTransition({ from, to }: SectionTransitionProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, 100, {
        duration: 1.5,
        ease: "easeInOut",
        onUpdate: (value) => {
          setPercent(Math.round(value));
        }
      });
      return controls.stop;
    }
  }, [isInView]);

  return (
    <div 
      ref={containerRef}
      className="w-full flex justify-center py-12 relative z-0 pointer-events-none"
    >
      <div className="flex flex-col items-center h-[250px] w-[200px] relative">
        
        {/* Top Node */}
        <div className="w-3 h-3 border border-border bg-background flex justify-center items-center relative z-10">
           <div className={`w-1 h-1 transition-colors duration-500 ${isInView ? 'bg-foreground' : 'bg-muted-foreground/30'}`}></div>
           {/* Top Label */}
           <div className="absolute left-6 whitespace-nowrap text-[10px] text-muted-foreground tracking-widest uppercase">
              {from}
           </div>
        </div>
        
        {/* Line Container */}
        <div className="flex-1 w-[1px] relative flex justify-center py-2">
           {/* Background dashed line */}
           <div className="absolute inset-y-2 w-[1px] border-l border-dashed border-border/30"></div>
           
           {/* Animated solid line representing loading progress */}
           <motion.div 
              className="absolute top-2 w-[1px] bg-foreground flex justify-center"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "calc(100% - 16px)" } : { height: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
           >
               {/* Percentage Tracking Text (pinned to the bottom of the growing line) */}
               <div className={`absolute bottom-0 left-6 text-[10px] text-foreground font-mono whitespace-nowrap bg-background px-1 translate-y-1/2 transition-opacity duration-300 ${percent === 100 ? 'opacity-0' : 'opacity-100'}`}>
                   LOADING... {percent}%
               </div>
           </motion.div>
           
           {/* Technical Deco Text */}
           <div className="absolute top-1/2 right-6 text-[8px] text-muted-foreground/30 font-mono rotate-90 origin-right whitespace-nowrap -translate-y-1/2">
              clip-path: inset(0px 0px 12% 0px)
           </div>
        </div>

        {/* Bottom Node */}
        <div className="w-3 h-3 border border-border bg-background flex justify-center items-center relative z-10">
           <div className={`w-1 h-1 transition-colors duration-500 ${percent === 100 ? 'bg-foreground' : 'bg-muted-foreground/30'}`}></div>
           {/* Bottom Label */}
           <div className="absolute left-6 whitespace-nowrap text-[10px] text-muted-foreground tracking-widest uppercase">
              {to}
           </div>
        </div>

      </div>
    </div>
  );
}
