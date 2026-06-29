import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Zap, 
  Cpu, 
  Clock, 
  ArrowUpRight, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  Database,
  Building,
  Target,
  BarChart,
  Code
} from 'lucide-react';
import { RoutePath } from '../types';
import InteractiveGlobe from '../components/InteractiveGlobe';
import DashboardPreview from '../components/DashboardPreview';

interface HomeProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Home({ setPath, darkMode }: HomeProps) {
  const [activeFlywheelStep, setActiveFlywheelStep] = useState<number>(0);
  const [activeIndustryTab, setActiveIndustryTab] = useState<number>(0);
  const [activeCaseStudyIdx, setActiveCaseStudyIdx] = useState<number>(0);
  
  // Animated Metrics Counter state
  const [leadsDelivered, setLeadsDelivered] = useState(1200000);
  const [hoursSaved, setHoursSaved] = useState(45000);
  const [msmesServed, setMsmesServed] = useState(850);
  const [revenueBoost, setRevenueBoost] = useState(142);

  // Consultation Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    industry: 'Healthcare',
    monthlyRevenue: '< $10k USD',
    requirement: 'AI Automation Consulting'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto trigger counters up
  useEffect(() => {
    const timer = setInterval(() => {
      setLeadsDelivered(prev => prev + Math.floor(Math.random() * 5) + 1);
      setHoursSaved(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const flywheelSteps = [
    { name: 'Traffic Generation', icon: <Target className="h-5 w-5" />, desc: 'AI Growth SEO & hyper-optimized programmatic ad campaigns attract high-intent traffic.', metric: '3.2x Traffic Boost' },
    { name: 'Leads Triage', icon: <Users className="h-5 w-5" />, desc: 'Webhook interceptors map leads instantly into our GoHighLevel CRM nodes.', metric: '100% Capture Rate' },
    { name: 'CRM Enrichment', icon: <Database className="h-5 w-5" />, desc: 'Our AI engine profiles company metadata, scoring sales readiness automatically.', metric: 'Instant Lead Scoring' },
    { name: 'Workflow Automation', icon: <Zap className="h-5 w-5" />, desc: 'Complex n8n loops orchestrate WhatsApp templates, text triggers, and calendars.', metric: '92% Hours Saved' },
    { name: 'AI Voice Agents', icon: <Cpu className="h-5 w-5" />, desc: 'Intelligent calling bots qualify leads autonomously, booking site visits.', metric: '24/7 Live Dialing' },
    { name: 'Revenue Multiplier', icon: <TrendingUp className="h-5 w-5" />, desc: 'Streamlined operational handoffs double close rates for Indian & global brands.', metric: '42% Average Revenue Jump' },
  ];

  const caseStudies = [
    {
      client: 'Apex Health Systems',
      industry: 'Healthcare',
      tagline: '86% patient onboarding lag eliminated with automated triage routing.',
      challenge: 'High inbound patient calls caused 3.2 days follow-up delay.',
      solution: 'Automated WhatsApp nurse chatbot synced with calendar and local patient directory.',
      results: ['Patient booking time down from 45 mins to 6 mins.', 'Saved $8,500/mo in staff hours.', '24/7 customer service coverage.'],
      metrics: '86% Efficiency',
    },
    {
      client: 'Vanguard Realty Group',
      industry: 'Real Estate',
      tagline: '72% site visit scheduling rate achieved via autonomous calling.',
      challenge: 'Brokers spent 4 hours/day chasing cold website inquiries.',
      solution: 'Natton voice agent called leads in under 45 seconds, scoring intent and booking calendar appointments.',
      results: ['3.4x site visits booked.', 'Realtor productivity boosted by 400%.', '$32,000 extra closed commission.'],
      metrics: '3.4x Conversions',
    },
    {
      client: 'Elite Academy Online',
      industry: 'Education',
      tagline: '99% speed improvement in student counseling replies.',
      challenge: 'Global course inquiries were abandoned due to timezone lag.',
      solution: 'Integrated GrowthOS AI Counselor to instant-deliver brochures and WhatsApp FAQs.',
      results: ['2.4x student enrollment rate.', 'Zero missed nighttime leads.', 'Automated course fee links.'],
      metrics: '2.4x Enrollments',
    },
  ];

  const partners = [
    'GoHighLevel Gold Partner', 'n8n Certified Orchestrator', 'Google Ads Premier Partner', 'Meta Business Partner', 'Stripe Developer Partner', 'OpenAI Enterprise Provider', 'Twilio Authorized ISV'
  ];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.businessName) return;
    setIsSubmitting(true);
    // Simulate n8n webhook call with security check
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-[#110B33] text-white' : 'bg-white text-[#110B33]'}`}>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-28">
        {/* Animated Background Mesh Glows */}
        <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(circle_at_top,rgba(11,95,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute right-[-10%] top-[20%] w-[350px] h-[350px] bg-accent/5 rounded-full filter blur-[120px] animate-pulse-slow pointer-events-none" />
        <div className="absolute left-[-10%] bottom-[10%] w-[350px] h-[350px] bg-[#00C2FF]/5 rounded-full filter blur-[120px] animate-pulse-slow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side text */}
            <div className="space-y-6 text-left">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                darkMode ? 'bg-white/[0.04] text-[#00C2FF] border border-white/[0.08]' : 'bg-primary/5 text-primary border border-primary/10'
              }`}>
                <Sparkles className="h-3.5 w-3.5 text-[#00C2FF] animate-pulse" />
                <span>Enterprise SaaS + Service Platform</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display leading-[1.1]">
                Grow Faster with AI Marketing, <br />
                <span className="bg-gradient-to-r from-primary via-[#00C2FF] to-accent bg-clip-text text-transparent">
                  Automation & Intelligent Agents
                </span>
              </h1>

              <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Helping MSMEs in India and SMBs worldwide generate qualified leads, automate redundant operations, and scale revenue with integrated GoHighLevel CRM and n8n pipelines.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setPath('contact')}
                  className="px-6 py-3 rounded-lg bg-primary hover:bg-opacity-90 hover:scale-[1.01] transition-all font-semibold text-xs text-white glow-primary flex items-center gap-2"
                >
                  Book Free Strategy Call <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPath('ai-readiness-assessment')}
                  className={`px-6 py-3 rounded-lg font-semibold text-xs border transition-colors flex items-center gap-1.5 ${
                    darkMode ? 'border-white/10 hover:bg-white/[0.04] text-white' : 'border-gray-200 hover:bg-gray-50 text-[#081120]'
                  }`}
                >
                  <Play className="h-3.5 w-3.5" /> Watch Platform Demo
                </button>
              </div>

              {/* Tag segments */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-6 text-[11px] font-mono text-gray-500">
                <span className="flex items-center gap-1.5">✓ No coding needed</span>
                <span className="flex items-center gap-1.5">✓ GoHighLevel partner agency</span>
                <span className="flex items-center gap-1.5">✓ GDPR & HIPAA Secure</span>
              </div>
            </div>

            {/* Right side 3D AI Globe */}
            <div className="relative">
              <InteractiveGlobe darkMode={darkMode} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trusted By Logo Marquee */}
      <section className={`py-8 border-y overflow-hidden select-none ${
        darkMode ? 'bg-white/[0.01] border-white/[0.05]' : 'bg-gray-50 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 mb-2 text-center">
          <p className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase">
            Official Platform Interconnections & Strategic Partners
          </p>
        </div>
        <div className="relative w-full flex overflow-x-hidden">
          {/* Double content scrolling to make continuous */}
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-sm font-semibold tracking-wide font-display text-gray-400 py-3">
            {partners.map((partner, idx) => (
              <span key={idx} className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                <span className="h-2 w-2 rounded-full bg-primary" /> {partner}
              </span>
            ))}
          </div>
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-sm font-semibold tracking-wide font-display text-gray-400 py-3" aria-hidden="true">
            {partners.map((partner, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                <span className="h-2 w-2 rounded-full bg-primary" /> {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive CRM & SaaS Dashboard Preview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">
            Central Command Center
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
            Integrated GrowthOS™ Live Terminal Preview
          </h2>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Track multi-channel WhatsApp responses, live lead scoring, before vs after savings, and programmatic webhook nodes.
          </p>
        </div>
        <DashboardPreview darkMode={darkMode} />
      </section>

      {/* 4. Solutions Overview Cards */}
      <section className={`py-20 border-t ${
        darkMode ? 'border-white/[0.05] bg-white/[0.01]' : 'border-gray-100 bg-gray-50/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="text-left space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">
                Platform Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
                Orchestrate Your Revenue Engines
              </h2>
            </div>
            <p className={`text-xs sm:text-sm max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Pick from pre-built software pipelines or fully managed integrations tailored for MSMEs in India and worldwide SMBs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Card 1 */}
            <div 
              onClick={() => setPath('solutions/ai-growth-marketing')}
              className={`p-6 rounded-xl border transition-all duration-300 group cursor-pointer hover:scale-[1.01] ${
                darkMode ? 'bg-white/[0.01] border-white/10 hover:border-primary/50' : 'bg-white border-gray-200 hover:border-primary/50 shadow-xs'
              }`}
            >
              <div className="p-3 bg-primary/10 text-primary w-fit rounded-lg mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold font-display mb-2">AI Growth Marketing</h3>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                Automated landing pages, SEO programmatics, and Google/Meta lead ads.
              </p>
              <span className="text-[10px] font-semibold text-primary inline-flex items-center gap-1">
                Learn Solution <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => setPath('solutions/ai-marketing-saas')}
              className={`p-6 rounded-xl border transition-all duration-300 group cursor-pointer hover:scale-[1.01] ${
                darkMode ? 'bg-white/[0.01] border-white/10 hover:border-[#00C2FF]/50' : 'bg-white border-gray-200 hover:border-[#00C2FF]/50 shadow-xs'
              }`}
            >
              <div className="p-3 bg-[#00C2FF]/10 text-[#00C2FF] w-fit rounded-lg mb-4 group-hover:bg-[#00C2FF] group-hover:text-dark transition-all">
                <BarChart className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold font-display mb-2">AI Marketing SaaS</h3>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                Content Studio, Automated SEO Copywriting, and Campaign Scorer dashboards.
              </p>
              <span className="text-[10px] font-semibold text-[#00C2FF] inline-flex items-center gap-1">
                Learn Solution <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>

            {/* Card 3 */}
            <div 
              onClick={() => setPath('solutions/crm-ai-automation')}
              className={`p-6 rounded-xl border transition-all duration-300 group cursor-pointer hover:scale-[1.01] ${
                darkMode ? 'bg-white/[0.01] border-white/10 hover:border-accent/50' : 'bg-white border-gray-200 hover:border-accent/50 shadow-xs'
              }`}
            >
              <div className="p-3 bg-accent/10 text-accent w-fit rounded-lg mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold font-display mb-2">CRM & Automation SaaS</h3>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                Custom GoHighLevel setups with pipelines, instant Calendly, and forms.
              </p>
              <span className="text-[10px] font-semibold text-accent inline-flex items-center gap-1">
                Learn Solution <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>

            {/* Card 4 */}
            <div 
              onClick={() => setPath('solutions/conversational-ai')}
              className={`p-6 rounded-xl border transition-all duration-300 group cursor-pointer hover:scale-[1.01] ${
                darkMode ? 'bg-white/[0.01] border-white/10 hover:border-[#00C2FF]/50' : 'bg-white border-gray-200 hover:border-[#00C2FF]/50 shadow-xs'
              }`}
            >
              <div className="p-3 bg-[#00C2FF]/10 text-[#00C2FF] w-fit rounded-lg mb-4 group-hover:bg-[#00C2FF] group-hover:text-dark transition-all">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold font-display mb-2">Conversational AI</h3>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                Official WhatsApp Business integration, RCS messaging, and AI Dialing bots.
              </p>
              <span className="text-[10px] font-semibold text-[#00C2FF] inline-flex items-center gap-1">
                Learn Solution <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>

            {/* Card 5 */}
            <div 
              onClick={() => setPath('solutions/ai-agents')}
              className={`p-6 rounded-xl border transition-all duration-300 group cursor-pointer hover:scale-[1.01] ${
                darkMode ? 'bg-white/[0.01] border-white/10 hover:border-primary/50' : 'bg-white border-gray-200 hover:border-primary/50 shadow-xs'
              }`}
            >
              <div className="p-3 bg-primary/10 text-primary w-fit rounded-lg mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold font-display mb-2">AI Agents & Workflows</h3>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                Advanced autonomous n8n workflows, HR bots, Finance logs, and operations.
              </p>
              <span className="text-[10px] font-semibold text-primary inline-flex items-center gap-1">
                Learn Solution <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Business Ecosystem (Growth Flywheel) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left panel info */}
          <div className="space-y-6 text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">
              Autonomous Flywheel
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
              The AI Growth Flywheel Model
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Click on each flywheel node to see how Natton Digital interlocks customer journeys from paid clicks to automated CRM revenue cycles.
            </p>

            <div className={`p-5 rounded-xl border ${
              darkMode ? 'bg-white/[0.01] border-white/[0.08]' : 'bg-gray-50 border-gray-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-3 mb-2 text-primary font-bold text-sm">
                {flywheelSteps[activeFlywheelStep].icon}
                <span>Step {activeFlywheelStep + 1}: {flywheelSteps[activeFlywheelStep].name}</span>
              </div>
              <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {flywheelSteps[activeFlywheelStep].desc}
              </p>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase font-bold">
                ✓ Yield: {flywheelSteps[activeFlywheelStep].metric}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {flywheelSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFlywheelStep(idx)}
                  className={`p-2.5 text-center rounded-lg text-xs font-semibold border truncate transition-all ${
                    activeFlywheelStep === idx
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : (darkMode 
                          ? 'border-white/[0.05] bg-white/[0.01] text-gray-400 hover:bg-white/[0.04]' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50')
                  }`}
                >
                  {step.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Right panel visuals: interconnected flywheel nodes diagram */}
          <div className="relative flex items-center justify-center h-[300px] md:h-[400px]">
            {/* outer rotating loop indicator */}
            <div className="absolute inset-4 rounded-full border border-dashed border-primary/25 animate-spin" style={{ animationDuration: '40s' }} />
            <div className="absolute inset-16 rounded-full border border-dashed border-accent/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />

            {/* Core hub */}
            <div className="relative z-10 p-5 rounded-full bg-dark border-2 border-[#00C2FF]/30 h-28 w-28 flex flex-col items-center justify-center shadow-2xl text-center">
              <span className="text-[8px] font-mono tracking-widest text-[#00C2FF] uppercase">Natton</span>
              <span className="text-xs font-bold font-display text-white mt-1">GrowthOS</span>
              <span className="text-[8px] text-gray-400 mt-0.5">Active</span>
            </div>

            {/* Orbiting nodes */}
            {flywheelSteps.map((step, idx) => {
              const angle = (idx * 2 * Math.PI) / flywheelSteps.length;
              const radius = 110; // orbit radius
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isSelected = activeFlywheelStep === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveFlywheelStep(idx)}
                  className={`absolute p-2.5 rounded-full border transition-all duration-300 z-20 flex items-center justify-center ${
                    isSelected
                      ? 'bg-primary text-white border-[#00C2FF] scale-110 shadow-[0_0_15px_rgba(0,194,255,0.4)]'
                      : (darkMode 
                          ? 'bg-dark text-gray-400 border-white/10 hover:text-white hover:border-white/30' 
                          : 'bg-white text-gray-600 border-gray-200 hover:text-primary hover:border-primary/30 shadow-xs')
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  title={step.name}
                >
                  {step.icon}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Product Showcase Display */}
      <section className={`py-20 border-t ${
        darkMode ? 'border-white/[0.05] bg-white/[0.01]' : 'border-gray-100 bg-gray-50/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">
              Core Product Modules
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
              Enterprise Growth Infrastructure
            </h2>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Proprietary SaaS technologies tailored for high conversion rates, extreme reliability, and webhook-first data models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* GrowthOS */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xs'
            }`}>
              <div>
                <span className="text-[9px] font-mono text-primary font-bold">CORE HUB</span>
                <h3 className="text-base font-bold font-display mt-1 mb-2">GrowthOS™</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                  Integrated CRM suite with visual pipeline trackers, lead enrichment, Calendly widgets, and automated reviews.
                </p>
              </div>
              <button onClick={() => setPath('products/growth-os')} className="text-xs font-semibold text-primary text-left flex items-center gap-1">
                Explore GrowthOS <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* AI Marketing Platform */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xs'
            }`}>
              <div>
                <span className="text-[9px] font-mono text-[#00C2FF] font-bold">CONTENT SUITE</span>
                <h3 className="text-base font-bold font-display mt-1 mb-2">AI Marketing</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                  Fires programmatic SEO grids, scrapes Google map directories for leads, scores ad campaign copywriting.
                </p>
              </div>
              <button onClick={() => setPath('products/ai-marketing-platform')} className="text-xs font-semibold text-[#00C2FF] text-left flex items-center gap-1">
                Explore Platform <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* BusinessOS */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xs'
            }`}>
              <div>
                <span className="text-[9px] font-mono text-accent font-bold">OPERATIONS NODE</span>
                <h3 className="text-base font-bold font-display mt-1 mb-2">BusinessOS™</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                  Links WhatsApp APIs, SMS clusters, and n8n servers directly with database systems.
                </p>
              </div>
              <button onClick={() => setPath('products/business-os')} className="text-xs font-semibold text-accent text-left flex items-center gap-1">
                Explore BusinessOS <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* AgenticOS */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xs'
            }`}>
              <div>
                <span className="text-[9px] font-mono text-[#00C2FF] font-bold">AUTONOMOUS ENGINE</span>
                <h3 className="text-base font-bold font-display mt-1 mb-2">AgenticOS™</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                  Deploys 6 concurrent AI Agents (Sales, Customer Support, Finance, HR) to act as autonomous staff.
                </p>
              </div>
              <button onClick={() => setPath('products/agentic-os')} className="text-xs font-semibold text-primary text-left flex items-center gap-1">
                Explore AgenticOS <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Case Studies Carousel */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">
              Case Studies & Proof
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
              Enterprise Success Blueprints
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCaseStudyIdx(p => p === 0 ? caseStudies.length - 1 : p - 1)}
              className={`p-2 rounded-lg border ${
                darkMode ? 'border-white/10 hover:bg-white/[0.04]' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveCaseStudyIdx(p => (p + 1) % caseStudies.length)}
              className={`p-2 rounded-lg border ${
                darkMode ? 'border-white/10 hover:bg-white/[0.04]' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel card */}
        <div className={`p-6 sm:p-10 rounded-2xl border relative overflow-hidden ${
          darkMode ? 'bg-[#0b1329] border-white/10' : 'bg-gray-50 border-gray-100'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6 text-left">
              <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono block">
                {caseStudies[activeCaseStudyIdx].client} ({caseStudies[activeCaseStudyIdx].industry})
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight leading-snug">
                "{caseStudies[activeCaseStudyIdx].tagline}"
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00C2FF]">The Challenge</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {caseStudies[activeCaseStudyIdx].challenge}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00C2FF]">The Solution</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {caseStudies[activeCaseStudyIdx].solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Results highlights list */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between ${
              darkMode ? 'bg-black/20 border-white/[0.05]' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div>
                <span className="text-xs font-mono font-bold text-[#00C2FF] uppercase block mb-4">Verifiable Metrics</span>
                <div className="space-y-3">
                  {caseStudies[activeCaseStudyIdx].results.map((res, i) => (
                    <p key={i} className="text-xs flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{res}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">ROI Achievement</span>
                  <span className="text-lg font-bold font-display text-[#00C2FF]">{caseStudies[activeCaseStudyIdx].metrics}</span>
                </div>
                <button onClick={() => setPath('case-studies')} className="text-xs font-bold text-primary flex items-center gap-1">
                  View Case Grid <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Animated Metrics Counter */}
      <section className={`py-16 border-y ${
        darkMode ? 'bg-white/[0.01] border-white/[0.05]' : 'bg-gray-50 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold font-display text-primary block">
                {leadsDelivered.toLocaleString()}+
              </span>
              <span className={`text-[10px] font-mono tracking-wider uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Automated Leads Sent
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#00C2FF] block">
                {hoursSaved.toLocaleString()}+ Hrs
              </span>
              <span className={`text-[10px] font-mono tracking-wider uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Manual Admin Saved
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold font-display text-accent block">
                {msmesServed.toLocaleString()}+ Brands
              </span>
              <span className={`text-[10px] font-mono tracking-wider uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                MSMEs & SMBs Scaled
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-400 block">
                +{revenueBoost}%
              </span>
              <span className={`text-[10px] font-mono tracking-wider uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Average Conversion Jump
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Free Consultation Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">
              Strategy Call Booking
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display leading-tight">
              Unlock Your Autonomous Scaling Blueprint Today
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Ready to automate? Complete our 30-second inquiry. Our GoHighLevel webhook instantly triggers your customizable business blueprint, scheduling an live tech specialist strategy session.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-primary/10 rounded mt-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">1-on-1 AI Pipeline Architect Session</h4>
                  <p className={`text-[11px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>We review your CRM, ads, and outline where bots can replace hours of manual follow-ups.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[#00C2FF]/10 rounded mt-1">
                  <CheckCircle className="h-4 w-4 text-[#00C2FF]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Targeted Market Fit Plan</h4>
                  <p className={`text-[11px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Specific compliance models for healthcare (HIPAA) or lead scoring metrics for education / real estate.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'
          }`}>
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4 font-sans animate-scale-up">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h3 className="text-sm font-bold font-display">Inquiry Synced & Dispatched!</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your inquiry data was successfully routed to GoHighLevel CRM via n8n webhook ID: <strong>wn_83210_growth</strong>.
                </p>
                <button
                  onClick={() => setPath('ai-readiness-assessment')}
                  className="py-2.5 px-5 rounded-lg bg-primary hover:bg-opacity-90 transition-all font-semibold text-xs text-white"
                >
                  Take AI Readiness Diagnostics
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4 font-sans text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Anusha S."
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Business Name</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Acme Enterprise"
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Work Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="corporate@acme.co"
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 / +1 ..."
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-[#081120] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail & Ecom</option>
                      <option value="Services">Professional Services</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monthly Revenue</label>
                    <select
                      value={formData.monthlyRevenue}
                      onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-[#081120] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                    >
                      <option value="< $10k USD">Under $10k USD</option>
                      <option value="$10k - $50k USD">$10k - $50k USD</option>
                      <option value="> $50k USD">Over $50k USD</option>
                    </select>
                  </div>
                  <div className="sm:col-span-1">
                    <label className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Primary Need</label>
                    <select
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-[#081120] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                    >
                      <option value="AI Automation Consulting">AI Consulting</option>
                      <option value="CRM GoHighLevel Setup">GHL CRM Setup</option>
                      <option value="n8n Integration workflows">n8n Workflows</option>
                      <option value="AI Growth Marketing">Growth Marketing</option>
                    </select>
                  </div>
                </div>

                {/* Privacy / captcha notice */}
                <p className="text-[9px] text-gray-500 font-sans leading-relaxed">
                  By submitting, you agree to secure data collection under Indian MSME and US GDPR guidelines. Protected by Google reCAPTCHA. Form automatically maps to n8n webhook endpoints.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-white hover:bg-opacity-95 rounded-lg font-semibold text-xs glow-primary transition-all flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? 'Syncing to CRM...' : 'Dispatch Automated Consultation Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
