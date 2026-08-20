"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function CertificationsClient({ certifications }: { certifications: any[] }) {
  const { t } = useLanguage();

  return (
    <div className="bg-blueprint min-h-screen text-muted-foreground font-mono text-xs uppercase relative flex flex-col items-center pt-[150px] pb-[100px] px-[5vw]">
      
      {/* Title */}
      <div className="w-full max-w-[1400px] text-left border-b border-border pb-12 mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-6xl font-sans tracking-widest text-foreground">{t.certifications}</h1>
          <p className="text-muted-foreground mt-4 lowercase tracking-widest">{t.certificationsSub}</p>
        </div>
        <div className="w-[100px] h-[100px] border border-border flex justify-center items-center rounded-full animate-[spin_20s_linear_infinite]">
          [ CERT ]
        </div>
      </div>

      {/* Masonry / Grid */}
      <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert) => (
          <div key={cert.id} className="border border-border bg-background/50 backdrop-blur-md p-12 flex flex-col justify-between min-h-[300px] hover:border-foreground transition-colors group">
            
            <div className="flex justify-between items-start mb-8">
              <span className="text-foreground tracking-widest bg-muted/20 px-3 py-1 border border-border">{cert.issuer}</span>
              <span>{cert.date}</span>
            </div>

            <h2 className="text-2xl font-sans text-foreground mb-12">{cert.name}</h2>

            <div className="pt-8 border-t border-border flex justify-between items-center group-hover:text-foreground transition-colors">
              <span className="tracking-widest">{t.verifyCert}</span>
              <a href={cert.link || "#"} target={cert.link ? "_blank" : "_self"} rel="noreferrer">&rarr;</a>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
}
