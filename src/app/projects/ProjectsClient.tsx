"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const { t } = useLanguage();

  return (
    <div className="bg-blueprint min-h-screen text-muted-foreground font-mono text-xs uppercase relative flex flex-col items-center pt-[150px] pb-[100px] px-[5vw]">
      
      {/* Title */}
      <div className="w-full max-w-[1400px] text-left border-b border-border pb-12 mb-12">
        <h1 className="text-4xl md:text-6xl font-sans tracking-widest text-foreground">{t.projects}</h1>
        <p className="text-muted-foreground mt-4 lowercase tracking-widest">{t.curated}</p>
      </div>

      {/* Grid List */}
      <div className="w-full max-w-[1400px] flex flex-col gap-8">
        {initialProjects.map((proj, idx) => (
          <div key={proj.id} className="w-full border border-border bg-background/50 backdrop-blur-md flex flex-col md:flex-row hover:bg-muted/10 transition-colors group">
            
            <div className="p-8 md:w-[200px] border-b md:border-b-0 md:border-r border-border flex flex-col justify-center text-foreground font-sans text-2xl relative overflow-hidden">
              {proj.image && (
                 <img src={proj.image} alt={proj.title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-50 transition-opacity" />
              )}
              <span className="relative z-10">{String(idx + 1).padStart(2, '0')}.</span>
            </div>
            
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-sans text-foreground">{proj.title}</h2>
                <span className="text-[10px] bg-muted/20 px-2 py-1 border border-border text-foreground">{proj.tech}</span>
              </div>
              <p className="normal-case text-muted-foreground leading-relaxed max-w-[800px]">{proj.description}</p>
            </div>

            <div className="p-8 md:w-[200px] border-t md:border-t-0 md:border-l border-border flex flex-col items-center justify-center gap-4">
              <span>{proj.year}</span>
              <div className="flex gap-4">
                {proj.pdf && <a href={proj.pdf} target="_blank" rel="noreferrer" className="hover:text-foreground hover:underline transition-all">PDF &rarr;</a>}
                <a href="#contact" className="hover:text-foreground hover:underline transition-all">VIEW &rarr;</a>
              </div>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
}
