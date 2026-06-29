import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  Search, 
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
  ChevronRight, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Send,
  Sliders,
  DollarSign,
  Plus,
  RefreshCw,
  Clock,
  Phone,
  Shield,
  Briefcase,
  Lock,
  X,
  Volume2,
  Bookmark,
  Database,
  Mail,
  Building,
  CheckSquare,
  Activity,
  Calendar,
  Stethoscope,
  MapPin,
  Heart,
  UserCheck,
  Smile,
  Percent,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { RoutePath } from '../types';

export default function IndustryHealthcare({ setPath, darkMode }: { setPath: (path: RoutePath) => void; darkMode: boolean }) {
  useEffect(() => {
    document.title = "AI Solutions for Hospitals, Clinics & Healthcare Providers | Natton Digital";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ==========================================
  // HERO PARTICLE MESH BACKGROUND (Canvas)
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 60;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }> = [];

    const colors = [
      'rgba(45, 212, 191, 0.45)', // Teal
      'rgba(14, 165, 233, 0.45)', // Sky Blue
      'rgba(139, 92, 246, 0.35)', // Purple
      'rgba(255, 255, 255, 0.25)' // Pure White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 50;
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

      // Interconnect particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.pulse += 0.015;
        const radius = p.radius + Math.sin(p.pulse) * 0.6;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Keep inside bounds
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
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
  // SECTION 1: 3D SMART HOSPITAL ECOSYSTEM (Interactive Canvas/Nodes)
  // ==========================================
  const [selectedEcoNode, setSelectedEcoNode] = useState<string>('hospital');
  const ecoNodes = [
    {
      id: 'hospital',
      title: 'Hospitals & Clinics',
      desc: 'The clinical epicenter. Real-time patient directories (EHR), consultant schedules, and triage nodes.',
      features: ['Automatic Roster Sync', 'Direct EMR Updates', 'Multi-Specialty Allocation'],
      color: 'text-teal-400 bg-teal-500/10 border-teal-400/30'
    },
    {
      id: 'ai_agents',
      title: 'Cognitive AI Swarms',
      desc: 'Autonomous virtual assistants checking physician rosters, drafting answers, and coordinating billing files.',
      features: ['Patient Support Agent', 'Appointment Agent', 'Feedback Agent'],
      color: 'text-sky-400 bg-sky-500/10 border-sky-400/30'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Automation',
      desc: 'Highly interactive Meta Business channels delivering instant booking QR codes and treatment reminders.',
      features: ['98% Open Rate', 'Two-Way Interactive Triggers', 'Official WhatsApp API'],
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-400/30'
    },
    {
      id: 'telephony',
      title: 'Cloud Telephony & AI Calling',
      desc: 'Outbound and inbound smart voice agents talking over secure SIP trunk lines with human-like cadence.',
      features: ['Automated Missed Call Back', 'Instant Appointment Booking', 'Outpatient Followups'],
      color: 'text-purple-400 bg-purple-500/10 border-purple-400/30'
    },
    {
      id: 'crm',
      title: 'GrowthOS™ CRM Dashboard',
      desc: 'Unified patient pipeline tracking lead sourcing, scheduling outcomes, and feedback sentiments.',
      features: ['GHL / HubSpot Direct Sync', 'Custom Diagnostic Pipelines', 'SLA Miss Alerts'],
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-400/30'
    }
  ];

  // ==========================================
  // SECTION 4: SOLUTION BLUEPRINT DIAGRAM
  // ==========================================
  const blueprintSteps = [
    { id: 'web', name: 'Premium Website', status: 'Active Intake Channel', detail: 'SEO-optimized, lighting fast clinic landing pages with native appointment booking widgets.' },
    { id: 'seo', name: 'SEO + AEO Optimization', status: 'Organic Engine', detail: 'Dominating local Google searches (e.g. "Dental Clinic Near Me") and LLM Search Grounding.' },
    { id: 'ads', name: 'Targeted Google Ads', status: 'High-Intent Acquisition', detail: 'Surgical ad setups targeting specific medical keywords with smart negative exclusions.' },
    { id: 'crm', name: 'Centralized CRM Node', status: 'Zero Lead Leakage', detail: 'Instant intake capture into medical pipelines with precise patient profiles.' },
    { id: 'whatsapp', name: 'WhatsApp Automations', status: 'Omnichannel Chat', detail: 'Automated welcome message triggers and interactive choice menus within 10 seconds of opt-in.' },
    { id: 'voice', name: 'AI Smart Calling', status: '24/7 Voip Dialers', detail: 'Dialing back missed calls within 45 seconds or running automated booking calls.' },
    { id: 'booking', name: 'Appointment Confirmed', status: 'Calendar Integration', detail: 'Synchronizing bookings directly to selected doctor rosters with zero overlap errors.' },
    { id: 'followup', name: 'Post-Visit Followup', status: 'Patient Retention', detail: 'Post-treatment reviews, custom digital prescriptions, and prescription reminders dispatched automatically.' },
    { id: 'review', name: 'Review Collection', status: 'Reputation Shield', detail: 'Auto-requesting Google Maps stars. Unhappy patients are flagged to administrators for resolution.' }
  ];
  const [hoveredBlueprintStep, setHoveredBlueprintStep] = useState<number | null>(null);

  // ==========================================
  // SECTION 5: AI GROWTH MARKETING (Interactive Dashboard)
  // ==========================================
  const [marketingPeriod, setMarketingPeriod] = useState<'30d' | '90d'>('30d');
  const [activeMktTab, setActiveMktTab] = useState<'seo' | 'ads' | 'local'>('seo');

  const mktData = {
    seo: {
      metrics: [
        { label: 'Organic Monthly Searches', value: '42,912', change: '+24.1%', status: 'up' },
        { label: 'AEO (AI Search Engine Matches)', value: '8,410', change: '+114%', status: 'up' },
        { label: 'Keywords in Top 3 Positions', value: '118', change: '+18%', status: 'up' }
      ],
      keywords: [
        { term: 'best diagnostic center nearby', rank: '#1', volume: '2,400/mo', trend: 'Growing' },
        { term: 'emergency orthopedic hospital', rank: '#2', volume: '1,800/mo', trend: 'Surging' },
        { term: 'advanced dental implants clinic', rank: '#1', volume: '1,200/mo', trend: 'Stable' },
        { term: 'painless root canal cost', rank: '#3', volume: '950/mo', trend: 'Growing' }
      ]
    },
    ads: {
      metrics: [
        { label: 'Google Ads CPC (Average)', value: '₹34.20', change: '-18.4%', status: 'down' },
        { label: 'Cost Per Qualified Lead (CPL)', value: '₹145.00', change: '-32%', status: 'down' },
        { label: 'Ad Conversion Rate', value: '11.8%', change: '+4.2%', status: 'up' }
      ],
      campaigns: [
        { name: 'Intake Search - General Practice', budget: '₹1,500/day', leads: '324', cpl: '₹132' },
        { name: 'Dental Implants High-Intent CPC', budget: '₹2,500/day', leads: '142', cpl: '₹210' },
        { name: 'Diagnostic Health Package Leads', budget: '₹1,200/day', leads: '411', cpl: '₹94' }
      ]
    },
    local: {
      metrics: [
        { label: 'Google Maps Monthly Views', value: '184,200', change: '+38%', status: 'up' },
        { label: 'GBP Driving Directions Fired', value: '4,110', change: '+29%', status: 'up' },
        { label: 'Phone Call Actions Clicked', value: '2,942', change: '+44%', status: 'up' }
      ],
      locations: [
        { branch: 'Downtown Multispecialty Hub', mapsRank: '#1', phoneCalls: '1,240', directions: '1,890' },
        { branch: 'West Diagnostic Annex', mapsRank: '#2', phoneCalls: '890', directions: '1,120' },
        { branch: 'East IVF Center of Excellence', mapsRank: '#1', phoneCalls: '812', directions: '1,100' }
      ]
    }
  };

  // ==========================================
  // SECTION 6: GROWTHOS™ CLINIC CRM PREVIEW
  // ==========================================
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pat_1');
  const patientsList = [
    { id: 'pat_1', name: 'Aarav Sharma', age: 41, speciality: 'Orthopedics', date: 'Today, 10:30 AM', status: 'Confirmed', phone: '+91 98765 43210', statusColor: 'text-teal-400 bg-teal-500/10' },
    { id: 'pat_2', name: 'Priya Iyer', age: 29, speciality: 'Dental', date: 'Today, 11:45 AM', status: 'Checked In', phone: '+91 99112 23344', statusColor: 'text-sky-400 bg-sky-500/10' },
    { id: 'pat_3', name: 'Dr. Vivek Mehra (Consultant)', age: 52, speciality: 'Cardiology', date: 'Today, 2:15 PM', status: 'On Call', phone: '+91 98123 45678', statusColor: 'text-purple-400 bg-purple-500/10' },
    { id: 'pat_4', name: 'Meera Deshmukh', age: 35, speciality: 'IVF Consultation', date: 'Tomorrow, 9:00 AM', status: 'Reminder Sent', phone: '+91 97765 88990', statusColor: 'text-amber-400 bg-amber-500/10' }
  ];
  const patientDetails: Record<string, { notes: string; timeline: Array<{ time: string; event: string; tag: string }> }> = {
    pat_1: {
      notes: 'Patient Aarav Sharma complains of acute right knee strain. First-time visitor. Lead captured via Facebook Ortho Ad, auto-opted into WhatsApp reminder loop.',
      timeline: [
        { time: '09:12 AM', event: 'WhatsApp intake confirmation dispatched', tag: 'Automation' },
        { time: '09:05 AM', event: 'Assigned to Dr. Rajesh Verma (Orthopedics)', tag: 'Intake CRM' },
        { time: '09:00 AM', event: 'Lead captured via Google Ad Form', tag: 'Sourcing' }
      ]
    },
    pat_2: {
      notes: 'Priya Iyer scheduled for premium aesthetic dental veneers consultation. Verified pre-consultation scans uploaded via chat channel.',
      timeline: [
        { time: '11:10 AM', event: 'Patient checked in at front desk console', tag: 'Reception' },
        { time: 'Yesterday', event: 'Pre-consultation scan PDF uploaded', tag: 'WhatsApp' },
        { time: '2 days ago', event: 'Appointment confirmed with Dr. Gupta', tag: 'AI Call' }
      ]
    },
    pat_3: {
      notes: 'Dr. Vivek Mehra visiting as senior cardiologist consultant. Automated check-in sync completed across clinic panels.',
      timeline: [
        { time: '08:00 AM', event: 'Consultant roster verified and published', tag: 'System' },
        { time: '3 days ago', event: 'Roster exceptions adjusted by supervisor', tag: 'Manual' }
      ]
    },
    pat_4: {
      notes: 'Meera Deshmukh scheduled for preliminary IVF counseling. Standard questionnaire PDF sent.',
      timeline: [
        { time: '10:00 AM', event: 'WhatsApp IVR questions answered', tag: 'AI Agent' },
        { time: 'Yesterday', event: 'Intake scheduled automatically', tag: 'Booking' }
      ]
    }
  };

  // ==========================================
  // SECTION 7: BUSINESSOS™ SIMULATED WHATSAPP INBOX & AI CALLING
  // ==========================================
  const [waMessages, setWaMessages] = useState([
    { sender: 'user', text: 'Hi, I missed a call from your clinic. Can I book an appointment with Dr. Roy?', time: '04:12 PM' },
    { sender: 'system', text: 'Hello! This is Dr. Roy’s Assistant at Radiant Clinic. Yes, absolutely! I can help you book right here on WhatsApp.', time: '04:12 PM' },
    { sender: 'system', text: 'Dr. Roy is available tomorrow (Monday) at: \n1️⃣ 10:00 AM\n2️⃣ 02:30 PM\n3️⃣ 05:00 PM\n\nPlease select an option by typing 1, 2, or 3.', time: '04:13 PM' }
  ]);
  const [newWaMessage, setNewWaMessage] = useState('');
  const [isWaTyping, setIsWaTyping] = useState(false);

  const sendWaMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWaMessage.trim()) return;

    const userMsg = { sender: 'user', text: newWaMessage, time: '04:14 PM' };
    setWaMessages(prev => [...prev, userMsg]);
    const input = newWaMessage;
    setNewWaMessage('');
    setIsWaTyping(true);

    setTimeout(() => {
      let replyText = 'Thanks! I am checking our clinic database...';
      if (input.includes('1') || input.toLowerCase().includes('ten') || input.toLowerCase().includes('morning')) {
        replyText = '🎉 Confirmed! Appointment scheduled with Dr. Roy tomorrow at 10:00 AM.\n\nYour Booking ID is #RAD-9410. A WhatsApp QR Code has been synchronized to your profile for easy check-in at the counter.';
      } else if (input.includes('2') || input.includes('3')) {
        replyText = '🎉 Perfect! Booking finalized for your selected slot. Your booking confirmation has been uploaded to the front-desk CRM. See you tomorrow!';
      } else {
        replyText = 'No problem! I have notified Dr. Roy’s coordinator. They will call you shortly on this number to coordinate. Have a healthy day!';
      }

      setWaMessages(prev => [...prev, { sender: 'system', text: replyText, time: '04:15 PM' }]);
      setIsWaTyping(false);
    }, 1500);
  };

  // ==========================================
  // SECTION 8: AGENTICOS™ FOR HEALTHCARE (3D AI AGENT NETWORK)
  // ==========================================
  const [activeHealthcareAgent, setActiveHealthcareAgent] = useState<string>('support');
  const healthcareAgents = [
    {
      id: 'support',
      name: 'Patient Support Agent',
      icon: MessageSquare,
      role: 'Resolves FAQs about treatment prep, diagnostic prerequisites, and clinic directions instantly.',
      prompt: 'SYSTEM: Access clinical guidelines database. If patient asks about fasting rules for blood tests, retrieve fasting duration parameters (e.g. 10-12 hours). Answer warmly.',
      metrics: '94% deflection rate, under 5s response SLA'
    },
    {
      id: 'appointment',
      name: 'Appointment Agent',
      icon: Calendar,
      role: 'Checks live EMR schedules, books consult slots, handles cancellations, and updates doctor rosters.',
      prompt: 'SYSTEM: Match client input against Dr. Verma’s active calendar nodes. Lock requested slot, dispatch Stripe payment link if required, and push booking ID to EHR.',
      metrics: 'Zero overlap errors, 3.2x faster scheduling'
    },
    {
      id: 'feedback',
      name: 'Feedback Agent',
      icon: Smile,
      role: 'Triggers sentiment analysis after patient checkout, captures reviews, and flags complaints.',
      prompt: 'SYSTEM: Send patient rating prompts 2 hours post-checkout. If rating is 4 or 5 stars, dispatch Google Maps link. If 1-3 stars, alert clinic head immediately.',
      metrics: '340% increase in 5-star Google Reviews'
    },
    {
      id: 'billing',
      name: 'Billing Agent',
      icon: DollarSign,
      role: 'Reconciles payment collection nodes, issues digital receipts, and audits Tally ledger writes.',
      prompt: 'SYSTEM: Intercept payment receipt records from Razorpay webhooks. Generate GST tax invoice PDFs and upload directly to QuickBooks / Tally.',
      metrics: '100% financial discrepancy elimination'
    },
    {
      id: 'reception',
      name: 'Reception Assistant',
      icon: Users,
      role: 'Greets physical walk-ins, scans digital check-in QR codes, and manages doctor queue displays.',
      prompt: 'SYSTEM: Read QR codes from patient WhatsApp screens, update lobby display monitors, and alert respective doctor cabins.',
      metrics: 'Reduces front-desk lobby queue times by 75%'
    }
  ];

  // ==========================================
  // SECTION 9: AUTOMATION WORKFLOWS (React Flow style)
  // ==========================================
  const [activeFlowPreset, setActiveFlowPreset] = useState<number>(0);
  const flowPresets = [
    {
      title: 'Lead → Appointment → Reminder → Visit → Feedback',
      desc: 'Complete end-to-end patient life-cycle. Maximizes conversion rates and Google reviews.',
      nodes: [
        { label: 'Google Ad click', desc: 'Patient searches and clicks Orthopedic Clinic Ad' },
        { label: 'Instant CRM Capture', desc: 'Name & Phone saved in GrowthOS™' },
        { label: 'WhatsApp Intake Bot', desc: 'Offers appointment slots under 10 seconds' },
        { label: 'Roster Synced', desc: 'Doctor calendar blocked' },
        { label: 'Voice AI Reminder', desc: 'Fires automated call 2 hours prior' },
        { label: 'Lobby Check-in', desc: 'QR code scanned at front-desk counter' },
        { label: 'Review Request', desc: 'Feedback Agent logs a 5-star review' }
      ]
    },
    {
      title: 'Missed Call → WhatsApp Chat → Automated Booking',
      desc: 'Instantly captures lost patient leads. Prevents patients from dialing other competitors.',
      nodes: [
        { label: 'Missed Inbound Call', desc: 'All front desk reception lines are busy' },
        { label: 'Telephony Webhook', desc: 'Fires within 200ms of disconnect' },
        { label: 'WhatsApp Message Send', desc: '"Sorry we missed you! Click here to book"' },
        { label: 'AI Interactive Dialogue', desc: 'Matches patient to open neurology slots' },
        { label: 'Instant Confirmation', desc: 'Appointment locked on Google Calendar' }
      ]
    },
    {
      title: 'Post-Treatment Followup → Chronic Care Reminders',
      desc: 'Secures high lifetime value and coordinates preventative healthcare checkups.',
      nodes: [
        { label: 'Outpatient Checked Out', desc: 'Marked "Completed" on GrowthOS™ EHR' },
        { label: 'Delay Node (3 Days)', desc: 'System waits for recovery stabilization' },
        { label: 'WhatsApp Health Survey', desc: 'Asks: "How is your healing progress?"' },
        { label: 'Prescription Alerts', desc: 'Dispatches custom medication alarms daily' },
        { label: 'Diagnostic Recall', desc: 'Schedules 30-day followup blood panel' }
      ]
    }
  ];

  // ==========================================
  // SECTION 11: HEALTHCARE ROI CALCULATOR
  // ==========================================
  const [monthlyPatients, setMonthlyPatients] = useState<number>(250);
  const [avgRevenuePerPatient, setAvgRevenuePerPatient] = useState<number>(3500); // INR
  const [missedAppointmentsPercent, setMissedAppointmentsPercent] = useState<number>(20);
  const [mktBudget, setMktBudget] = useState<number>(45000); // INR

  // Formulas
  // 1. Current lost revenue from missed appointments:
  // (monthlyPatients * (missedAppointmentsPercent / 100)) * avgRevenuePerPatient
  const lostRevenue = Math.round((monthlyPatients * (missedAppointmentsPercent / 100)) * avgRevenuePerPatient);
  
  // 2. Additional revenue generated by saving 75% of missed appointments + 15% patient acquisition boost:
  const appointmentsSaved = Math.round(monthlyPatients * (missedAppointmentsPercent / 100) * 0.75);
  const savedAppointmentsRev = appointmentsSaved * avgRevenuePerPatient;
  const acquisitionBoostRev = Math.round(monthlyPatients * 0.15 * avgRevenuePerPatient);
  const additionalRevenueTotal = savedAppointmentsRev + acquisitionBoostRev;
  
  // 3. ROI Percentage: ((Additional Revenue - Marketing Budget) / Marketing Budget) * 100
  const roiPercentage = Math.round(((additionalRevenueTotal - mktBudget) / mktBudget) * 100);

  // Helper currency formatting
  const formatCur = (num: number) => {
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} Lakh`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // ==========================================
  // SECTION 12: CASE STUDIES (Carousel)
  // ==========================================
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);
  const caseStudies = [
    {
      title: 'Leading Orthopedic Clinic in Mumbai',
      metric: '82% Booking Deflection',
      duration: '4 Months Implementation',
      challenge: 'Overwhelming reception call volumes during mornings led to over 35% missed calls and massive scheduling delays.',
      solution: 'Deployed dual outbound AI Calling Nodes and automated WhatsApp CRM scheduling directly mapped to doctor rosters.',
      roi: 'Saved ₹1.8L monthly in staffing overhead; zero missed calls recorded.',
      icon: Activity,
      stats: [
        { label: 'Missed Calls', before: '35%', after: '< 1%' },
        { label: 'Lobby Wait Time', before: '42m', after: '8m' },
        { label: 'New Patient Bookings', before: '140/mo', after: '245/mo' }
      ]
    },
    {
      title: 'Premium Aesthetic Dental Swarm in Delhi',
      metric: '3.4x Google Map Actions',
      duration: '6 Months Implementation',
      challenge: 'High cost per lead on Google Ads (₹650+) and lack of patient review collection pipelines.',
      solution: 'GrowthOS™ Local SEO blueprints implemented with WhatsApp automated feedback agents requesting review ratings post-treatment.',
      roi: 'Fitted 318 new dental crowns; GBP phone triggers increased by 240%.',
      icon: Stethoscope,
      stats: [
        { label: 'Cost Per Lead', before: '₹680', after: '₹145' },
        { label: 'Google 5-Star Reviews', before: '42 total', after: '412 total' },
        { label: 'Conversion Rate', before: '4.1%', after: '12.4%' }
      ]
    },
    {
      title: 'Advanced Diagnostic Center Chain',
      metric: '92% Fast Report Delivery',
      duration: '3 Months Implementation',
      challenge: 'Patient support coordinators spent 6 hours/day manually searching and emailing PDF lab reports to patients.',
      solution: 'AgenticOS™ Knowledge database integrated directly with laboratory reports. Patients query WhatsApp to download reports securely.',
      roi: 'Pruned lab turnaround friction to absolute zero; zero manual emailing required.',
      icon: Database,
      stats: [
        { label: 'Manual Admin Hours', before: '6 hrs/day', after: '0 hrs/day' },
        { label: 'Turnaround speed', before: '24 hrs', after: 'Instant' },
        { label: 'Patient Retention Rate', before: '58%', after: '84%' }
      ]
    },
    {
      title: 'Apex Eye Hospital & Lasik Center',
      metric: '85% No-Show Reduction',
      duration: '5 Months Implementation',
      challenge: 'Surgical patient no-show rates reached 28%, wasting valuable consultant roster timings.',
      solution: 'Interactive Missed Call automated dialers and twoway SMS reminders with direct cancellation logs.',
      roi: 'Fully booked active surgical theaters daily; 0 roster gaps.',
      icon: Eye,
      stats: [
        { label: 'Surgical No-Show Rate', before: '28%', after: '3.4%' },
        { label: 'Theater Utilization', before: '72%', after: '97%' },
        { label: 'Followup Compliance', before: '41%', after: '89%' }
      ]
    }
  ];

  // ==========================================
  // SECTION 13: COMPARISON TABLE
  // ==========================================
  const comparisonRows = [
    { cap: 'Intake Automation Speed', natton: 'Instant (< 10 seconds via WhatsApp Bot)', trad: '2 to 24 hours (Manual callback)', generic: 'Fragmented manual webforms only' },
    { cap: 'Roster EHR System Syncing', natton: 'Bidirectional Real-Time API mapping', trad: 'Manual doctor roster adjustments', generic: 'Siloed calendars with zero clinic mapping' },
    { cap: 'Missed Call Recuperation', natton: 'Automated VoIP dialback under 45s', trad: 'Lost completely inside call sheets', generic: 'No smart telephony capabilities' },
    { cap: 'SLA Feedback Sentiments', natton: 'AI Sentiment Alerts flagging bad reviews', trad: 'No proactive followups', generic: 'Static email requests getting spammed' },
    { cap: 'HIPAA & Consent Compliant', natton: 'Full AES-256 secure storage perimeters', trad: 'Paper logs on clipboard rosters', generic: 'Standard generic consumer templates' },
    { cap: 'Local Indian CRM integrations', natton: 'Direct n8n webhook syncs (Tally, GHL)', trad: 'None (Agency just runs raw ads)', generic: 'Requires expensive third-party setups' }
  ];

  // ==========================================
  // SECTION 14: FAQS (15 customized questions)
  // ==========================================
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const faqsList = [
    { q: 'Is the system compliant with healthcare standards like HIPAA?', a: 'Yes. All data pipelines, patient files, and check-in QR codes utilize AES-256 local encrypted sandboxes and SSL perimeters. We never transmit patient-identifiable healthcare data to public LLM training logs.' },
    { q: 'Can we integrate Natton Digital with our existing hospital EHR software?', a: 'Absolutely. We support bidirectional API integration and n8n secure webhook routing to sync calendars and patients directly with standard systems like Tally, LeadSquared, Zoho, HubSpot, or proprietary EHR databases.' },
    { q: 'How does the WhatsApp Patient Intake Bot verify appointments?', a: 'Upon booking or confirmation, the WhatsApp Bot generates a unique digital QR check-in token. The patient displays this on their mobile screen at the front counter, and a lobby terminal scans it to update the CRM queue immediately.' },
    { q: 'What happens if a patient tries to reschedule via the AI Calling Agent?', a: 'The AI Smart Calling Voice Agent accesses live calendar slots. If the patient requests a change, the agent reads the new roster availability, locks the selected slot, and frees up the old appointment instantly.' },
    { q: 'Does the AI Voice Agent support Hindi and regional Indian languages?', a: 'Yes. Our smart spoken voice modules support clean conversational accents across English, Hindi, Tamil, Telugu, Kannada, Bengali, and Marathi.' },
    { q: 'What is the "Missed Call Auto-Recovery" feature?', a: 'If a potential patient calls your clinic lines and all reception staff are occupied, the telephony node intercepts the missed call log. Within 45 seconds, an automated friendly WhatsApp message is sent to that caller offering immediate booking slots.' },
    { q: 'Can the CRM automatically route dental and orthopedic leads to different doctors?', a: 'Yes. The GrowthOS™ custom pipeline engine filters intake metadata by department or specialty, dynamically assigning patient records to specific doctors or consultants.' },
    { q: 'How long does it take to deploy a complete clinic automation system?', a: 'Simple templates can be live within 72 hours. Complete bidirectional enterprise hospital integrations are typically mapped and deployed by our engineers within 10 to 14 business days.' },
    { q: 'Does the system require our staff to learn complex programming?', a: 'No programming or technical expertise is required. We build a highly intuitive drag-and-drop lobby visualizer and team inbox. Your staff will be comfortable using it on day one.' },
    { q: 'How do you prevent AI agents from overlapping or double-booking doctors?', a: 'We implement strict "Atomic Lock Gates" on doctor calendars. When an AI agent drafts or confirms a booking, the slot is locked immediately, preventing parallel overlaps.' },
    { q: 'Can we send bulk WhatsApp health reminder broadcasts to patients?', a: 'Yes. Mapped directly onto official Meta Cloud WhatsApp APIs, you can safely broadcast personalized wellness reminders, immunization details, or holiday medical packages.' },
    { q: 'How does the Reputation Shield / Review Management system work?', a: '2 hours post-visit, the Feedback Agent requests a review rating. If the patient submits 4 or 5 stars, the bot redirects them to your live Google Maps location. If they select 1-3 stars, the rating is kept private and escalated to the clinic manager for immediate callback.' },
    { q: 'Can we host our patient directories on our private cloud server?', a: 'Yes. Enterprise tiers support private Google Cloud perimeter nodes, AWS hosting, Vercel Edge, or complete on-premise local servers for absolute sovereign database control.' },
    { q: 'What is the deflection rate of receptionist work using AgenticOS™?', a: 'Our clients experience an average of 75% receptionist task deflection, freeing front-desk coordinators from answering repetitive queries and dialing reminders.' },
    { q: 'Do you charge transaction fees on Stripe or UPI invoice settlements?', a: 'Natton Digital never charges any transaction commissions. You connect your standard Razorpay, Stripe, or bank UPI accounts directly to the BusinessOS™ ledger.' }
  ];

  // ==========================================
  // SECTION 15: HIGH CONVERTING LEAD FORM
  // ==========================================
  const [formState, setFormState] = useState({
    fullName: '',
    clinicName: '',
    speciality: 'Hospitals',
    location: '',
    email: '',
    phone: '',
    monthlyPatients: '100 - 300',
    challenges: '',
    message: ''
  });
  const [captchaSum1, setCaptchaSum1] = useState(0);
  const [captchaSum2, setCaptchaSum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [integrationLogs, setIntegrationLogs] = useState<string[]>([]);

  useEffect(() => {
    setCaptchaSum1(Math.floor(Math.random() * 8) + 1);
    setCaptchaSum2(Math.floor(Math.random() * 8) + 1);
  }, []);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaAnswer) !== (captchaSum1 + captchaSum2)) {
      alert('Verification sum is incorrect. Please calculate again.');
      return;
    }

    setFormSubmitting(true);
    setIntegrationLogs([
      'Intercepting clinical contact lead payload...',
      'Mapping attributes to GoHighLevel API schema...',
      'Firing secure n8n integration webhook node...',
      'Triggering administrative Slack notify channel...'
    ]);

    setTimeout(() => {
      setIntegrationLogs(prev => [
        ...prev,
        'Sync successful. Created Contact ID: GHL_HLTH_9410',
        'Fired welcoming confirmation sequence via Email/WhatsApp API.'
      ]);
      setTimeout(() => {
        setFormSubmitting(false);
        setFormSuccess(true);
      }, 1000);
    }, 1800);
  };

  return (
    <div className="bg-[#020514] text-white min-h-screen py-8 overflow-hidden relative selection:bg-teal-500 selection:text-black">
      
      {/* Background Lighting Orbs */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-teal-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] left-0 w-[600px] h-[600px] bg-blue-950/20 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-5 right-1/4 w-[750px] h-[750px] bg-purple-950/15 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 text-xs font-mono text-gray-500 flex items-center gap-1.5 border-b border-white/5 pb-4">
          <button onClick={() => setPath('home')} className="hover:text-teal-400 transition-colors">Home</button> 
          <span>/</span> 
          <span className="text-gray-400">Industries</span> 
          <span>/</span> 
          <span className="text-teal-400 font-semibold">Healthcare</span>
        </div>

        {/* ==========================================
            HERO SECTION (Particle Canvas Background)
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 relative min-h-[520px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden -z-20 border border-white/5 bg-slate-950/30">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          </div>

          <div className="lg:col-span-7 space-y-6 z-10 p-6 sm:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30">
              <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-teal-300 font-bold">
                Premium Healthcare Automation Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight">
              AI-Powered Growth <br />
              <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Solutions For Healthcare
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-gray-400 max-w-2xl">
              Acquire more patients, automate repetitive appointments, and deliver exceptional clinical experiences. Discover our fully secure, bidirectional systems engineered to sync EMR records and maximize your medical practice outcomes.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#lead_form" 
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black font-bold rounded-lg shadow-lg hover:shadow-teal-500/20 transition-all flex items-center gap-2 text-sm"
              >
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#ecosystem" 
                className="px-6 py-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-teal-400 transition-all flex items-center gap-2 text-sm font-semibold"
              >
                View Healthcare Solutions
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 text-[10px] font-mono text-gray-500 border-t border-white/5">
              <span className="flex items-center gap-1.5 text-teal-400">● AES-256 Secured Logs</span>
              <span className="flex items-center gap-1.5 text-cyan-400">● 94% Patient Satisfaction</span>
              <span className="flex items-center gap-1.5 text-indigo-400">● Zero Lobby Congestion</span>
            </div>
          </div>

          {/* 3D Smart Hospital Ecosystem Visualizer */}
          <div className="lg:col-span-5 p-1 relative min-h-[380px] z-10">
            <div className="h-full w-full rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md p-6 flex flex-col justify-between shadow-2xl">
              
              <div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
                  <span className="text-[10px] font-mono uppercase text-teal-400 flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5 animate-pulse text-teal-400" /> 3D SMART HOSPITAL ECOSYSTEM
                  </span>
                  <span className="text-[9px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded font-mono font-bold">CONNECTED</span>
                </div>
                <p className="text-[11px] text-gray-400 mb-4">
                  Explore how patients, voice lines, WhatsApp, and database registries interact dynamically across our network. Click any node below to simulate active logs:
                </p>
              </div>

              {/* Dynamic Connecting Mesh Simulation */}
              <div className="relative py-8 bg-black/40 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[180px] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.08),transparent)]" />
                
                {/* Visual lines connecting circles */}
                <div className="flex items-center justify-center gap-6 relative z-10 flex-wrap px-4">
                  {ecoNodes.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setSelectedEcoNode(n.id)}
                      className={`h-11 w-11 rounded-full flex items-center justify-center transition-all ${
                        selectedEcoNode === n.id 
                          ? 'bg-teal-400 text-black scale-110 shadow-[0_0_15px_rgba(45,212,191,0.5)] border-2 border-white' 
                          : 'bg-slate-900 text-gray-400 hover:text-white border border-white/10'
                      }`}
                      title={n.title}
                    >
                      <span className="text-[9px] font-mono font-bold uppercase">{n.id.substring(0, 4)}</span>
                    </button>
                  ))}
                </div>

                {/* Simulated connection animation */}
                <div className="mt-4 text-[10px] font-mono text-teal-400/80 animate-pulse">
                  ⚡ Active Node: {ecoNodes.find(n => n.id === selectedEcoNode)?.title}
                </div>
              </div>

              {/* Current Node Details */}
              <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-left">
                {ecoNodes.map((n) => {
                  if (n.id !== selectedEcoNode) return null;
                  return (
                    <div key={n.id} className="space-y-1.5 animate-fade-in">
                      <h4 className="text-xs font-bold text-teal-300 font-display">{n.title}</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed">{n.desc}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {n.features.map((f, i) => (
                          <span key={i} className="text-[8px] font-mono bg-teal-500/10 text-teal-400 px-1.5 py-0.5 rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            TRUSTED (Solutions Built For)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">Tailored Care Models</span>
            <h2 className="text-3xl font-bold font-display">Solutions Built For</h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              Our automated layouts are custom-configured to accommodate the unique operational needs of diverse healthcare organizations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Hospitals', icon: Building, desc: 'Enterprise bed rosters, multi-tier staff coordination, and high-volume billing ledger syncs.' },
              { label: 'Multi-Speciality Clinics', icon: Activity, desc: 'Dynamic patient routing to dedicated orthopedics, cardiology, or pediatrics panels.' },
              { label: 'Dental Clinics', icon: Stethoscope, desc: 'Aesthetic veneers high-intent ad pipelines, before-after galleries, and maps SEO.' },
              { label: 'Eye Hospitals', icon: Eye, desc: 'Lasik and cataract appointment confirmations and surgical roster scheduling.' },
              { label: 'Diagnostic Centers', icon: Database, desc: 'Secure medical report search triggers directly inside localized WhatsApp nodes.' },
              { label: 'IVF Centers', icon: Heart, desc: 'High-touch warm consultation triggers and multi-week patient questionnaire tracking.' },
              { label: 'Physiotherapy Clinics', icon: UserCheck, desc: 'Weekly exercise routine checklists and automated session recall notifications.' },
              { label: 'Wellness Centers', icon: Smile, desc: 'Holistic health retreats, wellness booking triggers, and Stripe transaction ledgers.' }
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="p-5 rounded-2xl border border-white/5 bg-[#070b21]/50 backdrop-blur-sm hover:border-teal-400/40 transition-all duration-300 group text-left">
                  <div className="p-2.5 rounded-xl bg-teal-500/5 border border-teal-500/20 w-fit mb-4 group-hover:bg-teal-500/10 transition-colors">
                    <Icon className="h-5 w-5 text-teal-400" />
                  </div>
                  <h3 className="text-xs font-bold font-display text-white mb-1">{card.label}</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            PAIN POINTS (Challenges We Solve)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-rose-500 uppercase tracking-widest font-bold">Operational Vulnerabilities</span>
            <h2 className="text-3xl font-bold font-display">Healthcare Challenges We Solve</h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              Siloed systems and overworked staff lead to patient leakage and lost revenue. Here is how we resolve these bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Low Patient Footfall', pain: 'High advertising spend with zero lead tracking or maps SEO visibility.', fix: 'Automate Google Business Maps rankings and run laser-targeted local Ads.' },
              { label: 'Missed Appointments', pain: 'Patients forget scheduled slots; reception staff have no time for followups.', fix: 'Dispatch interactive WhatsApp confirmations & auto AI Calling reminders.' },
              { label: 'Poor Follow-Up', pain: 'Discharged outpatients never return for recovery diagnostic checkups.', fix: 'Schedule custom delay triggers to dispatch followup questionnaires.' },
              { label: 'Manual Processes', pain: 'Physicians write manual receipts; coordinators type out rosters on spreadsheets.', fix: 'Integrate GrowthOS™ CRM to sync digital EMR checklists and rosters.' },
              { label: 'Negative Reviews', pain: 'Upset patients post poor maps stars publicly, ruining local reputation.', fix: 'Feedback Agent routes negative ratings privately to clinic heads.' },
              { label: 'Low Online Visibility', pain: 'Zero presence on search engines for high-intent keywords in your town.', fix: 'Advanced local SEO structure to rank #1 on maps search listings.' },
              { label: 'Lead Leakage', pain: 'Intake forms on websites languish for 24 hours without callback.', fix: 'AI dialback dials lead back within 45 seconds to secure consultation.' },
              { label: 'Staff Overload', pain: 'Receptionists spend 4 hours daily confirming bookings over telephone calls.', fix: 'Deploy 75% deflection rate multi-agent swarms to handle repeating FAQs.' }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl border border-white/5 bg-[#030717] hover:bg-slate-900/40 hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded font-bold uppercase">PROBLEM</span>
                    <span className="text-[9px] text-gray-600 font-mono">#0{i+1}</span>
                  </div>
                  <h3 className="text-xs font-bold font-display text-white">{item.label}</h3>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    <span className="text-rose-400 font-semibold font-mono">Risk:</span> {item.pain}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-teal-400 leading-relaxed">
                  <span className="font-semibold font-mono text-teal-300">Solution:</span> {item.fix}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            SOLUTION BLUEPRINT (Interactive Flow Diagram)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">Intake Architecture</span>
            <h2 className="text-3xl font-bold font-display">Complete Healthcare Growth Blueprint</h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              A fully integrated, high-converting digital patient funnel. Hover over any node step to inspect active operations and metrics.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl border border-white/5 bg-[#050920]/80 backdrop-blur-md">
            
            {/* Interactive Timeline Connector */}
            <div className="grid grid-cols-1 md:grid-cols-9 gap-3 relative">
              <div className="hidden md:block absolute top-[25%] left-[5%] right-[5%] h-0.5 border-t border-dashed border-teal-500/20 -z-10" />
              
              {blueprintSteps.map((step, idx) => (
                <div 
                  key={step.id}
                  onMouseEnter={() => setHoveredBlueprintStep(idx)}
                  onMouseLeave={() => setHoveredBlueprintStep(null)}
                  className={`p-3.5 rounded-xl border text-center transition-all duration-300 cursor-pointer relative ${
                    hoveredBlueprintStep === idx 
                      ? 'border-teal-400 bg-teal-500/10 scale-105 shadow-[0_0_15px_rgba(45,212,191,0.2)]' 
                      : 'border-white/5 bg-slate-950/40'
                  }`}
                >
                  <span className="text-[8px] font-mono text-gray-500 block mb-1">STAGE 0{idx + 1}</span>
                  <p className="text-[10px] font-bold font-display text-white line-clamp-2 min-h-[30px] flex items-center justify-center">{step.name}</p>
                  <span className="text-[8px] font-mono text-teal-400 mt-1 block">{step.status}</span>
                </div>
              ))}
            </div>

            {/* Dynamic Step Detail Box */}
            <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 min-h-[80px] flex flex-col justify-center text-left">
              {hoveredBlueprintStep !== null ? (
                <div className="space-y-1 animate-fade-in">
                  <h4 className="text-xs font-bold text-teal-400 font-display">
                    {blueprintSteps[hoveredBlueprintStep].name} — {blueprintSteps[hoveredBlueprintStep].status}
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    {blueprintSteps[hoveredBlueprintStep].detail}
                  </p>
                </div>
              ) : (
                <div className="text-center text-xs text-gray-500 font-mono py-2">
                  💡 Hover over any stage above to inspect precise clinic CRM operations and target metrics.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ==========================================
            AI GROWTH MARKETING & CLINIC CRM PREVIEWS
           ========================================== */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          
          {/* AI Growth Marketing Block */}
          <div className="p-6 rounded-3xl border border-white/5 bg-[#05081e] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold block">Patient Acquisition Sourcing</span>
              <h3 className="text-2xl font-bold font-display">Patient Acquisition Solutions</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Rank higher on searches, target local medical keywords on Google Ads, and optimized map directory configurations to drive high-intent patient inquiries.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Healthcare Websites', 'SEO', 'Google Ads', 'Meta Ads', 'Local SEO', 'Google Business Profile'].map((f, idx) => (
                  <span key={idx} className="text-[9px] font-mono bg-white/[0.03] border border-white/10 px-2 py-1 rounded-lg text-gray-300 flex items-center gap-1">
                    <Check className="h-3 w-3 text-teal-400" /> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated Marketing Dashboard */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[9px] font-mono text-gray-400 uppercase">Live Marketing Dashboard Preview</span>
                <div className="flex gap-2 text-[8px] font-mono">
                  <button onClick={() => setMarketingPeriod('30d')} className={`px-2 py-0.5 rounded ${marketingPeriod === '30d' ? 'bg-teal-500 text-black' : 'text-gray-400'}`}>30D</button>
                  <button onClick={() => setMarketingPeriod('90d')} className={`px-2 py-0.5 rounded ${marketingPeriod === '90d' ? 'bg-teal-500 text-black' : 'text-gray-400'}`}>90D</button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1.5 border-b border-white/5 pb-2">
                {['seo', 'ads', 'local'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveMktTab(tab as any)}
                    className={`text-[9px] font-mono uppercase px-2 py-1 rounded transition-colors ${
                      activeMktTab === tab ? 'bg-white/5 text-teal-400 font-bold border-b border-teal-400' : 'text-gray-500'
                    }`}
                  >
                    {tab === 'local' ? 'Maps SEO' : tab}
                  </button>
                ))}
              </div>

              {/* Tab Data Metrics */}
              <div className="grid grid-cols-3 gap-2">
                {mktData[activeMktTab].metrics.map((m, idx) => (
                  <div key={idx} className="p-2 rounded bg-white/[0.01] border border-white/5 text-center">
                    <span className="text-[8px] text-gray-500 block truncate">{m.label}</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{m.value}</span>
                    <span className={`text-[8px] font-mono ${m.status === 'up' ? 'text-teal-400' : 'text-rose-400'}`}>{m.change}</span>
                  </div>
                ))}
              </div>

              {/* Tab Details */}
              <div className="pt-2">
                {activeMktTab === 'seo' && (
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-mono text-gray-500 uppercase block">High-Intent Keyword Ranks (Delhi NCR)</span>
                    <div className="space-y-1 max-h-[100px] overflow-y-auto">
                      {mktData.seo.keywords.map((k, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[9px] font-mono p-1 bg-white/[0.01] rounded">
                          <span className="text-gray-300">{k.term}</span>
                          <div className="flex gap-4">
                            <span className="text-teal-400 font-bold">{k.rank}</span>
                            <span className="text-gray-500">{k.volume}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeMktTab === 'ads' && (
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-mono text-gray-500 uppercase block">Active Ad-Sets (CPC Optimized)</span>
                    <div className="space-y-1 max-h-[100px] overflow-y-auto">
                      {mktData.ads.campaigns.map((c, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[9px] font-mono p-1 bg-white/[0.01] rounded">
                          <span className="text-gray-300">{c.name}</span>
                          <div className="flex gap-4">
                            <span className="text-gray-500">{c.leads} leads</span>
                            <span className="text-teal-300">CPL: {c.cpl}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeMktTab === 'local' && (
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-mono text-gray-500 uppercase block">Branch Locations Map Insights</span>
                    <div className="space-y-1 max-h-[100px] overflow-y-auto">
                      {mktData.local.locations.map((l, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[9px] font-mono p-1 bg-white/[0.01] rounded">
                          <span className="text-gray-300">{l.branch}</span>
                          <div className="flex gap-3">
                            <span className="text-teal-400">{l.mapsRank}</span>
                            <span className="text-gray-500">📞 {l.phoneCalls}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* GrowthOS Clinic CRM Block */}
          <div className="p-6 rounded-3xl border border-white/5 bg-[#05081e] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold block">Centralized Clinic Pipeline</span>
              <h3 className="text-2xl font-bold font-display">GrowthOS™ For Clinics</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connect patient registrations, consult rosters, and surgical queues into a visual CRM workspace. Track patient stages and eliminate lead leakage entirely.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['CRM Database', 'Lead Tracking', 'Roster Scheduling', 'Dynamic Pipelines', 'Patient Recalls'].map((f, idx) => (
                  <span key={idx} className="text-[9px] font-mono bg-white/[0.03] border border-white/10 px-2 py-1 rounded-lg text-gray-300 flex items-center gap-1">
                    <Check className="h-3 w-3 text-teal-400" /> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated Healthcare CRM Panel */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[9px] font-mono text-gray-400 uppercase">Interactive GrowthOS™ Lobby Terminal</span>
                <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                
                {/* Patient List */}
                <div className="sm:col-span-6 space-y-1.5 max-h-[140px] overflow-y-auto">
                  <span className="text-[8px] font-mono text-gray-500 uppercase block">Intake Queue (Today)</span>
                  {patientsList.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPatientId(p.id)}
                      className={`w-full text-left p-1.5 rounded transition-colors text-[9px] font-mono flex justify-between items-center ${
                        selectedPatientId === p.id ? 'bg-white/5 border border-white/10' : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="font-bold text-white truncate max-w-[80px]">{p.name}</span>
                      <span className={`text-[8px] px-1.5 rounded truncate ${p.statusColor}`}>{p.status}</span>
                    </button>
                  ))}
                </div>

                {/* Patient Detail Panel */}
                <div className="sm:col-span-6 p-2 rounded bg-white/[0.01] border border-white/5 text-[9px] flex flex-col justify-between min-h-[140px]">
                  <div>
                    <span className="text-[8px] font-mono text-gray-500 uppercase block">Patient Notes</span>
                    <p className="text-gray-300 leading-relaxed mt-1">
                      {patientDetails[selectedPatientId]?.notes || 'Select a patient node to view details.'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[8px] font-mono text-gray-500 uppercase block">Pipeline Logs</span>
                    <div className="space-y-1 max-h-[50px] overflow-y-auto mt-1">
                      {patientDetails[selectedPatientId]?.timeline.map((t, idx) => (
                        <div key={idx} className="flex justify-between text-[8px] text-gray-400 font-mono">
                          <span>{t.event}</span>
                          <span className="text-teal-400">{t.tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ==========================================
            BUSINESSOS™ COMMUNICATION PLATFORM
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">Omnichannel Messaging Hub</span>
            <h2 className="text-3xl font-bold font-display">BusinessOS™ Communication Platform</h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              Unify cloud telephony, voice triggers, WhatsApp catalogs, and multi-agent live chat queues in one dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 p-6 rounded-3xl border border-white/5 bg-[#05081e] flex flex-col justify-between text-left">
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-teal-400 uppercase font-bold block">Omnichannel Delivery</span>
                <h3 className="text-2xl font-bold font-display">Simulate Patient WhatsApp Interaction</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Try typing a message to Dr. Roy’s virtual scheduling node (e.g. "Hi, I want to book slot 1") to test real-time booking, calendar locks, and ledger confirmation.
                </p>

                <div className="space-y-2">
                  {['WhatsApp Official API', 'Cloud Telephony Nodes', 'AI Automated Callers', 'Lobby Live Chat Inbox'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <CheckCircle className="h-4 w-4 text-teal-400 flex-shrink-0" />
                      <span className="text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Micro call out on CRM speed */}
              <div className="mt-8 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-mono text-gray-400 leading-relaxed">
                <span className="text-teal-300 font-bold">Telemetry:</span> Automated missed-call WhatsApp webhook routes within &lt;200ms of disconnect logs.
              </div>
            </div>

            {/* Simulated Interactive WhatsApp Client Screen */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[380px] text-left">
              
              {/* Client Top Header */}
              <div className="p-4 bg-slate-900 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-teal-500/10 border border-teal-400/40 flex items-center justify-center font-bold text-teal-400 text-xs">
                    RC
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-display">Radiant Clinic Scheduler</h4>
                    <span className="text-[8px] text-teal-400 flex items-center gap-1 font-mono">● Automated Doctor Assistant</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-gray-500">Meta API Verified</span>
              </div>

              {/* Chat Message Window */}
              <div className="p-4 flex-grow space-y-3 max-h-[220px] overflow-y-auto">
                {waMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2.5 rounded-xl text-[10px] max-w-[85%] leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-teal-500 text-black rounded-tr-none font-medium' 
                        : 'bg-white/5 border border-white/10 text-white rounded-tl-none whitespace-pre-line'
                    }`}>
                      {msg.text}
                      <span className="block text-[7px] text-right text-gray-400 mt-1">{msg.time}</span>
                    </div>
                  </div>
                ))}
                {isWaTyping && (
                  <div className="flex justify-start">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[8px] font-mono text-gray-400 animate-pulse">
                      Assistant is checking rosters...
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input Box */}
              <form onSubmit={sendWaMessage} className="p-3 bg-slate-900 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  value={newWaMessage}
                  onChange={(e) => setNewWaMessage(e.target.value)}
                  placeholder="Type '1' to confirm morning slot, or ask a question..."
                  className="flex-grow p-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400"
                />
                <button type="submit" className="p-2 rounded-lg bg-teal-500 text-black hover:bg-teal-400 transition-colors">
                  <Send className="h-4 w-4" />
                </button>
              </form>

            </div>

          </div>
        </div>

        {/* ==========================================
            AGENTICOS™ FOR HEALTHCARE (3D AI AGENT NETWORK)
           ========================================== */}
        <div id="agenticos" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">Autonomous Cognitive Swarm</span>
            <h2 className="text-3xl font-bold font-display">AgenticOS™ For Healthcare</h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              Meet our autonomous virtual employees. Deploy highly efficient specialized agents that check schedules, answer prep questions, and audit invoices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            {/* Left selector col */}
            <div className="lg:col-span-5 space-y-2">
              {healthcareAgents.map((ag) => {
                const Icon = ag.icon;
                return (
                  <button
                    key={ag.id}
                    onClick={() => setActiveHealthcareAgent(ag.id)}
                    className={`w-full p-4 rounded-xl border text-left flex gap-3 transition-all duration-300 ${
                      activeHealthcareAgent === ag.id 
                        ? 'bg-teal-500/10 border-teal-400/40 shadow-lg' 
                        : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="p-2 rounded bg-white/5 border border-white/10 h-fit">
                      <Icon className="h-4 w-4 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-display flex items-center gap-2">
                        {ag.name}
                        {activeHealthcareAgent === ag.id && <span className="h-1.5 w-1.5 bg-teal-400 rounded-full animate-ping" />}
                      </h4>
                      <p className="text-[9px] text-gray-500 mt-0.5 line-clamp-1">{ag.role}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right details sandbox */}
            <div className="lg:col-span-7 p-6 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-md space-y-6">
              
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[9px] font-mono text-teal-400 uppercase flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5 animate-spin" /> ACTIVE COGNITIVE AGENT PARAMETERS
                </span>
                <span className="text-[8px] font-mono text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded">CONCURRENT THREAD</span>
              </div>

              {healthcareAgents.map((ag) => {
                if (ag.id !== activeHealthcareAgent) return null;
                const Icon = ag.icon;
                return (
                  <div key={ag.id} className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white font-display">{ag.name}</h4>
                        <span className="text-[9px] text-gray-500 font-mono">Telemetry: {ag.metrics}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {ag.role}
                    </p>

                    <div className="space-y-1.5">
                      <span className="text-[8px] font-mono text-teal-400 uppercase font-bold block">Model System Prompt Instruction:</span>
                      <div className="p-3.5 rounded bg-black/40 border border-white/5 text-[9px] font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {ag.prompt}
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>
        </div>

        {/* ==========================================
            AUTOMATION WORKFLOWS (React Flow style)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">SOP Visualizer</span>
            <h2 className="text-3xl font-bold font-display">Healthcare Automation Workflows</h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              Review our live automated flows mapped across clinics. Select different presets to visual connected node sequences.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl border border-white/5 bg-[#050920]/80 backdrop-blur-md text-left">
            
            {/* Presets */}
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 mb-6">
              {flowPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFlowPreset(idx)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase transition-colors ${
                    activeFlowPreset === idx 
                      ? 'bg-teal-500 text-black font-bold' 
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  Preset {idx + 1}
                </button>
              ))}
            </div>

            {/* Selected Preset Details */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  {flowPresets[activeFlowPreset].title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-1">
                  {flowPresets[activeFlowPreset].desc}
                </p>
              </div>

              {/* Connected node blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {flowPresets[activeFlowPreset].nodes.map((node, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/5 bg-black/40 relative flex flex-col justify-between min-h-[90px]">
                    <div className="absolute top-2 right-2 text-[8px] font-mono text-gray-600">NODE 0{i+1}</div>
                    <div>
                      <h5 className="text-[10px] font-bold text-teal-300 font-display uppercase">{node.label}</h5>
                      <p className="text-[9px] text-gray-400 mt-1.5 leading-relaxed">{node.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            USE CASES (Popular Healthcare Use Cases)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">Standard Blueprints</span>
            <h2 className="text-3xl font-bold font-display">Popular Healthcare Use Cases</h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              Optimize daily operational friction. Run tested multi-agent swarms for these primary clinics tasks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { title: 'Appointment Booking', desc: 'Secure consultations automatically on doctor calendars via chat & voice.' },
              { title: 'Patient Follow-Up', desc: 'Auto-track medical recoveries and dispatch diagnostic test recall notices.' },
              { title: 'Review Collection', desc: 'Escalate low ratings privately and push 5-star reviews to maps listings.' },
              { title: 'Treatment Reminder', desc: 'Help patients maintain safety guidelines with scheduled medication alerts.' },
              { title: 'Lead Qualification', desc: 'Verify loan profiles, budget parameters, and location before counselor handoff.' },
              { title: 'Doctor Availability', desc: 'Query and reschedule consulting lists hands-free without roster conflicts.' }
            ].map((useCase, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-white/5 bg-[#030717]/40 text-left hover:border-teal-400/20 transition-colors">
                <span className="text-[8px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded font-bold uppercase">USE CASE</span>
                <h4 className="text-xs font-bold text-white font-display mt-3 mb-1">{useCase.title}</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            ROI CALCULATOR
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">Value Modeling</span>
            <h2 className="text-3xl font-bold font-display">Healthcare ROI Calculator</h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              Simulate potential revenue saved by reducing missed appointments and automating intake pipelines.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl border border-white/5 bg-[#04081c]/90 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Monthly Patients */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Monthly Patients Volume</span>
                    <span className="text-teal-400 font-bold">{monthlyPatients} patients</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="50"
                    value={monthlyPatients}
                    onChange={(e) => setMonthlyPatients(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

                {/* Avg Revenue Per Patient */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Average Revenue Per Patient (INR)</span>
                    <span className="text-teal-400 font-bold">₹{avgRevenuePerPatient.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="15000"
                    step="500"
                    value={avgRevenuePerPatient}
                    onChange={(e) => setAvgRevenuePerPatient(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

                {/* Missed Appointments */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Missed Appointments Percentage</span>
                    <span className="text-teal-400 font-bold">{missedAppointmentsPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={missedAppointmentsPercent}
                    onChange={(e) => setMissedAppointmentsPercent(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

                {/* Marketing Budget */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Estimated Automation Budget (INR)</span>
                    <span className="text-teal-400 font-bold">₹{mktBudget.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="150000"
                    step="5000"
                    value={mktBudget}
                    onChange={(e) => setMktBudget(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

              </div>

              {/* Outputs display */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
                
                <div className="border-b border-white/5 pb-2">
                  <span className="text-[8px] font-mono text-gray-500 uppercase block">Monthly Financial Impact</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-400">Lost Monthly Revenue (unoptimized):</span>
                    <span className="text-xs font-bold text-rose-400">{formatCur(lostRevenue)}</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded bg-teal-500/5 border border-teal-500/20">
                    <span className="text-[10px] text-teal-300 font-bold">Appointments Auto-Saved:</span>
                    <span className="text-xs font-extrabold text-teal-400">{appointmentsSaved} /mo</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-400">Additional Revenue (75% recovery):</span>
                    <span className="text-xs font-bold text-white">{formatCur(additionalRevenueTotal)}</span>
                  </div>

                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <span className="text-xs font-bold text-gray-300">Net Growth ROI:</span>
                    <span className="text-lg font-black text-teal-400 font-mono">+{roiPercentage}%</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[8px] text-gray-500 font-mono">
                    Calculations assume standard 75% deflection rate and 15% patient acquisition boost.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            CASE STUDIES (Carousel)
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">Proof of Concept</span>
            <h2 className="text-3xl font-bold font-display">Healthcare Success Stories</h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              Read how leading Indian multi-specialty, diagnostic, eye, and dental clinics scaled patient intake safely.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl border border-white/5 bg-[#05081e] text-left">
            
            {/* Case selector tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 mb-6">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCaseIdx(idx)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase transition-colors ${
                    activeCaseIdx === idx 
                      ? 'bg-teal-500 text-black font-bold' 
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {cs.title.split(' ')[1] || cs.title}
                </button>
              ))}
            </div>

            {/* Case detail body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[8px] font-mono text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded font-bold uppercase">
                  {caseStudies[activeCaseIdx].metric}
                </span>
                <h3 className="text-2xl font-bold font-display text-white">{caseStudies[activeCaseIdx].title}</h3>
                <p className="text-[11px] text-gray-400 font-mono">Timeline: {caseStudies[activeCaseIdx].duration}</p>
                
                <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="font-semibold text-rose-400">Challenge:</span> {caseStudies[activeCaseIdx].challenge}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="font-semibold text-teal-400">Solution:</span> {caseStudies[activeCaseIdx].solution}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="font-semibold text-indigo-400 font-mono">Net Impact:</span> {caseStudies[activeCaseIdx].roi}
                </p>
              </div>

              {/* Stats table */}
              <div className="lg:col-span-5 p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                <span className="text-[8px] font-mono text-gray-500 uppercase block">Verifiable Metric Shift</span>
                <div className="space-y-2">
                  {caseStudies[activeCaseIdx].stats.map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[10px] font-mono p-2 bg-white/[0.01] rounded">
                      <span className="text-gray-400">{s.label}</span>
                      <div className="flex gap-4">
                        <span className="text-rose-400 line-through">{s.before}</span>
                        <span className="text-teal-400 font-bold">➔ {s.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            COMPARISON TABLE
           ========================================== */}
        <div className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">Market Analysis</span>
            <h2 className="text-3xl font-bold font-display">Why Healthcare Providers Choose Natton Digital</h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              Compare our dedicated healthcare automation suite against traditional ad agencies and generic CRMs.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#030616]/60 text-left">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10 bg-slate-900/40 text-[10px] font-mono uppercase text-gray-400">
                  <th className="p-4">Capabilities</th>
                  <th className="p-4 text-teal-400 font-bold">Natton Digital</th>
                  <th className="p-4">Traditional Agencies</th>
                  <th className="p-4">Generic CRM Providers</th>
                </tr>
              </thead>
              <tbody className="text-[10px] font-mono divide-y divide-white/5">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-gray-300">{row.cap}</td>
                    <td className="p-4 text-teal-300 font-bold bg-teal-500/[0.02]">{row.natton}</td>
                    <td className="p-4 text-gray-500">{row.trad}</td>
                    <td className="p-4 text-gray-500">{row.generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            FAQ (15 Accordion FAQ Questions)
           ========================================== */}
        <div className="mb-24 space-y-10 max-w-4xl mx-auto text-left">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">Expert Knowledge Base</span>
            <h2 className="text-3xl font-bold font-display">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400">
              Find detailed answers about compliance, WhatsApp registries, cloud voice nodes, and our deployment process.
            </p>
          </div>

          <div className="space-y-2">
            {faqsList.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-xl border border-white/5 bg-[#04081c]/60 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center text-xs font-semibold text-white font-display hover:bg-white/[0.02] transition-colors"
                >
                  <span>{faq.q}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="h-4 w-4 text-teal-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 border-t border-white/5 text-[10px] leading-relaxed text-gray-400 bg-black/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            HIGH CONVERTING LEAD FORM
           ========================================== */}
        <div id="lead_form" className="mb-24 max-w-4xl mx-auto text-left">
          <div className="p-6 sm:p-10 rounded-3xl border border-teal-500/20 bg-slate-950/80 backdrop-blur-md shadow-2xl relative">
            <div className="absolute top-4 right-4 text-[9px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded uppercase">
              GoHighLevel / n8n Sync
            </div>

            <div className="text-center space-y-3 mb-8">
              <h3 className="text-2xl font-bold font-display text-white">Book A Free Healthcare Growth Consultation</h3>
              <p className="text-xs text-gray-400 max-w-xl mx-auto">
                Our healthcare automation technicians specialize in custom clinic mapping. Setup your pipeline in under 7 business days.
              </p>
            </div>

            {formSuccess ? (
              <div className="p-8 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-center space-y-4">
                <div className="p-3 bg-teal-500 text-black rounded-full w-fit mx-auto font-bold">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-teal-400">Consultation Booked Successfully!</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The lead credentials have been securely pushed to our GoHighLevel CRM and verified via an n8n webhook routing node. A technician will review your details and contact you within 2 business hours.
                </p>
                <div className="p-4 rounded bg-black/50 border border-white/5 font-mono text-[8px] text-left text-gray-400 space-y-1">
                  <span className="text-teal-400 font-bold block uppercase mb-1">Integration Status Logs:</span>
                  {integrationLogs.map((log, idx) => (
                    <div key={idx}>✓ {log}</div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh Kumar"
                      value={formState.fullName}
                      onChange={(e) => setFormState({...formState, fullName: e.target.value})}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Hospital / Clinic Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apollo Dental Center"
                      value={formState.clinicName}
                      onChange={(e) => setFormState({...formState, clinicName: e.target.value})}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Speciality</label>
                    <select
                      value={formState.speciality}
                      onChange={(e) => setFormState({...formState, speciality: e.target.value})}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400"
                    >
                      <option value="Hospitals">Hospitals</option>
                      <option value="Clinics">Multi-Specialty Clinics</option>
                      <option value="Dental">Dental Clinics</option>
                      <option value="Diagnostic">Diagnostic Centers</option>
                      <option value="IVF">IVF Centers</option>
                      <option value="Eye">Eye Hospitals</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, Maharashtra"
                      value={formState.location}
                      onChange={(e) => setFormState({...formState, location: e.target.value})}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Monthly Patients</label>
                    <select
                      value={formState.monthlyPatients}
                      onChange={(e) => setFormState({...formState, monthlyPatients: e.target.value})}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400"
                    >
                      <option value="< 100">&lt; 100 patients</option>
                      <option value="100 - 300">100 - 300 patients</option>
                      <option value="300 - 1000">300 - 1000 patients</option>
                      <option value="> 1000">&gt; 1000 patients</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@clinic.com"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase">Current Operational Challenges</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. High appointment no-shows, manual patient callbacks taking too long, or lack of Google Business Reviews."
                    value={formState.challenges}
                    onChange={(e) => setFormState({...formState, challenges: e.target.value})}
                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                {/* Math Captcha */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[9px] font-mono text-teal-400 uppercase font-bold block">Verification Challenge</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-[10px] text-gray-400">
                      Solve the calculation challenge to verify you are a hospital human supervisor: <br />
                      <span className="text-white font-bold font-mono text-xs">{captchaSum1} + {captchaSum2} = ?</span>
                    </p>
                    <input
                      type="number"
                      required
                      placeholder="Your answer"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      className="p-2 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400 w-32"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  {formSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" /> Syncing with GHL Webhook...
                    </>
                  ) : (
                    <>
                      Submit Consultation Request <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {formSubmitting && (
                  <div className="p-3 rounded bg-black/80 border border-teal-500/30 text-[8px] font-mono text-teal-400 space-y-1">
                    {integrationLogs.map((log, idx) => (
                      <div key={idx} className="animate-fade-in">✓ {log}</div>
                    ))}
                  </div>
                )}

              </form>
            )}

          </div>
        </div>

        {/* ==========================================
            FINAL CTA
           ========================================== */}
        <div className="py-16 text-center relative rounded-3xl overflow-hidden border border-white/5 bg-[#030717]/80 backdrop-blur-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />

          <div className="max-w-2xl mx-auto space-y-6 px-4">
            <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full uppercase tracking-wider block font-bold w-fit mx-auto">
              Automated Clinical Mastery
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display">Grow Your Practice With AI</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Integrate custom patient scheduling, WhatsApp chatbots, cloud telephony systems, and EMR roster coordination. Deploy in under 7 business days.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <a 
                href="#lead_form" 
                className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-black text-xs font-bold rounded-lg transition-colors uppercase"
              >
                Book Consultation
              </a>
              <button 
                onClick={() => setPath('contact')} 
                className="px-6 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] text-xs font-semibold text-white transition-all"
              >
                Talk To Experts
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
