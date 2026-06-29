import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  MessageSquare, 
  Send, 
  Calendar, 
  CreditCard, 
  Users, 
  TrendingUp, 
  ShoppingBag, 
  Database, 
  Sparkles, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Layers, 
  Zap, 
  BarChart2, 
  Clock, 
  Play, 
  Check, 
  Globe, 
  ChevronRight,
  RefreshCw,
  Sliders,
  Bell,
  Lock,
  Smartphone,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { RoutePath } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function SolutionWhatsAppAutomation({ setPath, darkMode, formSubmitted, setFormSubmitted, loading, setLoading }: any) {
  useEffect(() => {
    document.title = "WhatsApp Automation Platform | Chatbots, Broadcasts & AI Conversations";
  }, []);

  // Form input state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    industry: 'Healthcare',
    monthlyLeads: '500 - 2,000',
    currentCrm: 'None / Spreadsheet',
    requirement: 'AI Lead Qualification'
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  // Generate simple random captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
    setCaptchaVerified(false);
  };

  const handleCaptchaVerify = () => {
    if (captchaInput.toUpperCase() === captchaCode) {
      setCaptchaVerified(true);
    } else {
      alert("Verification code mismatch. Please try again.");
      generateCaptcha();
    }
  };

  // Live Chat Simulator State
  const [chatStep, setChatStep] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot', text: string, type?: string, buttons?: string[], timestamp: string }>>([
    { sender: 'bot', text: "👋 Welcome to Natton Digital. How can we supercharge your operations today?", timestamp: "10:02 AM" }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const simulateStep = (stepIdx: number) => {
    setIsTyping(true);
    setChatStep(stepIdx);

    // Dynamic responses
    setTimeout(() => {
      setIsTyping(false);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (stepIdx === 1) {
        setChatMessages(prev => [
          ...prev,
          { sender: 'user', text: "🔍 I'm interested in WhatsApp automation. Tell me about your pricing & AI integration.", timestamp: now },
          { sender: 'bot', text: "🤖 Great! Our AI qualified agent intercepts inquiries in under 45 seconds, syncs automatically with GoHighLevel / HubSpot, and runs official Meta Business APIs without markup fees. We offer 3 tiers:\n\n• Starter (₹4,999/mo)\n• Growth (₹9,999/mo)\n• Scale (₹19,999/mo)\n\nWhich of these best suits your scale?", buttons: ["Starter Tier", "Growth (Popular)", "Scale Plan"], timestamp: now }
        ]);
      } else if (stepIdx === 2) {
        setChatMessages(prev => [
          ...prev,
          { sender: 'user', text: "📈 We are scaling fast, definitely the Growth Tier!", timestamp: now },
          { sender: 'bot', text: "⚡ Growth tier is excellent! It unlocks custom n8n workflow node branching, automated reminders, and complete CRM integration. Let's schedule a 10-minute setup with our team. Please choose a slot:", buttons: ["Tomorrow at 11 AM", "Tomorrow at 4 PM", "Other time slot"], timestamp: now }
        ]);
      } else if (stepIdx === 3) {
        setChatMessages(prev => [
          ...prev,
          { sender: 'user', text: "📅 Tomorrow at 11 AM works perfectly for me.", timestamp: now },
          { sender: 'bot', text: "💳 Outstanding! To lock in your early bird consult and initial sandbox webhook setup, you can complete our secure reservation link below.", type: "payment", buttons: ["Pay ₹1,999 Setup Deposit"], timestamp: now }
        ]);
      } else if (stepIdx === 4) {
        setChatMessages(prev => [
          ...prev,
          { sender: 'user', text: "💸 Secure Setup Deposit Paid Successfully! (Txn ID: NTN_83021)", timestamp: now },
          { sender: 'bot', text: "🎉 Secure Payment Verified! Your Sandbox Webhook is active and synced with Google Calendar.\n\n📅 Scheduled: Tomorrow, 11:00 AM IST\n🔗 Meet Link sent to your verified email.\n💬 We will ping you on this WhatsApp thread 10 minutes prior!", timestamp: now }
        ]);
      }
    }, 1000);
  };

  // Bot workflow interactive node states
  const [activeBotWorkflow, setActiveBotWorkflow] = useState<'support' | 'qualify' | 'handover'>('qualify');

  // Broadcast campaign simulator states
  const [broadcastTarget, setBroadcastTarget] = useState('Festive Promo - All Opt-in Leads');
  const [broadcastStatus, setBroadcastStatus] = useState<'idle' | 'sending' | 'completed'>('idle');
  const [broadcastMetrics, setBroadcastMetrics] = useState({ sent: 0, delivered: 0, opened: 0, clicked: 0 });

  const startBroadcastSim = () => {
    setBroadcastStatus('sending');
    setBroadcastMetrics({ sent: 0, delivered: 0, opened: 0, clicked: 0 });
    
    let current = 0;
    const total = 1450;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 120) + 50;
      if (current >= total) {
        current = total;
        clearInterval(interval);
        setBroadcastStatus('completed');
      }
      
      const sentCount = current;
      const deliv = Math.round(sentCount * 0.98);
      const open = Math.round(sentCount * 0.88);
      const click = Math.round(sentCount * 0.32);

      setBroadcastMetrics({
        sent: sentCount,
        delivered: deliv,
        opened: open,
        clicked: click
      });
    }, 150);
  };

  // Appointment reminder simulator states
  const [selectedReminderDate, setSelectedReminderDate] = useState('June 28');
  const [selectedReminderTime, setSelectedReminderTime] = useState('2:00 PM');
  const [reminderReply, setReminderReply] = useState<string | null>(null);

  // Catalog checkout simulator states
  const [cartItems, setCartItems] = useState<Array<{ id: number, name: string, price: number }>>([]);
  const productsCatalog = [
    { id: 1, name: "Starter Workflow Setup", price: 4999 },
    { id: 2, name: "Enterprise WhatsApp Custom Bot", price: 12999 },
    { id: 3, name: "Omnichannel n8n Pipeline Sync", price: 8999 },
  ];

  const addToCart = (prod: any) => {
    setCartItems(prev => [...prev, prod]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((acc, curr) => acc + curr.price, 0);
  };

  // Automation Flow Diagram active step
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const flowSteps = [
    { id: 'lead', label: 'Lead Form', desc: 'Customer fills out form on website or social page.' },
    { id: 'welcome', label: 'WhatsApp Welcome', desc: 'n8n fires immediate, customized greetings in 45s.' },
    { id: 'qualify', label: 'AI Qualification', desc: 'Gemini conversational bot qualifies budget & needs.' },
    { id: 'crm', label: 'CRM Update', desc: 'Instantly syncs structured profile to GoHighLevel.' },
    { id: 'appt', label: 'Appointment', desc: 'Interactive slots sent; automatically booked.' },
    { id: 'followup', label: 'Follow-Up', desc: 'Automatic pre-meeting notifications.' },
    { id: 'conversion', label: 'Conversion', desc: 'Sales closed with high-retention payment checkout.' },
  ];

  // ROI count up state
  const [roiCounters, setRoiCounters] = useState({ responseSpeed: 0, conversion: 1.0, availability: 0, manualEffort: 100 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRoiCounters(prev => {
        const nextSpeed = prev.responseSpeed < 80 ? prev.responseSpeed + 4 : 80;
        const nextConv = prev.conversion < 3.0 ? parseFloat((prev.conversion + 0.1).toFixed(1)) : 3.0;
        const nextAvail = prev.availability < 100 ? prev.availability + 5 : 100;
        const nextEffort = prev.manualEffort > 15 ? prev.manualEffort - 4 : 15;

        if (nextSpeed === 80 && nextConv === 3.0 && nextAvail === 100 && nextEffort === 15) {
          clearInterval(interval);
        }

        return {
          responseSpeed: nextSpeed,
          conversion: nextConv,
          availability: nextAvail,
          manualEffort: nextEffort
        };
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // FAQs Accordion states
  const [faqStates, setFaqStates] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setFaqStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqsData = [
    {
      q: "What is the WhatsApp Business Cloud API?",
      a: "The WhatsApp Business Cloud API is Meta's official hosted messaging infrastructure that enables high-volume transactional messages, automated chatbots, and promotional broadcasts. Unlike standard WhatsApp, it complies with strict enterprise policies and guarantees zero account bans for approved templates."
    },
    {
      q: "Do I need a green tick verification badge?",
      a: "No, a green tick is not mandatory to run chatbots, send broadcasts, or utilize our workflows. However, Natton Digital assists all Growth and Scale tier clients with official Meta Green Tick submissions to increase brand trust and recognition."
    },
    {
      q: "Are there additional Meta charges for message credits?",
      a: "Yes, Meta charges per conversation based on 24-hour windows. Conversations are categorized into Utility, Authentication, Marketing, and Service. Natton Digital connects directly to your Meta Developer Account so you pay raw Meta pricing at absolute cost—zero markups, unlike other platforms."
    },
    {
      q: "Does this integrate natively with my current CRM?",
      a: "Absolutely. We specialize in deep native integrations with GoHighLevel, HubSpot, Salesforce, Zoho, and active custom n8n/Make pipelines to ensure no lead status is ever left desynchronized."
    },
    {
      q: "Can we migrate from our existing provider like WATI or Interakt?",
      a: "Yes, easily. Migration takes less than 15 minutes. We will port your phone number without any active downtime, ensuring your active subscriber list and green tick are fully retained."
    },
    {
      q: "How does the AI Lead Qualification engine work?",
      a: "Our system combines server-side Gemini 1.5 Pro models with deterministic database lookups. This allows the bot to answer general business questions while strictly adhering to your pre-defined qualifying criteria (such as budget, location, or authority) before routing to human reps."
    },
    {
      q: "What is the template approval process for broadcasts?",
      a: "Before sending outbound broadcasts to unengaged users, Meta requires template approval. This typically takes under 2 minutes. We provide built-in template managers and optimized compliance copy suggestions to ensure rapid 99% approval rates."
    },
    {
      q: "Can multiple human agents manage conversations simultaneously?",
      a: "Yes, our Scale Plan features a multi-agent Shared Team Inbox. Agents can claim chats, leave internal notes, and transfer active conversations to specialized departments while the AI continues running in the background."
    },
    {
      q: "Is there a limit to how many broadcasts we can send?",
      a: "Meta puts numbers on tiers starting at 1,000 unique business-initiated contacts per day, scaling dynamically to 10,000, 100,000, and unlimited. We manage your warm-up schedule to scale your limits securely without triggering spam filters."
    },
    {
      q: "What kind of backup triggers do you have if our CRM goes offline?",
      a: "Our n8n infrastructure has custom retry policies and local queue stores. If your CRM or calendar API fails, our system caches the payload securely and retries every 3 minutes until successful, firing instant Slack/email alerts to your admins."
    },
    {
      q: "Do you offer localized support in India and APAC?",
      a: "Yes, we are proudly based in India. We offer priority WhatsApp, Zoom, and call-based support tailored specifically for operational hours across India, Southeast Asia, and Western markets."
    },
    {
      q: "Can we collect payments directly inside WhatsApp?",
      a: "Yes, we integrate with Razorpay, Stripe, and native WhatsApp Pay payloads. You can generate instant interactive payment invoices that users can click to pay directly inside their chat, increasing checkout conversions by up to 300%."
    }
  ];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please solve the captcha puzzle to prove you are a human agent.");
      return;
    }
    setLoading(true);
    // Simulate n8n webhook ingestion
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1800);
  };

  return (
    <div className={`py-12 animate-fade-in font-sans text-left transition-colors duration-500 ${
      darkMode ? 'bg-[#0B0721] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 text-xs font-mono text-gray-500 flex items-center gap-1.5">
          <button onClick={() => setPath('home')} className="hover:text-primary transition-colors">Home</button> 
          <span>/</span> 
          <span className="text-[#25D366] font-semibold">Solutions</span> 
          <span>/</span> 
          <span>WhatsApp Automation</span>
        </div>

        {/* ==========================================
            1. HERO SECTION
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative">
          
          {/* Animated SVG particle network in background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
              <motion.circle 
                cx="150" cy="150" r="100" 
                stroke="#25D366" strokeWidth="1" strokeDasharray="5 5"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle 
                cx="650" cy="450" r="150" 
                stroke="#00C2FF" strokeWidth="1" strokeDasharray="8 4"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              {/* Particle nodes */}
              <motion.circle cx="300" cy="200" r="4" fill="#25D366" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} />
              <motion.circle cx="450" cy="120" r="3" fill="#00C2FF" animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity }} />
              <motion.circle cx="550" cy="350" r="5" fill="#25D366" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
              <motion.circle cx="250" cy="480" r="4" fill="#00C2FF" animate={{ scale: [1.3, 0.8, 1.3] }} transition={{ duration: 3.5, repeat: Infinity }} />
              
              {/* Connection lines */}
              <line x1="300" y1="200" x2="450" y2="120" stroke="rgba(37,211,102,0.15)" strokeWidth="1" />
              <line x1="450" y1="120" x2="550" y2="350" stroke="rgba(0,194,255,0.15)" strokeWidth="1" />
              <line x1="250" y1="480" x2="300" y2="200" stroke="rgba(37,211,102,0.15)" strokeWidth="1" />
            </svg>
          </div>

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/30">
              <span className="flex h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#25D366] font-bold">
                Next-Gen WhatsApp Commerce Suite
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight">
              Turn WhatsApp Into Your <br />
              <span className="bg-gradient-to-r from-[#25D366] via-emerald-400 to-[#00C2FF] bg-clip-text text-transparent">
                Sales & Support
              </span> Engine
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Capture high-intent leads, automate hyper-personalized broadcasts, qualify budgets, and collect direct payments in under 5 minutes using official Meta API layers and sovereign AI pipelines.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#lead_form" 
                className="px-6 py-3 bg-[#25D366] hover:bg-emerald-600 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-[#25D366]/20 transition-all flex items-center gap-2 text-sm"
              >
                Book Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#conversation_demo" 
                className={`px-6 py-3 rounded-lg border transition-all flex items-center gap-2 text-sm font-semibold ${
                  darkMode 
                    ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#25D366]' 
                    : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                Watch Live Demo <Play className="h-4 w-4 text-[#25D366] fill-[#25D366]" />
              </a>
            </div>

            {/* Micro proof line */}
            <div className="flex items-center gap-6 pt-6 text-[11px] font-mono text-gray-500">
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-[#25D366]" /> Official Meta API Provider</span>
              <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5 text-blue-400" /> 256-bit SOC2 Encryption</span>
            </div>
          </div>

          {/* Right Hero Visual: 3D WhatsApp Ecosystem */}
          <div className="lg:col-span-5 relative">
            <div className={`p-6 rounded-3xl border relative overflow-hidden backdrop-blur-md ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xs font-mono uppercase text-gray-500 mb-4 tracking-wider flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[#25D366]" /> 3D Ecosystem Sandbox Visualizer
              </h3>

              {/* Floating Nodes Mockup using simple CSS transitions & Motion */}
              <div className="h-[280px] relative flex items-center justify-center border border-dashed border-white/5 rounded-2xl bg-black/20 p-4">
                
                {/* Center node: Natton Hub */}
                <motion.div 
                  className="z-10 p-4 rounded-2xl bg-gradient-to-tr from-[#25D366] to-[#00C2FF] text-slate-900 font-bold text-xs flex flex-col items-center shadow-lg"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MessageSquare className="h-6 w-6 mb-1 text-slate-900" />
                  <span>Natton Hub</span>
                  <span className="text-[8px] font-mono opacity-80 font-normal">Active API Core</span>
                </motion.div>

                {/* Satellite 1: CRM Sync */}
                <motion.div 
                  className={`absolute top-6 left-6 p-3 rounded-xl border flex items-center gap-2 text-[10px] font-mono ${
                    darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-slate-100 border-slate-200 shadow-sm'
                  }`}
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Database className="h-4 w-4 text-[#00C2FF]" />
                  <div>
                    <p className="font-bold">CRM System</p>
                    <p className="text-[8px] text-gray-500">GoHighLevel Sync</p>
                  </div>
                </motion.div>

                {/* Satellite 2: Calendars */}
                <motion.div 
                  className={`absolute top-6 right-6 p-3 rounded-xl border flex items-center gap-2 text-[10px] font-mono ${
                    darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-slate-100 border-slate-200 shadow-sm'
                  }`}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  <div>
                    <p className="font-bold">Calendars</p>
                    <p className="text-[8px] text-gray-500">Auto booking</p>
                  </div>
                </motion.div>

                {/* Satellite 3: Payments */}
                <motion.div 
                  className={`absolute bottom-6 left-6 p-3 rounded-xl border flex items-center gap-2 text-[10px] font-mono ${
                    darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-slate-100 border-slate-200 shadow-sm'
                  }`}
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <CreditCard className="h-4 w-4 text-amber-400" />
                  <div>
                    <p className="font-bold">Payments</p>
                    <p className="text-[8px] text-gray-500">Razorpay Link</p>
                  </div>
                </motion.div>

                {/* Satellite 4: AI Agents */}
                <motion.div 
                  className={`absolute bottom-6 right-6 p-3 rounded-xl border flex items-center gap-2 text-[10px] font-mono ${
                    darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-slate-100 border-slate-200 shadow-sm'
                  }`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-4 w-4 text-[#25D366]" />
                  <div>
                    <p className="font-bold">AI Agent</p>
                    <p className="text-[8px] text-gray-500">Gemini-backed</p>
                  </div>
                </motion.div>

                {/* Connection lines from satellites to center */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                  <path d="M 80 70 L 160 120" stroke="rgba(0,194,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 320 70 L 240 120" stroke="rgba(37,211,102,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 80 230 L 160 180" stroke="rgba(251,191,36,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 320 230 L 240 180" stroke="rgba(37,211,102,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-gray-500 bg-black/30 p-2 rounded-lg">
                <span>🔄 Real-time bidirectional Webhooks</span>
                <span className="text-[#25D366]">Status: Synchronized</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. ECOSYSTEM BENTO GRID
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Comprehensive Capabilities</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Complete WhatsApp Automation Ecosystem
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Natton Digital pairs native reliability with custom n8n configurations to support every single communication touchpoint your enterprise requires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Bento Card 1: Chatbots */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#25D366]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">WhatsApp Chatbots</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Build multi-layered conversational flows with keyword matches or sovereign LLM response modules active 24/7.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#25D366] mt-4 block">Learn more →</span>
            </div>

            {/* Bento Card 2: Broadcast Campaigns */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#25D366]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Send className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Broadcast Campaigns</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Fire promotional template broadcasts to opted-in contact folders with custom segment filtering and live delivery stats.
                </p>
              </div>
              <span className="text-[10px] font-mono text-blue-400 mt-4 block">Learn more →</span>
            </div>

            {/* Bento Card 3: Lead Qualification */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#25D366]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Lead Qualification</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Qualify budget size, geography, and active requirements automatically via AI, then label qualified leads live in CRM.
                </p>
              </div>
              <span className="text-[10px] font-mono text-purple-400 mt-4 block">Learn more →</span>
            </div>

            {/* Bento Card 4: Appointment Booking */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#25D366]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Appointment Booking</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Send live calendar grid options, enable date-slot bookings, and trigger custom sequence templates to reduce call no-shows.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 mt-4 block">Learn more →</span>
            </div>

            {/* Bento Card 5: Catalog Commerce */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#25D366]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Catalog Commerce</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Expose digital product collections directly inside WhatsApp chats. Customers add items to carts without exiting.
                </p>
              </div>
              <span className="text-[10px] font-mono text-amber-400 mt-4 block">Learn more →</span>
            </div>

            {/* Bento Card 6: CRM Integration */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#25D366]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">CRM Integration</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Read/write pipeline variables instantly with GoHighLevel, HubSpot, Salesforce, and n8n webhooks.
                </p>
              </div>
              <span className="text-[10px] font-mono text-sky-400 mt-4 block">Learn more →</span>
            </div>

            {/* Bento Card 7: Payment Collection */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#25D366]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Payment Collection</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Generate instant Razorpay, Stripe, and localized UPI invoices inline, complete with automated receipt templates.
                </p>
              </div>
              <span className="text-[10px] font-mono text-rose-400 mt-4 block">Learn more →</span>
            </div>

            {/* Bento Card 8: Customer Support */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#25D366]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Customer Support</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Manage multi-agent inbox ticket flows, assign priority labels, and trigger seamless human handovers when required.
                </p>
              </div>
              <span className="text-[10px] font-mono text-violet-400 mt-4 block">Learn more →</span>
            </div>

          </div>
        </div>

        {/* ==========================================
            3. INTERACTIVE CHAT EXPERIENCE (LIVE CHAT SIMULATOR)
           ========================================== */}
        <div id="conversation_demo" className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: descriptions & buttons to trigger simulator */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Interactive Sandbox</span>
              <h2 className="text-3xl font-bold font-display tracking-tight leading-tight">
                Experience the Live Chat Simulator
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Click the scenario stages below to watch our automated AI agent respond dynamically, booking slots, updates, and payments in real time.
              </p>

              <div className="space-y-3">
                {[
                  { idx: 1, label: "1. Lead Enquiry", desc: "User expresses interest via conversational questions." },
                  { idx: 2, label: "2. AI Qualification", desc: "AI qualifies budget, selects tier, and suggests scheduling." },
                  { idx: 3, label: "3. Appointment Booking", desc: "User chooses date & time slots instantly." },
                  { idx: 4, label: "4. Secure Payment Link", desc: "Simulate secure payment checkout deposit." },
                ].map((step) => (
                  <button
                    key={step.idx}
                    onClick={() => simulateStep(step.idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${
                      chatStep === step.idx
                        ? 'border-[#25D366] bg-[#25D366]/5 shadow-sm'
                        : (darkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-200 hover:bg-slate-50')
                    }`}
                  >
                    <span className={`h-5 w-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] mt-0.5 ${
                      chatStep >= step.idx ? 'bg-[#25D366] text-slate-900' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {step.idx}
                    </span>
                    <div>
                      <h4 className="font-semibold text-xs">{step.label}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{step.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setChatStep(0);
                    setChatMessages([{ sender: 'bot', text: "👋 Welcome to Natton Digital. How can we supercharge your operations today?", timestamp: "10:02 AM" }]);
                  }}
                  className="text-xs font-mono text-gray-500 hover:text-white flex items-center gap-1"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Reset Conversation Simulation
                </button>
              </div>
            </div>

            {/* Right side: Mock WhatsApp Device Frame */}
            <div className="lg:col-span-7 flex justify-center">
              <div className={`w-full max-w-[400px] rounded-[36px] border-[8px] border-slate-800 overflow-hidden shadow-2xl relative ${
                darkMode ? 'bg-[#0E1524]' : 'bg-[#E5DDD5]'
              }`}>
                {/* Header phone bar */}
                <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center font-bold font-mono text-xs text-white border border-white/20 relative">
                      ND
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-none">Natton Digital Admin</h4>
                      <span className="text-[8px] text-[#25D366] font-mono leading-none">AI Agent Active</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs opacity-80">
                    <Smartphone className="h-3.5 w-3.5" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Chat window body */}
                <div className={`p-4 h-[350px] overflow-y-auto space-y-3 flex flex-col ${
                  darkMode ? 'bg-slate-900/90' : 'bg-[#E5DDD5]'
                }`}>
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed relative ${
                        msg.sender === 'user'
                          ? 'bg-[#056162] text-white self-end rounded-tr-none'
                          : 'bg-white text-slate-800 self-start rounded-tl-none border border-slate-200'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      
                      {/* Embed custom interactive components if custom type exists */}
                      {msg.type === 'payment' && (
                        <div className="mt-3 p-2 bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg text-slate-900">
                          <p className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                            <CreditCard className="h-3.5 w-3.5" /> Razorpay Direct Invoice
                          </p>
                          <p className="text-xs font-black text-slate-900 mt-1">₹1,999.00</p>
                          <span className="text-[8px] text-slate-500">Secure 3D payment gateway via UPI / Cards</span>
                        </div>
                      )}

                      {/* Render CTA buttons in WhatsApp msg styling */}
                      {msg.buttons && msg.buttons.length > 0 && (
                        <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100">
                          {msg.buttons.map((btnTxt, bIdx) => (
                            <button
                              key={bIdx}
                              onClick={() => {
                                if (chatStep === 1) simulateStep(2);
                                else if (chatStep === 2) simulateStep(3);
                                else if (chatStep === 3) simulateStep(4);
                              }}
                              className="w-full text-center py-1.5 px-3 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors font-bold text-[10px] border border-emerald-200/50 block"
                            >
                              {btnTxt}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="text-[8px] text-gray-400 text-right mt-1 font-mono">
                        {msg.timestamp} {msg.sender === 'bot' && '✓✓'}
                      </div>
                    </div>
                  ))}

                  {/* Simulated Typing Indicator */}
                  {isTyping && (
                    <div className="bg-white text-slate-800 self-start rounded-2xl rounded-tl-none p-3 text-xs border border-slate-200 flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-slate-400">AI agent typing</span>
                      <span className="flex h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                      <span className="flex h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce delay-100" />
                      <span className="flex h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce delay-200" />
                    </div>
                  )}
                </div>

                {/* Fake Footer input keyboard */}
                <div className="bg-[#1F2C34] p-2 flex items-center gap-2">
                  <input
                    type="text"
                    disabled
                    placeholder="AI active. Select steps on left..."
                    className="flex-grow p-1.5 text-[10px] bg-[#2A3942] rounded-full text-gray-400 border-none outline-none px-3"
                  />
                  <button className="h-7 w-7 rounded-full bg-[#00A884] text-white flex items-center justify-center hover:scale-105 transition-transform">
                    <Send className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            4. WHATSAPP CHATBOTS SECTION
           ========================================== */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Bot Workflow */}
            <div className={`p-6 rounded-2xl border ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.05]">
                <span className="text-xs font-mono uppercase text-[#25D366] font-bold">Bot Workflow Simulation</span>
                <span className="text-[10px] font-mono text-gray-500">Node ID: bot_router_01</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 justify-center mb-4">
                  <button
                    onClick={() => setActiveBotWorkflow('qualify')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all border ${
                      activeBotWorkflow === 'qualify' 
                        ? 'bg-[#25D366]/10 border-[#25D366] text-[#25D366]' 
                        : 'border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    AI Qualification Flow
                  </button>
                  <button
                    onClick={() => setActiveBotWorkflow('support')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all border ${
                      activeBotWorkflow === 'support' 
                        ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                        : 'border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    24/7 FAQ Response
                  </button>
                  <button
                    onClick={() => setActiveBotWorkflow('handover')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all border ${
                      activeBotWorkflow === 'handover' 
                        ? 'bg-purple-500/10 border-purple-500 text-purple-400' 
                        : 'border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    Human Rep Handover
                  </button>
                </div>

                {/* Output visual state based on selection */}
                <div className="p-4 rounded-xl bg-black/30 font-mono text-xs space-y-3">
                  <div className="text-[10px] text-gray-500">// Incoming payload evaluation:</div>
                  <div className="flex items-center gap-2 text-[#25D366]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                    <span>USER_MESSAGE: "Pricing details please"</span>
                  </div>

                  <div className="h-6 w-[2px] bg-slate-700 ml-2" />

                  {activeBotWorkflow === 'qualify' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 text-[10px] text-gray-300">
                        ⚡ <span className="text-yellow-400">Gemini LLM Intent matched</span>: "Inquiry_Pricing"
                      </div>
                      <div className="p-2.5 rounded bg-[#25D366]/5 border border-[#25D366]/30 text-[10px] text-[#25D366]">
                        ✓ Bot response triggered: Sending Tier selection buttons & pricing catalogs.
                      </div>
                    </div>
                  )}

                  {activeBotWorkflow === 'support' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 text-[10px] text-gray-300">
                        ⚡ <span className="text-yellow-400">FAQ Keyword matched</span>: "refund policy"
                      </div>
                      <div className="p-2.5 rounded bg-blue-500/5 border border-blue-500/30 text-[10px] text-blue-400">
                        ✓ Bot response triggered: "Hi, refunds are processed in 5-7 business days..."
                      </div>
                    </div>
                  )}

                  {activeBotWorkflow === 'handover' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 text-[10px] text-gray-300">
                        ⚡ <span className="text-rose-400">Escalation requested</span>: "speak to human"
                      </div>
                      <div className="p-2.5 rounded bg-purple-500/5 border border-purple-500/30 text-[10px] text-purple-400">
                        ✓ Flow Action: Pausing AI Agent router, forwarding chat ID to Shared Inbox rep "Sarah M."
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Features description */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Smart Bots</span>
              <h2 className="text-3xl font-bold font-display tracking-tight">
                WhatsApp Chatbots
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Scale conversions and free up reps with native, hyper-intelligent bots.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "24×7 Customer Support", desc: "Never lose a lead due to regional timezone delays." },
                  { title: "Lead Qualification", desc: "Validate budget size & requirements automatically." },
                  { title: "FAQs Integration", desc: "Solve repetitive shipping, policy & catalog queries instantly." },
                  { title: "Appointment Scheduling", desc: "Allow leads to choose live calendar slots inline." },
                  { title: "AI Responses", desc: "Powered by Gemini for natural, compliant conversations." },
                  { title: "Human Handover", desc: "Seamlessly route hot leads to sales representatives." },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-[#25D366] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold font-display">{f.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            5. BROADCAST CAMPAIGNS SECTION
           ========================================== */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Features description */}
            <div className="space-y-6 order-2 lg:order-1">
              <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Mass Engagement</span>
              <h2 className="text-3xl font-bold font-display tracking-tight">
                Broadcast Campaigns
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Reach thousands of opted-in numbers with approved template newsletters. Enjoy up to 98% open rates compared to typical email inbox noise.
              </p>

              <div className="space-y-3">
                {[
                  { title: "Bulk Messaging", desc: "Queue high-volume campaigns safely with optimized warm-up algorithms." },
                  { title: "Promotional Campaigns", desc: "Announce discount catalogs, store open alerts, and coupon alerts." },
                  { title: "Festival Campaigns", desc: "Trigger automatic seasonal templates scheduled on calendar dates." },
                  { title: "Dynamic Segmentation", desc: "Isolate lists by CRM tags, geography, or last purchase timestamps." },
                  { title: "Real-time Analytics", desc: "Audit precise delivered, opened, and link clicked ratios." },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold font-display">{f.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Dashboard Visual */}
            <div className={`p-6 rounded-2xl border order-1 lg:order-2 ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/[0.05]">
                <span className="text-xs font-mono uppercase text-blue-400 font-bold">Campaign Dashboard</span>
                {broadcastStatus === 'sending' && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-mono">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-ping" /> Sending Live
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-500 uppercase block">Selected Broadcast Template:</label>
                  <select
                    value={broadcastTarget}
                    onChange={(e) => setBroadcastTarget(e.target.value)}
                    disabled={broadcastStatus === 'sending'}
                    className={`w-full p-2 text-xs rounded-lg border outline-none ${
                      darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                    }`}
                  >
                    <option value="Festive Promo - All Opt-in Leads">Festive Promo - All Opt-in Leads (Marketing)</option>
                    <option value="System Maintenance Alert">System Maintenance Alert (Utility)</option>
                    <option value="Re-engagement Coupon Loop">Re-engagement Coupon Loop (Marketing)</option>
                  </select>
                </div>

                <button
                  onClick={startBroadcastSim}
                  disabled={broadcastStatus === 'sending'}
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all"
                >
                  {broadcastStatus === 'sending' ? 'Executing Broadcast Campaign...' : 'Trigger Simulation Broadcast'}
                </button>

                {/* Animated progress indicators */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded-lg bg-black/20 text-center border border-white/5">
                    <p className="text-[9px] font-mono text-gray-500 uppercase">Messages Sent</p>
                    <p className="text-base font-black text-blue-400 font-mono mt-0.5">{broadcastMetrics.sent} / 1,450</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 text-center border border-white/5">
                    <p className="text-[9px] font-mono text-gray-500 uppercase">Delivered (98%)</p>
                    <p className="text-base font-black text-[#25D366] font-mono mt-0.5">{broadcastMetrics.delivered}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 text-center border border-white/5">
                    <p className="text-[9px] font-mono text-gray-500 uppercase">Open Rate (88%)</p>
                    <p className="text-base font-black text-purple-400 font-mono mt-0.5">{broadcastMetrics.opened}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 text-center border border-white/5">
                    <p className="text-[9px] font-mono text-gray-500 uppercase">Click-Through (32%)</p>
                    <p className="text-base font-black text-amber-400 font-mono mt-0.5">{broadcastMetrics.clicked}</p>
                  </div>
                </div>

                {broadcastStatus === 'completed' && (
                  <p className="text-[10px] text-[#25D366] text-center font-mono">✓ Broadcast complete. CRM tags updated.</p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            6. APPOINTMENT AUTOMATION SECTION
           ========================================== */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Calendar + Chat Simulation Visual */}
            <div className={`p-6 rounded-2xl border ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/[0.05]">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Calendar Sync Preview</span>
                <span className="text-[10px] text-gray-500 font-mono">Integration: Google Calendar</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Micro Calendar Month View */}
                <div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase block mb-2">Select Reminder Date:</span>
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                    {['M','T','W','T','F','S','S'].map((d, i) => <span key={i} className="text-gray-600 font-bold">{d}</span>)}
                    {Array.from({ length: 28 }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const dateStr = `June ${dayNum}`;
                      const isSelected = selectedReminderDate === dateStr;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedReminderDate(dateStr)}
                          className={`p-1 rounded text-center transition-colors ${
                            isSelected 
                              ? 'bg-[#25D366] text-slate-900 font-bold' 
                              : (darkMode ? 'hover:bg-white/5 text-gray-300' : 'hover:bg-slate-100 text-slate-800')
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Select Booking Time:</span>
                    <div className="flex gap-2">
                      {['10:00 AM', '2:00 PM', '4:30 PM'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedReminderTime(t)}
                          className={`px-2 py-1 text-[9px] rounded font-mono border transition-all ${
                            selectedReminderTime === t
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                              : 'border-white/5 text-gray-400 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Simulated Message Output */}
                <div className="flex flex-col justify-between">
                  <span className="text-[9px] font-mono text-gray-500 uppercase block mb-2">Simulated Outbound Reminder:</span>
                  <div className={`p-3 rounded-lg border text-[10px] leading-relaxed space-y-2 flex-grow ${
                    darkMode ? 'bg-black/30 border-white/5 text-gray-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <p className="font-bold text-[#25D366]">Natton Reminder API:</p>
                    <p>
                      "Hi Anusha, your upcoming consult session is scheduled for <span className="text-emerald-400 font-bold underline">{selectedReminderDate}</span> at <span className="text-emerald-400 font-bold underline">{selectedReminderTime}</span>.<br /><br />
                      Reply <strong>1</strong> to Confirm Attendance.<br />
                      Reply <strong>2</strong> to Reschedule."
                    </p>
                    
                    {/* Simulator Action checks */}
                    <div className="flex gap-2 pt-2 border-t border-white/5 mt-2">
                      <button
                        onClick={() => setReminderReply('Confirmed')}
                        className="flex-grow py-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30 text-[#25D366] text-[9px] rounded font-bold transition-all"
                      >
                        Simulate Reply '1'
                      </button>
                      <button
                        onClick={() => setReminderReply('Reschedule')}
                        className="flex-grow py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 text-[9px] rounded font-bold transition-all"
                      >
                        Simulate Reply '2'
                      </button>
                    </div>

                    {reminderReply && (
                      <div className="mt-2 p-1.5 rounded bg-black/40 text-[9px] font-mono text-center text-[#25D366]">
                        {reminderReply === 'Confirmed' ? '✓ Google Calendar updated to [CONFIRMED]' : '🔄 Booking pipeline reset: slot choice sent.'}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Features description */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Attendance Optimization</span>
              <h2 className="text-3xl font-bold font-display tracking-tight">
                Appointment Automation
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Reduce meeting & demo no-shows by up to 75% with sequence reminders linked directly to Google Calendars or custom CRMs.
              </p>

              <div className="space-y-3">
                {[
                  { title: "Calendar Integration", desc: "Sync slots live with Calendly, Cal.com, Google Calendar, or native CRM slots." },
                  { title: "Reminder Messages", desc: "Auto fire sequences 24 hours and 1 hour before scheduled consultations." },
                  { title: "One-Click Rescheduling", desc: "Allow leads to pick new times inside WhatsApp without filling other web forms." },
                  { title: "Missed Appointment Recovery", desc: "Instantly re-engage prospects who missed slots to rebook immediately." },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold font-display">{f.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            7. CATALOG & COMMERCE SECTION
           ========================================== */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Features description */}
            <div className="space-y-6 order-2 lg:order-1">
              <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Social Commerce</span>
              <h2 className="text-3xl font-bold font-display tracking-tight">
                Catalog & Commerce
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Expose service catalogs, product images, pricing tables, and checkout links directly inside conversational streams.
              </p>

              <div className="space-y-3">
                {[
                  { title: "Interactive Product Catalog", desc: "Connect Meta Commerce Catalogs directly to allow item discovery." },
                  { title: "Rich Images & Media", desc: "Expose gorgeous high-contrast banners, PDF brochures, and videos." },
                  { title: "In-chat Add to Cart", desc: "Customers add multiple services or items into unified WhatsApp carts." },
                  { title: "Real-time Order Tracking", desc: "Auto fire status notifications (Packed, Dispatched, Shipped, Delivered)." },
                  { title: "UPI & Cards Payment Inboxes", desc: "Secure transaction validation via automated payment link nodes." },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold font-display">{f.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Device Mockup Visual */}
            <div className={`p-6 rounded-2xl border order-1 lg:order-2 ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/[0.05]">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">Catalog Discovery Demo</span>
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[9px] font-mono text-red-400 hover:underline"
                  >
                    Clear Cart ({cartItems.length})
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Simulated Meta Service Catalog:</span>
                
                <div className="space-y-2">
                  {productsCatalog.map((prod) => (
                    <div
                      key={prod.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-bold">{prod.name}</h4>
                        <p className="text-[10px] text-emerald-400 font-mono">₹{prod.price.toLocaleString('en-IN')}</p>
                      </div>
                      <button
                        onClick={() => addToCart(prod)}
                        className="py-1 px-3 bg-[#25D366] hover:bg-emerald-600 text-slate-900 font-bold rounded text-[10px] transition-all"
                      >
                        + Add To Cart
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart receipt preview */}
                <div className="p-3 rounded-lg bg-black/30 border border-dashed border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                    <span>Active In-Chat Cart Preview</span>
                    <span>{cartItems.length} items selected</span>
                  </div>

                  {cartItems.length === 0 ? (
                    <p className="text-[10px] text-gray-500 text-center py-4">Click "Add to Cart" to build checkout receipt.</p>
                  ) : (
                    <div className="space-y-1.5 font-mono text-[10px]">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-gray-300">
                          <span>• {item.name}</span>
                          <span>₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold text-white pt-1.5 border-t border-white/5">
                        <span>Total Checkout:</span>
                        <span className="text-[#25D366]">₹{getCartTotal().toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            8. AUTOMATION WORKFLOWS SECTION (NODE DIAGRAM)
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Pipeline Architecture</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Automation Workflows Diagram
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Click nodes to view detailed background triggers executed instantly across our servers.
            </p>
          </div>

          {/* Node Based Diagram Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Steps buttons on left */}
            <div className="lg:col-span-4 space-y-2">
              {flowSteps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveFlowStep(idx)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    activeFlowStep === idx
                      ? 'border-[#25D366] bg-[#25D366]/5'
                      : (darkMode ? 'border-white/5 hover:bg-white/[0.01]' : 'border-slate-200 hover:bg-slate-50')
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-display">{step.label}</span>
                    <span className="text-[8px] font-mono text-gray-500">Step {idx + 1}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Visual Node Diagram Output on right */}
            <div className={`lg:col-span-8 p-6 rounded-2xl border min-h-[250px] flex flex-col justify-between relative ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="absolute top-0 right-0 h-32 w-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Server Orchestrator Logs:</span>
                
                <div className="flex flex-wrap items-center gap-2">
                  {flowSteps.map((step, idx) => {
                    const isActive = activeFlowStep === idx;
                    const isCompleted = idx < activeFlowStep;
                    return (
                      <React.Fragment key={step.id}>
                        <div
                          onClick={() => setActiveFlowStep(idx)}
                          className={`p-2.5 rounded-lg border text-[10px] font-mono font-bold cursor-pointer transition-all ${
                            isActive
                              ? 'border-[#25D366] bg-[#25D366]/10 text-[#25D366]'
                              : isCompleted
                              ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400/80'
                              : (darkMode ? 'border-white/5 text-gray-500' : 'border-slate-200 text-slate-400')
                          }`}
                        >
                          {step.label}
                        </div>
                        {idx < flowSteps.length - 1 && (
                          <ChevronRight className={`h-3 w-3 ${isCompleted ? 'text-emerald-500' : 'text-gray-600'}`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs leading-relaxed mt-4">
                  <h4 className="text-xs font-bold text-[#00C2FF] mb-1">Active Step: {flowSteps[activeFlowStep].label}</h4>
                  <p className="text-[11px] text-gray-300">{flowSteps[activeFlowStep].desc}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 pt-6 mt-4 border-t border-white/5">
                <span>⚡ Latency: &lt;450ms across pipeline execution</span>
                <span className="text-emerald-400 font-bold">Sovereign Node Active</span>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            9. INTEGRATIONS SECTION (LOGO MARQUEE)
           ========================================== */}
        <div className="mb-24 py-12 border-y border-white/[0.05] relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Unmatched Connectivity</span>
            <h2 className="text-2xl font-bold font-display">Integrates With Your Tech Stack</h2>
          </div>

          {/* Marquee Container */}
          <div className="flex overflow-x-hidden relative w-full group py-2">
            <div className="flex gap-8 shrink-0 animate-marquee whitespace-nowrap">
              {[
                "GoHighLevel", "HubSpot", "Salesforce", "Google Calendar", 
                "Razorpay", "Stripe", "Shopify", "WooCommerce", "n8n",
                "GoHighLevel", "HubSpot", "Salesforce", "Google Calendar", 
                "Razorpay", "Stripe", "Shopify", "WooCommerce", "n8n"
              ].map((logo, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-xl border font-mono text-xs font-bold flex items-center justify-center gap-2 ${
                    darkMode 
                      ? 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:border-[#25D366]' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-[#25D366] shadow-sm'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            10. INDUSTRY USE CASES SECTION
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Sector Focus</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Built For Every Industry
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Every sector demands bespoke automation. Natton Digital pre-configures flows tailored to your specific compliance criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Healthcare", 
                metric: "90% Appointment Retention", 
                desc: "Answering patient symptom logs, qualifying triage schedules under HIPAA guidelines, and dispatching follow-up reminder alerts." 
              },
              { 
                title: "Education", 
                metric: "3.2x Counselor Efficiency", 
                desc: "Handling student course inquiries, triggering automated brochure folders, and routing highly-qualified leads to counselors." 
              },
              { 
                title: "Real Estate", 
                metric: "18% Abandonment Recovery", 
                desc: "Pre-qualifying site tour prospects, verifying loan status variables, and delivering digital catalogs instantly." 
              },
              { 
                title: "Retail & E-commerce", 
                metric: "28% Add-to-Cart Conversions", 
                desc: "Broadcasting promotional catalogs, processing abandoned cart reminders, and taking direct payment checkouts." 
              },
              { 
                title: "Manufacturing", 
                metric: "50% Lead Cycle Reduction", 
                desc: "Handling supplier inventory inquiries, delivering pricing tables, and updating production dispatch statuses." 
              },
              { 
                title: "Professional Services", 
                metric: "45% Operational Cost Savings", 
                desc: "Automating consultant intake forms, triggering custom calendar schedulers, and capturing review scores post-session." 
              },
            ].map((useCase, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] backdrop-blur-md ${
                  darkMode 
                    ? 'bg-white/[0.02] border-white/10 hover:border-[#25D366]' 
                    : 'bg-white border-slate-200 hover:border-[#25D366] shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold font-display">{useCase.title}</h3>
                  <span className="text-[10px] font-mono text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded">
                    {useCase.metric}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  {useCase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            11. ROI SECTION (COUNT-UP STATS)
           ========================================== */}
        <div className="mb-24 py-16 rounded-3xl border relative overflow-hidden backdrop-blur-md text-center bg-gradient-to-br from-[#25D366]/5 to-[#00C2FF]/5 border-white/10">
          <div className="absolute top-0 left-0 h-full w-full opacity-10 pointer-events-none bg-[radial-gradient(#25D366_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Quantifiable Impact</span>
            <h2 className="text-3xl font-bold font-display">Business Impact & Uptime</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="space-y-2">
              <p className="text-4xl lg:text-5xl font-black font-mono text-[#25D366]">{roiCounters.responseSpeed}%</p>
              <p className="text-xs font-bold font-display">Faster Responses</p>
              <p className="text-[10px] text-gray-500">Immediate intercept in under 45s</p>
            </div>

            <div className="space-y-2">
              <p className="text-4xl lg:text-5xl font-black font-mono text-blue-400">{roiCounters.conversion}X</p>
              <p className="text-xs font-bold font-display">Lead Conversion Rate</p>
              <p className="text-[10px] text-gray-500">Up from standard email rates</p>
            </div>

            <div className="space-y-2">
              <p className="text-4xl lg:text-5xl font-black font-mono text-purple-400">{roiCounters.availability}/7</p>
              <p className="text-xs font-bold font-display">Total Availability</p>
              <p className="text-[10px] text-gray-500">Zero downtime support queues</p>
            </div>

            <div className="space-y-2">
              <p className="text-4xl lg:text-5xl font-black font-mono text-amber-400">-{roiCounters.manualEffort}%</p>
              <p className="text-xs font-bold font-display">Manual Representative Work</p>
              <p className="text-[10px] text-gray-500">Automate initial triage tasks</p>
            </div>

          </div>
        </div>

        {/* ==========================================
            12. PRICING PLANS SECTION
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Transparent Plans</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Pricing Built To Scale
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Connect raw Meta APIs directly. Zero markup markup charges on your conversations. Save thousands compared to WATI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "₹4,999",
                period: "month",
                desc: "Perfect for small growing operations wanting official channel validation.",
                features: [
                  "Interactive FAQ Chatbot",
                  "Unified Broadcast Campaigns",
                  "Basic Analytics Reports",
                  "Single Agent Shared Inbox",
                  "Meta Developer Portal setup",
                ],
                popular: false,
                color: "border-white/10"
              },
              {
                name: "Growth",
                price: "₹9,999",
                period: "month",
                desc: "For active mid-sized scales needing total CRM & booking systems pipeline.",
                features: [
                  "Advanced Multi-Workflows",
                  "Deep CRM Integration",
                  "Appointment Reminder Automation",
                  "Meta Green Tick Submission Support",
                  "Up to 5 Multi-agent Team Inboxes",
                  "Priority n8n queue pipelines",
                ],
                popular: true,
                color: "border-[#25D366] bg-[#25D366]/[0.02]"
              },
              {
                name: "Scale",
                price: "₹19,999",
                period: "month",
                desc: "Complete conversational enterprise suite utilizing deep AI reasoning models.",
                features: [
                  "Gemini 1.5 Pro AI Rep Agents",
                  "Bespoke System Integrations",
                  "Advanced Real-time Analytics Dashboard",
                  "Unlimited Multi-agent Shared Inboxes",
                  "Direct Developer Slack channel support",
                  "Custom database triggers & webhook routers",
                ],
                popular: false,
                color: "border-white/10"
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] relative backdrop-blur-md ${
                  plan.popular ? 'shadow-lg shadow-[#25D366]/10' : ''
                } ${darkMode ? plan.color : 'bg-white border-slate-200'}`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#25D366] text-slate-900 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold font-display">{plan.name}</h3>
                    <p className={`text-[11px] mt-2 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{plan.desc}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black font-mono text-[#25D366]">{plan.price}</span>
                    <span className="text-xs text-gray-500">/{plan.period}</span>
                  </div>

                  <hr className="border-white/5" />

                  <ul className="space-y-3">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                        <Check className="h-4 w-4 text-[#25D366] shrink-0 mt-0.5" />
                        <span className={darkMode ? 'text-gray-300' : 'text-slate-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#lead_form"
                  className={`mt-8 w-full py-3 text-center text-xs font-semibold rounded-xl transition-all ${
                    plan.popular
                      ? 'bg-[#25D366] hover:bg-emerald-600 text-slate-900 font-bold'
                      : (darkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800')
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            13. WHY CHOOSE NATTON DIGITAL (COMPARISON)
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Unbiased Audit</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">Why Choose Natton Digital</h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              We offer deep sovereign infrastructure control with raw pricing. See how we stack up against traditional tools:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 font-bold text-gray-400 font-display">Features</th>
                  <th className="p-4 font-black text-[#25D366] font-display">Natton Digital</th>
                  <th className="p-4 font-bold text-slate-400">WATI</th>
                  <th className="p-4 font-bold text-slate-400">Interakt</th>
                  <th className="p-4 font-bold text-slate-400">Respond.io</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: "Direct Meta API Setup (No Markup Charges)", natton: "✓ (Zero Markup)", wati: "❌ (Marked-up credits)", interakt: "❌ (Marked-up credits)", respond: "❌ (SaaS commissions)" },
                  { name: "Sovereign AI Integration (Gemini 1.5 Pro)", natton: "✓ (Fully custom routing)", wati: "❌ (Standard chatbot rules)", interakt: "❌ (No custom LLM node)", respond: "✓ (Limited GPT models)" },
                  { name: "Sovereign n8n Node Workflows", natton: "✓ (Unlimited nodes)", wati: "❌ (Fixed builder only)", interakt: "❌ (No external scripting)", respond: "❌ (Proprietary builder)" },
                  { name: "UPI & Local Payment collection (Razorpay)", natton: "✓ (Native checkout cards)", wati: "❌ (Redirect links only)", interakt: "✓ (Yes)", respond: "❌ (Manual invoice setup)" },
                  { name: "HIPAA Compliant Patient Triage Sync", natton: "✓ (Encrypted database logs)", wati: "❌ (Standard support only)", interakt: "❌ (No HIPAA profiles)", respond: "❌ (General support only)" },
                  { name: "Setup consultation & green tick audit", natton: "✓ (Included)", wati: "❌ (Paid addon)", interakt: "❌ (Automated support only)", respond: "❌ (Self-serve documentation)" },
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 font-semibold text-gray-300 font-display">{row.name}</td>
                    <td className="p-4 text-[#25D366] font-bold font-mono">{row.natton}</td>
                    <td className="p-4 text-gray-500 font-mono">{row.wati}</td>
                    <td className="p-4 text-gray-500 font-mono">{row.interakt}</td>
                    <td className="p-4 text-gray-500 font-mono">{row.respond}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            14. FAQ ACCORDION SECTION (12 ACCORDIONS)
           ========================================== */}
        <div className="mb-24 space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">In-depth Auditing</span>
            <h2 className="text-3xl font-bold font-display tracking-tight text-center">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqsData.map((faq, idx) => {
              const isOpen = !!faqStates[idx];
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all ${
                    isOpen 
                      ? 'border-[#25D366] bg-[#25D366]/[0.02]' 
                      : (darkMode ? 'border-white/5 bg-white/[0.01]' : 'border-slate-200 bg-white')
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs font-bold font-display cursor-pointer"
                  >
                    <span>{idx + 1}. {faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className={`px-4 pb-4 text-[11px] leading-relaxed ${
                          darkMode ? 'text-gray-400' : 'text-slate-600'
                        }`}>
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

        {/* ==========================================
            15. LEAD FORM SECTION (GOHIGHLEVEL / N8N CONFIG)
           ========================================== */}
        <div id="lead_form" className="mb-24">
          <div className={`p-8 sm:p-12 rounded-3xl border max-w-3xl mx-auto relative overflow-hidden backdrop-blur-md ${
            darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
          }`}>
            <div className="absolute top-0 right-0 h-40 w-40 bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />

            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-12 w-12 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold font-display">Inquiry Transmitted Successfully</h3>
                <p className={`text-xs max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  Our sovereign n8n workflow has processed your details. We have triggered an automatic calendar invitation with the demonstration meeting link. Keep an eye on your WhatsApp inbox for an instant demonstration invite!
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setCaptchaVerified(false);
                      generateCaptcha();
                    }}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-white transition-colors"
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-6 text-left">
                <div className="text-center space-y-2 mb-6">
                  <span className="text-[10px] font-mono tracking-wider text-[#25D366] uppercase block font-bold">Request Demo</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display">Book Your WhatsApp Automation Demo</h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    Secure a sandbox workspace. Instantly connected to GoHighLevel and validated by n8n webhooks.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase block">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Anusha S."
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#25D366] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase block">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Natton Systems"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#25D366] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase block">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="anusha.gmcsco@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#25D366] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase block">Phone Number (with Country Code) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#25D366] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase block">Country</label>
                    <input
                      type="text"
                      placeholder="India"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#25D366] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>

                  {/* Industry */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase block">Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#25D366] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Retail & E-commerce">Retail & E-commerce</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Professional Services">Professional Services</option>
                    </select>
                  </div>

                  {/* Monthly Leads */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase block">Est. Monthly Leads</label>
                    <select
                      value={formData.monthlyLeads}
                      onChange={(e) => setFormData({...formData, monthlyLeads: e.target.value})}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#25D366] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    >
                      <option value="Under 500">Under 500</option>
                      <option value="500 - 2,000">500 - 2,000</option>
                      <option value="2,000 - 10,000">2,000 - 10,000</option>
                      <option value="10,000+">10,000+</option>
                    </select>
                  </div>

                  {/* Current CRM */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase block">Current CRM / Setup</label>
                    <input
                      type="text"
                      placeholder="GoHighLevel / HubSpot / Spreadsheet"
                      value={formData.currentCrm}
                      onChange={(e) => setFormData({...formData, currentCrm: e.target.value})}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#25D366] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>

                </div>

                {/* Requirement text field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase block">Key Automation Requirement *</label>
                  <textarea
                    required
                    placeholder="We want to automate patient appointment recovery, verify loan limits for prospective buyers, or sync Shopify abandoned cart receipts..."
                    value={formData.requirement}
                    onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                    rows={3}
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#25D366] transition-all ${
                      darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                {/* Simple Human Captcha Puzzle */}
                <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Human Verification Challenge:</span>
                    <span className="text-[9px] text-[#25D366] font-mono font-bold">Compliance Node Enabled</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-gradient-to-r from-emerald-950 to-slate-900 border border-[#25D366]/40 rounded text-base font-black font-mono tracking-widest text-emerald-400 select-none">
                      {captchaCode}
                    </div>
                    
                    <input
                      type="text"
                      required
                      placeholder="Enter code"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      disabled={captchaVerified}
                      className={`p-2 w-24 text-center text-xs font-mono font-bold rounded border outline-none focus:border-[#25D366] ${
                        darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300'
                      }`}
                    />

                    {!captchaVerified ? (
                      <button
                        type="button"
                        onClick={handleCaptchaVerify}
                        className="py-2 px-4 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 border border-[#25D366]/30 rounded text-xs font-bold transition-all"
                      >
                        Verify
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 font-mono">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !captchaVerified}
                  className="w-full py-3 bg-[#25D366] hover:bg-emerald-600 disabled:opacity-50 text-slate-900 font-bold text-xs rounded-lg shadow-lg hover:shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Transmitting Ingestion webhook...' : 'Book Your WhatsApp Automation Demo'}
                </button>

                {/* Technical flow labels */}
                <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1"><Sliders className="h-3.5 w-3.5 text-blue-400" /> GoHighLevel Sync: Active</span>
                  <span className="flex items-center gap-1"><Bell className="h-3.5 w-3.5 text-purple-400" /> n8n Push Webhook: Active</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ==========================================
            16. FINAL CTA SECTION
           ========================================== */}
        <div className="py-16 rounded-3xl border relative overflow-hidden backdrop-blur-md text-center bg-gradient-to-tr from-[#25D366]/5 via-dark/40 to-blue-500/5 border-white/10">
          <div className="absolute top-0 right-0 h-48 w-48 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-48 w-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[10px] font-mono tracking-widest text-[#25D366] uppercase block font-bold">Start Automating</span>
            
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
              Automate Conversations. <br />Increase Revenue.
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-lg mx-auto ${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Join hundreds of growing enterprises in India and globally running direct-to-WhatsApp automation. Book a direct walkthrough today.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <a 
                href="#lead_form" 
                className="px-6 py-2.5 bg-[#25D366] hover:bg-emerald-600 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-[#25D366]/20 transition-all text-xs"
              >
                Book Demo
              </a>
              <a 
                href="#conversation_demo" 
                className={`px-6 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
                  darkMode ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08]' : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                Talk To Experts
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
