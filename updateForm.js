const fs = require('fs');
let code = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

const importStmt = `import { useLanguage } from "./LanguageProvider";\nimport { submitContactMessage } from "@/app/actions/contact";`;
code = code.replace(`import { useLanguage } from "./LanguageProvider";`, importStmt);

const oldForm = `                    <form 
                       className="flex flex-col w-full text-muted-foreground normal-case h-full gap-8"
                       onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}
                    >
                       <input type="text" placeholder={t.yourName} required className="w-full bg-transparent border-b border-border pb-4 outline-none focus:border-foreground transition-colors" />
                       <input type="email" placeholder="your.email@example.com" required className="w-full bg-transparent border-b border-border pb-4 outline-none focus:border-foreground transition-colors" />
                       <input type="tel" placeholder="+91 90000 00000" className="w-full bg-transparent border-b border-border pb-4 outline-none focus:border-foreground transition-colors" />
                       <textarea placeholder={t.tellMe} required className="w-full bg-transparent pb-4 flex-1 outline-none focus:border-foreground transition-colors resize-none"></textarea>
                       <button type="submit" className="h-[60px] w-full flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors text-muted-foreground cursor-pointer uppercase tracking-widest mt-4">
                          {t.sendMessage}
                       </button>
                    </form>`;

const newForm = `                    <form 
                       className="flex flex-col w-full text-muted-foreground normal-case h-full gap-8"
                       action={async (formData) => {
                         const res = await submitContactMessage(formData);
                         if (res.success) {
                           alert("Message sent securely to the database!");
                           (document.getElementById("contactForm") as HTMLFormElement).reset();
                         } else {
                           alert("Error sending message: " + res.error);
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
                    </form>`;

code = code.replace(oldForm, newForm);
fs.writeFileSync('src/components/Portfolio.tsx', code);
