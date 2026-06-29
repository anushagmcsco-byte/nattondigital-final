import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Briefcase, TrendingUp, Search, CheckCircle, ArrowRight, Play, Zap, Star, MessageSquare, Users, Globe, 
  ChevronRight, Check, HelpCircle, ChevronDown, ChevronUp, Send, Sliders, DollarSign, Plus, RefreshCw, Clock, Phone, 
  Shield, Lock, X, Activity, Database, Mail, FileText, CheckCheck, Settings, ArrowUpRight, BarChart3, PieChart, 
  Share2, History, Network, Calendar, Award, Heart, Gift, MessageCircle, FileCheck, Layers, BookOpen, Fingerprint
} from 'lucide-react';
import { RoutePath } from '../types';

export default function IndustryProfessionalServices({ setPath, darkMode }: { setPath: (path: RoutePath) => void; darkMode: boolean }) {
  useEffect(() => {
    document.title = "AI Solutions for Consultants, Agencies, Law Firms & Professional Services | Natton Digital";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ==========================================
  // PREMIUM BUSINESS NETWORK CANVAS BACKGROUND (Navy, Silver, Violet)
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 650;
    };
    window.addEventListener('resize', handleResize);

    const nodes: Array<{ x: number; y: number; vx: number; vy: number; label: string; pulse: number; type: 'crm' | 'ai' | 'calendar' | 'proposal' | 'node' }> = [];
    const labels = ['GrowthOS™ CRM', 'Lead Agent', 'Scheduling Engine', 'Proposal Bot', 'Stripe Gateway'];
    const types: ('crm' | 'ai' | 'calendar' | 'proposal' | 'node')[] = ['crm', 'ai', 'calendar', 'proposal', 'node'];

    for (let i = 0; i < 18; i++) {
      const isCore = i < 5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        label: isCore ? labels[i] : `Terminal_Sec_${400 + i}`,
        pulse: Math.random() * Math.PI,
        type: isCore ? types[i] : 'node'
      });
    }

    const packets: Array<{ from: number; to: number; progress: number; speed: number; color: string }> = [];
    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      let to = (from + 1) % nodes.length;
      let minDist = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === from) continue;
        const d = Math.hypot(nodes[from].x - nodes[i].x, nodes[from].y - nodes[i].y);
        if (d < minDist && d < 260) {
          minDist = d;
          to = i;
        }
      }
      packets.push({
        from,
        to,
        progress: 0,
        speed: 0.003 + Math.random() * 0.006,
        color: Math.random() > 0.5 ? '#8b5cf6' : '#3b82f6' // Violet or Navy Blue
      });
    };

    for (let i = 0; i < 8; i++) spawnPacket();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Delicate silver background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 90;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Render links
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 240) {
            const alpha = (1 - d / 240) * 0.1;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Render flowing packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(i, 1);
          if (packets.length < 12) spawnPacket();
          continue;
        }
        const start = nodes[p.from];
        const end = nodes[p.to];
        if (start && end) {
          const px = start.x + (end.x - start.x) * p.progress;
          const py = start.y + (end.y - start.y) * p.progress;
          ctx.fillStyle = p.color;
          ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2); ctx.fill();
        }
      }

      // Render nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        n.pulse += 0.015;
        const pulseSize = Math.sin(n.pulse) * 3;
        const isCore = labels.includes(n.label);

        ctx.fillStyle = n.type === 'ai' ? '#8b5cf6' : (n.type === 'crm' ? '#3b82f6' : '#64748b');
        ctx.beginPath();
        ctx.arc(n.x, n.y, isCore ? 5.5 : 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = n.type === 'ai' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(59, 130, 246, 0.25)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, (isCore ? 10 : 6) + pulseSize, 0, Math.PI * 2);
        ctx.stroke();

        if (isCore && width > 640) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '500 9px monospace';
          ctx.fillText(n.label, n.x + 14, n.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ==========================================
  // DATA AND SECTIONS
  // ==========================================
  const segments = [
    { title: 'Consultants', desc: 'Custom pipeline setups, automated intake scorecards, and scheduling bots matching expert availability.' },
    { title: 'Digital Agencies', desc: 'Sync client onboarding, manage multiple lead intake pipelines, and auto-generate complex service proposals.' },
    { title: 'CA Firms', desc: 'Strict regulatory document request triggers, instant client query resolution, and structured tax year reminders.' },
    { title: 'Law Firms', desc: 'Secure client intake workflows, automated consultation appointment logs, and encrypted digital agreement storage.' },
    { title: 'Architects', desc: 'Visual catalog delivery sequences over WhatsApp, high-value quotation estimations, and stage payment reminders.' },
    { title: 'Interior Designers', desc: 'Interactive style assessment quizzes, material catalog distribution, and client feedback logging.' },
    { title: 'Coaches', desc: 'Calendar scheduling links, course delivery trackers, multi-stage email nurture sequences, and payment reminders.' },
    { title: 'Business Advisors', desc: 'Confidential lead qualifiers, executive scheduling pipelines, and auto-updating lifetime value analytics.' }
  ];

  const painPoints = [
    { title: 'Low Lead Generation', desc: 'Unoptimized websites causing potential premium clients to bounce before booking.', solution: 'AI-infused custom landing pages with smart scoring widgets.' },
    { title: 'Manual Follow-Ups', desc: 'Chasing leads takes up to 4 hours of daily counselor/sales admin hours.', solution: 'Autonomous email/WhatsApp sequence flows dispatched instantly.' },
    { title: 'Missed Appointments', desc: 'High no-show rates for qualified consultations, wasting advisor schedules.', solution: 'Multi-stage automated reminder sequences via Voice & text.' },
    { title: 'Proposal Delays', desc: 'Taking 24-48 hours to draft a proposal allows clients to sign with competitors.', solution: 'Dynamic proposal generator assembling custom PDF contracts in 3 clicks.' },
    { title: 'Poor Client Communication', desc: 'Disconnected client check-ins cause confusion and drop-offs.', solution: 'GrowthOS™ CRM unifying all conversations into a shared inbox.' },
    { title: 'Operational Inefficiencies', desc: 'Staff spent manually setting up Slack, Shared Drive, and invoices on contract sign.', solution: 'n8n autonomous workflows linking Stripe and Google Drive.' },
    { title: 'Lead Leakage', desc: 'Dropped inquiries due to slow replies during non-office hours or weekends.', solution: '24/7 AI answering agents engaging and qualifying leads under 60 seconds.' },
    { title: 'Slow Growth', desc: 'No clear visibility into sales conversion rates, source metrics, or pipeline status.', solution: 'Centralized Revenue Intelligence dashboard with active forecasting.' }
  ];

  // BLUEPRINT FUNNEL (10 Steps)
  const [activeBlueprintStep, setActiveBlueprintStep] = useState(0);
  const blueprintSteps = [
    { name: '01. High-Performance Website', val: 'Fast & Secure', desc: 'Enterprise-grade website styled with modern Inter/Space typography, fully responsive, and optimized for speed.' },
    { name: '02. SEO & AEO Strategy', val: 'Answer Engines', desc: 'Configuring schema structures and FAQ layers to dominate organic AI engine recommendations (ChatGPT, Perplexity).' },
    { name: '03. Laser-Targeted Google Ads', val: 'High-Intent Clicks', desc: 'Hyper-focused search ad groups pointing direct intent searches to dedicated case-study pre-sales funnels.' },
    { name: '04. Multi-Channel Lead Capture', val: 'Forms & Bots', desc: 'Smart, responsive intake forms evaluating business size, challenges, and budget before routing.' },
    { name: '05. Consolidated GrowthOS™ CRM', val: 'Single Source', desc: 'Instant profile creation tracking the initial referral click, company size, and conversation thread.' },
    { name: '06. Seamless WhatsApp Triggers', val: 'Immediate Reply', desc: 'Automatically dispatching personalized welcome packets and capability decks via WhatsApp API.' },
    { name: '07. Smart AI Calling Qualification', val: 'Outbound Bot', desc: 'Autonomous VoIP dialer qualifying the lead, scheduling consultations, and setting CRM tags.' },
    { name: '08. Appointment Booking Loop', val: '1-Click Booking', desc: 'Synchronized live calendar booking links that dynamically reflect counselor blockouts.' },
    { name: '09. Digital Proposal Dispatch', val: 'Auto-Contract', desc: 'Immediate proposal generation with integrated digital signature links and secure payment routes.' },
    { name: '10. Automated Client Acquisition', val: 'Frictionless Close', desc: 'Payment confirmation triggers auto-creation of a Shared Google Drive, Client Slack Channel, and CRM Close stamp.' }
  ];

  // AI GROWTH MARKETING
  const [mktTab, setMktTab] = useState<'google' | 'linkedin' | 'seo'>('google');
  const marketingData = {
    google: {
      clicks: '3,840',
      cac: '₹220',
      roas: '5.4x',
      leads: [
        { source: 'Consulting Intent', budget: '₹60,000', conversions: '18%', cpa: '₹340' },
        { source: 'Corporate Law Query', budget: '₹40,000', conversions: '14%', cpa: '₹290' },
        { source: 'D2C Agency Scale', budget: '₹50,000', conversions: '22%', cpa: '₹210' }
      ]
    },
    linkedin: {
      clicks: '1,420',
      cac: '₹410',
      roas: '4.8x',
      leads: [
        { source: 'Enterprise Advisory', budget: '₹80,000', conversions: '11%', cpa: '₹720' },
        { source: 'CA Advisory Mumbai', budget: '₹35,000', conversions: '15%', cpa: '₹460' },
        { source: 'Real Estate Architecture', budget: '₹45,000', conversions: '16%', cpa: '₹510' }
      ]
    },
    seo: {
      clicks: '8,900',
      cac: 'Organic',
      roas: 'Infinite',
      leads: [
        { source: 'AI Consulting India', budget: 'Organic SEO', conversions: '28%', cpa: 'Free' },
        { source: 'CA Onboarding Checklist', budget: 'Organic SEO', conversions: '31%', cpa: 'Free' },
        { source: 'Law Firm Retainer Costs', budget: 'Organic SEO', conversions: '24%', cpa: 'Free' }
      ]
    }
  };

  // AGENTICOS™ Cards
  const [activeAgent, setActiveAgent] = useState('qualification');
  const agenticOsCards = [
    { id: 'qualification', name: 'Lead Qualification Agent', desc: 'Interrogates web leads via structured forms or instant text, validating team sizes, challenges, and budgets.' },
    { id: 'appointment', name: 'Appointment Scheduling Agent', desc: 'Interacts with prospects on WhatsApp or Email, cross-referencing staff calendars to lock discovery calls.' },
    { id: 'proposal', name: 'Smart Proposal Drafting Agent', desc: 'Reads client requirements logs, retrieves pricing template structures, and builds custom scope PDF documents.' },
    { id: 'support', name: 'Client Support Agent', desc: 'Instantly processes retainer queries, invoicing adjustments, scheduling adjustments, or project checklist updates.' },
    { id: 'knowledge', name: 'Internal Knowledge Agent', desc: 'Operates as a high-speed RAG-based search engine over internal PDFs, past contracts, and SOP libraries.' },
    { id: 'executive', name: 'Executive Assistant Agent', desc: 'Drafts calendar summaries, organizes task cards in GrowthOS™, and handles draft follow-up templates.' }
  ];

  // APPOINTMENT AUTOMATION (Stateful Calendar)
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [bookedState, setBookedState] = useState(false);
  const availableSlots = ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

  // KNOWLEDGE BASE (Interactive doc search)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const handleDocSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const lower = searchQuery.toLowerCase();
    if (lower.includes('invoice') || lower.includes('billing')) {
      setSearchResult('Found in SOP_Billing_v2.pdf: Standard retainers are billed on the 1st of every month via Stripe Auto-pay, with a grace period of 5 calendar days.');
    } else if (lower.includes('agreement') || lower.includes('contract')) {
      setSearchResult('Found in Law_Agreement_Template.docx: Standard intellectual property clause transfers full ownership to the client upon receipt of the final project milestone payment.');
    } else if (lower.includes('onboard')) {
      setSearchResult('Found in SOP_Onboarding_Agency.pdf: Trigger Slack invite, share Google Drive parent directory, and register contact on GoHighLevel pipeline on Stripe payment confirmed.');
    } else {
      setSearchResult('No local document matched. Querying RAG vector database... Standard professional services parameters retrieved from general onboarding logs.');
    }
  };

  // AUTOMATION WORKFLOWS (React Flow Visual representation)
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const workflowsList = [
    { name: 'Lead Acquisition Track', steps: ['Inbound Ad Click', 'Smart Intake Form', 'GrowthOS CRM Profile Created', 'Auto WhatsApp deck sent', 'AI Qualification Call'] },
    { name: 'Meeting Booking Sequence', steps: ['Inbound Qualified Tag', 'Appointment Agent WhatsApp Check', 'Calendar Slot Secured', 'Google Meet Link Generated', '24h/1h Reminders Triggers'] },
    { name: 'Proposal & Onboarding Track', steps: ['Discovery Call Finished', 'Proposal Bot draft', 'Stripe payment finalized', 'Digital Agreement Signed', 'Shared Workspace provisioned'] },
    { name: 'Client Support Automation', steps: ['Inbound client query', 'RAG database lookup', 'AI response formulated', 'Draft queued for human admin approve', 'Response dispatched via WhatsApp'] }
  ];

  // REVENUE INTELLIGENCE DASHBOARD (Active metric switcher)
  const [activeDashboardTab, setActiveDashboardTab] = useState<'leads' | 'appointments' | 'proposals' | 'revenue'>('leads');
  const dashboardStats = {
    leads: { val: '1,482', pct: '+28.4%', desc: 'Inbound high-value professional leads tracked and qualified.', points: [110, 150, 130, 180, 240, 290] },
    appointments: { val: '412', pct: '+34.2%', desc: 'Confirmed expert discovery meetings scheduled automatically.', points: [60, 85, 75, 110, 140, 175] },
    proposals: { val: '184', pct: '+41.8%', desc: 'Customized client proposals generated, sent, and signed.', points: [20, 42, 38, 55, 72, 92] },
    revenue: { val: '₹34,80,000', pct: '+22.6%', desc: 'Monthly recurring contract values managed and tracked.', points: [150, 210, 190, 260, 310, 348] }
  };

  // ROI CALCULATOR
  const [monthlyLeads, setMonthlyLeads] = useState(300);
  const [projectVal, setProjectVal] = useState(150000); // ₹1.5 Lakh avg project
  const [currentConv, setCurrentConv] = useState(4); // 4% conversion
  const [teamSize, setTeamSize] = useState(6);

  // ROI calculations
  const currentDeals = Math.round(monthlyLeads * (currentConv / 100));
  const currentRevenue = currentDeals * projectVal;

  // Natton Digital optimizations boost conversions by ~2.5x (capped at 15%)
  const optimizedConv = Math.min(15, currentConv * 2.2);
  const expectedDeals = Math.round(monthlyLeads * (optimizedConv / 100));
  const expectedRevenue = expectedDeals * projectVal;
  const addedRevenue = expectedRevenue - currentRevenue;

  // Time saved estimation: 15 hours saved per team member per week
  const monthlyHoursSaved = teamSize * 15 * 4;
  const financialProductivityGain = monthlyHoursSaved * 1200; // Valued at ₹1,200/hr

  const totalMonthlyGain = addedRevenue + financialProductivityGain;

  // CASE STUDIES CAROUSEL
  const [caseIdx, setCaseIdx] = useState(0);
  const successCases = [
    {
      segment: 'Consulting Firm',
      name: 'StratEdge Global Advisors',
      metric: '280% Appointment Jump',
      impact: 'Implemented a WhatsApp qualification agent and live schedule booking loop, eliminating double bookings.',
      results: [
        { title: 'Inbound Qualified Leads', before: '42/mo', after: '118/mo' },
        { title: 'No-Show Rate', before: '32%', after: '4%' },
        { title: 'Monthly Revenue Increase', before: '₹8.5 Lakh', after: '₹24.8 Lakh' }
      ]
    },
    {
      segment: 'CA Practice',
      name: 'Khanna & Associates CA',
      metric: 'Saved 140 Admin Hours/Mo',
      impact: 'Set up autonomous checklist dispatchers and document secure upload folders synchronized directly to GDrive.',
      results: [
        { title: 'Tax Onboarding speed', before: '14 days', after: '2 days' },
        { title: 'Internal Admin Staff Hours', before: '180h/mo', after: '40h/mo' },
        { title: 'Active Retainers Managed', before: '45 clients', after: '110 clients' }
      ]
    },
    {
      segment: 'Law Firm',
      name: 'LexVanguard Partners',
      metric: '3x Proposal Closing Rate',
      impact: 'Added an automated PDF contract drafter that delivers complex custom agreements within 5 minutes of call completion.',
      results: [
        { title: 'Contract Prep Duration', before: '48 hours', after: '3 minutes' },
        { title: 'Client Win Conversions', before: '14%', after: '42%' },
        { title: 'Attributed Revenue Growth', before: '—', after: '₹14.2 Lakh/mo' }
      ]
    },
    {
      segment: 'Digital Agency',
      name: 'PixelCraft Creative',
      metric: '5.4x Lead Form ROI',
      impact: 'Integrated multi-stage Google Search Ads and instant WhatsApp capabilities deck dispatch webhook.',
      results: [
        { title: 'Ad Conversion Rate', before: '1.8%', after: '4.8%' },
        { title: 'Time to First Response', before: '6 hours', after: '42 seconds' },
        { title: 'Average Invoice Value', before: '₹1.8 Lakh', after: '₹3.2 Lakh' }
      ]
    }
  ];

  // FAQ LIST (15 items)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const faqs = [
    { q: 'How does the automated proposal generator work?', a: 'Once a discovery meeting finishes, our AI parses call logs and client inputs to select a verified Google Doc template, compiles standard billing terms, and converts it to a clean PDF with secure digital signature tags in under 5 minutes.' },
    { q: 'Can we integrate this with our active law or accounting portals?', a: 'Absolutely. We configure zero-data-loss API links into top systems like Clio, MyCase, Zoho, HubSpot, Tally, and Zoho Books.' },
    { q: 'What is the standard setup time for the AI Growth system?', a: 'Core components (website, Lead CRM, booking scheduler) typically go live in 5-7 working days. More complex custom agentic RAG integrations require 14 days.' },
    { q: 'Is client information securely guarded in the CRM?', a: 'Yes. We utilize enterprise-grade TLS 1.3 encryption and fully secure Firestore database configurations complying with SOC2 standards.' },
    { q: 'Does AI Calling support Indian accents and local languages?', a: 'Yes. Our advanced voice synthesize systems support multiple Indian accents in English, Hindi, Tamil, Telugu, and Kannada, maintaining natural speech pauses.' },
    { q: 'Will the AI scheduler double-book my consultants?', a: 'No. The appointment bot cross-references live Google Calendar or Outlook configurations in real-time, only showing genuine unoccupied blocks.' },
    { q: 'Can we build custom scoring rules for incoming leads?', a: 'Yes. You can instruct the CRM to filter leads based on employee size, country, annual budget registers, or urgency score cards.' },
    { q: 'What webhooks do you use to connect systems?', a: 'We utilize n8n or Make server nodes to trigger seamless API webhooks connecting forms, CRM pipelines, Stripe payments, Slack channels, and Shared Drives.' },
    { q: 'Can we edit the AI knowledge base documents ourselves?', a: 'Yes. GrowthOS™ includes an intuitive document upload panel where you can drag and drop updated PDF SOPs, FAQs, and price charts instantly.' },
    { q: 'How do you handle client onboarding after stripe payments?', a: 'A successful payment logs on our n8n webhook, which instantly creates a secure client folder in Google Drive, triggers a customized Slack invite email, and schedules the onboarding call.' },
    { q: 'Does the system require professional developers to maintain?', a: 'No. Our entire platform is engineered to be fully no-code manageable, backed by visual guidelines and continuous team training.' },
    { q: 'Can we run cold email outreach sequences inside the CRM?', a: 'Yes, fully. The CRM supports cold prospecting templates, click tracking, auto-replies, and sender reputation rotation configurations.' },
    { q: 'How are duplicate contact records managed?', a: 'Our engine identifies duplicates by matching email domains, telephone digits, and company registers, merging threads into a unified view.' },
    { q: 'Is there a limit to the number of concurrent AI agents we can run?', a: 'No, our platform allows you to spin up specialized task agents for distinct business functions without additional licensing limits.' },
    { q: 'What is the contract duration for Natton Digital partnerships?', a: 'We work on flexible month-to-month consulting retainers or discounted annual commitment structures based on your growth targets.' }
  ];

  // LEAD CONSULTATION FORM STATE
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formType, setFormType] = useState('Consultant');
  const [formCountry, setFormCountry] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLeads, setFormLeads] = useState('10 - 50');
  const [formChallenges, setFormChallenges] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [captchaVal, setCaptchaVal] = useState('');
  const [captchaNums, setCaptchaNums] = useState({ num1: 4, num2: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    setCaptchaNums({
      num1: Math.floor(Math.random() * 8) + 2,
      num2: Math.floor(Math.random() * 8) + 2
    });
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaVal) !== (captchaNums.num1 + captchaNums.num2)) {
      alert('Verification captcha code is incorrect. Please compute again.');
      return;
    }
    setIsSubmitting(true);
    setTerminalLogs([
      '⚡ Intercepting Professional Services lead payload...',
      '📡 Mapping parameters to GoHighLevel API registers...',
      '🔗 Routing n8n webhook node pipeline...',
      '📦 Provisioning GrowthOS target records...'
    ]);

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        '📊 Synchronization verified. Recorded CRM Lead ID: GHL_PROF_7290',
        '💬 Automated welcome case-study packet scheduled.'
      ]);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
    }, 1800);
  };

  return (
    <div className="bg-[#040614] text-slate-200 min-h-screen py-8 overflow-hidden relative selection:bg-purple-600 selection:text-white">
      
      {/* Dynamic radial atmosphere blur backgrounds - Navy, Silver, Violet */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] left-0 w-[600px] h-[600px] bg-purple-950/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-5 right-20 w-[650px] h-[650px] bg-slate-900/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-xs font-mono text-slate-500 flex items-center gap-1.5 border-b border-slate-900 pb-4">
          <button onClick={() => setPath('home')} className="hover:text-purple-400 transition-colors">Home</button> 
          <span>/</span> 
          <span className="text-slate-400">Industries</span> 
          <span>/</span> 
          <span className="text-[#8b5cf6] font-semibold font-mono">Professional Services</span>
        </div>

        {/* ==========================================
            HERO SECTION
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 relative min-h-[580px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden -z-20 border border-blue-950/40 bg-slate-950/70">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-95" />
          </div>

          <div className="lg:col-span-7 space-y-6 z-10 p-6 sm:p-10 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-blue-400 font-bold">
                Premium AI Consulting Integration Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight text-white">
              AI-Powered Growth For <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-300 to-slate-400 bg-clip-text text-transparent">
                Professional Services
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-slate-400 max-w-2xl">
              Generate qualified leads, automate client communication, auto-compile custom proposals, and scale service operations using secure RAG systems and n8n-powered CRM webhooks.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#lead_form" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-extrabold rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                Book Free Consultation <ArrowRight className="h-4 w-4 text-white" />
              </a>
              <a 
                href="#blueprint" 
                className="px-6 py-3 rounded-lg border border-slate-800 bg-slate-950/40 hover:bg-slate-900 hover:border-blue-400 transition-all flex items-center gap-2 text-sm font-semibold text-slate-300"
              >
                Explore Growth Blueprint
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 text-[10px] font-mono text-slate-500 border-t border-slate-900">
              <span className="flex items-center gap-1.5 text-blue-400">● HubSpot & Stripe Verified</span>
              <span className="flex items-center gap-1.5 text-purple-400">● 24/7 Voice Qualification Booking</span>
              <span className="flex items-center gap-1.5 text-slate-400">● Encrypted Document Storage</span>
            </div>
          </div>

          {/* Interactive 3D Business Ecosystem HUD */}
          <div className="lg:col-span-5 p-1 relative min-h-[420px] z-10 text-left">
            <div className="h-full w-full rounded-2xl border border-blue-900/30 bg-slate-950/80 backdrop-blur-md p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
              <div>
                <div className="flex justify-between items-center border-b border-blue-900/20 pb-2.5 mb-4">
                  <span className="text-[10px] font-mono uppercase text-blue-400 flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 animate-pulse text-blue-400" /> Professional Services Ecosystem
                  </span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold">MONITOR ACTIVE</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                  Visual monitoring showing real-time client acquisition streams connecting CRM pipelines, auto-scheduling agents, and proposal logs.
                </p>
              </div>

              {/* Dynamic Interactive Flow Simulation */}
              <div className="space-y-3 bg-blue-950/10 rounded-xl border border-blue-950/20 p-4 relative z-10">
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 border-b border-blue-950/20 pb-1">
                  <span>LIVE CRM CONVERSION STREAM</span>
                  <span className="text-emerald-400">99.98% AUTO-PIPELINE STATUS</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-slate-950 border border-blue-950/50">
                    <span className="text-blue-400 block text-[9px] uppercase">Smart Intake Form</span>
                    <span className="text-slate-300 font-semibold truncate block">Lead Captured (11 Staff)</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-blue-950/50">
                    <span className="text-purple-400 block text-[9px] uppercase">Voice Dialer Agent</span>
                    <span className="text-slate-300 font-semibold truncate block">Qualified: Match Score 94%</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-blue-950/50">
                    <span className="text-emerald-400 block text-[9px] uppercase">Stripe Invoice</span>
                    <span className="text-slate-300 font-semibold truncate block">Retainer payment verified</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-blue-950/50">
                    <span className="text-amber-400 block text-[9px] uppercase">n8n Node Provision</span>
                    <span className="text-slate-300 font-semibold truncate block">Slack & Drive provisioned</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-blue-400" /> Secure Protocol</span>
                  <span className="text-blue-400 font-bold">HubSpot Sync Active</span>
                </div>
              </div>

              {/* Inspiration list */}
              <div className="mt-4 p-3 rounded-lg bg-blue-950/5 border border-blue-900/15">
                <h4 className="text-xs font-bold text-slate-200 font-display flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                  Enterprise Operational Standard
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Design layouts engineered to reflect the seamless operational frameworks used by HubSpot, Stripe, McKinsey, and Salesforce.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SEGMENTS Section: "Solutions Built For"
           ========================================== */}
        <div id="segments" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Solutions Built For</span>
            <h2 className="text-3xl font-bold font-display text-white">Target Service Divisions</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Our automated setups are custom-configured to accommodate the unique requirements of diverse professional offices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {segments.map((seg, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-blue-950/30 bg-blue-950/5 hover:border-blue-500/30 transition-all hover:translate-y-[-2px] flex flex-col justify-between group">
                <div>
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-500/20">
                    <Briefcase className="h-4 w-4 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 mb-1.5 font-display">{seg.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{seg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            PAIN POINTS Section: "Challenges We Solve"
           ========================================== */}
        <div id="pain_points" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-[#8b5cf6] uppercase tracking-widest font-bold">Friction Points</span>
            <h2 className="text-3xl font-bold font-display text-white">Business Challenges We Solve</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              How Natton Digital replaces manual admin, slow response times, and proposal bottlenecks with high-converting automated systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {painPoints.map((p, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-blue-950/30 bg-slate-950/30 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 h-1 w-0 bg-blue-500 transition-all group-hover:w-full" />
                <div>
                  <h3 className="text-xs font-bold text-slate-200 mb-3 border-b border-blue-950/20 pb-1.5 flex items-center gap-1.5 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    {p.title}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[8px] font-mono text-rose-400 uppercase tracking-wider block">Symptom</span>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-wider block">Natton Resolution</span>
                      <p className="text-[10px] text-slate-300 mt-0.5 font-medium leading-relaxed">{p.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            GROWTH BLUEPRINT (INTERACTIVE FUNNEL)
           ========================================== */}
        <div id="blueprint" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Integrated Funnel</span>
            <h2 className="text-3xl font-bold font-display text-white">Professional Services Growth Blueprint</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Click on any step of the unified growth pipeline to examine the flow from initial traffic click to high-value client acquisition:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-5 space-y-1.5">
              {blueprintSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBlueprintStep(idx)}
                  className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                    activeBlueprintStep === idx 
                      ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-white' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-semibold font-mono">{step.name}</span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${activeBlueprintStep === idx ? 'bg-blue-500 text-white font-bold' : 'bg-slate-900 text-slate-400'}`}>
                    {step.val}
                  </span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[250px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-blue-900/10 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase font-bold">PIPELINE NODE ACTION</span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> STEP {activeBlueprintStep + 1} OF 10
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-display text-white">
                    {blueprintSteps[activeBlueprintStep].name.split('. ')[1]}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {blueprintSteps[activeBlueprintStep].desc}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-blue-900/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Database Sync Status</span>
                <span className="text-blue-400 font-semibold">Active HubSpot/CRM Pipeline Feed</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            AI GROWTH MARKETING & REVENUE DASHBOARD
           ========================================== */}
        <div id="ai_growth_marketing" className="mb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">01 / Lead Capture Suite</span>
            <h2 className="text-3xl font-bold font-display text-white font-sans">Client Acquisition Engine</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unify professional corporate websites, high-conversion SEO structures, and laser-targeted social campaigns into a singular pipeline driving pre-qualified advisory consultations.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {['Professional Websites', 'SEO & AEO Opt', 'Google Search Ads', 'LinkedIn Ads', 'Content Marketing', 'Social Media'].map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/40 flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-blue-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 p-1 bg-gradient-to-r from-blue-500/10 via-violet-500/5 to-transparent rounded-2xl">
            <div className="p-6 rounded-2xl border border-blue-950/40 bg-slate-950/90 shadow-2xl space-y-6">
              
              <div className="flex justify-between items-center border-b border-blue-900/10 pb-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" /> Active Lead Acquisition Monitor
                  </h3>
                  <p className="text-[10px] text-slate-400">Simulating live CPC performance indicators</p>
                </div>
                
                <div className="flex gap-1.5">
                  {(['google', 'linkedin', 'seo'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setMktTab(tab)}
                      className={`px-3 py-1 rounded text-[9px] font-mono font-bold uppercase transition-all ${
                        mktTab === tab 
                          ? 'bg-blue-600 text-white font-bold' 
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* metrics bar */}
              <div className="grid grid-cols-3 gap-4 text-left">
                <div className="p-3 rounded-lg bg-blue-950/5 border border-blue-950/25">
                  <span className="text-[9px] font-mono text-slate-400 block">Total Monthly Visits</span>
                  <span className="text-lg font-extrabold text-white mt-1 block">{marketingData[mktTab].clicks}</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/5 border border-blue-950/25">
                  <span className="text-[9px] font-mono text-slate-400 block">Average CAC cost</span>
                  <span className="text-lg font-extrabold text-white mt-1 block">{marketingData[mktTab].cac}</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/5 border border-blue-950/25">
                  <span className="text-[9px] font-mono text-slate-400 block">Ad-Spend ROAS</span>
                  <span className="text-lg font-extrabold text-white mt-1 block">{marketingData[mktTab].roas}</span>
                </div>
              </div>

              {/* active campaigns logs */}
              <div className="space-y-3 text-left">
                <h4 className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">Acquisition Channels Performance</h4>
                <div className="space-y-2">
                  {marketingData[mktTab].leads.map((lead, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-900 flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-xs">{lead.source}</span>
                      <div className="flex gap-6 text-right">
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">Budget</span>
                          <span className="text-slate-300">{lead.budget}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">Conv. %</span>
                          <span className="text-emerald-400 font-semibold">{lead.conversions}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">CPA Cost</span>
                          <span className="text-blue-400">{lead.cpa}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            GROWTHOS™ FOR PROFESSIONAL SERVICES
           ========================================== */}
        <div id="growthos" className="mb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-7 order-last lg:order-first p-1 bg-gradient-to-l from-blue-500/10 via-violet-500/5 to-transparent rounded-2xl">
            <div className="p-6 rounded-2xl border border-blue-950/40 bg-slate-950/90 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-blue-900/10 pb-3">
                <span className="text-[10px] font-mono uppercase text-blue-400 flex items-center gap-1.5 font-bold">
                  <Database className="h-4 w-4" /> GrowthOS™ CRM Pipelines
                </span>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold">SYNC OK</span>
              </div>

              {/* CRM Lead table simulation */}
              <div className="space-y-2 text-xs font-mono">
                <div className="grid grid-cols-4 text-[9px] text-slate-500 pb-1.5 border-b border-slate-900 uppercase">
                  <span>Client Name</span>
                  <span>Business Type</span>
                  <span>Pipeline Status</span>
                  <span className="text-right">Project Value</span>
                </div>
                
                <div className="grid grid-cols-4 py-2 border-b border-slate-900/40 items-center">
                  <span className="text-white font-semibold truncate">Alok K. Sharma</span>
                  <span className="text-slate-400">CA Firm Mumbai</span>
                  <span><span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[9px] font-bold">Discovery Booked</span></span>
                  <span className="text-right text-slate-300">₹1,80,000</span>
                </div>

                <div className="grid grid-cols-4 py-2 border-b border-slate-900/40 items-center">
                  <span className="text-white font-semibold truncate">Nandita Sen</span>
                  <span className="text-slate-400">Architect Delhi</span>
                  <span><span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 text-[9px] font-bold">Proposal Sent</span></span>
                  <span className="text-right text-slate-300">₹3,50,000</span>
                </div>

                <div className="grid grid-cols-4 py-2 border-b border-slate-900/40 items-center">
                  <span className="text-white font-semibold truncate">Rahul Mehta</span>
                  <span className="text-slate-400">Digital Agency</span>
                  <span><span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[9px] font-bold">Contract Signed</span></span>
                  <span className="text-right text-slate-300">₹2,40,000</span>
                </div>

                <div className="grid grid-cols-4 py-2 items-center">
                  <span className="text-white font-semibold truncate">Priya Chawla</span>
                  <span className="text-slate-400">Law Retainer</span>
                  <span><span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 text-[9px] font-bold">Intake Pending</span></span>
                  <span className="text-right text-slate-300">₹1,20,000</span>
                </div>
              </div>

              <div className="p-3 bg-blue-950/10 rounded-lg border border-blue-950/20 text-[10px] text-slate-400 flex justify-between items-center">
                <span>Active Scheduling Engine Sync</span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">● Synchronized</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-[#8b5cf6] uppercase tracking-widest block font-bold">02 / CRM Portal</span>
            <h2 className="text-3xl font-bold font-display text-white">GrowthOS™ For Professional Services</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consolidate corporate pipeline management, calendar scheduling integrations, contract stage tracking, and client invoicing details into a singular database core.
            </p>

            <div className="space-y-3">
              {['Corporate Lead CRM & Contact Profiles', 'Visual Stage Pipeline Dashboards', 'Calendar Blockout Sync Scheduling', 'Draft Contract Stage Tracking Logs', 'Integrated Retainer Analytics Engine'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            BUSINESSOS™ COMMUNICATION PLATFORM
           ========================================== */}
        <div id="businessos" className="mb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">03 / Omnichannel Inbox</span>
            <h2 className="text-3xl font-bold font-display text-white">BusinessOS™ Communication Platform</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bridge WhatsApp communication, automated text triggers, AI telephony, and team support channels into a single synchronized dashboard.
            </p>

            <div className="space-y-3">
              {['WhatsApp API template campaign broadcasts', 'Cloud VoIP integrations with secure recordings', 'AI Calling bots qualifying prospects 24/7', 'Live website chat widgets routing hot queries', 'Unified team dashboard for customer support'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 p-1 bg-gradient-to-r from-blue-500/10 via-violet-500/5 to-transparent rounded-2xl">
            <div className="p-6 rounded-2xl border border-blue-950/40 bg-slate-950/90 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-blue-900/10 pb-3">
                <span className="text-[10px] font-mono uppercase text-blue-400 flex items-center gap-1.5 font-bold">
                  <MessageSquare className="h-4 w-4" /> Omnichannel Inbox Hub
                </span>
                <span className="text-[9px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-mono font-bold">LIVE AGENT CONNECT</span>
              </div>

              {/* Chat threads simulation */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-blue-950/10 border border-blue-950/25 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-blue-400 font-bold">Alok K. Sharma (WhatsApp)</span>
                    <span>10:42 AM</span>
                  </div>
                  <p className="text-slate-200">"Hey, is it possible to schedule the consultant call for this Thursday at 11 AM?"</p>
                  <p className="text-emerald-400 font-mono text-[9px] italic">Reply: Autologged to GrowthOS Calendar scheduler node.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-900/50 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-purple-400 font-bold">Nandita Sen (Email Retainer)</span>
                    <span>09:15 AM</span>
                  </div>
                  <p className="text-slate-300">"I have finished signing the custom onboarding checklist document. Looking forward to project launch."</p>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-900/10 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Integrated VoIP: Active</span>
                <span className="text-emerald-400 font-bold">Cloud Telephony Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            AGENTICOS™ FOR PROFESSIONAL SERVICES
           ========================================== */}
        <div id="agenticos" className="mb-28 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-[#8b5cf6] uppercase tracking-widest font-bold">AgenticOS™ Core</span>
            <h2 className="text-3xl font-bold font-display text-white">Autonomous Agentic Operations</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Meet our highly trained specialized AI agents operating 24/7 inside your advisory business structure:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-5 space-y-2">
              {agenticOsCards.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgent(agent.id)}
                  className={`w-full p-4 rounded-xl border transition-all text-left ${
                    activeAgent === agent.id 
                      ? 'border-[#8b5cf6] bg-purple-500/5 shadow-[0_0_15px_rgba(139,92,246,0.15)] text-white' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <h3 className="text-xs font-bold font-mono uppercase mb-1">{agent.name}</h3>
                  <p className="text-[10px] text-slate-400 leading-relaxed truncate">{agent.desc}</p>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[300px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-purple-900/10 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase font-bold">AGENT PROFILE & TASK DIRECTIVE</span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> OPERATIONAL
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold font-display text-white">
                    {agenticOsCards.find(a => a.id === activeAgent)?.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {agenticOsCards.find(a => a.id === activeAgent)?.desc}
                  </p>
                  
                  <div className="p-3 bg-purple-950/10 rounded-lg border border-purple-950/20 text-[10px] font-mono">
                    <span className="text-purple-400 block uppercase font-bold mb-1">Standard Node Trigger:</span>
                    <span className="text-slate-400">ON_LEAD_INGESTION -{'>'} qualify_metadata_parameters() AND match_advisor_calendars()</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-purple-900/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>RAG Architecture Link</span>
                <span className="text-[#8b5cf6] font-bold">Autonomous Agent Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            APPOINTMENT AUTOMATION (Stateful Calendar)
           ========================================== */}
        <div id="appointment_automation" className="mb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">04 / Scheduling Optimization</span>
            <h2 className="text-3xl font-bold font-display text-white">Appointment Automation</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eliminate double bookings and hours spent chasing slots. Provide prospects with a highly responsive, synchronized scheduling calendar link, followed by automated reminders via SMS, WhatsApp, and email.
            </p>

            <div className="space-y-3.5">
              {[
                { title: 'Calendar Syncing', desc: 'Direct Outlook and Google Calendar scheduling blocks.' },
                { title: 'Intelligent Reminder Rails', desc: 'Auto-schedules voice or text alerts 24h & 1h prior to meeting.' },
                { title: '1-Click Rescheduling', desc: 'Instantly lets clients modify sessions with zero manual friction.' }
              ].map((f, i) => (
                <div key={i} className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-display">
                    <CheckCircle className="h-4 w-4 text-blue-400" /> {f.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 pl-5">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 p-1 bg-gradient-to-r from-blue-500/10 via-violet-500/5 to-transparent rounded-2xl">
            <div className="p-6 rounded-2xl border border-blue-950/40 bg-slate-950/90 shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-blue-900/10 pb-3">
                <span className="text-[10px] font-mono uppercase text-blue-400 flex items-center gap-1.5 font-bold">
                  <Calendar className="h-4 w-4" /> Live Scheduling Calendar
                </span>
                <span className="text-[9px] text-[#00c2ff] font-mono font-bold">ACTIVE SCHEDULE FEED</span>
              </div>

              {/* Stateful interactive calendar selector */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7 space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase">Select Available Date (June 2026)</span>
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <span key={i} className="text-slate-600 font-bold py-1">{d}</span>
                    ))}
                    {Array.from({ length: 28 }).map((_, i) => {
                      const day = i + 1;
                      const isAvailable = day % 3 === 0 || day % 4 === 0;
                      return (
                        <button
                          key={i}
                          disabled={!isAvailable}
                          onClick={() => {
                            setSelectedDay(day);
                            setBookedState(false);
                          }}
                          className={`py-1.5 rounded transition-all font-bold ${
                            !isAvailable 
                              ? 'text-slate-800 cursor-not-allowed' 
                              : selectedDay === day 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="sm:col-span-5 space-y-3">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Available Slots</span>
                  <div className="space-y-1.5">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedTime(time);
                          setBookedState(false);
                        }}
                        className={`w-full py-2 rounded text-[10px] font-mono font-bold border transition-all ${
                          selectedTime === time 
                            ? 'border-blue-500 bg-blue-500/10 text-white' 
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setBookedState(true)}
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold uppercase transition-all"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>

              {bookedState && (
                <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-semibold font-mono animate-fade-in">
                  ✓ Consultation Slot Secured for June {selectedDay} at {selectedTime}! Dynamic reminder triggers have been initialized.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            PROPOSAL & CLIENT ONBOARDING AUTOMATION
           ========================================== */}
        <div id="proposal_automation" className="mb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-7 p-1 bg-gradient-to-l from-blue-500/10 via-violet-500/5 to-transparent rounded-2xl">
            <div className="p-6 rounded-2xl border border-blue-950/40 bg-slate-950/90 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-blue-900/10 pb-3">
                <span className="text-[10px] font-mono uppercase text-[#8b5cf6] flex items-center gap-1.5 font-bold">
                  <FileCheck className="h-4 w-4" /> Smart Proposal Engine
                </span>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold">COMPILED OK</span>
              </div>

              {/* Proposal document preview */}
              <div className="p-4 rounded-lg bg-slate-950 border border-blue-950/20 text-[11px] font-mono space-y-3">
                <div className="flex justify-between text-[9px] text-slate-500 pb-1.5 border-b border-slate-900">
                  <span>DOCUMENT REF: PROPOSAL_NATT_920</span>
                  <span>STATUS: READY FOR SIGNATURE</span>
                </div>
                
                <p className="text-white font-bold text-xs uppercase">SERVICE AGREEMENT & RETAINER TERMS</p>
                <div className="space-y-1.5 text-slate-400 leading-relaxed">
                  <p>1. <strong className="text-slate-300">Scope of Work:</strong> Configuration of GrowthOS™ CRM Pipelines, WhatsApp communication templates, and interactive client calendar schedulers.</p>
                  <p>2. <strong className="text-slate-300">Retainer Terms:</strong> Monthly retainer billing of ₹1,50,000 via automated Stripe registers on the 1st of every month.</p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold pt-2 border-t border-slate-900">
                  <Fingerprint className="h-4 w-4" /> Digital Signature verified via TLS 1.3 encryption keys.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-[#8b5cf6] uppercase tracking-widest block font-bold">05 / Proposal Automation</span>
            <h2 className="text-3xl font-bold font-display text-white">Proposal & Client Onboarding Automation</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-generate customized service agreements and digital signature links instantly post-discovery call. Confirm contract logs automatically, triggering n8n checklists that configure client workspaces.
            </p>

            <div className="space-y-3.5">
              {[
                { title: 'Dynamic Doc Synthesis', desc: 'Auto-compiles verified templates with your pricing structures.' },
                { title: 'Automated Stripe Invoicing', desc: 'Dispatches recurring billing agreements connected to the proposal.' },
                { title: 'Frictionless Client Onboarding', desc: 'Fires n8n checklist nodes that trigger Slack invites and drive shares.' }
              ].map((f, i) => (
                <div key={i} className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-display">
                    <CheckCircle className="h-4 w-4 text-[#8b5cf6]" /> {f.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 pl-5">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            KNOWLEDGE BASE AI ASSISTANT
           ========================================== */}
        <div id="knowledge_base" className="mb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">06 / RAG Data Retrieval</span>
            <h2 className="text-3xl font-bold font-display text-white">Knowledge Base AI Assistant</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equip your advisory teams or clients with a high-speed RAG (Retrieval-Augmented Generation) engine that answers complex internal policy queries, billing standards, or task checklists.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {['Document Vector Search', 'FAQ Auto-Replies', 'Internal SOP Querying', 'Client Service Portals', 'RAG Security Architecture', 'Safe Data Separation'].map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/40 flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-blue-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 p-1 bg-gradient-to-r from-blue-500/10 via-violet-500/5 to-transparent rounded-2xl">
            <div className="p-6 rounded-2xl border border-blue-950/40 bg-slate-950/90 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-blue-900/10 pb-3">
                <span className="text-[10px] font-mono uppercase text-blue-400 flex items-center gap-1.5 font-bold">
                  <BookOpen className="h-4 w-4" /> Knowledge Graph Vector Database
                </span>
                <span className="text-[9px] text-[#00c2ff] font-mono font-bold">VECTOR STORE CONNECTED</span>
              </div>

              {/* Stateful search widget */}
              <form onSubmit={handleDocSearch} className="space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-500 uppercase block">Query Vector Store (Try "SOP Onboarding" or "Invoice billing")</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. SOP onboarding guidelines"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:border-blue-500 focus:outline-none pr-10 font-mono"
                    />
                    <button type="submit" className="absolute right-2.5 top-2.5 text-blue-400 hover:text-white">
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {searchResult && (
                  <div className="p-3 rounded-lg bg-blue-950/15 border border-blue-950/30 text-xs font-mono text-slate-300 leading-relaxed animate-fade-in">
                    <p className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-bold mb-1">RAG Search Result Node:</p>
                    {searchResult}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* ==========================================
            AUTOMATION WORKFLOWS (React Flow Visual representation)
           ========================================== */}
        <div id="automation_workflows" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-[#8b5cf6] uppercase tracking-widest font-bold">n8n Node Pipelines</span>
            <h2 className="text-3xl font-bold font-display text-white">Professional Services Automation</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              We engineer multi-node automation blueprints that align team actions with CRM pipelines. Click a pipeline to visualize its structural flow:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-5 space-y-2">
              {workflowsList.map((wf, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveWorkflowIdx(idx)}
                  className={`w-full p-3.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                    activeWorkflowIdx === idx 
                      ? 'border-[#8b5cf6] bg-purple-500/5 shadow-[0_0_15px_rgba(139,92,246,0.15)] text-white' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-semibold font-mono">{wf.name}</span>
                  <ChevronRight className="h-4 w-4 text-purple-400 shrink-0" />
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[220px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase font-bold">PIPELINE SCHEMATIC PATH</span>
                
                {/* Horizontal flowchart */}
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono font-bold">
                  {workflowsList[activeWorkflowIdx].steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="p-2 rounded bg-slate-900 border border-purple-950/50 text-slate-300 shadow-sm">
                        {step}
                      </span>
                      {idx < workflowsList[activeWorkflowIdx].steps.length - 1 && (
                        <ArrowRight className="h-3.5 w-3.5 text-purple-500" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-purple-900/10 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Webhook Integration Endpoint: n8n Node Server</span>
                <span className="text-emerald-400 font-bold">STATUS: STREAMING</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            REVENUE INTELLIGENCE DASHBOARD
           ========================================== */}
        <div id="analytics_dashboard" className="mb-28 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Central Intelligence Hub</span>
            <h2 className="text-3xl font-bold font-display text-white">Revenue Intelligence Dashboard</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Monitor active leads, contract conversions, and monthly recurring revenue managed by GrowthOS™ CRM. Click on any metric tab to examine historical graphs:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-4 grid grid-cols-1 gap-3">
              {(['leads', 'appointments', 'proposals', 'revenue'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveDashboardTab(tab)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeDashboardTab === tab 
                      ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-white' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider">{tab}</span>
                    <span className="text-emerald-400 text-xs font-bold font-mono">{dashboardStats[tab].pct}</span>
                  </div>
                  <span className="text-xl font-extrabold font-display block text-white">{dashboardStats[tab].val}</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[350px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-blue-900/10 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase font-bold">CONVERSION ANALYTICS GRID</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">AUTO-UPDATING METRIC TRACK</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-display text-white uppercase">{activeDashboardTab} Timeline</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {dashboardStats[activeDashboardTab].desc}
                  </p>
                </div>

                {/* SVG Line Chart representing metrics trend */}
                <div className="pt-6">
                  <svg className="w-full h-32 text-blue-500" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid horizontal markers */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="70" x2="500" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="110" x2="500" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                    {/* Gradient area */}
                    <path
                      d={`M 0 110 
                          L 100 ${110 - (dashboardStats[activeDashboardTab].points[0] / 3)} 
                          L 200 ${110 - (dashboardStats[activeDashboardTab].points[1] / 3)} 
                          L 300 ${110 - (dashboardStats[activeDashboardTab].points[2] / 3)} 
                          L 400 ${110 - (dashboardStats[activeDashboardTab].points[3] / 3)} 
                          L 500 ${110 - (dashboardStats[activeDashboardTab].points[4] / 3)} 
                          L 500 110 Z`}
                      fill="url(#chartGradient)"
                    />

                    {/* Connection line */}
                    <path
                      d={`M 0 110 
                          L 100 ${110 - (dashboardStats[activeDashboardTab].points[0] / 3)} 
                          L 200 ${110 - (dashboardStats[activeDashboardTab].points[1] / 3)} 
                          L 300 ${110 - (dashboardStats[activeDashboardTab].points[2] / 3)} 
                          L 400 ${110 - (dashboardStats[activeDashboardTab].points[3] / 3)} 
                          L 500 ${110 - (dashboardStats[activeDashboardTab].points[4] / 3)}`}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />

                    {/* Data Points */}
                    {dashboardStats[activeDashboardTab].points.slice(0, 5).map((p, idx) => (
                      <circle
                        key={idx}
                        cx={(idx + 1) * 100}
                        cy={110 - (p / 3)}
                        r="3.5"
                        fill="#3b82f6"
                        stroke="#040614"
                        strokeWidth="1.5"
                      />
                    ))}
                  </svg>
                  
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                    <span>Q1 BEGIN</span>
                    <span>Q2 START</span>
                    <span>Q3 MID</span>
                    <span>Q4 TRANSIT</span>
                    <span>CURRENT CYCLE</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-900/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Database Sync Endpoint</span>
                <span className="text-emerald-400 font-bold">HubSpot Verified Feed</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            ROI CALCULATOR
           ========================================== */}
        <div id="roi_calculator" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Financial Optimization</span>
            <h2 className="text-3xl font-bold font-display text-white">Professional Services ROI Calculator</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Simulate the direct revenue impact of automated follow-ups and CRM qualification triggers on your current pipeline:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-800 bg-slate-950/40 space-y-5">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">Input parameters</span>
              
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Monthly Inbound Leads</span>
                  <span className="text-white font-bold">{monthlyLeads} leads</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(parseInt(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Average Contract Value</span>
                  <span className="text-white font-bold">₹{projectVal.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="30000"
                  max="500000"
                  step="10000"
                  value={projectVal}
                  onChange={(e) => setProjectVal(parseInt(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Current Conversion Rate</span>
                  <span className="text-white font-bold">{currentConv}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={currentConv}
                  onChange={(e) => setCurrentConv(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Advisory Team Size</span>
                  <span className="text-white font-bold">{teamSize} members</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="45"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="lg:col-span-7 p-8 rounded-2xl border border-blue-950/40 bg-slate-950/80 backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[350px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">PROJECTED REVENUE MULTIPLIERS</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-blue-950/5 border border-blue-950/25">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Added Monthly Sales</span>
                    <span className="text-xl font-extrabold text-white mt-1 block">
                      ₹{addedRevenue.toLocaleString('en-IN')}
                    </span>
                    <p className="text-[8px] text-slate-500 mt-0.5 leading-relaxed">Boosted by instant lead qualification triggers.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-950/5 border border-blue-950/25">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Weekly Hours Recovered</span>
                    <span className="text-xl font-extrabold text-[#00C2FF] mt-1 block">
                      {teamSize * 15} Hours
                    </span>
                    <p className="text-[8px] text-slate-500 mt-0.5 leading-relaxed">Admin tasks handled autonomously.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-950/5 border border-blue-950/25">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Net Monthly Gain</span>
                    <span className="text-xl font-extrabold text-emerald-400 mt-1 block">
                      ₹{totalMonthlyGain.toLocaleString('en-IN')}
                    </span>
                    <p className="text-[8px] text-slate-500 mt-0.5 leading-relaxed">Total combined financial gain value.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-blue-900/10 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Calculations based on 15h weekly savings per employee</span>
                <span className="text-blue-400 font-bold">Real Financial Optimizations</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            CASE STUDIES / SUCCESS STORIES
           ========================================== */}
        <div id="case_studies" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Verifiable Results</span>
            <h2 className="text-3xl font-bold font-display text-white">Advisory Success Stories</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              See how modern CA firms, corporate law partnerships, and agencies leveraged our RAG automation engines:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-4 space-y-2">
              {successCases.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setCaseIdx(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    caseIdx === idx 
                      ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-white' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-bold block mb-1">{cs.segment}</span>
                  <span className="text-xs font-bold font-display block text-slate-200">{cs.name}</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[350px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-blue-900/10 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">{successCases[caseIdx].metric}</span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">CASE REF: 00{caseIdx + 1}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-display text-white">{successCases[caseIdx].name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {successCases[caseIdx].impact}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                  {successCases[caseIdx].results.map((res, i) => (
                    <div key={i} className="p-3 rounded-lg bg-blue-950/5 border border-blue-950/25">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase leading-relaxed">{res.title}</span>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-slate-400 line-through">{res.before}</span>
                        <span className="text-xs font-extrabold text-emerald-400">{res.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-blue-900/10 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Verified Client Case Study Log</span>
                <span className="text-blue-400 font-bold">100% Operational Transparency</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            COMPARISON TABLE
           ========================================== */}
        <div id="comparison" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-[#8b5cf6] uppercase tracking-widest font-bold">Market Analysis</span>
            <h2 className="text-3xl font-bold font-display text-white">Why Choose Natton Digital</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              How our dedicated AI Growth setups compare against general CRM portals and manual agencies:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="p-4 font-bold">Capabilities</th>
                  <th className="p-4 font-bold text-blue-400">Natton Digital</th>
                  <th className="p-4 font-bold">Traditional Agencies</th>
                  <th className="p-4 font-bold">Generic CRM Platforms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {[
                  { cap: '24/7 Voice qualification bots', nat: 'Fully integrated', trad: 'Not offered', CRM: 'No API triggers' },
                  { cap: 'n8n Onboarding auto-checklists', nat: 'Fully configured', trad: 'Manual setup', CRM: 'Requires separate subscription' },
                  { cap: 'RAG policy knowledge query', nat: 'Custom configured', trad: 'Not offered', CRM: 'Simple text FAQs only' },
                  { cap: 'Instant dynamic proposals', nat: '3-click PDF creation', trad: '24-48h manual prep', CRM: 'Simple static invoice only' },
                  { cap: 'Consolidated Shared inbox', nat: 'Integrated WhatsApp/Telephony', trad: 'Disjointed channels', CRM: 'Text-only records' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/20 transition-all font-mono">
                    <td className="p-4 font-semibold text-slate-200 font-sans">{row.cap}</td>
                    <td className="p-4 text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="h-4 w-4 shrink-0" /> {row.nat}
                    </td>
                    <td className="p-4 text-slate-500">{row.trad}</td>
                    <td className="p-4 text-slate-500">{row.CRM}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            15 FREQUENTLY ASKED QUESTIONS
           ========================================== */}
        <div id="faq" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">FAQ Guide</span>
            <h2 className="text-3xl font-bold font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Find answers to common questions regarding our CRM custom setups, RAG vector libraries, and voice bot integration:
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2 text-left">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-800 rounded-xl bg-slate-950/40 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 flex justify-between items-center hover:bg-slate-900/30 transition-all text-left"
                >
                  <span className="text-xs font-semibold text-slate-200">{faq.q}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="h-4 w-4 text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 border-t border-slate-900 text-xs text-slate-400 leading-relaxed bg-slate-950/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            LEAD CONSULTATION FORM (GHL / n8n + Captcha)
           ========================================== */}
        <div id="lead_form" className="mb-24 max-w-xl mx-auto space-y-6 text-left">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Partner Discovery</span>
            <h2 className="text-2xl font-bold font-display text-white">Book A Free Growth Consultation</h2>
            <p className="text-xs text-slate-400">
              Submit your project targets below. Our team compiles custom pipeline blueprints in under 48 hours:
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-2xl border border-blue-950/40 bg-slate-950/80 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
            
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Business Type *</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option>Consultant</option>
                      <option>Digital Agency</option>
                      <option>CA Practice</option>
                      <option>Law Firm</option>
                      <option>Architect / Designer</option>
                      <option>Coach / Advisor</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Country *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. India"
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Telephone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Monthly Leads Value</label>
                    <select
                      value={formLeads}
                      onChange={(e) => setFormLeads(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option>Under 10 leads</option>
                      <option>10 - 50 leads</option>
                      <option>50 - 200 leads</option>
                      <option>Over 200 leads</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Core Operational Bottleneck</label>
                    <input
                      type="text"
                      placeholder="e.g. Proposal delays / chasing slots"
                      value={formChallenges}
                      onChange={(e) => setFormChallenges(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Message Notes</label>
                  <textarea
                    rows={2}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Secure Captcha */}
                <div className="p-3 rounded-lg bg-blue-950/5 border border-blue-950/20 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Solve Captcha: {captchaNums.num1} + {captchaNums.num2} = ?</span>
                  <input
                    type="number"
                    required
                    placeholder="Enter answer"
                    value={captchaVal}
                    onChange={(e) => setCaptchaVal(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white focus:border-blue-500 focus:outline-none text-center font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Verifying Node Pipeline...' : 'Submit Discovery Consultation Form'}
                </button>

                {isSubmitting && (
                  <div className="p-3 rounded bg-black/40 border border-slate-800 text-[9px] font-mono text-blue-400 space-y-1 animate-pulse">
                    {terminalLogs.map((log, i) => (
                      <p key={i}>{log}</p>
                    ))}
                  </div>
                )}
              </form>
            ) : (
              <div className="text-center py-8 space-y-4 animate-fade-in">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 text-lg">✓</div>
                <h3 className="text-lg font-bold font-display text-white">Discovery Consultation Submitted!</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                  Your GHL ticket and welcome WhatsApp capability packs have been triggered successfully. Our consulting team will follow up in under 24 hours.
                </p>
                <div className="p-3 bg-black/40 rounded-lg border border-slate-800 text-left font-mono text-[9px] text-emerald-400 space-y-1">
                  {terminalLogs.map((log, i) => (
                    <p key={i}>{log}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==========================================
            FINAL CTA
           ========================================== */}
        <div id="final_cta" className="p-8 sm:p-12 rounded-3xl border border-blue-950/40 bg-gradient-to-r from-slate-950 via-blue-950/30 to-slate-950 text-center relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
          
          <span className="text-[10px] font-mono text-[#8b5cf6] uppercase tracking-widest font-bold block">Secure Your Scaling Path</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
            Scale Your Professional Services Business With AI
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Book an onboarding blueprint review with our engineers. Let us build your secure corporate knowledge graphs and proposal pipelines.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a 
              href="#lead_form" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-lg text-xs uppercase tracking-wider transition-all"
            >
              Book Onboarding Consultation
            </a>
            <a 
              href="#faq" 
              className="px-6 py-3 rounded-lg border border-slate-800 bg-slate-950/40 hover:bg-slate-900 transition-all text-xs font-semibold text-slate-300"
            >
              Read Implementation FAQ
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
