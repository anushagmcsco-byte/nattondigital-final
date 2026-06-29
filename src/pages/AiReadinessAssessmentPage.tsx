import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, CheckCircle, ArrowRight, Play, Zap, Star, MessageSquare, Users, Globe, 
  ChevronRight, ChevronLeft, Check, HelpCircle, ChevronDown, ChevronUp, Send, Sliders, DollarSign, Plus, RefreshCw, Clock, Phone, 
  Shield, Lock, X, Activity, Database, Mail, FileText, CheckCheck, Settings, ArrowUpRight, BarChart3, PieChart, 
  Share2, History, Network, Calendar, Award, Heart, Gift, MessageCircle, FileCheck, Layers, BookOpen, Brain, Gauge, Info
} from 'lucide-react';
import { RoutePath } from '../types';

// ==========================================
// QUESTIONNAIRE DATA
// ==========================================
interface Question {
  id: string;
  text: string;
  options: { text: string; score: number }[];
}

interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
  questions: Question[];
}

const assessmentCategories: Category[] = [
  {
    id: 'marketing',
    name: 'Marketing',
    icon: Sparkles,
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 'm1',
        text: 'How do you currently generate your customer inquiries?',
        options: [
          { text: 'Referrals, word-of-mouth, or physical events only', score: 5 },
          { text: 'Static website forms or social pages with delayed follow-ups', score: 10 },
          { text: 'Paid digital campaigns with basic auto-responders', score: 15 },
          { text: 'Omni-channel digital funnels with real-time AI-driven routing', score: 20 }
        ]
      },
      {
        id: 'm2',
        text: 'How is your marketing content (copy, graphics, ads) produced?',
        options: [
          { text: 'Completely manual drafts by internal staff or outsourced agency', score: 5 },
          { text: 'Using standard generic templates with manual adjustments', score: 10 },
          { text: 'Generative AI tools (ChatGPT/Gemini) with heavy manual editing', score: 15 },
          { text: 'Fully automated, hyper-personalized campaigns synced with CRM parameters', score: 20 }
        ]
      },
      {
        id: 'm3',
        text: 'Do you track the direct ROI of your search and advertising campaigns?',
        options: [
          { text: 'No, we do not track detailed client attribution', score: 5 },
          { text: 'Basic spreadsheet lists updated monthly without funnels', score: 10 },
          { text: 'Integrated CRM tracking with manual customer lifecycle updates', score: 15 },
          { text: 'Live attribution dashboard showing dynamic lead-to-deal pipeline state', score: 20 }
        ]
      }
    ]
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: TrendingUpIcon, // fallback to standard icon mapping or custom SVG
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 's1',
        text: 'What is your average response speed to new inbound web leads?',
        options: [
          { text: 'Next business day or longer lag time', score: 5 },
          { text: 'Within 2 to 4 hours of receipt', score: 10 },
          { text: 'Within 15 minutes to an hour', score: 15 },
          { text: 'Under 45 seconds using instant automated dialers / voice agents', score: 20 }
        ]
      },
      {
        id: 's2',
        text: 'How do you handle sales appointment booking and scheduling?',
        options: [
          { text: 'Manual back-and-forth emails and phone tag with customers', score: 5 },
          { text: 'A static scheduling link (e.g. Calendly) without lead filtering', score: 10 },
          { text: 'Qualified scheduler synced to CRM with automated SMS reminders', score: 15 },
          { text: 'Autonomous Voice & WhatsApp bots booking directly into our calendars', score: 20 }
        ]
      },
      {
        id: 's3',
        text: 'How are follow-ups managed for cold or unresponsive leads?',
        options: [
          { text: 'Leads are left uncontacted after the initial outreach fails', score: 5 },
          { text: 'Occasional manual follow-ups when sales reps find spare time', score: 10 },
          { text: 'Standard automated email newsletters broadcasted periodically', score: 15 },
          { text: 'Multi-step, hyper-targeted SMS/WhatsApp nurture sequences triggered automatically', score: 20 }
        ]
      }
    ]
  },
  {
    id: 'operations',
    name: 'Operations',
    icon: Database,
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 'o1',
        text: 'How are your transactional lead records and operational metrics saved?',
        options: [
          { text: 'Hand-written logs, physical notebooks, or no records at all', score: 5 },
          { text: 'Manual data entry into decentralized Excel sheets', score: 10 },
          { text: 'Standard cloud database with manual copy-pasting between platforms', score: 15 },
          { text: 'Real-time n8n webhook nodes syncing databases with zero lag', score: 20 }
        ]
      },
      {
        id: 'o2',
        text: 'How do you compile business proposals, quotes, or corporate agreements?',
        options: [
          { text: 'Drafted manually from scratch on Word documents each time', score: 5 },
          { text: 'Copy-pasting from older templates and manually inputting figures', score: 10 },
          { text: 'Cloud template generator with manual configuration and signatures', score: 15 },
          { text: 'Autonomous document workflows auto-compiling contracts instantly', score: 20 }
        ]
      },
      {
        id: 'o3',
        text: 'What level of process automation is currently running in your workflows?',
        options: [
          { text: 'Strictly manual - employees handle every data entry step', score: 5 },
          { text: 'Basic automation triggers (Zapier/Make) for simple file copy tasks', score: 10 },
          { text: 'Custom workflow automations connecting multiple system APIs', score: 15 },
          { text: 'Full orchestration with intelligent agents making dynamic fallback decisions', score: 20 }
        ]
      }
    ]
  },
  {
    id: 'customerExperience',
    name: 'Customer Experience',
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-500',
    questions: [
      {
        id: 'cx1',
        text: 'What are your brand’s customer support operating hours?',
        options: [
          { text: 'Standard business hours with physical staff support only', score: 5 },
          { text: 'Extended hours but delayed response over nights and weekends', score: 10 },
          { text: 'Standard keyword-matching FAQ bot with ticketing fallback', score: 15 },
          { text: '24/7 intelligent multi-lingual AI chatbot resolving queries instantly', score: 20 }
        ]
      },
      {
        id: 'cx2',
        text: 'How do you collect customer reviews, feedback, or NPS ratings?',
        options: [
          { text: 'We do not systematically request feedback from customers', score: 5 },
          { text: 'Manually asking clients during occasional support reviews', score: 10 },
          { text: 'Generic automated email surveys sent post-delivery', score: 15 },
          { text: 'Dynamic interactive conversation flows on WhatsApp triggering automatically', score: 20 }
        ]
      },
      {
        id: 'cx3',
        text: 'Are your customer communications personalized to their active history?',
        options: [
          { text: 'Generic global broadcasts sent to everyone', score: 5 },
          { text: 'Basic merge tags (first name only) inside standard messages', score: 10 },
          { text: 'Tiered campaigns based on general buyer categories', score: 15 },
          { text: 'Hyper-personalized content dynamically driven by historical CRM fields', score: 20 }
        ]
      }
    ]
  },
  {
    id: 'technology',
    name: 'Technology Stack',
    icon: Brain,
    color: 'from-amber-500 to-orange-500',
    questions: [
      {
        id: 't1',
        text: 'What CRM systems are currently active in your organization?',
        options: [
          { text: 'None (or basic Excel files / notebooks only)', score: 5 },
          { text: 'Siloed tools across different departments with no sync', score: 10 },
          { text: 'Integrated CRM (HubSpot/Salesforce) but with high monthly fees', score: 15 },
          { text: 'Fully customized CRM (GrowthOS™/BusinessOS™) mapped to our exact pipeline', score: 20 }
        ]
      },
      {
        id: 't2',
        text: 'How integrated are your client communication channels?',
        options: [
          { text: 'Isolated business emails and individual mobile lines', score: 5 },
          { text: 'Team Slack/WhatsApp groups but client communications remain manual', score: 10 },
          { text: 'Partial integration syncing website contact forms to mail responders', score: 15 },
          { text: 'Unified multi-channel inbox inside BusinessOS™ syncing WhatsApp and Calling', score: 20 }
        ]
      },
      {
        id: 't3',
        text: 'What is your organization’s posture on adopting agentic AI operations?',
        options: [
          { text: 'Skeptical or concerned about security and technical complexity', score: 5 },
          { text: 'Interested but lacking a clear implementation roadmap', score: 10 },
          { text: 'Active experimentation with individual tools in separate silos', score: 15 },
          { text: 'Strategic AI-First vision with structured workflow alignment', score: 20 }
        ]
      }
    ]
  }
];

// Fallback Trend Icon for Sales since TrendingUp is imported
function TrendingUpIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
  );
}

export default function AiReadinessAssessmentPage({ setPath, darkMode }: { setPath: (path: RoutePath) => void; darkMode: boolean }) {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentCategoryIdx, setCurrentCategoryIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);

  // Business Information Fields
  const [businessName, setBusinessName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('10-50');
  const [industryType, setIndustryType] = useState('Healthcare');

  // Lead Generation form for Report Capture
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [currentTools, setCurrentTools] = useState('');
  const [biggestChallenge, setBiggestChallenge] = useState('');
  const [revenueRange, setRevenueRange] = useState('₹5 Lakh - ₹20 Lakh');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState({ n1: 6, n2: 4 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'solutions'>('overview');

  useEffect(() => {
    document.title = "AI Readiness Assessment & Maturity Score | Natton Digital";
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCaptchaAnswer({
      n1: Math.floor(Math.random() * 7) + 2,
      n2: Math.floor(Math.random() * 5) + 3
    });
  }, []);

  // ==========================================
  // BACKGROUND NEURAL MESH ANIMATION
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
    const maxPoints = 35;

    for (let i = 0; i < maxPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1
      });
    }

    let animationId: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid mesh background lines
      ctx.strokeStyle = darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)';
      ctx.lineWidth = 1;
      const step = 90;
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

        ctx.fillStyle = darkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = darkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connect points that are close
      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * (darkMode ? 0.15 : 0.08);
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
  }, [darkMode]);

  // ==========================================
  // SCORE MATHEMATICS ENGINE
  // ==========================================
  const getCategoryScores = () => {
    const scores: Record<string, number> = {};
    assessmentCategories.forEach(cat => {
      let catSum = 0;
      let totalMax = cat.questions.length * 20; // 60 max per cat
      cat.questions.forEach(q => {
        catSum += answers[q.id] || 0;
      });
      // Convert category score to percentage out of 100
      scores[cat.id] = totalMax > 0 ? Math.round((catSum / totalMax) * 100) : 0;
    });
    return scores;
  };

  const categoryScoreMap = getCategoryScores();

  const calculateOverallMaturityScore = () => {
    // 20% weight per category
    const vals = Object.values(categoryScoreMap);
    if (vals.length === 0) return 0;
    const sum = vals.reduce((a, b) => a + b, 0);
    return Math.round(sum / vals.length);
  };

  const overallScore = calculateOverallMaturityScore();

  const getMaturityLevel = (score: number) => {
    if (score <= 25) return { level: 'Beginner', desc: 'Minimal AI alignment. Relies primarily on legacy manual entry sheets, spreadsheet logs, and delayed personal outreaches.', color: 'text-rose-400', border: 'border-rose-500/30' };
    if (score <= 50) return { level: 'Emerging', desc: 'Basic automation setup. Incorporates minor point-to-point triggers (like static Zapier lines) but lacks uniform pipeline sync or quick callback systems.', color: 'text-amber-400', border: 'border-amber-500/30' };
    if (score <= 75) return { level: 'Growth Focus', desc: 'Developing automation structure. Actively standardizes pipeline operations with central CRMs and triggers but experiences gaps in 24/7 client response cycles.', color: 'text-blue-400', border: 'border-blue-500/30' };
    return { level: 'AI-First Enterprise', desc: 'Robust agentic intelligence. Harnesses hyper-fast outbound AI voice calling, live WhatsApp catalogs, automatic contract creators, and self-improving agent networks.', color: 'text-emerald-400', border: 'border-emerald-500/30' };
  };

  const maturityLevelInfo = getMaturityLevel(overallScore);

  const handleOptionSelect = (qId: string, score: number) => {
    setAnswers(prev => ({ ...prev, [qId]: score }));
  };

  const handleNextCategory = () => {
    // Check if all questions in active category are answered
    const activeCat = assessmentCategories[currentCategoryIdx];
    const allAnswered = activeCat.questions.every(q => answers[q.id] !== undefined);
    if (!allAnswered) {
      alert('Please select an answer for all questions in this section before continuing.');
      return;
    }

    if (currentCategoryIdx < assessmentCategories.length - 1) {
      setCurrentCategoryIdx(prev => prev + 1);
    } else {
      setAssessmentCompleted(true);
    }
  };

  const handlePrevCategory = () => {
    if (currentCategoryIdx > 0) {
      setCurrentCategoryIdx(prev => prev - 1);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== (captchaAnswer.n1 + captchaAnswer.n2)) {
      alert('Correct captcha calculation required to generate custom PDF roadmap.');
      return;
    }
    setIsSubmitting(true);
    setSyncLogs([
      '⚡ Intercepting inbound lead profile payloads...',
      '📡 Mapping parameters: Name, Company, Tools & Automation Gaps...',
      '🔗 Dispatched secure TLS webhook packet to Natton n8n core router...',
      '📥 Registering custom tags in GoHighLevel CRM directories...'
    ]);

    setTimeout(() => {
      setSyncLogs(prev => [
        ...prev,
        '📊 Processing dynamic score values: Marketing, Sales, Operations...',
        '📝 Generating personalized 90-Day implementation PDF report...',
        '📧 Dispatching notification trigger to support@natton.digital...',
        '🚀 CRM sync active. Registration Reference ID: GHL_LEAD_6840_READY'
      ]);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1200);
    }, 1200);
  };

  // ==========================================
  // DYNAMIC ROI CALCULATOR FOR ASSESSMENT PAGE
  // ==========================================
  const [roiRevenue, setRoiRevenue] = useState(300000); // ₹3 Lakh default
  const [roiEmployees, setRoiEmployees] = useState(8);
  const [roiMarketingSpend, setRoiMarketingSpend] = useState(40000); // ₹40k default
  const [roiManualTasks, setRoiManualTasks] = useState(12); // hours per employee per week

  // Dynamic Outputs
  const totalWeeklyHoursLost = roiEmployees * roiManualTasks;
  const monthlyHoursSaved = Math.round(totalWeeklyHoursLost * 4 * 0.75); // 75% efficiency gain through automation
  const costSavings = Math.round(monthlyHoursSaved * 750); // Value of ₹750/hr internal employee cost
  const pipelineLostValue = Math.round(roiMarketingSpend * 0.40); // 40% leads dropped on average due to slow follow up
  const revenuePotentialGained = Math.round((roiRevenue * 0.15) + pipelineLostValue); // 15% increase in conversion through immediate followup
  const roiPercentage = Math.round(((costSavings * 12 + revenuePotentialGained * 12) / 120000) * 100); // Assuming average Natton subscription costs

  // ==========================================
  // FAQ DATA (15 Total Items)
  // ==========================================
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);
  const faqList = [
    {
      q: 'What is an AI Readiness Assessment?',
      a: 'It is a comprehensive diagnostic auditing framework designed to analyze your current operational, sales, and marketing architectures. It identifies structural inefficiencies, data silos, response lag times, and evaluates your overall potential to benefit from automation platforms like GrowthOS™ and AgenticOS™.'
    },
    {
      q: 'How is my AI Maturity Score calculated?',
      a: 'Your maturity score is computed using a weighted rating system spanning five key domains: Marketing, Sales, Operations, Customer Experience, and Technology Stack. Each category carries a 20% weight. Answers are graded from manual-only configurations (lowest points) up to fully orchestrated, agent-led operations (highest points).'
    },
    {
      q: 'How long does the assessment take?',
      a: 'The assessment takes approximately 5 minutes. It comprises 15 questions focusing on practical business procedures without requiring any complex technical code knowledge or specialized credentials.'
    },
    {
      q: 'What happens after I submit my details?',
      a: 'Our systems compile your responses into a personalized, high-fidelity PDF report and Implementation Roadmap. Additionally, the parameters are instantly transmitted via n8n workflows to our solutions team, who schedule a 1-on-1 strategy call with you to detail actionable integration setups.'
    },
    {
      q: 'Is my business data secure and confidential?',
      a: 'Absolutely. Natton Digital operates under strict SOC2 compliance standards. All submitted company information, revenues, and email data are fully encrypted both in transit and at rest, and are never shared or used to train public AI models.'
    },
    {
      q: 'What is the difference between an "Emerging" and "AI-First" enterprise?',
      a: 'An "Emerging" business uses individual point-to-point tool automations (like manual email scripts or siloed spreadsheets) which still require constant human supervision. An "AI-First" enterprise integrates autonomous multi-agent networks (AgenticOS™) that execute complex multi-step workflows, make smart fallback decisions, and coordinate directly without manual friction.'
    },
    {
      q: 'Do I need to have an in-house developer to implement these recommendations?',
      a: 'No. Natton Digital offers complete, fully managed setup and integration solutions. Our systems engineers handle the entire process—including Meta WhatsApp API keys, CRM setups, and n8n orchestration—so your team can focus strictly on growth.'
    },
    {
      q: 'What software platforms do your solutions integrate with?',
      a: 'Our integrations connect with over 500 popular platforms, including Salesforce, HubSpot, GoHighLevel, Google Workspace, Slack, EHR records, SQL databases, Shopify, Stripe, and legacy ERP models via secure webhooks.'
    },
    {
      q: 'How can WhatsApp Automation increase my business conversion rate?',
      a: 'Traditional emails suffer from low open rates (average 15-20%). WhatsApp templates generate over 90% open rates and 40% engagement. By introducing dynamic interactive coupons, immediate checkout recoveries, and instant catalog dispatch, conversion metrics routinely rise by 150-300%.'
    },
    {
      q: 'What is AgenticOS™ and how does it work?',
      a: 'AgenticOS™ is our proprietary orchestration framework designed to deploy concurrent AI agents. Unlike standard single-action chat prompts, agentic networks coordinate together—meaning a Voice caller agent can qualify a lead, immediately prompt a WhatsApp agent to dispatch a catalog, and direct a database agent to write invoice receipts simultaneously.'
    },
    {
      q: 'How does the ROI Estimator calculate my potential savings?',
      a: 'The calculator models manual administration hours saved (assumed 75% efficiency gains through automated logs) multiplied by standard internal employee costs, combined with recaptured advertisement spend from missed callbacks and estimated sales pipeline conversions.'
    },
    {
      q: 'Can I share my personalized roadmap with my leadership team?',
      a: 'Yes. The printable PDF report is structured as an executive summary. It features clear visual metrics, industry benchmarks, and a concrete 90-day execution timeline, making it ideal for presenting to executive committees or boards.'
    },
    {
      q: 'What is the timeline to see real results from the recommended roadmaps?',
      a: 'Initial "Quick Wins" (such as deactivating manual forms and deploying qualified WhatsApp automation) are typically set up within 7-10 days, showing positive conversion spikes almost instantly. Complete enterprise operations (AgenticOS™ orchestration) take 30-45 days to optimize fully.'
    },
    {
      q: 'Do you assist with custom integrations for legacy ERP or EHR systems?',
      a: 'Yes. Our developer team specializes in constructing secure middleware nodes and custom n8n triggers to connect complex, localized, or old system architectures to modern cloud APIs with full database integrity.'
    },
    {
      q: 'Is there a cost to receive the personalized PDF roadmap?',
      a: 'No. The AI Readiness Assessment and the generated 90-Day Implementation Report are 100% free of charge. We provide this value upfront to demonstrate how automation can scale your specific company.'
    }
  ];

  // ==========================================
  // CUSTOM SVG RADAR CHART COMPONENT
  // ==========================================
  const renderRadarChart = () => {
    const center = 150;
    const rMax = 100;
    const labels = [
      { key: 'marketing', name: 'Marketing' },
      { key: 'sales', name: 'Sales' },
      { key: 'operations', name: 'Operations' },
      { key: 'customerExperience', name: 'Cust Experience' },
      { key: 'technology', name: 'Tech Stack' }
    ];

    // Compute coordinates for each vertex
    const points = labels.map((lbl, idx) => {
      const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
      const score = categoryScoreMap[lbl.key] || 0;
      const r = (score / 100) * rMax;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y, labelX: center + (rMax + 25) * Math.cos(angle), labelY: center + (rMax + 15) * Math.sin(angle), name: lbl.name, score };
    });

    const pathData = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
      <div className="flex flex-col items-center justify-center p-4 bg-slate-950/80 rounded-2xl border border-slate-900 shadow-xl relative overflow-hidden">
        <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-72 sm:h-72 drop-shadow-lg overflow-visible">
          {/* Circular Grid Guidelines */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((p, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={rMax * p}
              fill="none"
              stroke={darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          ))}

          {/* Grid Axes */}
          {labels.map((_, idx) => {
            const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
            const x = center + rMax * Math.cos(angle);
            const y = center + rMax * Math.sin(angle);
            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}
                strokeWidth="1.5"
              />
            );
          })}

          {/* Filled Polyline area representing user maturity score */}
          {pathData && (
            <polygon
              points={pathData}
              fill="rgba(139, 92, 246, 0.25)"
              stroke="rgba(139, 92, 246, 0.8)"
              strokeWidth="2.5"
              className="animate-pulse"
            />
          )}

          {/* Vertices/Points */}
          {points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill={idx % 2 === 0 ? '#3b82f6' : '#10b981'}
              stroke="#030512"
              strokeWidth="1.5"
            />
          ))}

          {/* Labels */}
          {points.map((p, idx) => {
            let textAnchor = 'middle';
            if (p.labelX < center - 20) textAnchor = 'end';
            else if (p.labelX > center + 20) textAnchor = 'start';
            return (
              <g key={idx}>
                <text
                  x={p.labelX}
                  y={p.labelY}
                  textAnchor={textAnchor}
                  fill={darkMode ? '#94a3b8' : '#475569'}
                  className="text-[9px] font-mono font-semibold"
                >
                  {p.name}
                </text>
                <text
                  x={p.labelX}
                  y={p.labelY + 9}
                  textAnchor={textAnchor}
                  fill={darkMode ? '#ffffff' : '#030512'}
                  className="text-[10px] font-sans font-extrabold"
                >
                  {p.score}%
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-2 flex gap-4 text-[10px] font-mono">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Technology Pillars</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Conversion Nodes</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#030512] text-slate-200 min-h-screen py-12 overflow-hidden relative selection:bg-purple-600 selection:text-white">
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-900/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-10 text-xs font-mono text-slate-500 flex items-center gap-1.5 border-b border-slate-900 pb-4 text-left">
          <button onClick={() => setPath('home')} className="hover:text-[#00C2FF] transition-colors">Home</button> 
          <span>/</span> 
          <span className="text-slate-400">Tools</span> 
          <span>/</span> 
          <span className="text-purple-400 font-semibold font-mono">AI Readiness Assessment</span>
        </div>

        {/* ==========================================
            HERO SECTION
           ========================================== */}
        {!assessmentStarted && !assessmentCompleted && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative min-h-[500px]">
            <div className="absolute inset-0 rounded-3xl overflow-hidden -z-20 border border-blue-950/20 bg-slate-950/40 backdrop-blur-md">
              <canvas ref={meshRef} className="absolute inset-0 w-full h-full object-cover" />
            </div>

            <div className="lg:col-span-7 space-y-6 z-10 p-6 sm:p-12 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
                <Brain className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-purple-400 font-bold">
                  Interactive Strategy Grader
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight text-white">
                How AI-Ready Is Your Business?
              </h1>

              <p className="text-sm leading-relaxed text-slate-400 max-w-2xl">
                Take our 5-minute interactive assessment to compute your AI Maturity Score and receive a customized 90-day automation growth roadmap. Identify key marketing, sales, and operations gaps instantly.
              </p>

              {/* Pre-Assessment inputs for basic company info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
                <div>
                  <label className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Khanna Clinics"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block mb-1">Corporate Sector</label>
                  <select
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-sans"
                  >
                    <option value="Healthcare">Healthcare & Biotech</option>
                    <option value="Education">Education & Academies</option>
                    <option value="Real Estate">Real Estate Segment</option>
                    <option value="Manufacturing">Manufacturing Factories</option>
                    <option value="Retail">Retail & E-commerce</option>
                    <option value="Professional Services">Professional Services</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block mb-1">Employee Count</label>
                  <select
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-sans"
                  >
                    <option value="1-9">1 to 9 Employees</option>
                    <option value="10-50">10 to 50 Employees</option>
                    <option value="51-200">51 to 200 Employees</option>
                    <option value="200+">200+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => {
                    if (!businessName.trim()) {
                      alert('Please provide your Company Name to begin the grader.');
                      return;
                    }
                    setAssessmentStarted(true);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-extrabold rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 text-xs uppercase tracking-wider"
                >
                  Start Grader <ArrowRight className="h-4 w-4" />
                </button>
                <a 
                  href="#sample_report_sec" 
                  className="px-5 py-3 rounded-lg border border-slate-800 bg-slate-950/50 hover:bg-slate-900 transition-all flex items-center gap-2 text-xs font-semibold text-slate-300"
                >
                  See Sample Report
                </a>
              </div>
            </div>

            {/* Premium Interactive 3D Sphere Representation */}
            <div className="lg:col-span-5 p-1 relative z-10 flex justify-center">
              <div className="relative h-64 w-64 sm:h-72 sm:w-72 bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-full border border-blue-900/30 flex items-center justify-center p-4 shadow-2xl group overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] animate-pulse" />
                
                {/* Simulated Neural Sphere using multiple rotated glowing SVGs */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_20s_linear_infinite] opacity-30 text-blue-400">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                  <svg viewBox="0 0 100 100" className="w-48 h-48 sm:w-56 sm:h-56 absolute animate-[spin_32s_linear_infinite_reverse] opacity-40 text-purple-400">
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <ellipse cx="50" cy="50" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="1" />
                    <ellipse cx="50" cy="50" rx="8" ry="30" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <div className="h-4 w-4 bg-emerald-400 rounded-full blur-[2px] absolute animate-ping opacity-75" />
                  <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full absolute shadow-[0_0_10px_#10b981]" />
                </div>

                <div className="text-center z-10 space-y-1 select-none pointer-events-none">
                  <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] block font-bold uppercase">Maturity Sphere</span>
                  <span className="text-2xl font-extrabold text-white block font-display">AI-OS</span>
                  <span className="text-[8px] font-mono text-slate-400 block px-4 leading-normal">Interactive business capabilities mapping</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            BENEFITS: "What You'll Discover"
           ========================================== */}
        {!assessmentStarted && !assessmentCompleted && (
          <div className="mb-24 space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">Comprehensive Evaluation</span>
              <h2 className="text-3xl font-bold font-display text-white">What You'll Discover</h2>
              <p className="text-xs text-slate-400">
                Our dynamic scorer models 8 fundamental growth variables, contrasting physical processes with AI capability metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                { title: 'AI Maturity Score', desc: 'Compute a consolidated score out of 100 benchmarked against industry standards.', icon: Gauge },
                { title: 'Marketing Readiness', desc: 'Evaluate copy, graphic automation, organic SEO grids, and hyper-targeted ads.', icon: Sparkles },
                { title: 'Sales Readiness', desc: 'Audit inbound lag, conversational Voice agents, WhatsApp followups, and schedules.', icon: TrendingUpIcon },
                { title: 'Automation Readiness', desc: 'Identify manual bottlenecks in database syncing, ledger updates, and files.', icon: Database },
                { title: 'Customer Experience', desc: 'Rate multilingual 24/7 bots, reviews gathering, and NPS WhatsApp flows.', icon: MessageSquare },
                { title: 'Growth Opportunities', desc: 'Find exact leaks where leads drops, missed client bookings, or delayed quotes occur.', icon: Zap },
                { title: 'Recommended Solutions', desc: 'Get specific suggestions on GrowthOS™, BusinessOS™, n8n, or Calling APIs.', icon: Award },
                { title: 'ROI Potential', desc: 'Estimate hours reclaimed, cost reduction coefficients, and revenue expansion ratios.', icon: DollarSign }
              ].map((benefit, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 hover:border-blue-500/30 transition-all space-y-3 relative group">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <benefit.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-sm font-bold text-white font-display">{benefit.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            ASSESSMENT WIZARD / QUESTIONNAIRE
           ========================================== */}
        {assessmentStarted && !assessmentCompleted && (
          <div className="max-w-3xl mx-auto mb-24 space-y-8 animate-fade-in text-left">
            
            {/* Steps Progress Header */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span className="uppercase tracking-widest text-[#00C2FF] font-bold">Category {currentCategoryIdx + 1} of {assessmentCategories.length}</span>
                <span>{Math.round(((currentCategoryIdx + 1) / assessmentCategories.length) * 100)}% Complete</span>
              </div>
              
              <div className="flex gap-2">
                {assessmentCategories.map((cat, idx) => {
                  const isActive = idx === currentCategoryIdx;
                  const isCompleted = idx < currentCategoryIdx;
                  return (
                    <div 
                      key={cat.id} 
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' 
                          : isCompleted 
                            ? 'bg-emerald-500' 
                            : 'bg-slate-900'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="p-4 rounded-xl border border-slate-900 bg-slate-950 flex items-center gap-3">
                <div className={`h-8 w-8 rounded bg-gradient-to-br ${assessmentCategories[currentCategoryIdx].color} flex items-center justify-center text-white`}>
                  {React.createElement(assessmentCategories[currentCategoryIdx].icon, { className: "h-4 w-4" })}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display">{assessmentCategories[currentCategoryIdx].name} Diagnostic Pillar</h3>
                  <p className="text-[10px] text-slate-500">Evaluating: {businessName} ({industryType})</p>
                </div>
              </div>
            </div>

            {/* Questions list for active category */}
            <div className="space-y-6">
              {assessmentCategories[currentCategoryIdx].questions.map((q, qIdx) => {
                const selectedScore = answers[q.id];
                return (
                  <div key={q.id} className="p-6 sm:p-8 rounded-2xl border border-slate-900 bg-slate-950/60 backdrop-blur-sm space-y-4">
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase block">Question {qIdx + 1}</span>
                    <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed font-display">
                      {q.text}
                    </h4>

                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedScore === opt.score;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleOptionSelect(q.id, opt.score)}
                            className={`p-4 rounded-xl border text-xs text-left font-semibold transition-all leading-normal flex items-start gap-3 ${
                              isSelected 
                                ? 'border-blue-500 bg-blue-500/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                                : 'border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900/50 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 text-[10px] ${
                              isSelected 
                                ? 'border-blue-500 bg-blue-500 text-white' 
                                : 'border-slate-800 bg-slate-950'
                            }`}>
                              {isSelected ? <Check className="h-3 w-3" /> : String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePrevCategory}
                disabled={currentCategoryIdx === 0}
                className="px-5 py-2.5 rounded-lg border border-slate-800 hover:bg-slate-900 font-semibold text-xs flex items-center gap-1.5 text-slate-400 disabled:opacity-20 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-4 w-4" /> Back Section
              </button>
              
              <button
                onClick={handleNextCategory}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
              >
                {currentCategoryIdx === assessmentCategories.length - 1 ? 'Finish Assessment' : 'Next Section'} <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==========================================
            REPORT PANEL: ASSESSMENT COMPLETED SHOW LOGS & STATS
           ========================================== */}
        {assessmentCompleted && (
          <div className="space-y-12 animate-fade-in text-left">
            
            {/* Header Result Badge */}
            <div className="p-6 sm:p-10 rounded-3xl border border-slate-900 bg-slate-950 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                  Grader Compiled Successfully
                </span>
                <h2 className="text-3xl font-bold font-display text-white">Your AI Readiness Audit</h2>
                <p className="text-xs text-slate-400 max-w-xl">
                  Diagnostic evaluation completed for <strong>{businessName}</strong>. Find detailed category reports and personalized roadmap phases below.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 bg-slate-950/80 p-4 rounded-2xl border border-slate-900">
                <div className="text-center">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">AI Maturity Score</span>
                  <span className="text-3xl font-extrabold text-white font-mono">{overallScore}%</span>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div className="text-left max-w-[150px]">
                  <span className="text-[8px] font-mono text-[#00C2FF] uppercase block font-bold">Maturity Tier</span>
                  <span className={`text-xs font-bold block ${maturityLevelInfo.color}`}>{maturityLevelInfo.level}</span>
                </div>
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex border-b border-slate-900 gap-1 select-none">
              {(['overview', 'roadmap', 'solutions'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all capitalize ${
                    activeTab === tab 
                      ? 'border-blue-500 text-white font-bold' 
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab === 'overview' ? 'Maturity Overview' : tab === 'roadmap' ? '90-Day Roadmap' : 'Recommended Tech'}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: OVERVIEW WITH CUSTOM SVG RADAR CHART */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Custom Radar Visualizer */}
                <div className="lg:col-span-5 space-y-4">
                  {renderRadarChart()}
                  <div className={`p-4 rounded-xl border bg-slate-950/60 ${maturityLevelInfo.border}`}>
                    <h4 className={`text-xs font-bold uppercase ${maturityLevelInfo.color} mb-1 flex items-center gap-1.5`}>
                      <Info className="h-4 w-4" /> Tier Analysis: {maturityLevelInfo.level}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      {maturityLevelInfo.desc}
                    </p>
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-lg font-bold font-display text-white">Diagnostics Analysis By Pillar</h3>
                  
                  <div className="space-y-4">
                    {assessmentCategories.map(cat => {
                      const score = categoryScoreMap[cat.id] || 0;
                      let feedback = '';
                      if (score <= 30) feedback = 'High risk. Primarily manual setups creating severe speed lags and customer leakage.';
                      else if (score <= 60) feedback = 'Moderate alignment. Basic integrations are active, but missing real-time sync nodes.';
                      else feedback = 'Strong efficiency. Positioned well for advanced autonomous multi-agent triggers.';

                      return (
                        <div key={cat.id} className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-white font-display flex items-center gap-1.5">
                              {cat.name} Grader
                            </span>
                            <span className="font-mono text-blue-400 font-bold">{score}% Score</span>
                          </div>

                          <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden w-full">
                            <div 
                              style={{ width: `${score}%` }} 
                              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-700" 
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 leading-normal font-mono">{feedback}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 90-DAY TRANSFORMATION ROADMAP */}
            {activeTab === 'roadmap' && (
              <div className="space-y-8">
                <div className="text-left space-y-2 max-w-xl">
                  <h3 className="text-xl font-bold font-display text-white">90-Day AI Transformation Roadmap</h3>
                  <p className="text-xs text-slate-400">
                    A staged rollout checklist designed to address the leaks identified in your grader audit.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                  {[
                    { phase: 'Phase 1: Quick Wins', days: 'Days 1-15', title: 'Pipeline Foundation', desc: 'Sync customer directories to custom GoHighLevel CRM funnels, deactivating manual entry sheets.', tasks: ['Map API trigger endpoints', 'Seed CRM deal stages', 'Establish baseline KPIs'] },
                    { phase: 'Phase 2: Automation', days: 'Days 16-45', title: 'Communication Nodes', desc: 'Configure interactive WhatsApp catalog bots and trigger checkout cart winbacks within 15 minutes.', tasks: ['Verify Meta Cloud keys', 'Deploy WhatsApp templates', 'Build card recovery flows'] },
                    { phase: 'Phase 3: AI Core', days: 'Days 46-75', title: 'Calling & Triage Agents', desc: 'Deploy outbound AI voice dialers to contact new internet inquiries within 45 seconds to secure bookings.', tasks: ['Optimize voice prompt prompts', 'Schedule calendar sync loops', ' HIPAA compliance review'] },
                    { phase: 'Phase 4: Scale', days: 'Days 76-90', title: 'AgenticOS™ Integration', desc: 'Mount autonomous multi-agent networks matching qualified accounts with instant contracts.', tasks: ['Compile proposal generators', 'Train vector knowledge bases', 'Enable final dashboard feeds'] }
                  ].map((p, idx) => (
                    <div key={idx} className="p-5 rounded-2xl border border-slate-900 bg-slate-950/40 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest block font-bold">{p.days}</span>
                        <h4 className="text-xs font-mono text-[#00C2FF] font-bold block">{p.phase}</h4>
                        <h3 className="text-sm font-bold text-white font-display">{p.title}</h3>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
                      </div>

                      <div className="border-t border-slate-900 pt-3 mt-3 space-y-2 text-[10px] font-mono text-slate-500">
                        {p.tasks.map((task, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: PERSONALIZED SYSTEM RECOMMENDATIONS */}
            {activeTab === 'solutions' && (
              <div className="space-y-8">
                <div className="text-left space-y-2 max-w-xl">
                  <h3 className="text-xl font-bold font-display text-white">Recommended Natton OS Modules</h3>
                  <p className="text-xs text-slate-400">
                    Based on your maturity score, we recommend deploying these specific core architectures to optimize your growth.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  {[
                    { title: 'GrowthOS™', tag: 'Acquisition', desc: 'Consolidate organic lead paths and Meta campaign funnels with structured, low-friction forms.', path: 'products/growth-os' as RoutePath },
                    { title: 'WhatsApp Automation', tag: 'Conversion', desc: 'Interact with potential leads 24/7 in native languages, dispatching interactive product brochures.', path: 'solutions/whatsapp-automation' as RoutePath },
                    { title: 'AI Calling Agents', tag: 'Velocity', desc: 'Outbound telephone dialers contacting registration leads under 45 seconds to secure meetings.', path: 'solutions/ai-calling-agents' as RoutePath },
                    { title: 'BusinessOS™', tag: 'Operations', desc: 'Secure operational hub uniting team members with unified customer inboxes, replacing Excel sheets.', path: 'products/business-os' as RoutePath },
                    { title: 'AgenticOS™', tag: 'Orchestration', desc: 'Advanced autonomous agent workspace driving simultaneous contract compilers and databases.', path: 'products/agentic-os' as RoutePath },
                    { title: 'n8n Workflow Nodes', tag: 'Integration', desc: 'Highly secure data routers syncing local files with webhooks to eliminate manual data chores.', path: 'solutions/ai-agents' as RoutePath }
                  ].map((sol, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setPath(sol.path)}
                      className="p-5 rounded-2xl border border-slate-900 bg-slate-950/40 hover:border-blue-500/30 hover:bg-slate-950 transition-all flex flex-col justify-between cursor-pointer group"
                    >
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase font-bold tracking-wider inline-block">
                          {sol.tag}
                        </span>
                        <h3 className="text-sm font-bold text-white font-display group-hover:text-blue-400 transition-colors">{sol.title}</h3>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{sol.desc}</p>
                      </div>

                      <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 mt-4 group-hover:text-blue-400">
                        View specs <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REPORT CAPTURE: GHL FORM & Webhook Sim Logs */}
            {!isSubmitted ? (
              <div id="lead_capture_form" className="p-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent rounded-3xl mt-12">
                <div className="p-6 sm:p-10 rounded-3xl border border-slate-900 bg-slate-950 text-left grid grid-cols-1 lg:grid-cols-12 gap-10">
                  
                  {/* Info Column */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-mono font-bold">
                      <FileCheck className="h-3.5 w-3.5" /> SECURE REPORT DELIVERY
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white">Get Your Full Grader Report</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Enter your email to receive a detailed printable PDF Strategy Audit containing visual category analyses, competitive benchmarking charts, and custom workflow templates.
                    </p>

                    <div className="space-y-3 text-xs text-slate-500 font-mono">
                      <p className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400" /> Fully SOC2 compliant data encryption
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400" /> Zero spam guarantee
                      </p>
                    </div>

                    {/* Webhook logs simulator */}
                    {isSubmitting && (
                      <div className="p-4 rounded-xl bg-black border border-slate-900 text-[9px] font-mono text-[#00C2FF] space-y-1 select-none leading-relaxed">
                        {syncLogs.map((log, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-slate-600">[{idx+1}]</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form Column */}
                  <div className="lg:col-span-7">
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Anil Khanna"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block mb-1">Company Email</label>
                          <input
                            type="email"
                            required
                            placeholder="anil@khannaclinics.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block mb-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block mb-1">Country</label>
                          <input
                            type="text"
                            required
                            placeholder="India"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block mb-1">Biggest operational challenge?</label>
                        <textarea
                          placeholder="e.g., We miss over 30% of incoming patient calls during peak hours"
                          value={biggestChallenge}
                          onChange={(e) => setBiggestChallenge(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 h-16 font-sans"
                        />
                      </div>

                      {/* Captcha */}
                      <div className="p-3.5 rounded-lg border border-slate-900 bg-slate-950/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="text-xs text-slate-400 font-mono">
                          Verify Security: Calculate <span className="text-white font-bold">{captchaAnswer.n1} + {captchaAnswer.n2}</span> = ?
                        </div>
                        <input
                          type="number"
                          required
                          placeholder="Result"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          className="w-24 px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-center text-white focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-extrabold rounded-lg shadow-lg text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? 'Syncing to GHL & n8n...' : 'Generate Personalized Strategy Report'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl border border-emerald-950/30 bg-emerald-950/5 text-center space-y-4 max-w-2xl mx-auto">
                <CheckCheck className="h-10 w-10 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-white font-display">Roadmap Compiled Successfully!</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Excellent! We have compiled your executive 90-Day AI Roadmap. A printable high-fidelity PDF copy has been securely transmitted to <strong>{email}</strong>. Our solutions team is evaluating the parameters and will contact you shortly at <strong>{phone}</strong> to detail integration setups.
                </p>

                <div className="pt-2 flex justify-center gap-3">
                  <button 
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <FileText className="h-4 w-4" /> Print Grader Report
                  </button>
                  <button 
                    onClick={() => {
                      setAnswers({});
                      setAssessmentCompleted(false);
                      setAssessmentStarted(false);
                      setIsSubmitted(false);
                      setCurrentCategoryIdx(0);
                    }}
                    className="px-5 py-2.5 rounded-lg border border-slate-800 hover:bg-slate-950 text-xs font-semibold text-slate-300 transition-all"
                  >
                    Retake Grader
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            BENCHMARK: "Benchmark Against Industry Leaders"
           ========================================== */}
        {!assessmentStarted && (
          <div className="mb-24 space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">Competitive Intelligence</span>
              <h2 className="text-3xl font-bold font-display text-white">Compare Against Market Standards</h2>
              <p className="text-xs text-slate-400">
                Explore the baseline performance difference between standard companies and automated teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
              {[
                { title: 'AI Adoption Speed', standard: '20-30% silos', growthOS: '95%+ structured', desc: 'Typical brands use AI as isolated personal text helpers. Leaders embed system-wide agent workflows.' },
                { title: 'Automation Depth', standard: 'Siloed Zapier lines', growthOS: 'n8n core networks', desc: 'Replacing basic point-to-point copy triggers with redundant, highly secure API database managers.' },
                { title: 'Marketing Slashes', standard: 'Manual copy drafts', growthOS: 'CRM automated campaigns', desc: 'Producing targeted outreach arrays synced with purchase history logs, rather than template models.' },
                { title: 'Operational Speed', standard: 'Average 4-hour delay', growthOS: '<45 seconds callback', desc: 'Pruning inbound lead dropout statistics by dialing new inquiries instantly via autonomous voice callers.' }
              ].map((bench, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 space-y-4">
                  <h3 className="text-sm font-bold text-white font-display border-b border-slate-900 pb-3">{bench.title}</h3>
                  
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Standard SMB:</span>
                      <span className="text-rose-400 font-bold">{bench.standard}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-400">Natton Client:</span>
                      <span className="text-emerald-400 font-bold">{bench.growthOS}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-normal font-sans pt-2">
                    {bench.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            ROI ESTIMATOR WITH DYNAMIC CALCULATIONS
           ========================================== */}
        {!assessmentStarted && (
          <div className="mb-24 p-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent rounded-3xl text-left">
            <div className="p-6 sm:p-10 rounded-3xl border border-slate-900 bg-slate-950 grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Inputs Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#00C2FF] uppercase tracking-widest block font-bold">Dynamic Projection Engine</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Potential Automation ROI</h2>
                  <p className="text-xs text-slate-400">
                    Adjust the sliders below to estimate hours reclaimed and potential financial growth by deploying GrowthOS™ solutions.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Revenue Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Monthly Revenue (INR)</span>
                      <span className="text-blue-400 font-mono font-bold">₹{(roiRevenue / 100000).toFixed(1)} Lakh</span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="5000000"
                      step="50000"
                      value={roiRevenue}
                      onChange={(e) => setRoiRevenue(Number(e.target.value))}
                      className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Employees Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Administrative Employees</span>
                      <span className="text-blue-400 font-mono font-bold">{roiEmployees} Staff</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={roiEmployees}
                      onChange={(e) => setRoiEmployees(Number(e.target.value))}
                      className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Manual Tasks Hours Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Weekly Manual Hours / Employee</span>
                      <span className="text-blue-400 font-mono font-bold">{roiManualTasks} Hours</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="40"
                      value={roiManualTasks}
                      onChange={(e) => setRoiManualTasks(Number(e.target.value))}
                      className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Marketing Spend Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Monthly Ad & Campaign Spend (INR)</span>
                      <span className="text-blue-400 font-mono font-bold">₹{(roiMarketingSpend / 1000).toFixed(0)}K</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="500000"
                      step="5000"
                      value={roiMarketingSpend}
                      onChange={(e) => setRoiMarketingSpend(Number(e.target.value))}
                      className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Outputs Column */}
              <div className="lg:col-span-6 space-y-5 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-900 bg-slate-950 text-center">
                    <span className="text-[9px] font-mono text-purple-400 uppercase block">Administrative Time Reclaimed</span>
                    <span className="text-xl font-extrabold text-white block mt-1 font-mono">{monthlyHoursSaved} Hours/Mo</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-900 bg-slate-950 text-center">
                    <span className="text-[9px] font-mono text-emerald-400 uppercase block">Financial Efficiency Gain</span>
                    <span className="text-xl font-extrabold text-emerald-400 block mt-1 font-mono">₹{costSavings.toLocaleString()}/Mo</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-900 bg-slate-950 text-center">
                    <span className="text-[9px] font-mono text-blue-400 uppercase block">Estimated Sales Gained</span>
                    <span className="text-xl font-extrabold text-white block mt-1 font-mono">₹{revenuePotentialGained.toLocaleString()}/Mo</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-900 bg-slate-950 text-center">
                    <span className="text-[9px] font-mono text-yellow-400 uppercase block">Projected First-Year ROI</span>
                    <span className="text-xl font-extrabold text-yellow-400 block mt-1 font-mono">{roiPercentage}%</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/10 border border-blue-900/20 text-center text-[10px] font-mono text-slate-400 leading-normal">
                  <span className="text-blue-400 font-bold block mb-1 uppercase">// CALCULATION FORMULA DETAILS</span>
                  Models a 75% reduction in manual spreadsheet/ledgers entry duties combined with a 40% reduction in ad lead leaks via under-45s AI Calling dialers.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SAMPLE REPORT PREVIEW SECTION
           ========================================== */}
        {!assessmentStarted && (
          <div id="sample_report_sec" className="mb-24 space-y-10 text-left">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">Executive Preview</span>
              <h2 className="text-3xl font-bold font-display text-white">Sample AI Readiness Report</h2>
              <p className="text-xs text-slate-400">
                Take a look at the comprehensive structure of our 90-Day strategic roadmaps delivered post-assessment.
              </p>
            </div>

            <div className="p-6 sm:p-10 rounded-3xl border border-slate-900 bg-slate-950 relative overflow-hidden space-y-8">
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Header info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
                <div>
                  <span className="text-[9px] font-mono text-purple-400 uppercase block">EXECUTIVE SUMMARIZED AUDIT</span>
                  <h3 className="text-xl font-bold text-white font-display mt-0.5">Vanguard Orthopedic & Joint Center</h3>
                  <p className="text-[10px] text-slate-500">Corporate Sector: Healthcare & Clinics • 15 Staff Members</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded font-bold">Maturity Score: 38% (Emerging)</span>
              </div>

              {/* Grid with cards representing mock report modules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl border border-slate-900 bg-slate-950/80 space-y-3">
                  <h4 className="text-xs font-mono text-rose-400 font-bold uppercase flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Operational Friction
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Receptionists miss over 42% of incoming patient queries during busy hospital surgical shifts, resulting in cold leads and negative reviews.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-900 bg-slate-950/80 space-y-3">
                  <h4 className="text-xs font-mono text-blue-400 font-bold uppercase flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Strategic Strategy
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Deploy meta cloud WhatsApp API nodes synced to localized Google Calendars. Autonomous AgenticOS outbound dialers ring unresponsive leads in 45s.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-900 bg-slate-950/80 space-y-3">
                  <h4 className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Measurable Return
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Patient scheduling volume soared by 220% within 14 days of launch. Reception team admin saved over 160 manual workflow hours per month.
                  </p>
                </div>
              </div>

              {/* Progress timeline */}
              <div className="border-t border-slate-900 pt-6 space-y-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Personalized 90-Day Transform Timeline</span>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                    <span className="text-purple-400 font-bold block">Days 1-15:</span>
                    <span className="text-slate-300 block mt-0.5">Quick Wins (CRM setup)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                    <span className="text-[#00C2FF] font-bold block">Days 16-45:</span>
                    <span className="text-slate-300 block mt-0.5">WhatsApp automated brochure catalogs</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                    <span className="text-emerald-400 font-bold block">Days 46-75:</span>
                    <span className="text-slate-300 block mt-0.5">AI Voice calling integrations</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                    <span className="text-yellow-400 font-bold block">Days 76-90:</span>
                    <span className="text-slate-300 block mt-0.5">AgenticOS automated retainers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TESTIMONIALS: "Businesses Improving With AI"
           ========================================== */}
        {!assessmentStarted && (
          <div className="mb-24 space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">Verifiable Success</span>
              <h2 className="text-3xl font-bold font-display text-white">Businesses Improving With AI</h2>
              <p className="text-xs text-slate-400">
                Hear from growing managers who migrated manual spreadsheets to unified automation dashboards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { client: 'Dr. Vivek Singhal', company: 'Vanguard Joints Center', quote: 'Our front-desk missed over 40% of bookings during surge surgery hours. Switching to WhatsApp automation expanded booked calendars by 220% in weeks.', stat: '220% Booking Growth' },
                { client: 'Aditi Khanna', company: 'Khanna Corporate Law', quote: 'Drafting legal agreements manually took my associates hours. The proposal agents compile custom contracts in 5 minutes, boosting close-won ratios.', stat: 'Saved 140 Admin Hrs/Mo' },
                { client: 'Rajesh Nair', company: 'Summit Academy Group', quote: 'Admissions inquiries arrived at midnight across multiple timezones. Deploying a multilingual AI counselor raised student enrollments by 3X.', stat: '3X Admissions Increase' }
              ].map((testi, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 flex flex-col justify-between relative space-y-4">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "{testi.quote}"
                  </p>

                  <div className="border-t border-slate-900 pt-4 flex justify-between items-center mt-2">
                    <div>
                      <span className="text-xs font-bold text-white block">{testi.client}</span>
                      <span className="text-[9px] font-mono text-slate-500 block">{testi.company}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                      {testi.stat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            FAQ SECTION (15 items)
           ========================================== */}
        {!assessmentStarted && (
          <div className="mb-24 space-y-10 text-left max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">Diagnostics Help</span>
              <h2 className="text-3xl font-bold font-display text-white">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-400">
                15 foundational questions and answers concerning AI maturity, CRM integrations, and strategic roadmaps.
              </p>
            </div>

            <div className="space-y-3.5 pt-4">
              {faqList.map((faq, idx) => {
                const isOpen = faqOpenIdx === idx;
                return (
                  <div key={idx} className="rounded-xl border border-slate-900 bg-slate-950/40 overflow-hidden transition-all">
                    <button
                      onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex justify-between items-center gap-4 text-white hover:text-[#00C2FF] transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-bold font-display">{faq.q}</span>
                      <ChevronDown className={`h-4.5 w-4.5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-slate-900/60 text-xs text-slate-400 leading-relaxed font-sans bg-slate-950/80">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==========================================
            FINAL CTA SECTION
           ========================================== */}
        {!assessmentStarted && !assessmentCompleted && (
          <div className="p-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-transparent rounded-3xl mb-12 text-center">
            <div className="p-8 sm:p-14 rounded-3xl border border-slate-900 bg-slate-950 relative overflow-hidden space-y-6">
              <div className="absolute top-0 left-0 w-44 h-44 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold uppercase">
                <Plus className="h-3 w-3" /> Zero Commitment Audit
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white max-w-2xl mx-auto">
                Discover Your AI Growth Potential
              </h2>

              <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                Take a 5-minute interactive assessment and receive your AI Maturity Score along with a personalized growth roadmap.
              </p>

              <div className="pt-2 flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-extrabold rounded-lg shadow-lg text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  Start Grader <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPath('contact')}
                  className="px-6 py-3 rounded-lg border border-slate-800 bg-slate-950/50 hover:bg-slate-900 text-xs font-semibold text-slate-300 transition-all"
                >
                  Talk To AI Experts
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
