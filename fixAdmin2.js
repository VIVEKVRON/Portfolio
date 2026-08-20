const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboardClient.tsx', 'utf8');

// 1. Add INBOX to array
code = code.replace(
  '["PROFILE", "SKILLS", "EDUCATION", "PROJECTS", "CERTIFICATIONS", "RESEARCH"]',
  '["PROFILE", "SKILLS", "EDUCATION", "PROJECTS", "CERTIFICATIONS", "RESEARCH", "INBOX"]'
);

// 2. Add INBOX HTML
const inboxHtml = `
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
                            await import("@/app/actions/contact").then(m => m.deleteMessage(msg.id));
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
`;

code = code.replace(
  '      </div>\n    </div>\n  );\n}',
  inboxHtml + '      </div>\n    </div>\n  );\n}'
);

// 3. Add useEffect and getMessages
const stateBlock = `  const [saveStatus, setSaveStatus] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  require("react").useEffect(() => {
    if (activeTab === "INBOX") {
      import("@/app/actions/contact").then(m => m.getMessages()).then(res => setMessages(res || []));
    }
  }, [activeTab]);`;

code = code.replace(
  '  const [saveStatus, setSaveStatus] = useState("");',
  stateBlock
);

fs.writeFileSync('src/components/AdminDashboardClient.tsx', code);
console.log('done');
