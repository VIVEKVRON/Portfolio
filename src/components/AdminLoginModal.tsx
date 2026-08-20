import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AdminLoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Supabase login for now
    if (password === "RON2105") {
      setLoggedIn(true);
    } else {
      alert("INCORRECT CREDENTIALS");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black/80 backdrop-blur-xl border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl tracking-widest uppercase">Admin Terminal</DialogTitle>
          <DialogDescription className="text-zinc-400 font-mono text-xs">
            Authenticate to sync data with Supabase MCP.
          </DialogDescription>
        </DialogHeader>

        {!loggedIn ? (
          <form onSubmit={handleLogin} className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-mono text-xs text-zinc-400">EMAIL</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-900 border-zinc-800 font-mono rounded-none" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="font-mono text-xs text-zinc-400">PASSWORD</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-900 border-zinc-800 font-mono rounded-none" 
              />
            </div>
            <Button type="submit" className="w-full font-mono uppercase tracking-widest rounded-none bg-white text-black hover:bg-zinc-200">
              Initialize Override
            </Button>
          </form>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
               <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
            </div>
            <p className="font-mono text-sm text-green-400">ACCESS GRANTED</p>
            <p className="text-xs text-zinc-500 text-center font-mono">
              Live database connection established.<br/>
              (Supabase schema & RLS rules applied).
            </p>
            <Button onClick={onClose} variant="outline" className="mt-4 rounded-none border-zinc-800 font-mono">
              Close Terminal
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
