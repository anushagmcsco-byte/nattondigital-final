import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  Search, 
  FileText, 
  CheckCircle, 
  Layers, 
  Workflow, 
  BarChart2, 
  Activity, 
  ArrowRight, 
  Play, 
  Zap, 
  Star, 
  MessageSquare, 
  Users, 
  Globe, 
  Target, 
  ChevronRight, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Send,
  Sliders,
  DollarSign,
  Plus,
  ArrowDownRight,
  RefreshCw,
  Clock,
  Phone,
  PhoneCall,
  PhoneIncoming,
  Smartphone,
  Shield,
  Briefcase,
  Share2,
  Lock,
  ArrowRightLeft,
  X,
  Volume2,
  Mic,
  Bookmark
} from 'lucide-react';
import { RoutePath } from '../types';

export default function ProductBusinessOs({ setPath }: { setPath: (path: RoutePath) => void }) {
  useEffect(() => {
    document.title = "BusinessOS™ | Omnichannel Communication & Customer Engagement Platform";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ==========================================
  // 1. CHAT SIMULATOR (WhatsApp) STATE
  // ==========================================
  const [waMessages, setWaMessages] = useState<Array<{ sender: 'user' | 'bot', text: string, time: string }>>([
    { sender: 'user', text: "Hello, I want to book an appointment for dental consulting.", time: "10:30 AM" },
    { sender: 'bot', text: "Welcome to Radiant Dental! 🦷 I am your BusinessOS™ AI assistant. I can fetch available slots. Could you please share your preferred day (e.g. Monday, Tuesday)?", time: "10:30 AM" }
  ]);
  const [waInput, setWaInput] = useState('');
  const [isWaTyping, setIsWaTyping] = useState(false);

  const handleWaSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waInput.trim()) return;
    
    const userMsg = waInput;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setWaMessages(prev => [...prev, { sender: 'user', text: userMsg, time }]);
    setWaInput('');
    setIsWaTyping(true);

    setTimeout(() => {
      setIsWaTyping(false);
      let replyText = "Understood! Let me lock that into our CRM. What is your full name to finalize the calendar hold?";
      if (userMsg.toLowerCase().includes('monday')) {
        replyText = "Monday looks perfect! We have slots at 11:00 AM and 3:30 PM. Which one suits you best?";
      } else if (userMsg.toLowerCase().includes('tuesday')) {
        replyText = "Tuesday is open! We can do 10:00 AM or 2:00 PM. Please choose a slot.";
      }
      setWaMessages(prev => [...prev, { sender: 'bot', text: replyText, time }]);
    }, 1200);
  };

  // ==========================================
  // 2. AI CALLING AGENTS STATE
  // ==========================================
  const [activeVoiceScenario, setActiveVoiceScenario] = useState<'healthcare' | 'realestate' | 'retail'>('healthcare');
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'dialing' | 'connected' | 'completed'>('idle');
  const [voiceLogs, setVoiceLogs] = useState<Array<{ speaker: 'Customer' | 'AI Agent', text: string }>>([]);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const voiceScenarios = {
    healthcare: [
      { speaker: 'AI Agent', text: "Hello! Thank you for calling Apollo Aesthetics. I am your automated clinic assistant. Am I speaking with Priya Roy?" },
      { speaker: 'Customer', text: "Yes, this is Priya. I missed an appointment confirmation message." },
      { speaker: 'AI Agent', text: "Ah, I see that. You are scheduled for a premium Ayurvedic Skin Rejuvenation therapy tomorrow at 2:00 PM. Would you like me to confirm your booking?" },
      { speaker: 'Customer', text: "Yes, please confirm that. Can I add a massage therapy to that?" },
      { speaker: 'AI Agent', text: "Absolutely! I have added the Ayurvedic Abhyanga Massage addon to your session. Your updated appointment is secured. I have also synchronized this with our Razorpay checkout link for online payment. Anything else I can do for you?" },
      { speaker: 'Customer', text: "No, that is all. Thank you!" },
      { speaker: 'AI Agent', text: "Perfect, Priya! A confirmation message is on its way to your WhatsApp. Have a wonderful evening!" }
    ],
    realestate: [
      { speaker: 'AI Agent', text: "Hello! This is Arjun from Prestige Realty. I saw you were browsing our luxury 3BHK villas in Bangalore. Are you looking for self-use or investment?" },
      { speaker: 'Customer', text: "Hi, actually I am looking for investment. Do you have flexible payment options?" },
      { speaker: 'AI Agent', text: "Yes, indeed! For investors, we offer an interest-free 10:90 structural plan where you pay 10% now and nothing until possession. Would you like a brochure on WhatsApp?" },
      { speaker: 'Customer', text: "Yes, please send that over right away." },
      { speaker: 'AI Agent', text: "Excellent! Dispatched. I will also register you as a Hot Investor in our system. Have a great day!" }
    ],
    retail: [
      { speaker: 'AI Agent', text: "Hi, this is Organic Wellness Support! I noticed your payment for the skincare pack failed at checkout. Can I help you complete it?" },
      { speaker: 'Customer', text: "Yes, my card was declined twice. I don't know why." },
      { speaker: 'AI Agent', text: "I apologize for that! Let me generate a direct UPI QR code or alternative Stripe payment node for your convenience. I will send it via SMS now." },
      { speaker: 'Customer', text: "Great, I will use UPI instead. Thanks." },
      { speaker: 'AI Agent', text: "Perfect! Received and synced. Your order #5021 has been cleared for immediate shipping." }
    ]
  };

  const startVoiceCall = () => {
    setIsCalling(true);
    setCallStatus('dialing');
    setVoiceLogs([]);
    setCallDuration(0);

    // Simulated dialing
    setTimeout(() => {
      setCallStatus('connected');
      // Loop through scenario script
      const script = voiceScenarios[activeVoiceScenario];
      let i = 0;
      
      const printNextLine = () => {
        if (i < script.length && isCalling) {
          setVoiceLogs(prev => [...prev, script[i]]);
          i++;
          setTimeout(printNextLine, 2500);
        } else {
          setCallStatus('completed');
          setIsCalling(false);
        }
      };
      printNextLine();
    }, 1500);

    // Duration timer
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  const endVoiceCall = () => {
    setIsCalling(false);
    setCallStatus('completed');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ==========================================
  // 3. TEAM INBOX WORKSPACE STATE
  // ==========================================
  const [selectedThread, setSelectedThread] = useState<number>(1);
  const [inboxThreads, setInboxThreads] = useState([
    {
      id: 1,
      customer: "Karan Johar",
      channel: "WhatsApp",
      unread: true,
      lastMsg: "Is my payment confirmed? Pls verify",
      assignedTo: "Rahul Sharma",
      status: "Open",
      tag: "Payment Inquiry",
      history: [
        { sender: 'customer', text: "Hi, I sent ₹9,999 via UPI for the Starter subscription.", time: "10:10 AM" },
        { sender: 'system', text: "WhatsApp Bot: Checking ledger nodes...", time: "10:11 AM" },
        { sender: 'customer', text: "Is my payment confirmed? Pls verify", time: "10:15 AM" }
      ],
      notes: "Customer seems slightly anxious about UPI settlement speed."
    },
    {
      id: 2,
      customer: "Dr. Anjali Sen",
      channel: "LiveChat",
      unread: false,
      lastMsg: "Need demo for clinics",
      assignedTo: "Unassigned",
      status: "New",
      tag: "Demo Request",
      history: [
        { sender: 'customer', text: "Hello! I run 3 dental clinics. Can we automate appointment booking?", time: "09:45 AM" },
        { sender: 'bot', text: "Hi Dr. Anjali! Yes, we can route calls and WhatsApp notifications to single calendar pools.", time: "09:46 AM" },
        { sender: 'customer', text: "Need demo for clinics", time: "09:50 AM" }
      ],
      notes: "High intent clinic lead. Needs senior relationship manager."
    },
    {
      id: 3,
      customer: "Sneha Reddy",
      channel: "RCS",
      unread: false,
      lastMsg: "Thanks for the discount link!",
      assignedTo: "Meera Nair",
      status: "Closed",
      tag: "Support",
      history: [
        { sender: 'customer', text: "Do you have discount links for annual packages?", time: "Yesterday" },
        { sender: 'agent', text: "Dispatched! Here is a 15% discount for our Growth tier: SECURE15", time: "Yesterday" },
        { sender: 'customer', text: "Thanks for the discount link!", time: "Yesterday" }
      ],
      notes: "Annual upgrade completed."
    }
  ]);

  const [inboxReplyText, setInboxReplyText] = useState('');
  const [internalNoteText, setInternalNoteText] = useState('');

  const sendInboxReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inboxReplyText.trim()) return;

    setInboxThreads(prev => prev.map(thread => {
      if (thread.id === selectedThread) {
        return {
          ...thread,
          unread: false,
          lastMsg: inboxReplyText,
          history: [...thread.history, { sender: 'agent', text: inboxReplyText, time: 'Now' }]
        };
      }
      return thread;
    }));
    setInboxReplyText('');
  };

  const saveInternalNote = () => {
    if (!internalNoteText.trim()) return;
    setInboxThreads(prev => prev.map(thread => {
      if (thread.id === selectedThread) {
        return {
          ...thread,
          notes: internalNoteText
        };
      }
      return thread;
    }));
    setInternalNoteText('');
  };

  // ==========================================
  // 4. WORKFLOW GRAPH HIGHLIGHTS STATE
  // ==========================================
  const [hoveredWorkflowIdx, setHoveredWorkflowIdx] = useState<number | null>(null);
  const workflowNodes = [
    { title: "1. Customer Message", desc: "Customer reaches out via WhatsApp, RCS, Webchat, or Cloud IVR.", detail: "Aggregates meta details and conversation records instantly." },
    { title: "2. Team Inbox Router", desc: "Incoming thread is centralized in our responsive unified queue.", detail: "Auto-tags and sets initial response priorities." },
    { title: "3. Smart Automation", desc: "System checks workspace triggers and knowledge bases.", detail: "Evaluates SLAs, active working hours, and customer tags." },
    { title: "4. AI Agent Intercept", desc: "Fine-tuned AI Voice or Text agent steps in to handle immediate booking.", detail: "Saves up to 80% human labor costs on Tier-1 questions." },
    { title: "5. Human Handover", desc: "If complex, AI smoothly redirects to available humans with full transcripts.", detail: "Zero context loss for the customer." },
    { title: "6. CRM Database Sync", desc: "User profiling and transactional histories are written to HubSpot / GoHighLevel.", detail: "Triggers secondary nurturing automation pipelines." },
    { title: "7. Conversation Analytics", desc: "SLA response metrics and client CSAT ratings are compiled on live charts.", detail: "Optimizes team roster layouts automatically." }
  ];

  // ==========================================
  // 5. LIVE CHARTS & ANALYTICS STATE
  // ==========================================
  const [analyticsCategory, setAnalyticsCategory] = useState<'response' | 'csat' | 'channels'>('response');

  // ==========================================
  // 6. ROI CALCULATOR STATE
  // ==========================================
  const [teamSize, setTeamSize] = useState(15);
  const [monthlyConversations, setMonthlyConversations] = useState(12000);
  const [avgTicketTime, setAvgTicketTime] = useState(25); // in minutes
  const [currentSoftwareCost, setCurrentSoftwareCost] = useState(35000); // in INR

  // Calculators:
  // 1. Cost savings: AI deflects 60% of tickets. Human tickets drop. Plus consolidated tool costs.
  const deflectedTickets = Math.round(monthlyConversations * 0.65);
  const hoursSaved = Math.round((deflectedTickets * avgTicketTime) / 60);
  const rawLaborSavings = hoursSaved * 180; // assume ₹180/hour rate
  const softwareSavings = Math.max(0, currentSoftwareCost - 24999); // compared to Growth tier (₹24,999)
  const totalMonthlySavings = rawLaborSavings + softwareSavings;

  const responseTimeBefore = "18 Minutes";
  const responseTimeAfter = "< 15 Seconds (Instant AI)";

  // ==========================================
  // 7. DEMO FORM SUBMISSION STATE
  // ==========================================
  const [demoForm, setDemoForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    industry: 'Healthcare',
    teamSize: '11-50',
    conversations: '1,000 - 10,000',
    currentTool: 'Intercom / Zendesk',
    message: ''
  });

  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
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
      alert("Incorrect SUM value. Please try again.");
      generateCaptcha();
    }
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please solve the verification math challenge first.");
      return;
    }
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 1500);
  };

  // ==========================================
  // 8. FAQ STATE
  // ==========================================
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is BusinessOS™?",
      a: "BusinessOS™ is an omnichannel customer communication and engagement platform that consolidates WhatsApp, RCS messaging, AI voice calls, Live Chat, and helpdesk tickets into a single elegant workspace, empowering teams with high-efficiency workflows."
    },
    {
      q: "How does the AI Calling Agent differ from traditional interactive voice response (IVR)?",
      a: "Traditional IVR systems force users through frustrating dial-pad menus. BusinessOS™ AI Calling Agents use natural spoken conversational NLP. They understand customer queries, check real-time calendars, log customer tags, and schedule appointments instantly with clean, human-like cadence."
    },
    {
      q: "Can we use our official WhatsApp Business API numbers?",
      a: "Yes. BusinessOS™ seamlessly integrates with Meta WhatsApp Cloud API guidelines. You can map your existing official business phone numbers, configure broadcasts, activate smart chatbots, and run dynamic catalog checkout pipelines."
    },
    {
      q: "How does BusinessOS™ compare to Intercom or Zendesk?",
      a: "Unlike traditional platforms that charge separate, premium costs for chat widgets, WhatsApp API connections, call dialers, and internal ticketing, BusinessOS™ delivers a fully unified workspace at a fraction of the cost, consolidating omnichannel records inside a single, zero-latency database."
    },
    {
      q: "What is RCS messaging, and is it supported?",
      a: "RCS (Rich Communication Services) is the modern upgrade to SMS for Android and Apple devices. BusinessOS™ supports verified sender profiles, rich media carousels, custom quick replies, and real-time delivery trackers directly in our interface."
    },
    {
      q: "Can we synchronize data with our HubSpot or GoHighLevel CRM?",
      a: "Absolutely! We provide out-of-the-box bidirectional webhook interfaces. You can sync tags, update deal stages, log phone call audio, or trigger follow-up SMS campaigns inside HubSpot, Salesforce, or GHL automatically."
    },
    {
      q: "Does AI Calling handle regional languages or dialects?",
      a: "Yes. Our AI voice modules support English, Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, and various localized accents to provide a warm, comfortable customer service experience across multiple regions."
    },
    {
      q: "Is call recording and agent monitoring compliant?",
      a: "Yes, fully. All cloud telephony calls are recorded, transcribed, and analyzed for quality assurance with complete compliance. You can configure consent messages and toggle local compliance toggles in one click."
    },
    {
      q: "How does the ticketing system escalate SLA breaches?",
      a: "You can define flexible ticket priorities (Urgent, High, Medium, Low) and specific response window agreements (SLAs). If an agent does not reply within the set timeline, BusinessOS™ automatically pushes notifications to channel supervisors and reassigns ownership."
    },
    {
      q: "Can our support staff write internal co-worker notes?",
      a: "Yes! The Team Inbox supports collaborative tags, internal mentions (e.g. @Rahul), and hidden private notes that customers cannot see, keeping communication clean and coordinated."
    },
    {
      q: "Does this solution require expensive hardware?",
      a: "No hardware required at all. BusinessOS™ is a 100% cloud-hosted virtual contact center. Your agents only need a standard computer, a headset, and an internet browser to make/receive calls and manage customer charts."
    },
    {
      q: "Can we design custom chatbots without writing code?",
      a: "Yes. BusinessOS™ features a visual drag-and-drop chatbot canvas. You can build advanced decision trees, specify fallback triggers, link WhatsApp catalog items, and wire checkout integrations effortlessly."
    },
    {
      q: "How secure is our customers' private personal information?",
      a: "We prioritize security. BusinessOS™ uses local AES-256 encrypted tables and operates behind secure Google Cloud (Cloud Run) perimeter firewalls. We adhere strictly to ISO 27001, HIPAA, and GDPR data privacy frameworks."
    },
    {
      q: "What payment gateways are supported for automated chat billing?",
      a: "We integrate seamlessly with Razorpay and Stripe. This allows your chatbots to send secure payment links in WhatsApp or Live Chat, allowing customers to pay with UPI, credit cards, or net banking instantly."
    },
    {
      q: "What is the onboarding process for enterprise migrations?",
      a: "For migrating teams, our dedicated system integration engineers assist in porting phone lines, importing CRM contact indexes, setting up ticketing databases, and holding onboarding workshops for a seamless, zero-downtime transition."
    }
  ];

  // ==========================================
  // 9. CLIENT CAROUSEL STATE
  // ==========================================
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const clientStories = [
    {
      brand: "Apollo Aesthetic Clinics",
      growth: "94% Answer Rate",
      quote: "Our front desk was constantly overwhelmed by incoming patient inquiries. BusinessOS™ integrated WhatsApp booking with an AI Voice Assistant. We saved over 140 hours of manual coordination in our first month.",
      author: "Dr. Sandeep Jha, Operations Director"
    },
    {
      brand: "Decathlon Franchise Group",
      growth: "₹4.5L Cost Deflection",
      quote: "Consolidating live webchat, WhatsApp catalog checkouts, and customer service ticketing into BusinessOS™ allowed our sports support team to reply 4 times faster with half the overhead.",
      author: "Meera Nair, Customer Success Lead"
    },
    {
      brand: "Metro Heights Realty",
      growth: "3.2x Hot Lead Conversion",
      quote: "The automatic predictive lead scoring and WhatsApp broadcast features transformed our sales funnel. Outbound agents are only assigned high-intent prospects, dramatically scaling closures.",
      author: "Rahul Roy, Managing Director"
    }
  ];

  return (
    <div className="bg-[#03010E] text-white py-12 animate-fade-in font-sans text-left transition-colors duration-500 overflow-hidden relative selection:bg-cyan-500 selection:text-white">
      
      {/* Background Orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] -right-40 w-[600px] h-[600px] bg-emerald-950/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute -bottom-40 left-[15%] w-[600px] h-[600px] bg-blue-950/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 text-xs font-mono text-gray-500 flex items-center gap-1.5">
          <button onClick={() => setPath('home')} className="hover:text-cyan-400 transition-colors">Home</button> 
          <span>/</span> 
          <span className="hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => setPath('products/growth-os' as RoutePath)}>Products</span> 
          <span>/</span> 
          <span className="text-cyan-400 font-semibold">BusinessOS</span>
        </div>

        {/* ==========================================
            1. HERO SECTION (Dark Premium Enterprise SaaS)
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-300 font-bold">
                Omnichannel Enterprise Communication
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight">
              One Inbox. Every Conversation. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                Complete Visibility.
              </span>
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-gray-400 max-w-2xl">
              Unify WhatsApp, AI Calling, Cloud Telephony, RCS Messaging, Live Chat, and Team Ticketing into one communication platform. Stop switching tabs and start accelerating resolutions with conversational AI co-workers.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#demo_form" 
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2 text-sm"
              >
                Book Live Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#team_inbox" 
                className="px-6 py-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-400 transition-all flex items-center gap-2 text-sm font-semibold"
              >
                Watch Product Tour <Play className="h-4 w-4 text-cyan-400" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 text-[10px] font-mono text-gray-500 border-t border-white/5">
              <span className="flex items-center gap-1.5 text-cyan-400">● 99.99% Cloud Uptime</span>
              <span className="flex items-center gap-1.5 text-emerald-400">● ISO 27001 Certified Security</span>
              <span className="flex items-center gap-1.5 text-blue-400">● Bidirectional CRM Webhooks</span>
            </div>
          </div>

          {/* Right Column: Omnichannel Visual Grid */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px]">
            <div className="p-6 rounded-3xl border border-white/10 w-full max-w-[440px] bg-slate-900/40 backdrop-blur-md shadow-2xl relative overflow-hidden transition-all hover:scale-[1.01] hover:border-cyan-500/40">
              <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xs font-mono uppercase text-gray-400 mb-4 tracking-wider flex items-center justify-between border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" /> OMNICHANNEL HUB</span>
                <span className="text-[9px] text-emerald-400 font-bold animate-pulse">● CORE OPERATIONAL ENGINE</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 block">WHATSAPP</span>
                  <span className="text-emerald-400 text-xs font-bold font-mono">Connected API</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 block">AI VOICE DIALER</span>
                  <span className="text-cyan-400 text-xs font-bold font-mono">Active (18 Lines)</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 block">TEAM INBOX QUEUE</span>
                  <span className="text-blue-400 text-xs font-bold font-mono">3 Unresolved</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 block">RCS NETWORKS</span>
                  <span className="text-purple-400 text-xs font-bold font-mono">Synchronized</span>
                </div>
              </div>

              {/* Connection visualizer graph */}
              <div className="h-28 w-full border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden bg-[#0A071A]">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute h-20 w-20 rounded-full border border-cyan-500/10 animate-ping" />
                <div className="absolute h-10 w-10 rounded-full border border-emerald-400/20 animate-pulse" />
                
                <div className="text-center relative space-y-1">
                  <Smartphone className="h-5 w-5 mx-auto text-cyan-400 animate-bounce" />
                  <span className="text-[8px] text-cyan-300 tracking-widest font-bold block">OMNICHANNEL CONTROL</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-gray-400 bg-black/20 p-2 rounded border border-white/5">
                <span>⚡ Core Version: BusinessOS v4.1</span>
                <span className="text-emerald-400 font-bold">All Nodes Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. ECOSYSTEM (Bento Grid - 12 Cards)
           ========================================== */}
        <div id="ecosystem" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase block font-bold">Integrated Communications</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Unified Communication Ecosystem
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Stop deploying fragmented point-solutions. BusinessOS™ merges twelve robust features into an enterprise-grade workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "WhatsApp Automation", desc: "Build automated messaging flows, catalog catalogs, and auto-responders.", icon: MessageSquare, c: "text-emerald-400 bg-emerald-500/10" },
              { title: "AI Calling", desc: "Interactive natural spoken AI voice agents for healthcare, real estate, and retail bookings.", icon: PhoneCall, c: "text-cyan-400 bg-cyan-500/10" },
              { title: "Cloud Telephony", desc: "Integrate multi-level IVRs, virtual queues, call recordings, and agent supervision.", icon: Phone, c: "text-blue-400 bg-blue-500/10" },
              { title: "RCS Messaging", desc: "Verified business profiles, rich video templates, and structured option widgets.", icon: Smartphone, c: "text-purple-400 bg-purple-500/10" },
              { title: "Team Inbox", desc: "Centralize customer requests across all channels into one multi-agent workspace.", icon: FileText, c: "text-pink-400 bg-pink-500/10" },
              { title: "Live Chat", desc: "Deploy lightweight, customizable desktop and mobile chat bubbles to capture visitors.", icon: MessageSquare, c: "text-yellow-400 bg-yellow-500/10" },
              { title: "Ticket Management", desc: "Track response timelines, structure priorities, and enforce automatic escalations.", icon: Layers, c: "text-red-400 bg-red-500/10" },
              { title: "Customer Support", desc: "Build customer relationships with automated surveys and followups.", icon: Users, c: "text-indigo-400 bg-indigo-500/10" },
              { title: "Knowledge Base", desc: "Compile articles, troubleshooting guides, and manual document indices for users.", icon: Bookmark, c: "text-orange-400 bg-orange-500/10" },
              { title: "Analytics", desc: "Review live charts of response intervals, message volume, and team CSAT scores.", icon: BarChart2, c: "text-teal-400 bg-teal-500/10" },
              { title: "Collaboration", desc: "Create private notes, write mentions, and assign tickets with full conversation visibility.", icon: Share2, c: "text-indigo-400 bg-indigo-500/10" },
              { title: "Automation", desc: "Set visual workflows, link razorpay invoices, and push CRM data automatically.", icon: Workflow, c: "text-lime-400 bg-lime-500/10" }
            ].map((card, idx) => {
              const Icon = card.icon || MessageSquare;
              return (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${card.c}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-xs font-bold font-display">{card.title}</h3>
                    <p className="text-[10px] text-gray-400 leading-relaxed">{card.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1 text-[8px] font-mono text-gray-500 uppercase tracking-widest font-bold">
                    <span>Active node</span> <ChevronRight className="h-2 w-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            3. INTERACTIVE TEAM INBOX EXPERIENCE
           ========================================== */}
        <div id="team_inbox" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase block font-bold">Unified Inbox Sandbox</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Interactive Team Inbox Experience
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Experience the central heart of BusinessOS™. Toggle active threads, review customer conversation histories, add internal notes, and send responses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch border border-white/10 rounded-3xl overflow-hidden bg-slate-950/60 backdrop-blur-md">
            
            {/* Left Queue Panel */}
            <div className="lg:col-span-4 border-r border-white/5 flex flex-col justify-between bg-black/20 min-h-[420px]">
              <div className="p-4 border-b border-white/5">
                <span className="text-[10px] font-mono text-gray-500 uppercase block mb-2">ACTIVE CHANNELS INBOX</span>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search conversations..." 
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Thread list */}
              <div className="flex-grow overflow-y-auto divide-y divide-white/5">
                {inboxThreads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setSelectedThread(thread.id)}
                    className={`w-full p-4 text-left block transition-all ${
                      selectedThread === thread.id 
                        ? 'bg-cyan-500/10 border-l-4 border-cyan-400' 
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        {thread.customer}
                        {thread.unread && <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full" />}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono ${
                        thread.channel === 'WhatsApp' ? 'bg-emerald-500/10 text-emerald-400' :
                        thread.channel === 'LiveChat' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {thread.channel}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 truncate mb-1">{thread.lastMsg}</p>
                    <div className="flex justify-between text-[8px] font-mono text-gray-500">
                      <span>Owner: {thread.assignedTo}</span>
                      <span className="text-zinc-500">{thread.tag}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Central Chat History and Reply */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-black/40 min-h-[420px]">
              {/* Target info */}
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/10">
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {inboxThreads.find(x => x.id === selectedThread)?.customer}
                  </h4>
                  <span className="text-[8px] font-mono text-gray-500">
                    Channel: {inboxThreads.find(x => x.id === selectedThread)?.channel}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-mono">
                  SLA: Active
                </span>
              </div>

              {/* Chat lines */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4 min-h-[220px]">
                {inboxThreads.find(x => x.id === selectedThread)?.history.map((msg, i) => {
                  const isUser = msg.sender === 'customer';
                  return (
                    <div key={i} className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}>
                      <div className={`p-3 rounded-xl max-w-[85%] text-[10px] font-mono leading-relaxed ${
                        isUser 
                          ? 'bg-slate-900/80 text-gray-300 border border-white/5' 
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                      }`}>
                        <p>{msg.text}</p>
                        <span className="text-[7px] text-gray-400 block mt-1 text-right">{msg.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply box */}
              <form onSubmit={sendInboxReply} className="p-4 border-t border-white/5 bg-black/20 flex gap-2">
                <input 
                  type="text"
                  value={inboxReplyText}
                  onChange={(e) => setInboxReplyText(e.target.value)}
                  placeholder="Type official response..." 
                  className="flex-grow bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-cyan-400"
                />
                <button 
                  type="submit" 
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-mono flex items-center justify-center"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>

            {/* Right Context & private Note Panel */}
            <div className="lg:col-span-3 p-4 bg-slate-950 flex flex-col justify-between min-h-[420px]">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase block border-b border-white/5 pb-2">CUSTOMER CONTEXT</span>
                
                <div className="space-y-2 text-[10px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Assigned Agent:</span>
                    <span className="text-white font-bold">{inboxThreads.find(x => x.id === selectedThread)?.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current Tag:</span>
                    <span className="text-cyan-400 font-bold">{inboxThreads.find(x => x.id === selectedThread)?.tag}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">CRM Sync Status:</span>
                    <span className="text-emerald-400 font-bold">Synchronized</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono text-yellow-400 font-bold block">Internal Co-worker Notes:</span>
                  <div className="p-3 bg-black/30 border border-yellow-500/10 rounded text-[9px] text-yellow-100 font-mono italic">
                    "{inboxThreads.find(x => x.id === selectedThread)?.notes || "No notes written yet."}"
                  </div>
                </div>
              </div>

              {/* Add Note Input */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <textarea 
                  value={internalNoteText}
                  onChange={(e) => setInternalNoteText(e.target.value)}
                  placeholder="Type secret internal note..." 
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[9px] font-mono focus:outline-none focus:border-yellow-500 h-16"
                />
                <button 
                  onClick={saveInternalNote}
                  className="w-full py-1 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 rounded border border-yellow-500/30 text-[9px] font-mono font-bold uppercase"
                >
                  Save Internal Note
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            4. CHAT SIMULATOR (WhatsApp Live Interface)
           ========================================== */}
        <div id="whatsapp" className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 font-bold">
              <span>💬 OFFICIAL META CHATBOT</span>
            </div>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              WhatsApp Conversational Checkout
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Build high-velocity WhatsApp flows that book appointments, answer frequently asked questions, and trigger payment checkouts. Our official Meta cloud nodes process messages with sub-second delivery.
            </p>

            <ul className="space-y-3 font-mono text-xs text-gray-300">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> WhatsApp Template Broadcast Campaigns</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Interactive Product Catalogs & Shopping Carts</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Bidirectional CRM Contact Auto-Updates</li>
            </ul>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[340px] rounded-3xl border border-white/10 bg-black overflow-hidden shadow-2xl relative">
              <div className="bg-[#075E54] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white border border-emerald-400/50">W</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Wellness Chatbot API</h4>
                    <span className="text-[8px] text-emerald-300 font-mono">Online</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-white opacity-80" />
                  <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Chat Body */}
              <div className="h-64 p-4 bg-[#0B141A] overflow-y-auto space-y-4">
                {waMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2.5 rounded-lg max-w-[80%] text-[10px] font-mono leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#005C4B] text-white' 
                        : 'bg-[#202C33] text-gray-300'
                    }`}>
                      <p>{msg.text}</p>
                      <span className="text-[7px] text-gray-400 block text-right mt-1">{msg.time}</span>
                    </div>
                  </div>
                ))}
                {isWaTyping && (
                  <div className="flex justify-start">
                    <div className="p-2 bg-[#202C33] text-gray-400 rounded-lg text-[9px] font-mono animate-pulse">
                      Typing auto reply...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Form */}
              <form onSubmit={handleWaSend} className="p-3 bg-[#1F2C34] border-t border-white/5 flex gap-2">
                <input
                  type="text"
                  value={waInput}
                  onChange={(e) => setWaInput(e.target.value)}
                  placeholder="Type 'Monday' or alternative..."
                  className="flex-grow bg-[#2A3942] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                />
                <button type="submit" className="p-2 bg-[#00A884] hover:bg-[#008F72] text-white rounded-lg flex items-center justify-center">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ==========================================
            5. AI CALLING AGENTS (Voice Wave Simulation)
           ========================================== */}
        <div id="ai_calling" className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-300 font-bold">
              <span>📞 SPOKEN INTELLIGENCE VOICE</span>
            </div>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              AI Spoken Calling Agents
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Automate inbound patient consulting, product support inquiries, and cold-lead outbound follow-ups with human-sounding conversation paths. Reduce average queue times to zero.
            </p>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">Choose Scenario:</span>
              <div className="flex gap-2">
                {[
                  { id: 'healthcare', label: 'Clinics Booking' },
                  { id: 'realestate', label: 'Real Estate' },
                  { id: 'retail', label: 'Retail Support' }
                ].map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      if (!isCalling) setActiveVoiceScenario(sc.id as any);
                    }}
                    className={`px-3 py-1 rounded text-[10px] font-mono border ${
                      activeVoiceScenario === sc.id 
                        ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300' 
                        : 'border-white/5 bg-black/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1 flex justify-center">
            <div className="w-full max-w-[380px] p-6 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[360px]">
              
              <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
                  <Volume2 className="h-4 w-4 animate-bounce" /> VOICE NODE ACTIVE
                </span>
                <span className="text-[9px] text-gray-500 font-mono">Duration: {callDuration}s</span>
              </div>

              {/* Call Controls & Dial Box */}
              {callStatus === 'idle' && (
                <div className="text-center py-8 space-y-4 my-auto">
                  <div className="h-16 w-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 animate-pulse">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold">System ready for dialer output</h4>
                    <p className="text-[10px] text-zinc-500 font-mono">Scenario: {activeVoiceScenario.toUpperCase()}</p>
                  </div>
                  <button 
                    onClick={startVoiceCall}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-mono font-bold uppercase transition-all"
                  >
                    Start Simulated Voice Call
                  </button>
                </div>
              )}

              {callStatus === 'dialing' && (
                <div className="text-center py-8 space-y-4 my-auto">
                  <div className="h-16 w-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto text-yellow-400 animate-spin">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                  <h4 className="text-xs font-mono text-yellow-400 font-bold animate-pulse">Dialing automated client line...</h4>
                </div>
              )}

              {(callStatus === 'connected' || callStatus === 'completed') && (
                <div className="flex-grow flex flex-col justify-between space-y-4">
                  {/* Voice waveform */}
                  <div className="h-12 w-full flex items-center justify-center gap-1 bg-black/40 border border-white/5 rounded-xl">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar) => {
                      const h = callStatus === 'connected' ? Math.floor(Math.random() * 28) + 4 : 4;
                      return (
                        <div 
                          key={bar} 
                          className="w-1.5 bg-gradient-to-t from-cyan-500 to-emerald-400 rounded-full transition-all duration-300" 
                          style={{ height: `${h}px` }}
                        />
                      );
                    })}
                  </div>

                  {/* Script display scroll */}
                  <div className="p-3 bg-black/20 border border-white/5 rounded-lg max-h-[140px] overflow-y-auto space-y-2 text-[9px] font-mono leading-relaxed">
                    {voiceLogs.map((log, i) => (
                      <p key={i} className={log.speaker === 'AI Agent' ? 'text-cyan-300' : 'text-gray-400'}>
                        <strong>{log.speaker}:</strong> {log.text}
                      </p>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {callStatus === 'connected' && (
                      <button 
                        onClick={endVoiceCall}
                        className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-[10px] font-mono font-bold uppercase"
                      >
                        Disconnect Call
                      </button>
                    )}
                    {callStatus === 'completed' && (
                      <button 
                        onClick={startVoiceCall}
                        className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-[10px] font-mono font-bold uppercase"
                      >
                        Redial Call
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* ==========================================
            6. COMMUNICATION WORKFLOW (Node-Based Diagram)
           ========================================== */}
        <div id="workflow" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase block font-bold font-bold">Node Routing Flow</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Omnichannel Communication Workflows
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Hover over individual node blocks to trace how incoming client messages transition from conversational AI processing to human assistance and CRM databases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowNodes.map((node, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredWorkflowIdx(i)}
                onMouseLeave={() => setHoveredWorkflowIdx(null)}
                className={`p-6 rounded-2xl border transition-all duration-300 relative ${
                  hoveredWorkflowIdx === i 
                    ? 'border-cyan-400 bg-cyan-500/5 scale-[1.02]' 
                    : 'border-white/5 bg-white/[0.01]'
                }`}
              >
                <div className="absolute top-4 right-4 text-xs font-mono text-gray-600 font-bold">#0{i+1}</div>
                <h3 className="text-sm font-bold font-display text-white mb-2">{node.title}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed mb-4">{node.desc}</p>
                
                {hoveredWorkflowIdx === i && (
                  <div className="p-3 bg-black/40 border border-cyan-500/20 rounded-xl text-[10px] font-mono text-cyan-300">
                    {node.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            7. CONVERSATION ANALYTICS (Response, CSAT, Volume)
           ========================================== */}
        <div id="analytics" className="mb-24 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Performance Analytics</span>
              <h2 className="text-3xl font-bold font-display tracking-tight">
                Live Performance Metrics & Reporting
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
                Monitor team response curves, call duration levels, and ticket resolution statistics on modular dashboards.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setAnalyticsCategory('response')}
                  className={`w-full p-4 text-left border rounded-xl flex justify-between items-center transition-all ${
                    analyticsCategory === 'response' ? 'border-cyan-400 bg-cyan-500/5 text-white' : 'border-white/5 text-gray-400'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">Average Response Intervals</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setAnalyticsCategory('csat')}
                  className={`w-full p-4 text-left border rounded-xl flex justify-between items-center transition-all ${
                    analyticsCategory === 'csat' ? 'border-emerald-400 bg-emerald-500/5 text-white' : 'border-white/5 text-gray-400'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">Customer Satisfaction Index (CSAT)</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-6 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-md">
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                  <h3 className="text-sm font-bold font-mono">
                    {analyticsCategory === 'response' ? '📊 SLA RESPONSE OVERVIEW' : '📈 CSAT SCORE DISTRIBUTION'}
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 animate-pulse">Live Tickers Syncing...</span>
                </div>

                {analyticsCategory === 'response' ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">WhatsApp Inbound Automated</span>
                        <span className="text-cyan-400 font-bold">98% Responded (Sub-Seconds)</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full w-[98%]" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">Inbound Cloud IVR Routing</span>
                        <span className="text-blue-400 font-bold">92% Connected</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[92%]" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">Support Helpdesk Manual Tickets</span>
                        <span className="text-pink-400 font-bold">85% Resolved within SLA</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-pink-500 h-full w-[85%]" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center space-y-1">
                        <span className="text-[10px] font-mono text-gray-500 block">TOTAL RATINGS</span>
                        <span className="text-white text-base font-bold font-mono">2,840</span>
                      </div>
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center space-y-1">
                        <span className="text-[10px] font-mono text-gray-500 block">EXCELLENT (5★)</span>
                        <span className="text-emerald-400 text-base font-bold font-mono">92.4%</span>
                      </div>
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center space-y-1">
                        <span className="text-[10px] font-mono text-gray-500 block">AVG CSAT</span>
                        <span className="text-cyan-400 text-base font-bold font-mono">4.85 / 5</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            8. BUILT FOR EVERY INDUSTRY (Use Cases)
           ========================================== */}
        <div id="industry_use_cases" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase block font-bold font-bold font-bold">Vertical Adaptability</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Built For Every Industry
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Whether you coordinate patient care, list properties, or run retail operations, our communication pathways deploy effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Healthcare", desc: "Patient Intake & IVR", bg: "from-blue-500/10 to-transparent" },
              { label: "Education", desc: "Inquiry & Admissions", bg: "from-cyan-500/10 to-transparent" },
              { label: "Real Estate", desc: "Lead Routing & Callers", bg: "from-emerald-500/10 to-transparent" },
              { label: "Retail", desc: "WhatsApp checkouts", bg: "from-purple-500/10 to-transparent" },
              { label: "Manufacturing", desc: "SLA Vendor Tickets", bg: "from-pink-500/10 to-transparent" },
              { label: "Professional Services", desc: "Team Inbox scheduling", bg: "from-yellow-500/10 to-transparent" }
            ].map((industry, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border border-white/5 bg-gradient-to-b ${industry.bg} text-center space-y-2 hover:border-cyan-500/20 transition-all`}
              >
                <Briefcase className="h-5 w-5 mx-auto text-cyan-400 animate-pulse" />
                <h4 className="text-xs font-bold text-white">{industry.label}</h4>
                <p className="text-[9px] text-gray-500 font-mono">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            9. INTEGRATIONS (Continuous Horizontal Scroll)
           ========================================== */}
        <div id="integrations" className="mb-24 space-y-8 overflow-hidden relative">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase block font-bold font-bold font-bold font-bold">Workspace Connections</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Connect Your Business Stack
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              BusinessOS™ synchronizes seamlessly with the industry’s top CRMs, developer frameworks, and financial ledger APIs.
            </p>
          </div>

          <div className="relative w-full flex overflow-x-hidden">
            <div className="animate-marquee whitespace-nowrap flex gap-8 py-4">
              {[
                "GoHighLevel", "HubSpot", "Salesforce", "WhatsApp API", "Google Workspace",
                "Slack", "Zoom", "Razorpay", "Stripe", "n8n", "Zapier", "Shopify"
              ].map((logo, idx) => (
                <div key={idx} className="px-6 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-xs font-mono text-cyan-300 font-bold inline-block">
                  🔌 {logo}
                </div>
              ))}
            </div>

            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#03010E] to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#03010E] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ==========================================
            10. WHY CHOOSE BUSINESSOS (Comparison Table)
           ========================================== */}
        <div id="comparison" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase block font-bold font-bold font-bold font-bold">Unmatched Utility</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Why BusinessOS™?
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Stop stitching together disconnected SaaS contracts. Review how BusinessOS™ replaces multiple premium points.
            </p>
          </div>

          <div className="border border-white/10 rounded-2xl overflow-hidden bg-slate-950/40 backdrop-blur-md overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/10">
                  <th className="p-4 text-gray-400 font-bold uppercase">Features</th>
                  <th className="p-4 text-cyan-300 font-bold uppercase">BusinessOS™</th>
                  <th className="p-4 text-zinc-500 uppercase">Intercom</th>
                  <th className="p-4 text-zinc-500 uppercase">Freshworks</th>
                  <th className="p-4 text-zinc-500 uppercase">Zendesk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { f: "Unified Team Inbox Queue", os: "Yes (All channels included)", int: "Extra addon costs", fw: "Limited separate layouts", zd: "Fragmented queue" },
                  { f: "Official WhatsApp Cloud API", os: "Yes (Included natively)", int: "Heavily priced per conversation", fw: "Separate billing setup", zd: "Third-party connector needed" },
                  { f: "AI Spoken Voice Calling Agents", os: "Yes (Built-in)", int: "Not supported natively", fw: "Basic telephony fallback", zd: "Requires external integration" },
                  { f: "Interactive Chatbot Flow Creator", os: "Yes (Drag & Drop)", int: "Premium tier unlock only", fw: "Extra module subscription", zd: "Requires custom builder code" },
                  { f: "Predictive Lead Scoring & Tags", os: "Yes (AI automated)", int: "Not supported", fw: "Requires Enterprise license", zd: "Basic tags only" },
                  { f: "RCS / Rich Video Messaging", os: "Yes (Supported)", int: "Not supported", fw: "Not supported", zd: "Requires custom plugin" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 text-gray-300 font-bold">{row.f}</td>
                    <td className="p-4 text-cyan-400 font-bold bg-cyan-500/5">{row.os}</td>
                    <td className="p-4 text-gray-500">{row.int}</td>
                    <td className="p-4 text-gray-500">{row.fw}</td>
                    <td className="p-4 text-gray-500">{row.zd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            11. ROI CALCULATOR SECTION
           ========================================== */}
        <div id="roi_calculator" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase block font-bold">Financial Visualizer</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Calculate Communication ROI
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Slide parameters below to estimate how much manual customer support labor and point-solution licensing costs you save monthly with BusinessOS™.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-white/10 rounded-3xl p-6 bg-slate-950/60 backdrop-blur-md">
            
            {/* Input Slider Blocks */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
              
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-gray-400">Team Size (Support agents):</span>
                  <span className="text-white font-bold">{teamSize} Agents</span>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="100" 
                  value={teamSize} 
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-gray-400">Monthly Customer Conversations:</span>
                  <span className="text-white font-bold">{monthlyConversations.toLocaleString()} Chats</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="1000"
                  value={monthlyConversations} 
                  onChange={(e) => setMonthlyConversations(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-gray-400">Average Resolution Time per ticket:</span>
                  <span className="text-white font-bold">{avgTicketTime} Minutes</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  value={avgTicketTime} 
                  onChange={(e) => setAvgTicketTime(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-gray-400 mb-1">Current software cost (INR / Month):</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 font-mono text-xs">₹</span>
                  <input 
                    type="number" 
                    value={currentSoftwareCost} 
                    onChange={(e) => setCurrentSoftwareCost(parseInt(e.target.value) || 0)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-7 pr-4 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Outputs Visual representation */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block border-b border-white/5 pb-2 mb-4 font-bold">ESTIMATED MONTHLY SAVINGS</span>
              
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block">TOTAL FINANCIAL DEFLECTION</span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                    ₹{totalMonthlySavings.toLocaleString('en-IN')}/mo
                  </h3>
                  <p className="text-[9px] font-mono text-zinc-500 mt-1">Calculated using an average conversational deflection rating of 65% by AI agents.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 block">LABOR HOURS SAVED</span>
                    <span className="text-sm font-bold font-mono text-cyan-400">{hoursSaved} Hours / mo</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 block">SLA RESPONSE INTERVALS</span>
                    <span className="text-sm font-bold font-mono text-white flex items-center gap-1"><Clock className="h-4 w-4 text-emerald-400" /> Instant</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-gray-500 flex items-center gap-1">
                <span>Calculations verified by Natton financial metrics models.</span>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            12. PRICING PLANS
           ========================================== */}
        <div id="pricing" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase block font-bold font-bold font-bold font-bold">Predictable Packages</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Flexible Pricing Plans
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Choose the operational tier matched to your customer conversation volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                name: "Starter",
                price: "₹9,999/month",
                popular: false,
                desc: "Ideal for small support teams stepping into automated channels.",
                features: [
                  "Unified Team Inbox Queue",
                  "Official WhatsApp Cloud API",
                  "Lightweight Website Live Chat",
                  "Standard SLA Trackers",
                  "Up to 3 Agent Seats"
                ],
                bg: "border-white/5 bg-white/[0.01]"
              },
              {
                name: "Growth",
                price: "₹24,999/month",
                popular: true,
                desc: "Our most popular tier. Adds conversational AI calling and full telephony.",
                features: [
                  "Everything in Starter included",
                  "AI Spoken Voice Calling (18 Lines)",
                  "Multi-Level IVR & Call Recording",
                  "Drag-and-Drop Chatbot Creator",
                  "Predictive Lead Scoring & Tagging",
                  "Priority Email & Slack Support"
                ],
                bg: "border-cyan-500/40 bg-gradient-to-b from-cyan-950/10 to-transparent relative shadow-xl shadow-cyan-500/5"
              },
              {
                name: "Enterprise",
                price: "Custom Pricing",
                popular: false,
                desc: "Enterprise compliance security, dedicated lines, and system integrations.",
                features: [
                  "Everything in Growth included",
                  "Unlimited Virtual Agent Seats",
                  "Custom CRM Database Mappings",
                  "Dedicated Integration Engineer",
                  "SLA Guarantee with 24/7 Hotline",
                  "AES-256 Cloud Isolated Database"
                ],
                bg: "border-white/5 bg-white/[0.01]"
              }
            ].map((plan, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border flex flex-col justify-between ${plan.bg}`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">{plan.name}</h3>
                      <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{plan.desc}</p>
                    </div>
                    {plan.popular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500 text-black text-[9px] font-bold font-mono uppercase tracking-wider">
                        POPULAR
                      </span>
                    )}
                  </div>

                  <div className="py-2">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">{plan.price}</span>
                  </div>

                  <ul className="space-y-3 border-t border-white/5 pt-4 text-[11px] font-mono text-gray-300">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <a 
                    href="#demo_form"
                    className={`w-full py-2.5 rounded-lg text-xs font-mono font-bold block text-center transition-all ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white hover:from-cyan-500 hover:to-emerald-500 shadow-md shadow-cyan-500/25' 
                        : 'border border-white/10 hover:border-cyan-400 text-gray-300 hover:text-white'
                    }`}
                  >
                    Select {plan.name} Package
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            13. CUSTOMER SUCCESS STORIES (Carousel)
           ========================================== */}
        <div id="customer_stories" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase block font-bold font-bold font-bold font-bold">Client Triumphs</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Customer Success Stories
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Review how authentic organizations scale support capacities using our modular structures.
            </p>
          </div>

          <div className="max-w-4xl mx-auto p-8 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-4 right-4 text-gray-600 font-mono font-bold text-xs">#0{activeStoryIdx+1}</div>
            
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h4 className="text-sm font-bold text-cyan-300 font-display">
                    {clientStories[activeStoryIdx].brand}
                  </h4>
                  <span className="text-[10px] font-mono text-gray-500">Industry Client Case</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                  {clientStories[activeStoryIdx].growth}
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-300 italic leading-relaxed">
                "{clientStories[activeStoryIdx].quote}"
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-gray-500">
                  By {clientStories[activeStoryIdx].author}
                </span>
                
                <div className="flex gap-2">
                  {clientStories.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveStoryIdx(i)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        activeStoryIdx === i ? 'bg-cyan-400 w-4' : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            14. FAQ ACCORDION SECTION
           ========================================== */}
        <div id="faq" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase block font-bold font-bold font-bold font-bold">General Clarifications</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Review answers concerning integrations, setup, APIs, and security parameters below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((item, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-white/5 rounded-xl bg-white/[0.01] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-4 text-left flex justify-between items-center hover:bg-white/[0.02]"
                  >
                    <span className="text-xs font-bold text-gray-200 pr-4">{item.q}</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-cyan-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-zinc-500 flex-shrink-0" />}
                  </button>

                  {isExpanded && (
                    <div className="p-4 bg-black/20 border-t border-white/5 text-[11px] font-mono leading-relaxed text-gray-400">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            15. DEMO FORM (GHL + Captcha Validation)
           ========================================== */}
        <div id="demo_form" className="mb-24 scroll-mt-12">
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center space-y-3 mb-8">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">BOOK PRODUCT INTAKE</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Book Your BusinessOS™ Demo
              </h2>
              <p className="text-xs text-gray-400">
                Submit details below to schedule an onboarding consultation call. Our engineers will follow up in 2 hours.
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold font-mono">Demo Booked Successfully!</h3>
                  <p className="text-[11px] text-gray-400 font-mono">We have synced this lead with our GoHighLevel pipeline webhook.</p>
                </div>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-mono font-bold"
                >
                  Book Another Consultation
                </button>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Full Name:</label>
                    <input 
                      type="text" 
                      required
                      value={demoForm.fullName}
                      onChange={(e) => setDemoForm({ ...demoForm, fullName: e.target.value })}
                      placeholder="e.g. Karan Johar"
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-mono focus:border-cyan-400 focus:outline-none text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Company Name:</label>
                    <input 
                      type="text" 
                      required
                      value={demoForm.companyName}
                      onChange={(e) => setDemoForm({ ...demoForm, companyName: e.target.value })}
                      placeholder="e.g. Radiant Dental Care"
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-mono focus:border-cyan-400 focus:outline-none text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Official Email Address:</label>
                    <input 
                      type="email" 
                      required
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      placeholder="e.g. contact@radiantclinic.com"
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-mono focus:border-cyan-400 focus:outline-none text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Contact phone Number:</label>
                    <input 
                      type="tel" 
                      required
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-mono focus:border-cyan-400 focus:outline-none text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Industry segment:</label>
                    <select
                      value={demoForm.industry}
                      onChange={(e) => setDemoForm({ ...demoForm, industry: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs font-mono focus:border-cyan-400 focus:outline-none text-white"
                    >
                      <option>Healthcare</option>
                      <option>Education</option>
                      <option>Real Estate</option>
                      <option>Retail & D2C</option>
                      <option>Manufacturing</option>
                      <option>Professional Services</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Team Size:</label>
                    <select
                      value={demoForm.teamSize}
                      onChange={(e) => setDemoForm({ ...demoForm, teamSize: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs font-mono focus:border-cyan-400 focus:outline-none text-white"
                    >
                      <option>1-10 Agents</option>
                      <option>11-50 Agents</option>
                      <option>51-200 Agents</option>
                      <option>200+ Agents</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Monthly Chats:</label>
                    <select
                      value={demoForm.conversations}
                      onChange={(e) => setDemoForm({ ...demoForm, conversations: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs font-mono focus:border-cyan-400 focus:outline-none text-white"
                    >
                      <option>Under 1,000</option>
                      <option>1,000 - 10,000</option>
                      <option>10,000 - 50,000</option>
                      <option>50,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-gray-400 uppercase">Consulting Notes / message:</label>
                  <textarea 
                    value={demoForm.message}
                    onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                    placeholder="Describe your current support ticketing bottlenecks..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-mono focus:border-cyan-400 focus:outline-none h-24 text-white"
                  />
                </div>

                {/* Math CAPTCHA Code Validation Block */}
                <div className="p-4 bg-black/30 border border-white/5 rounded-xl space-y-3">
                  <span className="text-[10px] font-mono text-gray-400 block font-bold uppercase">Human verification challenge</span>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/30 rounded text-xs font-mono text-cyan-300 font-bold select-none">
                      What is: {captchaNum1} + {captchaNum2} = ?
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        placeholder="Result"
                        className="w-20 bg-black/40 border border-white/10 rounded-lg p-1.5 text-xs font-mono text-center text-white"
                      />
                      <button 
                        type="button"
                        onClick={handleCaptchaVerify}
                        className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-mono font-bold"
                      >
                        Verify Math
                      </button>
                    </div>
                    {captchaVerified && (
                      <span className="text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1">
                        ✓ Verified!
                      </span>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={formLoading || !captchaVerified}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold rounded-lg text-sm transition-all disabled:opacity-50"
                >
                  {formLoading ? 'Synchronizing Webhooks...' : 'Secure Live Demo Slot'}
                </button>

              </form>
            )}
          </div>
        </div>

        {/* ==========================================
            16. FINAL HIGH IMPACT CTA
           ========================================== */}
        <div id="final_cta" className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-950 via-cyan-950/20 to-slate-950 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#00ffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-white">
              Bring Every Conversation Into <br /> One Platform.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Consolidate customer communications and scale resolution efficiency using BusinessOS™. Complete setup with your team in under 2 hours.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a 
                href="#demo_form"
                className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-cyan-300 hover:scale-[1.01] transition-all text-xs font-mono uppercase"
              >
                Secure Consultation Demo
              </a>
              <a 
                href="#roi_calculator"
                className="px-6 py-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-400 transition-all text-xs font-mono uppercase"
              >
                Recalculate Savings
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
