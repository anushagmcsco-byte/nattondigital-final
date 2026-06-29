import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Cpu, TrendingUp, Search, CheckCircle, Layers, Workflow, 
  BarChart2, ArrowRight, Play, Zap, Star, MessageSquare, Users, Globe, 
  ChevronRight, Check, HelpCircle, ChevronDown, ChevronUp, Send, 
  Sliders, DollarSign, Plus, RefreshCw, Clock, Phone, Shield, 
  Briefcase, Lock, X, Activity, Building, Database, Mail, FileText, 
  CheckCheck, Settings, Factory, Truck, Boxes, ArrowUpRight, 
  PieChart, Share2, History, Network
} from 'lucide-react';
import { RoutePath } from '../types';

export default function IndustryManufacturing({ setPath, darkMode }: { setPath: (path: RoutePath) => void; darkMode: boolean }) {
  useEffect(() => {
    document.title = "AI Solutions for Manufacturing Companies & Industrial Businesses | Natton Digital";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ==========================================
  // SMART FACTORY NETWORK CANVAS BACKGROUND
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

    // Grid nodes and connecting lines
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; type: 'core' | 'agent' | 'terminal'; label: string; pulse: number }> = [];
    const coreLabels = ['ERP SAP', 'MES Gateway', 'GrowthOS Hub', 'CRM Core', 'Agentic Engine'];
    
    // Create random background nodes representing factory IoT
    for (let i = 0; i < 20; i++) {
      const isCore = i < 5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        type: isCore ? 'core' : (Math.random() > 0.5 ? 'agent' : 'terminal'),
        label: isCore ? coreLabels[i] : `IoT_Sensor_${100 + i}`,
        pulse: Math.random() * Math.PI
      });
    }

    // Active data packets flowing through connections
    const packets: Array<{ from: number; to: number; progress: number; speed: number; color: string }> = [];
    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      // Find a close node
      let to = (from + 1) % nodes.length;
      let minDist = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === from) continue;
        const d = Math.hypot(nodes[from].x - nodes[i].x, nodes[from].y - nodes[i].y);
        if (d < minDist && d < 250) {
          minDist = d;
          to = i;
        }
      }
      
      packets.push({
        from,
        to,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        color: Math.random() > 0.5 ? '#00f5ff' : '#f97316' // Electric Blue or Orange
      });
    };

    // Pre-spawn some packets
    for (let i = 0; i < 8; i++) {
      spawnPacket();
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw engineering schematic grid lines (Steel Gray)
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Update and draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 220) {
            const alpha = (1 - dist / 220) * 0.15;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw packets
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
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();

          // Add subtle trail/glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // Update and draw nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;

        // Bounce off bounds
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const isCore = n.type === 'core';
        const pulseSize = Math.sin(n.pulse) * (isCore ? 3 : 1.5);
        
        // Glow effect for cores
        if (isCore) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#00f5ff';
        }

        // Draw node center
        ctx.fillStyle = isCore ? '#00f5ff' : '#f97316';
        ctx.beginPath();
        ctx.arc(n.x, n.y, isCore ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw outer pulse ring
        ctx.strokeStyle = isCore ? 'rgba(0, 245, 255, 0.25)' : 'rgba(249, 115, 22, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, (isCore ? 12 : 8) + pulseSize, 0, Math.PI * 2);
        ctx.stroke();

        // Draw label text for Core components
        if (isCore && width > 640) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '9px monospace';
          ctx.fillText(n.label, n.x + 12, n.y + 3);
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
  // BLUEPRINT INTERACTIVE WORKFLOW
  // ==========================================
  const [activeBlueprintStep, setActiveBlueprintStep] = useState<number>(0);
  const blueprintSteps = [
    { title: '01. Corporate Website', val: 'Digital Flagship', desc: 'Sleek, high-converting B2B portals demonstrating core capabilities, catalog downloads, and instant RFQ gateways optimized for engineers.' },
    { title: '02. SEO + AEO', val: 'Answer Optimization', desc: 'Dominating search engines and AI engines (ChatGPT/Perplexity) for high-intent keywords like "custom steel forging OEM India".' },
    { title: '03. Lead Generation', val: 'B2B Capture', desc: 'Multi-channel lead collection capturing precise company demographics, technical blueprints, and custom request specifications.' },
    { title: '04. CRM Core', val: 'GrowthOS™ Pipeline', desc: 'Immediate structured ingestion of prospective queries, automatically mapped by country, segment, and deal value.' },
    { title: '05. WhatsApp Broadcast', val: 'Immediate Catalogs', desc: 'Instantly dispatch heavy technical sheets, plant ISO certificates, and company presentation decks in response to inquiries.' },
    { title: '06. AI calling Outbound', val: 'Voice Verification', desc: 'High-cadence voice dialers dial missed web leads within 45 seconds to qualify credit capacity and request blueprints.' },
    { title: '07. ERP Integration', val: 'Real-time Sync', desc: 'Instant read/write hooks syncing deal logs directly into enterprise systems like SAP, Tally, or custom ERP databases.' },
    { title: '08. Sales Automation', val: 'RFQ & Quoting', desc: 'Auto-generates technical quotation drafts and pricing matrix breakdowns based on historical CRM deal logs.' },
    { title: '09. Customer Support', val: 'Distributor Helpdesk', desc: '24/7 AI portals answering intricate technical queries, product lead times, and post-order tracking metrics.' }
  ];

  // ==========================================
  // SEGMENTS & PAIN POINTS DATA
  // ==========================================
  const segments = [
    { name: 'Manufacturing Companies', desc: 'Unified digital workspaces to accelerate production lead times and connect plant operations with front-office sales.' },
    { name: 'OEMs (Original Equipment)', desc: 'Automates custom part inquiries, technical spec catalog delivery, and direct-to-broker RFQ distribution.' },
    { name: 'Industrial Equipment Suppliers', desc: 'Manages multi-tier distributor lists, automates parts configuration, and simplifies bulk ordering.' },
    { name: 'Engineering Companies', desc: 'Transforms blueprint design submissions into automated workflow pricing guides and CRM tickets.' },
    { name: 'Exporters & Trade Houses', desc: 'Fires up international targeting (LinkedIn/SEO), manages global currency pipelines, and speeds customs logs.' },
    { name: 'Distributors & Dealers', desc: 'Self-service ordering portals with live inventory tracking, dispute logging, and automatic invoice updates.' },
    { name: 'Process Industries', desc: 'Continuous operations reporting, low-stock warnings, and custom supplier negotiation pipelines.' },
    { name: 'B2B Enterprises', desc: 'Robust full-scale multi-tier sales channels, automated contract locking, and secure SOC2 data architectures.' }
  ];

  const painPoints = [
    { title: 'Low Lead Generation', symptom: 'Relying purely on offline word-of-mouth referrers.', cure: 'Deploy SEO/AEO networks capturing active international procurement searches 24/7.' },
    { title: 'Distributor Communication', symptom: 'Slow, messy phone chains and late catalog shares.', cure: 'WhatsApp Business APIs delivering pricing databases and stock status instantly.' },
    { title: 'Manual Sales Process', symptom: 'Wasting weeks draft-mailing quotes via old spreadsheets.', cure: 'Automated quotation wizards compiling CRM parameters into structured PDFs.' },
    { title: 'Poor CRM Adoption', symptom: 'Sales teams hate entering data, causing complete blindness.', cure: 'Auto-logging call records and chat histories via BusinessOS™ email bridges.' },
    { title: 'Slow Quotations (RFQs)', symptom: 'Engineers taking days to manually calculate custom margins.', cure: 'AI Agent instantly scanning historical deals for matching line-item rates.' },
    { title: 'Operational Inefficiencies', symptom: 'Siloed communications causing manufacturing delays.', cure: 'Prism ERP connectors syncing orders directly to manufacturing floor monitors.' },
    { title: 'Customer Support Delays', symptom: 'Support staff swamped by tracking and delivery status calls.', cure: 'Autonomous tracking checkers linked to shipping APIs replying in < 2 seconds.' },
    { title: 'Data Silos', symptom: 'Invoices in ERP, leads in CRM, conversation on WhatsApp.', cure: 'Unified GrowthOS™ dashboard gathering customer lifetime logs under one screen.' }
  ];

  // ==========================================
  // MARKETING ENGINE TABS & SIMULATED ANALYTICS
  // ==========================================
  const [activeMktTab, setActiveMktTab] = useState<'google' | 'linkedin' | 'export'>('linkedin');
  const marketingSuite = {
    linkedin: {
      metrics: [{ l: 'Weekly HNI/B2B Leads', v: '312' }, { l: 'Avg Cost Per RFQ', v: '₹840.00' }, { l: 'LinkedIn Match Quality', v: '96%' }],
      campaigns: [
        { name: 'OEM Procurement Officers (India & MENA)', budget: '₹1,20,000', leads: '144', cost: '₹833/lead' },
        { name: 'Automotive Component OEM Stakeholders', budget: '₹75,000', leads: '98', cost: '₹765/lead' },
        { name: 'Heavy Machinery Replacement Parts Buyers', budget: '₹45,000', leads: '70', cost: '₹642/lead' }
      ]
    },
    google: {
      metrics: [{ l: 'Search Ad Impressions', v: '48,200' }, { l: 'RFQ Click Conversion', v: '4.8%' }, { l: 'Avg CPC (High Intent)', v: '₹62.00' }],
      campaigns: [
        { name: 'High-Intent "B2B metal forging exporter"', budget: '₹1,50,000', leads: '185', cost: '₹810/lead' },
        { name: 'Industrial Boiler Manufacturer Bangalore', budget: '₹90,000', leads: '105', cost: '₹857/lead' },
        { name: 'Custom Plastic Injection Molding Supplier', budget: '₹60,000', leads: '84', cost: '₹714/lead' }
      ]
    },
    export: {
      metrics: [{ l: 'Global Trade Enquiries', v: '184' }, { l: 'Target Regions', v: 'Europe / USA / GCC' }, { l: 'Inbound RFQ Pipeline', v: '₹1.8 Cr' }],
      campaigns: [
        { name: 'US Distributor Partnership Drive', budget: 'Organic SEO/AEO', leads: '64 Global', cost: 'High-Yield' },
        { name: 'Europe ISO-9001 Forged Metals Target', budget: 'Organic SEO/AEO', leads: '72 Global', cost: 'High-Yield' },
        { name: 'GCC Industrial Construction Supplies', budget: 'Organic SEO/AEO', leads: '48 Global', cost: 'High-Yield' }
      ]
    }
  };

  // ==========================================
  // GROWTHOS™ CRM SIMULATOR
  // ==========================================
  const [crmLeads, setCrmLeads] = useState([
    { id: '1', company: 'Tata Motors OEM', rfqType: 'Cast Suspension Arms', val: '₹42,00,000', stage: 'new' },
    { id: '2', company: 'Godrej Aerospace', rfqType: 'Precision Titanium Rings', val: '₹1,85,00,000', stage: 'qualified' },
    { id: '3', company: 'Middle East Tech Machinery', rfqType: 'Hydraulic Piston Assembly', val: '₹64,00,000', stage: 'rfq_sent' },
    { id: '4', company: 'Bharat Electronics', rfqType: 'Heatsink Thermal Blocks', val: '₹28,00,000', stage: 'ordered' }
  ]);

  const advanceStage = (leadId: string) => {
    setCrmLeads(prev => prev.map(lead => {
      if (lead.id !== leadId) return lead;
      let nextStage = lead.stage;
      if (lead.stage === 'new') nextStage = 'qualified';
      else if (lead.stage === 'qualified') nextStage = 'rfq_sent';
      else if (lead.stage === 'rfq_sent') nextStage = 'ordered';
      else if (lead.stage === 'ordered') nextStage = 'new';
      return { ...lead, stage: nextStage };
    }));
  };

  // ==========================================
  // BUSINESSOS™ CHAT SIMULATION
  // ==========================================
  const [chatLog, setChatLog] = useState([
    { sender: 'user', text: 'Hi, we saw your ISO certificates. Need custom pricing for 5,000 units of part OEM-942.', time: '14:30' },
    { sender: 'system', text: 'Greetings from Steel Industrial Bot! 🏭⚙️\n\nI can instantly dispatch product catalog specifications, check live delivery times, or connect you to our lead engineering architect.\n\nChoose an action:\n1️⃣ Get Technical Datasheet & Pricing Guide PDF\n2️⃣ Check Factory Delivery Lead Times\n3️⃣ Initiate Custom RFQ Blueprint Upload', time: '14:30' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatLog(prev => [...prev, { sender: 'user', text: userText, time: '14:31' }]);
    setChatInput('');
    setBotTyping(true);

    setTimeout(() => {
      let reply = 'Our AI Industry Specialist is compiling inventory logs...';
      if (userText.includes('1')) {
        reply = '📄 *Datasheet Dispatched!*\n\nHere is the official catalog for **Industrial Parts OEM-940 Series** including full material tolerances, ISO-9001 compliance sheets, and bulk cost guidelines.\n\n👉 [Download Technical Sheet PDF]';
      } else if (userText.includes('2')) {
        reply = '⏳ *Factory Production Load:* ACTIVE\n\n- Standard fabrication: 12-14 business days.\n- Surface processing / coating: +3 days.\n- Logistic dispatch to Port: 48 hours.\n\nWould you like me to reserve a spot in the July production queue? Reply "YES" to schedule.';
      } else if (userText.includes('3') || userText.toLowerCase().includes('rfq') || userText.toLowerCase().includes('blueprint')) {
        reply = '📤 *Custom Blueprint Upload Initialized:*\n\nPlease drag and drop your CAD .dwg or .pdf blueprint here. Our AI AgenticOS™ parser will immediately extract tolerances, dimensions, and alloy classes for engineer verification.';
      } else if (userText.toLowerCase() === 'yes') {
        reply = '✅ *Reservation Logged!*\n\nI have locked a preliminary production line slot for Tata/OEM parameters. A regional supply partner will coordinate formal contract terms via your verified phone. Thank you!';
      } else {
        reply = 'Understood. I have recorded your requirements in the GrowthOS™ registry. An industrial consulting engineer will review this thread and dial you shortly.';
      }
      setChatLog(prev => [...prev, { sender: 'system', text: reply, time: '14:32' }]);
      setBotTyping(false);
    }, 1100);
  };

  // ==========================================
  // AGENTICOS™ 3D FACTORY NETWORK AGENTS
  // ==========================================
  const [activeAgent, setActiveAgent] = useState('sales');
  const agents = [
    { id: 'sales', name: 'AI Sales Agent', role: 'Monitors inbound corporate RFQs, extracts CAD blueprint files, and references previous deals to draft quick pricing estimates.', trigger: 'ON_RFQ_FORM_FIRED -> parse_cad_pdf() AND calculate_cost_model()' },
    { id: 'operations', name: 'AI Operations Agent', role: 'Compares real-time production loads across machinery, flags maintenance needs, and estimates manufacturing deadlines.', trigger: 'ON_ORDER_CONFIRMED -> update_mes_schedule() AND dispatch_plant_notifications()' },
    { id: 'procurement', name: 'AI Procurement Agent', role: 'Tracks factory raw material stocks, initiates automatic bidding quotes to pre-approved alloy suppliers when inventory hits safety limits.', trigger: 'IF low_alloy_stock < safety_limit THEN email_supplier_bids()' },
    { id: 'support', name: 'AI Customer Support Agent', role: 'Handles distributor delivery questions, provides shipping GPS locations, and logs customer disputes in the central CRM.', trigger: 'ON_DISTRIBUTOR_QUERY -> query_logistics_api() AND output_tracking_coordinates()' },
    { id: 'distributor', name: 'AI Distributor Support Agent', role: 'Audits credit ledger limits for bulk buyers, auto-dispatches invoice receipts, and handles credit note approvals.', trigger: 'ON_BULK_ORDER -> verify_credit_limit() AND generate_proforma_invoice()' },
    { id: 'reporting', name: 'AI Reporting Agent', role: 'Aggregates plant output stats, sales close-rates, and lead CPL metrics into beautiful executive summary PDFs every Friday.', trigger: 'ON_FRIDAY_1700 -> compile_weekly_kpis() AND email_board_summary()' }
  ];

  // ==========================================
  // AUTOMATION WORKFLOWS SELECTOR
  // ==========================================
  const [activeFlowIdx, setActiveFlowIdx] = useState(0);
  const workflows = [
    {
      title: 'Lead → Quotation → Follow-Up → Order',
      desc: 'Seamless progression tracking from initial digital ad response to finalized home key handover.',
      nodes: ['1. B2B Lead Captured', '2. Voice Pre-Qual Call', '3. CAD Blueprint Uploaded', '4. AI Margin Calculation', '5. Automated RFQ Drafted', '6. Custom ERP Order Created']
    },
    {
      title: 'Distributor Query → AI Agent → Resolution',
      desc: 'Ensures zero missed calls are ever left abandoned. Resolves off-hours inquiries under 45 seconds.',
      nodes: ['1. Distributor Chat Ping', '2. stock Check API Node', '3. Proforma Bill Sent', '4. Ledger Verification', '5. Dispatch Logistics Sync', '6. Automated Resolution Ticket']
    },
    {
      title: 'Customer Support → Ticket → AI Agent',
      desc: 'Automatic qualification sequence keeping potential buyers warm with high-value digital brochures.',
      nodes: ['1. Support Portal Ticket', '2. Text Intent Parsing', '3. KB Search Trigger', '4. Proposed Solution Generated', '5. Escalation Flag If Blocked', '6. CRM Update Resolved']
    },
    {
      title: 'ERP → CRM → Analytics',
      desc: 'Secures and manages third-party broker relationships, auditing payouts automatically on final settlement.',
      nodes: ['1. ERP Shipment Logged', '2. CRM Deal Closed', '3. Finance Reconciliation', '4. Commission Triggered', '5. Executive Dashboard Refresh', '6. Performance Report Sent']
    }
  ];

  // ==========================================
  // ERP INTEGRATION DIAGRAM NODES
  // ==========================================
  const erpIntegrations = [
    { name: 'SAP Integration', status: 'SAP RFC Connector Connected', latency: '0.4s', icon: Settings, tech: 'Bi-directional RFC interface syncing raw catalog logs & credit records.' },
    { name: 'Tally Prime Hook', status: 'Tally XML Port Syncing', latency: '1.2s', icon: Database, tech: 'Automated ledger posting and direct tax voucher reconciliation on deal close.' },
    { name: 'Zoho Books / CRM', status: 'API v2 Webhook Live', latency: '0.2s', icon: Layers, tech: 'Seamless contact sync, payment reminders, and digital pipeline routing.' },
    { name: 'ERPNext Bridge', status: 'REST API Connection', latency: '0.5s', icon: Workflow, tech: 'Synchronizes item blueprints, Bill of Materials (BOM), and material requests.' },
    { name: 'MS Dynamics 365', status: 'OData Service Syncing', latency: '0.8s', icon: Cpu, tech: 'Direct ERP sales pipeline updates and customized production schedule checks.' },
    { name: 'Custom Proprietary ERP', status: 'Sovereign Database Link', latency: 'Custom', icon: Network, tech: 'Tailored Postgres/MySQL queries mapping proprietary database structures.' }
  ];

  // ==========================================
  // POPULAR USE CASES
  // ==========================================
  const useCases = [
    { title: 'Distributor Management', detail: 'Consolidates multiple distributor sales records, monitors territorial discount rules, and keeps product updates synced via WhatsApp.' },
    { title: 'Quotation Automation', detail: 'Calculates structural pricing formulas based on CAD dimension parameters and historical factory raw materials indexes.' },
    { title: 'Customer Support Portal', detail: 'Empowers global buyers to check manufacturing stages, logistic dispatch dates, and bill histories without human delays.' },
    { title: 'Lead Qualification Bot', detail: 'Autonomous VoIP dialers verifying the caller’s business legitimacy, purchasing power, and urgent delivery timeframe.' },
    { title: 'Order Follow-Up', detail: 'Monitors payment schedule compliance and triggers friendly automatic text notifications when installments are due.' },
    { title: 'Operations Reporting', detail: 'Gathers scrap rates, machine downtime, and worker throughput into beautiful, board-ready executive summaries.' },
    { title: 'Procurement Automation', detail: 'Flags supplier lead times, calculates optimal ordering safety thresholds, and auto-generates purchase orders.' },
    { title: 'Export Enquiries', detail: 'Optimizes B2B international marketing pipelines, capturing global buyer demands and mapping customs logistics.' }
  ];

  // ==========================================
  // MANUFACTURING ROI CALCULATOR
  // ==========================================
  const [monthlyLeads, setMonthlyLeads] = useState<number>(300);
  const [dealValue, setDealValue] = useState<number>(800000); // ₹8 Lakh avg
  const [salesTeam, setSalesTeam] = useState<number>(8);
  const [softwareCost, setSoftwareCost] = useState<number>(45000); // ₹45k current monthly spend

  // Current Math
  const curConvRate = 2.0; // 2% current conversion rate standard
  const curClosures = Math.round(monthlyLeads * (curConvRate / 100));
  const curRevenue = curClosures * dealValue;

  // Optimized Math (Natton Digital's automation and instant AI follow-up increases close rate)
  const optConvRate = 4.8; // Boost to 4.8% through faster qualification and prompt WhatsApp catalog dispatch
  const optClosures = Math.round(monthlyLeads * (optConvRate / 100));
  const optRevenue = optClosures * dealValue;

  // Results
  const addedRevenue = optRevenue - curRevenue;
  const adminSavings = salesTeam * 15 * 500 * 4; // 15 hours saved per agent per week * hourly rate equivalents
  const softwareOptimized = Math.max(10000, softwareCost * 0.4); // Redundant stack reduction saves ~40%
  const totalFinancialGain = addedRevenue + adminSavings + (softwareCost - softwareOptimized);
  const autoROI = Math.round((totalFinancialGain / 60000) * 100); // Estimate based on standard Natton integration package

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // ==========================================
  // SUCCESS STORIES (CAROUSEL)
  // ==========================================
  const [carouselIdx, setCarouselIdx] = useState(0);
  const caseStudies = [
    {
      type: 'Industrial Supplier',
      company: 'Apex Fasteners & Heavy Forgings',
      metric: '320% Inbound RFQs Captured',
      impact: 'Eliminated manual portal lead copying entirely. Integrated GHL and WhatsApp APIs.',
      results: [
        { label: 'Avg RFQ Drafting Time', before: '48 hours', after: '12 minutes' },
        { label: 'Outbound Response Speed', before: '14 hours', after: '< 45 seconds' },
        { label: 'Pipeline Closed Value', before: '₹12 Lakh', after: '₹84 Lakh' }
      ]
    },
    {
      type: 'OEM Manufacturer',
      company: 'Hindustan Electric Motor Gearboxes',
      metric: '75% Reduction in Procurement Lags',
      impact: 'Connected stock alert systems with n8n automated bidding logic for steel/copper suppliers.',
      results: [
        { label: 'Supplier Response Time', before: '5 days', after: '4 hours' },
        { label: 'Production Line Downtimes', before: '12%', after: '< 1%' },
        { label: 'Material Costs Optimised', before: '0%', after: '14.2% Saved' }
      ]
    },
    {
      type: 'Exporter Enterprise',
      company: 'Vanguard Structural Alloys LLC',
      metric: '4x Worldwide Buyer Network Expansion',
      impact: 'Launched localized LinkedIn campaigns and AEO (Answer Engine Optimization) targeting global logistics directors.',
      results: [
        { label: 'Monthly Global RFQs', before: '8 leads', after: '42 leads' },
        { label: 'Customer Trust Rating', before: '64%', after: '98%' },
        { label: 'Annual Export Contracts', before: '₹2.8 Cr', after: '₹14.5 Cr' }
      ]
    },
    {
      type: 'Engineering Company',
      company: 'Centrix Precision Toolings & Dies',
      metric: '100% CRM & ERP Compliance',
      impact: 'Automated CRM data entry by syncing plant floor machine schedules and invoice records via Tally integration.',
      results: [
        { label: 'Sales Rep Data-Entry Hours', before: '14 hrs/wk', after: '0 hrs/wk' },
        { label: 'Billing Dispute Frequency', before: '18%', after: '0%' },
        { label: 'Cashflow Collection Speed', before: '32 days', after: '9 days' }
      ]
    }
  ];

  // ==========================================
  // COMPARISON MATRIX
  // ==========================================
  const matrix = [
    { cap: 'SLA Lead Response', natton: 'Instant (< 30 seconds) SMS & WhatsApp brochure dispatch', trad: 'Manual follow-ups handled in 24-72 hours', generic: 'Standard auto-emails landing in client spam folders' },
    { cap: 'Quotation Drafting', natton: 'AI assists engineers to pull rates & formulate PDFs', trad: 'Manual spreadsheet formula work causing key errors', generic: 'Requires custom code integrations & expensive add-ons' },
    { cap: 'Distributor Coordination', natton: 'Automatic credits, stock queries, and proforma deliveries', trad: 'Messy phone calls & unmonitored PDF orders', generic: 'Siloed pipelines without billing logs' },
    { cap: 'CAD Blueprint Ingestion', natton: 'Automatic technical spec parsing and CRM file mapping', trad: 'Broker manually emailing drawings to plant engineers', generic: 'Generic fields not optimized for CAD datasets' }
  ];

  // ==========================================
  // 15 FREQUENTLY ASKED QUESTIONS
  // ==========================================
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const faqList = [
    { q: 'Can this platform connect with our legacy ERP?', a: 'Yes. We build custom bi-directional connectors for SAP, Tally Prime, ERPNext, Zoho, and other legacy databases using secure API pipelines.' },
    { q: 'Does the system parse CAD drawing sheets?', a: 'Our AI agents can read structural blueprints (PDFs/DWGs) to pull core parameters like raw material alloy types, tolerances, and dimension matrices.' },
    { q: 'What is the standard SLA response time for inbound web leads?', a: 'Under 45 seconds. The moment an inquiry lands on your website or ad, our automated outbound dialer registers the lead and calls them.' },
    { q: 'How does it protect our proprietary industrial designs?', a: 'We employ high-grade TLS 1.3 data encryption and run workflows on private, sandboxed projects. Your technical files are never used to train public LLM models.' },
    { q: 'Can we build custom distributor discount levels in the CRM?', a: 'Yes, fully. The GrowthOS™ portal allows builders to configure tiered access levels, territorial pricing models, and direct distributor billing ledger limits.' },
    { q: 'Is regional language dial-out supported for local operators?', a: 'Yes. Our AI voice assistants are fully bilingual and can hold conversations in Hindi, Tamil, Kannada, Telugu, Marathi, and English.' },
    { q: 'How long does a standard manufacturing integration take?', a: 'Standard campaign workflows and WhatsApp setups can go live in 72 hours. Custom full-stack ERP database mappings are deployed in 12-15 business days.' },
    { q: 'Does this platform support automated SMS and RCS messages?', a: 'Yes. We support standard global carrier gateways, WhatsApp Business APIs, and RCS interactive rich-cards to drive higher B2B engagement.' },
    { q: 'What happens when a critical machine goes offline in the factory?', a: 'IoT sensors on the floor can trigger immediate SMS alerts to supervisor phones and simultaneously update CRM shipping deadlines to avoid delivery penalties.' },
    { q: 'Can the WhatsApp chatbot calculate proforma pricing logs?', a: 'Yes. Distributors can request quantities and receive automated custom bills containing tax rates, freight fees, and discounts directly on WhatsApp.' },
    { q: 'Does our sales team need to install software?', a: 'No, our tools are fully cloud-hosted. Representatives get intuitive web dashboards that are accessible on any mobile or desktop screen.' },
    { q: 'How are duplicate lead submissions handled?', a: 'Our central registry filters entries using company PANs, GST numbers, emails, or phone parameters, merging multiple records automatically.' },
    { q: 'Can we self-host our database on sovereign local cloud servers?', a: 'Yes. We support private deployments on your designated local cloud nodes such as AWS India, Google Cloud, or Microsoft Azure.' },
    { q: 'Do you offer direct training for our on-ground dealers?', a: 'Yes. We provide complete video tutorials, standard operating sheets, and interactive masterclass sessions to ensure immediate dealer adoption.' },
    { q: 'Is there a contract lock-in period for your services?', a: 'We offer flexible, month-to-month contracts or discounted annual enterprise packages. We prioritize earning your trust every single billing cycle.' }
  ];

  // ==========================================
  // LEAD FORM Webhook simulation & state
  // ==========================================
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formSegment, setFormSegment] = useState('Manufacturing Companies');
  const [formLocation, setFormLocation] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTeamSize, setFormTeamSize] = useState('10 - 50');
  const [formChallenges, setFormChallenges] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValues, setCaptchaValues] = useState({ num1: 0, num2: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    setCaptchaValues({
      num1: Math.floor(Math.random() * 8) + 2,
      num2: Math.floor(Math.random() * 8) + 2
    });
  }, []);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== (captchaValues.num1 + captchaValues.num2)) {
      alert('Verification captcha code is incorrect. Please compute again.');
      return;
    }
    setIsSubmitting(true);
    setTerminalLogs([
      '⚡ Intercepting industrial procurement lead payload...',
      '📡 Parsing variables to GoHighLevel (GHL) contact schema...',
      '🔗 Firing secure n8n integration webhook node...',
      '🛠️ Validating duplicate company registries in CRM...'
    ]);

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        '📊 Synced! Recorded CRM Contact ID: GHL_MFG_9041',
        '🏭 ERP synchronization node: STATUS_GREEN',
        '💬 Dispatched ISO certifications catalog via WhatsApp API.'
      ]);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
    }, 1800);
  };

  return (
    <div className="bg-[#0b1329] text-slate-100 min-h-screen py-8 overflow-hidden relative selection:bg-orange-500 selection:text-black">
      
      {/* Visual background atmospheric elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-0 w-[550px] h-[550px] bg-orange-950/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-5 right-20 w-[600px] h-[600px] bg-cyan-950/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="mb-8 text-xs font-mono text-slate-500 flex items-center gap-1.5 border-b border-slate-800 pb-4">
          <button onClick={() => setPath('home')} className="hover:text-orange-400 transition-colors">Home</button> 
          <span>/</span> 
          <span className="text-slate-400">Industries</span> 
          <span>/</span> 
          <span className="text-orange-400 font-semibold font-mono">Manufacturing</span>
        </div>

        {/* ==========================================
            HERO SECTION (Industrial Smart Factory theme)
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 relative min-h-[550px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden -z-20 border border-slate-800 bg-slate-950/60">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-85" />
          </div>

          <div className="lg:col-span-7 space-y-6 z-10 p-6 sm:p-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-orange-400 font-bold">
                Siemens & SAP-Level Integration Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight">
              AI-Powered Growth <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-200 to-cyan-400 bg-clip-text text-transparent">
                & Intelligent Automation
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-slate-400 max-w-2xl">
              Generate high-quality B2B leads, automate complex RFQ calculations, streamline supply chains, and build unified multi-agent factory communications. Integrated with GrowthOS™ CRM, BusinessOS™ channels, and your core legacy ERP systems.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#lead_form" 
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-black font-extrabold rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                Book Free Consultation <ArrowRight className="h-4 w-4 text-black" />
              </a>
              <a 
                href="#blueprint" 
                className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-950/40 hover:bg-slate-900 hover:border-cyan-400 transition-all flex items-center gap-2 text-sm font-semibold"
              >
                Explore Smart Blueprint
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 text-[10px] font-mono text-slate-500 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-orange-400">● 100% ERP Compliant</span>
              <span className="flex items-center gap-1.5 text-cyan-400">● Real-time stock Checking</span>
              <span className="flex items-center gap-1.5 text-slate-400">● Secure ISO-27001 Pipeline</span>
            </div>
          </div>

          {/* Smart Factory Ecosystem HUD visualization */}
          <div className="lg:col-span-5 p-1 relative min-h-[400px] z-10 text-left">
            <div className="h-full w-full rounded-2xl border border-slate-800 bg-slate-950/90 backdrop-blur-md p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
                  <span className="text-[10px] font-mono uppercase text-orange-400 flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 animate-pulse text-orange-400" /> Plant floor iot monitor
                  </span>
                  <span className="text-[9px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded font-mono font-bold">CORE CONNECTED</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                  Our system interfaces physical factory nodes (IoT) with digital software structures to automate procurement actions. Click steps below to trigger simulations:
                </p>
              </div>

              {/* Dynamic Interactive Conveyor Mesh representation */}
              <div className="relative py-6 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[160px] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.06),transparent)]" />
                
                <div className="flex flex-col gap-3 w-full px-4 relative z-10">
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 border-b border-slate-800/60 pb-1">
                    <span>ASSEMBLY_LINE_01</span>
                    <span className="text-emerald-400">98.4% EFFICIENCY</span>
                  </div>
                  
                  {/* Visual moving bar */}
                  <div className="h-10 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-around overflow-hidden relative">
                    <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-orange-500/10 to-transparent w-2/3 animate-pulse" />
                    <div className="h-6 w-10 bg-slate-900 rounded border border-orange-500/30 flex items-center justify-center text-[10px] font-mono text-orange-400 animate-bounce">
                      P-94
                    </div>
                    <div className="h-0.5 bg-slate-800 w-12" />
                    <div className="h-6 w-10 bg-slate-900 rounded border border-cyan-500/30 flex items-center justify-center text-[10px] font-mono text-cyan-400">
                      P-95
                    </div>
                    <div className="h-0.5 bg-slate-800 w-12" />
                    <div className="h-6 w-10 bg-slate-900 rounded border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-500">
                      P-96
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                    <span className="flex items-center gap-1"><Cpu className="h-3 w-3 text-cyan-400" /> Sensor: Alloy_Safety</span>
                    <span className="text-orange-400 font-bold">Safety Limit O.K.</span>
                  </div>
                </div>
              </div>

              {/* Core Features list for Hero */}
              <div className="mt-4 p-3.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
                <h4 className="text-xs font-bold text-slate-200 font-display flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                  Siemens & SAP Compatibility
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Avoid costly operational siloing. Natton Systems establishes automated, direct, two-way read/write endpoints to unify your entire industrial tech stack.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SOLUTIONS BUILT FOR (SEGMENTS)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">Solutions Built For</span>
            <h2 className="text-3xl font-bold font-display">Target Manufacturing Segments</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Our automated layouts are custom-configured to accommodate the unique operational needs of diverse industrial divisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {segments.map((seg, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-orange-500/30 transition-all hover:translate-y-[-2px] flex flex-col justify-between group">
                <div>
                  <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-orange-500/20">
                    <Building className="h-4 w-4 text-orange-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 mb-1.5 font-display">{seg.name}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{seg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            CHALLENGES WE SOLVE (PAIN POINTS)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Operational Bottlenecks</span>
            <h2 className="text-3xl font-bold font-display">Manufacturing Challenges We Resolve</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              How Natton Digital replaces manual real estate inefficiencies with high-yield automated systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {painPoints.map((p, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-slate-950/20 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-1 w-0 bg-orange-500 transition-all group-hover:w-full" />
                <div>
                  <h3 className="text-xs font-bold text-slate-200 mb-3 border-b border-slate-800/60 pb-1 flex items-center gap-1.5 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {p.title}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[8px] font-mono text-rose-400 uppercase tracking-wider block">Symptom</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{p.symptom}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-wider block">Natton Optimisation</span>
                      <p className="text-[10px] text-slate-300 mt-0.5 font-medium">{p.cure}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            GROWTH BLUEPRINT (INTERACTIVE WORKFLOW)
           ========================================== */}
        <div id="blueprint" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">Blueprint Process</span>
            <h2 className="text-3xl font-bold font-display">Manufacturing Growth Blueprint</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Follow our fully integrated digital pipeline, showing the systematic conversion of a B2B visitor to a validated ERP ledger entry. Click on any block to explore details:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-5 space-y-2">
              {blueprintSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBlueprintStep(idx)}
                  className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                    activeBlueprintStep === idx 
                      ? 'border-orange-500 bg-orange-500/5 shadow-[0_0_15px_rgba(249,115,22,0.15)] text-white' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-semibold font-mono">{step.title}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${activeBlueprintStep === idx ? 'bg-orange-500 text-black font-bold' : 'bg-slate-900 text-slate-400'}`}>
                    {step.val}
                  </span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[250px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl" />
              <div>
                <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest block mb-1">
                  Active Pipeline Node {activeBlueprintStep + 1} of {blueprintSteps.length}
                </span>
                <h3 className="text-lg font-bold text-slate-100 font-display border-b border-slate-800 pb-2 mb-3">
                  {blueprintSteps[activeBlueprintStep].title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {blueprintSteps[activeBlueprintStep].desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
                <span className="text-[10px] font-mono text-slate-500">Node Status: Operational</span>
                <button 
                  onClick={() => setActiveBlueprintStep((prev) => (prev + 1) % blueprintSteps.length)}
                  className="text-xs text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1.5 font-mono"
                >
                  Next Step <ArrowRight className="h-3.5 w-3.5 text-orange-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            AI GROWTH MARKETING (LEAD GENERATION ENGINE)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Marketing Suite</span>
            <h2 className="text-3xl font-bold font-display">B2B Lead Generation Engine</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Our targeted algorithms maximize enterprise search intent to capture verified B2B procurement inquiries globally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-4 space-y-3">
              {[
                { id: 'linkedin', title: 'LinkedIn Ads Segmenting', icon: Globe, desc: 'Targets procurement managers and machinery distributors directly.' },
                { id: 'google', title: 'Google Keyword Capture', icon: Search, desc: 'Intercepts high-intent searches like "precision alloy OEM supplier".' },
                { id: 'export', title: 'Global Export Funnels', icon: Network, desc: 'Custom international SEO campaigns optimized for US & European buyers.' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMktTab(tab.id as any)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    activeMktTab === tab.id 
                      ? 'border-cyan-500 bg-cyan-500/5 text-white' 
                      : 'border-slate-800 bg-slate-950/20 text-slate-400 hover:text-white'
                  }`}
                >
                  <h3 className="text-xs font-bold font-display flex items-center gap-1.5 mb-1 font-mono">
                    <tab.icon className="h-4 w-4 text-cyan-400" />
                    {tab.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{tab.desc}</p>
                </button>
              ))}
            </div>

            {/* Simulated Live Analytics Dashboard */}
            <div className="lg:col-span-8 p-6 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400">MARKETING ANALYTICS CONSOLE</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Channel: {activeMktTab}</span>
              </div>

              {/* Stat Counters */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {marketingSuite[activeMktTab].metrics.map((stat, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-slate-900/40 border border-slate-800 text-left">
                    <span className="text-[9px] font-mono text-slate-500 block">{stat.l}</span>
                    <span className="text-sm font-extrabold text-slate-100 mt-1 block font-mono">{stat.v}</span>
                  </div>
                ))}
              </div>

              {/* Campaign Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px] font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500">
                      <th className="pb-2">Campaign Identifier</th>
                      <th className="pb-2">Allocated Budget</th>
                      <th className="pb-2">Acquired Leads</th>
                      <th className="pb-2 text-right">Avg Cost Metrics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketingSuite[activeMktTab].campaigns.map((camp, idx) => (
                      <tr key={idx} className="border-b border-slate-800/40">
                        <td className="py-2.5 text-slate-200 font-medium">{camp.name}</td>
                        <td className="py-2.5 text-slate-400">{camp.budget}</td>
                        <td className="py-2.5 text-cyan-400 font-bold">{camp.leads}</td>
                        <td className="py-2.5 text-right text-emerald-400">{camp.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            GROWTHOS™ FOR MANUFACTURING (CRM PIPELINE)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">CRM Suite</span>
            <h2 className="text-3xl font-bold font-display">GrowthOS™ For Manufacturing</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Visual pipeline showing real-time deal movements, RFQ statuses, and distributor margin logs. Click on cards to advance stages:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            {['new', 'qualified', 'rfq_sent', 'ordered'].map((stage) => {
              const stageLeads = crmLeads.filter(lead => lead.stage === stage);
              const stageLabels: Record<string, { title: string; color: string; border: string }> = {
                new: { title: '1. New Inquiries', color: 'bg-slate-500/10 text-slate-400', border: 'border-slate-800' },
                qualified: { title: '2. Qualified RFQs', color: 'bg-orange-500/10 text-orange-400', border: 'border-orange-500/20' },
                rfq_sent: { title: '3. Quote Dispatched', color: 'bg-cyan-500/10 text-cyan-400', border: 'border-cyan-500/20' },
                ordered: { title: '4. Closed & Won', color: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/20' }
              };
              
              return (
                <div key={stage} className={`p-4 rounded-xl border ${stageLabels[stage].border} bg-slate-950/60 flex flex-col justify-between min-h-[220px]`}>
                  <div>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${stageLabels[stage].color} inline-block mb-3`}>
                      {stageLabels[stage].title}
                    </span>
                    
                    <div className="space-y-2">
                      {stageLeads.length === 0 ? (
                        <p className="text-[9px] text-slate-600 font-mono italic py-4">No active inquiries</p>
                      ) : (
                        stageLeads.map((lead) => (
                          <div 
                            key={lead.id} 
                            onClick={() => advanceStage(lead.id)}
                            className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-orange-500/40 transition-all cursor-pointer relative group"
                          >
                            <span className="text-[8px] font-mono text-slate-500 block uppercase">{lead.rfqType}</span>
                            <span className="text-[11px] font-bold text-slate-200 block mt-0.5 group-hover:text-orange-400 transition-colors">{lead.company}</span>
                            <span className="text-[10px] font-mono text-cyan-400 block mt-1 font-semibold">{lead.val}</span>
                            <span className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-600 group-hover:text-orange-400">Advance →</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <span className="text-[8px] font-mono text-slate-600 mt-4 block">Click card to move pipeline</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            BUSINESSOS™ COMMUNICATION PLATFORM
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Communication Platform</span>
            <h2 className="text-3xl font-bold font-display">BusinessOS™ Communication Portal</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Test our live WhatsApp simulator. Type numbers (1, 2, or 3) or "YES" into the terminal to trigger instant parts catalogs and pricing calculators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-800 bg-[#090d1c] shadow-2xl relative">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Factory className="h-3 w-3 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">Industrial Chat Bot</h3>
                    <span className="text-[8px] font-mono text-emerald-400 flex items-center gap-1">● Online</span>
                  </div>
                </div>
                <span className="text-[8px] font-mono text-slate-500">WHATSAPP sandbox</span>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 max-h-[220px] overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {chatLog.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl text-[10px] leading-relaxed font-mono ${
                      msg.sender === 'user' 
                        ? 'bg-orange-500 text-black rounded-tr-none font-bold' 
                        : 'bg-slate-900 text-slate-300 border border-slate-800 rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span className={`text-[7px] block mt-1.5 text-right ${msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
                {botTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl rounded-tl-none text-[9px] text-slate-500 font-mono italic animate-pulse">
                      Alloy Expert is typing...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={sendChatMessage} className="flex gap-2 border-t border-slate-800 pt-3">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type '1', '2', '3' or custom message..."
                  className="flex-grow bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] font-mono focus:outline-none focus:border-orange-500 text-slate-100"
                />
                <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-black px-4 rounded-lg flex items-center justify-center">
                  <Send className="h-3.5 w-3.5 text-black" />
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl font-bold text-slate-100 font-display">Engineered B2B Telephony & Messaging</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our channels coordinate multiple on-ground managers under one central company profile, keeping records safely archived in your dashboard and eliminating dealer communication leaks.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: 'Instant WhatsApp Sheets', desc: 'Dispatches custom PDFs, specifications, and catalogs automatically in response to queries.' },
                  { label: 'AI Voice Callback', desc: 'Missed calls automatically log CRM tasks and schedule outbound dialers under 45 seconds.' },
                  { label: 'Central Team Inbox', desc: 'Saves multi-channel communications (SMS/WhatsApp) inside one central timeline.' },
                  { label: 'Secure ERP Cloud Sync', desc: 'Automatically writes credit limit checks and distributor ledgers on order confirmation.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/80">
                    <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      {item.label}
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            AGENTICOS™ FOR MANUFACTURING (3D AGENTS)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">Agentic Suite</span>
            <h2 className="text-3xl font-bold font-display">AgenticOS™ Multi-Agent Network</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Explore how autonomous AI agents execute tasks across the factory supply chain. Click on an agent node to verify active logic codes:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-5 space-y-2">
              {agents.map((ag) => (
                <button
                  key={ag.id}
                  onClick={() => setActiveAgent(ag.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    activeAgent === ag.id 
                      ? 'border-orange-500 bg-orange-500/5 shadow-[0_0_15px_rgba(249,115,22,0.15)] text-white' 
                      : 'border-slate-800 bg-slate-950/20 text-slate-400 hover:text-white'
                  }`}
                >
                  <h3 className="text-xs font-bold font-display flex items-center gap-1.5 font-mono mb-1">
                    <Cpu className={`h-4 w-4 ${activeAgent === ag.id ? 'text-orange-400 animate-pulse' : 'text-slate-500'}`} />
                    {ag.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 truncate leading-relaxed">{ag.role}</p>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[220px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />
              
              <div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest">Logic Code Registry</span>
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">STATUS_SECURE</span>
                </div>
                
                <h3 className="text-sm font-bold text-slate-200 font-display">
                  {agents.find(ag => ag.id === activeAgent)?.name} Code
                </h3>
                
                <div className="mt-3 p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[10px] text-cyan-400 leading-relaxed overflow-x-auto">
                  <code>{agents.find(ag => ag.id === activeAgent)?.trigger}</code>
                </div>
                
                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                  {agents.find(ag => ag.id === activeAgent)?.role}
                </p>
              </div>

              <span className="text-[8px] font-mono text-slate-600 block mt-4 pt-2 border-t border-slate-800/40">Secure multi-agent integration layer</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            ERP & BUSINESS INTEGRATIONS
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Integrations Architecture</span>
            <h2 className="text-3xl font-bold font-display">ERP & Business System Mappings</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Natton Systems establishes automated, direct, two-way read/write endpoints to unify your entire industrial tech stack.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {erpIntegrations.map((erp, idx) => {
              const IconComp = erp.icon;
              return (
                <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-cyan-500/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <IconComp className="h-4 w-4 text-cyan-400" />
                    </div>
                    <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {erp.latency} latency
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-200 mb-1.5 font-display">{erp.name}</h3>
                  <p className="text-[10px] text-slate-500 font-mono mb-2">{erp.status}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{erp.tech}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            MANUFACTURING AUTOMATION WORKFLOWS
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">Automation Workflows</span>
            <h2 className="text-3xl font-bold font-display">Custom Operational Pathways</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Follow our fully integrated digital pipeline, showing the systematic flow of manufacturing datasets:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-4 space-y-2.5">
              {workflows.map((flow, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFlowIdx(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    activeFlowIdx === idx 
                      ? 'border-orange-500 bg-orange-500/5 text-white' 
                      : 'border-slate-800 bg-slate-950/20 text-slate-400 hover:text-white'
                  }`}
                >
                  <h3 className="text-xs font-bold font-display flex items-center gap-1.5 mb-1 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    {flow.title.split(' → ')[0]} Route
                  </h3>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{flow.desc}</p>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 p-6 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md">
              <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest block mb-2">ACTIVE WORKFLOW SCHEMATIC</span>
              <h3 className="text-sm font-bold text-slate-200 font-display mb-6 border-b border-slate-800 pb-2">
                {workflows[activeFlowIdx].title}
              </h3>

              {/* Workflow Nodes Grid with Arrow Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative">
                {workflows[activeFlowIdx].nodes.map((node, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 relative group hover:border-cyan-500/35 transition-all text-left">
                    <span className="text-[8px] font-mono text-slate-500 block">NODE_0{i + 1}</span>
                    <p className="text-[11px] font-bold text-slate-200 mt-1 font-mono leading-tight">{node}</p>
                    <span className="absolute bottom-1 right-2 text-[8px] text-cyan-400/80 opacity-0 group-hover:opacity-100 transition-opacity">● ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            POPULAR USE CASES
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Use Cases</span>
            <h2 className="text-3xl font-bold font-display">Target Manufacturing Actions</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Empower your plant floor, procurement desk, and customer sales rep with specialized automation blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {useCases.map((uc, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-slate-950/20 flex flex-col justify-between hover:border-cyan-500/30 transition-all relative overflow-hidden group">
                <div>
                  <h3 className="text-xs font-bold text-slate-200 mb-2 border-b border-slate-800/40 pb-1.5 flex items-center gap-1.5 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {uc.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{uc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            MANUFACTURING INTELLIGENCE DASHBOARD
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">Intelligence Console</span>
            <h2 className="text-3xl font-bold font-display">Manufacturing Intelligence Dashboard</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Our secure operational dashboard compiles plant output capacities, open lead RFQs, and sales performance:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
            {/* Visual Charts section */}
            <div className="lg:col-span-8 p-6 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-6">
                  <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5 text-orange-400 animate-pulse" /> PRODUCTION COMPLIANCE CHART
                  </span>
                  <span className="text-[9px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded font-mono font-bold">MONTHLY STATS</span>
                </div>

                {/* Custom SVG line chart representing output trend */}
                <div className="relative h-44 bg-slate-900/30 rounded-xl border border-slate-800/60 p-4 flex items-end justify-between overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />
                  
                  {/* Background gridlines */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                    <div className="h-px bg-slate-800/30 w-full" />
                    <div className="h-px bg-slate-800/30 w-full" />
                    <div className="h-px bg-slate-800/30 w-full" />
                  </div>

                  {/* Chart bars simulating monthly sales volume */}
                  {[
                    { m: 'Jan', val: 42 }, { m: 'Feb', val: 58 }, { m: 'Mar', val: 64 }, 
                    { m: 'Apr', val: 78 }, { m: 'May', val: 92 }, { m: 'Jun', val: 110 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 z-10 w-12 group">
                      <span className="text-[8px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.val}k
                      </span>
                      <div 
                        style={{ height: `${item.val * 0.8 + 20}px` }}
                        className="w-4 bg-gradient-to-t from-orange-500 to-amber-400 rounded-t-sm group-hover:from-cyan-400 group-hover:to-cyan-300 transition-all duration-300 relative"
                      />
                      <span className="text-[8px] font-mono text-slate-400">{item.m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-800/40 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5"><Sliders className="h-3.5 w-3.5 text-cyan-400" /> Standard deviation: ±1.8%</span>
                <span className="text-right text-orange-400">Target output: 120k units</span>
              </div>
            </div>

            {/* Dashboard Modules */}
            <div className="lg:col-span-4 p-6 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md flex flex-col justify-between text-left">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest block border-b border-slate-800 pb-2">ACTIVE MODULES</span>
                
                {[
                  { title: 'Inbound Leads Module', value: '412 registered', status: 'Optimal' },
                  { title: 'Quotation Pipeline Engine', value: '₹1.4 Cr Pending', status: 'High Volume' },
                  { title: 'Supplier Bidding Ledger', value: '6 Contracts active', status: 'Audit Ready' },
                  { title: 'Logistics Tracker Interface', value: '18 Shipments logged', status: 'Real-time' }
                ].map((mod, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-[11px] font-bold text-slate-200 block">{mod.title}</span>
                      <span className="text-[9px] font-mono text-slate-400 block mt-0.5">{mod.value}</span>
                    </div>
                    <span className="text-[8px] font-mono bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded">
                      {mod.status}
                    </span>
                  </div>
                ))}
              </div>

              <span className="text-[8px] font-mono text-slate-600 mt-6 block">Unified Business Intelligence console</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            MANUFACTURING ROI CALCULATOR
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">ROI Calculator</span>
            <h2 className="text-3xl font-bold font-display">Manufacturing ROI Calculator</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Simulate operational savings and customer revenue boosts generated by migrating legacy structures to Natton Systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-6 p-6 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md space-y-5">
              <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2 mb-4 uppercase font-mono tracking-wider">
                Simulation Variables
              </h3>

              <div className="space-y-4">
                {/* Leads Slider */}
                <div>
                  <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-1.5">
                    <span>Monthly Inbound Leads</span>
                    <span className="text-orange-400 font-bold">{monthlyLeads} leads</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="1500" 
                    step="50"
                    value={monthlyLeads}
                    onChange={(e) => setMonthlyLeads(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                {/* Deal Value Slider */}
                <div>
                  <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-1.5">
                    <span>Average B2B Deal Value</span>
                    <span className="text-orange-400 font-bold">{formatCurrency(dealValue)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="100000" 
                    max="5000000" 
                    step="100000"
                    value={dealValue}
                    onChange={(e) => setDealValue(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                {/* Team Size Slider */}
                <div>
                  <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-1.5">
                    <span>Sales Representatives</span>
                    <span className="text-orange-400 font-bold">{salesTeam} reps</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="40" 
                    step="1"
                    value={salesTeam}
                    onChange={(e) => setSalesTeam(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                {/* Software Cost Slider */}
                <div>
                  <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-1.5">
                    <span>Current Stack Monthly Costs</span>
                    <span className="text-orange-400 font-bold">{formatCurrency(softwareCost)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="200000" 
                    step="5000"
                    value={softwareCost}
                    onChange={(e) => setSoftwareCost(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Financial Outputs Display */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md flex flex-col justify-between min-h-[340px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/5 rounded-full blur-3xl" />
              
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest block border-b border-slate-800 pb-2">SIMULATED GAIN MATRIX</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">Manual Revenue</span>
                    <span className="text-sm font-bold text-slate-300 block mt-1 font-mono">{formatCurrency(curRevenue)}</span>
                    <span className="text-[8px] font-mono text-slate-600 block mt-1">Based on 2.0% Conv</span>
                  </div>

                  <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <span className="text-[9px] font-mono text-orange-400 block uppercase font-bold">Natton Revenue</span>
                    <span className="text-sm font-extrabold text-orange-400 block mt-1 font-mono">{formatCurrency(optRevenue)}</span>
                    <span className="text-[8px] font-mono text-orange-500/70 block mt-1">Based on 4.8% Conv</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Operational Hours saved</span>
                    <span className="text-xs font-bold text-emerald-400 mt-1 block">~ {salesTeam * 15} hours / week</span>
                  </div>
                  <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    +{adminSavings ? '₹' + (adminSavings / 1000).toFixed(0) + 'k' : '0'} Value
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 block uppercase font-bold">Net Integration Gain</span>
                    <span className="text-base font-extrabold text-cyan-400 mt-1 block font-mono">{formatCurrency(totalFinancialGain)}</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">
                    {autoROI}% Est ROI
                  </span>
                </div>
              </div>

              <span className="text-[8px] font-mono text-slate-600 block mt-6 pt-2 border-t border-slate-800/40">Financial estimates based on average sector benchmarks</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            SUCCESS STORIES (CAROUSEL)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">Success Stories</span>
            <h2 className="text-3xl font-bold font-display">Manufacturing Success Stories</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Read how leading manufacturers transformed their daily operational workflows using Natton Digital.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-4 space-y-2.5">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIdx(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    carouselIdx === idx 
                      ? 'border-orange-500 bg-orange-500/5 text-white' 
                      : 'border-slate-800 bg-slate-950/20 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-[9px] font-mono text-orange-400 block mb-0.5 uppercase tracking-wider">{cs.type}</span>
                  <h3 className="text-xs font-bold font-display block">{cs.company}</h3>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[300px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/5 rounded-full blur-3xl" />
              
              <div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                  <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Case Profile {carouselIdx + 1} of 4</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{caseStudies[carouselIdx].metric}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 font-display mb-2">{caseStudies[carouselIdx].company}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{caseStudies[carouselIdx].impact}</p>

                {/* Results columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {caseStudies[carouselIdx].results.map((r, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase">{r.label}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-rose-500 font-mono strike line-through">{r.before}</span>
                        <span className="text-xs text-emerald-400 font-bold font-mono">{r.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <span className="text-[8px] font-mono text-slate-600 block mt-6 pt-2 border-t border-slate-800/40">Verified client audit summary</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            COMPARISON MATRIX
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Capability Matchup</span>
            <h2 className="text-3xl font-bold font-display">Why Manufacturers Choose Natton Digital</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Compare our specialized smart factory automation with slow legacy models or complex developer code.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 font-mono text-slate-400">
                  <th className="p-4 sm:p-5 font-bold uppercase tracking-wider">Capabilities</th>
                  <th className="p-4 sm:p-5 font-extrabold text-orange-400 uppercase tracking-wider">Natton Digital</th>
                  <th className="p-4 sm:p-5 font-bold uppercase tracking-wider">Traditional Agencies</th>
                  <th className="p-4 sm:p-5 font-bold uppercase tracking-wider">Generic CRM Platforms</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800/40 hover:bg-slate-900/10">
                    <td className="p-4 sm:p-5 font-bold text-slate-200 font-display">{row.cap}</td>
                    <td className="p-4 sm:p-5 font-medium text-orange-300 bg-orange-500/[0.02] border-x border-slate-800/60">{row.natton}</td>
                    <td className="p-4 sm:p-5 text-slate-400">{row.trad}</td>
                    <td className="p-4 sm:p-5 text-slate-400">{row.generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            15 FREQUENTLY ASKED QUESTIONS
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Faq Section</span>
            <h2 className="text-3xl font-bold font-display">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Find solutions regarding our API safety, database setups, regional integrations, and SLA guarantees.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqList.map((faq, i) => (
              <div 
                key={i} 
                className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-900/10 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-200 font-display pr-4">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="p-4 bg-slate-900 border-t border-slate-800/60">
                    <p className="text-[11px] text-slate-400 leading-relaxed whitespace-pre-line">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            LEAD FORM WITH CAPTCHA & SIMULATOR LOGS
           ========================================== */}
        <div id="lead_form" className="mb-24 max-w-4xl mx-auto">
          <div className="p-1 rounded-3xl border border-slate-800 bg-[#090d1c] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              
              {/* Form Input Side */}
              <div className="md:col-span-7 p-6 sm:p-8 text-left border-r border-slate-800/80">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[9px] font-mono uppercase text-orange-400">GHL Webhook Interface</span>
                </div>

                <h3 className="text-xl font-bold text-slate-100 font-display mb-2">Book A Manufacturing Growth Consultation</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
                  Fill in details below to test our n8n payload mapper. Captcha verification ensures secure, spam-free lead processing.
                </p>

                {isSubmitted ? (
                  <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-3">
                    <CheckCheck className="h-8 w-8 text-emerald-400 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-200">Consultation Scheduled!</h4>
                    <p className="text-[10px] text-slate-400">
                      Our system has logged Tata/OEM parameters. A regional supply partner has dispatched technical catalogs directly to your email.
                    </p>
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setCaptchaInput('');
                        setCaptchaValues({
                          num1: Math.floor(Math.random() * 8) + 2,
                          num2: Math.floor(Math.random() * 8) + 2
                        });
                      }}
                      className="px-4 py-2 text-[10px] font-mono text-orange-400 hover:text-orange-300 font-bold border border-slate-800 rounded-lg"
                    >
                      Reset Form Submit
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleConsultationSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-mono text-slate-400 block mb-1">Full Name</label>
                        <input 
                          type="text" 
                          required 
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-orange-500 text-slate-100 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-slate-400 block mb-1">Company Name</label>
                        <input 
                          type="text" 
                          required 
                          value={formCompany}
                          onChange={(e) => setFormCompany(e.target.value)}
                          placeholder="Motors Ltd."
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-orange-500 text-slate-100 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-mono text-slate-400 block mb-1">Industry Segment</label>
                        <select 
                          value={formSegment}
                          onChange={(e) => setFormSegment(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-orange-500 text-slate-100 font-mono"
                        >
                          <option>Manufacturing Companies</option>
                          <option>OEMs (Original Equipment)</option>
                          <option>Industrial Equipment Suppliers</option>
                          <option>Engineering Companies</option>
                          <option>Process Industries</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-slate-400 block mb-1">Location</label>
                        <input 
                          type="text" 
                          required 
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          placeholder="Mumbai, IN"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-orange-500 text-slate-100 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-mono text-slate-400 block mb-1">Corporate Email</label>
                        <input 
                          type="email" 
                          required 
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="corp@motors.com"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-orange-500 text-slate-100 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-slate-400 block mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-orange-500 text-slate-100 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 items-center">
                      <div>
                        <label className="text-[9px] font-mono text-slate-400 block mb-1">Company Team Size</label>
                        <select 
                          value={formTeamSize}
                          onChange={(e) => setFormTeamSize(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-orange-500 text-slate-100 font-mono"
                        >
                          <option>10 - 50 employees</option>
                          <option>50 - 250 employees</option>
                          <option>250+ employees</option>
                        </select>
                      </div>
                      <div>
                        {/* Interactive math validation */}
                        <label className="text-[9px] font-mono text-orange-400 block mb-1 font-bold">
                          Verify: {captchaValues.num1} + {captchaValues.num2} = ?
                        </label>
                        <input 
                          type="number" 
                          required 
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          placeholder="Sum answer..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-orange-500 text-slate-100 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-mono text-slate-400 block mb-1">Operational Challenges</label>
                      <textarea 
                        rows={2}
                        value={formChallenges}
                        onChange={(e) => setFormChallenges(e.target.value)}
                        placeholder="E.g., slow RFQ turnarounds, data-entry logs in ERP..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:border-orange-500 text-slate-100 font-mono"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 disabled:opacity-50 text-black font-extrabold rounded-lg text-xs uppercase tracking-wider transition-opacity mt-4 block"
                    >
                      {isSubmitting ? 'TRANSMITTING Webhook payload...' : 'Book Free B2B Consultation'}
                    </button>
                  </form>
                )}
              </div>

              {/* Developer Live Webhook Terminal Logs Side */}
              <div className="md:col-span-5 p-6 bg-slate-950/80 backdrop-blur-md flex flex-col justify-between text-left">
                <div>
                  <span className="text-[8px] font-mono text-slate-500 block mb-4 border-b border-slate-800/60 pb-1 uppercase">Live Integration Logs</span>
                  
                  {terminalLogs.length === 0 ? (
                    <div className="text-[9px] font-mono text-slate-600 leading-relaxed italic">
                      Waiting for B2B form submission...
                    </div>
                  ) : (
                    <div className="space-y-2.5 font-mono text-[9px] text-cyan-400 leading-relaxed">
                      {terminalLogs.map((log, index) => (
                        <div key={index} className="flex gap-1.5 items-start">
                          <span className="text-orange-500">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-[8px] font-mono text-slate-600 border-t border-slate-800/40 pt-4 mt-6 leading-relaxed">
                  Payload delivers secure, sanitised webhook signals to GHL backend core endpoints.
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            FINAL CALL TO ACTION (CTA)
           ========================================== */}
        <div className="mb-12 relative p-12 sm:p-16 rounded-3xl border border-slate-800 bg-[#090d1c] overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.04),transparent_70%)]" />
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold block">Next-Gen Industrial Systems</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display leading-tight text-slate-100">Modernize Manufacturing With AI</h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
              Connect raw materials, plant floors, distributor channels, and customer CRM systems under one autonomous integration layout.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <a 
                href="#lead_form" 
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-black font-extrabold rounded-lg text-xs uppercase tracking-wider"
              >
                Book Consultation
              </a>
              <a 
                href="tel:+919876543210" 
                className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-950/40 hover:bg-slate-900 text-slate-200 font-semibold text-xs"
              >
                Talk To Experts
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
