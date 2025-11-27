import { promisify } from "node:util";
import { execFile } from "node:child_process";

export interface EmailAttachment {
  filename: string;
  content: string;
  contentType?: string;
  encoding?: "base64" | "7bit" | "quoted-printable" | "binary";
}

export interface EmailMessage {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: EmailAttachment[];
}

export interface EmailResult {
  accepted: string[];
  rejected: string[];
  pending?: string[];
  messageId: string;
  response: string;
}

async function getAuthToken(): Promise<{ authToken: string; hostname: string }> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  if (!hostname) {
    throw new Error("REPLIT_CONNECTORS_HOSTNAME not configured");
  }

  const { stdout } = await promisify(execFile)(
    "replit",
    ["identity", "create", "--audience", `https://${hostname}`],
    { encoding: "utf8" }
  );

  const replitToken = stdout.trim();
  if (!replitToken) {
    throw new Error("Replit Identity Token not found");
  }

  return { authToken: `Bearer ${replitToken}`, hostname };
}

export async function sendEmail(message: EmailMessage): Promise<EmailResult> {
  const { hostname, authToken } = await getAuthToken();

  const response = await fetch(`https://${hostname}/api/v2/mailer/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Replit-Authentication": authToken,
    },
    body: JSON.stringify({
      to: message.to,
      cc: message.cc,
      bcc: message.bcc,
      subject: message.subject,
      text: message.text,
      html: message.html,
      attachments: message.attachments,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to send email" }));
    throw new Error(error.message || "Failed to send email");
  }

  return await response.json();
}

export const EMAIL_CONFIG = {
  recipient: "director.general@psra.go.ke",
  bcc: "submissions@psra.go.ke",
  subject: "Citizen Submission on the Draft Private Security Regulations, 2025",
};

export const EMAIL_BODY = `CITIZEN SUBMISSION ON THE DRAFT PRIVATE SECURITY (GENERAL) REGULATIONS, 2025

PREAMBLE

I submit these recommendations as a concerned citizen who believes that strong, fair, and clear regulations are essential for Kenya's safety and future. My intention is to support the development of regulations that protect the public, strengthen national security, and ensure that opportunities within the private security sector are accessible to all Kenyans, especially young people who have invested in security-related education.

Across the country, many citizens have pursued studies in criminology, forensic science, security studies, psychology, sociology, and related fields. Thousands of young Kenyans graduate every year with knowledge and skills that could meaningfully contribute to community safety, crime prevention, and national security. Unfortunately, many remain unemployed or underutilised because the current regulatory framework does not offer clear or affordable pathways for them to participate or establish small enterprises.

Effective regulations should therefore achieve three things:
1. Protect citizens from insecurity and misconduct.
2. Close gaps that create room for corruption or unfair treatment.
3. Create fair opportunities for skilled young people to participate in building a safer country.

I offer the following proposals with respect, and in the spirit of helping strengthen the regulations for the benefit of our country.


1. PROPOSED ADDITION TO SUPPORT YOUTH SKILLS AND SMALL ENTERPRISES

SME, YOUTH, AND CRIMINOLOGY ENTRY PATHWAYS

PROPOSED NEW REGULATION 5A

5A (1) To promote fairness and national development, the Authority should introduce a simplified licensing pathway for:
- micro and small private security enterprises,
- graduates of criminology, security studies, forensic science, or related fields,
- trainee investigators under supervised practice.

MICRO AND SMALL ENTERPRISE REQUIREMENTS

5A (2) Small applicants should only be required to provide:
- identification or incorporation documents,
- tax compliance certificates,
- evidence of a bank account,
- a list of equipment and personnel,
- proof of basic insurance.

5A (3) Audited accounts should not be required for the first two years of operation.

PATHWAY FOR YOUTH WITH SECURITY-RELATED QUALIFICATIONS

5A (4) Young people with diplomas or degrees in criminology, security studies, forensics, psychology, sociology, conflict studies, or related fields should qualify for faster registration.

5A (5) Such applications should be processed within fourteen days.

TRAINEE INVESTIGATOR RECOGNITION

5A (6) The Authority should register trainee investigators who work under supervision and hold relevant qualifications.

5A (7) A trainee investigator certificate should allow supervised evidence collection, research, incident documentation, and participation in risk assessments.

RECOGNITION OF PRIOR EXPERIENCE

5A (8) The Authority should recognise previous experience in policing, security, community safety, or related fields.

NON-DISCRIMINATION CLAUSE

5A (9) No additional requirements should be imposed on applicants beyond what is specified in the Act or these Regulations.


2. CORRECTIONS TO REDUCE ABUSE OF POWER AND INCREASE FAIRNESS

Several clauses in the draft regulations may be misinterpreted or abused. Below are proposed replacements intended to increase fairness, clarity, and accountability.

OLD CLAUSE | WHY IT SHOULD BE REVISED | SUGGESTED REPLACEMENT

Regulation 5(t): any other information that the Authority may specify
- Issue: Allows unlimited demands for documents and creates room for harassment
- Replacement: No documents should be demanded beyond what is listed in the Act or these Regulations

Regulation 13: broad inspection and calibration powers
- Issue: May enable unfair penalties or favour certain vendors
- Replacement: Inspections should follow a published checklist. Calibration may be done by any accredited technician

Regulation 14: subjective restrictions on uniform colours
- Issue: Can be interpreted differently by different officers
- Replacement: Colour and design standards should be based on a published, objective chart

Regulation 15: licensing internal communication software
- Issue: Creates unnecessary delays and burdens
- Replacement: Internal systems that do not link to national security should not require a licence

Regulation 20: retention of identification documents
- Issue: May lead to privacy risks or misuse of personal data
- Replacement: The Authority should not retain or copy ID documents except for initial registration

Act Section 32: vague reasons for cancelling licences
- Issue: Allows cancellations for unrelated or minor issues
- Replacement: Licences should be cancelled only for clearly defined violations connected to security duties

Regulations 16-17: broad cooperation powers
- Issue: May force companies to provide vehicles, fuel, or free labour
- Replacement: Cooperation should not include financial or material support unless clearly defined in the Act

Act Section 60-61: unlimited levy powers
- Issue: Allows levies to be increased without limit
- Replacement: The levy should be capped at one percent of annual revenue and undergo public participation

Regulation 5(n): requirement to submit uniform samples
- Issue: May create unnecessary delays and repeated requests
- Replacement: Photo-based assessment is adequate and more transparent


3. IMPROVING NATIONAL SECURITY THROUGH BETTER PUBLIC AND PRIVATE COORDINATION

Kenya can greatly benefit from structured cooperation between public agencies and private security actors. The private security sector is one of the largest sources of trained personnel and can support national security if engaged properly.

CURRENT GAP | WHY IT MATTERS | SUGGESTED ADDITION

No early warning framework using private security officers
- Why It Matters: Private officers are present everywhere and can report incidents quickly
- Suggested Addition: Create a digital incident-reporting framework for verified submissions

Private security not integrated in disaster response
- Why It Matters: They are often first on the scene
- Suggested Addition: Allow designation as auxiliary responders under clear guidelines

No structured pathway for specialised skills (cyber, forensic, investigative)
- Why It Matters: Kenya faces modern crime threats requiring specialised knowledge
- Suggested Addition: Accredit specialised training modules in key areas

No public-private intelligence sharing mechanism
- Why It Matters: Sharing is inconsistent, reducing effectiveness
- Suggested Addition: Establish a private-security fusion liaison framework

Exclusion from national simulations
- Why It Matters: Reduces preparedness and response efficiency
- Suggested Addition: Invite registered firms to multi-agency drills

No register of specialised private talent
- Why It Matters: Kenya lacks a surge-ready reserve for emergencies
- Suggested Addition: Create a national register of specialised private personnel


================================================================================

2. SUMMARY SUBMISSION ON THE DRAFT PRIVATE SECURITY (FIDELITY FUND OPERATIONS) REGULATIONS, 2025

1. PURPOSE OF THIS SUBMISSION

I am submitting these views as a concerned citizen who believes that Kenya needs strong, fair, transparent and economically sound regulations to support the private security sector. The Fidelity Levy and Fidelity Fund must be implemented in a way that strengthens national security, protects guard employment, and promotes a healthy business environment.

My intention is not to oppose the existence of the Fidelity Levy, but to ensure that the structure, rate, and governance of the levy are reasonable, fair, and aligned with Kenya's economic reality.


2. SUMMARY OF KEY CONCERNS

The current proposal to charge 1% of gross annual revenue presents practical and economic risks:

2.1 EXCESSIVE BURDEN ON A LOW-MARGIN SECTOR
- Private security operates at margins as low as 3-5%.
- A 1% levy on gross revenue can consume 20-30% of a firm's profit.
- Smaller firms are disproportionately affected.

2.2 THE LEVY BEHAVES LIKE A TURNOVER TAX
- A gross-revenue levy is insensitive to firm size, profitability, inflationary cost pressures and wage obligations.

2.3 RISK OF JOB LOSSES AND BUSINESS CLOSURES
- The security sector employs over 700,000 guards. Increased business costs will ultimately reduce employment opportunities and increase insecurity.

2.4 IMPACT ON SMEs, YOUTH-LED FIRMS AND NEW ENTRANTS
- Equal treatment under the 1% rate disadvantages:
  - micro-businesses,
  - young entrepreneurs,
  - new firms without financial stability.

2.5 WEAK ACCOUNTABILITY MECHANISMS
- The current draft does not provide:
  - clear spending ratios,
  - annual reporting obligations,
  - transparency measures,
  - or independent oversight structures.

2.6 ENFORCEMENT AND PENALTIES RISK ABUSE
- A 3% penalty on arrears and licence consequences without clear due process creates space for selective, unfair or arbitrary enforcement.


3. RECOMMENDATIONS FOR IMPROVING THE FIDELITY LEVY FRAMEWORK

3.1 ADJUST THE LEVY TO A REASONABLE AND EVIDENCE-BASED RATE

I respectfully recommend:

OPTION A (PREFERRED):
- Reduce the levy from 1% to 0.2% of gross annual revenue.

OPTION B (IF 1% IS RETAINED):
- Apply the 1% only on net revenue (gross revenue minus guard wages and statutory deductions), or
- Apply 1% on profit before tax,
- Introduce a cap on the maximum amount payable by any firm annually.

These adjustments ensure the levy meets regulatory objectives without destabilising the sector.


3.2 PROTECT SMALL AND MEDIUM ENTERPRISES (SMEs)

To avoid harming small Kenyan-owned firms:
- Establish a turnover threshold below which the levy does not apply.
- Introduce a reduced, phased rate (e.g., 0.1% for the first 3-5 years) for small enterprises above the threshold.
- Exempt individual consultants, sole practitioners and micro-businesses below the threshold.

This supports youth employment and encourages formalisation.


3.3 STRENGTHEN GOVERNANCE AND TRANSPARENCY OF THE FIDELITY FUND

To build public trust and ensure the fund benefits the sector:

3.3.1 RING-FENCE THE USE OF FUNDS
Specify in the Regulations that:
- At least 50% of the Fund is spent directly on guard training, guard welfare, and professionalising the sector.
- Not more than 30% may go to Authority administration.
- The remaining 20% supports digitisation, research and sector improvement.

3.3.2 ESTABLISH AN INCLUSIVE BOARD OF TRUSTEES
The Board should include:
- a representative of guard associations/workers,
- an SME representative,
- a public interest governance representative.

3.3.3 MANDATORY ANNUAL REPORTING
Require:
- annual audited accounts,
- publicly available plain-language reports,
- disclosure of levy collected, expenditures, beneficiaries and sector impact.


3.4 FAIR ENFORCEMENT, PENALTIES AND DISPUTE RESOLUTION

The Regulations should introduce:
- A grace period during the first years of implementation,
- A cap on penalties (e.g., aligned with the Central Bank Rate),
- A clear appeals process,
- Prohibition of licence suspension solely on disputed levy amounts,
- Requirement for written notices before enforcement begins.

These ensure fairness and prevent misuse of power.


3.5 LINK THE LEVY TO TANGIBLE SECTOR BENEFITS

To improve legitimacy and public support:
- The Regulations should identify specific deliverables funded by the levy.

Examples include:
- subsidised guard training,
- health and safety programmes,
- development of national standardised training curricula,
- digitised compliance systems to reduce business costs.

This ensures that the levy is seen as a development tool, not just an extraction mechanism.


4. CONCLUSION

I do not oppose the existence of the Fidelity Levy or the Fidelity Fund. However, the proposed 1% on gross annual revenue poses a significant economic risk and could undermine the very sector it intends to support.

I respectfully recommend:
- reducing the levy to 0.2%,
- protecting SMEs and new entrants,
- creating a transparent and accountable fund structure,
- ensuring fair, predictable enforcement mechanisms


CLOSING STATEMENT

These recommendations are offered respectfully and with the hope that they help create a fairer, safer and more forward-looking regulatory framework. Strong regulations should protect the public, support national security and give young Kenyans pathways to use their skills productively. I believe these proposals contribute toward that goal.`;
