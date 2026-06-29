import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Target, 
  Eye, 
  Rocket, 
  MapPin, 
  Globe, 
  Users, 
  ShieldCheck, 
  Database, 
  Layers, 
  Zap, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Briefcase, 
  ChevronRight, 
  ChevronLeft,
  Mail, 
  Building, 
  Phone, 
  Send, 
  Check, 
  ArrowRight,
  Code,
  CheckCircle,
  HelpCircle,
  Clock,
  Lock,
  MessageSquare
} from 'lucide-react';
import { RoutePath } from '../types';

interface AboutProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function About({ setPath, darkMode }: AboutProps) {
  const [activeTimeline, setActiveTimeline] = useState<number>(3); // Default to 2025
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('India');
  const [activeValue, setActiveValue] = useState<number | null>(null);

  // Form states
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    country: 'India',
    email: '',
    phone: '',
    requirement: 'AI Agents & Automation',
    message: ''
  });

  // Numbers Count Up State simulation
  const [counts, setCounts] = useState({
    projects: 10,
    conversations: 1.2,
    leads: 10,
    industries: 1,
    uptime: 99.1
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        projects: prev.projects < 100 ? prev.projects + 3 : 100,
        conversations: prev.conversations < 10.0 ? Math.min(10.0, prev.conversations + 0.3) : 10.0,
        leads: prev.leads < 100 ? prev.leads + 4 : 100,
        industries: prev.industries < 12 ? prev.industries + 1 : 12,
        uptime: prev.uptime < 99.98 ? Math.min(99.98, prev.uptime + 0.02) : 99.98
      }));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const milestones = [
    {
      year: "2012",
      title: "Technology Consulting Foundation",
      desc: "Began consulting and helping enterprises architect high-performance data systems, establishing core engineering principles.",
      metric: "1st Operations"
    },
    {
      year: "2020",
      title: "Natton Technologies Private Limited",
      desc: "Incorporated officially as Natton Technologies, focused on specialized cloud architecture and enterprise software solutions.",
      metric: "25+ Engineers"
    },
    {
      year: "2024",
      title: "Natton Digital",
      desc: "Expanded into comprehensive growth marketing, CRM pipelines, and low-code integrations (n8n, Make) for MSMEs & mid-market brands.",
      metric: "3.2x Client ROI"
    },
    {
      year: "2025",
      title: "Natton AI",
      desc: "Launched dedicated Artificial Intelligence practice, building sovereign conversational voice agents, custom LLM routing, and agentic networks.",
      metric: "10M+ Chat Deflection"
    },
    {
      year: "Future",
      title: "Agentic Enterprise Ecosystem",
      desc: "Developing self-correcting corporate brain networks (AgenticOS™) where AI agents manage business workflows completely end-to-end.",
      metric: "Sovereign Web3 & AI"
    }
  ];

  const coreValues = [
    {
      title: "Customer Success",
      icon: Target,
      desc: "We align our incentives strictly with our customers' growth. If your bottom-line does not expand, we have failed.",
      color: "from-blue-500/20 to-blue-600/5",
      textAccent: "text-blue-400"
    },
    {
      title: "Innovation",
      icon: Sparkles,
      desc: "We build on the absolute bleeding edge, replacing legacy manual overhead with dynamic autonomous cognitive agents.",
      color: "from-purple-500/20 to-purple-600/5",
      textAccent: "text-purple-400"
    },
    {
      title: "Integrity",
      icon: ShieldCheck,
      desc: "No over-promises or deceptive marketing. We run transparent diagnostic scorecards and provide realistic financial impact numbers.",
      color: "from-emerald-500/20 to-emerald-600/5",
      textAccent: "text-emerald-400"
    },
    {
      title: "Continuous Learning",
      icon: Cpu,
      desc: "AI standards shift weekly. Our engineering squad invests heavily in continuous training on new LLM routers and workflow systems.",
      color: "from-cyan-500/20 to-cyan-600/5",
      textAccent: "text-cyan-400"
    },
    {
      title: "Excellence",
      icon: Award,
      desc: "We design polished, high-contrast visual systems paired with pristine, production-ready server architectures optimized for edge caching.",
      color: "from-pink-500/20 to-pink-600/5",
      textAccent: "text-pink-400"
    },
    {
      title: "Long-Term Relationships",
      icon: Users,
      desc: "We do not believe in transactional work. We act as your fractional Chief AI Officer and long-term automation integration partner.",
      color: "from-amber-500/20 to-amber-600/5",
      textAccent: "text-amber-400"
    }
  ];

  const globalRegions: Record<string, { desc: string; clients: string; latency: string; details: string }> = {
    'India': {
      desc: 'Corporate Headquarters & Core AI Delivery',
      clients: '65+ Enterprises & MSMEs',
      latency: '< 15ms Node Latency',
      details: 'Serving local clinical healthcare brands, e-commerce giants, and professional services out of Noida and Bangalore.'
    },
    'Middle East': {
      desc: 'Logistics & Real Estate Automation',
      clients: '18+ Client Networks',
      latency: '< 25ms Node Latency',
      details: 'Providing WhatsApp Conversational platforms and AI booking tools for high-end hospitality and real estate networks in Dubai and Riyadh.'
    },
    'United States': {
      desc: 'SaaS Integration & Agentic OS Clusters',
      clients: '22+ Global SMBs',
      latency: '< 30ms Edge Routing',
      details: 'Deploying high-speed custom AI calling agents and n8n webhook sequences for VC-backed SaaS and professional service groups.'
    },
    'Europe': {
      desc: 'GDPR-Compliant Local Deployments',
      clients: '14+ Business Hubs',
      latency: '< 35ms Edge Routing',
      details: 'Fully sovereign database pipelines matching EU strict security laws for clinical centers and automated accounting firms.'
    },
    'Australia': {
      desc: 'Education & Logistics Hubs',
      clients: '8+ Enterprise Nodes',
      latency: '< 45ms Local Caching',
      details: 'Managing automated student inquiry triage systems and cloud telephony workflows for vocational colleges.'
    },
    'South East Asia': {
      desc: 'E-commerce Broadcast & Retail Clusters',
      clients: '15+ Digital Clients',
      latency: '< 18ms Cloudfront CDN',
      details: 'Empowering retail shops with Meta Cloud APIs for direct WhatsApp catalog checkouts and RCS messaging blasts.'
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingForm(true);
    setFormError('');

    // Simulate GoHighLevel & n8n Webhook delivery delay
    setTimeout(() => {
      setSubmittingForm(false);
      setFormSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-[#110B33] text-white min-h-screen font-sans antialiased text-left selection:bg-primary/30 selection:text-white">
      
      {/* 1. HERO SECTION WITH DIGITAL UNIVERSE INTERACTIVE GRAPHIC */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/10 bg-gradient-to-br from-indigo-950/40 via-[#110B33] to-purple-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,194,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]" />
        
        {/* Glow grid backdrops */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#00C2FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="mb-6 text-xs font-mono text-gray-400/80 tracking-wider">
            <button onClick={() => setPath('home')} className="hover:text-primary transition-colors">HOME</button>
            <span className="mx-2">/</span>
            <span className="text-primary font-bold">ABOUT US</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: HERO HEADLINE */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-500/20">
                <Cpu className="h-3 w-3 animate-pulse" /> AN ENTIRE DIGITAL SYSTEM IN SYNC
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight text-white">
                Building The Future Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400">AI-Powered</span> Growth
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
                Natton Digital accelerates commercial scale using enterprise-grade AI marketing architectures, n8n automated core pipelines, and sovereign conversational agents.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#contact-form" 
                  className="px-6 py-3 bg-gradient-to-r from-[#00C2FF] to-primary hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  Book Strategy Call <ArrowRight className="h-4 w-4" />
                </a>
                <button 
                  onClick={() => setPath('solutions/ai-agents' as RoutePath)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
                >
                  Explore Solutions
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: DIGITAL UNIVERSE 3D-EFFECT INTERACTIVE ECOSYSTEM VISUAL */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="w-full max-w-[420px] aspect-square rounded-full border border-white/5 bg-gradient-to-br from-indigo-950/20 to-purple-950/10 p-6 flex items-center justify-center relative group">
                
                {/* Embedded Spinning Orbital Orbs */}
                <div className="absolute inset-4 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: '40s' }} />
                <div className="absolute inset-16 rounded-full border border-dashed border-[#00C2FF]/10 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                <div className="absolute inset-28 rounded-full border border-white/5 animate-spin" style={{ animationDuration: '15s' }} />

                {/* Nodes representing the universe */}
                {/* Central Brain Node */}
                <div className="absolute z-10 p-4 rounded-full bg-gradient-to-br from-[#00C2FF] to-primary border border-white/20 shadow-lg shadow-primary/30 flex items-center justify-center animate-pulse">
                  <Cpu className="h-8 w-8 text-white" />
                  <span className="absolute -bottom-6 text-[10px] font-mono tracking-widest text-primary font-bold">NATTON AI</span>
                </div>

                {/* Satellite Connected Nodes */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 p-2.5 rounded-xl bg-indigo-900/60 border border-indigo-400/30 text-indigo-300 flex items-center gap-1.5 text-[10px] font-mono">
                  <Database className="h-4 w-4" /> CRM OS
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 flex items-center gap-1.5 text-[10px] font-mono">
                  <Zap className="h-4 w-4" /> n8n Flows
                </div>

                <div className="absolute left-4 top-1/3 p-2.5 rounded-xl bg-purple-950/60 border border-purple-400/30 text-purple-300 flex items-center gap-1.5 text-[10px] font-mono">
                  <MessageSquare className="h-4 w-4" /> WhatsApp
                </div>

                <div className="absolute right-4 top-1/3 p-2.5 rounded-xl bg-pink-950/60 border border-pink-400/30 text-pink-300 flex items-center gap-1.5 text-[10px] font-mono">
                  <Phone className="h-4 w-4" /> Voice AI
                </div>

                <div className="absolute top-1/4 right-8 p-2 rounded-lg bg-cyan-950/50 border border-cyan-400/20 text-cyan-300 text-[8px] font-mono">
                  SEO + AEO
                </div>

                <div className="absolute bottom-1/4 left-8 p-2 rounded-lg bg-amber-950/50 border border-amber-400/20 text-amber-300 text-[8px] font-mono">
                  Lighthouse 100
                </div>

                {/* SVG Connecting Light Arcs */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#00C2FF" strokeWidth="1" strokeDasharray="4 2" />
                  <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="#10B981" strokeWidth="1" strokeDasharray="4 2" />
                  <line x1="50%" y1="50%" x2="15%" y2="38%" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="50%" y1="50%" x2="85%" y2="38%" stroke="#EC4899" strokeWidth="1" />
                </svg>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OUR STORY & IMMERSIVE NARRATIVE */}
      <section className="py-20 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">THE CHRONICLES</span>
              <h2 className="text-3xl font-black font-display text-white">Our Story</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
              <p className="text-sm text-gray-300 leading-relaxed">
                Every enterprise deserves a pristine operational baseline. We founded Natton on the firm belief that businesses should not be bogged down by fragile spreadsheet logs and manual, repetitive operations.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                By fusing software systems engineering with dynamic growth psychology, we construct automated engines that generate and convert interest while you focus on core strategic product craft.
              </p>
            </div>

            <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6">
              {[
                { step: "01", title: "The Sovereign Democratic Mission", text: "Founded with an absolute core mandate to democratize high-converting AI setups and cloud database automation for businesses ready to ditch slow manual labor." },
                { step: "02", title: "Natton Technologies Roots", text: "Started as Natton Technologies Private Limited, developing hard-coded ERP portals and robust, secure custom database architectures for corporate clients." },
                { step: "03", title: "Commercial Scaling & Growth Focus", text: "Expanded capabilities into Natton Digital, integrating real-time marketing funnels, automated GHL CRM lead triages, and high-deliverability messaging structures." },
                { step: "04", title: "Deploying Sovereign Cognitive Intelligence", text: "Launched dedicated Natton AI, engineering fully autonomous voice dialers, LLM classification engines, and custom-trained customer success chats." },
                { step: "05", title: "Empowering Local and Global Hubs", text: "Focused entirely on maximizing local MSME efficiencies in India and driving scalable SMB customer acquisitions worldwide with zero technical overhead." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group hover:bg-white/[0.01] p-3 rounded-2xl transition-all border border-transparent hover:border-white/5">
                  <span className="text-xs font-mono text-primary font-black bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">{item.step}</span>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#00C2FF] transition-colors">{item.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. HORIZONTAL TIMELINE & JOURNEY */}
      <section className="py-20 border-b border-white/10 relative bg-dark/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">MILESTONES & GROWTH</span>
            <h2 className="text-3xl font-black font-display text-white">Our Journey</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Click through our historical timeline checkpoints to see how we scaled our system capacity.</p>
          </div>

          {/* Interactive Horizontal Timeline Map */}
          <div className="relative max-w-5xl mx-auto py-10">
            {/* Background Line */}
            <div className="absolute top-[52px] left-8 right-8 h-0.5 bg-white/10 pointer-events-none" />
            <div 
              className="absolute top-[52px] left-8 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 transition-all duration-500 pointer-events-none" 
              style={{ width: `${(activeTimeline / (milestones.length - 1)) * 94}%` }}
            />

            <div className="grid grid-cols-5 gap-2 relative z-10">
              {milestones.map((mil, idx) => {
                const isActive = activeTimeline === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTimeline(idx)}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    {/* Glowing Checkpoint Sphere */}
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-blue-400 to-[#00C2FF] border-[#00C2FF] text-white shadow-lg shadow-primary/30 scale-110' 
                        : 'bg-[#110B33] border-white/20 text-gray-400 group-hover:border-white/60'
                    }`}>
                      <span className="text-[10px] font-mono font-black">{mil.year === "Future" ? "★" : mil.year.slice(2)}</span>
                    </div>

                    <span className={`text-[11px] font-mono font-bold mt-3 transition-colors ${isActive ? 'text-[#00C2FF]' : 'text-gray-400'}`}>
                      {mil.year}
                    </span>
                    <span className="text-[9px] text-gray-500 font-mono mt-0.5 hidden sm:block">
                      {mil.metric}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milestone Details Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTimeline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00C2FF]" />
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-[#00C2FF] uppercase tracking-widest font-black">Timeline Milestone</span>
                <h3 className="text-xl font-bold text-white font-display">{milestones[activeTimeline].title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{milestones[activeTimeline].desc}</p>
                <div className="pt-3 flex gap-4 text-[10px] font-mono text-gray-500">
                  <span>ACHIEVED KPI: <strong className="text-emerald-400">{milestones[activeTimeline].metric}</strong></span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* 4. MISSION & VISION SPLIT (WITH MISSION SPHERE VISUAL) */}
      <section className="py-20 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: MISSION SPHERE SVG ANIMATION */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="w-80 h-80 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 via-transparent to-purple-950/20 pointer-events-none" />
                
                {/* Custom Orbital Sphere Design */}
                <div className="relative w-48 h-48 rounded-full border border-[#00C2FF]/20 flex items-center justify-center animate-pulse">
                  {/* Rotating Inner Rings */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-violet-500/30 animate-spin" style={{ animationDuration: '8s' }} />
                  <div className="absolute inset-6 rounded-full border border-emerald-400/20 animate-spin" style={{ animationDuration: '14s', animationDirection: 'reverse' }} />
                  <div className="absolute inset-12 rounded-full border border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: '5s' }} />
                  
                  {/* Core Particle Glow */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00C2FF] to-purple-600 blur-sm flex items-center justify-center relative">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-4 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                  Continuous Orbital Sync (SOC2)
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MISSION & VISION SPECIFICS */}
            <div className="lg:col-span-7 space-y-10 order-1 lg:order-2">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20">
                  <Target className="h-3 w-3" /> Core Purpose
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Our Mission</h2>
                <h3 className="text-lg font-bold text-[#00C2FF] font-display">Empowering Businesses With AI</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Enable organizations to grow faster, automate intelligently and create exceptional customer experiences using modern AI technologies. We strive to erase manual data bottlenecks entirely, allowing people to focus on strategy and product engineering.
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase text-violet-400 bg-violet-400/10 border border-violet-500/20">
                  <Eye className="h-3 w-3" /> Future Horizon
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Our Vision</h2>
                <h3 className="text-lg font-bold text-violet-400 font-display">AI For Every Business</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Become a globally trusted AI-first growth and automation company serving MSMEs and SMBs worldwide. We envision a commercial marketplace where sovereign neural agent networks execute entire business funnels autonomously and safely.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. OUR CORE VALUES WITH INTERACTIVE ACCORDION EXPANSE */}
      <section className="py-20 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">CULTURAL PILOTS</span>
            <h2 className="text-3xl font-black font-display text-white">Our Core Values</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Hover or click individual cultural standards to explore our daily operational guidelines.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              const isSelected = activeValue === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveValue(idx)}
                  onMouseLeave={() => setActiveValue(null)}
                  onClick={() => setActiveValue(isSelected ? null : idx)}
                  className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isSelected 
                      ? 'bg-white/[0.03] border-primary shadow-lg shadow-primary/5' 
                      : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Decorative background glow on select */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${val.color} rounded-full blur-2xl opacity-40 transition-opacity`} />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${val.textAccent} mb-4`}>
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] font-mono text-gray-500">0{idx + 1}</span>
                  </div>

                  <h3 className="text-sm font-bold font-display text-white mb-2 relative z-10 flex items-center gap-2">
                    {val.title}
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed relative z-10">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. WHAT WE DO - BENTO GRID OF CAPABILITIES */}
      <section className="py-20 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">CAPABILITIES INDEX</span>
            <h2 className="text-3xl font-black font-display text-white">What We Do</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Explore the custom technology suites we deploy to drive exponential lead captures.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {[
              { title: "AI Marketing", path: "solutions/ai-growth-marketing", desc: "Target high-intent audiences and dynamically structure visual ad creatives using LLMs.", tag: "REVENUE" },
              { title: "GrowthOS™", path: "products/growth-os", desc: "All-in-one cloud outbound prospecting software coupled with auto email warmup systems.", tag: "PLATFORM" },
              { title: "BusinessOS™", path: "products/business-os", desc: "Automate accounting, project milestones, and client communications inside a single UI.", tag: "ENTERPRISE" },
              { title: "AgenticOS™", path: "products/agentic-os", desc: "Deploy sovereign autonomous agents to self-execute complex multi-node CRM workflows.", tag: "COGNITIVE" },
              { title: "WhatsApp Automation", path: "solutions/whatsapp-automation", desc: "Meta Cloud API integrations, conversational marketing chatbots, and instant templated broadcasts.", tag: "CHANNELS" },
              { title: "AI Calling", path: "solutions/ai-calling-agents", desc: "Natural-sounding AI voice systems that make outbound dials and schedule sales bookings instantly.", tag: "TELEPHONY" },
              { title: "Cloud Telephony", path: "solutions/cloud-telephony", desc: "Virtual multi-department phone trees, encrypted audio recordings, and visual transcription logs.", tag: "INFRA" },
              { title: "RCS Messaging", path: "solutions/rcs-messaging", desc: "Highly-deliverability rich text messaging to default phone SMS inboxes with carousel layouts.", tag: "CHANNELS" },
              { title: "Custom AI Agents", path: "solutions/ai-agents", desc: "Integrate specialized RAG databases to automate specific workflows and secure internal data.", tag: "Sovereign" },
              { title: "n8n Automation", path: "solutions/crm-ai-automation", desc: "Complex webhook listeners, automated CRM pipeline movements, and data sync across SaaS.", tag: "INTEGRATIONS" },
              { title: "SEO + AEO", path: "blog", desc: "Position your company website to rank as the top primary answer on AI search systems (Gemini, ChatGPT).", tag: "MARKETING" },
              { title: "CRM Solutions", path: "solutions/crm-ai-automation", desc: "End-to-end setups on GoHighLevel to automate customer lists, pipelines, and calendars.", tag: "INFRA" }
            ].map((cap, i) => (
              <button
                key={i}
                onClick={() => setPath(cap.path as RoutePath)}
                className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-primary text-left transition-all relative group flex flex-col justify-between h-48"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">{cap.tag}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-500 group-hover:text-[#00C2FF] transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold font-display text-white group-hover:text-[#00C2FF] transition-colors">{cap.title}</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{cap.desc}</p>
                </div>
                <div className="text-[9px] font-mono text-gray-500 font-semibold uppercase group-hover:text-primary transition-colors">
                  Explore Architecture →
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 7. TECHNOLOGY ECOSYSTEM MARQUEE */}
      <section className="py-16 border-b border-white/10 relative overflow-hidden bg-dark/45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block font-semibold">SECURE ECOSYSTEM ARCHITECTURES</span>
          <h2 className="text-2xl font-black font-display text-white">Sovereign Software Integrations</h2>
          
          {/* Infinite Marquee list of tool integrations */}
          <div className="relative flex overflow-x-hidden py-4 border-y border-white/5 bg-white/[0.01]">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs font-mono font-bold uppercase tracking-widest text-gray-400/80">
              <span>OpenAI</span>
              <span>Claude (Anthropic)</span>
              <span>Gemini Pro</span>
              <span>n8n Core</span>
              <span>GoHighLevel</span>
              <span>Google Cloud</span>
              <span>Microsoft Azure</span>
              <span>Amazon Web Services</span>
              <span>Meta APIs</span>
              <span>Stripe Gateway</span>
              <span>Razorpay Integration</span>
              <span>WhatsApp Cloud API</span>
            </div>
            
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#110B33] to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#110B33] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 8. GLOBAL DELIVERY MODEL MAP */}
      <section className="py-20 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: INTERACTIVE WORLD MAP (SVG) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">DISTRIBUTED CLUSTERS</span>
              <h2 className="text-3xl font-black font-display text-white">Global Delivery Model</h2>
              <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
                We distribute computational server pipelines and dedicated solution architects globally to guarantee ultra-low latency API hops and strict regional regulatory compliance.
              </p>

              {/* World Map SVG Mock */}
              <div className="relative w-full aspect-[16/10] bg-white/[0.01] border border-white/5 rounded-3xl p-6 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 800 500" className="w-full h-full opacity-60 text-indigo-400/20 fill-current">
                  {/* Outline / abstract map of continental blobs */}
                  <rect x="0" y="0" width="800" height="500" fill="none" />
                  
                  {/* North America blob */}
                  <path d="M 100 120 Q 180 100 240 160 T 200 250 T 120 280 Z" fill="currentColor" />
                  {/* Europe blob */}
                  <path d="M 400 100 Q 450 80 480 140 T 450 200 T 380 180 Z" fill="currentColor" />
                  {/* Asia / Russia blob */}
                  <path d="M 480 100 Q 600 50 720 120 T 700 280 T 550 350 T 480 200 Z" fill="currentColor" />
                  {/* South America blob */}
                  <path d="M 180 280 Q 240 320 200 420 T 140 400 Z" fill="currentColor" />
                  {/* Africa blob */}
                  <path d="M 380 220 Q 440 240 440 340 T 350 380 Z" fill="currentColor" />
                  {/* Australia blob */}
                  <path d="M 650 340 Q 720 320 700 420 T 620 400 Z" fill="currentColor" />

                  {/* Arcs / lines representing global data routing */}
                  {/* Arcs from India (Center Node) */}
                  {/* India Node coordinate: 530, 220 */}
                  {/* US East coordinate: 200, 160 */}
                  {/* Europe coordinate: 440, 130 */}
                  {/* Middle East coordinate: 480, 200 */}
                  {/* Australia coordinate: 670, 370 */}
                  {/* SEA coordinate: 590, 260 */}

                  <path d="M 530 220 Q 365 190 200 160" fill="none" stroke="#00C2FF" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 530 220 Q 485 175 440 130" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 530 220 L 480 200" fill="none" stroke="#10B981" strokeWidth="1" />
                  <path d="M 530 220 Q 600 295 670 370" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 530 220 L 590 260" fill="none" stroke="#EC4899" strokeWidth="1" />

                  {/* Nodes for Regions */}
                  {[
                    { id: 'India', cx: 530, cy: 220, color: '#00C2FF' },
                    { id: 'Middle East', cx: 480, cy: 200, color: '#10B981' },
                    { id: 'United States', cx: 200, cy: 160, color: '#3B82F6' },
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
                        <circle 
                          cx={pt.cx} 
                          cy={pt.cy} 
                          r={isHovered || isSelected ? 12 : 6} 
                          fill={pt.color} 
                          className="opacity-20 animate-ping" 
                        />
                        <circle 
                          cx={pt.cx} 
                          cy={pt.cy} 
                          r={isHovered || isSelected ? 8 : 4} 
                          fill={pt.color} 
                          className="transition-all duration-300 border border-white"
                        />
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute top-4 left-4 p-2 bg-black/60 rounded border border-white/10 text-[9px] font-mono text-gray-400">
                  ⚡ GLOBAL API LATENCY OVERVIEW
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: REGION DETAIL SUMMARY */}
            <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="pb-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#00C2FF] font-black">Region Node Info</span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">{selectedRegion}</h3>
                </div>
                <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2.5 py-1 rounded-md">ACTIVE CLUSTER</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-500 block mb-1">Operational Purpose:</span>
                  <p className="font-semibold text-white">{globalRegions[selectedRegion].desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-gray-500 block mb-1">Active Accounts:</span>
                    <p className="font-bold text-emerald-400 text-sm">{globalRegions[selectedRegion].clients}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-gray-500 block mb-1">Response Node Velocity:</span>
                    <p className="font-bold text-cyan-400 text-sm">{globalRegions[selectedRegion].latency}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 leading-relaxed text-gray-300 text-[11px]">
                  {globalRegions[selectedRegion].details}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                {Object.keys(globalRegions).map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-3 py-1 rounded-xl text-[10px] font-semibold border transition-all ${
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

      {/* 9. LEADERSHIP PROFILE CARD */}
      <section className="py-20 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-[10px] font-mono tracking-widest text-primary uppercase block font-semibold">MEET THE ARCHITECTS</span>
              <h2 className="text-3xl font-black font-display text-white">Leadership</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Natton is guided by senior systems engineers, growth marketers, and artificial intelligence researchers with deep expertise building sovereign tech frameworks.
              </p>
              
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-2 text-xs">
                <p className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Combined 14+ years managing cloud software.</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Specialized in n8n automation and custom LLM safety gates.</span>
                </p>
              </div>
            </div>

            {/* Premium Profile Cards */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-lg bg-gradient-to-br from-indigo-950/40 via-[#110B33] to-purple-950/20 border border-white/10 rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />
                
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-400 to-violet-500 flex items-center justify-center border border-white/20 relative shadow-md shadow-primary/20">
                    <Users className="h-10 w-10 text-white" />
                    <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 bg-emerald-400 rounded-full border-2 border-[#110B33] flex items-center justify-center">
                      <span className="text-[8px] font-mono font-black text-[#110B33]">IN</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold font-display text-white">Founder & AI Solution Architect</h3>
                    <p className="text-xs text-primary font-mono font-bold tracking-wider uppercase">Senior Systems Strategist</p>
                    <div className="flex gap-4 text-[10px] font-mono text-gray-500 pt-1">
                      <span>EXPERIENCE: <strong className="text-white">14+ Years</strong></span>
                      <span>•</span>
                      <span>DEPLOYMENTS: <strong className="text-white">100+ Core</strong></span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 space-y-4 text-xs leading-relaxed text-gray-300">
                  <p>
                    Our lead architect oversees technical systems blueprints across our Indian and international deployment clusters. He designs specialized RAG networks, maps multi-channel WhatsApp messaging routines, and audits n8n database hooks for clients scaling past millions in transaction count.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                      <span className="text-[9px] font-mono text-gray-500 block mb-0.5">Core Specialization:</span>
                      <span className="font-bold text-white">AI, Automation & Systems</span>
                    </div>
                    <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                      <span className="text-[9px] font-mono text-gray-500 block mb-0.5">Prior Engagements:</span>
                      <span className="font-bold text-white">Enterprise digital transformations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. IMPACT IN NUMBERS */}
      <section className="py-20 border-b border-white/10 relative bg-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block font-semibold">METRIC HIGHLIGHTS</span>
            <h2 className="text-3xl font-black font-display text-white">Impact In Numbers</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Verified technical indicators demonstrating client expansion values across all operational sectors.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { label: "Active Deployments", val: `${counts.projects}+`, sub: "Corporate Projects" },
              { label: "Automated Conversations", val: `${counts.conversations.toFixed(1)}M+`, sub: "Secured Transmissions" },
              { label: "Acquired System Leads", val: `${counts.leads}K+`, sub: "Managed in GHL Pipelines" },
              { label: "Sectors Automated", val: `${counts.industries}+`, sub: "Sovereign Verticals" },
              { label: "Node Runtime SLA", val: `${counts.uptime.toFixed(2)}%`, sub: "Continuous Availability" }
            ].map((met, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl text-center flex flex-col justify-between group hover:border-[#00C2FF]/30 transition-all">
                <span className="text-[9px] font-mono uppercase text-gray-500 tracking-wider font-semibold block">{met.label}</span>
                <div className="text-2xl sm:text-3xl font-black font-display text-white py-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-cyan-300">
                  {met.val}
                </div>
                <p className="text-[9px] font-mono text-gray-400 leading-tight">{met.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. TECHNOLOGY PARTNERS */}
      <section className="py-16 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">COOPERATIVE PLATFORMS</span>
          <h2 className="text-2xl font-black font-display text-white">Verified Technology Partners</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-5xl mx-auto">
            {['OpenAI', 'Google Cloud', 'Meta Cloud', 'Microsoft', 'n8n Enterprise', 'GoHighLevel', 'Cloudflare Edge', 'Vercel CDN'].map((partner, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-center text-xs font-mono font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CULTURE & PHILOSOPHY GRID */}
      <section className="py-20 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">SYSTEM BELIEFS</span>
            <h2 className="text-3xl font-black font-display text-white">Culture & Philosophy</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Our baseline standards guide how we approach systems design and client partnership.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto text-left">
            {[
              { title: "AI-First Thinking", desc: "Before writing bloated code, we investigate autonomous AI structures and natural LLM prompts to handle logic with maximum efficiency." },
              { title: "Customer-Centric Approach", desc: "We track client conversion targets closely, matching our development sprints directly to real pipeline revenue generation." },
              { title: "Continuous Innovation", desc: "We refuse to remain stale. Every technical deployment undergoes recurring optimization loops against speed constraints." },
              { title: "Data-Driven Decisions", desc: "We rely strictly on verified variables, running precise A/B traffic diagnostics to audit our voice agent conversion rates." },
              { title: "Long-Term Partnerships", desc: "We integrate deeply with your operations team, acting as continuous technology counsel and software guardians." }
            ].map((phil, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/30 transition-all">
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#00C2FF] font-black">0{i + 1}</span>
                  <h3 className="text-sm font-bold font-display text-white">{phil.title}</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{phil.desc}</p>
                </div>
                <div className="pt-4 flex justify-between items-center text-[8px] font-mono text-gray-500">
                  <span>PHILOSOPHY NODE</span>
                  <Sparkles className="h-3 w-3 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. CAREERS PANEL */}
      <section className="py-20 border-b border-white/10 relative bg-gradient-to-b from-[#110B33] to-[#0d0829]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            <Briefcase className="h-3.5 w-3.5" /> WE ARE HIRING ENGINEERS
          </span>
          <h2 className="text-3xl font-black font-display text-white">Join Our Mission</h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Help us architect the next generation of sovereign autonomous agent setups. Work on cutting-edge n8n enterprise workflows, cloud telephony setups, and multi-channel LLM operations.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button 
              onClick={() => setPath('contact')}
              className="px-6 py-3 bg-[#00C2FF] hover:bg-cyan-500 text-[#110B33] font-bold text-xs rounded-xl transition-all"
            >
              View Open Careers
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("contact-form");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-all"
            >
              Submit Resume
            </button>
          </div>
        </div>
      </section>

      {/* 14. COMPREHENSIVE CONTACT FORM (GHL & n8n WEBHOOK INTEGRATED) */}
      <section id="contact-form" className="py-20 border-b border-white/10 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold font-display">STRATEGIC ALIGNMENT PORTAL</span>
            <h2 className="text-3xl font-black font-display text-white">Let's Build The Future Together</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Submit your corporate parameters below. Our solution engineers will map a diagnostic blueprint for your system within 24 hours.</p>
          </div>

          <div className={`p-6 sm:p-10 border rounded-3xl text-left transition-all relative ${
            formSubmitted 
              ? 'border-emerald-500/30 bg-gradient-to-b from-indigo-950/20 via-[#110B33] to-emerald-950/10' 
              : 'border-white/10 bg-white/[0.01]'
          }`}>
            
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleContactSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1.5 font-bold">Full Name *</label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="John Doe"
                          className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-primary text-xs rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1.5 font-bold">Company Name *</label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                        <input
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          placeholder="Acme Inc"
                          className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-primary text-xs rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1.5 font-bold">Corporate Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john@company.com"
                          className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-primary text-xs rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1.5 font-bold">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-primary text-xs rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1.5 font-bold">Country of Residence *</label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full bg-[#110B33] border border-white/10 hover:border-white/20 focus:border-primary text-xs rounded-xl py-3 px-4 text-white focus:outline-none transition-all"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Australia">Australia</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1.5 font-bold">Business Requirement *</label>
                      <select
                        value={formData.requirement}
                        onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                        className="w-full bg-[#110B33] border border-white/10 hover:border-white/20 focus:border-primary text-xs rounded-xl py-3 px-4 text-white focus:outline-none transition-all"
                      >
                        <option value="AI Agents & Automation">AI Agents & n8n Automation</option>
                        <option value="WhatsApp Conversational Marketing">WhatsApp Cloud Marketing</option>
                        <option value="AI Calling Outbound Dialer">AI Conversational Outbound Dialer</option>
                        <option value="GrowthOS Prospecting System">GrowthOS™ & CRM Integration</option>
                        <option value="Sovereign Consultation Brief">Full-Scale Corporate Audit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1.5 font-bold">Detailed Message / Context *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Describe your current manual bottlenecks and target quarterly goals..."
                      className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-primary text-xs rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="p-4 rounded-xl border border-[#00C2FF]/10 bg-[#00C2FF]/5 flex items-start gap-2.5 text-[11px] text-gray-300">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Integration Gateway:</strong> Form submission triggers a live n8n webhook delivering encrypted client data payload directly into our secure GoHighLevel CRM contacts repository under strict SOC2 compliance.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingForm}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-400 via-primary to-purple-500 hover:opacity-90 disabled:opacity-50 text-white text-xs font-black rounded-xl tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                  >
                    {submittingForm ? (
                      <>
                        <Zap className="h-4 w-4 animate-spin" /> DELIVERING PAYLOAD...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> TRANSMITBluePRINT REQUEST
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  className="text-center py-10 space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-black">Webhook Sync Complete</span>
                    <h3 className="text-2xl font-bold text-white font-display">Strategic Parameters Logged</h3>
                    <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.fullName}</strong>. Your n8n workflow node successfully fired, and <strong>{formData.companyName}</strong> has been logged in our GoHighLevel CRM database. An AI systems architect will reach out within 24 hours.
                    </p>
                  </div>
                  <div className="inline-flex gap-2 p-3 bg-white/[0.01] border border-white/5 rounded-xl text-left text-[10px] font-mono text-gray-400 max-w-sm">
                    <Lock className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Reference ID: <strong>NAT-{Math.floor(100000 + Math.random() * 900000)}</strong>. Data is fully encrypted under TLS 1.3 protocol.</span>
                  </div>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        country: 'India',
                        email: '',
                        phone: '',
                        requirement: 'AI Agents & Automation',
                        message: ''
                      });
                    }}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-xl border border-white/10 transition-all block mx-auto"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* 15. FINAL CTA SECTION WITH ANIMATED DIGITAL UNIVERSE MESH */}
      <section className="relative py-24 overflow-hidden border-t border-white/10 bg-gradient-to-tr from-[#110B33] via-indigo-950/25 to-purple-950/25">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,194,255,0.06),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">CRAFTED FOR ENTERPRISE ACCELERATION</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight text-white">
            Helping Businesses Grow <br className="hidden sm:inline" />With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-violet-400">Intelligent AI</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Ready to integrate sovereign CRM systems, high-speed automated WhatsApp blasts, and conversational voice dialers directly into your core workflow?
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button 
              onClick={() => {
                const element = document.getElementById("contact-form");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-400 to-[#00C2FF] hover:opacity-95 text-white font-black text-xs rounded-xl transition-all shadow-md shadow-primary/10"
            >
              Book Strategy Call
            </button>
            <button 
              onClick={() => setPath('solutions/ai-agents' as RoutePath)}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-all"
            >
              Explore Solutions
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

// ==========================================
// DECORATIVE SVG ORB / WIREFRAME REVENUE GRAPHIC
// ==========================================
function FloatingRevenueSphere() {
  return (
    <div className="w-full max-w-[360px] aspect-square relative flex items-center justify-center animate-fade-in">
      {/* Background soft glowing blur */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-primary/10 to-violet-500/10 blur-xl animate-pulse pointer-events-none" />

      {/* SVG Sphere Grid representation */}
      <svg viewBox="0 0 400 400" className="w-full h-full text-[#00C2FF]">
        <defs>
          <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="sphere-inner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#110B33" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e155c" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Inner glow circle */}
        <circle cx="200" cy="200" r="130" fill="url(#sphere-inner)" stroke="#ffffff" strokeOpacity="0.05" />

        {/* Latitude Arcs (Horizontal lines with depth perspective) */}
        <ellipse cx="200" cy="200" rx="130" ry="40" fill="none" stroke="url(#glow-grad)" strokeWidth="1" strokeOpacity="0.25" />
        <ellipse cx="200" cy="200" rx="130" ry="80" fill="none" stroke="url(#glow-grad)" strokeWidth="1" strokeOpacity="0.3" />
        <ellipse cx="200" cy="150" rx="112" ry="30" fill="none" stroke="url(#glow-grad)" strokeWidth="1" strokeOpacity="0.2" />
        <ellipse cx="200" cy="250" rx="112" ry="30" fill="none" stroke="url(#glow-grad)" strokeWidth="1" strokeOpacity="0.2" />
        
        {/* Longitude Arcs (Vertical lines wrapping around sphere) */}
        <ellipse cx="200" cy="200" rx="40" ry="130" fill="none" stroke="url(#glow-grad)" strokeWidth="1" strokeOpacity="0.25" />
        <ellipse cx="200" cy="200" rx="80" ry="130" fill="none" stroke="url(#glow-grad)" strokeWidth="1" strokeOpacity="0.3" />

        {/* Diagonal high-speed connecting vectors */}
        <path d="M 120 120 Q 200 100 280 280" fill="none" stroke="#EC4899" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="5 5" />
        <path d="M 100 260 Q 200 300 300 140" fill="none" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="5 5" />

        {/* Orbital pulsing vectors */}
        <circle cx="200" cy="200" r="130" fill="none" stroke="url(#glow-grad)" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Pulsing Outer Nodes */}
        <circle cx="120" cy="120" r="5" fill="#00C2FF" className="animate-ping" style={{ transformOrigin: '120px 120px', animationDuration: '3s' }} />
        <circle cx="120" cy="120" r="4" fill="#00C2FF" />

        <circle cx="280" cy="280" r="5" fill="#EC4899" className="animate-ping" style={{ transformOrigin: '280px 280px', animationDuration: '4s' }} />
        <circle cx="280" cy="280" r="4" fill="#EC4899" />

        <circle cx="100" cy="260" r="4.5" fill="#10B981" className="animate-ping" style={{ transformOrigin: '100px 260px', animationDuration: '3.5s' }} />
        <circle cx="100" cy="260" r="3.5" fill="#10B981" />

        <circle cx="300" cy="140" r="5" fill="#8B5CF6" className="animate-ping" style={{ transformOrigin: '300px 140px', animationDuration: '2.5s' }} />
        <circle cx="300" cy="140" r="4" fill="#8B5CF6" />
      </svg>
    </div>
  );
}
