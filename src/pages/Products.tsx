import React from 'react';
import { CheckCircle } from 'lucide-react';
import { RoutePath } from '../types';
import ProductGrowthOs from './ProductGrowthOs';
import ProductAiMarketingPlatform from './ProductAiMarketingPlatform';
import ProductBusinessOs from './ProductBusinessOs';
import ProductAgenticOs from './ProductAgenticOs';

interface ProductsProps {
  subPath: string;
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Products({ subPath, setPath, darkMode }: ProductsProps) {
  if (subPath === 'growth-os' || subPath === 'growthos') {
    return <ProductGrowthOs setPath={setPath} darkMode={darkMode} />;
  }

  if (subPath === 'ai-marketing-platform') {
    return <ProductAiMarketingPlatform setPath={setPath} darkMode={darkMode} />;
  }

  if (subPath === 'business-os' || subPath === 'businessos') {
    return <ProductBusinessOs setPath={setPath} />;
  }

  if (subPath === 'agentic-os' || subPath === 'agenticos') {
    return <ProductAgenticOs setPath={setPath} />;
  }

  // Products specs data
  const productData: Record<string, {
    name: string;
    tagline: string;
    overview: string;
    keyFeatures: { title: string; desc: string }[];
    techStack: string[];
    capabilities: string[];
  }> = {
    'growth-os': {
      name: 'GrowthOS™',
      tagline: 'Organic & Paid Acquisition Orchestration Suite',
      overview: 'GrowthOS is our flagship CRM, funnel development, and traffic orchestration engine. It acts as a full-stack command terminal to automate sales conversions, track programmatic leads, and synchronize pipeline stages with zero staff friction.',
      keyFeatures: [
        { title: 'Interactive Deal Pipeline', desc: 'Monitor leads as they transition from webhooks to qualified site visits in a clean Kanban layout.' },
        { title: 'Calendly & Forms Interlock', desc: 'Auto-sync prospective appointments, automatically scoring intent before advisors dial.' },
        { title: 'Automatic Review Collector', desc: 'Dispatches Google and Trustpilot review requests instantly upon pipeline win status.' },
        { title: 'Programmatic SEO Grids', desc: 'Pre-renders high-speed local keyword grids, capturing Indian and global search terms.' }
      ],
      techStack: ['React + Vite', 'GoHighLevel CRM', 'Tailwind CSS', 'n8n webhook triggers'],
      capabilities: ['94% operational efficiency', '3.2x lead capture boost', '100% database persistence', 'AES-256 local encrypted logs']
    },
    'ai-marketing-platform': {
      name: 'AI Marketing Platform',
      tagline: 'Generative Copywriting & Brand Domination',
      overview: 'A specialized SaaS suite integrating advanced server-side copywriting models, search engine optimization algorithms, and automated ad campaign generators to scale lead generation hands-free.',
      keyFeatures: [
        { title: 'Gemini Copywriter Studio', desc: 'Generates ad assets, landing page headings, and social caption grids on-the-fly.' },
        { title: 'Search Engine AEO protocols', desc: 'Formats and structures website metadata so modern LLMs (ChatGPT, Gemini) list your brand.' },
        { title: 'Lead Directory Scrapers', desc: 'Scrapes Google maps and local business listings, compiling directories of targeted hot leads.' },
        { title: 'Retargeting Sequence Builder', desc: 'Fires dynamic campaign ads to prospects who abandon shopping carts or landing pages.' }
      ],
      techStack: ['Gemini API SDK', 'NodeJS server nodes', 'Express proxy', 'Vite routing'],
      capabilities: ['Zero copywriter lag', 'Automatic local Delhi/US SEO formatting', 'Integrated reCAPTCHA protection', 'Instant CSV outputs']
    },
    'business-os': {
      name: 'BusinessOS™',
      tagline: 'Operations Integration & Webhook Orchestrator',
      overview: 'BusinessOS is the plumbing of your enterprise. It links legacy database structures, VoIP SIP trunks, and n8n servers directly into a consolidated interface, eliminating manual spreadsheet transfer forever.',
      keyFeatures: [
        { title: 'Official Meta WhatsApp Cloud API', desc: 'Fires approved interactive template cards with custom action button nodes.' },
        { title: 'VoIP Trunk Registrations', desc: 'Routes automated voice calling agents securely through redundant telecom networks.' },
        { title: 'n8n Workflow Engine', desc: 'Schedules complex cross-platform automation loops (Stripe, Google Sheets, GHL CRM).' },
        { title: 'Secure Database Synchronization', desc: 'Pushes leads and transaction ledgers to SQL or Firestore databases with complete privacy.' }
      ],
      techStack: ['n8n servers', 'Twilio Trunking', 'Firestore Admin', 'Meta Cloud API'],
      capabilities: ['99.98% platform uptime', ' HIPAA Compliant patient logging', 'GDPR encrypted profiles', 'Less than 800ms API response latency']
    },
    'agentic-os': {
      name: 'AgenticOS™',
      tagline: 'Orchestration Framework for Multiple AI Agents',
      overview: 'AgenticOS deploys concurrent, specialized AI Agents that act as autonomous staff members. These agents communicate, share files, and execute operational tasks inside n8n sandbox environments.',
      keyFeatures: [
        { title: 'Sales Agent (Prospecting)', desc: 'Scrapes local directories and fires automated LinkedIn / Email outreach campaigns.' },
        { title: 'Customer Support Agent (WhatsApp)', desc: 'Provides 24/7 autonomous support, reading document databases to retrieve exact answers.' },
        { title: 'HR & Finance Agents (Admin)', desc: 'Files resumes, matches reference certificates, and audits monthly transaction receipts.' },
        { title: 'Multi-Agent Consensus Matrix', desc: 'Allows agents to double-check each other’s task outputs, ensuring pristine work quality.' }
      ],
      techStack: ['Google GenAI SDK', 'n8n sandbox servers', 'Express API', 'React state hooks'],
      capabilities: ['Zero human error in audits', '24/7 staff coverage', 'Consolidated billing logs', 'Custom system prompt adjustments']
    }
  };

  const currentProd = productData[subPath] || productData['growth-os'];

  return (
    <div className="py-12 animate-fade-in font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs font-mono text-gray-500">
          <button onClick={() => setPath('home')} className="hover:text-primary">Home</button> / <span className="text-primary">Products</span> / <span>{currentProd.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">GrowthOS Core Module</span>
            <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight leading-tight">{currentProd.name}</h1>
            <p className="text-sm font-semibold text-primary font-display">{currentProd.tagline}</p>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentProd.overview}</p>
            
            <div className="pt-4 border-t border-white/[0.06] space-y-2">
              <span className="text-[10px] font-mono text-gray-500 uppercase block">Engine Specifications:</span>
              <div className="flex flex-wrap gap-2">
                {currentProd.techStack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Side specifications card */}
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
            <span className="text-[10px] font-mono text-[#00C2FF] uppercase tracking-widest block mb-4">Core Capabilities Output</span>
            <div className="space-y-4">
              {currentProd.capabilities.map((cap, i) => (
                <p key={i} className="text-xs flex items-center gap-2.5 font-semibold">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>{cap}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Key features grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-8">Modular Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentProd.keyFeatures.map((feat, idx) => (
              <div key={idx} className={`p-5 rounded-xl border ${darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-gray-100'}`}>
                <h4 className="text-xs font-bold text-[#00C2FF] uppercase mb-1.5">{feat.title}</h4>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Call */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-primary to-[#00C2FF] text-white text-center space-y-4">
          <h3 className="text-base font-bold font-display">Configure {currentProd.name} for Your Business</h3>
          <p className="text-xs max-w-lg mx-auto opacity-90 font-sans">Book a quick 1-on-1 strategy call with our automation architects. We map GHL and n8n pipelines directly to your existing systems.</p>
          <button onClick={() => setPath('contact')} className="py-2.5 px-6 rounded-lg bg-white text-primary font-semibold text-xs hover:shadow-lg transition-all">
            Book Strategy Session
          </button>
        </div>
      </div>
    </div>
  );
}
