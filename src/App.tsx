import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Products from './pages/Products';
import Industries from './pages/Industries';
import CaseStudies from './pages/CaseStudies';
import Blog from './pages/Blog';
import Tools from './pages/Tools';
import Contact from './pages/Contact';
import About from './pages/About';
import WhyNattonDigital from './pages/WhyNattonDigital';
import OurProcess from './pages/OurProcess';
import BookDemo from './pages/BookDemo';
import ResourcesHub from './pages/ResourcesHub';
import Integrations from './pages/Integrations';
import Pricing from './pages/Pricing';
import Admin from './pages/Admin';
import Compare from './pages/Compare';
import FreeTools from './pages/FreeTools';
import Careers from './pages/Careers';
import Webinars from './pages/Webinars';
import Guides from './pages/Guides';
import SEO from './components/SEO';
import { Sparkles, CheckCircle, ShieldCheck, Cpu } from 'lucide-react';

const SEO_METADATA: Record<string, { title: string; description: string; image: string }> = {
  'home': {
    title: 'Natton Digital | Scale Your Business with AI-Powered Operations',
    description: 'Deploy custom-trained AI Agents, automated CRM pipelines, WhatsApp Business bots, and programmatic SEO models for 10x growth with zero manual overhead.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  },
  'solutions/ai-growth-marketing': {
    title: 'AI Growth Marketing Solutions | Natton Digital',
    description: 'Automate organic & paid acquisition. Scale with programmatic SEO, AI-powered copywriting, dynamic graphics, and automatic newsletters.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  },
  'solutions/ai-marketing-saas': {
    title: 'AI Marketing SaaS & Automation Platform | Natton Digital',
    description: 'Supercharge content generation with our AI Content Studio, automated SEO audit tools, and intelligent campaign performance scorer.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  },
  'solutions/crm-ai-automation': {
    title: 'CRM & AI Automation SaaS Solutions | Natton Digital',
    description: 'Leverage our custom GrowthOS CRM to manage lead lifecycles, configure immediate WhatsApp pipelines, and streamline support.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
  },
  'solutions/conversational-ai': {
    title: 'Conversational AI Hub & Voice Automation | Natton Digital',
    description: 'Deploy natural low-latency voice bots, intelligent interactive chats, and automated customer triage pipelines.',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80'
  },
  'solutions/whatsapp-automation': {
    title: 'WhatsApp Business API Automation & Chatbots | Natton Digital',
    description: 'Configure Meta-approved WhatsApp broadcast triggers, build interactive choice menus, and sync directly with GHL CRM.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  },
  'solutions/ai-calling-agents': {
    title: 'AI Voice & Inbound Calling Agents | Natton Digital',
    description: 'Scale outbound calls and instant inbound qualifications with lifelike low-latency voice AI linked to your CRM data.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'
  },
  'solutions/cloud-telephony': {
    title: 'Cloud Telephony Platform & Smart IVR | Natton Digital',
    description: 'Modern, reliable cloud telephony. Intelligent routing, multi-level IVR, call recording logs, and CRM pipeline syncing.',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1200&q=80'
  },
  'solutions/rcs-messaging': {
    title: 'RCS Messaging & Rich Interactive SMS | Natton Digital',
    description: 'Deliver interactive SMS containing image carousels, payment links, and call-to-actions directly to mobile screens.',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80'
  },
  'solutions/ai-agents': {
    title: 'Autonomous AI Agents & n8n Workflows | Natton Digital',
    description: 'Deploy multi-agent task forces for marketing, CRM reconciliation, customer support, and automatic bookkeeping.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
  },
  'products/growth-os': {
    title: 'GrowthOS™ All-In-One Acquisition Suite | Natton Digital',
    description: 'Deploy our proprietary platform for scaling organic traffic, indexing thousands of SEO pages, and automating ads budgets.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80'
  },
  'products/ai-marketing-platform': {
    title: 'AI Marketing Studio & Campaign Scorer | Natton Digital',
    description: 'Instantly generate highly-converting copies, design visuals dynamically, and grade campaign relevance automatically.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  },
  'products/business-os': {
    title: 'BusinessOS™ Operational Automation | Natton Digital',
    description: 'Integrate legacy CRM pipelines, accounting records, customer databases, and logistics trackers under one system.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80'
  },
  'products/agentic-os': {
    title: 'AgenticOS™ Multi-Agent Orchestration | Natton Digital',
    description: 'Build, govern, and monitor concurrent AI agents executing operations with custom-designed permission states.',
    image: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=1200&q=80'
  },
  'industries/healthcare': {
    title: 'HIPAA-Compliant AI Triage & Healthcare | Natton Digital',
    description: 'Deploy secure patient intake loops, automate reminders, and triage inquiries without exposing sensitive medical records.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80'
  },
  'industries/education': {
    title: 'AI Enrollment Counselors & Education | Natton Digital',
    description: 'Nurture applicants with WhatsApp prospectuses, automate course catalogs delivery, and coordinate campus visit bookings.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
  },
  'industries/real-estate': {
    title: 'AI Tour Scheduling & Real Estate CRM | Natton Digital',
    description: 'Engage house-hunting leads instantly, prequalify financial requirements, and coordinate booking slots autonomously.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'
  },
  'industries/manufacturing': {
    title: 'AI Supply Chain Tracking & Manufacturing | Natton Digital',
    description: 'Optimize operations with automatic low-stock triggers, dispatch logs parsing, and predictive ordering pipelines.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
  },
  'industries/retail-ecommerce': {
    title: 'Smart Cart Recovery & Retail AI Growth | Natton Digital',
    description: 'Automate coupon distribution, retarget abandoned checkouts on WhatsApp, and triage customer refunds cleanly.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
  },
  'industries/professional-services': {
    title: 'AI Onboarding & Professional Services CRM | Natton Digital',
    description: 'Build instant PDF quotation models, generate client agreements, and sync accounting pipelines with custom webhooks.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
  },
  'case-studies': {
    title: 'Verifiable AI & Automation Case Studies | Natton Digital',
    description: 'Read verified ROI case studies showcasing cross-industry operational scaling and massive administrative savings.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
  },
  'blog': {
    title: 'AI Operations, CRM & Tech Insights Blog | Natton Digital',
    description: 'Expert articles and tutorials detailing n8n workflows, WhatsApp business setups, conversational AI, and SEO strategies.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80'
  },
  'ai-readiness-assessment': {
    title: 'Free AI Readiness Assessment & Diagnostic | Natton Digital',
    description: 'Take our 6-step operational audit to benchmark your business, discover automation gaps, and get a tailored AI roadmap.',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1200&q=80'
  },
  'roi-calculator': {
    title: 'AI & Automation Cash ROI Calculator | Natton Digital',
    description: 'Calculate your exact monthly and annual dollar/time savings of integrating GrowthOS and n8n pipelines.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
  },
  'contact': {
    title: 'Contact Our AI Transformation Engineers | Natton Digital',
    description: 'Connect with Natton Digital developers. Inquire about customized CRM setups, WhatsApp pipelines, or book a strategy session.',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80'
  },
  'about': {
    title: 'About Natton Digital | Pioneers of AI-Powered Growth',
    description: 'Learn about our mission to democratize enterprise-grade AI automation, CRM pipelines, and digital scale for MSMEs globally.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  },
  'why-natton-digital': {
    title: 'Why Partner With Natton Digital? | Enterprise AI Engineers',
    description: 'We combine standard SDK engineering, rigorous security standards, and direct CRM integrations with no mock data.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
  },
  'our-process': {
    title: 'Our 4-Step AI & CRM Integration Process | Natton Digital',
    description: 'From initial audit to workflow blueprints mapping, custom development, and continuous operational scaling.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80'
  },
  'book-demo': {
    title: 'Schedule a 1-on-1 AI Strategy Call | Natton Digital',
    description: 'Book a personalized demonstration of GrowthOS, n8n automation, and customized GoHighLevel workflows.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  },
  'pricing': {
    title: 'Flexible AI Automation Pricing & Packages | Natton Digital',
    description: 'Clear, transparent packages for AI Marketing, Custom CRM integration, and enterprise-grade AgenticOS.',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80'
  },
  'compare': {
    title: 'Natton Digital vs. Traditional Agencies | AI Operations',
    description: 'See how automated n8n pipelines and GrowthOS acquisition software stack up against slow human operational models.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
  },
  'free-tools': {
    title: 'Free AI Content Studio, Calculators & SOPs | Natton Digital',
    description: 'Unlock our suite of free tools including the ROI calculator, AI copywriter, SEO audit grader, and compliance checklists.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  },
  'careers': {
    title: 'Careers at Natton Digital | Join the AI Revolution',
    description: 'We are hiring AI Solutions Engineers, Automation Specialists, and Growth Strategists. Join our remote team today.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
  },
  'webinars': {
    title: 'Webinars, Workshops & AI Bootcamps | Natton Digital',
    description: 'Register for upcoming live automation workshops, watch replay logs, and download exclusive presentation templates.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  },
  'guides': {
    title: 'Ultimate AI Guides, Playbooks & SOP Library | Natton Digital',
    description: 'Master AI, automation, CRM and growth playbooks. Access our step-by-step blueprints, videos, and SOP checklists.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80'
  },
  'admin': {
    title: 'System Administration Login Portal | Natton Digital',
    description: 'Secure admin panel to publish tech blog articles, monitor dynamic comments, and configure programmatic SEO schedules.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
  },
  'resources': {
    title: 'Free Marketing & AI Strategy Resources | Natton Digital',
    description: 'Browse our full resource library, diagnostic tools, pricing plans, and integration guides.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  },
  'integrations': {
    title: 'Enterprise Integrations & Workflow Automation | Natton Digital',
    description: 'Seamlessly connect GrowthOS and n8n pipelines with over 400 custom marketing tools and CRMs.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80'
  }
};

export default function App() {
  const [path, setPath] = useState<RoutePath>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);

  // Sync dark mode class with document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync physical URL typed by user (e.g. entering /admin)
  useEffect(() => {
    const handleLocation = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname.endsWith('/admin') || hash === '#/admin' || hash.endsWith('/admin')) {
        setPath('admin');
      } else {
        // General path synchronization from browser path to page state
        const potentialPath = pathname.substring(1);
        if (potentialPath && potentialPath in SEO_METADATA) {
          setPath(potentialPath as RoutePath);
        }
      }
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // Update browser location history quietly
  useEffect(() => {
    try {
      const currentUrl = window.location.pathname;
      const targetUrl = path === 'home' ? '/' : `/${path}`;
      if (currentUrl !== targetUrl && currentUrl !== `/index.html`) {
        window.history.pushState({}, '', targetUrl);
      }
    } catch (e) {
      // Gracefully prevent standard iframe origin errors
    }
  }, [path]);

  // Toast notification state for Google Sheet synchronization
  const [sheetToast, setSheetToast] = useState<{ show: boolean; formName: string; leadName: string; id: string } | null>(null);

  // Capture ALL forms submitted on any page automatically and write to Google Sheets!
  useEffect(() => {
    const handleGlobalFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      
      // Security: Do NOT capture admin login or moderation forms
      const isLoginForm = form.querySelector('input[type="password"]') !== null || 
                          form.id?.includes('login') || 
                          form.className?.includes('login') ||
                          form.getAttribute('action')?.includes('login');
      if (isLoginForm) return;

      // Determine the form name or source
      let formName = form.getAttribute('data-form-name') || '';
      if (!formName) {
        // Try to locate heading or parent text
        const titleEl = form.querySelector('h2, h3, h4');
        if (titleEl) {
          formName = titleEl.textContent?.trim() || '';
        }
      }
      if (!formName) {
        // Fallback to active page path
        const pageTitle = path.split('/').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        formName = `${pageTitle || 'Home'} Lead Form`;
      }

      // Serialize form fields dynamically based on labels, placeholders or inputs
      const payload: Record<string, any> = {};
      const inputs = form.querySelectorAll('input, select, textarea');
      
      inputs.forEach((el) => {
        const input = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (input.type === 'submit' || input.type === 'button') return;
        
        let fieldName = input.name || input.id;
        if (!fieldName) {
          // Look for preceding or adjacent labels
          const parent = input.parentElement;
          const label = parent?.querySelector('label') || form.querySelector(`label[for="${input.id}"]`);
          if (label) {
            fieldName = label.textContent?.trim() || '';
          } else {
            const prevSibling = parent?.previousElementSibling;
            if (prevSibling && prevSibling.tagName === 'LABEL') {
              fieldName = prevSibling.textContent?.trim() || '';
            }
          }
        }
        
        if (!fieldName) {
          fieldName = ('placeholder' in input ? (input as HTMLInputElement).placeholder : '') || input.type || 'field';
        }
        
        // Clean name
        fieldName = fieldName.replace(/[:*]/g, '').trim();
        
        if (input instanceof HTMLInputElement && (input.type === 'checkbox' || input.type === 'radio')) {
          if (input.type === 'checkbox') {
            payload[fieldName] = input.checked ? 'Yes' : 'No';
          } else if (input.checked) {
            payload[fieldName] = input.value;
          }
        } else {
          payload[fieldName] = input.value;
        }
      });

      // Avoid capturing empty payloads
      if (Object.keys(payload).length > 0) {
        // Register the form submission to localStorage and remote webhook
        import('./utils/googleSheets').then(({ registerFormSubmission }) => {
          registerFormSubmission(formName, payload);
        });
      }
    };

    // Listen to our custom sheet sync events to trigger the beautiful toast
    const handleSyncToast = (e: Event) => {
      const customEvent = e as CustomEvent;
      const sub = customEvent.detail;
      const name = sub.payload['Full Name'] || sub.payload['Contact Name'] || sub.payload['Name'] || 'A User';
      
      setSheetToast({
        show: true,
        formName: sub.formName,
        leadName: String(name),
        id: sub.id
      });

      // Auto dismiss after 6 seconds
      setTimeout(() => {
        setSheetToast(null);
      }, 6000);
    };

    document.addEventListener('submit', handleGlobalFormSubmit);
    window.addEventListener('natton_google_sheet_sync', handleSyncToast);
    
    return () => {
      document.removeEventListener('submit', handleGlobalFormSubmit);
      window.removeEventListener('natton_google_sheet_sync', handleSyncToast);
    };
  }, [path]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [path]);

  const renderContent = () => {
    if (path === 'home') {
      return <Home setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path.startsWith('solutions/')) {
      const sub = path.substring(10) as any;
      return <Solutions subPath={sub} setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path.startsWith('products/')) {
      const sub = path.substring(9);
      return <Products subPath={sub} setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path.startsWith('industries/')) {
      const sub = path.substring(11);
      return <Industries subPath={sub} setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path === 'case-studies') {
      return <CaseStudies setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path === 'blog') {
      return (
        <Blog 
          setPath={setPath} 
          darkMode={darkMode} 
          selectedBlogPostId={selectedBlogPostId} 
          setSelectedBlogPostId={setSelectedBlogPostId} 
        />
      );
    }
    
    if (path === 'ai-readiness-assessment') {
      return <Tools toolType="assessment" setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path === 'roi-calculator') {
      return <Tools toolType="roi-calculator" setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path === 'contact') {
      return <Contact setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'about') {
      return <About setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'why-natton-digital') {
      return <WhyNattonDigital setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'our-process') {
      return <OurProcess setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'book-demo') {
      return <BookDemo setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'resources') {
      return <ResourcesHub setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'integrations') {
      return <Integrations setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'pricing') {
      return <Pricing setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'compare') {
      return <Compare setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'free-tools') {
      return <FreeTools setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'careers') {
      return <Careers setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'webinars') {
      return <Webinars setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'guides') {
      return <Guides setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'admin') {
      return <Admin setPath={setPath} darkMode={darkMode} setSelectedBlogPostId={setSelectedBlogPostId} />;
    }

    return <Home setPath={setPath} darkMode={darkMode} />;
  };

  const currentSEO = SEO_METADATA[path] || SEO_METADATA['home'];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 font-sans ${
      darkMode ? 'bg-[#110B33] text-white' : 'bg-[#F5F9FA] text-[#110B33]'
    }`}>
      {/* SEO Metadata Injector */}
      <SEO title={currentSEO.title} description={currentSEO.description} image={currentSEO.image} />

      {/* Header */}
      <Header currentPath={path} setPath={setPath} darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Reusable floating tools / widgets */}
      <FloatingCTA setPath={setPath} darkMode={darkMode} />

      {/* Footer */}
      <Footer setPath={setPath} darkMode={darkMode} />

      {/* Live Google Sheets Synchronization toast overlay */}
      {sheetToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#0F0A30] border border-[#00C2FF]/30 p-4 rounded-2xl shadow-2xl flex items-start gap-3 animate-fade-in backdrop-blur-md text-white">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="space-y-1 flex-grow text-left">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Sheets Synced Live</span>
              <span className="text-[9px] font-mono text-gray-500">#{sheetToast.id}</span>
            </div>
            <h5 className="text-xs font-bold text-white font-display">New Lead Appended!</h5>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Captured <strong>{sheetToast.leadName}</strong> via <em>"{sheetToast.formName}"</em> and pushed record to Google Sheet.
            </p>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setPath('admin');
                  // Set active tab to sheets in localStorage
                  localStorage.setItem('admin_authenticated', 'true');
                  setSheetToast(null);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#00C2FF] text-black text-[9px] font-mono font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Inspect Sheet Console
              </button>
              <button
                onClick={() => setSheetToast(null)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 text-[9px] font-mono border border-white/5 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
