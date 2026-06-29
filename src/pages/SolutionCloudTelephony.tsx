import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Cpu, 
  Zap, 
  Sparkles, 
  Play, 
  Square, 
  Volume2, 
  Activity, 
  Calendar, 
  TrendingUp, 
  ChevronDown, 
  Globe, 
  Database, 
  Lock, 
  ShieldCheck, 
  Layers, 
  Users, 
  Headphones, 
  Clock, 
  ArrowUpRight, 
  BarChart2, 
  Settings, 
  Check, 
  X, 
  RefreshCw, 
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
  Share2,
  Workflow,
  Plus,
  Trash2,
  CheckSquare,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react';
import { RoutePath } from '../types';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces for IVR Builder nodes
interface IVRNode {
  id: string;
  type: 'greeting' | 'menu' | 'route' | 'hangup' | 'voicemail';
  title: string;
  config: string;
}

export default function SolutionCloudTelephony({ setPath, darkMode, formSubmitted, setFormSubmitted, loading, setLoading }: any) {
  useEffect(() => {
    document.title = "Cloud Telephony Platform | IVR, Call Center & Business Communication Solutions";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Form input state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    industry: 'Healthcare',
    monthlyCallVolume: '10k - 50k calls',
    currentProvider: 'None / Traditional EPABX',
    teamSize: '10 - 50 agents',
    message: ''
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);

  // Generate math captcha on mount
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
  // HERO: 3D Contact Center Canvas
  // ==========================================
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resize();
    window.addEventListener('resize', resize);

    // Nodes representing a telecommunication center mesh
    const nodes = [
      { x: 0, y: 0, z: 0, label: 'Virtual Num', type: 'core' },
      { x: -100, y: -80, z: 50, label: 'IVR Trigger', type: 'node' },
      { x: 100, y: -80, z: -50, label: 'Geo Route', type: 'node' },
      { x: -120, y: 80, z: -80, label: 'SIP Server', type: 'server' },
      { x: 120, y: 80, z: 80, label: 'CRM Link', type: 'server' },
      { x: 0, y: 140, z: 0, label: 'Agent 01', type: 'agent' },
      { x: -80, y: 150, z: 40, label: 'Agent 02', type: 'agent' },
      { x: 80, y: 150, z: -40, label: 'Agent 03', type: 'agent' },
    ];

    const project = (x: number, y: number, z: number) => {
      // Rotate around Y axis
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      const rotX = x * cos - z * sin;
      const rotZ = x * sin + z * cos;

      // Simple perspective projection
      const distance = 300;
      const scale = distance / (distance + rotZ);
      const projX = rotX * scale + canvas.width / 2;
      const projY = y * scale + canvas.height / 2 - 20;

      return { x: projX, y: projY, size: scale * 6, depth: rotZ };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.006;

      // Draw glowing grid plane at bottom
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.04)';
      ctx.lineWidth = 1;
      const gridY = 160;
      for (let i = -4; i <= 4; i++) {
        // Z lines
        const p1 = project(i * 45, gridY, -200);
        const p2 = project(i * 45, gridY, 200);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // X lines
        const p3 = project(-200, gridY, i * 45);
        const p4 = project(200, gridY, i * 45);
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      // Project all nodes
      const projected = nodes.map(n => ({
        ...n,
        proj: project(n.x, n.y, n.z)
      }));

      // Sort by depth to render back-to-front (painter's algorithm)
      projected.sort((a, b) => b.proj.depth - a.proj.depth);

      // Draw connections
      ctx.lineWidth = 1.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const n1 = projected[i];
          const n2 = projected[j];

          // Determine connection strength/opacity
          let opacity = 0.07;
          if (n1.type === 'core' || n2.type === 'core') opacity = 0.25;
          else if (n1.type === 'node' && n2.type === 'agent') opacity = 0.12;

          ctx.strokeStyle = `rgba(0, 194, 255, ${opacity})`;
          
          // Draw connecting pipeline path
          ctx.beginPath();
          ctx.moveTo(n1.proj.x, n1.proj.y);
          ctx.lineTo(n2.proj.x, n2.proj.y);
          ctx.stroke();

          // Draw active pulse packet traveling down lines
          const pulseProgress = (Date.now() / 2000 + (i + j) * 0.1) % 1.0;
          const px = n1.proj.x + (n2.proj.x - n1.proj.x) * pulseProgress;
          const py = n1.proj.y + (n2.proj.y - n1.proj.y) * pulseProgress;
          ctx.fillStyle = '#8B5CF6';
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw node spheres with specific stylings
      projected.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.proj.x, n.proj.y, n.proj.size, 0, Math.PI * 2);
        
        // Style node color based on metadata role
        if (n.type === 'core') {
          ctx.fillStyle = '#00C2FF'; // Cyan
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#00C2FF';
        } else if (n.type === 'agent') {
          ctx.fillStyle = '#10B981'; // Emerald Active
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#10B981';
        } else if (n.type === 'server') {
          ctx.fillStyle = '#8B5CF6'; // Violet
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#8B5CF6';
        } else {
          ctx.fillStyle = '#F59E0B'; // Amber
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Label indicators
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.proj.x, n.proj.y - n.proj.size - 4);
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
  // INTERACTIVE SECTION 1: IVR Builder Playground
  // ==========================================
  const [ivrNodes, setIvrNodes] = useState<IVRNode[]>([
    { id: '1', type: 'greeting', title: 'Main Office Greeting', config: 'Play: "Welcome to Natton, press 1 for sales..."' },
    { id: '2', type: 'menu', title: 'Interactive Menu Node', config: '1 -> Sales Group, 2 -> Support Desk, 3 -> Billing' },
    { id: '3', type: 'route', title: 'Route To Sales Team', config: 'Policy: Round Robin distribution, ring-time 20s' },
  ]);
  const [selectedBuilderNode, setSelectedBuilderNode] = useState<string | null>('1');
  const [builderPlaying, setBuilderPlaying] = useState(false);
  const [builderLogs, setBuilderLogs] = useState<string[]>([]);

  const addNode = (type: 'menu' | 'route' | 'hangup' | 'voicemail') => {
    const titles = {
      menu: 'Sub-level Menu Option',
      route: 'Queue Department Routing',
      hangup: 'Graceful Call Hangup',
      voicemail: 'Record Customer Voicemail'
    };
    const configs = {
      menu: 'Press 1 to go back, press 2 for agent',
      route: 'Policy: Longest idle agent, ring-time 15s',
      hangup: 'Play: "Thank you for calling, Goodbye."',
      voicemail: 'Record audio limit 60s, email transcription'
    };

    const newNode: IVRNode = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: titles[type],
      config: configs[type]
    };

    setIvrNodes([...ivrNodes, newNode]);
    setSelectedBuilderNode(newNode.id);
  };

  const deleteNode = (id: string) => {
    if (ivrNodes.length <= 1) {
      alert("At least one core node must remain in the IVR Tree.");
      return;
    }
    setIvrNodes(ivrNodes.filter(n => n.id !== id));
    setSelectedBuilderNode(ivrNodes[0].id);
  };

  const updateNodeConfig = (id: string, configText: string) => {
    setIvrNodes(ivrNodes.map(n => n.id === id ? { ...n, config: configText } : n));
  };

  const testIvrFlow = () => {
    if (builderPlaying) return;
    setBuilderPlaying(true);
    setBuilderLogs([]);

    const runLogs = [
      "📞 [Incoming] Call established from SIP Carrier route trunk_main",
      "🔊 [IVR Engine] Executing Greeting Node: \"Main Office Greeting\"",
      `🗣️ [IVR Speech] Play audio file: "${ivrNodes[0]?.config || 'Welcome'}"`,
      "🎹 [Menu Analyzer] Trigger Menu option: press '1' matched Sales",
      "⚙️ [Router] Running load balancer rule: Priority Group 'Sales Team'",
      "🌐 [SIP Forward] Ringing Agent SIP endpoints (3 agents active)...",
      "🤝 [Connected] Bridged call successfully with Agent Shrikant (India Routing Core)"
    ];

    runLogs.forEach((log, index) => {
      setTimeout(() => {
        setBuilderLogs(prev => [...prev, log]);
        if (index === runLogs.length - 1) {
          setBuilderPlaying(false);
        }
      }, (index + 1) * 900);
    });
  };

  // ==========================================
  // INTERACTIVE SECTION 2: Routing Simulation
  // ==========================================
  const [simState, setSimState] = useState<'idle' | 'started' | 'routing' | 'connected'>('idle');
  const [simLog, setSimLog] = useState<string[]>([]);
  const [routingFactor, setRoutingFactor] = useState<'round-robin' | 'time-based' | 'priority'>('round-robin');

  const startRoutingSim = () => {
    setSimState('started');
    setSimLog(["📞 [Incoming SIP] Call initialized from standard Mumbai line +91 91123 45678"]);

    setTimeout(() => {
      setSimState('routing');
      setSimLog(prev => [
        ...prev,
        "📍 [Geo Check] Caller IP location identified: Maharashtra, India",
        "🕒 [Business Hours] Time matches active profile 'Day Shift 09:00 - 18:00'"
      ]);
    }, 1000);

    setTimeout(() => {
      if (routingFactor === 'round-robin') {
        setSimLog(prev => [
          ...prev,
          "🔄 [Distribution] Rule set to 'Round Robin' - searching through queue list...",
          "🔍 [Queue] Agent A (Busy), Agent B (Away) -> Selecting Agent C (Longest idle)"
        ]);
      } else if (routingFactor === 'time-based') {
        setSimLog(prev => [
          ...prev,
          "🕒 [Distribution] Rule set to 'Time-Based'",
          "⚡ [Time Router] Office is active. Forwarding call to 'Primary Desk In-Office Group'"
        ]);
      } else {
        setSimLog(prev => [
          ...prev,
          "⭐ [Distribution] Rule set to 'Priority Routing'",
          "💎 [VIP Check] High value tier match - forwarding directly to Senior Executive tier"
        ]);
      }
    }, 2200);

    setTimeout(() => {
      setSimState('connected');
      setSimLog(prev => [
        ...prev,
        `🎉 [Connected] Bridged call successfully! Time-to-Connect: 2.4 seconds`
      ]);
    }, 3500);
  };

  // ==========================================
  // INTERACTIVE SECTION 3: Agent Live Monitoring
  // ==========================================
  const [agentsList, setAgentsList] = useState([
    { name: "Priya Sharma", status: "In Call", duration: "2m 14s", count: 24, quality: "98%" },
    { name: "Rahul Deshmukh", status: "Available", duration: "0m 00s", count: 18, quality: "95%" },
    { name: "Ananya Roy", status: "Wrap Up", duration: "1m 02s", count: 31, quality: "96%" },
    { name: "Kunal Verma", status: "Available", duration: "0m 00s", count: 14, quality: "91%" },
    { name: "Sneha Nair", status: "Offline", duration: "0m 00s", count: 0, quality: "100%" }
  ]);

  // Simulate status fluctuation occasionally
  useEffect(() => {
    const timer = setInterval(() => {
      setAgentsList(prev => {
        return prev.map((agent, idx) => {
          if (idx === 4) return agent; // Sneha stays offline
          if (Math.random() > 0.6) {
            const nextStatus = agent.status === "Available" ? "In Call" : agent.status === "In Call" ? "Wrap Up" : "Available";
            const isCall = nextStatus === "In Call";
            return {
              ...agent,
              status: nextStatus,
              duration: isCall ? "0m 15s" : "0m 00s",
              count: isCall ? agent.count + 1 : agent.count
            };
          }
          return agent;
        });
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ==========================================
  // INTERACTIVE SECTION 4: Audio recording playback
  // ==========================================
  const [playingRecording, setPlayingRecording] = useState<string | null>(null);
  const [recordingPlaybackProgress, setRecordingPlaybackProgress] = useState(0);
  const [recordingSearch, setRecordingSearch] = useState('');
  const [selectedDurationFilter, setSelectedDurationFilter] = useState('all');

  const recordingsData = [
    { id: 'rec1', caller: '+91 94451 02931', date: 'Today, 2:15 PM', duration: '1m 45s', durSec: 105, transcript: "Customer: 'Hi, I got a missed call regarding my diagnostic healthcare reports.' Agent: 'Hello yes, your reports are ready and have been dispatched to your email address.'", department: 'Support' },
    { id: 'rec2', caller: '+91 80562 93102', date: 'Today, 11:30 AM', duration: '3m 12s', durSec: 192, transcript: "Customer: 'Can I reschedule my real estate site visit tomorrow to next Monday?' Agent: 'Sure! Let me check the available slots on the calendar. We have 10 AM open.'", department: 'Sales' },
    { id: 'rec3', caller: '+91 93845 01234', date: 'Yesterday, 4:05 PM', duration: '0m 52s', durSec: 52, transcript: "Customer: 'What is the fee structure for the professional AI bootcamp?' Agent: 'The pricing is ₹24,999 which includes certified credentials and resume audits.'", department: 'Admissions' }
  ];

  // Play timer simulation for recording
  useEffect(() => {
    let playTimer: number;
    if (playingRecording) {
      const activeRec = recordingsData.find(r => r.id === playingRecording);
      const limit = activeRec ? activeRec.durSec : 100;
      let tick = 0;
      playTimer = window.setInterval(() => {
        tick += 1;
        const progress = (tick / 15) * 100; // simulated speedup for user convenience
        if (progress >= 100) {
          setRecordingPlaybackProgress(100);
          setPlayingRecording(null);
          clearInterval(playTimer);
        } else {
          setRecordingPlaybackProgress(progress);
        }
      }, 500);
    } else {
      setRecordingPlaybackProgress(0);
    }
    return () => clearInterval(playTimer);
  }, [playingRecording]);

  // Filtered recordings
  const filteredRecordings = recordingsData.filter(rec => {
    const matchSearch = rec.caller.includes(recordingSearch) || rec.transcript.toLowerCase().includes(recordingSearch.toLowerCase());
    return matchSearch;
  });

  // ==========================================
  // REAL-TIME ANALYTICS SIMULATION
  // ==========================================
  const [liveCallsHandled, setLiveCallsHandled] = useState(2580);
  const [liveSlaPercent, setLiveSlaPercent] = useState(98.4);
  const [activeQueue, setActiveQueue] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate live updates
      setLiveCallsHandled(prev => prev + (Math.random() > 0.6 ? 1 : 0));
      setLiveSlaPercent(prev => {
        const d = (Math.random() - 0.5) * 0.1;
        return parseFloat(Math.min(100, Math.max(90, prev + d)).toFixed(1));
      });
      setActiveQueue(prev => {
        const delta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(0, Math.min(10, prev + delta));
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // FAQs State - 12 items
  const [faqStates, setFaqStates] = useState<Record<number, boolean>>({});
  const toggleFaq = (index: number) => {
    setFaqStates(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const faqsList = [
    {
      q: "What is an IVR and how does the drag-and-drop builder help our business?",
      a: "IVR (Interactive Voice Response) is an automated business phone system that greets callers and guides them through keypress menus ('Press 1 for Sales...'). Our builder provides a clean visual flow mapping, so you can configure custom greetings, department queues, and operational hours dynamically without coding."
    },
    {
      q: "Can we port our existing office landlines or mobile numbers to Natton Digital?",
      a: "Absolutely. We support full Number Portability (MNP) as well as virtual number forwarding. You can easily link your existing landlines, corporate numbers, or SIP Trunks directly into our telephony gateway, preserving your active brand image."
    },
    {
      q: "How does missed call automation follow up with prospective leads?",
      a: "The moment a caller hangs up or fails to connect with an agent, our webhook architecture fires immediate programmatic follow-ups: an instant SMS thanking them, a WhatsApp template with a calendar scheduler link, and a synchronous update to GoHighLevel CRM mapping them as a high-priority contact."
    },
    {
      q: "Is there a restriction on concurrent call volume or agent queues?",
      a: "No! Unlike traditional copper EPABX lines that limit concurrent lines, our virtual Cloud Telephony is engineered over redundant digital cloud servers. It handles up to 5,000 parallel calls simultaneously without returning busy signals, routing overflow calls into custom hold queues."
    },
    {
      q: "Do you support automatic Call Recording and are the recordings fully secure?",
      a: "Yes. All inbound and outbound traffic can be automatically recorded and archived securely. Every call audio file is stored in encrypted cloud folders with SOC2 Type II and HIPAA compliance guards, accessible purely to authorized team leaders."
    },
    {
      q: "Can we distribute incoming calls using custom algorithms like Round Robin?",
      a: "Yes! Our routing engine supports several advanced distribution structures: Round Robin (equal distribution), Priority Routing (VIP clients directly to directors), Time-Based Routing (off-hours to regional branches), and Geo-Routing based on local area codes."
    },
    {
      q: "What are Virtual Numbers and can we purchase international business numbers?",
      a: "Virtual Numbers are cloud-hosted numbers that do not rely on physical SIM cards. We provide fully legal DID/toll-free virtual numbers across 60+ countries and all major Indian cities, enabling local representation globally."
    },
    {
      q: "Can supervisors listen in or whisper to agents during active client calls?",
      a: "Yes. Our Multi-Agent Call Center Dashboard features real-time Supervisor tools: Silent Monitoring (listening without caller knowledge), Whisper Mode (talking only to the agent to guide their pitch), and Barge-In (full 3-way call conference)."
    },
    {
      q: "How does the cloud system integrate with CRM platforms like GoHighLevel?",
      a: "We integrate natively via n8n workflows and REST APIs. When a call completes, our system instantly updates contact profiles, maps duration tags (e.g., 'call_duration_over_2m'), uploads the call recording link, and logs full transcription histories."
    },
    {
      q: "Do you charge extra for cloud hosting, CDNs, or Redis cache setups?",
      a: "No. All core security, low-latency edge rendering, and content optimization hosting are covered within our transparent monthly subscriptions. There are no hidden cloud server or technical maintenance fees."
    },
    {
      q: "What is the average setup and setup deployment timeline?",
      a: "Standard virtual toll-free lines and pre-configured IVRs can be live in under 4 hours. Fully customized company multi-level IVRs with n8n and Zoho/Salesforce CRM integrations typically take 2 to 3 business days of guided setup."
    },
    {
      q: "What pricing bandwidth models do you support?",
      a: "We offer transparent monthly tiers: Starter (ideal for small offices looking for virtual numbers), Growth (adds advanced multi-agent dashboards and recorders), and Enterprise (fully bespoke multi-country routing systems)."
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
          <span>Cloud Telephony Platform</span>
        </div>

        {/* ==========================================
            1. HERO SECTION (Animated Mesh Network + 3D contact center Canvas)
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative">
          
          {/* Decorative radial glows */}
          <div className="absolute top-0 left-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold">
                Enterprise Cloud Communication
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight">
              Cloud Telephony <br />
              <span className="bg-gradient-to-r from-[#00C2FF] via-[#8B5CF6] to-pink-500 bg-clip-text text-transparent">
                For Modern Enterprises
              </span>
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Manage incoming calls, agent departments, and customer inquiries with interactive IVRs, custom load-balanced routing, and exhaustive analytics from anywhere in the world. Drop clunky physical server boxes and deploy instantly.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#demo_form" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-violet-500/20 transition-all flex items-center gap-2 text-sm"
              >
                Book Demo <Phone className="h-4 w-4" />
              </a>
              <a 
                href="#ivr_builder" 
                className={`px-6 py-3 rounded-lg border transition-all flex items-center gap-2 text-sm font-semibold ${
                  darkMode 
                    ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#00C2FF]' 
                    : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                Launch Builder <Workflow className="h-4 w-4 text-[#00C2FF]" />
              </a>
            </div>

            {/* Compliance certifications */}
            <div className="flex flex-wrap items-center gap-6 pt-6 text-[10px] font-mono text-gray-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> AES-256 Encryption</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-violet-400" /> GDPR & HIPAA Compliant Data Storage</span>
            </div>
          </div>

          {/* Right Hero: HTML5 Canvas 3D Mesh */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px]">
            <div className={`p-6 rounded-3xl border w-full max-w-[420px] relative overflow-hidden backdrop-blur-md ${
              darkMode ? 'bg-[#0E1524]/60 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xs font-mono uppercase text-gray-500 mb-2 tracking-wider flex items-center gap-1.5 justify-between">
                <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5 text-violet-400" /> CONTACT SYSTEM MESH</span>
                <span className="text-[10px] text-emerald-400 font-bold animate-pulse">● GATEWAY ONLINE</span>
              </h3>

              {/* HTML5 Canvas for stunning rotating telecom constellation */}
              <div className="h-[280px] w-full relative flex items-center justify-center rounded-2xl bg-black/25 overflow-hidden border border-white/5">
                <canvas ref={heroCanvasRef} className="absolute inset-0 w-full h-full object-cover" />
                
                {/* Active telemetry data readout */}
                <div className="absolute bottom-3 left-3 text-[8px] font-mono text-gray-400 bg-black/50 px-2 py-1 rounded">
                  SIP RELAY: Active
                </div>
                <div className="absolute bottom-3 right-3 text-[8px] font-mono text-gray-400 bg-black/50 px-2 py-1 rounded">
                  SLA: {liveSlaPercent}%
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-gray-400 bg-black/30 p-2 rounded-lg">
                <span>⚡ Low-Latency Cloud Servers</span>
                <span className="text-[#00C2FF] font-bold">99.99% Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. ECOSYSTEM BENTO GRID
           ========================================== */}
        <div id="ecosystem" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#8B5CF6] uppercase block font-bold">Suite Architecture</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Complete Business Communication Platform
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Say goodbye to physical EPABX hardware. Everything you need to capture, route, record, and convert client conversations resides inside our cloud system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Visual IVR", desc: "Build multi-level menus with natural language greets, redirecting calls automatically based on department selection.", icon: Workflow, accent: "text-[#00C2FF] bg-[#00C2FF]/10" },
              { title: "Smart Routing", desc: "Balance incoming calls via custom rules like Round Robin, Priority Client maps, or Time-based shift rules.", icon: Sliders, accent: "text-violet-400 bg-violet-500/10" },
              { title: "Virtual Numbers", desc: "Secure localized business DID or international Toll-Free numbers to boost customer trust instantly.", icon: Globe, accent: "text-emerald-400 bg-emerald-500/10" },
              { title: "Call Recording", desc: "Automatically record conversation streams for legal security, quality training, and CRM logs.", icon: Volume2, accent: "text-rose-400 bg-rose-500/10" },
              { title: "Platform Analytics", desc: "Track call trends, average duration stats, missed ratios, and support agent pickup times live.", icon: BarChart2, accent: "text-amber-400 bg-amber-500/10" },
              { title: "Missed Call Auto", desc: "Instantly trigger localized follow-up SMS and WhatsApp schedules when line drops or queue overflows.", icon: Zap, accent: "text-pink-400 bg-pink-500/10" },
              { title: "Multi-Agent Support", desc: "Deploy specialized agent dashboards with concurrent ring-group permissions and team monitoring.", icon: Users, accent: "text-cyan-400 bg-cyan-500/10" },
              { title: "CRM Integrations", desc: "Native GoHighLevel, HubSpot, and n8n webhooks updating contact profiles instantly after hangup.", icon: Database, accent: "text-purple-400 bg-purple-500/10" }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-violet-500/40 group backdrop-blur-md ${
                  darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div>
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${item.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold font-display mb-2">{item.title}</h3>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{item.desc}</p>
                  </div>
                  <span className="text-[10px] font-mono text-violet-400 mt-4 block">Interactive Capability →</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            3. INTERACTIVE SECTION: IVR Builder
           ========================================== */}
        <div id="ivr_builder" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Visual Flow Creator</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Interactive IVR Builder
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Customize, configure, and simulate a complete multi-level business phone menu instantly. Add greeting scripts, update parameters, and trigger the live simulation!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Node Builder Area */}
            <div className={`lg:col-span-8 p-6 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.05] mb-6">
                  <h3 className="text-xs font-mono uppercase text-gray-500 flex items-center gap-1.5">
                    <Workflow className="h-4 w-4 text-[#00C2FF]" /> IVR NODE FLOW EDITOR
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => addNode('menu')} 
                      className="px-2.5 py-1.5 bg-[#00C2FF]/10 text-[#00C2FF] hover:bg-[#00C2FF]/20 rounded text-[10px] font-mono font-semibold flex items-center gap-1 transition-all"
                    >
                      <Plus className="h-3 w-3" /> Add Menu
                    </button>
                    <button 
                      onClick={() => addNode('route')} 
                      className="px-2.5 py-1.5 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 rounded text-[10px] font-mono font-semibold flex items-center gap-1 transition-all"
                    >
                      <Plus className="h-3 w-3" /> Add Route
                    </button>
                    <button 
                      onClick={() => addNode('voicemail')} 
                      className="px-2.5 py-1.5 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded text-[10px] font-mono font-semibold flex items-center gap-1 transition-all"
                    >
                      <Plus className="h-3 w-3" /> Voicemail
                    </button>
                  </div>
                </div>

                {/* Nodes Stack */}
                <div className="space-y-4">
                  {ivrNodes.map((node, index) => {
                    const isSelected = selectedBuilderNode === node.id;
                    return (
                      <div 
                        key={node.id}
                        onClick={() => setSelectedBuilderNode(node.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                          isSelected 
                            ? 'border-violet-500 bg-violet-500/[0.03] shadow-md' 
                            : (darkMode ? 'border-white/5 hover:border-white/15 hover:bg-white/[0.01]' : 'border-slate-200 hover:bg-slate-50')
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">
                              Step 0{index + 1}
                            </span>
                            <span className="text-[9px] font-mono text-[#00C2FF] uppercase font-bold tracking-wider">
                              {node.type}
                            </span>
                            <h4 className="text-xs font-bold font-display">{node.title}</h4>
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNode(node.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 hover:text-rose-400 text-gray-500 p-1 transition-all"
                            title="Delete Node"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {isSelected ? (
                          <div className="mt-2" onClick={e => e.stopPropagation()}>
                            <span className="text-[9px] font-mono text-gray-500 uppercase block mb-1">CONFIGURE CONTENT ACTION</span>
                            <textarea 
                              value={node.config}
                              onChange={(e) => updateNodeConfig(node.id, e.target.value)}
                              rows={2}
                              className={`w-full p-2 text-xs rounded border focus:outline-none focus:border-violet-500 font-mono ${
                                darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                              }`}
                            />
                          </div>
                        ) : (
                          <p className="text-[11px] text-gray-400 font-mono truncate">{node.config}</p>
                        )}

                        {/* Connector dot for flow visualization */}
                        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 bg-violet-500 rounded-full z-10 hidden group-last:hidden sm:block" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Simulation button */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <button
                  onClick={testIvrFlow}
                  disabled={builderPlaying}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg"
                >
                  <Play className="h-4 w-4 fill-white text-white" /> {builderPlaying ? "SIMULATING FLOW IN REAL-TIME..." : "TEST / RUN SIMULATED IVR"}
                </button>
              </div>
            </div>

            {/* Run logs console monitor */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className={`p-6 rounded-2xl border flex-grow flex flex-col justify-between backdrop-blur-md relative overflow-hidden ${
                darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div>
                  <h3 className="text-xs font-mono uppercase text-gray-500 mb-4 tracking-wider flex items-center gap-1.5 justify-between">
                    <span>📟 SIP LOG MONITOR</span>
                    {builderPlaying && <span className="text-emerald-400 font-bold animate-pulse text-[10px]">ACTIVE RING...</span>}
                  </h3>

                  {/* Log Console window */}
                  <div className={`p-4 rounded-xl min-h-[250px] border font-mono text-[10px] space-y-2 leading-relaxed h-[320px] overflow-y-auto ${
                    darkMode ? 'bg-black/60 border-white/5 text-gray-300' : 'bg-slate-900 border-slate-800 text-slate-100'
                  }`}>
                    {builderLogs.length > 0 ? (
                      builderLogs.map((log, i) => (
                        <p key={i} className="animate-fade-in text-[#00C2FF]">{log}</p>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 italic pt-24">
                        Console ready.<br />
                        Press "TEST / RUN SIMULATED IVR" to view execution tree logs.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-[9px] font-mono text-gray-500 border-t border-white/[0.05] pt-4">
                  * Live deployment connects these steps immediately to SIP gateways and twilio trunks.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            4. SMART CALL ROUTING
           ========================================== */}
        <div id="call_routing" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Intelligent Pipelines</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Smart Call Routing
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Establish advanced parameters that ensure incoming calls connect to the absolute best possible representatives without delays.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left selector card */}
            <div className={`lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">SELECT ROUTING BALANCER RULE</span>
                
                {[
                  { id: 'round-robin', title: 'Round Robin Distribution', desc: 'Distribute calls evenly to keep workloads uniform across agents.' },
                  { id: 'time-based', title: 'Time-Based Shifts Routing', desc: 'Route calls automatically based on business hours, holidays, or shifts.' },
                  { id: 'priority', title: 'Priority / VIP Routing', desc: 'Route high-value client accounts directly to dedicated supervisors.' }
                ].map((item) => {
                  const isSelected = routingFactor === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setRoutingFactor(item.id as any);
                        setSimState('idle');
                        setSimLog([]);
                      }}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        isSelected 
                          ? 'border-[#00C2FF] bg-[#00C2FF]/5' 
                          : (darkMode ? 'border-white/5 hover:bg-white/[0.01]' : 'border-slate-200 hover:bg-slate-50')
                      }`}
                    >
                      <h4 className="text-xs font-bold">{item.title}</h4>
                      <p className={`text-[10px] leading-relaxed mt-1 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <button
                  onClick={startRoutingSim}
                  disabled={simState === 'routing' || simState === 'started'}
                  className="w-full py-3 bg-[#00C2FF] hover:bg-[#00b0e6] text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <RefreshCw className={`h-4 w-4 ${simState === 'routing' ? 'animate-spin' : ''}`} /> 
                  {simState === 'idle' ? "TRIGGER SIMULATED CALL" : simState === 'connected' ? "TRIGGER CALL AGAIN" : "ROUTING CLIENT..."}
                </button>
              </div>
            </div>

            {/* Right flow visualization window */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className={`p-6 rounded-2xl border flex-grow flex flex-col justify-between relative overflow-hidden backdrop-blur-md ${
                darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div>
                  <h3 className="text-xs font-mono uppercase text-gray-500 mb-4 tracking-wider">
                    DECISION FLOW PATH DIAGRAM
                  </h3>

                  {/* Flow chart layout */}
                  <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-mono mb-6 relative">
                    <div className={`p-2 rounded border transition-all ${simState !== 'idle' ? 'border-[#00C2FF] bg-[#00C2FF]/10 text-white font-bold' : 'border-white/5 text-gray-500'}`}>
                      1. Inbound SIP
                    </div>
                    <div className={`p-2 rounded border transition-all ${simState === 'routing' || simState === 'connected' ? 'border-[#00C2FF] bg-[#00C2FF]/10 text-white font-bold' : 'border-white/5 text-gray-500'}`}>
                      2. Geo / Shift
                    </div>
                    <div className={`p-2 rounded border transition-all ${simState === 'routing' || simState === 'connected' ? 'border-violet-500 bg-violet-500/10 text-white font-bold' : 'border-white/5 text-gray-500'}`}>
                      3. Algorithmic
                    </div>
                    <div className={`p-2 rounded border transition-all ${simState === 'connected' ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold' : 'border-white/5 text-gray-500'}`}>
                      4. Connect
                    </div>
                  </div>

                  {/* Output Log */}
                  <div className={`p-4 rounded-xl min-h-[140px] border font-mono text-[10px] space-y-2 leading-relaxed ${
                    darkMode ? 'bg-black/60 border-white/5 text-gray-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    {simLog.length > 0 ? (
                      simLog.map((log, i) => (
                        <p key={i} className="animate-fade-in">{log}</p>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 italic pt-12">
                        Select a rule on the left, then click "TRIGGER SIMULATED CALL" to observe live routing decision sequences.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-[9px] font-mono text-gray-500 border-t border-white/[0.05] pt-4">
                  <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-400" /> Priority levels</span>
                  <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-400" /> Holiday exceptions</span>
                  <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-400" /> Custom rings</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            5. MULTI-AGENT CONTACT CENTER
           ========================================== */}
        <div id="call_center" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Operations Dashboard</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Multi-Agent Contact Center
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Equip your front desk staff with clear visual dashboards, concurrent queue metrics, call recordings, and supervisor whisper settings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Live Stats sidebar widget */}
            <div className={`lg:col-span-4 p-6 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">REAL-TIME OPERATIONAL METRICS</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Calls Handled</span>
                    <strong className="text-lg font-mono text-[#00C2FF]">{liveCallsHandled}</strong>
                  </div>
                  <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Current SLA</span>
                    <strong className="text-lg font-mono text-emerald-400">{liveSlaPercent}%</strong>
                  </div>
                  <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Calls in Queue</span>
                    <strong className="text-lg font-mono text-violet-400 animate-pulse">{activeQueue}</strong>
                  </div>
                  <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Avg Answer Speed</span>
                    <strong className="text-lg font-mono text-amber-400">2.1s</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block mb-2">SUPERVISOR ADVANCED PANELS</span>
                  <div className="space-y-2 text-xs">
                    <p className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Silent Call Monitoring (SOC2)</p>
                    <p className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Live Agent Whispering Mode</p>
                    <p className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Live Call Conferencing / Barge-In</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/[0.05] pt-4">
                <p className="text-[9px] font-mono text-gray-500">
                  * Performance telemetry syncs dynamically with the active n8n dashboard for real-time tracking.
                </p>
              </div>
            </div>

            {/* Active Agents Grid */}
            <div className="lg:col-span-8">
              <div className={`p-6 rounded-2xl border backdrop-blur-md h-full flex flex-col justify-between ${
                darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.05] mb-6">
                    <h3 className="text-xs font-mono uppercase text-gray-500 flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-emerald-400" /> ACTIVE CONCURRENT STAFF MEMBERS
                    </h3>
                    <span className="text-[9px] font-mono text-[#00C2FF] uppercase font-bold tracking-widest animate-pulse">● LIVE STATUS UPDATES ACTIVE</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {agentsList.map((agent, i) => {
                      return (
                        <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${
                          darkMode ? 'bg-black/35 border-white/5' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <div>
                            <h4 className="text-xs font-bold font-display">{agent.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded-full font-bold ${
                                agent.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400' :
                                agent.status === 'In Call' ? 'bg-rose-500/20 text-rose-400 animate-pulse' :
                                agent.status === 'Wrap Up' ? 'bg-[#00C2FF]/20 text-[#00C2FF]' : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {agent.status}
                              </span>
                              {agent.status === 'In Call' && <span className="text-[9px] font-mono text-gray-500">{agent.duration}</span>}
                            </div>
                          </div>
                          
                          <div className="text-right text-[10px] font-mono text-gray-500">
                            <div>Calls: {agent.count}</div>
                            <div className="text-[#00C2FF] font-semibold">CSAT: {agent.quality}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <a href="#demo_form" className="text-xs font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1">
                    Configure concurrent queues parameters →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            6. CALL RECORDING & MONITORING
           ========================================== */}
        <div id="call_recording" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Secure Auditing Hub</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Call Recording & Monitoring
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Keep legal backups, review call workflows, and inspect transcripts dynamically. Play a simulated recording below to test the active audio player!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Recordings List */}
            <div className={`lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase block mb-2">SECURE CALL DATABASE</span>
                
                {/* Search bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-500" />
                  <input
                    type="text"
                    value={recordingSearch}
                    onChange={(e) => setRecordingSearch(e.target.value)}
                    placeholder="Search logs by caller number..."
                    className={`w-full pl-9 pr-4 py-2 text-xs rounded-lg border focus:outline-none ${
                      darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {/* List items */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto">
                  {filteredRecordings.map((rec) => {
                    const isPlaying = playingRecording === rec.id;
                    return (
                      <button
                        key={rec.id}
                        onClick={() => {
                          setPlayingRecording(rec.id);
                          setRecordingPlaybackProgress(0);
                        }}
                        className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          isPlaying 
                            ? 'border-violet-500 bg-violet-500/10' 
                            : (darkMode ? 'border-white/5 hover:bg-white/[0.01]' : 'border-slate-100 hover:bg-slate-50')
                        }`}
                      >
                        <div>
                          <div className="font-bold">{rec.caller}</div>
                          <div className="text-[9px] text-gray-500 font-mono mt-0.5">{rec.date} • {rec.department}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-gray-400">{rec.duration}</span>
                        </div>
                      </button>
                    );
                  })}
                  {filteredRecordings.length === 0 && (
                    <p className="text-center text-xs text-gray-500 italic py-8">No records match search criterion.</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 mt-4 text-[9px] font-mono text-gray-500">
                * HIPAA compliant archiving storage automatically clears logs according to custom retention tags.
              </div>
            </div>

            {/* Right Waveform Audio Player */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className={`p-6 rounded-2xl border flex-grow flex flex-col justify-between backdrop-blur-md relative overflow-hidden ${
                darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-md'
              }`}>
                {playingRecording ? (
                  <>
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.05] mb-4">
                      <div>
                        <h3 className="text-xs font-bold">Audio Call Playback Hub</h3>
                        <span className="text-[9px] font-mono text-gray-500">{recordingsData.find(r => r.id === playingRecording)?.caller}</span>
                      </div>
                      <span className="text-[9px] font-mono text-violet-400 uppercase font-bold tracking-widest animate-pulse">● PLAYING...</span>
                    </div>

                    {/* Waveform graphic generator */}
                    <div className="h-16 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center gap-[2.5px] px-4 my-6">
                      {Array.from({ length: 44 }).map((_, i) => {
                        const h = 5 + Math.sin(i * 0.4 + recordingPlaybackProgress * 0.1) * 35 + Math.random() * 8;
                        const active = (i / 44) * 100 <= recordingPlaybackProgress;
                        return (
                          <div 
                            key={i} 
                            className={`w-[4px] rounded-full transition-colors ${
                              active ? 'bg-violet-500 shadow-sm' : 'bg-white/10'
                            }`}
                            style={{ height: `${Math.max(4, h)}px` }}
                          />
                        );
                      })}
                    </div>

                    {/* Call Transcript highlight */}
                    <div className="mb-6 space-y-1">
                      <span className="text-[9px] font-mono text-gray-500 uppercase block">AUTOMATED CONVERSATION TRANSCRIPT</span>
                      <div className={`p-3 rounded-lg text-[11px] leading-relaxed border font-mono ${
                        darkMode ? 'bg-black/50 border-white/5 text-gray-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}>
                        {recordingsData.find(r => r.id === playingRecording)?.transcript}
                      </div>
                    </div>

                    {/* Progress controller */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-grow h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-violet-600 to-[#00C2FF] transition-all"
                          style={{ width: `${recordingPlaybackProgress}%` }}
                        />
                      </div>
                      <button 
                        onClick={() => setPlayingRecording(null)} 
                        className="px-3 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-[10px] rounded font-mono font-semibold border border-rose-500/20 transition-all"
                      >
                        Stop Playback
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16 space-y-2 italic text-gray-500 font-mono text-xs my-auto">
                    <Volume2 className="h-8 w-8 mx-auto text-[#00C2FF] mb-2 animate-bounce" />
                    <p>Select any recording on the left side to load the secure HIPAA call player and transcript viewer.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            7. MISSED CALL AUTOMATION
           ========================================== */}
        <div id="missed_call_automation" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Autonomous Customer Recovery</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Missed Call Automation
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Never miss another lead opportunity. Automatically trigger instant, localized SMS updates, WhatsApp chat routes, and CRM pipeline changes the second a customer line drops.
            </p>
          </div>

          {/* Interactive Node Path */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[35px] left-0 right-0 h-0.5 border-t border-dashed border-violet-500/20 -z-10" />

            {[
              { step: "01", title: "Customer Misses Call", desc: "Line drops or queue overflows. Event triggers an active webhook immediately.", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
              { step: "02", title: "Instant SMS Sent", desc: "Sends immediate thank-you text with a Calendly link: 'Sorry we missed you...'", color: "text-[#00C2FF] bg-[#00C2FF]/10 border-[#00C2FF]/20" },
              { step: "03", title: "GHL Contact Sync", desc: "Automatically creates a CRM profile, adding a 'Hot Lead' or 'Follow-up' tag.", color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
              { step: "04", title: "WhatsApp Auto-Ping", desc: "Fires direct WhatsApp message to schedule a priority callback meeting.", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" }
            ].map((item, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border backdrop-blur-md relative z-10 ${
                darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-gray-500">STEP {item.step}</span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${item.color}`}>
                    ACTIVE
                  </span>
                </div>
                <h4 className="text-xs font-bold font-display mb-1">{item.title}</h4>
                <p className={`text-[11px] leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            8. ADVANCED CALL ANALYTICS (Real-time charts)
           ========================================== */}
        <div id="analytics" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Operational Insights</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Advanced Call Analytics
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Gain complete visibility over client communication patterns, average queues thresholds, call logs, and support performance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visual SVG charts mock */}
            <div className={`lg:col-span-8 p-6 rounded-2xl border backdrop-blur-md flex flex-col justify-between ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.05] mb-6">
                  <h3 className="text-xs font-mono uppercase text-gray-500 flex items-center gap-1.5">
                    <BarChart2 className="h-4 w-4 text-[#00C2FF]" /> CALL VOLUME TREND ANALYSIS (WEEKLY)
                  </h3>
                  <span className="text-[9px] font-mono text-emerald-400">STATUS: LIVE METRICS</span>
                </div>

                {/* SVG Chart */}
                <div className="h-48 w-full relative flex items-end justify-between px-2 pt-6">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.05]">
                    <div className="border-b border-white w-full h-0" />
                    <div className="border-b border-white w-full h-0" />
                    <div className="border-b border-white w-full h-0" />
                    <div className="border-b border-white w-full h-0" />
                  </div>

                  {/* Bars representing weeks */}
                  {[
                    { day: "Mon", incoming: 410, missed: 25 },
                    { day: "Tue", incoming: 580, missed: 15 },
                    { day: "Wed", incoming: 690, missed: 10 },
                    { day: "Thu", incoming: 620, missed: 20 },
                    { day: "Fri", incoming: 750, missed: 8 },
                    { day: "Sat", incoming: 310, missed: 32 },
                    { day: "Sun", incoming: 120, missed: 40 }
                  ].map((data, i) => {
                    const incH = (data.incoming / 800) * 100;
                    const misH = (data.missed / 800) * 100;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1.5 w-[11%]">
                        <div className="w-full h-32 flex items-end gap-1 relative group">
                          {/* Incoming Call bar */}
                          <div 
                            className="w-1/2 bg-gradient-to-t from-violet-600 to-[#00C2FF] rounded-t-sm transition-all duration-500"
                            style={{ height: `${incH}%` }}
                            title={`Incoming: ${data.incoming}`}
                          />
                          {/* Missed Call bar */}
                          <div 
                            className="w-1/2 bg-gradient-to-t from-rose-500 to-pink-500 rounded-t-sm transition-all duration-500"
                            style={{ height: `${Math.max(4, misH)}%` }}
                            title={`Missed: ${data.missed}`}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase">{data.day}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center gap-6 text-[9px] font-mono text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded bg-violet-600" /> Incoming Connection Streams
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded bg-rose-500" /> Auto-Recovered Missed Calls
                  </span>
                </div>
              </div>
            </div>

            {/* Quick telemetry metrics */}
            <div className="lg:col-span-4">
              <div className={`p-6 rounded-2xl border h-full flex flex-col justify-between ${
                darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="space-y-6">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block mb-2">KPI PERFORMANCE REVIEW</span>
                  
                  {[
                    { label: "SLA Compliant (Pickup under 15s)", val: "98.4%", target: "Target > 95.0%", status: "Optimal" },
                    { label: "Daily Incoming Overflow Index", val: "2.1%", target: "Target < 5.0%", status: "Optimal" },
                    { label: "CRM Sync Delivery Success", val: "100.0%", target: "Target 100%", status: "Optimal" }
                  ].map((kpi, idx) => (
                    <div key={idx} className="pb-4 border-b border-white/[0.05] last:border-b-0">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-400 font-display">{kpi.label}</span>
                        <strong className="font-mono text-emerald-400">{kpi.val}</strong>
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
                        <span>{kpi.target}</span>
                        <span className="text-[#00C2FF] uppercase font-bold">{kpi.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <a href="#demo_form" className="w-full py-2.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all">
                    Generate diagnostic performance audit
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            9. INTERACTIVE WORKFLOW DIAGRAM
           ========================================== */}
        <div id="workflow" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#8B5CF6] uppercase block font-bold">Standard Operations</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Business Communication Workflow
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              A single call triggers a cascade of automated events. From visual welcome greetings to automatic CRM record matching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-center">
            {[
              { title: "Incoming Call", desc: "Customer dials your dedicated toll-free or localized virtual line.", num: "01" },
              { title: "Interactive IVR", desc: "Interactive welcome script runs, providing immediate keypress selections.", num: "02" },
              { title: "Agent Match", desc: "SIP algorithms direct call to shift-specific in-office representatives.", num: "03" },
              { title: "Call Recording", desc: "Streams are stored automatically in encrypted cloud storage.", num: "04" },
              { title: "CRM Profile Sync", desc: "n8n webhooks match contact details inside GoHighLevel pipeline.", num: "05" },
              { title: "Visual Analytics", desc: "Updates dashboard metrics and archives transcription indices.", num: "06" }
            ].map((step, idx) => (
              <div key={idx} className={`p-4 rounded-xl border relative ${
                darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <span className="text-[10px] font-mono text-violet-400 font-bold block mb-2">PHASE {step.num}</span>
                <h4 className="text-xs font-bold font-display mb-1">{step.title}</h4>
                <p className={`text-[10px] leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{step.desc}</p>
                {idx < 5 && (
                  <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 text-violet-500 hidden lg:block z-10 font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            10. INDUSTRY USE CASES
           ========================================== */}
        <div id="industry_use_cases" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Segment Solutions</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Industry Use Cases
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Discover how leading companies globally and local Indian offices deploy our Cloud Telephony suite to boost operational speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { industry: "Healthcare", useCase: "Appointment Helpline", desc: "Patient reservation queues, automated clinic schedule notifications, and medical report download links via SMS.", icon: Building },
              { industry: "Education", useCase: "Admission Support", desc: "Centralized admissions toll-free line distributing student calls to counselors via Round Robin rules.", icon: GraduationCap },
              { industry: "Real Estate", useCase: "Lead Distribution", desc: "Instant response for property site-visit inquiries, forwarding buyer contacts instantly to designated local area managers.", icon: Briefcase },
              { industry: "Retail & E-commerce", useCase: "Customer Support Helpline", desc: "Automate refunds, order track queries, and cancel requests, routing complex escalations to specialists.", icon: Smartphone },
              { industry: "Manufacturing", useCase: "Service Desk Requests", desc: "Support ticketing lines for factory machinery parts orders, updating dispatch and billing CRM logs.", icon: Settings },
              { industry: "Professional Services", useCase: "Consultation Booking Desk", desc: "Client consultation booking line, syncing lawyers or consultants availability with GCal blocks.", icon: Target }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between backdrop-blur-md ${
                  darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-display text-gray-400 uppercase tracking-wide">{item.industry}</h4>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">{item.useCase}</span>
                      </div>
                    </div>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{item.desc}</p>
                  </div>
                  <span className="text-[9px] font-mono text-violet-400 mt-4 block">Deployment template available →</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            11. INTEGRATIONS CAROUSEL
           ========================================== */}
        <div id="integrations" className="mb-24 py-12 border-y border-white/[0.05] scroll-mt-12 overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xs font-mono uppercase text-gray-500 tracking-wider">CONNECT WITH YOUR EXISTING WORKSPACE STACK</h3>
          </div>

          {/* Infinite horizontal scroll effect using CSS animations */}
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee flex whitespace-nowrap gap-12 text-sm font-mono text-gray-400 items-center font-bold">
              <span>🚀 GoHighLevel</span>
              <span>🔗 HubSpot</span>
              <span>💼 Salesforce</span>
              <span>🐘 Zoho CRM</span>
              <span>📅 Google Calendar</span>
              <span>💬 WhatsApp API</span>
              <span>⚙️ n8n workflows</span>
              <span>💳 Razorpay</span>
              <span>💰 Stripe Payments</span>
              <span>📱 Twilio Telecom</span>
            </div>

            <div className="absolute top-0 animate-marquee2 flex whitespace-nowrap gap-12 text-sm font-mono text-gray-400 items-center font-bold">
              <span>🚀 GoHighLevel</span>
              <span>🔗 HubSpot</span>
              <span>💼 Salesforce</span>
              <span>🐘 Zoho CRM</span>
              <span>📅 Google Calendar</span>
              <span>💬 WhatsApp API</span>
              <span>⚙️ n8n workflows</span>
              <span>💳 Razorpay</span>
              <span>💰 Stripe Payments</span>
              <span>📱 Twilio Telecom</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            12. CLOUD TELEPHONY ARCHITECTURE
           ========================================== */}
        <div id="architecture" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Technical Specifications</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Cloud Telephony Architecture
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              A robust, 3D technical representation of our redundant cloud data pipeline routing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className={`p-6 rounded-2xl border ${
              darkMode ? 'bg-[#0E1524]/60 border-white/10' : 'bg-white border-slate-200'
            }`}>
              <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 text-center font-mono text-[10px]">
                {[
                  { title: "1. Customer", desc: "Inbound Dial", icon: Users },
                  { title: "2. Virtual Number", desc: "DID / SIP Trunks", icon: Globe },
                  { title: "3. Interactive IVR", desc: "Visual keypress", icon: Workflow },
                  { title: "4. Routing Engine", desc: "Round Robin", icon: Sliders },
                  { title: "5. Active Agent", desc: "SIP Desk Handset", icon: Headphones },
                  { title: "6. CRM & Analytics", desc: "GHL / n8n Sync", icon: Database }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex-1 p-3 bg-black/20 rounded-lg border border-white/5 flex flex-col justify-between items-center gap-2">
                      <div className="h-8 w-8 rounded bg-violet-500/10 flex items-center justify-center text-violet-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white mb-0.5">{item.title}</div>
                        <div className="text-gray-500">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            13. COMPARISON TABLE
           ========================================== */}
        <div id="comparison" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Why Business Choose Us</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Feature Comparison Matrix
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Compare features and see how Natton Digital stands against traditional competitors.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className={`w-full text-xs text-left border-collapse rounded-xl overflow-hidden border ${
              darkMode ? 'border-white/10 text-gray-300' : 'border-slate-200 text-slate-700'
            }`}>
              <thead>
                <tr className={darkMode ? 'bg-black/40 text-white' : 'bg-slate-100 text-slate-900'}>
                  <th className="p-4 font-bold border-b border-white/15">Features Matrix</th>
                  <th className="p-4 font-bold text-violet-400 border-b border-white/15">Natton Digital</th>
                  <th className="p-4 font-bold border-b border-white/15">Exotel</th>
                  <th className="p-4 font-bold border-b border-white/15">MCube</th>
                  <th className="p-4 font-bold border-b border-white/15">Knowlarity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { feature: "Visual IVR Drag & Drop Builder", natton: "✓ Included (No-code)", comp1: "✗ Paid Addon", comp2: "✗ API Only", comp3: "✗ Traditional setup" },
                  { feature: "Missed Call SMS / WhatsApp Triggers", natton: "✓ Native Workflows", comp1: "✓ SMS Only", comp2: "✗ Basic routing", comp3: "✗ Manual webhook setup" },
                  { feature: "Low-Latency Voice Wave Playback", natton: "✓ Canvas Waveform Included", comp1: "✗ Audio Download Only", comp2: "✗ Download Only", comp3: "✗ Traditional player" },
                  { feature: "Direct GoHighLevel CRM Integrations", natton: "✓ Out-of-the-box Sync", comp1: "✗ Custom Dev Required", comp2: "✗ Custom Dev Required", comp3: "✗ Basic APIs" },
                  { feature: "Agent Live Supervisors Monitoring", natton: "✓ Whisper / Barge Mode", comp1: "✓ Premium Plan Only", comp2: "✗ Silent Only", comp3: "✓ Premium Only" },
                  { feature: "Zero Setup Cost & Free Trial DID", natton: "✓ Yes (4 Hour Setup)", comp1: "✗ ₹5,000 Setup fee", comp2: "✗ ₹10,000 Setup fee", comp3: "✗ Long manual contracts" }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? (darkMode ? 'bg-white/[0.01]' : 'bg-slate-50') : ''}>
                    <td className="p-4 font-semibold">{row.feature}</td>
                    <td className="p-4 text-emerald-400 font-bold">{row.natton}</td>
                    <td className="p-4 text-gray-500">{row.comp1}</td>
                    <td className="p-4 text-gray-500">{row.comp2}</td>
                    <td className="p-4 text-gray-500">{row.comp3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            14. ROI METRICS (Count-up statistics)
           ========================================== */}
        <div id="roi_metrics" className="mb-24 scroll-mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "95%", desc: "Call Availability Index", accent: "text-[#00C2FF]" },
              { val: "50%", desc: "Faster Client Connection Times", accent: "text-violet-400" },
              { val: "30%", desc: "Fewer Missed Business Inquiries", accent: "text-emerald-400" },
              { val: "98.4%", desc: "Average CSAT Quality Score", accent: "text-pink-400" }
            ].map((metric, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border backdrop-blur-md ${
                darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <strong className={`text-4xl font-mono font-bold block mb-2 ${metric.accent}`}>{metric.val}</strong>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            15. PRICING PLANS
           ========================================== */}
        <div id="pricing" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Billing Bands</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Flexible Pricing Plans
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Clear, honest monthly options. No hidden platform margins or forced long term setups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Starter Tier", price: "₹4,999/month", popular: false, features: ["Single Visual IVR Flow", "1 Dedicated Virtual Local DID", "Basic Caller ID Analytics", "Instant Missed Call SMS setup", "24x7 Cloud Server Hosting"] },
              { name: "Growth Tier", price: "₹14,999/month", popular: true, features: ["Unlimited Visual IVR Flows", "3 Local DID or 1 National Toll-Free", "Advanced Recorders + Live Players", "Multi-Agent Queue dashboards", "Direct GHL & n8n Sync integrations"] },
              { name: "Besproke Enterprise", price: "Custom Setup", popular: false, features: ["Besproke SIP trunk endpoints", "Multi-country Virtual numbers", "Supervisor Barge-In whispering tools", "SOC2 compliance SLA guarantees", "Dedicated technical support desk"] }
            ].map((plan, i) => (
              <div key={i} className={`p-6 rounded-3xl border flex flex-col justify-between relative overflow-hidden backdrop-blur-md ${
                plan.popular 
                  ? 'border-violet-500 bg-violet-500/[0.04] shadow-xl' 
                  : (darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200 shadow-sm')
              }`}>
                {plan.popular && (
                  <span className="absolute top-3 right-3 text-[8px] font-mono bg-violet-600 text-white px-2 py-0.5 rounded uppercase font-bold">
                    POPULAR CHOICE
                  </span>
                )}

                <div>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">{plan.name}</h4>
                  <strong className="text-2xl font-display font-bold block mb-6">{plan.price}</strong>
                  
                  <ul className="space-y-3 mb-8 text-xs leading-relaxed text-gray-400">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-left">
                        <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="#demo_form" 
                  className={`w-full py-2.5 rounded-lg text-center font-bold text-xs transition-all ${
                    plan.popular 
                      ? 'bg-violet-600 hover:bg-violet-500 text-white glow-violet' 
                      : (darkMode ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white')
                  }`}
                >
                  Configure Plan Options
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            16. FREQUENTLY ASKED QUESTIONS (12 Accordions)
           ========================================== */}
        <div id="faqs" className="mb-24 max-w-4xl mx-auto space-y-8 scroll-mt-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Knowledge Base</span>
            <h2 className="text-2xl font-bold font-display">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-500">Exhaustive diagnostic documentation mapping virtual lines and telephony setups.</p>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => {
              const isOpen = faqStates[idx];
              return (
                <div 
                  key={idx} 
                  className={`border rounded-xl transition-all ${
                    darkMode ? 'bg-[#0E1524]/60 border-white/5' : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-violet-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-4 pt-0 border-t border-white/[0.03] text-xs leading-relaxed text-gray-400">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            17. BOOK DEMO FORM
           ========================================== */}
        <div id="demo_form" className="mb-24 scroll-mt-12 max-w-2xl mx-auto">
          <div className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden backdrop-blur-md ${
            darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-100 shadow-xl'
          }`}>
            <div className="absolute top-0 right-0 h-40 w-40 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
            
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl">✓</div>
                <h3 className="text-lg font-bold font-display">Demo Schedule Captured</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  Your enterprise details were successfully dispatched into our active GHL pipeline. One of our senior cloud telephony specialists will contact you within 15 minutes!
                </p>
                <button 
                  onClick={() => {
                    setFormSubmitted(false);
                    generateMathCaptcha();
                  }} 
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-xs rounded font-mono transition-all"
                >
                  Submit Another Inbound Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-[#00C2FF] uppercase block">GoHighLevel Connected</span>
                  <h3 className="text-lg font-bold font-display">Book Your Cloud Telephony Demo</h3>
                  <p className="text-xs text-gray-400">Review setups, virtual numbers, and integrate custom visual IVRs with your CRM.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-violet-500 ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Company Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-violet-500 ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Email address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-violet-500 ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Phone number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-violet-500 ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-violet-500 ${
                        darkMode ? 'bg-[#0E1524] border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United Arab Emirates">UAE</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-violet-500 ${
                        darkMode ? 'bg-[#0E1524] border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Professional Services">Professional Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Monthly Call Volume</label>
                    <select
                      value={formData.monthlyCallVolume}
                      onChange={(e) => setFormData({ ...formData, monthlyCallVolume: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-violet-500 ${
                        darkMode ? 'bg-[#0E1524] border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <option value="Under 10k calls">Under 10k calls</option>
                      <option value="10k - 50k calls">10k - 50k calls</option>
                      <option value="Over 50k calls">Over 50k calls</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Current Provider</label>
                    <input
                      type="text"
                      value={formData.currentProvider}
                      onChange={(e) => setFormData({ ...formData, currentProvider: e.target.value })}
                      placeholder="e.g. RingCentral, Exotel, None"
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-violet-500 ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Team Size</label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-violet-500 ${
                        darkMode ? 'bg-[#0E1524] border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <option value="Under 10 agents">Under 10 agents</option>
                      <option value="10 - 50 agents">10 - 50 agents</option>
                      <option value="Over 50 agents">Over 50 agents</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Custom Message / Request Details</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    placeholder="Tell us about your visual IVR requirements or queue setups..."
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-violet-500 ${
                      darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>

                {/* Math Captcha Verification */}
                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  darkMode ? 'bg-black/40 border-white/5' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold">Solve math verification:</span>
                    <span className="px-3 py-1 bg-violet-600/20 text-violet-300 rounded font-mono font-bold text-sm">
                      {captchaNum1} + {captchaNum2} = ?
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Answer"
                      disabled={captchaVerified}
                      className={`w-full sm:w-24 p-2 text-xs rounded-lg border focus:outline-none text-center ${
                        darkMode ? 'bg-black border-white/10 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                    
                    {captchaVerified ? (
                      <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                        <Check className="h-4 w-4" /> Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleCaptchaVerify}
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg font-mono transition-all"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading || !captchaVerified}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 disabled:opacity-50 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-violet-500/25"
                >
                  {loading ? 'SYNCING DETAILS WITH GOHIGHLEVEL...' : 'Request Telephony Setup Strategy Call'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ==========================================
            18. FINAL CTA
           ========================================== */}
        <div id="cta" className={`p-10 sm:p-16 rounded-3xl border text-center relative overflow-hidden backdrop-blur-md ${
          darkMode ? 'bg-[#0E1524]/60 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
        }`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight leading-tight mb-4">
            Modernize Your Business Communication
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
            Deploy localized virtual toll-free lines, set custom Multi-Level IVR welcome triggers, and let our cloud system automatically sync contact entries directly to GoHighLevel CRM.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#demo_form" 
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-violet-600/20 transition-all flex items-center gap-1.5 text-xs uppercase tracking-wider"
            >
              Book Cloud Telephony Demo
            </a>
            <a 
              href="#faqs" 
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg transition-all text-xs uppercase tracking-wider"
            >
              Talk To Experts
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
