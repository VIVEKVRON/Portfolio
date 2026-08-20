"use client";

import { motion } from "framer-motion";

export default function MechanicalGears() {
  return (
    <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full max-w-[400px] max-h-[400px] stroke-muted-foreground/50 fill-none"
        strokeWidth="1"
      >
        {/* Global axes */}
        <line x1="200" y1="0" x2="200" y2="400" strokeDasharray="2 4" strokeOpacity="0.2" />
        <line x1="0" y1="200" x2="400" y2="200" strokeDasharray="2 4" strokeOpacity="0.2" />

        {/* Huge background orbit */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
           <circle cx="200" cy="200" r="180" strokeOpacity="0.15" strokeDasharray="10 15" />
           {/* Moving tracking dots */}
           <circle cx="200" cy="20" r="2.5" className="fill-cyan-500/70 stroke-none shadow-cyan-500" />
           <circle cx="20" cy="200" r="2.5" className="fill-cyan-500/70 stroke-none" />
        </motion.g>

        {/* Main Central Gear */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          {/* Main rings */}
          <circle cx="200" cy="200" r="120" strokeDasharray="4 4" strokeOpacity="0.6" />
          <circle cx="200" cy="200" r="110" strokeOpacity="0.2" />
          <circle cx="200" cy="200" r="50" strokeDasharray="2 4" strokeOpacity="0.4" />
          
          {/* Crosshairs inside main gear */}
          <line x1="200" y1="80" x2="200" y2="120" strokeOpacity="0.4" />
          <line x1="200" y1="280" x2="200" y2="320" strokeOpacity="0.4" />
          <line x1="80" y1="200" x2="120" y2="200" strokeOpacity="0.4" />
          <line x1="280" y1="200" x2="320" y2="200" strokeOpacity="0.4" />

          {/* Cyan dots on main gear */}
          <circle cx="200" cy="80" r="2.5" className="fill-cyan-400 stroke-none" />
          <circle cx="284.85" cy="284.85" r="2.5" className="fill-cyan-400 stroke-none" /> {/* 45 deg */}
        </motion.g>

        {/* Overlapping Planetary Gear 1 (Top Left) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "120px 140px" }}
        >
          <circle cx="120" cy="140" r="70" strokeDasharray="3 4" strokeOpacity="0.5" />
          <circle cx="120" cy="140" r="20" strokeOpacity="0.3" strokeDasharray="2 2" />
          {/* Spoke line */}
          <line x1="120" y1="70" x2="120" y2="210" strokeOpacity="0.2" />
          <circle cx="120" cy="70" r="2.5" className="fill-cyan-400 stroke-none" />
        </motion.g>

        {/* Overlapping Planetary Gear 2 (Bottom Right) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "270px 250px" }}
        >
          <circle cx="270" cy="250" r="85" strokeDasharray="4 5" strokeOpacity="0.4" />
          <circle cx="270" cy="250" r="30" strokeOpacity="0.2" />
          <line x1="185" y1="250" x2="355" y2="250" strokeOpacity="0.2" />
          <circle cx="355" cy="250" r="2.5" className="fill-cyan-400 stroke-none" />
        </motion.g>

        {/* Static connecting armature lines (makes it look like a rigid machine) */}
        <path d="M 200 200 L 120 140" strokeOpacity="0.4" strokeDasharray="2 3" />
        <path d="M 200 200 L 270 250" strokeOpacity="0.4" strokeDasharray="2 3" />
        
        {/* Tiny center hubs */}
        <circle cx="200" cy="200" r="4" className="fill-background stroke-muted-foreground" />
        <circle cx="120" cy="140" r="3" className="fill-background stroke-muted-foreground" />
        <circle cx="270" cy="250" r="3" className="fill-background stroke-muted-foreground" />

      </svg>
      
      {/* Decorative technical text overlay */}
      <div className="absolute top-6 left-6 text-[8px] text-muted-foreground/40 font-mono tracking-widest uppercase flex flex-col gap-1">
         <span>sys.gear.ratio(1:1.5:0.8)</span>
         <span>kinematics_v2.0</span>
      </div>
      <div className="absolute bottom-6 right-6 text-[8px] text-muted-foreground/40 font-mono tracking-widest uppercase flex flex-col items-end gap-1">
         <span>vector_sync: active</span>
         <span>[θ, φ, r] alignment</span>
      </div>
    </div>
  );
}