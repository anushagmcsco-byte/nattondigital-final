import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Menu, X, ChevronDown, ArrowRight, Activity, Command, Layers } from 'lucide-react';
import Logo from './Logo';
import { RoutePath } from '../types';

interface HeaderProps {
  currentPath: RoutePath;
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Header({ currentPath, setPath, darkMode, setDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'solutions' | 'products' | 'industries' | 'tools' | 'about' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [currentPath]);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const solutions = [
    { name: 'AI Growth Marketing', path: 'solutions/ai-growth-marketing' as RoutePath, desc: 'SEO, AEO, Meta/Google Ads, and dynamic pipeline growth.' },
    { name: 'AI Marketing SaaS', path: 'solutions/ai-marketing-saas' as RoutePath, desc: 'AI content studio, automated SEO assistance, campaign scorer.' },
    { name: 'CRM & AI Automation SaaS', path: 'solutions/crm-ai-automation' as RoutePath, desc: 'GrowthOS CRM pipeline with instant WhatsApp automation.' },
    { name: 'Conversational AI Hub', path: 'solutions/conversational-ai' as RoutePath, desc: 'AI Calling agents, cloud telephony, and automated chats.' },
    { name: 'WhatsApp Automation', path: 'solutions/whatsapp-automation' as RoutePath, desc: 'WhatsApp Business API, broadcasts, and automated chatbots.' },
    { name: 'AI Calling Agents', path: 'solutions/ai-calling-agents' as RoutePath, desc: 'Inbound & outbound Voice AI automation, simulated voice demos.' },
    { name: 'Cloud Telephony Platform', path: 'solutions/cloud-telephony' as RoutePath, desc: 'IVR, call routing, recording, analytics, and CRM integration.' },
    { name: 'RCS Messaging Platform', path: 'solutions/rcs-messaging' as RoutePath, desc: 'Rich communication services, carousels, action buttons, and commerce.' },
    { name: 'AI Agents & Automation', path: 'solutions/ai-agents' as RoutePath, desc: 'Autonomous n8n workflows, Sales agents, Support agents.' },
  ];

  const products = [
    { name: 'GrowthOS™', path: 'products/growth-os' as RoutePath, desc: 'All-in-one organic and paid acquisition orchestration suite.' },
    { name: 'AI Marketing Platform', path: 'products/ai-marketing-platform' as RoutePath, desc: 'Generative copywriting, automated graphics, dynamic campaigns.' },
    { name: 'BusinessOS™', path: 'products/business-os' as RoutePath, desc: 'Operational automation engine integrating legacy pipelines.' },
    { name: 'AgenticOS™', path: 'products/agentic-os' as RoutePath, desc: 'Orchestration framework for multiple concurrent AI agents.' },
  ];

  const industries = [
    { name: 'Healthcare Industry', path: 'industries/healthcare' as RoutePath, desc: 'Patient onboarding, HIPAA AI triages, automated reminders.' },
    { name: 'Education & EdTech', path: 'industries/education' as RoutePath, desc: 'Instant student counselors, WhatsApp brochures, lead nurture.' },
    { name: 'Real Estate Segment', path: 'industries/real-estate' as RoutePath, desc: 'Prequalified voice bot tours, booking pipeline, buyer scoring.' },
    { name: 'Manufacturing Sector', path: 'industries/manufacturing' as RoutePath, desc: 'Low-stock automated ordering, dispatch logs, internal agents.' },
    { name: 'Retail & E-commerce', path: 'industries/retail-ecommerce' as RoutePath, desc: 'Cart recovery, support bots, personalized coupons.' },
    { name: 'Professional Services', path: 'industries/professional-services' as RoutePath, desc: 'Instant quotation proposals, smart onboarding, invoice logs.' },
  ];

  const tools = [
    { name: 'Free Growth Tools', path: 'free-tools' as RoutePath, desc: 'Free AI, SEO, CRM & ROI calculators to evaluate opportunities and accelerate growth.' },
    { name: 'Careers at Natton', path: 'careers' as RoutePath, desc: 'Join our team and help shape the future of AI and digital transformation.' },
    { name: 'Webinars & Workshops', path: 'webinars' as RoutePath, desc: 'Register for upcoming live events, watch bootcamp recordings, and download templates.' },
    { name: 'Guides & Playbooks', path: 'guides' as RoutePath, desc: 'Explore ultimate AI transformation playbooks, SOPs, and step-by-step guides.' },
    { name: 'AI Readiness Assessment', path: 'ai-readiness-assessment' as RoutePath, desc: 'Take a 6-step diagnostic audit to generate an AI strategy score.' },
    { name: 'ROI & Automation Calculator', path: 'roi-calculator' as RoutePath, desc: 'Calculate exact cash and time savings with GrowthOS.' },
    { name: 'Case Studies Grid', path: 'case-studies' as RoutePath, desc: 'Explore verifiable ROI case studies of cross-industry scaling.' },
    { name: 'Tech Blog & Insights', path: 'blog' as RoutePath, desc: 'Latest tactics on AI, CRM, WhatsApp, and n8n orchestration.' },
    { name: 'Pricing & Plans', path: 'pricing' as RoutePath, desc: 'Transparent billing packages for AI Marketing, CRM, and AgenticOS.' },
  ];

  const searchablePages = [
    { name: 'Homepage Growth Center', path: 'home' as RoutePath, category: 'Main' },
    ...solutions.map(s => ({ name: s.name, path: s.path, category: 'Solutions' })),
    ...products.map(p => ({ name: p.name, path: p.path, category: 'Products' })),
    ...industries.map(i => ({ name: i.name, path: i.path, category: 'Industries' })),
    ...tools.map(t => ({ name: t.name, path: t.path, category: 'Tools / Resources' })),
    { name: 'About Us & Partners', path: 'about' as RoutePath, category: 'Company' },
    { name: 'Contact & Booking', path: 'contact' as RoutePath, category: 'Company' }
  ];

  const filteredSearchResults = searchQuery === ''
    ? searchablePages.slice(0, 5)
    : searchablePages.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6);

  const toggleDropdown = (name: 'solutions' | 'products' | 'industries' | 'tools' | 'about') => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 border-b backdrop-blur-md ${
      darkMode ? 'bg-[#110B33]/80 border-white/[0.08]' : 'bg-white/80 border-gray-100 shadow-sm'
    }`}>
      {/* Global Banner alert */}
      <div className="bg-gradient-to-r from-[#2E9CAE] via-[#47C7BF] to-[#99D57C] text-white text-[11px] font-medium text-center py-1.5 px-4 tracking-wider uppercase select-none flex items-center justify-center gap-2">
        <span className="bg-white/20 px-1.5 py-0.5 rounded font-mono text-[9px]">Live Announcement</span>
        <span>Empowering MSMEs in India & SMBs worldwide with autonomous AI Operations.</span>
        <button onClick={() => setPath('ai-readiness-assessment')} className="underline font-bold hover:opacity-80 transition-all ml-1">
          Take AI Assessment →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => setPath('home')}>
            <Logo darkMode={darkMode} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown('solutions')}
                onClick={() => toggleDropdown('solutions')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                  activeDropdown === 'solutions' || currentPath.startsWith('solutions')
                    ? 'text-primary font-semibold'
                    : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                Solutions
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'solutions' && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className={`absolute left-1/2 transform -translate-x-1/2 mt-1 w-[460px] p-4 rounded-xl border grid grid-cols-1 gap-2 shadow-xl animate-fade-in ${
                    darkMode ? 'bg-dark/95 border-white/[0.1] text-white' : 'bg-white border-gray-100 text-[#110B33]'
                  }`}
                >
                  <div className="text-[10px] font-mono tracking-widest text-[#47C7BF] px-2 mb-1 uppercase">
                    Cross-Industry Marketing & Automation
                  </div>
                  {solutions.map((s) => (
                    <button
                      key={s.path}
                      onClick={() => {
                        setPath(s.path);
                        setActiveDropdown(null);
                      }}
                      className={`text-left p-2.5 rounded-lg transition-all flex flex-col gap-0.5 ${
                        darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xs font-semibold hover:text-primary transition-colors flex items-center justify-between">
                        {s.name} <ArrowRight className="h-3 w-3 opacity-0 hover:opacity-100" />
                      </span>
                      <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown('products')}
                onClick={() => toggleDropdown('products')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                  activeDropdown === 'products' || currentPath.startsWith('products')
                    ? 'text-primary font-semibold'
                    : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                Products
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'products' && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className={`absolute left-1/2 transform -translate-x-1/2 mt-1 w-[460px] p-4 rounded-xl border grid grid-cols-2 gap-2 shadow-xl animate-fade-in ${
                    darkMode ? 'bg-dark/95 border-white/[0.1] text-white' : 'bg-white border-gray-100 text-[#110B33]'
                  }`}
                >
                  <div className="col-span-2 text-[10px] font-mono tracking-widest text-[#47C7BF] px-2 mb-1 uppercase">
                    Proprietary AI Engines (GrowthOS)
                  </div>
                  {products.map((p) => (
                    <button
                      key={p.path}
                      onClick={() => {
                        setPath(p.path);
                        setActiveDropdown(null);
                      }}
                      className={`text-left p-2.5 rounded-lg transition-all flex flex-col gap-0.5 ${
                        darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xs font-semibold text-primary">{p.name}</span>
                      <span className={`text-[9px] leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{p.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown('industries')}
                onClick={() => toggleDropdown('industries')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                  activeDropdown === 'industries' || currentPath.startsWith('industries')
                    ? 'text-primary font-semibold'
                    : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                Industries
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'industries' && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className={`absolute left-1/2 transform -translate-x-1/2 mt-1 w-[550px] p-4 rounded-xl border grid grid-cols-2 gap-3 shadow-xl animate-fade-in ${
                    darkMode ? 'bg-dark/95 border-white/[0.1] text-white' : 'bg-white border-gray-100 text-[#110B33]'
                  }`}
                >
                  <div className="col-span-2 text-[10px] font-mono tracking-widest text-[#47C7BF] px-2 mb-1 uppercase">
                    Optimized Sector Blueprints (MSMEs & SMBs)
                  </div>
                  {industries.map((ind) => (
                    <button
                      key={ind.path}
                      onClick={() => {
                        setPath(ind.path);
                        setActiveDropdown(null);
                      }}
                      className={`text-left p-2 rounded-lg transition-all flex flex-col gap-0.5 ${
                        darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xs font-semibold hover:text-primary transition-colors">{ind.name}</span>
                      <span className={`text-[9px] leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{ind.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Tools Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown('tools')}
                onClick={() => toggleDropdown('tools')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                  activeDropdown === 'tools' || currentPath === 'roi-calculator' || currentPath === 'ai-readiness-assessment'
                    ? 'text-primary font-semibold'
                    : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                Resources
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'tools' && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className={`absolute right-0 mt-1 w-[380px] p-4 rounded-xl border grid grid-cols-1 gap-2 shadow-xl animate-fade-in ${
                    darkMode ? 'bg-dark/95 border-white/[0.1] text-white' : 'bg-white border-gray-100 text-[#110B33]'
                  }`}
                >
                  <div className="text-[10px] font-mono tracking-widest text-[#47C7BF] px-2 mb-1 uppercase">
                    Interactive Optimization Suites
                  </div>
                  {tools.map((t) => (
                    <button
                      key={t.path}
                      onClick={() => {
                        setPath(t.path);
                        setActiveDropdown(null);
                      }}
                      className={`text-left p-2 rounded-lg transition-all flex flex-col gap-0.5 ${
                        darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xs font-semibold text-primary">{t.name}</span>
                      <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown('about')}
                onClick={() => toggleDropdown('about')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                  activeDropdown === 'about' || currentPath === 'about' || currentPath === 'why-natton-digital' || currentPath === 'our-process'
                    ? 'text-primary font-semibold'
                    : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                About Us
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'about' && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className={`absolute right-0 mt-1 w-[260px] p-3 rounded-xl border grid grid-cols-1 gap-2 shadow-xl animate-fade-in ${
                    darkMode ? 'bg-[#110B33]/95 border-white/[0.1] text-white' : 'bg-white border-gray-100 text-[#110B33]'
                  }`}
                >
                  <div className="text-[10px] font-mono tracking-widest text-[#47C7BF] px-2 mb-1 uppercase">
                    Our Organization & Positioning
                  </div>
                  <button
                    onClick={() => {
                      setPath('about');
                      setActiveDropdown(null);
                    }}
                    className={`text-left p-2 rounded-lg transition-all flex flex-col gap-0.5 ${
                      darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xs font-semibold text-primary">About Natton Digital</span>
                    <span className={`text-[9px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Mission, Vision, and core values.</span>
                  </button>
                  <button
                    onClick={() => {
                      setPath('why-natton-digital');
                      setActiveDropdown(null);
                    }}
                    className={`text-left p-2 rounded-lg transition-all flex flex-col gap-0.5 ${
                      darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xs font-semibold text-primary">Why Natton Digital</span>
                    <span className={`text-[9px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Detailed enterprise positioning.</span>
                  </button>
                  <button
                    onClick={() => {
                      setPath('our-process');
                      setActiveDropdown(null);
                    }}
                    className={`text-left p-2 rounded-lg transition-all flex flex-col gap-0.5 ${
                      darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xs font-semibold text-primary">Our Process</span>
                    <span className={`text-[9px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>6-step framework for scale.</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setPath('contact')}
              className={`text-sm font-medium transition-colors ${
                currentPath === 'contact'
                  ? 'text-primary font-semibold'
                  : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
              }`}
            >
              Contact
            </button>

            <button
              onClick={() => setPath('admin')}
              className={`text-sm font-medium transition-colors ${
                currentPath === 'admin'
                  ? 'text-[#00C2FF] font-semibold'
                  : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
              }`}
            >
              Admin Panel
            </button>
          </nav>

          {/* Search, Theme controls & CTAs */}
          <div className="flex items-center gap-3">
            {/* Search trigger button */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-lg border transition-colors hidden sm:flex items-center gap-2 text-xs font-mono ${
                darkMode
                  ? 'border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20'
                  : 'border-gray-200 bg-gray-50 text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Search app...</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded leading-none ${
                darkMode ? 'bg-white/[0.06] text-gray-400' : 'bg-gray-200 text-gray-500'
              }`}>
                ⌘K
              </span>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-lg border sm:hidden ${
                darkMode ? 'border-white/[0.08] text-gray-300' : 'border-gray-200 text-gray-600'
              }`}
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Dark Mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border transition-colors ${
                darkMode
                  ? 'border-white/[0.08] bg-white/[0.02] text-yellow-400 hover:text-yellow-300'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:text-primary hover:border-primary/20'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border lg:hidden transition-colors ${
                darkMode
                  ? 'border-white/[0.08] bg-white/[0.02] text-gray-300 hover:text-white'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:text-gray-900'
              }`}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => setPath('book-demo')}
              className="hidden md:inline-flex items-center justify-center text-xs font-semibold px-4.5 py-2.5 rounded-lg bg-primary hover:bg-opacity-90 hover:shadow-lg transition-all text-white glow-primary hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Strategy Call
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden px-4 pt-2 pb-6 border-t animate-slide-down ${
          darkMode ? 'bg-[#110B33] border-white/[0.08] text-white' : 'bg-white border-gray-100 text-[#110B33]'
        }`}>
          <div className="space-y-4 font-sans text-sm mt-2">
            <div>
              <p className="text-[10px] font-bold text-[#47C7BF] uppercase mb-1.5 tracking-wider">Solutions</p>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {solutions.map(s => (
                  <button key={s.path} onClick={() => setPath(s.path)} className="text-left py-1 text-xs text-gray-400 hover:text-primary transition-colors">
                    ↳ {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-[#47C7BF] uppercase mb-1.5 tracking-wider">Products</p>
              <div className="grid grid-cols-2 gap-1 pl-2">
                {products.map(p => (
                  <button key={p.path} onClick={() => setPath(p.path)} className="text-left py-1 text-xs text-gray-400 hover:text-primary transition-colors">
                    ↳ {p.name.split('™')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-[#47C7BF] uppercase mb-1.5 tracking-wider">Industries</p>
              <div className="grid grid-cols-2 gap-1 pl-2 font-medium">
                {industries.map(ind => (
                  <button key={ind.path} onClick={() => setPath(ind.path)} className="text-left py-1 text-xs text-gray-400 hover:text-primary transition-colors">
                    ↳ {ind.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-[#47C7BF] uppercase mb-1.5 tracking-wider">Tools & Resources</p>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {tools.map(t => (
                  <button key={t.path} onClick={() => setPath(t.path)} className="text-left py-1 text-xs text-gray-400 hover:text-primary transition-colors">
                    ↳ {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-[#47C7BF] uppercase mb-1.5 tracking-wider">Company</p>
              <div className="grid grid-cols-2 gap-1 pl-2">
                <button onClick={() => setPath('about')} className="text-left py-1 text-xs text-gray-400 hover:text-primary transition-colors">
                  ↳ About Us
                </button>
                <button onClick={() => setPath('why-natton-digital')} className="text-left py-1 text-xs text-gray-400 hover:text-primary transition-colors">
                  ↳ Why Choose Us
                </button>
                <button onClick={() => setPath('our-process')} className="text-left py-1 text-xs text-gray-400 hover:text-primary transition-colors">
                  ↳ Our Process
                </button>
              </div>
            </div>

            <div className="border-t border-white/[0.05] pt-4">
              <button
                onClick={() => setPath('book-demo')}
                className="w-full py-2.5 text-center rounded-lg bg-primary text-white text-xs font-semibold hover:bg-opacity-90 transition-colors"
              >
                Book Strategy Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal Backdrop & Panel (Global Search Command Center) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-xl rounded-xl border shadow-2xl overflow-hidden animate-scale-up ${
            darkMode ? 'bg-[#110B33] border-white/10 text-white' : 'bg-white border-gray-200 text-[#110B33]'
          }`}>
            {/* Input bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.05]">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search solutions, products, industries, tools..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500 font-sans"
                autoFocus
              />
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                darkMode ? 'bg-white/[0.06] text-gray-400' : 'bg-gray-200 text-gray-500'
              }`}>
                ESC to close
              </span>
              <button onClick={() => setSearchOpen(false)}>
                <X className="h-4 w-4 text-gray-400 hover:text-gray-100 transition-colors" />
              </button>
            </div>

            {/* Results listing */}
            <div className="p-3 max-h-[300px] overflow-y-auto">
              <p className="text-[10px] font-mono tracking-wider text-[#47C7BF] uppercase px-3 py-1.5 mb-1 select-none">
                {searchQuery === '' ? '⚡ QUICK NAVIGATION' : '🔍 SEARCH RESULTS'}
              </p>

              <div className="space-y-1">
                {filteredSearchResults.map((page) => (
                  <button
                    key={page.path}
                    onClick={() => {
                      setPath(page.path);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all ${
                      darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-semibold font-sans">{page.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 bg-white/[0.03] px-2 py-0.5 rounded uppercase">
                      {page.category}
                    </span>
                  </button>
                ))}

                {filteredSearchResults.length === 0 && (
                  <div className="text-center py-6 text-xs text-gray-400 font-sans">
                    No pages matched "{searchQuery}". Try searching for <strong>"Healthcare"</strong> or <strong>"SEO"</strong>.
                  </div>
                )}
              </div>
            </div>

            {/* command footer */}
            <div className="px-4 py-2 border-t border-white/[0.05] bg-white/[0.01] flex items-center justify-between text-[10px] font-mono text-gray-500 select-none">
              <span>Enter key to navigate</span>
              <span className="flex items-center gap-1">
                <Command className="h-3 w-3" /> + K triggers terminal
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
