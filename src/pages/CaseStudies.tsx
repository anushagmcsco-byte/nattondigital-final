import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Briefcase, TrendingUp, Search, CheckCircle, ArrowRight, Play, Zap, Star, MessageSquare, Users, Globe, 
  ChevronRight, Check, HelpCircle, ChevronDown, ChevronUp, Send, Sliders, DollarSign, Plus, RefreshCw, Clock, Phone, 
  Shield, Lock, X, Activity, Database, Mail, FileText, CheckCheck, Settings, ArrowUpRight, BarChart3, PieChart, 
  Share2, History, Network, Calendar, Award, Heart, Gift, MessageCircle, FileCheck, Layers, BookOpen, Volume2, Pause
} from 'lucide-react';
import { RoutePath } from '../types';

export default function CaseStudies({ setPath, darkMode }: { setPath: (path: RoutePath) => void; darkMode: boolean }) {
  useEffect(() => {
    document.title = "Customer Success Stories & Case Studies | Natton Digital";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ==========================================
  // BACKGROUND DATA MESH ANIMATION
  // ==========================================
  const meshRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = meshRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 650;
    };
    window.addEventListener('resize', handleResize);

    const points: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    const maxPoints = 40;

    for (let i = 0; i < maxPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1
      });
    }

    let animationId: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Silver mesh background lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 80;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = 'rgba(139, 92, 246, 0.15)'; // Violet
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(59, 130, 246, 0.4)'; // Blue
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connect points that are close
      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.12;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ==========================================
  // COUNT-UP STATISTICS ANIMATION EFFECT
  // ==========================================
  const [messagesCount, setMessagesCount] = useState(7200000);
  const [leadsCount, setLeadsCount] = useState(84000);
  const [conversionRate, setConversionRate] = useState(32);
  const [followupSpeed, setFollowupSpeed] = useState(62);
  const [manualReduction, setManualReduction] = useState(45);
  const [roiFactor, setRoiFactor] = useState(2.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessagesCount(prev => Math.min(10842000, prev + Math.floor(Math.random() * 850) + 100));
      setLeadsCount(prev => Math.min(104800, prev + Math.floor(Math.random() * 8) + 1));
      setConversionRate(prev => Math.min(40, prev + (Math.random() > 0.85 ? 1 : 0)));
      setFollowupSpeed(prev => Math.min(70, prev + (Math.random() > 0.85 ? 1 : 0)));
      setManualReduction(prev => Math.min(50, prev + (Math.random() > 0.85 ? 1 : 0)));
      setRoiFactor(prev => Math.min(3.0, parseFloat((prev + (Math.random() > 0.9 ? 0.1 : 0)).toFixed(1))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // INTERACTIVE CASE STUDIES DATABASE
  // ==========================================
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDetailCaseId, setActiveDetailCaseId] = useState<string>('healthcare-ortho');

  const caseStudiesList = [
    {
      id: 'healthcare-ortho',
      industry: 'Healthcare',
      client_type: 'Orthopedic Clinic',
      name: 'Vanguard Joint & Spine Center',
      result: '220% Increase In Patient Enquiries',
      challenge: 'The clinic had peak scheduling hours where physical receptionists missed over 40% of patient phone inquiries. Leads from Facebook campaigns went cold because of 6-hour response delays.',
      strategy: 'Deploy a multi-agent patient triage workspace using Meta WhatsApp API linked to Google Calendar & local EHR registers.',
      implementation: 'Programmed autonomous WhatsApp intake templates. If patients did not select a calendar slot within 10 minutes, our outbound AgenticOS™ assistant triggered a voice appointment reminder.',
      techStack: ['BusinessOS™ WhatsApp API', 'AgenticOS™ Qualification', 'n8n Workflow Nodes', 'Google Calendar integration'],
      roi: '5.2x Patient Registration ROI',
      beforeMetrics: '42% unanswered messages',
      afterMetrics: '220% enquiry volume surge',
      timeline: '8 Days Setup',
      leadsChart: [45, 62, 78, 110, 154, 212]
    },
    {
      id: 'education-school',
      industry: 'Education',
      client_type: 'Admissions Academy',
      name: 'Summit International School Group',
      result: '3X Admissions Growth',
      challenge: 'Parent brochure requests triggered late at night across multiple time zones remained unanswered for up to 48 hours, causing massive drops in prospective high-value admissions.',
      strategy: 'Embed an intelligent syllabus search counselor chatbot in 4 languages, paired with autonomous text-nurture automation.',
      implementation: 'Structured an internal document vector base containing all curriculum fee charts and calendar availability, responding in under 30 seconds to initial requests.',
      techStack: ['AI Marketing Platform', 'GrowthOS™ Lead CRM', 'Meta Cloud APIs', 'Multilingual RAG Search'],
      roi: '3.4x Enrollment Rate Gain',
      beforeMetrics: '48h counseling wait times',
      afterMetrics: '3x verified registrations',
      timeline: '12 Days Setup',
      leadsChart: [20, 45, 90, 140, 220, 310]
    },
    {
      id: 'real-estate-builder',
      industry: 'Real Estate',
      client_type: 'Luxury Developer',
      name: 'Prestige Landmark Builders',
      result: '40% Higher Site Visits',
      challenge: 'Sales agents spent up to 5 hours daily cold calling unqualified portal inquiries, suffering from high rejection rates and low site scheduling efficiency.',
      strategy: 'Construct a pre-qualification voice-call automation linked directly to visual WhatsApp catalog deliveries.',
      implementation: 'Outbound AgenticOS™ Voice Agents dial new catalog registrations within 60 seconds, check loan pre-approvals, and schedule physical property site-tours dynamically.',
      techStack: ['BusinessOS™ Voice Engine', 'AgenticOS™ Appointment dialer', 'WhatsApp automated catalogs', 'HubSpot Webhook'],
      roi: '4x Realtor Productivity',
      beforeMetrics: '80% cold call rejects',
      afterMetrics: '40% higher direct site visits',
      timeline: '6 Days Setup',
      leadsChart: [55, 68, 85, 120, 168, 230]
    },
    {
      id: 'manufacturing-oem',
      industry: 'Manufacturing',
      client_type: 'Heavy Industrial OEM',
      name: 'IndoMetal Precision Systems',
      result: '65% Faster Lead Response',
      challenge: 'International distributors submitting low-stock automated RFQ quotation requests had to wait up to 4 days for manual price check estimation approvals.',
      strategy: 'Construct a secure database lookup API integration driven by intelligent custom n8n workflow servers.',
      implementation: 'n8n nodes evaluate incoming design catalogs, check raw inventory prices in real-time, generate a dynamic price quotation, and draft contract drafts within 180 seconds.',
      techStack: ['GrowthOS™ Pipeline tracking', 'n8n Automation Engine', 'Internal Inventory REST Sync', 'Stripe invoice webhooks'],
      roi: 'Saved 160 Admin Hours/Month',
      beforeMetrics: '4 days manual pricing draft',
      afterMetrics: '3 minutes auto quote dispatch',
      timeline: '14 Days Setup',
      leadsChart: [30, 48, 72, 110, 160, 215]
    },
    {
      id: 'retail-ecommerce',
      industry: 'Retail & Ecommerce',
      client_type: 'D2C Apparel Brand',
      name: 'SilkThread Retail Group',
      result: '18% Cart Winback Rate',
      challenge: 'High shopping cart abandonment rates caused up to ₹8 Lakh in lost potential monthly revenue. Generic email reminders had low open rates.',
      strategy: 'Deploy direct checkout webhooks linked to personalized WhatsApp interactive coupon bots.',
      implementation: 'Instantly message cart abandoners within 15 minutes offering dynamic custom tiered discounts based on checkout basket size.',
      techStack: ['AI Marketing Platforms', 'BusinessOS™ WhatsApp API', 'n8n Webhook triggers', 'Stripe checkout sync'],
      roi: '₹2.8 Lakh Recovered Monthly',
      beforeMetrics: '78% shopping cart loss',
      afterMetrics: '18% checkout recovery',
      timeline: '5 Days Setup',
      leadsChart: [40, 58, 80, 125, 190, 260]
    },
    {
      id: 'professional-services',
      industry: 'Professional Services',
      client_type: 'Corporate Advisory Firm',
      name: 'Khanna Legal Partners',
      result: 'Saved 140 Admin Hours/Mo',
      challenge: 'Professional advisors spent hours drafting custom service proposals and manually chasing appointment schedules over email thread friction.',
      strategy: 'Synchronize high-converting calendar links with an automated proposal compiling workspace.',
      implementation: 'A live WhatsApp scheduler schedules qualified calls. When marked "closed-won", our system auto-compiles a custom agreement with integrated digital signature tools.',
      techStack: ['GrowthOS™ CRM', 'BusinessOS™ Scheduler', 'n8n Proposal generator', 'Stripe automatic retainer gateways'],
      roi: '3x Proposal Closing Ratio',
      beforeMetrics: '24h proposal turnaround lag',
      afterMetrics: '5 mins automated contract dispatch',
      timeline: '7 Days Setup',
      leadsChart: [35, 52, 75, 115, 175, 245]
    }
  ];

  const categories = [
    'All', 'Healthcare', 'Education', 'Real Estate', 'Manufacturing', 'Retail & Ecommerce', 'Professional Services'
  ];

  const filteredCases = caseStudiesList.filter(c => {
    const matchesIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.client_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.result.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  // Active detail record
  const currentDetailCase = caseStudiesList.find(c => c.id === activeDetailCaseId) || caseStudiesList[0];

  // ==========================================
  // BEFORE VS AFTER INTERACTIVE COMPARISON DATA
  // ==========================================
  const [activeCompareMetric, setActiveCompareMetric] = useState<'leads' | 'revenue' | 'conversion' | 'efficiency'>('leads');
  const comparisonData = {
    leads: {
      title: 'Inbound Qualified Leads / Month',
      before: 120,
      after: 384,
      unit: 'Leads',
      pct: '+220%',
      color: '#3b82f6',
      desc: 'Average inbound lead volume across all active implementations, comparing manual lead forms to responsive AI conversation hubs.'
    },
    revenue: {
      title: 'Monthly Attributed Contract Value',
      before: 180000,
      after: 540000,
      unit: '₹ Rupees',
      pct: '3X Increase',
      color: '#8b5cf6',
      desc: 'Overall monthly revenue attributed directly to rapid follow-ups and automated checkout winbacks.'
    },
    conversion: {
      title: 'Form-To-Appointment Booking Rate',
      before: 4.2,
      after: 14.8,
      unit: '% Percent',
      pct: '3.5X Boost',
      color: '#10b981',
      desc: 'Conversion percentages of web traffic who successfully schedule discovery slots, replacing complex, standard forms.'
    },
    efficiency: {
      title: 'Weekly Internal Manual Admin Hours',
      before: 42,
      after: 8,
      unit: 'Hours',
      pct: '-81% Saved',
      color: '#f59e0b',
      desc: 'Hours spent by coordinators manual inputting lead records, scheduling, chasing invoice payments, and compiling proposals.'
    }
  };

  // ==========================================
  // VIDEO TESTIMONIAL CONSOLE STATE
  // ==========================================
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);
  const videoTestimonials = [
    {
      client: 'Dr. Vivek Singhal, Director',
      company: 'Vanguard Joint & Spine Center',
      industry: 'Healthcare',
      quote: "Before Natton Digital, our receptionists missed dozens of booking inquiries during surgical hours. Deactivating the old form and moving to WhatsApp automation increased our booked appointment metrics by 220% in weeks.",
      highlightMetric: '220% patient registration boost',
      videoUrl: '#',
      duration: '1:42',
      transcript: "[0:12] We were struggling with high phone wait times... [0:35] Natton deployed the Meta API nodes under 8 days... [1:10] Patients can now reserve slots in under 2 minutes directly on WhatsApp."
    },
    {
      client: 'Aditi Khanna, Managing Partner',
      company: 'Khanna Legal Partners',
      industry: 'Professional Services',
      quote: "Drafting corporate agreements took my associates hours of manual copy-pasting. The RAG proposal agent auto-generates perfect custom proposals with digital signature boxes inside 5 minutes of closing a call.",
      highlightMetric: 'Saved 140 admin hours/mo',
      videoUrl: '#',
      duration: '2:15',
      transcript: "[0:08] Manual document tracking was dragging our growth down... [0:45] Now, as soon as we mark a lead 'won', contracts go out instantly... [1:50] Retainers are securely processed via automatic Stripe gates."
    },
    {
      client: 'Rajesh Nair, Head of Marketing',
      company: 'Summit Education Group',
      industry: 'Education',
      quote: "Managing international prospective student leads was incredibly tough with different timezones. Natton's multilingual AI counselor instantly replies 24/7, boosting overall student registration rates by 300%.",
      highlightMetric: '3X Admissions Growth',
      videoUrl: '#',
      duration: '1:58',
      transcript: "[0:15] Timezones are no longer a barrier to our counseling pipeline... [0:50] GrowthOS tracks parent sources flawlessly... [1:30] Best ROI we have ever received from our Google Ad campaigns."
    }
  ];

  // ==========================================
  // INTERACTIVE ROI SLIDERS & METRIC DASHBOARD
  // ==========================================
  const [roiLeads, setRoiLeads] = useState(400);
  const [roiProjectVal, setRoiProjectVal] = useState(120000); // ₹1.2 Lakh avg value
  const [roiCurrentConv, setRoiCurrentConv] = useState(3.5); // 3.5% avg
  const [roiTeamSize, setRoiTeamSize] = useState(5);

  // Math equations
  const calculatedDealsBefore = Math.round(roiLeads * (roiCurrentConv / 100));
  const calculatedRevBefore = calculatedDealsBefore * roiProjectVal;

  const calculatedConvAfter = Math.min(15, roiCurrentConv * 2.5);
  const calculatedDealsAfter = Math.round(roiLeads * (calculatedConvAfter / 100));
  const calculatedRevAfter = calculatedDealsAfter * roiProjectVal;

  const revenueIncrease = calculatedRevAfter - calculatedRevBefore;
  const hoursSavedPerWeek = roiTeamSize * 15;
  const monthlyHoursSaved = hoursSavedPerWeek * 4;
  const financialEfficiencyGain = monthlyHoursSaved * 1200; // Valued at ₹1,200/hr in productivity
  const totalROIImpact = revenueIncrease + financialEfficiencyGain;

  // ==========================================
  // IMPLEMENTATION TIMELINE STEPPER
  // ==========================================
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const timelineSteps = [
    { name: '01. Discovery', title: 'Consultation & Flow Mapping', desc: 'Our systems consultants evaluate your active CRM channels, outbound call volumes, missed inquiries, and billing friction.' },
    { name: '02. Strategy', title: 'Architecture Planning', desc: 'Design custom workflow diagrams linking n8n trigger nodes, API registers, specialized knowledge bases, and HubSpot CRM fields.' },
    { name: '03. Setup', title: 'Core Platform Assembly', desc: 'Secure custom website deployment, initiate Meta API permissions, configure Cloud Telephony lines, and seed the Firestore database.' },
    { name: '04. Automation', title: 'Agent Deployment', desc: 'Deploy outbound voice qualification bots, activate responsive WhatsApp automated catalogs, and mount the proposal templates.' },
    { name: '05. Optimization', title: 'Prompt & Flow Tuning', desc: 'Review real call interaction logs, train vector database parameters, test fallback routes, and fine-tune response lag coefficients.' },
    { name: '06. Growth', title: 'Scale & Live Monitoring', desc: 'Hand over active tracking dashboards, initiate continuous analytics feeds, and watch conversion percentages climb.' }
  ];

  // ==========================================
  // STRATEGY FORM STATE & Webhook Logs Simulation
  // ==========================================
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formIndustry, setFormIndustry] = useState('Healthcare');
  const [formCountry, setFormCountry] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formChallenges, setFormChallenges] = useState('');
  const [formRevenue, setFormRevenue] = useState('₹5 Lakh - ₹20 Lakh');
  const [formMessage, setFormMessage] = useState('');
  const [formCaptcha, setFormCaptcha] = useState('');
  const [captchaNums, setCaptchaNums] = useState({ n1: 5, n2: 3 });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isSubmittedForm, setIsSubmittedForm] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);

  useEffect(() => {
    setCaptchaNums({
      n1: Math.floor(Math.random() * 6) + 3,
      n2: Math.floor(Math.random() * 6) + 2
    });
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(formCaptcha) !== (captchaNums.n1 + captchaNums.n2)) {
      alert('Verification captcha code is incorrect. Please calculate again.');
      return;
    }
    setIsSubmittingForm(true);
    setSyncLogs([
      '⚡ Intercepting inbound Case-Studies strategy payload...',
      '📡 Parsing variables: Full Name, Company, Industry, Country...',
      '🔗 Dispatched secure n8n POST request to active webhook pipeline...',
      '📦 Syncing parameters into GoHighLevel lead registers...'
    ]);

    setTimeout(() => {
      setSyncLogs(prev => [
        ...prev,
        '📊 Synchronization completed successfully.',
        '🚀 CRM Record ID generated: GHL_STRATEGY_4480',
        '💬 Real-time WhatsApp confirmation dispatch triggered.'
      ]);
      setTimeout(() => {
        setIsSubmittingForm(false);
        setIsSubmittedForm(true);
      }, 1000);
    }, 2000);
  };

  return (
    <div className="bg-[#030512] text-slate-200 min-h-screen py-10 overflow-hidden relative selection:bg-purple-600 selection:text-white">
      
      {/* Background decoration gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-0 w-[550px] h-[550px] bg-purple-950/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-indigo-950/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-10 text-xs font-mono text-slate-500 flex items-center gap-1.5 border-b border-slate-900 pb-4">
          <button onClick={() => setPath('home')} className="hover:text-purple-400 transition-colors">Home</button> 
          <span>/</span> 
          <span className="text-slate-400">Resources</span> 
          <span>/</span> 
          <span className="text-purple-400 font-semibold font-mono">Case Studies</span>
        </div>

        {/* ==========================================
            HERO SECTION: Immersive Storytelling Header
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 relative min-h-[500px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden -z-20 border border-blue-950/30 bg-slate-950/60 backdrop-blur-sm">
            <canvas ref={meshRef} className="absolute inset-0 w-full h-full object-cover opacity-90" />
          </div>

          <div className="lg:col-span-7 space-y-6 z-10 p-6 sm:p-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-purple-400 font-bold">
                Customer Success Metrics & Case Studies
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight text-white">
              Real Businesses.<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Real Results.
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-slate-400 max-w-2xl">
              Explore how growing brands and local services automate inquiries, slash manual admin hours, accelerate follow-up speeds, and secure massive ROI using GrowthOS™ and AgenticOS™.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#strategy_form" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-extrabold rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                Book Strategy Call <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#browse_section" 
                className="px-6 py-3 rounded-lg border border-slate-800 bg-slate-950/50 hover:bg-slate-900 transition-all flex items-center gap-2 text-sm font-semibold text-slate-300"
              >
                Browse Case Studies
              </a>
            </div>
          </div>

          {/* KPI Floating Dashboard Visual */}
          <div className="lg:col-span-5 p-1 relative z-10 text-left">
            <div className="rounded-2xl border border-blue-900/30 bg-slate-950/80 backdrop-blur-md p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full blur-2xl" />
              
              <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4">
                <span className="text-[10px] font-mono uppercase text-[#00C2FF] flex items-center gap-1.5 font-semibold">
                  <Activity className="h-3.5 w-3.5 text-blue-400 animate-pulse" /> Live Floating KPI Dashboard
                </span>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold">SYSTEM ACTIVE</span>
              </div>

              {/* Live fluctuating KPI metrics */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-blue-950/10 border border-blue-950/30 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Attributed Net Revenue</span>
                    <span className="text-xl font-bold font-sans text-white">₹3,48,20,400</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded">
                    +42.8% YoY
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                    <span className="text-[8px] font-mono text-slate-500 block uppercase">Conversion Rate</span>
                    <span className="text-base font-bold text-slate-100 block mt-1">14.8%</span>
                    <span className="text-[9px] font-mono text-emerald-400">▲ 3.5x boost</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                    <span className="text-[8px] font-mono text-slate-500 block uppercase">Active CRM Syncs</span>
                    <span className="text-base font-bold text-slate-100 block mt-1">99.98%</span>
                    <span className="text-[9px] font-mono text-blue-400">Zero lag state</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-purple-950/10 border border-purple-900/20 text-xs text-slate-400 leading-relaxed font-mono text-[10px]">
                  <span className="text-purple-400 font-bold block mb-1">// SYSTEM METRIC RESOLUTION</span>
                  We track and log source parameters, lead qualification flags, and Stripe payments automatically with 100% data fidelity.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            STATS SECTION: "Impact Delivered"
           ========================================== */}
        <div id="stats" className="mb-24 p-6 sm:p-10 rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-sm">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] uppercase tracking-widest block font-bold">Impact Delivered</span>
            <h2 className="text-2xl font-bold font-display text-white">Measurable System Performance</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 text-center">
            <div className="space-y-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-blue-400 block font-mono">
                {(messagesCount / 1000000).toFixed(1)}M+
              </span>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Messages Automated</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-purple-400 block font-mono">
                {(leadsCount / 1000).toFixed(1)}K+
              </span>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Leads Managed</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 block font-mono">
                {conversionRate}%+
              </span>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Higher Conversion</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-yellow-400 block font-mono">
                {followupSpeed}%
              </span>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Faster Follow-Up</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-rose-400 block font-mono">
                {manualReduction}%
              </span>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Reduced Manual Work</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-indigo-400 block font-mono">
                {roiFactor}X
              </span>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">ROI Improvement</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            FILTERS SECTION & MASONRY success GRID
           ========================================== */}
        <div id="browse_section" className="mb-24 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left border-b border-slate-900 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Success Catalog</span>
              <h2 className="text-3xl font-bold font-display text-white">Browse By Industry</h2>
              <p className="text-xs text-slate-400 max-w-lg">
                Filter our real results database by sector or find dynamic search terms below.
              </p>
            </div>

            {/* Search Input and category tags */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative shrink-0 sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search client type or result..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap gap-2 pb-4 overflow-x-auto select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedIndustry(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all shrink-0 ${
                  selectedIndustry === cat 
                    ? 'border-blue-500 bg-blue-500/10 text-white font-bold' 
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* MASONRY SUCCESS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {filteredCases.map((cs) => {
              const isSelected = activeDetailCaseId === cs.id;
              return (
                <div 
                  key={cs.id}
                  onClick={() => setActiveDetailCaseId(cs.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between ${
                    isSelected 
                      ? 'border-purple-500 bg-purple-950/5 shadow-[0_0_20px_rgba(139,92,246,0.15)]' 
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/80'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-purple-400 font-bold uppercase tracking-wider bg-purple-500/10 px-2 py-0.5 rounded">
                        {cs.industry}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {cs.timeline}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 font-mono block">{cs.client_type}</span>
                      <h3 className="text-lg font-bold font-display text-white group-hover:text-purple-400 transition-colors">
                        {cs.name}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                        {cs.result}
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                      {cs.challenge}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      {cs.roi}
                    </span>
                    <span className="text-[10px] font-bold text-blue-400 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      {isSelected ? 'Currently Viewing' : 'Examine Journey'} <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            IMMERSIVE STORYTELLING DETAIL CONSOLE (TEMPLATE)
           ========================================== */}
        <div className="mb-24 p-1 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-transparent rounded-3xl">
          <div className="p-6 sm:p-10 rounded-3xl border border-slate-900 bg-slate-950 text-left space-y-10 relative">
            <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header info */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-900 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">
                  Currently Examining Case Journey
                </span>
                <h3 className="text-2xl font-bold font-display text-white">
                  {currentDetailCase.name}
                </h3>
                <span className="text-xs text-slate-400 block font-mono">
                  {currentDetailCase.client_type} • {currentDetailCase.industry}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="p-3 rounded-lg bg-blue-950/15 border border-blue-900/20 text-center shrink-0">
                  <span className="text-[8px] font-mono text-slate-500 uppercase block">Before implementation</span>
                  <span className="text-xs font-mono text-rose-400 line-through font-semibold">{currentDetailCase.beforeMetrics}</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/15 border border-emerald-900/20 text-center shrink-0">
                  <span className="text-[8px] font-mono text-slate-500 uppercase block">After integration</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{currentDetailCase.afterMetrics}</span>
                </div>
              </div>
            </div>

            {/* Immersive Walkthrough columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-6">
                
                {/* Challenge */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> The Challenge
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {currentDetailCase.challenge}
                  </p>
                </div>

                {/* Strategy */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Strategic Solution
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {currentDetailCase.strategy}
                  </p>
                </div>

                {/* Implementation */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Integration Steps
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {currentDetailCase.implementation}
                  </p>
                </div>
              </div>

              {/* Sidebar tech metrics */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Tech Stack used */}
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-900 space-y-3">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentDetailCase.techStack.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ROI Badge */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-900/20 text-center space-y-2">
                  <Award className="h-6 w-6 text-purple-400 mx-auto" />
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Calculated Performance Return</span>
                  <span className="text-lg font-bold text-white block">{currentDetailCase.roi}</span>
                </div>
              </div>
            </div>

            {/* Custom Interactive SVG Graph showing client growth projection */}
            <div className="space-y-3 pt-6 border-t border-slate-900">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider text-left">6-Month Inbound Growth Curve</h4>
              <div className="h-44 w-full bg-slate-950/80 rounded-xl border border-slate-900 p-4 flex items-end justify-between relative">
                
                {/* Grid guidelines */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-10">
                  <div className="border-b border-white w-full" />
                  <div className="border-b border-white w-full" />
                  <div className="border-b border-white w-full" />
                </div>

                {currentDetailCase.leadsChart.map((val, idx) => {
                  const maxVal = Math.max(...currentDetailCase.leadsChart);
                  const heightPercent = (val / maxVal) * 85;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 z-10 w-12 sm:w-16">
                      <span className="text-[10px] font-mono text-blue-400 font-bold">{val}</span>
                      <div 
                        style={{ height: `${heightPercent}px` }}
                        className="w-4 sm:w-6 rounded-t bg-gradient-to-t from-blue-600 to-purple-600 transition-all duration-500 hover:from-purple-500 hover:to-blue-400 shadow-md"
                      />
                      <span className="text-[9px] font-mono text-slate-500">M0{idx + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            TECHNOLOGY STACK: "Solutions Implemented"
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">Product Alignment</span>
            <h2 className="text-3xl font-bold font-display text-white">Solutions Implemented</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Our automated systems are powered by Natton Digital core architecture modules and certified integrations:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { title: 'AI Marketing', desc: 'Custom conversion funnels driving leads.', path: 'solutions/ai-growth-marketing' as RoutePath },
              { title: 'GrowthOS™', desc: 'Secure sales CRM pipeline management.', path: 'products/growth-os' as RoutePath },
              { title: 'BusinessOS™', desc: 'Consolidated communications inbox.', path: 'products/business-os' as RoutePath },
              { title: 'AgenticOS™', desc: 'Autonomous custom voice & text agents.', path: 'products/agentic-os' as RoutePath },
              { title: 'WhatsApp Automation', desc: 'Personalized interactive chat templates.', path: 'solutions/whatsapp-automation' as RoutePath },
              { title: 'AI Calling', desc: 'Autonomous telephone qualifications.', path: 'solutions/ai-calling-agents' as RoutePath },
              { title: 'Cloud Telephony', desc: 'Secure call logging and metadata recording.', path: 'solutions/cloud-telephony' as RoutePath },
              { title: 'n8n AI Agents', desc: 'Custom database and REST webhook triggers.', path: 'solutions/ai-agents' as RoutePath }
            ].map((sol, idx) => (
              <div 
                key={idx}
                onClick={() => setPath(sol.path)} 
                className="p-5 rounded-xl border border-slate-900 bg-slate-950/40 hover:border-blue-500/30 hover:bg-slate-950 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-sm font-bold text-white mb-1.5 font-display group-hover:text-blue-400 transition-colors">{sol.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{sol.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 group-hover:text-blue-400">
                  Read specs <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            BEFORE VS AFTER COMPARISON (INTERACTIVE CHART)
           ========================================== */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">Interactive Audit</span>
            <h2 className="text-3xl font-bold font-display text-white">Before vs After Performance</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore the substantial operational changes achieved after switching from legacy manual workflows to Natton Digital.
            </p>

            <div className="space-y-2">
              {(['leads', 'revenue', 'conversion', 'efficiency'] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setActiveCompareMetric(metric)}
                  className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                    activeCompareMetric === metric 
                      ? 'border-purple-500 bg-purple-500/5 text-white font-bold' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-semibold capitalize">{metric} Impact</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                    {comparisonData[metric].pct}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md space-y-6">
            <h3 className="text-sm font-bold text-white border-b border-slate-900 pb-3 font-display">
              {comparisonData[activeCompareMetric].title}
            </h3>

            <div className="grid grid-cols-2 gap-6 items-end h-40">
              {/* Before Bar */}
              <div className="space-y-3 text-center">
                <span className="text-[10px] font-mono text-rose-400 block font-bold uppercase">Before Legacy System</span>
                <div className="h-28 bg-slate-900 rounded-lg flex items-end justify-center p-2">
                  <div className="w-10 bg-rose-500/20 border border-rose-500/40 rounded-t h-[30%] animate-pulse" />
                </div>
                <span className="text-base font-bold text-slate-400 block">
                  {activeCompareMetric === 'revenue' 
                    ? `₹${(comparisonData[activeCompareMetric].before / 1000).toFixed(0)}K` 
                    : comparisonData[activeCompareMetric].before} {activeCompareMetric !== 'revenue' && comparisonData[activeCompareMetric].unit}
                </span>
              </div>

              {/* After Bar */}
              <div className="space-y-3 text-center">
                <span className="text-[10px] font-mono text-emerald-400 block font-bold uppercase">After Natton Digital</span>
                <div className="h-28 bg-slate-900 rounded-lg flex items-end justify-center p-2">
                  <div className="w-10 bg-emerald-500 rounded-t h-[90%] transition-all duration-700 shadow-[0_0_15px_rgba(16,185,129,0.25)]" />
                </div>
                <span className="text-lg font-extrabold text-white block">
                  {activeCompareMetric === 'revenue' 
                    ? `₹${(comparisonData[activeCompareMetric].after / 1000).toFixed(0)}K` 
                    : comparisonData[activeCompareMetric].after} {activeCompareMetric !== 'revenue' && comparisonData[activeCompareMetric].unit}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-3 border-t border-slate-900">
              {comparisonData[activeCompareMetric].desc}
            </p>
          </div>
        </div>

        {/* ==========================================
            VIDEO TESTIMONIALS: Custom Video Console
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">Video Testimonials</span>
            <h2 className="text-3xl font-bold font-display text-white">Client Video Interviews</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Hear directly from business owners who transformed their customer acquisition workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-4 space-y-2">
              {videoTestimonials.map((test, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveVideoIdx(idx);
                    setIsPlaying(false);
                    setVideoProgress(15 + idx * 25);
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-all block ${
                    activeVideoIdx === idx 
                      ? 'border-blue-500 bg-blue-500/5 text-white' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-mono text-blue-400 block font-bold uppercase">{test.company}</span>
                  <span className="text-sm font-bold block mt-1">{test.client}</span>
                  <span className="text-[9px] font-mono text-emerald-400 mt-1 block font-bold uppercase">{test.highlightMetric}</span>
                </button>
              ))}
            </div>

            {/* Custom Interactive Mock Video Player with real-time subtitle logs overlay */}
            <div className="lg:col-span-8 p-1 bg-gradient-to-r from-blue-500/15 via-purple-500/5 to-transparent rounded-2xl">
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
                
                <div className="aspect-video w-full rounded-xl bg-slate-900 relative flex items-center justify-center overflow-hidden border border-slate-800">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-[9px] font-mono text-emerald-400 font-bold uppercase">
                      {videoTestimonials[activeVideoIdx].highlightMetric}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-[9px] font-mono text-slate-400 font-bold">
                      Duration: {videoTestimonials[activeVideoIdx].duration}
                    </span>
                  </div>

                  {/* Visual equalizer play representation */}
                  <div className="text-center space-y-4 z-10 px-6">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
                    >
                      {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white translate-x-0.5" />}
                    </button>
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        {isPlaying ? 'Streaming Dr. Vivek Singhal Audio Interview...' : 'Click to stream client testimonial'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 block mt-1">Video simulated through visual subtitle console</span>
                    </div>
                  </div>

                  {/* Subtitle subtitle overlay ticker */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-slate-800 p-3 rounded-lg text-left">
                    <span className="text-[8px] font-mono text-blue-400 block uppercase">TRANSCRIPT TIMELINE</span>
                    <p className="text-[10px] text-slate-300 font-mono italic mt-1 leading-relaxed">
                      {videoTestimonials[activeVideoIdx].transcript}
                    </p>
                  </div>
                </div>

                <div className="text-left space-y-2">
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "{videoTestimonials[activeVideoIdx].quote}"
                  </p>
                  <span className="text-[10px] font-bold text-slate-500 block">
                    — {videoTestimonials[activeVideoIdx].client}, {videoTestimonials[activeVideoIdx].company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            ROI CALCULATOR INTERACTIVE DASHBOARD
           ========================================== */}
        <div id="roi_dashboard" className="mb-24 p-1 bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-transparent rounded-3xl">
          <div className="p-6 sm:p-10 rounded-3xl border border-slate-900 bg-slate-950 text-left space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">ROI Simulation</span>
              <h2 className="text-3xl font-bold font-display text-white">Dynamic Return Calculator</h2>
              <p className="text-xs text-slate-400">
                Drag variables to calculate estimated revenue increases and staff productivity gains after installing Natton Digital.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Sliders */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Monthly Leads */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold font-mono">
                    <span className="text-slate-300">Monthly Inbound Leads</span>
                    <span className="text-blue-400">{roiLeads} Leads</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={roiLeads}
                    onChange={(e) => setRoiLeads(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Avg project value */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold font-mono">
                    <span className="text-slate-300">Average Project Value</span>
                    <span className="text-blue-400">₹{(roiProjectVal / 1000).toFixed(0)}K Rupees</span>
                  </div>
                  <input
                    type="range"
                    min="30000"
                    max="1000000"
                    step="10000"
                    value={roiProjectVal}
                    onChange={(e) => setRoiProjectVal(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* current conversion */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold font-mono">
                    <span className="text-slate-300">Current Conversion Rate</span>
                    <span className="text-[#8b5cf6]">{roiCurrentConv}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={roiCurrentConv}
                    onChange={(e) => setRoiCurrentConv(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                {/* Team size */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold font-mono">
                    <span className="text-slate-300">Sales/Admin Team Size</span>
                    <span className="text-[#8b5cf6]">{roiTeamSize} Staff</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={roiTeamSize}
                    onChange={(e) => setRoiTeamSize(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              </div>

              {/* Output dashboard modules */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Expected conversion lift</span>
                  <span className="text-2xl font-extrabold text-[#10b981] block">
                    {calculatedConvAfter.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-relaxed">
                    Elevated from standard {roiCurrentConv}% rate via 24/7 instant replies.
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Additional Deals Won</span>
                  <span className="text-2xl font-extrabold text-[#10b981] block">
                    +{calculatedDealsAfter - calculatedDealsBefore} deals / mo
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-relaxed">
                    Acquiring {calculatedDealsAfter} total deals compared to legacy {calculatedDealsBefore} deals.
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Productivity Hours Saved</span>
                  <span className="text-2xl font-extrabold text-blue-400 block">
                    {monthlyHoursSaved} hours / mo
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-relaxed">
                    Eliminating manual GDrive setups, chasing schedules, and custom invoicing.
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/30 to-purple-950/20 border border-blue-900/30 space-y-1.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Net Monthly Revenue Return</span>
                    <span className="text-2xl font-extrabold text-white block">
                      ₹{(totalROIImpact / 100000).toFixed(1)} Lakh / mo
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-purple-400 font-semibold uppercase">
                    Including ₹{(financialEfficiencyGain / 1000).toFixed(0)}K saved in overhead values
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            TIMELINE: "Implementation Journey"
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-[#00C2FF] uppercase tracking-widest block font-bold">The Journey</span>
            <h2 className="text-3xl font-bold font-display text-white">Implementation Journey</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              How we construct, fine-tune, and verify your custom automation systems from initial blueprint meeting to live launch:
            </p>
          </div>

          {/* Stepper tags */}
          <div className="flex justify-between items-center overflow-x-auto pb-4 gap-2 border-b border-slate-900 select-none">
            {timelineSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTimelineStep(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                  activeTimelineStep === idx 
                    ? 'bg-blue-600 text-white font-bold' 
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {step.name}
              </button>
            ))}
          </div>

          <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/60 backdrop-blur-sm text-left relative min-h-[160px] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">
                TIMELINE NODE ACTION
              </span>
              <h3 className="text-lg font-bold font-display text-white">
                {timelineSteps[activeTimelineStep].title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                {timelineSteps[activeTimelineStep].desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span>Standard Operational Sequence</span>
              <span className="text-blue-400">Step {activeTimelineStep + 1} of 6</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            CLIENT LOGOS: Infinite Logo Marquee
           ========================================== */}
        <div className="mb-24 text-center space-y-6">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Trusted By Growing Businesses</span>
          
          <div className="relative w-full overflow-hidden py-4 border-y border-slate-900/60 bg-[#030512]">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#030512] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#030512] to-transparent z-10" />
            
            <div className="flex gap-16 items-center whitespace-nowrap animate-marquee">
              {/* Infinite scrolling items (doubled for loops) */}
              {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((item, idx) => (
                <span key={idx} className="text-sm font-bold font-mono text-slate-600 uppercase tracking-widest">
                  {item === 1 && 'METRO PEDIATRICS'}
                  {item === 2 && 'VANGUARD ACADEMY'}
                  {item === 3 && 'PRESTIGE LANDMARKS'}
                  {item === 4 && 'INDOMETAL PRECISION'}
                  {item === 5 && 'SILKTHREAD APPAREL'}
                  {item === 6 && 'KHANNA LAW RETAINERS'}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            STRATEGY INPUT FORM: GoHighLevel + n8n webhook simulator
           ========================================== */}
        <div id="strategy_form" className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-[#00C2FF] uppercase tracking-widest block font-bold">Ready to Scale?</span>
            <h2 className="text-3xl font-bold font-display text-white">Want Similar Results?</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submit your active parameters below. Our integrations consultants will evaluate your current workflow friction and build a custom acquisition blueprint before your call.
            </p>

            <div className="space-y-4 p-5 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-400 leading-relaxed font-mono">
              <span className="text-blue-400 font-bold block mb-1">📋 SECURITY & SYNC STATS</span>
              <p>● GoHighLevel connection: SECURE TLS 1.3</p>
              <p>● Webhook endpoints: n8n autonomous nodes</p>
              <p>● Verification captcha: ACTIVE</p>
            </div>
          </div>

          <div className="lg:col-span-7 p-1 bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-transparent rounded-2xl">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950 space-y-6">
              <h3 className="text-lg font-bold font-display text-white border-b border-slate-900 pb-3">Book Your Free Growth Strategy</h3>

              {isSubmittedForm ? (
                <div className="text-center p-8 space-y-4 rounded-xl bg-blue-950/10 border border-blue-900/30">
                  <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Strategy Request Scheduled Successfully</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    A personalized verification check has triggered via n8n. Our principal advisor will WhatsApp your analysis packet shortly.
                  </p>
                  
                  {/* Visual simulated terminal log output */}
                  <div className="p-4 rounded-lg bg-black text-left font-mono text-[10px] text-slate-400 space-y-1.5 border border-slate-900">
                    <span className="text-purple-400 font-semibold block">/// STREAMING WEBHOOK LOGS:</span>
                    {syncLogs.map((log, idx) => (
                      <p key={idx} className="truncate">{log}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 block font-mono uppercase text-[9px] tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Alok Sharma"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 block font-mono uppercase text-[9px] tracking-wider">Company Name</label>
                      <input
                        type="text"
                        required
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder="Vanguard Joint Clinic"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 block font-mono uppercase text-[9px] tracking-wider">Industry</label>
                      <select
                        value={formIndustry}
                        onChange={(e) => setFormIndustry(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-blue-500"
                      >
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>Real Estate</option>
                        <option>Manufacturing</option>
                        <option>Retail & Ecommerce</option>
                        <option>Professional Services</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 block font-mono uppercase text-[9px] tracking-wider">Country Location</label>
                      <input
                        type="text"
                        required
                        value={formCountry}
                        onChange={(e) => setFormCountry(e.target.value)}
                        placeholder="India"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 block font-mono uppercase text-[9px] tracking-wider">Business Email Address</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="director@vanguardclinic.com"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 block font-mono uppercase text-[9px] tracking-wider">WhatsApp Telephone Number</label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 block font-mono uppercase text-[9px] tracking-wider">Current Business Challenges</label>
                      <input
                        type="text"
                        required
                        value={formChallenges}
                        onChange={(e) => setFormChallenges(e.target.value)}
                        placeholder="High leads leakage, slow quote responses..."
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 block font-mono uppercase text-[9px] tracking-wider">Monthly Revenue Target</label>
                      <select
                        value={formRevenue}
                        onChange={(e) => setFormRevenue(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-blue-500"
                      >
                        <option>₹1 Lakh - ₹5 Lakh</option>
                        <option>₹5 Lakh - ₹20 Lakh</option>
                        <option>₹20 Lakh - ₹50 Lakh</option>
                        <option>₹50 Lakh+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-slate-400 block font-mono uppercase text-[9px] tracking-wider">Message Details</label>
                    <textarea
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Share specific details about your current calendar booking bottlenecks..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Anti-spam captcha */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2 border-t border-slate-900">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-purple-400 font-bold">
                        Solve Captcha: {captchaNums.n1} + {captchaNums.n2} =
                      </span>
                      <input
                        type="number"
                        required
                        value={formCaptcha}
                        onChange={(e) => setFormCaptcha(e.target.value)}
                        placeholder="?"
                        className="w-16 px-2.5 py-2 bg-slate-950 border border-slate-800 rounded text-center text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingForm}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-extrabold uppercase tracking-wider text-xs transition-all"
                    >
                      {isSubmittingForm ? 'Configuring n8n sync...' : 'Request Free Strategy Plan'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            FINAL CTA
           ========================================== */}
        <div className="p-6 sm:p-12 rounded-3xl border border-blue-950/40 bg-gradient-to-br from-blue-950/25 via-purple-950/20 to-slate-950/40 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <h2 className="text-3xl font-extrabold font-display text-white">Let's Build Your Success Story</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            Unify WhatsApp notifications, custom outbound voice dialers, and secure client-onboarding calendars to accelerate conversions.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#strategy_form" 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition-all text-xs uppercase tracking-wider"
            >
              Book Strategy Call
            </a>
            <button 
              onClick={() => setPath('contact')}
              className="px-6 py-2.5 rounded-lg border border-slate-800 bg-slate-950/50 hover:bg-slate-900 text-slate-300 text-xs font-semibold"
            >
              Talk To Experts
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
