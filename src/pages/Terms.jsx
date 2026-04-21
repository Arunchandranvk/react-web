import { PublicLayout } from "@/components/layout";

const Terms = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground py-16 px-6 lg:px-12">
        <div className="container-narrow mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
            TERMS & CONDITIONS
          </h1>
          <p className="text-secondary-foreground/80">
            Last updated: January 1, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="border border-border p-8 mb-8 bg-card">
              <h2 className="text-xl font-bold mb-4 uppercase">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Real Cost Estimating's services, you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
            </div>

            <div className="border border-border p-8 mb-8 bg-card">
              <h2 className="text-xl font-bold mb-4 uppercase">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily use the Real Cost Estimating software for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, 
                and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on our platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>

            <div className="border border-border p-8 mb-8 bg-card">
              <h2 className="text-xl font-bold mb-4 uppercase">3. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on Real Cost Estimating's website and software are provided on an 'as is' basis. 
                Real Cost Estimating makes no warranties, expressed or implied, and hereby disclaims and negates 
                all other warranties including, without limitation, implied warranties or conditions of 
                merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
                or other violation of rights.
              </p>
            </div>

            <div className="border border-border p-8 mb-8 bg-card">
              <h2 className="text-xl font-bold mb-4 uppercase">4. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Real Cost Estimating or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business interruption) arising 
                out of the use or inability to use the materials on Real Cost Estimating's platform, even if 
                Real Cost Estimating or an authorized representative has been notified orally or in writing of 
                the possibility of such damage.
              </p>
            </div>

            <div className="border border-border p-8 mb-8 bg-card" id="privacy">
              <h2 className="text-xl font-bold mb-4 uppercase">5. Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your privacy is important to us. We collect and use personal information only as needed to 
                deliver our services and as described in this policy.
              </p>
              <h3 className="font-bold mb-2">Information We Collect:</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Contact information (name, email, phone, company)</li>
                <li>Account credentials</li>
                <li>Project and estimation data you create</li>
                <li>Usage data and analytics</li>
              </ul>
              <h3 className="font-bold mb-2">How We Use Your Information:</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>To provide and maintain our services</li>
                <li>To notify you about changes to our services</li>
                <li>To provide customer support</li>
                <li>To improve our services</li>
              </ul>
            </div>

            <div className="border border-border p-8 mb-8 bg-card">
              <h2 className="text-xl font-bold mb-4 uppercase">6. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws and you 
                irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

            <div className="border border-border p-8 bg-card">
              <h2 className="text-xl font-bold mb-4 uppercase">7. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted">
                <p className="font-medium">Real Cost Estimating Inc.</p>
                <p className="text-muted-foreground">Email: legal@realcostestimating.com</p>
                <p className="text-muted-foreground">Phone: (123) 456-7890</p>
                <p className="text-muted-foreground">Address: 123 Construction Ave, Building City, BC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Terms;
