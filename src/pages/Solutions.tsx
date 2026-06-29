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
  DollarSign
} from 'lucide-react';
import { RoutePath } from '../types';
import SolutionMarketingSaaS from './SolutionMarketingSaaS';
import SolutionCrmAutomation from './SolutionCrmAutomation';
import SolutionConversationalAi from './SolutionConversationalAi';
import SolutionWhatsAppAutomation from './SolutionWhatsAppAutomation';
import SolutionAiAgents from './SolutionAiAgents';
import SolutionAiCallingAgents from './SolutionAiCallingAgents';
import SolutionCloudTelephony from './SolutionCloudTelephony';
import SolutionRcsMessaging from './SolutionRcsMessaging';

interface SolutionsProps {
  subPath: 'ai-growth-marketing' | 'ai-marketing-saas' | 'crm-ai-automation' | 'conversational-ai' | 'whatsapp-automation' | 'ai-agents' | 'ai-calling-agents' | 'cloud-telephony' | 'rcs-messaging';
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Solutions({ subPath, setPath, darkMode }: SolutionsProps) {
  // Global form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Re-initialize state when route changes
  useEffect(() => {
    setFormSubmitted(false);
    setLoading(false);
  }, [subPath]);

  // Render specific sub-page
  switch (subPath) {
    case 'ai-growth-marketing':
      return <SolutionGrowthMarketing setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />;
    case 'ai-marketing-saas':
      return <SolutionMarketingSaaS setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />;
    case 'crm-ai-automation':
      return <SolutionCrmAutomation setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />;
    case 'conversational-ai':
      return <SolutionConversationalAi setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />;
    case 'whatsapp-automation':
      return <SolutionWhatsAppAutomation setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />;
    case 'ai-agents':
      return <SolutionAiAgents setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />;
    case 'ai-calling-agents':
      return <SolutionAiCallingAgents setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />;
    case 'cloud-telephony':
      return <SolutionCloudTelephony setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />;
    case 'rcs-messaging':
      return <SolutionRcsMessaging setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />;
    default:
      return <div>Solution page not found.</div>;
  }
}

// ==========================================
// 1. AI GROWTH MARKETING VIEW
// ==========================================
function SolutionGrowthMarketing({ setPath, darkMode, formSubmitted, setFormSubmitted, loading, setLoading }: any) {
  const [activeFunnelStage, setActiveFunnelStage] = useState(0);
  const [formData, setFormData] = useState({ name: '', businessName: '', website: '', budget: '$1,000 - $3,000 / mo', requirement: 'Meta & Google Ads Management' });

  const funnelStages = [
    { title: 'AEO & SEO Organic Pull', rate: '100% (Baseline)', details: 'Programmatic target pages query AEO search engines (Perplexity, ChatGPT, Gemini), dragging high-intent clicks for free.' },
    { title: 'Meta/Google High-Intent Ads', rate: '32% Conversion', details: 'Fires dynamic custom-scoped ad arrays mapping local Indian MSME and world SMB segments with webhook tags.' },
    { title: 'Webhook Landing Captures', rate: '74% Opt-In', details: 'Form entries instantly trigger n8n node responses, keeping leads fully locked and synced to GoHighLevel CRM.' },
    { title: 'AI Voice/Text Prequalification', rate: '45% Visit Rates', details: 'Autonomous dialers call back under 45 seconds, validating intent and booking final calendar meetings.' },
  ];

  const services = [
    { name: 'Website Development', desc: 'React with Vite frontend architectures. Super clean speed scores (95+ Lighthouse), preloaded tracking, and responsive mobile viewports.' },
    { name: 'SEO & AEO (Answer Engine Opt.)', desc: 'Optimization protocols specifically designed for modern AI models (ChatGPT, Gemini, Perplexity) to reference your brand first.' },
    { name: 'Google Performance Max Ads', desc: 'Intent-driven keyword campaigns paired with customized bidding algorithms designed to capture active B2B / B2C purchasers.' },
    { name: 'Meta Advantage+ Ads', desc: 'Visual retargeting matrices that convert social traffic, capturing contacts with instant native lead forms.' },
    { name: 'Social Media & Brand Management', desc: 'Consistent content calendars, visual aesthetics, and autonomous comment autoresponders that boost baseline engagement.' },
    { name: 'Lead Generation Pipelines', desc: 'Full architectural wiring from initial search to n8n webhook routing, ensuring zero database leakage.' },
  ];

  const timelineSteps = [
    { phase: '01. Diagnostic Audit', desc: 'Diagnostic scan mapping existing SEO lag, CRM configuration gaps, and competitor campaign blueprints.' },
    { phase: '02. Architecture Setup', desc: 'Mapping webhooks, custom schemas, Calendly schedulers, and n8n node orchestration environments.' },
    { phase: '03. Campaign Launch', desc: 'Deploying optimized ads, landing pages, organic programmatics, and active AI call centers.' },
    { phase: '04. Constant Opt.', desc: 'AI reviews daily analytics, adjusting keywords and bid thresholds, scaling your revenue autonomous.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1500);
  };

  return (
    <div className="py-12 animate-fade-in font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 text-xs font-mono text-gray-500">
          <button onClick={() => setPath('home')} className="hover:text-primary">Home</button> / <span className="text-[#00C2FF]">Solutions</span> / <span>AI Growth Marketing</span>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Managed Marketing Solutions</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-display leading-tight">
              Programmatic Lead Gen & <br />
              <span className="bg-gradient-to-r from-primary to-[#47C7BF] bg-clip-text text-transparent">AI Search Engine Domination</span>
            </h1>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Combine premium high-performance web development, modern AEO, Google Ads, and instant GoHighLevel webhooks to lock down consistent, pre-qualified sales calls for your enterprise.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setPath('ai-readiness-assessment')} className="px-5 py-3 rounded-lg bg-primary text-white text-xs font-semibold glow-primary">
                Analyze My Funnel →
              </button>
              <button onClick={() => setPath('contact')} className={`px-5 py-3 rounded-lg border text-xs font-semibold ${darkMode ? 'border-white/10 text-white' : 'border-gray-200 text-[#110B33]'}`}>
                Book Strategic Session
              </button>
            </div>
          </div>

          {/* SVG Glowing Interactive Funnel */}
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Dynamic Conversions Funnel</h3>
            <p className={`text-[10px] mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click different stages to inspect conversion mechanics:</p>

            <div className="space-y-2.5">
              {funnelStages.map((stage, idx) => {
                const colors = ['bg-primary', 'bg-[#00C2FF]', 'bg-accent', 'bg-emerald-500'];
                const widths = ['w-full', 'w-[80%]', 'w-[64%]', 'w-[45%]'];
                const isSelected = activeFunnelStage === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveFunnelStage(idx)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#00C2FF] bg-white/[0.02] shadow-md'
                        : (darkMode ? 'border-white/[0.05] hover:border-white/20' : 'border-gray-200 hover:border-gray-300')
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{stage.title}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">{stage.rate}</span>
                    </div>
                    {/* Visual Funnel bar representation */}
                    <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden w-full">
                      <div className={`h-full ${colors[idx]} ${widths[idx]} transition-all`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* active details panel */}
            <div className={`mt-4 p-3 rounded-lg text-[11px] leading-relaxed ${darkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
              <strong className="text-[#00C2FF]">Stage Details:</strong> {funnelStages[activeFunnelStage].details}
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold font-display">Core Agency Growth Services</h2>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Built with raw speed, conversion psychology, and enterprise grade compliance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <div key={idx} className={`p-5 rounded-xl border ${darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-gray-100 shadow-xs'}`}>
                <h4 className="text-xs font-bold text-[#00C2FF] uppercase mb-1.5">{s.name}</h4>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontally animated timeline infographic */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold font-display mb-8 text-center">Your Growth Roadmap Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* dash line for desktop timeline connect */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 border-t border-dashed border-primary/20 z-0" />

            {timelineSteps.map((step, idx) => (
              <div key={idx} className={`p-5 rounded-xl border relative z-10 ${darkMode ? 'bg-dark/80 border-white/10' : 'bg-white border-gray-200'}`}>
                <span className="text-xs font-bold text-primary font-mono">{step.phase}</span>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Strategy Booking Form */}
        <div className={`p-6 sm:p-10 rounded-2xl border max-w-2xl mx-auto ${darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
          {formSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-lg">✓</div>
              <h3 className="text-sm font-bold font-display">Strategy Booking Captured</h3>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Your details were dispatched into our active GHL pipeline. We will call you within 15 minutes!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold font-display mb-4 text-center">Secure Your Personalized Campaign Strategy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none ${darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200'}`}
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Company Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://acme.co"
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none ${darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200'}`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Monthly Ad Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none ${darkMode ? 'bg-dark border-white/10 text-white' : 'bg-white border-gray-200'}`}
                  >
                    <option value="$1,000 - $3,000 / mo">$1,000 - $3,000 / mo</option>
                    <option value="$3,000 - $10,000 / mo">$3,000 - $10,000 / mo</option>
                    <option value="> $10,000 / mo">Over $10,000 / mo</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Requirements</label>
                  <select
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none ${darkMode ? 'bg-dark border-white/10 text-white' : 'bg-white border-gray-200'}`}
                  >
                    <option value="Meta & Google Ads Management">Meta & Google Ads</option>
                    <option value="AEO & Programmatic SEO Optimization">AEO & Organic SEO</option>
                    <option value="Full Stack Funnel Development">Full Stack Web Dev</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-white text-xs font-semibold rounded-lg glow-primary hover:bg-opacity-95 transition-all">
                {loading ? 'Dispatching...' : 'Request Campaign Growth Strategy Blueprint'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
