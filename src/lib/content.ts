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
