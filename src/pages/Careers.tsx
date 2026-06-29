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
  Zap,
  Lock,
  ArrowUpRight,
  Target,
  FileText,
  MapPin,
  Clock,
  BriefcaseIcon,
  Users,
  Compass,
  GraduationCap,
  ChevronRight,
  Send,
  UploadCloud,
  Heart,
  Eye,
  Settings,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { RoutePath } from '../types';

interface CareersProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

// Interfaces for roles and stories
interface JobRole {
  id: string;
  title: string;
  department: 'Engineering' | 'AI & Automation' | 'Marketing' | 'Sales' | 'Operations' | 'Customer Success';
  location: string;
  experience: 'Entry' | 'Mid-Level' | 'Senior' | 'Lead';
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
  description: string;
  requirements: string[];
}

export default function Careers({ setPath, darkMode }: CareersProps) {
  // Navigation & Interactive states
  const [jobSearch, setJobSearch] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedLoc, setSelectedLoc] = useState<string>('all');
  const [selectedExp, setSelectedExp] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Application process state
  const [activeJobId, setActiveJobId] = useState<string>('ai_eng');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [parsingResume, setParsingResume] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<any>(null);

  // Application form submission state
  const [submittingApp, setSubmittingApp] = useState<boolean>(false);
  const [appSuccess, setAppSuccess] = useState<boolean>(false);
  const [candidateScore, setCandidateScore] = useState<number | null>(null);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [scheduleSuccess, setScheduleSuccess] = useState<boolean>(false);

  // Team stories active item
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);

  // Hiring process timeline active step
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);

  // Global map selected region
  const [activeRegion, setActiveRegion] = useState<string>('India');

  // Talent community state
  const [communityName, setCommunityName] = useState<string>('');
  const [communityEmail, setCommunityEmail] = useState<string>('');
  const [communityInterest, setCommunityInterest] = useState<string>('Engineering');
  const [communitySuccess, setCommunitySuccess] = useState<boolean>(false);
  const [communityLoading, setCommunityLoading] = useState<boolean>(false);

  // Application form fields
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [country, setCountry] = useState<string>('United States');
  const [linkedin, setLinkedin] = useState<string>('');
  const [portfolio, setPortfolio] = useState<string>('');
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [coverLetter, setCoverLetter] = useState<string>('');

  // 20 FAQ states
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Smooth scroll
  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Job opening dataset
  const openRoles: JobRole[] = [
    {
      id: 'ai_eng',
      title: 'Senior AI Research Engineer',
      department: 'AI & Automation',
      location: 'India (Remote / Bangalore)',
      experience: 'Senior',
      type: 'Full-time',
      description: 'Orchestrate next-generation LLM multi-agent nodes using custom pipeline structures and raw fine-tuned weights.',
      requirements: [
        'Deep expertise with @google/genai SDK, LangChain, and advanced vector indexes.',
        '5+ years experience building highly scaling production pipeline endpoints.',
        'Proven track record deployment with Docker and server-side TS/Python runtimes.'
      ]
    },
    {
      id: 'auto_spec',
      title: 'Autonomous Automation Specialist',
      department: 'AI & Automation',
      location: 'South East Asia (Remote)',
      experience: 'Mid-Level',
      type: 'Full-time',
      description: 'Architect complex asynchronous database loops, custom integrations, and CRM pathways on fair-code n8n platforms.',
      requirements: [
        'Advanced workflow setup mastery utilizing n8n, webhook triggers and JSON parsing.',
        'Strong knowledge of HubSpot and GoHighLevel API schemas.',
        'Solid foundation in TypeScript and regular expressions parsing.'
      ]
    },
    {
      id: 'growth_mkt',
      title: 'Growth Marketing Lead',
      department: 'Marketing',
      location: 'North America (Remote)',
      experience: 'Lead',
      type: 'Full-time',
      description: 'Own our high-volume programmatic SEO systems, outbound intelligence grids, and AEO model ranking structures.',
      requirements: [
        'Exceptional data-driven scaling mindset focusing on organic search engines and LLM answer feeds.',
        'Familiarity with Google Search Console, Ahrefs, and automated page generation models.',
        'Comfort with HTML schemas, JSON-LD configurations, and metadata pipelines.'
      ]
    },
    {
      id: 'full_stack',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Europe (Remote)',
      experience: 'Senior',
      type: 'Full-time',
      description: 'Lead engineering cycles for our core SaaS products (GrowthOS, AgenticOS) utilizing React, Vite, and serverless architectures.',
      requirements: [
        'Flawless mastery of React 18, TypeScript, Tailwind CSS, and bundlers like esbuild/vite.',
        'Experienced with relational database query architectures and server optimization layers.',
        'Rigorous writer of pristine unit tests and type-safe protocols.'
      ]
    },
    {
      id: 'ui_ux',
      title: 'UI/UX Brand Designer',
      department: 'Engineering',
      location: 'India (Remote)',
      experience: 'Mid-Level',
      type: 'Full-time',
      description: 'Design exquisite dark-theme interfaces, bento galleries, interactive visual charts, and animations for enterprise customers.',
      requirements: [
        'Figma ninja capable of high-fidelity responsive systems and atomic layout foundations.',
        'Deep understanding of grid mechanics, typography hierarchies, and interaction feedback loops.',
        'Basic familiarity with Tailwind styles or React rendering cycles is a massive plus.'
      ]
    },
    {
      id: 'cust_success',
      title: 'Customer Success Operations Manager',
      department: 'Customer Success',
      location: 'Middle East (Remote)',
      experience: 'Mid-Level',
      type: 'Full-time',
      description: 'Nurture enterprise client relationships, manage system onboards, and train staffs on n8n operations logs.',
      requirements: [
        'Excellent written and verbal communication skills across global professional teams.',
        'Familiar with CRM dashboard systems, workspace integrations, and billing queries.',
        'Calm trouble-shooter with genuine empathy for business operators.'
      ]
    },
    {
      id: 'sales_cons',
      title: 'Enterprise Sales Consultant',
      department: 'Sales',
      location: 'Australia (Remote)',
      experience: 'Senior',
      type: 'Full-time',
      description: 'Drive pipeline closures by presenting live voice agent demos, ROI calculations, and tailored workspace assessments.',
      requirements: [
        '4+ years B2B tech SaaS sales with record hitting ambitious quarterly targets.',
        'Strong presenter skilled in demonstrating AI capabilities to C-Suite stakeholders.',
        'High level organizational discipline mapping CRM stages.'
      ]
    },
    {
      id: 'ops_spec',
      title: 'Platform Operations Specialist',
      department: 'Operations',
      location: 'Europe (Remote)',
      experience: 'Entry',
      type: 'Full-time',
      description: 'Monitor live system health, API gateway capacities, and triage incoming integration queries.',
      requirements: [
        'Fundamental knowledge of cloud containers, REST API structures, and JSON schemas.',
        'Keen eye for detail tracking performance charts and server logs.',
        'Eager learner willing to grasp state-of-the-art server orchestrations.'
      ]
    }
  ];

  // Internship opening dataset
  const internships = [
    { title: 'AI Engineering Intern', department: 'AI & Automation', duration: '6 Months', desc: 'Experiment with agent chains and evaluate model prompt templates.' },
    { title: 'Growth Marketing Intern', department: 'Marketing', duration: '3 Months', desc: 'Conduct research on keyword voids and optimize schema templates.' },
    { title: 'Full Stack Development Intern', department: 'Engineering', duration: '6 Months', desc: 'Support component builds, fix frontend errors, and test API mocks.' },
    { title: 'Business Development Sales Intern', department: 'Sales', duration: '4 Months', desc: 'Qualify inbound directory leads and schedule discovery calls.' }
  ];

  // Filter open roles matching input selectors
  const filteredRoles = useMemo(() => {
    return openRoles.filter(role => {
      const matchesSearch = role.title.toLowerCase().includes(jobSearch.toLowerCase()) || 
                            role.description.toLowerCase().includes(jobSearch.toLowerCase());
      const matchesDept = selectedDept === 'all' || role.department === selectedDept;
      const matchesLoc = selectedLoc === 'all' || role.location.toLowerCase().includes(selectedLoc.toLowerCase());
      const matchesExp = selectedExp === 'all' || role.experience === selectedExp;
      const matchesType = selectedType === 'all' || role.type === selectedType;
      
      return matchesSearch && matchesDept && matchesLoc && matchesExp && matchesType;
    });
  }, [jobSearch, selectedDept, selectedLoc, selectedExp, selectedType]);

  // Team stories carousel
  const teamStories = [
    {
      name: 'Nikhil R.',
      role: 'Head of AI Operations',
      quote: 'At Natton Digital, we don\'t just deploy GPT wrapper API calls. We build highly persistent, self-governing multi-agent networks that execute complex full-loop logic. The level of engineering freedom here is unprecedented.',
      dept: 'AI & Automation',
      videoUrl: '#',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Elena S.',
      role: 'Principal Growth Marketer',
      quote: 'Managing programmatic campaigns across 12 distinct localized regions used to be an administrative nightmare. Using our own GrowthOS platform, we automated our entire SEO landing architecture, allowing us to focus on pure creative messaging.',
      dept: 'Marketing',
      videoUrl: '#',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Marcus K.',
      role: 'Senior n8n Workflow Architect',
      quote: 'Every day is a puzzle of connecting disparate systems—HIPAA clinics, school registration forms, CRM logs—into clean, single-point dashboards. Seeing manual task hours plummet to zero for our clients is immensely rewarding.',
      dept: 'Engineering',
      videoUrl: '#',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    }
  ];

  // Drag & Drop resume upload handler
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processResumeFile = (file: File) => {
    setResumeFile(file);
    setResumeName(file.name);
    setParsingResume(true);
    
    // Simulate AI Resume Parser
    setTimeout(() => {
      setParsingResume(false);
      // Auto-fill form fields based on simulated AI parsing
      setFullName('Alex Mercer');
      setEmail('alex.mercer.dev@gmail.com');
      setPhone('+1 (555) 349-2041');
      setCountry('United States');
      setLinkedin('linkedin.com/in/alex-mercer-ai');
      setPortfolio('alexmercer.dev');
      setExperienceYears(4);
      setCoverLetter('I am extremely excited to apply for the Senior AI position at Natton Digital. My hands-on experience deploying Google GenAI workflows fits your stack perfectly.');
      
      setParsedData({
        parsedName: 'Alex Mercer',
        skills: ['TypeScript', 'n8n Node Automation', 'GenAI Prompt Chains', 'React (Vite)', 'Tailwind CSS'],
        education: 'B.S. in Computer Science',
        confidenceScore: 94
      });
    }, 1800);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processResumeFile(e.target.files[0]);
    }
  };

  // Submit Application Form
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingApp(true);
    
    // Simulated backend action (GoHighLevel sync / Resend notify / AI parsing score evaluation)
    setTimeout(() => {
      setSubmittingApp(false);
      setAppSuccess(true);
      
      // Calculate automated candidate fit score (e.g. 88%)
      const baseScore = 75;
      const extraScore = Math.floor(Math.random() * 20);
      setCandidateScore(baseScore + extraScore);
    }, 1600);
  };

  // Schedule screening simulation
  const handleScheduleScreening = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setScheduleSuccess(true);
  };

  // Submit Talent Community
  const handleSubmitCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!communityName || !communityEmail) return;
    setCommunityLoading(true);
    setTimeout(() => {
      setCommunityLoading(false);
      setCommunitySuccess(true);
    }, 1200);
  };

  // 20 FAQ questions and answers
  const faqs = [
    { q: "What is Natton Digital's primary engineering stack?", a: "We primarily utilize React (Vite) + Tailwind CSS on the frontend. For backend pipelines and custom automation, we build heavy integrations with n8n workflow systems, Google GenAI SDK (Node/Python), PostgreSQL databases, and cloud edge routing layers." },
    { q: "Is remote work fully asynchronous at Natton Digital?", a: "Yes, our team is distributed across multiple global regions (India, Middle East, North America, Europe, Australia, South East Asia). We favor clear documentation, written briefs, and asynchronous progress logs, but we support real-time syncs when initiating complex enterprise onboards." },
    { q: "How does the AI Resume Parser simulator operate on this page?", a: "When you drag your PDF or DOCX resume here, our embedded parser processes document structure, isolates key tech tags (e.g., n8n, React), and instantly maps metadata to the fields while calculating an automated alignment score." },
    { q: "Do you offer learning and certification budgets?", a: "Absolutely. Continuous learning is one of our core values. We provide a dedicated annual learning budget for verified credentials from Google Cloud, OpenAI, n8n, AWS, Meta, Microsoft, and HubSpot." },
    { q: "What does the 'Sovereign Integration' level mean?", a: "It represents a state where a business has custom, self-hosted, automated workflow systems running independently on their own infrastructure, with full data custody, bypass-level API pricing structures, and no high-priced SaaS subscription lock-ins." },
    { q: "How long does the standard hiring process take from start to offer?", a: "On average, the process takes between 10 to 20 days. It involves a quick preliminary screening, a hands-on technical/functional mini-evaluation based on our real client tasks, and a panel interview with the engineering or growth leads." },
    { q: "What is your stance on AI tool usage during internal workflows?", a: "We are an AI-first organization! We actively encourage, train, and expect our staff to leverage cutting-edge tools (AI coding assistance, automated writing assistants, script generators) to double their output, bypass manual repetition, and concentrate on strategic architecture." },
    { q: "Do you support visa sponsorships or global relocation?", a: "As a fully remote-first global organization, we hire talent in their home countries through local compliant contract entities. This allows you to work from anywhere without the stress of migration, while enjoying full global pay parity." },
    { q: "Are internship programs eligible for full-time conversion?", a: "Yes. Over 60% of our high-performing interns convert to full-time engineering or marketing operational roles. We look for a deep ownership mindset, relentless curiosity, and speed of execution." },
    { q: "What is the mission of Natton Digital?", a: "Our absolute mission is making premium AI Operations and workflow automation accessible to MSMEs in India and SMBs worldwide. We aim to level the playing field so small businesses can compete on tech scale without enterprise budget limitations." },
    { q: "What exactly is GoHighLevel and why do you list it under your tech stack?", a: "GoHighLevel is a premier CRM and marketing platform built for agencies. We design complex API pathways and webhook loops to feed high-intent leads from interactive marketplaces straight into client sales pipelines seamlessly." },
    { q: "How are regional time zones handled for team meetings?", a: "We minimize live meetings to the absolute minimum, reserving them for core syncs. When a sync is needed, we rotate meeting hours or isolate them to regional clusters so nobody has to compromise their sleep schedules." },
    { q: "What benefits do you offer to employees in India?", a: "Our India team receives comprehensive health insurance, ergonomic workstation budgets, home broadband allowances, annual performance-linked rewards, and regular retreats with our founders." },
    { q: "What is an 'Autonomous Agent Node'?", a: "It is an automated agent loop running in the background, continuously polling data (emails, chats, tickets), determining intent, retrieving correct business files, executing replies, and updating database charts without human intervention." },
    { q: "Do you have team-wide offline retreats?", a: "Yes. We gather twice a year for intense, fun, week-long physical retreats in beautiful global locations to co-create product roadmaps, build bonds, and share delicious meals." },
    { q: "Can I apply for multiple roles at the same time?", a: "We recommend focusing your application on the single role that matches your strongest competency. However, our talent parsing engines will automatically flag you for secondary roles if your skills match multiple open positions." },
    { q: "What is the certification support program?", a: "If you want to clear professional exams (like AWS Solutions Architect or Google Professional Machine Learning Engineer), we will reimburse the full exam costs and provide paid study hours to help you succeed." },
    { q: "What are the core qualities of an 'Ownership Mindset'?", a: "We value people who take complete charge of their tasks. If an integration breaks, you don't wait for a ticket—you debug the logs, coordinate with the client, patch the script, and report the solution proactively." },
    { q: "Does Natton Digital participate in open-source projects?", a: "Yes. We contribute custom templates, automation blueprints, and specialized nodes back to the n8n community library and open-source packages to support developers worldwide." },
    { q: "How can I join the Talent Community if there are no open roles in my department?", a: "Simply scroll to the bottom, enter your name, email, and primary area of interest (e.g. Design, Sales). We review this database first whenever a new role is approved for recruitment." }
  ];

  return (
    <div className="min-h-screen bg-[#0B0721] text-white py-16 relative overflow-hidden font-sans">
      
      {/* Background visual decorations mirroring OpenAI/Stripe styles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-15%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[130px] animate-pulse" />
        <div className="absolute top-[35%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[140px]" />
        <div className="absolute bottom-[-5%] left-[15%] w-[55%] h-[55%] rounded-full bg-emerald-500/10 blur-[130px] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-28">
        
        {/* ========================================================
            1. HERO SECTION: Build The Future With AI
            ======================================================== */}
        <section id="hero" className="relative pt-12 pb-6 flex flex-col lg:flex-row items-center gap-12 text-left">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#00C2FF] text-[10px] font-mono tracking-widest uppercase font-bold">
              <Sparkles className="h-3 w-3 animate-pulse" />
              WE ARE HIRING TALENT GLOBALLY
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
              Build The Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#00E599]">With AI</span>
            </h1>
            
            <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Join a world-class team passionate about AI, autonomous workflows, and helping MSMEs and SMBs worldwide transform operations, bypass manual friction, and accelerate growth.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => scrollToElement('open_positions')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:opacity-95 text-white font-mono font-black text-xs rounded-xl transition-all shadow-lg flex items-center gap-1.5"
              >
                Explore Open Roles <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => scrollToElement('talent_community')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                Join Community
              </button>
            </div>
          </div>
          
          {/* AI Talent Universe 3D Floating Node Simulator */}
          <div className="lg:w-1/2 w-full flex justify-center relative">
            <div className="relative w-full max-w-md h-96 rounded-3xl border border-white/10 bg-[#110B33]/40 backdrop-blur-md p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5" />
              
              {/* Rotating glows */}
              <div className="absolute w-80 h-80 rounded-full border border-dashed border-white/5 animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-60 h-60 rounded-full border border-dashed border-emerald-500/10 animate-[spin_30s_linear_infinite]" />
              
              {/* Dynamic connected team grids */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-10 right-12 p-3.5 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                  AI
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white font-mono">Agentic Nodes</p>
                  <p className="text-[8px] text-emerald-400 font-mono">● Active System</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute top-24 left-8 p-3.5 rounded-2xl border border-purple-500/20 bg-purple-500/5 flex items-center gap-2.5"
              >
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-8 h-8 rounded-full object-cover border border-purple-500" alt="Team member" />
                <div>
                  <p className="text-[10px] font-bold text-white font-mono">Engineering</p>
                  <p className="text-[8px] text-gray-400">Bangalore Office</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                className="absolute bottom-16 left-12 p-3.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2.5"
              >
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100" className="w-8 h-8 rounded-full object-cover border border-emerald-500" alt="Team member" />
                <div>
                  <p className="text-[10px] font-bold text-white font-mono">Growth Squad</p>
                  <p className="text-[8px] text-gray-400">San Francisco</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="absolute bottom-10 right-14 p-3.5 rounded-2xl border border-white/5 bg-white/5 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white font-mono">Enterprise Sales</p>
                  <p className="text-[8px] text-gray-400">London Hub</p>
                </div>
              </motion.div>

              <div className="relative z-10 p-6 rounded-3xl bg-gradient-to-br from-indigo-950 to-[#0B0721] border border-white/10 text-center space-y-3 max-w-[210px] shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <Users className="h-5 w-5 text-emerald-400 animate-pulse" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Talent Network</h4>
                <p className="text-[9px] text-gray-400 leading-relaxed">Collaborating globally with autonomous software nodes.</p>
              </div>

              {/* Neural wire lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="28%" y1="24%" x2="50%" y2="50%" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
                <line x1="75%" y1="18%" x2="50%" y2="50%" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />
                <line x1="28%" y1="78%" x2="50%" y2="50%" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1" />
                <line x1="72%" y1="80%" x2="50%" y2="50%" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. MISSION: Why We Exist
            ======================================================== */}
        <section id="mission" className="p-8 sm:p-12 rounded-3xl border border-white/5 bg-[#110B33]/20 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-transparent blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">CORPORATE ALIGNMENT</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Why We Exist</h2>
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-[#00E599] font-display">Making AI Accessible To Every Business</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Our mission is to empower micro, small, and medium enterprises (MSMEs) and SMBs worldwide through AI-first growth, automation pipelines, and intelligent systems. 
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Too often, powerful enterprise artificial intelligence models are siloed into hyper-funded corporations. We rewrite this script by coding flat-rate, high-fidelity sovereign automated workflows that lets any business unlock scalable operations without legacy overheads.
                </p>
              </div>
            </div>

            {/* Mission Sphere Graphic */}
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-emerald-500/20 flex items-center justify-center relative p-8 border border-white/5 shadow-inner">
                <div className="absolute inset-4 rounded-full border border-dashed border-white/10 animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-10 rounded-full border border-dashed border-emerald-400/20 animate-[spin_20s_linear_reverse_infinite]" />
                
                <div className="text-center space-y-1 relative z-10">
                  <GraduationCap className="h-8 w-8 text-emerald-400 mx-auto mb-1 animate-bounce" />
                  <p className="text-[10px] font-mono font-bold tracking-widest text-[#00C2FF] uppercase">EMPOWERING</p>
                  <h4 className="text-xl font-black font-display text-white">100k+</h4>
                  <p className="text-[8px] font-mono text-gray-400 uppercase">MSMEs GLOBALLY</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. CULTURE: Life At Natton (BENTO GRID)
            ======================================================== */}
        <section id="culture" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">LIFE AT NATTON</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Our Core Culture</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">We do not adhere to classic corporate theater. We operate with high trust, absolute transparency, and a devotion to craft.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {[
              { title: 'AI-First Culture', desc: 'We encourage you to master and integrate AI assistants in every single workspace task to double output speed.', icon: Cpu },
              { title: 'Remote-Friendly', desc: 'Work from absolutely anywhere. Your performance is measured on delivered quality, not office hours logged.', icon: Globe },
              { title: 'Continuous Learning', desc: 'We sponsor recognized certifications and buy any technical course books you need to keep upgrading skills.', icon: GraduationCap },
              { title: 'Ownership Mindset', desc: 'We give team members complete autonomy to launch pipelines, debug code errors, and lead clients.', icon: Target },
              { title: 'Innovation Obsession', desc: 'Experiment constantly with beta frameworks, prompt pipelines, and modern vector storage mechanics.', icon: Zap },
              { title: 'Deep Collaboration', desc: 'Zero visual friction. Direct feedback channels and zero-tier communication frameworks across the entire squad.', icon: Users },
              { title: 'Customer First', desc: 'We build systems with high-empathy, making sure the business operators can manage pipelines with ease.', icon: Heart },
              { title: 'Global Impact', desc: 'Directly support thousands of hard-working business owners across India, Australia, and North America.', icon: Compass }
            ].map((card, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-emerald-500/30 hover:bg-white/[0.03] transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <card.icon className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-2 font-display">{card.title}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            4. BENEFITS: Benefits & Perks
            ======================================================== */}
        <section id="benefits" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase font-bold">REWARD SYSTEMS</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Benefits & Perks</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Health, growth, comfort, and professional scalability configured for your global success.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {[
              { title: 'Flexible Work', label: 'Work life balance integration' },
              { title: 'Remote Opportunities', label: 'Secure home office allowance' },
              { title: 'Learning Budget', label: 'Annual $1,500 course stipend' },
              { title: 'Certification Support', label: '100% exam fee reimbursements' },
              { title: 'Career Growth', label: 'Quarterly level promotions' },
              { title: 'Global Projects', label: 'Co-work with international brands' },
              { title: 'AI Tools Access', label: 'Pro subscriptions paid by company' },
              { title: 'Performance Rewards', label: 'Annual profit-linked bonuses' }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-white/5 bg-[#110B33]/20 flex items-start gap-3.5 hover:border-blue-500/20 transition-colors">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            5. TEAM STORIES: Meet The Team (Carousel / Switcher)
            ======================================================== */}
        <section id="team_stories" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">MEET THE TEAM</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Our Voices</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Hear directly from the architects, marketers, and operations managers leading our systems.</p>
          </div>

          {/* Carousel Layout */}
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#110B33]/20 backdrop-blur-sm text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/5 to-transparent blur-2xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStoryIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 border-2 border-[#00E599] relative">
                  <img 
                    src={teamStories[activeStoryIdx].image} 
                    alt={teamStories[activeStoryIdx].name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 p-1 bg-emerald-500 rounded-full text-white">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[#00E599] text-[9px] font-mono font-bold uppercase tracking-wider">
                    {teamStories[activeStoryIdx].dept}
                  </div>
                  
                  <blockquote className="text-sm sm:text-base text-gray-300 italic leading-relaxed font-sans">
                    "{teamStories[activeStoryIdx].quote}"
                  </blockquote>

                  <div>
                    <h4 className="text-sm font-bold text-white font-display">{teamStories[activeStoryIdx].name}</h4>
                    <p className="text-[10px] text-gray-500 font-mono">{teamStories[activeStoryIdx].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination triggers */}
            <div className="flex justify-center gap-2 mt-8 border-t border-white/5 pt-6">
              {teamStories.map((story, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStoryIdx(i)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-widest uppercase transition-all border ${
                    activeStoryIdx === i 
                      ? 'border-[#00E599] bg-[#00E599]/10 text-[#00E599] font-bold' 
                      : 'border-white/5 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {story.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            6. CAREER PATHS: Career Paths Grid
            ======================================================== */}
        <section id="career_paths" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">CAREER TRACKS</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Choose Your Path</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Explore tailored growth frameworks for various core disciplines inside Natton Digital.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { title: 'AI Engineer', code: 'AIE', track: 'Models, Agent pipelines, Prompt syncs' },
              { title: 'Automation Specialist', code: 'AUT', track: 'n8n workflows, webhook mappings, CRM integrations' },
              { title: 'Growth Marketer', code: 'MKT', track: 'AEO schemas, metadata rankings, inbound engines' },
              { title: 'Full Stack Developer', code: 'FSD', track: 'SaaS interfaces, type-safe APIs, bundle scripts' },
              { title: 'UI/UX Designer', code: 'UXD', track: 'Atomic brand systems, bento cards, interactions' },
              { title: 'Customer Success', code: 'CSM', track: 'Enterprise onboards, ticket logs, training briefs' },
              { title: 'Sales Consultant', code: 'SAL', track: 'Live voice demos, strategy briefs, targeting goals' },
              { title: 'Operations Specialist', code: 'OPS', track: 'Server logs, deployment checks, cloud scaling' }
            ].map((path, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  setSelectedDept(path.title === 'AI Engineer' || path.title === 'Automation Specialist' ? 'AI & Automation' : 'all');
                  scrollToElement('open_positions');
                }}
                className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#00E599]/30 hover:bg-white/[0.02] cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">{path.code}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-500 group-hover:text-[#00E599] transition-transform group-hover:translate-x-1" />
                </div>
                <h4 className="text-xs font-bold text-white font-display tracking-wide">{path.title}</h4>
                <p className="text-[9px] text-gray-400 leading-relaxed font-sans">{path.track}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            7. OPEN POSITIONS: Searchable Job Board
            ======================================================== */}
        <section id="open_positions" className="space-y-8 scroll-mt-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">JOIN THE SQUAD</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white font-display">Open Roles</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Explore remote, full-time positions built to attract global top-tier operators.</p>
          </div>

          {/* Job Searchable Board & Filters */}
          <div className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/20 space-y-6">
            <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
              {/* Search Bar */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search open jobs (e.g. AI engineer, marketing)..."
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-[#0B0721]/80 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Department filter */}
              <div className="flex flex-wrap gap-2">
                {['all', 'Engineering', 'AI & Automation', 'Marketing', 'Sales', 'Customer Success'].map(dept => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-widest font-bold transition-all border ${
                      selectedDept === dept 
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                        : 'border-white/5 bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {dept === 'all' ? 'All Depts' : dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Localized selectors */}
            <div className="flex flex-wrap gap-3 text-xs border-t border-white/5 pt-4">
              {/* Region Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 font-mono text-[10px] uppercase">Location:</span>
                <select 
                  value={selectedLoc}
                  onChange={(e) => setSelectedLoc(e.target.value)}
                  className="bg-[#110B33] border border-white/10 rounded-lg text-[10px] text-[#00C2FF] font-mono px-2 py-1 focus:outline-none"
                >
                  <option value="all">Any Location</option>
                  <option value="India">India</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Australia">Australia</option>
                  <option value="South East Asia">South East Asia</option>
                </select>
              </div>

              {/* Experience Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 font-mono text-[10px] uppercase">Experience:</span>
                <select 
                  value={selectedExp}
                  onChange={(e) => setSelectedExp(e.target.value)}
                  className="bg-[#110B33] border border-white/10 rounded-lg text-[10px] text-[#00C2FF] font-mono px-2 py-1 focus:outline-none"
                >
                  <option value="all">Any Experience</option>
                  <option value="Entry">Entry Level</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead Track</option>
                </select>
              </div>

              {/* Employment Type Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 font-mono text-[10px] uppercase">Job Type:</span>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-[#110B33] border border-white/10 rounded-lg text-[10px] text-[#00C2FF] font-mono px-2 py-1 focus:outline-none"
                >
                  <option value="all">Any Type</option>
                  <option value="Full-time">Full-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job List Outputs */}
          <div className="space-y-3 text-left">
            {filteredRoles.map(role => (
              <div 
                key={role.id}
                className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-emerald-500/30 hover:bg-white/[0.02] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-bold text-white font-display group-hover:text-[#00E599] transition-colors">{role.title}</h4>
                    <span className="text-[8px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded uppercase font-bold">
                      {role.department}
                    </span>
                    <span className="text-[8px] font-mono bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded uppercase font-bold">
                      {role.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{role.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-[10px] font-mono text-gray-500 pt-1">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-emerald-400" /> {role.location}</span>
                    <span className="flex items-center gap-1"><BriefcaseIcon className="h-3 w-3 text-emerald-400" /> {role.experience} Track</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setActiveJobId(role.id);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setResumeFile(null);
                    setResumeName('');
                    setParsedData(null);
                    setAppSuccess(false);
                    setCandidateScore(null);
                    scrollToElement('application_form');
                  }}
                  className="px-4.5 py-2.5 bg-white/5 hover:bg-emerald-500 hover:text-white border border-white/10 rounded-xl font-mono text-[10px] font-bold uppercase transition-all shrink-0 text-center flex items-center justify-center gap-1"
                >
                  Apply Now <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {filteredRoles.length === 0 && (
              <div className="text-center py-10 rounded-2xl border border-dashed border-white/10 bg-[#110B33]/10 text-gray-400 space-y-2">
                <ShieldAlert className="h-8 w-8 text-purple-400 mx-auto animate-pulse" />
                <h4 className="text-sm font-bold text-white">No Matching Openings Found</h4>
                <p className="text-xs max-w-sm mx-auto text-gray-500 leading-relaxed">
                  We don't currently have active postings matching these exact tags. Join our **Talent Community** below to stay mapped!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            8. INTERNSHIP PROGRAM: Internships & Early Careers
            ======================================================== */}
        <section id="internship_program" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">EARLY CAREERS</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Internships Program</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Nurturing high-potential builders. Kickstart your career with fast ownership.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {internships.map((intern, i) => (
              <div key={i} className="p-5 rounded-2xl border border-white/5 bg-[#110B33]/20 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                <div className="absolute top-0 right-0 px-2 py-0.5 rounded-bl bg-purple-500/10 text-purple-400 font-mono text-[8px] font-bold uppercase tracking-wider">
                  {intern.duration}
                </div>
                
                <div className="space-y-3">
                  <span className="text-[8px] font-mono text-purple-400 uppercase tracking-widest font-bold">{intern.department}</span>
                  <h4 className="text-sm font-bold text-white font-display">{intern.title}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{intern.desc}</p>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedType('Internship');
                    setJobSearch(intern.title);
                    scrollToElement('open_positions');
                  }}
                  className="mt-4 text-[10px] font-mono font-bold uppercase text-purple-400 flex items-center gap-1 hover:text-white transition-colors"
                >
                  View Details <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            9. LEARNING & CERTIFICATIONS
            ======================================================== */}
        <section id="learning" className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] text-center space-y-6">
          <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase font-bold">SPONSORED EDUCATION CODES</span>
          <h3 className="text-xl font-bold text-white font-display">Upskill with Industry-Standard Certifications</h3>
          <p className="text-xs text-gray-400 max-w-xl mx-auto">
            We sponsor verified exams and provide full platform materials to help our builders lead operational fields.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {[
              { name: 'OpenAI Developer Certifications', desc: 'Models fine-tuning & prompt chains' },
              { name: 'Google Cloud Architect / ML Specialist', desc: 'Vertex AI & container pipelines' },
              { name: 'AWS ML Core Foundations', desc: 'Secure enterprise architecture' },
              { name: 'Microsoft Azure AI Solutions', desc: 'Sovereign client integrations' },
              { name: 'HubSpot Developer Certification', desc: 'CRM customization & APIs' },
              { name: 'n8n Advanced Workflow Creator', desc: 'Complex serverless automation maps' },
              { name: 'Meta Business API Developer', desc: 'WhatsApp catalog & rich broadcasts' }
            ].map((badge, idx) => (
              <span key={idx} className="px-3 py-2 rounded-xl bg-[#110B33] border border-white/10 text-[10px] text-gray-300 font-mono text-left block">
                <span className="text-[#00C2FF] font-bold block">{badge.name}</span>
                <span className="text-[9px] text-gray-500 mt-0.5 block">{badge.desc}</span>
              </span>
            ))}
          </div>
        </section>

        {/* ========================================================
            10. HIRING PROCESS: Interactive Timeline
            ======================================================== */}
        <section id="hiring_process" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">FAST HIRING CYCLES</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Our Hiring Process</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">We respect your time. Clear milestones from form submission to your first onboarding date.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 text-left">
            {[
              { step: '1', title: 'Application', desc: 'Submit your resume and portfolio details via our smart form below. The parser maps details instantly.' },
              { step: '2', title: 'Screening', desc: 'A quick 15-minute introductory call to explore alignment on cultural values and remote goals.' },
              { step: '3', title: 'Technical Evaluation', desc: 'A paid, real-world task based on actual client challenges. We test capability, speed, and clean code.' },
              { step: '4', title: 'Deep-Dive Interview', desc: 'A 45-minute architectural review session with our core team leaders to map technical scaling.' },
              { step: '5', title: 'Formal Offer', desc: 'Transparent pay grids, contract structures, health benefits, and performance-linked bonuses.' },
              { step: '6', title: 'Onboarding', desc: 'Access sovereign Slack clusters, set up your home office workstation, and receive initial blueprints.' }
            ].map((node, i) => (
              <div 
                key={i}
                onClick={() => setActiveTimelineStep(i)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                  activeTimelineStep === i 
                    ? 'border-[#00E599] bg-[#00E599]/[0.02]' 
                    : 'border-white/5 bg-white/[0.01] hover:border-white/10'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs mb-4 ${
                  activeTimelineStep === i ? 'bg-[#00E599] text-dark' : 'bg-white/10 text-gray-400'
                }`}>
                  {node.step}
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-display">{node.title}</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            11. GLOBAL OPPORTUNITIES: Interactive World Map
            ======================================================== */}
        <section id="global_opportunities" className="p-8 sm:p-12 rounded-3xl border border-white/5 bg-[#110B33]/20 text-left relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">WORK FROM ANYWHERE</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Global Opportunities</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                We are a remote-first platform. We believe the absolute best technical talent is distributed worldwide. Whether you live in Bangalore, Melbourne, Dubai, or Austin, you will work synchronously with outstanding teams.
              </p>

              {/* Region selections */}
              <div className="grid grid-cols-3 gap-2">
                {['India', 'Middle East', 'North America', 'Europe', 'Australia', 'South East Asia'].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => {
                      setActiveRegion(reg);
                      setSelectedLoc(reg === 'Middle East' ? 'Middle East' : reg === 'North America' ? 'North America' : reg === 'South East Asia' ? 'South East Asia' : reg === 'India' ? 'India' : reg === 'Europe' ? 'Europe' : 'Australia');
                    }}
                    className={`py-2.5 px-2 rounded-xl text-[9px] font-mono uppercase tracking-wider font-bold transition-all border text-center ${
                      activeRegion === reg 
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                        : 'border-white/5 bg-white/5 text-gray-400'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive World Map Placeholder Visual */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0B0721]/60 relative h-72 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
              
              <div className="flex justify-between items-center relative z-10">
                <span className="text-[10px] font-mono text-gray-400 uppercase">ACTIVE HUB SIMULATION</span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold">
                  SQUAD LIVE
                </span>
              </div>

              {/* Glowing region nodes */}
              <div className="relative h-32 w-full flex items-center justify-center">
                {/* Visual grid representing coordinates */}
                <div className="absolute inset-0 border border-dashed border-white/5 rounded-xl flex items-center justify-center">
                  <div className="text-[8px] font-mono text-gray-600 text-center uppercase tracking-widest leading-none select-none">
                    NATTON TALENT COORDINATES MATRIX
                  </div>
                </div>

                <div className={`absolute transition-all duration-300 text-center ${
                  activeRegion === 'India' ? 'opacity-100 scale-110' : 'opacity-40'
                }`}>
                  <p className="text-xs font-mono font-bold text-white">🇮🇳 Bangalore Hub</p>
                  <p className="text-[9px] text-[#00E599] font-mono">14 Engineers Active</p>
                </div>

                <div className={`absolute transition-all duration-300 text-center ${
                  activeRegion === 'North America' ? 'opacity-100 scale-110' : 'opacity-40'
                }`}>
                  <p className="text-xs font-mono font-bold text-white">🇺🇸 Austin Hub</p>
                  <p className="text-[9px] text-blue-400 font-mono">6 Growth Marketers Active</p>
                </div>

                <div className={`absolute transition-all duration-300 text-center ${
                  activeRegion === 'Europe' ? 'opacity-100 scale-110' : 'opacity-40'
                }`}>
                  <p className="text-xs font-mono font-bold text-white">🇪🇺 London Hub</p>
                  <p className="text-[9px] text-purple-400 font-mono">8 Developers Active</p>
                </div>

                <div className={`absolute transition-all duration-300 text-center ${
                  activeRegion === 'Australia' ? 'opacity-100 scale-110' : 'opacity-40'
                }`}>
                  <p className="text-xs font-mono font-bold text-white">🇦🇺 Sydney Hub</p>
                  <p className="text-[9px] text-pink-400 font-mono">4 Client Leads Active</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 flex justify-between text-[10px] font-mono text-gray-400 relative z-10">
                <span>Selected: <strong className="text-white">{activeRegion}</strong></span>
                <button 
                  onClick={() => scrollToElement('open_positions')}
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  Filter Roles <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            12. APPLICATION FORM: Apply Now (Including Resume Parser)
            ======================================================== */}
        <section id="application_form" className="scroll-mt-10 text-left max-w-4xl mx-auto">
          <div className="p-6 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md relative overflow-hidden space-y-8">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
            
            <div className="border-b border-white/5 pb-6">
              <span className="text-[10px] font-mono text-[#00E599] tracking-widest uppercase font-bold block">TALENT ACQUISITION FORM</span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
                Apply for {openRoles.find(r => r.id === activeJobId)?.title || 'Selected Position'}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Complete your candidacy data. Try dragging and dropping your PDF resume inside the designated zone to auto-fill fields with our AI parser!
              </p>
            </div>

            {/* Draggable Resume Zone */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer relative ${
                isDragOver 
                  ? 'border-emerald-500 bg-emerald-500/10' 
                  : resumeName 
                    ? 'border-[#00C2FF]/40 bg-blue-500/[0.02]' 
                    : 'border-white/10 hover:border-emerald-500/40 bg-white/[0.01]'
              }`}
            >
              <input 
                type="file" 
                id="resume-file-picker"
                accept=".pdf,.docx,.doc"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="resume-file-picker" className="cursor-pointer space-y-3 block">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                  {parsingResume ? (
                    <RefreshCw className="h-6 w-6 animate-spin" />
                  ) : (
                    <UploadCloud className="h-6 w-6" />
                  )}
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    {parsingResume ? 'AI Resume Parser Running...' : resumeName ? `Attached: ${resumeName}` : 'Upload Your Resume'}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {parsingResume ? 'Scanning candidate competencies...' : 'Drag & drop PDF / DOCX or click here to select.'}
                  </p>
                </div>
              </label>

              {/* Simulated parser findings */}
              {parsedData && (
                <div className="mt-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-left space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-[#00C2FF] font-bold">✓ CANDIDATE AI PARSER MATCH</span>
                    <span className="text-[#00C2FF] bg-blue-500/10 px-2 py-0.5 rounded font-bold">{parsedData.confidenceScore}% Confidence</span>
                  </div>
                  <p className="text-xs text-gray-300">Name extracted: <strong className="text-white">{parsedData.parsedName}</strong></p>
                  <p className="text-xs text-gray-300">Skills scanned: {parsedData.skills.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Application fields */}
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-mono">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Alex Mercer"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Email address */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-mono">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. alex.mercer@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-mono">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +1 (555) 349-2041"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-mono">Country of Residence</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. United States"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* LinkedIn Profile */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-mono">LinkedIn Profile URL</label>
                  <input 
                    type="url" 
                    required
                    placeholder="e.g. linkedin.com/in/alex-mercer"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-4 py-2 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Portfolio URL */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-mono">Portfolio URL</label>
                  <input 
                    type="url" 
                    placeholder="e.g. alexmercer.dev"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full px-4 py-2 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Experience slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">Years of Relevant Experience</span>
                  <span className="text-emerald-400 font-bold">{experienceYears} Years</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Cover Letter */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-mono">Brief Cover Letter / Operations Goals</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Share details about what systems you have launched and how they fit our stack..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingApp}
                className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:opacity-95 text-white font-mono text-xs rounded-xl font-bold uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {submittingApp ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Syncing To GoHighLevel CRM...
                  </>
                ) : (
                  <>
                    Submit Application <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Dynamic Screening scheduler output */}
            <AnimatePresence>
              {appSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02] space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">Candidacy Submitted Successfully!</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                        We have automatically created your applicant record in our database and successfully triggered our Candidate Evaluation script.
                      </p>
                    </div>
                  </div>

                  {/* Simulated Resume Score & Interview Scheduler */}
                  {candidateScore && (
                    <div className="mt-4 p-4 rounded-xl border border-white/5 bg-[#110B33] space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-gray-400 uppercase">Candidate Evaluation Score:</span>
                        <span className="text-emerald-400 font-bold">{candidateScore}% Fit</span>
                      </div>
                      
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${candidateScore}%` }} />
                      </div>

                      <p className="text-[10px] text-gray-400 leading-relaxed">
                        Excellent score! You have bypassed manual screening. Our AI scheduler recommends booking your live screening call immediately.
                      </p>

                      {!isSchedulerOpen ? (
                        <button
                          onClick={() => setIsSchedulerOpen(true)}
                          className="py-1.5 px-3 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-emerald-400 hover:bg-emerald-500/10 transition-colors uppercase font-bold"
                        >
                          Book Interview Immediately
                        </button>
                      ) : (
                        <form onSubmit={handleScheduleScreening} className="pt-2 border-t border-white/5 space-y-3 text-left">
                          <p className="text-[10px] font-mono text-[#00C2FF] uppercase">Choose Date & Time</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <input 
                              type="date"
                              required
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              className="px-3 py-1.5 bg-[#0B0721] border border-white/10 rounded focus:outline-none text-white text-xs"
                            />
                            <select
                              required
                              value={selectedTime}
                              onChange={(e) => setSelectedTime(e.target.value)}
                              className="px-3 py-1.5 bg-[#0B0721] border border-white/10 rounded focus:outline-none text-white text-xs"
                            >
                              <option value="">Select Time</option>
                              <option value="10:00 AM">10:00 AM UTC</option>
                              <option value="02:00 PM">02:00 PM UTC</option>
                              <option value="04:30 PM">04:30 PM UTC</option>
                            </select>
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-[10px] font-bold uppercase rounded"
                          >
                            Confirm Booking Slot
                          </button>

                          {scheduleSuccess && (
                            <p className="text-[9px] text-[#00E599] font-mono">
                              ✓ Screening call booked successfully! We sent a Calendar link to your email.
                            </p>
                          )}
                        </form>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ========================================================
            13. TALENT COMMUNITY FORM: Join Our Talent Community
            ======================================================== */}
        <section id="talent_community" className="max-w-2xl mx-auto">
          <div className="p-6 sm:p-10 rounded-2xl border border-white/5 bg-[#110B33]/20 text-left relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-transparent blur-2xl pointer-events-none" />
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">FUTURE OPPORTUNITIES</span>
              <h3 className="text-xl font-bold text-white font-display">Join Our Talent Community</h3>
              <p className="text-xs text-gray-400">
                Not seeing an active role matching your profile? Let our automated systems log your credentials so we can notify you the moment an opening aligns.
              </p>
            </div>

            <form onSubmit={handleSubmitCommunity} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text"
                  required
                  placeholder="Your Name..."
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <input 
                  type="email"
                  required
                  placeholder="Your Email Address..."
                  value={communityEmail}
                  onChange={(e) => setCommunityEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <select
                  value={communityInterest}
                  onChange={(e) => setCommunityInterest(e.target.value)}
                  className="w-full sm:w-auto bg-[#110B33] border border-white/10 rounded-xl text-xs text-gray-300 px-4 py-2 focus:outline-none"
                >
                  <option value="Engineering">Engineering Track</option>
                  <option value="AI & Automation">AI & Automation</option>
                  <option value="Marketing">Growth Marketing</option>
                  <option value="Sales">Enterprise Sales</option>
                  <option value="Operations">Operations</option>
                </select>

                <button
                  type="submit"
                  disabled={communityLoading}
                  className="w-full sm:flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] font-bold uppercase rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  {communityLoading ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin" /> Adding to Pool...
                    </>
                  ) : (
                    <>
                      Join Talent Pool <Send className="h-3 w-3" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {communitySuccess && (
              <p className="text-[10px] text-[#00E599] font-mono text-center">
                ✓ Success! Welcome to the Natton Digital talent pool database. We will stay mapped!
              </p>
            )}
          </div>
        </section>

        {/* ========================================================
            14. FAQ: Frequently Asked Questions (Count 20)
            ======================================================== */}
        <section id="faq" className="space-y-10 text-left">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">COMMON QUERIES</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Everything you need to know about remote structures, stacks, and global alignment.</p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-white/5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4 font-sans">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left py-2 text-sm font-bold text-white hover:text-[#00E599] transition-colors gap-4 focus:outline-none"
                >
                  <span className="flex items-start gap-2.5">
                    <span className="text-gray-500 font-mono text-xs">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ${openFaqs[idx] ? 'rotate-180 text-[#00E599]' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {openFaqs[idx] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-gray-400 pl-8 pb-2 leading-relaxed pt-1">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            15. FINAL CTA: Come Build The Future With Us
            ======================================================== */}
        <section id="final_cta" className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#110B33]/40 backdrop-blur-md relative overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-emerald-500/5 pointer-events-none" />
          
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400 mb-4 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight leading-tight">
            Come Build The Future With Us
          </h2>
          
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Natton Digital is built on direct ownership, rapid development cycles, and deep client integration. Join us in making modern operations autonomous globally.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => scrollToElement('open_positions')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:opacity-95 text-white font-mono font-black text-xs rounded-xl transition-all shadow-lg flex items-center gap-1.5"
            >
              Apply Today
            </button>
            <button
              onClick={() => scrollToElement('open_positions')}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-colors"
            >
              Explore Open Roles
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
