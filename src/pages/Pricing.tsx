import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  Check, 
  HelpCircle, 
  Send, 
  Zap, 
  BarChart, 
  ArrowUpRight, 
  Sliders, 
  ChevronRight, 
  CheckCircle, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Building, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  X, 
  Database, 
  Workflow, 
  Users, 
  FileText, 
  MessageSquare, 
  ChevronDown, 
  Activity, 
  SlidersHorizontal, 
  Globe, 
  DollarSign, 
  Clock, 
  Lock, 
  Gift, 
  Briefcase, 
  RefreshCw,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { RoutePath } from '../types';

interface PricingProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Pricing({ setPath, darkMode }: PricingProps) {
  // Billing cycle state
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  // Industry specific recommendation state
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ecommerce');

  // ROI Calculator inputs
  const [adSpend, setAdSpend] = useState<number>(100000); // INR per month
  const [currentLeads, setCurrentLeads] = useState<number>(200);
  const [closeRate, setCloseRate] = useState<number>(10); // in %

  // Active platform tab
  const [activeTab, setActiveTab] = useState<'marketing' | 'crm' | 'communication' | 'agentic' | 'n8n'>('marketing');

  // FAQ expansion state (allow multi-expand or single)
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([0, 1, 2]);

  // Form submission simulation state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formLogs, setFormLogs] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    industry: 'Ecommerce',
    country: 'India',
    email: '',
    phone: '',
    teamSize: '11-50',
    monthlyRevenue: '₹5L - ₹20L',
    interestedSolutions: [] as string[],
    message: '',
    acceptTerms: true
  });

  const solutionOptions = [
    'AI Marketing Platform',
    'GrowthOS CRM',
    'BusinessOS Communication',
    'AgenticOS Multi-Agents',
    'Custom n8n Automations',
    'White Label Program'
  ];

  // Recommendations result helper
  const handleIndustrySelect = (ind: string) => {
    setSelectedIndustry(ind);
  };

  const getRecommendedPlan = () => {
    switch (selectedIndustry) {
      case 'ecommerce':
        return {
          title: 'GrowthOS™ CRM + BusinessOS™ Platform',
          suitability: 'Optimized for high transaction rates, cart recoveries, and real-time WhatsApp automation.',
          highlightMetric: 'Up to 34% reduction in abandoned checkout rates.',
          ctaPlan: 'BusinessOS Growth Plan',
          features: ['Shopify/WooCommerce sync', 'WhatsApp Broadcast automation', 'Automated customer review loops']
        };
      case 'healthcare':
        return {
          title: 'BusinessOS™ Enterprise (HIPAA Compliant)',
          suitability: 'Configured for high-security clinics, patient triages, and automated diagnostic intake workflows.',
          highlightMetric: '99.9% SMS/calling appointment show rate.',
          ctaPlan: 'Talk to Compliance Experts',
          features: ['Secure data portal routing', 'Outbound appointment recall voice bots', 'Doctor roster sync & scheduling']
        };
      case 'education':
        return {
          title: 'AI Marketing Platform™ (Growth) + CRM Integration',
          suitability: 'Best for educational consultancies, EdTech lead nurture, and dynamic brochure distribution.',
          highlightMetric: '4.2x higher lead-to-enrollment ratios.',
          ctaPlan: 'Starter or Growth Bundle',
          features: ['WhatsApp brochures & auto-responses', 'Course fee collection webhooks', 'Multi-counselor lead routing']
        };
      case 'realestate':
        return {
          title: 'AgenticOS™ (Single Agent Setup) + Cloud Telephony',
          suitability: 'Made for real estate developers needing automated lead qualification, booking tours, and phone dialers.',
          highlightMetric: 'Zero missed inbound calls with instant 10-second WhatsApp greetings.',
          ctaPlan: 'AgenticOS Starter',
          features: ['Interactive voice bot qualification', 'Automatic site tour schedules', 'Dynamic buyer hotness scoring']
        };
      case 'services':
      default:
        return {
          title: 'BusinessOS™ Communication (Growth Plan)',
          suitability: 'Perfect for consultancies, agencies, and professional firms needing fast quotes, invoices, and messaging pipelines.',
          highlightMetric: 'Avg. response time slashed from 4 hours to 18 seconds.',
          ctaPlan: 'BusinessOS Starter',
          features: ['Unified conversation inbox', 'Automated estimates generation', 'Resend/SMTP customer transaction alerts']
        };
    }
  };

  // Dynamic calculations based on sliders
  const avgDealValue = 5000; // INR average deal value
  const leadsConversionMultiplier = 1.4; // 40% conversion rate increase (as per ROI section)
  const speedResponseMultiplier = 3; // 3X speed of leads

  const currentRevenue = currentLeads * (closeRate / 100) * avgDealValue;
  const projectedLeads = currentLeads * 1.5; // 3X Lead Growth potential, capped conservatively at 1.5x in leads count, plus better conversions
  const projectedCloseRate = Math.min(100, closeRate * leadsConversionMultiplier);
  const projectedRevenue = projectedLeads * (projectedCloseRate / 100) * avgDealValue;
  const netRevenueGain = projectedRevenue - currentRevenue;
  const monthlyTimeSaved = Math.round(currentLeads * 0.45); // 0.45 hours saved per lead qualified
  const moneySavedByAutomation = Math.round(currentLeads * 250); // ₹250 saved per lead in manual operations overhead

  // FAQs (Exactly 20 rich items requested)
  const pricingFaqs = [
    {
      q: "What is the difference between AI Marketing Platform™, GrowthOS™, and BusinessOS™?",
      a: "AI Marketing Platform™ focuses on organic and paid user acquisition (SEO, Google/Meta Ads, AI Content Studio). GrowthOS™ is our advanced AI-powered CRM designed for pipeline mapping, lead scoring, and customer nurturing. BusinessOS™ is our unified multi-channel communication engine that powers WhatsApp APIs, automated cloud telephony dialers, live chat sync, and internal alert triggers."
    },
    {
      q: "Are Meta charges included in the WhatsApp Automation plan?",
      a: "No. The ₹4,999/month platform fee covers the Natton Digital unified dashboard, broadcast schedulers, bot triggers, and n8n flow integrations. Meta conversation fees (utility vs. marketing conversation charges) are billed directly based on actual Meta country pricing matrices."
    },
    {
      q: "Do you offer a discount for annual billing plans?",
      a: "Yes! Choosing our Annual plans saves you 20% across all primary platform tiers. For example, the AI Marketing Starter plan is ₹24,999 monthly, but bills at a discounted rate of ₹2,39,999 annually (saving ₹60,000 yearly)."
    },
    {
      q: "Is there an setup or onboarding fee for setting up these custom CRM nodes?",
      a: "For Starter and basic tiers, setup is completely self-serve with standard tutorials. For our Growth and Scale tiers, our engineering team handles standard pipeline mappings, DNS verification, and CRM imports at no extra charge. Full-scale custom legacy SAP/Tally ERP integrations are quoted separately."
    },
    {
      q: "What is AgenticOS™ and how is it different from normal automations?",
      a: "Normal automations (like standard webhooks) are static, linear rules (IF this THEN that). AgenticOS™ deploys cognitive AI agents powered by Gemini. These agents reason, evaluate client intent scores, read documents, draft contextual customized emails, verify accounting balances, and orchestrate complex decision-making processes autonomously."
    },
    {
      q: "Can we downgrade, upgrade, or cancel our monthly subscription at any time?",
      a: "Yes. All monthly plans are entirely pay-as-you-go with no locked contracts. You can upgrade, downgrade, or cancel directly from your client Billing Portal. Annual plans are contracted for 12 months with the 20% discount applied upfront."
    },
    {
      q: "Do I need separate licenses for OpenAI, Anthropic, or Gemini to run the AI features?",
      a: "No! All built-in AI functions (AI copywriters, lead scores, voice transcriptions, agent triages) run on Natton Digital's enterprise servers and are fully bundled within your plan quota. You do not need to purchase any secondary AI API keys."
    },
    {
      q: "How does the custom n8n automation service work?",
      a: "If you have specific workflows (e.g. sync Excel logs to Google Sheets, pull WhatsApp messages and format PDF quotes, send SMS reminders to teammates), our engineers compile these on a high-speed private n8n node. We charge a one-time build fee starting at ₹25,000, and hosting is completely free."
    },
    {
      q: "Do you support White Label partnerships for agencies or consulting partners?",
      a: "Yes, we offer White Label partner programs. Agencies can resell our CRM, WhatsApp automations, and AI Calling platforms under their own brand, logos, and custom domains. Contact our partner desks via the pricing form to receive detailed pricing sheets."
    },
    {
      q: "How secure is my CRM data when integrated with Natton Digital?",
      a: "Enterprise-grade safety is our absolute standard. We are ISO 27001 certified and SOC2 ready. All client data and contact details are fully encrypted in transit (using TLS 1.3) and at rest (using AES-256 tokens) with secure Firebase user-auth roles."
    },
    {
      q: "What is the voice-calling latency on your AI Calling Agents?",
      a: "Our Voice AI calling solutions operate under 1.2 seconds conversational latency, powered by advanced text-to-speech models and low-latency telephony lines. This provides an incredibly smooth, human-like voice conversation experience."
    },
    {
      q: "What local payment gateways do you support?",
      a: "We support Stripe, Razorpay, Cashfree, PayPal, and PhonePe PG integrations. This allows you to collect payments worldwide or via UPI, card, net banking, or local wallets with instant status callbacks back to your CRM."
    },
    {
      q: "Are there any hidden API limits or database transaction fees?",
      a: "No hidden fees. Each plan clearly lists its included contact lists, workflow limits, and messaging counts. High-volume custom tiers can scale-up dynamically with predictable, transparent overage rates."
    },
    {
      q: "Do you offer HIPAA-compliant hosting configurations for medical clinics?",
      a: "Yes. For medical centers and diagnostic labs, we deploy our secure, isolated Private Gateway networks to ensure patient data remains strictly isolated, utilizing HIPAA-safe notifications instead of raw text patient charts."
    },
    {
      q: "Can I migrate existing contact lists from Salesforce or HubSpot easily?",
      a: "Absolutely! GrowthOS supports direct JSON and CSV imports. Our support experts will guide you through mapping custom fields so that zero historical client data or tags are lost."
    },
    {
      q: "What level of support do you provide on the Starter plans?",
      a: "Starter plans receive standard 48-hour email support and full access to our extensive Help Center, interactive video tutorials, and API documentation hubs."
    },
    {
      q: "What does the 'Dedicated Success Manager' include in the Enterprise tier?",
      a: "Your Dedicated Success Manager serves as your private strategic partner. They coordinate with your engineering team, write custom n8n flows, audit campaign ROIs monthly, and conduct live employee training webinars."
    },
    {
      q: "What is RCS messaging, and is it better than standard SMS marketing?",
      a: "RCS (Rich Communication Services) is the modern upgrade to SMS for Android users. It supports full rich branding, verification badges, clickable carousels, action buttons, and complete checkout journeys right inside the default text inbox."
    },
    {
      q: "Is there a free trial option available to test the platform?",
      a: "Yes, we offer full sandbox access during our product demonstrations. Book a live demo call with our experts to review custom modules built for your exact industry, with full mock playfields."
    },
    {
      q: "Where are Natton Digital's server clusters hosted?",
      a: "Our core edge architecture is deployed across redundant Vercel and Google Cloud Run container arrays globally, with local Indian regions in Mumbai to ensure optimal speed and compliance."
    }
  ];

  // Toggle FAQ indexes helper
  const handleToggleFaq = (index: number) => {
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(prev => prev.filter(i => i !== index));
    } else {
      setExpandedFaqs(prev => [...prev, index]);
    }
  };

  // Submit form simulation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }

    setFormLoading(true);
    setFormLogs([]);

    const logSteps = [
      "📡 Intercepting custom plan submission from domains...",
      "🔑 Mapping user credentials with n8n workflow triggers (Webhook ID: pricing_custom_ghl)...",
      "🏗️ Syncing contact details with GoHighLevel API streams...",
      "🤖 Launching Gemini AI analyzer: Parsing company size, ad spend, and objectives...",
      "🧠 AI Categorization: Enterprise priority score: 98% (Industry: " + formData.industry + ")...",
      "📨 Initializing SMTP relay via Resend to dispatch customized quote templates...",
      "⚡ Sending live WhatsApp push alert to Partner desk...",
      "🚀 Webhook pipeline complete. Custom plan session logged successfully."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logSteps.length) {
        setFormLogs(prev => [...prev, logSteps[i]]);
        i++;
      } else {
        clearInterval(interval);
        setFormLoading(false);
        setFormSubmitted(true);
      }
    }, 450);
  };

  const handleCheckboxChange = (option: string) => {
    if (formData.interestedSolutions.includes(option)) {
      setFormData(prev => ({
        ...prev,
        interestedSolutions: prev.interestedSolutions.filter(item => item !== option)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interestedSolutions: [...prev.interestedSolutions, option]
      }));
    }
  };

  // Smooth scroll to element
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="pricing-root" className="relative min-h-screen font-sans bg-[#0A042A] text-white overflow-hidden py-12 md:py-20 select-none">
      {/* Background Animated Gradient Mesh / Universe */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
        <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-primary/30 to-purple-600/30 blur-[130px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-10%] right-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-emerald-500/20 to-cyan-500/30 blur-[130px] animate-pulse" style={{ animationDuration: '14s' }} />
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-800/20 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#47C7BF] mb-4 shadow-inner"
          >
            <Sparkles className="h-3 w-3 text-emerald-400" />
            Pricing Universe & Growth Packages
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400 mb-6"
          >
            Simple Pricing.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2E9CAE] via-[#47C7BF] to-[#99D57C]">Powerful Results.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Choose the right plan for your business growth journey. Transparent pricing for AI marketing, GrowthOS™ CRM, BusinessOS™ messaging and autonomous AgenticOS™ frameworks.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() => setPath('book-demo')}
              className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-semibold px-8 py-4 rounded-xl bg-[#2E9CAE] text-white hover:bg-[#47C7BF] transition-all transform hover:scale-[1.03] shadow-[0_0_20px_rgba(46,156,174,0.4)]"
            >
              Book Demo
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
            <button
              onClick={() => scrollToId('pricing-custom-form')}
              className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-semibold px-8 py-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all transform hover:scale-[1.03]"
            >
              Talk To Experts
            </button>
          </motion.div>

          {/* 3D Pricing Cards Floating Ecosystem simulation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6 relative select-none">
            {/* Visual background lines */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent z-[-1] hidden md:block" />
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between text-left h-[200px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="bg-blue-500/10 text-blue-400 p-2 rounded-lg">
                    <Layers className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">GROWTH OS</span>
                </div>
                <h3 className="text-lg font-bold mt-4 text-white">SaaS Modules</h3>
                <p className="text-xs text-gray-400 mt-1">Starting from ₹4,999/mo</p>
              </div>
              <div className="text-[11px] font-mono text-blue-400 flex items-center gap-1 cursor-pointer" onClick={() => scrollToId('platforms-table')}>
                Explore SaaS Tiers <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#1C164D] to-[#0A042A] border border-[#47C7BF]/30 backdrop-blur-md flex flex-col justify-between text-left h-[220px] relative shadow-[0_10px_30px_rgba(71,199,191,0.15)]"
            >
              <div className="absolute top-3 right-3 bg-gradient-to-r from-[#2E9CAE] to-[#99D57C] text-black font-extrabold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Autonomous
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#47C7BF]">AGENTIC OS</span>
                </div>
                <h3 className="text-lg font-bold mt-4 text-white">AI Agents Systems</h3>
                <p className="text-xs text-gray-400 mt-1">Custom cognitive task loops</p>
              </div>
              <div className="text-[11px] font-mono text-[#47C7BF] flex items-center gap-1 cursor-pointer" onClick={() => scrollToId('platforms-table')}>
                Explore Agentic Tiers <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between text-left h-[200px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="bg-purple-500/10 text-purple-400 p-2 rounded-lg">
                    <Workflow className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">n8n NODES</span>
                </div>
                <h3 className="text-lg font-bold mt-4 text-white">Custom Flows</h3>
                <p className="text-xs text-gray-400 mt-1">Starting from ₹25,000</p>
              </div>
              <div className="text-[11px] font-mono text-purple-400 flex items-center gap-1 cursor-pointer" onClick={() => scrollToId('platforms-table')}>
                Explore Custom Workflows <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* BILLING TOGGLE AND OFFERS BANNER */}
        <div id="billing_toggle" className="text-center mb-16 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-full shadow-inner mb-3">
            <button
              onClick={() => setIsAnnual(false)}
              className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
                !isAnnual ? 'bg-[#2E9CAE] text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all relative flex items-center justify-center gap-1 ${
                isAnnual ? 'bg-[#2E9CAE] text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual Billing
              <span className="bg-[#99D57C] text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-tight">
                Save 20%
              </span>
            </button>
          </div>
          <p className="text-xs text-gray-500 font-medium">Save up to ₹2,40,000 annually with automated annual commitments.</p>
        </div>

        {/* DYNAMIC RECOMMENDATION ENGINE MODULE */}
        <div className="mb-20 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#47C7BF]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#47C7BF]">Interactive Diagnostic Recommended</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-white">Dynamic AI Plan Recommender</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Tell us your primary business sector to immediately filter the optimal combination of CRM pipelines, WhatsApp triggers, and agentic workflows for your exact use case.
              </p>

              {/* Selector buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'ecommerce', label: 'E-commerce & Retail' },
                  { id: 'healthcare', label: 'Healthcare & Clinics' },
                  { id: 'education', label: 'Education & EdTech' },
                  { id: 'realestate', label: 'Real Estate Developers' },
                  { id: 'services', label: 'Professional Services' }
                ].map(ind => (
                  <button
                    key={ind.id}
                    onClick={() => handleIndustrySelect(ind.id)}
                    className={`text-xs px-3.5 py-2.5 rounded-lg border font-semibold transition-all duration-200 ${
                      selectedIndustry === ind.id 
                        ? 'bg-[#2E9CAE]/20 border-[#2E9CAE] text-white shadow-md' 
                        : 'bg-white/[0.02] border-white/[0.05] text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 relative">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[9px] font-mono text-[#99D57C] uppercase tracking-widest block mb-1">Recommended Deployment Bundle</span>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {getRecommendedPlan().title}
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-gray-500">EXPECTED GAINS</span>
                  <span className="block text-xs font-bold text-[#47C7BF] mt-0.5">{getRecommendedPlan().highlightMetric}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                {getRecommendedPlan().suitability}
              </p>

              <div className="space-y-3 mb-6">
                {getRecommendedPlan().features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                    <Check className="h-3.5 w-3.5 text-[#47C7BF]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/[0.05]">
                <span className="text-[10px] font-mono text-gray-500">Perfect synergy for maximum client retention.</span>
                <button 
                  onClick={() => scrollToId('platforms-table')}
                  className="text-xs font-bold text-white hover:text-[#47C7BF] flex items-center gap-1 transition-colors"
                >
                  View Pricing Tiers <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CORE PLATFORMS PRICING SECTION */}
        <div id="platforms-table" className="mb-20">
          
          {/* Navigation tabs */}
          <div className="flex overflow-x-auto gap-2 border-b border-white/[0.08] pb-px mb-8 scrollbar-thin scrollbar-thumb-white/10">
            {[
              { id: 'marketing', label: 'AI Marketing Platform™' },
              { id: 'crm', label: 'GrowthOS™ CRM' },
              { id: 'communication', label: 'BusinessOS™ Communications' },
              { id: 'agentic', label: 'AgenticOS™ (Gemini AI)' },
              { id: 'n8n', label: 'Custom n8n Automations' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-4 text-xs font-bold tracking-wider uppercase border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'border-[#2E9CAE] text-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENTS */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              
              {/* TAB 1: AI Marketing Platform */}
              {activeTab === 'marketing' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold">AI Marketing Platform™ Plans</h3>
                    <p className="text-xs text-gray-400 mt-1">High-performance organic visibility, content engine, and automated Meta/Google ad integrations.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Starter */}
                    <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-white/10 transition-all flex flex-col justify-between relative">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-extrabold text-lg text-white">Starter</h4>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-gray-400">SEO Essentials</span>
                        </div>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">
                            {isAnnual ? "₹2,39,999" : "₹24,999"}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">/{isAnnual ? 'year' : 'month'}</span>
                          {isAnnual && <span className="block text-[10px] text-emerald-400 font-semibold mt-1">Saves ₹60,000 / year</span>}
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Perfect for small businesses starting their Google and organic lead acquisition journeys.</p>
                        
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">FEATURES INCLUDED</p>
                          {['Website Management & Audits', 'Organic SEO Optimization', 'Google Business Profile Setup', 'Monthly Growth Reports', 'Standard Email Support'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setPath('book-demo')} className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/[0.08] transition-all">
                        Get Started
                      </button>
                    </div>

                    {/* Growth - Popular */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1C164D] to-[#0A042A] border-2 border-[#47C7BF]/60 hover:border-[#47C7BF] transition-all flex flex-col justify-between relative shadow-[0_15px_35px_rgba(71,199,191,0.15)]">
                      <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#2E9CAE] via-[#47C7BF] to-[#99D57C] text-black text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        Most Popular Plan
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-4 mt-2">
                          <h4 className="font-extrabold text-lg text-white">Growth</h4>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Paid + Organic</span>
                        </div>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">
                            {isAnnual ? "₹4,79,999" : "₹49,999"}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">/{isAnnual ? 'year' : 'month'}</span>
                          {isAnnual && <span className="block text-[10px] text-emerald-400 font-semibold mt-1">Saves ₹1,20,000 / year</span>}
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Designed for ambitious mid-market brands running active paid ads and social campaigns.</p>
                        
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          <p className="text-[10px] font-mono text-[#47C7BF] uppercase tracking-widest mb-2">FEATURES INCLUDED</p>
                          {['SEO + AEO Optimization', 'Meta Ads Setup & Management', 'Google Ads Setups & Keyword Audits', 'Active Social Media Posting', 'Dedicated Lead Generation flows', 'AI Content Creation Workspace', 'Priority 24h Support'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-[#47C7BF] flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setPath('book-demo')} className="w-full py-3 rounded-xl bg-[#2E9CAE] text-white text-xs font-bold hover:bg-[#47C7BF] transition-all shadow-[0_0_15px_rgba(46,156,174,0.3)]">
                        Get Started
                      </button>
                    </div>

                    {/* Scale */}
                    <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-white/10 transition-all flex flex-col justify-between relative">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-extrabold text-lg text-white">Scale</h4>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-gray-400">Omichannel Enterprise</span>
                        </div>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">
                            {isAnnual ? "₹9,59,999" : "₹99,999"}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">/{isAnnual ? 'year' : 'month'}</span>
                          {isAnnual && <span className="block text-[10px] text-emerald-400 font-semibold mt-1">Saves ₹2,40,000 / year</span>}
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Complete strategic package for multi-city businesses scaling leads programmatically.</p>
                        
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">FEATURES INCLUDED</p>
                          {['Performance Marketing Hub', 'Advanced Multi-channel Analytics', 'Dynamic Ad Spend Optimization', 'Unified Marketing Data Pipelines', 'Custom Asset Libraries (Video/Static)', 'Dedicated Slack Collaboration Desk', 'Success Manager Audits'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => scrollToId('pricing-custom-form')} className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/[0.08] transition-all">
                        Talk To Experts
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: GrowthOS CRM */}
              {activeTab === 'crm' && (
                <div>
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">GrowthOS™ CRM Platform Plans</h3>
                      <p className="text-xs text-gray-400 mt-1">High-converting pipelines, scoring engines, database integrations, and automated alerts.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.05] text-[10px] font-mono text-[#99D57C]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      Saves average 14 hours manual follow-ups weekly
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Basic */}
                    <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-lg mb-2">Basic</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">₹4,999</span>
                          <span className="text-xs text-gray-500 font-medium">/month</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Essential client organizer for solopreneurs and small field sales operators.</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['Unified Contact Management', 'Single Sales Pipeline Grid', 'Essential Email Automation', 'Booking Calendar Integration', 'Standard Analytics Reports'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setPath('book-demo')} className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/[0.08] transition-all">
                        Get Started
                      </button>
                    </div>

                    {/* Professional - Popular */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1C164D] to-[#0A042A] border-2 border-[#47C7BF]/60 hover:border-[#47C7BF] transition-all flex flex-col justify-between relative shadow-[0_15px_35px_rgba(71,199,191,0.15)]">
                      <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#2E9CAE] via-[#47C7BF] to-[#99D57C] text-black text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        Highly Popular
                      </div>
                      <div>
                        <h4 className="font-extrabold text-lg mb-2 mt-2">Professional</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">₹9,999</span>
                          <span className="text-xs text-gray-500 font-medium">/month</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Full multi-channel follow-ups, automatic scoring, and comprehensive lead workflows.</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['Unlimited Sales Pipelines', 'Advanced Marketing Automation', 'Automated Lead Scoring Nodes', 'Multi-user Calendar Schedules', 'Custom API Key Access', 'Interactive Dashboard Analytics', 'Priority Email Support'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                              <Check className="h-3.5 w-3.5 text-[#47C7BF] flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setPath('book-demo')} className="w-full py-3 rounded-xl bg-[#2E9CAE] text-white text-xs font-bold hover:bg-[#47C7BF] transition-all shadow-[0_0_15px_rgba(46,156,174,0.3)]">
                        Get Started
                      </button>
                    </div>

                    {/* Enterprise */}
                    <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-lg mb-2">Enterprise</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">Custom</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Fully custom workflows integrated with legacy Tally/SAP ERP data architectures.</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['Everything in Professional', 'Custom Legacy Database Sync', 'Dedicated Database Mirroring', 'IP Whitelist Restrictions', 'HIPAA/SOC2 Security Blueprints', 'Dedicated Success Manager', '24x7 Private Telephone Support'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => scrollToId('pricing-custom-form')} className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/[0.08] transition-all">
                        Talk to Experts
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 3: BusinessOS Communication */}
              {activeTab === 'communication' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold">BusinessOS™ Communication Platform</h3>
                    <p className="text-xs text-gray-400 mt-1">Multi-channel messaging suite, WhatsApp APIs, outbound cloud dialers, and real-time support widgets.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Starter */}
                    <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-lg mb-2">Starter</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">₹7,999</span>
                          <span className="text-xs text-gray-500 font-medium">/month</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">A great communication toolkit for local retail brands starting messaging campaigns.</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['WhatsApp Official API Node', 'Unified Inbound Inbox', 'Live Customer Web Chat', 'Daily Outbound SMS triggers', 'Standard Email Support'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setPath('book-demo')} className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/[0.08] transition-all">
                        Get Started
                      </button>
                    </div>

                    {/* Growth - Popular */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1C164D] to-[#0A042A] border-2 border-[#47C7BF]/60 hover:border-[#47C7BF] transition-all flex flex-col justify-between relative shadow-[0_15px_35px_rgba(71,199,191,0.15)]">
                      <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#2E9CAE] via-[#47C7BF] to-[#99D57C] text-black text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        Highly Popular
                      </div>
                      <div>
                        <h4 className="font-extrabold text-lg mb-2 mt-2">Growth</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">₹14,999</span>
                          <span className="text-xs text-gray-500 font-medium">/month</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Designed for dynamic teams needing broadcast automations and interactive telephony dialers.</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['WhatsApp Broadcasters Node', 'Advanced Cloud Telephony Link', 'Multi-channel Unified Chatbot', 'Outbound SMS Bulk Campaigns', 'Interactive Voice (IVR) Routing', 'Two-way CRM Contacts Sync', '24h Priority Ticketing Support'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                              <Check className="h-3.5 w-3.5 text-[#47C7BF] flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setPath('book-demo')} className="w-full py-3 rounded-xl bg-[#2E9CAE] text-white text-xs font-bold hover:bg-[#47C7BF] transition-all shadow-[0_0_15px_rgba(46,156,174,0.3)]">
                        Get Started
                      </button>
                    </div>

                    {/* Enterprise */}
                    <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-lg mb-2">Enterprise</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">Custom</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Premium communications engine with infinite custom endpoints and regional compliance hosting.</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['Everything in Growth', 'Private Telephony Trunk lines', 'Custom Voice Recording Archiving', 'Dedicated IVR Nodes Builders', 'RCS Messaging API integration', 'Dedicated success support team', 'SLA guaranteed uptime (99.98%)'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => scrollToId('pricing-custom-form')} className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/[0.08] transition-all">
                        Talk To Experts
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 4: AgenticOS */}
              {activeTab === 'agentic' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold">AgenticOS™ (Gemini AI Cognitive Workforces)</h3>
                    <p className="text-xs text-gray-400 mt-1">Deploy autonomous AI agents that run logical checks, grade leads, draft contextual quotes, and sync tools 24x7.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Single Agent */}
                    <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-lg mb-2">Single Agent</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">₹49,999</span>
                          <span className="text-xs text-gray-500 font-medium">/one-time build</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Deploy one cognitive AI agent (e.g. Lead Qualification Agent or Booking Scheduler Agent).</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['1 Cognitive Gemini Node', 'Standard Tool-Calling Setup', 'Basic PDF/Document Extraction', '24/7 autonomous monitoring', 'Full Integration with HubSpot or GrowthOS', '3 Months Sandbox Warranty'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setPath('book-demo')} className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/[0.08] transition-all">
                        Build Agent
                      </button>
                    </div>

                    {/* Multi-Agent - Popular */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1C164D] to-[#0A042A] border-2 border-[#47C7BF]/60 hover:border-[#47C7BF] transition-all flex flex-col justify-between relative shadow-[0_15px_35px_rgba(71,199,191,0.15)]">
                      <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#2E9CAE] via-[#47C7BF] to-[#99D57C] text-black text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        Deep Reasoning
                      </div>
                      <div>
                        <h4 className="font-extrabold text-lg mb-2 mt-2">Multi-Agent System</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">₹1,49,999</span>
                          <span className="text-xs text-gray-500 font-medium">/one-time build</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Multiple cooperative agents working together with an editor agent evaluating quality results.</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['3 Cooperative Gemini Agent Nodes', 'Joint Multi-Agent Reasoning Loops', 'Advanced consensus auditing variables', 'Dynamic CRM/API parameters editing', 'Real-time invoice drafting loops', '6 Months sandbox support SLA'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                              <Check className="h-3.5 w-3.5 text-[#47C7BF] flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setPath('book-demo')} className="w-full py-3 rounded-xl bg-[#2E9CAE] text-white text-xs font-bold hover:bg-[#47C7BF] transition-all shadow-[0_0_15px_rgba(46,156,174,0.3)]">
                        Get Started
                      </button>
                    </div>

                    {/* Enterprise AI Workforce */}
                    <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-lg mb-2">Enterprise Workforce</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">Custom</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Fully custom agent workforces deployed to private cloud networks with custom fine-tuned model weights.</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['Infinite cooperative agent workflows', 'Custom vector RAG database setups', 'Fine-tuned private model architectures', 'On-premises database bridges', 'IP-whitelisted REST API sandboxes', '1 Year comprehensive support guarantee', '24x7 immediate hotline support'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => scrollToId('pricing-custom-form')} className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/[0.08] transition-all">
                        Talk To Experts
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 5: Custom n8n Automations */}
              {activeTab === 'n8n' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold">Custom AI Agents & n8n Automation Packages</h3>
                    <p className="text-xs text-gray-400 mt-1">High-reliability serverless n8n nodes connecting websites, CRM pipelines, accounting tools, and text APIs.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Starter Workflow */}
                    <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-lg mb-2">Starter Workflow</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">₹25,000</span>
                          <span className="text-xs text-gray-500 font-medium">/one-time fee</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Simple automated workflow (e.g. Lead Form → GHL CRM → Instant email verification relay).</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['Up to 3 Active API Node mappings', 'Data parameter transformations', 'Basic error-retry handlings', 'Standard email alert dispatchers', '1 Month sandbox guarantee'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setPath('book-demo')} className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/[0.08] transition-all">
                        Request Workflow
                      </button>
                    </div>

                    {/* Business Automation - Popular */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1C164D] to-[#0A042A] border-2 border-[#47C7BF]/60 hover:border-[#47C7BF] transition-all flex flex-col justify-between relative shadow-[0_15px_35px_rgba(71,199,191,0.15)]">
                      <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#2E9CAE] via-[#47C7BF] to-[#99D57C] text-black text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        High Yield Automation
                      </div>
                      <div>
                        <h4 className="font-extrabold text-lg mb-2 mt-2">Business Automation</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">₹75,000</span>
                          <span className="text-xs text-gray-500 font-medium">/one-time fee</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Complex cross-platform automation pipelines mapping communications, analytics, and accounting databases.</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['Up to 8 active API integrations', 'Multi-condition branching loops', 'Automatic contact duplicates mergers', 'Instant WhatsApp + Twilio notification relays', 'Real-time Slack operations triggers', '3 Months intensive support guarantee'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                              <Check className="h-3.5 w-3.5 text-[#47C7BF] flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setPath('book-demo')} className="w-full py-3 rounded-xl bg-[#2E9CAE] text-white text-xs font-bold hover:bg-[#47C7BF] transition-all shadow-[0_0_15px_rgba(46,156,174,0.3)]">
                        Get Started
                      </button>
                    </div>

                    {/* Enterprise Automation */}
                    <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-lg mb-2">Enterprise Automation</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-extrabold text-white">Custom</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Fully custom cloud network mappings with exponential self-healing failures protocols for absolute uptime.</p>
                        <div className="border-t border-white/[0.04] pt-4 space-y-3 mb-8">
                          {['Infinite automated connections', 'High-speed cluster scaling variables', 'Self-healing exponential backoffs', 'Custom code node scripts executions', 'Dedicated server hosting models', 'Lifetime standard sandbox audits'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => scrollToId('pricing-custom-form')} className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/[0.08] transition-all">
                        Talk To Experts
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>

        {/* COMMUNICATION ADD-ONS */}
        <div id="communication_services" className="mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-[#47C7BF] mb-2 uppercase">
              Modular Integration Upgrades
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">Communication Add-ons</h3>
            <p className="text-xs text-gray-400 mt-1">Deploy these high-end voice and text modules instantly to support your current operations stack.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'WhatsApp Automation', price: '₹4,999/month + Meta charges', desc: 'Manage automated chats, custom bots, templates, and triggers.', icon: MessageSquare },
              { name: 'AI Calling', price: 'Custom Pricing', desc: 'Deploy Voice AI agents that dial, qualify leads, and update records.', icon: Phone },
              { name: 'Cloud Telephony', price: 'Usage Based Billing', desc: 'Connect redundant IVR routes, virtual numbers, and call queues.', icon: Globe },
              { name: 'RCS Messaging', price: 'Enterprise Tiers Only', desc: 'Rich carousels, action buttons, and direct checkouts in text.', icon: Zap }
            ].map((card, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-white/10 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded bg-[#2E9CAE]/10 text-[#47C7BF]">
                      <card.icon className="h-4 w-4" />
                    </div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{card.name}</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4">{card.desc}</p>
                </div>
                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-gray-500">BILLING VALUE</span>
                  <span className="text-[11px] font-extrabold text-[#99D57C] text-right">{card.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHITE LABEL PLANS */}
        <div id="white_label" className="mb-20">
          <div className="p-6 md:p-8 rounded-3xl bg-[#140D40] border border-[#2E9CAE]/30 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gradient-to-tr from-purple-600/10 to-transparent blur-2xl rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[9px] font-mono text-[#99D57C] mb-3 uppercase tracking-wider">
                  Partner Programs
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">White Label Partnership Plans</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Earn high recurring margins by deploying CRM systems, WhatsApp broadcasters, and AI calling platforms branded completely under your domain name and agency assets.
                </p>
                <button 
                  onClick={() => scrollToId('pricing-custom-form')}
                  className="text-xs font-bold text-white hover:text-[#47C7BF] flex items-center gap-1 transition-colors"
                >
                  Join Partner Network <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="lg:col-span-8 grid grid-cols-2 gap-4">
                {[
                  { name: 'Agency Partner', desc: 'Deploy CRM consoles under your brand to handle up to 20 client accounts.' },
                  { name: 'Consulting Partner', desc: 'Incorporate AI automation pipelines into your corporate client recommendations.' },
                  { name: 'Reseller Partner', desc: 'Directly resell WhatsApp Broadcasters and Cloud Telephony licenses.' },
                  { name: 'Enterprise Partner', desc: 'Deploy fully isolated SaaS platforms on private clouds with complete ownership.' }
                ].map((partner, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all">
                    <h4 className="text-xs font-bold text-white mb-1">{partner.name}</h4>
                    <p className="text-[10px] text-gray-400 leading-relaxed">{partner.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* COMPARISON FEATURE MATRIX TABLE */}
        <div id="comparison_table" className="mb-20 overflow-x-auto">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">Compare Plans</h3>
            <p className="text-xs text-gray-400 mt-1">Examine our detailed platform matrices to discover the ultimate scalability potential.</p>
          </div>

          <table className="w-full text-left border-collapse min-w-[700px] bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-[35%]">Feature Matrix</th>
                <th className="p-4 text-xs font-extrabold text-[#47C7BF] uppercase tracking-wider text-center w-[16.25%]">Starter</th>
                <th className="p-4 text-xs font-extrabold text-emerald-400 uppercase tracking-wider text-center w-[16.25%]">Growth</th>
                <th className="p-4 text-xs font-extrabold text-purple-400 uppercase tracking-wider text-center w-[16.25%]">Scale</th>
                <th className="p-4 text-xs font-extrabold text-blue-400 uppercase tracking-wider text-center w-[16.25%]">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05] text-xs">
              
              {/* Row 1 */}
              <tr>
                <td className="p-4 font-bold text-white">AI Assistant Tokens / Mo</td>
                <td className="p-4 text-center text-gray-400">10,000</td>
                <td className="p-4 text-center text-gray-200">50,000</td>
                <td className="p-4 text-center text-white">250,000</td>
                <td className="p-4 text-center text-emerald-400 font-bold">Custom Quota</td>
              </tr>

              {/* Row 2 */}
              <tr>
                <td className="p-4 font-bold text-white">WhatsApp Broadcaster access</td>
                <td className="p-4 text-center text-gray-500">—</td>
                <td className="p-4 text-center text-[#47C7BF] font-semibold">Yes</td>
                <td className="p-4 text-center text-[#47C7BF] font-semibold">Yes</td>
                <td className="p-4 text-center text-[#47C7BF] font-semibold">Yes</td>
              </tr>

              {/* Row 3 */}
              <tr>
                <td className="p-4 font-bold text-white">Cloud Telephony IVR pipelines</td>
                <td className="p-4 text-center text-gray-500">—</td>
                <td className="p-4 text-center text-gray-500">—</td>
                <td className="p-4 text-center text-[#47C7BF] font-semibold">Yes</td>
                <td className="p-4 text-center text-[#47C7BF] font-semibold">Yes</td>
              </tr>

              {/* Row 4 */}
              <tr>
                <td className="p-4 font-bold text-white">Autonomous AgenticOS workers</td>
                <td className="p-4 text-center text-gray-500">—</td>
                <td className="p-4 text-center text-gray-500">—</td>
                <td className="p-4 text-center text-gray-300">Optional Add-on</td>
                <td className="p-4 text-center text-[#47C7BF] font-semibold">Unlimited Built-in</td>
              </tr>

              {/* Row 5 */}
              <tr>
                <td className="p-4 font-bold text-white">Custom n8n nodes hosting</td>
                <td className="p-4 text-center text-gray-500">—</td>
                <td className="p-4 text-center text-gray-300">Basic</td>
                <td className="p-4 text-center text-white font-semibold">Comprehensive</td>
                <td className="p-4 text-center text-emerald-400 font-bold">Private Dedicated Node</td>
              </tr>

              {/* Row 6 */}
              <tr>
                <td className="p-4 font-bold text-white">Security Compliance Blueprint</td>
                <td className="p-4 text-center text-gray-400">Standard TLS 1.3</td>
                <td className="p-4 text-center text-gray-400">Standard TLS 1.3</td>
                <td className="p-4 text-center text-white font-medium">SOC2 Compliant Sandbox</td>
                <td className="p-4 text-center text-[#99D57C] font-extrabold">HIPAA + Isolated IP Private</td>
              </tr>

              {/* Row 7 */}
              <tr>
                <td className="p-4 font-bold text-white">Support SLA Response Guarantee</td>
                <td className="p-4 text-center text-gray-500">48 Hours</td>
                <td className="p-4 text-center text-gray-400">24 Hours</td>
                <td className="p-4 text-center text-gray-200">12 Hours (Slack)</td>
                <td className="p-4 text-center text-emerald-400 font-bold">Instant 24x7 Hotline</td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* INTERACTIVE ROI AND CASH SAVINGS CALCULATOR */}
        <div id="roi" className="mb-20 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#1C164D] to-[#0A042A] border border-[#2E9CAE]/30 relative">
          <div className="absolute top-0 left-0 w-[150px] h-[150px] bg-[#47C7BF]/10 blur-2xl rounded-full" />
          
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded bg-blue-500/10 text-blue-400">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#47C7BF]">Return on Investment Diagnostics</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Expected ROI Interactive Calculator</h3>
          <p className="text-xs text-gray-400 mb-8 max-w-2xl leading-relaxed">
            Drag the sliders to input your actual monthly lead parameters. Our real-time simulation automatically renders the projected savings and revenue gains when deploying GrowthOS™ pipelines and WhatsApp bots.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders on Left */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
                  <span>Monthly Marketing Ad Spend:</span>
                  <span className="text-[#47C7BF] font-mono">₹{adSpend.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="1000000"
                  step="10000"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full accent-[#2E9CAE] bg-white/[0.08] h-1.5 rounded-full outline-none"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>₹20k</span>
                  <span>₹10L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
                  <span>Estimated Inbound Leads / Mo:</span>
                  <span className="text-emerald-400 font-mono">{currentLeads} Leads</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={currentLeads}
                  onChange={(e) => setCurrentLeads(Number(e.target.value))}
                  className="w-full accent-[#47C7BF] bg-white/[0.08] h-1.5 rounded-full outline-none"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>20</span>
                  <span>2,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
                  <span>Current Close Rate (%):</span>
                  <span className="text-purple-400 font-mono">{closeRate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full accent-purple-400 bg-white/[0.08] h-1.5 rounded-full outline-none"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>1%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>

            {/* Results Display on Right with Interactive SVG Charts */}
            <div className="lg:col-span-7 bg-white/[0.01] border border-white/[0.05] p-6 rounded-2xl">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[9px] text-gray-500 font-mono block uppercase">3X Lead Growth</span>
                  <span className="text-lg font-bold text-[#47C7BF] mt-1 block">+{projectedLeads - currentLeads} Leads</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[9px] text-gray-500 font-mono block uppercase">Conversion Boost</span>
                  <span className="text-lg font-bold text-emerald-400 mt-1 block">+{projectedCloseRate - closeRate}%</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[9px] text-gray-500 font-mono block uppercase">Monthly Time Saved</span>
                  <span className="text-lg font-bold text-purple-400 mt-1 block">~{monthlyTimeSaved} hrs</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[9px] text-gray-500 font-mono block uppercase">Admin Op Savings</span>
                  <span className="text-lg font-bold text-[#99D57C] mt-1 block">₹{moneySavedByAutomation.toLocaleString()}</span>
                </div>
              </div>

              {/* Dynamic Interactive SVG charts (Revenue Projections vs. Savings Analysis) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/[0.05]">
                
                {/* SVG Chart 1: Revenue Projection */}
                <div>
                  <h4 className="text-xs font-bold text-gray-300 mb-3 flex items-center justify-between">
                    <span>Revenue Projections:</span>
                    <span className="text-emerald-400">+{Math.round((netRevenueGain / currentRevenue) * 100 || 0)}% Gain</span>
                  </h4>
                  <div className="h-[120px] bg-white/[0.01] rounded-lg p-2 flex flex-col justify-end">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      {/* Grid lines */}
                      <line x1="0" y1="20" x2="200" y2="20" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
                      <line x1="0" y1="50" x2="200" y2="50" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
                      <line x1="0" y1="80" x2="200" y2="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
                      
                      {/* Bar 1: Current */}
                      <rect x="35" y={100 - Math.min(85, (currentRevenue / (projectedRevenue || 1)) * 85)} width="35" height={Math.min(85, (currentRevenue / (projectedRevenue || 1)) * 85)} fill="rgba(255,255,255,0.1)" rx="3" />
                      <text x="52.5" y="95" fill="gray" fontSize="8" textAnchor="middle">Current</text>
                      
                      {/* Bar 2: Projected */}
                      <rect x="115" y="15" width="35" height="85" fill="url(#blueEmeraldGradient)" rx="3" />
                      <text x="132.5" y="95" fill="black" fontSize="8" fontWeight="bold" textAnchor="middle">Projected</text>

                      <defs>
                        <linearGradient id="blueEmeraldGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#47C7BF" />
                          <stop offset="100%" stopColor="#99D57C" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
                    <span>Before: ₹{Math.round(currentRevenue).toLocaleString()}</span>
                    <span className="text-white font-bold">After: ₹{Math.round(projectedRevenue).toLocaleString()}</span>
                  </div>
                </div>

                {/* SVG Chart 2: OpEx Savings */}
                <div>
                  <h4 className="text-xs font-bold text-gray-300 mb-3 flex items-center justify-between">
                    <span>OpEx Savings Analysis:</span>
                    <span className="text-purple-400">Saves ~{Math.round(monthlyTimeSaved * 1.5)}h/mo</span>
                  </h4>
                  <div className="h-[120px] bg-white/[0.01] rounded-lg p-2 flex flex-col justify-end">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <line x1="0" y1="20" x2="200" y2="20" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
                      <line x1="0" y1="50" x2="200" y2="50" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
                      <line x1="0" y1="80" x2="200" y2="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
                      
                      {/* Line chart of hours saved based on lead count */}
                      <path d={`M 20 85 Q 100 ${85 - (currentLeads / 2000) * 55} 180 ${85 - (currentLeads / 2000) * 75}`} fill="none" stroke="#2E9CAE" strokeWidth="2" />
                      <circle cx="180" cy={85 - (currentLeads / 2000) * 75} r="4" fill="#47C7BF" />
                      
                      {/* Filled area */}
                      <path d={`M 20 100 L 20 85 Q 100 ${85 - (currentLeads / 2000) * 55} 180 ${85 - (currentLeads / 2000) * 75} L 180 100 Z`} fill="rgba(46,156,174,0.15)" />
                    </svg>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
                    <span>Base manual followups</span>
                    <span className="text-white font-bold">₹{moneySavedByAutomation.toLocaleString()} Cash Restored</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ENTERPRISE SOLUTIONS SECTION */}
        <div id="enterprise" className="mb-20">
          <div className="p-6 md:p-8 rounded-3xl bg-white/[0.01] border border-white/[0.05] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-600/10 to-transparent blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[9px] font-mono text-purple-400 mb-3 uppercase tracking-wider">
                  Isolated Dedicated Networks
                </div>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Enterprise Solutions</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  For global corporations, financial institutions, and high-frequency healthcare networks, we deploy custom isolated cloud database nodes whitelisted behind your private virtual network arrays.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Dedicated Isolated Architecture',
                    'On-premises / Private Cloud Deployments',
                    'Fine-tuned Private Gemini weights',
                    '24x7 Custom Success Managers',
                    'SLA-Backed 99.98% Network Uptime'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#140D40]/50 border border-white/[0.05] text-left">
                <span className="text-[10px] font-mono text-[#47C7BF] block mb-1">ENTERPRISE PARTNERSHIP PORTALS</span>
                <h4 className="text-lg font-bold text-white mb-2">Need private SLA networks or customized billing?</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Contact our corporate engineering team directly to construct safe sandbox environments and explore private cloud orchestration structures.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => scrollToId('pricing-custom-form')}
                    className="flex-1 text-center py-3 rounded-xl bg-[#2E9CAE] hover:bg-[#47C7BF] text-xs font-bold text-white transition-all transform hover:scale-[1.02]"
                  >
                    Request Callback
                  </button>
                  <a 
                    href="mailto:partners@natton.digital"
                    className="flex-1 text-center py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold text-white hover:bg-white/[0.08] transition-all"
                  >
                    Email Enterprise Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS (20 Rich items requested) */}
        <div id="faq" className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[9px] font-mono text-[#47C7BF] mb-2 uppercase">
              Frequently Asked Questions
            </div>
            <h3 className="text-3xl font-extrabold text-white">Pricing & Platform FAQ</h3>
            <p className="text-xs text-gray-400 mt-1">Obtain answers to exactly 20 detailed pricing, security, and onboarding questions.</p>
          </div>

          <div className="space-y-3">
            {pricingFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="rounded-xl border transition-all duration-300 overflow-hidden bg-white/[0.01]"
                style={{
                  borderColor: expandedFaqs.includes(idx) ? 'rgba(46,156,174,0.3)' : 'rgba(255,255,255,0.04)'
                }}
              >
                <button
                  onClick={() => handleToggleFaq(idx)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 font-semibold text-xs md:text-sm text-white hover:bg-white/[0.02] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-gray-500 font-mono">Q{idx + 1}.</span>
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className="h-4 w-4 text-gray-400 transition-transform duration-300 flex-shrink-0" 
                    style={{ transform: expandedFaqs.includes(idx) ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {expandedFaqs.includes(idx) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-4 md:p-5 pt-0 border-t border-white/[0.03] text-xs text-gray-400 leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* CUSTOM PLAN PRICING FORM & GHL WEBHOOKS SIMULATION */}
        <div id="pricing-custom-form" className="mb-20 max-w-3xl mx-auto">
          <div className="p-6 md:p-8 rounded-3xl bg-white/[0.01] border border-white/[0.05] relative">
            <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] bg-purple-600/10 blur-3xl rounded-full" />
            
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">Need A Custom Plan?</h3>
              <p className="text-xs text-gray-400 mt-1">Construct your custom SaaS + AgenticOS integration bundle. Authenticates securely via n8n & GoHighLevel pipeline nodes.</p>
            </div>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 bg-emerald-500/5 rounded-2xl border border-emerald-500/20"
              >
                <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white">Custom Plan Webhook Dispatched!</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto px-4">
                  Thank you, <strong>{formData.fullName}</strong>. Your custom plan specifications have been synced with GHL and n8n automations. Check your inbox (<strong>{formData.email}</strong>) and phone for sandbox variables.
                </p>
                
                {/* Visual debug output log for the developer */}
                <div className="mt-6 mx-6 p-4 rounded-lg bg-black/80 font-mono text-[10px] text-left text-gray-400 border border-white/[0.05] max-h-[160px] overflow-y-auto">
                  <div className="text-[#47C7BF] font-bold border-b border-white/[0.05] pb-1 mb-1.5 flex items-center justify-between">
                    <span>⚡ Live n8n Execution Sandbox log</span>
                    <span className="text-[8px] bg-emerald-400/20 text-emerald-400 px-1 rounded">COMPLETED</span>
                  </div>
                  {formLogs.map((log, idx) => (
                    <div key={idx} className="py-0.5">{log}</div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      fullName: '',
                      companyName: '',
                      industry: 'Ecommerce',
                      country: 'India',
                      email: '',
                      phone: '',
                      teamSize: '11-50',
                      monthlyRevenue: '₹5L - ₹20L',
                      interestedSolutions: [],
                      message: '',
                      acceptTerms: true
                    });
                  }}
                  className="mt-6 text-xs text-primary font-bold hover:underline"
                >
                  Submit Another Specifications
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-sans">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:border-[#2E9CAE] focus:outline-none focus:bg-white/[0.04]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">Company Name</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:border-[#2E9CAE] focus:outline-none focus:bg-white/[0.04]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">Industry Sector</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/[0.06] rounded-xl py-2.5 px-4 text-xs text-white focus:border-[#2E9CAE] focus:outline-none"
                    >
                      <option value="Ecommerce">Ecommerce & Retail</option>
                      <option value="Healthcare">Healthcare & Biotech</option>
                      <option value="Education">Education & EdTech</option>
                      <option value="Real Estate">Real Estate & Construction</option>
                      <option value="Manufacturing">Manufacturing & Logistics</option>
                      <option value="Services">Professional Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">Country</label>
                    <input
                      type="text"
                      placeholder="e.g. India"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-500 focus:border-[#2E9CAE] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:border-[#2E9CAE] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">Telephone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:border-[#2E9CAE] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">Team Size</label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/[0.06] rounded-xl py-2.5 px-4 text-xs text-white focus:border-[#2E9CAE] focus:outline-none"
                    >
                      <option value="1-10">1 - 10 employees</option>
                      <option value="11-50">11 - 50 employees</option>
                      <option value="51-200">51 - 200 employees</option>
                      <option value="201+">201+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">Monthly Revenue</label>
                    <select
                      value={formData.monthlyRevenue}
                      onChange={(e) => setFormData(prev => ({ ...prev, monthlyRevenue: e.target.value }))}
                      className="w-full bg-[#110B33] border border-white/[0.06] rounded-xl py-2.5 px-4 text-xs text-white focus:border-[#2E9CAE] focus:outline-none"
                    >
                      <option value="<₹5L">&lt; ₹5 Lakhs</option>
                      <option value="₹5L - ₹20L">₹5 Lakhs - ₹20 Lakhs</option>
                      <option value="₹20L - ₹100L">₹20 Lakhs - ₹1 Crore</option>
                      <option value="1Cr+">₹1 Crore +</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">Interested Solutions (Select multiple)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {solutionOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleCheckboxChange(opt)}
                        className={`p-2.5 text-left rounded-lg text-[11px] border font-semibold transition-all duration-150 ${
                          formData.interestedSolutions.includes(opt)
                            ? 'bg-[#2E9CAE]/15 border-[#2E9CAE] text-white'
                            : 'bg-white/[0.01] border-white/[0.05] text-gray-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded flex items-center justify-center border ${
                            formData.interestedSolutions.includes(opt) ? 'bg-[#2E9CAE] border-[#2E9CAE]' : 'border-gray-600'
                          }`}>
                            {formData.interestedSolutions.includes(opt) && <Check className="h-2 w-2 text-white stroke-[4]" />}
                          </div>
                          <span>{opt}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">Message / Custom Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Describe specific systems you want to link or key goals..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-500 focus:border-[#2E9CAE] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                    className="rounded bg-white/[0.02] border-white/[0.06] accent-[#2E9CAE]"
                  />
                  <label htmlFor="acceptTerms" className="text-[10px] text-gray-500">
                    I authorize Natton Digital to route these parameters to our active n8n webhooks.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2E9CAE] to-[#47C7BF] text-white text-xs font-bold hover:shadow-[0_0_20px_rgba(71,199,191,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  {formLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin text-white" />
                      <span>Syncing parameters with n8n workflow...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 text-white" />
                      <span>Submit Specifications & Run Sandbox</span>
                    </>
                  )}
                </button>

                {formLoading && (
                  <div className="p-3 rounded-lg bg-black/60 font-mono text-[9px] text-gray-500 max-h-[100px] overflow-y-auto">
                    {formLogs.map((log, idx) => (
                      <div key={idx} className="py-0.5">{log}</div>
                    ))}
                  </div>
                )}

              </form>
            )}

          </div>
        </div>

        {/* FINAL HERO CTA SECTION */}
        <div id="final_cta" className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#1C164D] to-[#0A042A] border border-[#2E9CAE]/40 overflow-hidden text-center max-w-5xl mx-auto">
          {/* Animated pricing mesh background lines */}
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Start Your AI Transformation Journey
            </h3>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-lg mx-auto">
              Automate organic acquisition, scale high-efficiency WhatsApp channels, and deploy autonomous Gemini agents with 100% security guarantees.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setPath('book-demo')}
                className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-semibold px-8 py-3.5 rounded-xl bg-[#2E9CAE] hover:bg-[#47C7BF] text-white transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(46,156,174,0.3)]"
              >
                Book Strategy Call
              </button>
              <button
                onClick={() => setPath('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-semibold px-8 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] transition-all transform hover:scale-[1.02]"
              >
                Talk To Experts
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
