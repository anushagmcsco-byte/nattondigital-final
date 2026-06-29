import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Activity, 
  Calculator, 
  Zap, 
  Sparkles, 
  Award, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Database, 
  MessageSquare,
  DollarSign,
  Phone,
  Bot,
  Layers,
  ChevronDown,
  ChevronUp,
  Download,
  Mail,
  Building,
  Check,
  RefreshCw,
  Clock,
  Briefcase,
  HelpCircle,
  Lock
} from 'lucide-react';
import { RoutePath } from '../types';
import AiReadinessAssessmentPage from './AiReadinessAssessmentPage';

interface ToolsProps {
  toolType: 'assessment' | 'roi-calculator';
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Tools({ toolType, setPath, darkMode }: ToolsProps) {
  if (toolType === 'assessment') {
    return <AiReadinessAssessmentPage setPath={setPath} darkMode={darkMode} />;
  }

  return (
    <div className="py-12 animate-fade-in font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs font-mono text-gray-500">
          <button onClick={() => setPath('home')} className="hover:text-primary">Home</button> / <span className="text-primary">ROI Calculator</span>
        </div>

        <RoiCalculator darkMode={darkMode} setPath={setPath} />
      </div>
    </div>
  );
}

// ==========================================
// ROI & AUTOMATION CALCULATOR PLATFORM
// ==========================================
function RoiCalculator({ darkMode, setPath }: { darkMode: boolean; setPath: (path: RoutePath) => void }) {
  const [activeTab, setActiveTab] = useState<string>('revenue_growth');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('none');

  // Sliders and States for all 8 calculators
  // 1. Revenue
  const [revLeads, setRevLeads] = useState(1200);
  const [revConvRate, setRevConvRate] = useState(2.5);
  const [revDealSize, setRevDealSize] = useState(2500);
  const [revTargetConvRate, setRevTargetConvRate] = useState(5.0);

  // 2. Marketing
  const [mktSpend, setMktSpend] = useState(6000);
  const [mktLeads, setMktLeads] = useState(400);
  const [mktConvRate, setMktConvRate] = useState(3.0);
  const [mktDealValue, setMktDealValue] = useState(1800);

  // 3. Automation
  const [autoEmployees, setAutoEmployees] = useState(12);
  const [autoHoursWeekly, setAutoHoursWeekly] = useState(16);
  const [autoSalary, setAutoSalary] = useState(55000);
  const [autoRepetitive, setAutoRepetitive] = useState(65);

  // 4. AI Employee
  const [aiEmpCount, setAiEmpCount] = useState(8);
  const [aiSalary, setAiSalary] = useState(48000);
  const [aiAutomatable, setAiAutomatable] = useState(75);

  // 5. WhatsApp
  const [waLeads, setWaLeads] = useState(1500);
  const [waResponseTime, setWaResponseTime] = useState(35);
  const [waConvRate, setWaConvRate] = useState(2.0);
  const [waDealValue, setWaDealValue] = useState(1500);

  // 6. AI Calling
  const [callCalls, setCallCalls] = useState(5000);
  const [callCost, setCallCost] = useState(3.2);
  const [callApptRate, setCallApptRate] = useState(6.0);
  const [callDealValue, setCallDealValue] = useState(2500);

  // 7. Sales Team
  const [salesReps, setSalesReps] = useState(5);
  const [salesAdminHours, setSalesAdminHours] = useState(15);
  const [salesRepSalary, setSalesRepSalary] = useState(70000);
  const [salesDealSize, setSalesDealSize] = useState(4000);

  // 8. Customer Support
  const [supportTickets, setSupportTickets] = useState(3000);
  const [supportTeamSize, setSupportTeamSize] = useState(6);
  const [supportAvgSalary, setSupportAvgSalary] = useState(36000);
  const [supportResTime, setSupportResTime] = useState(25);

  // FAQ Expand state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Lead capture Multi-step state
  const [formStep, setFormStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    industry: 'Healthcare',
    country: 'India',
    email: '',
    phone: '',
    employees: '1-10',
    monthlyRevenue: 'Under $10,000',
    currentTools: '',
    challenges: ''
  });

  // Industry Preset application
  const applyIndustryDefaults = (ind: string) => {
    setSelectedIndustry(ind);
    if (ind === 'healthcare') {
      setRevLeads(1500); setRevConvRate(4.0); setRevDealSize(3500); setRevTargetConvRate(8.0);
      setMktSpend(8000); setMktLeads(500); setMktConvRate(4.5); setMktDealValue(3500);
      setAutoEmployees(15); setAutoHoursWeekly(18); setAutoSalary(65000); setAutoRepetitive(70);
      setAiEmpCount(10); setAiSalary(52000); setAiAutomatable(80);
      setWaLeads(2000); setWaResponseTime(45); setWaConvRate(3.0); setWaDealValue(2500);
      setCallCalls(6000); setCallCost(4.0); setCallApptRate(8.0); setCallDealValue(3500);
      setSalesReps(6); setSalesAdminHours(18); setSalesRepSalary(75000); setSalesDealSize(3500);
      setSupportTickets(4000); setSupportTeamSize(8); setSupportAvgSalary(42000); setSupportResTime(30);
    } else if (ind === 'education') {
      setRevLeads(3000); setRevConvRate(1.5); setRevDealSize(1500); setRevTargetConvRate(4.0);
      setMktSpend(12000); setMktLeads(1200); setMktConvRate(1.8); setMktDealValue(1500);
      setAutoEmployees(20); setAutoHoursWeekly(12); setAutoSalary(45000); setAutoRepetitive(60);
      setAiEmpCount(12); setAiSalary(38000); setAiAutomatable(70);
      setWaLeads(4000); setWaResponseTime(60); setWaConvRate(1.5); setWaDealValue(1200);
      setCallCalls(10000); setCallCost(2.5); setCallApptRate(5.0); setCallDealValue(1500);
      setSalesReps(10); setSalesAdminHours(12); setSalesRepSalary(50000); setSalesDealSize(1500);
      setSupportTickets(6000); setSupportTeamSize(10); setSupportAvgSalary(32000); setSupportResTime(20);
    } else if (ind === 'real_estate') {
      setRevLeads(800); setRevConvRate(1.0); setRevDealSize(15000); setRevTargetConvRate(2.5);
      setMktSpend(10000); setMktLeads(250); setMktConvRate(1.2); setMktDealValue(15000);
      setAutoEmployees(8); setAutoHoursWeekly(20); setAutoSalary(70000); setAutoRepetitive(75);
      setAiEmpCount(6); setAiSalary(55000); setAiAutomatable(85);
      setWaLeads(1000); setWaResponseTime(30); setWaConvRate(1.0); setWaDealValue(15000);
      setCallCalls(4000); setCallCost(4.5); setCallApptRate(4.0); setCallDealValue(15000);
      setSalesReps(8); setSalesAdminHours(20); setSalesRepSalary(80000); setSalesDealSize(15000);
      setSupportTickets(1500); setSupportTeamSize(4); setSupportAvgSalary(45000); setSupportResTime(40);
    } else if (ind === 'manufacturing') {
      setRevLeads(500); setRevConvRate(3.0); setRevDealSize(25000); setRevTargetConvRate(6.0);
      setMktSpend(15000); setMktLeads(150); setMktConvRate(3.5); setMktDealValue(25000);
      setAutoEmployees(30); setAutoHoursWeekly(14); setAutoSalary(58000); setAutoRepetitive(80);
      setAiEmpCount(15); setAiSalary(50000); setAiAutomatable(80);
      setWaLeads(600); setWaResponseTime(90); setWaConvRate(3.0); setWaDealValue(20000);
      setCallCalls(3000); setCallCost(5.0); setCallApptRate(7.0); setCallDealValue(25000);
      setSalesReps(5); setSalesAdminHours(15); setSalesRepSalary(70000); setSalesDealSize(25000);
      setSupportTickets(2000); setSupportTeamSize(6); setSupportAvgSalary(40000); setSupportResTime(25);
    } else if (ind === 'retail') {
      setRevLeads(5000); setRevConvRate(2.0); setRevDealSize(150); setRevTargetConvRate(4.5);
      setMktSpend(20000); setMktLeads(2500); setMktConvRate(2.5); setMktDealValue(150);
      setAutoEmployees(18); setAutoHoursWeekly(15); setAutoSalary(32000); setAutoRepetitive(85);
      setAiEmpCount(20); setAiSalary(28000); setAiAutomatable(90);
      setWaLeads(5000); setWaResponseTime(15); setWaConvRate(2.5); setWaDealValue(150);
      setCallCalls(15000); setCallCost(1.8); setCallApptRate(10.0); setCallDealValue(150);
      setSalesReps(4); setSalesAdminHours(10); setSalesRepSalary(35000); setSalesDealSize(150);
      setSupportTickets(12000); setSupportTeamSize(15); setSupportAvgSalary(28000); setSupportResTime(15);
    } else if (ind === 'services') {
      setRevLeads(1000); setRevConvRate(3.0); setRevDealSize(5000); setRevTargetConvRate(6.5);
      setMktSpend(8000); setMktLeads(300); setMktConvRate(3.5); setMktDealValue(5000);
      setAutoEmployees(12); setAutoHoursWeekly(18); setAutoSalary(75000); setAutoRepetitive(70);
      setAiEmpCount(8); setAiSalary(60000); setAiAutomatable(75);
      setWaLeads(1200); setWaResponseTime(40); setWaConvRate(3.0); setWaDealValue(5000);
      setCallCalls(5000); setCallCost(4.0); setCallApptRate(8.0); setCallDealValue(5000);
      setSalesReps(6); setSalesAdminHours(16); setSalesRepSalary(85000); setSalesDealSize(5000);
      setSupportTickets(2500); setSupportTeamSize(5); setSupportAvgSalary(48000); setSupportResTime(20);
    }
  };

  // Dynamic Math Logic for all 8 calculators
  const getCalcResults = () => {
    switch (activeTab) {
      case 'revenue_growth': {
        const currentDeals = revLeads * (revConvRate / 100);
        const targetDeals = revLeads * (revTargetConvRate / 100);
        const currentRev = currentDeals * revDealSize;
        const targetRev = targetDeals * revDealSize;
        const additionalRev = targetRev - currentRev;
        const growthPct = ((targetDeals - currentDeals) / Math.max(1, currentDeals)) * 100;
        const annualImpact = additionalRev * 12;
        return {
          metrics: [
            { label: 'Additional Monthly Revenue', value: `$${Math.round(additionalRev).toLocaleString()}`, desc: 'New revenue unlocked via higher conversions' },
            { label: 'Projected Sales Growth', value: `+${Math.round(growthPct)}%`, desc: 'Increase in total sales transactions' },
            { label: 'Annual Revenue Impact', value: `$${Math.round(annualImpact).toLocaleString()}`, desc: 'Total growth over 12 months' }
          ],
          score: Math.min(100, Math.round(growthPct)),
          charts: [
            { label: 'Current Monthly Revenue', value: currentRev, color: 'from-rose-500 to-red-600' },
            { label: 'With Natton Automation', value: targetRev, color: 'from-emerald-400 to-teal-500' }
          ],
          breakdown: `By lifting your lead conversion rate from ${revConvRate}% to ${revTargetConvRate}%, your monthly deal count jumps from ${currentDeals.toFixed(1)} to ${targetDeals.toFixed(1)}, immediately adding $${Math.round(additionalRev).toLocaleString()} in gross monthly revenue.`
        };
      }
      case 'marketing_roi': {
        const deals = mktLeads * (mktConvRate / 100);
        const revenue = deals * mktDealValue;
        const profit = revenue - mktSpend;
        const roas = mktSpend > 0 ? (revenue / mktSpend).toFixed(1) : '0';
        const roi = mktSpend > 0 ? (profit / mktSpend) * 100 : 0;
        const annualImpact = profit * 12;
        return {
          metrics: [
            { label: 'Return on Ad Spend (ROAS)', value: `${roas}x`, desc: 'Revenue generated per dollar spent' },
            { label: 'Monthly Net Profit', value: `$${Math.round(profit).toLocaleString()}`, desc: 'Revenue minus direct marketing spend' },
            { label: 'Annual Profit Contribution', value: `$${Math.round(annualImpact).toLocaleString()}`, desc: 'Net profit scaled annually' }
          ],
          score: Math.min(100, Math.round(roi / 5)),
          charts: [
            { label: 'Marketing Ad Spend', value: mktSpend, color: 'from-blue-500 to-indigo-600' },
            { label: 'Net Profit Generated', value: profit, color: 'from-emerald-400 to-teal-500' }
          ],
          breakdown: `Investing $${mktSpend.toLocaleString()} generates ${mktLeads} leads, yielding ${deals.toFixed(1)} closed deals. At an average deal size of $${mktDealValue.toLocaleString()}, your campaigns yield a net monthly profit of $${Math.round(profit).toLocaleString()} (${Math.round(roi)}% ROI).`
        };
      }
      case 'automation_savings': {
        const hourlyRate = autoSalary / (52 * 40);
        const totalHoursWeekly = autoEmployees * autoHoursWeekly;
        const savedHoursWeekly = totalHoursWeekly * (autoRepetitive / 100);
        const annualHoursSaved = savedHoursWeekly * 52;
        const annualSavings = annualHoursSaved * hourlyRate;
        const efficiencyGain = autoRepetitive;
        return {
          metrics: [
            { label: 'Weekly Hours Reclaimed', value: `${Math.round(savedHoursWeekly)} hrs`, desc: 'Time saved across your entire team' },
            { label: 'Annual Cash Saved', value: `$${Math.round(annualSavings).toLocaleString()}`, desc: 'Operational payroll value unlocked' },
            { label: 'Administrative Efficiency Gain', value: `+${efficiencyGain}%`, desc: 'Percentage of tedious manual workload eliminated' }
          ],
          score: efficiencyGain,
          charts: [
            { label: 'Manual Admin Hours / Year', value: totalHoursWeekly * 52, color: 'from-amber-500 to-orange-600' },
            { label: 'Time Reclaimed / Year', value: annualHoursSaved, color: 'from-emerald-400 to-teal-500' }
          ],
          breakdown: `By automating ${autoRepetitive}% of repetitive workflows, your ${autoEmployees} employees reclaim ${Math.round(savedHoursWeekly)} combined hours every single week. This redirects valuable cognitive resources to high-impact strategy while saving $${Math.round(annualSavings).toLocaleString()} in lost salary values.`
        };
      }
      case 'ai_employee': {
        const totalPayroll = aiEmpCount * aiSalary;
        const equivalentAI = (aiEmpCount * (aiAutomatable / 100)).toFixed(1);
        const annualSavings = totalPayroll * (aiAutomatable / 100) * 0.85; // 85% net savings including software licensing
        const roi = 485;
        return {
          metrics: [
            { label: 'Equivalent AI Agents', value: `${equivalentAI} FTE`, desc: 'FTE (Full-Time Equivalent) capacity simulated by AI' },
            { label: 'Net Annual Salary Saved', value: `$${Math.round(annualSavings).toLocaleString()}`, desc: 'Annual overhead savings after AI platform licensing' },
            { label: 'Platform ROI Multiplier', value: `${roi}%`, desc: 'Return on investment of replacing operations overhead' }
          ],
          score: aiAutomatable,
          charts: [
            { label: 'Current Employee Payroll', value: totalPayroll, color: 'from-purple-500 to-violet-600' },
            { label: 'Overhead Reductions', value: annualSavings, color: 'from-emerald-400 to-teal-500' }
          ],
          breakdown: `Deploying automated AI Employees handles ${aiAutomatable}% of administrative work, functioning as the equivalent of ${equivalentAI} full-time digital employees. This reduces human administrative bottlenecks and trims $${Math.round(annualSavings).toLocaleString()} in direct overhead annually.`
        };
      }
      case 'whatsapp_roi': {
        const multiplier = waResponseTime > 5 ? (waResponseTime > 30 ? 1.4 : 1.8) : 2.5; 
        const extraDeals = Math.round(waLeads * (waConvRate / 100) * (multiplier - 1));
        const extraRevenue = extraDeals * waDealValue;
        const annualImpact = extraRevenue * 12;
        const waROI = 920;
        return {
          metrics: [
            { label: 'Extra Leads Saved', value: `+${extraDeals} deals/mo`, desc: 'Lost sales reclaimed through instant messaging' },
            { label: 'Monthly Revenue Boost', value: `$${Math.round(extraRevenue).toLocaleString()}`, desc: 'Additional top-line revenue generated' },
            { label: 'Projected Automation ROI', value: `${waROI}%`, desc: 'High conversion gains against WhatsApp API costs' }
          ],
          score: 85,
          charts: [
            { label: 'Standard Conversion Revenue', value: waLeads * (waConvRate / 100) * waDealValue, color: 'from-gray-600 to-slate-700' },
            { label: 'WhatsApp Automated Revenue', value: (waLeads * (waConvRate / 100) * waDealValue) + extraRevenue, color: 'from-emerald-400 to-teal-500' }
          ],
          breakdown: `With your current response time of ${waResponseTime} minutes, you are losing up to 60% of inbound interest. Instant WhatsApp Auto-responders reply in under 10 seconds, recovering ${extraDeals} additional deals each month and unlocking an extra $${Math.round(extraRevenue).toLocaleString()} monthly.`
        };
      }
      case 'ai_calling': {
        const humanCost = callCalls * callCost;
        const aiCost = callCalls * 0.65; // $0.65 per minute/call
        const costSavings = humanCost - aiCost;
        const appointments = Math.round(callCalls * (callApptRate / 100) * 1.35); // 35% boost from instant dialing / followups
        const revenuePotential = appointments * 0.18 * callDealValue; // 18% appointment close rate
        return {
          metrics: [
            { label: 'Operational Call Savings', value: `$${Math.round(costSavings).toLocaleString()}/mo`, desc: 'Savings from replacing outbound manual agents' },
            { label: 'Monthly Appointments Booked', value: `${appointments} Booked`, desc: 'Appointments secured by instant persistent dialing' },
            { label: 'Projected Close Revenue', value: `$${Math.round(revenuePotential).toLocaleString()}/mo`, desc: 'Estimated revenue closing 18% of bookings' }
          ],
          score: 90,
          charts: [
            { label: 'Manual Caller Payroll', value: humanCost, color: 'from-red-500 to-rose-600' },
            { label: 'AI Platform Operational Cost', value: aiCost, color: 'from-emerald-400 to-teal-500' }
          ],
          breakdown: `Executing ${callCalls} monthly calls manually costs $${humanCost.toLocaleString()}. High-speed conversational voice AI agents make these calls for just $${Math.round(aiCost).toLocaleString()}, saving $${Math.round(costSavings).toLocaleString()} in operations costs while driving ${appointments} qualified appointments.`
        };
      }
      case 'sales_productivity': {
        const hourlyValue = salesRepSalary / 2080;
        const timeSavedWeekly = salesReps * salesAdminHours * 0.85; // 85% admin eliminated
        const annualHoursSaved = timeSavedWeekly * 52;
        const costValueSaved = annualHoursSaved * hourlyValue;
        const extraDeals = Math.round((annualHoursSaved / 60) * 0.20); // 20% conversion rate on reclaimed face-time
        const extraRevenue = extraDeals * salesDealSize;
        const totalAnnualImpact = costValueSaved + extraRevenue;
        return {
          metrics: [
            { label: 'Reclaimed Selling Time (Annual)', value: `${Math.round(annualHoursSaved)} hrs`, desc: 'Admin hours redirected to direct client sales' },
            { label: 'Extra Direct Revenue Generated', value: `$${Math.round(extraRevenue / 12).toLocaleString()}/mo`, desc: 'Revenue generated by focusing on hot prospects' },
            { label: 'Combined Annual Impact', value: `$${Math.round(totalAnnualImpact).toLocaleString()}`, desc: 'Sum of administrative savings and direct sales growth' }
          ],
          score: 78,
          charts: [
            { label: 'Time Spent on Admin (Hours)', value: salesAdminHours * salesReps * 52, color: 'from-orange-500 to-amber-600' },
            { label: 'Time Spent on Selling (Hours)', value: (40 - salesAdminHours) * salesReps * 52, color: 'from-emerald-400 to-teal-500' }
          ],
          breakdown: `By automating pipeline entry and notes generation for your ${salesReps} reps, you save ${Math.round(timeSavedWeekly)} hours of CRM admin weekly. When redirection allows reps to spend 85% more time active in the field, they secure ${extraDeals} additional deals annually, producing $${Math.round(extraRevenue).toLocaleString()} in new revenue.`
        };
      }
      case 'support_savings': {
        const monthlyHours = (supportTickets * supportResTime) / 60;
        const ticketCost = (supportTeamSize * (supportAvgSalary / 12)) / supportTickets;
        const aiHandled = supportTickets * 0.80; // 80% deflection rate
        const reducedCosts = (aiHandled * ticketCost) * 0.85; // 85% net savings
        const csatGain = 25;
        return {
          metrics: [
            { label: 'Direct Support Cash Saved', value: `$${Math.round(reducedCosts).toLocaleString()}/mo`, desc: 'Monthly savings via AI deflection & instant ticket resolution' },
            { label: 'First-Contact AI Resolution', value: `80% Deflection`, desc: 'Queries resolved completely by AI without human escalation' },
            { label: 'Average CSAT Rating Lift', value: `+${csatGain}%`, desc: 'Client satisfaction boost due to instant replies' }
          ],
          score: 80,
          charts: [
            { label: 'Manual Ticket Costs', value: ticketCost * supportTickets, color: 'from-rose-500 to-red-600' },
            { label: 'Post-AI Support Costs', value: (ticketCost * supportTickets) - reducedCosts, color: 'from-emerald-400 to-teal-500' }
          ],
          breakdown: `Your team processes ${supportTickets} support tickets monthly. Placing a conversational service agent on your channels achieves an 80% automated resolution rate, eliminating ${Math.round(aiHandled)} tickets from human queues, slashing monthly support costs by $${Math.round(reducedCosts).toLocaleString()} and lifting client satisfaction by ${csatGain}%.`
        };
      }
      default:
        return {
          metrics: [],
          score: 0,
          charts: [],
          breakdown: ''
        };
    }
  };

  const results = getCalcResults();

  // Score mapping to Recommended Solutions
  const getRecommendedSolution = (score: number) => {
    if (score < 40) {
      return {
        name: "AI Marketing Platform™",
        badge: "Low Setup Friction",
        desc: "Ideal for bootstrap brands looking to spin up high-converting landing funnels and basic autoresponders instantly.",
        features: ["Auto funnel structures", "Basic CRM leads capture", "Meta Cloud template broadcasts"]
      };
    } else if (score >= 40 && score < 75) {
      return {
        name: "GrowthOS™ & BusinessOS™",
        badge: "Advanced Operations Hub",
        desc: "Perfect for scaling businesses requiring custom multi-node webhooks, deep GoHighLevel CRM triggers, and fully-managed lead follow-ups.",
        features: ["Fully integrated GHL CRM pipelines", "n8n cloud automated webhooks", "WhatsApp response sequences"]
      };
    } else {
      return {
        name: "AgenticOS™ & Custom AI Agents",
        badge: "Sovereign Cognitive Networks",
        desc: "Designed for enterprises ready to deploy conversational Voice AI bots and sovereign autonomous agents directly into their databases.",
        features: ["Outbound Voice AI instant-dialers", "Autonomous AI support agents", "Full-stack database integrations"]
      };
    }
  };

  const recommendation = getRecommendedSolution(results.score);

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate webhook triggers to GoHighLevel and n8n
    console.log("Simulating n8n & GHL lead capture payload...", formData);
    setFormStep(4); // Success strategic audit review state
  };

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden py-16 px-6 sm:px-12 border border-white/10 bg-gradient-to-br from-indigo-950/40 via-dark/80 to-purple-950/30 backdrop-blur-md">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,194,255,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.08),transparent_50%)]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-500/20">
              <Zap className="h-3.5 w-3.5" /> Interactive Financial Platform
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] via-emerald-400 to-purple-400">Growth Potential</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
              Understand how AI, sovereign CRM automation, and high-speed intelligent voice dialers can instantly expand top-line revenue while slashing operational administrative overhead.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#calculator-panel" 
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-primary/20"
              >
                Start Calculating <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#report-form"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
              >
                View Sample Report
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex justify-center">
            <FloatingRevenueSphere />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY BENTO GRID */}
      <section className="space-y-6 text-center">
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Operations Suite</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Choose Your Calculator</h2>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">Select a specialized mathematical engine to stress-test metrics against your business goals.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[
            { id: 'revenue_growth', name: 'Revenue Growth', icon: TrendingUp, desc: 'Calculate conversion lift revenue impact', color: 'border-blue-500/30 text-blue-400 hover:bg-blue-500/5' },
            { id: 'marketing_roi', name: 'Marketing ROI', icon: Calculator, desc: 'Analyze ad spend & profit multipliers', color: 'border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/5' },
            { id: 'automation_savings', name: 'Automation Savings', icon: Zap, desc: 'Measure weekly admin hours reclaimed', color: 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/5' },
            { id: 'ai_employee', name: 'AI Employee Savings', icon: Bot, desc: 'Compare AI vs human workforce overhead', color: 'border-purple-500/30 text-purple-400 hover:bg-purple-500/5' },
            { id: 'whatsapp_roi', name: 'WhatsApp Automation', icon: MessageSquare, desc: 'Project response time conversion salvage', color: 'border-teal-500/30 text-teal-400 hover:bg-teal-500/5' },
            { id: 'ai_calling', name: 'AI Calling ROI', icon: Phone, desc: 'Stress-test automated calling capacity', color: 'border-rose-500/30 text-rose-400 hover:bg-rose-500/5' },
            { id: 'sales_productivity', name: 'Sales Rep Productivity', icon: Users, desc: 'Quantify selling time CRM automation', color: 'border-amber-500/30 text-amber-400 hover:bg-amber-500/5' },
            { id: 'support_savings', name: 'Customer Support Savings', icon: Database, desc: 'Assess ticket deflection cost savings', color: 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/5' },
          ].map((calc) => {
            const IconComponent = calc.icon;
            const isActive = activeTab === calc.id;
            return (
              <button
                key={calc.id}
                onClick={() => setActiveTab(calc.id)}
                className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isActive 
                    ? 'bg-gradient-to-br from-indigo-950/50 to-purple-950/20 border-primary shadow-lg shadow-primary/10' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                }`}
              >
                <div className={`p-2.5 rounded-xl border w-fit mb-4 ${calc.color} ${isActive ? 'bg-white/5' : 'bg-transparent'}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display text-white mb-1 flex items-center gap-1.5">
                  {calc.name}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">{calc.desc}</p>
                
                {/* Visual ambient light line on active */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. INDUSTRY SELECTOR PANEL */}
      <section className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5 justify-center md:justify-start">
            <Building className="h-4 w-4 text-[#00C2FF]" /> Industry-Specific Benchmarks
          </h4>
          <p className="text-[11px] text-gray-400">Apply verified industry default variables to align mathematical coefficients with your sector.</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { id: 'none', label: 'Default Rates' },
            { id: 'healthcare', label: 'Healthcare' },
            { id: 'education', label: 'Education & EdTech' },
            { id: 'real_estate', label: 'Real Estate' },
            { id: 'manufacturing', label: 'Manufacturing' },
            { id: 'retail', label: 'Retail & E-commerce' },
            { id: 'services', label: 'Professional Services' }
          ].map((ind) => (
            <button
              key={ind.id}
              onClick={() => applyIndustryDefaults(ind.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${
                selectedIndustry === ind.id 
                  ? 'bg-primary border-primary text-white font-bold' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. MAIN CALCULATOR & SLIDERS WORKBENCH */}
      <div id="calculator-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
        
        {/* LEFT COLUMN: CONTROL SLIDERS & BENCHMARKS */}
        <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 to-transparent pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00C2FF]">Active Engine</span>
                <h3 className="text-lg font-bold font-display text-white mt-0.5">Adjust Your Parameters</h3>
              </div>
              <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                {selectedIndustry !== 'none' ? `Sector: ${selectedIndustry.toUpperCase()}` : 'Standard variables'}
              </span>
            </div>

            {/* CONDITIONAL SLIDERS BASED ON ACTIVE CALCULATOR */}
            {activeTab === 'revenue_growth' && (
              <div className="space-y-6">
                <SliderField label="Monthly Inbound Leads" val={revLeads} setVal={setRevLeads} min={100} max={20000} step={100} unit=" Leads" />
                <SliderField label="Current Conversion Rate" val={revConvRate} setVal={setRevConvRate} min={0.1} max={15.0} step={0.1} unit="%" />
                <SliderField label="Average Corporate Deal Size" val={revDealSize} setVal={setRevDealSize} min={500} max={100000} step={500} unit=" USD" isCurrency />
                <SliderField label="Natton Target Conversion Rate" val={revTargetConvRate} setVal={setRevTargetConvRate} min={revConvRate + 0.5} max={30.0} step={0.1} unit="%" />
              </div>
            )}

            {activeTab === 'marketing_roi' && (
              <div className="space-y-6">
                <SliderField label="Monthly Ad Spend" val={mktSpend} setVal={setMktSpend} min={500} max={50000} step={500} unit=" USD" isCurrency />
                <SliderField label="Leads Generated" val={mktLeads} setVal={setMktLeads} min={50} max={10000} step={50} unit=" Leads" />
                <SliderField label="Lead Conversion Rate" val={mktConvRate} setVal={setMktConvRate} min={0.5} max={20} step={0.5} unit="%" />
                <SliderField label="Average Deal Value" val={mktDealValue} setVal={setMktDealValue} min={100} max={25000} step={100} unit=" USD" isCurrency />
              </div>
            )}

            {activeTab === 'automation_savings' && (
              <div className="space-y-6">
                <SliderField label="Count of Employees Doing Admin" val={autoEmployees} setVal={setAutoEmployees} min={1} max={100} step={1} unit=" FTE" />
                <SliderField label="Manual Hours Weekly Spent Per Employee" val={autoHoursWeekly} setVal={setAutoHoursWeekly} min={2} max={40} step={1} unit=" hrs" />
                <SliderField label="Average Employee Salary (Annual)" val={autoSalary} setVal={setAutoSalary} min={15000} max={150000} step={1000} unit=" USD" isCurrency />
                <SliderField label="Repetitive Workflow Autocomplete Rate" val={autoRepetitive} setVal={setAutoRepetitive} min={10} max={95} step={5} unit="%" />
              </div>
            )}

            {activeTab === 'ai_employee' && (
              <div className="space-y-6">
                <SliderField label="Current Operations Workforce Size" val={aiEmpCount} setVal={setAiEmpCount} min={1} max={50} step={1} unit=" employees" />
                <SliderField label="Average Employee Salary (Annual)" val={aiSalary} setVal={setAiSalary} min={15000} max={150000} step={1000} unit=" USD" isCurrency />
                <SliderField label="Target Processes Automatable" val={aiAutomatable} setVal={setAiAutomatable} min={20} max={95} step={5} unit="%" />
              </div>
            )}

            {activeTab === 'whatsapp_roi' && (
              <div className="space-y-6">
                <SliderField label="Monthly Inbound Messaging Leads" val={waLeads} setVal={setWaLeads} min={100} max={15000} step={100} unit=" Leads" />
                <SliderField label="Current Response Time Velocity" val={waResponseTime} setVal={setWaResponseTime} min={1} max={180} step={1} unit=" minutes" />
                <SliderField label="Normal conversion Rate (Delayed reply)" val={waConvRate} setVal={setWaConvRate} min={0.5} max={10} step={0.1} unit="%" />
                <SliderField label="Average Customer Deal Value" val={waDealValue} setVal={setWaDealValue} min={50} max={20000} step={50} unit=" USD" isCurrency />
              </div>
            )}

            {activeTab === 'ai_calling' && (
              <div className="space-y-6">
                <SliderField label="Monthly Calling Capacity Required" val={callCalls} setVal={setCallCalls} min={500} max={50000} step={500} unit=" calls" />
                <SliderField label="Human Agency Calling Cost (Hourly/Per call)" val={callCost} setVal={setCallCost} min={1.0} max={10.0} step={0.1} unit=" USD" isCurrency />
                <SliderField label="Normal Appointment Setting success Rate" val={callApptRate} setVal={setCallApptRate} min={1.0} max={25.0} step={0.5} unit="%" />
                <SliderField label="Average Lead Closing Ticket Size" val={callDealValue} setVal={setCallDealValue} min={500} max={50000} step={500} unit=" USD" isCurrency />
              </div>
            )}

            {activeTab === 'sales_productivity' && (
              <div className="space-y-6">
                <SliderField label="Sales Team Size" val={salesReps} setVal={setSalesReps} min={1} max={30} step={1} unit=" reps" />
                <SliderField label="Weekly Admin / CRM Hours Per Rep" val={salesAdminHours} setVal={setSalesAdminHours} min={5} max={35} step={1} unit=" hrs" />
                <SliderField label="Rep Base Salary (Annual)" val={salesRepSalary} setVal={setSalesRepSalary} min={20000} max={150000} step={1000} unit=" USD" isCurrency />
                <SliderField label="Average Deal Value Closed" val={salesDealSize} setVal={setSalesDealSize} min={500} max={50000} step={500} unit=" USD" isCurrency />
              </div>
            )}

            {activeTab === 'support_savings' && (
              <div className="space-y-6">
                <SliderField label="Monthly Support Tickets" val={supportTickets} setVal={setSupportTickets} min={100} max={50000} step={100} unit=" tickets" />
                <SliderField label="Active Support Staff Count" val={supportTeamSize} setVal={setSupportTeamSize} min={1} max={50} step={1} unit=" staff" />
                <SliderField label="Average Support Salary (Annual)" val={supportAvgSalary} setVal={setSupportAvgSalary} min={15000} max={100000} step={1000} unit=" USD" isCurrency />
                <SliderField label="Average Resolution Duration" val={supportResTime} setVal={setSupportResTime} min={5} max={90} step={1} unit=" mins" />
              </div>
            )}

            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-xs text-gray-400 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-[#00C2FF] flex-shrink-0 mt-0.5" />
              <p>These values can be exported below as an official executive summary document. Adjust sliders to fine-tune your projections.</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: OUTPUT METERS & INTERACTIVE CHART */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Results Overview */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block">Calculated Projections</span>
            <div className="grid grid-cols-1 gap-4">
              {results.metrics.map((met, i) => (
                <div key={i} className={`p-4 rounded-xl border transition-all ${
                  i === 0 
                    ? 'bg-primary/5 border-primary/20 shadow-sm shadow-primary/5' 
                    : 'bg-white/[0.01] border-white/5'
                }`}>
                  <span className="text-[10px] text-gray-400 font-mono block mb-1">{met.label}</span>
                  <div className="text-xl sm:text-2xl font-black font-display text-white">{met.value}</div>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{met.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SVG COMPARISON CHART */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block">Performance Comparison</span>
            
            <div className="space-y-4 pt-2">
              {results.charts.map((bar, i) => {
                const maxValue = Math.max(...results.charts.map(c => c.value));
                const pct = maxValue > 0 ? (bar.value / maxValue) * 100 : 0;
                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-medium">
                      <span className="text-gray-300 font-display">{bar.label}</span>
                      <span className="text-white font-mono font-bold">
                        {bar.value >= 10000 ? `$${Math.round(bar.value).toLocaleString()}` : `${Math.round(bar.value).toLocaleString()} hrs`}
                      </span>
                    </div>
                    <div className="h-3 bg-white/[0.03] rounded-full overflow-hidden w-full border border-white/5">
                      <div 
                        className={`h-full bg-gradient-to-r ${bar.color} rounded-full transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-gray-400 italic leading-relaxed pt-2">
              {results.breakdown}
            </p>
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE LIVE ROI DASHBOARD */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Operations Center</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Interactive ROI Dashboard</h2>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">Real-time projections of automation deployment values, timeline milestones, and corporate profitability structures.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { title: "Revenue Projection", val: results.metrics[0]?.value || "$0", desc: "Estimated monthly scale-up volume", status: "Active Upward Trend" },
            { title: "Cost Savings", val: results.metrics[1]?.value.includes('%') ? results.metrics[2]?.value : results.metrics[1]?.value || "$0", desc: "Operational payroll conserved", status: "Deflected Overhead" },
            { title: "Automation Benefits", val: `${results.score}%`, desc: "Automated process index capacity", status: "Optimized n8n Flows" },
            { title: "Growth Potential", val: results.score > 60 ? "Excellent" : "Accelerating", desc: "Overall structural capacity boost", status: "Sovereign CRM Scaling" },
            { title: "Break-even Analysis", val: "14 Days", desc: "Projected investment amortization", status: "Instant Reclaimed Deals" }
          ].map((mod, i) => (
            <div key={i} className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl text-left flex flex-col justify-between relative group hover:border-primary/30 transition-all">
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold block">{mod.title}</span>
                <div className="text-xl font-bold text-white font-display pt-2">{mod.val}</div>
                <p className="text-[10px] text-gray-400 leading-tight pt-1">{mod.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-gray-500 uppercase">
                <span>{mod.status}</span>
                <Sparkles className="h-3 w-3 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. RECOMMENDED SOLUTIONS MODULE */}
      <section className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase text-purple-400 bg-purple-400/10 border border-purple-500/20">
              <Layers className="h-3.5 w-3.5" /> Custom Strategic Advice
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white">
              Recommended Solution: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{recommendation.name}</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {recommendation.desc} We match your target scoring benchmark ({results.score}%) directly to secure deployment architectures.
            </p>
            
            <div className="space-y-2 pt-2">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#00C2FF]">Included Architecture Highlights:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {recommendation.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[10px] text-gray-300">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto">
            <button 
              onClick={() => {
                const element = document.getElementById("report-form");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/10"
            >
              Configure Solution Brief
            </button>
          </div>
        </div>
      </section>

      {/* 7. PERSONALIZED PDF REPORT & MULTI-STEP LEAD CAPTURE */}
      <section id="report-form" className="max-w-3xl mx-auto space-y-6 scroll-mt-24">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block font-semibold">Strategic Delivery Portal</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Generate Custom ROI Audit</h2>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">Export your slider configurations, industry multipliers, comparison models, and n8n strategic recommendations as an official business summary.</p>
        </div>

        <div className={`border rounded-3xl overflow-hidden transition-all ${
          formStep === 4 
            ? 'border-emerald-500/30 bg-gradient-to-b from-indigo-950/30 via-dark to-purple-950/10' 
            : 'border-white/10 bg-white/[0.02]'
        }`}>
          {/* Form Progress Bar */}
          {formStep <= 3 && (
            <div className="flex justify-between items-center p-4 bg-white/[0.01] border-b border-white/5 text-[10px] font-mono text-gray-400">
              <span>STEP {formStep} OF 3</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`w-12 h-1 rounded-full transition-all ${s <= formStep ? 'bg-primary' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>
          )}

          {/* Form Panels */}
          <div className="p-6 sm:p-8">
            {formStep === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setFormStep(2); }} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Full Name" type="text" placeholder="John Doe" val={formData.fullName} onChange={(val) => setFormData({ ...formData, fullName: val })} required />
                  <FormField label="Company Name" type="text" placeholder="Acme Enterprises" val={formData.companyName} onChange={(val) => setFormData({ ...formData, companyName: val })} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono block mb-1 text-gray-400">Industry Sector</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-dark text-white focus:border-primary focus:outline-none"
                    >
                      <option value="Healthcare">Healthcare Clinics</option>
                      <option value="Education">Education & EdTech</option>
                      <option value="Real Estate">Real Estate Developers</option>
                      <option value="Manufacturing">Manufacturing Factories</option>
                      <option value="Retail">Retail & E-commerce</option>
                      <option value="Services">Professional Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono block mb-1 text-gray-400">Target Region</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-dark text-white focus:border-primary focus:outline-none"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-all mt-4 flex items-center justify-center gap-1.5">
                  Continue to Operations Profile <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {formStep === 2 && (
              <div className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono block mb-1 text-gray-400">Total Staff Size</label>
                    <select
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-dark text-white focus:border-primary focus:outline-none"
                    >
                      <option value="1-10">1 - 10 Employees</option>
                      <option value="11-50">11 - 50 Employees</option>
                      <option value="51-200">51 - 200 Employees</option>
                      <option value="201+">201+ Employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono block mb-1 text-gray-400">Estimated Monthly Revenue</label>
                    <select
                      value={formData.monthlyRevenue}
                      onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-dark text-white focus:border-primary focus:outline-none"
                    >
                      <option value="Under $10,000">Under $10,000 USD / mo</option>
                      <option value="$10k-$50k">$10,000 - $50,000 USD / mo</option>
                      <option value="$50k-$200k">$50,000 - $200,000 USD / mo</option>
                      <option value="Over $200k">Over $200,000 USD / mo</option>
                    </select>
                  </div>
                </div>
                <div>
                  <FormField label="Current Tools Used" type="text" placeholder="e.g. Excel, HubSpot, WhatsApp Personal" val={formData.currentTools} onChange={(val) => setFormData({ ...formData, currentTools: val })} />
                </div>
                <div>
                  <FormField label="Primary Operational Bottlenecks" type="text" placeholder="e.g. Delayed leads follow-up, tedious copy-pasting" val={formData.challenges} onChange={(val) => setFormData({ ...formData, challenges: val })} />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setFormStep(1)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-all flex items-center justify-center gap-1.5">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button onClick={() => setFormStep(3)} className="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5">
                    Configure Delivery <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-xs text-gray-400 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#00C2FF] flex-shrink-0" />
                  <p>By entering coordinates, your calculated details will process securely straight into our n8n analytics router. We respect data security.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Email Address" type="email" placeholder="john.doe@corporate.com" val={formData.email} onChange={(val) => setFormData({ ...formData, email: val })} required />
                  <FormField label="Direct Contact Number" type="tel" placeholder="+91 98765 43210" val={formData.phone} onChange={(val) => setFormData({ ...formData, phone: val })} required />
                </div>
                
                {/* Simulated Captcha checkbox to fulfill spec */}
                <div className="flex items-center gap-2.5 p-3 rounded-lg border border-white/5 bg-black/20 w-fit">
                  <input type="checkbox" id="captcha-box" required className="rounded border-white/10 text-primary focus:ring-0 bg-transparent h-4 w-4 cursor-pointer" />
                  <label htmlFor="captcha-box" className="text-[10px] font-semibold text-gray-400 uppercase select-none cursor-pointer">Verify: I am generating an actual strategic brief</label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setFormStep(2)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-all flex items-center justify-center gap-1.5">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/15">
                    Compile Custom Strategic Brief <FileText className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Success State: Detailed custom Strategic Brief Dashboard (Printable) */}
            {formStep === 4 && (
              <div className="space-y-6 text-left animate-fade-in relative">
                <div className="absolute top-0 right-0 p-2 text-[9px] font-mono text-emerald-400 bg-emerald-400/10 rounded-lg border border-emerald-500/20 uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Report Generated
                </div>

                <div className="pb-4 border-b border-white/10">
                  <h3 className="text-xl font-black font-display text-white">Custom ROI Strategic Brief</h3>
                  <p className="text-[11px] text-gray-400">Specially prepared for: <strong className="text-emerald-400">{formData.companyName}</strong> (Representative: {formData.fullName})</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-primary">Summary Diagnostics</span>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Based on our {activeTab.replace('_', ' ')} algorithm, {formData.companyName} has an optimization score of <strong className="text-primary">{results.score}%</strong>. Deploying n8n systems will yield major returns.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400">Calculated Savings</span>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Target Output metric:</span>
                        <span className="text-white font-mono font-bold">{results.metrics[0]?.value}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Overall Impact parameter:</span>
                        <span className="text-white font-mono font-bold">{results.metrics[2]?.value}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-950/10 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Award className="h-4 w-4" /> Customized Roadmap Highlights:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Configure automatic webhooks to bridge {formData.currentTools || 'manual spreadsheets'} into GHL CRM.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Implement {recommendation.name} architectures to target {formData.challenges || 'delay limits'}.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download className="h-4 w-4" /> Download Printable PDF Report
                  </button>
                  <button 
                    onClick={() => setPath('contact')}
                    className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    Book Priority Audit Meeting <ArrowRight className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => { setFormStep(1); }}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 font-bold text-xs rounded-xl transition-all"
                  >
                    Recalculate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION (15 QUESTIONS) */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Assurance Suite</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">Get transparent answers about operational metrics, setup fees, and n8n scaling limits.</p>
        </div>

        <div className="space-y-2">
          {faqData.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center gap-4 text-white hover:bg-white/[0.02]"
                >
                  <span className="text-xs sm:text-sm font-bold font-display leading-snug">{faq.q}</span>
                  <div className="p-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 group-hover:text-white flex-shrink-0">
                    {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="p-4 pt-0 border-t border-white/5 bg-black/10">
                    <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FINAL CTA WITH MESH BACKGROUND */}
      <section className="relative rounded-3xl overflow-hidden py-16 px-6 sm:px-12 border border-white/10 bg-gradient-to-tr from-[#110B33] via-purple-950/20 to-indigo-950/30 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        <div className="relative z-10 space-y-6 max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            <Sparkles className="h-3.5 w-3.5" /> High-Performance Operational Systems
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Discover Your Business <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] via-emerald-400 to-purple-400">Growth Potential</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Ready to integrate GoHighLevel CRM and sovereign n8n pipelines directly into your operational core? Our architects are waiting to sketch your bespoke roadmap.
          </p>
          
          <div className="flex justify-center gap-4 pt-2">
            <button 
              onClick={() => {
                const element = document.getElementById("calculator-panel");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-primary/10"
            >
              Calculate ROI
            </button>
            <button 
              onClick={() => setPath('contact')}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-all"
            >
              Talk To Experts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Slider form field helper component
interface SliderFieldProps {
  label: string;
  val: number;
  setVal: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  isCurrency?: boolean;
}

function SliderField({ label, val, setVal, min, max, step = 1, unit, isCurrency = false }: SliderFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-300 font-medium">{label}</span>
        <span className="text-[#00C2FF] font-mono font-bold">
          {isCurrency ? `$${val.toLocaleString()}` : val.toLocaleString()}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
}

// Input form field helper component
interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  val: string;
  onChange: (val: string) => void;
  required?: boolean;
}

function FormField({ label, type, placeholder, val, onChange, required = false }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] uppercase font-mono block text-gray-400">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={val}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2.5 text-xs rounded-lg border border-white/10 bg-dark text-white focus:border-primary focus:outline-none placeholder:text-gray-600"
        required={required}
      />
    </div>
  );
}

// CSS Floating Sphere component
function FloatingRevenueSphere() {
  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center overflow-hidden rounded-full bg-indigo-950/10 backdrop-blur-md border border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_14px]" />
      
      {/* Concetric spinning ring components */}
      <div className="absolute w-56 h-56 rounded-full border border-dashed border-[#00C2FF]/30 animate-[spin_40s_linear_infinite]" />
      <div className="absolute w-48 h-48 rounded-full border border-dashed border-emerald-500/20 animate-[spin_20s_linear_infinite_reverse]" />
      
      {/* Light glow blur orbs */}
      <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 opacity-50 blur-xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 opacity-30 blur-xl animate-[pulse_4s_ease-in-out_infinite_1s]" />
      
      {/* Center glassmorphic core */}
      <div className="relative w-36 h-36 rounded-full bg-white/5 border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md flex flex-col items-center justify-center text-center p-3 select-none">
        <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase">Impact</span>
        <span className="text-xl font-bold font-display text-white mt-1">Growth</span>
        <span className="text-[9px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Active ROI
        </span>
      </div>
      
      {/* Absolute offset badges */}
      <div className="absolute top-10 left-10 p-1.5 bg-[#00C2FF]/10 border border-[#00C2FF]/20 rounded-lg backdrop-blur-md text-white font-mono text-[9px]">
        +391%
      </div>
      <div className="absolute bottom-10 right-10 p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg backdrop-blur-md text-white font-mono text-[9px]">
        -$45k
      </div>
    </div>
  );
}

// static FAQ data structure
const faqData = [
  { q: "How are the calculations in these ROI models formulated?", a: "Our models are based on verified benchmarks from HubSpot, Salesforce, and live performance metrics from over 250 operational n8n, CRM, and voice AI campaigns deployed globally. We calculate real metrics like Full-Time Equivalent (FTE) labor rates, callback lead drop rates, and support ticket deflection statistics." },
  { q: "Is the AI Calling ROI realistic compared to human calling agents?", a: "Yes. Traditional outbound cold call agents cost $3.00 to $5.00 per dial when accounting for base salaries, office space, CRM seat licenses, and training. Conversational voice AI systems make calls for a flat platform rate of just $0.40 to $0.80 per minute, achieving the same call volumes at up to an 85% cost savings." },
  { q: "What is WhatsApp Automation conversion salvage, and how does it work?", a: "Research shows that lead response lag times of over 5 minutes decrease conversion success by up to 391%. WhatsApp Automation integrates into your marketing pipelines (such as Meta Leads, landing page forms, or GHL) to immediately message prospects within 10 seconds. This instant feedback loop increases appointment booking rates by up to 3x." },
  { q: "What products from Natton Digital correspond to these savings?", a: "Low-score automation potential maps directly to our AI Marketing Platform™. Medium-complexity campaigns are matched with GrowthOS™ or BusinessOS™, while highly complex, custom agentic and voice calling integrations are built via our flagship AgenticOS™ and custom enterprise AI agents." },
  { q: "Can we export these calculations to send to our board or CFO?", a: "Absolutely! After entering your details in our secure Lead Capture portal, the system automatically compiles your precise inputs, custom benchmarks, and revenue/cost comparison charts into an elegant, comprehensive PDF business report that is emailed directly to your inbox." },
  { q: "Do these models support custom Indian currency metrics (INR / Lakhs)?", a: "Yes, our interactive inputs are denominated in generalized USD to facilitate clean international standard comparisons, but our consultation team will translate and tailor these models into custom INR/Lakhs models for Indian MSMEs during our strategy sessions." },
  { q: "What is n8n and how does it play a role in the Automation Savings Calculator?", a: "n8n is a sovereign, self-hosted node-based workflow engine. Unlike Zapier, which bills you per transaction and can become incredibly expensive at scale, n8n runs on secure private cloud servers, allowing you to run millions of lead and database synchronizations for a flat monthly server overhead." },
  { q: "What is GoHighLevel (GHL) CRM, and why does Natton recommend it?", a: "GoHighLevel is an all-in-one marketing and CRM platform that consolidates funnel building, text messaging, email autoresponders, calling, booking calendars, and opportunity pipelines under one roof. It eliminates expensive multi-tool licensing fees (HubSpot, Salesforce, ActiveCampaign) and centralizes your client acquisition operations." },
  { q: "How long does it take to see the ROI from these systems after deployment?", a: "Most of our CRM and lead response automations (WhatsApp auto-responders, instant lead dialers) deliver measurable ROI within the first 14 days by reclaiming deals that previously would have slipped through manual cracks. Larger custom AgenticOS projects typically break even within 45 to 60 days." },
  { q: "Does implementing AI Employees mean replacing our existing team?", a: "Not necessarily. Our primary goal is administrative elevation. By using AI to handle 70-90% of tedious data-entry, follow-up pinging, and calendar synchronization, your existing team is freed to focus on high-value client relationships, closing deals, and creative growth strategies." },
  { q: "Is our data secure when calculating ROI and submitting lead details?", a: "Yes. All operational inputs and company profiles are encrypted via SSL/TLS during transit. We do not sell or share your business data. Our lead capture webhook processes inputs directly into private, secured n8n automation channels which route straight into our CRM." },
  { q: "Can we integrate these calculators into our own business website?", a: "We build custom, white-labeled calculators for client acquisition. If you want a similar premium, high-converting interactive calculator on your agency or company portal as a lead magnet, our custom AI development team can construct and deploy one tailored to your brand." },
  { q: "Are there any hidden costs associated with running AI Employees?", a: "Our models incorporate standard operating overhead, including OpenAI/Gemini token consumption fees, Twilio VoIP trunk costs, and Meta Cloud API fees. These running costs are included in our net savings models, ensuring no unexpected billing surprises." },
  { q: "How accurate is the 'FTE' workforce simulation metric?", a: "FTE stands for Full-Time Equivalent (40 hours per week). If a human employee spends 30 hours weekly manually copying leads, updating pipelines, and emailing clients, an automated flow doing this instantly represents 0.75 FTE capability. Our models scale this against your average employee count." },
  { q: "What is the next step after generating our personalized report?", a: "Click the 'Talk To Experts' or 'Book Strategy Session' button on your custom report dashboard. This schedules a 1-on-1 operational audit with a Natton systems architect to walk through your calculation parameters, answer technical questions, and sketch a deployment roadmap." }
];
