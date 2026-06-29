import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, CheckCheck, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
import { RoutePath } from '../types';

interface FloatingCTAProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export default function FloatingCTA({ setPath, darkMode }: FloatingCTAProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Hi! I am the Natton Digital AI Agent. I can help automate your marketing & operations in under 5 minutes. What is your business industry?', time: 'Just now' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  // Scroll effect to reveal the sticky Call-To-Action strip
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickPrompts = [
    { text: 'How much does GrowthOS cost?', reply: 'GrowthOS starting tier starts at $297/mo, or fully managed enterprise integration. Our clients see an average 3.2x ROI in 60 days. Would you like to check our calculator?' },
    { text: 'Can you sync with GoHighLevel / n8n?', reply: 'Absolutely! We specialize in custom GoHighLevel CRM workflows, database syncing, and complex multi-node n8n webhook automation chains.' },
    { text: 'Do you support healthcare (HIPAA)?', reply: 'Yes, we secure patient logs under strict HIPAA guidelines, utilizing AES-256 local encrypted schemas on compliant cloud nodes.' },
    { text: 'I want a free strategy session.', reply: 'Fabulous decision! Let me route you to our scheduler. Click "Book Call" in our widget to load our live scheduling calendar.' }
  ];

  const handleQuickClick = (promptText: string, replyText: string) => {
    setMessages((prev) => [...prev, { sender: 'user', text: promptText, time: 'Just now' }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'ai', text: replyText, time: 'Just now' }]);
    }, 1500);
  };

  return (
    <>
      {/* Sticky Bottom CTA Ribbon */}
      {showSticky && (
        <div className={`fixed bottom-0 inset-x-0 z-40 p-4 border-t transition-all duration-500 transform translate-y-0 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-lg ${
          darkMode 
            ? 'bg-[#081120]/90 border-white/[0.08] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-white/95 border-gray-100 text-[#081120] shadow-[0_-5px_20px_rgba(8,17,32,0.06)]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wide">
              🇮🇳 INDIA MSME • 🇺🇸 GLOBAL SMB GROWTH PROGRAM ACTIVE
            </span>
            <span className={`text-[10px] hidden md:inline-block px-2 py-0.5 rounded-full ${
              darkMode ? 'bg-primary/20 text-[#00C2FF]' : 'bg-primary/10 text-primary'
            }`}>
              98% Strategy Slots Filled This Week
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setPath('ai-readiness-assessment')}
              className={`flex-1 sm:flex-none text-center px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                darkMode ? 'border-white/10 hover:bg-white/[0.04]' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              Analyze My Business
            </button>
            <button
              onClick={() => setPath('contact')}
              className="flex-1 sm:flex-none text-center px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-opacity-90 glow-primary transition-all flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="h-3 w-3" />
              Book Free Strategy Session
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp AI Agent floating widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {chatOpen && (
          <div className={`w-[320px] sm:w-[360px] rounded-2xl border shadow-2xl overflow-hidden mb-4 animate-scale-up ${
            darkMode ? 'bg-[#081120] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
          }`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                    ND
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight flex items-center gap-1 font-sans">
                    Natton AI Automation <Sparkles className="h-3 w-3 text-yellow-300 fill-current" />
                  </h4>
                  <p className="text-[9px] text-emerald-100 font-mono">Agentic Sync • Online Now</p>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)} 
                className="p-1 rounded-full hover:bg-white/10 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className={`p-4 h-[220px] overflow-y-auto space-y-3 flex flex-col text-xs leading-normal ${
              darkMode ? 'bg-black/30' : 'bg-gray-50'
            }`}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] rounded-xl p-3 ${
                    m.sender === 'user'
                      ? 'bg-primary text-white ml-auto'
                      : (darkMode ? 'bg-white/[0.03] border border-white/[0.05] text-gray-200 mr-auto' : 'bg-white border border-gray-100 text-gray-800 mr-auto')
                  }`}
                >
                  <p>{m.text}</p>
                  <div className="flex items-center justify-end gap-1 text-[8px] text-gray-400 mt-1 font-mono">
                    <span>{m.time}</span>
                    {m.sender === 'user' && <CheckCheck className="h-3 w-3 text-emerald-400" />}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className={`p-3 rounded-xl border max-w-[40%] mr-auto ${
                  darkMode ? 'bg-white/[0.02] border-white/[0.05]' : 'bg-white border-gray-100'
                }`}>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompt replies */}
            <div className="p-3 border-t border-white/[0.05] flex flex-wrap gap-1.5 bg-white/[0.01]">
              <span className="text-[8px] font-mono text-gray-500 uppercase block w-full mb-1">
                Choose a question for instant automation:
              </span>
              {quickPrompts.map((q) => (
                <button
                  key={q.text}
                  onClick={() => handleQuickClick(q.text, q.reply)}
                  disabled={isTyping}
                  className={`text-[9px] px-2 py-1 rounded-full border transition-all text-left ${
                    darkMode
                      ? 'border-white/10 bg-white/[0.01] text-gray-300 hover:bg-white/[0.04] hover:border-white/20'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 shadow-xs'
                  }`}
                >
                  {q.text}
                </button>
              ))}
            </div>

            {/* Footer Form */}
            <div className={`p-3 border-t flex items-center justify-between gap-2 ${
              darkMode ? 'border-white/[0.05] bg-[#050B14]' : 'border-gray-100 bg-gray-50'
            }`}>
              <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>GoHighLevel Safe Integration</span>
              </div>
              <button
                onClick={() => {
                  setPath('contact');
                  setChatOpen(false);
                }}
                className="py-1 px-3 bg-emerald-500 text-white font-semibold text-[10px] rounded hover:bg-emerald-600 transition-colors"
              >
                Book Call
              </button>
            </div>
          </div>
        )}

        {/* Floating Bubble Button */}
        <button
          onClick={() => {
            setChatOpen(!chatOpen);
            setHasUnread(false);
          }}
          className="relative h-14 w-14 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl z-50 hover:bg-emerald-600"
          title="Chat with Natton AI on WhatsApp"
        >
          {chatOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageSquare className="h-6 w-6 fill-current" />
          )}

          {hasUnread && !chatOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[8px] font-bold text-white items-center justify-center">
                1
              </span>
            </span>
          )}
        </button>
      </div>
    </>
  );
}
