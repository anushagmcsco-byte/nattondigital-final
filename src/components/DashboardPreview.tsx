import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Cpu,
  CheckCircle,
  Activity,
  Play,
  Settings,
  ArrowRight,
  Database,
  Shuffle,
  Mail,
  Zap,
  PhoneCall,
  Clock,
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  darkMode: boolean;
}

function MetricCard({ title, value, change, isPositive, icon, darkMode }: MetricCardProps) {
  return (
    <div className={`p-4 rounded-xl transition-all duration-300 ${
      darkMode ? 'bg-white/[0.02] border border-white/[0.06] hover:border-primary/50' : 'bg-white border border-gray-100 hover:border-primary/40 shadow-sm'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</span>
        <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-white/[0.04]' : 'bg-gray-50'}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <span className={`text-xl font-bold font-display ${darkMode ? 'text-white' : 'text-[#081120]'}`}>{value}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          isPositive 
            ? 'bg-emerald-500/10 text-emerald-400' 
            : 'bg-rose-500/10 text-rose-400'
        }`}>
          {change}
        </span>
      </div>
    </div>
  );
}

export default function DashboardPreview({ darkMode = true }: { darkMode?: boolean }) {
  const [selectedIndustry, setSelectedIndustry] = useState<'healthcare' | 'education' | 'realestate' | 'retail' | 'manufacturing' | 'services'>('healthcare');
  const [activeTab, setActiveTab] = useState<'analytics' | 'workflows' | 'channels'>('analytics');
  const [automationProgress, setAutomationProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Real-time metrics
  const [leadCount, setLeadCount] = useState(1420);
  const [revenueSaved, setRevenueSaved] = useState(48250);
  const [triggerPulse, setTriggerPulse] = useState(false);

  // Auto tick simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLeadCount((prev) => {
        const increment = Math.random() > 0.4 ? 1 : 0;
        if (increment > 0) {
          setTriggerPulse(true);
          setTimeout(() => setTriggerPulse(false), 800);
        }
        return prev + increment;
      });
      setRevenueSaved((prev) => prev + (Math.random() > 0.7 ? 15 : 0));
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const industryData = {
    healthcare: {
      name: 'Healthcare Systems',
      before: '45 mins / patient',
      after: '6 mins / patient',
      savings: '86% Time Reduction',
      pipeline: 'Patient Intake → AI Triage → WhatsApp Reminder → EMR Entry',
      impact: 'Zero missed bookings, HIPAA compliance, 24/7 autonomous nurse assistant answering questions.',
      graphPoints: [30, 45, 65, 80, 120, 150, 195],
    },
    education: {
      name: 'EdTech & Institutes',
      before: '3.2 days response time',
      after: '45 seconds response time',
      savings: '99% Speed Improvement',
      pipeline: 'Lead Form → AI WhatsApp Counselor → Instant Brochure → Sales CRM',
      impact: '2.4x student enrollment, automated course query responses, dynamic WhatsApp reminders.',
      graphPoints: [40, 55, 70, 95, 110, 135, 180],
    },
    realestate: {
      name: 'Real Estate Developers',
      before: '80% cold follow-ups',
      after: '100% pre-qualified lead scheduling',
      savings: '5x Realtor Productivity',
      pipeline: 'Zillow/Meta Lead → Voice Bot Pre-qualification → Calendar booking → Agent SMS Alert',
      impact: '72% booking rate on site visits, immediate buyer profiling, automated property catalog distribution.',
      graphPoints: [25, 38, 55, 75, 105, 140, 210],
    },
    retail: {
      name: 'E-commerce & Retail',
      before: '24-hour abandoned cart action',
      after: '15-minute automated recovery',
      savings: '18% Cart Recovery Rate',
      pipeline: 'Cart Abandoned → WhatsApp Discount → Smart Agent Support → checkout conversion',
      impact: 'Massive reduction in support tickets, personalized coupon agents, automated shipping tracking.',
      graphPoints: [50, 68, 85, 115, 145, 185, 240],
    },
    manufacturing: {
      name: 'Manufacturing & Supply Chain',
      before: 'Manual dispatch sheets',
      after: 'Automated Agent procurement logs',
      savings: '40 hours/week admin time',
      pipeline: 'Low Inventory Alert → Agent AI Quoting → Supplier Matching → PO Generation',
      impact: 'Zero raw material delays, seamless cross-department communication, integrated CRM dashboards.',
      graphPoints: [15, 30, 45, 60, 85, 115, 160],
    },
    services: {
      name: 'Professional Services',
      before: '6 hours quoting lag',
      after: 'Instant interactive proposal tool',
      savings: '92% Faster Turnaround',
      pipeline: 'Inquiry → AI Assessment → Proposal Generator → CRM Notification',
      impact: '3x higher proposal close rate, automatic feedback loop, streamlined booking Calendly workflows.',
      graphPoints: [20, 40, 58, 82, 112, 148, 190],
    },
  };

  const currentInd = industryData[selectedIndustry];

  const handleSimulate = () => {
    setIsSimulating(true);
    setAutomationProgress(0);
    const interval = setInterval(() => {
      setAutomationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className={`w-full rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl ${
      darkMode ? 'bg-[#081120] border border-white/10' : 'bg-white border border-gray-100'
    }`}>
      {/* Dashboard Top Control bar */}
      <div className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 ${
        darkMode ? 'border-white/5 bg-white/[0.01]' : 'border-gray-100 bg-gray-50/50'
      }`}>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className={`text-xs font-mono font-medium tracking-wide uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            GrowthOS™ Live Terminal (Production)
          </span>
        </div>
        
        {/* Tab Selector */}
        <div className={`flex p-1 rounded-lg ${darkMode ? 'bg-white/[0.04]' : 'bg-gray-100'}`}>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              activeTab === 'analytics'
                ? (darkMode ? 'bg-primary text-white' : 'bg-white text-primary shadow-sm')
                : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
            }`}
          >
            Analytics Node
          </button>
          <button
            onClick={() => setActiveTab('workflows')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              activeTab === 'workflows'
                ? (darkMode ? 'bg-primary text-white' : 'bg-white text-primary shadow-sm')
                : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
            }`}
          >
            Agent Workflows
          </button>
          <button
            onClick={() => setActiveTab('channels')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              activeTab === 'channels'
                ? (darkMode ? 'bg-primary text-white' : 'bg-white text-primary shadow-sm')
                : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
            }`}
          >
            Multi-Channel Hub
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Industry Switcher Tab */}
        <div className="mb-6">
          <p className={`text-xs font-medium mb-3 uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Select Your Industry to Simulate Cross-Industry Automation
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {(Object.keys(industryData) as Array<keyof typeof industryData>).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedIndustry(key)}
                className={`py-2 px-1 text-center rounded-lg text-xs font-medium transition-all truncate border ${
                  selectedIndustry === key
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : (darkMode 
                        ? 'border-white/[0.05] bg-white/[0.01] text-gray-400 hover:bg-white/[0.04] hover:text-white' 
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900')
                }`}
              >
                {industryData[key].name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content 1: Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Top Grid Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Simulated Leads Captured"
                value={leadCount.toLocaleString()}
                change="+24%"
                isPositive={true}
                darkMode={darkMode}
                icon={<Users className="h-4 w-4 text-primary" />}
              />
              <MetricCard
                title="Platform Saved Revenue"
                value={`$${revenueSaved.toLocaleString()}`}
                change="+$3,450 today"
                isPositive={true}
                darkMode={darkMode}
                icon={<TrendingUp className="h-4 w-4 text-emerald-400" />}
              />
              <MetricCard
                title="Active Autonomous Agents"
                value="14 Active"
                change="99.9% Live"
                isPositive={true}
                darkMode={darkMode}
                icon={<Cpu className="h-4 w-4 text-accent" />}
              />
              <MetricCard
                title="Workflow Efficiency"
                value="94.2%"
                change="+12.4% boost"
                isPositive={true}
                darkMode={darkMode}
                icon={<CheckCircle className="h-4 w-4 text-[#00C2FF]" />}
              />
            </div>

            {/* Core Visualization Block */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SVG Analytics Graph */}
              <div className={`lg:col-span-2 p-5 rounded-xl border ${
                darkMode ? 'bg-white/[0.01] border-white/[0.06]' : 'bg-gray-50/50 border-gray-100'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#081120]'}`}>
                      Growth Trajectory Optimizer ({currentInd.name})
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Simulated conversion scaling with GrowthOS
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className={`text-[10px] font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Natton AI Pipeline
                    </span>
                  </div>
                </div>

                {/* custom dynamic SVG chart path based on industry select */}
                <div className="relative h-[180px] w-full mt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180">
                    <defs>
                      <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0B5FFF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="10" y1="20" x2="490" y2="20" stroke={darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'} strokeDasharray="3" />
                    <line x1="10" y1="60" x2="490" y2="60" stroke={darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'} strokeDasharray="3" />
                    <line x1="10" y1="100" x2="490" y2="100" stroke={darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'} strokeDasharray="3" />
                    <line x1="10" y1="140" x2="490" y2="140" stroke={darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'} strokeDasharray="3" />

                    {/* SVG Line path drawing based on selected industry points */}
                    <path
                      d={`M 10,${160 - currentInd.graphPoints[0] * 0.6} 
                          C 80,${160 - currentInd.graphPoints[1] * 0.6} 
                            160,${160 - currentInd.graphPoints[2] * 0.6} 
                            240,${160 - currentInd.graphPoints[3] * 0.6} 
                          S 320,${160 - currentInd.graphPoints[4] * 0.6} 
                            400,${160 - currentInd.graphPoints[5] * 0.6} 
                            490,${160 - currentInd.graphPoints[6] * 0.6}`}
                      fill="none"
                      stroke="#0B5FFF"
                      strokeWidth="3"
                      className="transition-all duration-700 ease-out"
                    />

                    {/* Under-shadow filled region */}
                    <path
                      d={`M 10,${160 - currentInd.graphPoints[0] * 0.6} 
                          C 80,${160 - currentInd.graphPoints[1] * 0.6} 
                            160,${160 - currentInd.graphPoints[2] * 0.6} 
                            240,${160 - currentInd.graphPoints[3] * 0.6} 
                          S 320,${160 - currentInd.graphPoints[4] * 0.6} 
                            400,${160 - currentInd.graphPoints[5] * 0.6} 
                            490,${160 - currentInd.graphPoints[6] * 0.6}
                          L 490,165 L 10,165 Z`}
                      fill="url(#chart-glow)"
                      className="transition-all duration-700 ease-out"
                    />

                    {/* Nodes plotting */}
                    {currentInd.graphPoints.map((val, idx) => {
                      const posX = 10 + (idx * 480) / 6;
                      const posY = 160 - val * 0.6;
                      return (
                        <g key={idx} className="group cursor-pointer">
                          <circle
                            cx={posX}
                            cy={posY}
                            r="4"
                            fill="#00C2FF"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx={posX}
                            cy={posY}
                            r="10"
                            fill="#00C2FF"
                            fillOpacity="0"
                            className="hover:fill-opacity-20 transition-all duration-200"
                          />
                        </g>
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="px-2 py-1 bg-dark/90 text-[10px] text-white rounded">Live Scaling Model</span>
                  </div>
                </div>

                {/* X-Axis labels */}
                <div className="flex justify-between mt-3 text-[10px] font-mono text-gray-400">
                  <span>Inception</span>
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Optimization Node</span>
                  <span>Autonomous Phase</span>
                  <span>Current Status</span>
                </div>
              </div>

              {/* Before vs After Visualizer */}
              <div className={`p-5 rounded-xl border flex flex-col justify-between ${
                darkMode ? 'bg-white/[0.01] border-white/[0.06]' : 'bg-gray-50/50 border-gray-100'
              }`}>
                <div>
                  <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#081120]'}`}>
                    Before vs After Optimization
                  </h4>
                  <p className={`text-xs mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Comparing manual operations vs Natton AI Agentic efficiency
                  </p>
                </div>

                <div className="space-y-4 my-2">
                  {/* Before */}
                  <div className={`p-3 rounded-lg border ${
                    darkMode ? 'bg-rose-500/5 border-rose-500/10' : 'bg-rose-50 border-rose-100'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-rose-500 tracking-wider uppercase">
                        Before (Manual)
                      </span>
                      <Clock className="h-3 w-3 text-rose-500" />
                    </div>
                    <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {currentInd.before}
                    </p>
                    <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      Siloed staff routing, lost followups, human typing limits.
                    </p>
                  </div>

                  {/* After */}
                  <div className={`p-3 rounded-lg border glow-secondary ${
                    darkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                        After (Natton AI)
                      </span>
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <p className="text-sm font-bold text-emerald-400">
                      {currentInd.after}
                    </p>
                    <p className="text-xs font-semibold text-[#00C2FF] mt-0.5">
                      {currentInd.savings}
                    </p>
                    <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      Instant webhook triage, n8n active node flow, zero cold outreach.
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-gray-400 text-center mt-2">
                  💡 Dynamic mapping updates instantly based on target metrics.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Workflows */}
        {activeTab === 'workflows' && (
          <div className="space-y-6">
            <div className={`p-5 rounded-xl border ${
              darkMode ? 'bg-white/[0.01] border-white/[0.06]' : 'bg-gray-50/50 border-gray-100'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-[#081120]'}`}>
                    Active Workflow Simulator (n8n & CRM Interconnection)
                  </h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Current Node Pipeline: <strong className="text-primary">{currentInd.pipeline}</strong>
                  </p>
                </div>

                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="flex items-center gap-2 py-2 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium text-xs transition-all disabled:opacity-50"
                >
                  <Play className={`h-3 w-3 ${isSimulating ? 'animate-spin' : ''}`} />
                  {isSimulating ? 'Processing Nodes...' : 'Trigger GrowthOS Pipeline'}
                </button>
              </div>

              {/* Graph Nodes representation */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {/* Connector line overlay for desktop */}
                <div className="hidden md:block absolute top-[40%] left-[10%] right-[10%] h-0.5 border-t border-dashed border-primary/30 z-0" />

                {/* Node 1 */}
                <div className={`p-4 rounded-xl border relative z-10 ${
                  isSimulating && automationProgress >= 10
                    ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(11,95,255,0.2)]'
                    : (darkMode ? 'bg-white/[0.01] border-white/[0.06]' : 'bg-white border-gray-100')
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded bg-primary/20">
                      <Database className="h-4 w-4 text-primary" />
                    </div>
                    <span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Lead Captured
                    </span>
                  </div>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Webhook intercepts Facebook, Google Ads, or Webhook landing forms instantly.
                  </p>
                  {isSimulating && automationProgress >= 10 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                  )}
                </div>

                {/* Node 2 */}
                <div className={`p-4 rounded-xl border relative z-10 ${
                  isSimulating && automationProgress >= 40
                    ? 'border-secondary bg-[#00C2FF]/5 shadow-[0_0_15px_rgba(0,194,255,0.2)]'
                    : (darkMode ? 'bg-white/[0.01] border-white/[0.06]' : 'bg-white border-gray-100')
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded bg-[#00C2FF]/20">
                      <Cpu className="h-4 w-4 text-secondary" />
                    </div>
                    <span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      AI Agent Triage
                    </span>
                  </div>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    GrowthOS scores intent and routes to specialized CRM agent pipeline.
                  </p>
                  {isSimulating && automationProgress >= 40 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C2FF] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                    </span>
                  )}
                </div>

                {/* Node 3 */}
                <div className={`p-4 rounded-xl border relative z-10 ${
                  isSimulating && automationProgress >= 70
                    ? 'border-accent bg-accent/5 shadow-[0_0_15px_rgba(123,97,255,0.2)]'
                    : (darkMode ? 'bg-white/[0.01] border-white/[0.06]' : 'bg-white border-gray-100')
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded bg-accent/20">
                      <Shuffle className="h-4 w-4 text-accent" />
                    </div>
                    <span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Omnichannel Blast
                    </span>
                  </div>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Fires out WhatsApp chat reminders, AI Voice prequalification call, and dynamic SMS.
                  </p>
                  {isSimulating && automationProgress >= 70 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                    </span>
                  )}
                </div>

                {/* Node 4 */}
                <div className={`p-4 rounded-xl border relative z-10 ${
                  isSimulating && automationProgress >= 100
                    ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : (darkMode ? 'bg-white/[0.01] border-white/[0.06]' : 'bg-white border-gray-100')
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded bg-emerald-500/20">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Revenue Secured
                    </span>
                  </div>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Automatically triggers calendar booking, pipeline win node, and CRM onboarding sequence.
                  </p>
                  {isSimulating && automationProgress >= 100 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
              </div>

              {/* Live simulation progress bar */}
              {isSimulating && (
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-gray-400 font-mono mb-1">
                    <span>Compiling Node JSON Data...</span>
                    <span>{automationProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-[#00C2FF] to-accent transition-all duration-100"
                      style={{ width: `${automationProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Industry summary text block */}
              <div className={`mt-5 p-4 rounded-lg text-xs leading-relaxed ${
                darkMode ? 'bg-white/[0.02]' : 'bg-gray-100/50'
              }`}>
                <h5 className="font-bold text-primary mb-1">
                  Sector Impact: {currentInd.name} Optimized Target State
                </h5>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {currentInd.impact} Natton Digital streamlines this specific cross-industry pipeline to run completely hands-free.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Channels */}
        {activeTab === 'channels' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* WhatsApp demo block */}
              <div className={`p-5 rounded-xl border ${
                darkMode ? 'bg-white/[0.01] border-white/[0.06]' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 bg-emerald-500/10 rounded">
                    <Mail className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    WhatsApp Agent Loop
                  </span>
                </div>
                <div className={`p-3 rounded-lg font-mono text-[11px] h-[150px] overflow-y-auto ${
                  darkMode ? 'bg-black/40 text-gray-300' : 'bg-gray-900 text-gray-200'
                }`}>
                  <div className="text-gray-500 text-[10px] mb-2">[Client Inbox Connect 10:45 AM]</div>
                  <div className="text-[#00C2FF]">AI: Hello! Ready to optimize your {currentInd.name.split(' ')[0]} workflow?</div>
                  <div className="text-yellow-400 mt-1">Lead: Yes! Can you send me case studies?</div>
                  <div className="text-[#00C2FF] mt-1">AI: Sent! We optimized {selectedIndustry} efficiency to {currentInd.after}. Book a strategy call: app.natton.com/call</div>
                  <div className="text-emerald-400 mt-1">Lead: booked. That was instant!</div>
                </div>
              </div>

              {/* AI Calling simulation block */}
              <div className={`p-5 rounded-xl border ${
                darkMode ? 'bg-white/[0.01] border-white/[0.06]' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 bg-primary/10 rounded">
                    <PhoneCall className="h-4 w-4 text-primary" />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Voice Bot Telephony
                  </span>
                </div>
                <div className={`p-3 rounded-lg font-mono text-[11px] h-[150px] flex flex-col justify-between ${
                  darkMode ? 'bg-black/40 text-gray-300' : 'bg-gray-900 text-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">[Autonomous Dialing...]</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="my-2 text-center text-[10px] text-primary animate-pulse font-sans">
                    🎙️ AI VOICE PATTERN GENERATING...
                  </div>
                  <div className="text-[10px] text-gray-400 leading-snug">
                    "Hi there, this is the assistant for Natton GrowthOS. I noticed you requested an automation plan for {currentInd.name.split(' ')[0]}."
                  </div>
                </div>
              </div>

              {/* n8n Integration Visualizer */}
              <div className={`p-5 rounded-xl border ${
                darkMode ? 'bg-white/[0.01] border-white/[0.06]' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 bg-accent/10 rounded">
                    <Zap className="h-4 w-4 text-accent" />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    GoHighLevel Sync Node
                  </span>
                </div>
                <div className={`p-3 rounded-lg font-mono text-[11px] h-[150px] flex flex-col justify-between ${
                  darkMode ? 'bg-black/40 text-gray-300' : 'bg-gray-900 text-gray-200'
                }`}>
                  <div className="space-y-1">
                    <div className="text-[10px] text-emerald-400">✓ Webhook Auth Token OK</div>
                    <div className="text-[10px] text-[#00C2FF]">✓ Mapping Fields matched: 12</div>
                    <div className="text-[10px] text-gray-500">✓ GHL Contact Tag: "GrowthOS-Qualified"</div>
                  </div>
                  <div className="text-center bg-accent/20 text-accent py-1 rounded text-[10px] font-sans">
                    GoHighLevel Connection Connected
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Bottom Info strip */}
      <div className={`px-6 py-3 border-t text-xs flex justify-between items-center ${
        darkMode ? 'border-white/5 bg-white/[0.01] text-gray-500' : 'border-gray-100 bg-gray-50 text-gray-600'
      }`}>
        <div className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-secondary animate-pulse" />
          <span>Simulated Database Nodes active worldwide</span>
        </div>
        <span className="font-mono text-[10px]">v4.1.2-beta</span>
      </div>
    </div>
  );
}
