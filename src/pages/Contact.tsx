import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  Activity, 
  ShieldCheck, 
  MessageCircle, 
  Sparkles,
  Clock,
  Send
} from 'lucide-react';
import { RoutePath } from '../types';

interface ContactProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Contact({ setPath, darkMode }: ContactProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    industry: 'Healthcare',
    requirement: 'GHL & CRM Custom Integration',
    message: '',
    consent: false
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [webhookLogs, setWebhookLogs] = useState<string[]>([]);

  const handleValidation = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) errors.email = 'Enter a valid corporate email';

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,10}$/;
    if (!phoneRegex.test(formData.phone)) errors.phone = 'Enter a valid telephone contact number';

    if (!formData.consent) errors.consent = 'You must accept GHL and SMS consent logs';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    setLoading(true);
    setWebhookLogs([
      '⚡ [Webhook Node] Form Submission Intercepted...',
      '🔍 [Validator Node] Sanitizing inputs and checking schema...',
      '📡 [n8n Server] Pushing payload to custom webhooks: ' + JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone })
    ]);

    setTimeout(() => {
      setWebhookLogs(prev => [
        ...prev,
        '📥 [GHL CRM Client] Synced contact record successfully!',
        '💬 [WhatsApp Node] Triggered automated client welcome sequence.',
        '🎯 Pipeline status: Lead captured in "Consultation Booking" stage.'
      ]);
      setLoading(false);
      setFormSubmitted(true);
    }, 2000);
  };

  return (
    <div className="py-12 animate-fade-in font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs font-mono text-gray-500">
          <button onClick={() => setPath('home')} className="hover:text-primary">Home</button> / <span className="text-primary">Contact</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Connect with our Architects</span>
          <h1 className="text-3xl font-bold font-display tracking-tight leading-tight">Integrate Automation in Your Business</h1>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Configure your n8n workflows, deploy conversational voice bots, and synchronize GoHighLevel CRM directories seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form container - 7 cols */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-10 rounded-2xl border ${darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
              {formSubmitted ? (
                <div className="space-y-6">
                  <div className="text-center py-8 space-y-3">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                    <h3 className="text-sm font-bold font-display">Enquiry Dispatched Successfully!</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Your operational payload has bypassed manual limits and is fully synced with our CRM pipeline. Check your phone.
                    </p>
                  </div>

                  {/* Webhook Stream Logs output visualizer */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Active Webhook integration log stream:</span>
                    <div className={`p-4 rounded-lg font-mono text-[10px] h-[150px] overflow-y-auto space-y-1.5 leading-relaxed ${
                      darkMode ? 'bg-black/40 text-emerald-400 border border-white/[0.05]' : 'bg-gray-900 text-emerald-400'
                    }`}>
                      {webhookLogs.map((log, i) => (
                        <p key={i}>{log}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-sm font-bold font-display mb-4">Request Your Custom Integration Proposal</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                          validationErrors.name ? 'border-rose-500' : (darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]')
                        }`}
                        required
                      />
                      {validationErrors.name && <span className="text-[9px] text-rose-400 mt-1 block">{validationErrors.name}</span>}
                    </div>

                    <div>
                      <label htmlFor="email" className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Corporate Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@acme.co"
                        className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                          validationErrors.email ? 'border-rose-500' : (darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]')
                        }`}
                        required
                      />
                      {validationErrors.email && <span className="text-[9px] text-rose-400 mt-1 block">{validationErrors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Mobile Contact Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 99999 99999"
                        className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                          validationErrors.phone ? 'border-rose-500' : (darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]')
                        }`}
                        required
                      />
                      {validationErrors.phone && <span className="text-[9px] text-rose-400 mt-1 block">{validationErrors.phone}</span>}
                    </div>

                    <div>
                      <label htmlFor="industry" className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Your Industry Segment</label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none ${darkMode ? 'bg-dark border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'}`}
                      >
                        <option value="Healthcare">Healthcare Industry</option>
                        <option value="Education">Education Industry</option>
                        <option value="Real Estate">Real Estate Industry</option>
                        <option value="Manufacturing">Manufacturing Industry</option>
                        <option value="Retail">Retail & E-commerce</option>
                        <option value="Services">Professional Services</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="requirement" className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Primary Automation Requirement</label>
                    <select
                      id="requirement"
                      name="requirement"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none ${darkMode ? 'bg-dark border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'}`}
                    >
                      <option value="GHL & CRM Custom Integration">GoHighLevel CRM & Custom Pipeline Sync</option>
                      <option value="n8n Workflow Automation">n8n Workflow Node Architectures</option>
                      <option value="Conversational Outbound Voice Agent">Outbound AI Voice Qualifier Calling</option>
                      <option value="WhatsApp Business Cloud API">Meta WhatsApp Business API Integration</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Strategic Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your current operational leaks or CRM goals..."
                      rows={4}
                      className={`w-full p-3 text-xs rounded-lg border focus:outline-none focus:border-primary ${darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'}`}
                    />
                  </div>

                  {/* Mandated Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5"
                      />
                      <span className={`text-[10px] leading-relaxed ${validationErrors.consent ? 'text-rose-400' : 'text-gray-400'}`}>
                        By checking this box, I authorize Natton Digital to dispatch automated transactional SMS, emails, and phone pre-qualification calls to my contact number under complete TCPA compliance policies.
                      </span>
                    </label>
                    {validationErrors.consent && <span className="text-[9px] text-rose-400 mt-1 block">{validationErrors.consent}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 glow-primary hover:bg-opacity-95 transition-all shadow-md"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {loading ? 'Transmitting Data payload...' : 'Request Integration Proposal'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar details - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact info */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
              <span className="text-[10px] font-mono text-[#00C2FF] uppercase tracking-widest block mb-4">Operations Helpline</span>
              
              <div className="space-y-4">
                <a href="mailto:info@nattondigital.com" className="flex items-center gap-3 group">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm flex-shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Send secure email:</span>
                    <span className="text-xs font-semibold group-hover:text-primary transition-colors">info@nattondigital.com</span>
                  </div>
                </a>

                <a href="tel:+917795512223" className="flex items-center gap-3 group">
                  <div className="h-8 w-8 rounded-lg bg-[#00C2FF]/10 text-[#00C2FF] flex items-center justify-center text-sm flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Operations Helpline:</span>
                    <span className="text-xs font-semibold group-hover:text-[#00C2FF] transition-colors">+91 77955 12223</span>
                  </div>
                </a>

                <a href="https://wa.me/917795512223" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-sm flex-shrink-0">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Active WhatsApp Agent:</span>
                    <span className="text-xs font-semibold group-hover:text-emerald-400 transition-colors">Open Chat Thread</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Global Office locations */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
              <span className="text-[10px] font-mono text-[#00C2FF] uppercase tracking-widest block mb-4">Corporate Operations Hubs</span>
              
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-primary" /> Registered Corporate Office</h4>
                  <p className={`font-semibold mt-1 ${darkMode ? 'text-gray-200' : 'text-slate-800'}`}>Natton Technologies Private Limited</p>
                  <p className={`mt-0.5 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    SY 60/3A, No.461, 1st Floor, Basavana Temple Road,<br />
                    MTS Colony, T Dasarahalli, Bengaluru - 560057,<br />
                    Karnataka, India
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.05]">
                  <h4 className="font-bold flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-primary" /> Bengaluru Office</h4>
                  <p className={`mt-1 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    SY 60/3A, No.461, 1st Floor, Basavana Temple Road,<br />
                    MTS Colony, T Dasarahalli, Bengaluru - 560057
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.05]">
                  <h4 className="font-bold flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-primary" /> Hubli Office</h4>
                  <p className={`mt-1 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    Shop No 37, Pride Icon Complex,<br />
                    Gokul Road, Hubli, Karnataka 580030
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance badges */}
            <div className={`p-5 rounded-2xl border border-dashed flex items-center gap-3 ${darkMode ? 'bg-black/30 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
              <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold font-display">SOC2 & HIPAA Fully Protected</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">All customer form entries are locally encrypted before being logged into standard GoHighLevel CRM schemas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
