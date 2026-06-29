import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Target, 
  Workflow, 
  Calendar, 
  FileText, 
  Mail, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Zap, 
  Clock, 
  ArrowRight, 
  Play, 
  Sliders, 
  Smartphone, 
  Database, 
  Lock, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  Plus, 
  Trash2, 
  DollarSign, 
  HelpCircle, 
  BarChart2, 
  Code, 
  Building, 
  GraduationCap, 
  Briefcase, 
  ShoppingBag, 
  Award, 
  Layers, 
  ShieldAlert, 
  MapPin, 
  Sparkles,
  PhoneCall,
  Laptop
} from 'lucide-react';
import { RoutePath } from '../types';

export default function ProductGrowthOs({ setPath, darkMode, ...props }: any) {
  const [localFormSubmitted, setLocalFormSubmitted] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const formSubmitted = props.formSubmitted !== undefined ? props.formSubmitted : localFormSubmitted;
  const setFormSubmitted = props.setFormSubmitted !== undefined ? props.setFormSubmitted : setLocalFormSubmitted;
  const loading = props.loading !== undefined ? props.loading : localLoading;
  const setLoading = props.setLoading !== undefined ? props.setLoading : setLocalLoading;

  useEffect(() => {
    document.title = "GrowthOS™ | AI-Powered CRM, Marketing & Automation Platform";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ==========================================
  // 1. DEMO FORM STATE
  // ==========================================
  const [demoForm, setDemoForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    industry: 'Healthcare',
    currentCrm: 'None / Spreadsheets',
    monthlyLeads: '50 - 200',
    teamSize: '5 - 20',
    message: ''
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptchaNum1(num1);
    setCaptchaNum2(num2);
    setCaptchaInput('');
    setCaptchaVerified(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleCaptchaVerify = () => {
    if (parseInt(captchaInput) === (captchaNum1 + captchaNum2)) {
      setCaptchaVerified(true);
    } else {
      alert("Incorrect math verification value. Please try again.");
      generateCaptcha();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please solve the security verification math question first.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1800);
  };

  // ==========================================
  // 2. INTERACTIVE KANBAN PIPELINE BOARD
  // ==========================================
  const [deals, setDeals] = useState([
    { id: '1', name: 'Fortis Clinic Lead Sync', value: 145000, stage: 'new' },
    { id: '2', name: 'Standard Chartered Pilot', value: 380000, stage: 'contacted' },
    { id: '3', name: 'Tech Mahindra Funnels', value: 210000, stage: 'proposal' },
    { id: '4', name: 'Apollo Dental Campaign', value: 180000, stage: 'won' }
  ]);

  const moveDeal = (dealId: string, newStage: 'new' | 'contacted' | 'proposal' | 'won') => {
    setDeals(deals.map(d => d.id === dealId ? { ...d, stage: newStage } : d));
  };

  const totalPipelineRevenue = deals.reduce((acc, d) => acc + d.value, 0);
  const wonRevenue = deals.filter(d => d.stage === 'won').reduce((acc, d) => acc + d.value, 0);

  // ==========================================
  // 3. INTERACTIVE LANDING PAGE SIMULATOR
  // ==========================================
  const [funnelHeading, setFunnelHeading] = useState('Transform Your Practice Operations Today');
  const [funnelColor, setFunnelColor] = useState('#00C2FF');
  const [funnelTemplate, setFunnelTemplate] = useState('healthcare');

  const templatesList = {
    healthcare: { heading: 'Transform Your Dental Clinic Operations', accent: '#00C2FF' },
    education: { heading: 'Double Your Student Registrations This Autumn', accent: '#8B5CF6' },
    realestate: { heading: 'Programmatic Real Estate Lead Generation Pipelines', accent: '#10B981' },
    retail: { heading: 'Run High-Yield Automated Whatsapp Shopping Funnels', accent: '#EC4899' }
  };

  const applyFunnelTemplate = (type: keyof typeof templatesList) => {
    setFunnelTemplate(type);
    setFunnelHeading(templatesList[type].heading);
    setFunnelColor(templatesList[type].accent);
  };

  // ==========================================
  // 4. INTERACTIVE CALENDAR BOOKING
  // ==========================================
  const [selectedDay, setSelectedDay] = useState<number | null>(27);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [reminderStep, setReminderStep] = useState<string>('idle');

  const triggerMockReminder = (slot: string) => {
    setSelectedSlot(slot);
    setReminderStep('sending');
    setTimeout(() => {
      setReminderStep('sent');
      setBookingConfirmed(true);
    }, 1200);
  };

  // ==========================================
  // 5. INTERACTIVE WORKFLOW AUTOMATION ENGINE
  // ==========================================
  const [workflowActiveNode, setWorkflowActiveNode] = useState<number>(-1);
  const [isWorkflowRunning, setIsWorkflowRunning] = useState(false);
  const [workflowLogs, setWorkflowLogs] = useState<string[]>([]);

  const workflowFlow = [
    { name: "Lead Captured", log: "[Webhook] Lead captured on Dental Landing Page from Mumbai." },
    { name: "Email Sequence", log: "[Mail] High-intent intro video sent to patient inbox." },
    { name: "WhatsApp Sync", log: "[WhatsApp Cloud API] Live booking card delivered to candidate." },
    { name: "Appointment Booked", log: "[Calendar] Patient chose Monday at 2:00 PM." },
    { name: "Pipeline Update", log: "[CRM] Opportunity advanced to 'Scheduled Intake Session'." },
    { name: "Follow-Up Alert", log: "[Slack] Advisor notified to pre-review intake sheets." }
  ];

  const runWorkflowSimulator = () => {
    if (isWorkflowRunning) return;
    setIsWorkflowRunning(true);
    setWorkflowActiveNode(0);
    setWorkflowLogs([workflowFlow[0].log]);

    const nextNode = (idx: number) => {
      if (idx >= workflowFlow.length) {
        setIsWorkflowRunning(false);
        setWorkflowLogs(prev => [...prev, "[Automation] All 6 trigger branches COMPLETED successfully."]);
        return;
      }
      setTimeout(() => {
        setWorkflowActiveNode(idx);
        setWorkflowLogs(prev => [...prev, workflowFlow[idx].log]);
        nextNode(idx + 1);
      }, 1500);
    };

    nextNode(1);
  };

  // ==========================================
  // 6. REAL-TIME GRAPH STATS / METRIC SELECTOR
  // ==========================================
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'leads' | 'conversions'>('revenue');

  const graphData = {
    revenue: {
      points: [
        { label: 'Jan', val: 450000, height: 40 },
        { label: 'Feb', val: 620000, height: 55 },
        { label: 'Mar', val: 890000, height: 80 },
        { label: 'Apr', val: 1200000, height: 110 },
        { label: 'May', val: 1540000, height: 140 },
        { label: 'Jun', val: 2100000, height: 190 }
      ],
      prefix: '₹',
      color: 'stroke-[#00C2FF] fill-[#00C2FF]/10'
    },
    leads: {
      points: [
        { label: 'Jan', val: 120, height: 50 },
        { label: 'Feb', val: 180, height: 75 },
        { label: 'Mar', val: 310, height: 110 },
        { label: 'Apr', val: 420, height: 140 },
        { label: 'May', val: 560, height: 175 },
        { label: 'Jun', val: 780, height: 210 }
      ],
      prefix: '',
      color: 'stroke-[#8B5CF6] fill-[#8B5CF6]/10'
    },
    conversions: {
      points: [
        { label: 'Jan', val: 18, height: 45 },
        { label: 'Feb', val: 24, height: 60 },
        { label: 'Mar', val: 42, height: 95 },
        { label: 'Apr', val: 68, height: 130 },
        { label: 'May', val: 89, height: 165 },
        { label: 'Jun', val: 134, height: 220 }
      ],
      prefix: '',
      color: 'stroke-emerald-400 fill-emerald-400/10'
    }
  };

  // ==========================================
  // 7. ROI SOFTWARE ESTIMATOR
  // ==========================================
  const [leadsInput, setLeadsInput] = useState(150);
  const [teamInput, setTeamInput] = useState(8);
  const [dealValInput, setDealValInput] = useState(25000); // in INR
  const [softwareCost, setSoftwareCost] = useState(15000); // monthly cost in INR

  // Outputs
  const baseConversionRate = 0.04; // 4%
  const growthOsConversionRate = 0.085; // 8.5% due to auto workflows

  const currentRevenue = leadsInput * baseConversionRate * dealValInput;
  const projectedRevenue = leadsInput * growthOsConversionRate * dealValInput;
  const netRevenueIncrease = projectedRevenue - currentRevenue;

  // GrowthOS pricing cost
  const growthOsMonthlyLicense = 9999;
  const monthlyCostSavings = Math.max(0, softwareCost - growthOsMonthlyLicense);
  const annualTotalValue = (netRevenueIncrease + monthlyCostSavings) * 12;

  // ==========================================
  // 8. FAQ AND ACCORDIONS
  // ==========================================
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqsList = [
    {
      q: "What is GrowthOS™ and who is it built for?",
      a: "GrowthOS™ is our flagship business operating system designed for mid-sized enterprises, SMBs, and professional clinics. It unifies high-performance CRM pipelines, dynamic funnel templates, Google/Zoom calendar links, Meta WhatsApp Cloud APIs, and real-time analytical reports into one secure, lightning-fast workspace."
    },
    {
      q: "Can we migrate our existing customer database from Salesforce or HubSpot?",
      a: "Yes. Our team handles 100% of the heavy lifting. We perform full records migration, custom pipeline mapping, contact field matching, and campaign history imports with zero downtime."
    },
    {
      q: "How does the WhatsApp Automation module work?",
      a: "GrowthOS™ integrates with the official Meta WhatsApp Cloud API. You can trigger interactive templates, quick-reply calendars, and automatic invoice updates directly when pipeline stages change."
    },
    {
      q: "Is there support for local payment gateways in India?",
      a: "Absolutely. We support native billing integrations including Razorpay, Stripe, and global options to handle subscriptions, direct payments, and payment links effortlessly."
    },
    {
      q: "What makes the funnel builder load faster than traditional systems?",
      a: "Traditional page builders output bulky code. GrowthOS™ templates compile to pristine, serverless-optimized React structures delivered through global Edge CDN networks, ensuring sub-second load speeds."
    },
    {
      q: "Is our customer and operations data securely protected?",
      a: "Security is our highest foundation. We enforce complete database isolation, end-to-end SSL/TLS encodings, sandboxed custom-RAG setups, and support secure HIPAA/GDPR operations."
    },
    {
      q: "How does the AI Assistant help inside GrowthOS™?",
      a: "Our integrated AI helps compile outbound copywriting, scores incoming lead qualification rates based on business scale, and schedules booking follow-ups automatically."
    },
    {
      q: "Do we need custom coding skills to set up automated workflows?",
      a: "No. Our intuitive, node-based flowchart designer allows operations managers to wire triggers and actions using straightforward parameters and native integrations."
    },
    {
      q: "What calendar APIs can we link with our calendar templates?",
      a: "We support deep, bidirectional synchronization with Google Calendar, Microsoft Outlook, Zoom Rooms, Google Meet, and native in-app schedules."
    },
    {
      q: "Does GrowthOS™ include real-time team collaboration logs?",
      a: "Yes. Staff can tag teammates, schedule specific task lists, write persistent call notes, and review individual pipeline histories directly on customer files."
    },
    {
      q: "How does the Reputation Management module work?",
      a: "GrowthOS™ automatically detects when a deal transitions to 'Closed-Won'. It fires customized WhatsApp or SMS templates prompting clients to leave a 5-star Google review."
    },
    {
      q: "What is the training process for our sales team?",
      a: "Every GrowthOS™ scale license includes a 3-hour dedicated training sequence with our team, custom handbook manuals, and 24/7 priority developer slack channels."
    },
    {
      q: "Is there a limit to the number of leads or contacts we can store?",
      a: "Unlike HubSpot which scales pricing aggressively per contact, GrowthOS™ supports unlimited contacts across all plans. You only pay for your core seat licenses."
    },
    {
      q: "Can we run high-yield cold-calling agents through the dialer?",
      a: "Yes. GrowthOS™ pairs with our Cloud Telephony trunking protocols, allowing agents to run automated outbound dialing grids with absolute clarity."
    },
    {
      q: "What happens if we need to expand our workspace as we grow?",
      a: "GrowthOS™ is designed for modular scale. You can seamlessly add seat licenses, integrate secondary AI agents, or transition to our enterprise dedicated architecture."
    }
  ];

  // ==========================================
  // 9. CLIENT CAROUSEL STATE
  // ==========================================
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const clientStories = [
    {
      industry: "Healthcare",
      title: "How Fortis Dental scaled booking volume by 185%",
      metric: "185% Increase",
      desc: "Fortis integrated our WhatsApp booking calendars and automatic lead nurture nodes, capturing and scheduling emergency clinic appointments in under 4 minutes.",
      quote: "GrowthOS completely replaced our old spreadsheet logs. We reclaimed 24 staff hours every single week.",
      author: "Dr. Alok Sen, Clinical Chief"
    },
    {
      industry: "Education",
      title: "Vasant Prep doubled their entrance examination enrollments",
      metric: "2.1x Enrollments",
      desc: "By deploying programmatic local landing pages coupled with instant SMS reminders, Vasant Prep converted cold web leads into verified diagnostic testing sessions.",
      quote: "Our intake rates grew literally overnight. The automated calendar links saved our desk coordinators thousands of manual calls.",
      author: "Sonia Sharma, Director of Admissions"
    },
    {
      industry: "Real Estate",
      title: "Lodha Elite automated 8,000+ luxury apartment leads",
      metric: "₹1.4 Cr Saved",
      desc: "Lodha mapped active social submissions to GrowthOS pipelines, qualification scoring prospects, and routing hot leads to regional heads in under 12 seconds.",
      quote: "The speed-to-lead workflow is breathtaking. Deleting manual transfer delays boosted our tour conversion rate by 42%.",
      author: "Rahul Mehta, VP of Marketing"
    },
    {
      industry: "Retail & Ecommerce",
      title: "Bombay Threads powered ₹45 Lakhs in automated chat sales",
      metric: "₹45L Revenue",
      desc: "Bombay Threads designed localized WhatsApp checkout funnels that process coupon codes, deliver receipts, and update shipping pipeline status autonomously.",
      quote: "The direct Razorpay connection on WhatsApp changed the game. It is a completely frictionless digital storefront.",
      author: "Priyah Shah, Founder"
    }
  ];

  return (
    <div className={`py-12 animate-fade-in font-sans text-left transition-colors duration-500 ${
      darkMode ? 'bg-[#0B0721] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 text-xs font-mono text-gray-500 flex items-center gap-1.5">
          <button onClick={() => setPath('home')} className="hover:text-[#00C2FF] transition-colors">Home</button> 
          <span>/</span> 
          <span className="text-violet-400 font-semibold">Products</span> 
          <span>/</span> 
          <span>GrowthOS</span>
        </div>

        {/* ==========================================
            1. HERO SECTION (Animated Mesh Style & Interactive 3D Mockup)
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative">
          
          {/* Futuristic ambient vector overlays */}
          <div className="absolute -top-10 left-10 w-[350px] h-[350px] bg-[#00C2FF]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30">
              <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-violet-400 font-bold">
                Flagship Business Suite
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight">
              The Business Operating <br />
              <span className="bg-gradient-to-r from-violet-400 via-[#00C2FF] to-pink-500 bg-clip-text text-transparent">
                System Built For Growth
              </span>
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              CRM, marketing, funnels, automated workflows, calendars, WhatsApp Cloud APIs, and real-time business metrics—all integrated into one cohesive enterprise framework. Stop paying for 10 disconnected tools.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#demo_form" 
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-violet-500/20 transition-all flex items-center gap-2 text-sm"
              >
                Book Live Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#interactive_dashboard" 
                className={`px-6 py-3 rounded-lg border transition-all flex items-center gap-2 text-sm font-semibold ${
                  darkMode 
                    ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#00C2FF]' 
                    : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                Watch Product Tour <Play className="h-4 w-4 text-[#00C2FF]" />
              </a>
            </div>

            {/* Platform Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-6 text-[10px] font-mono text-gray-500 border-t border-white/5">
              <span className="flex items-center gap-1.5">⚡ Stripe & Razorpay Verified</span>
              <span className="flex items-center gap-1.5">🔒 AES-256 Cloud Encryption</span>
              <span className="flex items-center gap-1.5">🚀 Serverless Edge Delivery</span>
            </div>
          </div>

          {/* Right Column: Floating holographic mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px]">
            <div className={`p-6 rounded-3xl border w-full max-w-[420px] relative overflow-hidden backdrop-blur-md transition-all hover:scale-[1.01] ${
              darkMode ? 'bg-[#0E1524]/60 border-white/10 shadow-violet-950/20' : 'bg-white border-slate-200 shadow-2xl'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-[#00C2FF]/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xs font-mono uppercase text-gray-500 mb-3 tracking-wider flex items-center justify-between border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5"><Laptop className="h-3.5 w-3.5 text-[#00C2FF]" /> HOLOGRAPHIC WORKSPACE</span>
                <span className="text-[9px] text-emerald-400 font-bold animate-pulse">● LIVE METRICS</span>
              </h3>

              {/* Graphical simulation block */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-4 font-mono text-[10px]">
                <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                  <span className="text-gray-400">Pipeline Status</span>
                  <span className="text-emerald-400 font-bold">Closed-Won (78.4%)</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] text-gray-500">
                    <span>Automation Nodes</span>
                    <span>12/12 Active</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#00C2FF] h-full w-[85%] animate-pulse" />
                  </div>
                </div>

                {/* Animated vector radar line */}
                <div className="h-28 w-full border border-white/5 rounded-lg flex items-center justify-center relative overflow-hidden bg-[#0A071A]">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute h-20 w-20 rounded-full border border-violet-500/20 animate-ping" />
                  <div className="absolute h-10 w-10 rounded-full border border-[#00C2FF]/30 animate-pulse" />
                  
                  <div className="text-center relative space-y-1">
                    <Activity className="h-5 w-5 mx-auto text-[#00C2FF] animate-bounce" />
                    <span className="text-[8px] text-[#00C2FF] tracking-widest font-bold">CRM ONLINE</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-gray-400 bg-black/20 p-2 rounded border border-white/5">
                <span>⚡ Integrates with HubSpot/GHL</span>
                <span className="text-[#00C2FF] font-bold">100% Consolidated</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. ECOSYSTEM SECTION (Bento Grid of Cards)
           ========================================== */}
        <div id="ecosystem" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Unified Business Solutions</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Everything Your Business Needs
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Say goodbye to subscription sprawl. GrowthOS™ bundles 12 essential marketing, conversion, and operation platforms into a single interface.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "CRM", desc: "A robust, scalable workspace to log client histories, custom tags, and task lists without user limit caps.", icon: Users, color: "text-[#00C2FF] bg-[#00C2FF]/10" },
              { title: "Pipelines", desc: "Interactive Kanban grids mapping your leads from intake to checkout deals securely.", icon: Target, color: "text-violet-400 bg-violet-400/10" },
              { title: "Funnels", desc: "Stunning drag-and-drop checkout pipelines delivering custom templates on serverless architectures.", icon: Layers, color: "text-emerald-400 bg-emerald-400/10" },
              { title: "Landing Pages", desc: "Supercharge your local search presence with responsive pages compiling in milliseconds.", icon: Laptop, color: "text-pink-400 bg-pink-400/10" },
              { title: "Calendars", desc: "Interactive appointment schedulers syncing seamlessly with Google Calendar and Zoom Meetings.", icon: Calendar, color: "text-amber-400 bg-amber-400/10" },
              { title: "Forms", desc: "Clean lead capture forms with integrated mathematical CAPTCHA code and secure databases.", icon: FileText, color: "text-[#00C2FF] bg-[#00C2FF]/10" },
              { title: "Email Marketing", desc: "Deploy automatic email drip campaigns tailored to client demographics instantly.", icon: Mail, color: "text-[#00C2FF] bg-[#00C2FF]/10" },
              { title: "WhatsApp Automation", desc: "Official Meta Cloud API triggers that deliver templates and invoices right to WhatsApp.", icon: Smartphone, color: "text-emerald-400 bg-emerald-400/10" },
              { title: "Reputation Management", desc: "Auto-trigger Google and Trustpilot review requests when a pipeline transitions to won.", icon: Award, color: "text-amber-400 bg-amber-400/10" },
              { title: "Workflows", desc: "Connect triggers with actions using our simple, node-based flowchart designer.", icon: Workflow, color: "text-violet-400 bg-violet-400/10" },
              { title: "Analytics", desc: "Track conversions, pipeline value, lead sources, and monthly corporate revenue stats.", icon: TrendingUp, color: "text-[#00C2FF] bg-[#00C2FF]/10" },
              { title: "AI Assistant", desc: "Generate outbound copywriting scripts and qualify lead score indicators autonomously.", icon: Cpu, color: "text-pink-400 bg-pink-400/10" }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                  darkMode ? 'bg-white/[0.01] border-white/5 hover:border-[#00C2FF]' : 'bg-white border-slate-200 hover:shadow-lg'
                }`}>
                  <div className="space-y-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold font-display">{card.title}</h3>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{card.desc}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1 text-[10px] font-mono text-gray-500 font-semibold uppercase">
                    <span>Explore Node</span> <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            3. INTERACTIVE DASHBOARD EXPERIENCE (Highly Interactive Sandbox)
           ========================================== */}
        <div id="interactive_dashboard" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-[#00C2FF] uppercase block font-bold">Interactive Sandbox Simulator</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Interactive Dashboard Experience
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Test drive the GrowthOS™ dashboard. Modify pipeline deals, switch template accents, click calendar dates, and watch calculations update live.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Interactive Section Selector & Playground Sidebar */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-center">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">CONFIGURE PLAYGROUND MODULE</span>
              
              {/* Pipeline Deal Mover */}
              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200'}`}>
                <h4 className="text-xs font-bold font-display mb-2 flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-[#00C2FF]" /> Drag-and-Drop Deal Mover
                </h4>
                <p className="text-[10px] text-gray-500 mb-3 leading-relaxed">Advance standard deals across CRM pipeline columns:</p>
                <div className="space-y-2">
                  {deals.map(deal => (
                    <div key={deal.id} className="flex items-center justify-between bg-black/25 p-2 rounded border border-white/5">
                      <span className="text-[10px] font-semibold truncate max-w-[120px]">{deal.name}</span>
                      <select
                        value={deal.stage}
                        onChange={(e) => moveDeal(deal.id, e.target.value as any)}
                        className="bg-zinc-800 text-white border border-white/10 text-[9px] p-1 rounded focus:outline-none"
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="proposal">Proposal</option>
                        <option value="won">Closed-Won</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Personalizer */}
              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200'}`}>
                <h4 className="text-xs font-bold font-display mb-2 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-violet-400" /> Landing Page Customizer
                </h4>
                <p className="text-[10px] text-gray-500 mb-3 leading-relaxed">Click to test instant programmatic responsive industry structures:</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(templatesList) as Array<keyof typeof templatesList>).map((type) => (
                    <button
                      key={type}
                      onClick={() => applyFunnelTemplate(type)}
                      className={`p-2 rounded text-[9px] font-mono uppercase font-bold border transition-all ${
                        funnelTemplate === type 
                          ? 'border-[#00C2FF] bg-[#00C2FF]/10 text-[#00C2FF]' 
                          : 'border-white/5 bg-zinc-800 text-gray-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dashboard Display Viewport */}
            <div className={`lg:col-span-8 rounded-2xl border p-6 flex flex-col justify-between backdrop-blur-md relative ${
              darkMode ? 'bg-[#0E1524]/80 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-[#00C2FF]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                
                {/* Header bar */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[9px] font-mono text-violet-400 uppercase tracking-widest block">OPERATING CONSOLE</span>
                    <h3 className="text-lg font-bold font-display flex items-center gap-1.5">GrowthOS™ Unified Hub</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right">
                      <span className="text-gray-500 block text-[9px]">TOTAL PIPELINE VALUE</span>
                      <span className="font-bold text-[#00C2FF]">₹{totalPipelineRevenue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="text-right border-l border-white/10 pl-4">
                      <span className="text-gray-500 block text-[9px]">CLOSED-WON REVENUE</span>
                      <span className="font-bold text-emerald-400">₹{wonRevenue.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated CRM visual layout split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Pipeline columns */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Active Kanban Columns:</span>
                    <div className="grid grid-cols-4 gap-2">
                      {['new', 'contacted', 'proposal', 'won'].map((stage) => {
                        const stageDeals = deals.filter(d => d.stage === stage);
                        return (
                          <div key={stage} className="p-2 bg-black/25 rounded border border-white/5 space-y-1.5 min-h-[140px] flex flex-col justify-between">
                            <span className="text-[8px] font-mono text-gray-500 uppercase block border-b border-white/5 pb-1 text-center truncate">
                              {stage === 'new' ? 'NEW' : stage === 'contacted' ? 'TALK' : stage === 'proposal' ? 'PROP' : 'WON'}
                            </span>
                            <div className="space-y-1 flex-grow pt-1.5">
                              {stageDeals.map(d => (
                                <div key={d.id} className="p-1.5 bg-zinc-800 rounded border border-white/5 text-[8px] font-semibold truncate" title={d.name}>
                                  {d.name}
                                </div>
                              ))}
                            </div>
                            <span className="text-[8px] font-mono text-[#00C2FF] text-center block pt-1 border-t border-white/5">
                              ₹{stageDeals.reduce((sum, current) => sum + current.value, 0) / 1000}k
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Programmatic Funnel Simulator View */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Interactive Funnel Live-Preview:</span>
                    <div className="p-4 rounded-xl border border-white/5 bg-[#0A071A] min-h-[140px] flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-white/5 pb-1.5 text-[8px] font-mono text-gray-500">
                        <span>Preview: dental-intake-page.html</span>
                        <span className="text-[#00C2FF]">● LIVE</span>
                      </div>
                      
                      <div className="text-center py-4 space-y-2">
                        <h4 className="text-xs font-bold font-display px-2 transition-all duration-300" style={{ color: funnelColor }}>
                          {funnelHeading}
                        </h4>
                        <p className="text-[9px] text-gray-400">Book diagnostic slots in Mumbai instantly.</p>
                        <button className="px-3 py-1 rounded text-[8px] font-mono text-white" style={{ backgroundColor: funnelColor }}>
                          Verify Booking Slot
                        </button>
                      </div>

                      <div className="flex justify-between items-center text-[7px] text-gray-500 font-mono">
                        <span>Load Speed: <span className="text-emerald-400 font-bold">140ms</span></span>
                        <span>SEO Rank: <span className="text-[#00C2FF] font-bold">99/100</span></span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
                <span>⚡ Prompt Protocol: pipeline_monitor_v4.1</span>
                <span>Active integrations: HubSpot, GHL, Razorpay</span>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            4. SMART CRM & PIPELINE DEEP DIVES
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* Smart CRM Detail */}
          <div className={`p-8 rounded-2xl border flex flex-col justify-between ${
            darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-[#00C2FF] uppercase block tracking-widest font-bold">CRM Module spec</span>
              <h3 className="text-2xl font-bold font-display">Smart CRM</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                A modern client registry engine designed to store comprehensive contact logs, client tags, notes histories, and automated schedule tasks without charging aggressive per-contact premiums.
              </p>

              <div className="space-y-3">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">CORE SUB-CAPABILITIES:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Unified Contacts Log", "Programmatic Lead Tracking", "Opportunity Scoring Metrics", "Task Assignment Calendars", "Team Collaboration Feeds"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className={darkMode ? 'text-gray-300' : 'text-slate-700'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>Database Sync: Real-Time SSL</span>
              <span>Unlimited Contact Records</span>
            </div>
          </div>

          {/* Sales Pipeline Management Detail */}
          <div className={`p-8 rounded-2xl border flex flex-col justify-between ${
            darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-violet-400 uppercase block tracking-widest font-bold">Pipeline Module spec</span>
              <h3 className="text-2xl font-bold font-display">Sales Pipeline Management</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Monitor prospective clients as they navigate custom qualification metrics. Create distinct pipelines for sales reps, client onboarding coordinators, and outbound campaigns.
              </p>

              <div className="space-y-3">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">CORE SUB-CAPABILITIES:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Drag & Drop Stages", "Automated Lead Status", "Revenue Projections", "Advisor Dialers", "Google/Trustpilot Collectors"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className={darkMode ? 'text-gray-300' : 'text-slate-700'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>Layout Style: Kanban Responsive</span>
              <span>Bidirectional HubSpot Sync</span>
            </div>
          </div>

        </div>

        {/* ==========================================
            5. FUNNELS & CALENDAR DEEP DIVES
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* Funnels & Landing Pages Detail */}
          <div className={`p-8 rounded-2xl border flex flex-col justify-between ${
            darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-emerald-400 uppercase block tracking-widest font-bold">Builder Module spec</span>
              <h3 className="text-2xl font-bold font-display">Funnels & Landing Pages</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Deploy ultra-fast, serverless landing pages optimized to score 99/100 on mobile web vitals. Embed checkout templates, payment integrations, and math CAPTCHAs easily.
              </p>

              <div className="space-y-3">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">CORE SUB-CAPABILITIES:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Drag-and-Drop Builders", "High-Volume Lead Captures", "Sub-second Page Speeds", "Programmatic Keyword SEO", "Instant Razorpay Checkout"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className={darkMode ? 'text-gray-300' : 'text-slate-700'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>Hosting: Global Vercel Edge</span>
              <span>SSL Certificate Pre-bound</span>
            </div>
          </div>

          {/* Calendars & Scheduling Detail */}
          <div className={`p-8 rounded-2xl border flex flex-col justify-between ${
            darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-pink-400 uppercase block tracking-widest font-bold">Scheduler Module spec</span>
              <h3 className="text-2xl font-bold font-display">Calendar & Appointment Scheduling</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Link corporate advisors directly into prospect booking panels. Automatically block overlapping dates, configure Zoom URLs, and dispatch email drip reminders.
              </p>

              <div className="space-y-3">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">CORE SUB-CAPABILITIES:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Google Calendar Sync", "Microsoft Outlook Sync", "Automated Reminder Loops", "Dedicated Booking Panels", "Integrated Zoom & Meet Links"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className={darkMode ? 'text-gray-300' : 'text-slate-700'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>Sync Protocol: Bidirectional API</span>
              <span>Timezone auto-calculations</span>
            </div>
          </div>

        </div>

        {/* ==========================================
            6. WORKFLOW AUTOMATION (Interactive Node-Based Simulator)
           ========================================== */}
        <div id="automation" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Visual Workflow Engine</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Workflow Automation
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Watch how our automation engine handles sequential pipeline transitions. Click 'Execute Flow Test' to trace signals across nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visual node flowchart */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">ACTIVE PIPELINE SEQUENCE MAP</span>
                <button
                  onClick={runWorkflowSimulator}
                  disabled={isWorkflowRunning}
                  className="px-4 py-1.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-mono text-[10px] rounded-lg flex items-center gap-1.5 font-bold uppercase shadow-md transition-all disabled:opacity-50"
                >
                  <Zap className="h-3.5 w-3.5" /> {isWorkflowRunning ? "Tracing Nodes..." : "Execute Flow Test"}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative">
                {workflowFlow.map((node, idx) => {
                  const isActive = workflowActiveNode === idx;
                  const isPassed = workflowActiveNode > idx;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-300 min-h-[90px] ${
                        isActive 
                          ? 'border-[#00C2FF] bg-[#00C2FF]/10 shadow-lg scale-[1.01]' 
                          : isPassed 
                            ? 'border-emerald-500/40 bg-emerald-500/5' 
                            : (darkMode ? 'border-white/5 bg-white/[0.01] opacity-70' : 'border-slate-100 bg-white opacity-75')
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[8px] font-mono text-gray-500">NODE 0{idx + 1}</span>
                        {isPassed && (
                          <span className="text-[8px] font-mono text-emerald-400 uppercase font-bold">Passed</span>
                        )}
                        {isActive && (
                          <span className="text-[8px] font-mono text-[#00C2FF] uppercase font-bold animate-pulse">Active</span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold font-display">{node.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Micro execution logs terminal */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className={`rounded-2xl border p-6 flex flex-col justify-between h-full backdrop-blur-md relative ${
                darkMode ? 'bg-black/40 border-white/10 text-gray-300' : 'bg-slate-900 border-slate-800 text-slate-100 shadow-2xl'
              }`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-mono text-[#00C2FF] uppercase font-bold">EXECUTION CONSOLE LOGS</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="font-mono text-[10px] space-y-2 h-[200px] overflow-y-auto scrollbar-none">
                    {workflowLogs.length === 0 ? (
                      <p className="text-gray-500">Press 'Execute Flow Test' to trace webhook actions live.</p>
                    ) : (
                      workflowLogs.map((log, idx) => (
                        <p key={idx} className={log.includes('[Automation]') ? 'text-emerald-400 font-bold' : 'text-gray-300'}>
                          {log}
                        </p>
                      ))
                    )}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-gray-500 space-y-1 mt-4">
                  <div>PROTOCOL ENGINE: <span className="text-[#00C2FF]">GHL Core API v2</span></div>
                  <div>SECURITY LAYER: <span className="text-violet-400">SOC2 compliant logs</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            7. COMMUNICATION HUB & INTERACTIVE REAL-TIME ANALYTICS
           ========================================== */}
        <div id="analytics" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#00C2FF] uppercase block font-bold">Consolidated Dashboard Records</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Real-Time Analytical Performance
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Monitor how automation impacts your sales funnel. Toggle different performance metrics to review responsive visual graphs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Metric selection panels */}
            <div className="lg:col-span-4 space-y-3 flex flex-col justify-center">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">SELECT ANALYTIC GRAPH</span>
              {[
                { key: 'revenue', label: 'Company Revenue Growth', desc: 'Real-time billing value across monthly client pipelines.', color: 'border-[#00C2FF] bg-[#00C2FF]/5' },
                { key: 'leads', label: 'Qualified Lead Volume', desc: 'Tracks total inbound entries qualification success.', color: 'border-violet-500 bg-violet-500/5' },
                { key: 'conversions', label: 'Funnel Conversion Rate', desc: 'Evaluates the percentage of closed-won win statuses.', color: 'border-emerald-500 bg-emerald-500/5' }
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setActiveMetric(m.key as any)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    activeMetric === m.key
                      ? `border-[#00C2FF] bg-[#00C2FF]/10 shadow-lg scale-[1.01]`
                      : (darkMode ? 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]' : 'border-slate-200 bg-white hover:bg-slate-50')
                  }`}
                >
                  <h4 className="text-xs font-bold font-display">{m.label}</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed mt-1">{m.desc}</p>
                </button>
              ))}
            </div>

            {/* Right Column: Custom Animated SVG Graph Panel */}
            <div className={`lg:col-span-8 p-6 rounded-2xl border flex flex-col justify-between backdrop-blur-md relative ${
              darkMode ? 'bg-[#0E1524]/80 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-[#00C2FF]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[9px] font-mono text-violet-400 uppercase tracking-widest block">PERFORMANCE GRAPH MONITOR</span>
                    <h3 className="text-base font-bold font-display capitalize">{activeMetric} Performance Trend</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 uppercase animate-pulse">
                    ● Real-Time Feed
                  </span>
                </div>

                {/* Custom Responsive SVG Graph */}
                <div className="h-[220px] w-full flex items-end justify-between px-2 pt-6 relative border-b border-l border-white/10">
                  
                  {/* Grid lines background */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                    <div className="border-b border-white w-full h-0" />
                    <div className="border-b border-white w-full h-0" />
                    <div className="border-b border-white w-full h-0" />
                    <div className="border-b border-white w-full h-0" />
                  </div>

                  {/* Render Columns */}
                  {graphData[activeMetric].points.map((pt, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative z-10">
                      
                      {/* Interactive Tooltip Overlay */}
                      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white border border-white/10 text-[9px] font-mono px-2.5 py-1.5 rounded-lg shadow-xl text-center z-50 pointer-events-none whitespace-nowrap">
                        <span className="block text-gray-500 font-bold">VALUE</span>
                        <span className="text-[#00C2FF] font-extrabold">{graphData[activeMetric].prefix}{pt.val.toLocaleString('en-IN')}</span>
                      </div>

                      {/* Bar Column Vector */}
                      <div 
                        className="w-[60%] rounded-t-lg bg-gradient-to-t from-violet-600/20 to-blue-500/50 hover:to-blue-400 transition-all duration-500 relative overflow-hidden border-t border-x border-[#00C2FF]/30" 
                        style={{ height: `${pt.height}px` }}
                      >
                        {/* Shimmer pulse */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent w-full h-full -translate-y-full hover:translate-y-full transition-transform duration-1000" />
                      </div>

                      <span className="text-[9px] font-mono text-gray-500 mt-2 block">{pt.label}</span>
                    </div>
                  ))}

                </div>
              </div>

              <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>⚡ Metric Class: {activeMetric === 'revenue' ? 'Financial Ledger' : 'CRM Tracker'}</span>
                <span>Bidirectional API Sync: Verified</span>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            8. INDUSTRY USE CASES
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#8B5CF6] uppercase block font-bold">Tailored Implementations</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Built For Every Industry
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              GrowthOS™ maps seamlessly to your distinct industry parameters. Select your sector to review pre-engineered blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Healthcare", desc: "Automate patient intake registrations, Google reviews collections, HIPAA reminder alerts, and appointment schedules.", icon: Building, color: "border-blue-500/20 text-blue-400" },
              { title: "Education", desc: "Qualify student applicants, sync advisor dialers, issue automated admission alerts, and process tuition schedules.", icon: GraduationCap, color: "text-violet-400 border-violet-500/20" },
              { title: "Real Estate", desc: "Instantly capture prospective home leads, schedule site tours, calculate qualification values, and handle follow-up emails.", icon: Briefcase, color: "text-emerald-400 border-emerald-500/20" },
              { title: "Retail", desc: "Design localized WhatsApp coupon loops, automate shipping tracking codes, handle direct Razorpay payouts, and map inventory.", icon: ShoppingBag, color: "text-pink-400 border-pink-500/20" },
              { title: "Manufacturing", desc: "Coordinate stock metrics, configure automated supplier quote updates, manage shipping timelines, and dispatch team alerts.", icon: Award, color: "text-amber-400 border-amber-500/20" },
              { title: "Professional Services", desc: "Issue client intake agreements, process invoices via Razorpay, schedule weekly task trackers, and audit project metrics.", icon: Users, color: "text-[#00C2FF] border-[#00C2FF]/20" }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between backdrop-blur-md ${
                  darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4.5 w-4.5 text-[#00C2FF]" />
                      <h3 className="text-sm font-bold font-display">{card.title}</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{card.desc}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>Blueprint status: pre-configured</span>
                    <span className="text-[#00C2FF] font-semibold">Deploy Blueprint</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            9. INTEGRATIONS (Infinite Logo Marquee)
           ========================================== */}
        <div className="mb-24 space-y-4">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block text-center font-bold">CONNECT YOUR CONSOLIDATED TECH NETWORKS</span>
          
          <div className="w-full overflow-hidden relative py-4">
            {/* Infinite Marquee Animation Grid */}
            <div className="flex gap-8 items-center animate-marquee whitespace-nowrap">
              {[
                "Google Workspace", "Zoom", "Stripe", "Razorpay", "WhatsApp", "Shopify", 
                "WooCommerce", "n8n", "Zapier", "HubSpot", "Google Workspace", "Zoom", "Stripe"
              ].map((logo, idx) => (
                <span key={idx} className={`px-4 py-2 rounded-xl border text-xs font-mono font-semibold ${
                  darkMode ? 'bg-[#0E1524] border-white/5 text-gray-400' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}>
                  🔌 {logo}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            10. COMPARISON SECTION (Why GrowthOS™ Table)
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Unbiased Performance Check</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Why GrowthOS™
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Compare features and check why growing SMBs migrate their core operations from traditional high-cost networks to GrowthOS™.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className={`w-full text-xs text-left border-collapse ${darkMode ? 'bg-white/[0.01]' : 'bg-white'}`}>
              <thead>
                <tr className="border-b border-white/5 font-mono text-[10px] uppercase text-gray-500">
                  <th className="p-4">Features</th>
                  <th className="p-4 text-[#00C2FF] font-bold">GrowthOS</th>
                  <th className="p-4">HubSpot</th>
                  <th className="p-4">GoHighLevel</th>
                  <th className="p-4">Salesforce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-semibold">
                {[
                  { feat: "Unlimited Inbound Contacts", values: ["✓ Included", "❌ $200+ Add-on", "✓ Included", "❌ $300+ Add-on"] },
                  { feat: "Official WhatsApp Cloud API Integration", values: ["✓ Native Code", "❌ Requires Zapier", "✓ Native Code", "❌ Custom API Only"] },
                  { feat: "Serverless Edge Landing Pages", values: ["✓ Sub-200ms Load", "❌ Traditional Server", "❌ Traditional Server", "❌ High-weight Pages"] },
                  { feat: "Localized Math CAPTCHA Security", values: ["✓ Built-in", "❌ Enterprise Only", "❌ Requires Add-on", "❌ Enterprise Setup"] },
                  { feat: "Bidirectional HubSpot / GHL Sync", values: ["✓ Native Sync", "❌ N/A", "❌ Custom Setup", "❌ Complex MuleSoft"] },
                  { feat: "Dedicated Indian support teams", values: ["✓ 24/7 Slack", "❌ Email ticket", "❌ Chatbot", "❌ Dedicated rep $2k+"] }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-display text-gray-400">{row.feat}</td>
                    <td className="p-4 text-[#00C2FF] font-bold">{row.values[0]}</td>
                    <td className="p-4 text-gray-500">{row.values[1]}</td>
                    <td className="p-4 text-gray-500">{row.values[2]}</td>
                    <td className="p-4 text-gray-500">{row.values[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            11. PRICING CALCULATOR (Estimate Your ROI)
           ========================================== */}
        <div id="pricing_calculator" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase block font-bold">Financial Optimization</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Estimate Your ROI
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Use our estimator to calculate how much corporate value GrowthOS™ unlocks by minimizing administrative software budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Inputs Card */}
            <div className={`lg:col-span-6 p-6 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-bold">ADJUST VALUE PARAMETERS</span>
                
                {/* Inputs */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Monthly Lead Registrations</span>
                    <span className="font-mono text-[#00C2FF]">{leadsInput} entries</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={leadsInput}
                    onChange={(e) => setLeadsInput(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Active Team Members</span>
                    <span className="font-mono text-[#00C2FF]">{teamInput} staff</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={teamInput}
                    onChange={(e) => setTeamInput(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Average Client Deal Value</span>
                    <span className="font-mono text-[#00C2FF]">₹{dealValInput.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="200000"
                    step="5000"
                    value={dealValInput}
                    onChange={(e) => setDealValInput(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Current Administrative Software Cost</span>
                    <span className="font-mono text-[#00C2FF]">₹{softwareCost.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="2500"
                    value={softwareCost}
                    onChange={(e) => setSoftwareCost(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-black/25 text-[10px] font-mono text-gray-500 border border-white/5">
                💡 <span className="font-bold text-gray-300">Methodology:</span> Compares standard 4% capture conversion rates with our accelerated 8.5% automated nurture pipeline benchmarks, adding local tool budget optimizations.
              </div>
            </div>

            {/* Right Output Calculations */}
            <div className={`lg:col-span-6 p-8 rounded-2xl border flex flex-col justify-between backdrop-blur-md relative overflow-hidden ${
              darkMode ? 'bg-[#0E1524]/80 border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">ESTIMATED NET ANNUAL ADVANTAGE</span>

                {/* Main Savings Number */}
                <div className="space-y-1 border-b border-white/5 pb-6">
                  <span className="text-xs text-gray-500 uppercase font-mono">ANNUAL TOTAL REVENUE INCREASE</span>
                  <div className="text-3xl sm:text-5xl font-extrabold text-emerald-400 font-mono">
                    ₹{annualTotalValue.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Sub statistics indicators */}
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Monthly Cost Savings</span>
                    <span className="text-lg sm:text-xl font-bold font-mono text-[#00C2FF]">₹{monthlyCostSavings.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Nurture Conversion Uplift</span>
                    <span className="text-lg sm:text-xl font-bold font-mono text-pink-400">+4.5% Conversion</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-8 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
                <span>⚡ Estimates Class: Corporate ROI</span>
                <span className="text-[#00C2FF] font-bold">Payback period: ~30 days</span>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            12. FLEXIBLE PRICING
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#8B5CF6] uppercase block font-bold">Predictable Operating budgets</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Flexible Pricing
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Simple monthly licensing rates designed to help SMBs scale without contact-based fine print penalties.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "₹4,999", duration: "month", popular: false, desc: "Perfect for local practitioners starting out.", features: ["Full Smart CRM System", "Integrated Booking Calendars", "Math CAPTCHA Protected Forms", "2 Basic Opportunity Pipelines"] },
              { name: "Growth", price: "₹9,999", duration: "month", popular: true, desc: "Engineered for high-volume conversion pipelines.", features: ["Everything in Starter", "Official WhatsApp Cloud API", "Drag-and-Drop Landing Funnels", "Unlimited Outbound Email Campaigns"] },
              { name: "Scale", price: "₹19,999", duration: "month", popular: false, desc: "Dedicated support for growing corporate staff.", features: ["Everything in Growth Suite", "Dedicated Analytical Dashboards", "Staff Seat Permission Logs", "24/7 Priority Support Teams"] }
            ].map((plan, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
                plan.popular 
                  ? 'border-[#00C2FF] bg-[#00C2FF]/5 shadow-xl shadow-violet-950/20' 
                  : (darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm')
              }`}>
                {plan.popular && (
                  <div className="absolute top-4 right-4 text-[9px] font-mono font-bold bg-[#00C2FF] text-[#0B0721] px-2 py-0.5 rounded-full uppercase">
                    Most Popular
                  </div>
                )}
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold font-display">{plan.name}</h3>
                    <p className={`text-xs leading-relaxed mt-1 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{plan.desc}</p>
                  </div>

                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#00C2FF]">{plan.price}</span>
                    <span className="text-xs text-gray-500">/{plan.duration}</span>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-white/5 text-xs">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span className={darkMode ? 'text-gray-300' : 'text-slate-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a 
                    href="#demo_form"
                    className={`w-full py-2.5 rounded-xl text-center block text-xs font-semibold uppercase transition-all ${
                      plan.popular 
                        ? 'bg-[#00C2FF] text-[#0B0721] hover:bg-[#00c3ffd5] shadow-lg' 
                        : (darkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-900 text-white hover:bg-slate-800')
                    }`}
                  >
                    Deploy {plan.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            13. CUSTOMER STORIES (Interactive Carousel Showcase)
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase block font-bold">Real-World Case studies</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Client Success Stories
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Click the selectors below to review real conversion and efficiency metrics generated by GrowthOS™ in the field.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Story Selectors */}
            <div className="lg:col-span-4 space-y-3 flex flex-col justify-center">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">CHOOSE ACTIVE CASE PROFILE</span>
              {clientStories.map((story, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStoryIdx(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    activeStoryIdx === idx
                      ? 'border-[#00C2FF] bg-[#00C2FF]/10 shadow-lg scale-[1.01]'
                      : (darkMode ? 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]' : 'border-slate-200 bg-white hover:bg-slate-50')
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-mono text-[#00C2FF] uppercase font-bold">{story.industry}</span>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">{story.metric}</span>
                  </div>
                  <h4 className="text-xs font-bold font-display truncate">{story.title}</h4>
                </button>
              ))}
            </div>

            {/* Expanded active success cards */}
            <div className={`lg:col-span-8 p-8 rounded-3xl border flex flex-col justify-between backdrop-blur-md relative overflow-hidden ${
              darkMode ? 'bg-[#0E1524]/80 border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="absolute top-0 right-0 h-48 w-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[9px] font-mono text-violet-400 uppercase tracking-widest block mb-1">SUCCESS PROFILE DETAIL</span>
                    <h3 className="text-xl font-bold font-display">{clientStories[activeStoryIdx].title}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 uppercase">
                    {clientStories[activeStoryIdx].metric}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  {clientStories[activeStoryIdx].desc}
                </p>

                {/* Client Quotation Block */}
                <div className="p-4 rounded-xl bg-black/25 border-l-4 border-[#00C2FF] border-y border-r border-white/5 text-xs italic text-gray-300">
                  "{clientStories[activeStoryIdx].quote}"
                  <span className="block text-[10px] font-mono not-italic text-gray-500 mt-2 font-bold uppercase">— {clientStories[activeStoryIdx].author}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
                <span>⚡ Case status: verified results</span>
                <span>Active integrations: GHL calendar, WhatsApp APIs</span>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            14. SIMPLE ONBOARDING PROCESS (Timeline View)
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-pink-400 uppercase block font-bold">Frictionless deployment roadmap</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Simple Onboarding Process
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              How we launch GrowthOS™ for your corporate workspace in six structured steps under 10 business days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {[
              { step: "01", name: "Discovery Call", desc: "Evaluate your routine pipelines, tool budgets, and core optimization parameters." },
              { step: "02", name: "Platform Setup", desc: "Bootstrap your separate corporate GrowthOS license with custom security profiles." },
              { step: "03", name: "Migration", desc: "Migrate client logs, contact lists, and tags securely from legacy databases." },
              { step: "04", name: "Automation Setup", desc: "Design node-based triggers, calendar links, and official WhatsApp templates." },
              { step: "05", name: "Training", desc: "Deliver hands-on coordination briefings to your sales and operation reps." },
              { step: "06", name: "Go Live", desc: "Flick the active switch with complete programmatic performance auditing." }
            ].map((node, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border flex flex-col justify-between backdrop-blur-md relative ${
                darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-4">
                  <span className="text-xl font-extrabold text-[#00C2FF] font-mono block">{node.step}</span>
                  <h4 className="text-xs font-bold font-display">{node.name}</h4>
                  <p className={`text-[10px] leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            15. FREQUENTLY ASKED QUESTIONS (Accordion with Search Filter)
           ========================================== */}
        <div id="faq" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-[#00C2FF] uppercase block font-bold">Support & Knowledge Center</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Find answers to core structural, technical, and operational questions regarding GrowthOS™ integrations.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqsList.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`rounded-xl border transition-all ${
                    isOpen 
                      ? 'border-[#00C2FF] bg-[#00C2FF]/5 shadow-md' 
                      : (darkMode ? 'border-white/5 bg-white/[0.01]' : 'bg-white border-slate-200')
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="text-xs font-bold font-display">{faq.q}</span>
                    <span className="text-[#00C2FF] font-bold">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className={`p-5 pt-0 text-xs border-t border-white/5 leading-relaxed ${
                      darkMode ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            16. DEMO FORM (GHL + Webhook Captcha Protected Form)
           ========================================== */}
        <div id="demo_form" className="mb-24 scroll-mt-12">
          <div className="max-w-2xl mx-auto">
            <div className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden backdrop-blur-md ${
              darkMode ? 'bg-[#0E1524]/80 border-white/10 shadow-violet-950/20' : 'bg-white border-slate-200 shadow-2xl'
            }`}>
              <div className="absolute top-0 right-0 h-48 w-48 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
              
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold font-display">Live Demo Scheduled!</h3>
                  <p className={`text-xs max-w-sm mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    An expert automation architect has been alerted. We are pre-reviewing your GHL & HubSpot parameters and will schedule intake calls shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="text-center space-y-2 mb-6">
                    <span className="text-[9px] font-mono text-[#00C2FF] uppercase tracking-widest font-bold">SECURE BOOKING PANEL</span>
                    <h3 className="text-2xl font-bold font-display">Book A Live Demo</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                      Review our system capabilities tailored to your exact business parameters.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Alok Sharma"
                        value={demoForm.fullName}
                        onChange={(e) => setDemoForm({ ...demoForm, fullName: e.target.value })}
                        className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/25 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Company Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Fortis Mumbai"
                        value={demoForm.companyName}
                        onChange={(e) => setDemoForm({ ...demoForm, companyName: e.target.value })}
                        className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/25 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. alok@fortis.com"
                        value={demoForm.email}
                        onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/25 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={demoForm.phone}
                        onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                        className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/25 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Business Industry</label>
                      <select
                        value={demoForm.industry}
                        onChange={(e) => setDemoForm({ ...demoForm, industry: e.target.value })}
                        className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/25 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      >
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Retail & Ecommerce">Retail & Ecommerce</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Professional Services">Professional Services</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Monthly Lead Volume</label>
                      <select
                        value={demoForm.monthlyLeads}
                        onChange={(e) => setDemoForm({ ...demoForm, monthlyLeads: e.target.value })}
                        className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/25 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      >
                        <option value="Under 50">Under 50 leads</option>
                        <option value="50 - 200">50 - 200 leads</option>
                        <option value="200 - 1000">200 - 1,000 leads</option>
                        <option value="1000+">1,000+ leads</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Message / Main Automation Goal</label>
                    <textarea
                      placeholder="e.g. Want to sync Google Forms leads directly to GHL and fire automated WhatsApp scheduling templates..."
                      rows={3}
                      value={demoForm.message}
                      onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                        darkMode ? 'bg-black/25 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  {/* Math CAPTCHA Code Validation Block */}
                  <div className="p-4 rounded-xl bg-black/25 border border-white/5 space-y-3">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">ROBOT PROTECTION CAPTCHA</span>
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <div className="bg-zinc-800 text-white px-3 py-1.5 rounded font-mono font-bold tracking-widest border border-white/10">
                        {captchaNum1} + {captchaNum2} = ?
                      </div>
                      <input
                        type="number"
                        placeholder="Result"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        className={`p-2 w-20 text-xs rounded-lg border focus:outline-none ${
                          darkMode ? 'bg-[#0E1524] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                        disabled={captchaVerified}
                      />
                      <button
                        type="button"
                        onClick={handleCaptchaVerify}
                        disabled={captchaVerified}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                          captchaVerified 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-[#00C2FF] text-[#0B0721] hover:bg-[#00c3ffd5] font-bold'
                        }`}
                      >
                        {captchaVerified ? "✓ Verified" : "Verify Result"}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl uppercase shadow-lg transition-all"
                  >
                    Schedule Live GrowthOS™ Strategy Demo
                  </button>

                  <div className="text-center text-[9px] font-mono text-gray-500 space-y-1">
                    <div>GHL API Server Sync: <span className="text-emerald-400">Success Code 200</span></div>
                    <div>Automation Endpoint: <span className="text-[#00C2FF]">n8n active</span></div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            17. FINAL CTA
           ========================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-violet-900 via-indigo-905 to-slate-900 text-white text-center space-y-6 relative overflow-hidden border border-violet-500/20 shadow-2xl">
          <div className="absolute top-0 left-0 h-48 w-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 right-0 h-48 w-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

          <span className="text-[10px] font-mono text-violet-400 tracking-widest uppercase block font-bold">Deploy Your Operational Core</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
            Run Your Entire Business <br className="hidden sm:block" /> From One Unified Platform
          </h2>
          <p className="text-xs sm:text-sm max-w-xl mx-auto opacity-80 leading-relaxed">
            Configure GrowthOS™ pipelines, schedule bookings, integrate Meta Cloud APIs, and maximize lead conversion rate securely.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a 
              href="#demo_form" 
              className="px-6 py-2.5 bg-[#00C2FF] text-[#0B0721] hover:bg-[#00c3ffd5] text-xs font-bold uppercase rounded-xl shadow-lg transition-all"
            >
              Book Live Demo
            </a>
            <a 
              href="#pricing_calculator" 
              className="px-6 py-2.5 border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase rounded-xl transition-all"
            >
              Estimate Your ROI
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
