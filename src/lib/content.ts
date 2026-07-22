import {
  Award,
  Briefcase,
  Building2,
  Compass,
  FileText,
  Gavel,
  Heart,
  Home,
  Lightbulb,
  LineChart,
  Lock,
  MessageSquare,
  Scale,
  Shield,
  User,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

/**
 * Single source of truth for every fact on the site. Pages compose from this —
 * nothing declares its own copy locally, so the brief can be updated in one place.
 */

export const site = {
  name: "Tide Global",
  division: "Private Client Services",
  tagline: "Boutique private client immigration advisory",
  phone: "+27 82 502 2162",
  phoneHref: "tel:+27825022162",
  address: {
    line1: "173 Oxford Road",
    city: "Johannesburg",
    postal: "2196 GP",
    country: "South Africa",
  },
  hours: "Monday – Friday · 08:00 – 17:00 SAST",
  emails: {
    privateClients: "privateclients@tide-global.com",
    general: "info@tide-global.com",
    ceo: "ceo@tide-global.com",
    support: "support@tide-global.com",
    accounts: "accounts@tide-global.com",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/tideglobalhq",
    instagram: "https://www.instagram.com/tideglobalhq",
    facebook: "https://www.facebook.com/tideglobalhq",
  },
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/experience", label: "The Experience" },
  { href: "/why-tide-global", label: "Why Tide Global" },
  { href: "/insights", label: "Insights" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

/** The mission and vision, verbatim from the brand brief. */
export const mission =
  "To deliver world-class private client immigration advisory services through strategic expertise, exceptional service, discretion and personalised case management, enabling clients to pursue global opportunities with confidence.";

export const vision =
  "To become Africa's leading private client immigration advisory firm, recognised internationally for excellence, integrity, innovation and trusted relationships with discerning individuals, families and global investors.";

export const values = [
  "Excellence",
  "Integrity",
  "Professionalism",
  "Confidentiality",
  "Precision",
  "Client-Centric Service",
  "Accountability",
  "Respect",
  "Innovation",
  "Trust",
] as const;

/** The eleven core practice areas. Order is deliberate: residence, then work, then remedy. */
export const services = [
  {
    slug: "financial-independence",
    title: "Financial Independence Permanent Residence",
    icon: LineChart,
    summary:
      "Permanent residence for individuals who can demonstrate the prescribed net worth, structured to protect capital and timing.",
    detail:
      "The most direct route to South African permanent residence for high-net-worth individuals. We assess eligibility against the net-worth threshold, coordinate the asset verification your application must withstand, and sequence the submission so it aligns with your wider financial and tax planning.",
  },
  {
    slug: "business-visas",
    title: "Business Visas",
    icon: Briefcase,
    summary:
      "Residence tied to establishing or investing in a South African business, advised from the commercial case outward.",
    detail:
      "For investors and entrepreneurs establishing operations in South Africa. The immigration application and the commercial substance behind it have to agree with each other; we build both together, covering the capital contribution, the business plan and the undertakings your visa will bind you to.",
  },
  {
    slug: "critical-skills",
    title: "Critical Skills Work Visas",
    icon: Award,
    summary:
      "Work authorisation for professionals whose qualifications fall within the published critical skills categories.",
    detail:
      "For senior professionals whose expertise appears on the critical skills list. The work is largely evidentiary — professional body registration, qualification evaluation and demonstrating that your experience matches the category as it is actually interpreted.",
  },
  {
    slug: "retired-persons",
    title: "Retired Persons Visas",
    icon: User,
    summary:
      "Long-term residence for retirees able to demonstrate a qualifying pension or net-worth position.",
    detail:
      "A lifestyle-led route for affluent retirees. Eligibility can be established through either guaranteed income or asset position, and the choice between them has consequences for renewal and for the permanent residence route that may follow.",
  },
  {
    slug: "executive-relocation",
    title: "Executive Relocation",
    icon: Building2,
    summary:
      "Coordinated relocation for senior executives and their families, run as a single case rather than parallel applications.",
    detail:
      "Moving an executive means moving a household. We run the principal's authorisation and the accompanying family's applications as one coordinated case, sequenced around a start date that usually cannot move.",
  },
  {
    slug: "family-immigration",
    title: "Family Immigration",
    icon: Users,
    summary:
      "Spousal, dependant and relative applications, planned around the family's long-term position rather than one permit.",
    detail:
      "Family applications are rarely a single transaction. We plan the household's position over time — how each member's status is established, when it renews, and how it converts toward permanent residence.",
  },
  {
    slug: "permanent-residence",
    title: "Permanent Residence Advisory",
    icon: Home,
    summary:
      "End-to-end advisory across every permanent residence category, from route selection to submission.",
    detail:
      "Several routes to permanent residence may be open to you at once, and they are not equivalent in duration, evidentiary burden or risk. The advisory work is choosing correctly before anything is filed.",
  },
  {
    slug: "remediation",
    title: "Immigration Remediation",
    icon: Scale,
    summary:
      "Specialist intervention for complex, stalled or previously refused matters.",
    detail:
      "For cases that have gone wrong elsewhere. We establish what actually caused the position — which is frequently not what the correspondence says — and advise on whether it can be cured, appealed or must be restructured.",
  },
  {
    slug: "overstay-appeals",
    title: "Overstay Appeals",
    icon: Gavel,
    summary:
      "Representation against undesirability declarations arising from overstay.",
    detail:
      "An overstay declaration carries a ban with a fixed duration and immediate travel consequences. These matters are time-sensitive: the available grounds narrow as the deadline passes, so the first assessment is the one that matters.",
  },
  {
    slug: "prohibition-appeals",
    title: "Prohibition Appeals",
    icon: Shield,
    summary:
      "Representation for prohibited person declarations and the removal of that status.",
    detail:
      "A prohibition is the most severe adverse status in the system and it does not lapse on its own. Representation means building the evidentiary record for its removal and pursuing it through the correct channel.",
  },
  {
    slug: "waivers",
    title: "Waiver Applications",
    icon: FileText,
    summary:
      "Ministerial waiver applications where a prescribed requirement cannot be met on its terms.",
    detail:
      "Where a requirement cannot be met as written, a waiver asks for it to be dispensed with. These are discretionary and are won on the strength of the motivation — which is a drafting exercise before it is an administrative one.",
  },
] as const;

/** The nine competitive advantages from the brief. */
export const advantages = [
  {
    title: "A dedicated relationship manager",
    icon: UserCheck,
    body: "One named person who knows your matter, reachable directly. Not a ticket queue and not a different voice each time you call.",
  },
  {
    title: "Concierge-style management",
    icon: Compass,
    body: "We carry the case end to end — the forms, the appointments, the follow-ups, the correspondence. What reaches you is a decision to make, not an errand to run.",
  },
  {
    title: "Specialist-led expertise",
    icon: Award,
    body: "Complex South African immigration matters, advised by people who work on them daily rather than occasionally.",
  },
  {
    title: "Strategy before process",
    icon: Lightbulb,
    body: "The route you take is chosen against your circumstances and objectives. Generic applications are the reason most matters take longer than they should.",
  },
  {
    title: "Technology-enabled execution",
    icon: Zap,
    body: "Structured case management so nothing depends on someone remembering it, and so your file's position is always current.",
  },
  {
    title: "Premium communication",
    icon: MessageSquare,
    body: "You are told where the matter stands before you have to ask, including when the news is that nothing has moved.",
  },
  {
    title: "Absolute confidentiality",
    icon: Lock,
    body: "Discretion is structural here, not a promise. Access to your file is limited to the people working on it.",
  },
  {
    title: "Built around your circumstances",
    icon: Heart,
    body: "A boutique practice takes on a limited number of matters, which is what makes genuinely personalised service possible.",
  },
  {
    title: "Protection of time and capital",
    icon: Shield,
    body: "Our work is measured against what your time and opportunity are worth, not against the number of forms filed.",
  },
] as const;

/** Client profiles the practice is built for. */
export const audiences = [
  {
    title: "High-Net-Worth Individuals",
    icon: UserCheck,
    body: "Residence solutions for the globally mobile, structured around existing affairs.",
  },
  {
    title: "Ultra-High-Net-Worth Individuals",
    icon: User,
    body: "Private immigration planning where discretion is the first requirement.",
  },
  {
    title: "Investors",
    icon: LineChart,
    body: "Residence pathways aligned to the investment case rather than bolted onto it.",
  },
  {
    title: "Entrepreneurs & Business Owners",
    icon: Briefcase,
    body: "Immigration that supports the commercial opportunity and its timetable.",
  },
  {
    title: "Corporate Executives",
    icon: Building2,
    body: "Executive relocation and the family transition that comes with it.",
  },
  {
    title: "Skilled Professionals",
    icon: Award,
    body: "Career-led routes for those whose expertise the country is seeking.",
  },
  {
    title: "Affluent Retirees",
    icon: Home,
    body: "Lifestyle-led residence with the long view taken from the start.",
  },
  {
    title: "International Families & Family Offices",
    icon: Users,
    body: "Multi-generational planning across jurisdictions and timelines.",
  },
] as const;

export const professions = [
  "CEOs",
  "Company Directors",
  "Entrepreneurs",
  "Investors",
  "Doctors",
  "Engineers",
  "Attorneys",
  "Executives",
  "Consultants",
  "Retirees",
] as const;

/** Markets the practice actively serves, grouped as briefed. */
export const markets = {
  domestic: ["South Africa"],
  international: [
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "United Arab Emirates",
    "European Union",
    "India",
    "China",
    "Mauritius",
  ],
  regional: ["Nigeria", "Kenya", "Zimbabwe", "Botswana", "Namibia", "Zambia"],
} as const;

/** The private client journey — six stages, used on the homepage and /experience. */
export const journey = [
  {
    title: "Confidential enquiry",
    body: "A private conversation, under no obligation, to understand what you are trying to achieve and by when. Nothing is filed and no fee is engaged at this stage.",
  },
  {
    title: "Strategic assessment",
    body: "We test your circumstances against every route genuinely open to you and tell you which are viable — including, where it applies, that none are.",
  },
  {
    title: "Tailored strategy",
    body: "You receive a written strategy: the recommended route, the reasoning against the alternatives, the evidentiary burden, the realistic timeline and the risks.",
  },
  {
    title: "Preparation & documentation",
    body: "Your relationship manager assembles the file. Documents are obtained, verified, translated and legalised, and the record is built to withstand scrutiny before it is submitted.",
  },
  {
    title: "Submission & case management",
    body: "We submit, we manage the matter through the authority, and we pursue it. You are updated on a defined rhythm rather than on request.",
  },
  {
    title: "Outcome & beyond",
    body: "Approval is a milestone, not the end. Renewals, conversions to permanent residence and the family's position are tracked and raised with you before they become urgent.",
  },
] as const;

export const faqs = [
  {
    q: "What makes Tide Global different from a conventional immigration consultancy?",
    a: "Volume. Conventional consultancies process applications at scale, which is a legitimate model and the reason their service is standardised. We are a boutique practice that takes on a limited number of matters, each led by a named relationship manager, and we advise on strategy before we execute process. If your matter is straightforward and price is the deciding factor, a volume consultancy will serve you well and we will say so.",
  },
  {
    q: "Who do you work with?",
    a: "High-net-worth and ultra-high-net-worth individuals, investors, business owners, senior executives, skilled professionals, affluent retirees and international families — typically those for whom the cost of a delayed or misjudged application substantially exceeds the cost of advice.",
  },
  {
    q: "Is the first consultation confidential?",
    a: "Yes, and it is confidential from the first contact. Everything you disclose is held in confidence whether or not you go on to instruct us, and access to your matter is limited to the people working on it.",
  },
  {
    q: "How long does an application take?",
    a: "It depends on the category, the completeness of your evidence and the authority's processing position at the time — and any firm that gives you a number before reading your file is guessing. Your written strategy sets out a realistic timeline for your specific matter, with the factors that could move it.",
  },
  {
    q: "How are your fees structured?",
    a: "Professional fees are quoted for the specific matter after the strategic assessment, so you are never asked to commit to a number before we understand the work. Fees are agreed in writing before any work begins, and disbursements are itemised separately.",
  },
  {
    q: "Can you assist if my application was refused elsewhere?",
    a: "Frequently, yes. Refusals, overstay declarations and prohibitions are a core part of the practice. These matters are time-sensitive — the grounds available to you narrow as deadlines pass — so the sooner it is assessed, the more of them remain open.",
  },
  {
    q: "Do you work with clients outside South Africa?",
    a: "The majority of our clients instruct us from abroad. The practice is built to run remotely: the strategy, the document build and the case management do not require your presence, and we tell you in advance the few points at which it is genuinely needed.",
  },
  {
    q: "Do you guarantee an outcome?",
    a: "No, and neither can anyone else — the decision rests with the authority. What we control is the strength of the record, the choice of route and the conduct of the matter. If we do not believe your application should succeed, we will tell you before you spend money on it.",
  },
] as const;

/** Editorial programme for /insights. No pieces are published yet — this is the plan. */
export const insightTopics = [
  {
    title: "Residence & Permanent Residence",
    body: "Route selection, the net-worth and income thresholds, and how the permanent residence categories differ in practice from how they read.",
  },
  {
    title: "Investment & Business Immigration",
    body: "Structuring the commercial case behind a business visa, and the undertakings that follow the approval.",
  },
  {
    title: "Executive & Corporate Mobility",
    body: "Moving senior people and their households on a timetable that will not move.",
  },
  {
    title: "Appeals, Waivers & Remediation",
    body: "What can be cured, what must be appealed, and how quickly the available grounds close.",
  },
  {
    title: "Regulatory Change",
    body: "Amendments to South African immigration legislation and published policy, and what they mean for matters already in progress.",
  },
  {
    title: "Private Client Perspectives",
    body: "Discretion, family governance and long-horizon planning across jurisdictions.",
  },
] as const;

export const articles = [
  {
    slug: "how-to-ensure-a-direct-hassle-free-visa-application",
    title: "How To Ensure A Direct, Hassle-Free Visa Application",
    excerpt: "Practical guidance for applicants balancing timing, evidence and route selection — before a single form is filed.",
    content: `A visa application is not a form. It is a case, and the adjudicator reading it will approach it with the same critical distance as a judicial officer reviewing a set of affidavits. The document you submit is your only opportunity to speak directly to that officer, and it must do so without ambiguity.

## Route Selection Comes Before Everything

The most common error we observe is not a missing document or a misfiled form — it is the wrong route. Applicants frequently pursue the most obvious category, or the one a colleague used, without testing their own circumstances against every option available to them. A route that was correct three years ago may carry materially different risk today, particularly where policy interpretation has shifted without a formal amendment.

Before you prepare anything, establish clearly which categories are genuinely open to you, what evidentiary burden each carries, and what the realistic processing timeline and risk profile looks like. This is not a five-minute exercise, and it is not one to delegate to a checklist.

## Evidence Is the Argument

An authority adjudicating an immigration matter does not give you the benefit of the doubt. It gives weight to evidence. That evidence must be:

- **Unambiguous** — if a document requires interpretation, provide the interpretation yourself, with support
- **Corroborated** — a single uncorroborated statement is treated with appropriate scepticism
- **Complete** — missing supporting documents are not overlooked; they are treated as absent fact

The file you submit must anticipate the questions an adjudicator would ask and answer them before they are raised. This is editorial work, not administrative work.

## Timing Is a Strategic Variable

Authorities move at their own pace, and their processing positions change. Submitting an application into a queue that is known to be operating outside of the statutory timeframes, without understanding the implications for your situation, is a planning failure, not an act of good faith.

Beyond processing timelines, the regulatory environment shifts. An application that would have succeeded under policy guidance published twelve months ago may face a different standard today. Knowing where the regulatory risk sits in the filing cycle is the difference between a timely, well-positioned submission and one that arrives precisely when policy uncertainty is highest.

## What You Control

The authority's decision is not yours to make. What is yours is the quality of the record you present — the route you select, the evidence you assemble, and the moment you choose to file. A strong file does not guarantee approval; but a weak one makes refusal almost inevitable.`,
    date: "March 15, 2026",
    readTime: "4 min read",
    author: "Tide Global Advisory",
    image: "/ph8.png",
    category: "Immigration Strategy",
    featured: true,
  },
  {
    slug: "structuring-a-long-term-study-pathway",
    title: "Structuring A Long-Term Study Pathway",
    excerpt: "How to structure a long-term study pathway with fewer surprises at the border — from first visa to post-graduate status.",
    content: `International education is a significant investment — not just financially, but in terms of future global mobility. A student visa should be viewed not as a temporary pass, but as the foundation of a long-term strategy. The decisions made before and during the study period materially shape what is possible at its conclusion.

## Start With the End in Mind

The most common mistake is treating a student visa as a discrete event rather than a step in a sequence. The question to answer before applying is not "how do I get this visa?" but "where does this visa need to leave me in four years?" The answer to that question changes everything — the institution you select, the course of study, the jurisdiction, and how you document your period of residence.

## Maintaining Continuous Compliance

Students are subject to ongoing compliance obligations that extend well beyond the initial visa grant. Changes in course load, institution, or personal circumstances often carry reporting obligations that, if ignored, can compromise not just the current visa but future applications in the same or different jurisdictions.

Compliance is not a burden to be managed. It is the foundation on which a subsequent application is built. An adjudicator reviewing a post-study work or skilled migrant application will look at how the applicant conducted themselves during the study period. A clean record is not a bonus — it is the minimum.

## Transition Planning

The transition from student to post-graduate status is frequently the most complex point in the pathway. Deadlines are short, requirements are specific, and in many jurisdictions, the window for application is fixed and unforgiving. Leaving this to the final weeks of the study visa is leaving it too late.

Effective transition planning begins at least twelve months before the end of the study period — reviewing the available routes, identifying the evidentiary requirements, and assembling the record progressively rather than under pressure.

## For Families and Dependants

Where a student is accompanied by a spouse or dependants, their status must be independently managed. Dependant visas frequently carry conditions that restrict employment or study, and those conditions need to be understood and actively managed throughout the primary applicant's programme.`,
    date: "April 02, 2026",
    readTime: "5 min read",
    author: "Tide Global Advisory",
    image: "/ph6.png",
    category: "Study & Education",
    featured: false,
  },
  {
    slug: "corporate-executive-relocation-best-practices",
    title: "Best Practices in Corporate Executive Relocation",
    excerpt: "Ensuring a smooth transition for senior leadership and their families — beyond the visa.",
    content: `Relocating an executive is a high-stakes endeavor. It requires meticulous planning to ensure that both the corporate objective and the executive's personal transition are successful. The visa is the smallest part of the problem.

## The Corporate Objective and the Personal Transition

When a corporate relocation fails, it is rarely because the visa was refused. It is because the executive could not function effectively in the new environment — because the family was unsettled, because the local compliance environment was misunderstood, or because the cultural assumptions the executive brought with them proved incorrect.

Addressing these factors is not a pastoral exercise. It is a material business risk, and it should be managed with the same rigour as the commercial case for the assignment.

## Immigration as an Enabling Function

The work authorisation process should be managed in parallel with the broader relocation — not ahead of it and not after it. A work permit that arrives two months after the executive was expected on the ground is a two-month operational failure, regardless of its ultimate outcome.

This requires close coordination between the immigration team, the HR function, the executive, and in many cases the receiving business unit. The timeline must be driven by the business need, not by the default processing schedule of the relevant authority.

## Boardroom Readiness

Incoming leadership in South Africa faces a specific set of contextual requirements. The governance framework, the B-BBEE compliance environment, and the stakeholder dynamics of South African business require deliberate preparation.

We provide structured briefings to equip incoming executives with the contextual knowledge they need to lead with credibility from their first week. This is not cultural sensitivity training — it is operational intelligence.

## Family Integration

An executive assignment that the family does not support will not succeed. Spousal visas, schooling, healthcare, social infrastructure — each requires active management. Our integrated approach treats the family unit as a single case rather than managing its members in isolation.`,
    date: "May 18, 2026",
    readTime: "6 min read",
    author: "Tide Global Advisory",
    image: "/ph5.png",
    category: "Corporate",
    featured: false,
  },
  {
    slug: "permanent-residence-route-selection",
    title: "Permanent Residence Route Selection in South Africa",
    excerpt: "Several routes to permanent residence may be open to you simultaneously — and they are not equivalent. Here is how to choose correctly.",
    content: `South Africa maintains several permanent residence categories that can appear, from the outside, to lead to the same destination. They do not. The route you select determines the evidentiary burden you will face, the timeline you are committing to, and the risk you are carrying — and selecting incorrectly does not just delay your outcome, it can foreclose better options.

## The Routes

The principal routes available to high-net-worth individuals, investors and skilled professionals include:

- **Financial Independence** — permanent residence based on demonstrable net worth and the capacity to support yourself without recourse to the South African labour market
- **Business Permit Conversion** — permanent residence following a defined period of holding an approved business permit
- **Critical Skills** — permanent residence for holders of skills formally designated as critical, subject to regulatory interpretation of the categories
- **Spousal and Relative Permits** — family formation routes, each with their own conditions and post-approval obligations

The categories are not interchangeable, and the evidentiary requirements for each are substantively different.

## Why Route Selection Is Strategic Work

An application submitted into the wrong category does not simply fail — it creates a record that may affect the subsequent application in the correct category. Refusals are disclosed in future applications and may be used to question credibility. Selecting the right route the first time is not just efficient; it is protective.

The correct route is the one that fits your actual circumstances as they exist today, not as they might be characterised most favourably. The evidentiary burden is real, and an adjudicator will look behind the presentation to the underlying facts.

## Timing and Policy Risk

Permanent residence policy has been subject to regulatory change and interpretation shifts over the past decade. A route that was straightforward under a previous policy interpretation may carry additional risk under the current one.

Filing without an assessment of where the regulatory risk sits is filing blind. The assessment is the work; the application is the output.`,
    date: "June 05, 2026",
    readTime: "7 min read",
    author: "Tide Global Advisory",
    image: "/ph4.png",
    category: "Permanent Residence",
    featured: true,
  },
  {
    slug: "overstay-declarations-understanding-your-position",
    title: "Overstay Declarations: Understanding Your Legal Position",
    excerpt: "An overstay declaration carries a ban with a fixed duration and immediate travel consequences. The first assessment is the one that matters.",
    content: `An overstay declaration is not an administrative inconvenience. It is a formal legal determination that carries a ban of defined duration, takes immediate effect at the border, and narrows the grounds available to you with every week that passes without action.

## What an Overstay Declaration Does

When the Department of Home Affairs declares a foreign national to be an overstay, the consequences are immediate and automatic. The individual is declared undesirable — a status that activates a prohibition on re-entry for a fixed period, typically between one and five years depending on the duration of the overstay.

The declaration also appears on the individual's travel record and is visible to border officials at point of entry to South Africa. Attempting to enter while a prohibition is in force is itself an offence.

## The Grounds for Remedy Narrow Over Time

This is the point that most people do not understand until it is too late: the legal grounds on which an undesirability declaration can be challenged are not fixed. They narrow as time passes and as procedural deadlines expire.

Some grounds are available only within a specific window after the declaration is made. Once that window closes, the ground is gone, regardless of its merit. Acting quickly is not a matter of urgency for its own sake — it is a matter of preserving the options that remain.

## What Can Be Done

Depending on the circumstances, the following may be available:

- **Waiver application** — a formal request to the Director-General for a waiver of the prohibition on grounds that a statutory ground exists
- **Appeal to the Standing Committee** — available where a formal refusal or removal has occurred
- **Review in the High Court** — where administrative action is unreasonable or procedurally defective

The availability and prospects of each depend entirely on the specific facts, the duration of the overstay, and the timing of the approach.

## Why the First Assessment Matters

The assessment of your position is the most important step. It determines what is available to you, what the prospects of each option are, and in what order they should be pursued. A poorly framed initial approach can close grounds that would otherwise have remained open.

If you are in this position, the question to answer first is not "how do I solve this?" but "what is my actual position?" The two answers may point in different directions.`,
    date: "June 22, 2026",
    readTime: "8 min read",
    author: "Tide Global Advisory",
    image: "/ph2.png",
    category: "Remediation",
    featured: false,
  },
  {
    slug: "financial-independence-permit-what-it-actually-requires",
    title: "The Financial Independence Permit: What It Actually Requires",
    excerpt: "Permanent residence based on net worth is one of South Africa's most misunderstood categories. Here is what the process actually involves.",
    content: `The Financial Independence permanent residence category is, in theory, straightforward: demonstrate that you have sufficient net worth to support yourself and your dependants without working in South Africa, and permanent residence is available to you. In practice, the category is one of the most technically demanding in the South African immigration regime.

## The Net Worth Threshold

The prescribed minimum net worth for the Financial Independence permit is revised periodically. At the time of publication, applicants must demonstrate a minimum threshold which the Department assesses against independently verified evidence. The threshold is not a ceiling — the Department has discretion to require a higher showing where the circumstances of the applicant suggest that the minimum may not be sufficient.

## What "Demonstrating" Net Worth Means

The requirement is not to state your net worth. It is to demonstrate it to a standard that satisfies an adjudicator who has no reason to take your assertion at face value. This means:

- **Independent financial statements** prepared by a registered auditor
- **Asset schedules** that are verifiable against registered title, brokerage records, or bank statements
- **Liability disclosures** — the threshold is net worth, not gross assets
- **Liquidity evidence** — where assets are illiquid, the Department may require evidence of access to liquid capital for day-to-day expenses

A declaration of net worth without supporting documentation is not evidence. It is an invitation to scrutiny.

## The Undertaking Not to Work

The permit is conditioned on the applicant not taking employment in South Africa. This is a genuine restriction — it is not merely a declaration, and it is enforced. Applicants who intend to establish or participate in a business in South Africa need to consider whether the Financial Independence route is the correct one, or whether the business permit categories better serve their circumstances.

## Processing

Processing times for this category have been variable. Applicants should plan their affairs on the basis of the current processing position, not the statutory timeframe, and should understand that interim status management during the processing period requires active attention.`,
    date: "July 10, 2026",
    readTime: "6 min read",
    author: "Tide Global Advisory",
    image: "/ph1.png",
    category: "Permanent Residence",
    featured: false,
  },
] as const;
