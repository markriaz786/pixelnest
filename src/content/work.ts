export type Shot = { src: string; alt: string; width: number; height: number; caption?: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  kind: string;
  role: string;
  timeline: string;
  summary: string;
  cover: Shot;
  hero?: Shot;
  hasPage: boolean;
  overview?: string[];
  scope?: { title: string; items: string[] }[];
  challenge?: { intro?: string; points: { title?: string; body: string }[]; outro?: string };
  solution?: { title: string; body: string[]; points?: string[] };
  highlight?: { title: string; body: string[] };
  gallery?: Shot[];
  results?: { value: string; label: string }[];
};

const img = (name: string, width: number, height: number, alt: string, caption?: string): Shot => ({
  src: `/images/work/${name}.jpg`,
  width,
  height,
  alt,
  caption,
});

export const caseStudies: CaseStudy[] = [
  {
    slug: "moneyflow",
    title: "MoneyFlow",
    client: "MoneyFlow",
    category: "Fintech",
    kind: "Mobile app",
    role: "Sr. Product Designer & Researcher",
    timeline: "2 months",
    summary:
      "A calmer banking app that makes everyday money tasks fast, clear and safe, rebuilt around five tabs and a single Pay & Transfer flow.",
    cover: img("moneyflow-cover", 2400, 1705, "MoneyFlow home screen on an iPhone resting on a green sofa"),
    hero: img("moneyflow-cover", 2400, 1705, "MoneyFlow home screen on an iPhone resting on a green sofa"),
    hasPage: true,
    overview: [
      "We redesigned MoneyFlow to make everyday money tasks fast, clear and safe. The new information architecture centres on five tabs: Home, Pay, Budget, Grow and Profile, with a unified Pay & Transfer flow, plain-language copy and stronger guardrails: review, fees, arrival time and undo.",
      "Accessibility and visual hierarchy were tightened to reduce cognitive load. Faster payments, higher onboarding and budget-setup rates, fewer errors and better CSAT are the measures of success.",
    ],
    challenge: {
      intro:
        "The old Home screen overwhelmed people with widgets and no clear order. Transfers were hidden, alerts were distracting and the interface felt dated. Balances and recent transactions were buried, and insights were static, with no guidance on what to do next.",
      points: [
        { body: "No clear hierarchy: people struggled to find primary actions like transfers and deposits." },
        { body: "System alerts and promo banners cluttered the screen and pulled focus from banking tasks." },
        { body: "Inconsistent colour, type and icons made the app look dated and less trustworthy." },
        { body: "Balance and transactions were buried among unrelated details, causing overload." },
        { body: "Static data with no context or guidance on what to do next." },
      ],
    },
    solution: {
      title: "A home screen that's easy to act on",
      body: [
        "The new Home feels calm and clear. Your balance sits front and centre, and Add, Send and Request are one tap away. Insights become helpful nudges instead of noise, and recent activity, cashflow trends and AI coach tips are organised so you understand your money at a glance.",
      ],
      points: [
        "A hero section shows the total balance up front, with Add, Send and Request placed for immediate access.",
        "Clean spacing and a structured layout create a strong hierarchy that's easy to scan.",
        "AI insights turn complex data into straightforward, actionable guidance.",
        "Consistent colour and modern type build trust and a cohesive feel.",
        "Streamlined navigation and quicker feedback make everyday actions smoother.",
      ],
    },
    highlight: {
      title: "Homepage overview",
      body: [
        "Home gives a quick, clear snapshot of your money: the main balance at the top, with one-tap actions to add, send or request funds.",
        "The AI Coach offers personalised tips to help you stay on track and avoid shortfalls. Recent activity shows where money is going, Cashflow Insights highlight spending patterns and upcoming income, and smart alerts give gentle, timely guidance.",
      ],
    },
    gallery: [
      img("moneyflow-screens", 2400, 1705, "Grid of MoneyFlow screens: home, accounts, AI coach and wealth", "Core screens"),
      img("moneyflow-onboarding", 2400, 2062, "MoneyFlow onboarding flow: goals, account connection and setup", "Simplified onboarding"),
      img("moneyflow-home-annotated", 2246, 2800, "Annotated MoneyFlow home screen explaining each module", "Homepage, annotated"),
      img("moneyflow-ai-coach", 2400, 1705, "MoneyFlow AI Financial Coach screen on a phone among dark rocks", "AI Financial Coach"),
      img("moneyflow-bento", 2400, 1956, "MoneyFlow UI cards: balance, accounts, insights and activity", "UI components"),
      img("moneyflow-design-system", 2400, 1695, "MoneyFlow design system components and Figma variables", "Design system"),
      img("moneyflow-typography", 2400, 1307, "Euclid Square typeface specimen used in MoneyFlow", "Typography"),
    ],
    results: [
      { value: "28%", label: "Navigation clarity" },
      { value: "−47%", label: "Errors" },
      { value: "+36%", label: "Task efficiency" },
    ],
  },
  {
    slug: "caseiq",
    title: "CaseIQ",
    client: "CaseIQ",
    category: "Legal tech",
    kind: "SaaS web app",
    role: "Sr. Product Designer & Researcher",
    timeline: "5 months",
    summary:
      "An end-to-end law firm management platform for attorneys, paralegals and operations teams, redesigned into a calm command centre for matters, billing and performance.",
    cover: img("caseiq-cover", 2400, 2000, "CaseIQ dashboard on an iPad propped on a bed"),
    hero: img("caseiq-laptop", 2400, 2000, "CaseIQ dashboard on a laptop by a window"),
    hasPage: true,
    overview: [
      "CaseIQ is an end-to-end law firm management platform used by attorneys, paralegals and operations teams to manage matters, billing, communication and performance. The goal was a modern, intuitive and scalable system with real-time visibility and efficient workflows.",
      "The redesign focuses on the high-traffic screens (Dashboard, Intake, Matter Details, Email and Billing), with a unified design language, clearer hierarchy and smoother navigation. The result feels lighter, smarter and closer to how legal teams actually work.",
    ],
    scope: [
      {
        title: "Research & benchmarking",
        items: [
          "Studied leading legal-tech tools (Clio, MyCase, PracticePanther, RocketMatter) for dashboards, matter management, timekeeping and invoicing.",
          "Ran a heuristic evaluation of the existing CaseIQ experience.",
        ],
      },
      {
        title: "UX strategy & IA",
        items: [
          "Mapped journeys for attorneys, paralegals and billing specialists.",
          "Reorganised navigation for faster access to high-value actions.",
          "Simplified matter workflows and billing data flows.",
        ],
      },
      {
        title: "UI/UX redesign",
        items: [
          "Built a modular design system with scalable components.",
          "Redesigned Dashboard, Intake Board, Matter Details and Billing.",
          "Introduced visual analytics, cleaner layouts and consistent spacing and type.",
        ],
      },
      {
        title: "Interaction & prototype",
        items: [
          "Interactive prototypes with better cards, tabs, filters and lists.",
          "Designed empty, loading, error, quick-action and inline states.",
        ],
      },
      {
        title: "Handoff & documentation",
        items: [
          "Annotated wireframes, component guidelines and developer-ready specs.",
          "Recommendations for next iterations: AI summaries, smart intake and automated analytics.",
        ],
      },
    ],
    challenge: {
      intro: "Firms rely on CaseIQ for daily operations, but the old interface got in the way:",
      points: [
        {
          title: "Cluttered density",
          body: "Dense layouts and inconsistent spacing made financial summaries, matters and email threads hard to scan.",
        },
        {
          title: "Fragmented flows",
          body: "Intake, matter management and billing felt disconnected, adding clicks and cognitive load.",
        },
        {
          title: "No actionable insight",
          body: "Dashboards showed raw metrics without context, limiting decisions for partners and administrators.",
        },
        {
          title: "Dated UI",
          body: "Weak hierarchy, contrast and polish made onboarding harder for new users.",
        },
        {
          title: "Complex billing",
          body: "Financial screens lacked structure, so tracking balances and payment status was difficult.",
        },
      ],
      outro:
        "The challenge was to rebuild the experience without disrupting existing workflows, while making the system easier, faster and more insightful for everyday legal work.",
    },
    highlight: {
      title: "Dashboard overview",
      body: [
        "The new dashboard is the firm's command centre. Performance, billable hours, revenue and inbox tasks sit in structured, easy-to-scan modules, each focused on a single KPI, supported by subtle financial indicators and clear charts.",
        "Recent Matters is streamlined with cleaner tags, avatars and quick actions so attorneys can resume work in seconds, and forecasting visuals help partners make strategic decisions.",
      ],
    },
    gallery: [
      img("caseiq-overview", 2400, 1800, "Overview of CaseIQ screens: dashboard, intake, matter details and billing", "Key screens"),
      img("caseiq-dashboard", 2400, 1800, "CaseIQ dashboard with practice areas, billable hours, revenue and invoices", "Dashboard"),
      img("caseiq-billing", 2400, 2000, "CaseIQ billing screen on an iPad", "Billing"),
      img("caseiq-brand", 2400, 1686, "CaseIQ marketing and brand visuals with financial performance chart", "Brand touchpoints"),
      img("caseiq-in-use", 1860, 1184, "Man using a tablet with CaseIQ charts floating beside him", "In use"),
      img("caseiq-tokens", 2400, 1557, "CaseIQ design tokens and text styles in Figma", "Design tokens"),
      img("caseiq-typography", 2400, 1880, "Geist typeface specimen used in CaseIQ", "Typography"),
    ],
    results: [
      { value: "+32%", label: "Workflow speed" },
      { value: "−41%", label: "User errors" },
      { value: "+36%", label: "Task efficiency" },
    ],
  },
  {
    slug: "ai-food-tracker",
    title: "AI Food Tracker",
    client: "Concept",
    category: "Health",
    kind: "Mobile app",
    role: "Product design",
    timeline: "",
    summary:
      "An AI-powered nutrition and health tracker that makes daily food logging effortless, personalised and motivating.",
    cover: img("food-cover", 2400, 1705, "AI food tracking app home screen on an iPhone over blue textured fabric"),
    hasPage: false,
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
