import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  Search, 
  FileText, 
  CheckCircle, 
  Layers, 
  Workflow, 
  BarChart2, 
  ArrowRight, 
  Play, 
  Zap, 
  Star, 
  MessageSquare, 
  Users, 
  Globe, 
  Target, 
  ChevronRight, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Send,
  Sliders,
  DollarSign,
  Plus,
  ArrowDownRight,
  RefreshCw,
  Clock,
  Phone,
  Shield,
  Briefcase,
  Share2,
  Lock,
  ArrowRightLeft,
  X,
  Volume2,
  Bookmark,
  Terminal,
  Database,
  Mail,
  Compass,
  Layout,
  GitBranch,
  Building,
  GraduationCap,
  Home as HomeIcon,
  ShoppingBag,
  Factory,
  CheckSquare
} from 'lucide-react';
import { RoutePath } from '../types';

export default function ProductAgenticOs({ setPath }: { setPath: (path: RoutePath) => void }) {
  useEffect(() => {
    document.title = "AgenticOS™ | Enterprise AI Workforce & Autonomous Multi-Agent Platform";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ==========================================
  // HERO NEURAL NETWORK BACKGROUND (Canvas)
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    window.addEventListener('resize', handleResize);

    // Nodes definition
    const nodeCount = 42;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }> = [];

    const colors = ['rgba(14, 165, 233, 0.4)', 'rgba(139, 92, 246, 0.4)', 'rgba(34, 211, 238, 0.4)', 'rgba(16, 185, 129, 0.3)'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines slightly
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw lines between nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.15;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((node) => {
        node.pulse += 0.02;
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;

        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Update positions
        node.x += node.vx;
        node.y += node.vy;

        // Wall collisions
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });
      ctx.shadowBlur = 0; // reset

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ==========================================
  // 1. ECOSYSTEM (BENTO GRID - 12 CARDS)
  // ==========================================
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const agentsData = [
    {
      id: 'sales',
      name: 'Sales Agent',
      icon: TrendingUp,
      badge: 'Revenue Optimizer',
      desc: 'Autonomous pipeline orchestrator scanning lists, writing customized sequences, scheduling consulting slots, and updating CRM nodes.',
      prompt: 'SYSTEM: You are a high-performance outbound Sales Development Rep. Search local company registers, extract directors emails, evaluate funding profiles, and draft personalized interest letters focusing on operational savings. Log state in HubSpot deals.',
      channels: ['LinkedIn API', 'GoHighLevel', 'SMTP Nodes'],
      actions: ['CRM Creation', 'Calendar Hold', 'Proposal Dispatched'],
      color: 'from-blue-500/20 to-cyan-500/10 text-cyan-400 border-cyan-500/30'
    },
    {
      id: 'support',
      name: 'Customer Support Agent',
      icon: MessageSquare,
      badge: '24/7 SLA Deflection',
      desc: 'Integrates knowledge bases and vector storage to resolve complex multi-turn service tickets instantly before human escalation.',
      prompt: 'SYSTEM: Access the shared Vector DB containing product handbooks. Retrieve contextual chunks matching client troubleshooting logs. If certainty is below 85%, flag supervisor and draft handoff logs.',
      channels: ['WhatsApp API', 'Web widget', 'Slack Node'],
      actions: ['Knowledge Retreival', 'Refund Check', 'Triage Routing'],
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'hr',
      name: 'HR Agent',
      icon: Users,
      badge: 'Internal Employee Sync',
      desc: 'Automates employee onboarding checklists, structures candidate profiles, parses PDFs, and audits policy compliance requests.',
      prompt: 'SYSTEM: Parse uploaded resume files. Run semantic validation matching minimum experience markers. Schedule preliminary screen links and record results on internal spreadsheet databases.',
      channels: ['Google Drive', 'Slack Workspace', 'LinkedIn Recruiter'],
      actions: ['Resume Parsing', 'Onboarding Dispatches', 'Holiday Tracker Sync'],
      color: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30'
    },
    {
      id: 'finance',
      name: 'Finance Agent',
      icon: DollarSign,
      badge: 'Operational Ledger Auditor',
      desc: 'Tracks invoice collection nodes, matches transaction references, logs expenses, and triggers intelligent payment collection pings.',
      prompt: 'SYSTEM: Inspect official email receipts. Map billing timestamps to ledger references on Stripe / Razorpay API. If invoice status is overdue, escalate automated friendly warnings.',
      channels: ['Stripe API', 'QuickBooks Node', 'Slack Alert'],
      actions: ['Invoice Generation', 'Payment Reminders', 'Audit Ledger Writes'],
      color: 'from-amber-500/20 to-yellow-500/10 text-yellow-400 border-yellow-500/30'
    },
    {
      id: 'operations',
      name: 'Operations Agent',
      icon: Workflow,
      badge: 'Cross-SaaS Sync Node',
      desc: 'Connects fragmented SaaS layers, watches webhook triggers, processes multi-level approvals, and formats telemetry dashboards.',
      prompt: 'SYSTEM: Intercept incoming webhook notifications. Trigger cross-functional sync tasks between Notion, Slack, and GoHighLevel, logging execution latency for optimization.',
      channels: ['n8n webhook', 'Notion Database', 'Salesforce'],
      actions: ['Multi-SaaS routing', 'Delay Enforcer', 'Operational Alerts'],
      color: 'from-red-500/20 to-pink-500/10 text-pink-400 border-red-500/30'
    },
    {
      id: 'email',
      name: 'Email Agent',
      icon: Mail,
      badge: 'High-Deliverability Outreach',
      desc: 'Automates inbound support triage, outbound sequences, newsletters, and email audits with spam-score protection.',
      prompt: 'SYSTEM: Draft highly personalized outbound cold sequences. Scan sender domain health scores and enforce warmups. Ensure dynamic personalization based on recipient industry trends.',
      channels: ['SMTP Mailer', 'SendGrid', 'Spam Score Checker'],
      actions: ['Drip Sequences', 'Inbox Cleansing', 'Analytics Parsing'],
      color: 'from-teal-500/20 to-green-500/10 text-teal-300 border-teal-500/30'
    },
    {
      id: 'voice',
      name: 'Voice Agent',
      icon: Volume2,
      badge: 'Spoken Natural NLP',
      desc: 'Simulates fluid phone calls with human-like cadence for scheduling bookings, vetting leads, and supporting clinic patients.',
      prompt: 'SYSTEM: Initiate outpatient outbound confirmation calls. Listen for appointment time preferences, cross-reference clinic rosters, and confirm booking statuses over secure trunk lines.',
      channels: ['VoIP Trunking', 'Twilio Session', 'Roster Database'],
      actions: ['Outbound Dialing', 'Speech To Text Logs', 'CRM Notes Sync'],
      color: 'from-sky-500/20 to-blue-500/10 text-sky-400 border-sky-500/30'
    },
    {
      id: 'knowledge',
      name: 'Knowledge Agent',
      icon: Bookmark,
      badge: 'Vector Index Architect',
      desc: 'Scrapes, chunks, and structures loose enterprise manuals, docs, policies, and files into clean searchable embeddings.',
      prompt: 'SYSTEM: Scan folder files, extract texts, compute cosine similarity vectors, and upload to Pinecone indexing nodes. Auto-update chunks upon handbook modifications.',
      channels: ['Pinecone Nodes', 'Google Docs', 'Confluence API'],
      actions: ['Vector Embeddings', 'Chunk Formatting', 'Semantic Cataloging'],
      color: 'from-indigo-500/20 to-violet-500/10 text-indigo-400 border-indigo-500/30'
    },
    {
      id: 'research',
      name: 'Research Agent',
      icon: Search,
      badge: 'Competitive Intelligence',
      desc: 'Performs deep web-research, reads competitor pricing sheets, matches reviews, and synthesizes strategic intelligence briefs.',
      prompt: 'SYSTEM: Conduct multi-source competitive research across targets. Aggregate market indices, pricing variations, review scores, and build an executive summary PDF layout.',
      channels: ['Google Search API', 'Markdown Writer', 'PDF Exporter'],
      actions: ['Deep Crawling', 'Insight Summarization', 'Brief Structuring'],
      color: 'from-fuchsia-500/20 to-pink-500/10 text-fuchsia-400 border-fuchsia-500/30'
    },
    {
      id: 'reporting',
      name: 'Reporting Agent',
      icon: BarChart2,
      badge: 'Autonomous Analytics',
      desc: 'Compiles multi-department performance metrics, tracks SLA compliance, and formats visual summaries for weekly reviews.',
      prompt: 'SYSTEM: Query analytical logs. Calculate average response durations, daily conversion ratios, and SLA breach volumes. Render clean markdown graphs for board presentations.',
      channels: ['Database Query', 'Recharts Node', 'Slack PDF poster'],
      actions: ['Metrics aggregation', 'Report Rendering', 'Weekly Digests Dispatch'],
      color: 'from-lime-500/20 to-emerald-500/10 text-lime-400 border-lime-500/30'
    },
    {
      id: 'marketing',
      name: 'Marketing Agent',
      icon: Sparkles,
      badge: 'Multi-Channel Campaigner',
      desc: 'Writes high-performance social posts, drafts landing pages, tracks target CTRs, and manages programmatic ad sets.',
      prompt: 'SYSTEM: Produce SEO-optimized copy grids for target keywords. Evaluate social sentiment logs, map optimal publishing hours, and schedule posts across connected social pipelines.',
      channels: ['Meta Ads Manager', 'LinkedIn API', 'Buffer Node'],
      actions: ['Asset Drafting', 'CTR Optimization', 'Ad-set adjustments'],
      color: 'from-orange-500/20 to-amber-500/10 text-orange-400 border-orange-500/30'
    },
    {
      id: 'exec_assistant',
      name: 'Executive Assistant Agent',
      icon: Cpu,
      badge: 'Daily Swarm Orchestrator',
      desc: 'Coordinates calendars, drafts email replies, schedules internal meetings, structures notes, and issues task reminders.',
      prompt: 'SYSTEM: Clean the executive inbox daily. Archive receipts, categorize consulting questions, auto-draft replies for client approvals, and synchronize calendar adjustments.',
      channels: ['Gmail API', 'Google Calendar', 'Notion Space'],
      actions: ['Inbox Filtering', 'Meeting Booking', 'Meeting Minutes Draft'],
      color: 'from-cyan-500/20 to-indigo-500/10 text-cyan-300 border-cyan-500/30'
    }
  ];

  // ==========================================
  // 2. INTERACTIVE DEMO (SIMULATION CONSOLE)
  // ==========================================
  const [activeSimId, setActiveSimId] = useState<'sales' | 'finance' | 'support'>('sales');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [simLogs, setSimLogs] = useState<Array<{ sender: string; text: string; time: string; type: 'system' | 'agent' | 'success' }>>([]);
  const simTimerRef = useRef<NodeJS.Timeout | null>(null);

  const simulationSteps = {
    sales: [
      { sender: 'Orchestrator', text: 'Initializing Outbound Sourcing Flow... Core intent: Identify local Delhi SMBs with revenue > ₹10Cr.', type: 'system' },
      { sender: 'Research Agent', text: 'Scraping regional directory registrations. Located: "Vanguard Apparels Ltd" (Estimated Revenue: ₹18Cr). Extracting director contact info...', type: 'agent' },
      { sender: 'Knowledge Agent', text: 'Querying vector storage. Vector match found for "Apparel Lead Customization Pattern" in standard sales blueprint.', type: 'agent' },
      { sender: 'Sales Agent', text: 'Drafting high-intent customized outreach. Subject: "Optimizing Apparel Production Workflows by 40% via Automated n8n pipelines". Sending SMTP mail node...', type: 'agent' },
      { sender: 'Email Agent', text: 'Outreach dispatched. Domain deliverability: 99.4%. Tracking pixel synchronized.', type: 'agent' },
      { sender: 'Orchestrator', text: 'Outbound sequence completed successfully. CRM updated: Deal Stage moved to "Warm Lead Contacted".', type: 'success' }
    ],
    finance: [
      { sender: 'Orchestrator', text: 'Initializing Finance Audit Run... Core intent: Scan invoice receipt directory & audit bank settle notes.', type: 'system' },
      { sender: 'Finance Agent', text: 'Reading incoming payment receipts directory. Located receipt #INV-2026-9412 for ₹4,49,999 from Metro Heights.', type: 'agent' },
      { sender: 'Operations Agent', text: 'Querying Razorpay API nodes. Validated transaction ID: "pay_xyz7890". Match confirmed with 100% hash accuracy.', type: 'agent' },
      { sender: 'Reporting Agent', text: 'Re-calculating general ledger values. Documenting cash-flow balance node in QuickBooks.', type: 'agent' },
      { sender: 'Finance Agent', text: 'Dispatching official automated PDF invoice settlement receipt via WhatsApp Business API node.', type: 'agent' },
      { sender: 'Orchestrator', text: 'Settle-run audited and synced to Google Sheets. 0 discrepancies flagged.', type: 'success' }
    ],
    support: [
      { sender: 'Orchestrator', text: 'Initializing Support Intercept... Core intent: Resolve critical client query regarding RCS webhook delay.', type: 'system' },
      { sender: 'Customer Support Agent', text: 'Parsing client ticket logs. "Webhook payload is dropping with 504 gateway timeout during broadcasts."', type: 'agent' },
      { sender: 'Knowledge Agent', text: 'Performing semantic search across developer manuals. Retrieved document chunk: "Vite HMR proxy timeouts & buffer extensions".', type: 'agent' },
      { sender: 'Customer Support Agent', text: 'Drafting precise contextual fix details: "Increase proxy server timeout values to 4000ms inside vite.config.ts". Dispatching via WhatsApp...', type: 'agent' },
      { sender: 'Orchestrator', text: 'Client confirmed solution resolved. Ticket auto-closed with 5-star rating logs. Deflection rate: 100%.', type: 'success' }
    ]
  };

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(0);
    setSimLogs([]);

    const steps = simulationSteps[activeSimId];
    let index = 0;

    const addNextLog = () => {
      if (index < steps.length) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setSimLogs(prev => [...prev, { ...steps[index], time }]);
        setSimStep(index + 1);
        index++;
        simTimerRef.current = setTimeout(addNextLog, 1600);
      } else {
        setIsSimulating(false);
      }
    };

    addNextLog();
  };

  useEffect(() => {
    return () => {
      if (simTimerRef.current) clearTimeout(simTimerRef.current);
    };
  }, []);


  // ==========================================
  // 3. MULTI-AGENT ARCHITECTURE (INTERACTIVE GRAPH)
  // ==========================================
  const [activeArchStep, setActiveArchStep] = useState<number>(0);
  const architectureNodes = [
    { name: '1. User Input', desc: 'Enterprise client submits goals via Chat, SMS, Webhook, API, or Voice call.', detail: 'AgenticOS processes context logs, authenticates token keys, and boots a localized secure sandbox.' },
    { name: '2. Orchestrator Agent', desc: 'The cerebral hub. Evaluates user objectives, maps required steps, and tracks task SLAs.', detail: 'Auto-allocates sub-tasks to specialised planner nodes and dynamically adjusts computing memory pools.' },
    { name: '3. Planner Agent', desc: 'Formulates a robust step-by-step DAG (Directed Acyclic Graph) of operations.', detail: 'Validates safety constraints and structures optimal paths for tools to operate.' },
    { name: '4. Memory Layer', desc: 'Bidirectional RAG pipeline fetching historic records, metadata, and vectors.', detail: 'Bypasses standard LLM window limitations by checking Pinecone databases for long-term profiles.' },
    { name: '5. Specialized Agents', desc: 'Concurrent AI employees (Sales, HR, Support) execute specialized operations.', detail: 'They consult, collaborate, double-check outputs, and establish swarm consensus.' },
    { name: '6. Operational Tools', desc: 'External integrations utilized (GoHighLevel, SMTP, Twilio, Razorpay).', detail: 'Executes actual database mutations, dispatches mail templates, or initiates VoIP phone trunks.' },
    { name: '7. External Systems', desc: 'Final write operations directly onto connected CRM, Cloud databases, or APIs.', detail: 'Data syncing to HubSpot, QuickBooks, Salesforce, or relational SQL databases occurs safely.' },
    { name: '8. Response Cycle', desc: 'A synthesized response is generated and routed back to the initial user.', type: 'success', detail: 'Compiles full workflow logs, token usages, operational speed, and triggers follow-up schedules.' }
  ];

  // ==========================================
  // 4. MEMORY LAYER & INTERACTIVE KNOWLEDGE SEARCH
  // ==========================================
  const [vectorQuery, setVectorQuery] = useState('');
  const [isSearchingVector, setIsSearchingVector] = useState(false);
  const [vectorResults, setVectorResults] = useState<Array<{ id: string; similarity: number; chunk: string; metadata: string }>>([]);

  const mockVectorDatabase = [
    { id: 'vec_9410', similarity: 0.941, chunk: 'Enterprise CRM standard billing structures and monthly settlement intervals for Razorpay links.', metadata: 'Category: Finance | Source: billing_manual.pdf' },
    { id: 'vec_8842', similarity: 0.884, chunk: 'Outpatient appointment booking rules for Radiant Dental. Limit holds to max 2 open slots per customer.', metadata: 'Category: Operations | Source: clinic_rules.docx' },
    { id: 'vec_7921', similarity: 0.792, chunk: 'RCS Messaging high-deliverability templates containing quick action button nodes for holiday promotions.', metadata: 'Category: Marketing | Source: rcs_templates.txt' },
    { id: 'vec_7530', similarity: 0.753, chunk: 'GoHighLevel pipeline auto-escalation triggers. Move unassigned leads to senior account representatives after 15m.', metadata: 'Category: Sales | Source: ghl_triggers_v3.json' },
    { id: 'vec_6841', similarity: 0.684, chunk: 'SOP compliance regarding patient phone call consent recording over SIP Twilio trunk lines.', metadata: 'Category: Compliance | Source: legal_sop.docx' }
  ];

  const handleVectorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vectorQuery.trim()) return;

    setIsSearchingVector(true);
    setVectorResults([]);

    setTimeout(() => {
      // Filter mock matches by query terms
      const queryLower = vectorQuery.toLowerCase();
      const filtered = mockVectorDatabase.filter(item => 
        item.chunk.toLowerCase().includes(queryLower) || 
        item.metadata.toLowerCase().includes(queryLower)
      );

      // Default to returning some varied matches if no direct term is found
      const finalResults = filtered.length > 0 ? filtered : mockVectorDatabase.slice(0, 2);
      setVectorResults(finalResults);
      setIsSearchingVector(false);
    }, 1200);
  };


  // ==========================================
  // 5. N8N ENTERPRISE WORKFLOW SIMULATOR
  // ==========================================
  const [isWorkflowRunning, setIsWorkflowRunning] = useState(false);
  const [workflowNodesState, setWorkflowNodesState] = useState({
    webhook: 'idle',
    gemini: 'idle',
    pinecone: 'idle',
    stripe: 'idle',
    whatsapp: 'idle'
  });

  const runN8nWorkflow = () => {
    if (isWorkflowRunning) return;
    setIsWorkflowRunning(true);
    
    // Webhook fires
    setWorkflowNodesState({ webhook: 'active', gemini: 'idle', pinecone: 'idle', stripe: 'idle', whatsapp: 'idle' });
    
    setTimeout(() => {
      // Gemini processes
      setWorkflowNodesState({ webhook: 'success', gemini: 'active', pinecone: 'idle', stripe: 'idle', whatsapp: 'idle' });
      
      setTimeout(() => {
        // Pinecone memory fetch
        setWorkflowNodesState({ webhook: 'success', gemini: 'success', pinecone: 'active', stripe: 'idle', whatsapp: 'idle' });
        
        setTimeout(() => {
          // Stripe mutation
          setWorkflowNodesState({ webhook: 'success', gemini: 'success', pinecone: 'success', stripe: 'active', whatsapp: 'idle' });
          
          setTimeout(() => {
            // WhatsApp confirmation
            setWorkflowNodesState({ webhook: 'success', gemini: 'success', pinecone: 'success', stripe: 'success', whatsapp: 'active' });
            
            setTimeout(() => {
              setWorkflowNodesState({ webhook: 'success', gemini: 'success', pinecone: 'success', stripe: 'success', whatsapp: 'success' });
              setIsWorkflowRunning(false);
            }, 1000);
          }, 1200);
        }, 1200);
      }, 1000);
    }, 1000);
  };


  // ==========================================
  // 6. ROI CALCULATOR STATE
  // ==========================================
  const [employeesCount, setEmployeesCount] = useState(25);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(15);
  const [avgHourlySalary, setAvgHourlySalary] = useState(450); // in INR

  // Math: 
  // Hours saved per week total = employeesCount * manualHoursPerWeek * 0.70 (deflection/automation speed)
  const calculatedHoursSavedPerMonth = Math.round(employeesCount * manualHoursPerWeek * 4.33 * 0.75);
  // Monthly savings total = hoursSaved * avgHourlySalary
  const calculatedMonthlySavings = calculatedHoursSavedPerMonth * avgHourlySalary;
  // Annual savings = monthly * 12
  const calculatedAnnualSavings = calculatedMonthlySavings * 12;
  // Productivity multiplier
  const calculatedProductivityIncrease = Math.round((manualHoursPerWeek * 0.75 / 40) * 100) + 12;

  // Format currency helper
  const formatINR = (num: number) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    }
    if (num >= 100000) {
      return `₹${(num / 10000).toFixed(1)} Lakh`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };


  // ==========================================
  // 7. AI AGENT MARKETPLACE DEPLOY MODAL
  // ==========================================
  const [deployingTemplate, setDeployingTemplate] = useState<string | null>(null);
  const [deployProgress, setDeployProgress] = useState(0);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);

  const marketplaceTemplates = [
    { name: 'Sales Agent Template', target: 'GoHighLevel Deals & outbound mailers.', complexity: 'High', latency: '400ms', envVars: ['GHL_ACCESS_TOKEN', 'SMTP_SENDER'] },
    { name: 'HR Agent Template', target: 'Slack workflows, resume parsing, Google Docs.', complexity: 'Medium', latency: '650ms', envVars: ['SLACK_BOT_TOKEN', 'DRIVE_CREDENTIALS'] },
    { name: 'Finance Agent Template', target: 'Stripe, Razorpay API ledger reconciliations.', complexity: 'High', latency: '350ms', envVars: ['STRIPE_SECRET_KEY', 'RAZORPAY_SECRET'] },
    { name: 'Marketing Agent Template', target: 'Programmatic SEO rendering, local keyword grids.', complexity: 'Low', latency: '500ms', envVars: ['GEMINI_API_KEY', 'META_AD_TOKEN'] },
    { name: 'Research Agent Template', target: 'Google Search API web crawl summaries.', complexity: 'Medium', latency: '800ms', envVars: ['GOOGLE_CSE_ID', 'EXCEL_SYNC'] },
    { name: 'Executive Assistant', target: 'Google Calendar booking & client email sweeps.', complexity: 'Low', latency: '300ms', envVars: ['GOOGLE_CALENDAR_CREDENTIALS', 'GMAIL_READ_WRITE'] }
  ];

  const handleDeployTemplate = (templateName: string) => {
    setDeployingTemplate(templateName);
    setDeployProgress(0);
    setDeployLogs(['Initializing Vercel / Edge environment sandbox...', 'Checking n8n execution triggers...', 'Injecting required system prompts...']);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setDeployProgress(progress);
      
      if (progress === 40) {
        setDeployLogs(prev => [...prev, 'Configuring vector store embedding connections...', 'Running Pinecone index audits...']);
      } else if (progress === 80) {
        setDeployLogs(prev => [...prev, 'Validating biderectional CRM webhook synchronizers...', 'Syncing SSL secure token certificates...']);
      } else if (progress === 100) {
        setDeployLogs(prev => [...prev, '⚡ Deployment complete! Agent is now live in production sandboxes.']);
        clearInterval(interval);
      }
    }, 800);
  };


  // ==========================================
  // 8. DISCOVERY FORM SUBMISSION
  // ==========================================
  const [discoveryForm, setDiscoveryForm] = useState({
    fullName: '',
    companyName: '',
    industry: 'Healthcare',
    country: 'India',
    email: '',
    phone: '',
    currentTools: 'Notion, GHL',
    biggestChallenges: '',
    prefAutomationArea: 'Sales Outbound',
    budgetRange: '₹49,999 - ₹1,49,999',
    message: ''
  });

  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [ghlLogs, setGhlLogs] = useState<string[]>([]);

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaInput('');
    setCaptchaVerified(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleCaptchaVerify = () => {
    if (parseInt(captchaInput) === (captchaNum1 + captchaNum2)) {
      setCaptchaVerified(true);
    } else {
      alert("Incorrect verification SUM value. Please retry.");
      generateCaptcha();
    }
  };

  const handleDiscoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please solve the verification math challenge first.");
      return;
    }
    setFormLoading(true);
    setGhlLogs(['Firing n8n secure client webhook...', 'Posting payload structures to GoHighLevel API...', 'Creating contact logs inside CRM index...']);

    setTimeout(() => {
      setGhlLogs(prev => [...prev, 'Bidirectional synchronization complete. CRM ID: GHL_CONTACT_9421', 'Sending instant confirmation via email...']);
      setTimeout(() => {
        setFormLoading(false);
        setFormSubmitted(true);
      }, 1000);
    }, 1500);
  };


  // ==========================================
  // 9. FAQ ACCORDION STATE
  // ==========================================
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is AgenticOS™?",
      a: "AgenticOS™ is an enterprise-grade multi-agent coordination platform that lets businesses build, configure, and scale specialized AI employees. It combines deep cognitive models with tools, external software integrations, and vector database memory modules in secure n8n sandbox nodes."
    },
    {
      q: "How does AgenticOS™ compare to frameworks like LangChain or AutoGen?",
      a: "While LangChain is a code library requiring complex custom engineering, AgenticOS™ is a full-stack operating system. We provide pre-built, visual drag-and-drop dashboard interfaces, built-in vector caches, bidirectional CRM webhook pipelines, and ready-to-deploy multi-agent consensus templates out-of-the-box."
    },
    {
      q: "What is a 'Multi-Agent Consensus Matrix'?",
      a: "This is a key proprietary logic gate in AgenticOS™. Instead of a single AI trying to resolve a task with potential errors, we route operations through specialized peers. For instance, a Sales Agent drafts a proposal, a Finance Agent reviews the billing parameters, and a third Auditor Agent double-checks calculations before any mail is ever dispatched, reducing errors to absolute zero."
    },
    {
      q: "How secure is our enterprise database privacy?",
      a: "Extremely secure. All agent executions occur inside local AES-256 encrypted sandboxes with secure SSL perimeters. We integrate strictly with enterprise compliance specifications, supporting HIPAA, SOC2 Type II, and GDPR data logging constraints. We never share your data with model training logs."
    },
    {
      q: "Do these AI agents require custom programming?",
      a: "No programming is required. Users can configure agents completely using standard natural language system prompts, choose their input channels (WhatsApp, Email, Webhooks), specify allowed tool access tokens, and launch them instantly via our drag-and-drop Marketplace."
    },
    {
      q: "Can we connect AgenticOS™ to our local Indian CRM systems like Tally or LeadSquared?",
      a: "Yes. AgenticOS™ features robust bidirectional webhook support and customized n8n automation triggers. We can synchronize transaction records, client ledger adjustments, and customer tag modifications to Tally, Zoho, LeadSquared, GoHighLevel, and HubSpot automatically."
    },
    {
      q: "What is the cost of executing vector search requests?",
      a: "Our vector retrieval caches are highly optimized. AgenticOS™ operates on top of Pinecone and Redis servers, meaning typical search latency is under 50ms with extremely negligible token consumption costs."
    },
    {
      q: "Does the AI Voice Agent support regional Indian languages?",
      a: "Yes. Our spoken voice modules support clean conversational NLP across English, Hindi, Tamil, Telugu, Kannada, Bengali, and Marathi, with highly comfortable localized accents."
    },
    {
      q: "How does the ROI Savings Calculator compute productivity boosts?",
      a: "It compares manual employee labor hours spent on structural tasks (e.g., writing emails, checking invoices, scheduling calendars) with our proven 75% deflection rate, multiplying the hours saved by your custom average payroll structures."
    },
    {
      q: "What hosting options are available for the enterprise tier?",
      a: "Enterprise clients can choose between Vercel Edge Cloud, dedicated AWS instances, private Google Cloud perimeter nodes, or fully on-premise local servers for complete sovereign database control."
    },
    {
      q: "Can multiple specialized agents collaborate on a single n8n workflow?",
      a: "Absolutely! That is the core architecture. You can connect a Webhook node to a Research Agent, route the output to a Marketing Agent, pass it to an HR Agent for internal policy audit, and finally push to Slack or Mailer nodes."
    },
    {
      q: "How long does it take to onboard and deploy a customized sales swarm?",
      a: "Simple templates can be launched inside 3 minutes via the Marketplace. For complete bidirectional enterprise-wide integrations with proprietary legacy systems, our engineering team maps and deploys workflows within 10 to 14 business days."
    },
    {
      q: "What happens if an AI Agent encounters an unknown query or system crash?",
      a: "We deploy rigorous fallback layers. If confidence drops below 85% or an API returns an exception, the agent immediately flags a human supervisor in Slack or GoHighLevel with a full execution traceback, ensuring zero client disruption."
    },
    {
      q: "Is there a limit to how many API tools an agent can utilize?",
      a: "In the Starter tier, agents are limited to 3 concurrent tool connections. The Growth and Enterprise plans allow unlimited APIs, Google Workspace modules, CRM structures, and webhook routes."
    },
    {
      q: "Can we schedule agents to run periodic cron audits at specific hours?",
      a: "Yes. You can configure cron triggers directly in n8n (e.g. 'Every Friday at 5:00 PM') to audit financial ledgers, crawl competitors, or draft weekly summaries entirely hands-free."
    },
    {
      q: "How do you prevent agents from entering looping execution traps?",
      a: "We enforce strict 'Execution Depth Limits'. If an agent triggers more than 10 consecutive tool loops without producing a final result, the Orchestrator auto-suspends the thread and dispatches an alert node to the operations console."
    },
    {
      q: "Can we test prompts in a sandboxed playground before pushing them to clients?",
      a: "Yes! Every agent contains a dedicated Simulation Console (like the one shown in our live demo) where you can test prompts, evaluate logs, and review outputs with zero customer visibility."
    },
    {
      q: "Are model API keys included in the subscription fee?",
      a: "The Starter and Growth tiers use our shared corporate LLM API allocations, whereas Enterprise plans support connecting custom OpenAI, Gemini Pro, or Anthropic enterprise accounts directly."
    },
    {
      q: "Does AgenticOS™ support bulk WhatsApp broadcasting?",
      a: "Yes. We integrate directly with official Meta Cloud WhatsApp APIs, letting you dispatch personalized interactive broadcast templates to qualified lead cohorts safely."
    },
    {
      q: "Can the platform analyze uploaded media like PDFs, invoice receipts, and photos?",
      a: "Yes, fully. We use highly responsive multi-modal cognitive models. Our agents can scan complex layout tables inside PDFs, read handwritten invoice receipts, parse ID certificates, and extract clean text structures with near 100% precision."
    }
  ];

  // ==========================================
  // 10. INDUSTRY AI BLUEPRINTS STATE
  // ==========================================
  const [activeIndustryId, setActiveIndustryId] = useState<string>('healthcare');
  const industryBlueprints = [
    {
      id: 'healthcare',
      name: 'Healthcare Systems',
      icon: Building,
      challenge: 'Front-desk patient scheduling bottleneck and manual record categorization.',
      strategy: 'Deploy a Patient Intake Voice Agent mapped to clinic rosters and medical DBs, confirming times via WhatsApp.',
      roi: '94% coordination deflection, 22 hours weekly freed for reception staff.'
    },
    {
      id: 'education',
      name: 'Education Providers',
      icon: GraduationCap,
      challenge: 'Processing high-volume admissions queries and checking reference certificate uploads.',
      strategy: 'Structured RAG knowledge base answers academic prospectus details, while OCR parses qualification PDFs.',
      roi: '3.2x faster application vetting, 0 missed intake opportunities.'
    },
    {
      id: 'real_estate',
      name: 'Real Estate swarms',
      icon: HomeIcon,
      challenge: 'Following up on outbound portals with cold leads and updating deal stages on spreadsheets.',
      strategy: 'Automated CRM Sync Agent logs lead interest parameters immediately, scheduling virtual site-visit calendars.',
      roi: '45% increase in site visits, zero lead leakage.'
    },
    {
      id: 'retail',
      name: 'Retail & E-Commerce',
      icon: ShoppingBag,
      challenge: 'Handling failed payments, processing refunds, and answering package tracking questions.',
      strategy: 'Finance Agent generates UPI QR code links and synchronizes shipping catalogs directly inside WhatsApp API.',
      roi: '18% cart recovery rate improvement, zero delayed replies.'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing & Supply',
      icon: Factory,
      challenge: 'Auditing multi-page invoice receipts and matching warehouse storage manifests.',
      strategy: 'Operations Agent scrapes vendor PDFs, validates ledger values, and alerts supervisors on discrepancy loops.',
      roi: '₹2.8L/mo labor savings, total elimination of invoice mismatches.'
    },
    {
      id: 'professional_services',
      name: 'Professional Services',
      icon: Briefcase,
      challenge: 'Writing complex outbound consulting proposals and updating client spreadsheets.',
      strategy: 'Research Agent gathers company profiles, drafts customized PDF proposals, and fires automated SMTP drips.',
      roi: '60% time saved on proposal drafts, 2.5x deal pipeline velocity.'
    }
  ];

  return (
    <div className="bg-[#03010E] text-white py-12 animate-fade-in font-sans text-left transition-colors duration-500 overflow-hidden relative selection:bg-purple-500 selection:text-white">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-purple-950/20 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-0 w-[600px] h-[600px] bg-blue-950/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[700px] h-[700px] bg-cyan-950/20 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 text-xs font-mono text-gray-500 flex items-center gap-1.5">
          <button onClick={() => setPath('home')} className="hover:text-cyan-400 transition-colors">Home</button> 
          <span>/</span> 
          <span className="hover:text-purple-400 transition-colors cursor-pointer" onClick={() => setPath('products/growth-os' as RoutePath)}>Products</span> 
          <span>/</span> 
          <span className="text-purple-400 font-semibold">AgenticOS</span>
        </div>

        {/* ==========================================
            HERO SECTION (Animated Neural Network)
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative min-h-[500px]">
          
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-purple-300 font-bold">
                Flagship Enterprise AI Operating System
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight">
              Build Your Autonomous <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
                AI Workforce.
              </span>
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-gray-400 max-w-2xl">
              Deploy intelligent, specialized AI employees that automate repetitive operational work, sync CRM data, reconcile ledgers, audit compliance policies, and assist human teams 24×7. High-speed multi-agent systems built for real enterprise scale.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#discovery_form" 
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all flex items-center gap-2 text-sm"
              >
                Book Discovery Call <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#interactive_demo" 
                className="px-6 py-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-purple-400 transition-all flex items-center gap-2 text-sm font-semibold"
              >
                Watch AgenticOS Demo <Play className="h-4 w-4 text-purple-400 animate-pulse" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 text-[10px] font-mono text-gray-500 border-t border-white/5">
              <span className="flex items-center gap-1.5 text-cyan-400">● 100% Secure Edge Sandboxes</span>
              <span className="flex items-center gap-1.5 text-purple-400">● Bidirectional CRM Syncing</span>
              <span className="flex items-center gap-1.5 text-emerald-400">● GDPR & SOC2 Compliant Node</span>
            </div>
          </div>

          {/* Right Column: Animated Neural Network Visualization */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] rounded-3xl border border-white/5 bg-slate-950/40 overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
            
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md shadow-2xl relative w-[90%] max-w-[340px] z-10 text-left">
              <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                <span className="text-[10px] font-mono uppercase text-purple-400 flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5 text-cyan-400 animate-spin" /> ACTIVE AGENT SWARM
                </span>
                <span className="text-[8px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">ONLINE</span>
              </div>

              <div className="space-y-2">
                <div className="p-2 bg-black/40 border border-white/5 rounded-lg text-xs font-mono flex items-center justify-between">
                  <span className="text-gray-400">Active swarms:</span>
                  <span className="text-cyan-400 font-bold">12 Employees</span>
                </div>
                <div className="p-2 bg-black/40 border border-white/5 rounded-lg text-xs font-mono flex items-center justify-between">
                  <span className="text-gray-400">Total Latency:</span>
                  <span className="text-purple-400 font-bold">&lt; 380ms</span>
                </div>
                <div className="p-2 bg-black/40 border border-white/5 rounded-lg text-xs font-mono flex items-center justify-between">
                  <span className="text-gray-400">Task deflection:</span>
                  <span className="text-emerald-400 font-bold">75.4%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block mb-1">Target Platforms connected:</span>
                <div className="flex justify-center gap-2 text-[10px] font-mono font-bold text-gray-400">
                  <span>HubSpot</span> <span>●</span> <span>n8n</span> <span>●</span> <span>Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            ECOSYSTEM (Meet Your AI Employees Bento Grid)
           ========================================== */}
        <div id="ecosystem" className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Comprehensive AI Swarm</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Meet Your AI Employees
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Stop deploying narrow chatbots. AgenticOS™ lets you deploy high-efficiency, multi-agent swarms tailored to critical enterprise departments. Click any node to inspect prompt parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agentsData.map((agent) => {
              const Icon = agent.icon;
              return (
                <div 
                  key={agent.id}
                  onClick={() => setSelectedAgentId(selectedAgentId === agent.id ? null : agent.id)}
                  className={`p-5 rounded-2xl border bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    selectedAgentId === agent.id ? 'border-purple-500 shadow-lg shadow-purple-500/10' : 'border-white/5'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${agent.color.split(' ')[0]} ${agent.color.split(' ')[2]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-purple-400 transition-colors">Inspect prompt</span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xs font-bold font-display flex items-center gap-1.5">
                        {agent.name}
                        {selectedAgentId === agent.id && <span className="h-1.5 w-1.5 bg-purple-400 rounded-full" />}
                      </h3>
                      <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-3">{agent.desc}</p>
                    </div>
                  </div>

                  {/* Expand drawer details if clicked */}
                  {selectedAgentId === agent.id ? (
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-3 animate-fade-in text-left">
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono text-purple-400 uppercase font-bold block">Specialized Prompt Blueprints:</span>
                        <div className="p-2 rounded bg-black/40 border border-white/5 font-mono text-[8px] leading-relaxed text-gray-400 max-h-16 overflow-y-auto">
                          {agent.prompt}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(agent.prompt);
                            setCopiedPrompt(true);
                            setTimeout(() => setCopiedPrompt(false), 1500);
                          }}
                          className="text-[7px] font-mono text-cyan-400 underline uppercase hover:text-cyan-300 block pt-1"
                        >
                          {copiedPrompt ? 'Copied!' : 'Copy system prompt'}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[8px] font-mono">
                        <div>
                          <span className="text-gray-500 block">CHANNELS:</span>
                          <span className="text-gray-300 font-bold block">{agent.channels.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">ACTIONS:</span>
                          <span className="text-cyan-300 font-bold block">{agent.actions.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-gray-500">
                      <span>{agent.badge}</span>
                      <ChevronDown className="h-3 w-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            INTERACTIVE DEMO (Task Execution Console)
           ========================================== */}
        <div id="interactive_demo" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Autonomous Sandbox Simulation</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              See AgenticOS™ In Action
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Select an objective scenario below and trigger our multi-agent workforce. Watch specialized agents coordinate, consult memory vectors, execute APIs, and write to database nodes in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-white/10 rounded-3xl overflow-hidden bg-slate-950/60 backdrop-blur-md">
            
            {/* Left Controls */}
            <div className="lg:col-span-4 p-6 border-r border-white/5 flex flex-col justify-between bg-black/20">
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">CHOOSE SCENARIO OBJECTIVE</span>
                
                <div className="space-y-2">
                  {[
                    { id: 'sales', label: 'Outbound Sourcing Swarm', sub: 'Scrape targets & fire drafts', icon: TrendingUp },
                    { id: 'finance', label: 'Financial Audit Run', sub: 'Match invoices & sync stripe', icon: DollarSign },
                    { id: 'support', label: 'Support Intercept Triage', sub: 'Search vector docs & solve', icon: MessageSquare }
                  ].map((sim) => {
                    const Icon = sim.icon;
                    return (
                      <button
                        key={sim.id}
                        onClick={() => {
                          if (!isSimulating) {
                            setActiveSimId(sim.id as any);
                            setSimLogs([]);
                            setSimStep(0);
                          }
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                          activeSimId === sim.id 
                            ? 'border-purple-500 bg-purple-500/10 text-white' 
                            : 'border-white/5 bg-black/20 text-gray-400 hover:text-white hover:border-white/10'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${activeSimId === sim.id ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{sim.label}</span>
                          <span className="text-[9px] text-gray-500 block">{sim.sub}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-3">
                <button
                  onClick={startSimulation}
                  disabled={isSimulating}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 text-white font-bold rounded-lg text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Simulating Swarm...
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" /> Execute Task Swarm
                    </>
                  )}
                </button>
                <span className="text-[8px] font-mono text-gray-500 block text-center uppercase tracking-wider">
                  Uses corporate gemini models inside sandboxed environment
                </span>
              </div>
            </div>

            {/* Right Simulation Console Display */}
            <div className="lg:col-span-8 p-6 flex flex-col justify-between bg-black/40 min-h-[400px]">
              <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4 bg-black/20 px-3 py-2 rounded-lg">
                <span className="text-[10px] font-mono text-purple-400 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-cyan-400 animate-pulse" /> EDGE RUNTIME CONSOLE
                </span>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Logs area */}
              <div className="flex-grow font-mono text-[10px] leading-relaxed p-4 bg-black/60 rounded-xl border border-white/5 space-y-3 overflow-y-auto max-h-[260px] text-left">
                {simLogs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 py-12 space-y-2">
                    <Terminal className="h-8 w-8 text-purple-500/40" />
                    <span>Select an objective on the left and click 'Execute Task' to watch.</span>
                  </div>
                ) : (
                  simLogs.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2 rounded border border-white/[0.03] transition-all duration-300 ${
                        log.type === 'system' ? 'bg-slate-900/40 text-blue-300' :
                        log.type === 'success' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                        'bg-purple-950/20 text-purple-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1 text-[8px] opacity-70">
                        <span className="font-bold">[{log.sender}]</span>
                        <span>{log.time}</span>
                      </div>
                      <p>{log.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Console status */}
              <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-gray-500 pt-2 border-t border-white/5">
                <span>Task Execution: {simStep}/{simulationSteps[activeSimId].length} steps</span>
                <span className="text-cyan-400">Consensus Engine: SOC2 SECURE</span>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            MULTI-AGENT ARCHITECTURE (3D/Isometric Flow)
           ========================================== */}
        <div id="multi_agent_architecture" className="mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Dynamic Execution Flow</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Multi-Agent Architecture
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Our unique coordination stack resolves problems hierarchically. Review each structural node below to inspect operational bandwidth and data flow logic.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Interactive Diagram Nodes */}
            <div className="lg:col-span-7 space-y-3 relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-indigo-500 -z-10 opacity-30" />
              
              {architectureNodes.map((node, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveArchStep(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center gap-4 relative z-10 ${
                    activeArchStep === idx 
                      ? 'border-purple-400 bg-purple-500/10 shadow-md shadow-purple-500/5' 
                      : 'border-white/5 bg-black/40 hover:border-white/10'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    activeArchStep === idx ? 'bg-purple-500 text-white scale-110' : 'bg-white/5 text-gray-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-grow">
                    <span className="text-xs font-bold block">{node.name}</span>
                    <span className="text-[10px] text-gray-400 block line-clamp-1">{node.desc}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${activeArchStep === idx ? 'rotate-90 text-purple-400' : 'text-gray-600'}`} />
                </button>
              ))}
            </div>

            {/* Node Specifications telemetry */}
            <div className="lg:col-span-5 p-6 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-md space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">ARCHITECTURE NODE TELEMETRY:</span>
                <h3 className="text-sm font-bold font-display">{architectureNodes[activeArchStep].name}</h3>
              </div>

              <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-3 text-left">
                <span className="text-[9px] font-mono text-gray-500 uppercase block font-bold">Execution Mechanics</span>
                <p className="text-xs leading-relaxed text-gray-300">
                  {architectureNodes[activeArchStep].detail}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-black/20 border border-white/5 rounded-lg text-center">
                  <span className="text-gray-500 block text-[9px]">COMPUTE TYPE:</span>
                  <span className="text-cyan-400 font-bold">Edge serverless</span>
                </div>
                <div className="p-3 bg-black/20 border border-white/5 rounded-lg text-center">
                  <span className="text-gray-500 block text-[9px]">SLA WINDOW:</span>
                  <span className="text-purple-400 font-bold">&lt; 15 Seconds</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            MEMORY & KNOWLEDGE LAYER (Semantic Vector Search)
           ========================================== */}
        <div id="memory_layer" className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-300 font-bold">
                <span>🧠 HIGH DENSITY VECTOR STORAGE</span>
              </div>
              <h2 className="text-3xl font-bold font-display tracking-tight">
                Memory & Knowledge Layer
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
                AI employees can only be useful if they retain context and access verified manual files. Our long-term RAG architecture converts PDFs, folders, manuals, and chats into searchable semantic coordinate maps.
              </p>

              <div className="space-y-3 font-mono text-xs text-gray-300">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span>Real-time computed cosine-similarity values.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span>Sovereign Pinecone and Redis vector indexing.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span>Bidirectional catalog syncing via active crawlers.</span>
                </div>
              </div>
            </div>

            {/* Interactive Vector Search Sandbox */}
            <div className="lg:col-span-6 p-6 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-md space-y-4">
              <div className="border-b border-white/5 pb-3">
                <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 font-mono">
                  <Database className="h-4 w-4 text-purple-400 animate-bounce" /> Vector Memory Query Terminal
                </h4>
              </div>

              <form onSubmit={handleVectorSearch} className="flex gap-2">
                <input 
                  type="text"
                  value={vectorQuery}
                  onChange={(e) => setVectorQuery(e.target.value)}
                  placeholder="Type 'dental' or 'payment' or 'GHL'..."
                  className="flex-grow bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-purple-400"
                />
                <button 
                  type="submit" 
                  disabled={isSearchingVector}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg text-xs font-mono font-bold uppercase"
                >
                  {isSearchingVector ? 'Embedding...' : 'Query Vectors'}
                </button>
              </form>

              {/* Vector matches */}
              <div className="space-y-2 min-h-[140px] flex flex-col justify-center">
                {isSearchingVector ? (
                  <div className="text-center font-mono text-[10px] text-gray-500 py-8 animate-pulse">
                    Computing cosine similarities and querying index trees...
                  </div>
                ) : vectorResults.length === 0 ? (
                  <div className="text-center font-mono text-[9px] text-gray-500 py-8 italic">
                    Type a query (e.g. "dental" or "payment") and test our semantic coordinate search matches.
                  </div>
                ) : (
                  vectorResults.map((res, i) => (
                    <div key={res.id} className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1.5 text-left">
                      <div className="flex justify-between items-center text-[8px] font-mono">
                        <span className="text-purple-400 font-bold">[{res.id}] Match</span>
                        <span className="text-emerald-400 font-bold">Similarity score: {(res.similarity * 100).toFixed(1)}%</span>
                      </div>
                      <p className="text-[10px] text-gray-300 font-mono leading-relaxed">"{res.chunk}"</p>
                      <span className="text-[7px] text-gray-500 block font-mono">{res.metadata}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            N8N ENTERPRISE AUTOMATION (WORKFLOW CANVAS)
           ========================================== */}
        <div id="n8n_workflows" className="mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Enterprise System Integrator</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              n8n Enterprise Automation
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Connect core business tools in n8n pipelines mapped to AgenticOS™ nodes. Trigger execution sweeps live to see data flowing seamlessly.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 border-b border-white/5 pb-4">
              <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
                <GitBranch className="h-4 w-4 text-cyan-400" /> ACTIVE WORKFLOW BUILDER
              </span>
              <button
                onClick={runN8nWorkflow}
                disabled={isWorkflowRunning}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 text-xs font-mono font-bold rounded-lg uppercase tracking-wider flex items-center gap-2"
              >
                {isWorkflowRunning ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                {isWorkflowRunning ? 'Executing Pipeline...' : 'Run Automation Pipeline'}
              </button>
            </div>

            {/* Interactive n8n Visual Graph */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative items-center py-6">
              {[
                { id: 'webhook', label: '1. Webhook Input', icon: ArrowRightLeft, desc: 'Lead form submit' },
                { id: 'gemini', label: '2. Gemini Node', icon: Cpu, desc: 'Score lead intent' },
                { id: 'pinecone', label: '3. Pinecone Index', icon: Database, desc: 'Match memories' },
                { id: 'stripe', label: '4. Stripe API', icon: DollarSign, desc: 'Draft checkout invoice' },
                { id: 'whatsapp', label: '5. WhatsApp Dispatch', icon: MessageSquare, desc: 'Fires UPI templates' }
              ].map((node, i) => {
                const Icon = node.icon;
                const state = workflowNodesState[node.id as keyof typeof workflowNodesState];
                return (
                  <div key={node.id} className="relative flex flex-col items-center">
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center border transition-all duration-500 z-10 ${
                      state === 'active' ? 'border-purple-400 bg-purple-500/20 scale-110 shadow-lg shadow-purple-500/20 animate-pulse' :
                      state === 'success' ? 'border-emerald-400 bg-emerald-500/10' :
                      'border-white/5 bg-black/40'
                    }`}>
                      <Icon className={`h-6 w-6 transition-colors duration-500 ${
                        state === 'active' ? 'text-purple-300' :
                        state === 'success' ? 'text-emerald-400' :
                        'text-gray-500'
                      }`} />
                    </div>
                    <div className="text-center mt-3 space-y-0.5">
                      <span className="text-[10px] font-bold block">{node.label}</span>
                      <span className="text-[8px] text-gray-500 block">{node.desc}</span>
                      {state === 'success' && (
                        <span className="text-[8px] text-emerald-400 font-mono font-bold block">✓ Completed</span>
                      )}
                      {state === 'active' && (
                        <span className="text-[8px] text-purple-400 font-mono font-bold block animate-pulse">● Running</span>
                      )}
                    </div>

                    {/* Connecting arrows between items */}
                    {i < 4 && (
                      <div className="hidden md:block absolute top-8 -right-4 translate-x-1/2 z-0">
                        <ChevronRight className={`h-4 w-4 transition-colors ${
                          state === 'success' ? 'text-emerald-400 animate-pulse' : 'text-gray-700'
                        }`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==========================================
            AI AGENT MARKETPLACE (INTERACTIVE GRID)
           ========================================== */}
        <div id="agent_marketplace" className="mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Deployable Templates</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              AI Agent Marketplace
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Browse pre-configured agent swarms complete with tool matrices and logic pipelines. Click "Deploy Swarm" to launch in Vercel Edge nodes instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceTemplates.map((tmpl) => (
              <div key={tmpl.name} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col justify-between">
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold font-display">{tmpl.name}</h3>
                    <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[8px] font-mono">
                      Complexity: {tmpl.complexity}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Automated templates mapped for {tmpl.target}
                  </p>

                  <div className="space-y-2 border-t border-white/5 pt-3">
                    <span className="text-[8px] font-mono text-gray-500 block">REQUIRED COGNITIVE VARS:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tmpl.envVars.map((v) => (
                        <span key={v} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/5 text-gray-400">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[8px] font-mono text-cyan-400">Avg Latency: {tmpl.latency}</span>
                  <button 
                    onClick={() => handleDeployTemplate(tmpl.name)}
                    className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded border border-purple-500/30 text-[9px] font-mono uppercase font-bold"
                  >
                    Deploy Swarm
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Deployment Progress Modal Drawer if active */}
          {deployingTemplate && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <div className="bg-slate-950 border border-purple-500/30 rounded-2xl max-w-md w-full p-6 space-y-6 relative text-left">
                <button 
                  onClick={() => setDeployingTemplate(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-purple-400 uppercase font-bold">EDGE PIPELINE DEPLOYMENT:</span>
                  <h3 className="text-xs font-bold font-display">{deployingTemplate}</h3>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
                      style={{ width: `${deployProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-gray-500">
                    <span>STATUS: {deployProgress === 100 ? 'SUCCESS' : 'BUILDING'}</span>
                    <span>{deployProgress}%</span>
                  </div>
                </div>

                {/* Live deployment logs */}
                <div className="p-3 bg-black/60 rounded-lg border border-white/5 font-mono text-[8px] space-y-1 text-gray-400 max-h-40 overflow-y-auto">
                  {deployLogs.map((log, i) => (
                    <p key={i} className={log.includes('complete') ? 'text-emerald-400' : ''}>{log}</p>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => setDeployingTemplate(null)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono text-[10px] font-bold rounded uppercase"
                  >
                    Close Build Node
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            CONNECT YOUR ENTIRE TECH STACK (INFINITE CAROUSEL)
           ========================================== */}
        <div id="integrations" className="mb-24 overflow-hidden relative border-y border-white/5 py-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Interlock Gateway Node</span>
            <h2 className="text-2xl font-bold font-display tracking-tight">
              Connect Your Entire Tech Stack
            </h2>
          </div>

          <div className="flex select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex gap-16 py-4 animate-infinite-scroll whitespace-nowrap min-w-full">
              {[
                "Google Workspace", "Microsoft 365", "HubSpot", "GoHighLevel", "Salesforce", "Slack", "Notion", 
                "Shopify", "WhatsApp", "n8n", "Zapier", "Stripe", "Razorpay", "QuickBooks", "Tally"
              ].map((logo, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">
                  <Zap className="h-3 w-3 text-purple-400 animate-pulse" />
                  <span>{logo}</span>
                </div>
              ))}
            </div>
            {/* Duplicate for seamless infinite animation */}
            <div className="flex gap-16 py-4 animate-infinite-scroll whitespace-nowrap min-w-full" aria-hidden="true">
              {[
                "Google Workspace", "Microsoft 365", "HubSpot", "GoHighLevel", "Salesforce", "Slack", "Notion", 
                "Shopify", "WhatsApp", "n8n", "Zapier", "Stripe", "Razorpay", "QuickBooks", "Tally"
              ].map((logo, i) => (
                <div key={i + '-dup'} className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">
                  <Zap className="h-3 w-3 text-purple-400 animate-pulse" />
                  <span>{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            INDUSTRY AI BLUEPRINTS (SELECTOR PANEL)
           ========================================== */}
        <div id="industry_blueprints" className="mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Deployable Blueprints</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Industry AI Blueprints
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Select your specific sector and see how automated swarms resolve core administrative bottlenecks while computing target ROI outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left sidebar selectors */}
            <div className="lg:col-span-5 space-y-2 text-left">
              {industryBlueprints.map((ind) => {
                const Icon = ind.icon;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setActiveIndustryId(ind.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${
                      activeIndustryId === ind.id 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-white/5 bg-black/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeIndustryId === ind.id ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400'}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{ind.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right blueprint specifications */}
            <div className="lg:col-span-7 p-6 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-md flex flex-col justify-between">
              {(() => {
                const spec = industryBlueprints.find(x => x.id === activeIndustryId)!;
                return (
                  <div className="space-y-6 text-left">
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono text-purple-400 uppercase font-bold block">ARCHITECTURE FLOW:</span>
                      <h3 className="text-sm font-bold font-display">{spec.name} Blueprint</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
                        <span className="text-[9px] font-mono text-gray-500 uppercase block font-bold">Operational Challenge</span>
                        <p className="text-xs text-gray-300 leading-relaxed">{spec.challenge}</p>
                      </div>

                      <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
                        <span className="text-[9px] font-mono text-purple-400 uppercase block font-bold">Agentic Solution Strategy</span>
                        <p className="text-xs text-gray-300 leading-relaxed">{spec.strategy}</p>
                      </div>

                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <span className="text-[9px] font-mono text-emerald-400 uppercase block font-bold">Targeted Outcome ROI</span>
                        <p className="text-xs text-emerald-300 font-bold leading-relaxed">{spec.roi}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>
        </div>

        {/* ==========================================
            AI WORKFORCE SAVINGS CALCULATOR
           ========================================== */}
        <div id="roi_calculator" className="mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Strategic Audit tool</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              AI Workforce Savings Calculator
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Drag the sliders below representing your staff volume, hours spent on recurring admin tasks, and salary rates to see your annual net savings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-white/10 rounded-3xl overflow-hidden bg-slate-950/60 backdrop-blur-md">
            
            {/* Sliders panel */}
            <div className="lg:col-span-6 p-6 space-y-6 text-left">
              <span className="text-[10px] font-mono text-gray-500 uppercase block border-b border-white/5 pb-2">INPUT PARAMETERS</span>

              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Number of Employees:</span>
                  <span className="text-purple-400 font-bold">{employeesCount} employees</span>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="500"
                  value={employeesCount}
                  onChange={(e) => setEmployeesCount(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Hours spent on admin tasks (per employee, weekly):</span>
                  <span className="text-cyan-400 font-bold">{manualHoursPerWeek} hrs/week</span>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="40"
                  value={manualHoursPerWeek}
                  onChange={(e) => setManualHoursPerWeek(parseInt(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              {/* Slider 3 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Average Hourly Salary Rate:</span>
                  <span className="text-emerald-400 font-bold">₹{avgHourlySalary}/hour</span>
                </div>
                <input 
                  type="range"
                  min="150"
                  max="2500"
                  step="50"
                  value={avgHourlySalary}
                  onChange={(e) => setAvgHourlySalary(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            {/* Calculations outputs */}
            <div className="lg:col-span-6 p-6 bg-black/40 flex flex-col justify-between text-left">
              <span className="text-[10px] font-mono text-gray-500 uppercase block border-b border-white/5 pb-2">CALCULATED SAVINGS OUTPUT</span>

              <div className="space-y-6 py-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-500">ESTIMATED ANNUAL SAVINGS:</span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-display bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {formatINR(calculatedAnnualSavings)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-black/20 border border-white/5 rounded-lg">
                    <span className="text-[8px] font-mono text-gray-500 block">HOURS SAVED (MONTHLY):</span>
                    <span className="text-lg font-bold text-cyan-400 font-mono">{calculatedHoursSavedPerMonth.toLocaleString()} hrs</span>
                  </div>
                  <div className="p-3 bg-black/20 border border-white/5 rounded-lg">
                    <span className="text-[8px] font-mono text-gray-500 block">PRODUCTIVITY INCREASE:</span>
                    <span className="text-lg font-bold text-purple-400 font-mono">+{calculatedProductivityIncrease}%</span>
                  </div>
                </div>
              </div>

              <div className="text-[8px] font-mono text-gray-500 bg-slate-900/40 p-2 rounded border border-white/5">
                *Calculation models assume a validated 75% administrative task deflection rate achieved via connected n8n-edge server nodes.
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            WHY AGENTICOS™ (COMPARISON TABLE)
           ========================================== */}
        <div id="comparison" className="mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Uncompromising compliance</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Why AgenticOS™
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Review how our flagship enterprise stack measures against developer-first libraries and retail-level tools.
            </p>
          </div>

          <div className="overflow-x-auto border border-white/10 rounded-2xl bg-slate-950/40 backdrop-blur-md">
            <table className="w-full text-left font-mono text-[10px] sm:text-xs">
              <thead className="border-b border-white/10 bg-black/40">
                <tr>
                  <th className="p-4 text-purple-400 font-bold font-display">Features Comparison</th>
                  <th className="p-4 text-cyan-400 font-bold font-display">AgenticOS™</th>
                  <th className="p-4 text-gray-400 font-normal">Lindy.ai</th>
                  <th className="p-4 text-gray-400 font-normal">Relevance AI</th>
                  <th className="p-4 text-gray-400 font-normal">LangChain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { f: 'SOC2 & HIPAA Secure Sandboxes', a: 'Yes (Enterprise Node)', b: 'No', c: 'Varies', d: 'Developer-Hosted Only' },
                  { f: 'Bidirectional GHL / CRM Webhooks', a: 'Yes (Out-of-box)', b: 'No', c: 'Requires custom APIs', d: 'Self-coded' },
                  { f: 'Pre-chunked RAG Vector Embeddings', a: 'Yes (Pinecone/Redis integrations)', b: 'No', c: 'Varies', d: 'Manual library wiring' },
                  { f: 'Multi-Agent Consensus Matrix', a: 'Yes (Auditor gates configured)', b: 'No', c: 'No', d: 'Manual loop logic' },
                  { f: 'Indian Tally / LeadSquared Integrations', a: 'Yes (Out-of-box webhook)', b: 'No', c: 'No', d: 'No' },
                  { f: 'Corporate API allocations', a: 'Yes (Gemini / Claude included)', b: 'Yes', c: 'Requires custom keys', d: 'Self-brought' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.01]">
                    <td className="p-4 font-bold text-gray-300">{row.f}</td>
                    <td className="p-4 text-cyan-300 font-bold">✓ {row.a}</td>
                    <td className="p-4 text-gray-500">{row.b}</td>
                    <td className="p-4 text-gray-500">{row.c}</td>
                    <td className="p-4 text-gray-500">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            ENTERPRISE PRICING
           ========================================== */}
        <div id="pricing" className="mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Consolidated Subscription Pricing</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Enterprise Pricing
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Deploy specialized AI employees at a fraction of the cost of manual operations. Save up to 20% on annual commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch text-left">
            {[
              {
                name: 'Starter',
                price: '₹49,999',
                popular: false,
                features: ['Single AI Agent', 'Workflow Setup', 'Basic Integrations', '3 connected tools pool', 'Email / Chat Support']
              },
              {
                name: 'Growth',
                price: '₹1,49,999',
                popular: true,
                features: ['Multi-Agent System', 'Knowledge Base chunking', 'CRM Integration', 'Unlimited GHL Webhooks', 'Priority SLA support']
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                popular: false,
                features: ['Unlimited Agents', 'Dedicated private architecture', 'Private local deployment', 'Multi-agent consensus keys', 'Dedicated success engineer']
              }
            ].map((plan) => (
              <div 
                key={plan.name}
                className={`p-6 rounded-3xl border flex flex-col justify-between relative ${
                  plan.popular 
                    ? 'border-purple-500 bg-purple-500/5 shadow-xl shadow-purple-500/5 scale-102' 
                    : 'border-white/5 bg-white/[0.01]'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-[9px] font-mono font-bold uppercase rounded-full tracking-widest">
                    Most Popular
                  </span>
                )}

                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-bold font-mono text-gray-500 uppercase">{plan.name} Plan</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold font-display text-white">{plan.price}</span>
                      <span className="text-[10px] text-gray-500 font-mono">/mo billed annually</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-gray-300">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <a 
                    href="#discovery_form"
                    className={`w-full py-2.5 rounded-lg font-bold text-xs font-mono uppercase tracking-wider text-center block ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white' 
                        : 'border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white'
                    }`}
                  >
                    Select {plan.name} plan
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            20 DETAILED FAQ ACCORDIONS
           ========================================== */}
        <div id="faq" className="mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Platform Q&A</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Got technical questions about sandboxing, n8n databases, privacy logs, or CRM triggers? We have fully documented answers below.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-white/5 rounded-xl bg-white/[0.01] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center gap-4 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="text-xs sm:text-sm font-semibold text-gray-200">{idx + 1}. {faq.q}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="h-4 w-4 text-purple-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 pt-0 border-t border-white/[0.03] text-xs leading-relaxed text-gray-400 text-left bg-black/20 font-mono">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            DISCOVERY FORM (GHL CRM + WEBHOOK SIMULATION)
           ========================================== */}
        <div id="discovery_form" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Secure Contact Hub</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Book AgenticOS™ Discovery Session
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              Submit your workflow goals. Our engineering team maps GoHighLevel endpoints and n8n webhooks to build your custom autonomous swarms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Form Column */}
            <div className="lg:col-span-7 p-6 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-md">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4 font-mono">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold font-display">Discovery Session Requested!</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Your parameters are written securely inside our GHL CRM system. Our AI architect team will dispatch scheduling invite slots to your mailbox within 2 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      generateCaptcha();
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono text-[10px] uppercase font-bold rounded"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDiscoverySubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Field 1 */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 block">Full Name *</label>
                      <input 
                        type="text"
                        required
                        value={discoveryForm.fullName}
                        onChange={(e) => setDiscoveryForm({...discoveryForm, fullName: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>

                    {/* Field 2 */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 block">Company Name *</label>
                      <input 
                        type="text"
                        required
                        value={discoveryForm.companyName}
                        onChange={(e) => setDiscoveryForm({...discoveryForm, companyName: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                        placeholder="e.g. Apex Consulting"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 3 */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 block">Industry *</label>
                      <select 
                        value={discoveryForm.industry}
                        onChange={(e) => setDiscoveryForm({...discoveryForm, industry: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                      >
                        <option value="Healthcare">Healthcare Systems</option>
                        <option value="Education">Education Providers</option>
                        <option value="Real Estate">Real Estate Agencies</option>
                        <option value="Retail">Retail & E-commerce</option>
                        <option value="Manufacturing">Manufacturing & Supply</option>
                        <option value="Professional Services">Professional Services</option>
                      </select>
                    </div>

                    {/* Field 4 */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 block">Country *</label>
                      <input 
                        type="text"
                        required
                        value={discoveryForm.country}
                        onChange={(e) => setDiscoveryForm({...discoveryForm, country: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                        placeholder="India / USA"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 5 */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 block">Email Address *</label>
                      <input 
                        type="email"
                        required
                        value={discoveryForm.email}
                        onChange={(e) => setDiscoveryForm({...discoveryForm, email: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                        placeholder="rahul@apex.com"
                      />
                    </div>

                    {/* Field 6 */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 block">Phone Number *</label>
                      <input 
                        type="text"
                        required
                        value={discoveryForm.phone}
                        onChange={(e) => setDiscoveryForm({...discoveryForm, phone: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                        placeholder="+91 98765-43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 7 */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 block">Current Tools *</label>
                      <input 
                        type="text"
                        required
                        value={discoveryForm.currentTools}
                        onChange={(e) => setDiscoveryForm({...discoveryForm, currentTools: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                        placeholder="HubSpot, Notion, spreadsheets"
                      />
                    </div>

                    {/* Field 8 */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 block">Automation Budget *</label>
                      <select 
                        value={discoveryForm.budgetRange}
                        onChange={(e) => setDiscoveryForm({...discoveryForm, budgetRange: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                      >
                        <option value="₹49,999 - ₹1,49,999">₹49,999 - ₹1,49,999 /mo</option>
                        <option value="₹1,49,999 - ₹3,00,000">₹1,49,999 - ₹3,00,000 /mo</option>
                        <option value="₹3,00,000+">₹3,00,000+ /mo (Enterprise Swarm)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-500 block">Challenges & Automation Area Objectives</label>
                    <textarea 
                      value={discoveryForm.message}
                      onChange={(e) => setDiscoveryForm({...discoveryForm, message: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-purple-400 h-20"
                      placeholder="Specify what repetitive work your AI workforce should automate..."
                    />
                  </div>

                  {/* Math Captcha Challenge */}
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-2">
                    <span className="text-[9px] font-mono text-purple-400 block font-bold uppercase">SECURE VERIFICATION RECAPTCHA</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-gray-300">
                        Solve Challenge: {captchaNum1} + {captchaNum2} =
                      </span>
                      <input 
                        type="text"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        placeholder="Your Answer"
                        className="w-24 bg-black/60 border border-white/10 rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                      />
                      <button 
                        type="button" 
                        onClick={handleCaptchaVerify}
                        className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded text-[9px] font-mono uppercase font-bold"
                      >
                        Verify Math
                      </button>
                    </div>
                    {captchaVerified && (
                      <span className="text-[8px] font-mono text-emerald-400 font-bold block">✓ Mathematical puzzle validated. Unlock secured.</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 text-xs font-mono font-bold uppercase rounded-lg tracking-widest flex items-center justify-center gap-2"
                  >
                    {formLoading ? 'Posting to HubSpot Node...' : 'Dispatch CRM Payload'}
                  </button>
                </form>
              )}
            </div>

            {/* Simulated webhook logs Column */}
            <div className="lg:col-span-5 p-6 rounded-3xl border border-white/10 bg-black/40 flex flex-col justify-between min-h-[360px]">
              <div className="border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">GHL PIPELINE AUTO-LOGS:</span>
              </div>

              <div className="flex-grow font-mono text-[9px] leading-relaxed p-4 bg-black/60 rounded-xl border border-white/5 space-y-2.5 overflow-y-auto max-h-[220px] text-left">
                {ghlLogs.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-600 py-12 italic text-center">
                    Simulated n8n-GHL hook pipeline log outputs appear here upon submission.
                  </div>
                ) : (
                  ghlLogs.map((log, i) => (
                    <p key={i} className="text-gray-400">
                      <span className="text-purple-400 font-bold">●</span> {log}
                    </p>
                  ))
                )}
              </div>

              <div className="mt-4 text-[8px] font-mono text-gray-500 bg-slate-900/40 p-2 rounded border border-white/5 text-left">
                *Uses modern secure TLS endpoints to route structural payloads directly to GHL calendars and Slack notification channels.
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            FINAL CTA
           ========================================== */}
        <div id="final_cta" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0D052E] via-[#03010E] to-[#0D052E] border border-purple-500/20 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="space-y-2 relative z-10 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Unleash autonomous speed</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight">
              Build Your AI Workforce Today
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
              Ready to automate repetitive operations, scale deflection, and connect n8n pipelines directly to GoHighLevel? Talk to our AI architects.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <a 
              href="#discovery_form" 
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-mono font-bold rounded-lg uppercase tracking-wider"
            >
              Book Discovery Call
            </a>
            <a 
              href="#discovery_form"
              className="px-6 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white text-xs font-mono font-bold uppercase tracking-wider"
            >
              Talk To AI Architects
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
