import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
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
  Code,
  ShieldCheck,
  AlertTriangle,
  Play,
  Settings
} from 'lucide-react';
import { RoutePath } from '../types';

interface OurProcessProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function OurProcess({ setPath, darkMode }: OurProcessProps) {
  // References for scrolling
  const timelineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // States
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeDashboardTab, setActiveDashboardTab] = useState<'planning' | 'implementation' | 'automation' | 'analytics' | 'optimization'>('planning');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [automationNodeHover, setAutomationNodeHover] = useState<string | null>(null);
  const [activeIndustryBlueprint, setActiveIndustryBlueprint] = useState<string>('Healthcare');
  const [simulationRunning, setSimulationRunning] = useState<boolean>(true);
  
  // Form submission states
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [captchaChecked, setCaptchaChecked] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    industry: 'Healthcare',
    country: 'India',
    email: '',
    phone: '',
    challenges: '',
    revenue: '$10k - $50k / month',
    solution: 'GrowthOS™ Unified CRM',
    message: ''
  });

  // Simulator telemetry logs state
  const [logs, setLogs] = useState<string[]>([
    'System initialization: Core nodes active.',
    'SLA validation check: 99.98% runtime verified.',
    'Webhook listener: n8n listening on PORT 3000.'
  ]);

  useEffect(() => {
    if (!simulationRunning) return;
    const interval = setInterval(() => {
      const prefixes = ['[INFO]', '[SUCCESS]', '[ROUTING]', '[COGNITION]'];
      const actions = [
        'WhatsApp payload dispatched via Meta Cloud API.',
        'AI Dialer pre-triaged inbound lead queue.',
        'CRM synchronizer updated contact field (GHL Node).',
        'Sovereign RAG model parsed internal compliance blueprint.',
        'Analytics engine verified conversion event attribution.',
        'n8n workflow trigger executed: Lead Scored +100.',
        'GrowthOS active queue: 0 bottlenecks detected.'
      ];
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setLogs(prev => [
        `${new Date().toISOString().split('T')[1].substring(0, 8)} ${randomPrefix} ${randomAction}`,
        ...prev.slice(0, 6)
      ]);
    }, 4500);
    return () => clearInterval(interval);
  }, [simulationRunning]);

  const steps = [
    {
      id: 'discover',
      num: '01',
      title: 'Discover',
      desc: 'Understand your business, goals, challenges and current systems.',
      color: 'border-blue-500/30 text-blue-400 bg-blue-500/5',
      icon: Search,
      activities: [
        'Stakeholder Meetings & Interviews',
        'Current Tech Stack & Data Integrity Analysis',
        'Marketing Performance & Funnel Audit',
        'Sales Conversion Process Review',
        'Detailed AI Readiness Assessment Report'
      ]
    },
    {
      id: 'strategize',
      num: '02',
      title: 'Strategize',
      desc: 'Design a growth and automation blueprint tailored to your business.',
      color: 'border-violet-500/30 text-violet-400 bg-violet-500/5',
      icon: TrendingUp,
      activities: [
        'Dynamic 12-Month Growth Roadmap',
        'Target Customer Journey Mapping',
        'Omnichannel Funnel Architecture Design',
        'Low-Code Automation Node Planning',
        'AI Opportunity Prioritization Matrix'
      ]
    },
    {
      id: 'build',
      num: '03',
      title: 'Build',
      desc: 'Deploy platforms, CRM systems and communication channels.',
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
      icon: Layers,
      activities: [
        'AI Marketing Platform™ integration',
        'GrowthOS™ complete CRM workspace setup',
        'BusinessOS™ custom ticketing & support hubs',
        'AgenticOS™ proprietary coordinate server node'
      ]
    },
    {
      id: 'automate',
      num: '04',
      title: 'Automate',
      desc: 'Integrate workflows, AI agents and communication systems.',
      color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5',
      icon: Workflow,
      activities: [
        'Official Meta Cloud API WhatsApp sequences',
        'Natural low-latency AI Telephone Calling bots',
        'Robust multi-channel Cloud Telephony routing',
        'n8n advanced API webhook orchestrator',
        'Self-healing automated CRM task triggers'
      ]
    },
    {
      id: 'optimize',
      num: '05',
      title: 'Optimize',
      desc: 'Continuously improve campaigns, funnels and processes.',
      color: 'border-pink-500/30 text-pink-400 bg-pink-500/5',
      icon: Activity,
      activities: [
        'Continuous Landing Page Conversion Optimization',
        'Algorithmic Lead Quality & Cost Analysis',
        'AI Prompt Tuning & Guardrail Upgrades',
        'Full Transparent Revenue Attribution Dashboard'
      ]
    },
    {
      id: 'scale',
      num: '06',
      title: 'Scale',
      desc: 'Expand automation and growth systems as your business grows.',
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/5',
      icon: Globe,
      activities: [
        'Multi-location & Cross-regional Expansion Nodes',
        'Autonomous AI Digital Employees (AgenticOS)',
        'Complex third-party Legacy API Integrations',
        'Global edge network scaling & load balancing'
      ]
    }
  ];

  const industryBlueprints = [
    {
      name: 'Healthcare',
      headline: 'Patient Intake & Clinical Schedule Automation',
      metric: '72% Patient Triage Efficiency Boost',
      desc: 'Fully secure, HIPAA-aligned WhatsApp triage checklist vectors combined with instant clinical slot reservation alerts.',
      bulletTitle: 'Key Systems Integrated:',
      bullets: [
        'Sovereign WhatsApp Patient Intake bots matching symptoms safely',
        'Instant Google Calendar / GoHighLevel medical slot checkouts',
        'Encrypted patient records piped into medical databases with SSL protection',
        'Low-stock pharmaceutical alerting and auto-dispatch scripts'
      ]
    },
    {
      name: 'Education',
      headline: 'Admissions Nurture & Dynamic Counselors',
      metric: '3.5x Enrollment Inquiries Nurtured',
      desc: 'Non-stop cognitive student counselors qualified to answer prospectus courses, pricing, and instantly schedule interviews.',
      bulletTitle: 'Key Systems Integrated:',
      bullets: [
        'AI Admissions Counselors talking via WhatsApp or SMS 24/7',
        'Integrated course scheduling synced with counselor availability metrics',
        'Lead qualification scorecard mapping GPA and financial eligibility',
        'Parent alert systems verifying intake processes automatically'
      ]
    },
    {
      name: 'Real Estate',
      headline: 'Interactive Tour & Pre-Qualification Core',
      metric: '82% Pre-Qualified Buyer Tour Rate',
      desc: 'Inbound and outbound telephone agents screening buyer finances, location, and immediately routing live calendars.',
      bulletTitle: 'Key Systems Integrated:',
      bullets: [
        'Automated real estate phone dialers checking budget constraints',
        'Virtual virtual tours dispatched directly over WhatsApp based on choice',
        'GoHighLevel property databases synced to alert immediate price drops',
        'Automated agent assignment with round-robin booking routing'
      ]
    },
    {
      name: 'Manufacturing',
      headline: 'Logistics Pipelines & Supply Webhooks',
      metric: '99.4% Dispatch Integrity Accuracy',
      desc: 'Smart stock-level triggers and automated n8n webhook nodes connecting warehouses with logistics dispatch APIs.',
      bulletTitle: 'Key Systems Integrated:',
      bullets: [
        'Low-stock automated supplier purchase order creation',
        'Automatic packing list verification through vision APIs',
        'Integrated logistics pipeline updating clients on real-time routes',
        'Centralized operational dashboard showing live production metrics'
      ]
    },
    {
      name: 'Retail & Ecommerce',
      headline: 'WhatsApp Checkout & Recover Funnels',
      metric: '28% Shopping Cart Recovery Growth',
      desc: 'Direct checkout integration inside WhatsApp catalogs combined with automated cart abandonment discount triggers.',
      bulletTitle: 'Key Systems Integrated:',
      bullets: [
        'Meta Cloud API catalog browsing and seamless in-chat purchase',
        'Cart recovery triggers firing personalized vouchers within 15 minutes',
        'Omnichannel customer sentiment tracker tagging high-priority concerns',
        'Localized customer service bot routing to support experts'
      ]
    },
    {
      name: 'Professional Services',
      headline: 'Instant Invoice & Proposal Generators',
      metric: '65% Administrative Hours Restored',
      desc: 'Automatic client onboarding documents ingestion, contract generators, and instant GoHighLevel record updates.',
      bulletTitle: 'Key Systems Integrated:',
      bullets: [
        'Automated PDF extraction scraping client intake forms',
        'Secure contract generation paired with DocuSign / Signwell webhooks',
        'Automatic invoicing triggered inside QuickBooks or Stripe',
        'Dynamic executive report generation sent via Slack or Email'
      ]
    }
  ];

  const deliveryModels = [
    {
      title: 'Consulting',
      tag: 'Strategic Blueprint',
      desc: 'We perform deep operations diagnostics and engineer custom cognitive architectures, leaving your in-house IT team to deploy.',
      benefit: 'High flexibility, minimal friction'
    },
    {
      title: 'Done For You',
      tag: 'Turnkey Operations',
      desc: 'We handle the complete cycle: from n8n nodes construction and voice agent training to full CRM synchronization.',
      benefit: 'Absolute speed, production-ready'
    },
    {
      title: 'Done With You',
      tag: 'Co-Development',
      desc: 'Our engineers collaborate directly with your product managers, building core components side-by-side.',
      benefit: 'Excellent knowledge transfer'
    },
    {
      title: 'Managed Services',
      tag: 'Fractional Operations',
      desc: 'We serve as your Fractional Chief AI Officers, upgrading model prompts, patching webhooks, and optimizing weekly.',
      benefit: 'Continuous improvement & alignment'
    },
    {
      title: 'White Label Partnerships',
      tag: 'Scale Opportunities',
      desc: 'Deploy our proprietary AI growth structures and multi-channel bots natively rebranded under your own digital agency label.',
      benefit: 'New recurring revenue channels'
    }
  ];

  const typicalPhases = [
    { title: 'Week 1: Discovery', desc: 'Perform deep marketing, CRM, and systems audit. Identify bottlenecks and assess AI readiness score.' },
    { title: 'Week 2: Strategy', desc: 'Map complete custom user journeys, construct GHL CRM blueprints, and outline n8n node architecture.' },
    { title: 'Week 3-4: Build', desc: 'Deploy GrowthOS™ suite, set up communication pipelines, and create core vector knowledge bases.' },
    { title: 'Week 5-6: Automation', desc: 'Train conversational AI agents, connect WhatsApp Meta API hooks, and test self-healing webhooks.' },
    { title: 'Week 7+: Optimization', desc: 'Activate analytics dashboard tracker, analyze lead quality scores, and fine-tune models weekly.' }
  ];

  const faqs = [
    {
      q: 'What is the core delivery model of Natton Digital?',
      a: 'We operate as an end-to-end AI consulting, automation, and transformation partner. Whether you need initial strategy consulting, complete Done For You systems construction, or ongoing fractional Chief AI Officer support, we tailor our delivery framework specifically to your technical constraints.'
    },
    {
      q: 'Do you work with our existing tools or require us to switch?',
      a: 'We are built on absolute modularity. We can build custom n8n API webhook nodes to securely sync data within your current tools (like Salesforce, HubSpot, or custom databases), or deploy our fully consolidated GrowthOS™ workspace for a clean unified setup.'
    },
    {
      q: 'What makes your AI agents different from standard chatbots?',
      a: 'Standard chatbots are simple rule-based buttons that frustrate users. Our sovereign conversational AI agents use advanced LLM routing, real-time prompt-guard middleware, and semantic vector indexing to engage in fluid, human-like reasoning, executing actual calendar bookings or database queries in milliseconds.'
    },
    {
      q: 'How do you guarantee data security and GDPR/HIPAA compliance?',
      a: 'Security is our foundation. We deploy all systems behind Cloudflare Edge firewalls, with data protected via AES-256 encryption at rest and TLS 1.3 in transit. We construct isolated, sandboxed environments ensuring zero unauthorized data leaks.'
    },
    {
      q: 'Can we run these AI automation systems on our own cloud infrastructure?',
      a: 'Yes. While we host and manage nodes on our secure enterprise clusters by default, we can deploy the entire n8n, CRM, and agentic pipelines directly inside your private AWS, Google Cloud, or Microsoft Azure instances.'
    },
    {
      q: 'What is n8n and how does it compare to Zapier?',
      a: 'n8n is an enterprise-grade node-based workflow automation engine. Unlike Zapier, which is costly and difficult to scale, n8n allows for visual debugging, advanced JavaScript data parsing, direct database operations, and hosting on private secure servers, reducing monthly transaction overhead by up to 90%.'
    },
    {
      q: 'What exactly is GoHighLevel and GrowthOS™?',
      a: 'GoHighLevel is a leading unified marketing and CRM pipeline tool. GrowthOS™ is our proprietary pre-configured setup built on top of GHL, designed with highly specialized automation rules, messaging templates, and automated calendars tailored for instant conversions.'
    },
    {
      q: 'How fast will we see the first live automation in production?',
      a: 'Our standard onboarding roadmap delivers initial live components (such as an automated WhatsApp triage bot or synchronized CRM calendars) within 14 business days, allowing you to witness early ROI rapidly.'
    },
    {
      q: 'What is AEO and how do you optimize our brand for it?',
      a: 'Answer Engine Optimization (AEO) ensures your business is ranked as the primary recommended answer when customers query AI tools like ChatGPT, Gemini, Perplexity, or Copilot. We align your schema markup, semantic metadata, and knowledge bases to achieve AI search dominance.'
    },
    {
      q: 'Do you offer custom voice calling agents in regional Indian languages?',
      a: 'Yes. Our advanced conversational telephone dialers support multilingual speech-to-text models capable of communicating fluently in English, Hindi, and regional languages like Tamil, Telugu, and Kannada, complete with localized context.'
    },
    {
      q: 'How do we track the direct financial impact of your systems?',
      a: 'We integrate full-circle attribution models. You receive a live, transparent Project Lifecycle Dashboard tracking actual appointment bookings, cost-per-lead improvements, administrative hours saved, and direct sales pipeline ROI.'
    },
    {
      q: 'What level of ongoing support do you provide after the initial build?',
      a: 'We believe in long-term alignment. Through our Managed Services, we act as your fractional Chief AI Officers—constantly updating prompt logic, testing new model releases (like GPT-4o, Claude 3.5, or Gemini Pro), and optimizing webhook nodes to match changing demands.'
    },
    {
      q: 'Is there an upfront cost, or do you work on a revenue-share model?',
      a: 'We offer structured system build retainers based on scope complexity, alongside monthly recurring optimization packages. For select clients with validated sales histories and high lead volumes, we offer performance hybrid packages linked to closed sales.'
    },
    {
      q: 'Do we need technical experience to run the dashboards?',
      a: 'None at all. We build intuitive, simple, high-visibility user panels. Our systems operate entirely in the background, allowing your staff to focus purely on closing leads and delivering service.'
    },
    {
      q: 'How do we start the transformation journey with Natton Digital?',
      a: 'Simply fill out our Consultation Form below to book your 1-on-1 strategy session. We will conduct an initial 6-step AI Readiness Assessment of your business and map out an exact implementation blueprint tailored for your scale.'
    }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingForm(true);
    setFormError('');

    if (!captchaChecked) {
      setFormError('Please complete the security captcha verification.');
      setSubmittingForm(false);
      return;
    }

    if (!formData.fullName || !formData.companyName || !formData.email || !formData.phone) {
      setFormError('Please fill out all required fields marked with an asterisk (*).');
      setSubmittingForm(false);
      return;
    }

    // Simulate webhook dispatch to n8n and GHL sync
    setTimeout(() => {
      setSubmittingForm(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#110B33] text-white min-h-screen font-sans antialiased text-left relative selection:bg-primary/30 selection:text-white">
      
      {/* Background cinematic particles and grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,255,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-0 w-[600px] h-[600px] bg-purple-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-24 border-b border-white/[0.08] overflow-hidden">
        {/* Animated process mesh background */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="mb-6 text-xs font-mono text-gray-400 tracking-wider">
            <button onClick={() => setPath('home')} className="hover:text-[#00C2FF] transition-colors">HOME</button>
            <span className="mx-2">/</span>
            <span className="text-[#00C2FF] font-bold">OUR PROCESS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20">
                <Sparkles className="h-3 w-3 animate-pulse" /> THE STRATEGY-TO-SCALE ENGINE
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none">
                From Strategy To Scale — <br />
                A Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">AI Growth Framework</span>.
              </h1>
              
              <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
                Our structured methodology combines AI marketing, smart workflow automation, unified CRM architecture, and autonomous agents to deliver predictable, compound business outcomes.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => scrollToSection(formRef)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#00C2FF] to-primary hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  Book Strategy Call <ArrowRight className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => scrollToSection(timelineRef)}
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all flex items-center gap-2"
                >
                  See Implementation Roadmap <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Hero Right Column: 3D Transformation Journey Visualizer */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[440px] aspect-square rounded-3xl border border-white/[0.08] bg-white/[0.01] p-6 relative flex flex-col justify-between overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-purple-950/20 pointer-events-none" />
                
                <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-3">
                  <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase">⚡ TRANSFORMATION JOURNEY</span>
                  <span className="text-[8px] font-mono bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20 px-1.5 py-0.5 rounded uppercase font-bold animate-pulse">SYSTEM ENGAGED</span>
                </div>

                {/* Simulated 3D Transformation flow connector */}
                <div className="relative h-60 flex items-center justify-center">
                  
                  {/* Central Node representing Transformation engine */}
                  <div className="absolute w-28 h-28 rounded-full border border-dashed border-primary/20 animate-spin" style={{ animationDuration: '40s' }} />
                  <div className="absolute w-20 h-20 rounded-full border border-dashed border-[#00C2FF]/30 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
                  
                  {/* CORE TRANSFORMATION SPHERE */}
                  <div className="absolute p-4 bg-gradient-to-br from-primary via-purple-600 to-[#00C2FF] rounded-2xl border border-white/20 shadow-xl shadow-primary/30 flex flex-col items-center justify-center z-10 scale-105">
                    <Cpu className="h-7 w-7 text-white" />
                    <span className="text-[8px] font-mono font-black text-[#110B33] mt-1 tracking-wider uppercase">CORE ENGINE</span>
                  </div>

                  {/* Top Strategy Node */}
                  <div className="absolute -top-3 left-4 p-2 rounded-xl bg-indigo-950/80 border border-indigo-400/30 text-indigo-300 text-[9px] font-mono flex items-center gap-1.5 shadow-lg">
                    <Search className="h-3 w-3" /> 01. Discovery
                  </div>

                  {/* Left Automation Node */}
                  <div className="absolute bottom-6 left-1 p-2 rounded-xl bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[9px] font-mono flex items-center gap-1.5 shadow-lg">
                    <Workflow className="h-3 w-3" /> 04. Automation
                  </div>

                  {/* Right Scaling Node */}
                  <div className="absolute top-1/2 -translate-y-1/2 -right-4 p-2 rounded-xl bg-purple-950/80 border border-purple-400/30 text-purple-300 text-[9px] font-mono flex items-center gap-1.5 shadow-lg">
                    <Globe className="h-3 w-3" /> 06. Scaling
                  </div>

                  {/* Dynamic path connectors */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#00C2FF" strokeWidth="1" strokeDasharray="3 2" />
                    <line x1="50%" y1="50%" x2="25%" y2="85%" stroke="#10B981" strokeWidth="1" strokeDasharray="3 2" />
                    <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="#8B5CF6" strokeWidth="1" />
                  </svg>
                </div>

                <div className="relative z-10 border-t border-white/5 pt-3 flex items-center justify-between text-[8px] font-mono text-gray-500">
                  <span>99.98% NODE RUNTIME</span>
                  <span>SSL ROUTING ACTIVE</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OVERVIEW: Bento Grid of 6-Step Growth Framework */}
      <section id="overview" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">METHODOLOGY OVERVIEW</span>
            <h2 className="text-3xl font-black font-display text-white">Our 6-Step Growth Framework</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Click any of the stages below to see our specialized activities and system deliverables.</p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group cursor-pointer flex flex-col justify-between h-72 ${
                    isSelected 
                      ? 'bg-white/[0.04] border-primary/50 shadow-lg shadow-primary/10 scale-102' 
                      : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${isSelected ? 'text-[#00C2FF] border-[#00C2FF]/30' : 'text-gray-400'}`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 font-bold">STAGE {step.num}</span>
                    </div>

                    <h3 className={`text-base font-bold font-display mb-2 transition-colors ${isSelected ? 'text-[#00C2FF]' : 'text-white'}`}>
                      {step.title}
                    </h3>
                    
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[10px] font-mono text-gray-500 group-hover:text-[#00C2FF] transition-colors font-semibold">
                    <span>EXPLORE DELIVERABLES</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. JOURNEY: Interactive Timeline with animations */}
      <section id="journey" className="py-24 border-b border-white/[0.08] relative bg-dark/25 overflow-hidden" ref={timelineRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block font-semibold">THE SYSTEM MAP</span>
            <h2 className="text-3xl font-black font-display text-white">Transformation Journey</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Trace our technical integration milestones from initial stack audit to complete edge scaling.</p>
          </div>

          {/* Timeline Process Line */}
          <div className="relative max-w-5xl mx-auto py-8">
            <div className="absolute top-[40px] left-6 right-6 h-0.5 bg-white/5 pointer-events-none" />
            <div 
              className="absolute top-[40px] left-6 h-0.5 bg-gradient-to-r from-[#00C2FF] via-primary to-emerald-400 transition-all duration-500 pointer-events-none" 
              style={{ width: `${(activeStep / (steps.length - 1)) * 92}%` }}
            />

            <div className="grid grid-cols-6 gap-2 relative z-10">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-blue-400 to-primary border-[#00C2FF] text-white shadow-lg shadow-primary/30 scale-110' 
                        : 'bg-[#110B33] border-white/10 text-gray-500 group-hover:border-white/40'
                    }`}>
                      <span className="text-[10px] font-mono font-black">{step.num}</span>
                    </div>

                    <span className={`text-[10px] font-mono font-bold mt-3 transition-colors hidden sm:block ${isActive ? 'text-[#00C2FF]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Stage Panel showing details for Discover (01) through Scale (06) */}
          <div className="max-w-4xl mx-auto bg-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden text-left grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#00C2FF] to-primary" />
            
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-[9px] font-mono text-[#00C2FF] uppercase tracking-widest font-black bg-[#00C2FF]/10 px-2 py-1 rounded">STAGE {steps[activeStep].num} ARCHITECTURE</span>
                <h3 className="text-2xl font-black text-white font-display mt-2">{steps[activeStep].num}. {steps[activeStep].title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2">{steps[activeStep].desc}</p>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono text-gray-400 tracking-wider font-bold block uppercase">Core Milestones & Deliverables:</span>
                <div className="grid grid-cols-1 gap-2">
                  {steps[activeStep].activities.map((act, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-xs text-gray-300">
                      <CheckCircle className="h-4 w-4 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
              <div className="space-y-4 z-10">
                <span className="text-[8px] font-mono text-gray-400 tracking-wider uppercase block">Visual Asset Simulator</span>
                
                {/* 01. Discover - Discovery Dashboard mock */}
                {activeStep === 0 && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-gray-400">AI Readiness Score</span>
                        <span className="text-[#00C2FF] font-bold">42% (Incomplete)</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#00C2FF] h-full w-[42%]" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-[10px] font-mono">
                      <div className="flex justify-between"><span className="text-gray-400">Tech Stack Audit</span><span className="text-red-400 font-bold">Critical</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Leads Missed Daily</span><span className="text-red-400 font-bold">35+ drop</span></div>
                    </div>
                  </div>
                )}

                {/* 02. Strategize - Strategy Canvas mock */}
                {activeStep === 1 && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono space-y-2">
                      <span className="text-[#00C2FF] font-bold">Blueprints Mapping:</span>
                      <div className="p-1.5 rounded bg-[#110B33] text-gray-400 flex justify-between">
                        <span>Traffic AEO</span>
                        <span className="text-[#00C2FF]">Active</span>
                      </div>
                      <div className="p-1.5 rounded bg-[#110B33] text-gray-400 flex justify-between">
                        <span>n8n Routing Nodes</span>
                        <span className="text-purple-400">Configured</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 03. Build - 3D Ecosystem Architecture mock */}
                {activeStep === 2 && (
                  <div className="space-y-2 text-[10px] font-mono">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 flex justify-between">
                      <span>AI Marketing Platform™</span>
                      <span className="font-bold">Live</span>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex justify-between">
                      <span>GrowthOS™ suite</span>
                      <span className="font-bold">Active</span>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 flex justify-between">
                      <span>AgenticOS™ Node</span>
                      <span className="font-bold">Standby</span>
                    </div>
                  </div>
                )}

                {/* 04. Automate - Node-Based Automation Diagram mock */}
                {activeStep === 3 && (
                  <div className="space-y-2 text-[10px] font-mono">
                    <div className="p-2 rounded-lg bg-[#110B33] border border-white/5 space-y-1">
                      <div className="flex justify-between text-cyan-400">
                        <span>Webhook Listeners</span>
                        <span>[OK]</span>
                      </div>
                      <div className="text-[9px] text-gray-500">n8n trigger: Lead Recieved</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#110B33] border border-white/5 space-y-1">
                      <div className="flex justify-between text-purple-400">
                        <span>AI voice dialers</span>
                        <span>[READY]</span>
                      </div>
                      <div className="text-[9px] text-gray-500">Auto outbound qualified dials</div>
                    </div>
                  </div>
                )}

                {/* 05. Optimize - Live Analytics Dashboard mock */}
                {activeStep === 4 && (
                  <div className="space-y-3 text-[10px] font-mono">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Attributed ROI</span>
                        <span className="text-emerald-400 font-bold">+342% growth</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[85%]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 06. Scale - Growth Graph Animation mock */}
                {activeStep === 5 && (
                  <div className="space-y-2 text-[10px] font-mono">
                    <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 text-center">
                      <TrendingUp className="h-5 w-5 mx-auto mb-1 text-emerald-400" />
                      <span className="font-bold">System scaling limit unlocked</span>
                      <p className="text-[9px] text-gray-400 mt-1">Multi-location clusters live</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[8px] font-mono text-gray-500">
                <span>SIMULATION NODE</span>
                <span>STATUS: STABLE</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. DISCOVER: Discovery Dashboard Section */}
      <section id="discover" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase block font-semibold">STAGE 01 — AUDIT & INTERVIEWS</span>
              <h2 className="text-3xl font-black font-display text-white">01. Discover Your Latent Potential</h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                We perform an extensive technology and marketing audit. Our engineers explore your current CRM infrastructure, legacy spreadsheet habits, and conversion bottlenecks to calculate your real AI Readiness Score.
              </p>
              
              <ul className="space-y-3">
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" /> Stakeholder Discovery Interviews
                </li>
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" /> Complete Tech Stack Vulnerability Log
                </li>
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" /> Marketing Audit & Ad Spend Leakage report
                </li>
              </ul>

              <button 
                onClick={() => setPath('ai-readiness-assessment')}
                className="px-5 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold rounded-xl border border-blue-500/20 transition-all inline-flex items-center gap-2"
              >
                Take AI Readiness Assessment <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="lg:col-span-7">
              {/* Discovery Dashboard Visual */}
              <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-5 sm:p-6 relative overflow-hidden text-left space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-3">
                  <span className="text-gray-400">📊 SYSTEM COMPLIANCE SCORE</span>
                  <span className="text-red-400 bg-red-400/10 border border-red-400/20 px-1.5 py-0.5 rounded">GAP DETECTED</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[9px] font-mono text-gray-400">Total Lead Leakage</span>
                    <span className="text-xl font-bold text-red-400 block mt-1">38.4%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[9px] font-mono text-gray-400">Response Delay</span>
                    <span className="text-xl font-bold text-red-400 block mt-1">4.2 Hours</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-mono space-y-2">
                  <span className="text-[#00C2FF] font-bold">Diagnostic Scopes:</span>
                  <div className="flex justify-between text-gray-400">
                    <span>↳ Duplicate Database Records</span>
                    <span className="text-red-400">830 contacts</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>↳ Unverified Telephone Lines</span>
                    <span className="text-red-400">22% line list</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. STRATEGIZE: Strategy Canvas Section */}
      <section id="strategize" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 order-2 lg:order-1">
              {/* Strategy Canvas Visual */}
              <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-5 sm:p-6 relative overflow-hidden text-left space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-3">
                  <span className="text-gray-400">🗺️ BLUEPRINT STRATEGY CANVAS</span>
                  <span className="text-violet-400">STRATEGY GENERATED</span>
                </div>

                <div className="space-y-2.5 text-[10px] font-mono">
                  <div className="p-3 rounded-xl bg-[#110B33] border border-white/5 flex justify-between items-center">
                    <span>Funnel Hook Configuration</span>
                    <span className="text-violet-400 font-bold bg-violet-400/10 px-2 py-0.5 rounded border border-violet-400/20">STAGE 01</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#110B33] border border-white/5 flex justify-between items-center">
                    <span>n8n Routing & Integration Paths</span>
                    <span className="text-violet-400 font-bold bg-violet-400/10 px-2 py-0.5 rounded border border-violet-400/20">STAGE 02</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#110B33] border border-white/5 flex justify-between items-center">
                    <span>Outbound voice agent calendars sync</span>
                    <span className="text-violet-400 font-bold bg-violet-400/10 px-2 py-0.5 rounded border border-violet-400/20">STAGE 03</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase block font-semibold">STAGE 02 — BLUEPRINTS MAPPING</span>
              <h2 className="text-3xl font-black font-display text-white">02. Design the Growth Roadmap</h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                We engineer a bespoke technological solution map. You receive exact schema diagrams displaying how our communication webhooks, unified CRM custom fields, and AI caller networks will bind to save thousands.
              </p>
              
              <ul className="space-y-3">
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" /> 12-Month Expansion Timeline Mapping
                </li>
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" /> Customer Conversion Journey blueprints
                </li>
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" /> Low-Code CRM Trigger flowchart
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BUILD: 3D Ecosystem Architecture Section */}
      <section id="build" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block font-semibold">STAGE 03 — PLATFORM INTEGRATION</span>
              <h2 className="text-3xl font-black font-display text-white">03. Build the Core Ecosystem</h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Our developers implement our custom-engineered suite elements, installing clean GoHighLevel custom calendars, database segments, and messaging templates built for instant speed.
              </p>
              
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono">
                <div className="p-2 bg-[#110B33] border border-white/5 rounded-lg text-emerald-400 font-semibold text-center">
                  AI Marketing Platform™
                </div>
                <div className="p-2 bg-[#110B33] border border-white/5 rounded-lg text-emerald-400 font-semibold text-center">
                  GrowthOS™ Suite
                </div>
                <div className="p-2 bg-[#110B33] border border-white/5 rounded-lg text-emerald-400 font-semibold text-center">
                  BusinessOS™ Suite
                </div>
                <div className="p-2 bg-[#110B33] border border-white/5 rounded-lg text-emerald-400 font-semibold text-center">
                  AgenticOS™ Layer
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* 3D Ecosystem Architecture visual stacking */}
              <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-6 relative overflow-hidden space-y-6">
                <span className="text-[9px] font-mono text-gray-400 block tracking-wider uppercase border-b border-white/5 pb-2">Stacked Operations Core</span>
                
                <div className="relative h-44 flex flex-col justify-between">
                  {/* Layer 3 */}
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono flex justify-between items-center translate-y-2 select-none shadow-md">
                    <span>AGENTS LAYER (AgenticOS)</span>
                    <span className="text-[10px] bg-purple-400/10 border border-purple-400/20 px-2 py-0.5 rounded font-bold">READY</span>
                  </div>
                  
                  {/* Layer 2 */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex justify-between items-center translate-y-1 select-none shadow-md">
                    <span>WORKFLOW INTEGRATION (GrowthOS / CRM)</span>
                    <span className="text-[10px] bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded font-bold">ACTIVE</span>
                  </div>

                  {/* Layer 1 */}
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono flex justify-between items-center select-none shadow-md">
                    <span>TRAFFIC ATTRIBUTION (AI Marketing Platform)</span>
                    <span className="text-[10px] bg-blue-400/10 border border-blue-400/20 px-2 py-0.5 rounded font-bold">TRACKING</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. AUTOMATE: Node-Based Automation Diagram Section */}
      <section id="automate" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 order-2 lg:order-1">
              {/* Node-Based Automation Diagram with Simulated Telemetry Screen Recording */}
              <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-5 sm:p-6 relative overflow-hidden text-left space-y-4">
                
                {/* Header controls bar */}
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[8px] font-mono text-gray-500 tracking-wider">n8n WORKFLOW BUILDER ACTIVE</span>
                  <button 
                    onClick={() => setSimulationRunning(!simulationRunning)}
                    className="p-1 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white text-[9px] font-mono uppercase font-bold transition-all"
                  >
                    {simulationRunning ? 'Pause Simulator' : 'Play Simulator'}
                  </button>
                </div>

                {/* Automation Webhook Nodes */}
                <div className="grid grid-cols-3 gap-3 relative py-4 text-[10px] font-mono">
                  
                  {/* Trigger Node */}
                  <div 
                    onMouseEnter={() => setAutomationNodeHover('webhook')}
                    onMouseLeave={() => setAutomationNodeHover(null)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      automationNodeHover === 'webhook' 
                        ? 'bg-[#00C2FF]/10 border-[#00C2FF] text-white' 
                        : 'bg-white/[0.02] border-white/5 text-gray-400'
                    }`}
                  >
                    <span className="block font-bold text-white uppercase text-[8px] mb-1">TRIGGER</span>
                    Webhook Listener
                  </div>

                  {/* Middleware Router */}
                  <div 
                    onMouseEnter={() => setAutomationNodeHover('router')}
                    onMouseLeave={() => setAutomationNodeHover(null)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      automationNodeHover === 'router' 
                        ? 'bg-purple-500/10 border-purple-500 text-white' 
                        : 'bg-white/[0.02] border-white/5 text-gray-400'
                    }`}
                  >
                    <span className="block font-bold text-white uppercase text-[8px] mb-1">COGNITION</span>
                    AI Router Node
                  </div>

                  {/* Action Node */}
                  <div 
                    onMouseEnter={() => setAutomationNodeHover('action')}
                    onMouseLeave={() => setAutomationNodeHover(null)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      automationNodeHover === 'action' 
                        ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                        : 'bg-white/[0.02] border-white/5 text-gray-400'
                    }`}
                  >
                    <span className="block font-bold text-white uppercase text-[8px] mb-1">ACTION</span>
                    WhatsApp Dispatch
                  </div>

                </div>

                {/* Simulated Telemetry Log Console */}
                <div className="p-3 bg-[#0c0827] border border-white/5 rounded-xl font-mono text-[9px] text-gray-400 space-y-1 h-36 overflow-hidden relative">
                  <div className="absolute top-1 right-2 text-[8px] text-gray-600">LIVE SHELL LOG</div>
                  <div className="divide-y divide-white/[0.02] space-y-1 mt-1.5">
                    {logs.map((log, index) => (
                      <div key={index} className="pt-1">{log}</div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block font-semibold">STAGE 04 — PIPELINE EXECUTION</span>
              <h2 className="text-3xl font-black font-display text-white">04. Integrate Automation Nodes</h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                We design and link advanced self-healing webhook automations. Your system listens for customer clicks, scores their intent, and fires WhatsApp template responses or schedules call tasks in milliseconds.
              </p>
              
              <ul className="space-y-3">
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" /> Meta Cloud WhatsApp API integrations
                </li>
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" /> Natural-sounding outbound AI telephone dialers
                </li>
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" /> Self-healing n8n workflow systems
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 8. OPTIMIZE: Live Analytics Dashboard Section */}
      <section id="optimize" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase block font-semibold">STAGE 05 — MODEL FINE-TUNING</span>
              <h2 className="text-3xl font-black font-display text-white">05. Continuous Model Optimization</h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                We do not configure once and leave. We analyze lead qualification scores, refine conversational prompt guardrails, and upgrade underlying language models weekly to drive maximum ROI.
              </p>
              
              <ul className="space-y-3">
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" /> Landing page conversion rate updates
                </li>
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" /> Continuous prompt security tuning & guardrail checks
                </li>
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" /> Direct transparent revenue dashboard integration
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              {/* Live Analytics Dashboard Visual */}
              <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-5 sm:p-6 relative overflow-hidden text-left space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-3">
                  <span className="text-gray-400">📈 ATTRIBUTED CAMPAIGN PERFORMANCE</span>
                  <span className="text-emerald-400 font-bold">ROBUST SLA ON</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-[10px] font-mono">
                  <div className="p-3 bg-[#110B33] border border-white/5 rounded-xl">
                    <span className="block text-gray-400 text-[8px] mb-1">CONVERSIONS</span>
                    <span className="text-base font-bold text-white">+148%</span>
                  </div>
                  <div className="p-3 bg-[#110B33] border border-white/5 rounded-xl">
                    <span className="block text-gray-400 text-[8px] mb-1">AEO ATTRIBUTION</span>
                    <span className="text-base font-bold text-purple-400">92% score</span>
                  </div>
                  <div className="p-3 bg-[#110B33] border border-white/5 rounded-xl">
                    <span className="block text-gray-400 text-[8px] mb-1">SAVED SALARY</span>
                    <span className="text-base font-bold text-emerald-400">$8,500/mo</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-mono flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-gray-400">Attributed Sales Pipeline</span>
                  </div>
                  <span className="text-emerald-400 font-bold">$42,300 tracked</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. SCALE: Growth Graph Animation Section */}
      <section id="scale" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 order-2 lg:order-1">
              {/* Growth Graph Animation SVG representation */}
              <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-5 sm:p-6 relative overflow-hidden text-left space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                  <span className="text-gray-400">📈 COMPOUND REVENUE SCALABILITY</span>
                  <span className="text-cyan-400 font-bold">EDGE SCALE ACTIVE</span>
                </div>

                <div className="relative h-44 border-b border-l border-white/10 flex items-end">
                  {/* Compound curves simulated */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M 0 90 Q 25 80, 50 60 T 100 10" fill="none" stroke="#00C2FF" strokeWidth="2" strokeDasharray="3 2" />
                    <path d="M 0 95 Q 30 75, 60 40 T 100 0" fill="none" stroke="#8B5CF6" strokeWidth="3" />
                  </svg>
                  
                  <div className="absolute top-2 right-2 text-[8px] font-mono text-right text-purple-400">
                    <span className="block font-bold">Agentic Scaling</span>
                    <span className="text-gray-500">Compounding margins</span>
                  </div>
                </div>

                <span className="text-[8px] font-mono text-gray-500 block text-center">MONTH 1 TO MONTH 12 PERFORMANCE COMPANION</span>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block font-semibold">STAGE 06 — CORPORATE SCALE</span>
              <h2 className="text-3xl font-black font-display text-white">06. Compound Scaling & AI Workers</h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                We expand automation capacities beyond standard scopes. Deployed arrays process millions of simultaneous records on edge-cached routing points, introducing sovereign AI employees to save on physical desks.
              </p>
              
              <ul className="space-y-3">
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" /> High-volume edge-cached load balancing
                </li>
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" /> Sovereign AI workers coordinating admin lists
                </li>
                <li className="flex gap-2 text-xs text-gray-300">
                  <Check className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" /> Third-party multi-branch server clusters
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 10. WORKFLOW DIAGRAM: End-to-End Workflow React Flow visual mapping */}
      <section id="workflow_diagram" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block font-semibold">SYSTEM SEQUENCE</span>
            <h2 className="text-3xl font-black font-display text-white">End-to-End Conversion Workflow</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Explore how leads flow through our sequential, cloud-native communication webhooks.</p>
          </div>

          <div className="max-w-5xl mx-auto bg-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden text-left space-y-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
              <div>
                <span className="text-[9px] font-mono uppercase text-[#00C2FF] font-black">SYSTEM SEQUENCE TOPOLOGY</span>
                <h3 className="text-base font-bold font-display text-white">Active Conversion Path</h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-400/10 text-emerald-400 px-2.5 py-1 rounded font-bold">100% AUTOMATED PATH</span>
            </div>

            {/* Simulated Node Workflow list */}
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 relative z-10 text-center">
              {[
                { label: 'Lead Generation', tag: 'AEO / ADS', border: 'border-blue-500/20 text-blue-400 bg-blue-500/5' },
                { label: 'CRM Intake', tag: 'GrowthOS™', border: 'border-indigo-500/20 text-indigo-400 bg-indigo-500/5' },
                { label: 'Automation', tag: 'n8n nodes', border: 'border-purple-500/20 text-purple-400 bg-purple-500/5' },
                { label: 'Communication', tag: 'WhatsApp API', border: 'border-pink-500/20 text-pink-400 bg-pink-500/5' },
                { label: 'AI Agents', tag: 'RAG Voice Bot', border: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/5' },
                { label: 'Analytics', tag: 'GA4/Attribution', border: 'border-amber-500/20 text-amber-400 bg-amber-500/5' },
                { label: 'Optimization', tag: 'Chief AI Audit', border: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' }
              ].map((flow, index) => (
                <div key={index} className={`p-3 rounded-xl border ${flow.border} space-y-2 flex flex-col justify-between h-32 hover:scale-105 transition-transform duration-300`}>
                  <span className="text-[8px] font-mono opacity-60">NODE 0{index + 1}</span>
                  <div className="space-y-1">
                    <span className="text-xs font-bold block leading-tight text-white">{flow.label}</span>
                    <span className="text-[9px] font-mono block opacity-80">{flow.tag}</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold block">{index === 6 ? 'SUCCESS ✓' : '↳ ROUTE'}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 11. PROJECT DASHBOARD: Interactive glassmorphic Project Lifecycle Dashboard */}
      <section id="project_dashboard" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">CLIENT PORTAL INTERFACE</span>
            <h2 className="text-3xl font-black font-display text-white">Project Lifecycle Dashboard</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Click different lifecycle phases below to simulate how we track delivery logs and milestones.</p>
          </div>

          <div className="max-w-5xl mx-auto bg-white/[0.01] border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-left">
            {/* Tab selection menu */}
            <div className="flex flex-wrap border-b border-white/5 bg-white/[0.02]">
              {['planning', 'implementation', 'automation', 'analytics', 'optimization'].map((mod) => (
                <button
                  key={mod}
                  onClick={() => setActiveDashboardTab(mod as any)}
                  className={`px-5 py-4 text-xs font-mono font-bold uppercase tracking-wider transition-all border-b-2 ${
                    activeDashboardTab === mod 
                      ? 'border-[#00C2FF] text-[#00C2FF] bg-white/[0.03]' 
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  {mod} Module
                </button>
              ))}
            </div>

            {/* Dashboard detail content area */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Module Text Info */}
              <div className="md:col-span-7 space-y-6">
                {activeDashboardTab === 'planning' && (
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono text-[#00C2FF] uppercase tracking-widest font-black bg-[#00C2FF]/10 px-2 py-0.5 rounded border border-[#00C2FF]/20">Phase 01 Deliverables</span>
                    <h3 className="text-xl font-bold text-white font-display">Diagnostic & Architecture Blueprinting</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      We outline exact software scopes, map duplicate database fields, construct user journey paths, and establish initial benchmark criteria before writing single script files.
                    </p>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex gap-2 items-center"><CheckCircle className="h-4 w-4 text-[#00C2FF]" /> Tech Stack Audit report delivered</div>
                      <div className="flex gap-2 items-center"><CheckCircle className="h-4 w-4 text-[#00C2FF]" /> High-Level Systems flow maps approved</div>
                    </div>
                  </div>
                )}

                {activeDashboardTab === 'implementation' && (
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono text-[#00C2FF] uppercase tracking-widest font-black bg-[#00C2FF]/10 px-2 py-0.5 rounded border border-[#00C2FF]/20">Phase 02 Deliverables</span>
                    <h3 className="text-xl font-bold text-white font-display">Platform Deployments & Custom Setup</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Our systems administrators deploy the complete core workspace on GoHighLevel CRM and hook serverless databases safely inside standard cloud environments.
                    </p>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex gap-2 items-center"><CheckCircle className="h-4 w-4 text-[#00C2FF]" /> Unified CRM workspace setup</div>
                      <div className="flex gap-2 items-center"><CheckCircle className="h-4 w-4 text-[#00C2FF]" /> Automated scheduling slots synced</div>
                    </div>
                  </div>
                )}

                {activeDashboardTab === 'automation' && (
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono text-[#00C2FF] uppercase tracking-widest font-black bg-[#00C2FF]/10 px-2 py-0.5 rounded border border-[#00C2FF]/20">Phase 03 Deliverables</span>
                    <h3 className="text-xl font-bold text-white font-display">Workflow Logic & API Hook Activation</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      We script core n8n webhooks, activate official Meta WhatsApp Business API channels, and train specialized low-latency language voice dialers.
                    </p>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex gap-2 items-center"><CheckCircle className="h-4 w-4 text-[#00C2FF]" /> n8n automation pathways built</div>
                      <div className="flex gap-2 items-center"><CheckCircle className="h-4 w-4 text-[#00C2FF]" /> WhatsApp Cloud API templates verified</div>
                    </div>
                  </div>
                )}

                {activeDashboardTab === 'analytics' && (
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono text-[#00C2FF] uppercase tracking-widest font-black bg-[#00C2FF]/10 px-2 py-0.5 rounded border border-[#00C2FF]/20">Phase 04 Deliverables</span>
                    <h3 className="text-xl font-bold text-white font-display">Campaign Launches & Attribution Monitoring</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      We activate the AI Marketing Platform™ pipelines, mapping incoming customer metrics to track precise ROI conversion funnels.
                    </p>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex gap-2 items-center"><CheckCircle className="h-4 w-4 text-[#00C2FF]" /> Campaign attribution codes live</div>
                      <div className="flex gap-2 items-center"><CheckCircle className="h-4 w-4 text-[#00C2FF]" /> Real-time ROI scorecard synced</div>
                    </div>
                  </div>
                )}

                {activeDashboardTab === 'optimization' && (
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono text-[#00C2FF] uppercase tracking-widest font-black bg-[#00C2FF]/10 px-2 py-0.5 rounded border border-[#00C2FF]/20">Phase 05 Deliverables</span>
                    <h3 className="text-xl font-bold text-white font-display">Continuous prompt tuning & Compliance Upgrades</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Our fractional Chief AI Officers conduct security audits, refine system prompt scripts, and tune semantic database logs to prevent errors.
                    </p>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex gap-2 items-center"><CheckCircle className="h-4 w-4 text-[#00C2FF]" /> Prompt guardrails fully updated</div>
                      <div className="flex gap-2 items-center"><CheckCircle className="h-4 w-4 text-[#00C2FF]" /> SLA uptime reports delivered</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mock Dashboard interface Panel */}
              <div className="md:col-span-5 bg-[#110B33] border border-white/5 rounded-2xl p-5 relative overflow-hidden space-y-4 shadow-inner">
                <div className="flex justify-between items-center text-[8px] font-mono text-gray-500 pb-2 border-b border-white/5">
                  <span>⚙️ SYSTEM RUNTIME STATS</span>
                  <span className="text-emerald-400 font-bold">ONLINE ●</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
                  <div className="p-2 bg-white/[0.01] border border-white/5 rounded-lg">
                    <span className="block text-gray-500 text-[8px]">Active Webhooks</span>
                    <span className="text-xs font-bold text-white">12 nodes</span>
                  </div>
                  <div className="p-2 bg-white/[0.01] border border-white/5 rounded-lg">
                    <span className="block text-gray-500 text-[8px]">Queue Status</span>
                    <span className="text-xs font-bold text-emerald-400">0 pending</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[9px] font-mono space-y-1 text-gray-400">
                  <div className="text-[8px] uppercase text-gray-500 font-bold">Telemetry Health Indicators:</div>
                  <div className="flex justify-between"><span>SSL Attestation:</span><span className="text-[#00C2FF]">Verified ✓</span></div>
                  <div className="flex justify-between"><span>n8n Core Memory:</span><span className="text-purple-400">0.2% usage</span></div>
                  <div className="flex justify-between"><span>API Gateway SLA:</span><span className="text-emerald-400">99.98% runtime</span></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 12. INDUSTRY BLUEPRINTS: Industry-Specific Frameworks */}
      <section id="industry_blueprints" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">TAILORED TRANSFORMATION</span>
            <h2 className="text-3xl font-black font-display text-white">Industry-Specific Frameworks</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Explore custom blueprints deployed specifically for healthcare, real estate, and education sectors.</p>
          </div>

          {/* Interactive tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {industryBlueprints.map((ind) => (
              <button
                key={ind.name}
                onClick={() => setActiveIndustryBlueprint(ind.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeIndustryBlueprint === ind.name 
                    ? 'bg-[#00C2FF] border-[#00C2FF] text-[#110B33] shadow-md shadow-[#00C2FF]/10' 
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>

          {/* Blueprint Detail box */}
          {industryBlueprints.map((ind) => {
            if (ind.name !== activeIndustryBlueprint) return null;
            return (
              <div 
                key={ind.name}
                className="max-w-4xl mx-auto bg-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-8 text-left grid grid-cols-1 md:grid-cols-12 gap-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="md:col-span-8 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-[#00C2FF] uppercase tracking-widest font-black bg-[#00C2FF]/10 px-2 py-0.5 rounded">Deployable Blueprint</span>
                    <h3 className="text-xl font-bold text-white font-display mt-2">{ind.headline}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">{ind.desc}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 font-bold block uppercase">{ind.bulletTitle}</span>
                    <ul className="grid grid-cols-1 gap-2">
                      {ind.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-xs text-gray-300">
                          <Check className="h-4 w-4 text-[#00C2FF] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-48 md:h-auto">
                  <div>
                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider block">ATTRIBUTED ROI IMPROVEMENT</span>
                    <span className="text-2xl font-black font-display text-white mt-2 block bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00C2FF] to-white">{ind.metric}</span>
                  </div>
                  
                  <span className="text-[8px] font-mono text-gray-500 uppercase block tracking-widest">SLA ATTESTED BY ADVISORS</span>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* 13. DELIVERY MODEL: Flexible Delivery Model cards */}
      <section id="delivery_model" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">PARTNERSHIP ENGAGEMENT</span>
            <h2 className="text-3xl font-black font-display text-white">Flexible Delivery Model</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Explore how we align with your current internal engineering constraints.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {deliveryModels.map((card, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-[#00C2FF]/30 text-left transition-all duration-300 flex flex-col justify-between h-72 group"
              >
                <div>
                  <span className="text-[8px] font-mono text-[#00C2FF] font-bold bg-[#00C2FF]/10 px-2 py-0.5 rounded border border-[#00C2FF]/20 uppercase">
                    {card.tag}
                  </span>
                  <h3 className="text-sm font-bold font-display text-white mt-4 group-hover:text-[#00C2FF] transition-colors">{card.title}</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mt-2">
                    {card.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider block">KEY BENEFIT</span>
                  <span className="text-[10px] text-white font-semibold mt-1 block">{card.benefit}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 14. PROJECT TIMELINE: Typical Implementation Timeline */}
      <section id="project_timeline" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">DELIVERY LIFECYCLE</span>
            <h2 className="text-3xl font-black font-display text-white">Typical Implementation Timeline</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">See how we compress months of legacy software coding into simple, focused week schedules.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 text-left">
            {typicalPhases.map((phase, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#00C2FF] font-bold tracking-wider">{phase.title}</span>
                  <p className="text-xs text-gray-300 leading-relaxed">{phase.desc}</p>
                </div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest shrink-0">MILESTONE 0{idx + 1}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 15. FAQ Accordion section */}
      <section id="faq" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block font-semibold">FAQ ARCHIVE</span>
            <h2 className="text-3xl font-black font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Explore all 15 detailed inquiries mapping our strategic setups, platforms, and security.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border transition-all duration-300 overflow-hidden"
                  style={{
                    backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.01)',
                    borderColor: isOpen ? 'rgba(0, 194, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white pr-4">{faq.q}</span>
                    <span className={`p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00C2FF]' : ''}`}>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-white/[0.05] text-xs text-gray-300 leading-relaxed">
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

      {/* 16. CONSULTATION FORM: Start Your Transformation Journey */}
      <section id="consultation_form" className="py-24 border-b border-white/[0.08] relative" ref={formRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">SECURE GATEWAY ENTRANCE</span>
              <h2 className="text-3xl font-black font-display text-white">Start Your Transformation Journey</h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Connect your business with our automated GoHighLevel databases and n8n secure listeners. Book your 1-on-1 strategy call with our automation engineers today.
              </p>
              
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-mono space-y-2 text-gray-400 leading-relaxed">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase text-[8px] mb-1">
                  <Lock className="h-3.5 w-3.5" /> INTEGRATION STANDARDS SECURED
                </div>
                <p>✓ Syncing directly via secure GoHighLevel CRM webhooks</p>
                <p>✓ Triggering automatic n8n email/WhatsApp calendar invite notifications</p>
                <p>✓ Encrypted via complete SSL/TLS protocols</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#110B33] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      onSubmit={handleContactSubmit}
                      className="space-y-4 text-left"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {formError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex gap-2 items-center">
                          <AlertTriangle className="h-4 w-4 shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase text-gray-400">Full Name *</label>
                          <input 
                            type="text" 
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:border-[#00C2FF] focus:outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase text-gray-400">Company Name *</label>
                          <input 
                            type="text" 
                            required
                            value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:border-[#00C2FF] focus:outline-none transition-all"
                            placeholder="Acme Corporation"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase text-gray-400">Industry</label>
                          <select 
                            value={formData.industry}
                            onChange={(e) => setFormData({...formData, industry: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-all"
                          >
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Retail & Ecommerce">Retail & Ecommerce</option>
                            <option value="Professional Services">Professional Services</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase text-gray-400">Country</label>
                          <input 
                            type="text" 
                            value={formData.country}
                            onChange={(e) => setFormData({...formData, country: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:border-[#00C2FF] focus:outline-none transition-all"
                            placeholder="India"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase text-gray-400">Email Address *</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:border-[#00C2FF] focus:outline-none transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase text-gray-400">Phone Number *</label>
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:border-[#00C2FF] focus:outline-none transition-all"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase text-gray-400">Monthly Revenue Range</label>
                          <select 
                            value={formData.revenue}
                            onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-all"
                          >
                            <option value="$10k - $50k / month">$10k - $50k / month</option>
                            <option value="$50k - $100k / month">$50k - $100k / month</option>
                            <option value="$100k - $500k / month">$100k - $500k / month</option>
                            <option value="$500k+ / month">$500k+ / month</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase text-gray-400">Preferred Solution core</label>
                          <select 
                            value={formData.solution}
                            onChange={(e) => setFormData({...formData, solution: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-all"
                          >
                            <option value="GrowthOS™ Unified CRM">GrowthOS™ Unified CRM</option>
                            <option value="BusinessOS™ Support Nodes">BusinessOS™ Support Nodes</option>
                            <option value="AgenticOS™ AI Workers">AgenticOS™ AI Workers</option>
                            <option value="Custom API Integrations">Custom API Integrations</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase text-gray-400">Current Challenges</label>
                        <textarea 
                          value={formData.challenges}
                          onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:border-[#00C2FF] focus:outline-none transition-all h-20"
                          placeholder="Describe manual gaps, lead drop rates..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase text-gray-400">Message / Extra Details</label>
                        <textarea 
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:border-[#00C2FF] focus:outline-none transition-all h-20"
                          placeholder="Any extra info..."
                        />
                      </div>

                      {/* Security Captcha verification checkbox */}
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="captcha"
                            checked={captchaChecked}
                            onChange={(e) => setCaptchaChecked(e.target.checked)}
                            className="w-4.5 h-4.5 accent-primary border border-white/15 rounded bg-white/5"
                          />
                          <label htmlFor="captcha" className="text-[10px] font-mono text-gray-400 cursor-pointer select-none">
                            I verify that I am a human representative.
                          </label>
                        </div>
                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      </div>

                      <button
                        type="submit"
                        disabled={submittingForm}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00C2FF] to-primary text-white text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                      >
                        {submittingForm ? (
                          <>Dispatched Webhook...</>
                        ) : (
                          <>Submit Form <Send className="h-4 w-4" /></>
                        )}
                      </button>

                    </motion.form>
                  ) : (
                    <motion.div 
                      className="text-center py-12 space-y-6"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/25 rounded-full inline-block text-emerald-400">
                        <CheckCircle className="h-10 w-10 animate-bounce" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold font-display text-white">Webhook Payload Successfully Sent!</h3>
                        <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                          Your records have been synchronized with GoHighLevel databases. Our n8n triggers will send automated WhatsApp and email calendar details shortly.
                        </p>
                      </div>

                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 17. FINAL CTA: Let's Build Your Growth Engine */}
      <section id="final_cta" className="relative py-24 overflow-hidden border-b border-white/[0.08]">
        {/* Animated process intelligence mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-[#110B33]/80 to-purple-950/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            ⚡ COMMENCE SCALING NOW
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
            Let's Build Your Growth Engine
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Take control of your business data pipelines. Deploy sovereign, multilingual chatbots, configure advanced n8n triggers, and capture and scale automated opportunities.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => scrollToSection(formRef)}
              className="px-6 py-3.5 bg-gradient-to-r from-[#00C2FF] to-primary hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              Book Strategy Call <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setPath('contact')}
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
            >
              Talk To Experts
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
