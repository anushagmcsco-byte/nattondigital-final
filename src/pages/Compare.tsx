import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Check, 
  X, 
  Layers, 
  Cpu, 
  Compass, 
  TrendingUp, 
  ChevronRight, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Coins, 
  LineChart, 
  Users, 
  FolderSync, 
  MessageSquare, 
  BookmarkCheck, 
  PhoneCall, 
  Maximize2,
  Minimize2,
  Calendar,
  Settings,
  Flame,
  MousePointer,
  PlayCircle,
  Clock,
  HelpCircle,
  HelpCircle as HelpIcon,
  Sparkles as SparkleIcon,
  Lightbulb,
  Building2,
  Briefcase,
  Store,
  GraduationCap,
  HeartPulse,
  Activity,
  Send,
  Loader2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { RoutePath } from '../types';

interface CompareProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Compare({ setPath, darkMode }: CompareProps) {
  // Navigation active tab for selectors
  const [selectedComparison, setSelectedComparison] = useState<string>('hubspot');
  
  // Custom interactive sliders for savings calculator
  const [teamSize, setTeamSize] = useState<number>(15);
  const [agencyRetainer, setAgencyRetainer] = useState<number>(3500);
  const [automationNeeds, setAutomationNeeds] = useState<number>(3); // 1 = Low, 2 = Mid, 3 = High, 4 = Enterprise
  
  // Carousel index for customer stories
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  
  // Interactive before/after agency toggle
  const [isAfterState, setIsAfterState] = useState<boolean>(true);
  
  // Interactive Timeline active step
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);
  
  // Interactive industry picker
  const [activeIndustry, setActiveIndustry] = useState<string>('retail');
  
  // Consultation Form States
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    currentPlatform: 'HubSpot',
    industry: 'Retail & E-commerce',
    country: 'India',
    email: '',
    phone: '',
    challenges: '',
    message: ''
  });
  
  // FAQ accordion tracking (20 questions)
  const [openedFaqs, setOpenedFaqs] = useState<Record<number, boolean>>({
    0: true,
    1: false
  });

  const toggleFaq = (index: number) => {
    setOpenedFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --------------------------------------------------------
  // DATA AND PROJECTIONS CALCULATORS
  // --------------------------------------------------------
  
  // Traditional Monthly Cost Calculation
  // 1. CRM Licenses: Team Size * $80/user + base platform platform fee (e.g. HubSpot Sales/Marketing Professional starts at $500/mo base)
  const traditionalCrmMonthly = Math.round((teamSize * 75) + 450);
  // 2. Marketing Agency: Retainer input
  const traditionalAgencyMonthly = agencyRetainer;
  // 3. Dev/Integrators: automation needs scaling
  const traditionalDevMonthly = automationNeeds * 1200;
  
  const totalTraditionalMonthly = traditionalCrmMonthly + traditionalAgencyMonthly + traditionalDevMonthly;
  
  // Natton Digital cost is single monthly subscription covering standard setups + platform access
  const nattonMonthly = Math.round(999 + (teamSize * 15) + (automationNeeds * 200));
  const netMonthlySavings = Math.max(100, totalTraditionalMonthly - nattonMonthly);
  const netYearlySavings = netMonthlySavings * 12;
  const roiPercentage = Math.round((netYearlySavings / (nattonMonthly * 12)) * 100);

  // Recharts Chart Data: 12-Month Accumulation Projection
  const savingsTimelineData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const traditionalCumulative = totalTraditionalMonthly * month;
    const nattonCumulative = nattonMonthly * month;
    const savingsCumulative = traditionalCumulative - nattonCumulative;
    return {
      name: `Mo ${month}`,
      'Traditional Cost': traditionalCumulative,
      'Natton Cost': nattonCumulative,
      'Accumulated Savings': savingsCumulative,
    };
  });

  // Recharts Radar Data: Salesforce Comparison
  const salesforceRadarData = [
    { subject: 'Cost Efficiency', Natton: 98, Salesforce: 20, fullMark: 100 },
    { subject: 'Setup Speed', Natton: 95, Salesforce: 15, fullMark: 100 },
    { subject: 'AI Flexibility', Natton: 92, Salesforce: 40, fullMark: 100 },
    { subject: 'Native WhatsApp', Natton: 98, Salesforce: 35, fullMark: 100 },
    { subject: 'n8n Workflow Nodes', Natton: 100, Salesforce: 10, fullMark: 100 },
    { subject: 'Implementation Support', Natton: 95, Salesforce: 50, fullMark: 100 },
  ];

  // Recharts Bar Data: ROI Breakdown (Cost, Speed, Hours Saved)
  const roiBreakdownData = [
    { name: 'CRM Licenses ($)', Traditional: traditionalCrmMonthly, Natton: Math.round(nattonMonthly * 0.3) },
    { name: 'Agency/Ops Retainers ($)', Traditional: traditionalAgencyMonthly, Natton: Math.round(nattonMonthly * 0.4) },
    { name: 'Custom Dev Integrations ($)', Traditional: traditionalDevMonthly, Natton: Math.round(nattonMonthly * 0.3) },
  ];

  // --------------------------------------------------------
  // STATIC CONTENT BLOCKS
  // --------------------------------------------------------

  const ecosystemCards = [
    { name: "AI Marketing Platform™", desc: "Autonomous programmatic ad triggers, social posting agents, and search engine optimization nodes routing directly to your CRM.", icon: Sparkles },
    { name: "GrowthOS™", desc: "A unified system dashboard mapping cold outreach, live chat conversions, and customer journey pipelines in real-time.", icon: TrendingUp },
    { name: "BusinessOS™", desc: "Internal organizational management nodes syncing calendars, email routers, and automatic team notification systems.", icon: Layers },
    { name: "AgenticOS™", desc: "Self-correcting, structured LLM-routing networks executing multi-turn technical operations automatically.", icon: Cpu },
    { name: "AI Calling", desc: "Sovereign voice-synthesis calling agents managing incoming service questions and executing outbound booking callbacks.", icon: PhoneCall },
    { name: "WhatsApp Automation", desc: "Automated Meta transaction catalogs, WhatsApp newsletters, and custom conversational AI bots.", icon: MessageSquare },
    { name: "Custom AI Agents", desc: "Niche corporate brains designed for specific database, inventory, or order management requirements.", icon: ShieldCheck },
    { name: "n8n Automation", desc: "Ready-to-import webhook schemas bypassing overpriced software middleware (Zapier) for infinite scalability.", icon: Zap },
  ];

  const comparisonPoints = [
    { feature: 'Core CRM Pipeline', natton: 'Proprietary GrowthOS™ built for rapid outbound & inbound flows.', hubspot: 'Highly locked-down; requires massive tier upgrades for standard pipelines.', zoho: 'Basic pipelines, slow UI, cumbersome custom layout setups.' },
    { feature: 'Autonomous AI Marketing', natton: 'Included. Multi-agent copywriters, bulk image generators, and auto-publishing schedules.', hubspot: 'Rudimentary AI text-completion assistants sold as minor add-ons.', zoho: 'Very basic template generators; lacks structural agentic orchestration.' },
    { feature: 'Native WhatsApp Catalogs', natton: 'Native catalog checkout with Meta Pay integration inside threads.', hubspot: 'Requires expensive third-party marketplace connectors (monthly upsells).', zoho: 'Rudimentary WhatsApp integration without custom transaction routing.' },
    { feature: 'Voice Synthesis AI Calling', natton: 'Sovereign conversational voice nodes handling live outbound/inbound dialers.', hubspot: 'None. Only simple voice logs and standard manual dialer frames.', zoho: 'Integrates with basic PBX telephony, but has zero native voice AI agent features.' },
    { feature: 'Low-Code Webhook Nodes', natton: 'Pre-configured, direct n8n/Make nodes that bypass Zapier overhead.', hubspot: 'Strictly limited webhook triggers; requires developer hub upgrades.', zoho: 'Deluged in Zoho Creator scripting; complex proprietary Deluge language.' },
    { feature: 'Implementation Timeline', natton: 'Rapid deployment within 14-21 days by dedicated systems architect.', hubspot: '3 to 6 months of tedious onboarding; high mandatory certification costs.', zoho: 'Complex configuration cycles; requires specialized Deluge programmers.' },
    { feature: 'White-Label Branding', natton: 'Fully available. Resell the ecosystem to clients with your custom domain.', hubspot: 'Strictly forbidden. HubSpot logo remains on portals and emails.', zoho: 'Only premium enterprise partners get minor portal styling options.' },
    { feature: 'Pricing Architecture', natton: 'Transparent, flat-rate platform subscription. Unlimited contacts, no hidden seat fees.', hubspot: 'Aggressive pricing loops. Charging per contact tier and marketing seat.', zoho: 'Multiple fragmented modules (Zoho CRM, Zoho Desk, Zoho Books) that add up fast.' },
  ];

  const customerStories = [
    {
      title: "Migrated From HubSpot",
      metrics: "Saved $24,500/yr & Cut Leads Intake to 2 mins",
      company: "Quantum Analytics Corp (USA)",
      quote: "Our HubSpot monthly bills were scaling exponentially with our contact database. Natton Digital migrated all our sales pipelines into GrowthOS and built custom n8n triggers. We dropped our platform subscription costs by 75% and automated our complete client onboarding.",
      tags: ["HubSpot Migration", "B2B SaaS"]
    },
    {
      title: "Migrated From Zoho",
      metrics: "Replaced 5 Zoho apps with single BusinessOS™",
      company: "MedTech Diagnostic Labs (India)",
      quote: "We were drowned in a fragmented Zoho setup (Creator, Desk, Campaigns, CRM) written in Deluge code. Natton Digital unified everything into a high-contrast HIPAA-compliant node structure with sovereign AI answering agents. Our clinic staff saved 14 hours per week.",
      tags: ["Zoho Consolidated", "Healthcare Automation"]
    },
    {
      title: "Replaced Multiple Vendors",
      metrics: "99.98% Answering Accuracy on WhatsApp & Calling",
      company: "Aura E-Commerce Group (UAE)",
      quote: "We were paying Stripe, Twilio, Zapier, ManyChat, and active HubSpot seats. It was a complete house of cards. Natton brought everything under one unified AI ecosystem. Catalogs now sync natively in WhatsApp threads.",
      tags: ["Vendor Elimination", "E-Commerce"]
    },
    {
      title: "Moved From Traditional Agency",
      metrics: "3.5x More Leads at 1/3 the Traditional Retainer",
      company: "Elite Real Estate Brokers (Australia)",
      quote: "Traditional agencies kept charging us monthly hourly retainers just to edit templates. Natton built self-optimizing AI programmatic ad pipelines and automated lead callbacks. The ROI was clear within 20 days.",
      tags: ["Agency Upgrade", "Real Estate"]
    }
  ];

  const migrationSteps = [
    { title: "Audit", desc: "Identify current platform leaks, redundant SaaS seat fees, manual onboarding bottlenecks, and integration gaps.", status: "Phase 1: Diagnostic" },
    { title: "Planning", desc: "Architect high-contrast blueprint wireframes, database schemas, custom n8n mapping, and sovereign AI voice dialogue structures.", status: "Phase 2: Architecture" },
    { title: "Migration", desc: "Clean and pipe existing databases, customer profiles, and deal cards securely without 1 second of live system downtime.", status: "Phase 3: Database Pipe" },
    { title: "Automation", desc: "Construct primary custom nodes, WhatsApp transaction pathways, CRM triggers, and automated calendar routers.", status: "Phase 4: Node Synthesis" },
    { title: "Optimization", desc: "Trigger self-correcting neural feedback loops, live diagnostic checks, security SOC2 logs, and full team training.", status: "Phase 5: Launch & Support" }
  ];

  const industryRecommendations = {
    healthcare: {
      headline: "HIPAA-Safe Conversational AI",
      badge: "HIPAA COMPLIANT",
      system: "BusinessOS™ + AI Calling Answering Nodes",
      description: "Automate patient triage and scheduling. Sovereign voice agents process incoming inquiries, check local calendars, map symptoms, and confirm appointments with encrypted security logs.",
      impact: "78% Administrative overhead reduction, SOC2 security level."
    },
    education: {
      headline: "Automated Student Lifecycle CRM",
      badge: "EDTECH READY",
      system: "GrowthOS™ + Multi-channel WhatsApp Triggers",
      description: "Manage admission funnels, document verification pipelines, and course onboarding automation. Native WhatsApp nodes pipe applications directly into counselors' triage cards.",
      impact: "3.2x Counselor productivity gain, zero lost leads."
    },
    realestate: {
      headline: "Instant Outbound Callback Engine",
      badge: "24/7 LEAD INTAKE",
      system: "AgenticOS™ + Outbound AI Calling",
      description: "As soon as a prospect interacts with a programmatic ad portal, an automated call is triggered within 30 seconds, routing inquiries directly to active field agents.",
      impact: "420% Instant callback speed-up, 2.5x deal velocity."
    },
    manufacturing: {
      headline: "Inventory & ERP Node Sync",
      badge: "N8N CUSTOM SCHEMA",
      system: "n8n Automation Nodes + Supply Chain Sync",
      description: "Bypass costly middleware to automatically sync ERP systems, order receipts, and tracking logistics. Triggers automatic WhatsApp confirmation threads on dispatch milestones.",
      impact: "99.9% Supply chain update accuracy, zero server lag."
    },
    retail: {
      headline: "WhatsApp Store & Checkout",
      badge: "META INTEGRATED",
      system: "AI Marketing Platform™ + WhatsApp Catalog Nodes",
      description: "Build interactive automated shopping catalogs inside WhatsApp. Customers browse products, add items, trigger localized promos, and execute payment through secure Meta Pay nodes.",
      impact: "45% Cart recovery spike, completely friction-free checkouts."
    },
    services: {
      headline: "Autonomous Client Onboarding",
      badge: "WHITE-LABEL CRM",
      system: "GrowthOS™ + Custom AI Agent Brains",
      description: "Perfect for accounting, consulting, and digital platforms. Clients upload documents, custom AI agents analyze intake data, draft kickoff briefs, and create shared boards.",
      impact: "88% Client setup speed acceleration."
    }
  };

  const faqs = [
    { q: "How exactly does Natton Digital replace HubSpot or Salesforce?", a: "Traditional CRMs like HubSpot and Salesforce are passive databases that charge aggressively for seats, limits, and contacts, requiring massive secondary tools (Zapier, Agencies, Coders) to automate. Natton provides an AI-first unified platform (GrowthOS™ & BusinessOS™) paired with active, dedicated implementation support. We build your automated pipelines, custom n8n nodes, and conversational AI bots natively, saving you tens of thousands of dollars in hidden SaaS fees." },
    { q: "Can we migrate our existing historical data without losing history?", a: "Absolutely. Our engineering squad handles the complete migration. We map, clean, and transfer all of your contacts, deals, email conversations, tags, and internal notes from HubSpot, Zoho, Salesforce, or Excel sheets safely into your new sovereign Natton database. There is zero downtime during this pipeline switch." },
    { q: "Is the data stored securely? What compliance protocols are followed?", a: "Yes. Data security is built into our core server architecture. All databases are SOC2 Type II and ISO 27001 standard compliant, using AES-256 bank-grade encryption at rest and TLS 1.3 in transit. For medical clients, we deploy HIPAA-compliant secure sandboxed servers." },
    { q: "Do we have to pay per seat or per contact in Natton Digital?", a: "No. Unlike traditional CRM vendors that penalize your scaling success by charging for larger contact limits or added marketing seats, Natton Digital works on flat-rate transparent subscriptions with unlimited contacts and support tiers. Your bills remain predictable as your business grows." },
    { q: "What is the custom n8n integration benefit?", a: "Traditional CRMs force you to use Zapier, which is slow, expensive, and limited in complex branching. Natton Digital integrates custom, pre-configured n8n nodes directly into your workspace. This allows for deep logic loops, loops through databases, raw API hooks, and infinite multi-step automations for a fraction of the cost." },
    { q: "Are the AI Calling agents robotic, or do they sound natural?", a: "Our sovereign Voice AI nodes use next-gen neural voice synthesis, featuring ultra-low latency (under 600ms Response latency), natural breath pauses, adaptive conversational listening, and customizable accents. They hold complete fluid technical conversations and sound exactly like a highly trained human representative." },
    { q: "Does the WhatsApp checkout support native payment routing?", a: "Yes. Our WhatsApp automated catalogs support Meta Pay, custom Stripe checkout links, and UPI/UPI Auto-pay triggers embedded directly inside the conversational chat balloon. Customers can complete transactions without ever exiting their WhatsApp thread." },
    { q: "Can we customize the AI marketing engines to match our exact brand tone?", a: "Yes. Every custom agent and marketing platform node is pre-trained on your specific brand assets, guidelines, historical high-performing ads, and documentation. You get a private sovereign LLM context that matches your corporate voice perfectly." },
    { q: "What is your traditional onboarding timeframe?", a: "While traditional Salesforce or HubSpot enterprise setups drag on for 3 to 6 months with complex integrations, Natton Digital systems are fully built and live in 14 to 21 business days. Our dedicated solutions architect handles everything from API pipes to team training." },
    { q: "What happens if we require new custom automation nodes later?", a: "As part of our premium support, our specialized n8n systems architects are always on call. We continuously update your automation triggers, build new dashboard metrics, design custom LLM routers, and expand your platform functions as your operational models shift." },
    { q: "Is there any lock-in contract?", a: "No. We operate on simple month-to-month or discounted yearly licenses. We align our values strictly with your success — if you do not get clear, transparent ROI, you can cancel at any time." },
    { q: "Can we white-label the GrowthOS dashboard for our own agency clients?", a: "Yes! This is one of our most popular features for partners. You can fully white-label the GrowthOS dashboard, custom agents, and automated portals with your own corporate domains, logo, and brand theme to sell directly to your end-users." },
    { q: "How do you handle captcha or form spam on public landing pages?", a: "We utilize advanced serverless cryptographic challenges alongside invisible honeypot parameters. This blocks 99.99% of automated bot submissions without subjecting real human prospects to annoying image matching tasks." },
    { q: "Do the AI Calling nodes integrate with local telecom lines?", a: "Yes. We support direct integration with Twilio, local SIP trunks, cloud telephony nodes, or your existing business phone setup, letting you make high-volume calls from your existing verified corporate numbers." },
    { q: "Can we build multiple isolated workspace environments?", a: "Yes. Enterprise accounts can provision separate, sandboxed organizational nodes (e.g., for different brands, subdivisions, or regional centers) while maintaining unified analytics in a master cockpit." },
    { q: "How does the ROI guarantee work?", a: "Before we write any lines of code, we run an AI Readiness assessment to calculate your realistic operations audit score. If we don't find at least a 3x projected return on investment, we won't accept your onboarding request." },
    { q: "Is there a limit on WhatsApp message volume?", a: "We operate on native official Meta Cloud APIs. You only pay the direct Meta-regulated business conversation charges (fractions of a cent) directly, with zero markup or messaging limits from our end." },
    { q: "Can the AI Agent write and push code directly to GitHub?", a: "Yes! Our high-end AgenticOS™ packages can be configured with safe container environments to write, test, validate, and commit custom automation scripts directly to client GitHub repositories." },
    { q: "What language routing capabilities are supported?", a: "Our conversational engines, voice agents, and support portals support over 40 languages, automatically detecting customer language in real-time and adjusting responses instantly." },
    { q: "How do we get started with a personalized comparison checklist?", a: "Simply fill out our Personalized Comparison form below, or book a live virtual blueprint demo with one of our systems architects today." }
  ];

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    // Simulate n8n webhook push with GoHighLevel notification
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      // Reset form
      setFormData({
        fullName: '',
        companyName: '',
        currentPlatform: 'HubSpot',
        industry: 'Retail & E-commerce',
        country: 'India',
        email: '',
        phone: '',
        challenges: '',
        message: ''
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0B0721] text-white py-16 relative overflow-hidden font-sans">
      {/* Background glowing gradients (Vercel/Linear style) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[130px] animate-pulse" />
        <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse" />
        {/* Fine grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ========================================================
            SECTION 1: HERO
            ======================================================== */}
        <section id="hero" className="relative pt-12 pb-6 flex flex-col lg:flex-row items-center gap-12 text-left">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#00C2FF] text-[10px] font-mono tracking-widest uppercase font-bold">
              <Sparkles className="h-3 w-3 animate-pulse" />
              AI-FIRST GROWTH STACK
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
              Why Businesses Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] via-purple-400 to-cyan-400">Natton Digital</span>
            </h1>
            
            <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Compare solutions, features, flexibility and ROI against traditional platforms and agencies. Discover the benefits of an AI-first growth ecosystem.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => scrollToId('comparison_selector')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:opacity-95 text-white font-mono font-black text-xs rounded-xl transition-all shadow-lg flex items-center gap-1.5"
              >
                Compare Solutions <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setPath('book-demo')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                Book Demo
              </button>
            </div>
          </div>
          
          {/* Competitive Intelligence Universe (3D-inspired SVG/Mock Visualizer) */}
          <div className="lg:w-1/2 w-full flex justify-center relative">
            <div className="relative w-full max-w-md h-96 rounded-3xl border border-white/10 bg-[#110B33]/40 backdrop-blur-md p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              
              {/* Rotating glowing mesh in center */}
              <div className="absolute w-64 h-64 rounded-full border border-dashed border-white/5 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-44 h-44 rounded-full border border-dashed border-cyan-500/10 animate-[spin_20s_linear_infinite]" />
              
              {/* Central Active Node: Natton */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ repeat: Infinity, duration: 4 }}
                className="relative z-10 p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 border border-white/20 shadow-2xl text-center shadow-blue-500/10"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-2">
                  <Cpu className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xs font-mono font-black tracking-widest">NATTON DIGITAL</h4>
                <p className="text-[8px] text-cyan-200 uppercase font-bold tracking-wider">AI Ecosystem Hub</p>
              </motion.div>

              {/* Surrounding platform satellites */}
              <div className="absolute top-10 left-12 p-3.5 rounded-xl border border-white/5 bg-[#0B0721]/80 text-center space-y-1">
                <p className="text-[10px] font-bold text-gray-300">HubSpot</p>
                <p className="text-[8px] font-mono text-red-400 font-bold uppercase">EXPENSIVE SEATS</p>
              </div>

              <div className="absolute top-12 right-14 p-3.5 rounded-xl border border-white/5 bg-[#0B0721]/80 text-center space-y-1">
                <p className="text-[10px] font-bold text-gray-300">Salesforce</p>
                <p className="text-[8px] font-mono text-amber-500 font-bold uppercase">6-MO ONBOARDING</p>
              </div>

              <div className="absolute bottom-12 left-10 p-3.5 rounded-xl border border-white/5 bg-[#0B0721]/80 text-center space-y-1">
                <p className="text-[10px] font-bold text-gray-300">Traditional Agencies</p>
                <p className="text-[8px] font-mono text-rose-400 font-bold uppercase">HOURLY FEES</p>
              </div>

              <div className="absolute bottom-16 right-12 p-3.5 rounded-xl border border-white/5 bg-[#0B0721]/80 text-center space-y-1">
                <p className="text-[10px] font-bold text-gray-300">Zoho CRM</p>
                <p className="text-[8px] font-mono text-yellow-500 font-bold uppercase">DELUGE CODE</p>
              </div>

              {/* Glowing vector lines routing from outer nodes to Natton */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="rgba(239, 68, 68, 0.15)" strokeWidth="1" strokeDasharray="4" />
                <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="1" strokeDasharray="4" />
                <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="1" strokeDasharray="4" />
                <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="rgba(234, 179, 8, 0.15)" strokeWidth="1" strokeDasharray="4" />
              </svg>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: COMPARISON SELECTOR (BENTO GRID)
            ======================================================== */}
        <section id="comparison_selector" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">INTERACTIVE NAVIGATOR</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Choose A Comparison</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Click any of our detailed comparisons in the bento grid below to instantly jump to specific structural feature matrix screens.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Bento Card: HubSpot */}
            <div 
              onClick={() => { setSelectedComparison('hubspot'); scrollToId('vs_hubspot'); }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#00C2FF]/30 transition-all cursor-pointer text-left space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-transparent blur-xl" />
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-orange-400 border border-orange-400/20 bg-orange-400/5 px-2 py-0.5 rounded uppercase font-bold">Alternative</span>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-display">Natton vs HubSpot</h4>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">Ditch marketing contact multipliers, hidden seat tiers, and complex onboarding timelines.</p>
              </div>
            </div>

            {/* Bento Card: Zoho */}
            <div 
              onClick={() => { setSelectedComparison('zoho'); scrollToId('vs_zoho'); }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-blue-500/30 transition-all cursor-pointer text-left space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent blur-xl" />
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-blue-400 border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 rounded uppercase font-bold">Consolidated</span>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-display">Natton vs Zoho</h4>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">Consolidate multiple legacy Zoho creator and desk accounts. No complex Deluge programming required.</p>
              </div>
            </div>

            {/* Bento Card: Salesforce */}
            <div 
              onClick={() => { setSelectedComparison('salesforce'); scrollToId('vs_salesforce'); }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-purple-500/30 transition-all cursor-pointer text-left space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent blur-xl" />
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-purple-400 border border-purple-500/20 bg-purple-500/5 px-2 py-0.5 rounded uppercase font-bold">Radar Analysis</span>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-display">Natton vs Salesforce</h4>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">Multi-dimensional technical index showing cost efficiency, custom n8n triggers, and native calling nodes.</p>
              </div>
            </div>

            {/* Bento Card: Traditional Agencies */}
            <div 
              onClick={() => { setSelectedComparison('agencies'); scrollToId('vs_agencies'); }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-500/30 transition-all cursor-pointer text-left space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent blur-xl" />
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 px-2 py-0.5 rounded uppercase font-bold">Automation Shift</span>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-display">Natton vs Traditional Agencies</h4>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">Swap variable hourly billing frameworks with autonomous, 24/7 operating marketing and CRM nodes.</p>
              </div>
            </div>

            {/* Bento Card: Freelancers */}
            <div 
              onClick={() => { setSelectedComparison('freelancers'); scrollToId('vs_freelancers'); }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-pink-500/30 transition-all cursor-pointer text-left space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-transparent blur-xl" />
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-pink-400 border border-pink-500/20 bg-pink-500/5 px-2 py-0.5 rounded uppercase font-bold">Scale Model</span>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-display">Natton vs Freelancers</h4>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">Avoid single-point failures. Benefit from a robust, multi-disciplinary squad managing long-term support pipelines.</p>
              </div>
            </div>

            {/* Bento Card: Multiple Vendors */}
            <div 
              onClick={() => { setSelectedComparison('calculator'); scrollToId('calculator'); }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#00C2FF]/30 transition-all cursor-pointer text-left space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent blur-xl" />
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-[#00C2FF] border border-[#00C2FF]/20 bg-[#00C2FF]/5 px-2 py-0.5 rounded uppercase font-bold">Unification</span>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-display">Natton vs Multiple Vendors</h4>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">Consolidate Stripe, Zapier, Twilio, email newsletters, and CRM contracts into a single savings calculation.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 3: ECOSYSTEM
            ======================================================== */}
        <section id="ecosystem" className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/5 to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left description text */}
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">UNIFIED AI ECOSYSTEM</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">One Platform. Complete Ecosystem.</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Stop connecting loose software parts with messy API glue. Natton orchestrates growth marketing, operations, database pipelines, and agent structures natively in a single, high-contrast, scalable framework.
              </p>
              
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-gray-300">Bypass expensive Zapier transaction thresholds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-gray-300">Real-time telemetry and database backup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-gray-300">Predictable subscription fees, zero lock-in contracts</span>
                </div>
              </div>
            </div>

            {/* Right: Ecosystem bento grid items */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {ecosystemCards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl border border-white/5 bg-[#110B33]/20 space-y-1 hover:border-[#00C2FF]/25 transition-all">
                    <div className="flex items-center gap-2 text-[#00C2FF]">
                      <IconComp className="h-4 w-4 shrink-0" />
                      <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">{card.name}</h4>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 4: VS HUBSPOT (INTERACTIVE COMPARISON TABLE)
            ======================================================== */}
          <section id="vs_hubspot" className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono text-orange-400 tracking-widest uppercase font-bold">ALTERNATIVE BENCHMARK</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Natton Digital vs HubSpot</h2>
              <p className="text-xs text-gray-400 max-w-xl mx-auto">Compare side-by-side. Avoid aggressive contact multiplier upgrades and restricted marketing seats.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0B0721]/60">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-gray-300 font-mono text-[10px] tracking-wider uppercase">
                    <th className="p-4 sm:p-5">Feature Parameter</th>
                    <th className="p-4 sm:p-5 text-[#00C2FF] font-bold">Natton Digital Ecosystem</th>
                    <th className="p-4 sm:p-5 text-orange-400">HubSpot Professional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-left">
                  {comparisonPoints.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.005] transition-all">
                      <td className="p-4 sm:p-5 font-bold text-white">{item.feature}</td>
                      <td className="p-4 sm:p-5 text-gray-300">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#00C2FF] shrink-0 mt-0.5" />
                          <span>{item.natton}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-gray-400">
                        <div className="flex items-start gap-2">
                          <X className="h-4 w-4 text-orange-500/60 shrink-0 mt-0.5" />
                          <span>{item.hubspot}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        {/* ========================================================
            SECTION 5: VS ZOHO (INTERACTIVE FEATURE METRIC)
            ======================================================== */}
        <section id="vs_zoho" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          {/* Left: Text detail */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase font-bold">CONSOLIDATED METRICS</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Natton Digital vs Zoho</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Why get locked inside an outdated, fragmented Zoho structure containing 5 legacy apps stitched with Zoho Creator? Natton consolidates active client metrics in an easy-to-use modern UX.
            </p>
            <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/20 space-y-2">
              <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">✓ ELIMINATE ZOHO creator HOOKS</span>
              <p className="text-[10px] text-gray-400 leading-relaxed">We replace manual Zoho Campaigns sequences with responsive AI agents running real-time marketing loops automatically.</p>
            </div>
          </div>

          {/* Right: Interactive Feature comparison bars */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md space-y-5">
            <h4 className="text-xs font-mono text-gray-300 uppercase tracking-widest font-bold">Platform Capability Metrics (Out of 100)</h4>
            
            <div className="space-y-4">
              {/* Metric 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-white font-bold">Automation Flexibility</span>
                  <span className="text-gray-400"><strong className="text-[#00C2FF]">Natton 98</strong> / Zoho 45</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-white font-bold">AI Capabilities & Sovereign LLM Routing</span>
                  <span className="text-gray-400"><strong className="text-[#00C2FF]">Natton 95</strong> / Zoho 30</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-white font-bold">Ease Of Use & Navigation Speed</span>
                  <span className="text-gray-400"><strong className="text-[#00C2FF]">Natton 94</strong> / Zoho 38</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              {/* Metric 4 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-white font-bold">Implementation Timeline</span>
                  <span className="text-gray-400"><strong className="text-[#00C2FF]">Natton 95</strong> / Zoho 25</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 6: VS SALESFORCE (RADAR CHART)
            ======================================================== */}
        <section id="vs_salesforce" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">RADAR DIAGRAM COMPARISON</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Natton Digital vs Salesforce</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Explore key dimensions. Skip years of consulting fee overheads and slow pipeline customizations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
            {/* Left: Interactive Radar Chart using Recharts */}
            <div className="p-4 rounded-3xl border border-white/5 bg-[#110B33]/20 h-96 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={salesforceRadarData}>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.05)" />
                  <PolarAngleAxis dataKey="subject" stroke="#a1a1aa" fontSize={10} fontFamily="monospace" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255, 255, 255, 0.1)" />
                  <Radar name="Natton Digital" dataKey="Natton" stroke="#00C2FF" fill="#00C2FF" fillOpacity={0.2} />
                  <Radar name="Salesforce" dataKey="Salesforce" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ backgroundColor: '#110B33', borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#fff', fontSize: '10px', fontFamily: 'monospace' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Right: Key highlights */}
            <div className="space-y-5">
              <h4 className="text-lg font-bold text-white font-display">Salesforce limitations vs Natton agility</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Salesforce is notoriously complex, requiring specialized Apex developers and weeks of custom integration just to connect simple landing pages or WhatsApp API endpoints.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/10 space-y-1">
                  <span className="text-[9px] font-mono text-[#00C2FF] font-bold">NATTON FLUID DESIGN</span>
                  <p className="text-[11px] text-gray-400">Ready in 2 weeks. Flat subscription. Easy custom n8n nodes for instant data pipe management.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/10 space-y-1">
                  <span className="text-[9px] font-mono text-purple-400 font-bold">SALESFORCE OVERHEAD</span>
                  <p className="text-[11px] text-gray-400">Months of custom Apex development, high annual contracts, expensive consulting retainer fees.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 7: VS AGENCIES (BEFORE/AFTER SLIDE)
            ======================================================== */}
        <section id="vs_agencies" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">OPERATIONAL SHIFT</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Natton Digital vs Traditional Agencies</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Compare autonomous system nodes running 24/7 with slow manual agency teams billing by the hour.</p>
          </div>

          {/* Interactive Slide Panel */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/5 to-transparent blur-xl" />
            
            {/* Interactive Toggle Button */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#0B0721] p-1 rounded-xl border border-white/10 flex">
                <button
                  onClick={() => setIsAfterState(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all uppercase ${
                    !isAfterState ? 'bg-rose-500/20 text-rose-400 font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Traditional Agency (Slow)
                </button>
                <button
                  onClick={() => setIsAfterState(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all uppercase ${
                    isAfterState ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Natton Digital (Autonomous)
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!isAfterState ? (
                <motion.div
                  key="before"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
                >
                  <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/[0.01] space-y-2">
                    <span className="text-[9px] font-mono text-rose-400 font-bold uppercase">Manual Retainers</span>
                    <h5 className="text-xs font-bold text-white font-display">Variable Billing</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Agencies keep charging monthly fees for minor copy edits, template shifts, and basic ad management.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/[0.01] space-y-2">
                    <span className="text-[9px] font-mono text-rose-400 font-bold uppercase">Human Slowness</span>
                    <h5 className="text-xs font-bold text-white font-display">Slow Turnaround</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Changes take days, reports are delivered late at the end of the month, and communication occurs through bloated email chains.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/[0.01] space-y-2">
                    <span className="text-[9px] font-mono text-rose-400 font-bold uppercase">Disconnected SaaS</span>
                    <h5 className="text-xs font-bold text-white font-display">Siloed Pipelines</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Agencies configure standalone ads, but has zero capability to sync inventory databases, CRM boards, or automated WhatsApp catalogs.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="after"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
                >
                  <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.01] space-y-2">
                    <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">Flat Subscription</span>
                    <h5 className="text-xs font-bold text-white font-display">Unlimited Updates</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">No hourly billing loops. One predictable flat-rate subscription covers continuous system expansions and node adjustments.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.01] space-y-2">
                    <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">Autonomous Execution</span>
                    <h5 className="text-xs font-bold text-white font-display">Real-Time Sync</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Our AI marketing platforms and n8n nodes run 24/7 automatically optimizing copy, posting schedules, and processing lead routing triggers.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.01] space-y-2">
                    <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">Unified OS Ecosystem</span>
                    <h5 className="text-xs font-bold text-white font-display">Integrated Blueprints</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Your CRM, supply chain, automated WhatsApp catalogues, calling bots, and outreach networks are stitched together natively.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ========================================================
            SECTION 8: VS FREELANCERS
            ======================================================== */}
        <section id="vs_freelancers" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          {/* Left: Feature cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-white/5 bg-[#110B33]/20 space-y-2">
              <span className="text-[9px] font-mono text-[#00C2FF] font-bold uppercase tracking-wider block">Scale Capability</span>
              <h5 className="text-xs font-bold text-white font-display">Infinite Scalability</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed">Bypass single-point freelancer failures. Benefit from redundant operations, safe code commits, and 24/7 uptime monitoring.</p>
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-[#110B33]/20 space-y-2">
              <span className="text-[9px] font-mono text-[#00C2FF] font-bold uppercase tracking-wider block">Integrated Support</span>
              <h5 className="text-xs font-bold text-white font-display">Dedicated System Architects</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed">No generic templates or messy custom code handoffs. Get polished, responsive design paired with deep technical database infrastructure.</p>
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-[#110B33]/20 space-y-2">
              <span className="text-[9px] font-mono text-[#00C2FF] font-bold uppercase tracking-wider block">Multi-Disciplinary Team</span>
              <h5 className="text-xs font-bold text-white font-display">Sovereign Knowledge Repository</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed">Our designers, database engineers, n8n experts, and marketing specialists are unified under one flat contract.</p>
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-[#110B33]/20 space-y-2">
              <span className="text-[9px] font-mono text-[#00C2FF] font-bold uppercase tracking-wider block">Predictable Updates</span>
              <h5 className="text-xs font-bold text-white font-display">Continuous Long-Term Support</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed">No ghosting, no delayed project schedules. We push daily optimizations, audit server logs, and maintain active SLA response times.</p>
            </div>
          </div>

          {/* Right: Text detail */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono text-pink-400 tracking-widest uppercase font-bold">REDUNDANT ARCHITECTURE</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Natton Digital vs Freelancers</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Relying on a single freelance designer or coder for critical business integrations is a massive security and operational risk. Natton Digital provides a professional, multi-disciplinary infrastructure.
            </p>
            <button 
              onClick={() => scrollToId('consultation_form')}
              className="text-xs font-mono text-[#00C2FF] hover:underline flex items-center gap-1"
            >
              Request Custom Audit Analysis <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* ========================================================
            SECTION 9: ROI COMPARISON (LIVE GRAPHS)
            ======================================================== */}
        <section id="roi_comparison" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">FINANCIAL PROJECTIONS</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Operational ROI Comparison</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">See how traditional manual administrative retainers stack up against automated Natton system nodes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
            <div className="space-y-5">
              <h4 className="text-lg font-bold text-white font-display">Projected Cumulative Costs over 12 Months</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                As your operations expand, traditional seat-based licensing and developer hours scale exponentially. With flat-rate Natton Digital frameworks, your monthly cost parameters remain stable, multiplying your net savings.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/10 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">12-Mo Projected Net Savings</span>
                  <p className="text-2xl font-black text-white font-display">${netYearlySavings.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/10 space-y-1">
                  <span className="text-[10px] font-mono text-[#00C2FF] font-bold uppercase">Projected System ROI</span>
                  <p className="text-2xl font-black text-white font-display">{roiPercentage}%</p>
                </div>
              </div>
            </div>

            {/* Live interactive graph using Recharts */}
            <div className="p-4 rounded-3xl border border-white/5 bg-[#110B33]/20 h-96 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={savingsTimelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNatton" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#00C2FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={10} fontFamily="monospace" />
                  <YAxis stroke="#6b7280" fontSize={10} fontFamily="monospace" tickFormatter={(v) => `$${v}`} />
                  <Tooltip contentStyle={{ backgroundColor: '#110B33', borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#fff', fontSize: '10px', fontFamily: 'monospace' }} />
                  <Area type="monotone" dataKey="Traditional Cost" stroke="#ef4444" fillOpacity={1} fill="url(#colorTrad)" />
                  <Area type="monotone" dataKey="Natton Cost" stroke="#00C2FF" fillOpacity={1} fill="url(#colorNatton)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 10: WHY SWITCH
            ======================================================== */}
        <section id="why_switch" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">OPERATIONAL BENCHMARK</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Why Businesses Switch</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Ditch legacy fragmented software overhead. Move to an integrated enterprise cockpit built for speed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#00C2FF]/35 transition-all text-left space-y-2">
              <Coins className="h-6 w-6 text-[#00C2FF]" />
              <h4 className="text-sm font-bold text-white font-display">Lower Total Cost of Ownership</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">Save up to 75% on variable software seat-licensing fees and developers' hourly consulting rates under a transparent, flat-rate model.</p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-purple-500/35 transition-all text-left space-y-2">
              <Users className="h-6 w-6 text-purple-400" />
              <h4 className="text-sm font-bold text-white font-display">Premium Systems Architect Support</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">No generic chatbots or slow ticket queues. You get direct Telegram/Slack communication channels with senior systems architects.</p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-cyan-500/35 transition-all text-left space-y-2">
              <Cpu className="h-6 w-6 text-cyan-400" />
              <h4 className="text-sm font-bold text-white font-display">AI-First Operational Approach</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">Native integration of automated copywriting modules, image assets, autonomous calling nodes, and responsive WhatsApp store templates.</p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-emerald-500/35 transition-all text-left space-y-2">
              <Layers className="h-6 w-6 text-emerald-400" />
              <h4 className="text-sm font-bold text-white font-display">Unified Workspace Cockpit</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">Access sales pipelines, order logs, calendar entries, client directories, and support boards inside an eye-safe dashboard.</p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-orange-500/35 transition-all text-left space-y-2">
              <Zap className="h-6 w-6 text-orange-400" />
              <h4 className="text-sm font-bold text-white font-display">2-Week Deployment Timelines</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">Bypass 3-to-6-month implementation cycles. Our architects map, pipe, migrate, test, and activate systems in 14 business days.</p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-pink-500/35 transition-all text-left space-y-2">
              <Compass className="h-6 w-6 text-pink-400" />
              <h4 className="text-sm font-bold text-white font-display">Sovereign Automation Schemas</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">We design and hand over custom, pre-configured n8n and Make schemas, giving you complete structural control over your databases.</p>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 11: CUSTOMER STORIES (CAROUSEL)
            ======================================================== */}
        <section id="customer_stories" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">CLIENT LOGS</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Customer Success Stories</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Read how enterprises migrated successfully from restrictive software seats to active GrowthOS ecosystems.</p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="p-6 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-transparent blur-xl" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStoryIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-[#00C2FF] border border-[#00C2FF]/20 bg-[#00C2FF]/5 px-2.5 py-0.5 rounded uppercase font-bold">
                        {customerStories[activeStoryIdx].title}
                      </span>
                      <h4 className="text-xl font-bold text-white font-display">{customerStories[activeStoryIdx].company}</h4>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">{customerStories[activeStoryIdx].metrics}</span>
                  </div>

                  <p className="text-sm sm:text-base text-gray-300 italic leading-relaxed">
                    "{customerStories[activeStoryIdx].quote}"
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {customerStories[activeStoryIdx].tags.map(t => (
                      <span key={t} className="text-[9px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider navigation buttons */}
            <div className="flex justify-center gap-2 mt-6">
              {customerStories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStoryIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeStoryIdx === idx ? 'bg-[#00C2FF] w-6' : 'bg-white/10 hover:bg-white/20'
                  }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 12: MIGRATION (INTERACTIVE TIMELINE)
            ======================================================== */}
        <section id="migration" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">DEPLOYMENT ROADMAP</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Migration Made Easy</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Our systems architects handle the complete transfer process. Zero data loss. Zero down-time.</p>
          </div>

          {/* Interactive Steps Selector */}
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            <div className="grid grid-cols-5 gap-2 border-b border-white/5 pb-2">
              {migrationSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTimelineStep(idx)}
                  className={`py-2 text-center border-b-2 transition-all ${
                    activeTimelineStep === idx 
                      ? 'border-[#00C2FF] text-[#00C2FF] font-black' 
                      : 'border-transparent text-gray-500 hover:text-white'
                  }`}
                >
                  <span className="block text-[11px] font-mono uppercase tracking-wider">Step {idx + 1}</span>
                  <span className="hidden sm:block text-xs font-bold font-display mt-0.5">{step.title}</span>
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#110B33]/20 relative overflow-hidden min-h-[160px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                {migrationSteps[activeTimelineStep].status}
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#00C2FF]" />
                  {migrationSteps[activeTimelineStep].title} Analysis Phase
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
                  {migrationSteps[activeTimelineStep].desc}
                </p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                <span className="text-[10px] font-mono text-gray-500">MIGRATION LEAD: SENIOR SOLUTIONS ARCHITECT</span>
                <button 
                  onClick={() => {
                    if (activeTimelineStep < migrationSteps.length - 1) {
                      setActiveTimelineStep(activeTimelineStep + 1);
                    } else {
                      setActiveTimelineStep(0);
                    }
                  }}
                  className="text-xs font-mono text-[#00C2FF] hover:underline flex items-center gap-0.5"
                >
                  Next Step <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 13: INDUSTRY RECOMMENDATIONS (INTERACTIVE PICKER)
            ======================================================== */}
        <section id="industry_recommendations" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">AUTOMATED DEPLOYMENTS</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Best Solutions By Industry</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Select your market segment to explore dedicated growth architectures designed for your operational needs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Left selector buttons */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 bg-[#0B0721]/60 p-2 rounded-2xl border border-white/10 shrink-0">
              <button
                onClick={() => setActiveIndustry('retail')}
                className={`px-4 py-3 rounded-xl text-xs font-mono text-left whitespace-nowrap lg:whitespace-normal flex items-center gap-2.5 transition-all w-full ${
                  activeIndustry === 'retail' ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Store className="h-4 w-4" /> Retail & E-commerce
              </button>
              <button
                onClick={() => setActiveIndustry('healthcare')}
                className={`px-4 py-3 rounded-xl text-xs font-mono text-left whitespace-nowrap lg:whitespace-normal flex items-center gap-2.5 transition-all w-full ${
                  activeIndustry === 'healthcare' ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <HeartPulse className="h-4 w-4" /> Healthcare Systems
              </button>
              <button
                onClick={() => setActiveIndustry('education')}
                className={`px-4 py-3 rounded-xl text-xs font-mono text-left whitespace-nowrap lg:whitespace-normal flex items-center gap-2.5 transition-all w-full ${
                  activeIndustry === 'education' ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <GraduationCap className="h-4 w-4" /> Education & EdTech
              </button>
              <button
                onClick={() => setActiveIndustry('realestate')}
                className={`px-4 py-3 rounded-xl text-xs font-mono text-left whitespace-nowrap lg:whitespace-normal flex items-center gap-2.5 transition-all w-full ${
                  activeIndustry === 'realestate' ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 className="h-4 w-4" /> Real Estate Segment
              </button>
              <button
                onClick={() => setActiveIndustry('manufacturing')}
                className={`px-4 py-3 rounded-xl text-xs font-mono text-left whitespace-nowrap lg:whitespace-normal flex items-center gap-2.5 transition-all w-full ${
                  activeIndustry === 'manufacturing' ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Activity className="h-4 w-4" /> Manufacturing Sector
              </button>
              <button
                onClick={() => setActiveIndustry('services')}
                className={`px-4 py-3 rounded-xl text-xs font-mono text-left whitespace-nowrap lg:whitespace-normal flex items-center gap-2.5 transition-all w-full ${
                  activeIndustry === 'services' ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Briefcase className="h-4 w-4" /> Professional Services
              </button>
            </div>

            {/* Right content panel */}
            <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md space-y-6 min-h-[300px] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 px-2 py-0.5 rounded uppercase font-bold">
                    {industryRecommendations[activeIndustry as keyof typeof industryRecommendations].badge}
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">
                    RECOMMENDED ARCHITECTURE
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-mono text-[#00C2FF] font-bold">{industryRecommendations[activeIndustry as keyof typeof industryRecommendations].system}</p>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {industryRecommendations[activeIndustry as keyof typeof industryRecommendations].headline}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
                    {industryRecommendations[activeIndustry as keyof typeof industryRecommendations].description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase">PROJECTED SYSTEM IMPACT</p>
                  <p className="text-xs font-bold text-emerald-400">{industryRecommendations[activeIndustry as keyof typeof industryRecommendations].impact}</p>
                </div>
                <button 
                  onClick={() => scrollToId('consultation_form')}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                >
                  Configure For Our Business <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 14: SAVINGS CALCULATOR (SAVINGS DASHBOARD)
            ======================================================== */}
        <section id="calculator" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">INTERACTIVE CALCULATOR</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Calculate Your Potential Savings</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Adjust the sliders representing your active operations to calculate traditional subscription costs vs flat-rate Natton models.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Sliders panel */}
            <div className="lg:col-span-5 p-6 rounded-3xl border border-white/10 bg-[#110B33]/20 space-y-6">
              <h4 className="text-xs font-mono text-gray-300 uppercase tracking-widest font-bold">Operational Parameters</h4>
              
              {/* Slider 1: Team Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">Sales/Marketing Seats</span>
                  <span className="text-[#00C2FF] font-bold">{teamSize} Users</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="100" 
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full accent-[#00C2FF] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[9px] text-gray-500 block">HubSpot & Salesforce charge aggressively per active seat.</span>
              </div>

              {/* Slider 2: Agency retainer */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">Current Monthly Agency Fee</span>
                  <span className="text-[#00C2FF] font-bold">${agencyRetainer.toLocaleString()}/mo</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="15000" 
                  step="500"
                  value={agencyRetainer}
                  onChange={(e) => setAgencyRetainer(parseInt(e.target.value))}
                  className="w-full accent-[#00C2FF] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[9px] text-gray-500 block">Typical monthly retainers for running ads, CRM and email copy updates.</span>
              </div>

              {/* Slider 3: Automation Needs */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">Custom Integration Scope</span>
                  <span className="text-[#00C2FF] font-bold">
                    {automationNeeds === 1 && 'Low (Standard Pipes)'}
                    {automationNeeds === 2 && 'Medium (CRM Webhooks)'}
                    {automationNeeds === 3 && 'High (WhatsApp & n8n)'}
                    {automationNeeds === 4 && 'Enterprise (Voice AI Calling)'}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="4" 
                  step="1"
                  value={automationNeeds}
                  onChange={(e) => setAutomationNeeds(parseInt(e.target.value))}
                  className="w-full accent-[#00C2FF] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[9px] text-gray-500 block">Scale of developer consulting hours required to configure custom hooks.</span>
              </div>
            </div>

            {/* Savings dashboard results */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-white/5 pb-6">
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase">TRADITIONAL MONTHLY</p>
                  <p className="text-2xl font-black text-rose-400 font-display">${totalTraditionalMonthly.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase">NATTON MONTHLY</p>
                  <p className="text-2xl font-black text-[#00C2FF] font-display">${nattonMonthly.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase">MONTHLY SAVINGS</p>
                  <p className="text-2xl font-black text-emerald-400 font-display">${netMonthlySavings.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider font-bold">Projected Net Annual Cost Savings</p>
                  <p className="text-3xl sm:text-4xl font-black text-white font-display">${netYearlySavings.toLocaleString()}/yr</p>
                  <p className="text-xs text-gray-500">Calculated under current parameter constraints. Net growth projections exceed {roiPercentage}% ROI.</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => scrollToId('consultation_form')}
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-95 text-white font-mono font-black text-xs rounded-xl transition-all"
                  >
                    Lock In Savings
                  </button>
                  <button 
                    onClick={() => setPath('ai-readiness-assessment')}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-colors"
                  >
                    Assess Diagnostic
                  </button>
                </div>
              </div>

              {/* Cost breakdown Recharts Bar chart */}
              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono text-gray-500 uppercase block mb-3">Cost Breakdown Comparison ($)</span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roiBreakdownData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={9} fontFamily="monospace" />
                      <YAxis stroke="#6b7280" fontSize={9} fontFamily="monospace" />
                      <Tooltip contentStyle={{ backgroundColor: '#110B33', borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                      <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace' }} />
                      <Bar dataKey="Traditional" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Natton" fill="#00C2FF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 15: CONSULTATION FORM
            ======================================================== */}
        <section id="consultation_form" className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">SECURE PIPELINE SYNC</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Get A Personalized Comparison</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Submit your system parameters. Our Solutions Architects will run a custom audit and route feedback directly via GoHighLevel.</p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#0B0721]/50 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/5 to-transparent blur-xl pointer-events-none" />
            
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white font-display">Comparison Request Registered!</h4>
                  <p className="text-xs text-emerald-400 font-mono">✓ Sync Complete: GoHighLevel Pipeline • Webhook Hooked: n8n active</p>
                  <p className="text-xs text-gray-400 max-w-md mx-auto pt-2">Our Solutions Architect has received your operational parameters. We are compiling your personalized system projection blueprint. Expect response within 4 hours.</p>
                </div>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-colors"
                >
                  Submit Another Parameter Set
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Full Name</label>
                    <input 
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="e.g., Sarah Jenkins"
                      className="w-full px-4 py-2.5 bg-[#110B33]/80 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Company Name</label>
                    <input 
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="e.g., Apex Global Corp"
                      className="w-full px-4 py-2.5 bg-[#110B33]/80 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Current Platform */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Current Platform</label>
                    <select
                      value={formData.currentPlatform}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentPlatform: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-[#110B33]/80 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                    >
                      <option value="HubSpot">HubSpot CRM</option>
                      <option value="Salesforce">Salesforce Cloud</option>
                      <option value="Zoho">Zoho CRM Suite</option>
                      <option value="Traditional Agency">Traditional Agency</option>
                      <option value="Freelancers">Freelancers</option>
                      <option value="Multiple Vendors">Multiple Standalone Apps</option>
                    </select>
                  </div>

                  {/* Industry */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-[#110B33]/80 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                    >
                      <option value="Retail & E-commerce">Retail & E-commerce</option>
                      <option value="Healthcare">Healthcare Systems</option>
                      <option value="Education & EdTech">Education & EdTech</option>
                      <option value="Real Estate">Real Estate Segment</option>
                      <option value="Manufacturing">Manufacturing Sector</option>
                      <option value="Professional Services">Professional Services</option>
                    </select>
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-[#110B33]/80 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                    >
                      <option value="India">India (🇮🇳)</option>
                      <option value="USA">United States (🇺🇸)</option>
                      <option value="UK">United Kingdom (🇬🇧)</option>
                      <option value="UAE">United Arab Emirates (🇦🇪)</option>
                      <option value="Australia">Australia (🇦🇺)</option>
                      <option value="Singapore">Singapore (🇸🇬)</option>
                    </select>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Corporate Email</label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g., sarah@apex.com"
                      className="w-full px-4 py-2.5 bg-[#110B33]/80 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Contact Phone Number</label>
                    <input 
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g., +91 98765 43210"
                      className="w-full px-4 py-2.5 bg-[#110B33]/80 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                    />
                  </div>

                </div>

                {/* Challenges & Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Current Operational Challenges</label>
                  <textarea 
                    value={formData.challenges}
                    onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                    placeholder="e.g., HubSpot seat costs scaling too fast; manual data transfer between Twilio and Google Sheets is breaking leads intake..."
                    rows={2}
                    className="w-full px-4 py-2.5 bg-[#110B33]/80 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-3.5 bg-[#00C2FF] hover:bg-[#00C2FF]/95 text-black font-mono font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> SYNCHRONIZING WITH GO-HIGH-LEVEL WEBHOOK...
                      </>
                    ) : (
                      <>
                        REQUEST PERSONALIZED BLUEPRINT ANALYSIS <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                  <p className="text-[9px] text-gray-500 font-mono text-center mt-2">
                    🔒 SOC2 Compliant. Encrypted Transport. Zero marketing spam.
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ========================================================
            SECTION 16: FAQ (ACCORDION WITH 20 QUESTIONS)
            ======================================================== */}
        <section id="faq" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">KNOWLEDGE BLUEPRINTS</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Explore comprehensive technical details covering pricing, security, calling nodes, custom triggers, and system setups.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="rounded-2xl border border-white/5 bg-[#110B33]/10 overflow-hidden text-left transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 flex justify-between items-center gap-4 text-xs sm:text-sm font-bold text-white hover:bg-white/[0.01] transition-all"
                >
                  <span className="font-display leading-snug flex items-center gap-2">
                    <span className="text-[10px] font-mono text-gray-500">Q{idx + 1}.</span>
                    {faq.q}
                  </span>
                  <ChevronRight className={`h-4 w-4 text-gray-400 shrink-0 transform transition-transform ${
                    openedFaqs[idx] ? 'rotate-90 text-[#00C2FF]' : ''
                  }`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {openedFaqs[idx] && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 pt-0 border-t border-white/5 bg-white/[0.002]">
                        <p className="text-xs text-gray-400 leading-relaxed pl-7">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 17: FINAL CTA (ANIMATED COMP INTELLIGENCE MESH)
            ======================================================== */}
        <section id="final_cta" className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/20 to-purple-950/20 backdrop-blur-md relative overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">READY TO UPGRADE YOUR SYSTEM?</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              Ready To Upgrade Your Growth Stack?
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Consolidate expensive software seat licensing traps, variable developer hourly retainers, and manual data errors with a flat-rate sovereign AI operating cockpit.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <button 
                onClick={() => setPath('book-demo')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:opacity-95 text-white font-mono font-black text-xs rounded-xl transition-all shadow-lg flex items-center gap-1.5"
              >
                Book Demo <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => scrollToId('consultation_form')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-colors"
              >
                Talk To Experts
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
