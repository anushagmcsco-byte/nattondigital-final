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
  Settings,
  Calendar,
  Clock,
  User,
  Building,
  Mail,
  Coins,
  ArrowUpRight,
  TrendingDown,
  Info,
  Laptop
} from 'lucide-react';
import { RoutePath } from '../types';

interface BookDemoProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function BookDemo({ setPath, darkMode }: BookDemoProps) {
  // Wizard Active Step
  // Steps: 
  // 0: Business Details
  // 1: Industry
  // 2: Challenges
  // 3: Goals
  // 4: Current Tools
  // 5: Budget
  // 6: Recommended Solutions & Live ROI Preview
  // 7: Schedule Meeting & Cal.com Integration
  const [currentStep, setCurrentStep] = useState<number>(0);
  const stepsList = [
    "Business Details", 
    "Industry", 
    "Challenges", 
    "Goals", 
    "Current Tools", 
    "Budget", 
    "Recommended Solutions", 
    "Schedule Meeting"
  ];

  // Form State / Wizard Selections
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    website: '',
    email: '',
    phone: '',
    country: 'India',
    monthlyRevenue: '₹1L - ₹5L', // Default range matching options
    industry: 'Healthcare',
    challenges: [] as string[],
    goals: [] as string[],
    currentTools: [] as string[],
    budget: '₹50K - ₹1L',
    selectedMeetingType: '60 Min Strategy Session',
    selectedDate: '2026-06-30',
    selectedTimeSlot: '11:00 AM',
    briefMessage: ''
  });

  // Testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      name: "Dr. Rajesh Khanna",
      role: "Operations Director, Khanna Health Group",
      quote: "The patient triage WhatsApp bot and CRM automation transformed our intake workflow. We saw a 72% efficiency boost and completely eliminated missed inquiries.",
      metric: "+72% Intake Efficiency",
      tags: ["Healthcare", "WhatsApp Automation"]
    },
    {
      name: "Meera Sen",
      role: "Founder, Zenith Academy",
      quote: "We deployed the admissions counselor agent. It nurtures thousands of student queries 24/7. Enrollment inquiries increased 3.5x over the last semester.",
      metric: "3.5x Enrollment Query Scale",
      tags: ["Education", "AI Agents"]
    },
    {
      name: "Vikram Malhotra",
      role: "VP Marketing, Prime Horizon Properties",
      quote: "Our sales team used to call leads hours later. Now, the AI voice agent qualifies and routes buyers to our GHL calendar in 12 seconds. Absolute game-changer.",
      metric: "82% Qualified Tour Bookings",
      tags: ["Real Estate", "AI Voice Calling"]
    },
    {
      name: "Anil Singhal",
      role: "Chief of Logistics, Nexa Manufacturing",
      quote: "Connecting our stock triggers to logistics dispatch webhooks with n8n has restored 99.4% accuracy to our shipping timelines and saved massive administration hours.",
      metric: "99.4% Dispatch Accuracy",
      tags: ["Manufacturing", "n8n Workflows"]
    }
  ];

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Verification & Submission state
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [wizardErrors, setWizardErrors] = useState<string>('');

  // Auto scroll top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Industry options list
  const industries = [
    "Healthcare",
    "Education",
    "Real Estate",
    "Manufacturing",
    "Retail & Ecommerce",
    "Professional Services",
    "Other"
  ];

  // Challenge options list
  const challengesOptions = [
    "Lead Generation",
    "Low Conversion",
    "Manual Processes",
    "Poor Follow-Up",
    "Customer Support",
    "Marketing ROI",
    "Operations",
    "Scaling"
  ];

  // Goal options list
  const goalsOptions = [
    "More Leads",
    "More Revenue",
    "Automation",
    "CRM",
    "WhatsApp Automation",
    "AI Calling",
    "AI Agents",
    "Complete Transformation"
  ];

  // Tools list
  const toolsOptions = [
    "HubSpot",
    "GoHighLevel",
    "Zoho",
    "Salesforce",
    "Excel",
    "WhatsApp",
    "No CRM",
    "Other"
  ];

  // Budget options list
  const budgetOptions = [
    "Below ₹25K",
    "₹25K - ₹50K",
    "₹50K - ₹1L",
    "₹1L - ₹5L",
    "₹5L+"
  ];

  // Handle Multi-Selection toggles
  const handleToggleChallenge = (challenge: string) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
    }));
  };

  const handleToggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleToggleTool = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      currentTools: prev.currentTools.includes(tool)
        ? prev.currentTools.filter(t => t !== tool)
        : [...prev.currentTools, tool]
    }));
  };

  // Live ROI Projection logic
  const calculateROI = () => {
    let baseRevenue = 200000; // default mapping for calculations
    if (formData.monthlyRevenue === 'Below ₹25K') baseRevenue = 20000;
    else if (formData.monthlyRevenue === '₹25K - ₹50K') baseRevenue = 37000;
    else if (formData.monthlyRevenue === '₹50K - ₹1L') baseRevenue = 75000;
    else if (formData.monthlyRevenue === '₹1L - ₹5L') baseRevenue = 300000;
    else if (formData.monthlyRevenue === '₹5L+') baseRevenue = 800000;

    // Projected revenue growth coefficient based on goals selected
    let growthFactor = 1.15; // default 15% increase
    if (formData.goals.includes("Complete Transformation") || formData.goals.includes("More Revenue")) growthFactor += 0.15;
    if (formData.goals.includes("AI Calling") || formData.goals.includes("More Leads")) growthFactor += 0.10;
    if (formData.goals.includes("WhatsApp Automation")) growthFactor += 0.08;

    // Time saved calculation based on challenges
    let hoursSaved = 10; // base weekly hours saved
    if (formData.challenges.includes("Manual Processes")) hoursSaved += 15;
    if (formData.challenges.includes("Customer Support")) hoursSaved += 8;
    if (formData.challenges.includes("Poor Follow-Up")) hoursSaved += 12;

    const projectedRevenue = baseRevenue * growthFactor;
    const directIncrease = projectedRevenue - baseRevenue;
    const returnOnInvestment = (directIncrease / 50000) * 100; // simple model over token price estimate

    return {
      monthlyIncrease: Math.round(directIncrease).toLocaleString('en-IN'),
      projectedAnnual: Math.round(directIncrease * 12).toLocaleString('en-IN'),
      weeklyHours: hoursSaved,
      roiPercentage: Math.round(returnOnInvestment),
      rawRevenue: baseRevenue,
      rawProjected: projectedRevenue
    };
  };

  const roiData = calculateROI();

  // Dynamic recommendation logic matching specifications
  const getRecommendedSolutions = () => {
    const recommended: { name: string; tag: string; desc: string; icon: any }[] = [];
    
    const hasLeadGoal = formData.goals.includes("More Leads") || formData.challenges.includes("Lead Generation") || formData.challenges.includes("Marketing ROI");
    const hasAutomationGoal = formData.goals.includes("Automation") || formData.goals.includes("WhatsApp Automation") || formData.goals.includes("AI Calling") || formData.challenges.includes("Manual Processes") || formData.challenges.includes("Customer Support");
    const hasEnterpriseGoal = formData.goals.includes("AI Agents") || formData.goals.includes("Complete Transformation") || formData.challenges.includes("Scaling") || formData.budget === "₹5L+";

    if (hasLeadGoal) {
      recommended.push({
        name: "AI Marketing Platform™",
        tag: "Lead & Funnel Domination",
        desc: "Automated Omni-channel Funnel architectures paired with semantic AI Answer Engine Optimization.",
        icon: Sparkles
      });
      recommended.push({
        name: "GrowthOS™",
        tag: "Unified GoHighLevel CRM",
        desc: "Unified customer acquisition environment with automated scheduling nodes and response workflows.",
        icon: TrendingUp
      });
    }

    if (hasAutomationGoal) {
      recommended.push({
        name: "BusinessOS™",
        tag: "Omnichannel Support",
        desc: "Custom support hubs, ticketing systems, and secure knowledge repositories for unified teams.",
        icon: Layers
      });
      recommended.push({
        name: "WhatsApp Automation Suite",
        tag: "Official Meta Cloud API",
        desc: "Robust localized symptom checking, catalog purchases, and dynamic checkouts natively in WhatsApp.",
        icon: MessageSquare
      });
      recommended.push({
        name: "AI Calling Agent Node",
        tag: "Low-latency Voice Bots",
        desc: "Automated outbound and inbound dialers that speak natural regional languages to pre-qualify leads.",
        icon: Phone
      });
    }

    if (hasEnterpriseGoal || recommended.length === 0) {
      recommended.push({
        name: "AgenticOS™ Node",
        tag: "Autonomous Workforce",
        desc: "Complex n8n webhook networks and sovereign AI agents executing database lookups and operations.",
        icon: Cpu
      });
      recommended.push({
        name: "Custom AI Agents",
        tag: "Proprietary Guardrails",
        desc: "Enterprise-grade sandboxed RAG pipelines tailored exactly to security, compliance, and custom software systems.",
        icon: ShieldCheck
      });
    }

    return recommended.slice(0, 3); // top 3
  };

  const recommendedSolutions = getRecommendedSolutions();

  // Handle step validations
  const validateStep = () => {
    setWizardErrors('');
    if (currentStep === 0) {
      if (!formData.fullName.trim()) return "Full Name is required.";
      if (!formData.companyName.trim()) return "Company Name is required.";
      if (!formData.email.trim() || !formData.email.includes('@')) return "A valid Email Address is required.";
      if (!formData.phone.trim()) return "Phone Number is required.";
    }
    if (currentStep === 1) {
      if (!formData.industry) return "Please select your industry.";
    }
    if (currentStep === 2) {
      if (formData.challenges.length === 0) return "Please select at least one core challenge.";
    }
    if (currentStep === 3) {
      if (formData.goals.length === 0) return "Please select at least one business goal.";
    }
    return null;
  };

  const handleNextStep = () => {
    const error = validateStep();
    if (error) {
      setWizardErrors(error);
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, stepsList.length - 1));
  };

  const handlePrevStep = () => {
    setWizardErrors('');
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Final submit simulation
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWizardErrors('');
    
    if (!captchaChecked) {
      setWizardErrors("Please confirm you are not a robot (Captcha).");
      return;
    }

    setSubmitting(true);
    // Simulate API calls to GoHighLevel API, n8n webhook, and Resend
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 2000);
  };

  // Team Selection Data
  const teamMembers = [
    {
      role: "AI Solution Architect",
      specialization: "Automation & AI Infrastructure",
      desc: "Architects secure sandboxed RAG, n8n workflow nodes, and custom telephone calling channels.",
      name: "Arjun Mehta"
    },
    {
      role: "Growth Strategist",
      specialization: "Marketing & Conversion Funnels",
      desc: "Optimizes omnichannel campaigns, landing pages, and Answer Engine Optimization blueprints.",
      name: "Siddharth Roy"
    },
    {
      role: "CRM Specialist",
      specialization: "GrowthOS™ Custom Implementations",
      desc: "Configures GoHighLevel automation pipelines, triggers, regional SMS routers, and sales pipelines.",
      name: "Priya Sharma"
    }
  ];

  // FAQ List (15 items as specified)
  const faqs = [
    {
      q: "What is the goal of this strategy session?",
      a: "The goal is to analyze your current growth pipelines, audit manual operational bottlenecks, and map out a bespoke AI transformation blueprint. We determine which GrowthOS™, BusinessOS™, or AgenticOS™ modules will yield the highest financial returns for your business."
    },
    {
      q: "Is there any cost for the initial Discovery or Strategy meeting?",
      a: "No. The initial 30-minute discovery or 60-minute strategy session is completely complimentary for qualified businesses with established processes and growth intent."
    },
    {
      q: "How does the multi-step qualification work?",
      a: "We pre-assess your business details, industry constraints, daily challenges, and growth goals. This enables our Solutions Architect to research your market landscape and prepare fully functional recommendations before we even log on to the call."
    },
    {
      q: "What integrations will be deployed during the build?",
      a: "We natively connect GoHighLevel CRM workflows, n8n self-healing automation webhooks, official Meta Cloud APIs for WhatsApp catalogs, and custom voice telephony channels to deliver a unified conversion ecosystem."
    },
    {
      q: "Can we use Cal.com to customize meeting schedules?",
      a: "Absolutely. We utilize Cal.com integration to let you seamlessly choose an available time slot matching our specialists, automatically sending secure Google Calendar invites with localized reminders."
    },
    {
      q: "What CRM systems do you support?",
      a: "Our core framework operates on GrowthOS™ (our proprietary, pre-optimized CRM layout built on top of GoHighLevel). However, our custom n8n nodes can seamlessly synchronize with legacy databases, Salesforce, HubSpot, or Zoho if needed."
    },
    {
      q: "How fast do your voice calling agents respond?",
      a: "Our AI Telephone dialers utilize low-latency speech pipelines delivering conversational response rates in under 1.2 seconds, communicating fluently in English, Hindi, and regional Indian languages."
    },
    {
      q: "Is my business data secure under GoHighLevel and n8n pipelines?",
      a: "Yes. All workflows operate over secure TLS 1.3 channels, with data encrypted at rest (AES-256) and sandboxed strictly to prevent any unauthorized data leaks. We maintain rigorous compliance parameters."
    },
    {
      q: "What is n8n and why do you prefer it over Zapier?",
      a: "n8n is a next-generation visual workflow designer that can be self-hosted on private secure servers. It allows for complex custom JavaScript payloads, visual debugging, and unlimited operations without the predatory transaction volume limits of Zapier."
    },
    {
      q: "How does the post-booking automation flow handle my request?",
      a: "Immediately upon booking, our backend webhooks trigger an instant GHL Contact Card, dispatch a Resend confirmation email, schedule Google Calendar assets, and send a custom WhatsApp pre-call questionnaire link."
    },
    {
      q: "What if my monthly revenue is below the specified options?",
      a: "Select the option that matches closest. We work with progressive brands at various milestones, provided there is a clear product/market fit and intent to automate operations."
    },
    {
      q: "Do you offer localized support packages after delivery?",
      a: "Yes. Through our Managed Services, we act as your fractional Chief AI Officers, tuning prompt guardrails, repairing external API breaks, and delivering weekly performance updates."
    },
    {
      q: "What is Answer Engine Optimization (AEO)?",
      a: "AEO is the practice of structuring your brand's digital presence so that advanced search engines like ChatGPT, Gemini, Copilot, and Perplexity actively recommend your business first when users query options."
    },
    {
      q: "How do you project the ROI metrics shown in the dashboard?",
      a: "We calculate metrics based on historical conversion growths seen across similar industries, factoring in your selected monthly revenue, target growth goals, and hours wasted on manual tasks."
    },
    {
      q: "How long does a typical build and deployment take?",
      a: "Standard GoHighLevel setups and custom WhatsApp notification sequences go live in 14 business days, while enterprise AgenticOS™ nodes take 4 to 6 weeks depending on compliance parameters."
    }
  ];

  return (
    <div className="bg-[#110B33] text-white min-h-screen font-sans antialiased text-left relative selection:bg-primary/30 selection:text-white">
      
      {/* Cinematic Glowing Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,255,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-0 w-[600px] h-[600px] bg-purple-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-16 border-b border-white/[0.08] overflow-hidden">
        {/* Animated neural network mesh background */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="mb-6 text-xs font-mono text-gray-400 tracking-wider">
            <button onClick={() => setPath('home')} className="hover:text-[#00C2FF] transition-colors">HOME</button>
            <span className="mx-2">/</span>
            <span className="text-[#00C2FF] font-bold">BOOK DEMO</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20">
                <Sparkles className="h-3 w-3 animate-pulse" /> HIGH-CONVERTING QUALIFICATION
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none text-white">
                Let's Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">AI Growth Engine</span>.
              </h1>
              
              <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
                Unlock enterprise-grade customer acquisition. Book a personalized strategy session and discover how our unified CRM workspaces, automated communication pipelines, and conversational voice agents can accelerate your growth.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#qualification-wizard"
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-primary hover:opacity-95 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  Start Qualification <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#team"
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all flex items-center gap-2"
                >
                  Talk To Experts <Users className="h-4 w-4 text-purple-400" />
                </a>
              </div>
            </div>

            {/* Hero Right: 3D Growth Ecosystem Representation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[420px] aspect-square rounded-3xl border border-white/[0.08] bg-white/[0.01] p-6 relative flex flex-col justify-between overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-purple-950/20 pointer-events-none" />
                
                <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-3">
                  <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase">🌌 GROWTH ECOSYSTEM</span>
                  <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold">SECURE PIPELINE</span>
                </div>

                {/* GrowthOS, BusinessOS, AgenticOS Interactive representation */}
                <div className="relative h-60 flex items-center justify-center">
                  <div className="absolute w-32 h-32 rounded-full border border-dashed border-[#00C2FF]/20 animate-spin" style={{ animationDuration: '30s' }} />
                  <div className="absolute w-24 h-24 rounded-full border border-dashed border-purple-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

                  {/* Nodes positioning */}
                  <div className="absolute -top-1 p-2 bg-gradient-to-r from-blue-500/20 to-[#00C2FF]/20 rounded-xl border border-[#00C2FF]/30 text-center text-[10px] font-mono">
                    <TrendingUp className="h-4 w-4 mx-auto mb-1 text-[#00C2FF]" />
                    <span className="font-bold text-white block">GrowthOS™</span>
                    <span className="text-[8px] text-gray-400">GHL CRM Core</span>
                  </div>

                  <div className="absolute bottom-1 left-2 p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl border border-purple-500/30 text-center text-[10px] font-mono">
                    <Layers className="h-4 w-4 mx-auto mb-1 text-purple-400" />
                    <span className="font-bold text-white block">BusinessOS™</span>
                    <span className="text-[8px] text-gray-400">Team Support</span>
                  </div>

                  <div className="absolute bottom-1 right-2 p-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30 text-center text-[10px] font-mono">
                    <Cpu className="h-4 w-4 mx-auto mb-1 text-emerald-400" />
                    <span className="font-bold text-white block">AgenticOS™</span>
                    <span className="text-[8px] text-gray-400">n8n AI Agents</span>
                  </div>

                  {/* Core connection particle path */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-indigo-600 blur-sm animate-pulse" />
                </div>

                <div className="relative z-10 border-t border-white/5 pt-3 flex items-center justify-between text-[8px] font-mono text-gray-500">
                  <span>SSL AT REST SECURITY</span>
                  <span>ENCRYPTED FLOWS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Success Metrics Banner */}
      <section className="py-12 border-b border-white/[0.08] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#00C2FF] font-semibold tracking-wider block">COMPLETED DELIVERIES</span>
              <p className="text-3xl sm:text-4xl font-black font-display text-white">100+</p>
              <span className="text-[10px] text-gray-400">Custom enterprise configurations</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-purple-400 font-semibold tracking-wider block">MESSAGING TRANSACTIONS</span>
              <p className="text-3xl sm:text-4xl font-black font-display text-white">10M+</p>
              <span className="text-[10px] text-gray-400">Automated CRM conversations run</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider block">CONTACTS ACQUIRED</span>
              <p className="text-3xl sm:text-4xl font-black font-display text-white">100K+</p>
              <span className="text-[10px] text-gray-400">Qualified leads managed securely</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-pink-400 font-semibold tracking-wider block">PROJECTED GROWTH</span>
              <p className="text-3xl sm:text-4xl font-black font-display text-white">3X</p>
              <span className="text-[10px] text-gray-400">Revenue attribution potential</span>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Multi-Step Wizard & Form Section */}
      <section id="qualification-wizard" className="py-24 border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">INTELLIGENT ROUTING</span>
            <h2 className="text-3xl font-black font-display text-white">Tell Us About Your Business</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Fill out this 8-step wizard to qualify your brand, analyze your custom ROI pipeline, and schedule your slot instantly.</p>
          </div>

          {/* Progress Tracker bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-400">Step {currentStep + 1} of {stepsList.length}: <span className="text-white font-bold">{stepsList[currentStep]}</span></span>
              <span className="text-[#00C2FF] font-bold">{Math.round(((currentStep + 1) / stepsList.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/[0.05]">
              <div 
                className="bg-gradient-to-r from-blue-400 via-primary to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / stepsList.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Wizard Content Panel */}
          <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-400 via-primary to-emerald-400" />
            
            {wizardErrors && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex gap-2 items-center">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{wizardErrors}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                
                {/* STEP 0: Business Details */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-display text-white">Enter Your Contact & Business Coordinates</h3>
                    <p className="text-xs text-gray-400">Provide your basic contact coordinates. Our CRM router creates your GoHighLevel profile instantly.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400 block font-semibold">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <input 
                            type="text"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={e => setFormData({...formData, fullName: e.target.value})}
                            className="w-full pl-10.5 pr-4 py-3 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400 block font-semibold">Company Name *</label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <input 
                            type="text"
                            placeholder="Acme Corp"
                            value={formData.companyName}
                            onChange={e => setFormData({...formData, companyName: e.target.value})}
                            className="w-full pl-10.5 pr-4 py-3 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400 block font-semibold">Business Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <input 
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full pl-10.5 pr-4 py-3 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400 block font-semibold">Phone Number (with WhatsApp capability) *</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <input 
                            type="text"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            className="w-full pl-10.5 pr-4 py-3 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400 block font-semibold">Company Website</label>
                        <div className="relative">
                          <Laptop className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <input 
                            type="text"
                            placeholder="https://company.com"
                            value={formData.website}
                            onChange={e => setFormData({...formData, website: e.target.value})}
                            className="w-full pl-10.5 pr-4 py-3 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400 block font-semibold">Current Monthly Revenue Range *</label>
                        <div className="relative">
                          <Coins className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <select 
                            value={formData.monthlyRevenue}
                            onChange={e => setFormData({...formData, monthlyRevenue: e.target.value})}
                            className="w-full pl-10.5 pr-4 py-3 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-colors appearance-none"
                          >
                            <option value="Below ₹25K">Below ₹25K / month</option>
                            <option value="₹25K - ₹50K">₹25K - ₹50K / month</option>
                            <option value="₹50K - ₹1L">₹50K - ₹1L / month</option>
                            <option value="₹1L - ₹5L">₹1L - ₹5L / month</option>
                            <option value="₹5L+">₹5L+ / month</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: Industry */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-display text-white">Select Your Industry Sector</h3>
                    <p className="text-xs text-gray-400">Choosing the correct industry loads highly customized n8n integration blueprints during your strategy review.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {industries.map((ind) => (
                        <div
                          key={ind}
                          onClick={() => setFormData({...formData, industry: ind})}
                          className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                            formData.industry === ind
                              ? 'bg-blue-500/10 border-[#00C2FF] text-[#00C2FF] scale-102 font-bold'
                              : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-mono block uppercase tracking-wider">{ind}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Challenges */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-display text-white">Identify Your Top Operations Bottlenecks</h3>
                    <p className="text-xs text-gray-400">Select any challenges you are experiencing. We analyze these to calculate your weekly hours wasted.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {challengesOptions.map((challenge) => {
                        const isChecked = formData.challenges.includes(challenge);
                        return (
                          <div
                            key={challenge}
                            onClick={() => handleToggleChallenge(challenge)}
                            className={`p-4 rounded-xl border flex justify-between items-center transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-purple-500/10 border-purple-500 text-purple-400'
                                : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                            }`}
                          >
                            <span className="text-xs font-mono font-bold">{challenge}</span>
                            <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-purple-500 border-purple-400' : 'border-white/25'}`}>
                              {isChecked && <Check className="h-3 w-3 text-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: Goals */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-display text-white">What Are You Looking To Achieve?</h3>
                    <p className="text-xs text-gray-400">Select the milestones you want to achieve through custom CRM work and AI integration.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {goalsOptions.map((goal) => {
                        const isChecked = formData.goals.includes(goal);
                        return (
                          <div
                            key={goal}
                            onClick={() => handleToggleGoal(goal)}
                            className={`p-4 rounded-xl border flex justify-between items-center transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                                : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                            }`}
                          >
                            <span className="text-xs font-mono font-bold">{goal}</span>
                            <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-emerald-500 border-emerald-400' : 'border-white/25'}`}>
                              {isChecked && <Check className="h-3 w-3 text-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: Current Tools */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-display text-white">Identify Current Tools In Use</h3>
                    <p className="text-xs text-gray-400">Select any CRM or communication systems you currently utilize. This maps our webhook target parameters.</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {toolsOptions.map((tool) => {
                        const isChecked = formData.currentTools.includes(tool);
                        return (
                          <div
                            key={tool}
                            onClick={() => handleToggleTool(tool)}
                            className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-blue-500/10 border-[#00C2FF] text-[#00C2FF] font-bold'
                                : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                            }`}
                          >
                            <span className="text-xs font-mono block uppercase tracking-wider">{tool}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5: Budget */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-display text-white">Select Your Targeted Investment Range</h3>
                    <p className="text-xs text-gray-400">This helps align the technical depth of the deployment (e.g., standard CRM builds vs. custom Sandboxed RAG AI bots).</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {budgetOptions.map((budget) => (
                        <div
                          key={budget}
                          onClick={() => setFormData({...formData, budget})}
                          className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                            formData.budget === budget
                              ? 'bg-violet-500/10 border-violet-500 text-violet-400 scale-102 font-bold'
                              : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-mono block uppercase tracking-wider">{budget}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 6: Recommended Solutions & Live ROI Preview */}
                {currentStep === 6 && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-display text-white">Your AI Blueprint Recommendation</h3>
                      <p className="text-xs text-gray-400">Based on your coordinates, industry bottlenecks, and target goals, we suggest deploying these elements:</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recommendedSolutions.map((sol, index) => {
                        const IconComponent = sol.icon;
                        return (
                          <div key={index} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col justify-between h-44 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-12 h-12 bg-[#00C2FF]/5 rounded-full blur-xl group-hover:scale-150 transition-all" />
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-[8px] font-mono text-gray-500 tracking-widest font-bold">MODULE 0{index + 1}</span>
                                <IconComponent className="h-4 w-4 text-[#00C2FF]" />
                              </div>
                              <span className="text-[10px] font-mono text-[#00C2FF] tracking-wider uppercase font-black">{sol.tag}</span>
                              <h4 className="text-xs font-bold text-white mt-1">{sol.name}</h4>
                              <p className="text-[10px] text-gray-400 leading-relaxed mt-1.5">{sol.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* LIVE ROI PREVIEW SCREEN */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#110B33] via-indigo-950/20 to-purple-950/20 border border-white/10 space-y-4 text-left">
                      <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase flex items-center gap-1">
                          <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" /> ESTIMATED POTENTIAL RECOVERY
                        </span>
                        <span className="text-[8px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded uppercase font-bold">ALGORITHMIC LOGS</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                          <span className="text-[9px] font-mono text-gray-400">Monthly Return Spike</span>
                          <span className="text-xl sm:text-2xl font-black text-emerald-400 block">₹{roiData.monthlyIncrease}</span>
                          <span className="text-[8px] font-mono text-gray-500">Based on growth multipliers</span>
                        </div>
                        <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                          <span className="text-[9px] font-mono text-gray-400">Admin Hours Reclaimed</span>
                          <span className="text-xl sm:text-2xl font-black text-blue-400 block">~{roiData.weeklyHours} hrs/wk</span>
                          <span className="text-[8px] font-mono text-gray-500">From automated workflows</span>
                        </div>
                        <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                          <span className="text-[9px] font-mono text-gray-400">Target ROI Attribution</span>
                          <span className="text-xl sm:text-2xl font-black text-purple-400 block">+{roiData.roiPercentage}%</span>
                          <span className="text-[8px] font-mono text-gray-500">Estimated system payback</span>
                        </div>
                      </div>

                      {/* Render custom beautifully animated interactive SVG ROI chart representing McKinsey-styled growth */}
                      <div className="relative pt-4">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-2">Estimated Revenue Scaling Curve (Next 5 Months)</span>
                        <div className="w-full aspect-[4/1.5] bg-[#110B33] border border-white/5 rounded-xl p-4 flex items-end justify-between relative overflow-hidden">
                          
                          {/* Grid line backgrounds */}
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 opacity-10">
                            <div className="border-b border-white w-full" />
                            <div className="border-b border-white w-full" />
                            <div className="border-b border-white w-full" />
                          </div>

                          {/* Render dynamic SVG Line graph */}
                          <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 400 120" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            {/* Area fill */}
                            <path 
                              d={`M 10 90 Q 100 ${90 - (roiData.roiPercentage * 0.05)} 200 ${80 - (roiData.roiPercentage * 0.1)} 300 ${65 - (roiData.roiPercentage * 0.15)} 390 ${40 - (roiData.roiPercentage * 0.2)} L 390 110 L 10 110 Z`}
                              fill="url(#chartGrad)" 
                            />
                            {/* Line path */}
                            <path 
                              d={`M 10 90 Q 100 ${90 - (roiData.roiPercentage * 0.05)} 200 ${80 - (roiData.roiPercentage * 0.1)} 300 ${65 - (roiData.roiPercentage * 0.15)} 390 ${40 - (roiData.roiPercentage * 0.2)}`}
                              fill="none" 
                              stroke="#10B981" 
                              strokeWidth="2.5" 
                            />
                            {/* Circular indicator */}
                            <circle cx="390" cy={40 - (roiData.roiPercentage * 0.2)} r="4" fill="#10B981" stroke="#fff" strokeWidth="1" />
                          </svg>

                          <span className="text-[8px] font-mono text-gray-500 z-10">Month 1</span>
                          <span className="text-[8px] font-mono text-gray-500 z-10">Month 2</span>
                          <span className="text-[8px] font-mono text-gray-500 z-10">Month 3</span>
                          <span className="text-[8px] font-mono text-gray-500 z-10">Month 4</span>
                          <span className="text-[8px] font-mono text-emerald-400 font-bold z-10">Month 5 (₹{Math.round(roiData.rawProjected).toLocaleString('en-IN')})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 7: Schedule Meeting & Cal.com Theme Integration */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-display text-white">Schedule Your Strategy Session</h3>
                    <p className="text-xs text-gray-400">Choose your preferred session length. This replicates our secure Cal.com router, scheduling a calendar slot natively with zero delay.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: "30 Min Discovery Call", desc: "Basic pre-triage audit, review channels and coordinates.", color: "text-blue-400 border-blue-500/20 bg-blue-500/5" },
                        { title: "60 Min Strategy Session", desc: "Complete 12-month blueprint mapping, n8n schema analysis.", color: "text-purple-400 border-purple-500/20 bg-purple-500/5" },
                        { title: "90 Min AI Transformation Workshop", desc: "Deep architectural review, custom sandboxed RAG outlines.", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" }
                      ].map((item, idx) => {
                        const isSelected = formData.selectedMeetingType === item.title;
                        return (
                          <div
                            key={idx}
                            onClick={() => setFormData({...formData, selectedMeetingType: item.title})}
                            className={`p-4 rounded-xl border text-left transition-all cursor-pointer h-36 flex flex-col justify-between ${
                              isSelected
                                ? 'bg-white/5 border-[#00C2FF] text-white scale-102'
                                : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                            }`}
                          >
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${item.color}`}>{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
                                {isSelected && <CheckCircle className="h-4 w-4 text-[#00C2FF]" />}
                              </div>
                              <h4 className="text-xs font-bold font-display mt-2">{item.title}</h4>
                              <p className="text-[10px] text-gray-400 leading-relaxed mt-1">{item.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Simulating Cal.com interactive picker */}
                    <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-7 space-y-3">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Select Date:</span>
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            { day: "Tue", date: "2026-06-30", label: "30 June" },
                            { day: "Wed", date: "2026-07-01", label: "01 July" },
                            { day: "Thu", date: "2026-07-02", label: "02 July" },
                            { day: "Fri", date: "2026-07-03", label: "03 July" },
                            { day: "Mon", date: "2026-07-06", label: "06 July" }
                          ].map((d) => {
                            const isSelected = formData.selectedDate === d.date;
                            return (
                              <button
                                key={d.date}
                                type="button"
                                onClick={() => setFormData({...formData, selectedDate: d.date})}
                                className={`p-2 rounded-lg border text-center transition-all ${
                                  isSelected
                                    ? 'bg-blue-500/20 border-[#00C2FF] text-[#00C2FF]'
                                    : 'bg-[#110B33] border-white/5 text-gray-400 hover:border-white/25'
                                }`}
                              >
                                <span className="text-[8px] font-mono block text-gray-500 font-bold uppercase">{d.day}</span>
                                <span className="text-[10px] font-bold block mt-1">{d.label.split(' ')[0]}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="md:col-span-5 space-y-3 border-t md:border-t-0 md:border-l border-white/5 md:pl-6 pt-4 md:pt-0">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Select Time (IST):</span>
                        <div className="grid grid-cols-3 gap-2">
                          {["10:00 AM", "11:00 AM", "02:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"].map((t) => {
                            const isSelected = formData.selectedTimeSlot === t;
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setFormData({...formData, selectedTimeSlot: t})}
                                className={`p-2 rounded-lg border text-center text-[10px] font-mono transition-all ${
                                  isSelected
                                    ? 'bg-blue-500/20 border-[#00C2FF] text-[#00C2FF] font-bold'
                                    : 'bg-[#110B33] border-white/5 text-gray-400 hover:border-white/25'
                                }`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Wizard Navigation Panel */}
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-white text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              {currentStep < stepsList.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-5 py-2.5 rounded-lg bg-primary hover:bg-opacity-95 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  Next Step <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  {/* Captcha checkbox matching specs */}
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      id="captcha"
                      checked={captchaChecked}
                      onChange={e => setCaptchaChecked(e.target.checked)}
                      className="w-4 h-4 rounded border-white/15 bg-[#110B33] text-[#00C2FF] focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="captcha" className="text-[10px] font-mono text-gray-400 cursor-pointer select-none">Verify I am not a robot</label>
                  </div>

                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={submitting}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-primary hover:opacity-95 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-primary/20"
                  >
                    {submitting ? "Processing..." : "Complete Your Booking"} <CheckCircle className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Post-Booking Flow Simulator shown if submitted successfully */}
          {formSubmitted && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl space-y-6 text-left"
            >
              <div className="flex justify-between items-start border-b border-emerald-500/10 pb-4">
                <div className="flex gap-3 items-center">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Booking Received & CRM Pipelines Triggered!</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">We've simulated our live n8n pipeline + GoHighLevel integration successfully.</p>
                  </div>
                </div>
                <button onClick={() => setFormSubmitted(false)} className="text-gray-500 hover:text-white"><X className="h-4 w-4" /></button>
              </div>

              {/* POST-BOOKING EXPERIENCE: Workflow Diagram visual */}
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">POST-BOOKING AUTOMATION FLOW (n8n Webhook Actions)</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 relative">
                  {[
                    { title: "Confirmation Email", label: "Resend dispatched", detail: "HTML invite + agenda parameters" },
                    { title: "Calendar Invite", label: "Google Cal synced", detail: "Auto-reserved slot on calendar" },
                    { title: "WhatsApp Alert", label: "Meta Cloud API", detail: "Dispatched direct confirmation sequence" },
                    { title: "AI Diagnostic", label: "Readiness Link", detail: "Redirects client for triage prep" },
                    { title: "Pre-Call Form", label: "GoHighLevel triggers", detail: "Scrapes challenges coordinates" },
                    { title: "Reminder Sequence", label: "SMS + Dialer Core", detail: "Dispatches regional reminders" }
                  ].map((act, index) => (
                    <div key={index} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1 relative group">
                      <div className="absolute top-0 right-0 p-1 text-[8px] font-mono text-emerald-400 font-bold bg-emerald-400/10 rounded">OK</div>
                      <span className="text-[10px] font-bold text-white block">{act.title}</span>
                      <span className="text-[8px] font-mono text-emerald-400 block font-semibold">{act.label}</span>
                      <span className="text-[8px] text-gray-500 block leading-tight mt-1">{act.detail}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#110B33] border border-white/5 rounded-xl flex items-center justify-between text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-[#00C2FF]" />
                    <span>Pipeline Webhook Status: <span className="text-emerald-400 font-bold">200 OK</span></span>
                  </div>
                  <span>Total dispatch speed: <span className="text-[#00C2FF] font-bold">142ms</span></span>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* Team Selection Section */}
      <section id="team" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">OUR SPECIALISTS</span>
            <h2 className="text-3xl font-black font-display text-white">Meet The Team</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Our specialists collaborate side-by-side to deploy systems tailored exactly to your growth parameters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] flex flex-col justify-between h-64 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-[#00C2FF]/5 transition-all" />
                <div>
                  <span className="text-[9px] font-mono text-[#00C2FF] tracking-wider uppercase font-black">{member.role}</span>
                  <h3 className="text-lg font-bold text-white font-display mt-1">{member.name}</h3>
                  <span className="text-[10px] font-mono text-purple-400 block mt-1">{member.specialization}</span>
                  <p className="text-xs text-gray-400 leading-relaxed mt-4">{member.desc}</p>
                </div>
                <div className="border-t border-white/5 pt-3 text-[10px] font-mono text-gray-500 group-hover:text-purple-400 transition-colors">
                  ACTIVE ON DISCOVERY SCHEDULERS
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-24 border-b border-white/[0.08] bg-white/[0.01] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">PROOF OF PERFORMANCE</span>
            <h2 className="text-3xl font-black font-display text-white">Businesses Growing With Natton Digital</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Read how partners across major industries scale up operations with our CRM and AI pipelines.</p>
          </div>

          {/* Testimonial Active Slider Card */}
          <div className="relative bg-[#110B33] border border-white/10 p-8 sm:p-10 rounded-3xl text-left space-y-6">
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <div className="space-y-1">
                <span className="text-sm font-bold text-[#00C2FF]">{testimonials[activeTestimonial].name}</span>
                <p className="text-xs text-gray-400 font-mono">{testimonials[activeTestimonial].role}</p>
              </div>
              <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">{testimonials[activeTestimonial].metric}</span>
            </div>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed italic">
              "{testimonials[activeTestimonial].quote}"
            </p>

            <div className="flex flex-wrap gap-2">
              {testimonials[activeTestimonial].tags.map((tag, i) => (
                <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">{tag}</span>
              ))}
            </div>

            {/* Slider Navigation controls */}
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <span className="text-xs font-mono text-gray-500">Testimonial {activeTestimonial + 1} of {testimonials.length}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-white transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setActiveTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-white transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions Accordion Section */}
      <section id="faq" className="py-24 border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">REASSURANCE & SECURITY</span>
            <h2 className="text-3xl font-black font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Explore comprehensive pre-onboarding questions to understand compliance and system routing details.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-white/10 rounded-2xl bg-[#110B33] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-white/[0.02] focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white font-display">{faq.q}</span>
                    <div className={`p-1 rounded-lg border border-white/10 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-90 text-[#00C2FF] border-[#00C2FF]/30' : ''}`}>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/5 bg-white/[0.01]"
                      >
                        <p className="p-5 text-xs text-gray-300 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section id="final-cta" className="relative py-28 border-b border-white/[0.08] overflow-hidden text-center bg-dark/40">
        {/* Animated process intelligence mesh */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase font-bold bg-[#00C2FF]/10 px-3 py-1 rounded-full border border-[#00C2FF]/20 inline-block animate-pulse">DEPLOY YOUR STRATEGY ROADMAP</span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">Ready To Transform Your Business?</h2>
          
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Begin your transformation journey. Submit our comprehensive qualification wizard to deploy self-healing n8n nodes, unified GoHighLevel templates, and natural language voice lines.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a 
              href="#qualification-wizard"
              className="px-6 py-3.5 bg-gradient-to-r from-blue-400 via-primary to-emerald-400 hover:opacity-95 text-white text-xs font-bold rounded-xl transition-all shadow-lg"
            >
              Book Strategy Session
            </a>
            <a 
              href="#team"
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
            >
              Talk To Experts
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
