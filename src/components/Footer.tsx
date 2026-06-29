import React, { useState } from 'react';
import Logo from './Logo';
import { RoutePath } from '../types';
import { Mail, CheckCircle2, Award, Shield, CheckCircle, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Footer({ setPath, darkMode }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate n8n webhook sync
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1200);
  };

  const navLinks = {
    solutions: [
      { name: 'AI Growth Marketing', path: 'solutions/ai-growth-marketing' as RoutePath },
      { name: 'AI Marketing SaaS', path: 'solutions/ai-marketing-saas' as RoutePath },
      { name: 'CRM & Automation', path: 'solutions/crm-ai-automation' as RoutePath },
      { name: 'Conversational AI', path: 'solutions/conversational-ai' as RoutePath },
      { name: 'WhatsApp Automation', path: 'solutions/whatsapp-automation' as RoutePath },
      { name: 'AI Calling Agents', path: 'solutions/ai-calling-agents' as RoutePath },
      { name: 'Cloud Telephony', path: 'solutions/cloud-telephony' as RoutePath },
      { name: 'RCS Messaging', path: 'solutions/rcs-messaging' as RoutePath },
      { name: 'AI Agent Workflows', path: 'solutions/ai-agents' as RoutePath },
    ],
    products: [
      { name: 'GrowthOS™ Suite', path: 'products/growth-os' as RoutePath },
      { name: 'AI Marketing Platform', path: 'products/ai-marketing-platform' as RoutePath },
      { name: 'BusinessOS™', path: 'products/business-os' as RoutePath },
      { name: 'AgenticOS™ Framework', path: 'products/agentic-os' as RoutePath },
    ],
    industries: [
      { name: 'Healthcare', path: 'industries/healthcare' as RoutePath },
      { name: 'Education & EdTech', path: 'industries/education' as RoutePath },
      { name: 'Real Estate Segment', path: 'industries/real-estate' as RoutePath },
      { name: 'Manufacturing Sector', path: 'industries/manufacturing' as RoutePath },
      { name: 'Retail & E-commerce', path: 'industries/retail-ecommerce' as RoutePath },
      { name: 'Professional Services', path: 'industries/professional-services' as RoutePath },
    ],
    tools: [
      { name: 'Free Growth Tools', path: 'free-tools' as RoutePath },
      { name: 'Careers at Natton', path: 'careers' as RoutePath },
      { name: 'Webinars & Events', path: 'webinars' as RoutePath },
      { name: 'Guides & Playbooks', path: 'guides' as RoutePath },
      { name: 'Compare Solutions', path: 'compare' as RoutePath },
      { name: 'AI Readiness Diagnostic', path: 'ai-readiness-assessment' as RoutePath },
      { name: 'ROI Growth Calculator', path: 'roi-calculator' as RoutePath },
      { name: 'Our 6-Step Process', path: 'our-process' as RoutePath },
      { name: 'Case Studies Library', path: 'case-studies' as RoutePath },
      { name: 'Tech Blog & Insights', path: 'blog' as RoutePath },
      { name: 'Resources Hub', path: 'resources' as RoutePath },
      { name: 'Integrations Hub', path: 'integrations' as RoutePath },
      { name: 'Pricing & Plans', path: 'pricing' as RoutePath },
    ]
  };

  return (
    <footer className={`border-t transition-colors duration-300 ${
      darkMode ? 'bg-[#110B33] border-white/[0.06] text-white' : 'bg-gray-50 border-gray-100 text-[#110B33]'
    }`}>
      {/* Upper Trust Seal bar */}
      <div className={`border-b px-4 py-8 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono tracking-wide ${
        darkMode ? 'border-white/[0.05] text-gray-400' : 'border-gray-200 text-gray-600'
      }`}>
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <p className="font-bold uppercase text-[10px] text-[#47C7BF]">ISO 27001 & SOC2</p>
            <p className="text-[9px]">Enterprise Security Standard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Award className="h-5 w-5 text-accent" />
          <div>
            <p className="font-bold uppercase text-[10px] text-[#47C7BF]">HIPAA COMPLIANT</p>
            <p className="text-[9px]">Healthcare Safe AI Triage</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-emerald-400" />
          <div>
            <p className="font-bold uppercase text-[10px] text-emerald-400">99.98% UPTIME</p>
            <p className="text-[9px]">Redundant Server Clusters</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <div>
            <p className="font-bold uppercase text-[10px] text-primary">GDPR & PDPB READY</p>
            <p className="text-[9px]">Encrypted User Profiles</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Column 1: Brand details */}
          <div className="lg:col-span-2 space-y-5">
            <Logo size="lg" darkMode={darkMode} />
            <p className={`text-xs leading-relaxed max-w-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Natton Digital is a premier enterprise SaaS & service platform orchestrating next-gen AI CRM automations, n8n webhook nodes, and autonomous marketing engines for global SMBs and MSMEs.
            </p>

            <div className="space-y-2">
              <span className="block text-[10px] font-mono text-[#47C7BF] uppercase tracking-widest">Global Market Operations</span>
              <p className={`text-[10px] leading-relaxed font-mono ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                🇮🇳 MSMEs in India • 🇺🇸 SMBs in USA • 🇬🇧 SMBs in UK • 🇦🇪 SMBs in UAE • 🇦🇺 SMBs in Australia • 🇸🇬 SMBs in Singapore
              </p>
            </div>
          </div>

          {/* Columns 2-5: Navs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#47C7BF] mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.solutions.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => setPath(link.path)}
                    className={`hover:text-primary transition-colors text-left flex items-center gap-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.name} <ArrowUpRight className="h-2.5 w-2.5 opacity-0 hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#47C7BF] mb-4">Products</h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.products.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => setPath(link.path)}
                    className={`hover:text-primary transition-colors text-left ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#47C7BF] mb-4">Industries</h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.industries.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => setPath(link.path)}
                    className={`hover:text-primary transition-colors text-left ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#47C7BF] mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs mb-6">
              {navLinks.tools.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => setPath(link.path)}
                    className={`hover:text-primary transition-colors text-left ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>

            <h5 className="text-[10px] font-mono uppercase text-[#2E9CAE] mb-2 tracking-widest">GrowthOS Newsletter</h5>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter corporate email"
                className={`w-full py-2 pl-3 pr-10 text-xs rounded-lg border focus:outline-none focus:border-primary font-sans ${
                  darkMode 
                    ? 'bg-white/[0.02] border-white/10 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-200 text-[#110B33] placeholder-gray-400'
                }`}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 p-1.5 text-primary hover:text-white hover:bg-primary rounded-md transition-all"
              >
                <Mail className="h-3 w-3" />
              </button>
            </form>

            {subscribed && (
              <p className="text-[10px] text-emerald-400 mt-2 font-mono flex items-center gap-1">
                ✓ Webhook Synced. Onboarded!
              </p>
            )}
          </div>
        </div>

        {/* Lower copyright bar */}
        <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono ${
          darkMode ? 'border-white/[0.05] text-gray-500' : 'border-gray-200 text-gray-400'
        }`}>
          <div>
            © {new Date().getFullYear()} Natton Digital Platform. All rights reserved. Registered under Indian MSME & US Delaware Entity guidelines.
          </div>
          <div className="flex gap-6">
            <button className="hover:text-primary transition-colors">Privacy Policy</button>
            <button className="hover:text-primary transition-colors">Terms of Platform</button>
            <button className="hover:text-primary transition-colors">GoHighLevel Integration Node</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
