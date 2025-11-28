import { motion } from "framer-motion";
import { Mail, ShieldCheck, FileText, Lock, Users, Award, ChevronRight, AlertTriangle, CheckCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@assets/generated_images/professional_kenyan_private_security_guard_or_psra_concept.png";

const EMAIL_RECIPIENT = "regulations@psra.go.ke";
const EMAIL_BCC = "jt2500100@gmail.com"; 
const EMAIL_SUBJECT = "Citizen Submission on Draft Private Security (General) Regulations AND Draft Private Security (Fidelity Fund Operations) Regulations, 2025";
const EMAIL_BODY = `To the Director General,
Private Security Regulatory Authority (PSRA),

CITIZEN SUBMISSION ON THE DRAFT PRIVATE SECURITY (GENERAL) REGULATIONS & FIDELITY FUND OPERATIONS REGULATIONS, 2025

1. Introduction
I submit this memorandum as a concerned citizen who believes that strong, fair and transparent regulation of Kenya's private security sector is essential for national safety, economic development and the wellbeing of hundreds of thousands of security officers across the country.

My intention is not to oppose regulation, but to recommend a framework that is modern, practical, fair to all players and aligned with Kenya's long-term security interests.

I therefore offer the following recommendations on both the Draft Private Security (General) Regulations, 2025 and the Draft Private Security (Fidelity Fund Operations) Regulations, 2025.

2. Key Proposals on the General Regulations

2.1 Create pathways for youth and skilled graduates (Proposed Regulation 5A)
I propose creating a simplified pathway to support: micro and small private security enterprises, graduates of criminology, security studies, forensics and related fields, and trainee investigators under supervised practice.

Requirements for SMEs: identification documents, tax compliance, bank account evidence, equipment/personnel list, and basic insurance. Audited accounts should not be required for the first two years.

Fast-track pathway for youth graduates: Young people with relevant degrees should qualify for accelerated registration within fourteen days.

Recognition of Trainee Investigators: The Authority should register trainee investigators operating under supervision for evidence collection, incident documentation, and risk assessments.

2.2 Close loopholes that may enable corruption
- Remove "any other information" clause that allows unlimited document demands
- Publish inspection checklists for consistency
- Allow calibration by any accredited technician (not just specific providers)
- Define uniform colour standards objectively, not subjectively
- Do not license internal communication systems
- Protect ID document privacy—Authority should not retain copies
- Limit licence cancellation to clearly listed violations
- Restrict cooperation requests—no forced vehicles, fuel or unpaid deployments
- Use photo-based uniform assessment instead of sample submissions

2.3 Strengthen national security through structured integration of private security
- Establish a national incident reporting framework using private officers
- Allow designation of private officers as auxiliary responders in disasters
- Accredit specialised training modules: cyber monitoring, counter-terror observation, investigative support, digital forensics
- Establish a Private Security Fusion Liaison Framework for intelligence sharing
- Include private providers in national multi-agency drills
- Create a national register of specialised personnel

3. Key Proposals on the Fidelity Fund Operations Regulations, 2025

3.1 Reduce the Fidelity Levy to a fair, evidence-based level
The proposed levy of 1% of gross annual revenue is excessive. Private security margins are typically 3–5%. A firm earning KSh 5 million profit would pay KSh 1 million in levy—consuming 20% of profit.

Recommendation: Reduce rate to 0.2%. If 1% is retained, apply it on net revenue (gross minus guard wages) or profit before tax, AND impose a reasonable annual cap per firm.

3.2 Protect small, young and emerging businesses
- Exempt firms below a minimum turnover threshold
- Introduce a reduced rate (0.1%) for small enterprises for 3–5 years
- Exempt individual consultants and micro-enterprises below the threshold

3.3 Strengthen governance, transparency and accountability
Ring-fence fund allocation: At least 50% to guard training/welfare/professional development, not more than 30% to Authority administration, 20% to digitisation/research.

Inclusive Board of Trustees: Include guard representative, SME representative, and public governance expert.

Demand strict annual transparency: audited accounts, public reports showing funds collected, spending categories, beneficiaries, and impact achieved.

3.4 Fair enforcement and penalty provisions
- Include a grace period for first years of implementation
- Cap penalties (aligned with Central Bank Rate)
- Require written notices before enforcement
- Create a clear appeals mechanism
- Prohibit licence suspension solely due to disputed levy amount

3.5 Ensure levy is linked to visible sector benefits
The Fund should deliver: subsidised guard training, health and safety improvements, national standard training curriculum, and digitised compliance systems that lower business costs.

4. Conclusion
I respectfully recommend: creating simplified pathways for youth and SMEs, removing vague clauses, integrating private security into national preparedness, reducing the Fidelity Levy to 0.2%, protecting small enterprises, implementing strong governance and transparency for the Fidelity Fund, and ensuring penalties are fair and procedurally sound.

Kenya can build a modern, fair and robust private security framework that supports guards, firms, young graduates and national safety.

Your faithfully,
Concerned Citizen of Kenya`;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const handleEmailClick = () => {
    // Detect if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Use mailto: protocol for mobile - opens native Gmail app
      const mailtoLink = `mailto:${EMAIL_RECIPIENT}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}&bcc=${EMAIL_BCC}`;
      window.location.href = mailtoLink;
    } else {
      // Use Gmail web interface for desktop
      const body = encodeURIComponent(EMAIL_BODY);
      const subject = encodeURIComponent(EMAIL_SUBJECT);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_RECIPIENT}&bcc=${EMAIL_BCC}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-tight">Private Security Watch</span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider">PSRA REGULATIONS 2025</span>
            </div>
          </div>
          <Button 
            onClick={handleEmailClick}
            className="bg-primary hover:bg-primary/90 text-white font-medium rounded-md px-6 shadow-md"
            data-testid="button-nav-email"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send My Proposal to PSRA Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/60" />
          <img 
            src={heroImage} 
            alt="Professional Private Security Guard" 
            className="w-full h-full object-cover opacity-40 object-center grayscale mix-blend-overlay"
          />
        </div>
        
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl space-y-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-slate-900 border border-amber-600 font-bold">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm uppercase tracking-wide">Public Participation Open</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.1] drop-shadow-lg">
              <span className="text-black">A Call for Fairer</span> <br/>
              <span className="text-yellow-400">Private Security Regulations</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-2xl md:text-3xl text-black max-w-2xl leading-relaxed border-l-4 border-amber-400 pl-6 font-bold drop-shadow-lg">
              Advocating for fair Fidelity Fund levy rates, SME protection, and transparent governance in the Draft Private Security (Fidelity Fund Operations) Regulations, 2025.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4 pt-6">
              <Button 
                onClick={handleEmailClick}
                size="lg" 
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-md shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold"
                data-testid="button-hero-email"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send My Proposal to PSRA Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-md border-2 text-white border-white/20 hover:bg-white/10 hover:text-white"
                onClick={() => document.getElementById('proposals')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Read Key Points
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section id="proposals" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Citizen Recommendations</h2>
            <p className="text-lg text-slate-600">
              We propose key improvements to the Fidelity Levy framework: Fair Rates, SME Protection, Transparent Governance, and Accountable Enforcement.
            </p>
          </div>

          <Tabs defaultValue="concerns" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-4 bg-transparent p-0 mb-12">
              <TabsTrigger value="concerns" className="h-auto p-6 data-[state=active]:bg-white data-[state=active]:shadow-lg border border-transparent data-[state=active]:border-slate-200 rounded-xl flex flex-col items-center gap-3 text-slate-600 data-[state=active]:text-primary transition-all">
                <AlertTriangle className="h-8 w-8" />
                <span className="font-bold text-lg">Key Concerns</span>
                <span className="text-xs opacity-70 font-normal hidden md:block">Economic Risks</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="h-auto p-6 data-[state=active]:bg-white data-[state=active]:shadow-lg border border-transparent data-[state=active]:border-slate-200 rounded-xl flex flex-col items-center gap-3 text-slate-600 data-[state=active]:text-primary transition-all">
                <CheckCircle className="h-8 w-8" />
                <span className="font-bold text-lg">Recommendations</span>
                <span className="text-xs opacity-70 font-normal hidden md:block">Fair Levy Framework</span>
              </TabsTrigger>
              <TabsTrigger value="governance" className="h-auto p-6 data-[state=active]:bg-white data-[state=active]:shadow-lg border border-transparent data-[state=active]:border-slate-200 rounded-xl flex flex-col items-center gap-3 text-slate-600 data-[state=active]:text-primary transition-all">
                <ShieldCheck className="h-8 w-8" />
                <span className="font-bold text-lg">Governance</span>
                <span className="text-xs opacity-70 font-normal hidden md:block">Transparency & Accountability</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
              <TabsContent value="concerns" className="mt-0 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 text-red-700 rounded-lg shrink-0">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif mb-2">Key Concerns with 1% Levy on Gross Revenue</h3>
                    <p className="text-slate-600 mb-6">
                      The current proposal presents significant practical and economic risks to the private security sector.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-slate-50 border-slate-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Excessive Burden on Low-Margin Sector</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex gap-2"><AlertTriangle className="h-4 w-4 text-red-600 shrink-0" /> Private security operates at margins as low as 3-5%.</li>
                        <li className="flex gap-2"><AlertTriangle className="h-4 w-4 text-red-600 shrink-0" /> A 1% levy can consume 20-30% of a firm's profit.</li>
                        <li className="flex gap-2"><AlertTriangle className="h-4 w-4 text-red-600 shrink-0" /> Smaller firms are disproportionately affected.</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-50 border-slate-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Risk of Job Losses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex gap-2"><AlertTriangle className="h-4 w-4 text-red-600 shrink-0" /> The sector employs over 700,000 guards.</li>
                        <li className="flex gap-2"><AlertTriangle className="h-4 w-4 text-red-600 shrink-0" /> Increased costs will reduce employment opportunities.</li>
                        <li className="flex gap-2"><AlertTriangle className="h-4 w-4 text-red-600 shrink-0" /> SMEs, youth-led firms and new entrants are most at risk.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left font-semibold">The levy behaves like a turnover tax</AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        <p>A gross-revenue levy is insensitive to firm size, profitability, inflationary cost pressures and wage obligations. This means struggling businesses pay the same rate as thriving ones.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left font-semibold">Weak accountability mechanisms</AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        <p>The current draft does not provide clear spending ratios, annual reporting obligations, transparency measures, or independent oversight structures.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left font-semibold">Enforcement and penalties risk abuse</AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        <p>A 3% penalty on arrears and licence consequences without clear due process creates space for selective, unfair or arbitrary enforcement.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-0 space-y-8">
                 <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 text-green-700 rounded-lg shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif mb-2">Recommendations for a Fair Levy Framework</h3>
                    <p className="text-slate-600 mb-6">
                      We propose evidence-based adjustments to ensure the levy meets regulatory objectives without destabilising the sector.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-green-50 border-green-100">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-800">Option A (Preferred)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-green-600 shrink-0" /> Reduce the levy from 1% to 0.2% of gross annual revenue.</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-800">Option B (If 1% is retained)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-blue-600 shrink-0" /> Apply 1% only on net revenue (minus guard wages).</li>
                        <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-blue-600 shrink-0" /> Or apply 1% on profit before tax.</li>
                        <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-blue-600 shrink-0" /> Introduce a cap on maximum amount payable annually.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-lg">Protect Small and Medium Enterprises (SMEs)</h4>
                  <div className="grid gap-4">
                    {[
                      { title: "Turnover Threshold", desc: "Establish a turnover threshold below which the levy does not apply." },
                      { title: "Phased Rates", desc: "Introduce a reduced rate (e.g., 0.1%) for the first 3-5 years for small enterprises." },
                      { title: "Exemptions", desc: "Exempt individual consultants, sole practitioners and micro-businesses below threshold." }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-slate-100 bg-slate-50">
                        <div className="mt-1 h-2 w-2 rounded-full bg-green-500 shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-900">{item.title}</h4>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="governance" className="mt-0 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif mb-2">Governance and Transparency</h3>
                    <p className="text-slate-600 mb-6">
                      Building public trust through accountable fund management and fair enforcement.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-slate-50 border-slate-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Ring-fence the Use of Funds</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-green-600 shrink-0" /> At least 50% for guard training, welfare, and professionalisation.</li>
                        <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-green-600 shrink-0" /> Not more than 30% for Authority administration.</li>
                        <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-green-600 shrink-0" /> 20% for digitisation, research and sector improvement.</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-50 border-slate-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Inclusive Board of Trustees</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-green-600 shrink-0" /> Representative of guard associations/workers.</li>
                        <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-green-600 shrink-0" /> SME representative.</li>
                        <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-green-600 shrink-0" /> Public interest governance representative.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-lg">Fair Enforcement & Dispute Resolution</h4>
                  <div className="grid gap-4">
                    {[
                      { title: "Grace Period", desc: "Provide a grace period during the first years of implementation." },
                      { title: "Penalty Caps", desc: "Cap penalties aligned with the Central Bank Rate." },
                      { title: "Clear Appeals Process", desc: "Establish a transparent appeals mechanism for disputes." },
                      { title: "Written Notices", desc: "Require written notices before enforcement begins." },
                      { title: "Protection from Suspension", desc: "Prohibit licence suspension solely on disputed levy amounts." }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-slate-100 bg-slate-50">
                        <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-900">{item.title}</h4>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              Make Your Voice Count
            </h2>
            <p className="text-xl text-slate-300">
              These regulations will shape the future of the private security sector in Kenya. Send this submission to advocate for fair levy rates and transparent governance.
            </p>
            <Button 
              onClick={handleEmailClick}
              size="lg" 
              className="w-full sm:w-auto h-16 px-12 text-xl rounded-full bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold shadow-2xl shadow-amber-900/50"
              data-testid="button-cta-email"
            >
              <Mail className="mr-3 h-6 w-6" />
              Send My Proposal to PSRA Now
            </Button>
            <p className="text-sm opacity-50">
              Clicking opens Gmail with your submission ready to send.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            A citizen initiative to support the Private Security Regulation Act review process.<br/>
            Not officially affiliated with PSRA.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ScaleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}
