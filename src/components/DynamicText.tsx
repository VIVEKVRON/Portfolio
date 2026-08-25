"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

// Global cache to prevent duplicate API calls and speed up rendering
const translationCache: Record<string, string> = {};

interface DynamicTextProps {
  text: string;
  className?: string;
  truncateLength?: number;
  isExpanded?: boolean;
  onToggle?: () => void;
  toggleClassName?: string;
}

export default function DynamicText({ 
  text, 
  className = "", 
  truncateLength, 
  isExpanded, 
  onToggle, 
  toggleClassName 
}: DynamicTextProps) {
  const { lang } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    if (!text) {
      setTranslatedText("");
      return;
    }

    if (lang === "en") {
      setTranslatedText(text);
      return;
    }

    const cacheKey = `${lang}:${text}`;
    if (translationCache[cacheKey]) {
      setTranslatedText(translationCache[cacheKey]);
      return;
    }

    const fetchTranslation = async () => {
      try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await res.json();
        
        let fullTranslation = "";
        if (data && data[0]) {
          data[0].forEach((item: any) => {
            if (item[0]) fullTranslation += item[0];
          });
        }
        
        if (fullTranslation) {
          translationCache[cacheKey] = fullTranslation;
          setTranslatedText(fullTranslation);
        } else {
          setTranslatedText(text);
        }
      } catch (e) {
        console.error("Translation API error:", e);
        setTranslatedText(text);
      }
    };

    // Debounce slightly to prevent API spam on rapid language switching
    const timer = setTimeout(fetchTranslation, 100);
    return () => clearTimeout(timer);
  }, [lang, text]);

  // Handle truncation logic internally if requested
  if (truncateLength && translatedText.length > truncateLength) {
    const displayText = isExpanded ? translatedText : `${translatedText.substring(0, truncateLength)}...`;
    return (
      <span className={className}>
        {displayText}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggle?.(); }} 
          className={toggleClassName || "ml-2 font-bold cursor-pointer"}
        >
          {isExpanded ? (lang === "kn" ? "ಕಡಿಮೆ" : lang === "hi" ? "कम" : "less") : (lang === "kn" ? "ಹೆಚ್ಚು" : lang === "hi" ? "अधिक" : "more")}
        </button>
      </span>
    );
  }

  return <span className={className}>{translatedText}</span>;
}
