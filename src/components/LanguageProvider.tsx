"use client";

import React, { createContext, useContext, useState } from "react";

export type LangType = "en" | "kn" | "hi";

interface LanguageContextType {
  lang: LangType;
  setLang: (lang: LangType) => void;
  cycleLanguage: () => void;
  t: any;
}

export const translations = {
  en: {
    langLabel: "EN",
    creativeDev: "SOFTWARE DEVELOPER",
    blrBased: "HUBLI BASED, BENGALURU LIVING",
    available: "AVAILABLE FOR WORK",
    projects: "PROJECTS",
    selectedWork: "SELECTED WORK",
    curated: "A curated collection of web development and ML projects",
    startProject: "Start a Project",
    desktop: "DESKTOP MOCKUP",
    mobile: "MOBILE",
    details: "details",
    about: "ABOUT",
    aboutSub: "Software developer building production-quality full-stack applications.",
    getInTouch: "Get in touch",
    aboutText: "Software developer with hands-on experience building production-quality full-stack applications using Java, Spring Boot, and React. Skilled in designing scalable backend systems, working with cloud platforms, and applying machine learning to solve real-world problems. Published researcher with two IEEE conference papers under review.",
    contact: "CONTACT",
    information: "INFORMATION",
    connect: "CONNECT",
    techHub: "I am Hubli Based,",
    bengaluru: "Currently studying and living in Bengaluru.",
    yourName: "Your name",
    tellMe: "Tell me about your project...",
    sendMessage: "Send Message",
    privacy: "Privacy policy",
    terms: "Terms of service",
    certifications: "CERTIFICATIONS",
    certificationsSub: "Technical validations and continuous learning",
    verifyCert: "Verify Certificate",
    adminPortal: "ADMIN PORTAL",
    unauthorized: "UNAUTHORIZED ACCESS",
    menu: "MENU",
    close: "CLOSE",
    research: "RESEARCH & HACKATHONS",
    researchSub: "IEEE Conference Papers and Tech Participations",
    home: "HOME",
  },
  kn: {
    langLabel: "KN",
    creativeDev: "ಸಾಫ್ಟ್‌ವೇರ್ ಡೆವಲಪರ್",
    blrBased: "ಬೆಂಗಳೂರು ಮೂಲದ",
    available: "ಕೆಲಸಕ್ಕೆ ಲಭ್ಯವಿದೆ",
    projects: "ಯೋಜನೆಗಳು",
    selectedWork: "ಆಯ್ದ ಕೆಲಸ",
    curated: "ವೆಬ್ ಮತ್ತು ಎಂಎಲ್ ಯೋಜನೆಗಳ ಸಂಗ್ರಹ",
    startProject: "ಯೋಜನೆ ಪ್ರಾರಂಭಿಸಿ",
    desktop: "ಡೆಸ್ಕ್ಟಾಪ್ ಅಣಕು",
    mobile: "ಮೊಬೈಲ್",
    details: "ವಿವರಗಳು",
    about: "ಬಗ್ಗೆ",
    aboutSub: "ಉತ್ಪಾದನಾ-ಗುಣಮಟ್ಟದ ಪೂರ್ಣ-ಸ್ಟಾಕ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವ ಡೆವಲಪರ್.",
    getInTouch: "ಸಂಪರ್ಕದಲ್ಲಿರಿ",
    aboutText: "ಜಾವಾ, ಸ್ಪ್ರಿಂಗ್ ಬೂಟ್ ಮತ್ತು ರಿಯಾಕ್ಟ್ ಬಳಸಿ ಪೂರ್ಣ-ಸ್ಟಾಕ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವ ಅನುಭವ ಹೊಂದಿರುವ ಸಾಫ್ಟ್‌ವೇರ್ ಡೆವಲಪರ್. ನೈಜ ಪ್ರಪಂಚದ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ಯಂತ್ರ ಕಲಿಕೆಯನ್ನು ಅನ್ವಯಿಸುವುದು. ಎರಡು IEEE ಸಮ್ಮೇಳನ ಪತ್ರಿಕೆಗಳೊಂದಿಗೆ ಪ್ರಕಟಿತ ಸಂಶೋಧಕ.",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    information: "ಮಾಹಿತಿ",
    connect: "ಸಂಪರ್ಕ ಸಾಧಿಸಿ",
    techHub: "ಬೆಂಗಳೂರು",
    bengaluru: "ಕರ್ನಾಟಕ, ಭಾರತ",
    yourName: "ನಿಮ್ಮ ಹೆಸರು",
    tellMe: "ನಿಮ್ಮ ಪ್ರಾಜೆಕ್ಟ್ ಬಗ್ಗೆ ನನಗೆ ತಿಳಿಸಿ...",
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    privacy: "ಗೌಪ್ಯತೆ ನೀತಿ",
    terms: "ಸೇವಾ ನಿಯಮಗಳು",
    certifications: "ಪ್ರಮಾಣಪತ್ರಗಳು",
    certificationsSub: "ತಾಂತ್ರಿಕ ಮೌಲ್ಯಮಾಪನಗಳು",
    verifyCert: "ಪರಿಶೀಲಿಸಿ",
    adminPortal: "ಆಡಳಿತ ಪೋರ್ಟಲ್",
    unauthorized: "ಅನಧಿಕೃತ ಪ್ರವೇಶ",
    menu: "ಮೆನು",
    close: "ಮುಚ್ಚಿ",
    research: "ಸಂಶೋಧನೆ ಮತ್ತು ಹ್ಯಾಕಥಾನ್‌ಗಳು",
    researchSub: "IEEE ಪೇಪರ್ಸ್",
    home: "ಮುಖಪುಟ",
  },
  hi: {
    langLabel: "HI",
    creativeDev: "सॉफ्टवेयर डेवलपर",
    blrBased: "बेंगलुरु आधारित",
    available: "काम के लिए उपलब्ध",
    projects: "परियोजनाएं",
    selectedWork: "चयनित कार्य",
    curated: "वेब विकास और एमएल परियोजनाओं का संग्रह",
    startProject: "प्रोजेक्ट शुरू करें",
    desktop: "डेस्कटॉप मॉकअप",
    mobile: "मोबाइल",
    details: "विवरण",
    about: "के बारे में",
    aboutSub: "उत्पादन-गुणवत्ता पूर्ण-स्टैक एप्लिकेशन बनाने वाले डेवलपर।",
    getInTouch: "संपर्क करें",
    aboutText: "जावा, स्प्रिंग बूट और रिएक्ट का उपयोग करके पूर्ण-स्टैक एप्लिकेशन बनाने के अनुभव के साथ सॉफ्टवेयर डेवलपर। मशीन लर्निंग और क्लाउड प्लेटफॉर्म में कुशल। दो आईईईई सम्मेलन पत्रों के साथ प्रकाशित शोधकर्ता।",
    contact: "संपर्क",
    information: "जानकारी",
    connect: "जुड़ें",
    techHub: "बेंगलुरु",
    bengaluru: "कर्नाटक, भारत",
    yourName: "आपका नाम",
    tellMe: "मुझे अपने प्रोजेक्ट के बारे में बताएं...",
    sendMessage: "संदेश भेजें",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें",
    certifications: "प्रमाणपत्र",
    certificationsSub: "तकनीकी सत्यापन",
    verifyCert: "सत्यापित करें",
    adminPortal: "व्यवस्थापक पोर्टल",
    unauthorized: "अनधिकृत पहुंच",
    menu: "मेनू",
    close: "बंद करें",
    research: "अनुसंधान और हैकाथॉन",
    researchSub: "आईईईई सम्मेलन पत्र",
    home: "होम",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LangType>("en");

  const cycleLanguage = () => {
    if (lang === "en") setLang("kn");
    else if (lang === "kn") setLang("hi");
    else setLang("en");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, cycleLanguage, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
