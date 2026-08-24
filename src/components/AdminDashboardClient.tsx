"use client";

import { useState, useEffect } from "react";
import { updateDbData, uploadFile } from "@/app/actions/cms";
import { getMessages, deleteMessage } from "@/app/actions/contact";

export default function AdminDashboardClient({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState("PROFILE");
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === "INBOX") {
      getMessages().then(res => setMessages(res || []));
    }
  }, [activeTab]);

  const handleSave = async () => {
    setLoading(true);
    setSaveStatus("");
    try {
      await updateDbData(data);
      setSaveStatus("SAVED SUCCESSFULLY");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (e) {
      setSaveStatus("SAVE FAILED");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, path: string[]) => {
    if (!e.target.files?.[0]) return;
    setLoading(true);
    setSaveStatus("UPLOADING...");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    
    try {
      const res = await uploadFile(formData);
      if (res.success && res.url) {
        // Deep update
        const newData = { ...data };
        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
          current = current[path[i]];
        }
        current[path[path.length - 1]] = res.url;
        setData(newData);
        setSaveStatus("UPLOAD COMPLETE");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    } catch (e) {
      setSaveStatus("UPLOAD FAILED");
    } finally {
      setLoading(false);
    }
  };

  const moveItem = (arrayName: string, index: number, direction: 'up' | 'down') => {
    const arr = [...(data[arrayName] || [])];
    if (direction === 'up' && index > 0) {
      const temp = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = temp;
    } else if (direction === 'down' && index < arr.length - 1) {
      const temp = arr[index];
      arr[index] = arr[index + 1];
      arr[index + 1] = temp;
    }
    setData({ ...data, [arrayName]: arr });
  };

  const updateProfile = (field: string, value: string) => {
    setData({ ...data, profile: { ...data.profile, [field]: value } });
  };

  return (
    <div className="w-full max-w-[1400px] flex flex-col md:flex-row gap-8 mt-12 relative z-10 text-left">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-[250px] flex flex-col gap-2">
        {["PROFILE", "SKILLS", "EDUCATION", "PROJECTS", "CERTIFICATIONS", "RESEARCH", "INBOX"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-left px-6 py-4 border border-border tracking-widest transition-colors ${activeTab === tab ? "bg-foreground text-background" : "hover:border-foreground"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 border border-border bg-background/50 backdrop-blur-md p-8 relative min-h-[600px]">
        
        {/* Status Bar */}
        <div className="absolute top-4 right-8 flex items-center gap-4">
          <span className="text-foreground animate-pulse">{saveStatus}</span>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="border border-border px-8 py-2 hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
          >
            {loading ? "PROCESSING..." : "SAVE CHANGES"}
          </button>
        </div>

        <h2 className="text-2xl font-sans text-foreground mb-8">{activeTab}</h2>

        {/* PROFILE TAB */}
        {activeTab === "PROFILE" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-8 border-b border-border pb-8">
              <div className="w-[100px] h-[100px] border border-border bg-muted/20 relative overflow-hidden flex justify-center items-center">
                 {data.profile.ppf ? (
                    <img src={data.profile.ppf} alt="PPF" className="object-cover w-full h-full" />
                 ) : (
                    <span>NO PPF</span>
                 )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-foreground tracking-widest">UPDATE PROFILE PICTURE</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "ppf", ["profile", "ppf"])} className="text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
               <div className="flex flex-col gap-2">
                 <label>FULL NAME</label>
                 <input type="text" value={data.profile.name} onChange={(e) => updateProfile("name", e.target.value)} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground" />
               </div>
               <div className="flex flex-col gap-2">
                 <label>PRIMARY ROLE</label>
                 <input type="text" value={data.profile.roles[0]} onChange={(e) => {
                    const newRoles = [...data.profile.roles];
                    newRoles[0] = e.target.value;
                    setData({ ...data, profile: { ...data.profile, roles: newRoles } });
                 }} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground" />
               </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
               <label>PROFESSIONAL SUMMARY</label>
               <textarea value={data.profile.summary} onChange={(e) => updateProfile("summary", e.target.value)} className="bg-transparent border border-border p-4 h-[150px] outline-none focus:border-foreground resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
               <div className="flex flex-col gap-2">
                 <label>EMAIL</label>
                 <input type="text" value={data.profile.email} onChange={(e) => updateProfile("email", e.target.value)} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground" />
               </div>
               <div className="flex flex-col gap-2">
                 <label>PHONE</label>
                 <input type="text" value={data.profile.phone} onChange={(e) => updateProfile("phone", e.target.value)} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground" />
               </div>
               <div className="flex flex-col gap-2">
                 <label>LINKEDIN URL</label>
                 <input type="text" value={data.profile.linkedin} onChange={(e) => updateProfile("linkedin", e.target.value)} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground" />
               </div>
               <div className="flex flex-col gap-2">
                 <label>GITHUB URL</label>
                 <input type="text" value={data.profile.github} onChange={(e) => updateProfile("github", e.target.value)} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground" />
               </div>
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === "SKILLS" && (
          <div className="flex flex-col gap-6">
            <p className="lowercase">Comma-separated list of skills.</p>
            <textarea 
              value={data.profile.techStack.join(", ")} 
              onChange={(e) => updateProfile("techStack", e.target.value.split(",").map((s: string) => s.trim()) as any)} 
              className="bg-transparent border border-border p-4 h-[150px] outline-none focus:border-foreground resize-none text-foreground font-mono" 
            />
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "PROJECTS" && (
          <div className="flex flex-col gap-8">
            <button 
              onClick={() => {
                const newProj = { id: Date.now().toString(), title: "New Project", description: "", year: "2024", tech: "", image: null, pdf: null, link: "", githubLink: "", demoLink: "" };
                setData({ ...data, projects: [newProj, ...data.projects] });
              }}
              className="border border-border border-dashed py-4 hover:border-foreground transition-colors"
            >
              + ADD NEW PROJECT
            </button>
            
            {data.projects.map((proj: any, idx: number) => (
              <div key={proj.id} className="border border-border p-6 flex flex-col gap-4 relative">
                <div className="absolute top-4 right-4 flex gap-4 text-xs font-mono z-10">
    <button disabled={idx === 0} onClick={() => moveItem("projects", idx, "up")} className="hover:text-foreground disabled:opacity-30">UP</button>
    <button disabled={idx === (data.projects || []).length - 1} onClick={() => moveItem("projects", idx, "down")} className="hover:text-foreground disabled:opacity-30">DOWN</button>
    <button onClick={() => {
      const newProjects = data.projects.filter((item: any) => item.id !== proj.id);
      setData({ ...data, projects: newProjects });
    }} className="text-red-500 hover:text-red-400">DELETE</button>
  </div>
                
                <input 
                  type="text" 
                  value={proj.title || ""} 
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[idx].title = e.target.value;
                    setData({ ...data, projects: newProjects });
                  }}
                  className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground text-xl font-sans text-foreground" 
                />
                <textarea 
                  value={proj.description || ""} 
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[idx].description = e.target.value;
                    setData({ ...data, projects: newProjects });
                  }}
                  className="bg-transparent border border-border p-4 h-[100px] outline-none focus:border-foreground resize-none mt-2" 
                />
                
                <input type="text" value={proj.tech || ""} onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[idx].tech = e.target.value;
                  setData({ ...data, projects: newProjects });
                }} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground mt-2" placeholder="Skills / Tech Stack (comma-separated)" />
                
                <input type="text" value={proj.year || ""} onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[idx].year = e.target.value;
                  setData({ ...data, projects: newProjects });
                }} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground mt-2" placeholder="Year (e.g., 2024)" />
                
                <input type="text" value={proj.link || ""} onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[idx].link = e.target.value;
                  setData({ ...data, projects: newProjects });
                }} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground mt-2" placeholder="Live Project Link (URL)" />
                <input type="text" value={proj.githubLink || ""} onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[idx].githubLink = e.target.value;
                  setData({ ...data, projects: newProjects });
                }} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground mt-2" placeholder="GitHub Repository (URL)" />
                <input type="text" value={proj.demoLink || ""} onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[idx].demoLink = e.target.value;
                  setData({ ...data, projects: newProjects });
                }} className="bg-transparent border-b border-border pb-2 outline-none focus:border-foreground mt-2" placeholder="Demo Video (URL)" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label>COVER IMAGE</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "image", ["projects", idx.toString(), "image"])} />
                    {proj.image && <span className="text-green-500 lowercase">Uploaded: {proj.image.split('/').pop()}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>CASE STUDY PDF</label>
                    <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, "pdf", ["projects", idx.toString(), "pdf"])} />
                    {proj.pdf && <span className="text-green-500 lowercase">Uploaded: {proj.pdf.split('/').pop()}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === "CERTIFICATIONS" && (
          <div className="flex flex-col gap-8">
            <button 
              onClick={() => {
                const newCert = { id: Date.now().toString(), name: "New Certification", issuer: "", date: "2026", link: "", image: "" };
                setData({ ...data, certifications: [newCert, ...data.certifications] });
              }}
              className="border border-border border-dashed py-4 hover:border-foreground transition-colors"
            >
              + ADD CERTIFICATION
            </button>
            {data.certifications.map((cert: any, idx: number) => (
              <div key={cert.id} className="border border-border p-6 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                <div className="absolute top-4 right-4 flex gap-4 text-xs font-mono z-10">
    <button disabled={idx === 0} onClick={() => moveItem("certifications", idx, "up")} className="hover:text-foreground disabled:opacity-30">UP</button>
    <button disabled={idx === (data.certifications || []).length - 1} onClick={() => moveItem("certifications", idx, "down")} className="hover:text-foreground disabled:opacity-30">DOWN</button>
    <button onClick={() => {
      const newCerts = data.certifications.filter((item: any) => item.id !== cert.id);
      setData({ ...data, certifications: newCerts });
    }} className="text-red-500 hover:text-red-400">DELETE</button>
  </div>
                <input type="text" value={cert.name || ""} onChange={(e) => {
                  const newCerts = [...data.certifications];
                  newCerts[idx].name = e.target.value;
                  setData({ ...data, certifications: newCerts });
                }} className="bg-transparent border-b border-border pb-2 outline-none text-foreground col-span-2 mt-6" placeholder="Certification Name" />
                <input type="text" value={cert.issuer || ""} onChange={(e) => {
                  const newCerts = [...data.certifications];
                  newCerts[idx].issuer = e.target.value;
                  setData({ ...data, certifications: newCerts });
                }} className="bg-transparent border-b border-border pb-2 outline-none" placeholder="Issuer (e.g. Google)" />
                <input type="text" value={cert.date || ""} onChange={(e) => {
                  const newCerts = [...data.certifications];
                  newCerts[idx].date = e.target.value;
                  setData({ ...data, certifications: newCerts });
                }} className="bg-transparent border-b border-border pb-2 outline-none" placeholder="Date (e.g. Apr 2026)" />
                <input type="text" value={cert.link || ""} onChange={(e) => {
                  const newCerts = [...data.certifications];
                  newCerts[idx].link = e.target.value;
                  setData({ ...data, certifications: newCerts });
                }} className="bg-transparent border-b border-border pb-2 outline-none col-span-2" placeholder="Verification Link URL" />
                <input type="text" value={cert.image || ""} onChange={(e) => {
                  const newCerts = [...data.certifications];
                  newCerts[idx].image = e.target.value;
                  setData({ ...data, certifications: newCerts });
                }} className="bg-transparent border-b border-border pb-2 outline-none col-span-2" placeholder="Image URL (e.g. /cert.jpg)" />
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === "EDUCATION" && (
          <div className="flex flex-col gap-8">
            <button 
              onClick={() => {
                const newEd = { id: Date.now().toString(), level: "Degree/Level", institution: "Institution Name", score: "Score/CGPA", details: "" };
                const eds = data.education || [];
                setData({ ...data, education: [...eds, newEd] });
              }}
              className="border border-border border-dashed py-4 hover:border-foreground transition-colors"
            >
              + ADD ACADEMIC RECORD
            </button>
            {(data.education || []).map((ed: any, idx: number) => (
              <div key={ed.id} className="border border-border p-6 flex flex-col gap-4 relative">
                <div className="absolute top-4 right-4 flex gap-4 text-xs font-mono z-10">
    <button disabled={idx === 0} onClick={() => moveItem("education", idx, "up")} className="hover:text-foreground disabled:opacity-30">UP</button>
    <button disabled={idx === (data.education || []).length - 1} onClick={() => moveItem("education", idx, "down")} className="hover:text-foreground disabled:opacity-30">DOWN</button>
    <button onClick={() => {
      const newEds = data.education.filter((item: any) => item.id !== ed.id);
      setData({ ...data, education: newEds });
    }} className="text-red-500 hover:text-red-400">DELETE</button>
  </div>
                <input type="text" value={ed.level || ""} onChange={(e) => {
                  const newEds = [...data.education];
                  newEds[idx].level = e.target.value;
                  setData({ ...data, education: newEds });
                }} className="bg-transparent border-b border-border pb-2 outline-none text-foreground mt-6" placeholder="Level (e.g. 10th / SSC)" />
                <input type="text" value={ed.institution || ""} onChange={(e) => {
                  const newEds = [...data.education];
                  newEds[idx].institution = e.target.value;
                  setData({ ...data, education: newEds });
                }} className="bg-transparent border-b border-border pb-2 outline-none text-foreground" placeholder="Institution & Location" />
                <input type="text" value={ed.score || ""} onChange={(e) => {
                  const newEds = [...data.education];
                  newEds[idx].score = e.target.value;
                  setData({ ...data, education: newEds });
                }} className="bg-transparent border-b border-border pb-2 outline-none" placeholder="Score (e.g. 83.84%)" />
              </div>
            ))}
          </div>
        )}

        {/* RESEARCH TAB */}
        {activeTab === "RESEARCH" && (
          <div className="flex flex-col gap-12">
            
            {/* Publications */}
            <div className="flex flex-col gap-8">
              <h3 className="text-xl text-foreground font-sans border-b border-border pb-2">PUBLICATIONS</h3>
              <button 
                onClick={() => {
                  const newRes = { id: Date.now().toString(), type: "Publication Type", title: "Paper Title", description: "", link: "" };
                  const res = data.research || [];
                  setData({ ...data, research: [...res, newRes] });
                }}
                className="border border-border border-dashed py-4 hover:border-foreground transition-colors"
              >
                + ADD PUBLICATION
              </button>
              {(data.research || []).map((res: any, idx: number) => (
                <div key={res.id} className="border border-border p-6 flex flex-col gap-4 relative">
                  <div className="absolute top-4 right-4 flex gap-4 text-xs font-mono z-10">
    <button disabled={idx === 0} onClick={() => moveItem("research", idx, "up")} className="hover:text-foreground disabled:opacity-30">UP</button>
    <button disabled={idx === (data.research || []).length - 1} onClick={() => moveItem("research", idx, "down")} className="hover:text-foreground disabled:opacity-30">DOWN</button>
    <button onClick={() => {
      const newRes = data.research.filter((item: any) => item.id !== res.id);
      setData({ ...data, research: newRes });
    }} className="text-red-500 hover:text-red-400">DELETE</button>
  </div>
                  <input type="text" value={res.type || ""} onChange={(e) => {
                    const newRes = [...data.research];
                    newRes[idx].type = e.target.value;
                    setData({ ...data, research: newRes });
                  }} className="bg-transparent border-b border-border pb-2 outline-none text-foreground mt-6" placeholder="Type (e.g. IEEE Paper)" />
                  <input type="text" value={res.title || ""} onChange={(e) => {
                    const newRes = [...data.research];
                    newRes[idx].title = e.target.value;
                    setData({ ...data, research: newRes });
                  }} className="bg-transparent border-b border-border pb-2 outline-none text-foreground text-xl font-sans" placeholder="Paper Title" />
                  <textarea value={res.description || ""} onChange={(e) => {
                    const newRes = [...data.research];
                    newRes[idx].description = e.target.value;
                    setData({ ...data, research: newRes });
                  }} className="bg-transparent border border-border p-4 h-[100px] outline-none resize-none" placeholder="Description / Abstract" />
                </div>
              ))}
            </div>

            {/* Hackathons */}
            <div className="flex flex-col gap-8">
              <h3 className="text-xl text-foreground font-sans border-b border-border pb-2">HACKATHONS</h3>
              <button 
                onClick={() => {
                  const newHack = { id: Date.now().toString(), title: "Hackathon Name", status: "Winner / Participant", description: "", link: "", image: "" };
                  const hacks = data.hackathons || [];
                  setData({ ...data, hackathons: [...hacks, newHack] });
                }}
                className="border border-border border-dashed py-4 hover:border-foreground transition-colors"
              >
                + ADD HACKATHON
              </button>
              {(data.hackathons || []).map((hack: any, idx: number) => (
                <div key={hack.id} className="border border-border p-6 flex flex-col gap-4 relative">
                  <div className="absolute top-4 right-4 flex gap-4 text-xs font-mono z-10">
    <button disabled={idx === 0} onClick={() => moveItem("hackathons", idx, "up")} className="hover:text-foreground disabled:opacity-30">UP</button>
    <button disabled={idx === (data.hackathons || []).length - 1} onClick={() => moveItem("hackathons", idx, "down")} className="hover:text-foreground disabled:opacity-30">DOWN</button>
    <button onClick={() => {
      const newHacks = data.hackathons.filter((item: any) => item.id !== hack.id);
      setData({ ...data, hackathons: newHacks });
    }} className="text-red-500 hover:text-red-400">DELETE</button>
  </div>
                  <input type="text" value={hack.status || ""} onChange={(e) => {
                    const newHacks = [...data.hackathons];
                    newHacks[idx].status = e.target.value;
                    setData({ ...data, hackathons: newHacks });
                  }} className="bg-transparent border-b border-border pb-2 outline-none text-foreground mt-6" placeholder="Status (e.g. Winner)" />
                  <input type="text" value={hack.title || ""} onChange={(e) => {
                    const newHacks = [...data.hackathons];
                    newHacks[idx].title = e.target.value;
                    setData({ ...data, hackathons: newHacks });
                  }} className="bg-transparent border-b border-border pb-2 outline-none text-foreground text-xl font-sans" placeholder="Hackathon Name" />
                  <textarea value={hack.description || ""} onChange={(e) => {
                    const newHacks = [...data.hackathons];
                    newHacks[idx].description = e.target.value;
                    setData({ ...data, hackathons: newHacks });
                  }} className="bg-transparent border border-border p-4 h-[100px] outline-none resize-none" placeholder="Description / Built Project" />
                  <input type="text" value={hack.link || ""} onChange={(e) => {
                    const newHacks = [...data.hackathons];
                    newHacks[idx].link = e.target.value;
                    setData({ ...data, hackathons: newHacks });
                  }} className="bg-transparent border-b border-border pb-2 outline-none text-foreground" placeholder="Verification Link URL" />
                  <input type="text" value={hack.image || ""} onChange={(e) => {
                    const newHacks = [...data.hackathons];
                    newHacks[idx].image = e.target.value;
                    setData({ ...data, hackathons: newHacks });
                  }} className="bg-transparent border-b border-border pb-2 outline-none text-foreground" placeholder="Image URL (e.g. /hack.jpg)" />
                </div>
              ))}
            </div>

          </div>
        )}
        {/* INBOX TAB */}
        {activeTab === "INBOX" && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-sans text-foreground mb-4">INBOX ({messages.length})</h2>
            {messages.length === 0 ? (
              <p className="text-muted-foreground">No messages found.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((msg: any) => (
                  <div key={msg.id} className="border border-border p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-foreground font-bold font-sans text-lg">{msg.name}</p>
                        <p className="text-muted-foreground text-sm lowercase">{msg.email} | {msg.phone}</p>
                        <p className="text-muted-foreground/50 text-xs mt-1">{new Date(msg.created_at).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={async () => {
                          if (confirm("Delete this message?")) {
                            await deleteMessage(msg.id);
                            setMessages(messages.filter((m: any) => m.id !== msg.id));
                          }
                        }}
                        className="text-red-500 hover:text-red-400 border border-red-900/50 hover:border-red-500 px-4 py-2 transition-colors text-xs"
                      >
                        DELETE
                      </button>
                    </div>
                    <div className="mt-4 p-4 bg-muted/10 border-l-2 border-foreground normal-case whitespace-pre-wrap text-foreground">
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


      </div>
    </div>
  );
}

