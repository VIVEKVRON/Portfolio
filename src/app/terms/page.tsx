import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="bg-blueprint min-h-screen text-muted-foreground font-mono text-sm relative flex flex-col items-center pt-[150px] pb-[100px] px-[5vw]">
      
      {/* Title */}
      <div className="w-full max-w-[800px] text-left border-b border-border pb-12 mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-6xl font-sans tracking-widest text-foreground">TERMS OF SERVICE</h1>
          <p className="text-muted-foreground mt-4 uppercase tracking-widest">Last updated: 20 August 2026</p>
        </div>
        <Link href="/" className="hover:text-foreground hover:underline uppercase transition-all">&larr; BACK</Link>
      </div>

      <div className="w-full max-w-[800px] flex flex-col gap-8 leading-relaxed">
        
        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">1. Introduction</h2>
          <p>These Terms and Conditions (&quot;Terms&quot;) govern your use of the website vivekvron.dev (the &quot;Website&quot;) operated by Vivek V Ron (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), a software developer and designer based in Bengaluru, India.</p>
          <div className="bg-muted/10 p-4 border border-border mt-2 flex flex-col gap-1">
             <p><span className="text-foreground">Email:</span> vivekvron@gmail.com</p>
             <p><span className="text-foreground">Phone:</span> +91 8088753429</p>
          </div>
          <p className="mt-2">By accessing or using this Website, you agree to be bound by these Terms. If you do not agree with any part of the Terms, please do not use the Website.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">2. Nature of the Website</h2>
          <p>The Website is a portfolio and informational website intended to:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Present the services and work of Vivek V Ron</li>
            <li>Showcase selected projects, research, and case studies</li>
            <li>Provide a contact form for enquiries regarding software development, design, and related services</li>
          </ul>
          <p className="mt-2">The Website does not offer e-commerce functionality, user accounts, or paid services directly. Any commercial engagement is discussed and agreed upon separately in writing.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">3. Services Offered</h2>
          <p>The Website may describe services including, but not limited to:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Full-stack web and application development (e.g. Java, Spring Boot, React, Next.js)</li>
            <li>Backend and API engineering</li>
            <li>Machine learning and data science solutions</li>
            <li>UX/UI implementation from design to code</li>
            <li>Technical architecture and consulting</li>
          </ul>
          <p className="mt-2">All descriptions are provided for informational purposes only. The actual scope of work, deliverables, timelines, and pricing are defined in separate agreements.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">4. Contact Form and Communications</h2>
          <p>When using the contact form, you may be asked to provide your name, email address, and message content. You agree to provide accurate and complete information. Submitting the contact form does not create a client relationship or obligate us to provide services.</p>
          <p>We may store and process your contact information solely for the purpose of responding to enquiries. For details on how personal data is processed, please refer to our Privacy Policy.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">5. Intellectual Property</h2>
          <p>All content on the Website, including but not limited to text, images, graphics, logos, videos, animations, code, and layout, is owned by Vivek V Ron or respective rights holders and is protected by applicable intellectual property laws.</p>
          <p>You may not, without prior written permission:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Copy, reproduce, or distribute Website content</li>
            <li>Use content for commercial purposes</li>
            <li>Remove or alter copyright or trademark notices</li>
            <li>Create derivative works based on the Website or its content</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">6. Third-Party Links</h2>
          <p>The Website may contain links to external websites. These links are provided for convenience only. We do not control or endorse such websites and are not responsible for their content, privacy practices, or terms.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">7. Disclaimer of Warranties</h2>
          <p>The Website is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties, express or implied, including but not limited to warranties of accuracy, reliability, availability, or fitness for a particular purpose.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Vivek V Ron shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of or inability to use the Website.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">9. User Conduct</h2>
          <p>You agree not to use the Website for unlawful purposes, submit false or misleading information, attempt unauthorised access to systems or networks, or disrupt or interfere with Website functionality.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">10. Changes to the Website and Terms</h2>
          <p>We reserve the right to modify the Website or these Terms at any time. Continued use of the Website after changes constitutes acceptance of the revised Terms.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">11. Governing Law and Jurisdiction</h2>
          <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Karnataka, India.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">12. Severability</h2>
          <p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-foreground font-sans text-xl uppercase tracking-widest">13. Contact</h2>
          <p>For questions regarding these Terms, please contact:</p>
          <div className="bg-muted/10 p-4 border border-border mt-2 flex flex-col gap-1">
             <p>Vivek V Ron</p>
             <p>Bengaluru / Hubli, India</p>
             <p><span className="text-foreground">Email:</span> vivekvron@gmail.com</p>
             <p><span className="text-foreground">Phone:</span> +91 8088753429</p>
          </div>
        </section>

      </div>
    </div>
  );
}
