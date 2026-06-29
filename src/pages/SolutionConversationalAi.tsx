import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  ChevronUp,
  Headphones,
  Check,
  Volume2,
  Send,
  Building,
  GraduationCap,
  Home,
  ShoppingBag,
  Wrench,
  Scale
} from 'lucide-react';
import { RoutePath } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function SolutionConversationalAi({ setPath, darkMode }: any) {
  useEffect(() => {
    document.title = "Conversational AI Platform | WhatsApp, AI Calling, Cloud Telephony & RCS Messaging";
  }, []);

  // --- 1. HERO particle & connection states ---
  const [heroHoverNode, setHeroHoverNode] = useState<number | null>(null);

  // --- 2. JOURNEY automation states ---
  const [activeStep, setActiveStep] = useState(0);
  const journeySteps = [
    { title: "Lead Generated", desc: "User views ad, submits contact, or fires programmatic page webhook.", status: "Triggered" },
    { title: "WhatsApp Welcome", desc: "GrowthOS fires official Meta template with custom greeting instantly.", status: "Delivered" },
    { title: "AI Qualification", desc: "WhatsApp Chatbot or Voice Dialer engages in natural voice dialogue.", status: "Evaluating" },
    { title: "Appointment Booking", desc: "Bot matches user intent, pulling available times from GCal/Zoom.", status: "Scheduled" },
    { title: "Voice Follow-up", desc: "If appointment is missed, AI Outbound Dialer automatically re-engages.", status: "Engaged" },
    { title: "Sales Conversion", desc: "Deal status shifts to 'Won' on Kanban, firing closed webhook and CRM logs.", status: "Converted" }
  ];

  // --- 3. WHATSAPP SIMULATOR states ---
  const [whatsappChats, setWhatsappChats] = useState([
    { sender: 'bot', text: 'Hi! Welcome to GMC Healthcare. How can we assist you today?', time: '10:02 AM' }
  ]);
  const [whatsappInput, setWhatsappInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const whatsappTriggers = [
    { label: "Book a Dental Clean", reply: "Sure, let's schedule. Do you prefer morning or afternoon slots?", next: "Morning please", botReply: "Great choice! We have 10:00 AM or 11:30 AM tomorrow available. Which one works?" },
    { label: "Ask about pricing", reply: "Our cleaning procedures start from ₹1,500. Would you like to confirm a consultant slot?", next: "Yes, confirm", botReply: "Perfect! We are syncing with n8n and locking that slot into HubSpot. What is your full name?" },
    { label: "Emergency Consult", reply: "🚨 Urgent triage triggered! Dispatching our duty consultant's contact details and booking a priority line.", next: "Thank you", botReply: "You are welcome. A voice dialer will also call your number in 10 seconds to assist!" }
  ];

  const handleWhatsappSim = (replyText: string, botReplyText: string) => {
    if (isTyping) return;
    setWhatsappChats(prev => [...prev, { sender: 'user', text: replyText, time: '10:03 AM' }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setWhatsappChats(prev => [...prev, { sender: 'bot', text: botReplyText, time: '10:04 AM' }]);
    }, 1200);
  };

  // --- 4. AI OUTBOUND DIALER states ---
  const [activeVoiceScenario, setActiveVoiceScenario] = useState(0);
  const [isVoiceDialing, setIsVoiceDialing] = useState(false);
  const [voiceLogs, setVoiceLogs] = useState<string[]>([]);
  const voiceScenarios = [
    { title: "Healthcare Appointment Confirmation", lead: "Dr. Vivek (Apex Dental)", script: "Verify patient slot, check for medical pre-requisites, and update clinic PMS calendar.", responses: [
      "🔊 Outbound node: Initiating SIP trunk...",
      "📞 Ringing Dr. Vivek...",
      "🟢 Connected! Greeting: 'Hello Dr. Vivek, confirming your 3:00 PM surgery slot setup...'",
      "👤 Lead: 'Yes, that's correct. Is the dental suite sterilized?'",
      "🤖 AI Agent: 'Absolutely. The dental suite is fully prepped and synchronized via n8n workflow.'",
      "🎉 Confirmation complete! Updating clinic calendar logs."
    ]},
    { title: "Education Enrollment Qualification", lead: "Anusha G. (Global Tech)", script: "Qualify student interest score, verify monthly budget, and schedule callback with advisor.", responses: [
      "🔊 Outbound node: Connecting Voip Line...",
      "📞 Ringing Anusha G...",
      "🟢 Connected! Greeting: 'Hi Anusha! I noticed your query about our Advanced AI Developer course...'",
      "👤 Lead: 'Yes, I wanted to know if you offer installment options?'",
      "🤖 AI Agent: 'We certainly do. We offer 3-month interest-free credit terms. Shall I send the brochure?'",
      "🎉 Qualified! Sending catalog brochure over WhatsApp and logging to HubSpot."
    ]},
    { title: "Real Estate Property Follow-up", lead: "Sarah Miller (SaaS Housing)", script: "Pre-screen mortgage status, verify preference for site visit, and send digital brochure.", responses: [
      "🔊 Outbound node: Establishing trunk route...",
      "📞 Ringing Sarah M...",
      "🟢 Connected! Greeting: 'Hello Sarah, this is the automated portal for SaaS Housing...'",
      "👤 Lead: 'Hi! I'm interested in the 3BHK flat but need to check the loan pre-approval first.'",
      "🤖 AI Agent: 'No problem. I will dispatch our direct banking partner checklist right to your phone.'",
      "🎉 Visit locked! Lead marked as Hot in GoHighLevel CRM."
    ]}
  ];

  const triggerVoiceSimulation = () => {
    setIsVoiceDialing(true);
    setVoiceLogs([]);
    let step = 0;
    const interval = setInterval(() => {
      if (step < voiceScenarios[activeVoiceScenario].responses.length) {
        setVoiceLogs(prev => [...prev, voiceScenarios[activeVoiceScenario].responses[step]]);
        step++;
      } else {
        clearInterval(interval);
        setIsVoiceDialing(false);
      }
    }, 1000);
  };

  // --- 5. CLOUD TELEPHONY IVR builder states ---
  const [selectedIvrBranch, setSelectedIvrBranch] = useState<string | null>(null);

  // --- 6. RCS MESSAGING simulator states ---
  const [rcsSlide, setRcsSlide] = useState(0);
  const rcsCampaigns = [
    { title: "Special Deal Offer", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", text: "Get 40% off GrowthOS Conversational Suite this week!", button1: "Claim Voucher", button2: "Chat with Agent" },
    { title: "Live Event Invites", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80", text: "Reserve your seat for the Natton Enterprise Summit with 1-click booking.", button1: "Register Now", button2: "View Agenda" },
    { title: "Smart Catalog Commerce", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80", text: "Browse our conversational plugins and check out securely within chat.", button1: "Open Catalog", button2: "Support Chat" }
  ];
  const [rcsStatusText, setRcsStatusText] = useState("Campaign Ready to Blast");

  // --- 7. INDUSTRY USE CASES states ---
  const [activeIndustry, setActiveIndustry] = useState(0);
  const industries = [
    { name: "Healthcare", icon: Building, challenge: "High call volumes, appointment scheduling gaps, and patient follow-up fatigue.", solution: "Deploy HIPAA-compliant AI triage voice bots that instantly answer FAQ and coordinate clinics calendars in real-time.", roi: "+52% Confirmed Appointments" },
    { name: "Education", icon: GraduationCap, challenge: "Admissions teams losing leads to slow follow-up speeds on student queries.", solution: "Use 24/7 WhatsApp auto-responders that qualify course preferences, calculate budget suitability, and route hot prospects.", roi: "3.5x Enrollment Conversion" },
    { name: "Real Estate", icon: Home, challenge: "Chasing cold tire-kickers instead of qualified property buyers.", solution: "Trigger instant voice qualification calls within 45 seconds of form entry to confirm pre-approval and book site visits.", roi: "+40% Site Visit Booking Rate" },
    { name: "Retail / E-comm", icon: ShoppingBag, challenge: "Cart abandonment and lack of interactive personalized search on mobile.", solution: "Incorporate rich RCS product carousels with built-in payments and instant conversational checkout tracking.", roi: "+28% Add-to-Cart Recovery" },
    { name: "Manufacturing", icon: Wrench, challenge: "Distributors calling with manual stocking questions and long delay times.", solution: "Deploy interactive IVR systems with deep database querying to let vendors track stock catalogs autonomously.", roi: "-60% Manual Support overhead" },
    { name: "Professional Services", icon: Scale, challenge: "Manual consulting appointment scheduling and tedious document collection.", solution: "Unified booking widget linked with GoHighLevel to request attachments and confirm schedules autonomously.", roi: "98% Booking Automation Rate" }
  ];

  // --- 8. POPULAR USE CASES / n8n workflow states ---
  const [activeUseCase, setActiveUseCase] = useState(0);
  const useCases = [
    { title: "Lead Qualification", trigger: "Form Webhook Received", action: "Trigger n8n filter", bot: "Send WhatsApp Pre-qualifier chatbot", target: "Post Hot Lead to CRM" },
    { title: "Appointment Booking", trigger: "User selects schedule slot", action: "Verify Google Calendar API", bot: "Deliver custom GCal calendar invite link", target: "Shift deal stage to 'Scheduled' on Kanban" },
    { title: "Customer Support", trigger: "Inbound customer inquiry", action: "AI reads vector knowledge base", bot: "Deliver detailed markdown answer", target: "If unresolved, route to human agent" },
    { title: "Payment Reminders", trigger: "Invoice due date reached", action: "Fetch Razorpay payload", bot: "Send RCS message with payment CTA button", target: "Auto-reconcile on pay success" },
    { title: "Feedback Collection", trigger: "Deal marked as won 7 days ago", action: "Fetch customer details", bot: "Send rating feedback message", target: "Request Google Business Review if score > 4" },
    { title: "Sales Follow-Up", trigger: "Lead cold for 48 hours", action: "Trigger auto-dialer", bot: "Initiate Outbound VoIP conversation", target: "Reschedule live discovery demo" }
  ];

  // --- 9. FUNNEL OPTIMIZER states ---
  const [trafficVolume, setTrafficVolume] = useState(5000);
  const [automationEfficiency, setAutomationEfficiency] = useState(60);

  const calculateFunnel = () => {
    const conversations = Math.round(trafficVolume * 0.75);
    const qualified = Math.round(conversations * (automationEfficiency / 100));
    const appointments = Math.round(qualified * 0.4);
    const sales = Math.round(appointments * 0.35);
    const revenue = sales * 1200; // Average transaction value $1200
    return { conversations, qualified, appointments, sales, revenue };
  };

  const funnelMetrics = calculateFunnel();

  // --- 10. BOOKING FORM states ---
  const [demoFormData, setDemoFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: 'India',
    industry: 'Healthcare',
    monthlyConversations: '1,000 - 5,000',
    preferredSolution: 'WhatsApp Automation',
    message: ''
  });
  const [demoFormStatus, setDemoFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [serializedWebhook, setSerializedWebhook] = useState<any>(null);

  const handleDemoFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoFormStatus('loading');
    
    // Serialize what would actually go to n8n / GoHighLevel
    const mockPayload = {
      event: "conversational_demo_request",
      timestamp: new Date().toISOString(),
      source: "Natton Conversational AI Hub",
      data: demoFormData,
      n8n_integration: {
        workflowId: "wf_conversational_onboard_v2",
        activeNodes: ["webhook_catch", "lead_scoring_ai", "ghl_contact_update", "whatsapp_instant_welcome"]
      }
    };
    
    setSerializedWebhook(mockPayload);

    setTimeout(() => {
      setDemoFormStatus('success');
    }, 2000);
  };

  // --- 11. FAQS Accordion states (12 items) ---
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqsList = [
    { q: "How does the WhatsApp Automation connect to our existing CRM?", a: "We utilize official Meta Cloud APIs combined with custom n8n webhook triggers. When a contact interacts with our chatbot, their fields are updated inside HubSpot, Salesforce, or GoHighLevel within milliseconds." },
    { q: "What is the response latency for AI Calling Agents?", a: "By combining low-latency text-to-speech pipelines, high-speed LLMs (such as Gemini 1.5 Flash), and optimized VOIP trunks, we achieve an ultra-low latency of under 800ms, making conversations feel completely natural." },
    { q: "Can we use our own phone numbers and SIP trunks?", a: "Yes, we support native SIP trunk registration and BYOC (Bring Your Own Carrier). You can easily map your existing Twilio, Exotel, Tata Telephony, or Zadarma channels straight to our dialer." },
    { q: "Is the Conversational AI HIPAA and GDPR compliant?", a: "Absolutely. All patient interaction logs, transcriptions, and database connections are fully encrypted in transit and at rest. We sign business associate agreements (BAAs) with medical enterprises." },
    { q: "How does the n8n webhook routing work?", a: "When any conversational trigger occurs (e.g., WhatsApp reply or booking slot selected), an n8n webhook is hit instantly, processing downstream actions like sending confirmation emails, creating deals, or updating rosters." },
    { q: "What is the setup cost and monthly commitment?", a: "We offer tailored subscription pricing matching your conversation volume. Standard setups start with no long-term contracts, and include fully managed onboarding workshops." },
    { q: "How does RCS Messaging compare to traditional SMS?", a: "RCS (Rich Communication Services) turns standard SMS into an app-like interactive media center. You can include carousel cards, verified sender badges, responsive buttons, and 1-click checkout buttons, boosting conversion rates by 3x." },
    { q: "Can the AI Calling agents handle multiple languages?", a: "Yes, our voice models support automatic language detection and translation across 30+ global languages, including English, Spanish, French, Hindi, and regional dialects, automatically adjusting accents dynamically." },
    { q: "Do we need an official Meta WhatsApp Business API account?", a: "We manage the entire Meta onboarding process for you! We will guide you through business verification and register your official Meta developer credentials to ensure 100% compliance." },
    { q: "How does the calendar synchronization work?", a: "We synchronize natively with Google Calendar, Zoom, Outlook, and Microsoft Teams. The AI model checks real-time availability slots and locks appointment times directly, preventing double booking." },
    { q: "What fallback mechanisms exist if the AI agent gets stuck?", a: "If the conversation sentiment changes or the customer explicitly requests human help, the bot smoothly executes an 'Agent Handoff' action, transferring the call or chat to a live support representative with full transcript logs." },
    { q: "Is there a dashboard to monitor live conversations in real-time?", a: "Yes! GrowthOS comes with a unified chronological dashboard that shows live chat timelines, sentiment scores, and dialer recordings, giving managers complete operational control." }
  ];

  return (
    <div className="bg-[#050215] text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden text-left relative selection:bg-primary selection:text-white">
      {/* Absolute backgrounds */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-[#00C2FF]/5 rounded-full filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/15 to-[#050215]/5 rounded-full filter blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <div className="mb-8 text-xs font-mono text-gray-500 flex items-center gap-2">
          <button onClick={() => setPath('home')} className="hover:text-primary transition-colors">Home</button>
          <span>/</span>
          <span className="text-[#00C2FF]">Solutions</span>
          <span>/</span>
          <span className="text-white">Conversational AI Hub</span>
        </div>

        {/* --- SECTION 1: HERO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-mono tracking-widest uppercase">
              <Sparkles className="h-3 w-3 animate-pulse text-[#00C2FF]" /> Next-Gen Conversational SaaS
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight">
              Conversations <br />
              <span className="bg-gradient-to-r from-primary via-[#00C2FF] to-purple-500 bg-clip-text text-transparent">
                Powered By AI
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl">
              Engage, pre-qualify, and convert customers across WhatsApp, high-fidelity AI voice calling, cloud telephony, and RCS rich messaging with millisecond latencies and enterprise security.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#demo_form_section" className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-semibold hover:opacity-90 transition-all glow-primary flex items-center gap-2">
                Book Live Demo <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button 
                onClick={() => {
                  setActiveVoiceScenario(0);
                  triggerVoiceSimulation();
                }}
                className="px-6 py-3 rounded-xl border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.07] text-xs font-semibold transition-all flex items-center gap-2"
              >
                <Volume2 className="h-3.5 w-3.5 text-[#00C2FF] animate-pulse" /> Watch AI Demo
              </button>
            </div>
          </div>

          {/* Interactive 3D Nodes Communication Network Hero Graphic */}
          <div className="lg:col-span-5">
            <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.01] backdrop-blur-md overflow-hidden aspect-square flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-[#00C2FF]/10 opacity-30" />
              
              {/* Central Neural Glow */}
              <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-primary to-[#00C2FF] opacity-20 blur-3xl animate-pulse" />

              {/* Animated SVG Connections */}
              <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 400 400">
                {/* Connection lines with dash arrays */}
                <line x1="200" y1="200" x2="80" y2="100" stroke="#00C2FF" strokeWidth="1.5" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
                <line x1="200" y1="200" x2="320" y2="100" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="5,5" />
                <line x1="200" y1="200" x2="80" y2="300" stroke="#f43f5e" strokeWidth="1.5" />
                <line x1="200" y1="200" x2="320" y2="300" stroke="#22c55e" strokeWidth="1.5" />

                {/* Sub connection rings */}
                <circle cx="200" cy="200" r="130" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
                <circle cx="200" cy="200" r="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4,8" fill="none" />
              </svg>

              {/* Interactive nodes */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central GrowthOS Node */}
                <div 
                  className="absolute z-10 w-20 h-20 rounded-full bg-[#150B3F] border-2 border-primary flex flex-col items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-transform duration-300 hover:scale-110"
                  onMouseEnter={() => setHeroHoverNode(0)}
                  onMouseLeave={() => setHeroHoverNode(null)}
                >
                  <Cpu className="h-7 w-7 text-primary animate-spin-slow" />
                  <span className="text-[9px] font-mono font-bold mt-1 tracking-widest text-[#00C2FF]">OS</span>
                </div>

                {/* WhatsApp Node (Top Left) */}
                <div 
                  className="absolute top-[15%] left-[10%] w-14 h-14 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
                  onMouseEnter={() => setHeroHoverNode(1)}
                  onMouseLeave={() => setHeroHoverNode(null)}
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-[8px] font-mono mt-0.5">WhatsApp</span>
                  {heroHoverNode === 1 && (
                    <div className="absolute top-16 bg-[#110C29] border border-white/10 p-2 rounded text-[9px] font-mono w-28 z-20">
                      Auto-responders, active catalog & payments.
                    </div>
                  )}
                </div>

                {/* AI Voice Node (Top Right) */}
                <div 
                  className="absolute top-[15%] right-[10%] w-14 h-14 rounded-xl bg-purple-950/40 border border-purple-500/40 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
                  onMouseEnter={() => setHeroHoverNode(2)}
                  onMouseLeave={() => setHeroHoverNode(null)}
                >
                  <Phone className="h-5 w-5 text-purple-400" />
                  <span className="text-[8px] font-mono mt-0.5">AI Voice</span>
                  {heroHoverNode === 2 && (
                    <div className="absolute top-16 bg-[#110C29] border border-white/10 p-2 rounded text-[9px] font-mono w-28 z-20">
                      Outbound/Inbound dialers under 800ms.
                    </div>
                  )}
                </div>

                {/* Cloud Telephony Node (Bottom Left) */}
                <div 
                  className="absolute bottom-[15%] left-[10%] w-14 h-14 rounded-xl bg-blue-950/40 border border-blue-500/40 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
                  onMouseEnter={() => setHeroHoverNode(3)}
                  onMouseLeave={() => setHeroHoverNode(null)}
                >
                  <Headphones className="h-5 w-5 text-blue-400" />
                  <span className="text-[8px] font-mono mt-0.5">Telephony</span>
                  {heroHoverNode === 3 && (
                    <div className="absolute bottom-16 bg-[#110C29] border border-white/10 p-2 rounded text-[9px] font-mono w-28 z-20">
                      IVR trees, routing & call recording.
                    </div>
                  )}
                </div>

                {/* RCS Messaging Node (Bottom Right) */}
                <div 
                  className="absolute bottom-[15%] right-[10%] w-14 h-14 rounded-xl bg-pink-950/40 border border-pink-500/40 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
                  onMouseEnter={() => setHeroHoverNode(4)}
                  onMouseLeave={() => setHeroHoverNode(null)}
                >
                  <Smartphone className="h-5 w-5 text-pink-400" />
                  <span className="text-[8px] font-mono mt-0.5">RCS Suite</span>
                  {heroHoverNode === 4 && (
                    <div className="absolute bottom-16 bg-[#110C29] border border-white/10 p-2 rounded text-[9px] font-mono w-28 z-20">
                      Rich carousels, buttons & analytics.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: BENTO GRID COMMUNICATION ECOSYSTEM --- */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-mono text-[#00C2FF] uppercase tracking-widest">Core Channel Ecosystem</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight">
              One Platform. Four Communication Channels.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Stop juggling 4 separate vendors. Natton unifies your communication stack with instant database updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: WhatsApp */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between h-56">
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-emerald-500/10 rounded-full filter blur-xl group-hover:bg-emerald-500/20 transition-all" />
              <div>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">WhatsApp Automation</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Deliver interactive catalog messages, schedule targeted broadcast campaigns, and configure dynamic FAQ chatbots.
                </p>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 font-semibold tracking-wider">3x engagement rate</span>
            </div>

            {/* Card 2: AI Voice Calling */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between h-56">
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-purple-500/10 rounded-full filter blur-xl group-hover:bg-purple-500/20 transition-all" />
              <div>
                <div className="h-10 w-10 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">AI Calling Agents</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Highly lifelike inbound and outbound voice conversation agents running under 800ms latency to handle appointments.
                </p>
              </div>
              <span className="text-[9px] font-mono text-purple-400 font-semibold tracking-wider">24×7 autonomous calling</span>
            </div>

            {/* Card 3: Cloud Telephony */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between h-56">
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-blue-500/10 rounded-full filter blur-xl group-hover:bg-blue-500/20 transition-all" />
              <div>
                <div className="h-10 w-10 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
                  <Headphones className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">Cloud Telephony</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Interactive multi-level voice response (IVR) menus, smart routing pipelines, and redundant SIP registration.
                </p>
              </div>
              <span className="text-[9px] font-mono text-blue-400 font-semibold tracking-wider">99.99% uptime SIP logs</span>
            </div>

            {/* Card 4: RCS Messaging */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:border-pink-500/40 hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between h-56">
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-pink-500/10 rounded-full filter blur-xl group-hover:bg-pink-500/20 transition-all" />
              <div>
                <div className="h-10 w-10 rounded-lg bg-pink-500/15 flex items-center justify-center text-pink-400 mb-4 border border-pink-500/20">
                  <Smartphone className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">RCS Messaging</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Replace traditional SMS with interactive rich media cards, responsive slider carousels, and verified badges.
                </p>
              </div>
              <span className="text-[9px] font-mono text-pink-400 font-semibold tracking-wider">3x higher conversion</span>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: JOURNEY STEPS FLOW --- */}
        <div className="mb-28 p-8 rounded-2xl border border-white/10 bg-white/[0.01] backdrop-blur-md">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Fully Managed Automation Pipelines</span>
            <h3 className="text-2xl font-bold font-display mt-1">Customer Journey Automation</h3>
            <p className="text-xs text-gray-400 mt-0.5">Click each milestone stage below to trace the digital trigger lifecycle:</p>
          </div>

          {/* Interactive Stepper Row */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
            {/* Connection background bar for desktop */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-white/5 z-0" />
            <div 
              className="hidden md:block absolute top-[28px] left-[10%] h-0.5 bg-gradient-to-r from-primary to-[#00C2FF] transition-all duration-500 z-0"
              style={{ width: `${(activeStep / 5) * 80}%` }}
            />

            {journeySteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div 
                  key={idx} 
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border cursor-pointer relative z-10 transition-all flex flex-col items-center text-center ${
                    isSelected 
                      ? 'border-primary bg-primary/10 scale-105 shadow-[0_0_20px_rgba(139,92,246,0.2)]' 
                      : 'border-white/[0.05] bg-[#0c0724] hover:border-white/20'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-mono font-bold mb-2 transition-colors ${
                    isSelected ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <h4 className="text-[11px] font-bold tracking-tight text-white">{step.title}</h4>
                  <span className="text-[8px] font-mono text-emerald-400 mt-1 uppercase tracking-wider">{step.status}</span>
                </div>
              );
            })}
          </div>

          {/* Stepper active details info panel */}
          <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-primary uppercase font-bold tracking-widest">Active Automation Trigger</span>
              <h4 className="text-sm font-bold font-display text-white">{journeySteps[activeStep].title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">{journeySteps[activeStep].desc}</p>
            </div>
            <div className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] whitespace-nowrap">
              n8n Node Active: OK ✓
            </div>
          </div>
        </div>

        {/* --- SECTION 4: WHATSAPP CHAT SIMULATOR & WORKFLOW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          <div className="space-y-6">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              WhatsApp Business <br />Automation Suite
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Equip your sales team with robust template catalogs, opt-in checkout forms, and AI auto-responders that sync conversations instantly back to GoHighLevel CRM pipelines.
            </p>
            <ul className="space-y-3">
              {["Interactive QA Chatbots", "Personalized Broadcast Lists", "Auto-reconciled catalog cards", "Instant calendar-booking webhooks"].map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setPath('contact')} className="px-5 py-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold transition-all">
              Explore WhatsApp Automation
            </button>
          </div>

          {/* Interactive Chat Simulator Screen Mockup */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold font-mono text-emerald-400">WhatsApp Live Chatbot Simulator</span>
              </div>
              <span className="text-[10px] font-mono text-gray-500">Official Cloud API API</span>
            </div>

            {/* Chat message thread container */}
            <div className="h-60 rounded-xl bg-black/40 border border-white/[0.05] p-4 overflow-y-auto space-y-3 flex flex-col justify-end">
              {whatsappChats.map((chat, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col max-w-[80%] ${chat.sender === 'user' ? 'align-self-end ml-auto items-end' : 'align-self-start mr-auto items-start'}`}
                >
                  <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                    chat.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {chat.text}
                  </div>
                  <span className="text-[8px] text-gray-500 mt-1">{chat.time}</span>
                </div>
              ))}
              
              {isTyping && (
                <div className="align-self-start mr-auto flex items-center gap-1 bg-white/10 p-2.5 rounded-xl text-xs text-gray-400">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce [animation-delay:0.2s]">●</span>
                  <span className="animate-bounce [animation-delay:0.4s]">●</span>
                  <span className="text-[9px] font-mono ml-1">AI bot typing...</span>
                </div>
              )}
            </div>

            {/* Prompt trigger selector inputs */}
            <div className="mt-4 space-y-2">
              <span className="text-[9px] font-mono text-gray-500 uppercase block">Simulate Customer Queries:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {whatsappTriggers.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => handleWhatsappSim(t.reply, t.botReply)}
                    disabled={isTyping}
                    className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-left text-[10px] transition-all text-gray-300 hover:text-white"
                  >
                    💬 "{t.label}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 5: AI CALLING AGENTS WITH VOICE WAVE ANIMATION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          {/* Dialer Simulator Widget */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] backdrop-blur-md order-last lg:order-first">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <div className="flex items-center gap-2">
                <Phone className={`h-4 w-4 ${isVoiceDialing ? 'text-purple-400 animate-pulse' : 'text-gray-500'}`} />
                <span className="text-xs font-bold font-mono text-purple-400">AI VoIP Outbound Dialer</span>
              </div>
              {isVoiceDialing && <span className="text-[9px] font-mono text-emerald-400">Active Call (80ms SIP delay)</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
              {voiceScenarios.map((sc, idx) => (
                <button
                  key={idx}
                  onClick={() => !isVoiceDialing && setActiveVoiceScenario(idx)}
                  disabled={isVoiceDialing}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeVoiceScenario === idx 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.04]'
                  }`}
                >
                  <h4 className="text-[10px] font-bold text-white leading-tight">{sc.title}</h4>
                  <p className="text-[8px] text-gray-500 mt-1">Lead: {sc.lead}</p>
                </button>
              ))}
            </div>

            {/* Simulated Live Terminal Waveform & Logs */}
            <div className="space-y-3">
              {/* Voice Wave Animation */}
              <div className="h-16 rounded-xl bg-black/50 border border-white/[0.05] flex items-center justify-center gap-1 overflow-hidden relative">
                {isVoiceDialing ? (
                  Array.from({ length: 32 }).map((_, i) => {
                    const duration = 0.5 + Math.random() * 1.5;
                    const height = 10 + Math.random() * 40;
                    return (
                      <div 
                        key={i} 
                        className="w-[3px] bg-gradient-to-t from-primary to-[#00C2FF] rounded-full"
                        style={{ 
                          height: `${height}px`,
                          animation: `wave ${duration}s ease-in-out infinite alternate`
                        }} 
                      />
                    );
                  })
                ) : (
                  <div className="text-xs font-mono text-gray-500 flex items-center gap-1.5">
                    <Volume2 className="h-4 w-4 animate-bounce" /> Waveform Idle. Trigger simulation below.
                  </div>
                )}
              </div>

              {/* Logs output console */}
              <div className="h-40 rounded-xl bg-black/60 border border-white/[0.05] p-3 overflow-y-auto font-mono text-[9px] leading-relaxed text-gray-300">
                {voiceLogs.map((log, i) => (
                  <p key={i} className={log.startsWith('🤖') ? 'text-purple-300' : log.startsWith('👤') ? 'text-[#00C2FF]' : ''}>
                    {log}
                  </p>
                ))}
                {voiceLogs.length === 0 && (
                  <p className="text-gray-500 text-center py-12">Click "Simulate Outbound call" to trigger voice pipelines.</p>
                )}
              </div>

              <button 
                onClick={triggerVoiceSimulation}
                disabled={isVoiceDialing}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-primary text-white text-xs font-semibold rounded-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5" />
                {isVoiceDialing ? 'VoIP Dialer Outbound is Active...' : 'Simulate Outbound AI Dialer'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Phone className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              Autonomous AI <br />Calling Agents
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Conduct lifelike outbound lead qualifying calls and handle incoming customer service questions without waiting on hold. Direct calendar bookings and post call logs to n8n triggers in under 2 seconds.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
              {["Inbound AI Voice Assistance", "Outbound Campaign Dialer", "Collections & Reminders", "Calendar Sync & Scheduling"].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-purple-400" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setPath('contact')} className="px-5 py-2.5 rounded-lg border border-purple-500/30 bg-purple-500/5 text-purple-400 hover:bg-purple-500/10 text-xs font-semibold transition-all">
              Explore AI Calling
            </button>
          </div>
        </div>

        {/* --- SECTION 6: CLOUD TELEPHONY (IVR TREE SIMULATOR) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          <div className="space-y-6">
            <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Headphones className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              Cloud Telephony & <br />Interactive IVR
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Construct high-performance call routing flow trees using our integrated drag-and-drop workflow interfaces. Direct calls to sales, support, or automated AI nodes with detailed multi-agent telemetry.
            </p>
            <ul className="space-y-3">
              {["Dynamic multi-level IVR menus", "Enterprise-grade Call Recording", "Multi-Agent Queue Analytics", "Missed-Call Auto Text back triggers"].map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setPath('contact')} className="px-5 py-2.5 rounded-lg border border-blue-500/30 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10 text-xs font-semibold transition-all">
              Explore Cloud Telephony
            </button>
          </div>

          {/* Call Center / IVR Visual Chart */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <span className="text-xs font-bold font-mono text-blue-400">Interactive Call Center IVR builder</span>
              <span className="text-[10px] font-mono text-gray-500">Live Workspace Node Chart</span>
            </div>

            {/* Interactive IVR Flow Node Map */}
            <div className="space-y-4 relative">
              {/* Root node */}
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-center max-w-xs mx-auto relative">
                <span className="text-[8px] font-mono text-blue-400 block uppercase tracking-wider">Trigger 1</span>
                <p className="text-xs font-bold">Incoming Customer Call Node</p>
              </div>

              {/* Connecting line */}
              <div className="w-0.5 h-6 bg-blue-500/40 mx-auto" />

              {/* Middle node */}
              <div className="p-3 rounded-lg border border-blue-500/30 bg-blue-500/5 text-center max-w-sm mx-auto">
                <p className="text-xs text-gray-300">"Press 1 for Sales, Press 2 for Support, or hold for AI helper"</p>
              </div>

              {/* Split connecting lines */}
              <div className="grid grid-cols-3 max-w-md mx-auto text-center">
                <div className="border-t-2 border-r-2 border-blue-500/20 h-6 rounded-tr-xl" />
                <div className="border-t-2 h-6 border-blue-500/20" />
                <div className="border-t-2 border-l-2 border-blue-500/20 h-6 rounded-tl-xl" />
              </div>

              {/* Branch options */}
              <div className="grid grid-cols-3 gap-2 text-center max-w-md mx-auto">
                <div 
                  onClick={() => setSelectedIvrBranch('sales')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    selectedIvrBranch === 'sales' ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/5 bg-white/[0.01]'
                  }`}
                >
                  <h4 className="text-[10px] font-bold text-white">Option 1: Sales</h4>
                  <p className="text-[8px] text-gray-500 mt-1">Routes call to duty sales pipeline</p>
                </div>

                <div 
                  onClick={() => setSelectedIvrBranch('support')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    selectedIvrBranch === 'support' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-white/[0.01]'
                  }`}
                >
                  <h4 className="text-[10px] font-bold text-white">Option 2: Support</h4>
                  <p className="text-[8px] text-gray-500 mt-1">Routes call to ticketing desk</p>
                </div>

                <div 
                  onClick={() => setSelectedIvrBranch('ai')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    selectedIvrBranch === 'ai' ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 bg-white/[0.01]'
                  }`}
                >
                  <h4 className="text-[10px] font-bold text-white">Option 3: AI Desk</h4>
                  <p className="text-[8px] text-gray-500 mt-1">Triggers voice agent triage</p>
                </div>
              </div>

              {/* Branch outcome readout */}
              <AnimatePresence mode="wait">
                {selectedIvrBranch && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="p-3 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-center max-w-sm mx-auto"
                  >
                    {selectedIvrBranch === 'sales' && (
                      <span className="text-emerald-400">🔥 Webhook dispatched to GHL pipeline! Ringing sales team...</span>
                    )}
                    {selectedIvrBranch === 'support' && (
                      <span className="text-blue-300">🎫 Ticket registered inside HubSpot desk. Queue placement: #1.</span>
                    )}
                    {selectedIvrBranch === 'ai' && (
                      <span className="text-purple-300">🤖 Outbound Voice Assistant triggered! SIP connection established.</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- SECTION 7: RCS MESSAGING SMART PHONE MOCKUP --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          {/* Bezel-less phone CSS mockup with slider carousels inside */}
          <div className="flex justify-center order-last lg:order-first">
            <div className="w-[280px] h-[520px] rounded-[36px] border-[8px] border-[#1b1731] bg-black shadow-[0_0_40px_rgba(139,92,246,0.15)] relative overflow-hidden flex flex-col justify-between p-3">
              {/* Phone speaker notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-[#1b1731] rounded-b-xl z-20" />

              {/* Mobile Status Bar */}
              <div className="flex justify-between items-center px-4 pt-1.5 pb-2 text-[8px] font-mono text-gray-500 relative z-10">
                <span>RCS LTE</span>
                <span>10:45 AM</span>
              </div>

              {/* RCS Mock Chat Thread */}
              <div className="flex-1 bg-[#090616] rounded-2xl p-3 flex flex-col justify-between overflow-hidden">
                {/* Chat header info */}
                <div className="flex items-center gap-2 pb-2 border-b border-white/5 mb-2">
                  <div className="h-5 w-5 rounded-full bg-[#1b113a] border border-[#00C2FF]/30 flex items-center justify-center text-[8px] text-white font-bold">N</div>
                  <div>
                    <h5 className="text-[9px] font-bold leading-tight flex items-center gap-1">
                      Natton Digital <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />
                    </h5>
                    <span className="text-[7px] text-gray-500 block">Verified Business RCS</span>
                  </div>
                </div>

                {/* Message body with slider card */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[9px] leading-relaxed max-w-[85%] rounded-tl-none">
                    Thanks for checking out our new Conversational AI suite! Swipe right to inspect catalog options:
                  </div>

                  {/* Smart RCS Carousel slider component */}
                  <div className="rounded-xl border border-white/10 bg-[#120e29] overflow-hidden max-w-[90%] mx-auto shadow-md">
                    <img 
                      src={rcsCampaigns[rcsSlide].image} 
                      className="w-full h-24 object-cover" 
                      alt="RCS asset" 
                    />
                    <div className="p-2.5 space-y-1">
                      <h6 className="text-[10px] font-bold text-white">{rcsCampaigns[rcsSlide].title}</h6>
                      <p className="text-[8px] text-gray-400 leading-relaxed">{rcsCampaigns[rcsSlide].text}</p>
                      
                      <div className="grid grid-cols-2 gap-1.5 pt-2">
                        <button 
                          onClick={() => setRcsStatusText(`Dispatched Trigger: "${rcsCampaigns[rcsSlide].button1}"`)}
                          className="py-1 bg-primary text-white text-[8px] font-bold rounded"
                        >
                          {rcsCampaigns[rcsSlide].button1}
                        </button>
                        <button 
                          onClick={() => setRcsStatusText(`Dispatched Trigger: "${rcsCampaigns[rcsSlide].button2}"`)}
                          className="py-1 bg-white/10 text-white text-[8px] font-bold rounded"
                        >
                          {rcsCampaigns[rcsSlide].button2}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Carousel navigation buttons inside the phone screen */}
                  <div className="flex justify-center gap-2">
                    {rcsCampaigns.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setRcsSlide(i)}
                        className={`h-1.5 w-1.5 rounded-full transition-all ${rcsSlide === i ? 'bg-[#00C2FF] w-3' : 'bg-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Message sender text field */}
                <div className="border-t border-white/5 pt-2 mt-2 flex items-center justify-between text-[8px] text-gray-400">
                  <span>Press keys to test click buttons...</span>
                  <div className="bg-[#00C2FF]/10 text-[#00C2FF] font-mono px-1.5 py-0.5 rounded text-[7px] uppercase font-bold">
                    Active State
                  </div>
                </div>
              </div>

              {/* Status report bubble below inside mockup phone bottom margin */}
              <div className="text-[7px] font-mono text-center text-gray-500 py-1 border-t border-white/5">
                {rcsStatusText}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-9 w-9 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20">
              <Smartphone className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              Next-Generation <br />RCS Rich Messaging
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Step beyond standard SMS character limits. Deliver vibrant rich-media marketing offers with high-resolution imagery, direct action buttons, secure OTP verification codes, and carousel selections that map to interactive transactions.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
              {["Interactive product carousels", "Verified Brand Sender mark", "Inline purchase checkout", "Real-time delivery receipts"].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-pink-400" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setPath('contact')} className="px-5 py-2.5 rounded-lg border border-pink-500/30 bg-pink-500/5 text-pink-400 hover:bg-pink-500/10 text-xs font-semibold transition-all">
              Explore RCS Messaging
            </button>
          </div>
        </div>

        {/* --- SECTION 8: INDUSTRY USE CASES (INTERACTIVE CARDS) --- */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-mono text-[#00C2FF] uppercase tracking-widest">Enterprise Alignment</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight">
              Built For Every Industry
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Select your specific sector below to examine tailored conversational flows and proven ROI highlights.
            </p>
          </div>

          {/* Industry Row Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {industries.map((ind, i) => {
              const IconComp = ind.icon;
              const isSelected = activeIndustry === i;
              return (
                <div 
                  key={i}
                  onClick={() => setActiveIndustry(i)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                    isSelected 
                      ? 'border-[#00C2FF] bg-[#00C2FF]/10 text-[#00C2FF]' 
                      : 'border-white/5 bg-white/[0.01] text-gray-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <IconComp className="h-6 w-6 mb-2" />
                  <span className="text-xs font-bold font-display">{ind.name}</span>
                </div>
              );
            })}
          </div>

          {/* Active Industry details container */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#00C2FF]">
                Selected Case: {industries[activeIndustry].name} Conversational Automation
              </span>
              <div className="space-y-1">
                <h4 className="text-xs font-mono text-gray-500 uppercase">Primary Challenge:</h4>
                <p className="text-xs text-gray-300">{industries[activeIndustry].challenge}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-mono text-primary uppercase">Automation Strategy:</h4>
                <p className="text-xs text-gray-300">{industries[activeIndustry].solution}</p>
              </div>
            </div>

            <div className="md:col-span-4 p-5 rounded-xl bg-[#0e0729] border border-white/[0.05] text-center space-y-1.5">
              <span className="text-[8px] font-mono text-[#00C2FF] uppercase tracking-wider block">Proven Industry Impact KPI</span>
              <h5 className="text-xl sm:text-2xl font-bold text-emerald-400 font-display">
                {industries[activeIndustry].roi}
              </h5>
              <p className="text-[9px] text-gray-500 leading-tight">Verified across 40+ production customer deployments</p>
            </div>
          </div>
        </div>

        {/* --- SECTION 9: POPULAR USE CASES (INTERACTIVE WORKFLOW NODES MAP) --- */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-mono text-[#00C2FF] uppercase tracking-widest">Automation Modules</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight">
              Popular Use Cases
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Select a popular workflow category to inspect its live programmatic n8n-style workflow node wiring.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left sidebar selector tabs */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              {useCases.map((uc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveUseCase(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    activeUseCase === idx 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.04]'
                  }`}
                >
                  <h4 className="text-xs font-bold text-white">{uc.title}</h4>
                </button>
              ))}
            </div>

            {/* Right workflow node map viewer container */}
            <div className="lg:col-span-8 p-6 rounded-2xl border border-white/10 bg-white/[0.01] backdrop-blur-md flex flex-col justify-between h-[360px]">
              <div>
                <span className="text-[9px] font-mono text-[#00C2FF] uppercase block mb-1">
                  Active Workflow Node Connection Tree: {useCases[activeUseCase].title}
                </span>

                {/* Flow diagrams */}
                <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center text-center mt-6">
                  {/* Step 1: Trigger */}
                  <div className="md:col-span-2 p-3 rounded-xl border border-white/5 bg-black/40 text-[10px] text-left">
                    <span className="text-[8px] font-mono text-purple-400 block uppercase font-bold mb-1">1. TRIGGER</span>
                    <p className="font-bold">{useCases[activeUseCase].trigger}</p>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center text-primary font-bold text-lg">→</div>

                  {/* Step 2: Webhook/Action */}
                  <div className="md:col-span-2 p-3 rounded-xl border border-white/5 bg-black/40 text-[10px] text-left">
                    <span className="text-[8px] font-mono text-[#00C2FF] block uppercase font-bold mb-1">2. ACTION NODE</span>
                    <p className="font-bold">{useCases[activeUseCase].action}</p>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center text-[#00C2FF] font-bold text-lg">→</div>

                  {/* Step 3: Action Target */}
                  <div className="md:col-span-2 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-[10px] text-left">
                    <span className="text-[8px] font-mono text-emerald-400 block uppercase font-bold mb-1">3. DELIVER RESPONSE</span>
                    <p className="font-bold text-emerald-300">{useCases[activeUseCase].bot}</p>
                  </div>
                </div>
              </div>

              {/* CRM output summary banner */}
              <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-400 gap-4">
                <span>Outcome Target: {useCases[activeUseCase].target}</span>
                <span className="text-emerald-400 font-bold">Status: Synchronized with GHL & HubSpot ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 10: CONVERSATION TO CONVERSION FUNNEL OPTIMIZER --- */}
        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.01] backdrop-blur-md mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono text-primary uppercase tracking-widest">ROI Calculator Matrix</span>
              <h2 className="text-3xl font-bold font-display tracking-tight text-white">
                Conversation To Conversion
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Tune the traffic and automation parameters below to witness how Natton Digital shifts raw audience queries into automated qualified sales revenue:
              </p>

              {/* Sliders */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Monthly Traffic Visitors:</span>
                    <strong className="text-[#00C2FF]">{trafficVolume.toLocaleString()} visitors</strong>
                  </div>
                  <input 
                    type="range" 
                    min="1000" 
                    max="50000" 
                    step="1000" 
                    value={trafficVolume} 
                    onChange={(e) => setTrafficVolume(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">AI Conversion Efficiency (%):</span>
                    <strong className="text-[#00C2FF]">{automationEfficiency}% Qualification</strong>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="95" 
                    step="5" 
                    value={automationEfficiency} 
                    onChange={(e) => setAutomationEfficiency(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Funnel Metrics Output Panel */}
            <div className="p-6 rounded-xl bg-[#0b0521] border border-white/[0.05] space-y-4">
              <h3 className="text-xs font-bold font-mono text-primary uppercase tracking-wider text-center mb-2">Simulated Outflow Yield</h3>
              
              <div className="space-y-2.5">
                {[
                  { label: "1. Raw Traffic", value: trafficVolume.toLocaleString(), subtitle: "Site & Ad Clicks" },
                  { label: "2. Active Conversations", value: funnelMetrics.conversations.toLocaleString(), subtitle: "75% Engagement baseline" },
                  { label: "3. Qualified Leads", value: funnelMetrics.qualified.toLocaleString(), subtitle: `${automationEfficiency}% target conversion` },
                  { label: "4. Appointments Booked", value: funnelMetrics.appointments.toLocaleString(), subtitle: "40% scheduling commitment" },
                  { label: "5. Closed Wins (Revenue)", value: `${funnelMetrics.sales.toLocaleString()} ($${funnelMetrics.revenue.toLocaleString()})`, subtitle: "35% sales conversions @ $1200 ACV" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded bg-black/30 border border-white/[0.03]">
                    <div>
                      <h5 className="text-[10px] font-bold text-gray-400">{item.label}</h5>
                      <span className="text-[8px] text-gray-500 block">{item.subtitle}</span>
                    </div>
                    <strong className="text-xs text-white font-mono">{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 11: INFINITE LOGO MARQUEE --- */}
        <div className="mb-28 text-center">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-6">Integrates Natively With</span>
          <div className="overflow-hidden relative w-full h-12 flex items-center bg-[#09061c]/60 rounded-xl border border-white/[0.05]">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050215] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050215] to-transparent z-10" />
            
            {/* Seamless text loop representing integrators */}
            <div className="flex gap-12 text-sm font-mono tracking-widest text-gray-400 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
              {["GoHighLevel", "HubSpot", "Salesforce", "Google Calendar", "Zoom", "WhatsApp API", "n8n", "Meta", "Razorpay", "GoHighLevel", "HubSpot", "Salesforce", "Google Calendar", "Zoom", "WhatsApp API", "n8n", "Meta", "Razorpay"].map((logo, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#00C2FF]" /> {logo}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- SECTION 12: CORE PERFORMANCE COMPARISON MATRIX --- */}
        <div className="mb-28">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono text-[#00C2FF] uppercase tracking-widest">Platform Battlecard</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display">Why Businesses Choose Natton Digital</h2>
            <p className="text-xs text-gray-400">See how we stack up against traditional customer messaging legacy channels:</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.01]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-[10px] font-mono text-gray-400">
                  <th className="p-4 uppercase">Core Capabilities</th>
                  <th className="p-4 uppercase text-[#00C2FF] font-bold">Natton Digital Platform</th>
                  <th className="p-4 uppercase">ManyChat Suite</th>
                  <th className="p-4 uppercase">Intercom Hub</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-white/5">
                {[
                  { feat: "Integrated Omnichannel (WhatsApp, RCS, Voice, Telephony)", nat: true, many: false, int: false },
                  { feat: "Sub-800ms Voice Agent Low Latency", nat: true, many: false, int: false },
                  { feat: "Visual IVR Tree Mapping & Telephony Logs", nat: true, many: false, int: true },
                  { feat: "Full GoHighLevel & HubSpot webhook synchronization", nat: true, many: true, int: true },
                  { feat: "Interactive RCS commerce carousels", nat: true, many: false, int: false },
                  { feat: "Enterprise HIPAA & BAA Compliance logs", nat: true, many: false, int: true }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.01]">
                    <td className="p-4 text-gray-300 font-semibold">{row.feat}</td>
                    <td className="p-4 text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="h-4 w-4" /> Yes
                    </td>
                    <td className="p-4 text-gray-500">
                      {row.many ? <span className="text-emerald-500/80">Partial</span> : "No"}
                    </td>
                    <td className="p-4 text-gray-500">
                      {row.int ? <span className="text-emerald-500/80">Partial</span> : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- SECTION 13: 12 ACCORDION FAQS --- */}
        <div className="mb-28 max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Client Knowledge Base</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400">Find direct technical answers regarding integration protocols, HIPAA compliance, and setup schedules:</p>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 flex justify-between items-center text-left text-xs font-bold font-display text-white hover:bg-white/[0.02]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-[#00C2FF]" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 pt-0 border-t border-white/[0.05] text-xs text-gray-400 leading-relaxed bg-black/30">
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

        {/* --- SECTION 14: WORKSHOP BOOKING FORM --- */}
        <div id="demo_form_section" className="p-6 sm:p-10 rounded-2xl border border-white/10 bg-[#0e0729]/80 backdrop-blur-md max-w-3xl mx-auto mb-28">
          {demoFormStatus === 'success' ? (
            <div className="text-center py-10 space-y-4">
              <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-3xl">✓</div>
              <h3 className="text-lg font-bold font-display">Demonstration Webhook Dispatched Successfully</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                We have processed your CRM details into our active GHL & HubSpot pipeline. A real-time n8n SMS notification trigger was compiled. See serialized webhook payload below:
              </p>

              <div className="p-4 rounded-xl bg-black/60 border border-white/5 text-left font-mono text-[9px] leading-relaxed max-w-lg mx-auto overflow-x-auto text-gray-300">
                <span className="text-emerald-400"># WEBHOOK DISPATCH LOG: payload.json</span>
                <pre className="mt-2">{JSON.stringify(serializedWebhook, null, 2)}</pre>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDemoFormSubmit} className="space-y-6 text-left">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono text-primary uppercase block tracking-widest">Connect to GoHighLevel</span>
                <h3 className="text-xl sm:text-2xl font-bold font-display">Book A Conversational AI Demo</h3>
                <p className="text-xs text-gray-400">Coordinate a direct design session with our systems architect to test calling trunks.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-gray-500">Full Name</label>
                  <input
                    type="text"
                    required
                    value={demoFormData.fullName}
                    onChange={(e) => setDemoFormData({ ...demoFormData, fullName: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-primary"
                    placeholder="Anusha G."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-gray-500">Company Name</label>
                  <input
                    type="text"
                    required
                    value={demoFormData.company}
                    onChange={(e) => setDemoFormData({ ...demoFormData, company: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-primary"
                    placeholder="GMC Healthcare"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-gray-500">Business Email</label>
                  <input
                    type="email"
                    required
                    value={demoFormData.email}
                    onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-primary"
                    placeholder="anusha.gmc@gmail.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-gray-500">Phone Mobile (with Country Code)</label>
                  <input
                    type="tel"
                    required
                    value={demoFormData.phone}
                    onChange={(e) => setDemoFormData({ ...demoFormData, phone: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-primary"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-gray-500">Country Location</label>
                  <input
                    type="text"
                    required
                    value={demoFormData.country}
                    onChange={(e) => setDemoFormData({ ...demoFormData, country: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-primary"
                    placeholder="India"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-gray-500">Industry Sector</label>
                  <select
                    value={demoFormData.industry}
                    onChange={(e) => setDemoFormData({ ...demoFormData, industry: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-[#0e0729] text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Retail / E-comm">Retail / E-comm</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Professional Services">Professional Services</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-gray-500">Monthly Chat Volume</label>
                  <select
                    value={demoFormData.monthlyConversations}
                    onChange={(e) => setDemoFormData({ ...demoFormData, monthlyConversations: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-[#0e0729] text-white focus:outline-none focus:border-primary"
                  >
                    <option value="< 1,000">Less than 1,000</option>
                    <option value="1,000 - 5,000">1,000 - 5,000</option>
                    <option value="5,000 - 20,000">5,000 - 20,000</option>
                    <option value="> 20,000">Over 20,000 / mo</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-gray-500">Preferred Conversational Solution</label>
                <select
                  value={demoFormData.preferredSolution}
                  onChange={(e) => setDemoFormData({ ...demoFormData, preferredSolution: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-[#0e0729] text-white focus:outline-none focus:border-primary"
                >
                  <option value="WhatsApp Automation">WhatsApp Automation Suite</option>
                  <option value="AI Calling Agents">Outbound/Inbound AI Voice Agent</option>
                  <option value="Cloud Telephony / IVR">Cloud Telephony Trunks & IVR Menu</option>
                  <option value="RCS Messaging Suite">RCS Rich Messaging Campaign Blast</option>
                  <option value="Full Integrated Omnichannel">Full Integrated Omnichannel Workspace</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-gray-500">Brief Message Requirements</label>
                <textarea
                  value={demoFormData.message}
                  onChange={(e) => setDemoFormData({ ...demoFormData, message: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-primary h-20 resize-none"
                  placeholder="Describe your active calling triggers, existing CRM, and desired timeline..."
                />
              </div>

              <button 
                type="submit" 
                disabled={demoFormStatus === 'loading'}
                className="w-full py-3 bg-gradient-to-r from-primary via-[#00C2FF] to-purple-600 text-white text-xs font-semibold rounded-lg hover:opacity-95 transition-all glow-primary flex items-center justify-center gap-1.5"
              >
                {demoFormStatus === 'loading' ? 'Serializing n8n payloads...' : 'Request Campaign Growth Strategy Blueprint'}
              </button>
            </form>
          )}
        </div>

        {/* --- SECTION 15: FINAL CTA OUTRO WITH AN ACTIVE WAVE/NEURAL OVERLAY --- */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-[#170530] via-[#040217] to-[#04092b] text-center relative overflow-hidden">
          {/* Animated mesh overlay lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-mono text-[#00C2FF] uppercase tracking-widest">Enterprise Acceleration</span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight leading-tight">
              Transform Conversations <br />Into Revenue
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
              Automate customer interactions, qualify hot opportunities, and synchronize unified sales logs natively with Natton's elite platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="#demo_form_section" className="px-6 py-3 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-opacity-90 transition-all shadow-md">
                Book Demo
              </a>
              <button 
                onClick={() => {
                  const el = document.getElementById('demo_form_section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] text-xs font-semibold transition-all"
              >
                Talk To Experts
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom keyframes injection inside component */}
      <style>{`
        @keyframes wave {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1.2); }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
