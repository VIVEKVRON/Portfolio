"use client";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import AdminLoginModal from "./AdminLoginModal";
import WireframeSphere from "./WireframeSphere";
import ComplexSphere from "./ComplexSphere";
import SineSphere from "./SineSphere";
import OrbitSphere from "./OrbitSphere";
import BrickBreakerGame from "./BrickBreakerGame";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionTransition from "./SectionTransition";
import MechanicalGears from "./MechanicalGears";
import TechIcon from "./TechIcon";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const initialProjects = [
  { id: 1, title: "AGRIBOT // MULTIMODAL RAG PLATFORM", description: "Multimodal AI decision-support system featuring vector search, contextual LLM inference, and low-latency API integration.", tags: ['Python', 'RAG Architecture', 'Vector DB', 'FastAPI', 'React'] },
  { id: 2, title: "ECOSORT // REAL-TIME VISION CLASSIFIER", description: "Edge-ready computer vision pipeline utilizing a custom YOLOv8 model for automated classification with web stream processing.", tags: ['YOLOv8', 'PyTorch', 'Flask', 'OpenCV', 'Docker'] },
  { id: 3, title: "ELITE TASK MANAGER // ENTERPRISE BACKEND", description: "Scalable enterprise task platform built with robust MVC patterns, Spring Security authentication, and optimized database transactions.", tags: ['Java', 'Spring Boot 3', 'Spring Security', 'PostgreSQL', 'React'] },
  { id: 4, title: "CARBONTRACK // ANALYTICS PLATFORM", description: "Gamified carbon accounting platform with predictive footprint analytics and real-time metrics tracking.", tags: ['React 19', 'Spring Boot', 'REST APIs', 'GCP'] }
];

const translations = {
  en: {
    langLabel: "EN",
    creativeDev: "ML & SYSTEMS ENGINEER",
    blrBased: "HUBLI BASED, BENGALURU LIVING",
    available: "AVAILABLE FOR WORK",
    projects: "PROJECTS",
    selectedWork: "SELECTED WORK",
    curated: "A curated collection of scalable backends and applied AI systems",
    startProject: "Start a Project",
    desktop: "DESKTOP MOCKUP",
    mobile: "MOBILE",
    details: "details",
    about: "ABOUT",
    aboutSub: "Architecting scalable backends and deploying production-grade AI/ML pipelines.",
    getInTouch: "Get in touch",
    aboutText: "I engineer production software systems with integrated machine learning capabilities. Operating at the intersection of robust backend architecture (Java/Spring, Python) and applied AI (Computer Vision, RAG architectures, LLM orchestration), I build systems that take machine learning models out of notebooks and into scalable, high-performance web applications.",
    contact: "CONTACT",
    information: "INFORMATION",
    connect: "CONNECT",
    techHub: "Tech Hub, 3rd Floor",
    bengaluru: "560001 Bengaluru, India",
    yourName: "Your name",
    tellMe: "Tell me about your project...",
    sendMessage: "Send Message",
    privacy: "Privacy policy",
    terms: "Terms of service"
  },
  kn: {
    langLabel: "KN",
    creativeDev: "ಸೃಜನಶೀಲ ಡೆವಲಪರ್",
    blrBased: "ಬೆಂಗಳೂರು ಮೂಲದ",
    available: "ಕೆಲಸಕ್ಕೆ ಲಭ್ಯವಿದೆ",
    projects: "ಯೋಜನೆಗಳು",
    selectedWork: "ಆಯ್ದ ಕೆಲಸ",
    curated: "ವೆಬ್ ಡೆವಲಪ್ಮೆಂಟ್ ಯೋಜನೆಗಳ ಸಂಗ್ರಹ",
    startProject: "ಯೋಜನೆ ಪ್ರಾರಂಭಿಸಿ",
    desktop: "ಡೆಸ್ಕ್ಟಾಪ್ ಅಣಕು",
    mobile: "ಮೊಬೈಲ್",
    details: "ವಿವರಗಳು",
    about: "ಬಗ್ಗೆ",
    aboutSub: "ಪರಿಕಲ್ಪನೆಯಿಂದ ಬಿಡುಗಡೆಯವರೆಗೆ, ನಿಮ್ಮ ಆಲೋಚನೆಗಳಿಗೆ ಜೀವ ತುಂಬಲು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
    getInTouch: "ಸಂಪರ್ಕದಲ್ಲಿರಿ",
    aboutText: "ನಾನು ಚಿಂತನಶೀಲ ವಿನ್ಯಾಸದೊಂದಿಗೆ ಕ್ಲೀನ್ ಕೋಡ್ ಅನ್ನು ಸಂಯೋಜಿಸುವ ವೆಬ್‌ಸೈಟ್‌ಗಳು ಮತ್ತು ಡಿಜಿಟಲ್ ಅನುಭವಗಳನ್ನು ರಚಿಸುತ್ತೇನೆ. ಪರಿಕಲ್ಪನೆಯಿಂದ ಬಿಡುಗಡೆಯವರೆಗೆ, ನಿಮ್ಮ ಆಲೋಚನೆಗಳಿಗೆ ಜೀವ ತುಂಬಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    information: "ಮಾಹಿತಿ",
    connect: "ಸಂಪರ್ಕ ಸಾಧಿಸಿ",
    techHub: "ಟೆಕ್ ಹಬ್, 3ನೇ ಮಹಡಿ",
    bengaluru: "560001 ಬೆಂಗಳೂರು, ಭಾರತ",
    yourName: "ನಿಮ್ಮ ಹೆಸರು",
    tellMe: "ನಿಮ್ಮ ಪ್ರಾಜೆಕ್ಟ್ ಬಗ್ಗೆ ನನಗೆ ತಿಳಿಸಿ...",
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    privacy: "ಗೌಪ್ಯತೆ ನೀತಿ",
    terms: "ಸೇವಾ ನಿಯಮಗಳು"
  },
  hi: {
    langLabel: "HI",
    creativeDev: "रचनात्मक डेवलपर",
    blrBased: "बेंगलुरु आधारित",
    available: "काम के लिए उपलब्ध",
    projects: "परियोजनाएं",
    selectedWork: "चयनित कार्य",
    curated: "वेब विकास परियोजनाओं का एक संग्रह",
    startProject: "प्रोजेक्ट शुरू करें",
    desktop: "डेस्कटॉप मॉकअप",
    mobile: "मोबाइल",
    details: "विवरण",
    about: "के बारे में",
    aboutSub: "अवधारणा से लॉन्च तक, मैं आपके विचारों को जीवन में लाने में मदद करता हूं।",
    getInTouch: "संपर्क करें",
    aboutText: "मैं ऐसी वेबसाइट और डिजिटल अनुभव बनाता हूँ जो विचारशील डिज़ाइन के साथ स्वच्छ कोड को जोड़ते हैं। अवधारणा से लॉन्च तक, मैं आपके विचारों को जीवन में लाने में मदद करता हूं।",
    contact: "संपर्क",
    information: "जानकारी",
    connect: "जुड़ें",
    techHub: "टेक हब, तीसरी मंजिल",
    bengaluru: "560001 बेंगलुरु, भारत",
    yourName: "आपका नाम",
    tellMe: "मुझे अपने प्रोजेक्ट के बारे में बताएं...",
    sendMessage: "संदेश भेजें",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें"
  }
};

type LangType = "en" | "kn" | "hi";

import { useLanguage } from "./LanguageProvider";
import { submitContactMessage } from "@/app/actions/contact";

export default function Portfolio({ dbData }: { dbData: any }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [showAllResearch, setShowAllResearch] = useState(false);
  const [showAllHackathons, setShowAllHackathons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereContainerRef = useRef<HTMLDivElement>(null);
  const projects = dbData.projects || initialProjects;
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Parallax Sphere
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(sphereContainerRef.current, {
        y: 400, 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-blueprint min-h-screen text-muted-foreground font-mono text-xs uppercase relative flex flex-col items-center overflow-x-hidden pt-[80px]">


      {/* GLOBAL VERTICAL GRID LINES */}
      <div className="fixed inset-0 pointer-events-none flex justify-center z-0">
        <div className="w-[300px] h-full border-x border-border/50"></div>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="relative w-full max-w-[1400px] mt-[100px] h-[80vh] flex justify-center items-center z-10 px-4">
        
        {/* Left Side Labels */}
        <div className="absolute left-[5vw] top-[20%] text-muted-foreground tracking-widest">
          01. {t.creativeDev}
        </div>
        <div className="absolute left-[5vw] bottom-[20%] text-muted-foreground tracking-widest leading-loose">
          T: <a href={"tel:" + dbData.profile.phone} className="hover:text-foreground transition-colors">{dbData.profile.phone}</a> <br/>
          03. M: <a href={"mailto:" + dbData.profile.email} className="hover:text-foreground transition-colors">{dbData.profile.email}</a>
        </div>

        {/* Right Side Labels */}
        <div className="absolute right-[5vw] top-[20%] text-muted-foreground tracking-widest text-right">
          02. {t.blrBased}
        </div>
        <div className="absolute right-[5vw] bottom-[20%] text-muted-foreground tracking-widest text-right">
          04. {t.available}
        </div>

        {/* Center 3D Sphere Box */}
        <div ref={sphereContainerRef} className="w-[400px] h-[400px] border border-border relative flex justify-center items-center bg-background/50 backdrop-blur-sm z-20">
          <div className="absolute top-2 left-2 text-[10px] text-muted-foreground/50">clip-path: inset(0px 0px 0px 0px)</div>
          <div className="absolute top-2 right-2 text-[10px] text-muted-foreground/50" style={{ writingMode: 'vertical-rl' }}>clip-path: inset(0px 0px 0px 0px)</div>
          <div className="absolute bottom-2 left-2 text-[10px] text-muted-foreground/50" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>clip-path: inset(0px 0px 0px 0px)</div>
          <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground/50">clip-path: inset(0px 0px 0px 0px)</div>
          
          <WireframeSphere color={theme === 'dark' ? "#ffffff" : "#000000"} cameraZ={7} />
        </div>
      </section>

      <SectionTransition from="HERO" to="PROJECTS" />

      {/* PROJECTS SECTION */}
      <motion.section 
        id="projects"
        className="relative w-full max-w-[1400px] mt-[50px] flex flex-col z-10 px-[5vw]"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
         <div className="w-full flex border-y border-border bg-background">
            <div className="flex-1 p-8 border-r border-border">
               <h2 className="text-4xl md:text-5xl font-sans tracking-widest text-foreground">{t.selectedWork}</h2>
               <p className="text-muted-foreground normal-case mt-2">{t.curated}</p>
            </div>
         </div>
         <div className="w-full flex flex-col bg-background border-b border-border">
            {projects.length > 0 && (
              <div className="flex flex-col md:flex-row w-full min-h-[500px]">
                {/* Left: Visual/Mockup */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-border p-8 flex justify-center items-center relative overflow-hidden bg-muted/5">
                   {projects[currentProjectIdx]?.image ? (
                     <Image src={projects[currentProjectIdx].image} alt={projects[currentProjectIdx].title} fill className="object-contain p-4" />
                   ) : (
                     <div className="text-muted-foreground/30 font-mono text-sm tracking-widest uppercase">
                       [ NO VISUAL ASSET ]
                     </div>
                   )}
                </div>
                
                {/* Middle: Tech Stack Icons */}
                <div className="w-full md:w-[80px] border-b md:border-b-0 md:border-r border-border flex flex-row md:flex-col overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto">
                  {projects[currentProjectIdx]?.tech?.split(',').map((tStr: string) => tStr.trim()).map((tech: string, i: number) => (
                    <TechIcon key={i} name={tech} className="min-w-[80px] md:min-w-0 md:w-full md:min-h-[100px] border-r md:border-r-0 md:border-b border-border" />
                  ))}
                </div>

                {/* Right: Description & Meta */}
                <div className="w-full md:w-[400px] p-8 flex flex-col justify-center">
                   <div className="flex justify-between items-center text-xs text-muted-foreground/50 font-mono mb-4">
                     <span>{String(currentProjectIdx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                     {projects[currentProjectIdx]?.year && <span className="tracking-widest">{projects[currentProjectIdx].year}</span>}
                   </div>
                   <h3 className="text-2xl font-sans text-foreground mb-4 leading-tight">
                     {projects[currentProjectIdx]?.title}
                   </h3>
                   <p className="text-muted-foreground normal-case leading-relaxed whitespace-pre-wrap">
                     {projects[currentProjectIdx]?.description}
                   </p>
                </div>
              </div>
            )}
            
            {/* Bottom Navigation Bar */}
            {projects.length > 0 && (
              <div className="w-full flex h-[60px]">
                <button 
                  onClick={() => setCurrentProjectIdx((prev) => (prev - 1 + projects.length) % projects.length)}
                  className="w-[60px] h-full flex justify-center items-center border-r border-border hover:bg-foreground hover:text-background transition-colors text-muted-foreground"
                >
                  &lt;
                </button>
                
                {projects[currentProjectIdx]?.link ? (
                  <a 
                    href={projects[currentProjectIdx].link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-[60px] h-full flex justify-center items-center border-r border-border hover:bg-foreground hover:text-background transition-colors text-muted-foreground"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                  </a>
                ) : (
                  <div className="w-[60px] h-full flex justify-center items-center border-r border-border text-muted-foreground/30">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                  </div>
                )}

                <div className="flex-1 flex justify-center items-center text-foreground font-sans text-sm tracking-widest lowercase">
                  {projects[currentProjectIdx]?.title.split('//')[0]?.trim() || projects[currentProjectIdx]?.title}
                </div>
                
                <button 
                  onClick={() => setCurrentProjectIdx((prev) => (prev + 1) % projects.length)}
                  className="w-[60px] h-full flex justify-center items-center border-l border-border hover:bg-foreground hover:text-background transition-colors text-muted-foreground"
                >
                  &gt;
                </button>
              </div>
            )}
         </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <SectionTransition from="PROJECTS" to="ABOUT" />
      <motion.section 
        id="about"
        className="relative w-full max-w-[1400px] mt-[150px] flex flex-col z-10 px-[5vw]"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
         {/* Top row */}
         <div className="w-full flex border-y border-border bg-background">
            <div className="flex-1 p-8 border-r border-border">
               <h2 className="text-4xl md:text-5xl font-sans tracking-widest text-foreground">{t.about}</h2>
               <p className="text-muted-foreground normal-case mt-2">{t.aboutSub}</p>
            </div>
            <a href="#contact" className="w-[200px] flex justify-center items-center cursor-pointer hover:bg-foreground hover:text-background transition-colors text-muted-foreground">
               {t.getInTouch}
            </a>
         </div>
         
         {/* Grid Body */}
         <div className="w-full flex bg-background border-b border-border">
            {/* Left Column */}
            <div className="flex-1 border-r border-border flex flex-col">
               {/* Sphere block */}
               <div className="h-[400px] flex justify-center items-center relative border-b border-border overflow-hidden">
                  <div className="w-[300px] h-[300px] mt-20">
                     <SineSphere color={theme === 'dark' ? "#ffffff" : "#000000"} cameraZ={5} />
                  </div>
               </div>
               {/* Bio block */}
               <div className="flex-1 p-8 text-xl leading-relaxed text-muted-foreground normal-case">
                  {t.aboutText}
               </div>
            </div>

            {/* Right Column (Image) */}
            <div className="w-[450px] p-8 relative min-h-[700px] flex flex-col">
               <div className="w-full flex-1 relative grayscale hover:grayscale-0 transition-all duration-700">
                  <Image src={dbData.profile.ppf || "/profile.jpg"} alt="Vivek V Ron" fill className="object-cover" />
               </div>
            </div>
         </div>
      </motion.section>




      {/* TECH STACK SECTION */}
      <SectionTransition from="ABOUT" to="SKILLS & ARSENAL" />
      <motion.section 
        id="skills"
        className="relative w-full max-w-[1400px] mt-[100px] mb-[200px] flex flex-col items-center z-10 px-[5vw]"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans tracking-widest text-foreground">SKILLS & ENGINEERING ARSENAL</h2>
        </div>
        <div className="w-full border-y border-border flex flex-col md:flex-row min-h-[600px] bg-background">
          
          {/* Gears Graphic Area */}
          <div className="w-full md:w-1/3 h-[400px] md:h-auto border-b md:border-b-0 md:border-r border-border relative flex justify-center items-center overflow-hidden">
             <MechanicalGears />
          </div>

          {/* Tech Stack Categories */}
          <div className="w-full md:w-1/3 h-auto border-b md:border-b-0 md:border-r border-border flex flex-col justify-center p-8 lg:p-12">
            {[
               { category: "Core Languages", tech: "Java, Python, C++, TypeScript, SQL" },
               { category: "AI & Deep Learning", tech: "PyTorch, YOLOv8, OpenCV, RAG, Vector Search, LLM Pipelines" },
               { category: "Backend & Cloud", tech: "Spring Boot 3, FastAPI, PostgreSQL, Google Cloud, Docker, Git" },
               { category: "Frontend & Motion", tech: "React 19, Next.js, Tailwind CSS, GSAP, Framer Motion" }
            ].map((item, idx) => (
              <div key={idx} className="mb-8 last:mb-0">
                <div className="text-xs text-muted-foreground/50 mb-1">0{idx + 1} //</div>
                <h3 className="text-foreground tracking-widest mb-4 font-bold">{item.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tech.split(',').map((tStr) => tStr.trim()).map((t, i) => (
                     <TechIcon key={i} name={t} className="w-[80px] h-[80px] border border-border/50 hover:border-foreground" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Purple Sphere Area */}
          <div className="w-full md:w-1/3 h-[400px] md:h-auto flex justify-center items-center relative">
             <div className="w-[300px] h-[300px]">
                <OrbitSphere color="#a855f7" /> 
             </div>
          </div>

        </div>
      </motion.section>

      {/* EDUCATION SECTION */}
      <SectionTransition from="SKILLS & ARSENAL" to="EDUCATION" />
      <motion.section 
        id="education"
        className="relative w-full max-w-[1400px] mt-[100px] mb-[200px] flex flex-col items-center z-10 px-[5vw]"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans tracking-widest text-foreground">ACADEMIC TIMELINE</h2>
        </div>
        
        <div className="w-full flex flex-col md:flex-row border-y border-border bg-background relative">
           
           {/* Connecting Line Desktop */}
           <div className="hidden md:block absolute top-[50%] left-0 w-full h-[1px] bg-border/50 z-0"></div>

           {dbData.education?.map((ed: any) => (
             <div key={ed.id} className="flex-1 p-12 border-b md:border-b-0 md:border-r border-border flex flex-col items-center text-center relative z-10 group hover:bg-muted/10 transition-colors">
                <div className="w-4 h-4 bg-background border-2 border-border rounded-full mb-8 group-hover:border-foreground transition-colors shadow-[0_0_15px_rgba(0,0,0,0)] group-hover:shadow-foreground/50"></div>
                <h3 className="text-xl font-sans text-foreground mb-4">{ed.level}</h3>
                <p className="text-muted-foreground mb-4 lowercase tracking-widest leading-relaxed">
                   {ed.institution.split(',').map((part: string, i: number) => (
                      <span key={i}>{part}<br/></span>
                   ))}
                </p>
                <div className="bg-muted/20 px-4 py-2 border border-border text-foreground font-mono text-sm">
                   {ed.score}
                </div>
             </div>
           ))}
           
        </div>
      </motion.section>

      {/* CERTIFICATIONS & ACHIEVEMENTS SECTION */}
      <SectionTransition from="EDUCATION" to="CERTIFICATIONS & ACHIEVEMENTS" />
      <motion.section 
        id="achievements"
        className="relative w-full max-w-[1400px] mt-[100px] mb-[200px] flex flex-col items-center z-10 px-[5vw]"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans tracking-widest text-foreground">CERTIFICATIONS & ACHIEVEMENTS</h2>
        </div>
        
        <div className="w-full flex flex-col lg:flex-row border-y border-border bg-background">
          
          {/* Certifications Half */}
          <div className="flex-1 lg:border-r border-border p-8 lg:p-12">
            <h3 className="text-xl font-sans tracking-widest text-foreground mb-8 pb-4 border-b border-border/50">CERTIFICATIONS</h3>
            <div className="flex flex-col gap-6">
              {(showAllCerts ? dbData.certifications : dbData.certifications?.slice(0, 4))?.map((cert: any, idx: number) => (
                <div key={idx} onClick={() => cert.image && setSelectedImage(cert.image)} className="flex flex-col gap-2 group cursor-pointer border border-border p-4 hover:border-foreground transition-colors">
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                     <h4 className="text-foreground text-lg group-hover:text-cyan-400 transition-colors">{cert.name}</h4>
                     <span className="text-xs font-mono text-muted-foreground/50 whitespace-nowrap sm:ml-4">{cert.date}</span>
                   </div>
                   <div className="flex justify-between items-end mt-2">
    <div className="text-muted-foreground text-sm uppercase tracking-widest">{cert.issuer}</div>
    {cert.image && (
         <button onClick={(e) => { e.stopPropagation(); setSelectedImage(cert.image); }} className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground hover:text-cyan-400 transition-colors uppercase tracking-widest border border-border px-3 py-1 hover:border-cyan-400">
           [ VIEW CERT ]
           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
         </button>
      )}
      {cert.link && (
         <a href={cert.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground hover:text-cyan-400 transition-colors uppercase tracking-widest border border-border px-3 py-1 hover:border-cyan-400">
           [ VERIFY ]
           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
         </a>
      )}
  </div>
                </div>
              ))}
            </div>
              {dbData.certifications?.length > 4 && (
                <button 
                  onClick={() => setShowAllCerts(!showAllCerts)}
                  className="w-full mt-4 py-3 border border-border text-[10px] font-mono tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground transition-all flex items-center justify-center gap-2"
                >
                  {showAllCerts ? "[ SHOW LESS ]" : `[ VIEW ALL ${dbData.certifications.length} CERTIFICATIONS ]`}
                </button>
              )}
            </div>

            {/* Achievements Half */}
          <div className="flex-1 p-8 lg:p-12 bg-muted/5">
            <h3 className="text-xl font-sans tracking-widest text-foreground mb-8 pb-4 border-b border-border/50">RESEARCH & HACKATHONS</h3>
            <div className="flex flex-col gap-8">
              
              {/* Research */}
              <div className="flex flex-col gap-6">
                {(showAllResearch ? dbData.research : dbData.research?.slice(0, 3))?.map((res: any, idx: number) => (
                  <div key={`res-${idx}`} className="flex flex-col gap-2 relative pl-6 border-l border-border hover:border-cyan-400 transition-colors">
                     <div className="absolute top-2 -left-[5px] w-2 h-2 rounded-full bg-background border border-cyan-400"></div>
                     <span className="text-[10px] uppercase tracking-widest text-cyan-400">{res.type}</span>
                     <h4 className="text-foreground text-lg leading-tight">{res.title}</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed normal-case mt-1 whitespace-pre-wrap">{res.description}</p>
                  </div>
                ))}
              </div>
                {dbData.research?.length > 3 && (
                  <button 
                    onClick={() => setShowAllResearch(!showAllResearch)}
                    className="w-full mt-2 py-3 border border-border text-[10px] font-mono tracking-widest text-muted-foreground hover:text-cyan-400 hover:border-cyan-400 transition-all flex items-center justify-center gap-2"
                  >
                    {showAllResearch ? "[ SHOW LESS ]" : `[ VIEW ALL ${dbData.research.length} PUBLICATIONS ]`}
                  </button>
                )}

                {/* Hackathons */}
              <div className="flex flex-col gap-6 mt-4">
                {(showAllHackathons ? dbData.hackathons : dbData.hackathons?.slice(0, 3))?.map((hack: any, idx: number) => (
                  <div key={`hack-${idx}`} className="flex flex-col gap-2 relative pl-6 border-l border-border hover:border-purple-400 transition-colors">
                     <div className="absolute top-2 -left-[5px] w-2 h-2 rounded-full bg-background border border-purple-400"></div>
                     <div className="flex justify-between items-center w-full">
    <span className="text-[10px] uppercase tracking-widest text-purple-400">{hack.status}</span>
    <div className="flex gap-4 items-center">
       {hack.image && (
          <button onClick={() => setSelectedImage(hack.image)} className="inline-flex items-center gap-2 text-[10px] font-mono text-muted-foreground hover:text-purple-400 transition-colors uppercase tracking-widest">
            [ CERTIFICATE ]
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
       )}
       {hack.link && (
          <a href={hack.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-mono text-muted-foreground hover:text-purple-400 transition-colors uppercase tracking-widest">
            [ LINK ]
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
          </a>
       )}
    </div>
  </div>
                     <h4 className="text-foreground text-lg leading-tight">{hack.title}</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed normal-case mt-1 whitespace-pre-wrap">{hack.description}</p>
                  </div>
                ))}
              </div>
                {dbData.hackathons?.length > 3 && (
                  <button 
                    onClick={() => setShowAllHackathons(!showAllHackathons)}
                    className="w-full mt-2 py-3 border border-border text-[10px] font-mono tracking-widest text-muted-foreground hover:text-purple-400 hover:border-purple-400 transition-all flex items-center justify-center gap-2"
                  >
                    {showAllHackathons ? "[ SHOW LESS ]" : `[ VIEW ALL ${dbData.hackathons.length} HACKATHONS ]`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.section>

      {/* SYSTEM BREAK (GAME) SECTION */}
      <SectionTransition from="CERTIFICATIONS & ACHIEVEMENTS" to="SYSTEM BREAK" />
      <motion.section 
        id="game"
        className="relative w-full max-w-[1400px] mt-[100px] mb-[200px] flex flex-col items-center z-10 px-[5vw]"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
         <div className="w-full relative z-10">
            <BrickBreakerGame />
         </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <SectionTransition from="SYSTEM BREAK" to="CONTACT" />
      <motion.section 
        id="contact" 
        className="relative w-full max-w-[1400px] mt-[150px] flex flex-col z-10 px-[5vw] mb-[100px]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
         {/* Top row */}
         <div className="w-full flex border-t border-border bg-background">
            {/* Contact Info */}
            <div className="w-1/2 p-12 border-r border-border flex flex-col">
               <h2 className="text-2xl font-sans tracking-widest text-foreground mb-12">{t.contact}</h2>
               <div className="flex flex-col gap-6 text-muted-foreground normal-case">
                  <a href={"mailto:" + dbData.profile.email} className="hover:text-foreground cursor-pointer transition-colors w-fit">{dbData.profile.email}</a>
                  <a href={"tel:" + dbData.profile.phone} className="hover:text-foreground cursor-pointer transition-colors w-fit">{dbData.profile.phone}</a>
                  <div className="flex gap-6 mt-4">
                     <a href={dbData.profile.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                     </a>
                     <a href={dbData.profile.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" aria-label="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                     </a>
                     <a href={dbData.profile.instagram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                     </a>
                  </div>
               </div>
            </div>
            {/* Address */}
            <div className="w-1/2 p-12 flex flex-col">
               <h2 className="text-2xl font-sans tracking-widest text-foreground mb-12">{t.information}</h2>
               <div className="flex flex-col gap-6 text-muted-foreground normal-case">
                  <div className="flex flex-col gap-1">
                     <span className="text-[10px] uppercase tracking-widest text-border">BASED</span>
                     <span className="text-foreground/80">Hubballi & Bengaluru, India</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[10px] uppercase tracking-widest text-border">FOCUS</span>
                     <span className="text-foreground/80">ML Systems & Full-Stack Backend Architecture</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[10px] uppercase tracking-widest text-border">AVAILABILITY</span>
                     <span className="text-foreground/80">Open for Full-Time Roles & High-Impact Contracts</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[10px] uppercase tracking-widest text-border">TIMEZONE</span>
                     <span className="text-foreground/80">IST (UTC+05:30) • Open to Global / Remote Collaboration</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom row */}
         <div className="w-full flex bg-background border-y border-border">
            {/* Left: Complex Sphere */}
            <div className="w-1/2 border-r border-border flex flex-col justify-between">
               <div className="flex-1 flex justify-center items-center border-b border-border p-8 min-h-[500px]">
                  <div className="w-[350px] h-[350px]">
                     <ComplexSphere color={theme === 'dark' ? "#ffffff" : "#000000"} />
                  </div>
               </div>
               <div className="h-[60px] flex text-muted-foreground text-xs">
                  <div className="flex-1 border-r border-border flex items-center justify-center">vivek v ron c 2026</div>
                  <Link href="/privacy" className="flex-1 border-r border-border flex items-center justify-center hover:text-foreground transition-colors">{t.privacy}</Link>
                  <Link href="/terms" className="flex-1 flex items-center justify-center hover:text-foreground transition-colors">{t.terms}</Link>
               </div>
            </div>

            {/* Right: Form */}
            <div className="w-1/2 flex flex-col">
               <div className="p-12 border-b border-border flex-1">
                  <h2 className="text-2xl font-sans tracking-widest text-foreground mb-12">{t.connect}</h2>
                  <form 
                     className="flex flex-col w-full text-muted-foreground normal-case h-full gap-8"
                     onSubmit={async (e) => {
                       e.preventDefault();
                       const formData = new FormData(e.currentTarget);
                       try {
                         const res = await submitContactMessage(formData);
                         if (res.success) {
                           alert("Message sent securely to the database!");
                           (document.getElementById("contactForm") as HTMLFormElement).reset();
                         } else {
                           alert("Error sending message: " + res.error);
                         }
                       } catch (err) {
                         alert("Network Error. Please try again.");
                       }
                     }}
                     id="contactForm"
                  >
                     <input type="text" name="name" placeholder={t.yourName} required className="w-full bg-transparent border-b border-border pb-4 outline-none focus:border-foreground transition-colors" />
                     <input type="email" name="email" placeholder="your.email@example.com" required className="w-full bg-transparent border-b border-border pb-4 outline-none focus:border-foreground transition-colors" />
                     <input type="tel" name="phone" placeholder="+91 90000 00000" className="w-full bg-transparent border-b border-border pb-4 outline-none focus:border-foreground transition-colors" />
                     <textarea name="message" placeholder={t.tellMe} required className="w-full bg-transparent pb-4 flex-1 outline-none focus:border-foreground transition-colors resize-none"></textarea>
                     <button type="submit" className="h-[60px] w-full flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors text-muted-foreground cursor-pointer uppercase tracking-widest mt-4">
                        {t.sendMessage}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </motion.section>
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-[95vw] h-[85vh] md:w-[80vw] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 md:right-4 z-[1000] text-foreground hover:text-cyan-400 transition-colors tracking-widest font-mono text-sm flex items-center gap-2 bg-background/50 backdrop-blur-md px-4 py-2 border border-border"
              >
                [ CLOSE ]
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <img 
                src={selectedImage?.includes("drive.google.com/file/d/") ? `https://lh3.googleusercontent.com/d/${selectedImage.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1]}` : selectedImage} 
                alt="Certificate" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}





