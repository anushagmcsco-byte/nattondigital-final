import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  TrendingUp, 
  ArrowRight, 
  Check, 
  X, 
  Users, 
  Layers, 
  Workflow, 
  Search, 
  Activity, 
  Database, 
  Globe, 
  MessageSquare, 
  Phone, 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  Cloud, 
  HelpCircle, 
  CheckCircle, 
  FileText, 
  Briefcase, 
  Send,
  Zap,
  BarChart,
  Code
} from 'lucide-react';
import { RoutePath } from '../types';

interface WhyNattonDigitalProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function WhyNattonDigital({ setPath, darkMode }: WhyNattonDigitalProps) {
  // Navigation callback or scroll reference
  const formRef = useRef<HTMLDivElement>(null);
  
  // State for active comparison filter
  const [activeTab, setActiveTab] = useState<'strategy' | 'marketing' | 'crm' | 'automation' | 'agents' | 'analytics' | 'optimization' | 'scalability'>('strategy');

  // State for Case Studies Carousel
  const [activeCase, setActiveCase] = useState<number>(0);

  // State for Global Map Region Highlight
  const [selectedRegion, setSelectedRegion] = useState<string>('India');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // State for FAQ Accordion (Supports multiple open but let's toggle index)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // State for the process horizontal timeline
  const [activeStep, setActiveStep] = useState<number>(0);

  // Form states
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    industry: 'Healthcare',
    country: 'India',
    email: '',
    phone: '',
    goals: '',
    challenges: '',
    revenue: '$10k - $50k / month',
    message: ''
  });

  // Count up animation state simulation
  const [counts, setCounts] = useState({
    projects: 12,
    conversations: 0.8,
    leads: 8,
    industries: 2,
    uptime: 99.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        projects: prev.projects < 100 ? prev.projects + 4 : 100,
        conversations: prev.conversations < 10.0 ? Math.min(10.0, prev.conversations + 0.4) : 10.0,
        leads: prev.leads < 100 ? prev.leads + 3 : 100,
        industries: prev.industries < 6 ? prev.industries + 1 : 6,
        uptime: prev.uptime < 99.98 ? Math.min(99.98, prev.uptime + 0.01) : 99.98
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const comparisons = [
    {
      id: 'strategy',
      title: 'Strategy & Architecture',
      traditional: 'Cookie-cutter static PDFs and template ideas with zero actual code execution.',
      vendor: 'Rigid standard setups designed only for their specialized system features.',
      freelancers: 'Ad-hoc script writing with no high-level business logic integration.',
      natton: 'Sovereign custom architectural blueprints mapped directly to your financial growth goals.'
    },
    {
      id: 'marketing',
      title: 'AI Marketing & Funnels',
      traditional: 'Manual social media postings, basic stock images, and unoptimized keyword bidding.',
      vendor: 'Feature-limited newsletter automation tools that fail with modern AI-first search systems.',
      freelancers: 'Inconsistent static copywriting lacking structured algorithmic testing.',
      natton: 'Autonomous LLM-generated campaigns, dynamic ad creative rotation, and high-converting funnel hooks.'
    },
    {
      id: 'crm',
      title: 'CRM Pipelines',
      traditional: 'Unorganized Excel records or poorly configured basic CRM accounts with manual data entry.',
      vendor: 'Locked proprietary software silos requiring expensive developer seats to extract data.',
      freelancers: 'Rudimentary custom fields lacking real-time data syncs or trigger logic.',
      natton: 'Full scale GoHighLevel configurations featuring multi-channel automated calendar bookings.'
    },
    {
      id: 'automation',
      title: 'Core Workflow Automation',
      traditional: 'Over-reliance on slow manual labor or buggy spreadsheets prone to critical human error.',
      vendor: 'Standard triggers restricted to their proprietary product, ignoring external SaaS hubs.',
      freelancers: 'Unsecured, undocumented personal Zapier accounts with low security standards.',
      natton: 'Advanced self-healing n8n webhook nodes connecting all SaaS systems seamlessly with high security.'
    },
    {
      id: 'agents',
      title: 'Autonomous AI Agents',
      traditional: 'No capability. All inquiries must wait hours for a human representative.',
      vendor: 'Basic rule-based if/else chat buttons that frustrate users and drop leads.',
      freelancers: 'Simple API wrappers that crash under heavy production volume.',
      natton: 'Sovereign conversational agents and voice bots executing actual system queries in milliseconds.'
    },
    {
      id: 'analytics',
      title: 'Impact Analytics & AEO',
      traditional: 'Vague visual summaries with vanity metrics like page views and impressions.',
      vendor: 'Dashboard panels restricted to internal tracking with no third-party context.',
      freelancers: 'Basic GA4 setup lacking real attribution pipelines.',
      natton: 'Full transparent diagnostics tracking customer cost reduction and exact ROI expansion.'
    },
    {
      id: 'optimization',
      title: 'Ongoing Optimization',
      traditional: 'Extra hourly fees for basic modifications, with passive support wait times.',
      vendor: 'Self-serve ticket queues with slow boilerplate responses.',
      freelancers: 'Unpredictable availability, risk of abandonment, and lack of code comments.',
      natton: 'Fractional Chief AI Officers conducting regular audit scores and upgrading models weekly.'
    },
    {
      id: 'scalability',
      title: 'Enterprise Scalability',
      traditional: 'Stagnates with human count. Scaling requires hiring massive customer service teams.',
      vendor: 'Exponential billing tiers based on record counts, punishing corporate expansion.',
      freelancers: 'Limited code architectures that fail under high concurrent loads.',
      natton: 'Edge-cached Cloudflare functions and serverless node arrays handling millions of users easily.'
    }
  ];

  const chooseCards = [
    {
      title: "AI-First Approach",
      icon: Cpu,
      desc: "We do not patch legacy frameworks. We build custom-tuned cognitive architectures, removing manual friction entirely.",
      color: "from-blue-500/20 to-blue-600/5",
      accent: "text-blue-400"
    },
    {
      title: "End-to-End Solutions",
      icon: Layers,
      desc: "From initial high-level growth strategy maps down to the exact n8n webhook node configuration — we handle the full stack.",
      color: "from-purple-500/20 to-purple-600/5",
      accent: "text-purple-400"
    },
    {
      title: "Marketing + Automation",
      icon: TrendingUp,
      desc: "Most agencies build traffic but lose leads. We generate high-intent demand and instantly route it through fast automated systems.",
      color: "from-emerald-500/20 to-emerald-600/5",
      accent: "text-emerald-400"
    },
    {
      title: "Custom AI Agents",
      icon: Sparkles,
      desc: "We construct sovereign conversational voices and RAG agents trained precisely on your company documentation.",
      color: "from-cyan-500/20 to-cyan-600/5",
      accent: "text-cyan-400"
    },
    {
      title: "Global Delivery Model",
      icon: Globe,
      desc: "Distributed server nodes and local solution experts across global business hubs ensure minimal response latency.",
      color: "from-pink-500/20 to-pink-600/5",
      accent: "text-pink-400"
    },
    {
      title: "Industry Expertise",
      icon: Briefcase,
      desc: "Custom operational blueprints engineered for clinical healthcare, admissions, real estate tours, and manufacturing logistics.",
      color: "from-amber-500/20 to-amber-600/5",
      accent: "text-amber-400"
    },
    {
      title: "Scalable Architecture",
      icon: Lock,
      desc: "Built on high-speed serverless platforms with redundant backup arrays, achieving 99.98% runtime availability.",
      color: "from-teal-500/20 to-teal-600/5",
      accent: "text-teal-400"
    },
    {
      title: "Long-Term Partnership",
      icon: Users,
      desc: "We act as your dedicated fractional Chief AI Officer, continually optimizing models as artificial intelligence shifts.",
      color: "from-indigo-500/20 to-indigo-600/5",
      accent: "text-indigo-400"
    }
  ];

  const processSteps = [
    {
      title: "Discover & Audit",
      desc: "We execute our 6-step AI Readiness Assessment to trace manual leakages, unearthing hidden administrative overhead."
    },
    {
      title: "Architect Strategy",
      desc: "We engineer a comprehensive systems mapping. You receive exact structural maps showing precisely how systems will sync."
    },
    {
      title: "Build Core Node",
      desc: "Our engineers configure the core database arrays, GHL calendars, and sovereign n8n webhook listeners."
    },
    {
      title: "Automate Channels",
      desc: "We activate automated channels including WhatsApp Cloud APIs, RCS text messaging, and natural AI phone dialers."
    },
    {
      title: "Optimize Models",
      desc: "We train specialized LLM routers, establishing guardrails to prevent hallucination while driving exact lead scoring."
    },
    {
      title: "Scale Volume",
      desc: "We run high-converting ad funnels while your automated agent core books appointments 24/7, expanding margins."
    }
  ];

  const industries = [
    {
      name: "Healthcare",
      metric: "72% Triage Efficiency",
      desc: "HIPAA-safe WhatsApp patient onboarding checklists, smart clinical slot reminders, and secure diagnostic database logging."
    },
    {
      name: "Education",
      metric: "3.5x Admissions Nurture",
      desc: "Continuous virtual student counselors guiding course registration, sending brochures via WhatsApp, and scoring inquiries."
    },
    {
      name: "Real Estate",
      metric: "82% Voice Qualification",
      desc: "Inbound AI Calling agents checking buyer credit ranges, managing viewing schedules, and instantly organizing lead logs."
    },
    {
      name: "Manufacturing",
      metric: "99.4% Dispatch Accuracy",
      desc: "Low-stock automated supplier ordering triggers, instant delivery dispatch logs, and internal warehouse cognitive assistants."
    },
    {
      name: "Retail & Ecommerce",
      metric: "28% Cart Recovery Boost",
      desc: "Meta Cloud API broadcasts, cart abandonment coupons on WhatsApp, and localized regional customer chat support bots."
    },
    {
      name: "Professional Services",
      metric: "65% Administration Saved",
      desc: "Automatic document ingestion, smart invoice processing, and instant customer quotation proposals synced in CRM."
    }
  ];

  const caseStudies = [
    {
      title: "Healthcare Growth Automation",
      client: "Apollo Clinics Network (JV Node)",
      challenge: "Manual call center agent queues caused 45% missed patient inquiries and dropped appointments.",
      solution: "Deployed unified conversational WhatsApp templates paired with automated calling agents to pre-triage patient lists.",
      metric: "72% administrative triage deflection, 32% growth in monthly patient bookings, and zero manual spreadsheet gaps."
    },
    {
      title: "Education Admissions Scaling",
      client: "Global Tech Vocational Academy",
      challenge: "High cost-per-lead and sluggish sales counseling responses caused 60% of interested students to enroll elsewhere.",
      solution: "Engineered customized virtual counselors using dynamic LLM routing, enabling real-time educational counseling via WhatsApp.",
      metric: "3.5x admissions conversion surge, 80% decrease in manual inquiry call wait times, and perfect CRM logs."
    },
    {
      title: "Real Estate Lead Automation",
      client: "Prestige Heights Realty Group",
      challenge: "Agents spent 4 hours daily screening unqualified property views, causing massive fatigue and slow closings.",
      solution: "Integrated structured voice bots to screen buyers on credit ranges, location preferences, and instantly book GHL calendars.",
      metric: "82% prequalified lead routing, 4.5x surge in high-intent property tours, and $12k monthly salary savings."
    },
    {
      title: "Manufacturing CRM Transformation",
      client: "Vardhman Industry Parts Ltd.",
      challenge: "Disjointed emails and hand-written supply logs caused massive dispatch inaccuracies and inventory bottlenecks.",
      solution: "Integrated enterprise-wide n8n Webhook listeners directly linked to internal PostgreSQL servers and central Slack alerts.",
      metric: "99.4% dispatch precision, automatic supplier ordering on low stock, and zero missed logistics milestones."
    }
  ];

  const globalRegions: Record<string, { desc: string; clients: string; node: string; description: string }> = {
    'India': {
      desc: 'Central Engineering HQ & AI Delivery Hub',
      clients: '65+ Corporate Accounts',
      node: 'Noida / Bangalore Multi-Cluster',
      description: 'Serving local clinical healthcare brands, e-commerce giants, and professional services with high-deliverability regional nodes.'
    },
    'Middle East': {
      desc: 'Logistics & Real Estate Automation',
      clients: '18+ Client Networks',
      node: 'Dubai / Riyadh Edge Gateway',
      description: 'Providing WhatsApp Conversational platforms and AI booking tools for high-end hospitality and real estate networks in Dubai and Riyadh.'
    },
    'North America': {
      desc: 'SaaS Integration & Agentic OS Clusters',
      clients: '22+ High-Growth SMBs',
      node: 'Delaware / Virginia Serverless Node',
      description: 'Deploying high-speed custom AI calling agents and n8n webhook sequences for VC-backed SaaS and professional service groups.'
    },
    'Europe': {
      desc: 'Sovereign GDPR-Compliant Deployments',
      clients: '14+ Enterprise Client Hubs',
      node: 'Frankfurt Local Edge Router',
      description: 'Fully sovereign database pipelines matching EU strict security laws for clinical centers and automated accounting firms.'
    },
    'Australia': {
      desc: 'Education & Logistics Hubs',
      clients: '8+ Enterprise Nodes',
      node: 'Sydney Local AWS Node',
      description: 'Managing automated student inquiry triage systems and cloud telephony workflows for vocational colleges.'
    },
    'South East Asia': {
      desc: 'E-commerce Broadcast & Retail Clusters',
      clients: '15+ Active Brands',
      node: 'Singapore Cloudfront Cluster',
      description: 'Empowering retail shops with Meta Cloud APIs for direct WhatsApp catalog checkouts and RCS messaging blasts.'
    }
  };

  const certifications = [
    { title: "Secure Architecture", desc: "Data is protected via AES-256 encryption at rest, complete TLS in transit, and secure container routing.", icon: Lock },
    { title: "Scalable Infrastructure", desc: "Serverless node clusters on Google Cloud and AWS execute concurrent microservices without bottlenecking.", icon: Cloud },
    { title: "Cloud Native Node", desc: "Designed inside sandboxed Docker containers behind Cloudflare Edge firewalls for ultra-low latency.", icon: Zap },
    { title: "AI-First Delivery", desc: "We deploy state-of-the-art LLM routers with real-time prompt-guard middleware to block hallucinations.", icon: Sparkles },
    { title: "Automation Expertise", desc: "Official n8n solution architect blueprints combined with complex GHL workflow integrations.", icon: Workflow },
    { title: "Continuous Optimization", desc: "Regular compliance auditing, diagnostic scorecard updates, and continuous fine-tuning.", icon: Activity }
  ];

  // Exactly 15 questions in accordion FAQ
  const faqs = [
    {
      q: "What makes Natton Digital different from a traditional marketing agency?",
      a: "Traditional agencies only focus on top-of-funnel traffic generation, leaving you with cold leads and manual spreadsheets. Natton Digital is an AI-first growth partner: we generate high-intent traffic and instantly pipe it through custom n8n automations, CRM pipelines, and autonomous calling agents to book real sales meetings."
    },
    {
      q: "Do you replace our existing CRM, or do you integrate with it?",
      a: "We are built for flexibility. We can either deploy a highly optimized CRM framework on GoHighLevel (GrowthOS™) to automate your customer list completely, or build custom n8n nodes to securely sync and clean data in your legacy CRM system like HubSpot, Salesforce, or Zoho."
    },
    {
      q: "What is n8n and why do you use it for workflows instead of Zapier?",
      a: "Zapier is a great tool for simple tasks, but it quickly becomes extremely expensive and visually unmanageable for complex enterprise logic. We use n8n because it allows us to build self-healing, multi-node webhook databases with advanced JavaScript filters, direct database integrations, and robust security—saving our clients thousands in monthly Zapier tasks."
    },
    {
      q: "How do your custom AI Calling Agents work?",
      a: "Our voice systems utilize advanced text-to-speech models and low-latency speech recognition to engage in natural, human-sounding telephone conversations. They make outbound follow-ups or answer inbound inquiries, check calendars, qualify criteria, and directly book appointment slots inside your CRM in milliseconds."
    },
    {
      q: "What are GrowthOS™, BusinessOS™, and AgenticOS™?",
      a: "GrowthOS™ handles automatic customer acquisition, including ad creatives, email warmups, and messaging. BusinessOS™ automates your internal processes, such as invoicing and support tickets. AgenticOS™ is our advanced coordination layer where multiple autonomous AI agents execute complex corporate tasks without human oversight."
    },
    {
      q: "Can your conversational agents support regional Indian languages?",
      a: "Yes. Our AI voice dialers and WhatsApp chatbots are equipped with multilingual routers capable of speaking and understanding English, Hindi, and regional languages like Tamil, Telugu, and Kannada, making them ideal for Indian MSMEs."
    },
    {
      q: "Is Natton Digital's infrastructure secure and GDPR compliant?",
      a: "Absolutely. Security is our primary engineering mandate. All client data is encrypted with AES-256 protocols, routed securely through SSL/TLS, and hosted on isolated server nodes. We design HIPAA-compliant triages and GDPR-compliant databases, ensuring strict patient and customer privacy."
    },
    {
      q: "What is the typical timeline to build and launch an AI Agent system?",
      a: "For standard CRM automation and WhatsApp chatbots, we can deploy the initial system within 10 to 14 business days. Specialized custom RAG systems, multilingual voice dialers, and deep n8n database pipelines generally take between 3 and 6 weeks to fully audit, build, and optimize."
    },
    {
      q: "Do we need our own OpenAI, Anthropic, or Google developer accounts?",
      a: "No. We can securely host and route the models through our enterprise API keys, billing you purely on consumption. Alternatively, if you have strict compliance guidelines, we can easily configure the systems to run inside your own Google Cloud, AWS, or Azure private environments."
    },
    {
      q: "How does your pricing model work? Is it based on performance?",
      a: "We offer structured project-based build retainers for our architecture setups, and monthly optimization programs for continuous model training. For select clients with qualified sales histories, we also offer dynamic hybrid packages linked directly to booked revenue."
    },
    {
      q: "What is SEO + AEO and how do you optimize for AI-first search?",
      a: "Search Engine Optimization (SEO) gets you found on Google. Answer Engine Optimization (AEO) ensures your brand is selected as the top primary answer when users query AI engines like ChatGPT, Gemini, and Perplexity. We structure your website's metadata, schema codes, and technical blogs to ensure maximum AI search dominance."
    },
    {
      q: "Can you automate cold outreach pipelines without domain blacklisting?",
      a: "Yes. We set up isolated custom domain structures with complete SPF, DKIM, and DMARC verification. We run automatic slow-warmup schedules using specialized inbox networks, ensuring your outbound prospecting campaigns reach primary inboxes instead of spam folders."
    },
    {
      q: "How does the WhatsApp Business API integration work?",
      a: "We integrate directly with the Meta Cloud API. This allows us to broadcast targeted customer coupons, recover abandoned shopping carts, send automated utility notices, and activate intelligent chatbots capable of guiding users through product catalogs with native checkouts."
    },
    {
      q: "What level of ongoing support and maintenance do you provide?",
      a: "We do not believe in transactional relationships. Our monthly optimization services act as your fractional Chief AI Officer: we audit system analytics, upgrade underlying models, update prompt guardrails, and constantly fine-tune workflow nodes as technology evolves."
    },
    {
      q: "Do you offer an initial pilot program before committing to an enterprise rollout?",
      a: "Yes. We offer an initial Diagnostic Pilot where we map out your exact system leaks and deploy a single high-impact automation (like a WhatsApp lead-capture bot) over a 2-week testing period, allowing your team to experience the tangible cash and time savings firsthand."
    }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingForm(true);
    setFormError('');

    if (!captchaVerified) {
      setFormError('Please verify the security captcha checkbox first.');
      setSubmittingForm(false);
      return;
    }

    // Simulate n8n webhook and GoHighLevel sync
    setTimeout(() => {
      setSubmittingForm(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#110B33] text-white min-h-screen font-sans antialiased text-left selection:bg-primary/30 selection:text-white relative">
      
      {/* Background Cinematic Gradients & Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,255,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/[0.01] rounded-full blur-3xl pointer-events-none" />

      {/* 1. HERO SECTION WITH CONNECTED AI ECOSYSTEM VISUAL */}
      <section className="relative pt-28 pb-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="mb-6 text-xs font-mono text-gray-400/80 tracking-wider">
            <button onClick={() => setPath('home')} className="hover:text-primary transition-colors">HOME</button>
            <span className="mx-2">/</span>
            <span className="text-primary font-bold">WHY NATTON DIGITAL</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-500/20">
                <Sparkles className="h-3 w-3 animate-pulse" /> THE GROWTH EVOLUTION
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight">
                Beyond Agencies. <br className="hidden sm:inline" />
                Beyond Software. <br />
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">AI Growth Partner</span>.
              </h1>
              <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
                We combine artificial intelligence marketing, n8n pipeline automation, unified CRM suites, and intelligent conversational agents to help businesses grow faster and operate at absolute peak performance.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={handleScrollToForm}
                  className="px-6 py-3 bg-gradient-to-r from-[#00C2FF] to-primary hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  Book Strategy Call <ArrowRight className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setPath('solutions/ai-agents' as RoutePath)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
                >
                  Explore Solutions
                </button>
              </div>
            </div>

            {/* HERO RIGHT COLUMN - CONNECTED AI ECOSYSTEM 3D VISUALIZATION */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="w-full max-w-[420px] aspect-square rounded-3xl border border-white/[0.08] bg-white/[0.01] p-6 relative flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-purple-950/20 pointer-events-none" />
                
                {/* Visual title */}
                <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-3">
                  <span className="text-[9px] font-mono text-gray-400">⚡ NATTON SYSTEM OVERVIEW</span>
                  <span className="text-[8px] font-mono bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 px-1.5 py-0.5 rounded uppercase">ACTIVE COGNITION</span>
                </div>

                {/* Ecosystem Nodes visual map */}
                <div className="relative h-56 flex items-center justify-center">
                  
                  {/* Central Hub with pulsating outer rings */}
                  <div className="absolute w-24 h-24 rounded-full border border-dashed border-primary/20 animate-spin" style={{ animationDuration: '30s' }} />
                  <div className="absolute w-16 h-16 rounded-full border border-dashed border-[#00C2FF]/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                  
                  {/* CENTRAL SYSTEM NODE */}
                  <div className="absolute p-3 bg-gradient-to-tr from-primary to-[#00C2FF] rounded-2xl border border-white/20 shadow-lg shadow-primary/20 flex flex-col items-center justify-center z-10">
                    <Cpu className="h-6 w-6 text-white" />
                    <span className="text-[8px] font-mono font-black text-[#110B33] mt-0.5">CORE OS</span>
                  </div>

                  {/* GrowthOS Node */}
                  <div className="absolute -top-4 left-6 p-2 rounded-xl bg-indigo-950/80 border border-indigo-400/30 text-indigo-300 text-[9px] font-mono flex items-center gap-1.5">
                    <TrendingUp className="h-3 w-3" /> GrowthOS™
                  </div>

                  {/* BusinessOS Node */}
                  <div className="absolute bottom-2 left-6 p-2 rounded-xl bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[9px] font-mono flex items-center gap-1.5">
                    <Database className="h-3 w-3" /> BusinessOS™
                  </div>

                  {/* AgenticOS Node */}
                  <div className="absolute top-1/2 -translate-y-1/2 -right-2 p-2 rounded-xl bg-purple-950/80 border border-purple-400/30 text-purple-300 text-[9px] font-mono flex items-center gap-1.5">
                    <Workflow className="h-3 w-3" /> AgenticOS™
                  </div>

                  {/* Connection paths */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#00C2FF" strokeWidth="1" strokeDasharray="3 2" />
                    <line x1="50%" y1="50%" x2="25%" y2="85%" stroke="#10B981" strokeWidth="1" strokeDasharray="3 2" />
                    <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="#8B5CF6" strokeWidth="1" />
                  </svg>

                </div>

                <div className="relative z-10 border-t border-white/5 pt-3 flex items-center justify-between text-[8px] font-mono text-gray-500">
                  <span>99.98% NODE RUNTIME</span>
                  <span>ENCRYPTED PORT: 3000</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE COMPARISON TABLE */}
      <section className="py-20 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">DIAGNOSTIC MATRIX</span>
            <h2 className="text-3xl font-black font-display text-white">Traditional Agency vs Natton Digital</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Explore the detailed breakdown of how our AI operations exceed outdated legacy solutions.</p>
          </div>

          {/* Table Container */}
          <div className="max-w-5xl mx-auto bg-white/[0.01] border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 bg-white/[0.02] border-b border-white/[0.08] p-4 text-[10px] font-mono font-bold tracking-wider uppercase text-gray-400 text-center sm:text-left">
              <div className="col-span-12 sm:col-span-3">Capabilities</div>
              <div className="hidden sm:block sm:col-span-2 text-center text-red-400/80">Traditional Agency</div>
              <div className="hidden sm:block sm:col-span-2 text-center text-amber-500/80">Software Vendor</div>
              <div className="hidden sm:block sm:col-span-2 text-center text-violet-400/80">Freelancers</div>
              <div className="col-span-12 sm:col-span-3 text-center sm:text-right text-[#00C2FF] font-black">Natton Digital</div>
            </div>

            {/* Table rows */}
            <div className="divide-y divide-white/[0.05]">
              {comparisons.map((row) => {
                const isSelected = activeTab === row.id;
                return (
                  <div 
                    key={row.id}
                    onMouseEnter={() => setActiveTab(row.id as any)}
                    className={`transition-all duration-300 ${isSelected ? 'bg-white/[0.03]' : ''}`}
                  >
                    {/* Mobile Row trigger */}
                    <div className="grid grid-cols-12 gap-2 p-4 items-center text-left">
                      <div className="col-span-12 sm:col-span-3 font-semibold text-xs sm:text-sm text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {row.title}
                      </div>

                      {/* Traditional agency column */}
                      <div className={`col-span-12 sm:col-span-2 text-[11px] text-gray-400 leading-relaxed text-center ${isSelected ? 'block' : 'hidden sm:block'}`}>
                        <span className="sm:hidden text-[9px] font-mono uppercase text-red-400 font-bold block mb-1">Traditional Agency:</span>
                        {row.traditional}
                      </div>

                      {/* Software Vendor column */}
                      <div className={`col-span-12 sm:col-span-2 text-[11px] text-gray-400 leading-relaxed text-center ${isSelected ? 'block' : 'hidden sm:block'}`}>
                        <span className="sm:hidden text-[9px] font-mono uppercase text-amber-500 font-bold block mb-1">Software Vendor:</span>
                        {row.vendor}
                      </div>

                      {/* Freelancers column */}
                      <div className={`col-span-12 sm:col-span-2 text-[11px] text-gray-400 leading-relaxed text-center ${isSelected ? 'block' : 'hidden sm:block'}`}>
                        <span className="sm:hidden text-[9px] font-mono uppercase text-violet-400 font-bold block mb-1">Freelancers:</span>
                        {row.freelancers}
                      </div>

                      {/* Natton Digital column */}
                      <div className="col-span-12 sm:col-span-3 text-[11px] text-[#00C2FF] font-semibold leading-relaxed text-center sm:text-right p-2 rounded-xl bg-[#00C2FF]/5 border border-[#00C2FF]/10">
                        <span className="sm:hidden text-[9px] font-mono uppercase text-primary font-bold block mb-1">Natton Digital:</span>
                        {row.natton}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 3. BENTO GRID OF WHY CHOOSE US */}
      <section className="py-20 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">THE NATTON EDGE</span>
            <h2 className="text-3xl font-black font-display text-white">Why Businesses Choose Us</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Explore the deep procedural standards we maintain to drive authentic business growth.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {chooseCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-primary/40 text-left transition-all duration-300 relative overflow-hidden group h-64 flex flex-col justify-between"
                >
                  <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${card.color} rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity`} />
                  
                  <div>
                    <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${card.accent} mb-4 inline-block`}>
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold font-display text-white mb-2 group-hover:text-[#00C2FF] transition-colors">{card.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <span className="text-[9px] font-mono text-gray-600 font-semibold uppercase block group-hover:text-primary transition-colors">
                    SYSTEM CAPACITY 0{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. ECOSYSTEM ARCHITECTURE DIAGRAM */}
      <section className="py-20 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block font-semibold">INTEGRATED BLUEPRINTS</span>
            <h2 className="text-3xl font-black font-display text-white">One Unified Ecosystem</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">See how our core components sync in real time to capture and convert prospect opportunities.</p>
          </div>

          {/* Interactive Flow visualization */}
          <div className="max-w-4xl mx-auto bg-white/[0.01] border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden text-left space-y-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
              <div>
                <span className="text-[9px] font-mono uppercase text-[#00C2FF] font-black">Ecosystem Topology</span>
                <h3 className="text-lg font-bold font-display text-white">Multithreaded Conversion Pipeline</h3>
              </div>
              <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded">SSL SECURE ROUTING</span>
            </div>

            {/* Architecture Node block lines */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
              
              {/* Box 1: Marketing */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 flex flex-col justify-between h-40">
                <div className="space-y-2">
                  <span className="text-[8px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded">NODE 01</span>
                  <h4 className="text-xs font-bold text-white">AI Marketing Platform™</h4>
                  <p className="text-[11px] text-gray-400">Captures web-traffic via SEO + AEO dynamic search ranking.</p>
                </div>
                <span className="text-[10px] font-mono text-[#00C2FF] font-black">DEMAND →</span>
              </div>

              {/* Box 2: GrowthOS */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 flex flex-col justify-between h-40">
                <div className="space-y-2">
                  <span className="text-[8px] font-mono text-cyan-400 font-bold bg-cyan-400/10 px-1.5 py-0.5 rounded">NODE 02</span>
                  <h4 className="text-xs font-bold text-white">GrowthOS™ & GHL CRM</h4>
                  <p className="text-[11px] text-gray-400">Hosts sales calendars and cleans incoming leads automatically.</p>
                </div>
                <span className="text-[10px] font-mono text-purple-400 font-black">PIPELINE →</span>
              </div>

              {/* Box 3: Channels */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 flex flex-col justify-between h-40">
                <div className="space-y-2">
                  <span className="text-[8px] font-mono text-purple-400 font-bold bg-purple-400/10 px-1.5 py-0.5 rounded">NODE 03</span>
                  <h4 className="text-xs font-bold text-white">Channels & Calling</h4>
                  <p className="text-[11px] text-gray-400">WhatsApp blasts, RCS messaging, and inbound AI Dialers.</p>
                </div>
                <span className="text-[10px] font-mono text-pink-400 font-black">ENGAGEMENT →</span>
              </div>

              {/* Box 4: AgenticOS */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 flex flex-col justify-between h-40">
                <div className="space-y-2">
                  <span className="text-[8px] font-mono text-pink-400 font-bold bg-pink-400/10 px-1.5 py-0.5 rounded">NODE 04</span>
                  <h4 className="text-xs font-bold text-white">AgenticOS™ Node</h4>
                  <p className="text-[11px] text-gray-400">Autonomous cognitive agents executing multi-node CRM syncs.</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">REVENUE ✓</span>
              </div>

            </div>

            <div className="p-4 rounded-xl bg-[#110B33] border border-white/5 text-xs text-gray-400 leading-relaxed flex gap-3 items-start">
              <CheckCircle className="h-5 w-5 text-[#00C2FF] shrink-0 mt-0.5" />
              <p>
                Our serverless data pipeline works in circular unity. When traffic lands via the <strong>AI Marketing Platform</strong>, our n8n integrations immediately clean the contact record, verify physical phone lines, and launch instant <strong>WhatsApp conversational guides</strong> while routing qualified calls to <strong>AI voice dialers</strong>.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. PROCESS HORIZONTAL TIMELINE */}
      <section className="py-20 border-b border-white/[0.08] relative bg-dark/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">EXECUTION FLOW</span>
            <h2 className="text-3xl font-black font-display text-white">How We Deliver Growth</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Explore our structured 6-stage development process to deploy your customized system core.</p>
          </div>

          {/* Interactive Horizontal timeline bar */}
          <div className="relative max-w-5xl mx-auto py-8">
            <div className="absolute top-[40px] left-6 right-6 h-0.5 bg-white/10 pointer-events-none" />
            <div 
              className="absolute top-[40px] left-6 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 transition-all duration-500 pointer-events-none" 
              style={{ width: `${(activeStep / (processSteps.length - 1)) * 92}%` }}
            />

            <div className="grid grid-cols-6 gap-2 relative z-10">
              {processSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-blue-400 to-[#00C2FF] border-[#00C2FF] text-white shadow-lg shadow-primary/30 scale-115' 
                        : 'bg-[#110B33] border-white/20 text-gray-400 group-hover:border-white/60'
                    }`}>
                      <span className="text-[10px] font-mono font-black">{idx + 1}</span>
                    </div>

                    <span className={`text-[10px] font-mono font-bold mt-3 transition-colors ${isActive ? 'text-[#00C2FF]' : 'text-gray-400'}`}>
                      {step.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Process step detail box */}
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00C2FF]" />
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-[#00C2FF] uppercase tracking-widest font-black">Stage 0{activeStep + 1} of 06</span>
              <h3 className="text-xl font-bold text-white font-display">{processSteps[activeStep].title}</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{processSteps[activeStep].desc}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. IMPACT IN NUMBERS */}
      <section className="py-20 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block font-semibold">VERIFIABLE STATS</span>
            <h2 className="text-3xl font-black font-display text-white">Impact Delivered</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Demonstrated scaling results logged across our entire client infrastructure network.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { label: "Acquisitions Mapped", val: `${counts.projects}+`, sub: "Corporate Projects" },
              { label: "Automated Chats", val: `${counts.conversations.toFixed(1)}M+`, sub: "Conversations Logged" },
              { label: "Leads Routed", val: `${counts.leads}K+`, sub: "Leads Managed" },
              { label: "Verticals Automated", val: `${counts.industries}+`, sub: "Sectors Automated" },
              { label: "Node SLA Runtime", val: `${counts.uptime.toFixed(2)}%`, sub: "System Availability" }
            ].map((met, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl text-center flex flex-col justify-between hover:border-[#00C2FF]/30 transition-all">
                <span className="text-[9px] font-mono uppercase text-gray-500 tracking-wider block font-semibold">{met.label}</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-display text-white my-3 block bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00C2FF] to-white">{met.val}</span>
                <span className="text-[9px] text-gray-400 font-mono leading-tight">{met.sub}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. TECHNOLOGY INFINITE CAROUSEL */}
      <section className="py-16 border-b border-white/[0.08] relative overflow-hidden bg-dark/45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block font-semibold">OUR COMPREHENSIVE TECH STACK</span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-white">Sovereign Software Ecosystem</h2>
          
          <div className="relative flex overflow-x-hidden py-4 border-y border-white/5 bg-white/[0.01]">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs font-mono font-bold uppercase tracking-widest text-gray-400/80">
              <span>OpenAI (GPT-4o)</span>
              <span>Claude 3.5 Sonnet</span>
              <span>Gemini 1.5 Pro</span>
              <span>n8n Core Nodes</span>
              <span>GoHighLevel API</span>
              <span>Meta Cloud API</span>
              <span>Google Cloud Platform</span>
              <span>Amazon Web Services</span>
              <span>Microsoft Azure Hub</span>
              <span>Cloudflare Security</span>
            </div>
            
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#110B33] to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#110B33] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 8. INDUSTRIES WE SERVE */}
      <section className="py-20 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">CUSTOM DEPLOYMENT BLUEPRINTS</span>
            <h2 className="text-3xl font-black font-display text-white">Industries We Serve</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">We engineer specialized system nodes to address the unique commercial bounds of your industry.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-primary/30 text-left transition-all relative group"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold font-display text-white">{ind.name}</h3>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">{ind.metric}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. SUCCESS STORIES CAROUSEL */}
      <section className="py-20 border-b border-white/[0.08] relative bg-indigo-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block font-semibold">CASE STUDIES</span>
            <h2 className="text-3xl font-black font-display text-white">Success Stories</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Explore verified results logged by companies running on Natton Digital pipelines.</p>
          </div>

          {/* Carousel box */}
          <div className="max-w-3xl mx-auto relative">
            <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden min-h-[300px] flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00C2FF]" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-[#00C2FF] font-black uppercase">Verified Deployment Outcome</span>
                    <h3 className="text-xl font-bold font-display text-white mt-0.5">{caseStudies[activeCase].title}</h3>
                    <p className="text-[10px] text-gray-500 font-mono">CLIENT NODE: {caseStudies[activeCase].client}</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">VERIFIED ROI</span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-gray-300">
                  <p>
                    <strong>The Challenge:</strong> {caseStudies[activeCase].challenge}
                  </p>
                  <p>
                    <strong>The Custom Setup:</strong> {caseStudies[activeCase].solution}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-xs">
                  <span className="text-[9px] text-gray-500 block uppercase">Verified KPI Milestone:</span>
                  <p className="text-emerald-400 font-bold">{caseStudies[activeCase].metric}</p>
                </div>

                {/* Controls */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveCase(prev => (prev === 0 ? caseStudies.length - 1 : prev - 1))}
                    className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setActiveCase(prev => (prev === caseStudies.length - 1 ? 0 : prev + 1))}
                    className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. INTERACTIVE WORLD MAP */}
      <section className="py-20 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* World Map SVG Mock */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">DISTRIBUTED CLUSTERS</span>
              <h2 className="text-3xl font-black font-display text-white">Serving Businesses Worldwide</h2>
              <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
                We distribute computational server pipelines and dedicated solution architects globally to guarantee ultra-low latency API hops and strict regional regulatory compliance.
              </p>

              <div className="relative w-full aspect-[16/10] bg-white/[0.01] border border-white/5 rounded-3xl p-6 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 800 500" className="w-full h-full opacity-60 text-indigo-400/20 fill-current">
                  <rect x="0" y="0" width="800" height="500" fill="none" />
                  
                  {/* Continental Blobs */}
                  <path d="M 100 120 Q 180 100 240 160 T 200 250 T 120 280 Z" fill="currentColor" />
                  <path d="M 400 100 Q 450 80 480 140 T 450 200 T 380 180 Z" fill="currentColor" />
                  <path d="M 480 100 Q 600 50 720 120 T 700 280 T 550 350 T 480 200 Z" fill="currentColor" />
                  <path d="M 180 280 Q 240 320 200 420 T 140 400 Z" fill="currentColor" />
                  <path d="M 380 220 Q 440 240 440 340 T 350 380 Z" fill="currentColor" />
                  <path d="M 650 340 Q 720 320 700 420 T 620 400 Z" fill="currentColor" />

                  {/* Arcs/Routings from India Center Node */}
                  <path d="M 530 220 Q 365 190 200 160" fill="none" stroke="#00C2FF" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 530 220 Q 485 175 440 130" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 530 220 L 480 200" fill="none" stroke="#10B981" strokeWidth="1" />
                  <path d="M 530 220 Q 600 295 670 370" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 530 220 L 590 260" fill="none" stroke="#EC4899" strokeWidth="1" />

                  {/* Intersecting Region Coordinates */}
                  {[
                    { id: 'India', cx: 530, cy: 220, color: '#00C2FF' },
                    { id: 'Middle East', cx: 480, cy: 200, color: '#10B981' },
                    { id: 'North America', cx: 200, cy: 160, color: '#3B82F6' },
                    { id: 'Europe', cx: 440, cy: 130, color: '#8B5CF6' },
                    { id: 'Australia', cx: 670, cy: 370, color: '#F59E0B' },
                    { id: 'South East Asia', cx: 590, cy: 260, color: '#EC4899' },
                  ].map((pt) => {
                    const isHovered = hoveredRegion === pt.id;
                    const isSelected = selectedRegion === pt.id;
                    return (
                      <g 
                        key={pt.id}
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredRegion(pt.id)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedRegion(pt.id)}
                      >
                        <circle cx={pt.cx} cy={pt.cy} r={isHovered || isSelected ? 12 : 6} fill={pt.color} className="opacity-20 animate-ping" />
                        <circle cx={pt.cx} cy={pt.cy} r={isHovered || isSelected ? 8 : 4} fill={pt.color} className="transition-all duration-300 border border-white" />
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute top-4 left-4 p-2 bg-black/60 rounded border border-white/10 text-[9px] font-mono text-gray-400">
                  ⚡ LATENCY PROXIMITY INDEX
                </div>
              </div>
            </div>

            {/* Region Details Box */}
            <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-3xl space-y-4 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="pb-3 border-b border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#00C2FF] font-black">Region Node Info</span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">{selectedRegion}</h3>
                </div>
                <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2.5 py-1 rounded">ACTIVE CLUSTER</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-500 block">Operational Purpose:</span>
                  <p className="font-semibold text-white">{globalRegions[selectedRegion].desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-gray-500 block">Active Clients:</span>
                    <p className="font-bold text-emerald-400 text-sm">{globalRegions[selectedRegion].clients}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-gray-500 block">Hosting Gateway:</span>
                    <p className="font-bold text-cyan-400 text-[10px] font-mono leading-tight">{globalRegions[selectedRegion].node}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 text-gray-300 text-[11px] leading-relaxed">
                  {globalRegions[selectedRegion].description}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {Object.keys(globalRegions).map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                      selectedRegion === reg 
                        ? 'bg-[#00C2FF] border-[#00C2FF] text-[#110B33] font-bold' 
                        : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. ENTERPRISE-READY CERTIFICATIONS & APPROACH */}
      <section className="py-20 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block font-semibold">SECURITY & OPERATIONS</span>
            <h2 className="text-3xl font-black font-display text-white">Enterprise-Ready Approach</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Our systems undergo rigorous testing to ensure secure, compliant integrations for corporate records.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {certifications.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-left space-y-3 hover:border-white/20 transition-all">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-primary w-fit">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. FREQUENTLY ASKED QUESTIONS (15-QUESTION INTERACTIVE ACCORDION) */}
      <section className="py-20 border-b border-white/[0.08] relative bg-dark/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          
          <div className="space-y-2 text-center">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">KNOWLEDGE DEPOT</span>
            <h2 className="text-3xl font-black font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Find detailed, transparent answers regarding our technologies, pricing, and onboarding timelines.</p>
          </div>

          {/* FAQ Accordion container */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-white/[0.02] border-[#00C2FF]/30 shadow-lg shadow-primary/5' 
                      : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white pr-2">
                      <span className="text-primary font-mono mr-2">0{idx + 1}.</span>
                      {faq.q}
                    </span>
                    <span className={`p-1 rounded bg-white/5 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-[#00C2FF]' : ''}`}>
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-gray-400 leading-relaxed border-t border-white/[0.03]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 13. BOOK A FREE STRATEGY SESSION FORM */}
      <section ref={formRef} id="contact-form" className="py-20 border-b border-white/[0.08] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="space-y-3 text-center mb-10">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">BOOKING GATEWAY</span>
            <h2 className="text-3xl font-black font-display text-white">Book A Free Strategy Session</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Schedule a deep-dive call with our lead solution architects. We will trace your manual bottlenecks and draft an AI roadmap.</p>
          </div>

          <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">Strategy Request Logged</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Your details have been successfully synchronized to our internal <strong>n8n Webhook</strong> listener. A lead profile was generated in our <strong>GoHighLevel</strong> portal, and an advisor will contact you within 4 business hours.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setCaptchaVerified(false);
                    }} 
                    className="text-xs font-mono text-primary underline"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                
                {formError && (
                  <p className="p-3 rounded-lg bg-red-400/10 text-red-400 border border-red-500/20 font-mono">
                    ⚠️ {formError}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 uppercase tracking-wider mb-1 font-mono text-[9px]">Full Name *</label>
                    <input 
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary font-sans text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 uppercase tracking-wider mb-1 font-mono text-[9px]">Company Name *</label>
                    <input 
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 uppercase tracking-wider mb-1 font-mono text-[9px]">Target Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-primary font-sans text-xs"
                    >
                      <option value="Healthcare">Healthcare Industry</option>
                      <option value="Education">Education & EdTech</option>
                      <option value="Real Estate">Real Estate Segment</option>
                      <option value="Manufacturing">Manufacturing Sector</option>
                      <option value="Retail">Retail & E-commerce</option>
                      <option value="Services">Professional Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 uppercase tracking-wider mb-1 font-mono text-[9px]">Country Location *</label>
                    <input 
                      type="text"
                      required
                      placeholder="India"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 uppercase tracking-wider mb-1 font-mono text-[9px]">Corporate Email *</label>
                    <input 
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary font-sans text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 uppercase tracking-wider mb-1 font-mono text-[9px]">Phone Number *</label>
                    <input 
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 uppercase tracking-wider mb-1 font-mono text-[9px]">Primary Business Goals</label>
                    <input 
                      type="text"
                      placeholder="Scale appointments & reduce sales overhead"
                      value={formData.goals}
                      onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary font-sans text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 uppercase tracking-wider mb-1 font-mono text-[9px]">Monthly Revenue Range</label>
                    <select
                      value={formData.revenue}
                      onChange={(e) => setFormData(prev => ({ ...prev, revenue: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-primary font-sans text-xs"
                    >
                      <option value="$10k - $50k / month">Under $50k / month</option>
                      <option value="$50k - $200k / month">$50k - $200k / month</option>
                      <option value="$200k - $500k / month">$200k - $500k / month</option>
                      <option value="Over $500k / month">Over $500k / month</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 uppercase tracking-wider mb-1 font-mono text-[9px]">Current Workflow Bottleneck</label>
                  <textarea 
                    rows={3}
                    placeholder="We take 6 hours to call back leads and struggle to sync WhatsApp data with our CRM."
                    value={formData.challenges}
                    onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                    className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary font-sans text-xs resize-none"
                  />
                </div>

                {/* Simulated Google Captcha checkbox */}
                <div className="p-3 rounded-lg bg-white/[0.01] border border-white/5 flex items-center justify-between">
                  <label className="flex items-center gap-3.5 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={captchaVerified}
                      onChange={(e) => setCaptchaVerified(e.target.checked)}
                      className="rounded border-white/20 bg-dark text-primary focus:ring-0 focus:ring-offset-0 h-4 w-4 cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wide">I am not a cognitive robot scheduler</span>
                  </label>
                  <span className="text-[8px] font-mono text-gray-500 uppercase">n8n Captcha Shield</span>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={submittingForm}
                    className="w-full py-3 bg-gradient-to-r from-[#00C2FF] to-primary hover:opacity-90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                  >
                    {submittingForm ? 'SYNCING TO WEBHOOK...' : 'TRANSMIT STRATEGY SESSION REQUEST'} <Send className="h-4 w-4" />
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="py-20 border-b border-white/[0.08] bg-gradient-to-br from-indigo-950/40 via-[#110B33] to-purple-950/20 text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-500/20">
            <Activity className="h-3 w-3 animate-pulse" /> SYSTEM READY FOR DEPLOYMENT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Let's Build The Future Of Your Business
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Eliminate fragile manual administrative spreadsheet loops. Deploy optimized cognitive agent workflows today to unlock real time expansion.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <button 
              onClick={handleScrollToForm}
              className="px-6 py-3 bg-[#00C2FF] hover:bg-opacity-95 text-[#110B33] font-black text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-cyan-400/20"
            >
              Book Strategy Call <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              onClick={handleScrollToForm}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-all"
            >
              Talk To Experts
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
