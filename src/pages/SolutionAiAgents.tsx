import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Zap, 
  Sparkles, 
  Layers, 
  Check, 
  Clock, 
  ArrowRight, 
  BarChart2, 
  Settings, 
  Sliders, 
  HelpCircle, 
  Send,
  Building,
  GraduationCap,
  Briefcase,
  Smartphone,
  CreditCard,
  Target,
  FileText,
  Workflow,
  Plus,
  Trash2,
  Search,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Play,
  Volume2,
  Activity,
  Globe,
  Database,
  Lock,
  ShieldCheck,
  Users,
  Code,
  DollarSign,
  TrendingUp,
  Percent,
  Calculator,
  Mail,
  Phone,
  ArrowUpRight,
  CheckCircle2,
  Sparkle
} from 'lucide-react';
import { RoutePath } from '../types';
import { motion, AnimatePresence } from 'motion/react';

type AgentId = 'sales' | 'support' | 'hr' | 'finance' | 'ops' | 'knowledge';

export default function SolutionAiAgents({ setPath, darkMode, formSubmitted, setFormSubmitted, loading, setLoading }: any) {
  useEffect(() => {
    document.title = "AI Agents & Enterprise Automation | Build Intelligent Multi-Agent Systems";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Form input state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    industry: 'Retail & Ecommerce',
    email: '',
    phone: '',
    country: 'India',
    currentTools: '',
    challenges: '',
    automationArea: 'Sales AI Agent',
    message: ''
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);

  useEffect(() => {
    generateMathCaptcha();
  }, []);

  const generateMathCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptchaNum1(num1);
    setCaptchaNum2(num2);
    setCaptchaInput('');
    setCaptchaVerified(false);
  };

  const handleCaptchaVerify = () => {
    if (parseInt(captchaInput) === (captchaNum1 + captchaNum2)) {
      setCaptchaVerified(true);
    } else {
      alert("Incorrect verification code. Please try again.");
      generateMathCaptcha();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please solve the verification code first.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1800);
  };

  // ==========================================
  // ROI CALCULATOR STATE
  // ==========================================
  const [employees, setEmployees] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyCost, setHourlyCost] = useState(600); // in INR
  const [repetitiveTasksCount, setRepetitiveTasksCount] = useState(4);

  // ROI Calculations
  const weeklyHoursSavedPerEmp = hoursPerWeek * (repetitiveTasksCount * 0.20); // 20% of repetitive effort saved per task
  const totalWeeklyHoursSaved = weeklyHoursSavedPerEmp * employees;
  const annualHoursSaved = totalWeeklyHoursSaved * 52;
  const annualSavings = annualHoursSaved * hourlyCost;
  const productivityIncrease = Math.min(85, (repetitiveTasksCount * 12));

  // ==========================================
  // 3D NEURAL CANVAS GRAPH FOR HERO
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 400;
    let height = canvas.height = canvas.parentElement?.clientHeight || 400;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', resize);

    // Nodes representing agents in active system
    const nodes: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      label: string;
      color: string;
      size: number;
      pulse: number;
    }> = [
      { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, label: "Orchestrator Agent", color: "#00C2FF", size: 8, pulse: 0 },
      { x: width * 0.2, y: height * 0.3, targetX: width * 0.2, targetY: height * 0.3, label: "Sales Agent", color: "#8B5CF6", size: 5, pulse: 1 },
      { x: width * 0.8, y: height * 0.3, targetX: width * 0.8, targetY: height * 0.3, label: "Support Agent", color: "#10B981", size: 5, pulse: 2 },
      { x: width * 0.15, y: height * 0.7, targetX: width * 0.15, targetY: height * 0.7, label: "HR Agent", color: "#EC4899", size: 5, pulse: 3 },
      { x: width * 0.5, y: height * 0.85, targetX: width * 0.5, targetY: height * 0.85, label: "Finance Agent", color: "#F59E0B", size: 5, pulse: 4 },
      { x: width * 0.85, y: height * 0.7, targetX: width * 0.85, targetY: height * 0.7, label: "Operations Agent", color: "#06B6D4", size: 5, pulse: 5 }
    ];

    const pulses: Array<{ x: number; y: number; progress: number; fromIdx: number; toIdx: number }> = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial background glow matching layout guidelines
      const grad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width);
      grad.addColorStop(0, 'rgba(15, 11, 46, 0)');
      grad.addColorStop(1, 'rgba(11, 7, 33, 0.45)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw thin neural communication grid paths
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Draw communication line pulses
      if (Math.random() < 0.04) {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        let toIdx = Math.floor(Math.random() * nodes.length);
        while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * nodes.length);
        pulses.push({ x: nodes[fromIdx].x, y: nodes[fromIdx].y, progress: 0, fromIdx, toIdx });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += 0.015;
        const fromNode = nodes[p.fromIdx];
        const toNode = nodes[p.toIdx];
        const currentX = fromNode.x + (toNode.x - fromNode.x) * p.progress;
        const currentY = fromNode.y + (toNode.y - fromNode.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = fromNode.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = fromNode.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
        }
      }

      // Draw actual interactive nodes & text
      nodes.forEach((n, idx) => {
        // Soft jitter motion
        n.x = n.targetX + Math.sin(Date.now() / 800 + idx) * 3;
        n.y = n.targetY + Math.cos(Date.now() / 800 + idx) * 3;

        // Pulse scale
        const scale = 1 + Math.sin(Date.now() / 300 + idx) * 0.15;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = n.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label text overlay
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y - n.size - 6);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ==========================================
  // MULTI-AGENT SIMULATOR STATE
  // ==========================================
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const simulationSteps = [
    { name: "Orchestrator Node", desc: "User request arrives: 'Evaluate inbound CRM leads, qualification rate, sync and alert Slack.'", icon: Cpu, color: "text-[#00C2FF] border-[#00C2FF]" },
    { name: "Task Planning", desc: "Agent decomposes request into sub-tasks: (1) CRM retrieval, (2) qualification filtering, (3) message drafting.", icon: Workflow, color: "text-violet-400 border-violet-500/30" },
    { name: "Specialized Agents", desc: "Trigger Sales Agent node to process GoHighLevel APIs and score leads.", icon: Briefcase, color: "text-emerald-400 border-emerald-500/30" },
    { name: "Knowledge Base RAG", desc: "Check company knowledge base. Ensure compliance standard benchmarks.", icon: Database, color: "text-rose-400 border-rose-500/30" },
    { name: "API Action", desc: "Execute external APIs: sync HubSpot status, output custom automated Slack alerts.", icon: Send, color: "text-amber-400 border-amber-500/30" }
  ];

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);
    setSimulationLog(["[Orchestrator] Initiating Multi-Agent flow..."]);

    const runStep = (step: number) => {
      if (step >= simulationSteps.length) {
        setIsSimulating(false);
        setSimulationLog(prev => [...prev, "[System] All agent sub-tasks resolved. Multi-Agent flow COMPLETED."]);
        return;
      }
      setTimeout(() => {
        setActiveStep(step);
        let logMsg = "";
        switch (step) {
          case 1:
            logMsg = "[Task Planner] Sub-tasks mapped successfully. Selecting optimized specialized endpoints...";
            break;
          case 2:
            logMsg = "[Sales Agent] Lead validation score computed: 94/100 (High-Intent). Triggering sync...";
            break;
          case 3:
            logMsg = "[Knowledge Base] Compliance policies confirmed. Retrieval vector context synced.";
            break;
          case 4:
            logMsg = "[API Actions] GoHighLevel API success code 200. Slack notification dispatched.";
            break;
        }
        setSimulationLog(prev => [...prev, logMsg]);
        runStep(step + 1);
      }, 1500);
    };

    runStep(1);
  };

  // ==========================================
  // ACTIVE CHOSEN AGENT FOR BENTO BLOCK DETAILS
  // ==========================================
  const [activeTab, setActiveTab] = useState<AgentId>('sales');

  const tabsData: Record<AgentId, { title: string; subtitle: string; desc: string; features: string[]; status: string }> = {
    sales: {
      title: "Sales AI Agent",
      subtitle: "Autonomous outbound and lead qualification pipeline",
      desc: "Our Sales Agent works directly inside your CRM. It scours maps, tracks social entries, validates email addresses, evaluates business size, and outputs custom structured pitches automatically.",
      features: ["Instant Lead Qualification Scoring", "Smart Automated Email Follow-Ups", "Intelligent Appointment Scheduling", "Two-Way CRM Synchronization", "Outbound Pipeline Flow Automation"],
      status: "Active Node"
    },
    support: {
      title: "Customer Support Agent",
      subtitle: "24/7 custom-RAG conversational support team",
      desc: "An intelligent resolver that searches database documents to answer technical client inquiries in real time with high accuracy, executing standard handoffs only when necessary.",
      features: ["Auto Ticket Resolution Routing", "Multi-Language Support Capabilities", "Dynamic Knowledge Base Integrations", "Secure Human Escalation Handoffs", "WhatsApp/RCS Multichannel Support"],
      status: "Active Node"
    },
    hr: {
      title: "HR AI Agent",
      subtitle: "Autonomous staff onboarding & recruitment assistant",
      desc: "Streamlines internal operational files. Resolves policy questions, filters resume collections, handles leave approvals, and prepares candidate interview templates.",
      features: ["Smart Resume Filtering Engine", "Automated Employee Onboarding", "Internal Policy Query Resolution", "Leave Scheduling & Approvals", "Candidate Assessment Generators"],
      status: "Standby Mode"
    },
    finance: {
      title: "Finance AI Agent",
      subtitle: "Secure ledger auditing & collections assistant",
      desc: "Performs continuous transactional health checks. Audits expense ledgers, checks pending invoices, triggers secure client payment alerts, and updates corporate accounting systems.",
      features: ["Automated Invoice Processing", "Ledger Auditing & Verification", "Secure Payment Follow-Up Alerts", "Corporate Expense Categorization", "Financial Analytics Reports"],
      status: "Active Node"
    },
    ops: {
      title: "Operations AI Agent",
      subtitle: "Workflow automation and systems controller",
      desc: "Acts as a bridge between your core applications. Monitors stock supplies, maps team tasks, issues system approvals, and alerts coordinators in real-time.",
      features: ["n8n Multi-Node Workflow Loops", "Corporate Approval Flow Triggers", "Real-Time Infrastructure Tracking", "Automated Task Assignments", "Operations Command dashboard Alerts"],
      status: "Active Node"
    },
    knowledge: {
      title: "Knowledge Base Agent",
      subtitle: "Advanced Vector RAG search engine",
      desc: "Acts as your enterprise memory. Performs semantic context retrieval across hundreds of PDFs, spreadsheets, and drive documentation, answering staff questions securely.",
      features: ["Vector Embeddings Search Protocols", "PDF & Drive Context Ingestion", "High-Performance Semantic Lookup", "Secure HIPAA/GDPR Compliance", "Corporate Wiki Assistant Integration"],
      status: "Active Node"
    }
  };

  // FAQ Accordion Toggle
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqsList = [
    {
      q: "What is an AI Agent and how does it differ from standard chatbots?",
      a: "Standard chatbots rely on simple rigid templates. AI Agents are autonomous. They analyze goals, decompose tasks, plan workflows, integrate with CRM/ERP tools, read documentation databases, and perform multiple decisions autonomously to resolve issues."
    },
    {
      q: "What is AgenticOS™ and how does it operate?",
      a: "AgenticOS™ is Natton Digital's premium enterprise orchestrator platform. It links multi-agent frameworks, custom AI nodes, and database RAG models to automate complex back-office workflows securely."
    },
    {
      q: "Can these agents connect to standard CRMs like HubSpot and GoHighLevel?",
      a: "Yes. We support native APIs and webhooks for GoHighLevel, HubSpot, Salesforce, Slack, Notion, Stripe, and custom-coded n8n servers, ensuring bidirectional contact data synchronization."
    },
    {
      q: "How does the Sales Agent qualify leads autonomously?",
      a: "It scans incoming submissions, verifies email validity, runs deep search protocols on domain names, matches requirements, computes qualification score vectors, and alerts reps instantly."
    },
    {
      q: "What is custom-RAG architecture and how does the Knowledge Agent use it?",
      a: "Retrieval-Augmented Generation (RAG) processes your business's proprietary PDF manuals, training spreadsheets, and wikis. It retrieves matching paragraph snippets so LLMs can answer internal prompts without hallucinating."
    },
    {
      q: "Is client and patient information fully secured on your platform?",
      a: "Absolutely. We enforce end-to-end SSL/TLS encodings, sandboxed API environments, and secure hosting protocols, supporting HIPAA/GDPR-compliant setups for medical and financial institutions."
    },
    {
      q: "Do we need high-level coding skills to maintain and configure these agents?",
      a: "No. Our premium interface, combined with our pre-configured n8n workflow blueprints, allows your operations managers to control parameters using simple natural language instructions."
    },
    {
      q: "What fallback mechanisms are in place if an agent faces an unknown request?",
      a: "The agent recognizes uncertainty thresholds, flags the transaction context, pauses automated loops, and executes a smooth handoff to your human support coordinators."
    },
    {
      q: "How fast can we integrate and deploy our first active automated agent?",
      a: "Standard workflow sandboxes are configured instantly. Custom production models, including corporate knowledge base integration and CRM mapping, take about 5 to 7 business days to launch."
    },
    {
      q: "Does the ROI calculator provide realistic estimates of cost savings?",
      a: "Yes. The calculator leverages industry averages, estimating a conservative 20% manual effort reduction per automated repetitive task to compute baseline annual cost and hours saved."
    },
    {
      q: "Can the HR Agent schedule and schedule interviews autonomously?",
      a: "Yes. It screens resumes, maps calendar availability, sends secure Google Meet links to candidates, and outputs preparation briefings to interviewers."
    },
    {
      q: "How does the Finance Agent handle billing collections?",
      a: "It parses ledger invoices, monitors bank receipts via secure integrations, and drafts automated, personalized follow-ups for outstanding accounts."
    },
    {
      q: "What LLM backends power AgenticOS™?",
      a: "We support integrations with premier models including Gemini Pro, Claude 3.5 Sonnet, GPT-4o, and secure private open-source models (Llama 3) based on project parameters."
    },
    {
      q: "Is there a limit to the number of concurrent workflows an agent can run?",
      a: "Our serverless edge infrastructure dynamically scales, allowing your enterprise network to execute thousands of parallel workflow actions without slowdowns."
    },
    {
      q: "What pricing tiers do you offer and can we upgrade at any time?",
      a: "We offer transparent monthly packages: Starter, Growth, and Enterprise. Tiers are flexible, allowing you to upgrade workflows or add agents as your business scales."
    }
  ];

  return (
    <div className={`py-12 animate-fade-in font-sans text-left transition-colors duration-500 ${
      darkMode ? 'bg-[#0B0721] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 text-xs font-mono text-gray-500 flex items-center gap-1.5">
          <button onClick={() => setPath('home')} className="hover:text-[#00C2FF] transition-colors">Home</button> 
          <span>/</span> 
          <span className="text-[#8B5CF6] font-semibold">Solutions</span> 
          <span>/</span> 
          <span>AI Agents</span>
        </div>

        {/* ==========================================
            1. HERO SECTION (Animated Particle Network & Floating 3D Phones)
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative">
          
          {/* Neon backglows */}
          <div className="absolute top-0 left-20 w-[300px] h-[300px] bg-[#00C2FF]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-[#8B5CF6]/15 rounded-full blur-[120px] pointer-events-none -z-10" />

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
              <span className="flex h-2 w-2 rounded-full bg-[#00C2FF] animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#00C2FF] font-bold">
                AgenticOS™ Enterprise Automation
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight">
              AI Agents That Work Like <br />
              <span className="bg-gradient-to-r from-[#00C2FF] via-[#8B5CF6] to-pink-500 bg-clip-text text-transparent animate-pulse">
                Your Digital Employees
              </span>
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Build, deploy, and manage highly intelligent AI agents to automate Sales, Support, HR, Finance, and Operations while working 24/7. Connect your legacy tech stack to dynamic n8n workflow pipelines seamlessly.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#discovery_form" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-violet-500/20 transition-all flex items-center gap-2 text-sm"
              >
                Book Discovery Call <Sparkle className="h-4 w-4" />
              </a>
              <a 
                href="#multi_agent_architecture" 
                className={`px-6 py-3 rounded-lg border transition-all flex items-center gap-2 text-sm font-semibold ${
                  darkMode 
                    ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#00C2FF]' 
                    : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                Watch Agent Demo <Play className="h-4 w-4 text-[#00C2FF]" />
              </a>
            </div>

            {/* Platform indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-6 text-[10px] font-mono text-gray-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#00C2FF]" /> GDPR & HIPAA Secure</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-emerald-400" /> Active RAG Knowledge Graph</span>
            </div>
          </div>

          {/* Right Hero: HTML5 Canvas Mesh */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px]">
            <div className={`p-6 rounded-3xl border w-full max-w-[420px] relative overflow-hidden backdrop-blur-md ${
              darkMode ? 'bg-[#0E1524]/60 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xs font-mono uppercase text-gray-500 mb-2 tracking-wider flex items-center gap-1.5 justify-between">
                <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5 text-violet-400" /> ACTIVE NEURAL NETWORK</span>
                <span className="text-[10px] text-[#00C2FF] font-bold animate-pulse">● AGENTICOS ACTIVE</span>
              </h3>

              {/* Particle Network Canvas */}
              <div className="h-[280px] w-full relative flex items-center justify-center rounded-2xl bg-black/25 overflow-hidden border border-white/5">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
                
                {/* Floating telemetry block overlay */}
                <div className="absolute top-3 left-3 text-[8px] font-mono text-[#00C2FF] bg-black/60 px-2 py-1 rounded border border-white/5">
                  ORCHESTRATOR ACTIVE
                </div>
                <div className="absolute bottom-3 right-3 text-[8px] font-mono text-emerald-400 bg-black/60 px-2 py-1 rounded border border-white/5">
                  Task Execution Success: 99.8%
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-gray-400 bg-black/30 p-2.5 rounded-lg border border-white/5">
                <span>⚡ Multi-Agent System</span>
                <span className="text-[#00C2FF] font-bold">100% Secure SSL</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. AGENT WORKFORCE (Bento Style Switcher)
           ========================================== */}
        <div id="agent_ecosystem" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#8B5CF6] uppercase block font-bold">Your AI Workforce</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Six Specialized Automated Agents
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Review our specialized agent nodes. Switch tabs below to configure system commands, RAG assets, and prompt credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left selector sidebar (Bento tabs) */}
            <div className="lg:col-span-4 space-y-3 flex flex-col justify-center">
              <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-bold">SELECT ACTIVE AGENT NODE</span>
              {(Object.keys(tabsData) as AgentId[]).map((tabId) => {
                const isActive = activeTab === tabId;
                const data = tabsData[tabId];
                return (
                  <button
                    key={tabId}
                    onClick={() => setActiveTab(tabId)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isActive 
                        ? 'border-[#00C2FF] bg-[#00C2FF]/10 shadow-lg scale-[1.01]' 
                        : (darkMode ? 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]' : 'border-slate-200 bg-white hover:bg-slate-50')
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold font-display">{data.title}</h4>
                      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">{data.subtitle}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-gray-500 transition-transform ${isActive ? 'translate-x-1 text-[#00C2FF]' : ''}`} />
                  </button>
                );
              })}
            </div>

            {/* Right details display */}
            <div className={`lg:col-span-8 p-8 rounded-2xl border flex flex-col justify-between backdrop-blur-md relative overflow-hidden ${
              darkMode ? 'bg-[#0E1524]/80 border-white/10 shadow-violet-950/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="absolute top-0 right-0 h-48 w-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#00C2FF] uppercase tracking-widest block mb-1">Agent Profile Node</span>
                    <h3 className="text-xl font-bold font-display">{tabsData[activeTab].title}</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase ${
                    tabsData[activeTab].status === 'Active Node' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    ● {tabsData[activeTab].status}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  {tabsData[activeTab].desc}
                </p>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider">CORE FEATURES:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tabsData[activeTab].features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 font-bold" />
                        </div>
                        <span className={darkMode ? 'text-gray-300' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
                <span>⚡ Prompt Protocol: system_instruction_v3.2</span>
                <span>Bidirectional API Sync: Hubspot/GHL Ready</span>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            3. INTERACTIVE MULTI-AGENT ARCHITECTURE SIMULATOR
           ========================================== */}
        <div id="multi_agent_architecture" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-[#00C2FF] uppercase block font-bold">Orchestration & Workflow</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Multi-Agent Architecture
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Watch how our central orchestrator coordinates specialised agent nodes, retrieves database records, and triggers webhooks dynamically.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visual simulation flow cards */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">PIPELINE EXECUTION CHRONOLOGY</span>
                <button
                  onClick={triggerSimulation}
                  disabled={isSimulating}
                  className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-mono text-[10px] rounded-lg flex items-center gap-1.5 font-bold uppercase shadow-md transition-all disabled:opacity-50"
                >
                  <Zap className="h-3.5 w-3.5" /> {isSimulating ? "Simulating Agent..." : "Trigger Live Simulation"}
                </button>
              </div>

              <div className="space-y-3 relative">
                {simulationSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const Icon = step.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex items-start gap-4 transition-all duration-300 ${
                        isActive 
                          ? 'border-[#00C2FF] bg-[#00C2FF]/10 shadow-lg scale-[1.01]' 
                          : (darkMode ? 'border-white/5 bg-white/[0.01] opacity-70' : 'border-slate-100 bg-white opacity-75')
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${step.color}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-mono text-gray-500 uppercase">STEP 0{idx + 1}</span>
                          <h4 className="text-xs font-bold font-display">{step.name}</h4>
                        </div>
                        <p className={`text-[10px] mt-0.5 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technical logs console */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className={`rounded-2xl border p-6 flex flex-col justify-between h-full backdrop-blur-md relative ${
                darkMode ? 'bg-black/40 border-white/10 text-gray-300' : 'bg-slate-900 border-slate-800 text-slate-100 shadow-2xl'
              }`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-mono text-[#00C2FF] uppercase font-bold">SYSTEM TERMINAL LOGS</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="font-mono text-[10px] space-y-2 h-[220px] overflow-y-auto scrollbar-none">
                    {simulationLog.length === 0 ? (
                      <p className="text-gray-500">Press 'Trigger Live Simulation' to start tracing agent operations.</p>
                    ) : (
                      simulationLog.map((log, idx) => (
                        <p key={idx} className={log.includes('[System]') || log.includes('COMPLETED') ? 'text-emerald-400 font-bold' : 'text-gray-300'}>
                          {log}
                        </p>
                      ))
                    )}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-gray-500 space-y-1 mt-4">
                  <div>LLM ENGINE: <span className="text-violet-400">Gemini 3.5 Pro + RAG Context</span></div>
                  <div>SECURITY LAYER: <span className="text-[#00C2FF]">TLS 1.3 encrypted</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            4. ROI CALCULATOR SECTION
           ========================================== */}
        <div id="roi_calculator" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase block font-bold">Financial Proof of Value</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Estimate Automation Savings
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Our reactive calculator estimates how much manual work can be handled by AgenticOS™. Toggle parameters to review ROI estimates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Reactive Slider Controls */}
            <div className={`lg:col-span-6 p-6 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-bold">CALCULATOR ADJUSTMENTS</span>
                
                {/* Sliders */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">Number of Employees</span>
                    <span className="font-mono font-bold text-[#00C2FF]">{employees} staff</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">Weekly Hours spent on Routine Work</span>
                    <span className="font-mono font-bold text-[#00C2FF]">{hoursPerWeek} hrs</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">Average Corporate Cost Per Hour</span>
                    <span className="font-mono font-bold text-[#00C2FF]">₹{hourlyCost}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="2000"
                    step="50"
                    value={hourlyCost}
                    onChange={(e) => setHourlyCost(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">Repetitive Business Tasks to Automate</span>
                    <span className="font-mono font-bold text-[#00C2FF]">{repetitiveTasksCount} tasks</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={repetitiveTasksCount}
                    onChange={(e) => setRepetitiveTasksCount(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-black/25 text-[10px] font-mono text-gray-500 leading-relaxed border border-white/5">
                💡 <span className="font-bold text-gray-300">Note:</span> Estimation assumes an active reduction of 20% manual labor time per automated core task, mapped across a standard corporate 52-week operating year.
              </div>
            </div>

            {/* Right: Savings Outputs Display */}
            <div className={`lg:col-span-6 p-8 rounded-2xl border flex flex-col justify-between backdrop-blur-md relative overflow-hidden ${
              darkMode ? 'bg-[#0E1524]/80 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">ESTIMATED ANNUAL VALUE PROPOSITION</span>

                {/* Main Annual Savings Number */}
                <div className="space-y-1 border-b border-white/5 pb-6">
                  <span className="text-xs text-gray-500 uppercase font-mono">ANNUAL OPERATION SAVINGS</span>
                  <div className="text-3xl sm:text-5xl font-extrabold text-emerald-400 font-mono">
                    ₹{annualSavings.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Secondary indicators */}
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Total Time Saved</span>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-[#00C2FF]">{annualHoursSaved.toLocaleString('en-IN')} hrs/yr</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Productivity Uplift</span>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-pink-400">+{productivityIncrease}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-8 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
                <span>⚡ Automation efficiency: verified</span>
                <span className="text-[#00C2FF] font-bold">Avg payback period: ~45 days</span>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            5. n8n WORKFLOWS & LOGO MARQUEE
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Node Automation Hub</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              n8n Custom Workflows & Diagram
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Connect everything. Triggers prompt actions that cycle from memory databases to secure APIs seamlessly.
            </p>
          </div>

          {/* Interactive node diagram */}
          <div className={`p-6 rounded-2xl border text-center relative overflow-hidden backdrop-blur-md ${
            darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-4">INTERACTIVE NODE EXECUTION BLUEPRINT</span>
            
            <div className="flex flex-wrap justify-center items-center gap-4 py-6 relative">
              {[
                { name: "Trigger node", color: "border-blue-500 text-blue-400 bg-blue-500/10" },
                { name: "AI Agent", color: "border-violet-500 text-violet-400 bg-violet-500/10 animate-pulse" },
                { name: "Memory storage", color: "border-emerald-500 text-emerald-400 bg-emerald-500/10" },
                { name: "Decision node", color: "border-amber-500 text-amber-400 bg-amber-500/10" },
                { name: "External API", color: "border-pink-500 text-pink-400 bg-pink-500/10" },
                { name: "Action trigger", color: "border-[#00C2FF] text-[#00C2FF] bg-[#00C2FF]/10" },
                { name: "Response node", color: "border-rose-500 text-rose-400 bg-rose-500/10" }
              ].map((node, idx) => (
                <React.Fragment key={idx}>
                  <div className={`px-4 py-2 border rounded-xl font-mono text-[10px] font-bold ${node.color}`}>
                    {node.name}
                  </div>
                  {idx < 6 && (
                    <ChevronRight className="h-4 w-4 text-gray-500 hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Infinite marquee block */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block text-center font-bold">CONNECT YOUR ENTIRE TECH STACK</span>
            
            <div className="w-full overflow-hidden relative py-4">
              {/* Marquee loop */}
              <div className="flex gap-8 items-center animate-marquee whitespace-nowrap">
                {[
                  "Google Workspace", "Microsoft 365", "HubSpot", "GoHighLevel", "Slack", "Notion", 
                  "Salesforce", "Shopify", "WhatsApp", "n8n", "Zapier", "Stripe", "Razorpay", "Tally", 
                  "Zoho", "QuickBooks", "Google Workspace", "Microsoft 365", "HubSpot", "GoHighLevel"
                ].map((logo, idx) => (
                  <span key={idx} className={`px-4 py-2 rounded-xl border text-xs font-mono font-semibold ${
                    darkMode ? 'bg-[#0E1524] border-white/5 text-gray-400' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                  }`}>
                    🔌 {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            6. INDUSTRY BLUEPRINTS
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase block font-bold">Tailored Implementations</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Industry Blueprints
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Review custom blueprints preloaded to solve structural problems in healthcare, education, real estate, and logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { industry: "Healthcare", desc: "Automate intake registrations, HIPAA diagnostic reminders, doctor calendar synchronization, and patient callbacks.", agents: ["Appointment Agent", "Patient Support Agent"], color: "border-blue-500/20 text-blue-400" },
              { industry: "Education", desc: "Handle admission FAQs, lead qualification, student test calendar coordination, and tuition follow-up loops.", agents: ["Admission Agent", "Student Support Agent"], color: "border-violet-500/20 text-violet-400" },
              { industry: "Real Estate", desc: "Instantly score MLS leads, organize viewing times, match buyer parameters, and send follow-ups.", agents: ["Lead Qualification Agent", "Follow-Up Agent"], color: "border-emerald-500/20 text-emerald-400" },
              { industry: "Manufacturing", desc: "Monitor supply metrics, run automated supplier pricing bids, coordinate shipping timetables, and issue approvals.", agents: ["Operations Agent", "Procurement Agent"], color: "border-pink-500/20 text-pink-400" }
            ].map((card, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between backdrop-blur-md ${
                darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div>
                  <h3 className="text-base font-bold font-display mb-2">{card.industry}</h3>
                  <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{card.desc}</p>
                </div>
                <div className="space-y-1.5 border-t border-white/5 pt-4">
                  <span className="text-[9px] font-mono text-gray-500 uppercase block">CORE AGENTS DEPLOYED:</span>
                  {card.agents.map((ag, i) => (
                    <span key={i} className="text-[10px] font-semibold block text-[#00C2FF]">● {ag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            7. COMPARISON TABLE
           ========================================== */}
        <div className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#00C2FF] uppercase block font-bold font-semibold">Competitive Breakdown</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Why AgenticOS™
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Compare capabilities to standard automation tools. Discover why enterprise networks prefer Natton Digital.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-white/10 bg-[#0E1524]' : 'border-slate-200 bg-slate-100'}`}>
                  <th className="p-4 font-bold">Features</th>
                  <th className="p-4 font-bold text-[#00C2FF]">AgenticOS™</th>
                  <th className="p-4 font-bold text-gray-500">Zapier AI</th>
                  <th className="p-4 font-bold text-gray-500">Relevance AI</th>
                  <th className="p-4 font-bold text-gray-500">Lindy.ai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { title: "Custom n8n Integrations", OS: true, Z: false, R: true, L: false },
                  { title: "Full CRM/ERP Multi-Node Sync", OS: true, Z: true, R: false, L: false },
                  { title: "Active Vector RAG Search", OS: true, Z: false, R: true, L: true },
                  { title: "Smart Hand-offs & Fallback Paths", OS: true, Z: false, R: false, L: true },
                  { title: "Secured Dedicated Databases", OS: true, Z: false, R: false, L: false },
                  { title: "Verified HIPAA/GDPR Compliance", OS: true, Z: false, R: false, L: false }
                ].map((row, idx) => (
                  <tr key={idx} className={darkMode ? 'hover:bg-white/[0.01]' : 'hover:bg-slate-50'}>
                    <td className="p-4 font-semibold">{row.title}</td>
                    <td className="p-4 font-bold text-emerald-400">{row.OS ? "✓ YES" : "—"}</td>
                    <td className="p-4 text-gray-500">{row.Z ? "✓ YES" : "—"}</td>
                    <td className="p-4 text-gray-500">{row.R ? "✓ YES" : "—"}</td>
                    <td className="p-4 text-gray-500">{row.L ? "✓ YES" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            8. PRICING PLANS
           ========================================== */}
        <div id="pricing" className="mb-24 scroll-mt-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Flexible Scalable Models</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Flexible Pricing
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Choose the perfect package to launch your automated employee workforce. Scale nodes as your pipeline expands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "₹49,999", popular: false, desc: "Perfect for SMBs seeking to automate simple, single-view workflows.", features: ["Single Agent Node Deployment", "Basic Hubspot/GHL Webhooks", "Automated n8n Loop Setup", "Standard SSL Secure Hosting", "Email Technical Support"] },
              { name: "Growth", price: "₹1,49,999", popular: true, desc: "Optimized for expanding teams connecting multiple database stacks.", features: ["Multi-Agent Orchestrator System", "Active Vector RAG Knowledge Base", "Full Bidirectional CRM Mapping", "Smart Human Handoff Routing", "Priority Tech Support Response"] },
              { name: "Enterprise", price: "Custom", popular: false, desc: "Bespoke custom-modeled architectures for global operations.", features: ["Unlimited Autonomous Agents", "Custom LLM Model Fine-Tuning", "Relational CloudSQL Databanks", "GDPR & HIPAA Compliance Auditing", "Dedicated Team Architect SLA"] }
            ].map((plan, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border flex flex-col justify-between relative backdrop-blur-md ${
                plan.popular 
                  ? 'border-[#00C2FF] bg-[#00C2FF]/5 shadow-xl scale-[1.02]' 
                  : (darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200 shadow-sm')
              }`}>
                {plan.popular && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-400 text-slate-950 text-[8px] font-bold uppercase">
                    MOST POPULAR
                  </span>
                )}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold font-display">{plan.name}</h3>
                    <p className={`text-[11px] leading-relaxed mt-2 ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{plan.desc}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-gray-500 font-mono text-xs">/month</span>}
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-6">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span className={darkMode ? 'text-gray-300' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#discovery_form"
                  className={`w-full py-3 rounded-xl font-bold text-center text-xs block mt-8 transition-all ${
                    plan.popular
                      ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-500 shadow-lg shadow-cyan-400/10'
                      : (darkMode ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-slate-900 text-white hover:bg-slate-800')
                  }`}
                >
                  Request Plan Setup
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            9. FAQ SECTION (15 ACCORDIONS)
           ========================================== */}
        <div id="faq" className="mb-24 scroll-mt-12 max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#00C2FF] uppercase block font-bold font-semibold">Answers and Insights</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Review our compiled manual on AgenticOS™ deployment parameters, security standards, and customization capabilities.
            </p>
          </div>

          <div className="space-y-3">
            {faqsList.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`border rounded-xl transition-all duration-300 ${
                    darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-4 text-left flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="text-xs font-bold font-display">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#00C2FF]' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className={`px-4 pb-4 text-[11px] leading-relaxed border-t border-white/5 pt-3 ${
                          darkMode ? 'text-gray-400' : 'text-slate-600'
                        }`}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            10. DISCOVERY FORM (GoHighLevel/n8n math verification)
           ========================================== */}
        <div id="discovery_form" className="mb-24 scroll-mt-12 max-w-2xl mx-auto">
          <div className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden backdrop-blur-md ${
            darkMode ? 'bg-[#0E1524]/70 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
          }`}>
            <div className="absolute top-0 right-0 h-48 w-48 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                  <Check className="h-6 w-6 font-bold" />
                </div>
                <h3 className="text-lg font-bold font-display">Discovery Session Requested</h3>
                <p className={`text-xs leading-relaxed max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  Excellent! Our edge system completed the webhook sync with our central n8n system. An automated workflow specialist will reach out in under 15 minutes!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center space-y-2 mb-6">
                  <span className="text-[10px] font-mono text-[#00C2FF] uppercase block tracking-widest">WORKSHOP SCHEDULING</span>
                  <h3 className="text-xl font-bold font-display">Book Agent Discovery Session</h3>
                  <p className={`text-[11px] ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    Let's map out custom automated workflows tailored to your operational parameters.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">FULL NAME</label>
                    <input
                      type="text"
                      placeholder="e.g. Shrikant Patel"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                      className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">COMPANY NAME</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Logistical Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      required
                      className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="e.g. shrikant@apexlogistics.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">TELEPHONE</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">COUNTRY</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      required
                      className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">AUTOMATION CHANNELS</label>
                    <select
                      value={formData.automationArea}
                      onChange={(e) => setFormData(prev => ({ ...prev, automationArea: e.target.value }))}
                      className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                        darkMode ? 'bg-[#0E1524] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    >
                      <option value="Sales AI Agent">Sales AI Agent</option>
                      <option value="Customer Support Agent">Customer Support Agent</option>
                      <option value="HR AI Agent">HR AI Agent</option>
                      <option value="Finance AI Agent">Finance AI Agent</option>
                      <option value="Operations AI Agent">Operations AI Agent</option>
                      <option value="Knowledge Base Agent">Knowledge Base Agent</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-gray-500 uppercase">SPECIFIC BUSINESS CHALLENGES</label>
                  <textarea
                    rows={3}
                    placeholder="Describe legacy manual bottlenecks..."
                    value={formData.challenges}
                    onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                    className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#00C2FF] ${
                      darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                {/* Secure Math Captcha */}
                <div className="pt-2">
                  <label className="text-[9px] font-mono text-gray-500 uppercase block mb-1">SECURE MATH CODE FOR SPAM RETARDATION</label>
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-slate-800 text-white font-mono text-xs font-bold rounded-xl border border-white/10 select-none">
                      {captchaNum1} + {captchaNum2} = ?
                    </div>
                    <input
                      type="number"
                      placeholder="Solve math..."
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      disabled={captchaVerified}
                      className={`p-2.5 text-xs rounded-xl border w-28 focus:outline-none focus:border-[#00C2FF] ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                    {!captchaVerified ? (
                      <button
                        type="button"
                        onClick={handleCaptchaVerify}
                        className="px-4 py-2.5 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-violet-500/20 text-violet-300 font-mono text-[10px] rounded-xl font-bold uppercase"
                      >
                        Verify Math Code
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-bold font-mono text-[10px] flex items-center gap-1">
                        ✓ SECURE MATH OK
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !captchaVerified}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl text-xs uppercase tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-4 shadow-lg shadow-violet-500/10"
                >
                  {loading ? "Syncing n8n webhooks..." : "Schedule Agent Architecture Session"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ==========================================
            11. FINAL CTA SECTION
           ========================================== */}
        <div className={`p-8 sm:p-16 rounded-3xl border relative overflow-hidden backdrop-blur-md text-center ${
          darkMode ? 'bg-gradient-to-b from-[#18133B] to-[#0A0720] border-white/10 shadow-violet-950/20' : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <div className="absolute top-0 right-0 h-48 w-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-48 w-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight">
              Build Your AI Workforce Today
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Deploy AgenticOS™ multi-agent loops to eliminate back-office manual overhead. Shift resources to scale key performance indicators.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a 
                href="#discovery_form"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold rounded-lg text-xs tracking-wider uppercase transition-all"
              >
                Book Discovery Call
              </a>
              <button 
                onClick={() => setPath('contact')}
                className={`px-6 py-3 rounded-lg border text-xs tracking-wider uppercase font-semibold transition-all ${
                  darkMode ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08]' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                Talk To AI Architects
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
