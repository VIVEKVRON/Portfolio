"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "./LanguageProvider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import dbData from "../data/db.json";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { cycleLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Close menu on route change
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  }, [pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? "hidden" : "auto";
  };

  const navLinks = [
    { href: "/#home", label: "HOME" },
    { href: "/#projects", label: "PROJECTS" },
    { href: "/#about", label: "ABOUT" },
    { href: "/#skills", label: "SKILLS & ARSENAL" },
    { href: "/#education", label: "ACADEMIC TIMELINE" },
    { href: "/#achievements", label: "CERTIFICATIONS" },
    { href: "/#game", label: "SYSTEM BREAK" },
    { href: "/#contact", label: "CONTACT" },
    { href: "/admin", label: "SYS ADMIN" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[80px] border-b border-border z-[100] flex items-center justify-between px-[5vw] bg-background/80 backdrop-blur-md font-mono text-xs uppercase text-muted-foreground">
        <div className="flex h-full">
          <div 
            onClick={toggleMenu}
            className="w-[100px] h-full border-x border-border flex items-center justify-center cursor-pointer hover:bg-foreground hover:text-background transition-colors"
          >
            {menuOpen ? t.close : "M"}
          </div>
        </div>

        <div className="font-sans text-xl tracking-widest text-foreground absolute left-1/2 -translate-x-1/2">
          <Link href="/">VIVEK <span className="text-muted-foreground">V RON</span></Link>
        </div>

        <div className="flex h-full">
          <div 
            onClick={cycleLanguage}
            className="w-[60px] h-full border-x border-border flex items-center justify-center cursor-pointer hover:text-foreground transition-colors select-none"
          >
            {t.langLabel}
          </div>
          <div 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-[60px] h-full border-r border-border flex items-center justify-center cursor-pointer hover:text-foreground transition-colors select-none"
          >
            {!mounted ? '...' : theme === 'dark' ? 'PM' : 'AM'}
          </div>
        </div>
      </header>

      {/* FULL SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-[110] bg-background overflow-y-auto overflow-x-hidden"
          >
            <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none fixed"></div>
            
            <div className="relative z-10 flex flex-col items-center w-full min-h-screen py-16 px-4">
              
              <div className="flex flex-col items-center my-auto w-full max-w-4xl pt-8 pb-12">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-12 flex items-center gap-4 text-xl md:text-3xl font-sans tracking-widest text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  onClick={toggleMenu}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  {t.close}
                </motion.div>

                <div className="flex flex-col items-center gap-6 w-full">
                  {navLinks.map((link, i) => (
                    <div key={link.href} className="overflow-hidden py-1">
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                      >
                        <Link 
                          href={link.href}
                          onClick={() => {
                             setMenuOpen(false);
                             document.body.style.overflow = "auto";
                          }}
                          className="text-xl md:text-3xl lg:text-4xl leading-none font-sans tracking-[0.15em] text-foreground hover:text-muted-foreground transition-colors inline-block text-center uppercase"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </div>

                <motion.div 
                  className="mt-20 flex flex-col items-center gap-2 font-sans text-sm md:text-lg text-muted-foreground tracking-[0.2em] uppercase text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div>{dbData.profile.phone}</div>
                  <div>{dbData.profile.email}</div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
