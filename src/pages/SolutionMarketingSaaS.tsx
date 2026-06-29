import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  Search, 
  ArrowRight, 
  FileText, 
  Share2, 
  MessageSquare, 
  Award, 
  Maximize2, 
  HelpCircle, 
  Check, 
  Send, 
  TrendingUp, 
  Shield, 
  Cpu, 
  BarChart2, 
  Zap, 
  Database,
  ThumbsUp,
  UserCheck,
  Play,
  RotateCcw,
  Sliders,
  Globe,
  Loader2
} from 'lucide-react';
import { RoutePath } from '../types';

interface SolutionMarketingSaaSProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
  formSubmitted: boolean;
  setFormSubmitted: (submitted: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function SolutionMarketingSaaS({ 
  setPath, 
  darkMode, 
  formSubmitted, 
  setFormSubmitted, 
  loading, 
  setLoading 
}: SolutionMarketingSaaSProps) {

  // Dynamic Title & Description + Schema Injector
  useEffect(() => {
    // 1. Meta Title & Description
    const originalTitle = document.title;
    document.title = "AI Marketing Platform | Content, SEO & Campaign Automation | Natton Digital";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Generate content, optimize SEO, create campaigns and improve reputation with Natton Digitals AI-powered Marketing SaaS platform.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = "Generate content, optimize SEO, create campaigns and improve reputation with Natton Digitals AI-powered Marketing SaaS platform.";
      document.head.appendChild(newMeta);
    }

    // 2. Schema Markup Injections
    const schemaScripts: HTMLScriptElement[] = [];

    const injectSchema = (id: string, json: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = JSON.stringify(json);
      document.head.appendChild(script);
      schemaScripts.push(script);
    };

    // Software Application Schema
    injectSchema('schema-software', {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Natton AI Marketing SaaS",
      "operatingSystem": "All",
      "applicationCategory": "BusinessApplication",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "124"
      },
      "offers": {
        "@type": "Offer",
        "price": "2999",
        "priceCurrency": "INR"
      }
    });

    // Organization Schema
    injectSchema('schema-org', {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Natton Digital",
      "url": "https://natton.digital",
      "logo": "https://natton.digital/logo.png",
      "sameAs": [
        "https://linkedin.com/company/natton-digital"
      ]
    });

    // FAQ Schema
    injectSchema('schema-faq', {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Natton AI Marketing SaaS platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is an all-in-one software solution that automates content generation, search engine & AI optimization (AEO), campaign launching, online reputation management, and high-intent lead scoring."
          }
        },
        {
          "@type": "Question",
          "name": "Does this platform integrate with GoHighLevel and n8n webhooks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our system provides native, secure, encrypted webhook outputs that map leads and triggers instantly to GHL CRM and n8n node networks."
          }
        }
      ]
    });

    // Breadcrumb Schema
    injectSchema('schema-breadcrumb', {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://natton.digital/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Solutions",
          "item": "https://natton.digital/solutions"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI Marketing SaaS",
          "item": "https://natton.digital/solutions/ai-marketing-saas"
        }
      ]
    });

    return () => {
      // Cleanup on unmount
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
      schemaScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  // Section states
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'campaign' | 'reputation' | 'lead'>('content');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  // Custom states for Live Demos
  const [contentCategory, setContentCategory] = useState<'blog' | 'social' | 'landing'>('blog');
  const [typedOutput, setTypedOutput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [seoScore, setSeoScore] = useState<number>(0);
  const [aeoScore, setAeoScore] = useState<number>(0);

  const [campTarget, setCampTarget] = useState<string>('Local Clinic Delhi');
  const [campGoal, setCampGoal] = useState<string>('Appt Booking');
  const [campOutput, setCampOutput] = useState<{ adTitle: string; adDesc: string; cta: string } | null>(null);
  const [isGeneratingCamp, setIsGeneratingCamp] = useState<boolean>(false);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const [repActiveReview, setRepActiveReview] = useState<number>(0);
  const [repDraft, setRepDraft] = useState<string>('');
  const [isDraftingRep, setIsDraftingRep] = useState<boolean>(false);

  // Demo Form States
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    industry: 'Healthcare',
    marketingTools: '',
    monthlyLeads: '50-200',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showConsole, setShowConsole] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // 3D Bento Grid Mouse Rotations
  const [bentoRotation, setBentoRotation] = useState<Record<number, string>>({});

  const handleBentoMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / 10;
    const rotateY = (x - xc) / 10;
    setBentoRotation(prev => ({
      ...prev,
      [index]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }));
  };

  const handleBentoMouseLeave = (index: number) => {
    setBentoRotation(prev => ({
      ...prev,
      [index]: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    }));
  };

  // Particle network Canvas for Hero & Final CTA
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const numParticles = 45;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = darkMode ? 'rgba(0, 194, 255, 0.04)' : 'rgba(11, 95, 255, 0.05)';
      ctx.lineWidth = 1;

      // Draw lines
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      ctx.fillStyle = darkMode ? 'rgba(0, 194, 255, 0.3)' : 'rgba(11, 95, 255, 0.2)';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  // Tab autoplay loop
  useEffect(() => {
    if (!isPlaying) return;
    const tabs: ('content' | 'seo' | 'campaign' | 'reputation' | 'lead')[] = ['content', 'seo', 'campaign', 'reputation', 'lead'];
    const timer = setInterval(() => {
      setActiveTab(prev => {
        const idx = tabs.indexOf(prev);
        return tabs[(idx + 1) % tabs.length];
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Live Content Studio Typing Simulation
  const handleTriggerTyping = (category: 'blog' | 'social' | 'landing') => {
    setContentCategory(category);
    setIsTyping(true);
    setTypedOutput('');

    const textMap = {
      blog: `<h1>Unlocking Local MSME Growth with Sovereign n8n Webhooks</h1>\n\n<p>In modern Indian markets, waiting 24 hours to contact an advertising lead is a recipe for high conversion abandonment. By wrapping n8n orchestration layers around your GHL CRM, you trigger zero-latency WhatsApp followups that lock down physical meetings in under 45 seconds.</p>\n\n<p><strong>Step 1: Set up the Meta Webhook intercept.</strong> Let GHL catch the raw form fields and push a clean payload straight to your sandboxed n8n server node...</p>`,
      social: `✨ REVOLUTIONIZE YOUR OPERATION:\nWhy does our AI Marketing SaaS win? Because we replace manual copywriting grids with Gemini programmatic models trained specifically for Indian MSMEs.\n\n✔️ 94% Operational Speedups\n✔️ Real-time WhatsApp Calendly Reminders\n✔️ Automated review collectors\n\n👉 Click "Book Demo" to experience future-proof workflows!`,
      landing: `<section class="hero-glow">\n  <h2>The Unified AI Command Terminal for Modern Growth</h2>\n  <p>Generate, Optimize, Launch, and Score. Natton Digital integrates SEO schemas, campaign creatives, and automated reviews in one SOC2 compliant ecosystem.</p>\n  <button class="btn-primary">Claim Free Integration Diagnostic Call</button>\n</section>`
    };

    const targetText = textMap[category];
    let index = 0;
    
    const interval = setInterval(() => {
      setTypedOutput(prev => prev + targetText.charAt(index));
      index++;
      if (index >= targetText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 12);

    return () => clearInterval(interval);
  };

  // Run typing automatically once on load
  useEffect(() => {
    handleTriggerTyping('blog');
  }, []);

  // SEO Scores Animator
  useEffect(() => {
    if (activeTab === 'seo') {
      setSeoScore(0);
      setAeoScore(0);
      let targetSeo = 98;
      let targetAeo = 99;
      let currentSeo = 0;
      let currentAeo = 0;

      const timer = setInterval(() => {
        if (currentSeo < targetSeo) {
          currentSeo += 2;
          setSeoScore(currentSeo);
        }
        if (currentAeo < targetAeo) {
          currentAeo += 2.5;
          setAeoScore(Math.min(99, Math.floor(currentAeo)));
        }
        if (currentSeo >= targetSeo && currentAeo >= targetAeo) {
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [activeTab]);

  // Campaign Generator Live Simulation
  const handleGenerateCampaign = () => {
    setIsGeneratingCamp(true);
    setCampOutput(null);

    setTimeout(() => {
      setCampOutput({
        adTitle: `Premium Custom ${campGoal} Services | ${campTarget}`,
        adDesc: `Transform your local metrics instantly. Our specialized Natton AI models drive high-performance conversions, routing pre-qualified prospective clients directly to your calendar via official webhooks.`,
        cta: campGoal === 'Appt Booking' ? 'Schedule Free Diagnostic Session' : 'Download Automation Case Studies'
      });
      setIsGeneratingCamp(false);
    }, 1500);
  };

  // Review Response Drafting Simulation
  const reviewsData = [
    { author: "Anil Sharma, Delhi Dental", rating: 5, date: "2 hours ago", text: "Deploying Natton's review collection bot saved our clinical front desk 20 hours a week and doubled our 5-star Google review count inside 14 days." },
    { author: "Sarah Jenkins, Vanguard Group", rating: 5, date: "Yesterday", text: "Unbelievable automation. The WhatsApp and n8n lead scoring handles our nighttime EdTech registration flows completely hands-free." },
    { author: "Mohammad Al-Mansoori, Silk UAE", rating: 5, date: "3 days ago", text: "The cart abandonment WhatsApp sequence recovered over AED 14,000 in lost checkouts during our first week of live launch." }
  ];

  const handleRepAutoDraft = (reviewIdx: number) => {
    setRepActiveReview(reviewIdx);
    setIsDraftingRep(true);
    setRepDraft('');

    const responseTemplates = [
      `Hi Anil, we are thrilled that the automated Google review collector is saving Delhi Dental 20 hours a week! Our team is dedicated to keeping your clinical pipelines optimized and HIPAA secure. Let's touch base on Tuesday for your monthly n8n audit!`,
      `Hi Sarah, nighttime student counseling automation is exactly why we built GrowthOS. We're proud to support Vanguard Academy's programmatic registrations around the clock!`,
      `Thank you Mohammad! Reclaiming checkout baskets via Meta Cloud APIs drives immediate ROI. We are excited to scale Silk Thread's automated promotion catalogs next!`
    ];

    const targetResp = responseTemplates[reviewIdx];
    let index = 0;

    const interval = setInterval(() => {
      setRepDraft(prev => prev + targetResp.charAt(index));
      index++;
      if (index >= targetResp.length) {
        clearInterval(interval);
        setIsDraftingRep(false);
      }
    }, 15);

    return () => clearInterval(interval);
  };

  // Auto run draft on tab select
  useEffect(() => {
    if (activeTab === 'reputation') {
      handleRepAutoDraft(0);
    }
  }, [activeTab]);

  // Demo Form Handler with GHL and n8n console log simulation
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple Validation
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
    if (!formData.companyName.trim()) errors.companyName = "Company Name is required";
    if (!formData.email.includes('@')) errors.email = "Please enter a valid business email";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setLoading(true);
    setShowConsole(true);
    setConsoleLogs([
      "⚡ [Natton-Edge] Initializing contact ingestion protocols...",
      "🛡️ [SOC2-Encrypter] Securing payload with AES-256 GCM encryption keys...",
      "🚀 [n8n Router] Constructing webhook payload...",
    ]);

    // Simulated webhook log progression
    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev,
        `📦 [n8n Webhook] POST https://n8n.natton.digital/v1/webhook/demo-request`,
        `Payload: ${JSON.stringify({
          contact: {
            name: formData.fullName,
            company: formData.companyName,
            email: formData.email,
            phone: formData.phone,
            industry: formData.industry,
            leads: formData.monthlyLeads
          },
          compliance: "SOC2 Secured",
          routing_id: "NAT-GHL-MARKETING-SAAS"
        }, null, 2)}`
      ]);
    }, 1000);

    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev,
        "📡 [GoHighLevel CRM] Webhook payload accepted with code 200 OK.",
        "✨ [GoHighLevel CRM] Programmatic Lead Score assigned: HOT (+95 intent score)",
        "✉️ [Mail Node] Dispatching auto-confirm email notifications to user...",
        "✅ [Natton-Edge] Completed. Sandbox credentials will arrive in 15 minutes!"
      ]);
      setLoading(false);
      setFormSubmitted(true);
    }, 2800);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      country: 'India',
      industry: 'Healthcare',
      marketingTools: '',
      monthlyLeads: '50-200',
      message: ''
    });
    setFormSubmitted(false);
    setShowConsole(false);
    setConsoleLogs([]);
  };

  // FAQ Array
  const faqs = [
    { q: "Is Natton AI Marketing SaaS compliant for patient and customer records?", a: "Absolutely. We build under strict healthcare (HIPAA) and payment (PCI-DSS) guidelines. All lead information, email addresses, and phone records are encrypted at rest via AES-256 and transmitted securely with SOC2 compliance safeguards." },
    { q: "How does the AI SEO and AEO Optimization work?", a: "Standard SEO optimizes strictly for search queries. Answer Engine Optimization (AEO) ensures your technical structured schemas, microdata, and site performance speeds are structured so ChatGPT, Gemini, and Perplexity search robots can easily read, parse, and reference your brand as the prime citation." },
    { q: "Can I map this directly to my existing GoHighLevel CRM and n8n workflows?", a: "Yes. Our SaaS includes pre-configured webhook layouts and direct API integrations. You can sync leads, calendar appointments, ad campaign clicks, and customer feedback logs directly into GHL and n8n pipelines in under 10 minutes." },
    { q: "What is the content generation model being used?", a: "We utilize advanced server-side copywriting adapters running the official Google GenAI SDK (including Gemini-1.5-Pro models), customized with conversion copywriting prompt libraries optimized for high-intent B2B and B2C sales funnels." },
    { q: "Do you offer localized Delhi or global campaign options?", a: "Yes, our campaign generation system allows you to localize ad formats, keywords, and currencies for any geo-fenced region in India (like New Delhi, Mumbai, Bengaluru) or target international consumer segments globally (USA, UK, UAE) with customized language grids." },
    { q: "How does the AI Lead Scoring engine determine 'HOT' leads?", a: "Our AI models analyze multiple user behavior variables: landing page mouse scrolls, form completion speed, Calendly booking details, and business-domain validation. Leads are instantly scored (0-100) and priority-routed to your sales dials." },
    { q: "What setup is required for AI Reputation Management?", a: "All you need is to link your Google Business Profile and other directory links with your Natton SaaS panel. Our AI tracks incoming reviews, runs sentiment audits, and auto-drafts optimized human-like review responses that you can auto-send or approve manually." },
    { q: "Can I cancel my monthly subscription anytime?", a: "Yes. Our pricing is completely flexible with zero locked-in terms. You can cancel, upgrade, or downgrade your Starter, Growth, or Pro SaaS tier straight from your software billing dashboard." },
    { q: "Is there an onboarding setup fee?", a: "We offer completely self-managed onboarding plans with no hidden fees. If your enterprise requires bespoke, custom-tailored n8n pipeline setup and bespoke integrations, our technical architects can assist under a structured onboarding workshop." },
    { q: "Does the platform generate creatives as well as copy?", a: "Yes, our Campaign Generator delivers structured ad template layouts, suggested royalty-free asset keywords, and prompt formats for ad-makers, along with optimized generative text copies ready to import directly into Meta Ads Manager." }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 text-left relative overflow-hidden ${
      darkMode ? 'bg-[#060b13] text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      
      {/* Decorative Radial glow behind sections */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-[1200px] right-10 w-[600px] h-[600px] bg-[#00C2FF]/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[800px] left-10 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />

      {/* ==========================================
          SECTION 1: HERO SECTION
          ========================================== */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-white/[0.03]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb path for Solutions */}
          <div className="mb-6 text-xs font-mono text-gray-500 animate-fade-in flex items-center gap-1.5">
            <button onClick={() => setPath('home')} className="hover:text-primary transition-colors">Home</button> 
            <span>/</span> 
            <button className="text-[#00C2FF] font-semibold">Solutions</button> 
            <span>/</span> 
            <span className="text-gray-400">AI Marketing SaaS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-[10px] font-mono tracking-widest uppercase">
                <Sparkles className="h-3.5 w-3.5 text-[#00C2FF]" />
                Next-Gen Sovereign AI SaaS Suite
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight">
                AI Marketing Platform <br />
                <span className="bg-gradient-to-r from-primary via-[#00C2FF] to-accent bg-clip-text text-transparent">
                  Built For Growth
                </span>
              </h1>
              
              <p className={`text-xs sm:text-sm leading-relaxed max-w-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Generate content, optimize SEO, create campaigns and improve reputation with AI-powered tools designed for modern businesses. Completely integrated with GoHighLevel CRM and n8n webhook nodes.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#booking-demo"
                  className="px-6 py-3 rounded-xl bg-primary text-white text-xs font-semibold glow-primary hover:bg-opacity-95 transition-all flex items-center gap-2"
                >
                  Book Free Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button 
                  onClick={() => {
                    setIsPlaying(true);
                    const overviewSec = document.getElementById('platform-overview');
                    if (overviewSec) overviewSec.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-6 py-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                    darkMode ? 'border-white/10 text-white hover:bg-white/[0.03]' : 'border-gray-200 text-[#081120] hover:bg-gray-100'
                  }`}
                >
                  Watch Product Tour
                  <Play className="h-3.5 w-3.5 text-[#00C2FF]" />
                </button>
              </div>

              {/* Status indicators */}
              <div className="flex items-center gap-6 pt-4 text-[10px] font-mono text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Uptime guaranteed &gt;99.98%
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  SOC2 & HIPAA Compliant Logs
                </span>
              </div>
            </div>

            {/* Right Interactive Holographic Dashboard Preview */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px] pointer-events-none -z-10 animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#00C2FF]/20 rounded-full blur-[60px] pointer-events-none -z-10" />

              {/* holographic card wrapper */}
              <div className={`p-5 rounded-2xl border backdrop-blur-xl animate-float shadow-2xl transition-all duration-300 ${
                darkMode ? 'bg-dark/40 border-white/10 shadow-black/40' : 'bg-white/80 border-gray-100 shadow-gray-200'
              }`}>
                {/* Mac window header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/[0.04] pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 bg-white/[0.04] px-3 py-1 rounded-md">
                    natton-hologram-dashboard.sh
                  </span>
                  <Maximize2 className="h-3.5 w-3.5 text-gray-500" />
                </div>

                {/* Simulated dashboard items with rotating states */}
                <div className="space-y-4 text-xs font-sans text-left">
                  
                  {/* Content Generation row */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all hover:bg-primary/5 ${
                    darkMode ? 'bg-black/30 border-white/[0.05]' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-primary/25 text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold font-display">AI Content Studio</p>
                        <p className="text-[10px] text-gray-500">Generating Delhi Dentist Clinic ad copies...</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
                  </div>

                  {/* SEO Score indicators row */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all hover:bg-secondary/5 ${
                    darkMode ? 'bg-black/30 border-white/[0.05]' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-[#00C2FF]/20 text-[#00C2FF]">
                        <Search className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold font-display">AEO & Search Engine crawler</p>
                        <p className="text-[10px] text-gray-500">Analyzing schema tags for Google, ChatGPT & Gemini...</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#00C2FF] font-mono">98% Score</span>
                    </div>
                  </div>

                  {/* Ad Campaign stats row */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all hover:bg-accent/5 ${
                    darkMode ? 'bg-black/30 border-white/[0.05]' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-accent/20 text-accent">
                        <BarChart2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold font-display">Campaign Analytics</p>
                        <p className="text-[10px] text-gray-500">Facebook Meta Lead Form Sync active...</p>
                      </div>
                    </div>
                    <TrendingUp className="h-4 w-4 text-emerald-400 animate-pulse" />
                  </div>

                  {/* Reputation response block */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all hover:bg-emerald-500/5 ${
                    darkMode ? 'bg-black/30 border-white/[0.05]' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-emerald-500/20 text-emerald-400">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold font-display">Reputation Manager</p>
                        <p className="text-[10px] text-gray-500">Auto responding to 5-star Google review...</p>
                      </div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                </div>

                {/* holographic interface grid design accent */}
                <div className="mt-4 pt-3 border-t border-white/[0.04] grid grid-cols-3 gap-2 text-center text-[9px] font-mono text-gray-500">
                  <div>
                    <span className="block text-primary font-bold">1.2s</span>
                    <span>Response Latency</span>
                  </div>
                  <div>
                    <span className="block text-[#00C2FF] font-bold">+240%</span>
                    <span>Conversion Lift</span>
                  </div>
                  <div>
                    <span className="block text-accent font-bold">124</span>
                    <span>Pre-secured leads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: PLATFORM OVERVIEW (Bento Grid)
          ========================================== */}
      <section id="platform-overview" className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Platform Features Overview</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
              One Platform. Multiple AI Marketing Tools.
            </h2>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Say goodbye to fragmented SaaS apps and expensive subscription bloat. Experience world-class performance tools in one system.
            </p>
          </div>

          {/* Interactive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Card 1: AI Content Studio (Large 7 col) */}
            <div 
              onMouseMove={(e) => handleTriggerTyping('blog')}
              className={`md:col-span-7 p-6 sm:p-8 rounded-2xl border transition-all duration-300 transform cursor-pointer flex flex-col justify-between h-[320px] ${
                darkMode ? 'bg-dark/40 border-white/10 hover:border-primary/40' : 'bg-white border-gray-100 hover:border-primary/40 shadow-sm'
              }`}
            >
              <div className="space-y-3 text-left">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-display">AI Content Studio</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                  Generate high-intent articles, local SEO blogs, social updates, WhatsApp copy grids, and landing page scripts custom-tailored to convert.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">SEO Blogs</span>
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">Social Posts</span>
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">Email Campaigns</span>
              </div>
            </div>

            {/* Card 2: AI SEO Assistant (5 col) */}
            <div 
              className={`md:col-span-5 p-6 sm:p-8 rounded-2xl border transition-all duration-300 transform cursor-pointer flex flex-col justify-between h-[320px] ${
                darkMode ? 'bg-dark/40 border-white/10 hover:border-[#00C2FF]/40' : 'bg-white border-gray-100 hover:border-[#00C2FF]/40 shadow-sm'
              }`}
            >
              <div className="space-y-3 text-left">
                <div className="h-10 w-10 rounded-lg bg-[#00C2FF]/10 text-[#00C2FF] flex items-center justify-center">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-display">AI SEO & AEO Assistant</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                  Optimize structured meta tags, FAQs schemas, and rich keywords so modern search machines (Google, ChatGPT, Gemini, Perplexity) list you first.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary">Google AI Search</span>
                <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary">ChatGPT schemas</span>
                <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary">Perplexity citations</span>
              </div>
            </div>

            {/* Card 3: AI Campaign Generator (4 col) */}
            <div 
              className={`md:col-span-4 p-6 sm:p-8 rounded-2xl border transition-all duration-300 transform cursor-pointer flex flex-col justify-between h-[300px] ${
                darkMode ? 'bg-dark/40 border-white/10 hover:border-accent/40' : 'bg-white border-gray-100 hover:border-accent/40 shadow-sm'
              }`}
            >
              <div className="space-y-3 text-left">
                <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-display">AI Campaign Generator</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                  Structure full ad strategies for Meta Ads, Google Ads, and LinkedIn. Create custom ad copies and instant campaign scripts with smart targeting setups.
                </p>
              </div>
              <div className="flex items-center text-xs font-mono text-accent">
                Generate Campaign <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>

            {/* Card 4: Reputation Manager (4 col) */}
            <div 
              className={`md:col-span-4 p-6 sm:p-8 rounded-2xl border transition-all duration-300 transform cursor-pointer flex flex-col justify-between h-[300px] ${
                darkMode ? 'bg-dark/40 border-white/10 hover:border-emerald-400/40' : 'bg-white border-gray-100 hover:border-emerald-400/40 shadow-sm'
              }`}
            >
              <div className="space-y-3 text-left">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-display">AI Reputation Manager</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                  Monitor Google reviews instantly. Detect buyer sentiments and compile automated, tailored, human-like replies on autopilot.
                </p>
              </div>
              <div className="flex items-center text-xs font-mono text-emerald-400">
                Manage Reputation <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>

            {/* Card 5: AI Lead Scoring (4 col) */}
            <div 
              className={`md:col-span-4 p-6 sm:p-8 rounded-2xl border transition-all duration-300 transform cursor-pointer flex flex-col justify-between h-[300px] ${
                darkMode ? 'bg-dark/40 border-white/10 hover:border-primary/40' : 'bg-white border-gray-100 hover:border-primary/40 shadow-sm'
              }`}
            >
              <div className="space-y-3 text-left">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold font-display">AI Lead Scoring Engine</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                  Priority-route hot leads by intent. Evaluate form completion speed, Calendly information, and domain validation to focus on ready-to-buy clients.
                </p>
              </div>
              <div className="flex items-center text-xs font-mono text-primary">
                Score Live Leads <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: INTERACTIVE DASHBOARD PREVIEW
          ========================================== */}
      <section className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Interactive Experience</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
              Interactive Platform Dashboard
            </h2>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Inspect each operational console modules in our live simulated workspace. Toggle between sections or click play to cycle through autonomously.
            </p>
          </div>

          {/* Autoplay controllers */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4 select-none">
            <div className={`flex p-1 rounded-xl border ${darkMode ? 'bg-black/40 border-white/[0.04]' : 'bg-white border-gray-200'}`}>
              {[
                { id: 'content', label: 'Content Studio' },
                { id: 'seo', label: 'AI SEO Hub' },
                { id: 'campaign', label: 'Campaign Builder' },
                { id: 'reputation', label: 'Reviews Admin' },
                { id: 'lead', label: 'Lead Scoring' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id as any);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
                    activeTab === t.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-xs font-mono text-primary flex items-center gap-1 hover:underline"
            >
              <span>{isPlaying ? '⏸ Pause Autoplay' : '▶ Resume Autoplay'}</span>
            </button>
          </div>

          {/* Glass Browser Frame Wrapper */}
          <div className={`p-4 sm:p-6 rounded-2xl border backdrop-blur-xl shadow-2xl relative ${
            darkMode ? 'bg-dark/60 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.04] pb-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
              </div>
              <div className="text-[10px] font-mono text-gray-400 bg-white/[0.03] px-4 py-1 rounded-md max-w-xs truncate">
                https://app.natton.digital/solution-saas?tab={activeTab}
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Dynamic Module Content Viewport */}
            <div className="min-h-[340px] flex flex-col justify-between transition-opacity duration-500 text-left">
              
              {/* CONTENT MODULE */}
              {activeTab === 'content' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest block">Module 01: Content Generation</span>
                    <h3 className="text-xl font-bold font-display">Sovereign Copywriting Studio</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                      Generate rich blogs, Meta captions, landing pages and email newsletters. Trained on top-converting landing page layouts and SEO programmatic grids.
                    </p>
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => handleTriggerTyping('blog')} 
                        className={`px-3 py-1.5 rounded text-xs font-semibold border ${contentCategory === 'blog' ? 'bg-primary/15 border-primary text-primary' : 'border-white/10 text-gray-400'}`}
                      >
                        Local Blog
                      </button>
                      <button 
                        onClick={() => handleTriggerTyping('social')} 
                        className={`px-3 py-1.5 rounded text-xs font-semibold border ${contentCategory === 'social' ? 'bg-primary/15 border-primary text-primary' : 'border-white/10 text-gray-400'}`}
                      >
                        Social Post
                      </button>
                      <button 
                        onClick={() => handleTriggerTyping('landing')} 
                        className={`px-3 py-1.5 rounded text-xs font-semibold border ${contentCategory === 'landing' ? 'bg-primary/15 border-primary text-primary' : 'border-white/10 text-gray-400'}`}
                      >
                        HTML Section
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className={`p-4 rounded-xl border font-mono text-[10px] h-[240px] overflow-y-auto whitespace-pre-wrap leading-relaxed ${
                      darkMode ? 'bg-black/50 text-gray-300 border-white/[0.06]' : 'bg-gray-950 text-gray-300'
                    }`}>
                      {isTyping && <div className="text-primary animate-pulse mb-2">// Server-side Gemini Streaming active...</div>}
                      <div dangerouslySetInnerHTML={{ __html: typedOutput || 'Select format category to run typing simulation...' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* SEO MODULE */}
              {activeTab === 'seo' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[9px] font-mono text-[#00C2FF] font-bold uppercase tracking-widest block">Module 02: SEO & AEO Analysis</span>
                    <h3 className="text-xl font-bold font-display">Search & Answer Engine Scoring</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                      Analyzes website schema tags, microdata arrays, keyword densities, and site loading speeds. Optimizes for traditional Search Robots (Google) and LLM engines (ChatGPT, Gemini, Perplexity).
                    </p>
                    <div className="space-y-2 text-xs">
                      <p className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>Structured Schema scripts injected successfully</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>FAQ schema, Software specs generated</span>
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-7 flex justify-around items-center gap-6">
                    {/* Circle 1 */}
                    <div className="text-center space-y-2">
                      <div className="relative h-28 w-28 flex items-center justify-center">
                        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke={darkMode ? 'rgba(255,255,255,0.04)' : '#e2e8f0'} strokeWidth="8" fill="none" />
                          <circle cx="50" cy="50" r="40" stroke="#0B5FFF" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * seoScore) / 100} className="transition-all duration-300" />
                        </svg>
                        <span className="text-lg font-bold font-mono">{seoScore}%</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Google SEO Uptime</span>
                    </div>

                    {/* Circle 2 */}
                    <div className="text-center space-y-2">
                      <div className="relative h-28 w-28 flex items-center justify-center">
                        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke={darkMode ? 'rgba(255,255,255,0.04)' : '#e2e8f0'} strokeWidth="8" fill="none" />
                          <circle cx="50" cy="50" r="40" stroke="#00C2FF" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * aeoScore) / 100} className="transition-all duration-300" />
                        </svg>
                        <span className="text-lg font-bold font-mono">{aeoScore}%</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">ChatGPT & Gemini citation</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CAMPAIGN MODULE */}
              {activeTab === 'campaign' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[9px] font-mono text-accent font-bold uppercase tracking-widest block">Module 03: Campaigns Engine</span>
                    <h3 className="text-xl font-bold font-display">Meta & Google Campaign Builder</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                      Structure full advertising sequences. Input target industries, geo-parameters and marketing goals, and watch Natton AI compile target metrics instantly.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[9px] uppercase text-gray-500 font-mono block">Target Segment</label>
                        <select 
                          value={campTarget} 
                          onChange={(e) => setCampTarget(e.target.value)}
                          className={`w-full p-2 rounded border text-[11px] focus:outline-none ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                        >
                          <option value="Local Clinic Delhi">Dental Clinic Delhi</option>
                          <option value="Real Estate USA">Prestige Real Estate</option>
                          <option value="EdTech Mumbai">Syllabus EdTech</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] uppercase text-gray-500 font-mono block">Goal</label>
                        <select 
                          value={campGoal} 
                          onChange={(e) => setCampGoal(e.target.value)}
                          className={`w-full p-2 rounded border text-[11px] focus:outline-none ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                        >
                          <option value="Appt Booking">Appt Booking</option>
                          <option value="Brochure Leads">Brochure Leads</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={handleGenerateCampaign}
                      disabled={isGeneratingCamp}
                      className="px-4 py-2 bg-accent text-white text-xs font-semibold rounded hover:bg-opacity-95 transition-all flex items-center gap-1.5"
                    >
                      {isGeneratingCamp ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Zap className="h-3.5 w-3.5" />}
                      {isGeneratingCamp ? 'Generating Campaign...' : 'Generate Campaign Blueprint'}
                    </button>
                  </div>
                  <div className="lg:col-span-7">
                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-black/30 border-white/[0.05]' : 'bg-gray-50 border-gray-200'}`}>
                      {campOutput ? (
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between border-b border-white/[0.05] pb-1.5 text-[9px] font-mono text-gray-400">
                            <span>CAMPAIGN OUTPUT READY</span>
                            <span className="text-accent font-bold">🎯 Meta Advantage+</span>
                          </div>
                          <p className="font-bold text-primary">{campOutput.adTitle}</p>
                          <p className={`text-[11px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>{campOutput.adDesc}</p>
                          <button onClick={() => setPath('contact')} className="mt-2 px-3 py-1 bg-primary text-white text-[10px] font-semibold rounded">
                            {campOutput.cta}
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-xs font-mono py-12 text-center">Configure parameters and click generate to run campaign simulation...</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* REPUTATION MODULE */}
              {activeTab === 'reputation' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">Module 04: Sentiment Response</span>
                    <h3 className="text-xl font-bold font-display">AI Reputation & Reviews</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                      Scrapes directory listings. Compiles automated responses that acknowledge reviews inside your Google My Business pages.
                    </p>
                    <div className="space-y-2 text-xs">
                      {reviewsData.map((review, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleRepAutoDraft(i)}
                          className={`p-2 rounded border cursor-pointer text-[11px] transition-all ${
                            repActiveReview === i 
                              ? 'border-emerald-500 bg-emerald-500/10' 
                              : (darkMode ? 'border-white/[0.05] hover:bg-white/[0.02]' : 'border-gray-200 hover:bg-gray-50')
                          }`}
                        >
                          <div className="flex justify-between">
                            <strong>{review.author}</strong>
                            <span className="text-yellow-400">★★★★★</span>
                          </div>
                          <p className="text-gray-400 truncate text-[10px]">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-black/40 border-white/[0.05]' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex justify-between text-[9px] font-mono text-gray-500 mb-2 border-b border-white/[0.04] pb-1.5">
                        <span>AI AUTO DRAFT RESPONDER</span>
                        <span>STATUS: DRAFTING</span>
                      </div>
                      <p className={`text-[11px] font-mono leading-relaxed h-[120px] overflow-y-auto whitespace-pre-wrap ${
                        darkMode ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        {repDraft || "Generating automated reply response..."}
                      </p>
                      <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.04] mt-2">
                        <button onClick={() => setPath('contact')} className="px-3 py-1 bg-emerald-500 text-white font-semibold text-[10px] rounded hover:bg-emerald-600">
                          Approve and Post to Google Listing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LEAD SCORING MODULE */}
              {activeTab === 'lead' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest block">Module 05: Pipeline Routing</span>
                    <h3 className="text-xl font-bold font-display">AI Lead Intent Scoring</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                      Prioritize leads by scoring tracking variables in real-time. Sends ready-to-close phone logs straight to CRM dispatch nodes.
                    </p>
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between p-1 bg-rose-500/10 rounded">
                        <span className="text-rose-500 text-[10px] font-bold">COLD: Web abandoned</span>
                        <span>Score: 12</span>
                      </div>
                      <div className="flex justify-between p-1 bg-amber-500/10 rounded">
                        <span className="text-amber-500 text-[10px] font-bold">WARM: Downloaded Catalog</span>
                        <span>Score: 54</span>
                      </div>
                      <div className="flex justify-between p-1 bg-emerald-500/10 rounded">
                        <span className="text-emerald-500 text-[10px] font-bold">HOT: Filled Booking Form</span>
                        <span>Score: 97</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-7 space-y-3">
                    <div className={`p-4 rounded-xl border flex items-center justify-between ${
                      darkMode ? 'bg-black/30 border-white/[0.05]' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div>
                        <strong className="text-xs">Dr. Rakesh Sen (New Delhi Clinic)</strong>
                        <p className="text-[10px] text-gray-500">Filled diagnostic form & scored 97 intent points</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full animate-pulse">🔥 HOT INTENT</span>
                    </div>

                    <div className={`p-4 rounded-xl border flex items-center justify-between ${
                      darkMode ? 'bg-black/30 border-white/[0.05]' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div>
                        <strong className="text-xs">Metaspace LLC (USA Realtors)</strong>
                        <p className="text-[10px] text-gray-500">Downloaded brochure but timezone lag 8 hours</p>
                      </div>
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">⚡ WARM INTENT</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: AI CONTENT STUDIO SECTION (Detail)
          ========================================== */}
      <section className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono uppercase tracking-wider">
                <FileText className="h-3.5 w-3.5" />
                Copywriting Studio
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
                Generates high-performance copywriting autonomously
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Our content generation workspace acts as a server-side copywriting hub. It is trained on top converting structures to deliver optimized content that captures focus immediately.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#00C2FF] uppercase font-mono">Blog Generation</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Local Delhi SEO keyword density matched perfectly.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#00C2FF] uppercase font-mono">Social Posts</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Meta captions, Instagram caption structures, and hashtags.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#00C2FF] uppercase font-mono">Ad Copy creation</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Advantage+ copies for Google Performance Max & Meta ads.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#00C2FF] uppercase font-mono">Email Campaign write</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Smart sequences tailored based on purchase history.</p>
                </div>
              </div>
            </div>

            {/* Right Live Typing Visual */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between h-[360px] relative overflow-hidden ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'
            }`}>
              <div className="flex items-center justify-between mb-4 border-b border-white/[0.04] pb-2 text-[10px] font-mono text-gray-500">
                <span>TERMINAL_STREAMING_COPYWRITER</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              
              {/* simulated scroll typing box */}
              <div className={`p-4 rounded-lg font-mono text-[10px] leading-relaxed h-[240px] overflow-y-auto whitespace-pre-wrap flex-grow ${
                darkMode ? 'bg-black/40 text-gray-300' : 'bg-gray-950 text-gray-300'
              }`}>
                {isTyping ? (
                  <span className="text-primary animate-pulse">Streaming Gemini Response...</span>
                ) : (
                  <span>Click "Re-run Generation Model" to watch AI copywriting typing logic in real-time.</span>
                )}
                <div className="mt-2 text-xs font-sans text-gray-300 border-t border-white/[0.05] pt-2" dangerouslySetInnerHTML={{ __html: typedOutput }} />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/[0.04] mt-4">
                <span className="text-[10px] font-mono text-gray-400">Tokens parsed: 124/sec</span>
                <button 
                  onClick={() => handleTriggerTyping('blog')}
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-opacity-95 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Re-run Generation Model
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5: AI SEO & AEO ASSISTANT
          ========================================== */}
      <section className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left circular scoring indicator UI */}
            <div className="order-2 lg:order-1 flex justify-center items-center gap-6">
              <div className={`p-6 rounded-2xl border text-center space-y-4 max-w-xs ${
                darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'
              }`}>
                <span className="text-[10px] font-mono text-gray-500 block uppercase">SEO Schema Audit Score</span>
                <div className="relative h-32 w-32 mx-auto flex items-center justify-center">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke={darkMode ? 'rgba(255,255,255,0.04)' : '#e2e8f0'} strokeWidth="8" fill="none" />
                    <circle cx="50" cy="50" r="40" stroke="#00C2FF" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="5" />
                  </svg>
                  <span className="text-xl font-bold font-mono text-[#00C2FF]">98/100</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Schema structured meta-tags parsed successfully without warnings.</p>
              </div>

              <div className={`p-6 rounded-2xl border text-center space-y-4 max-w-xs ${
                darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'
              }`}>
                <span className="text-[10px] font-mono text-gray-500 block uppercase">AEO LLM Citations Rate</span>
                <div className="relative h-32 w-32 mx-auto flex items-center justify-center">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke={darkMode ? 'rgba(255,255,255,0.04)' : '#e2e8f0'} strokeWidth="8" fill="none" />
                    <circle cx="50" cy="50" r="40" stroke="#7B61FF" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="2" />
                  </svg>
                  <span className="text-xl font-bold font-mono text-accent">99%</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">ChatGPT and Gemini indexing spiders mapped brand listings in New Delhi.</p>
              </div>
            </div>

            {/* Right details */}
            <div className="order-1 lg:order-2 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20 text-[10px] font-mono uppercase tracking-wider">
                <Search className="h-3.5 w-3.5" />
                AI SEO & AEO Engine
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
                Get indexed by search engines & AI bots alike
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Traditional SEO isn't enough anymore. Answer Engine Optimization (AEO) formats your website's schema tags so conversational models (ChatGPT, Gemini, Perplexity) easily discover and cite your business in answers.
              </p>
              
              <ul className="space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>AI microdata schemas:</strong> Automatic code structured payloads for indexing spiders.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>ChatGPT readiness:</strong> Format your technical specifications so LLMs refer your brand.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Gemini optimization:</strong> Structures Delhi/US local keyword density organically.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6: CAMPAIGN GENERATOR
          ========================================== */}
      <section className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-[10px] font-mono uppercase tracking-wider">
                <Zap className="h-3.5 w-3.5" />
                Campaigns Orchestrator
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
                Create Winning Campaigns Faster
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Skip the manual setup overhead. Enter target audience segments and goals, and watch our campaign builder generate Meta Ads, Google Ads, and LinkedIn creatives optimized for conversion speed.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-primary/10 text-primary rounded">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">Meta Advantage+ Ads Integration</h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Preloaded tracking scripts mapping webhook responses directly to GHL CRM.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-primary/10 text-primary rounded">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">Google Performance Max Setup</h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>High intent local search terms targeted automatically without budget friction.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Screen Recording Simulation */}
            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
              <div className="flex items-center justify-between mb-4 border-b border-white/[0.04] pb-2 text-[10px] font-mono text-gray-500">
                <span>CAMPAIGN_PREVIEW_RECORDER.MP4</span>
                <span className="text-rose-500 animate-pulse flex items-center gap-1">● REC</span>
              </div>

              {/* interactive controls panel */}
              <div className="space-y-4 text-xs text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-gray-400 font-mono">Geo Target Area</label>
                    <input 
                      type="text" 
                      value={campTarget}
                      onChange={(e) => setCampTarget(e.target.value)}
                      className={`w-full p-2 rounded border focus:outline-none ${darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-gray-400 font-mono">Conversion Goal</label>
                    <input 
                      type="text" 
                      value={campGoal}
                      onChange={(e) => setCampGoal(e.target.value)}
                      className={`w-full p-2 rounded border focus:outline-none ${darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`} 
                    />
                  </div>
                </div>

                <button 
                  onClick={handleGenerateCampaign}
                  disabled={isGeneratingCamp}
                  className="w-full py-2 bg-accent text-white font-semibold rounded hover:bg-opacity-95 transition-all flex justify-center items-center gap-2"
                >
                  {isGeneratingCamp ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                  {isGeneratingCamp ? 'Generating creative layouts...' : 'Simulate Campaign Compile'}
                </button>

                {/* campaign output block */}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-black/40 border-white/[0.05]' : 'bg-gray-50 border-gray-200'}`}>
                  {campOutput ? (
                    <div className="space-y-2">
                      <p className="font-bold text-primary text-[11px]">{campOutput.adTitle}</p>
                      <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>{campOutput.adDesc}</p>
                      <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04] text-[9px] font-mono text-gray-500">
                        <span>Ad Objective: Conversions</span>
                        <span>• Setup: GHL webhook linked</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-6 text-[10px] font-mono">Adjust targeting criteria above and click compile...</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7: AI REPUTATION MANAGEMENT
          ========================================== */}
      <section className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left reviews lists */}
            <div className="space-y-4 order-2 lg:order-1">
              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/[0.04]">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#00C2FF]">Google Reviews Streams</h4>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Real-time sync</span>
                </div>

                <div className="space-y-3">
                  {reviewsData.map((review, i) => (
                    <div 
                      key={i}
                      onClick={() => handleRepAutoDraft(i)}
                      className={`p-3 rounded-lg border cursor-pointer text-left transition-all ${
                        repActiveReview === i 
                          ? 'border-emerald-500 bg-emerald-500/5 shadow' 
                          : (darkMode ? 'border-white/[0.04] hover:bg-white/[0.02]' : 'border-gray-200 hover:bg-gray-50')
                      }`}
                    >
                      <div className="flex justify-between text-[11px]">
                        <strong>{review.author}</strong>
                        <span className="text-amber-400">★★★★★</span>
                      </div>
                      <p className={`text-[10px] mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Details & Draft Autoresponder */}
            <div className="space-y-6 text-left order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase tracking-wider">
                <MessageSquare className="h-3.5 w-3.5" />
                Reputation Autopilot
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
                AI Reputation & Review collector
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Collect and respond to client reviews automatically. When a won deal is flagged inside GoHighLevel, Natton's automation fires a WhatsApp feedback trigger, scoring incoming Google reviews with auto-responses.
              </p>

              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-black/30 border-white/[0.05]' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex justify-between text-[9px] font-mono text-gray-500 mb-2 border-b border-white/[0.04] pb-1.5">
                  <span>AI DRAFT RESPONDER (DRAFT_STREAM)</span>
                  {isDraftingRep ? <span className="text-primary animate-pulse">DRAFTING...</span> : <span className="text-emerald-400">READY</span>}
                </div>
                <p className={`text-[11px] font-mono leading-relaxed h-[100px] overflow-y-auto ${
                  darkMode ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  {repDraft || "Generating reply response..."}
                </p>
                <div className="flex justify-end pt-2 border-t border-white/[0.04] mt-2">
                  <button onClick={() => setPath('contact')} className="px-3 py-1 bg-emerald-500 text-white font-semibold text-[10px] rounded">
                    Approve & Post Auto-Response
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 8: AI LEAD SCORING
          ========================================== */}
      <section className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left copy details */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-[10px] font-mono uppercase tracking-wider">
                <Cpu className="h-3.5 w-3.5 animate-spin" />
                Intent Parser
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
                Evaluate high-intent leads automatically
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Stop dialing cold phone records. Our lead scoring modules evaluate visitor behavioral tracking, form completion times, and company domain metadata to route hot prospects to GHL dialers.
              </p>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Behavioral Analysis:</strong> Evaluates page dwell times and scrolling.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Intent Scoring (0-100):</strong> Highlights pre-qualified hot buyers instantly.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>GHL Pipeline Sync:</strong> Move hot leads to won pipelines in under 10 seconds.</span>
                </div>
              </div>
            </div>

            {/* Right Funnel visualizer */}
            <div className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
              <span className="text-[10px] font-mono text-gray-500 uppercase block mb-6">Automated Intent Funnel</span>
              
              <div className="space-y-4 max-w-sm mx-auto">
                {/* Cold */}
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 bottom-0 bg-rose-500/5 w-[15%]" />
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-rose-500">1. COLD SEGMENT (Visitor)</strong>
                      <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>Anonymous web views. Low dwell scores.</p>
                    </div>
                    <span className="font-mono font-bold text-rose-500 text-[10px] bg-rose-500/15 px-2 py-0.5 rounded">Score: &lt;20</span>
                  </div>
                </div>

                {/* Warm */}
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 bottom-0 bg-amber-500/5 w-[50%]" />
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-amber-500">2. WARM SEGMENT (Interactivity)</strong>
                      <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>Downloaded PDF brochures. Viewed Case Studies.</p>
                    </div>
                    <span className="font-mono font-bold text-amber-500 text-[10px] bg-amber-500/15 px-2 py-0.5 rounded">Score: 40-70</span>
                  </div>
                </div>

                {/* Hot */}
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl relative overflow-hidden text-left shadow-lg shadow-emerald-500/5">
                  <div className="absolute top-0 right-0 bottom-0 bg-emerald-500/10 w-[95%] animate-pulse" />
                  <div className="flex justify-between items-center text-xs relative z-10">
                    <div>
                      <strong className="text-emerald-400">3. HOT CONVERSIONS (Booking)</strong>
                      <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>Filled demo form and validated email addresses.</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded animate-bounce">Score: &gt;90</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 9: WORKFLOW VISUALIZATION
          ========================================== */}
      <section className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Operational Pipeline</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
              How AI Marketing Works
            </h2>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Seamless integration from content to revenue. See the step-by-step automated flow of our SaaS architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative">
            <div className="hidden md:block absolute top-[40%] left-[5%] right-[5%] h-0.5 border-t border-dashed border-primary/20 z-0" />
            
            {[
              { num: "01", name: "Content Creation", desc: "Trained copy models compile high-converting blog posts and social Captions." },
              { num: "02", name: "SEO Optimization", desc: "Formats schemas and metadata tags for Google, ChatGPT & Gemini indexing." },
              { num: "03", name: "Campaign Launch", desc: "Meta Advantage+ and Google Performance Max ads target prospective buyers." },
              { num: "04", name: "Lead Capture", desc: "GHL webhooks catch details instantly, routing leads to scoring." },
              { num: "05", name: "Analytics Audit", desc: "Runs sentiment audits on customer reviews, drafting auto responses." },
              { num: "06", name: "Revenue Growth", desc: "Autonomous reminders maximize appointments, driving consistent close rates." }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-xl border text-center relative z-10 transition-all hover:scale-105 ${
                  idx === 5 
                    ? 'border-emerald-500 bg-emerald-500/5 shadow-lg shadow-emerald-500/10' 
                    : (darkMode ? 'bg-dark/80 border-white/10' : 'bg-white border-gray-200 shadow-sm')
                }`}
              >
                <span className="text-[10px] font-mono text-primary font-bold block mb-2">NODE {step.num}</span>
                <h4 className="text-xs font-bold font-display leading-tight mb-2">{step.name}</h4>
                <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 10: PRICING SECTION
          ========================================== */}
      <section className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Predictable Platform Tiers</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
              Simple, Transparent Platform Pricing
            </h2>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Choose the package that matches your operational speed. Cancel or adjust tiers anytime from your panel.
            </p>

            {/* Toggle Billing period */}
            <div className="flex justify-center pt-2 select-none">
              <div className={`p-1 rounded-lg flex border ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
                <button 
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${billingCycle === 'monthly' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  Monthly billing
                </button>
                <button 
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${billingCycle === 'yearly' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  Yearly Billing (20% Off)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Starter */}
            <div className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all hover:border-primary/40 ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase block mb-2">Ideal for local MSMEs</span>
                <h3 className="text-lg font-bold font-display">Starter Node</h3>
                <div className="my-6">
                  <span className="text-3xl font-extrabold font-display">
                    {billingCycle === 'monthly' ? '₹2,999' : '₹2,399'}
                  </span>
                  <span className="text-xs text-gray-500"> / month</span>
                </div>
                
                <ul className="space-y-3 text-xs border-t border-white/[0.04] pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>AI Content creation studio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>Basic AEO & SEO tagging support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>Meta & Google Campaign Generator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>GoHighLevel Webhook integrations</span>
                  </li>
                </ul>
              </div>
              <a href="#booking-demo" className="mt-8 w-full py-2.5 rounded-lg border border-primary text-primary font-semibold text-center text-xs block hover:bg-primary/5">
                Subscribe to Starter
              </a>
            </div>

            {/* Growth - Featured */}
            <div className={`p-6 sm:p-8 rounded-2xl border relative flex flex-col justify-between transition-all border-primary bg-primary/5 glow-primary shadow-2xl`}>
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                MOST POPULAR
              </span>
              <div>
                <span className="text-[9px] font-mono text-primary uppercase block mb-2">Ideal for high-volume SMBs</span>
                <h3 className="text-lg font-bold font-display">Growth Node</h3>
                <div className="my-6">
                  <span className="text-3xl font-extrabold font-display">
                    {billingCycle === 'monthly' ? '₹7,999' : '₹6,399'}
                  </span>
                  <span className="text-xs text-primary font-semibold"> / month</span>
                </div>
                
                <ul className="space-y-3 text-xs border-t border-white/[0.06] pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <strong>Advanced Copywriting Studio (Unlimited)</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>Full ChatGPT & Gemini AEO optimizing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>Meta Advantage+ Campaign templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>AI Lead Scoring Engine with GHL mapping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>24/7 technical live chat support</span>
                  </li>
                </ul>
              </div>
              <a href="#booking-demo" className="mt-8 w-full py-2.5 rounded-lg bg-primary text-white font-semibold text-center text-xs block hover:bg-opacity-95 shadow-md">
                Subscribe to Growth
              </a>
            </div>

            {/* Pro */}
            <div className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all hover:border-accent/40 ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase block mb-2">Bespoke Enterprise setups</span>
                <h3 className="text-lg font-bold font-display">Pro Node</h3>
                <div className="my-6">
                  <span className="text-3xl font-extrabold font-display">
                    {billingCycle === 'monthly' ? '₹19,999' : '₹15,999'}
                  </span>
                  <span className="text-xs text-gray-500"> / month</span>
                </div>
                
                <ul className="space-y-3 text-xs border-t border-white/[0.04] pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>Everything in Growth Node</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <strong>Google Review Reputation Autopilot responder</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>Advanced analytics and custom dashboards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>Dedicated technical architect support</span>
                  </li>
                </ul>
              </div>
              <a href="#booking-demo" className="mt-8 w-full py-2.5 rounded-lg border border-accent text-accent font-semibold text-center text-xs block hover:bg-accent/5">
                Subscribe to Pro
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 11: INTEGRATIONS SECTION
          ========================================== */}
      <section className="py-16 border-b border-white/[0.03] overflow-hidden relative z-10 select-none bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block mb-8">NATIVE ECOSYSTEM INTEGRATIONS</span>
          
          {/* Logo Carousel Sliding marquee */}
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap items-center w-max">
              {[
                "GoHighLevel CRM", "HubSpot Suite", "Google Workspace", "Meta Ads", "WordPress", "Shopify Store", "WooCommerce", "WhatsApp Cloud API",
                "GoHighLevel CRM", "HubSpot Suite", "Google Workspace", "Meta Ads", "WordPress", "Shopify Store", "WooCommerce", "WhatsApp Cloud API"
              ].map((logo, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-500 bg-white/[0.02] px-4 py-2 border border-white/[0.05] rounded-xl">
                  <Database className="h-4 w-4 text-primary" />
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 12: FAQS SECTION
          ========================================== */}
      <section className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Have Questions?</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Explore details regarding compliance audits, webhook setups, content adapters, and licensing.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                    isExpanded 
                      ? 'border-primary/40 bg-primary/[0.02]' 
                      : (darkMode ? 'border-white/[0.05] bg-white/[0.01]' : 'border-gray-200 bg-white shadow-xs')
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isExpanded ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs font-bold font-display"
                  >
                    <span>{faq.q}</span>
                    <HelpCircle className={`h-4.5 w-4.5 text-primary flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isExpanded && (
                    <div className="p-4 border-t border-white/[0.04] text-xs leading-relaxed text-gray-400">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 13: DEMO BOOKING FORM
          ========================================== */}
      <section id="booking-demo" className="py-20 lg:py-28 border-b border-white/[0.03] relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Start Your Integration Diagnostics</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
              Book Your Free Demo
            </h2>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Map GHL and n8n pipelines directly to your existing systems. Secure a 1-on-1 session with our technicians.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left form details */}
            <div className="lg:col-span-7">
              <div className={`p-6 sm:p-8 rounded-2xl border ${
                darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'
              }`}>
                {formSubmitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl">✓</div>
                    <h3 className="text-base font-bold font-display">Demo Request Successfully Dispatched</h3>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Thank you! Your information has been securely pushed to our CRM node system via active webhooks. Check your WhatsApp for confirmation logs!
                    </p>
                    <button 
                      onClick={handleResetForm}
                      className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-opacity-95 transition-all"
                    >
                      Book Another Demo
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-4 text-xs text-left">
                    
                    {/* name & company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleFormChange}
                          placeholder="Anil Sharma"
                          className={`w-full p-2.5 rounded-lg border focus:outline-none ${
                            formErrors.fullName ? 'border-rose-500' : 'border-white/10'
                          } ${darkMode ? 'bg-white/[0.02] text-white' : 'bg-gray-50 text-gray-900'}`}
                        />
                        {formErrors.fullName && <p className="text-[10px] text-rose-500 mt-1">{formErrors.fullName}</p>}
                      </div>
                      
                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Company Name *</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleFormChange}
                          placeholder="Apex Clinic New Delhi"
                          className={`w-full p-2.5 rounded-lg border focus:outline-none ${
                            formErrors.companyName ? 'border-rose-500' : 'border-white/10'
                          } ${darkMode ? 'bg-white/[0.02] text-white' : 'bg-gray-50 text-gray-900'}`}
                        />
                        {formErrors.companyName && <p className="text-[10px] text-rose-500 mt-1">{formErrors.companyName}</p>}
                      </div>
                    </div>

                    {/* email & phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Business Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="anil@apexclinic.in"
                          className={`w-full p-2.5 rounded-lg border focus:outline-none ${
                            formErrors.email ? 'border-rose-500' : 'border-white/10'
                          } ${darkMode ? 'bg-white/[0.02] text-white' : 'bg-gray-50 text-gray-900'}`}
                        />
                        {formErrors.email && <p className="text-[10px] text-rose-500 mt-1">{formErrors.email}</p>}
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">WhatsApp Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="+91 98765 43210"
                          className={`w-full p-2.5 rounded-lg border focus:outline-none ${
                            formErrors.phone ? 'border-rose-500' : 'border-white/10'
                          } ${darkMode ? 'bg-white/[0.02] text-white' : 'bg-gray-50 text-gray-900'}`}
                        />
                        {formErrors.phone && <p className="text-[10px] text-rose-500 mt-1">{formErrors.phone}</p>}
                      </div>
                    </div>

                    {/* country & industry */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Country</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleFormChange}
                          className={`w-full p-2.5 rounded-lg border focus:outline-none ${darkMode ? 'bg-dark border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                        >
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Industry</label>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleFormChange}
                          className={`w-full p-2.5 rounded-lg border focus:outline-none ${darkMode ? 'bg-dark border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                        >
                          <option value="Healthcare">Healthcare</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Education">Education & EdTech</option>
                          <option value="Retail & E-commerce">Retail & E-commerce</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Professional Services">Professional Services</option>
                        </select>
                      </div>
                    </div>

                    {/* tools & leads */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Current Marketing Tools</label>
                        <input
                          type="text"
                          name="marketingTools"
                          value={formData.marketingTools}
                          onChange={handleFormChange}
                          placeholder="WordPress, GHL, spreadsheets..."
                          className={`w-full p-2.5 rounded-lg border focus:outline-none ${darkMode ? 'bg-white/[0.02] text-white' : 'bg-gray-50 text-gray-900'}`}
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Average Monthly Leads</label>
                        <select
                          name="monthlyLeads"
                          value={formData.monthlyLeads}
                          onChange={handleFormChange}
                          className={`w-full p-2.5 rounded-lg border focus:outline-none ${darkMode ? 'bg-dark border-white/10 text-white' : 'bg-white border-gray-200'}`}
                        >
                          <option value="<50">&lt; 50 leads</option>
                          <option value="50-200">50 - 200 leads</option>
                          <option value="200-1000">200 - 1,000 leads</option>
                          <option value=">1000">Over 1,000 leads</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Message / Requirements</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Tell us about your conversion gaps..."
                        rows={3}
                        className={`w-full p-2.5 rounded-lg border focus:outline-none ${darkMode ? 'bg-white/[0.02] text-white' : 'bg-gray-50 text-gray-900'}`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-primary text-white text-xs font-semibold rounded-lg glow-primary hover:bg-opacity-95 transition-all flex justify-center items-center gap-1.5"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4.5 w-4.5" />}
                      {loading ? 'Dispatching Webhooks...' : 'Request Custom SaaS Integration Demo'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Webhook real logs debugger */}
            <div className="lg:col-span-5 h-[480px] flex flex-col">
              <div className={`p-4 rounded-2xl border flex-grow flex flex-col font-mono text-[10px] leading-relaxed select-none ${
                darkMode ? 'bg-black/60 border-white/10 text-emerald-400' : 'bg-gray-950 text-emerald-400'
              }`}>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/[0.04] text-gray-500">
                  <span>n8n_WEBHOOK_LOGGER</span>
                  <span>DEBUGGER</span>
                </div>

                <div className="flex-grow overflow-y-auto space-y-2 text-left">
                  {showConsole ? (
                    consoleLogs.map((log, i) => (
                      <p key={i} className={
                        log.includes('OK') || log.includes('assigned') || log.includes('Completed')
                          ? 'text-emerald-400 font-bold' 
                          : log.startsWith('Payload:') 
                            ? 'text-blue-300' 
                            : 'text-gray-400'
                      }>
                        {log}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-600 italic py-12 text-center">Fill out and submit the form to monitor GHL + n8n real-time webhook payload streams here...</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 14: FINAL CTA
          ========================================== */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-[#09101f] text-white text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b13] to-transparent" />
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Ready to dominate?</span>
          
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight leading-tight">
            Ready To Transform Your Marketing <br />With AI?
          </h2>
          
          <p className="text-xs sm:text-sm max-w-xl mx-auto text-gray-400 leading-relaxed">
            Configure GHL crm webhook arrays and deploy sovereign n8n agentic pipelines to drive high-intensity Delhi and global conversions hands-free.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href="#booking-demo"
              className="px-6 py-3 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-opacity-95 shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              Book Free Demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <button 
              onClick={() => setPath('contact')}
              className="px-6 py-3 rounded-xl border border-white/15 text-white text-xs font-semibold hover:bg-white/[0.04] transition-all"
            >
              Start Free Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
