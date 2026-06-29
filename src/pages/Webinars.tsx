import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  Play, 
  Award, 
  CheckCircle, 
  Download, 
  Globe, 
  Cpu, 
  Database, 
  Mail, 
  Phone, 
  Building, 
  User, 
  TrendingUp, 
  ShieldAlert, 
  Share2, 
  RefreshCw, 
  Sliders, 
  Calculator,
  MessageSquare,
  BookmarkCheck,
  Percent,
  DollarSign,
  Briefcase,
  Layers,
  Zap,
  Lock,
  ArrowUpRight,
  Target,
  FileText,
  MapPin,
  Clock,
  BriefcaseIcon,
  Users,
  Compass,
  GraduationCap,
  ChevronRight,
  Send,
  UploadCloud,
  Heart,
  Eye,
  Settings,
  Calendar as CalendarIcon,
  CheckCircle2,
  FileDown,
  Volume2,
  Tv,
  Check,
  X,
  Info,
  BookOpen
} from 'lucide-react';
import { RoutePath } from '../types';

interface WebinarsProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

// Event interface
interface EventCard {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  speaker: string;
  speakerRole: string;
  speakerImage: string;
  badge: string;
  countdownDays: number;
  countdownHours: number;
  countdownMinutes: number;
  description: string;
}

export default function Webinars({ setPath, darkMode }: WebinarsProps) {
  // Navigation & Category states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Interactive Quiz state (Personalized Learning Path)
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState({
    role: '',
    focus: '',
    experience: ''
  });
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Certificate generator state
  const [certName, setCertName] = useState<string>('');
  const [certEvent, setCertEvent] = useState<string>('AI Marketing Masterclass');
  const [generatedCert, setGeneratedCert] = useState<boolean>(false);

  // AI Event Assistant state
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    { sender: 'assistant', text: "Hello! I am your Natton Event Intelligence assistant. Ask me about upcoming bootcamps, speaker agendas, or n8n integration playbooks." }
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  // Past library carousel state
  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);
  const [playVideoUrl, setPlayVideoUrl] = useState<string | null>(null);

  // Calendar Booking States (Cal.com mockup)
  const [selectedCalDate, setSelectedCalDate] = useState<number | null>(15);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [calBookingSuccess, setCalBookingSuccess] = useState<boolean>(false);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '' });

  // Registration states
  const [regForm, setRegForm] = useState({
    fullName: '',
    companyName: '',
    industry: 'Technology',
    country: 'United States',
    email: '',
    phone: '',
    eventSelection: 'AI Marketing Masterclass',
    primaryGoal: 'Learn workflow automation'
  });
  const [regCaptchaValue, setRegCaptchaValue] = useState<string>('');
  const [userCaptchaInput, setUserCaptchaInput] = useState<string>('');
  const [regCaptchaError, setRegCaptchaError] = useState<boolean>(false);
  const [regSubmitting, setRegSubmitting] = useState<boolean>(false);
  const [regSuccess, setRegSuccess] = useState<boolean>(false);
  const [recTicketId, setRecTicketId] = useState<string>('');

  // Active FAQ index
  const [faqOpenStates, setFaqOpenStates] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false
  });

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRegCaptchaValue(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Quick category tags
  const categories = [
    'all',
    'AI Marketing',
    'CRM',
    'WhatsApp Automation',
    'AI Calling',
    'AI Agents',
    'n8n Automation',
    'SEO + AEO',
    'Business Growth'
  ];

  // Upcoming Event Datasets with Countdowns
  const upcomingEvents: EventCard[] = [
    {
      id: 'ai-mkt',
      title: 'AI Marketing Masterclass',
      category: 'AI Marketing',
      date: 'July 12, 2026',
      time: '11:00 AM EST (8:30 PM IST)',
      duration: '90 Minutes',
      speaker: 'Elena S.',
      speakerRole: 'Principal Growth Marketer',
      speakerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      badge: 'Highly Popular',
      countdownDays: 13,
      countdownHours: 4,
      countdownMinutes: 24,
      description: 'Discover how to engineer high-velocity SEO campaigns, deploy predictive AI visual grids, and scale automated email lists.'
    },
    {
      id: 'wa-auto',
      title: 'WhatsApp Automation Workshop',
      category: 'WhatsApp Automation',
      date: 'July 18, 2026',
      time: '10:00 AM EST (7:30 PM IST)',
      duration: '120 Minutes',
      speaker: 'Nikhil R.',
      speakerRole: 'Head of AI Operations',
      speakerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      badge: 'Live Coding',
      countdownDays: 19,
      countdownHours: 3,
      countdownMinutes: 10,
      description: 'Learn to wire up n8n workflows with WhatsApp Cloud APIs to drive automatic customer onboarding and qualification.'
    },
    {
      id: 'ai-call',
      title: 'AI Calling Bootcamp',
      category: 'AI Calling',
      date: 'July 24, 2026',
      time: '2:00 PM EST (11:30 PM IST)',
      duration: '75 Minutes',
      speaker: 'Marcus K.',
      speakerRole: 'Enterprise Integration Lead',
      speakerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      badge: 'Limited Seats',
      countdownDays: 25,
      countdownHours: 7,
      countdownMinutes: 45,
      description: 'See live deployment of natural-sounding voice agent loops equipped with multi-language capabilities and direct CRM triggers.'
    },
    {
      id: 'n8n-auto',
      title: 'n8n Automation Masterclass',
      category: 'n8n Automation',
      date: 'August 02, 2026',
      time: '11:00 AM EST (8:30 PM IST)',
      duration: '150 Minutes',
      speaker: 'Nikhil R.',
      speakerRole: 'Head of AI Operations',
      speakerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      badge: 'Advanced Workflow',
      countdownDays: 34,
      countdownHours: 4,
      countdownMinutes: 15,
      description: 'Deep dive into complex conditional branches, webhook parsing, relational database syncing, and self-repairing n8n nodes.'
    },
    {
      id: 'ai-agents',
      title: 'AI Agents For Business',
      category: 'AI Agents',
      date: 'August 10, 2026',
      time: '3:00 PM EST (12:30 AM IST)',
      duration: '90 Minutes',
      speaker: 'Elena S.',
      speakerRole: 'Principal Growth Marketer',
      speakerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      badge: 'New Session',
      countdownDays: 42,
      countdownHours: 8,
      countdownMinutes: 5,
      description: 'Design self-governing multi-agent systems to manage client billing queries, email ticket triage, and automated reporting.'
    },
    {
      id: 'growth-crm',
      title: 'GrowthOS™ CRM Workshop',
      category: 'CRM',
      date: 'August 18, 2026',
      time: '12:00 PM EST (9:30 PM IST)',
      duration: '90 Minutes',
      speaker: 'Marcus K.',
      speakerRole: 'Enterprise Integration Lead',
      speakerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      badge: 'Strategy Focal',
      countdownDays: 50,
      countdownHours: 5,
      countdownMinutes: 0,
      description: 'Streamline lead qualification pipelines in GoHighLevel using visual dashboards and custom triggers linked with n8n.'
    }
  ];

  // Filtered upcoming events matching category & search queries
  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter(evt => {
      const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;
      const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            evt.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Past Library Recordings
  const pastRecordings = [
    {
      title: 'Programmatic SEO Scaling Systems',
      category: 'SEO + AEO',
      date: 'June 18, 2026',
      duration: '110 Mins',
      views: '2.4K Views',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Dummy embeds
      speaker: 'Elena S.',
      resources: ['SEO Template Sheet', 'Schema Markup Code'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Zero-Overhead Invoice Automations',
      category: 'CRM',
      date: 'May 28, 2026',
      duration: '95 Mins',
      views: '1.8K Views',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      speaker: 'Marcus K.',
      resources: ['Invoice Webhook n8n JSON', 'Stripe Pipeline PDF'],
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Deploying @google/genai Multi-Agent Nodes',
      category: 'AI Agents',
      date: 'April 14, 2026',
      duration: '140 Mins',
      views: '3.9K Views',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      speaker: 'Nikhil R.',
      resources: ['Agent Loop Code (TypeScript)', 'System Prompts PDF'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400'
    }
  ];

  // Interactive Quiz handler
  const handleQuizAnswer = (field: string, val: string) => {
    const updated = { ...quizAnswers, [field]: val };
    setQuizAnswers(updated);
    
    if (quizStep < 2) {
      setQuizStep(prev => prev + 1);
    } else {
      // Calculate output recommendation
      let recommendation = '';
      if (updated.role === 'marketing' || updated.focus === 'leads') {
        recommendation = "Elena's 'AI Marketing Masterclass' on July 12 and the 'Programmatic SEO Scaling' playback system. You will benefit heavily from deploying dynamic landing page schema nodes.";
      } else if (updated.role === 'engineer' || updated.focus === 'nodes') {
        recommendation = "Nikhil's advanced 'n8n Automation Masterclass' on August 02 and the @google/genai Multi-Agent source code library. Start with deploying server-side automated loops.";
      } else {
        recommendation = "Marcus's 'GrowthOS™ CRM Workshop' on August 18 and our bespoke GHL Webhook automations to construct zero-overhead client portals.";
      }
      setQuizResult(recommendation);
      setQuizStep(3);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({ role: '', focus: '', experience: '' });
    setQuizResult(null);
  };

  // Certificate Dynamic Creation
  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim()) return;
    setGeneratedCert(true);
  };

  // Chatbot submission response
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    // Simulated responses
    setTimeout(() => {
      let reply = "I'm checking our active event database... ";
      const textLower = userMsg.toLowerCase();
      if (textLower.includes('marketing') || textLower.includes('seo')) {
        reply += "Elena S. leads our AI Marketing Masterclass on July 12, focusing on programmatic search optimization and AEO. Register directly via our upcoming cards.";
      } else if (textLower.includes('whatsapp') || textLower.includes('wa')) {
        reply += "The WhatsApp Automation Workshop runs on July 18. It covers wiring n8n loops directly to the official Meta Cloud API endpoints.";
      } else if (textLower.includes('n8n') || textLower.includes('automation')) {
        reply += "Nikhil R. hosts the n8n Automation Masterclass on August 02. He will show live construction of multi-branched nodes and error-recovery pipelines.";
      } else if (textLower.includes('price') || textLower.includes('free') || textLower.includes('cost')) {
        reply += "All live webinars and resources at Natton Digital are completely free of charge. Our goal is to build authority and empower MSMEs worldwide.";
      } else {
        reply += "You can easily secure access to all upcoming workshops, templates, and sandbox code by submitting the unified event registration form below. Is there a specific integration you wanted to automate?";
      }
      setChatMessages(prev => [...prev, { sender: 'assistant', text: reply }]);
    }, 1000);
  };

  // Cal.com interaction simulation
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const timeSlots = ['09:30 AM EST', '11:00 AM EST', '01:30 PM EST', '03:30 PM EST', '05:00 PM EST'];

  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCalDate || !selectedTimeSlot || !bookingForm.name || !bookingForm.email) return;
    setCalBookingSuccess(true);
  };

  // Registration Form Submit Handler
  const handleRegisterEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (userCaptchaInput.toUpperCase() !== regCaptchaValue) {
      setRegCaptchaError(true);
      generateCaptcha();
      return;
    }
    
    setRegCaptchaError(false);
    setRegSubmitting(true);

    // Simulate webhook POST to n8n & lead intake to GoHighLevel
    setTimeout(() => {
      setRegSubmitting(false);
      setRegSuccess(true);
      setRecTicketId(`NTN-EVT-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1800);
  };

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 20 rich, highly professional FAQs (meeting requirement count: 20)
  const faqList = [
    { q: "What platform do you use to host the live webinars?", a: "We primarily utilize Zoom Webinars paired with HD YouTube Live backup streams. Registered users receive direct, single-click access URLs automatically in their pre-event confirmation schedules." },
    { q: "Are Natton Digital webinars free to join?", a: "Yes, all our core educational webinars, workshops, and downloadable materials are 100% free of charge. We exist to build professional authority and directly nurture long-term trust with small businesses globally." },
    { q: "Can I receive a certificate of attendance?", a: "Absolutely! After completing a session (or watching its full recording library), you can use our dynamic on-page Certificate Engine to generate and download an official verified certificate." },
    { q: "Will I get access to the actual n8n workflow files shown during live coding?", a: "Yes, 100%. We provide complete downloadable JSON blueprints, system prompts, and sandbox API variables inside the 'Downloads & Event Resources' segment on this page immediately after the session concludes." },
    { q: "Is the Cal.com interactive scheduler integrated with actual expert hours?", a: "Yes, our interactive calendar allows high-intent prospects to bypass initial ticket triage and directly schedule 1-on-1 strategy calls with our Lead AI Architects or Growth Specialists." },
    { q: "What should I do if I register but cannot attend live?", a: "No worries at all! Since everything is recorded, we automatically push HD video files, speaker slide links, and prompt notebooks to your registered email address within 3 hours after we go off-air." },
    { q: "Do you offer private, custom workshops for corporate teams?", a: "We do. If your enterprise requires specialized on-site or digital training in GoHighLevel setup, multi-agent pipelines, or n8n node architectures, please use the 'Book Strategy Session' trigger to discuss tailored packages." },
    { q: "What is GoHighLevel (GHL) and why is it used in your automation flows?", a: "GoHighLevel is a leading CRM that unifies funnel building, email/SMS sequences, and customer pipelines. We use it as our central intake engine, connecting webhooks with n8n to log attendees, distribute reminder pings, and track user lifecycle events." },
    { q: "How does the on-page AI Resume Parser or Personal Path Quiz analyze choices?", a: "Our logic weights your operational role, primary scaling hurdles, and experience depth to instantly curate the exact masterclass sequence, workflow guides, and template files that will save you the most time." },
    { q: "Which AI models are discussed in the engineering sessions?", a: "We focus on Google's Gemini Flash and Pro models, Anthropic Claude Sonnet, and customized open-weights Llama pipelines. We emphasize the official `@google/genai` SDK and structured JSON output techniques." },
    { q: "Can I ask questions live during the masterclasses?", a: "Yes! Every event has a dedicated 30-minute Live Q&A block. You can type queries directly into the chat or raise your hand to speak voice-to-voice with our panelists." },
    { q: "How often are new events scheduled?", a: "We organize 2 major live masterclasses and 1 hands-on coding workshop every single month. Bookmark this page or join our VIP WhatsApp Community to stay updated on new announcements." },
    { q: "Can we collaborate with Natton Digital as a partner or guest speaker?", a: "We love spotlighting stellar operators! If you have built innovative automation engines, scaled programmatic campaigns, or pioneered advanced AI workflows, reach out via the email on our Contact section." },
    { q: "What is an 'Event Automation Journey'?", a: "It is the exact multi-node operational workflow we use to manage this platform. We show the exact blueprint: user submits form -> GHL creates contact -> n8n schedules Zoom & triggers Resend email -> WhatsApp reminders ping -> Live Event ends -> Recording email is delivered automatically." },
    { q: "How long are the sessions?", a: "Workshops run for 90 to 120 minutes because we write code and wire API nodes in real-time. Bootcamps can run up to 150 minutes, whereas strategy masterclasses are a highly compact 60-75 minutes." },
    { q: "Is there a limit to the number of registrants?", a: "Yes. Zoom has a maximum limit of 1,000 live participants per session. We recommend logging on 5 minutes prior to the broadcast to guarantee your seat." },
    { q: "Do these automations comply with GDPR and privacy standards?", a: "All systems we design, write, and deploy (including GHL and n8n pipelines) prioritize absolute data security, data-minimization, secure cookie storage, and full encryption. We operate securely across ISO 27001 standard server clusters." },
    { q: "Can beginners participate in n8n sessions?", a: "Absolutely! We structure workshops sequentially. The first 30 minutes are always fundamental building blocks, so beginners can follow along easily before we step into advanced conditional logic." },
    { q: "Are there any prerequisites before attending?", a: "No advanced setup is required, but having a free n8n cloud or self-hosted account and a Google AI Studio account is highly recommended so you can copy and test our sandbox nodes on the fly." },
    { q: "How can I join the VIP WhatsApp Community?", a: "Simply scroll to the Community card section on this page, click 'Join WhatsApp Group' to get immediate access to real-time chats, session alerts, and community-only resources." }
  ];

  return (
    <div className="min-h-screen bg-[#0B0721] text-white py-16 relative overflow-hidden font-sans">
      
      {/* Background Visual Grid & Electric Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[70%] rounded-full bg-blue-500/10 blur-[150px] animate-pulse" />
        <div className="absolute top-[30%] right-[-15%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[65%] h-[65%] rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-28">
        
        {/* ========================================================
            SECTION 1: HERO SECTION - Knowledge Galaxy
            ======================================================== */}
        <section id="hero" className="relative pt-12 pb-6 flex flex-col lg:flex-row items-center gap-12 text-left">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#00C2FF] text-[10px] font-mono tracking-widest uppercase font-bold">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#00C2FF]" />
              Premium Educational Masterclasses
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
              Learn. Build. <br/>
              Grow <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] via-purple-400 to-[#00E599]">With AI.</span>
            </h1>
            
            <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Join live AI webinars, workshops and expert masterclasses designed for MSMEs and SMBs looking to leverage next-gen AI CRM, n8n automations, and agent workflows. Build authority, generate real pipelines, and nurture prospects.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => smoothScrollTo('upcoming_events')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:opacity-95 text-white font-mono font-black text-xs rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                Register For Upcoming Events <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => smoothScrollTo('recordings')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                Watch Past Recordings
              </button>
            </div>
          </div>
          
          {/* Animated 3D Knowledge Galaxy representation */}
          <div className="lg:w-1/2 w-full flex justify-center relative">
            <div className="relative w-full max-w-md h-96 rounded-3xl border border-white/10 bg-[#110B33]/40 backdrop-blur-md p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              
              {/* Spinning decorative orbits */}
              <div className="absolute w-80 h-80 rounded-full border border-dashed border-white/5 animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-60 h-60 rounded-full border border-dashed border-blue-500/10 animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-40 h-40 rounded-full border border-dashed border-emerald-500/15 animate-[spin_20s_linear_reverse_infinite]" />
              
              {/* Floating Interactive Webinar Nodes */}
              <div className="absolute top-10 left-10 p-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-mono">1</div>
                <span className="text-[10px] font-mono text-gray-300 font-bold">Marketing Node</span>
              </div>

              <div className="absolute top-20 right-8 p-2.5 rounded-xl border border-purple-500/20 bg-purple-500/5 flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-mono">2</div>
                <span className="text-[10px] font-mono text-gray-300 font-bold">n8n Automation</span>
              </div>

              <div className="absolute bottom-24 left-14 p-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono">3</div>
                <span className="text-[10px] font-mono text-gray-300 font-bold">CRM Webhooks</span>
              </div>

              <div className="absolute bottom-12 right-12 p-2.5 rounded-xl border border-white/5 bg-white/5 flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-white/10 text-gray-300 flex items-center justify-center text-[10px] font-mono">4</div>
                <span className="text-[10px] font-mono text-gray-300 font-bold">AI Call Nodes</span>
              </div>

              {/* Central Knowledge Galaxy Core */}
              <div className="relative z-10 p-6 rounded-2xl bg-[#0B0721] border border-white/10 text-center space-y-3 max-w-[200px] shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 flex items-center justify-center mx-auto animate-pulse">
                  <Tv className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Knowledge Hub</h4>
                <p className="text-[9px] text-gray-400 leading-relaxed">Interactive live stages connecting 10k+ SMB operators.</p>
              </div>

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="rgba(0, 194, 255, 0.15)" strokeWidth="1" />
                <line x1="75%" y1="28%" x2="50%" y2="50%" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
                <line x1="30%" y1="72%" x2="50%" y2="50%" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1" />
                <line x1="70%" y1="85%" x2="50%" y2="50%" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: UPCOMING EVENTS (Cards + Timers)
            ======================================================== */}
        <section id="upcoming_events" className="space-y-10 scroll-mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">LIVE CALENDAR</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Upcoming Masterclasses</h2>
              <p className="text-xs text-gray-400 max-w-xl">Live, hands-on, zero-fluff educational experiences designed to save manual hours.</p>
            </div>
            
            {/* Search and Quick Category filter */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Search workshops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/[0.03] border border-white/10 rounded-lg py-1.5 pl-8 pr-4 text-xs font-sans text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div 
                key={evt.id}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-blue-500/30 hover:bg-white/[0.02] transition-all relative flex flex-col justify-between overflow-hidden group text-left"
              >
                {/* Floating blur decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00C2FF]/10 to-transparent rounded-bl-full pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[#00C2FF] text-[9px] font-mono font-bold uppercase tracking-wider">
                      {evt.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-[#00E599] flex items-center gap-1 bg-[#00E599]/10 px-2 py-0.5 rounded">
                      <Clock className="h-3 w-3" /> {evt.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black font-display text-white group-hover:text-[#00C2FF] transition-colors leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Dynamic Countdown Timer Widget */}
                  <div className="p-3 rounded-lg bg-[#110B33]/60 border border-white/5 grid grid-cols-3 gap-2 text-center font-mono relative">
                    <div className="absolute -top-2 left-3 px-1.5 py-0.5 rounded bg-[#0B0721] border border-white/5 text-[8px] text-gray-500 font-bold uppercase tracking-wider">
                      Starts In
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white font-display">{evt.countdownDays}</span>
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest">Days</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white font-display">{evt.countdownHours}</span>
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest">Hours</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-[#00C2FF] font-display">{evt.countdownMinutes}</span>
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest">Mins</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[10px] text-gray-400 font-mono">
                    <p className="flex items-center gap-2">
                      <CalendarIcon className="h-3.5 w-3.5 text-blue-400" /> {evt.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-blue-400" /> {evt.time} ({evt.duration})
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img src={evt.speakerImage} alt={evt.speaker} className="w-7 h-7 rounded-full object-cover border border-white/10" />
                    <div>
                      <p className="text-[10px] font-bold text-white">{evt.speaker}</p>
                      <p className="text-[8px] text-gray-500 font-mono">{evt.speakerRole}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setRegForm(prev => ({ ...prev, eventSelection: evt.title }));
                      smoothScrollTo('registration');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-mono text-[9px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1 shrink-0"
                  >
                    RSVP FREE <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 3: EVENT CATEGORIES (Bento Grid Layout)
            ======================================================== */}
        <section id="event_categories" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">INTELLIGENT FOCUS</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Browse By Category</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Explore high-fidelity webinars organized across eight core modern functional pillars.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { title: 'AI Marketing', count: '14 Webinars', desc: 'Programmatic campaigns, schema generators, metadata engines', path: 'AI Marketing', icon: Cpu },
              { title: 'CRM', count: '9 Workshops', desc: 'GoHighLevel triggers, visual pipeline dashboard syncs, lead intake', path: 'CRM', icon: Database },
              { title: 'WhatsApp Automation', count: '11 Bootcamps', desc: 'Official Cloud API integrations, chat triggers, state engines', path: 'WhatsApp Automation', icon: MessageSquare },
              { title: 'AI Calling', count: '7 Labs', desc: 'Asynchronous voice agents, low-latency loops, CRM logging', path: 'AI Calling', icon: Phone },
              { title: 'AI Agents', count: '12 Masterclasses', desc: '@google/genai orchestration, multi-agent frameworks, JSON parsing', path: 'AI Agents', icon: Sliders },
              { title: 'n8n Automation', count: '16 Build sessions', desc: 'Webhook loops, conditional logic branches, custom API codes', path: 'n8n Automation', icon: Zap },
              { title: 'SEO + AEO', count: '8 Lectures', desc: 'LLM answer ranking, dynamic site generator schemas, indexes', path: 'SEO + AEO', icon: Target },
              { title: 'Business Growth', count: '10 Briefs', desc: 'MSME pricing strategies, structural team models, client audits', path: 'Business Growth', icon: TrendingUp }
            ].map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  setSelectedCategory(cat.path);
                  smoothScrollTo('upcoming_events');
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 group relative overflow-hidden ${
                  selectedCategory === cat.path 
                    ? 'border-[#00C2FF] bg-[#00C2FF]/5 shadow-lg' 
                    : 'border-white/5 bg-white/[0.01] hover:border-purple-500/20 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/10 group-hover:scale-110 transition-transform">
                    <cat.icon className="h-4 w-4 text-[#00C2FF]" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">{cat.count}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-display group-hover:text-[#00C2FF] transition-colors">{cat.title}</h4>
                  <p className="text-[9px] text-gray-500 mt-1.5 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 4: FEATURED WEBINAR & SPEAKER (Split Screen)
            ======================================================== */}
          <section id="featured_webinar" className="p-8 sm:p-12 rounded-3xl border border-white/5 bg-[#110B33]/20 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/5 to-transparent blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Features Details */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[#00E599] text-[9px] font-mono font-bold uppercase tracking-wider">
                  Featured Masterclass
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
                  Autonomous Leads Intake Engine
                </h2>
                
                <p className="text-xs text-gray-400 leading-relaxed">
                  Master the art of coding a multi-stage inbound database. We will build a live React + n8n pipeline that listens to webhooks, filters spam with AI, and registers leads directly to a secure custom Postgres.
                </p>

                {/* Split screen elements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01]">
                    <h5 className="font-bold text-[#00C2FF] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" /> Speaker Panel
                    </h5>
                    <p className="text-gray-400 text-[10px]">Elena S. (Growth) & Nikhil R. (AI Ops)</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01]">
                    <h5 className="font-bold text-[#00C2FF] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> Agenda Duration
                    </h5>
                    <p className="text-gray-400 text-[10px]">120 Mins live coding + Q&A</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01]">
                    <h5 className="font-bold text-[#00E599] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5" /> Outcomes
                    </h5>
                    <p className="text-gray-400 text-[10px]">Deployable JSON node templates</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01]">
                    <h5 className="font-bold text-[#00E599] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Live Q&A Segment
                    </h5>
                    <p className="text-gray-400 text-[10px]">Instant custom audit feedback</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      setRegForm(prev => ({ ...prev, eventSelection: 'Autonomous Leads Intake Engine' }));
                      smoothScrollTo('registration');
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-white font-mono font-bold text-[10px] tracking-wider uppercase rounded-lg transition-all"
                  >
                    REGISTER FREE WORKSHOP
                  </button>
                  <a 
                    href="#recordings" 
                    onClick={(e) => { e.preventDefault(); smoothScrollTo('recordings'); }}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-[10px] tracking-wider uppercase rounded-lg transition-colors border border-white/5"
                  >
                    View slides & Resources
                  </a>
                </div>
              </div>

              {/* Right Side: Immersive Screen Recording / Video Player Mock */}
              <div className="w-full flex justify-center">
                <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0B0721]/90 overflow-hidden shadow-2xl">
                  {/* Top toolbar */}
                  <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-gray-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live Coding Sandbox
                    </span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                    </div>
                  </div>

                  {/* Video preview or mock active screen recording */}
                  <div className="relative h-56 bg-cover bg-center flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600')]">
                    <div className="absolute inset-0 bg-[#0B0721]/85 backdrop-blur-[1px]" />
                    
                    {/* Visual code snippet overlaid */}
                    <pre className="absolute top-4 left-4 text-[7px] text-[#00C2FF] font-mono text-left leading-normal opacity-40 select-none">
                      {`async function triggerPipeline(leadData) {
  const node = await n8n.webhook.post('/GhLIntake', {
    name: leadData.fullName,
    email: leadData.email,
    metadata: { route: 'webinars' }
  });
  return node.success;
}`}
                    </pre>

                    <div className="relative z-10 text-center space-y-3">
                      <button 
                        onClick={() => setPlayVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')}
                        className="w-12 h-12 rounded-full bg-emerald-500 hover:scale-105 transition-all text-white flex items-center justify-center shadow-lg"
                      >
                        <Play className="h-6 w-6 fill-white ml-0.5" />
                      </button>
                      <p className="text-[10px] font-mono font-bold text-white">Preview 15-Min Live Demo</p>
                    </div>
                  </div>

                  {/* Bottom status */}
                  <div className="p-3 bg-white/[0.02] border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-gray-500">
                    <span>File size: 140MB</span>
                    <span>Format: H.264 HD</span>
                    <span className="text-[#00E599]">Blueprints Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* ========================================================
            SECTION 5: SPEAKER SECTION (3D / Glassmorphic Speaker Profiles)
            ======================================================== */}
        <section id="speaker_section" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">EXPERT PANEL</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Meet The Speakers</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Learn from verified engineers and marketers who design real systems for enterprise brands.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Nikhil R.', title: 'AI Solution Architect', tag: 'Core Engineering', desc: 'Expert in @google/genai, server-side TS bundlers, and custom automated agent orchestrations.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
              { name: 'Elena S.', title: 'Growth Strategist', tag: 'Marketing Tech', desc: 'Over 8 years scaling organic pipelines, programmatic indexing structures, and automated lead conversions.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
              { name: 'Marcus K.', title: 'Automation Specialist', tag: 'n8n Integrations', desc: 'Workflow design specialist focused on Webhook systems, complex relational CRM maps, and API keys security.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
              { name: 'Anjali P.', title: 'CRM Expert', tag: 'Client Operations', desc: 'Specialized in building end-to-end CRM workflows, user lifecycle mapping, and GoHighLevel dashboards.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' }
            ].map((spk, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#00C2FF]/30 transition-all text-center space-y-4 group relative overflow-hidden"
              >
                {/* 3D-Like floating background bubble */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                
                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-purple-500 group-hover:scale-105 transition-transform duration-300">
                  <img src={spk.image} alt={spk.name} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-[#00C2FF] font-bold uppercase tracking-wider bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                    {spk.tag}
                  </span>
                  <h4 className="text-sm font-black font-display text-white mt-2">{spk.name}</h4>
                  <p className="text-[10px] text-gray-500 font-mono font-bold uppercase">{spk.title}</p>
                </div>

                <p className="text-[10px] text-gray-400 leading-relaxed font-sans px-2">
                  {spk.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 6: EVENT CALENDAR (Cal.com Interactive Grid Mock)
            ======================================================== */}
        <section id="event_calendar" className="space-y-8 scroll-mt-20">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">CAL.COM INTEGRATION</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Event Calendar</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Pick a direct available slot on our July 2026 expert calendar to book a 1-on-1 strategy sync.</p>
          </div>

          <div className="max-w-4xl mx-auto p-6 rounded-3xl border border-white/10 bg-[#110B33]/20 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Left side: Calendar days */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-[#00C2FF]">July 2026</span>
                <span className="text-gray-500">timezone: GMT+5:30 (India)</span>
              </div>
              
              <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-mono text-gray-400">
                <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                
                {/* Pad first 2 columns since July 2026 starts on Wednesday */}
                <span className="opacity-20">-</span><span className="opacity-20">-</span>
                
                {daysInMonth.map(day => (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedCalDate(day);
                      setSelectedTimeSlot(null);
                    }}
                    className={`aspect-square rounded flex items-center justify-center font-bold border transition-colors ${
                      selectedCalDate === day 
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                        : 'border-white/5 bg-white/5 text-gray-300 hover:border-emerald-500/50 hover:bg-[#00E599]/5'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side: Time slots selector */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Selected: <span className="text-[#00C2FF]">July {selectedCalDate}, 2026</span>
              </h4>
              
              {!calBookingSuccess ? (
                <div className="space-y-3">
                  <p className="text-[10px] text-gray-400 leading-normal">Select an available expert strategy time-slot below:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-3 rounded-lg text-[10px] font-mono transition-colors text-left border ${
                          selectedTimeSlot === slot 
                            ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold' 
                            : 'border-white/5 bg-[#0B0721] text-gray-300 hover:border-emerald-500/30'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  {selectedTimeSlot && (
                    <motion.form 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleBookSlot} 
                      className="space-y-2.5 pt-4 border-t border-white/5"
                    >
                      <input 
                        type="text" 
                        placeholder="Your full name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-[#0B0721] border border-white/10 rounded-lg p-2 text-[10px] focus:outline-none focus:border-emerald-500"
                        required
                      />
                      <input 
                        type="email" 
                        placeholder="Work email address"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-[#0B0721] border border-white/10 rounded-lg p-2 text-[10px] focus:outline-none focus:border-emerald-500"
                        required
                      />
                      <button 
                        type="submit"
                        className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider transition-colors"
                      >
                        CONFIRM STRATEGY SESSION
                      </button>
                    </motion.form>
                  )}
                </div>
              ) : (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-3"
                >
                  <CheckCircle className="h-8 w-8 text-emerald-400 mx-auto" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00E599]">Cal.com Node Synced!</h4>
                  <p className="text-[10px] text-gray-300 leading-relaxed">
                    Strategy slot for <strong>July {selectedCalDate} at {selectedTimeSlot}</strong> booked successfully. Meeting link dispatched via Resend API loop.
                  </p>
                  <button 
                    onClick={() => {
                      setCalBookingSuccess(false);
                      setSelectedTimeSlot(null);
                      setBookingForm({ name: '', email: '' });
                    }}
                    className="text-[9px] text-[#00C2FF] font-mono hover:underline"
                  >
                    Book another slot
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 7: PAST WEBINAR LIBRARY (Video Carousel & embeds)
            ======================================================== */}
        <section id="recordings" className="space-y-10 scroll-mt-20">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">RECORDING VAULT</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Past Webinar Library</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Missed a session? Access our entire historical masterclass archive complete with slides and credentials.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            {pastRecordings.map((rec, i) => (
              <div 
                key={i}
                className="rounded-2xl border border-white/5 bg-[#110B33]/20 overflow-hidden flex flex-col justify-between group hover:border-[#00C2FF]/20 transition-all"
              >
                <div className="relative h-44 bg-cover bg-center" style={{ backgroundImage: `url(${rec.image})` }}>
                  <div className="absolute inset-0 bg-[#0B0721]/70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => setPlayVideoUrl(rec.videoUrl)}
                      className="w-10 h-10 rounded-full bg-[#00C2FF]/90 hover:scale-105 transition-transform flex items-center justify-center text-white"
                    >
                      <Play className="h-5 w-5 fill-white ml-0.5" />
                    </button>
                  </div>
                  <span className="absolute top-3 left-3 bg-[#0B0721]/80 px-2 py-0.5 rounded text-[8px] font-mono text-gray-400">
                    {rec.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-emerald-500/90 text-white px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider">
                    {rec.views}
                  </span>
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white font-display group-hover:text-[#00C2FF] transition-colors">{rec.title}</h4>
                    <p className="text-[10px] text-gray-500 font-mono">Streamed on {rec.date} • {rec.duration}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/5">
                    <p className="text-[9px] font-mono text-[#00C2FF] uppercase font-bold tracking-wider">Included Resources:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.resources.map((res, rIdx) => (
                        <span key={rIdx} className="text-[8px] font-mono bg-white/5 px-2 py-0.5 rounded text-gray-400 flex items-center gap-1">
                          <FileText className="h-2.5 w-2.5 text-gray-500" /> {res}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Video Modal Player */}
          {playVideoUrl && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                <button 
                  onClick={() => setPlayVideoUrl(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
                >
                  <X className="h-5 w-5" />
                </button>
                <iframe 
                  src={playVideoUrl} 
                  title="Webinar playback video" 
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </section>

        {/* ========================================================
            SECTION 8: DOWNLOADS & RESOURCES
            ======================================================== */}
        <section id="downloads" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">RESOURCES AND BLUEPRINTS</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Event Resources</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Direct, production-ready, downloadable blueprints to launch pipelines without delays.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
            {[
              { title: 'Presentation Slides', count: '12 Sets', size: '24 MB', format: 'PDF', icon: FileDown },
              { title: 'Workflow Templates', count: '18 Flows', size: '12 MB', format: 'JSON/n8n', icon: Settings },
              { title: 'AI Operational Playbooks', count: '6 Guides', size: '15 MB', format: 'PDF', icon: BookOpen },
              { title: 'Diagnostic Worksheets', count: '8 Audits', size: '8 MB', format: 'XLSX', icon: Sliders },
              { title: 'System Prompt Libraries', count: '24 Prompts', size: '2 MB', format: 'TXT', icon: Cpu }
            ].map((res, i) => (
              <div 
                key={i}
                className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#00C2FF]/30 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/10 w-fit group-hover:scale-110 transition-transform">
                    <res.icon className="h-5 w-5 text-[#00C2FF]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-display">{res.title}</h4>
                    <p className="text-[9px] text-gray-500 mt-1 font-mono">{res.count} • {res.format}</p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-5 flex items-center justify-between text-[10px]">
                  <span className="text-gray-500 font-mono">{res.size}</span>
                  <button 
                    onClick={() => alert(`Simulated download of ${res.title}. Safe file bundle initiated!`)}
                    className="text-[#00E599] font-mono font-bold flex items-center gap-1 hover:underline text-[9px] uppercase tracking-wider"
                  >
                    Download <Download className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 9: COMMUNITY CARD
            ======================================================== */}
        <section id="community" className="max-w-4xl mx-auto p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-950/40 to-[#0B0721]/40 text-left relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-[#00E599]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-[#00E599] tracking-widest uppercase font-bold">EXCHANGE NETWORK</span>
              <h2 className="text-3xl font-black font-display text-white">Join The Community</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connect directly with thousands of tech-first business operators. Share active sandbox files, debug webhook nodes, and stay updated on our recurring live events.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-300 font-mono">
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#00E599]" /> WhatsApp Group</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#00E599]" /> Newsletter</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#00E599]" /> Monthly Events</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#00E599]" /> Sandbox Files</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/5 bg-[#0B0721]/80 text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <MessageSquare className="h-5 w-5 text-emerald-400" />
              </div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Natton Digital VIP Access</h4>
              <p className="text-[10px] text-gray-400">Collaborating on automation, scaling, and zero-lock-in AI databases.</p>
              <button 
                onClick={() => alert("Redirecting to WhatsApp VIP Community... Thank you for joining!")}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                JOIN WHATSAPP COMMUNITY <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 10: REGISTRATION FORM (Interactive Form + Captcha)
            ======================================================== */}
        <section id="registration" className="max-w-3xl mx-auto space-y-8 scroll-mt-20">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">SECURE SEAT</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Register For An Event</h2>
            <p className="text-xs text-gray-400">Fill your corporate details to log entries directly into GoHighLevel with automatic webhook notifications.</p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#110B33]/20 relative overflow-hidden text-left">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />

            {!regSuccess ? (
              <form onSubmit={handleRegisterEvent} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                      <input 
                        type="text" 
                        value={regForm.fullName}
                        onChange={(e) => setRegForm(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full bg-[#0B0721] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-blue-500"
                        placeholder="Alex Mercer"
                        required 
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Company Name *</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                      <input 
                        type="text" 
                        value={regForm.companyName}
                        onChange={(e) => setRegForm(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full bg-[#0B0721] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-blue-500"
                        placeholder="Acme Growth Inc."
                        required 
                      />
                    </div>
                  </div>

                  {/* Industry */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Industry</label>
                    <select 
                      value={regForm.industry}
                      onChange={(e) => setRegForm(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full bg-[#0B0721] border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Technology">Technology & SaaS</option>
                      <option value="Healthcare">Healthcare & Biotech</option>
                      <option value="Education">Education & EdTech</option>
                      <option value="Real Estate">Real Estate & Construction</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Manufacturing">Manufacturing & Retail</option>
                    </select>
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Country *</label>
                    <input 
                      type="text" 
                      value={regForm.country}
                      onChange={(e) => setRegForm(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full bg-[#0B0721] border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                      placeholder="United States / India"
                      required 
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Work Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                      <input 
                        type="email" 
                        value={regForm.email}
                        onChange={(e) => setRegForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-[#0B0721] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-blue-500"
                        placeholder="alex@acmegrowth.com"
                        required 
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                      <input 
                        type="tel" 
                        value={regForm.phone}
                        onChange={(e) => setRegForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-[#0B0721] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-blue-500"
                        placeholder="+1 (555) 304-4901"
                        required 
                      />
                    </div>
                  </div>

                  {/* Event selection */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Select Webinar / Workshop *</label>
                    <select 
                      value={regForm.eventSelection}
                      onChange={(e) => setRegForm(prev => ({ ...prev, eventSelection: e.target.value }))}
                      className="w-full bg-[#0B0721] border border-white/10 rounded-xl py-2 px-3 text-xs text-[#00C2FF] focus:outline-none focus:border-blue-500 font-bold"
                    >
                      {upcomingEvents.map(evt => (
                        <option key={evt.id} value={evt.title}>{evt.title}</option>
                      ))}
                      <option value="Autonomous Leads Intake Engine">Autonomous Leads Intake Engine</option>
                    </select>
                  </div>

                  {/* Primary goal */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Primary Scaling Hurdles</label>
                    <textarea 
                      value={regForm.primaryGoal}
                      onChange={(e) => setRegForm(prev => ({ ...prev, primaryGoal: e.target.value }))}
                      className="w-full bg-[#0B0721] border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-blue-500 h-20"
                      placeholder="What is your primary goal from this webinar? (e.g., configure n8n webhooks, migrate CRM data, scale organic channels)"
                    />
                  </div>
                </div>

                {/* Secure Captcha */}
                <div className="p-4 rounded-xl bg-[#0B0721] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-400">Verifying security node credentials:</span>
                    <button 
                      type="button" 
                      onClick={generateCaptcha}
                      className="text-[9px] text-[#00C2FF] font-mono flex items-center gap-1 hover:underline"
                    >
                      <RefreshCw className="h-3 w-3 animate-spin-slow" /> Regenerate Captcha
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 text-white font-mono font-bold tracking-widest text-sm rounded select-none line-through decoration-double decoration-purple-500">
                      {regCaptchaValue}
                    </div>
                    <input 
                      type="text" 
                      placeholder="Enter verification characters"
                      value={userCaptchaInput}
                      onChange={(e) => {
                        setUserCaptchaInput(e.target.value);
                        setRegCaptchaError(false);
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs font-mono text-center flex-1 focus:outline-none"
                      required
                    />
                  </div>
                  {regCaptchaError && (
                    <p className="text-[10px] text-red-400 font-mono">❌ Incorrect characters entered. Please check spelling and try again.</p>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={regSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:opacity-95 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {regSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" /> EXECUTING WEBHOK INTAKE LOOP...
                    </>
                  ) : (
                    <>
                      REGISTER FREE SEAT <BookmarkCheck className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6 py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 animate-bounce" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-black font-display text-white">Registration Complete!</h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">
                    Welcome onboard! Your credentials have been processed and synced with GoHighLevel databases successfully via n8n endpoints.
                  </p>
                </div>

                {/* Ticket code widget */}
                <div className="p-4 rounded-xl bg-[#0B0721] border border-dashed border-emerald-500/30 max-w-sm mx-auto font-mono text-center relative">
                  <div className="absolute top-1/2 left-0 w-3 h-6 -translate-y-1/2 bg-[#110B33] rounded-r-full border-r border-white/10" />
                  <div className="absolute top-1/2 right-0 w-3 h-6 -translate-y-1/2 bg-[#110B33] rounded-l-full border-l border-white/10" />
                  
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest block">Access Pass Code</span>
                  <p className="text-base font-black text-emerald-400 tracking-wider my-1">{recTicketId}</p>
                  <p className="text-[8px] text-gray-500 font-mono uppercase tracking-wide">Webinar Selected: {regForm.eventSelection}</p>
                </div>

                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setRegSuccess(false);
                      setRegForm({
                        fullName: '',
                        companyName: '',
                        industry: 'Technology',
                        country: 'United States',
                        email: '',
                        phone: '',
                        eventSelection: 'AI Marketing Masterclass',
                        primaryGoal: ''
                      });
                      setUserCaptchaInput('');
                      generateCaptcha();
                    }}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-colors"
                  >
                    Register another event
                  </button>
                  <button 
                    onClick={() => alert("Simulating Calendar schedule sync... Ticket code saved!")}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition-colors"
                  >
                    Add to Google Calendar
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ========================================================
            SECTION 11: AUTOMATION FLOW (Visual Journey Pipeline)
            ======================================================== */}
        <section id="automation_flow" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">PIPELINE GRAPH</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Event Automation Journey</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Explore the exact multi-node automated workflow system that powers this Webinars & Events engine.</p>
          </div>

          <div className="p-6 rounded-3xl border border-white/5 bg-[#110B33]/20 relative overflow-hidden">
            {/* Visual connected pipeline flowchart */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 relative z-10">
              {[
                { name: '1. Registration', step: 'Webhook Node', desc: 'React form emits webhooks directly to n8n webhook nodes.', color: '#00C2FF' },
                { name: '2. Confirmation', step: 'Resend API', desc: 'Secure email sent automatically with single-click Zoom URLs.', color: '#8B5CF6' },
                { name: '3. WhatsApp', step: 'Meta Cloud', desc: 'Friendly session alerts dispatched 24 hours prior to stream.', color: '#10B981' },
                { name: '4. Live Event', step: 'HD Broadcast', desc: 'Zoom webinar live Q&A with real-time screen record streams.', color: '#F59E0B' },
                { name: '5. Resources', step: 'Intake Vault', desc: 'Full playbooks, templates, and certificate pings dispatched.', color: '#EC4899' },
                { name: '6. Follow-Up', step: 'Smart Survey', desc: 'AI assistant gauges user responses and parses skill gains.', color: '#00C2FF' },
                { name: '7. Demo Sync', step: 'Cal.com Link', desc: 'Direct strategy consultations with Natton Lead Architects.', color: '#10B981' }
              ].map((flow, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/5 bg-[#0B0721]/80 space-y-3 relative group hover:border-[#00C2FF]/20 transition-all text-left">
                  <div className="flex justify-between items-center">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: flow.color }} />
                    <span className="text-[8px] font-mono text-gray-500 font-bold uppercase">Step 0{i+1}</span>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-white font-mono leading-tight">{flow.name}</h5>
                    <p className="text-[8px] font-bold font-mono text-purple-400 uppercase mt-0.5">{flow.step}</p>
                    <p className="text-[9px] text-gray-500 mt-2 leading-relaxed">{flow.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Connecting background graphics line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" xmlns="http://www.w3.org/2000/svg">
              <path d="M 50,110 Q 200,100 350,110 T 650,110 T 950,110" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        </section>

        {/* ========================================================
            SECTION 12: PERSONALIZED QUIZ & CERTIFICATES (AI FEATURES)
            ======================================================== */}
        <section id="ai_features" className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          
          {/* Box 1: Personalized Learning Path Quiz */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#110B33]/20 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">INTELLIGENT ROUTING</span>
              <h3 className="text-xl font-black font-display text-white">Personalized Path Quiz</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Take our quick 3-step AI recommendation quiz to instantly isolate which upcoming webinars, templates, and playbooks fit your business scaling goals.
              </p>

              <div className="p-5 rounded-2xl bg-[#0B0721]/80 border border-white/5 min-h-[160px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {quizStep === 0 && (
                    <motion.div 
                      key="step0" 
                      initial={{ opacity: 0, x: 10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }} 
                      className="space-y-3"
                    >
                      <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Step 1: What is your primary business role?</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button 
                          onClick={() => handleQuizAnswer('role', 'marketing')}
                          className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-blue-500 text-[10px] text-white font-mono uppercase tracking-wider text-left"
                        >
                          Marketer / Growth Lead
                        </button>
                        <button 
                          onClick={() => handleQuizAnswer('role', 'engineer')}
                          className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-blue-500 text-[10px] text-white font-mono uppercase tracking-wider text-left"
                        >
                          Developer / AI Engineer
                        </button>
                        <button 
                          onClick={() => handleQuizAnswer('role', 'owner')}
                          className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-blue-500 text-[10px] text-white font-mono uppercase tracking-wider text-left"
                        >
                          MSME Business Owner
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {quizStep === 1 && (
                    <motion.div 
                      key="step1" 
                      initial={{ opacity: 0, x: 10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }} 
                      className="space-y-3"
                    >
                      <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Step 2: What is your main automation focus?</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button 
                          onClick={() => handleQuizAnswer('focus', 'leads')}
                          className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-blue-500 text-[10px] text-white font-mono uppercase tracking-wider text-left"
                        >
                          Programmatic Lead Generation
                        </button>
                        <button 
                          onClick={() => handleQuizAnswer('focus', 'nodes')}
                          className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-blue-500 text-[10px] text-white font-mono uppercase tracking-wider text-left"
                        >
                          Asynchronous Node Workflows
                        </button>
                        <button 
                          onClick={() => handleQuizAnswer('focus', 'calling')}
                          className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-blue-500 text-[10px] text-white font-mono uppercase tracking-wider text-left"
                        >
                          AI Voice / Calling Integration
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {quizStep === 2 && (
                    <motion.div 
                      key="step2" 
                      initial={{ opacity: 0, x: 10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }} 
                      className="space-y-3"
                    >
                      <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Step 3: What is your team technical level?</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button 
                          onClick={() => handleQuizAnswer('experience', 'beginner')}
                          className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-blue-500 text-[10px] text-white font-mono uppercase tracking-wider text-left"
                        >
                          No-Code (n8n canvas / UI)
                        </button>
                        <button 
                          onClick={() => handleQuizAnswer('experience', 'advanced')}
                          className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:border-blue-500 text-[10px] text-white font-mono uppercase tracking-wider text-left"
                        >
                          TypeScript / REST APIs
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {quizStep === 3 && (
                    <motion.div 
                      key="step3" 
                      initial={{ opacity: 0, x: 10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      className="space-y-3"
                    >
                      <span className="text-[9px] font-mono text-[#00E599] font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                        ✓ AI MATCH FOUND
                      </span>
                      <p className="text-[11px] text-white leading-relaxed">
                        We recommend attending: {quizResult}
                      </p>
                      <button 
                        onClick={resetQuiz}
                        className="text-[9px] text-[#00C2FF] font-mono hover:underline uppercase block"
                      >
                        Reset quiz filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Box 2: Certificate Generation Engine */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#110B33]/20 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">CREDENTIAL ENGINE</span>
              <h3 className="text-xl font-black font-display text-white font-display">Generate Certificate</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Completed one of our masterclasses? Enter your professional name below to dynamically generate a verified credential to share on LinkedIn.
              </p>

              {!generatedCert ? (
                <form onSubmit={handleGenerateCertificate} className="space-y-3 p-4 rounded-2xl bg-[#0B0721]/80 border border-white/5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase">Your Name:</label>
                    <input 
                      type="text"
                      placeholder="Alex Mercer"
                      value={certName}
                      onChange={(e) => setCertName(e.target.value)}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase">Completed Webinar:</label>
                    <select 
                      value={certEvent}
                      onChange={(e) => setCertEvent(e.target.value)}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="AI Marketing Masterclass">AI Marketing Masterclass</option>
                      <option value="WhatsApp Automation Workshop">WhatsApp Automation Workshop</option>
                      <option value="AI Calling Bootcamp">AI Calling Bootcamp</option>
                      <option value="n8n Automation Masterclass">n8n Automation Masterclass</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider rounded-lg transition-colors"
                  >
                    GENERATE VERIFIED PDF
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 rounded-2xl bg-[#0B0721] border border-white/10 text-center space-y-3 relative overflow-hidden"
                >
                  {/* Decorative certificate outline */}
                  <div className="absolute inset-2 border border-dashed border-purple-500/30 rounded" />
                  
                  <div className="space-y-1 relative z-10 py-2">
                    <span className="text-[8px] font-mono text-[#00C2FF] uppercase tracking-widest font-bold">Certificate of Completion</span>
                    <h4 className="text-sm font-black font-display text-white mt-2 italic">Alex Mercer</h4>
                    <p className="text-[8px] text-gray-400 max-w-xs mx-auto">
                      has successfully finalized the masterclass:
                    </p>
                    <p className="text-[9px] font-bold text-emerald-400 font-mono my-1 uppercase">{certEvent}</p>
                    <span className="text-[8px] font-mono text-gray-500 block">Natton Digital Education Board • Verified SOC2 Node</span>
                  </div>

                  <div className="flex gap-2 justify-center relative z-10 border-t border-white/5 pt-3">
                    <button 
                      onClick={() => {
                        setGeneratedCert(false);
                        setCertName('');
                      }}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded text-[8px] font-mono uppercase text-gray-400"
                    >
                      Create another
                    </button>
                    <button 
                      onClick={() => alert("Simulated certificate download. Verified credential saved as PDF!")}
                      className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 rounded text-[8px] font-mono uppercase text-white font-bold flex items-center gap-1"
                    >
                      Download <Download className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 13: FAQ (Exactly 20 FAQs toggleable)
            ======================================================== */}
        <section id="faq" className="space-y-10 scroll-mt-20">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">INFO GRID</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Get transparent answers on scheduling, resource delivery, GHL syncs, and course accreditations.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {faqList.map((faq, i) => {
              const isOpen = faqOpenStates[i] || false;
              return (
                <div 
                  key={i} 
                  className="rounded-xl border border-white/5 bg-[#110B33]/20 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setFaqOpenStates(prev => ({ ...prev, [i]: !isOpen }))}
                    className="w-full p-4 flex justify-between items-center text-left hover:bg-white/[0.02]"
                  >
                    <span className="text-xs font-bold text-white pr-4 font-display flex items-start gap-2">
                      <span className="text-[#00C2FF] font-mono text-[9px]">0{i+1}.</span> {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform shrink-0 ${isOpen ? 'rotate-180 text-[#00C2FF]' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/5"
                      >
                        <p className="p-4 text-[10px] text-gray-400 leading-relaxed bg-[#0B0721]/50 font-sans">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            SECTION 14: FINAL CTA
            ======================================================== */}
        <section id="final_cta" className="p-8 sm:p-16 rounded-3xl border border-white/10 bg-gradient-to-br from-[#110B33] via-indigo-950 to-[#0B0721] text-center relative overflow-hidden">
          {/* Immersive mesh network decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#00C2FF03,transparent)] animate-pulse" />
          <div className="absolute top-[-10%] left-[-10%] w-60 h-60 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-60 h-60 bg-emerald-500/10 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-mono text-[#00E599] tracking-widest uppercase font-bold">SOVEREIGN SCALING</span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
              Accelerate Your AI Journey
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Ditch high-priced lock-in subscriptions. Register for our upcoming live webinars or secure a dedicated 1-on-1 strategy audit slot directly on our Cal.com integration.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <button 
                onClick={() => smoothScrollTo('registration')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 text-white font-mono font-black text-xs rounded-xl hover:opacity-95 transition-all shadow-lg"
              >
                Register Now
              </button>
              <button 
                onClick={() => smoothScrollTo('event_calendar')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-colors"
              >
                Book Strategy Session
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Floating Interactive AI Assistant (Side drawer or floating card) */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isAssistantOpen ? (
          <button 
            onClick={() => setIsAssistantOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all"
            title="Ask AI Assistant"
          >
            <MessageSquare className="h-6 w-6 animate-pulse" />
          </button>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-80 h-96 rounded-2xl border border-white/15 bg-[#0B0721]/95 backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <span className="text-[10px] font-mono font-bold uppercase text-[#00C2FF] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Event Intelligence AI
              </span>
              <button onClick={() => setIsAssistantOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message list */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-left text-[10px]">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-xl max-w-[85%] ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500/10 text-blue-300 ml-auto border border-blue-500/20' 
                      : 'bg-white/5 text-gray-300 border border-white/5'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Input field */}
            <form onSubmit={handleSendChatMessage} className="p-2 border-t border-white/10 bg-white/[0.01] flex gap-1.5">
              <input 
                type="text" 
                placeholder="Ask about workshops (e.g. n8n, GHL)..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="bg-[#110B33] border border-white/10 rounded-lg p-2 text-[10px] focus:outline-none focus:border-[#00C2FF] flex-1"
                required
              />
              <button type="submit" className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </div>

    </div>
  );
}
