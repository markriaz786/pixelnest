export const site = {
  name: "Pixelnest Solutions",
  shortName: "Pixelnest",
  // Set NEXT_PUBLIC_SITE_URL once a custom domain is connected.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  tagline: "Smart design & dev for ambitious brands.",
  description:
    "Pixelnest Solutions is a startup design and development agency helping brands launch intuitive, user-centric digital products with clarity and purpose.",
  email: "hello@pixelnest.solutions",
  phone: "+1 (972) 900-8292",
  phoneHref: "tel:+19729008292",
  // The old Framer site pointed these at a template author's accounts.
  // Fill in the real profiles; empty links are hidden.
  social: [
    { label: "X / Twitter", href: "" },
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
  ],
};

export const nav = [
  { label: "Work", href: "/case-studies" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const whatIf = [
  "Your users understood your product in the first five minutes?",
  "Your dashboard gave answers, not just numbers?",
  "Your app looked as trustworthy as the team behind it?",
  "You could ship an MVP in weeks, not quarters?",
  "You had a design team on call, from big redesigns to everyday screens?",
];

export const results = [
  { text: "MoneyFlow cut user errors by 47% after its redesign", href: "/case-studies/moneyflow" },
  { text: "CaseIQ legal teams now move 32% faster through daily workflows", href: "/case-studies/caseiq" },
  { text: "Task efficiency up 36% across both products", href: "/case-studies" },
];

export const stats = [
  { value: "15", label: "Projects delivered" },
  { value: "5", label: "Startups partnered" },
  { value: "95%", label: "Client satisfaction" },
  { value: "3+", label: "Years in business" },
];

export const testimonials = [
  {
    quote: "Saved over 400 hours per month on support.",
    name: "Himaad",
    role: "Head of Design, Pixelnest",
  },
  {
    quote: "Doubled our conversion rate in 3 months.",
    name: "Sarah M.",
    role: "Marketing Manager, Mandala",
  },
  {
    quote: "50% reduction in operational costs.",
    name: "John D.",
    role: "CEO, AI Agent",
  },
];

export const services = [
  {
    title: "UI/UX Design",
    body: "Research-led interfaces for websites, web apps and mobile, balancing usability, visual clarity and business impact.",
    tags: ["UX strategy", "Wireframes", "UI design", "Prototyping"],
  },
  {
    title: "SaaS & Web App Design",
    body: "Dashboards, workflows and complex B2B and enterprise platforms, made easier to scan, learn and use every day.",
    tags: ["Dashboards", "Information architecture", "Design systems"],
  },
  {
    title: "Mobile App Design",
    body: "iOS and Android products with clear navigation, calm hierarchy and flows that build confidence at a glance.",
    tags: ["iOS", "Android", "Onboarding", "Interaction"],
  },
  {
    title: "Website Design",
    body: "Marketing sites that explain what you do in seconds and turn visitors into conversations, built in Framer, Webflow or React.",
    tags: ["Landing pages", "Framer", "Webflow"],
  },
  {
    title: "Branding",
    body: "Identity systems, logos and visual language that give a young product a confident, consistent face.",
    tags: ["Logo", "Identity", "Guidelines"],
  },
  {
    title: "UX Audit",
    body: "A clear read on what is working, what isn't and why, with prioritised fixes your team can ship.",
    tags: ["Heuristic review", "Usability testing", "Roadmap"],
  },
  {
    title: "MVP Development",
    body: "From idea to a launchable first version: validate early, design around real behaviour and ship without costly rework.",
    tags: ["MVP design", "Front-end", "Launch"],
  },
];

export const steps = [
  {
    step: "01",
    title: "Discover",
    body: "We learn your business, users and constraints, and audit what exists today.",
  },
  {
    step: "02",
    title: "Define",
    body: "Journeys, information architecture and a plan with clear milestones and scope.",
  },
  {
    step: "03",
    title: "Design",
    body: "Wireframes to high-fidelity UI and a design system that scales with the product.",
  },
  {
    step: "04",
    title: "Test & hand off",
    body: "Prototypes, usability testing and developer-ready specs, then we stay on to iterate.",
  },
];

export const stack = ["Figma", "ProtoPie", "Framer", "Webflow", "React"];

export const faqs = [
  {
    q: "What are your focus areas as a UI/UX agency?",
    a: [
      "We design user-centric digital products that balance usability, visual clarity and business impact. Our work spans websites, web and mobile applications, and complex enterprise and B2B platforms.",
      "We specialise in UX strategy, UI design, design systems and front-end collaboration, across SaaS, healthcare, enterprise software, B2B and education.",
    ],
  },
  {
    q: "What sets Pixelnest apart from other design agencies?",
    a: [
      "We aim to be a dependable design partner, not just a service provider. We set clear expectations, communicate openly and commit only to what we can deliver, so you always know where your project stands.",
      "Our team blends strong UX thinking with practical business understanding. Many of our partnerships continue beyond a single project, which we see as the strongest measure of our work.",
    ],
  },
  {
    q: "What do you offer startups, and how does it add value?",
    a: [
      "We help startups move faster from idea to traction: UX research, MVP design, wireframing, UI design, prototyping and usability testing, focused on launching quickly and iterating with confidence.",
      "Validating ideas early and designing around real user behaviour improves adoption, reduces churn and avoids unnecessary rework.",
    ],
  },
  {
    q: "Can you redesign our existing app, website or B2B software?",
    a: [
      "Yes. Every redesign starts with understanding what's working, what isn't and why. We combine user research, UX audits, information architecture, wireframing, prototyping and usability testing, working closely with your team to keep things efficient.",
    ],
  },
  {
    q: "How long does a project take?",
    a: [
      "It depends on scope and complexity. After a short discovery phase we set clear milestones and a realistic schedule. Most projects take from 2 weeks to a few months, and if scope changes we tell you early.",
    ],
  },
  {
    q: "How much does a project cost?",
    a: [
      "Pricing is tailored to each engagement and depends on research depth, product scale and collaboration needs. After discovery we send a detailed proposal with scope, milestones, timeline and investment. The model is transparent and flexible as your needs evolve.",
    ],
  },
];
