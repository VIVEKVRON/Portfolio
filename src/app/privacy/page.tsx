import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="bg-blueprint min-h-screen text-muted-foreground font-mono text-sm relative flex flex-col items-center pt-[150px] pb-[100px] px-[5vw]">
      
      {/* Title */}
      <div className="w-full max-w-[800px] text-left border-b border-border pb-12 mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-6xl font-sans tracking-widest text-foreground">PRIVACY POLICY</h1>
          <p className="text-muted-foreground mt-4 uppercase tracking-widest">Last updated: 20 August 2026</p>
        </div>
        <Link href="/" className="hover:text-foreground hover:underline uppercase transition-all">&larr; BACK</Link>
      </div>

      <div className="w-full max-w-[800px] flex flex-col gap-8 leading-relaxed">
        
        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">1. Introduction</h2>
          <p>This Privacy Policy explains how Vivek V Ron (&quot;we&quot;, &quot;us&quot;) collects, uses, and protects personal data when you visit or interact with the Website.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">2. Personal Data We Collect</h2>
          <p>We may collect and process the following personal data:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number (optional)</li>
            <li>IP address</li>
            <li>Browser and device information</li>
            <li>Message content submitted via the contact form</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">3. Purpose of Processing</h2>
          <p>We process personal data for the following purposes:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Responding to enquiries</li>
            <li>Communicating about potential projects</li>
            <li>Improving Website performance and security</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">4. Legal Basis</h2>
          <p>Personal data is processed on the basis of:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Your consent</li>
            <li>Performance of a contract or pre-contractual steps</li>
            <li>Legitimate interest in operating and securing the Website</li>
            <li>Legal obligations</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">5. Data Retention</h2>
          <p>Personal data is retained only as long as necessary for the purposes described above, unless a longer retention period is required by law.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">6. Sharing with Third Parties</h2>
          <p>We do not sell personal data. Data may be shared with trusted third parties only where necessary, such as hosting providers or analytics services, under appropriate safeguards.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">7. Cookies</h2>
          <p>The Website may use functional and analytical cookies. Where required, consent will be requested. For more information, please refer to the cookie notice on the Website.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Object to processing</li>
            <li>Request data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mt-2">Requests can be sent to: <a href="mailto:vivekvron@gmail.com" className="text-foreground hover:underline">vivekvron@gmail.com</a></p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">9. Complaints</h2>
          <p>If you believe your data is being processed unlawfully, you may lodge a complaint with the relevant data protection authority in your jurisdiction.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">10. Changes</h2>
          <p>This Privacy Policy may be updated from time to time. The &quot;Last updated&quot; date will reflect changes.</p>
        </section>

      </div>
    </div>
  );
}
