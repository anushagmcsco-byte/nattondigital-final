import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Cpu, 
  Database, 
  TrendingUp, 
  Zap, 
  Users, 
  Target, 
  Activity, 
  Play, 
  Sparkles, 
  Layers, 
  Plus, 
  RotateCcw,
  MessageCircle,
  Phone,
  Settings,
  ShieldCheck,
  Mail,
  Smartphone,
  Globe,
  DollarSign,
  Calendar,
  HelpCircle,
  Layout,
  Clock,
  Briefcase,
  FileText,
  BarChart2,
  Lock,
  Menu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { RoutePath } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function SolutionCrmAutomation({ setPath, darkMode, formSubmitted, setFormSubmitted, loading, setLoading }: any) {
  // 1. Hero States
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    document.title = "GrowthOS™ | CRM, Marketing Automation & AI-Powered Business Operating System";
  }, []);

  // 2. Business Flywheel States
  const [activeFlywheelStep, setActiveFlywheelStep] = useState(0);
  const flywheelSteps = [
    { title: 'Capture Leads', desc: 'Sinks contacts from programmatic pages, social ads, and webhooks straight into GrowthOS™ without database leakage.' },
    { title: 'Nurture Leads', desc: 'Instantly triggers custom email sequences and automated WhatsApp campaigns to keep interest high.' },
    { title: 'Book Appointments', desc: 'Allows leads to schedule meetings on a consolidated, Google-synced calendar with auto-reminders.' },
    { title: 'Close Deals', desc: 'Empowers your sales team with a drag-and-drop Kanban pipeline to track and close contracts easily.' },
    { title: 'Automate Follow-Ups', desc: 'Automatically dispatches missed-call text backs, feedback forms, and review management sequences.' },
    { title: 'Increase Revenue', desc: 'Compiles clean real-time insights, multi-channel performance scoring, and unified forecasting.' }
  ];

  // 3. Platform Overview (Bento Grid) Cards
  const bentoCards = [
    { title: 'Unified CRM', desc: 'Manage unlimited contacts, activities, and communication timelines in one secure portal.', icon: Users },
    { title: 'Sales Pipelines', desc: 'Custom drag-and-drop Kanban boards with automated deal value calculations.', icon: Target },
    { title: 'Funnels & Pages', desc: 'Build stunning high-performance landing pages and multi-step funnels with 1-click publishing.', icon: Layout },
    { title: 'Responsive Forms', desc: 'Smart intake forms and customizable surveys with instant data validation.', icon: FileText },
    { title: 'Calendars', desc: 'Team booking calendars with native Google Workspace and Zoom APIs.', icon: Calendar },
    { title: 'Email Marketing', desc: 'Schedule broadcasts, drip sequences, and track visual journey maps.', icon: Mail },
    { title: 'SMS Marketing', desc: 'Outbound and inbound text messages powered by local telecom triggers.', icon: Smartphone },
    { title: 'WhatsApp Automations', desc: 'Broadcast campaign lists, chatbots, and instant template delivery.', icon: MessageCircle },
    { title: 'Review System', desc: 'Generate and monitor Google Business listings reviews autonomously.', icon: ShieldCheck },
    { title: 'Workflows', desc: 'Node-based visual builder to automate any manual process or trigger.', icon: Zap },
    { title: 'Analytics', desc: 'Real-time performance indicators and revenue attribution reporting.', icon: BarChart2 },
    { title: 'AI Assistant', desc: 'Generates summaries, conversation intelligence, and smart reply suggestions.', icon: Sparkles }
  ];

  // 4. CRM Module Simulation States
  const [selectedContact, setSelectedContact] = useState(0);
  const contactsSim = [
    { name: 'Anusha G.', company: 'GMC Healthcare', score: 98, status: 'Hot Lead', email: 'anusha.gmc@gmail.com', logs: ['Form Submitted', 'WhatsApp Confirmed', 'Meeting Scheduled'] },
    { name: 'Dr. Vivek Sharma', company: 'Apex Dental', score: 92, status: 'Negotiating', email: 'vivek@apexdental.in', logs: ['Intro Call Done', 'Proposal Sent', 'Awaiting Sign'] },
    { name: 'Sarah Miller', company: 'Global Tech US', score: 85, status: 'Nurturing', email: 'sarah.m@globaltech.com', logs: ['Webinar Attended', 'Ebook Downloaded', 'SMS Dispatched'] }
  ];

  // 5. Kanban Pipeline States
  const [pipelineDeals, setPipelineDeals] = useState([
    { id: '1', name: 'Delhi Med Clinic', revenue: 4999, stage: 'Lead' },
    { id: '2', name: 'TechLabs Inc US', revenue: 19999, stage: 'Qualified' },
    { id: '3', name: 'UAE RealEstate Co', revenue: 24999, stage: 'SiteVisit' },
    { id: '4', name: 'Australia Retailers', revenue: 14999, stage: 'Qualified' }
  ]);
  const [pipelineWonTrigger, setPipelineWonTrigger] = useState(false);

  const movePipelineDeal = (id: string, nextStage: string) => {
    setPipelineDeals(prev => prev.map(deal => {
      if (deal.id === id) {
        if (nextStage === 'Won') {
          setPipelineWonTrigger(true);
          setTimeout(() => setPipelineWonTrigger(false), 2500);
        }
        return { ...deal, stage: nextStage };
      }
      return deal;
    }));
  };

  // 6. Interactive Calendar States
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const timeSlots = ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];

  // 7. Mini Page Builder States
  const [builderElements, setBuilderElements] = useState({
    header: true,
    hero: true,
    features: true,
    faq: false,
    cta: true
  });

  // 8. Interactive Email Journey States
  const [activeJourneyNode, setActiveJourneyNode] = useState('trigger');

  // 9. WhatsApp Simulator States
  const [whatsappStep, setWhatsappStep] = useState(0);
  const whatsappMessages = [
    { sender: 'bot', text: '👋 Hello Vivek! This is GrowthOS™ for Apex Dental. Your diagnostic session is confirmed for tomorrow at 2:00 PM. Reply YES to confirm, or RESCHEDULE to change.' },
    { sender: 'user', text: 'YES' },
    { sender: 'bot', text: '🎉 Awesome, you are confirmed! Here is your custom Google Meet Link: meet.google.com/xyz-123. A calendar invite is sent to your inbox!' }
  ];

  // 10. Node Workflow States
  const [selectedWorkflowNode, setSelectedWorkflowNode] = useState('call_back');
  const workflowNodes = {
    form_submit: { title: 'Form Submitted', desc: 'Triggers immediately when a user hits submit on any of your connected landing page forms.' },
    call_back: { title: 'Missed Call Text Back', desc: 'If a representative misses a call, GrowthOS™ instantly fires a personalized text back, preserving the lead.' },
    assign_staff: { title: 'Round-Robin Assignment', desc: 'Equally distributes incoming leads to your sales reps based on active schedules and availability.' },
    notify_n8n: { title: 'Trigger Webhook', desc: 'Forwards verified contacts and payment records to custom n8n.io clusters and GoHighLevel.' }
  };

  // 11. AI Assistant Chat Simulator
  const [aiPrompts, setAiPrompts] = useState([
    { label: 'Summarize Anusha G.', reply: '🤖 [AI Assistant]: Lead Summary for Anusha G.\n\n• Score: 98% (High Intent)\n• Industry: Healthcare / Med-Tech\n• Interest: CRM Integrations, WhatsApp Broadcast, n8n webhook nodes\n• Recommended Next Action: Dispatch pricing sheet for the Growth Plan.' },
    { label: 'Draft WhatsApp Reply', reply: '🤖 [AI Assistant]: Drafted WhatsApp Response:\n\n"Hi Anusha! Hope you are having a productive day. I noticed you checked out our GoHighLevel migration checklist. Would you like to schedule a 15-minute diagnostic session tomorrow?"' },
    { label: 'Analyze Conversational Tone', reply: '🤖 [AI Assistant]: Sentiment Analysis: POSITIVE\n\nContact is highly responsive, confirms booking immediately without objections, showing rapid purchase intent.' }
  ]);
  const [aiReply, setAiReply] = useState('Select an AI prompt action below to stream responses using server-side Gemini intelligence.');
  const [aiTyping, setAiTyping] = useState(false);

  const handleAiTrigger = (text: string) => {
    setAiTyping(true);
    setAiReply('');
    let i = 0;
    const interval = setInterval(() => {
      setAiReply(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setAiTyping(false);
      }
    }, 10);
  };

  // 12. Analytics Chart State
  const [analyticsMetric, setAnalyticsMetric] = useState<'revenue' | 'conversion' | 'pipeline'>('revenue');

  // 15. Pricing Plan States
  const [pricingInterval, setPricingInterval] = useState<'monthly' | 'annual'>('monthly');
  const pricingPlans = [
    { 
      name: 'Starter', 
      monthly: 4999, 
      annual: 3999, 
      features: ['Full CRM Access', 'Drag & Drop Pipelines', 'Lead Capture Forms', 'Appointment Calendars', 'Single Webhook Integration'] 
    },
    { 
      name: 'Growth', 
      monthly: 9999, 
      annual: 7999, 
      popular: true, 
      features: ['Everything in Starter', 'Multi-channel Automation Flow', 'Direct WhatsApp Business API', 'Email & SMS Campaigns', 'n8n Workflow Nodes'] 
    },
    { 
      name: 'Scale', 
      monthly: 19999, 
      annual: 15999, 
      features: ['Everything in Growth', 'Advanced Node-based Workflows', 'Unlimited Team Accounts', 'Enterprise Analytics Reports', 'Dedicated Support Representative'] 
    }
  ];

  // 17. FAQ Accordion States
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const faqList = [
    { q: 'What is GrowthOS™ and how is it different from standard CRM tools?', a: 'GrowthOS™ is an all-in-one business operating system built for MSMEs and SMBs. Unlike simple databases, it unifies leads, drag-and-drop pipeline managers, landing page funnels, WhatsApp, SMS, and custom server-side automations into a single high-performance dashboard.' },
    { q: 'Can I migrate my existing contacts and active deals from HubSpot or Salesforce?', a: 'Yes! GrowthOS™ supports seamless 1-click migration. Simply upload your contact CSV, or use our preloaded Zapier/n8n connector to sync pipelines without losing history.' },
    { q: 'How does the WhatsApp Business API integration work in India and other countries?', a: 'We utilize Meta’s Cloud APIs directly. This lets you broadcast campaigns, dispatch reminder templates, and host custom chatbots safely without risking account blocks.' },
    { q: 'What are n8n.io webhooks and how are they managed?', a: 'n8n is a visual workflow engine. GrowthOS™ offers preloaded webhooks, forwarding form completions and pipeline status changes directly to your active n8n clusters in milliseconds.' },
    { q: 'Does GrowthOS™ support custom SMS pipelines?', a: 'Yes. It features integrated outbound SMS gateways, supporting transactional text-back alerts, appointment confirmations, and reviews.' },
    { q: 'Can I host custom landing pages and sales funnels directly on GrowthOS™?', a: 'Absolutely! Our premium page builder serves blazing-fast landing pages with optimized asset rendering, securing 95+ PageSpeed scores.' },
    { q: 'Is the AI Assistant built on OpenAI or Gemini models?', a: 'The AI features on GrowthOS™ are powered by Gemini-1.5-Pro, delivering rapid conversation summaries, chat intelligence, and automatic email generation.' },
    { q: 'How does the "Missed Call Text Back" automation work?', a: 'When a call goes unanswered, GrowthOS™ detects the status and fires an immediate SMS or WhatsApp reply: "Sorry we missed you! How can we help today?"' },
    { q: 'Is there any contract or can I cancel my subscription anytime?', a: 'No contracts. We offer simple monthly or annual pay-as-you-go tiers, and you can change or cancel your subscription right from the dashboard.' },
    { q: 'Can I connect multiple Google and Zoom calendars for my sales team?', a: 'Yes, GrowthOS™ supports calendar syncing across your whole sales staff, assigning incoming leads in round-robin fashion.' },
    { q: 'How are emails delivered and what are the daily sending limits?', a: 'Emails are handled via authenticated SMTP with DKIM, SPF, and DMARC alignment, ensuring 99% inbox deliverability rates.' },
    { q: 'Is GrowthOS™ compliant with personal data regulations and HIPAA standards?', a: 'Yes. GrowthOS™ provides AES-256 schema encryption, audit logging, and secure credential handling, aligning with standard compliance guidelines.' }
  ];

  // 18. Demo Form States
  const [demoFormData, setDemoFormData] = useState({
    name: '', companyName: '', email: '', phone: '', country: 'India',
    industry: 'Healthcare', currentCrm: 'None', monthlyLeads: 'Less than 100',
    teamSize: '1-5', message: ''
  });
  const [demoSubmittedLogs, setDemoSubmittedLogs] = useState<string[]>([]);

  const handleDemoFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDemoSubmittedLogs([
      '⚡ [Webhook Node] Form trigger initiated...',
      '📡 [n8n Router] Forwarding contact records to GrowthOS™ core...',
      '🛠️ [GoHighLevel API] Contact created: ' + demoFormData.name,
      '📱 [WhatsApp API] Dispatched confirmation message...',
      '👥 [Team Sync] Lead assigned to representative round-robin...'
    ]);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1500);
  };

  return (
    <div className="py-12 animate-fade-in font-sans text-left bg-[#110B33] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 text-xs font-mono text-gray-400">
          <button onClick={() => setPath('home')} className="hover:text-primary transition-colors">Home</button> / <span className="text-[#47C7BF]">Solutions</span> / <span>CRM & AI Automation</span>
        </div>

        {/* ==========================================
            1. HERO SECTION
           ========================================== */}
        <div className="relative rounded-3xl overflow-hidden mb-20 bg-gradient-to-br from-[#110B33] via-[#1a144b] to-[#110B33] border border-white/[0.08] p-8 sm:p-12">
          {/* Neon mesh grids */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(71,199,191,0.12),transparent_40%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,156,174,0.12),transparent_40%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase px-3 py-1 rounded-full bg-white/[0.04] inline-block border border-white/[0.08]">
                GrowthOS™ Business Operating System
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight leading-tight">
                GrowthOS™ - Your AI Powered <br />
                <span className="bg-gradient-to-r from-[#2E9CAE] via-[#47C7BF] to-[#99D57C] bg-clip-text text-transparent">
                  Business Operating System
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl">
                Capture leads, automate follow-ups, manage pipelines and grow revenue from one powerful platform. Comparable to GoHighLevel, HubSpot, and Salesforce, custom-tailored for growing MSMEs and SMBs.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#demo-form-section"
                  className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#2E9CAE] to-[#47C7BF] text-white text-xs font-semibold hover:opacity-95 transition-all shadow-lg shadow-[#2E9CAE]/20"
                >
                  Book Live Demo
                </a>
                <button
                  onClick={() => setShowTour(true)}
                  className="px-5 py-3 rounded-lg border border-white/10 hover:bg-white/[0.04] text-white text-xs font-semibold flex items-center gap-2 transition-all"
                >
                  <Play className="h-3 w-3 fill-current text-[#47C7BF]" /> Watch Product Tour
                </button>
              </div>
            </div>

            {/* 3D Floating CRM Dashboard Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="p-5 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-gray-500 bg-white/[0.02]">
                  System: Live
                </div>
                
                {/* Visual Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.08]">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase text-gray-400">Holographic CRM Core</span>
                </div>

                {/* Dashboard Stats simulation */}
                <div className="space-y-3.5 text-xs font-mono">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="text-[9px] text-gray-400 block uppercase">Conversion Rate</span>
                      <span className="text-base font-bold text-[#47C7BF]">24.8%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="text-[9px] text-gray-400 block uppercase">Active Leads</span>
                      <span className="text-base font-bold text-[#99D57C]">1,482</span>
                    </div>
                  </div>

                  {/* Flow tracker animation mock */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                    <span className="text-[9px] text-gray-400 block uppercase">Automation Logs</span>
                    <div className="space-y-1.5 text-[10px]">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <span className="text-[#47C7BF]">✓</span>
                        <span>Form submission → assigned staff</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <span className="text-[#47C7BF]">✓</span>
                        <span>WhatsApp booking trigger sent</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-300 animate-pulse">
                        <span className="text-[#99D57C]">⚡</span>
                        <span>n8n pipeline sync running...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. BUSINESS FLYWHEEL SECTION
           ========================================== */}
        <div className="mb-20 text-center">
          <div className="max-w-3xl mx-auto mb-10">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block mb-2">Revenue Lifecycle Flow</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">From Lead To Revenue</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Continuous interactive circular flow showing how GrowthOS™ structures your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-5 space-y-3">
              {flywheelSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFlywheelStep(idx)}
                  className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-4 ${
                    activeFlywheelStep === idx
                      ? 'border-[#2E9CAE] bg-white/[0.04] shadow-md shadow-[#2E9CAE]/10'
                      : 'border-white/[0.05] bg-white/[0.01] hover:border-white/20'
                  }`}
                >
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeFlywheelStep === idx ? 'bg-[#2E9CAE] text-white' : 'bg-white/[0.05] text-gray-400'
                  }`}>
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">{step.title}</h4>
                    {activeFlywheelStep === idx && (
                      <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">{step.desc}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Circular Animation Graphic */}
            <div className="md:col-span-7 flex justify-center relative py-10">
              <div className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-full border border-dashed border-white/10 flex items-center justify-center">
                {/* Central logo node */}
                <div className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-[#110B33] to-[#2E9CAE] border border-[#47C7BF] flex items-center justify-center shadow-xl shadow-[#2E9CAE]/25">
                  <span className="font-display font-bold text-xs text-white uppercase tracking-wider">OS</span>
                </div>

                {/* Spinning orbiting nodes */}
                {flywheelSteps.map((step, idx) => {
                  const total = flywheelSteps.length;
                  const angle = (idx * 360) / total;
                  const radius = 120; // radius of orbit
                  const x = radius * Math.cos((angle * Math.PI) / 180);
                  const y = radius * Math.sin((angle * Math.PI) / 180);

                  const isSelected = activeFlywheelStep === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveFlywheelStep(idx)}
                      className={`absolute h-10 w-10 sm:h-12 sm:w-12 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-gradient-to-br from-[#2E9CAE] to-[#47C7BF] border-white text-white scale-110 shadow-lg shadow-[#47C7BF]/30' 
                          : 'bg-black/80 border-white/[0.08] text-gray-400 hover:border-white/40'
                      }`}
                      style={{
                        transform: `translate(${x}px, ${y}px)`
                      }}
                    >
                      <span className="text-[10px] font-mono">0{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            3. PLATFORM OVERVIEW (BENTO GRID) SECTION
           ========================================== */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block mb-2">Modular Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">Everything You Need In One Platform</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Discard complex, disconnected software subscriptions. GrowthOS™ unifies your business operations under a single subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bentoCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] hover:border-white/20 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2E9CAE]/20 to-[#47C7BF]/20 flex items-center justify-center group-hover:scale-105 transition-transform border border-white/[0.05]">
                      <IconComp className="h-4 w-4 text-[#47C7BF]" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                      {card.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-4 text-left">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block group-hover:text-[#47C7BF] transition-colors">
                      Module 0{idx + 1} →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            4. CRM MODULE SECTION
           ========================================== */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block">Module 01</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">Powerful CRM</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Maintain pristine records of all customer activities, automated lead scoring, tag assignments, and full messaging history in one centralized system.
            </p>
            <ul className="space-y-3.5 text-xs text-gray-300 font-mono">
              {['Contact Management', 'Lead Tracking', 'Opportunity Pipeline', 'Tasks', 'Team Collaboration'].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#47C7BF]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live CRM Interaction Simulation */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono uppercase text-gray-400">Live CRM Database View</span>
                </div>
                <span className="text-[9px] font-mono text-gray-500">Query Speed: 2ms</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Left Contact List */}
                <div className="md:col-span-5 space-y-2">
                  {contactsSim.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedContact(i)}
                      className={`w-full p-2.5 rounded-lg text-left border text-xs transition-all flex flex-col justify-between ${
                        selectedContact === i 
                          ? 'border-[#2E9CAE] bg-white/[0.05]' 
                          : 'border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="font-bold">{c.name}</span>
                      <div className="flex justify-between items-center w-full mt-1.5 text-[9px] font-mono text-gray-400">
                        <span>Score: {c.score}</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#47C7BF]/10 text-[#47C7BF]">{c.status}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right Details Panel */}
                <div className="md:col-span-7 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] space-y-3 text-xs">
                  <div>
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase">Selected Profile</h4>
                    <p className="font-bold text-sm text-white mt-0.5">{contactsSim[selectedContact].name}</p>
                    <p className="text-[10px] font-mono text-gray-400">{contactsSim[selectedContact].company}</p>
                    <p className="text-[10px] font-mono text-gray-400">{contactsSim[selectedContact].email}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/[0.05]">
                    <h5 className="text-[9px] font-mono text-gray-400 uppercase">Timeline History</h5>
                    <div className="space-y-1.5 text-[10px] font-mono">
                      {contactsSim[selectedContact].logs.map((log, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300">
                          <span className="text-[#47C7BF]">✓</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            5. PIPELINE MODULE SECTION
           ========================================== */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Kanban Animation Visual */}
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Kanban Opportunity Stages</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">Click actions to transfer deal stages in real-time:</p>
                </div>
                {pipelineWonTrigger && (
                  <span className="text-[10px] font-mono font-bold text-[#99D57C] animate-pulse">
                    🎉 Deal Closed! n8n Webhook Fired!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Stage: Lead */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">1. Leads Captured</span>
                  <div className="space-y-2">
                    {pipelineDeals.filter(d => d.stage === 'Lead').map(deal => (
                      <div key={deal.id} className="p-3 rounded-lg border border-white/[0.06] bg-black/50 shadow-sm text-xs">
                        <p className="font-bold">{deal.name}</p>
                        <p className="text-[10px] font-mono text-[#47C7BF] mt-1">₹{deal.revenue.toLocaleString()}</p>
                        <button
                          onClick={() => movePipelineDeal(deal.id, 'Qualified')}
                          className="w-full mt-2 py-1 bg-white/[0.05] hover:bg-white/[0.1] rounded text-[9px] font-mono uppercase text-gray-300 transition-colors"
                        >
                          Qualify Deal →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage: Qualified */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                  <span className="text-[10px] font-mono text-[#2E9CAE] uppercase tracking-wider block font-bold">2. Qualified</span>
                  <div className="space-y-2">
                    {pipelineDeals.filter(d => d.stage === 'Qualified').map(deal => (
                      <div key={deal.id} className="p-3 rounded-lg border border-white/[0.06] bg-black/50 shadow-sm text-xs">
                        <p className="font-bold">{deal.name}</p>
                        <p className="text-[10px] font-mono text-[#47C7BF] mt-1">₹{deal.revenue.toLocaleString()}</p>
                        <div className="flex gap-1.5 mt-2">
                          <button
                            onClick={() => movePipelineDeal(deal.id, 'Lead')}
                            className="w-1/2 py-1 bg-white/[0.03] hover:bg-white/[0.05] rounded text-[8px] text-gray-400 transition-colors"
                          >
                            ← Back
                          </button>
                          <button
                            onClick={() => movePipelineDeal(deal.id, 'SiteVisit')}
                            className="w-1/2 py-1 bg-[#2E9CAE]/20 hover:bg-[#2E9CAE]/30 text-[#47C7BF] rounded text-[8px] font-bold transition-colors"
                          >
                            Schedule Tour →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage: SiteVisit / Closed Won */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                  <span className="text-[10px] font-mono text-[#99D57C] uppercase tracking-wider block font-bold">3. Site Visit / Won</span>
                  <div className="space-y-2">
                    {pipelineDeals.filter(d => d.stage === 'SiteVisit').map(deal => (
                      <div key={deal.id} className="p-3 rounded-lg border border-white/[0.06] bg-black/50 shadow-sm text-xs">
                        <p className="font-bold">{deal.name}</p>
                        <p className="text-[10px] font-mono text-[#47C7BF] mt-1">₹{deal.revenue.toLocaleString()}</p>
                        <div className="flex gap-1.5 mt-2">
                          <button
                            onClick={() => movePipelineDeal(deal.id, 'Qualified')}
                            className="w-1/2 py-1 bg-white/[0.03] hover:bg-white/[0.05] rounded text-[8px] text-gray-400 transition-colors"
                          >
                            ← Back
                          </button>
                          <button
                            onClick={() => movePipelineDeal(deal.id, 'Won')}
                            className="w-1/2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded text-[8px] font-bold transition-colors"
                          >
                            Mark Won!
                          </button>
                        </div>
                      </div>
                    ))}
                    {pipelineDeals.filter(d => d.stage === 'Won').map(deal => (
                      <div key={deal.id} className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 shadow-sm text-xs">
                        <p className="font-bold text-emerald-400">{deal.name}</p>
                        <p className="text-[10px] font-mono text-emerald-400 mt-1">₹{deal.revenue.toLocaleString()}</p>
                        <button
                          onClick={() => movePipelineDeal(deal.id, 'Lead')}
                          className="w-full mt-2 py-1 bg-white/[0.03] hover:bg-white/[0.05] rounded text-[8px] text-gray-400 transition-colors"
                        >
                          Reset Pipeline
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block">Module 02</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">Pipeline Management</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Track business conversations across visual deal boards. Instantly forecast revenues, assign weights, and trigger automation sequences during stage changes.
            </p>
            <ul className="space-y-3.5 text-xs text-gray-300 font-mono">
              {['Drag and Drop Pipelines', 'Deal Stages', 'Lead Status Tracking', 'Real-time Sales Forecasting'].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#47C7BF]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ==========================================
            6. CALENDAR BOOKING SECTION
           ========================================== */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block">Module 03</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">Appointment Scheduling</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Sync company calendars to allocate sales consultations effortlessly. Send instant confirmations and preloaded reminders via Google and WhatsApp.
            </p>
            <ul className="space-y-3.5 text-xs text-gray-300 font-mono">
              {['Interactive Calendar Booking', 'Google Calendar Sync', 'Zoom Integration', 'Automatic Reminders'].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#47C7BF]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Calendar Booking Simulator */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md shadow-xl text-xs">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.08]">
                <span className="font-bold text-gray-300 uppercase tracking-wider font-mono text-[10px]">Interactive Schedulers</span>
                <span className="text-[10px] font-mono text-emerald-400">Google Meet Integrated</span>
              </div>

              {bookingConfirmed ? (
                <div className="text-center py-10 space-y-3 bg-[#47C7BF]/5 rounded-xl border border-[#47C7BF]/20 animate-fade-in">
                  <span className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg mx-auto">✓</span>
                  <h4 className="font-bold text-sm">Meeting Confirmed!</h4>
                  <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
                    A Google Calendar invite with unique Zoom links has been synced! WhatsApp confirmation sent.
                  </p>
                  <button
                    onClick={() => {
                      setBookingConfirmed(false);
                      setSelectedDate(null);
                      setSelectedSlot(null);
                    }}
                    className="mt-2 text-[10px] text-primary underline"
                  >
                    Schedule Another
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Select Day */}
                  <div>
                    <h5 className="text-[10px] font-mono uppercase text-gray-400 mb-2">Select Booking Date</h5>
                    <div className="grid grid-cols-4 gap-2">
                      {[27, 28, 29, 30].map((day) => (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          className={`p-2 rounded-lg text-center font-mono transition-all ${
                            selectedDate === day 
                              ? 'bg-[#2E9CAE] text-white border border-white' 
                              : 'bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05]'
                          }`}
                        >
                          <span className="block text-gray-400 text-[9px] uppercase">June</span>
                          <span className="block font-bold text-sm">{day}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Slot */}
                  {selectedDate && (
                    <div className="animate-slide-down">
                      <h5 className="text-[10px] font-mono uppercase text-gray-400 mb-2">Select Available Slot</h5>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-2 rounded-lg text-center font-mono text-[10px] transition-all ${
                              selectedSlot === slot 
                                ? 'bg-[#47C7BF] text-black font-bold' 
                                : 'bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05]'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedSlot && (
                    <button
                      onClick={() => setBookingConfirmed(true)}
                      className="w-full py-2.5 bg-gradient-to-r from-[#2E9CAE] to-[#47C7BF] rounded text-white font-bold transition-all text-xs"
                    >
                      Confirm Booking for June {selectedDate} at {selectedSlot}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            7. LANDING PAGES SECTION
           ========================================== */}
          <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Page Builder Visual mockup */}
            <div className="lg:col-span-7 order-last lg:order-first">
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md shadow-xl text-xs">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-300 font-mono text-[10px] uppercase">Mini funnel builder editor</span>
                  <span className="text-[9px] font-mono text-[#47C7BF]">Deploy Status: Edge Published</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left Controls */}
                  <div className="md:col-span-4 p-3 rounded bg-white/[0.02] border border-white/[0.05] space-y-3">
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Components</span>
                    {Object.keys(builderElements).map((el) => (
                      <label key={el} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(builderElements as any)[el]}
                          onChange={(e) => setBuilderElements(prev => ({ ...prev, [el]: e.target.checked }))}
                          className="rounded border-white/20 text-[#47C7BF] bg-black/40"
                        />
                        <span className="font-mono text-[10px] capitalize">{el}</span>
                      </label>
                    ))}
                  </div>

                  {/* Right Live Preview */}
                  <div className="md:col-span-8 p-3 rounded-lg bg-black border border-white/[0.08] min-h-[160px] flex flex-col justify-between font-mono text-[9px] space-y-1.5 overflow-hidden relative">
                    <div className="absolute top-0 left-0 p-1 bg-[#47C7BF]/20 text-[#47C7BF] font-mono text-[8px] rounded-br">
                      Live Preview
                    </div>

                    {builderElements.header && (
                      <div className="p-1 border border-[#2E9CAE]/20 bg-[#2E9CAE]/5 text-center rounded">
                        [Header / Logo / Contact]
                      </div>
                    )}
                    {builderElements.hero && (
                      <div className="p-2 border border-[#47C7BF]/20 bg-[#47C7BF]/5 text-center rounded space-y-1">
                        <p className="font-bold">Welcome to Apex Dental</p>
                        <p className="text-gray-400 text-[8px]">Transform your smile with India's leaders.</p>
                      </div>
                    )}
                    {builderElements.features && (
                      <div className="p-1.5 border border-white/[0.05] bg-white/[0.01] text-center rounded text-gray-400">
                        • Certified Specialists • Clean Audited Rooms
                      </div>
                    )}
                    {builderElements.faq && (
                      <div className="p-1.5 border border-[#99D57C]/20 bg-[#99D57C]/5 text-center rounded">
                        [Frequently Asked Questions Accordion]
                      </div>
                    )}
                    {builderElements.cta && (
                      <div className="p-1 border border-emerald-500/20 bg-emerald-500/5 text-center text-emerald-400 rounded font-bold">
                        [Submit Form / Claim 30% Offer]
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block">Module 04</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display">Landing Pages & Forms</h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Build premium fast-loading landing pages and conversion tunnels using preloaded layouts. Integrate contact sheets directly into CRM databases.
              </p>
              <ul className="space-y-3.5 text-xs text-gray-300 font-mono">
                {['Drag & Drop Page Layouts', 'Conversion Funnels', 'Intake Lead Forms', 'Surveys & Feedback Loops'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#47C7BF]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        {/* ==========================================
            8. EMAIL MARKETING SECTION
           ========================================== */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block">Module 05</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">Email Marketing Automation</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Dispatch email campaigns and monitor client interactions. Build automated multi-day follow-up tracks to boost target conversions.
            </p>
            <ul className="space-y-3.5 text-xs text-gray-300 font-mono">
              {['Drip Marketing Campaigns', 'Automation Sequences', 'Broadcast Email Dispatch', 'Rich Visual Email Templates'].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#47C7BF]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Email Journey flowchart visual */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md shadow-xl text-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-300 font-mono text-[10px] uppercase">Drip Marketing Journey Map</span>
                <span className="text-[9px] font-mono text-emerald-400">98% Inbox Delivery</span>
              </div>

              <div className="space-y-3">
                {/* Node 1 */}
                <button
                  onClick={() => setActiveJourneyNode('trigger')}
                  className={`w-full p-2.5 rounded border text-left font-mono text-[10px] transition-all ${
                    activeJourneyNode === 'trigger' ? 'bg-[#2E9CAE]/20 border-[#2E9CAE]' : 'bg-white/[0.01] border-white/[0.05]'
                  }`}
                >
                  <p className="font-bold text-[#47C7BF]">🚀 TRIGGER: Form Submitted</p>
                  <p className="text-gray-400 text-[9px] mt-0.5">Captures lead details and creates profile logs.</p>
                </button>

                {/* Node 2 */}
                <div className="h-4 w-px bg-white/20 mx-auto" />

                <button
                  onClick={() => setActiveJourneyNode('action')}
                  className={`w-full p-2.5 rounded border text-left font-mono text-[10px] transition-all ${
                    activeJourneyNode === 'action' ? 'bg-[#47C7BF]/20 border-[#47C7BF]' : 'bg-white/[0.01] border-white/[0.05]'
                  }`}
                >
                  <p className="font-bold text-white">✉️ ACTION: Send Welcome Email</p>
                  <p className="text-gray-400 text-[9px] mt-0.5">Dispatches personalized brand templates. Avg open rate: 42%.</p>
                </button>

                {/* Node 3 */}
                <div className="h-4 w-px bg-white/20 mx-auto" />

                <button
                  onClick={() => setActiveJourneyNode('condition')}
                  className={`w-full p-2.5 rounded border text-left font-mono text-[10px] transition-all ${
                    activeJourneyNode === 'condition' ? 'bg-[#99D57C]/20 border-[#99D57C]' : 'bg-white/[0.01] border-white/[0.05]'
                  }`}
                >
                  <p className="font-bold text-[#99D57C]">⚖️ CONDITION: Opened Welcome Email?</p>
                  <p className="text-gray-400 text-[9px] mt-0.5">IF YES → Tag lead "Hot" & notify rep. IF NO → Resend text follow-up.</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            9. WHATSAPP AUTOMATION SECTION
           ========================================== */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive WhatsApp Chat Simulator */}
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c141c] shadow-2xl relative max-w-sm mx-auto">
              {/* Header screen */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="font-bold font-mono">GrowthOS™ Bot</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Verified API</span>
              </div>

              {/* Chat timeline */}
              <div className="space-y-3 min-h-[180px] text-[10px] font-mono">
                {whatsappMessages.slice(0, whatsappStep + 1).map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2.5 rounded-lg max-w-[85%] ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-white/[0.04] text-gray-200 border border-white/[0.05]'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input trigger mock */}
              {whatsappStep < whatsappMessages.length - 1 && (
                <button
                  onClick={() => setWhatsappStep(prev => prev + 1)}
                  className="w-full mt-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded text-black font-bold font-mono text-[10px] transition-colors"
                >
                  Simulate Reply YES
                </button>
              )}
              {whatsappStep === whatsappMessages.length - 1 && (
                <button
                  onClick={() => setWhatsappStep(0)}
                  className="w-full mt-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] rounded text-white font-mono text-[10px] transition-colors"
                >
                  Restart Conversation
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block">Module 06</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">WhatsApp Automation</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Connect Meta Cloud APIs to dispatch broadcast campaigns, follow-up notifications, and configure advanced smart chatbots directly inside your client timeline.
            </p>
            <ul className="space-y-3.5 text-xs text-gray-300 font-mono">
              {['Broadcast Campaign Lists', 'Smart AI WhatsApp Chatbots', 'Pre-approved Utility Templates', 'Appointment confirmations & Follow-ups'].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#47C7BF]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ==========================================
            10. WORKFLOW AUTOMATION SECTION
           ========================================== */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block">Module 07</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">Workflow Automation</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Design multi-node triggers to automate repetitive actions. Save thousands of business hours while ensuring zero database leaks.
            </p>
            <ul className="space-y-3.5 text-xs text-gray-300 font-mono">
              {['Lead Round-Robin Assignments', 'Email sequences & Drips', 'Missed Call Text Back alerts', 'Pipeline status triggers'].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#47C7BF]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive node workflow flowchart builder */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md shadow-xl text-xs">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.08]">
                <span className="font-bold text-gray-300 font-mono text-[10px] uppercase">Node Trigger Visualizer</span>
                <span className="text-[9px] font-mono text-[#47C7BF]">Active Cluster</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.keys(workflowNodes).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedWorkflowNode(key)}
                    className={`p-3 rounded text-left border font-mono transition-all ${
                      selectedWorkflowNode === key 
                        ? 'border-[#2E9CAE] bg-[#2E9CAE]/5' 
                        : 'border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="block font-bold text-[#47C7BF]">{(workflowNodes as any)[key].title}</span>
                  </button>
                ))}
              </div>

              {/* Selected Node Details */}
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.05] font-mono text-[10px] text-gray-300 leading-relaxed">
                <span className="text-[#99D57C] font-bold uppercase block mb-1">Node Specification:</span>
                {(workflowNodes as any)[selectedWorkflowNode].desc}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            11. AI ASSISTANT SECTION
           ========================================== */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive AI Chat screen mockup */}
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md shadow-xl text-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-bold font-mono text-[10px] uppercase">Gemini-1.5-Pro Timeline Triage</span>
                </div>
                <span className="text-[9px] font-mono text-gray-500">Workspace Connected</span>
              </div>

              <pre className="p-4 rounded bg-black text-emerald-400 font-mono text-[10px] h-[140px] overflow-y-auto whitespace-pre-wrap leading-relaxed border border-white/[0.05]">
                {aiReply}
              </pre>

              {/* Selection suggestions */}
              <div className="flex flex-wrap gap-2 mt-4">
                {aiPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAiTrigger(p.reply)}
                    disabled={aiTyping}
                    className="p-1.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded text-[9px] font-mono transition-all"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block">Module 08</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">AI Assistant</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Enable advanced automated triage inside contact profiles. Automatically draft replies, index summaries, and forecast deal closures using Gemini integration.
            </p>
            <ul className="space-y-3.5 text-xs text-gray-300 font-mono">
              {['Smart Lead Summaries', 'Outbound conversation intelligence', 'AI Reply generation suggestions', 'Autonomous scheduling triggers'].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#47C7BF]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ==========================================
            12. ANALYTICS DASHBOARD SECTION
           ========================================== */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block mb-2">Diagnostic Timeline</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">Analytics Dashboard</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Comprehensive revenue mapping pipelines and lead indicators refreshed in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left selector menu */}
            <div className="lg:col-span-4 space-y-2.5">
              {[
                { key: 'revenue', title: 'Revenue Growth', desc: 'Interactive tracking of daily conversion rates & client payouts.' },
                { key: 'conversion', title: 'Conversion Rate', desc: 'Assess funnel opt-in weights and book visit milestones.' },
                { key: 'pipeline', title: 'Pipeline Opportunity Value', desc: 'Averages total values locked inside your opportunity matrix.' }
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setAnalyticsMetric(m.key as any)}
                  className={`w-full p-4 rounded-xl text-left border transition-all ${
                    analyticsMetric === m.key 
                      ? 'border-[#2E9CAE] bg-white/[0.04] shadow' 
                      : 'border-white/[0.05] bg-white/[0.01] hover:border-white/20'
                  }`}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider">{m.title}</h4>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{m.desc}</p>
                </button>
              ))}
            </div>

            {/* Custom Interactive SVG charts representing each KPI */}
            <div className="lg:col-span-8 p-5 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md shadow-xl text-xs font-mono">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] uppercase text-gray-400">GrowthOS Analytics Stream</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Live Syncing</span>
              </div>

              {analyticsMetric === 'revenue' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Month</span>
                    <span>Monthly Revenue (INR)</span>
                  </div>
                  {/* Interactive simulated bar chart with styling */}
                  <div className="space-y-3">
                    {[
                      { m: 'Mar', val: '₹1.8L', width: 'w-[40%]' },
                      { m: 'Apr', val: '₹2.4L', width: 'w-[55%]' },
                      { m: 'May', val: '₹3.8L', width: 'w-[75%]' },
                      { m: 'Jun', val: '₹4.9L', width: 'w-[98%]', active: true }
                    ].map((row, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-8 text-[10px] text-gray-400">{row.m}</span>
                        <div className="h-6 bg-white/[0.02] rounded-md flex-1 overflow-hidden border border-white/[0.05] relative flex items-center">
                          <div className={`h-full bg-gradient-to-r ${row.active ? 'from-[#2E9CAE] to-[#47C7BF]' : 'from-white/[0.05] to-white/[0.15]'} ${row.width}`} />
                          <span className="absolute left-3 text-[9px] font-bold text-white">{row.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analyticsMetric === 'conversion' && (
                <div className="space-y-4 animate-fade-in text-center py-6">
                  {/* Gauge representation */}
                  <div className="inline-block relative">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                      <circle cx="50" cy="50" r="40" stroke="#47C7BF" strokeWidth="8" fill="transparent" 
                        strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" transform="rotate(-90 50 50)" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold font-display text-white">74.8%</span>
                      <span className="text-[8px] text-gray-400 uppercase">Opt-in rate</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 max-w-sm mx-auto leading-relaxed">
                    GrowthOS™ landing pages and webhook response timelines optimize B2B and B2C conversions, keeping lead loss under 1.2%.
                  </p>
                </div>
              )}

              {analyticsMetric === 'pipeline' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
                      <span className="text-[9px] text-gray-400 block uppercase">Weighted Value</span>
                      <span className="text-lg font-bold text-[#47C7BF]">₹18,50,000</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
                      <span className="text-[9px] text-gray-400 block uppercase">Win Probability</span>
                      <span className="text-lg font-bold text-[#99D57C]">84.2%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            13. WORKFLOW INFOGRAPHIC SECTION
           ========================================== */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold font-display mb-10 text-center">How GrowthOS™ Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { id: '1', name: 'Lead Capture', desc: 'Programmatic pull & campaigns' },
              { id: '2', name: 'CRM', desc: 'Secure database profile logs' },
              { id: '3', name: 'Automation', desc: 'Trigger webhook responses' },
              { id: '4', name: 'Communication', desc: 'Multi-channel WhatsApp/SMS' },
              { id: '5', name: 'Appointments', desc: 'Google synced bookings' },
              { id: '6', name: 'Sales', desc: 'Kanban drag OPPORTUNITIES' },
              { id: '7', name: 'Revenue', desc: 'Attrib tracking dashboard' }
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex-1 text-center min-w-[120px] w-full relative">
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-6 w-6 rounded-full bg-[#110B33] border border-[#47C7BF] text-[10px] font-bold flex items-center justify-center font-mono">
                    {step.id}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-2 mb-1 uppercase tracking-wider">{step.name}</h4>
                  <p className="text-[9px] text-gray-400 leading-tight">{step.desc}</p>
                </div>
                {idx < 6 && (
                  <div className="hidden md:block text-gray-600 font-mono text-xs">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ==========================================
            14. INTEGRATIONS SECTION
           ========================================== */}
        <div className="mb-20 overflow-hidden relative py-6">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#110B33] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#110B33] to-transparent z-10" />
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block mb-1">Unified System Sync</span>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Preloaded Integrations</h4>
          </div>

          {/* Infinite marquee block simulation */}
          <div className="flex gap-4 items-center animate-marquee whitespace-nowrap overflow-x-auto pb-4 scrollbar-hide">
            {[
              'Google Workspace', 'Zoom', 'Stripe', 'Razorpay', 'WhatsApp', 'Facebook', 
              'Google Ads', 'Shopify', 'WooCommerce', 'Zapier', 'n8n'
            ].map((logo, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs font-mono text-gray-300"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        {/* ==========================================
            15. PRICING SECTION
           ========================================== */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono tracking-widest text-[#47C7BF] uppercase block mb-2">Predictable Subscription</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">Simple Pricing</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">Zero hidden charges. Switch plans or cancel anytime.</p>
            
            {/* Annual toggle */}
            <div className="flex justify-center mt-6">
              <div className="p-1 rounded-lg bg-white/[0.03] border border-white/[0.08] flex">
                <button
                  onClick={() => setPricingInterval('monthly')}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold font-mono transition-all ${
                    pricingInterval === 'monthly' ? 'bg-[#2E9CAE] text-white' : 'text-gray-400'
                  }`}
                >
                  Monthly billing
                </button>
                <button
                  onClick={() => setPricingInterval('annual')}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold font-mono transition-all ${
                    pricingInterval === 'annual' ? 'bg-[#2E9CAE] text-white' : 'text-gray-400'
                  }`}
                >
                  Annual (20% Off)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border relative flex flex-col justify-between ${
                  plan.popular 
                    ? 'border-[#47C7BF] bg-[#47C7BF]/5 shadow-xl shadow-[#47C7BF]/5' 
                    : 'border-white/[0.08] bg-white/[0.01]'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-0.5 bg-[#47C7BF] text-[#110B33] font-mono text-[9px] font-bold uppercase tracking-widest rounded-full">
                    Recommended Tiers
                  </span>
                )}
                <div>
                  <h4 className="text-base font-bold font-display uppercase tracking-wider">{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mt-4 mb-6">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono">
                      ₹{pricingInterval === 'monthly' ? plan.monthly.toLocaleString() : plan.annual.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">/ month</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-gray-300 font-mono">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#47C7BF] mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#demo-form-section"
                  className={`w-full py-2.5 rounded-lg text-center text-xs font-semibold transition-all ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-[#2E9CAE] to-[#47C7BF] text-white' 
                      : 'border border-white/10 hover:bg-white/[0.04]'
                  }`}
                >
                  Subscribe Plan Now
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            16. COMPARISON MATRIX
           ========================================== */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold font-display mb-8 text-center">Why Choose GrowthOS™</h2>
          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.01]">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="p-4 font-bold text-gray-300">Features</th>
                  <th className="p-4 font-bold text-[#47C7BF]">GrowthOS™</th>
                  <th className="p-4 font-bold text-gray-400">HubSpot</th>
                  <th className="p-4 font-bold text-gray-400">GoHighLevel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  { f: 'Self-hosted n8n Workflows', ours: 'Unlimited (Included)', other1: 'None', other2: 'Charge per node run' },
                  { f: 'Meta WhatsApp Business API', ours: 'Direct API connection', other1: 'Addon charge ($100+)', other2: 'SaaS markup limits' },
                  { f: 'Lead Contact limits', ours: 'Unlimited base records', other1: 'Charge after 1,000 limits', other2: 'Sub-account charge' },
                  { f: 'Missed Call Text Back system', ours: 'Included natively', other1: 'Requires complex Zapier', other2: 'Included' },
                  { f: 'Indian & UAE regional support', ours: '24/7 Phone support', other1: 'Email ticket loops', other2: 'Forum limits' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 text-white font-medium">{row.f}</td>
                    <td className="p-4 text-[#99D57C] font-bold">{row.ours}</td>
                    <td className="p-4 text-gray-500">{row.other1}</td>
                    <td className="p-4 text-gray-500">{row.other2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            17. FAQS ACCORDION
           ========================================== */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-display mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqList.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-xs sm:text-sm text-white pr-4">{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="h-4 w-4 text-[#47C7BF]" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#47C7BF]" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="p-4 border-t border-white/[0.04] bg-black/20 text-xs text-gray-400 leading-relaxed font-mono">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            18. DEMO FORM SECTION
           ========================================== */}
        <div id="demo-form-section" className="mb-20 max-w-3xl mx-auto">
          <div className="p-6 sm:p-10 rounded-3xl border border-white/[0.08] bg-black/40 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(71,199,191,0.06),transparent_45%)] pointer-events-none" />

            {formSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-fade-in">
                <span className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl mx-auto">✓</span>
                <h3 className="text-lg font-bold font-display">Demo Request Logged</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  Our systems have received your onboarding parameters. Checking webhook responses...
                </p>

                {/* Submissions webhook console logs */}
                <div className="p-4 rounded-xl bg-black text-left font-mono text-[9px] space-y-1.5 h-[140px] overflow-y-auto border border-white/[0.05]">
                  {demoSubmittedLogs.map((log, i) => (
                    <p key={i} className="text-emerald-400">{log}</p>
                  ))}
                </div>

                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-white text-[10px] font-mono rounded"
                >
                  Submit Another Parameters
                </button>
              </div>
            ) : (
              <form onSubmit={handleDemoFormSubmit} className="space-y-4">
                <div className="text-center space-y-2 mb-6">
                  <h3 className="text-xl font-bold font-display">Book Your Free Demo</h3>
                  <p className="text-xs text-gray-400">
                    Onboard onto the GrowthOS™ platform. Syncing GoHighLevel webhook notifications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={demoFormData.name}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Anusha G."
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-[#47C7BF]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Company Name</label>
                    <input
                      type="text"
                      required
                      value={demoFormData.companyName}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="e.g. Apex Diagnostics"
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-[#47C7BF]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Email address</label>
                    <input
                      type="email"
                      required
                      value={demoFormData.email}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. contact@yourcompany.com"
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-[#47C7BF]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Phone (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      value={demoFormData.phone}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-[#47C7BF]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Country</label>
                    <select
                      value={demoFormData.country}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-[#161245] text-white focus:outline-none focus:border-[#47C7BF]"
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>United Arab Emirates</option>
                      <option>Australia</option>
                      <option>Singapore</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Industry</label>
                    <select
                      value={demoFormData.industry}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-[#161245] text-white focus:outline-none focus:border-[#47C7BF]"
                    >
                      <option>Healthcare</option>
                      <option>Education</option>
                      <option>Real Estate</option>
                      <option>Manufacturing</option>
                      <option>Retail & E-commerce</option>
                      <option>Professional Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Current CRM</label>
                    <select
                      value={demoFormData.currentCrm}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, currentCrm: e.target.value }))}
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-[#161245] text-white focus:outline-none focus:border-[#47C7BF]"
                    >
                      <option>None</option>
                      <option>HubSpot</option>
                      <option>Salesforce</option>
                      <option>Zoho</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Monthly Leads</label>
                    <select
                      value={demoFormData.monthlyLeads}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, monthlyLeads: e.target.value }))}
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-[#161245] text-white focus:outline-none focus:border-[#47C7BF]"
                    >
                      <option>Less than 100</option>
                      <option>100 - 500</option>
                      <option>500 - 2,000</option>
                      <option>More than 2,000</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Team Size</label>
                    <select
                      value={demoFormData.teamSize}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-[#161245] text-white focus:outline-none focus:border-[#47C7BF]"
                    >
                      <option>1-5 employees</option>
                      <option>6-20 employees</option>
                      <option>21-100 employees</option>
                      <option>More than 100 employees</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Message</label>
                    <textarea
                      rows={3}
                      value={demoFormData.message}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="e.g. We require direct custom WhatsApp chatbot triggers integrated with n8n..."
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-[#47C7BF]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-4 bg-gradient-to-r from-[#2E9CAE] to-[#47C7BF] text-white text-xs font-semibold rounded-lg hover:opacity-95 transition-all shadow-lg shadow-[#2E9CAE]/20"
                >
                  {loading ? 'Dispatched webhooks...' : 'Onboard onto GrowthOS™ Platform'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ==========================================
            19. FINAL CTA SECTION
           ========================================== */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#110B33] via-[#1a144b] to-[#110B33] border border-[#47C7BF]/20 p-8 sm:p-12 text-center">
          {/* Neon mesh glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(71,199,191,0.1),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative">
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight">
              Ready To Build A Predictable Revenue Engine?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Unify your contacts, funnels, webhooks, and conversational systems. Start your diagnostic demo now.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <a
                href="#demo-form-section"
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#2E9CAE] to-[#47C7BF] text-white text-xs font-semibold hover:opacity-95 transition-all"
              >
                Book Live Demo
              </a>
              <a
                href="#demo-form-section"
                className="px-5 py-3 rounded-lg border border-white/10 hover:bg-white/[0.04] text-white text-xs font-semibold"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* WATCH PRODUCT TOUR MODAL */}
      {showTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#110B33] p-6 text-xs space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowTour(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold"
            >
              ✕
            </button>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#47C7BF] flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-pulse" /> GrowthOS™ Guided Product Walkthrough
            </h3>
            
            <div className="space-y-3 font-mono text-[11px] text-gray-300 bg-black/40 p-4 rounded-lg h-[240px] overflow-y-auto leading-relaxed border border-white/[0.05]">
              <p className="text-emerald-400">⚡ [Core Node] Initializing guided walk tour...</p>
              <p>• Step 1: Lead captures via programmatic target pages instantly sync into contacts.</p>
              <p>• Step 2: Custom n8n webhook nodes validate CRM statuses & opportunities.</p>
              <p>• Step 3: Meta Business WhatsApp APIs dispatch personalized confirmations.</p>
              <p>• Step 4: Outbound Voice Dialers call leads in under 45 seconds to secure bookings.</p>
              <p className="text-[#47C7BF] font-bold">✓ Tour complete! GrowthOS™ secures maximum ROI for your MSME operations.</p>
            </div>

            <button
              onClick={() => setShowTour(false)}
              className="w-full py-2.5 bg-gradient-to-r from-[#2E9CAE] to-[#47C7BF] rounded text-white font-bold text-center"
            >
              Close Product Tour
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
