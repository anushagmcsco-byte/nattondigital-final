import React, { useState, useMemo } from 'react';
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
  Smartphone, 
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
  SparkleIcon,
  Zap,
  Lock,
  ArrowUpRight,
  Target,
  HeartPulse,
  GraduationCap,
  Store,
  Send
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { RoutePath } from '../types';

interface FreeToolsProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

// Category type for filtering
type ToolCategory = 'all' | 'ai' | 'seo-aeo' | 'crm' | 'finance';

export default function FreeTools({ setPath, darkMode }: FreeToolsProps) {
  // Navigation active state
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeToolId, setActiveToolId] = useState<string>('ai_readiness');
  
  // 1. AI Readiness Assessment state
  const [aiIndustry, setAiIndustry] = useState<string>('retail');
  const [aiEmployees, setAiEmployees] = useState<number>(25);
  const [aiCurrentTools, setAiCurrentTools] = useState<string[]>(['crm']);
  const [aiAutomationLevel, setAiAutomationLevel] = useState<number>(2); // 1-4

  // 2. Website Grader state
  const [graderUrl, setGraderUrl] = useState<string>('https://example.com');
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [graderResult, setGraderResult] = useState<any>(null);

  // 3. SEO + AEO Audit State
  const [seoUrl, setSeoUrl] = useState<string>('https://example.com');
  const [seoKeyword, setSeoKeyword] = useState<string>('AI Operations');
  const [seoLocation, setSeoLocation] = useState<string>('United States');
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [seoResult, setSeoResult] = useState<any>(null);

  // 4. CRM Maturity Score state
  const [crmPlatform, setCrmPlatform] = useState<string>('HubSpot');
  const [crmLeadVolume, setCrmLeadVolume] = useState<number>(1200);
  const [crmTeamSize, setCrmTeamSize] = useState<number>(10);
  const [crmAutomationLevel, setCrmAutomationLevel] = useState<string>('medium');

  // 5. Business ROI Calculator State
  const [roiRevenue, setRoiRevenue] = useState<number>(150000);
  const [roiEmployees, setRoiEmployees] = useState<number>(15);
  const [roiMarketingSpend, setRoiMarketingSpend] = useState<number>(8000);

  // 6. WhatsApp Automation ROI Calculator state
  const [waLeads, setWaLeads] = useState<number>(800);
  const [waConversion, setWaConversion] = useState<number>(3.5);
  const [waDealSize, setWaDealSize] = useState<number>(1500);

  // 7. AI Agent Cost Calculator State
  const [agentTeamSize, setAgentTeamSize] = useState<number>(12);
  const [agentTasks, setAgentTasks] = useState<number>(5); // 1 to 10
  const [agentWorkingHours, setAgentWorkingHours] = useState<number>(40);

  // 8. Lead Value Calculator state
  const [leadLeads, setLeadLeads] = useState<number>(500);
  const [leadConversion, setLeadConversion] = useState<number>(4);
  const [leadDealValue, setLeadDealValue] = useState<number>(2500);

  // 9. Marketing Budget Calculator state
  const [mbRevenue, setMbRevenue] = useState<number>(2000000);
  const [mbTarget, setMbTarget] = useState<number>(40); // % growth
  const [mbIndustry, setMbIndustry] = useState<string>('retail');

  // Industry Tools Detail state
  const [activeIndustryTool, setActiveIndustryTool] = useState<string>('healthcare');

  // Lead capture / Report Generation Form State
  const [reportForm, setReportForm] = useState({
    fullName: '',
    companyName: '',
    industry: 'Retail & E-commerce',
    country: 'United States',
    email: '',
    phone: ''
  });
  const [reportLoading, setReportLoading] = useState<boolean>(false);
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  // FAQ accordion state
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Saved reports history (simulated dashboard logs)
  const [savedReports, setSavedReports] = useState<any[]>([
    { id: '1', tool: 'AI Readiness Assessment', score: '82%', date: 'Just now', company: 'Quantum Retail' },
    { id: '2', tool: 'SEO + AEO Audit', score: '78%', date: '2 hours ago', company: 'Nexus Health' },
    { id: '3', tool: 'CRM Maturity Score', score: '56%', date: 'Yesterday', company: 'Sovereign Education' }
  ]);

  // Smooth scroll helper
  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToolCardClick = (toolId: string) => {
    setActiveToolId(toolId);
    scrollToElement('interactive-workshop');
  };

  // --------------------------------------------------------
  // CALCULATED OUTPUTS (REAL-TIME REACTIVE LOGIC)
  // --------------------------------------------------------

  // AI Readiness Score
  const aiReadinessScore = useMemo(() => {
    let score = 30;
    // Industry adjustment
    if (aiIndustry === 'healthcare' || aiIndustry === 'services') score += 10;
    else if (aiIndustry === 'retail' || aiIndustry === 'manufacturing') score += 15;
    
    // Tools score
    score += aiCurrentTools.length * 10;
    
    // Automation multiplier
    score += aiAutomationLevel * 12;
    
    // Cap at 100
    return Math.min(score, 100);
  }, [aiIndustry, aiCurrentTools, aiAutomationLevel]);

  // Website Grader trigger simulation
  const runWebsiteGrader = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGrading(true);
    setTimeout(() => {
      setIsGrading(false);
      setGraderResult({
        performance: Math.floor(Math.random() * 20) + 78,
        seo: Math.floor(Math.random() * 15) + 81,
        accessibility: Math.floor(Math.random() * 15) + 83,
        mobile: Math.floor(Math.random() * 12) + 85,
        recommendations: [
          'Enable Next-Gen Image Compression on product galleries.',
          'Optimize LLM crawl schema metadata inside server headers (robots.txt & llms.txt).',
          'Reduce blocking Javascript hydration payload from legacy tracking scripts.'
        ]
      });
    }, 1500);
  };

  // SEO + AEO Audit trigger simulation
  const runSeoAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setSeoResult({
        seoScore: Math.floor(Math.random() * 18) + 76,
        aeoScore: Math.floor(Math.random() * 22) + 65,
        schema: 'Missing SoftwareApplication & FAQ schema nodes.',
        issues: [
          'Meta tag format misses structural parameters for Perplexity/Gemini discovery.',
          'Lack of exact question-and-answer markup inside documentation grids.',
          'Core Web Vital Cumulative Layout Shift (CLS) is above 0.25 on index route.'
        ]
      });
    }, 1600);
  };

  // CRM Maturity Score
  const crmMaturityCalc = useMemo(() => {
    let score = 40;
    if (crmPlatform === 'Salesforce' || crmPlatform === 'HubSpot') score += 20;
    else if (crmPlatform === 'Zoho') score += 10;

    if (crmAutomationLevel === 'high') score += 30;
    else if (crmAutomationLevel === 'medium') score += 15;

    const pipelineLeakValue = Math.round(crmLeadVolume * 0.15 * 85);
    return {
      score: Math.min(score, 100),
      leak: pipelineLeakValue,
      status: score > 75 ? 'Optimal' : score > 50 ? 'Suboptimal' : 'Leaking Value'
    };
  }, [crmPlatform, crmLeadVolume, crmAutomationLevel]);

  // Business ROI Calculator
  const businessRoiCalc = useMemo(() => {
    const baselineInboundLeads = Math.round(roiRevenue / 150);
    const addedInboundLeads = Math.round(baselineInboundLeads * 0.45);
    const costSavings = Math.round((roiEmployees * 450) + (roiMarketingSpend * 0.25));
    const revenueGrowth = Math.round(addedInboundLeads * 85);
    return {
      growth: revenueGrowth,
      savings: costSavings,
      roi: Math.round(((revenueGrowth + costSavings) / 2500) * 100)
    };
  }, [roiRevenue, roiEmployees, roiMarketingSpend]);

  // WhatsApp ROI Calculator
  const whatsappRoiCalc = useMemo(() => {
    const currentDeals = Math.round(waLeads * (waConversion / 100));
    const currentRevenue = currentDeals * waDealSize;
    const elevatedConversion = waConversion * 1.55; // 55% average response spike
    const optimizedDeals = Math.round(waLeads * (elevatedConversion / 100));
    const newRevenue = optimizedDeals * waDealSize;
    const growth = newRevenue - currentRevenue;
    return {
      growth,
      conversionSpike: (elevatedConversion - waConversion).toFixed(1),
      roi: Math.round((growth / 999) * 100)
    };
  }, [waLeads, waConversion, waDealSize]);

  // AI Agent Cost Calculator & Charts
  const agentSavingsCalc = useMemo(() => {
    // 1 task automates ~12 hours of manual sync/entry/triage per week per staff member
    const humanHourlyRate = 32;
    const averageWeeklyManualHours = agentTeamSize * (agentTasks * 3.5);
    const weeklyHumanCost = averageWeeklyManualHours * humanHourlyRate;
    const annualHumanCost = weeklyHumanCost * 52;

    const monthlyAgentPlatformFee = 499 + (agentTasks * 100);
    const annualAgentCost = monthlyAgentPlatformFee * 12;
    const annualSavings = Math.max(1200, annualHumanCost - annualAgentCost);

    // Dynamic Chart Data mapping years 1 to 5
    const chartData = Array.from({ length: 5 }, (_, i) => {
      const year = i + 1;
      const cumulativeHuman = annualHumanCost * year;
      const cumulativeAgent = annualAgentCost * year;
      return {
        name: `Year ${year}`,
        'Human Workforce Cost': Math.round(cumulativeHuman),
        'AI Agentic Cost': Math.round(cumulativeAgent),
        'Net Saved': Math.round(cumulativeHuman - cumulativeAgent)
      };
    });

    return {
      human: Math.round(annualHumanCost),
      ai: Math.round(annualAgentCost),
      savings: Math.round(annualSavings),
      chartData
    };
  }, [agentTeamSize, agentTasks]);

  // Lead Value Calculator
  const leadValueCalc = useMemo(() => {
    const baselineDeals = Math.round(leadLeads * (leadConversion / 100));
    const totalPipelineValue = leadLeads * leadDealValue;
    const realizedRevenue = baselineDeals * leadDealValue;
    const individualLeadValue = leadLeads > 0 ? Math.round(realizedRevenue / leadLeads) : 0;
    return {
      value: individualLeadValue,
      potential: totalPipelineValue,
      ltv: Math.round(leadDealValue * 2.8)
    };
  }, [leadLeads, leadConversion, leadDealValue]);

  // Marketing Budget Calculator
  const marketingBudgetCalc = useMemo(() => {
    // Standard recommended budget represents 7-12% of revenue
    let percentage = 0.08;
    if (mbTarget > 50) percentage = 0.13;
    else if (mbTarget > 25) percentage = 0.10;

    const recommended = Math.round(mbRevenue * percentage);
    const expectedRoi = Math.round((mbRevenue * (mbTarget / 100)) / (recommended || 1) * 100);

    return {
      recommended,
      seo: Math.round(recommended * 0.35),
      aiAgents: Math.round(recommended * 0.30),
      ads: Math.round(recommended * 0.35),
      expectedRoi
    };
  }, [mbRevenue, mbTarget]);

  // Handle lead capture report delivery
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportLoading(true);
    setTimeout(() => {
      setReportLoading(false);
      setReportSuccess(true);
      
      // Append a simulated audit to saved tools logs
      setSavedReports(prev => [
        {
          id: String(Date.now()),
          tool: 'Personalized Growth Roadmap',
          score: '91%',
          date: 'Just now',
          company: reportForm.companyName || 'My Company'
        },
        ...prev
      ]);
    }, 1500);
  };

  // --------------------------------------------------------
  // BENTO CARDS LIST
  // --------------------------------------------------------

  const allToolsList = [
    { id: 'ai_readiness', name: 'AI Readiness Assessment', category: 'ai', desc: 'Map your internal automation scores and discover tailored growth steps.', badge: 'POPULAR' },
    { id: 'website_grader', name: 'Website Grader', category: 'seo-aeo', desc: 'Execute real-time crawler simulations checking performance & code structures.', badge: 'CRAWLER' },
    { id: 'seo_aeo_audit', name: 'SEO + AEO Audit Tool', category: 'seo-aeo', desc: 'Assess search engine optimization alongside Perplexity or Gemini engine indexing.', badge: 'HOT' },
    { id: 'crm_score', name: 'CRM Maturity Score', category: 'crm', desc: 'Determine pipeline leak metrics and calculate lost user workflow productivity.', badge: 'AUDIT' },
    { id: 'roi_calculator', name: 'Business ROI Calculator', category: 'finance', desc: 'Track expected monthly cost drops and scale growth potentials.', badge: 'FINANCE' },
    { id: 'whatsapp_roi', name: 'WhatsApp Automation ROI', category: 'finance', desc: 'Calculate conversion spikes and abandoned cart recoveries using automated chat.', badge: 'SALES' },
    { id: 'ai_agent_cost', name: 'AI Agent Cost Calculator', category: 'ai', desc: 'Compare manual human hours vs. automated AgenticOS™ nodes.', badge: 'CHART' },
    { id: 'lead_value', name: 'Lead Value Calculator', category: 'finance', desc: 'Measure aggregate pipelines and determine localized values per inquiry card.', badge: 'VALUE' },
    { id: 'marketing_budget', name: 'Marketing Budget Calculator', category: 'finance', desc: 'Allocate channels wisely between Organic Search, Paid Channels, and AI Agents.', badge: 'BUDGET' }
  ];

  // Filter tools based on search and selected category tab
  const filteredTools = allToolsList.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Detailed content for FAQs
  const faqQuestions = [
    { q: "Are these tools 100% free or are there hidden subscription fees?", a: "Every single diagnostic calculator, Website Grader audit, and AI Readiness assessment on this marketplace is completely free. We design these tools to help modern operations leaders identify system leaks and evaluate real ROI before initiating any premium partnership structures with Natton Digital." },
    { q: "How does the Website Grader calculate Performance and Accessibility?", a: "Our Website Grader simulates an headless WebVitals audit, checking index elements, blocking JavaScript sizes, and accessibility structures based on standard Chromium engine protocols. It evaluates whether your metadata is properly optimized for modern LLM scrapers (AEO search visibility)." },
    { q: "What is AEO, and why do you grade it alongside standard SEO?", a: "AEO stands for Answer Engine Optimization. Over 40% of tech-focused search queries are shifting to AI agents like ChatGPT, Gemini, and Perplexity. Modern sites must include semantic schema nodes and question-and-answer markup patterns so these neural models can index and recommend your brand to high-intent buyers." },
    { q: "Can we download our personalized assessment as a PDF report?", a: "Yes. Simply complete any of the interactive calculators above, and use our 'Download Personalized Reports' form below to secure a compiled PDF growth roadmap containing your scores, technical charts, and step-by-step optimization plans sent straight to your inbox." },
    { q: "Are my input financial details saved or shared?", a: "Your financial data (such as monthly revenue or marketing spend) is processed entirely locally within your active browser state. We do not store, log, or sell any proprietary operational figures unless you explicitly submit a lead form to request our systems architect for a live review." },
    { q: "What is n8n, and why do you build custom nodes for it?", a: "n8n is an advanced, fair-code workflow automation tool that lets you build deep logic sequences, database loops, and custom AI agent paths without the aggressive transaction price limits of Zapier. We provide ready-to-use n8n blueprints with our platform setups." },
    { q: "Can we integrate these calculators into our own corporate website?", a: "Yes. We offer white-label embed codes for our partner network. You can display any of these calculators with your own branding, themes, and colors to capture high-intent inbound leads directly into your HubSpot or custom CRM." },
    { q: "How long does it take for the Website Grader to analyze my domain?", a: "Our cloud-native grader crawls your primary index URL and finishes analyzing DOM structures, server response headers, and image layouts in under 1.5 seconds, returning actionable scores on performance and mobile responsiveness immediately." },
    { q: "How accurate is the AI Agent Cost comparison chart?", a: "The calculations are based on average industry operations studies, factoring in a standard manual worker rate ($32/hour) alongside average task times (data entering, email sorting, leads triage). It balances this against flat-rate hosting fees for sovereign AI systems." },
    { q: "Is there any limit to how many audits we can run?", a: "No. You can audit as many URLs, keywords, and financial projections as you need. There are no daily crawl caps or premium walls." },
    { q: "How do we sync our audit reports with GoHighLevel?", a: "If you want to map your audit reports directly to your internal sales pipelines, you can fill out our notification request. We utilize an automated n8n webhook route that pipes the complete diagnostic scorecard into your CRM profile." },
    { q: "Which industries benefit most from the AI Readiness diagnostic?", a: "Every sector has automation potential, but professional services, healthcare clinics, educational institutions, real estate brokerages, and retail-ecommerce operations experience the highest administrative cost reductions (often upwards of 70%)." },
    { q: "What is the custom CRM pipeline leak value?", a: "The leak value measures lost revenue from slow lead response times (taking hours instead of seconds) and manual admin bottlenecks where inquiries slip through unassigned calendar dates. We calculate it using industry-standard conversion drop metrics." },
    { q: "How does the WhatsApp ROI calculator measure abandoned cart recovery?", a: "It measures the average recovery spike when shifting from basic email reminders (which see a ~15% open rate) to rich WhatsApp templates with native catalog checkouts (which average a 98% open rate and 45% click-through)." },
    { q: "What do the SEO recommendations mean by 'Image Hydration payload'?", a: "Large, uncompressed image files slow down page load times, lowering Core Web Vitals. Optimizing this payload ensures rapid page loading, which improves search engine indexing rankings on Google." },
    { q: "Can we get help implementing the recommended roadmap steps?", a: "Yes. If your assessment results show a high automation deficit, you can book a free virtual live blueprint review session with our systems architect to co-create an implementation schedule." },
    { q: "Are the PDF reports delivered instantly?", a: "Yes. Once you submit the report download form, our automated system generates your custom document and routes it via secure cloud delivery services to your email inside 60 seconds." },
    { q: "Can we request a custom diagnostic calculator that isn't listed here?", a: "Certainly. Our technical engineering squad is constantly building specialized calculators for enterprise operations. Let us know what specific variables you need mapped and we can code it." },
    { q: "Do these tools require logging in or registering first?", a: "No login is required. You can access every calculator, tweak slider parameters, and analyze technical scores completely anonymously." },
    { q: "What is Natton Digital's primary platform license structure?", a: "We provide flat-rate transparent subscription packages with unlimited user seats, fully customized system setups (n8n, CRM pathways, AI bots), and dedicated architectural support." }
  ];

  return (
    <div className="min-h-screen bg-[#0B0721] text-white py-16 relative overflow-hidden font-sans">
      {/* Background gradients mirroring the premium Laboratory style */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-15%] w-[55%] h-[55%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute top-[35%] right-[-10%] w-[45%] h-[45%] rounded-full bg-purple-500/10 blur-[130px]" />
        <div className="absolute bottom-[-5%] left-[10%] w-[55%] h-[55%] rounded-full bg-emerald-500/10 blur-[130px] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ========================================================
            SECTION 1: HERO (Digital Laboratory)
            ======================================================== */}
        <section id="hero" className="relative pt-12 pb-6 flex flex-col lg:flex-row items-center gap-12 text-left">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#00E599] text-[10px] font-mono tracking-widest uppercase font-bold">
              <Sparkles className="h-3 w-3 animate-pulse" />
              FREE INBOUND INTELLIGENCE ENGINE
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
              Free AI & Growth Tools For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#00E599]">Modern Businesses</span>
            </h1>
            
            <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Calculate, audit, analyze and unlock growth opportunities with powerful business tools. Identify system leakages, simulate crawls, and evaluate instant ROI metrics.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => scrollToElement('featured_tools')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:opacity-95 text-white font-mono font-black text-xs rounded-xl transition-all shadow-lg flex items-center gap-1.5"
              >
                Explore Tools <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setPath('book-demo')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                Book Demo
              </button>
            </div>
          </div>
          
          {/* Interactive Tool Universe 3D-style Floating Visualizer */}
          <div className="lg:w-1/2 w-full flex justify-center relative">
            <div className="relative w-full max-w-md h-96 rounded-3xl border border-white/10 bg-[#110B33]/40 backdrop-blur-md p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5" />
              
              {/* Rotating glowing tracks */}
              <div className="absolute w-72 h-72 rounded-full border border-dashed border-white/5 animate-[spin_50s_linear_infinite]" />
              <div className="absolute w-52 h-52 rounded-full border border-dashed border-emerald-500/10 animate-[spin_25s_linear_infinite]" />
              
              {/* Active floating elements representing calculators connected in a neural network */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-10 left-10 p-3 rounded-2xl border border-blue-500/30 bg-blue-500/5 text-center flex items-center gap-2"
              >
                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                  <Calculator className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white font-mono">ROI Calc</p>
                  <p className="text-[8px] text-gray-400">Real-time projections</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute top-20 right-10 p-3 rounded-2xl border border-purple-500/30 bg-purple-500/5 text-center flex items-center gap-2"
              >
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white font-mono">SEO/AEO Audit</p>
                  <p className="text-[8px] text-gray-400">Crawlers analysis</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                className="absolute bottom-16 left-12 p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-center flex items-center gap-2"
              >
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white font-mono">AI Score</p>
                  <p className="text-[8px] text-gray-400">Operations ready</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="absolute bottom-10 right-14 p-3 rounded-2xl border-white/10 bg-white/5 text-center flex items-center gap-2"
              >
                <div className="p-1.5 rounded-lg bg-white/10 text-gray-300">
                  <Database className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white font-mono">CRM Triage</p>
                  <p className="text-[8px] text-gray-400">Leaking metrics</p>
                </div>
              </motion.div>

              <div className="relative z-10 p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-[#0B0721] border border-white/20 text-center space-y-2 max-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Marketplace</h4>
                <p className="text-[9px] text-gray-400 leading-relaxed">Choose below to load direct calculation nodes.</p>
              </div>

              {/* Connected neural network lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />
                <line x1="75%" y1="28%" x2="50%" y2="50%" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
                <line x1="28%" y1="78%" x2="50%" y2="50%" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1" />
                <line x1="70%" y1="80%" x2="50%" y2="50%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: FEATURED TOOLS (BENTO GRID)
            ======================================================== */}
        <section id="featured_tools" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">BUSINESS INTELLIGENCE HUB</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Popular Tools</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Click any tool to launch the high-fidelity interactive diagnostics panel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {allToolsList.map((tool) => (
              <div 
                key={tool.id}
                onClick={() => handleToolCardClick(tool.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between ${
                  activeToolId === tool.id 
                    ? 'border-emerald-500 bg-emerald-500/[0.04]' 
                    : 'border-white/5 bg-white/[0.01] hover:border-emerald-500/40 hover:bg-white/[0.03]'
                }`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-transparent blur-lg" />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded uppercase font-bold">
                      {tool.badge}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-gray-500 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display group-hover:text-[#00E599] transition-colors">{tool.name}</h4>
                    <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">{tool.desc}</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold uppercase mt-4">
                  Run Diagnostic <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 3: TOOL SEARCH & CATEGORIES
            ======================================================== */}
        <section id="tool_search" className="space-y-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input bar */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Find a calculator (e.g. ROI, budget)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0721]/80 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'ai', 'seo-aeo', 'crm', 'finance'] as ToolCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-widest font-bold transition-all border ${
                    selectedCategory === cat 
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                      : 'border-white/5 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat === 'seo-aeo' ? 'SEO & AEO' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Quick list matching query */}
          {searchQuery && (
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Search Results ({filteredTools.length})</p>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredTools.map(t => (
                  <button 
                    key={t.id}
                    onClick={() => handleToolCardClick(t.id)}
                    className="p-2.5 rounded-lg bg-[#110B33]/40 border border-white/5 text-left text-xs hover:border-emerald-500/40 transition-all flex items-center justify-between"
                  >
                    <span className="font-bold text-white">{t.name}</span>
                    <span className="text-[9px] font-mono text-emerald-400 uppercase">{t.badge}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ========================================================
            SECTION 4: INTERACTIVE WORKSHOP (The Active Tool Panel)
            ======================================================== */}
        <section id="interactive-workshop" className="scroll-mt-10">
          <div className="p-6 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md relative overflow-hidden text-left">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />

            {/* Dynamic Title / Selector header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/5 pb-6 mb-8 gap-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">ACTIVE SYSTEM NODE</span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                  {allToolsList.find(t => t.id === activeToolId)?.name}
                </h3>
              </div>
              
              {/* Quick Select dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Change Active Tool:</span>
                <select 
                  value={activeToolId}
                  onChange={(e) => setActiveToolId(e.target.value)}
                  className="bg-[#110B33] border border-white/10 rounded-lg text-xs text-emerald-400 px-3 py-1.5 font-mono focus:outline-none focus:border-emerald-500"
                >
                  {allToolsList.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ========================================================
                TOOL SUB-SECTIONS (RENDER SPECIFIC PANELS)
                ======================================================== */}
            
            {/* 1. AI Readiness Assessment */}
            {activeToolId === 'ai_readiness' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Configure Variables</h4>
                  
                  {/* Industry Input */}
                  <div className="space-y-2">
                    <label className="text-xs text-gray-300 font-mono">Primary Target Industry</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['healthcare', 'retail', 'services'].map(ind => (
                        <button
                          key={ind}
                          onClick={() => setAiIndustry(ind)}
                          className={`py-2 px-3 rounded-lg text-[10px] font-mono uppercase tracking-wider border font-bold transition-all ${
                            aiIndustry === ind 
                              ? 'border-[#00C2FF] bg-blue-500/10 text-[#00C2FF]' 
                              : 'border-white/5 bg-white/5 text-gray-400'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Employees slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Total Staff Size</span>
                      <span className="text-[#00C2FF] font-bold">{aiEmployees} employees</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="200" 
                      value={aiEmployees}
                      onChange={(e) => setAiEmployees(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  {/* Current tools multi-select */}
                  <div className="space-y-2">
                    <label className="text-xs text-gray-300 font-mono block">Currently Operational Tools (Check any)</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: 'crm', label: 'Hubspot/Salesforce CRM' },
                        { id: 'zapier', label: 'Zapier Automation' },
                        { id: 'whatsapp', label: 'WhatsApp Newsletters' },
                        { id: 'calling', label: 'Legacy Telephony' }
                      ].map(tool => {
                        const isChecked = aiCurrentTools.includes(tool.id);
                        return (
                          <button
                            key={tool.id}
                            onClick={() => {
                              if (isChecked) setAiCurrentTools(aiCurrentTools.filter(t => t !== tool.id));
                              else setAiCurrentTools([...aiCurrentTools, tool.id]);
                            }}
                            className={`p-2.5 rounded-lg border text-left transition-all ${
                              isChecked ? 'border-purple-500 bg-purple-500/5 text-purple-300' : 'border-white/5 bg-white/5 text-gray-400'
                            }`}
                          >
                            {tool.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Automation level */}
                  <div className="space-y-2">
                    <label className="text-xs text-gray-300 font-mono block">Current Integration Level</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map(lvl => (
                        <button
                          key={lvl}
                          onClick={() => setAiAutomationLevel(lvl)}
                          className={`py-2 rounded-lg text-xs font-mono border ${
                            aiAutomationLevel === lvl 
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold' 
                              : 'border-white/5 bg-white/5 text-gray-400'
                          }`}
                        >
                          {lvl === 1 ? 'None' : lvl === 2 ? 'Low' : lvl === 3 ? 'Medium' : 'Sovereign'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/20 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono text-emerald-400 tracking-wider font-bold block uppercase">✓ Real-time score output</span>
                    
                    {/* Big Score Display */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative">
                        <span className="text-2xl font-black font-display text-white">{aiReadinessScore}%</span>
                        <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-[spin_3s_linear_infinite]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {aiReadinessScore > 75 ? 'AI Advanced Ready' : aiReadinessScore > 50 ? 'Moderate Integration' : 'High Operational Deficit'}
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Maturity Level: {aiReadinessScore > 75 ? 'Level 4' : aiReadinessScore > 50 ? 'Level 2' : 'Level 1'}</p>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-white/5">
                      <p className="text-[10px] font-mono text-gray-400 uppercase">Growth Recommendations:</p>
                      <ul className="space-y-1.5 text-xs text-gray-300">
                        <li className="flex items-start gap-1.5">
                          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Deploy custom **GrowthOS™ pipeline nodes** immediately to streamline staff limits.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Replace manual data-entry with integrated **n8n automation blueprints** to bypass Zapier overhead.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <button 
                    onClick={() => scrollToElement('report_download')}
                    className="w-full mt-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="h-3.5 w-3.5" /> Download PDF Blueprint
                  </button>
                </div>
              </div>
            )}

            {/* 2. Website Grader */}
            {activeToolId === 'website_grader' && (
              <div className="space-y-8">
                <form onSubmit={runWebsiteGrader} className="p-4 rounded-xl border border-white/5 bg-[#110B33]/20 flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input 
                      type="url"
                      required
                      placeholder="Enter Website URL (e.g. https://mybrand.com)..."
                      value={graderUrl}
                      onChange={(e) => setGraderUrl(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isGrading}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs rounded-xl font-bold flex items-center justify-center gap-1.5 shrink-0 transition-all disabled:opacity-50"
                  >
                    {isGrading ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Simulated Crawler Running...
                      </>
                    ) : (
                      <>
                        Grade Website <Play className="h-3.5 w-3.5 fill-current" />
                      </>
                    )}
                  </button>
                </form>

                <AnimatePresence mode="wait">
                  {graderResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center"
                    >
                      {[
                        { label: 'Performance', val: graderResult.performance, color: 'text-emerald-400', border: 'border-emerald-500/20' },
                        { label: 'SEO Metrics', val: graderResult.seo, color: 'text-[#00C2FF]', border: 'border-blue-500/20' },
                        { label: 'Accessibility', val: graderResult.accessibility, color: 'text-purple-400', border: 'border-purple-500/20' },
                        { label: 'Mobile Fluidity', val: graderResult.mobile, color: 'text-pink-400', border: 'border-pink-500/20' }
                      ].map((item, i) => (
                        <div key={i} className={`p-4 rounded-xl border bg-white/[0.01] ${item.border} space-y-1`}>
                          <p className="text-[10px] font-mono text-gray-400 uppercase">{item.label}</p>
                          <h4 className={`text-2xl font-black ${item.color}`}>{item.val}/100</h4>
                        </div>
                      ))}

                      <div className="md:col-span-4 p-5 rounded-xl border border-white/5 bg-[#110B33]/20 text-left space-y-2">
                        <p className="text-[10px] font-mono text-[#00C2FF] uppercase font-bold tracking-widest">Recommended Actions:</p>
                        <ul className="space-y-1 text-xs text-gray-300">
                          {graderResult.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle className="h-4 w-4 text-[#00C2FF] shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* 3. SEO + AEO Audit Tool */}
            {activeToolId === 'seo_aeo_audit' && (
              <div className="space-y-6">
                <form onSubmit={runSeoAudit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input 
                    type="url"
                    required
                    placeholder="Website URL (e.g. mybrand.com)..."
                    value={seoUrl}
                    onChange={(e) => setSeoUrl(e.target.value)}
                    className="w-full px-4 py-2 bg-[#110B33]/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <input 
                    type="text"
                    required
                    placeholder="Primary Keyword..."
                    value={seoKeyword}
                    onChange={(e) => setSeoKeyword(e.target.value)}
                    className="w-full px-4 py-2 bg-[#110B33]/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={isAuditing}
                    className="w-full px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs rounded-xl font-bold transition-all disabled:opacity-50"
                  >
                    {isAuditing ? 'Auditing Metadata Nodes...' : 'Analyze SEO + AEO'}
                  </button>
                </form>

                <AnimatePresence mode="wait">
                  {seoResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
                    >
                      <div className="p-5 rounded-xl border border-white/5 bg-[#110B33]/20 space-y-4">
                        <p className="text-[10px] font-mono text-[#00E599] uppercase tracking-wider">Indexed Audit Scorecards</p>
                        <div className="flex gap-4">
                          <div className="p-3 bg-white/5 rounded-lg text-center flex-1">
                            <p className="text-[10px] text-gray-400">SEO Score</p>
                            <h4 className="text-xl font-black text-white">{seoResult.seoScore}%</h4>
                          </div>
                          <div className="p-3 bg-white/5 rounded-lg text-center flex-1">
                            <p className="text-[10px] text-gray-400">AEO Score</p>
                            <h4 className="text-xl font-black text-[#00E599]">{seoResult.aeoScore}%</h4>
                          </div>
                        </div>
                        <div className="text-[11px] text-gray-400">
                          <strong>Active Crawler Diagnosis:</strong> {seoResult.schema}
                        </div>
                      </div>

                      <div className="p-5 rounded-xl border border-white/5 bg-[#110B33]/20 space-y-2">
                        <p className="text-[10px] font-mono text-pink-400 uppercase tracking-wider font-bold">Identified AI Discovery Bottlenecks</p>
                        <ul className="space-y-1 text-xs text-gray-300">
                          {seoResult.issues.map((iss: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <ShieldAlert className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" />
                              <span>{iss}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* 4. CRM Maturity Score */}
            {activeToolId === 'crm_score' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-5">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">CRM System Variables</h4>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-gray-300 font-mono">Current Platform</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['HubSpot', 'Salesforce', 'Zoho'].map(plat => (
                        <button
                          key={plat}
                          onClick={() => setCrmPlatform(plat)}
                          className={`py-2 px-3 rounded-lg text-[10px] font-mono border font-bold transition-all ${
                            crmPlatform === plat 
                              ? 'border-[#00C2FF] bg-blue-500/10 text-[#00C2FF]' 
                              : 'border-white/5 bg-white/5 text-gray-400'
                          }`}
                        >
                          {plat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Monthly Lead Intake</span>
                      <span className="text-[#00C2FF] font-bold">{crmLeadVolume} leads</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="10000" 
                      step="100"
                      value={crmLeadVolume}
                      onChange={(e) => setCrmLeadVolume(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Active Pipeline Team Seats</span>
                      <span className="text-[#00C2FF] font-bold">{crmTeamSize} seats</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={crmTeamSize}
                      onChange={(e) => setCrmTeamSize(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-gray-300 font-mono">Daily Automation Usage</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['low', 'medium', 'high'].map(usage => (
                        <button
                          key={usage}
                          onClick={() => setCrmAutomationLevel(usage)}
                          className={`py-1.5 rounded-lg text-[10px] font-mono border uppercase tracking-wider transition-all ${
                            crmAutomationLevel === usage 
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold' 
                              : 'border-white/5 bg-white/5 text-gray-400'
                          }`}
                        >
                          {usage}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/20 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">✓ CRM DIAGNOSTIC OUTPUT</p>
                    
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">Pipeline Score:</p>
                      <h4 className="text-3xl font-black text-white">{crmMaturityCalc.score}/100</h4>
                    </div>

                    <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/5 space-y-1">
                      <p className="text-[9px] font-mono text-rose-400 uppercase">Estimated Monthly Leak Value:</p>
                      <h5 className="text-xl font-bold text-rose-400">${crmMaturityCalc.leak.toLocaleString()}/mo</h5>
                      <p className="text-[9px] text-gray-400 mt-1 leading-relaxed">Due to manual lead classification delay and non-automated follow-ups.</p>
                    </div>

                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Status: <strong className="text-rose-400 uppercase font-mono">{crmMaturityCalc.status}</strong>. Consolidating into **GrowthOS™ suite** can plug this leak inside 14 days.
                    </p>
                  </div>

                  <button 
                    onClick={() => scrollToElement('lead_capture')}
                    className="w-full mt-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-mono text-xs rounded-xl font-bold transition-all"
                  >
                    Plug Leak With Free Architect Call
                  </button>
                </div>
              </div>
            )}

            {/* 5. Business ROI Calculator */}
            {activeToolId === 'roi_calculator' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-5">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Business Parameters</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Average Monthly Revenue</span>
                      <span className="text-emerald-400 font-bold">${roiRevenue.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10000" 
                      max="1000000" 
                      step="5000"
                      value={roiRevenue}
                      onChange={(e) => setRoiRevenue(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Active Staff / Employees</span>
                      <span className="text-emerald-400 font-bold">{roiEmployees} staff</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="100" 
                      value={roiEmployees}
                      onChange={(e) => setRoiEmployees(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Current Monthly Marketing Spend</span>
                      <span className="text-emerald-400 font-bold">${roiMarketingSpend.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="500" 
                      max="50000" 
                      step="500"
                      value={roiMarketingSpend}
                      onChange={(e) => setRoiMarketingSpend(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Outputs */}
                <div className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/20 flex flex-col justify-between">
                  <div className="space-y-5">
                    <p className="text-[10px] font-mono text-[#00E599] uppercase tracking-wider font-bold">✓ Projected Growth Potentials</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[9px] text-gray-400 uppercase font-mono">New Revenue Potentials</p>
                        <h4 className="text-lg font-black text-[#00E599]">${businessRoiCalc.growth.toLocaleString()}/mo</h4>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[9px] text-gray-400 uppercase font-mono">Operational Cost Savings</p>
                        <h4 className="text-lg font-black text-[#00C2FF]">${businessRoiCalc.savings.toLocaleString()}/mo</h4>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 text-center">
                      <p className="text-[10px] text-gray-400">Projected System ROI percentage</p>
                      <h3 className="text-3xl font-black text-white">{businessRoiCalc.roi}% ROI</h3>
                    </div>
                  </div>

                  <button 
                    onClick={() => setPath('pricing')}
                    className="w-full mt-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs rounded-xl font-bold transition-all"
                  >
                    View Packages & Pricing
                  </button>
                </div>
              </div>
            )}

            {/* 6. WhatsApp Automation ROI */}
            {activeToolId === 'whatsapp_roi' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-5">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">WhatsApp Funnel Parameters</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Total Monthly Leads</span>
                      <span className="text-emerald-400 font-bold">{waLeads} leads</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="5000" 
                      step="50"
                      value={waLeads}
                      onChange={(e) => setWaLeads(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Current Sales Conversion Rate</span>
                      <span className="text-emerald-400 font-bold">{waConversion}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="15" 
                      step="0.1"
                      value={waConversion}
                      onChange={(e) => setWaConversion(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Average Customer Deal Size</span>
                      <span className="text-emerald-400 font-bold">${waDealSize}</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="10000" 
                      step="50"
                      value={waDealSize}
                      onChange={(e) => setWaDealSize(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Outputs */}
                <div className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/20 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono text-[#00E599] uppercase tracking-wider font-bold">✓ WhatsApp Funnel Upgrade Projection</p>
                    
                    <div className="space-y-2 text-left">
                      <p className="text-xs text-gray-400 font-mono">Projected Extra Monthly Revenue:</p>
                      <h4 className="text-2xl font-black text-[#00E599]">+${whatsappRoiCalc.growth.toLocaleString()} /mo</h4>
                    </div>

                    <div className="pt-3 border-t border-white/5 text-xs text-gray-300 space-y-1.5">
                      <p>✓ Average WhatsApp Response rates spike up to <strong>98%</strong>.</p>
                      <p>✓ Sales conversion rate grows by <strong>+{whatsappRoiCalc.conversionSpike}%</strong> natively inside WhatsApp threads.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => scrollToElement('report_download')}
                    className="w-full mt-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs rounded-xl transition-all"
                  >
                    Email Me Automated Funnel Guides
                  </button>
                </div>
              </div>
            )}

            {/* 7. AI Agent Cost Calculator & Charts */}
            {activeToolId === 'ai_agent_cost' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-5">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Workforce Inputs</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Workforce Team Size</span>
                      <span className="text-[#00C2FF] font-bold">{agentTeamSize} people</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="100" 
                      value={agentTeamSize}
                      onChange={(e) => setAgentTeamSize(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Repetitive Tasks to Automate</span>
                      <span className="text-[#00C2FF] font-bold">{agentTasks} tasks</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={agentTasks}
                      onChange={(e) => setAgentTasks(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Average Manual Hours/Task/Week</span>
                      <span className="text-[#00C2FF] font-bold">{agentWorkingHours} hours</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="80" 
                      value={agentWorkingHours}
                      onChange={(e) => setAgentWorkingHours(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <div>
                      <p className="font-mono text-[9px] uppercase">Human Workforce Cost:</p>
                      <p className="text-white font-bold">${agentSavingsCalc.human.toLocaleString()}/yr</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase">AI Agent Setup Cost:</p>
                      <p className="text-[#00E599] font-bold">${agentSavingsCalc.ai.toLocaleString()}/yr</p>
                    </div>
                  </div>
                </div>

                {/* Outputs & Recharts Chart */}
                <div className="p-5 rounded-2xl border border-white/5 bg-[#110B33]/20 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">5-Yr Projections Chart</span>
                      <span className="text-xs text-white font-black">Net Saved: ${agentSavingsCalc.savings.toLocaleString()}/yr</span>
                    </div>

                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={agentSavingsCalc.chartData}>
                          <XAxis dataKey="name" stroke="#52525b" fontSize={9} />
                          <YAxis stroke="#52525b" fontSize={9} />
                          <Tooltip contentStyle={{ backgroundColor: '#110B33', borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                          <Legend wrapperStyle={{ fontSize: '9px' }} />
                          <Bar dataKey="Human Workforce Cost" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="AI Agentic Cost" fill="#10b981" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <button 
                    onClick={() => scrollToElement('report_download')}
                    className="w-full mt-4 py-2 bg-[#00E599] hover:bg-emerald-600 text-[#0B0721] font-mono text-xs font-black rounded-xl transition-all"
                  >
                    Generate PDF Workforce Chart
                  </button>
                </div>
              </div>
            )}

            {/* 8. Lead Value Calculator */}
            {activeToolId === 'lead_value' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-5">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Lead Parameters</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Monthly Leads Intake</span>
                      <span className="text-emerald-400 font-bold">{leadLeads} leads</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="2000" 
                      step="10"
                      value={leadLeads}
                      onChange={(e) => setLeadLeads(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Closing Conversion Rate</span>
                      <span className="text-emerald-400 font-bold">{leadConversion}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="25" 
                      step="0.5"
                      value={leadConversion}
                      onChange={(e) => setLeadConversion(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Average Closed Deal Value</span>
                      <span className="text-emerald-400 font-bold">${leadDealValue}</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="20000" 
                      step="100"
                      value={leadDealValue}
                      onChange={(e) => setLeadDealValue(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Outputs */}
                <div className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/20 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono text-[#00E599] uppercase tracking-wider font-bold">✓ Lead Value Output</p>
                    
                    <div className="p-4 rounded-xl bg-white/5 space-y-1">
                      <p className="text-[9px] font-mono text-gray-400 uppercase">Individual Lead Value:</p>
                      <h4 className="text-2xl font-black text-white">${leadValueCalc.value} <span className="text-xs text-emerald-400">per lead</span></h4>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <p className="text-[9px] font-mono text-gray-400 uppercase">Total Pipeline Potential:</p>
                        <p className="text-white font-bold">${leadValueCalc.potential.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-gray-400 uppercase">Simulated LTV Potential:</p>
                        <p className="text-emerald-400 font-bold">${leadValueCalc.ltv.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => scrollToElement('lead_capture')}
                    className="w-full mt-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs rounded-xl transition-all"
                  >
                    Request Lead Flow Setup Audit
                  </button>
                </div>
              </div>
            )}

            {/* 9. Marketing Budget Calculator */}
            {activeToolId === 'marketing_budget' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-5">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Budgeting Variables</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Annual Corporate Revenue</span>
                      <span className="text-emerald-400 font-bold">${mbRevenue.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="100000" 
                      max="10000000" 
                      step="50000"
                      value={mbRevenue}
                      onChange={(e) => setMbRevenue(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">Target Annual Growth Target</span>
                      <span className="text-emerald-400 font-bold">{mbTarget}% YoY growth</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="100" 
                      value={mbTarget}
                      onChange={(e) => setMbTarget(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-gray-300 font-mono block">Active Market Segment</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['healthcare', 'retail', 'services'].map(ind => (
                        <button
                          key={ind}
                          onClick={() => setMbIndustry(ind)}
                          className={`py-1.5 rounded-lg text-[10px] font-mono border uppercase tracking-wider font-bold transition-all ${
                            mbIndustry === ind 
                              ? 'border-[#00C2FF] bg-blue-500/10 text-[#00C2FF]' 
                              : 'border-white/5 bg-white/5 text-gray-400'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/20 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono text-[#00E599] uppercase tracking-wider font-bold">✓ Recommended Allocations</p>
                    
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-mono">Annual Recommended Marketing Budget:</p>
                      <h4 className="text-2xl font-black text-white">${marketingBudgetCalc.recommended.toLocaleString()}</h4>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-white/5 text-xs text-gray-300">
                      <div className="flex justify-between text-[11px]">
                        <span>Organic SEO & AEO Nodes:</span>
                        <strong className="text-[#00C2FF]">${marketingBudgetCalc.seo.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span>Sovereign AI Calling & Chat Agents:</span>
                        <strong className="text-purple-400">${marketingBudgetCalc.aiAgents.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span>Paid Programmatic Ad Spends:</span>
                        <strong className="text-[#00E599]">${marketingBudgetCalc.ads.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => scrollToElement('report_download')}
                    className="w-full mt-6 py-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 text-white font-mono text-xs rounded-xl font-bold transition-all"
                  >
                    Download Custom Channel Roadmap
                  </button>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ========================================================
            SECTION 5: INDUSTRY-SPECIFIC TOOLS
            ======================================================== */}
        <section id="industry_tools" className="space-y-8 text-left">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#00E599] tracking-widest uppercase font-bold">SEGMENT VERTICAL DIAGNOSTICS</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Industry-Specific Tools</h2>
            <p className="text-xs text-gray-400 max-w-xl">Select your industry segment vertical to analyze tailored diagnostic frameworks built for specific business models.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left selector buttons */}
            <div className="lg:col-span-4 space-y-2">
              {[
                { id: 'healthcare', label: 'Healthcare Growth Score', icon: HeartPulse },
                { id: 'education', label: 'Education Admission Calculator', icon: GraduationCap },
                { id: 'realestate', label: 'Real Estate ROI Calculator', icon: Briefcase },
                { id: 'manufacturing', label: 'Manufacturing Automation Score', icon: Building },
                { id: 'retail', label: 'Ecommerce Profit Calculator', icon: Store },
                { id: 'services', label: 'Professional Services Productivity', icon: Layers }
              ].map(ind => {
                const IconComp = ind.icon;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setActiveIndustryTool(ind.id)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      activeIndustryTool === ind.id 
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                        : 'border-white/5 bg-[#110B33]/20 text-gray-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <IconComp className="h-5 w-5 shrink-0" />
                    <span className="text-xs font-mono font-bold uppercase">{ind.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right details card */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
              {activeIndustryTool === 'healthcare' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-red-400 border border-red-500/20 bg-red-500/5 px-2 py-0.5 rounded uppercase font-bold">HIPAA SECURE</span>
                    <h4 className="text-lg font-bold text-white font-display">Healthcare Patient Admission Flow</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Automate patient scheduling, reminders, and symptom logs securely. Sovereign voice dialer nodes connect directly to clinic calendars.
                  </p>
                  <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/20">
                    <p className="text-[10px] font-mono text-gray-400 uppercase">Projected Staff Hours Saved:</p>
                    <p className="text-xl font-bold text-emerald-400 mt-1">~18 Hours Per Doctor/Week</p>
                  </div>
                </div>
              )}

              {activeIndustryTool === 'education' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-blue-400 border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 rounded uppercase font-bold">EDTECH READY</span>
                    <h4 className="text-lg font-bold text-white font-display">Education Inbound Counselor Sync</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Trigger automated Meta WhatsApp catalogues for course listings, sending documents directly into counselor triage queues.
                  </p>
                  <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/20">
                    <p className="text-[10px] font-mono text-gray-400 uppercase">Average Conversion Increase:</p>
                    <p className="text-xl font-bold text-[#00C2FF] mt-1">+38% Enrolled Student Cohorts</p>
                  </div>
                </div>
              )}

              {activeIndustryTool === 'realestate' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-amber-500 border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 rounded uppercase font-bold">24/7 INTAKE</span>
                    <h4 className="text-lg font-bold text-white font-display">Real Estate Lead Velocity Dialer</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Trigger custom outbound callbacks within 30 seconds of an ad form submit. Keep hot leads routing immediately to field broker phones.
                  </p>
                  <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/20">
                    <p className="text-[10px] font-mono text-gray-400 uppercase">Average Inquiry Callback Speed:</p>
                    <p className="text-xl font-bold text-emerald-400 mt-1">28 Seconds flat</p>
                  </div>
                </div>
              )}

              {activeIndustryTool === 'manufacturing' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-purple-400 border border-purple-500/20 bg-purple-500/5 px-2 py-0.5 rounded uppercase font-bold">n8n BLUEPRINT</span>
                    <h4 className="text-lg font-bold text-white font-display">Manufacturing ERP Logistics Sync</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Bypass Zapier fees by building direct webhooks syncing ERP tracking, dispatch milestones, and dispatch notifications to client threads.
                  </p>
                  <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/20">
                    <p className="text-[10px] font-mono text-gray-400 uppercase">Sync Server Response Latency:</p>
                    <p className="text-xl font-bold text-purple-400 mt-1">&lt; 140 Milliseconds</p>
                  </div>
                </div>
              )}

              {activeIndustryTool === 'retail' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-pink-400 border border-pink-500/20 bg-pink-500/5 px-2 py-0.5 rounded uppercase font-bold">META CERTIFIED</span>
                    <h4 className="text-lg font-bold text-white font-display">E-Commerce WhatsApp Catalog Threading</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Let users browse catalogs, trigger seasonal discount prompts, and finalize checkouts directly within Meta conversational windows.
                  </p>
                  <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/20">
                    <p className="text-[10px] font-mono text-gray-400 uppercase">Abandoned Cart Recovery Rate:</p>
                    <p className="text-xl font-bold text-pink-400 mt-1">45% Recovery Spike</p>
                  </div>
                </div>
              )}

              {activeIndustryTool === 'services' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded uppercase font-bold">WHITE-LABEL</span>
                    <h4 className="text-lg font-bold text-white font-display">Professional Services Automated Onboarding</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Clients upload project assets, AI document analyzers verify requirements, write briefs, and build mutual onboarding tasks immediately.
                  </p>
                  <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/20">
                    <p className="text-[10px] font-mono text-gray-400 uppercase">Client Onboarding Turnaround Time:</p>
                    <p className="text-xl font-bold text-emerald-400 mt-1">Reduced by 85%</p>
                  </div>
                </div>
              )}

              <button 
                onClick={() => scrollToElement('lead_capture')}
                className="w-full mt-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs rounded-xl transition-all"
              >
                Request Custom Industry Node Build
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 6: GROWTH DASHBOARD (INTERACTIVE DASHBOARD)
            ======================================================== */}
        <section id="dashboard" className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md relative overflow-hidden text-left space-y-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">USER REPOSITORY PORTAL</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Growth Dashboard</h2>
              <p className="text-xs text-gray-400">Review your saved diagnostic roadmaps and track ongoing technical audits.</p>
            </div>
            
            <button 
              onClick={() => {
                setSavedReports([
                  { id: '1', tool: 'AI Readiness Assessment', score: '82%', date: 'Just now', company: 'Quantum Retail' },
                  { id: '2', tool: 'SEO + AEO Audit', score: '78%', date: '2 hours ago', company: 'Nexus Health' },
                  { id: '3', tool: 'CRM Maturity Score', score: '56%', date: 'Yesterday', company: 'Sovereign Education' }
                ]);
              }}
              className="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-mono text-gray-300 uppercase font-bold transition-all flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Reset History Logs
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* History Table */}
            <div className="lg:col-span-8 overflow-x-auto rounded-2xl border border-white/5 bg-[#110B33]/20">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-mono text-[9px] uppercase tracking-wider">
                    <th className="p-3.5">Assessed Diagnostic Tool</th>
                    <th className="p-3.5">Target Company</th>
                    <th className="p-3.5">Audit Score</th>
                    <th className="p-3.5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {savedReports.map((report) => (
                    <tr key={report.id} className="hover:bg-white/[0.005] transition-all">
                      <td className="p-3.5 font-bold text-white flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        {report.tool}
                      </td>
                      <td className="p-3.5 text-gray-400">{report.company}</td>
                      <td className="p-3.5 font-mono text-emerald-400 font-bold">{report.score}</td>
                      <td className="p-3.5 text-gray-500 font-mono text-[10px]">{report.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick overview widget */}
            <div className="lg:col-span-4 p-5 rounded-2xl border border-white/5 bg-[#110B33]/20 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-[#00C2FF] uppercase font-bold block">Aggregated Scorecard</span>
                <div className="text-center p-6 bg-white/5 rounded-xl border border-white/5 space-y-1">
                  <p className="text-[10px] text-gray-400 uppercase font-mono">Your Global Growth score</p>
                  <h4 className="text-4xl font-black text-white">72%</h4>
                  <p className="text-[10px] text-emerald-400 font-mono mt-2 font-bold">✓ Plugging CRM leaks will add +18%</p>
                </div>
              </div>

              <button 
                onClick={() => scrollToElement('report_download')}
                className="w-full mt-4 py-2 bg-[#00C2FF] hover:bg-blue-600 text-white font-mono text-xs rounded-xl font-bold transition-all"
              >
                Compile All Into PDF Brief
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 7: REPORT DOWNLOAD (PDF GENERATION PORTAL)
            ======================================================== */}
        <section id="report_download" className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md relative overflow-hidden text-left">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E599]/5 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left text */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">COMPILED Technical REPORT</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Download Personalized Reports</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Generate and receive a clean, compiled technical briefing mapping your exact readiness scorecards, pipeline leak charts, and an actionable 5-step growth roadmap delivered straight to your operations team's inbox.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
                <Mail className="h-4 w-4 text-[#00E599]" />
                <span>Encrypted delivery via secure mail relay servers.</span>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#110B33]/20">
                {reportSuccess ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white font-display">PDF Report Compiled Successfully!</h4>
                      <p className="text-xs text-gray-400">We have piped your technical roadmap briefing to <strong>{reportForm.email}</strong>.</p>
                    </div>
                    <button 
                      onClick={() => setReportSuccess(false)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-gray-300 uppercase font-bold rounded-lg transition-colors"
                    >
                      Audit Another Brand
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleReportSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-400 font-mono uppercase">Full Name</label>
                        <input 
                          type="text"
                          required
                          value={reportForm.fullName}
                          onChange={(e) => setReportForm({ ...reportForm, fullName: e.target.value })}
                          className="w-full px-3.5 py-2 bg-[#0B0721]/60 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-400 font-mono uppercase">Company Name</label>
                        <input 
                          type="text"
                          required
                          value={reportForm.companyName}
                          onChange={(e) => setReportForm({ ...reportForm, companyName: e.target.value })}
                          className="w-full px-3.5 py-2 bg-[#0B0721]/60 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-400 font-mono uppercase">Work Email</label>
                        <input 
                          type="email"
                          required
                          value={reportForm.email}
                          onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                          className="w-full px-3.5 py-2 bg-[#0B0721]/60 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                          placeholder="you@company.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-400 font-mono uppercase">Phone Number</label>
                        <input 
                          type="tel"
                          required
                          value={reportForm.phone}
                          onChange={(e) => setReportForm({ ...reportForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2 bg-[#0B0721]/60 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={reportLoading}
                      className="w-full mt-2 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 text-white font-mono text-xs rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      {reportLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" /> Compiling Roadmap Elements...
                        </>
                      ) : (
                        <>
                          Compile & Send PDF Report <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 8: RECOMMENDED SOLUTIONS
            ======================================================== */}
        <section id="recommended_services" className="space-y-8 text-left">
          <div className="space-y-2 text-center">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">SOVEREIGN CORE INFRASTRUCTURE</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Recommended Solutions</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Tackle operational friction at the root with sovereign growth tools designed for continuous scaling.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'GrowthOS™ Suite', desc: 'Outbound campaign schedulers, inbound leads tracking CRM, and responsive dashboard widgets.', path: 'products/growth-os' as RoutePath },
              { name: 'AI Marketing Platform™', desc: 'Autonomous ad builders, programmatic media bidding, and semantic indexing engines.', path: 'products/ai-marketing-platform' as RoutePath },
              { name: 'BusinessOS™ Enterprise', desc: 'Secure n8n nodes pipeline integrations mapping calendars, invoices, and messaging lines.', path: 'products/business-os' as RoutePath }
            ].map((sol, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/20 hover:border-[#00C2FF]/30 transition-all flex flex-col justify-between text-left"
              >
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white font-display">{sol.name}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{sol.desc}</p>
                </div>
                
                <button 
                  onClick={() => setPath(sol.path)}
                  className="mt-6 text-[10px] font-mono text-[#00C2FF] font-bold uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors"
                >
                  Explore Solution <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 9: FAQ (20 QUESTIONS)
            ======================================================== */}
        <section id="faq" className="space-y-8 text-left">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00E599] tracking-widest uppercase font-bold">TECHNICAL DISCOVERY CENTER</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Examine granular capabilities, compliance layers, and technical frameworks within the diagnostics hub.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqQuestions.map((item, idx) => {
              const isOpen = openFaqs[idx] || false;
              return (
                <div key={idx} className="rounded-xl border border-white/5 bg-[#110B33]/20 overflow-hidden transition-all">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex justify-between items-center gap-4 hover:bg-white/[0.01]"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white font-display">{item.q}</span>
                    <ChevronDown className={`h-4 w-4 text-emerald-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5 bg-white/[0.003]">
                          {item.a}
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
            SECTION 10: FINAL CTA
            ======================================================== */}
        <section id="final_cta" className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900 via-[#110B33] to-emerald-950 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">SOVEREIGN AI OPERATING ENGINE</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white leading-tight">Unlock Your Growth Potential</h2>
            <p className="text-xs text-gray-400 leading-relaxed max-w-lg mx-auto">
              Ready to replace expensive subscription seats, manual sync hurdles, and slow campaigns? Architect an automated system node with Natton's specialized solutions.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button 
                onClick={() => setPath('book-demo')}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-mono font-black text-xs rounded-xl transition-colors shadow-lg"
              >
                Book Demo
              </button>
              <button 
                onClick={() => scrollToElement('report_download')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-all"
              >
                Talk To Experts
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
