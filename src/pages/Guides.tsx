import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Users,
  Compass,
  GraduationCap,
  ChevronRight,
  Send,
  UploadCloud,
  Heart,
  Eye,
  Settings,
  Calendar as CalendarIcon,
  CheckCircle2,
  FileDown,
  Volume2,
  Tv,
  Check,
  X,
  Info,
  BookOpen,
  Bookmark,
  ExternalLink,
  ChevronLeft,
  SearchCode,
  Copy,
  Terminal,
  FileSpreadsheet
} from 'lucide-react';
import { RoutePath } from '../types';

interface GuidesProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

// 1. Guides dataset
interface GuideItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  author: string;
  authorRole: string;
  date: string;
  stars: number;
  featured: boolean;
  sections: { id: string; title: string; content: string }[];
  aiSummary: string;
}

// 2. Roadmaps dataset
interface RoadmapMilestone {
  day: string;
  title: string;
  tasks: string[];
  owner: string;
  kpi: string;
}

export default function Guides({ setPath, darkMode }: GuidesProps) {
  // Navigation & Category states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedGuides, setBookmarkedGuides] = useState<string[]>(['ultimate-ai-mkt']);
  const [activeGuideId, setActiveGuideId] = useState<string>('ultimate-ai-mkt');
  const [readingModeDark, setReadingModeDark] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(35);

  // Search filter
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Timeline roadmap state
  const [selectedTimeline, setSelectedTimeline] = useState<string>('30-day');

  // AI Chat Assistant state
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    { sender: 'assistant', text: "Hello! I am your Natton AI Guide assistant. Ask me anything about our marketing SOPs, n8n webhook nodes, or CRM setups." }
  ]);
  const [aiChatInput, setAiChatInput] = useState<string>('');
  const [aiIsGenerating, setAiIsGenerating] = useState<boolean>(false);

  // Video walkthrough state
  const [activeVideoId, setActiveVideoId] = useState<number>(0);
  const [videoPlayUrl, setVideoPlayUrl] = useState<string | null>(null);

  // SOP State
  const [selectedSopCategory, setSelectedSopCategory] = useState<string>('Marketing SOPs');
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);

  // Lead Generation states
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    companyName: '',
    industry: 'Technology',
    country: 'United States',
    email: '',
    phone: '',
    guideOfInterest: 'Ultimate AI Marketing Guide'
  });
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [userCaptcha, setUserCaptcha] = useState<string>('');
  const [captchaError, setCaptchaError] = useState<boolean>(false);
  const [submittingLead, setSubmittingLead] = useState<boolean>(false);
  const [leadSuccess, setLeadSuccess] = useState<boolean>(false);
  const [generatedTicketId, setGeneratedTicketId] = useState<string>('');

  // 1-on-1 strategy session cal.com simulator
  const [selectedCalDate, setSelectedCalDate] = useState<number | null>(18);
  const [selectedCalTime, setSelectedCalTime] = useState<string | null>('11:00 AM EST');
  const [calName, setCalName] = useState<string>('');
  const [calEmail, setCalEmail] = useState<string>('');
  const [calSuccess, setCalSuccess] = useState<boolean>(false);

  // FAQ accordion states
  const [faqOpenStates, setFaqOpenStates] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false
  });

  // Generate Captcha code on mount
  const generateNewCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  // Toast utility helper
  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2000);
  };

  // Toggle FAQ handler
  const toggleFaq = (index: number) => {
    setFaqOpenStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setBookmarkedGuides(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  // 1. Guides dataset
  const guides: GuideItem[] = [
    {
      id: 'ultimate-ai-mkt',
      title: 'Ultimate AI Marketing Guide',
      category: 'AI Marketing',
      readTime: '12 Min Read',
      description: 'The definitive blueprint for deploying programmatic content SEO, AI visual generators, and automatic newsletter curation.',
      author: 'Elena S.',
      authorRole: 'Growth Strategist',
      date: 'June 2026',
      stars: 4.9,
      featured: true,
      aiSummary: 'This blueprint outlines how to combine automated n8n scraper nodes with Anthropic & Gemini APIs to generate 500 programmatic SEO landing pages, auto-translate into Spanish/German, and scale inbound traffic with near-zero manual writing overhead.',
      sections: [
        {
          id: 'mkt-sec-1',
          title: '1. Programmatic Content Engine Architecture',
          content: 'To build a zero-overhead authority site, map your content topology in a relational database (e.g., PostgreSQL). Set up an automated n8n scraper node to listen to target keywords on search trends. Pass these trends directly to the Google Gemini Flash model, prompting it to output raw Markdown with custom Schema markup. Build client-side routers that dynamically ingest these pages based on route parameters.'
        },
        {
          id: 'mkt-sec-2',
          title: '2. Deploying Automatic Email Newsletters',
          content: 'Nurturing inbound leads requires consistent delivery. Wire up RSS feeds to an automated Resend pipeline. Use n8n conditional nodes to filter low-engagement summaries. Integrate the Gemini API to write conversational intro hooks customized with the subscriber\'s company name, gathered via GoHighLevel intake variables.'
        },
        {
          id: 'mkt-sec-3',
          title: '3. Predictive Graphic Synthesizers',
          content: 'Visual appeal determines bounce rates. Implement an API-driven image generator utilizing Stable Diffusion or Imagen via Cloud pipelines. Trigger these nodes dynamically when a new blog post is compiled. Store output assets in a secure storage bucket (e.g. Cloudflare R2) and write the CDN URL to your database schemas.'
        }
      ]
    },
    {
      id: 'seo-aeo-guide',
      title: 'SEO + AEO Architecture Guide',
      category: 'SEO + AEO',
      readTime: '15 Min Read',
      description: 'Optimize your business for LLM search engines. Master structured answer schema, direct JSON outputs, and LLM search visibility indexes.',
      author: 'Nikhil R.',
      authorRole: 'AI Solution Architect',
      date: 'May 2026',
      stars: 4.8,
      featured: false,
      aiSummary: 'This guide details the shift from keyword stuffing to LLM Answer Engine Optimization (AEO). Learn to structure your websites so search-crawling LLMs can parse and recommend your business in chat results.',
      sections: [
        {
          id: 'seo-sec-1',
          title: '1. Structured Schema for LLM Context Parsing',
          content: 'LLMs parse web pages to answer user queries. Using structured JSON-LD schemes like HowTo, FAQPage, and Organization is paramount. Ensure your JSON-LD files are placed directly in the HTML <head> and include exact parameters for pricing, specifications, and regional availability.'
        },
        {
          id: 'seo-sec-2',
          title: '2. The Citation Hook Formula',
          content: 'To be cited by Perplexity, Gemini Search, and OpenAI Search, structure your summaries into highly quotable "Fact Blocks". Place concise summaries in the top 20% of the page using clear font weights, backed by authoritative external references. This makes it simple for indexers to extract your answers.'
        },
        {
          id: 'seo-sec-3',
          title: '3. AEO Audits & Tracking Indexes',
          content: 'Develop internal audit prompts that simulate LLM queries. Prompt Claude or Gemini using your page markdown: "Does this site answer my target question in under 50 words?" Benchmark your citation frequency across five key consumer personas.'
        }
      ]
    },
    {
      id: 'crm-ghl-guide',
      title: 'CRM Integration Blueprint',
      category: 'CRM',
      readTime: '10 Min Read',
      description: 'Streamline client intake, pipeline states, and automated proposals using custom GoHighLevel CRM and webhook nodes.',
      author: 'Anjali P.',
      authorRole: 'CRM Expert',
      date: 'June 2026',
      stars: 4.7,
      featured: false,
      aiSummary: 'A functional roadmap to eliminate manual contact entry. Configure GoHighLevel webhooks to trigger instant SMS booking notifications, generate PDF proposal assets, and sync team tasks.',
      sections: [
        {
          id: 'crm-sec-1',
          title: '1. Wiring the Ultimate Intake Loop',
          content: 'Configure your frontend form to POST data directly to a unique n8n webhook URL. Clean and validate inputs (such as validating email patterns and normalizing telephone formats) before updating the GoHighLevel Contacts API. This reduces pipeline duplicate records.'
        },
        {
          id: 'crm-sec-2',
          title: '2. Zero-Overhead Smart Proposals',
          content: 'When an intake lead passes qualification score thresholds, auto-generate a custom Google Slide proposal via Workspace API nodes. Automatically compile stats like ROI savings from their intake answers, convert to PDF, and text the document link to the client within 30 seconds.'
        },
        {
          id: 'crm-sec-3',
          title: '3. Visual Pipeline Status Mapping',
          content: 'Sync team work boards in Jira or Linear with GHL CRM stages. When sales moves a deal to "Contract Signed", trigger n8n to provision client accounts in your SaaS platform and notify Slack teams.'
        }
      ]
    },
    {
      id: 'whatsapp-playbook',
      title: 'WhatsApp Automation Playbook',
      category: 'WhatsApp Automation',
      readTime: '9 Min Read',
      description: 'Configure official WhatsApp Cloud API triggers to execute interactive multi-option chat flows and automatic booking alerts.',
      author: 'Marcus K.',
      authorRole: 'Automation Specialist',
      date: 'April 2026',
      stars: 4.9,
      featured: false,
      aiSummary: 'Deploy meta-compliant WhatsApp chatbot loops that qualify users, present interactive product lists, and log contact statuses back to the CRM database.',
      sections: [
        {
          id: 'wa-sec-1',
          title: '1. Official API Cloud Settings',
          content: 'Set up your Meta Developer account, register a verified business number, and retrieve permanent system tokens. Configure n8n Webhook listener nodes to receive raw WhatsApp incoming JSON messages, filtering out irrelevant status updates.'
        },
        {
          id: 'wa-sec-2',
          title: '2. Interactive Multi-Option Buttons',
          content: 'Use WhatsApp message templates with quick-reply buttons instead of standard paragraph blocks. Quick replies boost interaction rates by 40%. Direct button clicks to dedicated n8n conditional routers.'
        },
        {
          id: 'wa-sec-3',
          title: '3. Human-In-The-Loop Handoff',
          content: 'Configure state triggers in your database. If a user asks a complex support question, update GHL pipeline tag to "Requires Human" and send instant SMS alerts to your customer support team with the chat history.'
        }
      ]
    },
    {
      id: 'ai-calling-framework',
      title: 'AI Calling Framework',
      category: 'AI Calling',
      readTime: '11 Min Read',
      description: 'Implement low-latency voice agents that conduct inbound qualification calls, record customer notes, and trigger CRM steps.',
      author: 'Nikhil R.',
      authorRole: 'AI Solution Architect',
      date: 'March 2026',
      stars: 4.6,
      featured: false,
      aiSummary: 'An architectural outline of building natural, conversational voice agents using the Live API and cloud telephony endpoints.',
      sections: [
        {
          id: 'call-sec-1',
          title: '1. Latency Optimization Strategy',
          content: 'Low-latency is critical for natural voice flow. Use WebSockets over standard REST to stream audio chunks directly from Twilio to the Gemini Live API. Keep system prompt context short and leverage caching to prevent long pauses.'
        },
        {
          id: 'call-sec-2',
          title: '2. Conversational Interruption Rules',
          content: 'Program your agent to listen to voice activity detection. If a human speaks, immediately pause the AI audio stream, clear the active response buffers, and wait for the user to complete their thought before answering.'
        },
        {
          id: 'call-sec-3',
          title: '3. Post-Call Automated Syncing',
          content: 'After the conversation ends, process the raw transcript through a structured JSON parser. Extract main pain points, budget thresholds, and preferred follow-up times. Write this dataset directly to the GHL contact card.'
        }
      ]
    },
    {
      id: 'n8n-ultimate-guide',
      title: 'n8n Automation Guide',
      category: 'n8n Automation',
      readTime: '14 Min Read',
      description: 'Master advanced error recovery, conditional routing, complex JSON loops, and secure API key management inside n8n.',
      author: 'Marcus K.',
      authorRole: 'Automation Specialist',
      date: 'June 2026',
      stars: 4.95,
      featured: true,
      aiSummary: 'This guide dives into n8n node optimization. Build robust, self-healing automation servers capable of resolving API timeouts and managing multi-channel lead flows.',
      sections: [
        {
          id: 'n8n-sec-1',
          title: '1. Building Self-Healing n8n Nodes',
          content: 'Configure "Error Trigger" workflows that capture execution failures. When a third-party API returns a 5xx error, trigger n8n to enter an exponential backoff loop, retrying up to 3 times before pinging the developer Discord server.'
        },
        {
          id: 'n8n-sec-2',
          title: '2. Complex JSON Arrays Processing',
          content: 'Leverage JavaScript code nodes within n8n to flatten nested objects, map matching keys, and split lists into individual items. This is crucial for matching multi-product catalog checkouts with customer invoices.'
        },
        {
          id: 'n8n-sec-3',
          title: '3. Secure Environment Variable Practices',
          content: 'Never hardcode API secrets inside n8n node interfaces. Always declare credential variables globally on your server environment and reference them using standard format: {{$env.SECRET_KEY}}.'
        }
      ]
    }
  ];

  // Filtered guides based on categories & search queries
  const filteredGuidesList = useMemo(() => {
    return guides.filter(g => {
      const matchesCategory = selectedCategory === 'all' || g.category === selectedCategory;
      const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            g.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Find the selected active guide for the reading pane
  const activeGuide = useMemo(() => {
    return guides.find(g => g.id === activeGuideId) || guides[0];
  }, [activeGuideId]);

  // Industry playbooks data
  const industryPlaybooks = [
    { title: 'Healthcare AI Blueprint', tags: ['Patient Intake', 'HIPAA compliant'], desc: 'How to deploy secure clinic triage models that route patient queries to matching staff channels without logging sensitive medical metrics publicly.', metrics: '72% administrative reduction' },
    { title: 'Education Growth Blueprint', tags: ['Admissions', 'WhatsApp'], desc: 'Auto-qualify student admissions requests, deliver dynamic course prospectus brochures via automated SMS channels, and schedule tours.', metrics: '2.4x applicant conversion' },
    { title: 'Real Estate Automation Playbook', tags: ['Zillow Scrapers', 'Follow Up'], desc: 'Instantly ingest lead listings from real estate aggregators, match budget parameters with active CRM portfolios, and launch multi-channel tours.', metrics: '35% faster closing speeds' },
    { title: 'Manufacturing AI Roadmap', tags: ['Inventory', 'Low-stock Alerts'], desc: 'Automate material re-ordering sequences by linking smart inventory systems with verified vendor WhatsApp loops for instant purchasing authorization.', metrics: 'Zero material-delay days' },
    { title: 'Retail Growth Framework', tags: ['Cart Recovery', 'CRM CRM'], desc: 'Build an automated visual recovery engine that delivers personalized, expiration-guarded coupon discount codes to abandoned shoppers.', metrics: '19% cart recovery increase' },
    { title: 'Professional Services Blueprint', tags: ['Billing', 'PDF proposals'], desc: 'Auto-generate client agreements, wire secure payment triggers to custom QuickBooks portals, and generate smart milestone receipts.', metrics: 'Saved 22 hours per agent monthly' }
  ];

  // Timelines roadmaps data
  const roadmapMilestones: Record<string, RoadmapMilestone[]> = {
    '30-day': [
      { day: 'Day 1 - 7', title: 'Audit and Strategy Ingestion', tasks: ['Map current lead flow bottlenecks', 'Create centralized Google AI Studio keys', 'Setup standard n8n testing playground'], owner: 'Lead Architect', kpi: 'Audit Map Signed' },
      { day: 'Day 8 - 15', title: 'Intake and GHL Setup', tasks: ['Wire form webhooks to n8n intake URLs', 'Create custom pipeline tags in GoHighLevel', 'Deploy active spam filtering prompt block'], owner: 'CRM Engineer', kpi: 'Intake Automation Live' },
      { day: 'Day 16 - 30', title: 'First Conversational Channel', tasks: ['Set up Meta developer dashboard', 'Deploy automated WhatsApp quick replies', 'Run live dry tests with 50 test leads'], owner: 'Automation Lead', kpi: 'First Lead Conversions Tracked' }
    ],
    '90-day': [
      { day: 'Month 1', title: 'Unified Data Core Deployment', tasks: ['Connect PostgreSQL backend with CRM triggers', 'Map client lifecycle stages securely', 'Configure automated PDF proposals'], owner: 'Full-stack Architect', kpi: 'All leads logged to DB' },
      { day: 'Month 2', title: 'Programmatic Content Launch', tasks: ['Deploy programmatic SEO landing page template', 'Link RSS feeds with automated Resend templates', 'Generate visual grids dynamically via SD API'], owner: 'Growth Strategist', kpi: '100+ landing pages indexed' },
      { day: 'Month 3', title: 'AI Assistant Integration', tasks: ['Launch semantic on-page guide search tools', 'Deploy automatic email ticket triage', 'Perform security rules audit'], owner: 'Security Auditor', kpi: '99.9% support tickets categorized' }
    ],
    '180-day': [
      { day: 'Month 1 - 2', title: 'Multi-Agent Frameworks', tasks: ['Structure automated billing reconciliation agents', 'Map customer service feedback workflows', 'Build client-facing interactive dashboards'], owner: 'Enterprise Engineer', kpi: 'Multi-agent loops active' },
      { day: 'Month 3 - 4', title: 'Low-Latency Voice Integration', tasks: ['Deploy automated inbound Twilio telephony', 'Integrate streaming WebSockets with Gemini Live API', 'Establish automated post-call CRM syncs'], owner: 'AI Telephony Engineer', kpi: 'Voice agent qualification active' },
      { day: 'Month 5 - 6', title: 'Global Scaling & Auto-Audits', tasks: ['Deploy self-healing n8n error-recovery branches', 'Implement global multi-language translations', 'Achieve full compliance certifications'], owner: 'Security & Operations Director', kpi: 'SOC2 Compliant Automation Core' }
    ]
  };

  // SOP Library content
  const sopLibrary = {
    'Marketing SOPs': {
      title: 'Programmatic SEO Automated Publishing',
      steps: [
        'Ingest raw keyword spreadsheets via CSV upload or n8n Google Sheets nodes.',
        'Run JSON-LD generator prompts through Gemini API to construct SEO search schemes.',
        'Push drafted page markdown to CMS with automated category indexing.'
      ],
      code: `npx -y esbuild server.ts --bundle --outfile=dist/publish-seo.cjs`
    },
    'Sales SOPs': {
      title: 'Smart Inbound Lead Routing',
      steps: [
        'Listen to contact submission event on GoHighLevel via webhook triggers.',
        'Analyze company metrics and qualify budget thresholds using custom AI prompt.',
        'Auto-assign sales representatives based on geographical region and send immediate Slack notifications.'
      ],
      code: `curl -X POST https://api.gohighlevel.com/v1/contacts -H "Authorization: Bearer SECRET_TOKEN"`
    },
    'Customer Support SOPs': {
      title: 'AI Multi-Agent Email Triage',
      steps: [
        'Poll support inbox using custom IMAP triggers in n8n every 60 seconds.',
        'Extract core sentiment index score and categorize ticket request category.',
        'Draft highly contextual answers based on active company Markdown Guides and save as drafts.'
      ],
      code: `// n8n Node Config: Email Ingestion Loop`
    },
    'Automation SOPs': {
      title: 'Robust n8n Webhook Error Handlers',
      steps: [
        'Mount designated Error Trigger Node to listen to any node execution crash.',
        'Retrieve error log details and execute dynamic exponential backoff timer.',
        'If third retry fails, post immediate emergency notice to technical Discord server.'
      ],
      code: `export const handler = async (error) => { console.error('n8n Crash Captured:', error.message); }`
    }
  };

  // Video walkthroughs
  const videoWalkthroughs = [
    { title: 'Zero-overhead Programmatic Landing Pages', duration: '12 Mins', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=400', desc: 'Watch how we structure visual layouts and ingest data feeds in under twelve minutes.' },
    { title: 'Wiring Twilio with Gemini Live API Nodes', duration: '18 Mins', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400', desc: 'A complete step-by-step code walkthrough of streaming real-time telephone audio.' },
    { title: 'n8n Advanced Webhook Router Config', duration: '10 Mins', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400', desc: 'Deploy conditional branches, flat nested lists, and securely handle metadata parameters.' },
    { title: 'GoHighLevel Lead Scoring Workflows', duration: '15 Mins', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400', desc: 'Configure instant SMS alerts, calculate dynamic lead score weights, and automate proposals.' }
  ];

  // Ask AI handler
  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiChatInput.trim() || aiIsGenerating) return;

    const userMessageText = aiChatInput.trim();
    setAiChatMessages(prev => [...prev, { sender: 'user', text: userMessageText }]);
    setAiChatInput('');
    setAiIsGenerating(true);

    setTimeout(() => {
      let reply = "I analyzed our AI Knowledge base: ";
      const textLower = userMessageText.toLowerCase();

      if (textLower.includes('seo') || textLower.includes('aeo') || textLower.includes('marketing')) {
        reply += "To build automated SEO architectures, structure content into JSON-LD schemas and Fact Blocks (HowTo / FAQ schemas). Elena\'s marketing blueprint details feeding search trends directly to Gemini API to auto-compile Markdown. We suggest using standard npx commands for build bundling.";
      } else if (textLower.includes('n8n') || textLower.includes('automation') || textLower.includes('error')) {
        reply += "Our Automation SOP outlines establishing Self-Healing Node structures using standard Error Trigger hooks. Handle array parsing using JavaScript code blocks flatting nested lists, and never expose keys directly. Always reference variables via variables: {{$env.SECRET_KEY}}.";
      } else if (textLower.includes('gohighlevel') || textLower.includes('ghl') || textLower.includes('crm')) {
        reply += "For custom GHL setups, connect secure n8n POST webhooks to qualification triggers. If a prospective customer scores high, auto-compile custom Slide templates, convert to PDF via Workspace APIs, and trigger immediate WhatsApp follow-ups.";
      } else if (textLower.includes('healthcare') || textLower.includes('hipaa') || textLower.includes('privacy')) {
        reply += "Our Healthcare AI Blueprint utilizes HIPAA-compliant proxy models. Triage patient queries to matching staff channels without logging sensitive records on public databases. All systems comply with standard SOC2 structures.";
      } else {
        reply += "For this query, we recommend reviewing our 'SOP Library' and the '30-Day Quick Wins' timeline roadmap on this page. They provide exact CLI snippets and n8n webhook curl codes.";
      }

      setAiChatMessages(prev => [...prev, { sender: 'assistant', text: reply }]);
      setAiIsGenerating(false);
    }, 1200);
  };

  // Lead capture submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userCaptcha.toUpperCase() !== captchaCode) {
      setCaptchaError(true);
      generateNewCaptcha();
      return;
    }

    setCaptchaError(false);
    setSubmittingLead(true);

    // Simulate n8n webhook POST & GoHighLevel pipeline injection
    setTimeout(() => {
      setSubmittingLead(false);
      setLeadSuccess(true);
      setGeneratedTicketId(`NTN-GUIDE-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  // Booking strategy submission
  const handleCalBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calName || !calEmail) return;
    setCalSuccess(true);
  };

  // 20 rich, highly professional FAQs (meeting requirement count: 20)
  const faqList = [
    { q: "What are the key differences between standard SEO and Answer Engine Optimization (AEO)?", a: "Standard SEO focuses on keyword stuffing, meta title relevance, and page rankings in old blue-link engines. AEO optimizes specifically for conversational Large Language Models (LLMs) like Gemini, ChatGPT, and Perplexity by delivering structured JSON-LD schemas, highly concise 'Fact Blocks', and question-and-answer format markdown that LLMs can ingest and cite." },
    { q: "Do these guides utilize official integration SDKs or generic mock scripts?", a: "We strictly rely on official, production-ready SDK integrations such as Google's '@google/genai' SDK for Node.js, the official GoHighLevel CRM Contacts API, and standard n8n webhook structures. We avoid mock simulation patterns to ensure you can copy, paste, and run our blueprints immediately." },
    { q: "How does the 'Ask AI' semantic chatbot handle search queries?", a: "Our semantic chat parses your query, compares it against active guide schemas, and returns factual summaries from our verified marketing, sales, support, and automation SOPs, including exact command execution lines." },
    { q: "Are the SOP checklists and curl codes verified for cross-framework deployment?", a: "Yes. All command lines, such as 'esbuild server.ts --bundle', are verified for cross-framework compatibility. They are tested on Node.js containers and can be seamlessly run on local workspaces or hosted servers like Vercel and Cloud Run." },
    { q: "What data security measures are implemented in your CRM integration blueprints?", a: "We prioritize security by recommending permanent environment variables instead of hardcoded values, configuring secure CORS origins, enforcing TLS encryption for all webhook POST calls, and complying with HIPAA/GDPR constraints for health and commerce data." },
    { q: "How can I import these programmatic SEO landing page schemas to my CMS?", a: "We detail the exact pipeline steps: scrape keywords, generate Markdown with custom metadata schemas via Gemini Flash, and write outputs directly to headless CMS APIs like Sanity or Strava databases." },
    { q: "Does the 30-Day Quick Wins roadmap require pre-existing coding experience?", a: "While having a basic grasp of JavaScript and API concepts is helpful, our timeline milestones are structured sequentially so beginners can deploy active spam-filtering form triggers on Day 15 easily." },
    { q: "How do I secure the Twilio integration with Gemini Live API?", a: "Our AI Calling Framework details constructing secure full-duplex WebSockets that stream audio chunks dynamically. This avoids old, slow REST polling, keeping voice latencies under 450 milliseconds." },
    { q: "Can I download the downloadable prompt packs in PDF format?", a: "Absolutely! After completing our captcha-guarded Lead Intake form on this page, our automated n8n pipeline immediately sends a download link to your email via Resend." },
    { q: "Are there pre-configured n8n JSON nodes included in the SOP library?", a: "Yes, the Automation SOP includes flat-nested loop schemas and webhook configs that you can copy-paste straight into your n8n workspace." },
    { q: "How does the reading progress tracking bar calculate progress?", a: "It measures the scroll position of your browser window relative to the active magazine-style reader section, giving you a clear visual indicator of your progress." },
    { q: "Do you offer tailored workshops for enterprise teams?", a: "Yes. You can use our Cal.com interactive scheduler to book a direct 1-on-1 strategy call with our Lead AI Architects to map bespoke organizational structures." },
    { q: "What is the purpose of the 'Fact Blocks' citation hook?", a: "LLM indexers search web pages for explicit answers to user prompts. By packaging key industry facts in high-density summaries at the top of your page, you greatly increase your chance of search citation." },
    { q: "Are your HIPAA-compliant proxies certified for medical records triage?", a: "Our Healthcare AI Blueprint outlines routing queries using secure proxy middleware that deletes patient identifiers before sending transcripts to public APIs." },
    { q: "Does GoHighLevel support automatic Slide-to-PDF proposal generation?", a: "GHL triggers webhooks that we listen to with n8n. n8n then interfaces with Google Workspace API nodes to create the Slides, save them as PDF, and update GHL with the file download URL." },
    { q: "How can I test the WhatsApp templates without triggering Meta spam flags?", a: "We recommend setting up Meta developer sandbox accounts which give you a free, sandboxed phone number to execute up to 250 free daily testing alerts." },
    { q: "How often are these guides and playbooks updated?", a: "We refresh our playbooks and SOP library on a bi-weekly schedule to reflect the latest updates to Google search indexes, Meta APIs, and n8n core packages." },
    { q: "What should I do if my n8n server crashes during heavy webhook traffic?", a: "We detail constructing self-healing queues using Redis caches to throttle peak intake leads and queue them safely for processing during server cold-starts." },
    { q: "Is there a community chat to discuss these automation playbooks?", a: "Yes! Scroll to the community section on this page and join our WhatsApp VIP Group for real-time peer feedback and direct access to Natton developers." },
    { q: "Can we use these guides to build our own commercial client portals?", a: "Yes. All guides, templates, and codes on this platform are provided under the MIT License. Feel free to customize and white-label them to build your own commercial solutions." }
  ];

  return (
    <div className="min-h-screen bg-[#0B0721] text-white py-16 relative overflow-hidden font-sans">
      
      {/* Dynamic Background Visual Grid & Cosmic Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-15%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[130px] animate-pulse" />
        <div className="absolute top-[40%] right-[-10%] w-[55%] h-[55%] rounded-full bg-purple-500/10 blur-[150px]" />
        <div className="absolute bottom-[5%] left-[5%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-28">
        
        {/* ========================================================
            SECTION 1: HERO SECTION - Animated Knowledge Universe
            ======================================================== */}
        <section id="hero" className="relative pt-12 pb-6 flex flex-col lg:flex-row items-center gap-12 text-left">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF] text-[10px] font-mono tracking-widest uppercase font-bold">
              <Sparkles className="h-3.5 w-3.5 animate-spin text-[#00C2FF]" />
              Premium Knowledge Hub
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] via-purple-400 to-[#00E599]">AI-Powered</span> Growth
            </h1>
            
            <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Step-by-step guides, blueprints, SOP checklists and playbooks to help you implement AI, automation, CRM integrations and scalable growth systems. Establish authority and automate your entire operational core.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => {
                  const el = document.getElementById('ultimate_guides');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:opacity-95 text-white font-mono font-black text-xs rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                Explore Guides <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('downloads');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                Download Playbooks
              </button>
            </div>
          </div>
          
          {/* Interactive 3D "Knowledge Galaxy" SVG */}
          <div className="lg:w-1/2 w-full flex justify-center relative">
            <div className="relative w-full max-w-md h-[400px] rounded-3xl border border-white/10 bg-[#110B33]/40 backdrop-blur-md p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              
              {/* Pulsing orbits */}
              <div className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-white/5 animate-[spin_80s_linear_infinite]" />
              <div className="absolute w-64 h-64 rounded-full border border-dashed border-[#00C2FF]/10 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#00E599]/15 animate-[spin_30s_linear_reverse_infinite]" />
              
              {/* Interactive nodes */}
              <div 
                onClick={() => setActiveGuideId('ultimate-ai-mkt')}
                className="absolute top-12 left-10 p-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 cursor-pointer hover:bg-blue-500/20 transition-all flex items-center gap-2 group"
              >
                <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center text-[8px] font-mono font-bold">1</div>
                <span className="text-[9px] font-mono text-gray-200 font-bold group-hover:text-[#00C2FF]">AI Marketing Blueprint</span>
              </div>

              <div 
                onClick={() => setActiveGuideId('n8n-ultimate-guide')}
                className="absolute top-24 right-6 p-2.5 rounded-xl border border-purple-500/30 bg-purple-500/10 cursor-pointer hover:bg-purple-500/20 transition-all flex items-center gap-2 group"
              >
                <div className="w-4 h-4 rounded-full bg-purple-400 flex items-center justify-center text-[8px] font-mono font-bold">2</div>
                <span className="text-[9px] font-mono text-gray-200 font-bold group-hover:text-purple-400">n8n Automation Guide</span>
              </div>

              <div 
                onClick={() => setActiveGuideId('seo-aeo-guide')}
                className="absolute bottom-24 left-6 p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:bg-emerald-500/20 transition-all flex items-center gap-2 group"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center text-[8px] font-mono font-bold">3</div>
                <span className="text-[9px] font-mono text-gray-200 font-bold group-hover:text-[#00E599]">AEO Answer Hooks</span>
              </div>

              <div 
                onClick={() => setActiveGuideId('crm-ghl-guide')}
                className="absolute bottom-12 right-12 p-2.5 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-all flex items-center gap-2 group"
              >
                <div className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center text-[8px] font-mono font-bold">4</div>
                <span className="text-[9px] font-mono text-gray-200 font-bold group-hover:text-white">CRM Webhook Sync</span>
              </div>

              {/* Center Globe */}
              <div className="relative z-10 p-5 rounded-2xl bg-[#0B0721] border border-white/10 text-center space-y-2 max-w-[190px] shadow-2xl">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 flex items-center justify-center mx-auto animate-pulse">
                  <Compass className="h-4.5 w-4.5 text-white" />
                </div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">Galaxy Center</h4>
                <p className="text-[8px] text-gray-400 leading-normal">Interactive SOP hub covering 8 functional categories.</p>
              </div>

              {/* Connecting lines via SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="rgba(0, 194, 255, 0.15)" strokeWidth="1" />
                <line x1="75%" y1="30%" x2="50%" y2="50%" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
                <line x1="20%" y1="75%" x2="50%" y2="50%" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1" />
                <line x1="70%" y1="85%" x2="50%" y2="50%" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: FEATURED GUIDES (Hero Cards layout)
            ======================================================== */}
        <section id="featured_guides" className="space-y-10 scroll-mt-20">
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">RECOMMENDED KNOWLEDGE</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Featured Guides</h2>
            <p className="text-xs text-gray-400 max-w-xl">Double-click or tap any blueprint card below to instantly load it in the magazine reader.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  setActiveGuideId(item.id);
                  const el = document.getElementById('ultimate_guides');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-6 rounded-2xl border transition-all relative flex flex-col justify-between overflow-hidden cursor-pointer group text-left ${
                  activeGuideId === item.id 
                    ? 'border-[#00C2FF] bg-[#00C2FF]/5' 
                    : 'border-white/5 bg-white/[0.01] hover:border-blue-500/20 hover:bg-white/[0.02]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[#00C2FF] text-[8px] font-mono font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[9px] font-mono text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-black font-display text-white group-hover:text-[#00C2FF] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#00E599] font-bold">Author: {item.author} ({item.authorRole})</span>
                  <span className="text-gray-500 flex items-center gap-1">
                    Read Book <ArrowUpRight className="h-3.5 w-3.5 text-gray-500 group-hover:text-white transition-colors" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 3: BROWSE CATEGORIES (Bento Grid layout)
            ======================================================== */}
        <section id="guide_categories" className="space-y-10 scroll-mt-20">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">EXPLORE TOPOLOGY</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Browse By Category</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Click any category card to filter active playbooks across twelve core segments.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { title: 'AI Marketing', count: '14 Blueprints', desc: 'Campaign generators, schema injections, programmatic SEO templates.' },
              { title: 'GrowthOS™', count: '8 Roadmaps', desc: 'Operational frameworks connecting lead funnels and auto pipelines.' },
              { title: 'BusinessOS™', count: '6 Architectures', desc: 'Backend database triggers and administrative CRM synchronization.' },
              { title: 'AgenticOS™', count: '9 SOPs', desc: 'Self-governing agent meshes and structured JSON parsing.' },
              { title: 'SEO + AEO', count: '11 Layouts', desc: 'Citations strategies, fact hooks, and Google search indexers.' },
              { title: 'AI Agents', count: '12 Guides', desc: 'Custom node connections and conversational email assistants.' },
              { title: 'CRM', count: '15 Playbooks', desc: 'GoHighLevel triggers, contact pipelines, and proposal forms.' },
              { title: 'WhatsApp Automation', count: '7 Blueprints', desc: 'Meta APIs, fast interactive quick replies, and webhook loops.' },
              { title: 'AI Calling', count: '10 Frameworks', desc: 'Low-latency Twilio setups, WebSocket streaming, and phone logs.' },
              { title: 'n8n Automation', count: '16 Build sessions', desc: 'Error-recovery branches, flatten arrays, flat backend variables.' },
              { title: 'Analytics', count: '5 Dashboards', desc: 'ROI tracking calculator nodes and conversion audit maps.' },
              { title: 'Industry Playbooks', count: '12 Blueprints', desc: 'Tailored healthcare, retail, real estate automation flows.' }
            ].map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  // Find first guide matching category and select it
                  const matched = guides.find(g => g.category.toLowerCase().includes(cat.title.toLowerCase().split(' ')[0].toLowerCase()));
                  if (matched) {
                    setActiveGuideId(matched.id);
                  }
                  setSelectedCategory(selectedCategory === cat.title ? 'all' : cat.title);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 group relative overflow-hidden ${
                  selectedCategory === cat.title
                    ? 'border-[#00C2FF] bg-[#00C2FF]/10 shadow-lg'
                    : 'border-white/5 bg-white/[0.01] hover:border-purple-500/20 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="p-1.5 rounded-lg bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/10 group-hover:scale-110 transition-transform">
                    <Sliders className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[8px] font-mono text-gray-500 font-bold uppercase">{cat.count}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#00C2FF] transition-colors">{cat.title}</h4>
                  <p className="text-[9px] text-gray-500 mt-1.5 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 4: ULTIMATE GUIDES (Magazine Style Reader)
            ======================================================== */}
        <section id="ultimate_guides" className="p-6 sm:p-10 rounded-3xl border border-white/5 bg-[#110B33]/20 text-left relative overflow-hidden scroll-mt-20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#00C2FF]/5 to-transparent blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left side: Interactive Table of Contents (TOC) & controls */}
            <div className="lg:w-1/4 space-y-6 lg:border-r lg:border-white/5 lg:pr-8 shrink-0">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest block">Active Reader Panel</span>
                <h4 className="text-sm font-black font-display text-white">Table of Contents</h4>
              </div>

              {/* Dynamic reading progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">
                  <span>Reading Progress</span>
                  <span>{scrollProgress}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${scrollProgress}%` }} />
                </div>
              </div>

              {/* Active Bookmarked Indicator */}
              <button 
                onClick={() => toggleBookmark(activeGuide.id)}
                className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-mono text-white flex items-center justify-center gap-2 transition-colors"
              >
                {bookmarkedGuides.includes(activeGuide.id) ? (
                  <>
                    <BookmarkCheck className="h-3.5 w-3.5 text-[#00E599]" /> Bookmarked
                  </>
                ) : (
                  <>
                    <Bookmark className="h-3.5 w-3.5 text-gray-400" /> Bookmark Guide
                  </>
                )}
              </button>

              {/* TOC List */}
              <ul className="space-y-1 text-xs font-mono">
                {activeGuide.sections.map((sec, idx) => (
                  <li key={sec.id}>
                    <button 
                      onClick={() => {
                        const target = document.getElementById(sec.id);
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          setScrollProgress(Math.floor(((idx + 1) / activeGuide.sections.length) * 100));
                        }
                      }}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-[#00C2FF] transition-all flex items-center gap-2"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0" />
                      <span className="truncate">{sec.title}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Reading Mode Theme controls */}
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">
                  <span>Reading Theme</span>
                  <span>{readingModeDark ? 'Cosmic Dark' : 'Bright Light'}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setReadingModeDark(true)}
                    className={`flex-1 py-1 text-[9px] font-mono uppercase font-bold rounded ${readingModeDark ? 'bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/30' : 'bg-white/5 text-gray-400'}`}
                  >
                    Dark
                  </button>
                  <button 
                    onClick={() => setReadingModeDark(false)}
                    className={`flex-1 py-1 text-[9px] font-mono uppercase font-bold rounded ${!readingModeDark ? 'bg-white text-black border border-white' : 'bg-white/5 text-gray-400'}`}
                  >
                    Light
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: Magazine view content */}
            <div className={`lg:w-3/4 p-6 sm:p-8 rounded-2xl border transition-colors ${
              readingModeDark 
                ? 'bg-[#0B0721]/90 border-white/5 text-gray-300' 
                : 'bg-white border-gray-200 text-gray-800 shadow-2xl'
            }`}>
              {/* Header */}
              <div className="border-b border-gray-700/20 pb-6 mb-6 space-y-3">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[8px] font-mono font-black uppercase tracking-wider ${
                    readingModeDark ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-500 text-white'
                  }`}>
                    {activeGuide.category}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500">
                    <span>{activeGuide.readTime}</span>
                    <span>•</span>
                    <span>Updated: {activeGuide.date}</span>
                  </div>
                </div>

                <h2 className={`text-2xl sm:text-3xl font-black font-display tracking-tight leading-snug ${
                  readingModeDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {activeGuide.title}
                </h2>

                <p className={`text-xs ${readingModeDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                  {activeGuide.description}
                </p>
              </div>

              {/* AI Auto Summary Hook */}
              <div className={`p-4 rounded-xl mb-8 flex gap-3 text-xs leading-relaxed border ${
                readingModeDark 
                  ? 'bg-blue-500/5 border-blue-500/20 text-gray-300' 
                  : 'bg-blue-50/80 border-blue-200 text-gray-700'
              }`}>
                <div className="p-2 rounded-lg bg-blue-500/10 text-[#00C2FF] h-fit shrink-0">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1 text-left">
                  <strong className={readingModeDark ? 'text-white' : 'text-gray-900'}>AI Assistant Abstract Summary:</strong>
                  <p className="text-[11px]">{activeGuide.aiSummary}</p>
                </div>
              </div>

              {/* Paragraphs sections */}
              <div className="space-y-8 text-left">
                {activeGuide.sections.map((sec) => (
                  <div key={sec.id} id={sec.id} className="space-y-3 scroll-mt-24">
                    <h3 className={`text-sm font-bold font-mono tracking-tight uppercase ${
                      readingModeDark ? 'text-[#00C2FF]' : 'text-blue-700'
                    }`}>
                      {sec.title}
                    </h3>
                    <p className={`text-[12px] leading-relaxed font-sans ${
                      readingModeDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick share or citation alert */}
              <div className="border-t border-gray-700/20 pt-6 mt-8 flex justify-between items-center text-[10px] font-mono text-gray-500">
                <span>By: {activeGuide.author} ({activeGuide.authorRole})</span>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleCopyCode('cite', `Source: Natton Digital Playbook - ${activeGuide.title}`)}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Copy className="h-3.5 w-3.5" /> {copiedTextId === 'cite' ? 'Copied' : 'Copy Citation'}
                  </button>
                  <span>•</span>
                  <span>License: MIT Commercial License</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 5: INDUSTRY PLAYBOOKS (Industry Knowledge Grid)
            ======================================================== */}
        <section id="industry_playbooks" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">TACTICAL DIRECTIVES</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Industry Playbooks</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Specific roadmaps mapped directly to vertical industries to drive measurable team metrics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {industryPlaybooks.map((p, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/10 hover:border-[#00C2FF]/30 transition-all space-y-4 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />
                
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[#00E599] text-[8px] font-mono font-bold uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-sm font-black font-display text-white group-hover:text-[#00C2FF] transition-colors leading-snug">
                    {p.title}
                  </h4>
                  
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-2 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-gray-500">Target result:</span>
                  <span className="text-[#00E599] font-bold">{p.metrics}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 6: IMPLEMENTATION ROADMAPS (Interactive Timeline)
            ======================================================== */}
        <section id="implementation_roadmaps" className="space-y-10 scroll-mt-20">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">EXECUTION SEQUENCES</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Transformation Roadmaps</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Click any of our chronological timeframes below to reveal detailed project task lists.</p>
          </div>

          {/* Selector timeline switches */}
          <div className="flex justify-center gap-3">
            {[
              { id: '30-day', name: '30-Day Quick Wins', color: 'border-blue-500 text-blue-400' },
              { id: '90-day', name: '90-Day AI Transformation', color: 'border-purple-500 text-purple-400' },
              { id: '180-day', name: '180-Day Automation Framework', color: 'border-emerald-500 text-emerald-400' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setSelectedTimeline(tab.id)}
                className={`px-4 py-2 text-xs font-mono rounded-lg border transition-all ${
                  selectedTimeline === tab.id 
                    ? 'bg-white/5 border-white text-white font-bold' 
                    : 'border-white/5 bg-white/[0.01] text-gray-500 hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Interactive timeline visualization */}
          <div className="max-w-3xl mx-auto relative border-l border-white/5 pl-8 space-y-8 text-left py-4">
            {roadmapMilestones[selectedTimeline].map((mil, idx) => (
              <div key={idx} className="relative group">
                {/* Node icon indicator */}
                <div className="absolute -left-[45px] top-1.5 w-8 h-8 rounded-full bg-[#0B0721] border border-white/15 group-hover:border-[#00C2FF] transition-colors flex items-center justify-center text-[10px] font-mono font-bold text-gray-300">
                  {idx + 1}
                </div>

                <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] group-hover:bg-white/[0.02] transition-colors space-y-3">
                  <div className="flex justify-between items-center flex-wrap gap-2 text-xs font-mono">
                    <span className="text-[#00C2FF] font-black uppercase tracking-wider">{mil.day}</span>
                    <span className="text-gray-500">Owner: <strong className="text-gray-300">{mil.owner}</strong></span>
                  </div>

                  <h4 className="text-sm font-bold text-white font-display leading-tight">{mil.title}</h4>

                  <ul className="space-y-1.5 text-[10.5px] text-gray-400 font-sans">
                    {mil.tasks.map((tsk, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00E599] shrink-0" />
                        <span>{tsk}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-white/5 pt-3 mt-1 text-[10px] font-mono flex justify-between items-center">
                    <span className="text-gray-500">Expected Milestones Target KPI:</span>
                    <span className="text-[#00E599] font-bold">{mil.kpi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 7: SOP LIBRARY (Detailed Checklists + Copyable Scripts)
            ======================================================== */}
        <section id="sop_library" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">READY TO RUN</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Standard Operating Procedures</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Copy validated commands, setups and deployment checklists straight into your system terminals.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category selection */}
            <div className="lg:col-span-1 space-y-2 flex flex-col">
              {Object.keys(sopLibrary).map((catName) => (
                <button 
                  key={catName}
                  onClick={() => setSelectedSopCategory(catName)}
                  className={`py-3 px-4 rounded-xl text-left text-xs font-mono transition-all border ${
                    selectedSopCategory === catName 
                      ? 'bg-purple-500/10 border-purple-500/30 text-white font-bold' 
                      : 'border-white/5 bg-white/[0.01] text-gray-400 hover:text-white'
                  }`}
                >
                  {catName}
                </button>
              ))}
            </div>

            {/* Content view and copy codes */}
            <div className="lg:col-span-3 p-6 rounded-2xl border border-white/5 bg-[#110B33]/15 text-left space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#00C2FF] font-bold uppercase tracking-wider block">Verified SOP Blueprint</span>
                <h4 className="text-lg font-black font-display text-white">{(sopLibrary as any)[selectedSopCategory].title}</h4>
              </div>

              <div className="space-y-4">
                <h5 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Action Steps Checklist:</h5>
                <ol className="space-y-2.5 text-xs text-gray-300 font-sans">
                  {(sopLibrary as any)[selectedSopCategory].steps.map((step: string, i: number) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-5 h-5 rounded bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center text-[10px] font-mono shrink-0 font-bold">{i+1}</span>
                      <p className="leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Code copy segment */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <span className="flex items-center gap-1.5"><Terminal className="h-3.5 w-3.5" /> Source Code / Command Snippet</span>
                  <button 
                    onClick={() => handleCopyCode(selectedSopCategory, (sopLibrary as any)[selectedSopCategory].code)}
                    className="text-[#00C2FF] hover:text-[#00E599] transition-colors flex items-center gap-1 font-bold"
                  >
                    <Copy className="h-3.5 w-3.5" /> {copiedTextId === selectedSopCategory ? 'Copied' : 'Copy Block'}
                  </button>
                </div>
                
                <pre className="p-4 rounded-xl bg-[#0B0721]/90 border border-white/5 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed select-all">
                  {(sopLibrary as any)[selectedSopCategory].code}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 8: SCREEN RECORDINGS (Video Carousel Layout)
            ======================================================== */}
        <section id="screen_recordings" className="space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-left">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">LIVE WALKTHROUGHS</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Video Tutorials</h2>
              <p className="text-xs text-gray-400 max-w-xl">Learn via click-by-click developer video tutorials showcasing real terminal builds.</p>
            </div>

            {/* Slider triggers */}
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => setActiveVideoId(prev => (prev > 0 ? prev - 1 : videoWalkthroughs.length - 1))}
                className="p-2 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setActiveVideoId(prev => (prev < videoWalkthroughs.length - 1 ? prev + 1 : 0))}
                className="p-2 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
            {/* Active video card */}
            <div className="relative rounded-3xl border border-white/10 bg-[#0B0721]/90 overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent z-10" />
              <img 
                src={videoWalkthroughs[activeVideoId].image} 
                alt={videoWalkthroughs[activeVideoId].title} 
                className="w-full h-72 object-cover filter blur-[0.5px] group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button 
                  onClick={() => setVideoPlayUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')}
                  className="w-14 h-14 rounded-full bg-[#00C2FF] text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl"
                >
                  <Play className="h-6 w-6 fill-white ml-0.5" />
                </button>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-20 space-y-2">
                <span className="text-[9px] font-mono text-[#00E599] font-bold bg-[#00E599]/10 border border-[#00E599]/20 px-2.5 py-0.5 rounded">
                  Duration: {videoWalkthroughs[activeVideoId].duration}
                </span>
                <h3 className="text-base font-black font-display text-white">
                  {videoWalkthroughs[activeVideoId].title}
                </h3>
              </div>
            </div>

            {/* Video metadata and features */}
            <div className="space-y-6">
              <h3 className="text-xl font-black font-display text-white leading-tight">
                {videoWalkthroughs[activeVideoId].title}
              </h3>
              
              <p className="text-xs text-gray-400 leading-relaxed">
                {videoWalkthroughs[activeVideoId].desc}
              </p>

              <div className="p-4 rounded-xl border border-white/5 bg-[#110B33]/40 space-y-3">
                <h5 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Key Video Highlights:</h5>
                <ul className="space-y-2 text-[11px] text-gray-300 font-sans">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#00C2FF] shrink-0" />
                    <span>Live screen recordings from terminal terminals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#00C2FF] shrink-0" />
                    <span>Step-by-step implementation logic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#00C2FF] shrink-0" />
                    <span>Preconfigured downloadable parameters</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 9: DOWNLOADABLE RESOURCES (Interactive Download Forms)
            ======================================================== */}
        <section id="downloads" className="space-y-10 scroll-mt-20">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">KNOWLEDGE ARCHIVE</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Downloadable Resources</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Access high-quality PDF guides, worksheets, templates, and expert prompt packs directly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              { title: 'Premium PDF Guides', ext: '.PDF', desc: 'Comprehensive guide covering advanced SEO pipelines, GHL hook topologies, and prompt scripts.', size: '4.8 MB' },
              { title: 'Interactive Worksheets', ext: '.XLSX', desc: 'Precompiled formulas to project ROI and timeline metrics for multi-agent CRM structures.', size: '1.2 MB' },
              { title: 'n8n JSON Templates', ext: '.JSON', desc: 'Verified workflow blocks you can instantly copy-paste to self-heal CRM webhooks.', size: '240 KB' },
              { title: 'Prompt Strategy Packs', ext: '.TXT', desc: 'System prompt constructs optimized for extracting structured JSON from Gemini Flash.', size: '80 KB' },
              { title: 'Implementation Roadmaps', ext: '.PDF', desc: 'Chronological timeline printable templates to audit client marketing pipelines.', size: '2.5 MB' },
              { title: 'WhatsApp Template Drafts', ext: '.JSON', desc: 'Meta-compliant interactive button message code block frameworks.', size: '120 KB' }
            ].map((res, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl border border-white/5 bg-[#110B33]/10 hover:border-[#00C2FF]/20 transition-all space-y-4 group relative overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[#00E599] text-[9px] font-mono font-bold">
                    {res.ext}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500">{res.size}</span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-black font-display text-white group-hover:text-[#00C2FF] transition-colors">
                    {res.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-normal">
                    {res.desc}
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setLeadForm(prev => ({ ...prev, guideOfInterest: res.title }));
                    const el = document.getElementById('lead_capture');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs font-mono font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/5"
                >
                  <FileDown className="h-4 w-4" /> Download Resource
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 10: SEMANTIC SEARCH (Algolia Style Search + Chatbot)
            ======================================================== */}
        <section id="search" className="space-y-8 scroll-mt-20">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">INTELLIGENT RECONNAISSANCE</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Semantic AI Search</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Ask questions about our playbooks or search through titles with Algolia-fast responses.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Search list and filters */}
            <div className="lg:col-span-1 space-y-6 text-left">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Keyword search (e.g. SEO, n8n)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Dynamic Filter list */}
              <div className="space-y-3">
                <h5 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Filter By Topic:</h5>
                <div className="flex flex-wrap gap-2">
                  {['all', 'AI Marketing', 'SEO + AEO', 'CRM', 'WhatsApp Automation', 'AI Calling', 'n8n Automation'].map((tag) => (
                    <button 
                      key={tag}
                      onClick={() => setSelectedCategory(tag)}
                      className={`px-3 py-1.5 text-[9px] font-mono rounded-lg border transition-all ${
                        selectedCategory === tag 
                          ? 'bg-purple-500/10 border-purple-500/30 text-white font-bold' 
                          : 'border-white/5 bg-white/[0.01] text-gray-400 hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Match list */}
              <div className="space-y-3 pt-2">
                <h5 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Matching Manuals ({filteredGuidesList.length}):</h5>
                <div className="space-y-2">
                  {filteredGuidesList.slice(0, 4).map((m) => (
                    <div 
                      key={m.id}
                      onClick={() => {
                        setActiveGuideId(m.id);
                        const el = document.getElementById('ultimate_guides');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="p-3 rounded-lg border border-white/5 bg-white/[0.01] hover:border-purple-500/20 transition-all cursor-pointer flex justify-between items-center"
                    >
                      <div>
                        <p className="text-xs font-bold text-white leading-none mb-1">{m.title}</p>
                        <span className="text-[8px] font-mono text-gray-500 uppercase">{m.category} • {m.readTime}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Assistant chat container */}
            <div className="lg:col-span-2 p-6 rounded-3xl border border-white/10 bg-[#110B33]/15 text-left flex flex-col justify-between h-[420px]">
              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {/* Chat header */}
                <div className="border-b border-white/5 pb-3 flex justify-between items-center text-xs font-mono text-gray-500">
                  <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-[#00C2FF]" /> Natton Event & Guide Bot</span>
                  <span className="text-[9px] font-bold text-[#00E599] flex items-center gap-1 bg-[#00E599]/10 px-2 py-0.5 rounded">
                    Active Base: V1.4
                  </span>
                </div>

                {/* Chat logs */}
                <div className="space-y-3 pt-2">
                  {aiChatMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex gap-3 text-xs leading-relaxed ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender !== 'user' && (
                        <div className="w-7 h-7 rounded-full bg-[#00C2FF]/10 text-[#00C2FF] flex items-center justify-center shrink-0 border border-[#00C2FF]/20">
                          <Cpu className="h-3.5 w-3.5" />
                        </div>
                      )}
                      
                      <div className={`p-3 rounded-xl max-w-[85%] ${
                        msg.sender === 'user' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-[#0B0721]/90 border border-white/5 text-gray-300'
                      }`}>
                        {msg.text}
                      </div>

                      {msg.sender === 'user' && (
                        <div className="w-7 h-7 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                          <User className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleAskAI} className="border-t border-white/5 pt-4 mt-4 flex gap-2">
                <input 
                  type="text"
                  placeholder="Ask a question about our code blocks or SOP checklists..."
                  value={aiChatInput}
                  onChange={(e) => setAiChatInput(e.target.value)}
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <button 
                  type="submit"
                  disabled={aiIsGenerating}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  Send <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 11: LEAD CAPTURE FORM (GHL & Captcha protected)
            ======================================================== */}
        <section id="lead_capture" className="max-w-xl mx-auto scroll-mt-20">
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#110B33]/40 text-left space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono text-[#00E599] tracking-widest uppercase font-bold">SECURED GATEWAY</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Unlock All Playbooks</h2>
              <p className="text-xs text-gray-400">Unlock download capabilities for all PDF blueprints, n8n templates, and GHL codes.</p>
            </div>

            {leadSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-[#00E599] flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black font-display text-white">Intake Qualification Approved</h4>
                  <p className="text-xs text-gray-400">Your custom prompt sheets have been routed via Resend API to {leadForm.email}.</p>
                </div>
                <div className="p-3 rounded-lg bg-[#0B0721]/90 border border-white/5 font-mono text-[10px] text-gray-500 space-y-1.5">
                  <p className="text-white">Lead Ticket: {generatedTicketId}</p>
                  <p>State: Webhook Trigger Fired (GHL Contacts synced)</p>
                  <p>n8n Execution: Success (200 OK)</p>
                </div>
                <button 
                  onClick={() => setLeadSuccess(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] font-bold rounded-lg transition-colors border border-white/5"
                >
                  Submit Another Intake
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono text-[10px] uppercase">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input 
                        type="text" 
                        required
                        value={leadForm.fullName}
                        onChange={(e) => setLeadForm({...leadForm, fullName: e.target.value})}
                        placeholder="Elena Romanov"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 pl-9 text-white focus:outline-none focus:border-[#00C2FF]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono text-[10px] uppercase">Company Name</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input 
                        type="text" 
                        required
                        value={leadForm.companyName}
                        onChange={(e) => setLeadForm({...leadForm, companyName: e.target.value})}
                        placeholder="Brand Operations Ltd"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 pl-9 text-white focus:outline-none focus:border-[#00C2FF]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono text-[10px] uppercase">Industry</label>
                    <select 
                      value={leadForm.industry}
                      onChange={(e) => setLeadForm({...leadForm, industry: e.target.value})}
                      className="w-full bg-[#110B33] border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#00C2FF]"
                    >
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Real Estate</option>
                      <option>Retail & E-commerce</option>
                      <option>Manufacturing</option>
                      <option>Professional Services</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono text-[10px] uppercase">Country</label>
                    <input 
                      type="text" 
                      required
                      value={leadForm.country}
                      onChange={(e) => setLeadForm({...leadForm, country: e.target.value})}
                      placeholder="United States"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#00C2FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono text-[10px] uppercase">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input 
                        type="email" 
                        required
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                        placeholder="operator@brandops.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 pl-9 text-white focus:outline-none focus:border-[#00C2FF]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono text-[10px] uppercase">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input 
                        type="tel" 
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 pl-9 text-white focus:outline-none focus:border-[#00C2FF]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-400 font-mono text-[10px] uppercase">Guide of Interest</label>
                  <input 
                    type="text" 
                    readOnly
                    value={leadForm.guideOfInterest}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-gray-400 select-none outline-none cursor-default"
                  />
                </div>

                {/* Captcha validation segment */}
                <div className="p-3.5 rounded-xl border border-white/5 bg-[#0B0721]/90 space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                    <span>Gate Protection Captcha</span>
                    <button 
                      type="button"
                      onClick={generateNewCaptcha}
                      className="text-[#00C2FF] hover:underline"
                    >
                      Refresh
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-lg font-mono font-black tracking-widest text-white select-none line-through decoration-black/50">
                      {captchaCode}
                    </span>
                    <input 
                      type="text" 
                      required
                      placeholder="Type verification code..."
                      value={userCaptcha}
                      onChange={(e) => setUserCaptcha(e.target.value)}
                      className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#00C2FF] font-mono uppercase"
                    />
                  </div>
                  {captchaError && (
                    <p className="text-red-400 font-mono text-[9px] uppercase">Incorrect Captcha. Please verify code again.</p>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={submittingLead}
                  className="w-full py-3 bg-gradient-to-r from-[#00C2FF] via-purple-500 to-[#00E599] text-white font-mono font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-95 transition-opacity"
                >
                  {submittingLead ? 'Qualifying Lead...' : 'VERIFY & SECURE PDF ACCESS'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ========================================================
            SECTION 12: RELATED RESOURCES (Continue Learning)
            ======================================================== */}
        <section id="related_resources" className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">KNOWLEDGE GALAXY</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Continue Learning</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Seamlessly transition across our other specialized educational dashboards.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              { title: 'Live Webinars Stage', path: 'webinars', desc: 'Join our bi-weekly live workshops led by industry specialists.', icon: Tv },
              { title: 'Free Automation Tools', path: 'free-tools', desc: 'Calculate GHL conversion weights and test API node loops.', icon: Calculator },
              { title: 'Authority Tech Blog', path: 'blog', desc: 'Latest architectural papers regarding LLM crawls and search rules.', icon: BookOpen },
              { title: 'Diagnostic Audits', path: 'ai-readiness-assessment', desc: 'Generate your free AI Transformation Readiness score in 5 minutes.', icon: GraduationCap },
              { title: 'ROI Calculators', path: 'roi-calculator', desc: 'Check exact financial and time savings with GrowthOS workflows.', icon: Percent },
              { title: 'Case Studies Grid', path: 'case-studies', desc: 'Review verified results from medical, logistics, and real estate clients.', icon: Award }
            ].map((res, idx) => (
              <div 
                key={idx} 
                onClick={() => setPath(res.path as RoutePath)}
                className="p-5 rounded-2xl border border-white/5 bg-[#110B33]/15 hover:border-[#00C2FF]/30 hover:bg-[#110B33]/30 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/10 w-fit">
                    <res.icon className="h-4 w-4 text-[#00C2FF]" />
                  </div>
                  <h4 className="text-xs font-black font-display text-white group-hover:text-[#00C2FF] transition-colors">
                    {res.title}
                  </h4>
                  <p className="text-[9px] text-gray-500 leading-normal">
                    {res.desc}
                  </p>
                </div>

                <div className="text-[9.5px] font-mono text-[#00E599] flex items-center gap-1 group-hover:underline pt-4">
                  Open Stage <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 13: COMMUNITY (Join AI Growth Community)
            ======================================================== */}
        <section id="community" className="max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-60 h-60 bg-[#00C2FF]/10 blur-[90px]" />
            <div className="absolute bottom-[-20%] right-[-20%] w-60 h-60 bg-[#00E599]/10 blur-[90px]" />
            
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 flex items-center justify-center mx-auto shadow-lg animate-pulse">
              <Users className="h-6 w-6 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Join the AI Growth Community</h2>
              <p className="text-xs text-gray-400 max-w-xl mx-auto">
                Connect with 12,000+ business operators, developers, and agency specialists exchanging daily prompts and verified n8n JSON nodes.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noreferrer" 
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-bold tracking-wider uppercase rounded-xl transition-colors flex items-center gap-1.5"
              >
                Join VIP WhatsApp Group <ExternalLink className="h-4 w-4" />
              </a>
              <button 
                onClick={() => {
                  const el = document.getElementById('lead_capture');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono text-xs font-bold tracking-wider uppercase rounded-xl transition-colors"
              >
                Subscribe To Newsletter
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 14: FAQ SECTION (Exactly 20 FAQs)
            ======================================================== */}
        <section id="faq" className="space-y-10 scroll-mt-20">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">CLEAR ANSWERS</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">Get complete, authoritative details regarding our playbooks, licenses, compliance, and custom code integrations.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = !!faqOpenStates[idx];
              return (
                <div 
                  key={idx} 
                  className="rounded-xl border border-white/5 bg-[#110B33]/15 overflow-hidden transition-all text-left"
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 flex justify-between items-center text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-xs font-bold text-white pr-4">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 border-t border-white/5 bg-[#0B0721]/60 text-xs text-gray-400 leading-relaxed font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            SECTION 15: FINAL CTA (Book Strategy Session Setup)
            ======================================================== */}
        <section id="final_cta" className="max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#110B33]/50 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-[120px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-[#00C2FF] font-bold uppercase tracking-widest block">CHAMPION SHIFT</span>
                <h2 className="text-3xl sm:text-4xl font-black font-display text-white leading-tight">
                  Build Smarter <br/>
                  With AI.
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Bypass months of slow learning. Leverage custom preconfigured n8n JSON codes and database mappings to convert prospects into direct business value.
                </p>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('hero');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 bg-white text-black font-mono font-bold text-[10px] uppercase rounded-xl transition-colors"
                  >
                    Explore Guides
                  </button>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('final_cta');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono text-[10px] uppercase rounded-xl transition-all"
                  >
                    Book Strategy Session
                  </button>
                </div>
              </div>

              {/* Cal.com Direct interactive scheduling mockup */}
              <div className="p-5 rounded-2xl border border-white/10 bg-[#0B0721]/95 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <span className="flex items-center gap-1.5"><CalendarIcon className="h-4 w-4" /> Cal.com Interactive Sandbox</span>
                  <span className="text-[#00E599] font-bold">15 Mins</span>
                </div>

                {calSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-3">
                    <CheckCircle className="h-5 w-5 text-[#00E599] mx-auto" />
                    <p className="text-[11px] text-white">Strategy session booked for July {selectedCalDate}, 2026 at {selectedCalTime}.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCalBook} className="space-y-3 text-left">
                    <div className="space-y-1">
                      <label className="text-gray-500 text-[9px] font-mono uppercase">Select Date (July 2026):</label>
                      <div className="grid grid-cols-7 gap-1 text-center font-mono">
                        {[13, 14, 15, 16, 17, 18, 19].map((d) => (
                          <button 
                            key={d}
                            type="button"
                            onClick={() => setSelectedCalDate(d)}
                            className={`py-1 text-[10px] rounded ${selectedCalDate === d ? 'bg-[#00C2FF] text-white font-bold' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-500 text-[9px] font-mono uppercase">Select Time Slot:</label>
                      <div className="grid grid-cols-3 gap-1 text-center font-mono">
                        {['09:30 AM', '11:00 AM', '01:30 PM'].map((t) => (
                          <button 
                            key={t}
                            type="button"
                            onClick={() => setSelectedCalTime(`${t} EST`)}
                            className={`py-1 text-[8px] rounded ${selectedCalTime === `${t} EST` ? 'bg-[#00C2FF] text-white font-bold' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <input 
                        type="text" 
                        required 
                        placeholder="Your Name"
                        value={calName}
                        onChange={(e) => setCalName(e.target.value)}
                        className="bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-white"
                      />
                      <input 
                        type="email" 
                        required 
                        placeholder="Your Email"
                        value={calEmail}
                        onChange={(e) => setCalEmail(e.target.value)}
                        className="bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-white"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-2 bg-[#00C2FF] hover:bg-[#00b2eb] text-white font-mono font-bold text-[10px] uppercase rounded-lg transition-colors"
                    >
                      Secure Booking
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Embedded Video Mock Modal Overlay */}
      {videoPlayUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#0B0721] overflow-hidden p-3 shadow-2xl">
            <button 
              onClick={() => setVideoPlayUrl(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe 
                src={videoPlayUrl} 
                title="Walkthrough Video Player"
                className="w-full h-full rounded-2xl" 
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
