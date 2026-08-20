"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function ResearchClient({ research, hackathons }: { research: any[], hackathons: any[] }) {
  const { t } = useLanguage();

  return (
    <div className="bg-blueprint min-h-screen text-muted-foreground font-mono text-xs uppercase relative flex flex-col items-center pt-[150px] pb-[100px] px-[5vw]">
      
      {/* Title */}
      <div className="w-full max-w-[1400px] text-left border-b border-border pb-12 mb-12">
        <h1 className="text-4xl md:text-6xl font-sans tracking-widest text-foreground">{t.research}</h1>
        <p className="text-muted-foreground mt-4 lowercase tracking-widest">{t.researchSub}</p>
      </div>

      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Research Column */}
        <div className="flex flex-col gap-8">
          <div className="border-b border-border pb-4 mb-4">
            <h2 className="text-2xl font-sans tracking-widest text-foreground">PUBLICATIONS</h2>
          </div>
          {research.map((res) => (
            <div key={res.id} className="w-full border border-border bg-background/50 backdrop-blur-md p-8 hover:border-foreground transition-colors flex flex-col gap-4">
              <span className="text-[10px] bg-muted/20 px-2 py-1 border border-border text-foreground w-fit">{res.type}</span>
              <h2 className="text-xl font-sans text-foreground leading-snug">{res.title}</h2>
              <p className="normal-case text-muted-foreground leading-relaxed">{res.description}</p>
            </div>
          ))}
        </div>

        {/* Hackathons Column */}
        <div className="flex flex-col gap-8">
          <div className="border-b border-border pb-4 mb-4">
            <h2 className="text-2xl font-sans tracking-widest text-foreground">HACKATHONS</h2>
          </div>
          {hackathons.map((hack) => (
            <div key={hack.id} className="w-full border border-border bg-background/50 backdrop-blur-md p-8 hover:border-foreground transition-colors flex flex-col gap-4">
              <span className="text-[10px] bg-muted/20 px-2 py-1 border border-border text-foreground w-fit">{hack.status}</span>
              <h2 className="text-xl font-sans text-foreground leading-snug">{hack.title}</h2>
              <p className="normal-case text-muted-foreground leading-relaxed">{hack.description}</p>
            </div>
          ))}
        </div>

      </div>
      
    </div>
  );
}
