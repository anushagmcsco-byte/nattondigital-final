import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  Search, 
  MessageSquare, 
  Phone, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Building, 
  Mail, 
  BookOpen, 
  Download, 
  Video, 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle, 
  HelpCircle, 
  Send, 
  Zap, 
  BarChart, 
  ArrowUpRight, 
  Sliders, 
  X, 
  FileText, 
  Database, 
  Headphones, 
  Volume2, 
  Briefcase, 
  Clock, 
  Compass, 
  BookMarked,
  Info
} from 'lucide-react';
import { RoutePath, BlogPost } from '../types';
import { getBlogPosts, addCommentToPost } from '../utils/blogService';

interface BlogProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
  selectedBlogPostId?: string | null;
  setSelectedBlogPostId?: (id: string | null) => void;
}

export default function Blog({ setPath, darkMode, selectedBlogPostId, setSelectedBlogPostId }: BlogProps) {
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [activePostId, setActivePostId] = useState<string | null>(null);

  // Interaction States
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [askAiQuery, setAskAiQuery] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: "Hello! I am Natton's Insights Agent. Ask me anything about this article, its CRM parameters, or how to deploy n8n webhooks for this model." }
  ]);
  const [isAiResponding, setIsAiResponding] = useState(false);

  // Newsletter Flow
  const [newsletterForm, setNewsletterForm] = useState({ name: '', email: '', industry: 'Healthcare' });
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  // Video tutorial modal simulation
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState('');

  // Download simulation state
  const [activeDownloadTitle, setActiveDownloadTitle] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // FAQ Expand State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Infinite Scroll / Load more posts mock
  const [visiblePostsCount, setVisiblePostsCount] = useState(6);

  // Core Categories List
  const categoriesList = [
    "All",
    "AI Marketing",
    "Automation",
    "CRM",
    "AI Agents",
    "SEO",
    "AEO",
    "WhatsApp",
    "AI Calling",
    "Case Studies",
    "Industry Guides",
    "Product Updates",
    "Tutorials"
  ];

  // Blog posts state loaded dynamically from central repository
  const [blogPostsList, setBlogPostsList] = useState<BlogPost[]>([]);
  const [commentForm, setCommentForm] = useState({
    authorName: '',
    authorEmail: '',
    commentText: ''
  });
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    setBlogPostsList(getBlogPosts());
  }, []);

  const refreshPosts = () => {
    setBlogPostsList(getBlogPosts());
  };

  // Redirect and scroll handling for selected post (e.g. from Admin panel creation)
  useEffect(() => {
    if (selectedBlogPostId) {
      const posts = getBlogPosts();
      const exists = posts.some(p => p.id === selectedBlogPostId);
      if (exists) {
        setBlogPostsList(posts);
        setActivePostId(selectedBlogPostId);
        
        // Scroll to the main articles section containing the reader
        setTimeout(() => {
          const element = document.getElementById('articles-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);

        // Clear the state so it doesn't fire repeatedly
        if (setSelectedBlogPostId) {
          setSelectedBlogPostId(null);
        }
      }
    }
  }, [selectedBlogPostId, setSelectedBlogPostId]);

  // Simulated audio reading progression
  useEffect(() => {
    let interval: any;
    if (isAudioPlaying) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsAudioPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isAudioPlaying]);

  // AI chat question simulation
  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askAiQuery.trim()) return;

    const userMsg = askAiQuery;
    setAiChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setAskAiQuery('');
    setIsAiResponding(true);

    setTimeout(() => {
      let response = "That is an excellent query. In the context of this blueprint, we use specialized security parameters and low-latency API triggers to protect local system transfers. We highly suggest scheduling a 1-on-1 strategy call to review the exact JSON structures.";
      
      if (userMsg.toLowerCase().includes('n8n')) {
        response = "For n8n integrations, we utilize webhook-reply nodes configured with a JSON response payload. This reduces latency and guarantees your CRM matches contacts instantly.";
      } else if (userMsg.toLowerCase().includes('aeo') || userMsg.toLowerCase().includes('seo')) {
        response = "Our AEO checklist targets structured schema, FAQ lists, and rich HTML tags. This makes it incredibly easy for Google Gemini or ChatGPT crawlers to parse and recommend your business solutions.";
      } else if (userMsg.toLowerCase().includes('whatsapp')) {
        response = "With WhatsApp Cloud API, we use Meta templates containing custom tracking variables. This allows us to track button clicks and pass conversions back to GoHighLevel.";
      }

      setAiChatHistory(prev => [...prev, { role: 'assistant', text: response }]);
      setIsAiResponding(false);
    }, 1500);
  };

  // Newsletter submission simulation
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);
    // Simulate n8n webhook and GoHighLevel lead capture
    setTimeout(() => {
      setNewsletterLoading(false);
      setNewsletterSuccess(true);
      setNewsletterForm({ name: '', email: '', industry: 'Healthcare' });
    }, 1800);
  };

  // Download trigger simulation
  const triggerDownload = (title: string) => {
    setActiveDownloadTitle(title);
    setDownloadSuccess(false);
    setTimeout(() => {
      setDownloadSuccess(true);
    }, 2000);
  };

  // Video modal trigger
  const playVideo = (title: string, mockUrl: string) => {
    setActiveVideoTitle(title);
    setActiveVideoUrl(mockUrl);
  };

  // Filter posts based on category and search query
  const filteredPosts = blogPostsList.filter(post => {
    const matchesCategory = selectedCategory === 'All' || 
                            post.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                            post.tags.some(t => t.toLowerCase() === selectedCategory.toLowerCase());
    
    const matchesIndustry = selectedIndustry === 'All' || 
                             post.tags.some(t => t.toLowerCase() === selectedIndustry.toLowerCase()) ||
                             post.excerpt.toLowerCase().includes(selectedIndustry.toLowerCase());

    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesIndustry && matchesSearch;
  });

  const activePost = blogPostsList.find(p => p.id === activePostId);

  // Industry Specific Guides list
  const industryGuides = [
    { name: "Healthcare", tag: "Clinical Intake", desc: "Automating HIPAA-compliant scheduling and triage records via secure Twilio voice routes." },
    { name: "Education", tag: "Student Nurturing", desc: "AI counselors that qualify enrollment inquiries in regional languages 24/7." },
    { name: "Real Estate", tag: "Tour Automator", desc: "Instant pre-qualification voice bots routing hot leads to direct site visits." },
    { name: "Manufacturing", tag: "Logistics Sync", desc: "Connecting logistics stock triggers to dynamic dispatch pipelines using n8n nodes." },
    { name: "Retail & Ecommerce", tag: "WhatsApp checkout", desc: "Automated catalogs, checkout templates and Meta Pay routing in local threads." },
    { name: "Professional Services", tag: "Bento Portals", desc: "Clean dashboards tracking client delivery metrics, feedback loops, and auto-billing." }
  ];

  // Downloads / Resources list
  const resourcesList = [
    { title: "n8n Webhook Blueprint", type: "Playbook", format: "JSON", desc: "The exact webhook template to receive Meta Lead Forms and route securely to GHL." },
    { title: "AEO Optimization Checklist", type: "Checklist", format: "PDF", desc: "A 45-point checklist to structure schemas and HTML headers for LLM search ranking." },
    { title: "WhatsApp Meta Catalog Setup", type: "Blueprints", format: "PDF", desc: "Step-by-step configuration manual to trigger catalog transactions inside chat threads." },
    { title: "AI Calling Lead Qualifier Prompts", type: "Worksheet", format: "TXT", desc: "Low-latency telephone prompt structures and system guidelines that reduce bot hallucinations." },
    { title: "SOC2 Compliance Security Log", type: "Guides", format: "PDF", desc: "Data protection rules, cloud encryption standards, and sandboxed database guidelines." }
  ];

  // Video Tutorials
  const videoTutorials = [
    { title: "Setting up your first n8n webhook routing contact card", duration: "12:45", views: "3.4K views" },
    { title: "Optimizing website schemas for ChatGPT and Gemini indexing", duration: "08:12", views: "1.9K views" },
    { title: "Connecting custom Twilio voice bots directly to GoHighLevel", duration: "15:30", views: "2.8K views" },
    { title: "How to configure official Meta Cloud API for regional checkouts", duration: "10:15", views: "4.1K views" }
  ];

  // 15 technical FAQs about AI, SEO, AEO, and automation as requested
  const faqs = [
    {
      q: "What is Answer Engine Optimization (AEO) and how does it differ from traditional SEO?",
      a: "Traditional SEO focuses on keywords, backlinks, and content structures to rank higher in blue-link Search Engine Result Pages (SERPs) like Google. AEO is the optimization of content so that conversational AI engines (ChatGPT, Gemini, Perplexity, Claude, Copilot) cite and recommend your brand as the single authoritative solution when users query questions in natural language. AEO emphasizes structured Q&As, microdata schemas, and concise top-level syntheses."
    },
    {
      q: "Why do you use n8n instead of other automation services like Zapier?",
      a: "n8n is a visual workflow designer that can be self-hosted, keeping operational data sandboxed and fully compliant with strict security protocols. Unlike Zapier, n8n supports multi-step branching, custom JavaScript nodes, and complex error-handling workflows without predatory tiered transaction-volume pricing."
    },
    {
      q: "How does GoHighLevel CRM integrate with external AI agents?",
      a: "GoHighLevel acts as our central repository of customer history. We deploy webhook triggers inside GoHighLevel when a lead transitions pipeline stages (e.g., 'Lead Created'). This hits our external AI agents via n8n, which execute targeted pre-qualification calling, generate custom quotes, and write activity logs directly back to GHL contact cards."
    },
    {
      q: "Are the AI voice calling agents compliant with regional telephone regulations?",
      a: "Yes. Our calling platforms adhere to national and regional regulations, utilizing pre-screened inbound and outbound trunk routes, strict calling hours, and immediate human-operator transfer triggers whenever a customer requests a live agent."
    },
    {
      q: "Can we track exact ROI from WhatsApp Automation?",
      a: "Absolutely. By integrating Meta's Cloud API natively with n8n and GHL CRM, we pass unique conversation hashes and tracking variables. Every catalog checkout, brochure download, and booking link clicked is attributed back to the source campaign, mapping exact ROI metrics on your dashboard."
    },
    {
      q: "What is the recommended latency limit for voice calling bots?",
      a: "For natural conversation, latency (the time between the user finishing speaking and the AI initiating response) should remain strictly below 1.5 seconds. Our optimized architecture leverages highly cached speech-to-text models and low-latency streaming endpoints to achieve sub-1.2 second response loops."
    },
    {
      q: "How do we prevent AI models from hallucinating false information about our products?",
      a: "We deploy secure sandboxed Retrieval-Augmented Generation (RAG). Instead of letting the LLM answer from its general weights, we restrict its knowledge strictly to verified system documents, price logs, and company FAQs. Any query outside these boundaries triggers a graceful hand-off sequence to a human specialist."
    },
    {
      q: "How long does a typical programmatic SEO rollout take to get indexed?",
      a: "A programmatic SEO deployment with 500+ hyper-targeted city pages goes live in 10-14 business days. Depending on Google's search crawling queues, indexing and initial organic search visibility typically appear within 3 to 6 weeks, accelerated by submitting dynamic sitemaps directly to Google Search Console."
    },
    {
      q: "What fields are required to capture leads via GoHighLevel webhooks?",
      a: "At a baseline, we require: First/Last Name, Company Name, Business Email, and Phone Number (capable of receiving SMS or WhatsApp templates). Additional fields like industry, budget, and pain points help our system pre-qualify the lead and assign it to the correct sales representative automatically."
    },
    {
      q: "How do your workflows maintain HIPAA compliance for healthcare clinics?",
      a: "All patient communication triggers operate over TLS 1.3 channels. Raw clinical records, prescriptions, or patient symptom histories are never saved inside public chats. We use WhatsApp strictly as an automated route to securely notify patients, pushing them to log into SOC2-encrypted, private portals."
    },
    {
      q: "Can we use custom domain names for our programmatic landing pages?",
      a: "Yes. All programmatic SEO architectures we build are hosted on highly optimized edge-servers bound directly to your corporate subdomains (e.g., info.yourbrand.com), maintaining total domain authority."
    },
    {
      q: "What are n8n 'Self-Healing' workflows?",
      a: "Self-healing workflows are advanced automation paths that incorporate fallback nodes. If an external API (like WhatsApp, Twilio, or Stripe) experiences an outage or returns a 500 error, n8n automatically retries the operation, caches the pending payload, and pings your Slack/CRM with alert reports instead of failing silently."
    },
    {
      q: "How does Resend improve transactional email deliverability?",
      a: "Resend is built specifically for modern developer pipelines, leveraging clean, high-reputation IP pools and deep integration with AWS SES. By validating SPF, DKIM, and DMARC parameters, Resend guarantees transaction confirmations go straight to the user inbox instead of the promotions tab."
    },
    {
      q: "Can we integrate existing databases like PostgreSQL into these workflows?",
      a: "Yes. Our n8n nodes support native connection pools for PostgreSQL, MySQL, and MongoDB. This allows your sales and operations pipelines to read stock limits, update product catalogs, and synchronize user logins in real-time."
    },
    {
      q: "What support is provided after the AI systems are deployed?",
      a: "We provide dedicated SLA-backed support packages, acts as fractional Chief AI Officers. We run weekly prompt health checks, patch external API updates, optimize search schema formats to match new LLM search engines, and deliver performance audits."
    }
  ];

  return (
    <div className="bg-[#0B0721] text-white min-h-screen font-sans antialiased text-left relative selection:bg-primary/30 selection:text-white">
      
      {/* Cinematic Glowing Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,255,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/[0.015] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-0 w-[600px] h-[600px] bg-cyan-500/[0.015] rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-16 border-b border-white/[0.08] overflow-hidden">
        {/* Animated Knowledge Graph background representation */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="mb-6 text-xs font-mono text-gray-400 tracking-wider">
            <button onClick={() => setPath('home')} className="hover:text-[#00C2FF] transition-colors">HOME</button>
            <span className="mx-2">/</span>
            <span className="text-[#00C2FF] font-bold">BLOG & AI INSIGHTS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20">
                <Sparkles className="h-3 w-3 animate-pulse" /> SEO, AEO & AI SEARCH AUTHORITY
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none text-white">
                Insights For <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">AI-Driven Growth</span>.
              </h1>
              
              <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
                Explore deep-dive technical tutorials, marketing blueprints, and compliance handbooks designed to build digital authority, unlock n8n workflows, and maximize GHL conversions.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#articles-section"
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-95 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  Explore Articles <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#newsletter-signup"
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all flex items-center gap-2"
                >
                  Subscribe Newsletter <Mail className="h-4 w-4 text-purple-400" />
                </a>
              </div>
            </div>

            {/* Hero Right: Interactive Floating Knowledge Network representation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[400px] aspect-square rounded-3xl border border-white/[0.08] bg-white/[0.01] p-6 relative flex flex-col justify-between overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-cyan-950/20 pointer-events-none" />
                
                <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-3">
                  <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase">🌌 KNOWLEDGE NETWORK</span>
                  <span className="text-[8px] font-mono bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20 px-1.5 py-0.5 rounded font-bold">LIVE SYNC</span>
                </div>

                {/* Simulated Floating connected articles representation */}
                <div className="relative h-56 flex items-center justify-center">
                  <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#00C2FF]/15 animate-spin" style={{ animationDuration: '40s' }} />
                  <div className="absolute w-32 h-32 rounded-full border border-dashed border-purple-500/15 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />

                  {/* Connected Clusters */}
                  <div className="absolute top-2 left-6 p-2 bg-gradient-to-r from-blue-500/10 to-[#00C2FF]/10 rounded-lg border border-[#00C2FF]/20 text-[9px] font-mono">
                    <span className="font-bold text-white block">AI Marketing</span>
                    <span className="text-[7px] text-gray-400">Node #104</span>
                  </div>

                  <div className="absolute top-12 right-2 p-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-500/20 text-[9px] font-mono">
                    <span className="font-bold text-white block">AEO Schema</span>
                    <span className="text-[7px] text-gray-400">Node #302</span>
                  </div>

                  <div className="absolute bottom-6 left-2 p-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-lg border border-cyan-500/20 text-[9px] font-mono">
                    <span className="font-bold text-white block">n8n Automation</span>
                    <span className="text-[7px] text-gray-400">Node #811</span>
                  </div>

                  <div className="absolute bottom-2 right-6 p-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-lg border border-pink-500/20 text-[9px] font-mono">
                    <span className="font-bold text-white block">WhatsApp CRM</span>
                    <span className="text-[7px] text-gray-400">Node #409</span>
                  </div>

                  {/* Center Knowledge Core */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 blur-sm animate-pulse flex items-center justify-center border border-white/20">
                    <Cpu className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="relative z-10 border-t border-white/5 pt-3 flex items-center justify-between text-[8px] font-mono text-gray-500">
                  <span>SEMANTIC GRAPH CLUSTERS</span>
                  <span>AEO METADATA INDEXED</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-10 text-left">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">HANDPICKED TOPICS</span>
            <h2 className="text-3xl font-black font-display text-white">Featured Articles</h2>
            <p className="text-xs text-gray-400 max-w-xl">Deep-dive structural analyses on our core transformation methodologies and automation workflows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPostsList.slice(0, 6).map((post, i) => (
              <div 
                key={post.id}
                onClick={() => {
                  setActivePostId(post.id);
                  setTimeout(() => {
                    const element = document.getElementById('articles-section');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.01] overflow-hidden hover:border-[#00C2FF]/30 transition-all cursor-pointer flex flex-col justify-between"
              >
                {post.featuredImage && (
                  <div className="w-full h-48 overflow-hidden border-b border-white/5 relative bg-[#110B33]/40">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20 px-2 py-0.5 rounded uppercase font-black">
                      {post.category}
                    </span>
                    <span className="text-[9px] font-mono text-gray-500">{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold font-display text-white group-hover:text-[#00C2FF] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="p-6 border-t border-white/5 bg-white/[0.005] flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>{post.date}</span>
                  <span className="text-[#00C2FF] font-black group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    Read Spec →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Category Grid */}
      <section className="py-20 border-b border-white/[0.08] bg-white/[0.005]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-10 text-left">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">KNOWLEDGE BLUEPRINTS</span>
            <h2 className="text-3xl font-black font-display text-white">Explore Categories</h2>
            <p className="text-xs text-gray-400 max-w-xl">Bento matrix layout sorting our complete programmatic logs and technical structures.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categoriesList.map((cat, index) => {
              const isSelected = selectedCategory === cat;
              return (
                <div
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    const el = document.getElementById('articles-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-5 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected 
                      ? 'bg-blue-500/15 border-[#00C2FF] text-[#00C2FF] scale-102 font-black shadow-lg shadow-blue-500/5' 
                      : 'bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                  }`}
                >
                  <span className="text-[11px] font-mono tracking-wider block uppercase font-bold">{cat}</span>
                  <div className="absolute bottom-1 right-2 text-[8px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    INDEX_0{index}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Articles Hub & Interactive Search Panel */}
      <section id="articles-section" className="py-24 border-b border-white/[0.08] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Articles Library (Column Span 8) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Search Bar & Stats */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search articles, tags, parameters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10.5 pr-4 py-3 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                  <span>Filtered: <strong className="text-white">{filteredPosts.length}</strong> guides</span>
                  <span>•</span>
                  <span>Category: <strong className="text-[#00C2FF]">{selectedCategory}</strong></span>
                </div>
              </div>

              {/* Reader mode / List Switch */}
              <AnimatePresence mode="wait">
                {activePostId && activePost ? (
                  
                  // Immersive Article Reader Mode with AI summary sidebar
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-8 bg-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
                    
                    <button
                      onClick={() => setActivePostId(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00C2FF] hover:underline"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Back to Guides Library
                    </button>

                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-mono text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20 px-2.5 py-1 rounded uppercase font-black">
                          {activePost.category}
                        </span>
                        <span className="text-xs font-mono text-gray-500">• {activePost.date}</span>
                        <span className="text-xs font-mono text-gray-500">• {activePost.readTime}</span>
                      </div>

                      <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                        {activePost.title}
                      </h1>

                      <p className="text-xs font-mono text-gray-400">
                        Author: <strong className="text-white">{activePost.author}</strong>
                      </p>
                    </div>

                    {activePost.featuredImage && (
                      <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-white/10 relative bg-[#110B33]/50">
                        <img 
                          src={activePost.featuredImage} 
                          alt={activePost.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {/* AI Article Summary Box: TL;DR, Key Takeaways, Audio version */}
                    <div id="ai_summary" className="p-6 rounded-2xl bg-[#0B0721]/60 border border-white/10 space-y-4">
                      <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="text-[9px] font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-1.5 font-bold">
                          <Sparkles className="h-4 w-4 text-[#00C2FF] animate-pulse" /> AI SUMMARY MODULE
                        </span>
                        <span className="text-[8px] font-mono text-gray-500">LLM MODEL SECURE</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <div className="md:col-span-8 space-y-3">
                          <p className="text-xs font-mono text-gray-300 leading-relaxed">
                            <strong className="text-white">TL;DR:</strong> The manual lead-response bottleneck leaks massive CRM conversions. Deploying sandboxed n8n webhooks directly synchronizing GoHighLevel contact schemas triggers auto-communication under 45 seconds, reclaiming weekly admin resources.
                          </p>
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Key Takeaways:</span>
                            <ul className="text-[11px] text-gray-400 space-y-1 list-disc pl-4">
                              <li>Automated dialers reduce response speeds by 90%+.</li>
                              <li>n8n preserves private compliance parameters over standard SaaS alternatives.</li>
                              <li>Consolidated channels prevent lead leaks across disconnected devices.</li>
                            </ul>
                          </div>
                        </div>

                        {/* Simulated Audio Version */}
                        <div className="md:col-span-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 flex flex-col items-center text-center">
                          <Headphones className="h-6 w-6 text-purple-400" />
                          <span className="text-[9px] font-mono text-gray-400 font-bold uppercase">AUDIO SYNTH READING</span>
                          
                          <button
                            onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                            className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-[10px] font-mono font-bold hover:opacity-95 flex items-center justify-center gap-1.5"
                          >
                            {isAudioPlaying ? (
                              <>
                                <Volume2 className="h-3.5 w-3.5 animate-bounce" /> PAUSE SYNTH
                              </>
                            ) : (
                              <>
                                <Play className="h-3.5 w-3.5" /> START PLAYBACK
                              </>
                            )}
                          </button>

                          {/* Progress bar */}
                          {isAudioPlaying && (
                            <div className="w-full space-y-1">
                              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                <div className="bg-[#00C2FF] h-full" style={{ width: `${audioProgress}%` }} />
                              </div>
                              <span className="text-[8px] font-mono text-gray-500">Synthesizing Voice... {audioProgress}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Core Article Body Content */}
                    <div className="text-xs leading-relaxed text-gray-300 space-y-6 pt-4 border-t border-white/5">
                      {activePost.content.split('\n\n').map((para, i) => (
                        <p key={i} className="font-sans leading-relaxed text-justify">
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                      {activePost.tags.map(t => (
                        <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#00C2FF]/15 text-[#00C2FF] border border-[#00C2FF]/20">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* WordPress-Style Comments Box */}
                    <div className="pt-8 border-t border-white/5 space-y-6">
                      <h3 className="text-sm font-bold font-display text-white flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-[#00C2FF]" />
                        Discussion ({activePost.comments?.length || 0})
                      </h3>

                      {/* Comments List */}
                      <div className="space-y-4 text-left">
                        {!activePost.comments || activePost.comments.length === 0 ? (
                          <div className="p-6 text-center border border-dashed border-white/5 rounded-xl bg-white/[0.002]">
                            <p className="text-xs text-gray-400 font-mono">No comments yet. Start the conversation below!</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {activePost.comments.map((comment) => (
                              <div key={comment.id} className="p-4 rounded-xl border border-white/5 bg-[#110B33]/20 space-y-2 text-left">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00C2FF] to-purple-500 flex items-center justify-center text-[10px] font-mono font-bold text-white uppercase shrink-0">
                                      {comment.authorName.slice(0, 2)}
                                    </div>
                                    <div>
                                      <h5 className="text-xs font-bold text-white">{comment.authorName}</h5>
                                      <p className="text-[9px] font-mono text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed pl-9.5">
                                  {comment.commentText}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Add Comment Form */}
                      <div className="p-5 rounded-xl border border-white/5 bg-[#110B33]/10 space-y-4 text-left">
                        <h4 className="text-[10px] font-bold font-mono text-gray-400 uppercase tracking-wider">Leave a Comment</h4>
                        
                        {commentSuccess ? (
                          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                            ✓ Your comment has been posted successfully!
                          </div>
                        ) : (
                          <form 
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (!commentForm.authorName || !commentForm.authorEmail || !commentForm.commentText) {
                                return;
                              }
                              addCommentToPost(activePost.id, {
                                authorName: commentForm.authorName,
                                authorEmail: commentForm.authorEmail,
                                commentText: commentForm.commentText
                              });
                              // update state immediately
                              refreshPosts();
                              setCommentForm({ authorName: '', authorEmail: '', commentText: '' });
                              setCommentSuccess(true);
                              setTimeout(() => setCommentSuccess(false), 4000);
                            }}
                            className="space-y-3"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input 
                                type="text"
                                placeholder="Your Name"
                                value={commentForm.authorName}
                                onChange={(e) => setCommentForm(prev => ({ ...prev, authorName: e.target.value }))}
                                className="px-3.5 py-2 bg-[#0B0721]/80 border border-white/10 rounded-lg text-xs text-white focus:border-[#00C2FF] focus:outline-none w-full"
                                required
                              />
                              <input 
                                type="email"
                                placeholder="Your Email"
                                value={commentForm.authorEmail}
                                onChange={(e) => setCommentForm(prev => ({ ...prev, authorEmail: e.target.value }))}
                                className="px-3.5 py-2 bg-[#0B0721]/80 border border-white/10 rounded-lg text-xs text-white focus:border-[#00C2FF] focus:outline-none w-full"
                                required
                              />
                            </div>
                            <textarea 
                              placeholder="Share your thoughts or technical questions..."
                              rows={3}
                              value={commentForm.commentText}
                              onChange={(e) => setCommentForm(prev => ({ ...prev, commentText: e.target.value }))}
                              className="w-full px-3.5 py-2 bg-[#0B0721]/80 border border-white/10 rounded-lg text-xs text-white focus:border-[#00C2FF] focus:outline-none resize-none"
                              required
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 bg-[#00C2FF] hover:bg-[#00C2FF]/85 text-black font-mono font-black text-xs rounded-lg transition-colors"
                            >
                              POST COMMENT
                            </button>
                          </form>
                        )}
                      </div>
                    </div>

                    {/* Call Strategy CTA widget */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/20 to-purple-950/20 border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white">Ready to deploy this exact architecture?</h4>
                        <p className="text-[10px] text-gray-400 max-w-md">Our technicians establish n8n modules and GoHighLevel environments for your exact business goals.</p>
                      </div>
                      <button
                        onClick={() => setPath('book-demo')}
                        className="px-5 py-2.5 bg-primary hover:bg-opacity-95 text-white text-xs font-bold rounded-lg shrink-0"
                      >
                        Book Integration Review
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  
                  // Magazine / Editorial Post List Layout
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {filteredPosts.length === 0 ? (
                      <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl space-y-3">
                        <Info className="h-8 w-8 text-gray-500 mx-auto" />
                        <h4 className="text-sm font-bold text-white">No guides match your parameters</h4>
                        <p className="text-xs text-gray-400">Try modifying your search queries or resetting category bento filters.</p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('All');
                            setSelectedIndustry('All');
                          }}
                          className="px-4 py-2 bg-white/5 text-xs font-mono rounded border border-white/10 hover:bg-white/10"
                        >
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {filteredPosts.slice(0, visiblePostsCount).map((post, i) => (
                          <div
                            key={post.id}
                            onClick={() => {
                              setActivePostId(post.id);
                              setTimeout(() => {
                                const element = document.getElementById('articles-section');
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                }
                              }, 100);
                            }}
                            className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.01] hover:border-[#00C2FF]/30 transition-all cursor-pointer relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                          >
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center flex-1">
                              {post.featuredImage && (
                                <div className="w-full md:w-32 h-32 md:h-24 rounded-xl overflow-hidden shrink-0 border border-white/5 bg-[#110B33]/40">
                                  <img 
                                    src={post.featuredImage} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              )}
                              <div className="space-y-3 max-w-xl">
                                <div className="flex items-center gap-2 text-[9px] font-mono text-[#00C2FF]">
                                  <span className="bg-[#00C2FF]/10 border border-[#00C2FF]/20 px-2 py-0.5 rounded uppercase font-bold">
                                    {post.category}
                                  </span>
                                  <span>•</span>
                                  <span>{post.date}</span>
                                  <span>•</span>
                                  <span>{post.readTime}</span>
                                </div>

                                <h3 className="text-lg font-bold font-display text-white group-hover:text-[#00C2FF] transition-colors leading-snug">
                                  {post.title}
                                </h3>

                                <p className="text-xs text-gray-400 leading-relaxed">
                                  {post.excerpt}
                                </p>
                                
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {post.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[8px] font-mono text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono text-[#00C2FF] font-black group-hover:translate-x-1 transition-transform border border-[#00C2FF]/10 px-3 py-1.5 rounded-lg bg-[#00C2FF]/5">
                              READ BLUEPRINT <ChevronRight className="h-3.5 w-3.5" />
                            </div>
                          </div>
                        ))}

                        {/* Infinite Scroll Load More Simulated Button */}
                        {filteredPosts.length > visiblePostsCount && (
                          <div className="text-center pt-4">
                            <button
                              onClick={() => setVisiblePostsCount(prev => prev + 3)}
                              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold font-mono rounded-xl transition-all"
                            >
                              LOAD MORE ARTICLES (MAGAZINE STYLE)
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Right: Sidebar / Ask AI Agent (Column Span 4) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Interactive Ask AI Chat Widget */}
              <div className="p-6 rounded-2xl bg-[#0B0721]/60 border border-white/10 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[9px] font-mono text-[#00C2FF] tracking-widest uppercase flex items-center gap-1.5 font-bold">
                    <Sparkles className="h-4 w-4 animate-spin text-[#00C2FF]" style={{ animationDuration: '6s' }} /> ASK AI ABOUT ARTICLES
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="h-60 overflow-y-auto space-y-3.5 pr-1 text-xs">
                  {aiChatHistory.map((chat, idx) => (
                    <div key={idx} className={`p-3 rounded-xl ${chat.role === 'user' ? 'bg-[#00C2FF]/10 text-white ml-6 text-right' : 'bg-white/5 text-gray-300 mr-6 text-left'}`}>
                      <span className="text-[8px] font-mono text-gray-500 block mb-1 uppercase font-bold">{chat.role === 'user' ? 'PROSPECT' : 'INSIGHTS AGENT'}</span>
                      <p className="leading-relaxed">{chat.text}</p>
                    </div>
                  ))}
                  {isAiResponding && (
                    <div className="bg-white/5 text-gray-300 mr-6 text-left p-3 rounded-xl space-y-1.5">
                      <span className="text-[8px] font-mono text-gray-500 block uppercase font-bold">AGENTS GENERATING</span>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAskAi} className="relative">
                  <input
                    type="text"
                    placeholder="Ask about n8n models or AEO..."
                    value={askAiQuery}
                    onChange={(e) => setAskAiQuery(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                  />
                  <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#00C2FF] hover:text-white transition-colors">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>

              {/* Popular Tag Cloud Filter */}
              <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
                <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase block font-bold">POPULAR TOPICS</span>
                <div className="flex flex-wrap gap-2">
                  {['n8n', 'GoHighLevel', 'AEO', 'SEO', 'WhatsApp', 'HIPAA', 'Voice Bots', 'RAG'].map(tag => {
                    const isSelected = selectedCategory === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedCategory(tag)}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded transition-all ${
                          isSelected 
                            ? 'bg-blue-500/20 text-[#00C2FF] border border-[#00C2FF]/30 font-bold' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PDF Blueprint Download Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/20 to-purple-950/20 border border-purple-500/20 space-y-4">
                <span className="text-[9px] font-mono text-purple-400 tracking-widest uppercase block font-bold">FREE TECHNICAL ASSETS</span>
                <h4 className="text-sm font-bold text-white font-display">Get Our n8n Lead Route Blueprint</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">Save hours of manual node design. Import our ready-made JSON schema directly into your private n8n dashboard.</p>
                
                <button
                  onClick={() => triggerDownload("n8n Webhook Blueprint")}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/10"
                >
                  <Download className="h-4 w-4" /> Download JSON Blueprint
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Industry Specific Guides */}
      <section className="py-24 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12 text-left">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">TAILORED LOGISTICS</span>
            <h2 className="text-3xl font-black font-display text-white">Industry Specific Guides</h2>
            <p className="text-xs text-gray-400 max-w-xl">Deep integration frameworks built directly for your market segment constraints.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryGuides.map((ind, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  setSelectedIndustry(ind.name);
                  setSelectedCategory('All');
                  const el = document.getElementById('articles-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#00C2FF]/20 hover:bg-white/[0.02] transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between h-40"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/[0.02] rounded-full blur-xl group-hover:scale-150 transition-all" />
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] font-mono text-gray-500 font-bold uppercase">SEGMENT 0{idx + 1}</span>
                    <span className="text-[9px] font-mono text-[#00C2FF] font-bold">{ind.tag}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display group-hover:text-[#00C2FF] transition-colors">{ind.name}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed mt-1.5">{ind.desc}</p>
                </div>
                <div className="text-[9px] font-mono text-[#00C2FF] font-bold mt-2 flex items-center gap-0.5">
                  Filter industry articles →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads & Templates Section */}
      <section className="py-24 border-b border-white/[0.08] bg-white/[0.005]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12 text-left">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">READY-TO-IMPORT SCHEMAS</span>
            <h2 className="text-3xl font-black font-display text-white">Downloads & Templates</h2>
            <p className="text-xs text-gray-400 max-w-xl">Speed up deployments with vetted technical blueprints, worksheets, checklists, and compliance logs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {resourcesList.map((res, index) => (
              <div 
                key={index} 
                className="p-5 rounded-2xl border border-white/10 bg-white/[0.01] flex flex-col justify-between h-52 hover:border-cyan-500/30 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded font-bold uppercase">{res.type}</span>
                    <span className="text-gray-500 font-bold">{res.format}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-display leading-snug">{res.title}</h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed">{res.desc}</p>
                </div>

                <button 
                  onClick={() => triggerDownload(res.title)}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-white rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" /> Download Asset
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorial Library Carousel */}
      <section className="py-24 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12 text-left">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">SCREEN RECORDINGS LIBRARY</span>
            <h2 className="text-3xl font-black font-display text-white">Video Tutorials</h2>
            <p className="text-xs text-gray-400 max-w-xl">Visual walk-throughs showcasing the exact webhook targets and CRM campaign nodes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTutorials.map((vid, index) => (
              <div 
                key={index}
                onClick={() => playVideo(vid.title, "https://www.youtube.com/embed/dQw4w9WgXcQ")}
                className="group rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden hover:border-[#00C2FF]/30 transition-all cursor-pointer relative"
              >
                {/* Visual Thumbnail simulation */}
                <div className="aspect-video bg-[#110B33] border-b border-white/5 flex items-center justify-center relative group-hover:bg-[#110B33]/80 transition-colors">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#80808020_1px,transparent_1px)] bg-[size:10px_10px]" />
                  <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-primary/20 flex items-center justify-center border border-white/10 group-hover:border-[#00C2FF]/30 transition-all">
                    <Play className="h-4 w-4 text-white group-hover:text-[#00C2FF] fill-current" />
                  </div>
                  <span className="absolute bottom-2 right-2 text-[8px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-gray-400">{vid.duration}</span>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-xs font-bold text-white leading-snug group-hover:text-[#00C2FF] transition-colors">{vid.title}</h4>
                  <div className="flex justify-between text-[9px] font-mono text-gray-500">
                    <span>NATTON TUTORIALS</span>
                    <span>{vid.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Experts / Author Section */}
      <section className="py-24 border-b border-white/[0.08] bg-white/[0.005]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12 text-left">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">AUTHOR INTEL</span>
            <h2 className="text-3xl font-black font-display text-white">Meet The Experts</h2>
            <p className="text-xs text-gray-400 max-w-xl">The architects and marketing growth strategists authoring our corporate insights.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] space-y-4 text-left relative overflow-hidden group">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/30 flex items-center justify-center shrink-0">
                  <Cpu className="h-5 w-5 text-[#00C2FF]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Arjun Mehta</h4>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">AI Solution Architect</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">Designs robust sandboxed RAG, n8n webhook nodes, official localized Meta Cloud routers, and telephone voice dialer parameters.</p>
              <div className="text-[9px] font-mono text-gray-500 pt-3 border-t border-white/5">
                CONTRIBUTED: 12+ BLUEPRINTS
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] space-y-4 text-left relative overflow-hidden group">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <BarChart className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Siddharth Roy</h4>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Growth Strategist</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">Formulates high-performance conversion funnels, programmatic SEO models, and Answer Engine Optimization (AEO) HTML checklists.</p>
              <div className="text-[9px] font-mono text-gray-500 pt-3 border-t border-white/5">
                CONTRIBUTED: 18+ BLUEPRINTS
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] space-y-4 text-left relative overflow-hidden group">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Layers className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Priya Sharma</h4>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">CRM Specialist</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">Specializes in GrowthOS™ custom parameters, configuring nested pipeline triggers, Twilio routers, and Meta template sets.</p>
              <div className="text-[9px] font-mono text-gray-500 pt-3 border-t border-white/5">
                CONTRIBUTED: 15+ BLUEPRINTS
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Continue Learning Hub Links */}
      <section className="py-24 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12 text-left">
            <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">ATTRIBUTION ASSETS</span>
            <h2 className="text-3xl font-black font-display text-white">Continue Learning</h2>
            <p className="text-xs text-gray-400 max-w-xl">Expand your strategic parameters with our integrated ROI tools and qualification assessments.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div 
              onClick={() => setPath('case-studies')}
              className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-blue-500/20 hover:bg-white/[0.02] transition-all cursor-pointer text-left space-y-3"
            >
              <FileText className="h-5 w-5 text-[#00C2FF]" />
              <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">Case Studies Library</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">Review real performance reports and structural setups deployed for active Indian MSME segments.</p>
            </div>

            <div 
              onClick={() => setPath('ai-readiness-assessment')}
              className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-purple-500/20 hover:bg-white/[0.02] transition-all cursor-pointer text-left space-y-3"
            >
              <Sparkles className="h-5 w-5 text-purple-400" />
              <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">AI Readiness Diagnostic</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">Audit your business technology stacks and get localized n8n workflow recommendations in 5 minutes.</p>
            </div>

            <div 
              onClick={() => setPath('roi-calculator')}
              className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-cyan-500/20 hover:bg-white/[0.02] transition-all cursor-pointer text-left space-y-3"
            >
              <BarChart className="h-5 w-5 text-cyan-400" />
              <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">ROI Growth Calculator</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">Calculate exact recovery numbers and time saved values matching your specific monthly revenues.</p>
            </div>

            <div 
              onClick={() => setPath('book-demo')}
              className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-emerald-500/20 hover:bg-white/[0.02] transition-all cursor-pointer text-left space-y-3"
            >
              <Zap className="h-5 w-5 text-emerald-400" />
              <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">Book Strategy Call</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">Secure your slot with our Solutions Architect to structure your bespoke technical blueprints.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter signup module */}
      <section id="newsletter-signup" className="py-24 border-b border-white/[0.08] bg-white/[0.005]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.01] relative overflow-hidden text-center space-y-6">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-500/[0.02] rounded-full blur-2xl pointer-events-none" />

            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase block font-bold">STAY AHEAD WITH INSIGHTS</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Join The AI Growth Newsletter</h2>
            <p className="text-xs text-gray-300 max-w-lg mx-auto leading-relaxed">
              Weekly handpicked GoHighLevel schemas, n8n webhook nodes, and conversion benchmarks delivered straight to your operations inbox.
            </p>

            {newsletterSuccess ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl max-w-md mx-auto space-y-3">
                <CheckCircle className="h-8 w-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white font-display">You are on the list!</h4>
                <p className="text-[11px] text-gray-400">Our n8n webhook captured your profile details. Expect the introductory JSON blueprint in under 3 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 items-end text-left pt-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Siddharth"
                    value={newsletterForm.name}
                    onChange={(e) => setNewsletterForm({...newsletterForm, name: e.target.value})}
                    className="w-full px-3 py-2.5 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="sid@company.com"
                    value={newsletterForm.email}
                    onChange={(e) => setNewsletterForm({...newsletterForm, email: e.target.value})}
                    className="w-full px-3 py-2.5 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <button
                    type="submit"
                    disabled={newsletterLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl text-xs font-bold hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/15"
                  >
                    {newsletterLoading ? "PROCESSING..." : "JOIN SECURE LIST"} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="text-[9px] font-mono text-gray-500 pt-2">
              AUTO ROUTED TO GOHIGHLEVEL CRM • VERIFIED VIA RESEND TRANSACTIONS
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12 text-center">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase block font-bold">KNOWLEDGE ACCREDITATION</span>
            <h2 className="text-3xl font-black font-display text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Get absolute clarity on our formatting specifications, integration benchmarks, and data regulations.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="border border-white/5 rounded-2xl bg-white/[0.01] overflow-hidden transition-colors hover:border-white/10"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/[0.005] transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white font-display">{faq.q}</span>
                    <span className="text-[#00C2FF] font-black shrink-0 ml-4 font-mono">
                      {isOpen ? '[-]' : '[+]'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-1 text-xs text-gray-400 leading-relaxed border-t border-white/5 bg-[#0B0721]/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="py-32 relative overflow-hidden border-b border-white/[0.08]">
        {/* Animated knowledge universe background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#80808020_1.5px,transparent_1.5px)] bg-[size:15px_15px] animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0721] via-transparent to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20">
            <Zap className="h-3 w-3 text-cyan-400" /> SECURE INTEGRATION Blueprints
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-none">
            Stay Ahead With AI. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">Transform Your Pipelines</span>.
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
            Ready to replace manual intake with autonomous n8n workflows and Twilio calling nodes? Connect with our expert Solutions Architect team today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => setPath('book-demo')}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-95 text-xs font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/15"
            >
              Book Strategy Call
            </button>
            <a 
              href="#newsletter-signup"
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
            >
              Subscribe Newsletter
            </a>
          </div>

          <div className="text-[10px] font-mono text-gray-500 pt-4">
            NO CREDIT CARD REQUIRED • COMPLIMENTARY TECHNICAL STRATEGY BLUEPRINT
          </div>
        </div>
      </section>

      {/* Asset download modal simulator */}
      <AnimatePresence>
        {activeDownloadTitle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#110B33] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 relative"
            >
              <button 
                onClick={() => setActiveDownloadTitle(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto text-cyan-400">
                <Download className="h-5 w-5" />
              </div>

              <h4 className="text-sm font-bold text-white font-display">Downloading Your File</h4>
              <p className="text-xs text-[#00C2FF] font-mono">{activeDownloadTitle}</p>
              
              {downloadSuccess ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="h-4 w-4" /> SUCCESSFUL EXTRACTION
                  </span>
                  <span className="text-[8px] text-gray-400 font-mono">FILE TRANSFERRED TO DOWNLOADS</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#00C2FF] h-full animate-progress" />
                  </div>
                  <span className="text-[8px] text-gray-500 font-mono uppercase block">Symmetric cryptographic handshakes...</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => setActiveDownloadTitle(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[10px] font-mono text-white rounded border border-white/10"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Modal Simulation */}
      <AnimatePresence>
        {activeVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#110B33] border border-white/10 rounded-2xl p-6 max-w-2xl w-full text-center space-y-4 relative overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-[#00C2FF] uppercase font-bold">{activeVideoTitle}</span>
                <button 
                  onClick={() => {
                    setActiveVideoUrl(null);
                    setActiveVideoTitle('');
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Fake video placeholder */}
              <div className="aspect-video bg-[#0B0721] rounded-xl flex flex-col justify-center items-center relative overflow-hidden border border-white/5">
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#8080800c_1px,transparent_1px),linear-gradient(to_bottom,#8080800c_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                <div className="space-y-3 z-10 p-6">
                  <Play className="h-10 w-10 text-[#00C2FF] mx-auto animate-pulse" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">STREAMING SOURCE FROM INTEGRATION HUB</span>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">This interactive screencast demonstrates our GHL trigger events and the associated n8n nodes syncing CRM contact tables.</p>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono text-gray-500">
                  <span>00:00 / 12:45</span>
                  <span>SSL AUDIO 128KBPS</span>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => {
                    setActiveVideoUrl(null);
                    setActiveVideoTitle('');
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-mono text-white rounded border border-white/10"
                >
                  Close Tutorial
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
