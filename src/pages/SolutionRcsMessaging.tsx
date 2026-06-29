import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
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
  Clock, 
  ArrowUpRight, 
  BarChart2, 
  Settings, 
  Check, 
  CheckCircle,
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
  AlertCircle,
  Video,
  Image as ImageIcon,
  FileDown,
  ShoppingBag,
  Truck,
  MessageCircle,
  Menu,
  ChevronRight,
  ArrowRight,
  Sparkle
} from 'lucide-react';
import { RoutePath } from '../types';
import { motion, AnimatePresence } from 'motion/react';

// Flows for the interactive phone mockup
type ActiveFlow = 'product_showcase' | 'book_appointment' | 'make_payment' | 'track_order' | 'customer_support';

export default function SolutionRcsMessaging({ setPath, darkMode, formSubmitted, setFormSubmitted, loading, setLoading }: any) {
  useEffect(() => {
    document.title = "RCS Messaging Platform | Rich Business Messaging & Conversational Commerce";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Form input state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    industry: 'Retail & Ecommerce',
    monthlyMessageVolume: '50k - 200k messages',
    currentPlatform: 'Standard SMS Gateway',
    requirements: ''
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
  // HERO: Interactive Particle Network Canvas
  // ==========================================
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 400;
    let height = canvas.height = canvas.parentElement?.clientHeight || 400;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', resize);

    // Particles representing floating message packets
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      label: string;
    }> = [];

    const labels = ["Rich Card", "Carousel", "Pay UPI", "Video", "OTP Secure", "n8n Trigger", "CRM Link", "Shopify API"];
    const colors = ["#00C2FF", "#8B5CF6", "#10B981", "#EC4899"];

    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        label: i < labels.length ? labels[i] : ""
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background radial gradient
      const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height));
      grad.addColorStop(0, 'rgba(11, 7, 33, 0)');
      grad.addColorStop(1, 'rgba(11, 7, 33, 0.45)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw active grid
      ctx.strokeStyle = 'rgba(0, 194, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw text label on select nodes
        if (p.label) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.font = '8px monospace';
          ctx.fillText(p.label, p.x + p.size + 4, p.y + 3);
        }

        // Draw connections to nearby nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            const opacity = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
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
  // INTERACTIVE PHONE MOCKUP STATE & CONTROLS
  // ==========================================
  const [activeFlow, setActiveFlow] = useState<ActiveFlow>('product_showcase');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string; type?: string; payload?: any }>>([]);
  const [cartCount, setCartCount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);
  const [orderStep, setOrderStep] = useState(1); // 1: Order Confirmed, 2: Dispatched, 3: In Transit, 4: Delivered
  const [supportResolved, setSupportResolved] = useState<string | null>(null);

  // Initialize the chat flow message history based on activeFlow
  useEffect(() => {
    setPaymentSuccess(false);
    setBookingConfirmed(null);
    setSupportResolved(null);
    const now = "2:47 PM";

    if (activeFlow === 'product_showcase') {
      setChatMessages([
        { sender: 'bot', text: "👋 Welcome to Natton Digital Shop! Discover our hot releases of the week below. Complete your transaction without leaving this chat.", time: now },
        { 
          sender: 'bot', 
          text: "Slide to explore and press 'Buy Now' to complete an instant simulated UPI/Stripe test payment:", 
          time: now, 
          type: 'carousel',
          payload: [
            { id: 'shoe1', name: "AeroGlide Pro Sneakers", price: "₹8,499", desc: "Premium responsive comfort cushioning.", imgGradient: "from-cyan-500 to-blue-600" },
            { id: 'shoe2', name: "Apex Trail Runner", price: "₹11,200", desc: "Heavy-duty waterproof traction grip.", imgGradient: "from-purple-500 to-pink-600" },
            { id: 'shoe3', name: "Urban Comfort Fit", price: "₹6,150", desc: "Ultra-breathable lightweight daily knit.", imgGradient: "from-emerald-400 to-teal-600" }
          ]
        }
      ]);
    } else if (activeFlow === 'book_appointment') {
      setChatMessages([
        { sender: 'bot', text: "Hello! Schedule your Business AI Audit below. Select an available session with our specialist:", time: now },
        {
          sender: 'bot',
          text: "Audit Slot availability for today and tomorrow:",
          time: now,
          type: 'options',
          payload: [
            { text: "Today at 3:30 PM", value: "today_330" },
            { text: "Tomorrow at 10:00 AM", value: "tomorrow_1000" },
            { text: "Tomorrow at 4:30 PM", value: "tomorrow_1630" }
          ]
        }
      ]);
    } else if (activeFlow === 'make_payment') {
      setChatMessages([
        { sender: 'bot', text: "💳 Securing checkouts on the go. Your cart is ready! Review invoice below:", time: now },
        {
          sender: 'bot',
          text: "Invoice #NTN-9821\nMerchant: Natton Tech\nTotal due: ₹14,999",
          time: now,
          type: 'invoice',
          payload: { total: "₹14,999", item: "Enterprise GrowthOS Trial Key" }
        }
      ]);
    } else if (activeFlow === 'track_order') {
      setChatMessages([
        { sender: 'bot', text: "📦 Good news! Your package is packed and en route. Track dispatch progress below in real-time:", time: now },
        {
          sender: 'bot',
          text: "Order #NTN-0210\nCarrier: Bluedart Express\nStatus: In Transit (Bengaluru Hub)",
          time: now,
          type: 'tracker'
        }
      ]);
    } else if (activeFlow === 'customer_support') {
      setChatMessages([
        { sender: 'bot', text: "👋 Hi! I am your automated assistant. How can we speed up your business operations today?", time: now },
        {
          sender: 'bot',
          text: "Please click a quick response button to interact:",
          time: now,
          type: 'support_options',
          payload: [
            { text: "🔑 Get API Sandbox Credentials", action: "api" },
            { text: "💳 Billing and Subscription Help", action: "billing" },
            { text: "👨‍💻 Connect with Support Agent", action: "agent" }
          ]
        }
      ]);
    }
  }, [activeFlow]);

  const handleInteract = (actionType: string, val: any) => {
    const now = "2:48 PM";
    if (actionType === 'add_cart') {
      setCartCount(prev => prev + 1);
      setChatMessages(prev => [
        ...prev,
        { sender: 'user', text: `Added ${val} to cart!`, time: now },
        { sender: 'bot', text: `🛒 Item added successfully. You now have ${cartCount + 1} item(s) in your RCS cart. Feel free to press "Buy Now" to checkout.`, time: now }
      ]);
    } else if (actionType === 'buy_now') {
      setActiveFlow('make_payment');
    } else if (actionType === 'select_slot') {
      setBookingConfirmed(val.text);
      setChatMessages(prev => [
        ...prev,
        { sender: 'user', text: `I'll book: ${val.text}`, time: now },
        { sender: 'bot', text: `🎉 Appointment booked successfully! We've reserved the "${val.text}" slot for you. A calendar confirmation has been synced automatically.`, time: now, type: 'success_badge' }
      ]);
    } else if (actionType === 'pay_upi') {
      setPaymentSuccess(true);
      setChatMessages(prev => [
        ...prev,
        { sender: 'user', text: "Authorize payment via UPI gateway...", time: now },
        { sender: 'bot', text: "✅ Payment Authorized Successfully! Txn ID: TXN_RCS_890123. Your premium keys are activated instantly.", time: now, type: 'receipt_badge' }
      ]);
    } else if (actionType === 'support_action') {
      if (val === 'api') {
        setSupportResolved("api");
        setChatMessages(prev => [
          ...prev,
          { sender: 'user', text: "🔑 Get API Sandbox Credentials", time: now },
          { sender: 'bot', text: "Here are your secure Sandbox parameters for RCS gateways:\n\nENDPOINT: https://api.natton.com/v1/rcs\nSANDBOX_KEY: ntn_test_892x0\n\nClick below to download the quickstart PDF documentation:", time: now, type: 'document_node' }
        ]);
      } else if (val === 'billing') {
        setSupportResolved("billing");
        setChatMessages(prev => [
          ...prev,
          { sender: 'user', text: "💳 Billing and Subscription Help", time: now },
          { sender: 'bot', text: "No problem. Your active subscription is the Growth Plan at ₹14,999/mo. Your next billing date is July 15th, 2026. Would you like to update your payment cards or download receipts?", time: now }
        ]);
      } else if (val === 'agent') {
        setSupportResolved("agent");
        setChatMessages(prev => [
          ...prev,
          { sender: 'user', text: "👨‍💻 Connect with Support Agent", time: now },
          { sender: 'bot', text: "Routing to Shrikant from the Premium Support Team. Typical response time is under 45 seconds. Hold on...", time: now }
        ]);
      }
    }
  };

  // ==========================================
  // REAL-TIME ANALYTICS SIMULATION
  // ==========================================
  const [liveSendCount, setLiveSendCount] = useState(128450);
  const [liveOpenRate, setLiveOpenRate] = useState(98.2);
  const [liveCtr, setLiveCtr] = useState(24.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSendCount(prev => prev + Math.floor(Math.random() * 5) + 1);
      setLiveOpenRate(prev => {
        const d = (Math.random() - 0.5) * 0.05;
        return parseFloat(Math.min(99.9, Math.max(95, prev + d)).toFixed(2));
      });
      setLiveCtr(prev => {
        const d = (Math.random() - 0.5) * 0.1;
        return parseFloat(Math.min(30, Math.max(20, prev + d)).toFixed(2));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // FAQ Expanded State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqsList = [
    {
      q: "What is RCS Business Messaging and how does it compare to standard SMS?",
      a: "RCS (Rich Communication Services) is the next-generation upgrade to SMS. It enables businesses to send interactive, branded messages with images, videos, carousel sliders, action CTAs, and secure transactional receipts directly to a customer's native messaging inbox without installing external apps."
    },
    {
      q: "Do customers need to download a separate app to receive RCS messages?",
      a: "No. RCS is integrated natively into the pre-installed default Google Messages app on Android, and is supported natively on modern iOS devices. It functions directly in the user's phone inbox seamlessly."
    },
    {
      q: "How does the RCS Conversational Commerce checkout work?",
      a: "Our system integrates directly with payment networks like Razorpay and Stripe via secure APIs. Callers can swipe a catalog, choose items, click 'Buy Now', and authorize instant UPI, Card, or NetBanking payments directly inside the native chat stream securely."
    },
    {
      q: "Is it possible to track delivery, read-receipts, and carousel click statistics?",
      a: "Absolutely. Standard SMS provides zero read-receipts. RCS offers detailed analytics: delivered timestamps, read/open timestamps, individual card click counts within carousels, and specific button-selection CTR logs."
    },
    {
      q: "What is the fallback mechanism if a recipient's phone does not support RCS?",
      a: "We deploy an automated smart failover stack. If the recipient does not have a device supporting active RCS, our platform detects this within milliseconds and automatically converts the payload into an elegant SMS containing a secure tracking/payment link."
    },
    {
      q: "Does RCS Messaging support verified business profiles and logos?",
      a: "Yes. Every message displays your official brand name, logo icon, and a blue verified checkmark. This helps build brand trust and dramatically reduces spam complaints and phishing threats."
    },
    {
      q: "How fast are transaction notifications like OTP codes dispatched?",
      a: "RCS messages are processed through our high-speed edge load balancers, delivering transactional OTP codes and order confirmations globally in under 1.8 seconds with direct delivery logs."
    },
    {
      q: "Can we integrate RCS automation with our CRM such as GoHighLevel?",
      a: "Yes. Our native webhooks integrate perfectly with GoHighLevel, HubSpot, Salesforce, and custom n8n flows. Any click, payment, or slot selection instantly updates the customer's CRM profile."
    },
    {
      q: "Are video and GIF media files fully compressed and optimized for network carriers?",
      a: "Yes. Our platform has an integrated media-optimization layer that automatically compresses rich images, videos, and documents to the exact carrier-specific specifications for seamless low-bandwidth loading."
    },
    {
      q: "What is the setup timeline to launch an active RCS verified campaign?",
      a: "Getting the technical sandbox ready is instant. Official brand profile verification from telecom carriers (Google and regional operators) takes about 3 to 5 business days of guided setup."
    },
    {
      q: "What are the pricing models and do we pay per-message or per-session?",
      a: "We support transparent monthly tiers (Starter, Growth, Enterprise). Growth and Enterprise tiers include session-based conversation packages and volume discounts for high-frequency promotional messaging."
    },
    {
      q: "Does RCS support automated interactive chatbots with menu routing?",
      a: "Yes. You can build advanced decision trees with quick-reply buttons and suggested action chips, allowing consumers to route themselves to billing support, check order delivery, or buy products without human intervention."
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
          <span>RCS Messaging</span>
        </div>

        {/* ==========================================
            1. HERO SECTION (Animated Particle Network & Floating 3D Phones)
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative">
          
          {/* Neon backglows */}
          <div className="absolute top-0 left-20 w-[300px] h-[300px] bg-[#00C2FF]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-[#8B5CF6]/15 rounded-full blur-[120px] pointer-events-none -z-10" />

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold">
                Enterprise RCS Carrier Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight">
              Transform Messaging <br />
              <span className="bg-gradient-to-r from-[#00C2FF] via-[#8B5CF6] to-pink-500 bg-clip-text text-transparent animate-pulse">
                Into Experiences
              </span>
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Deliver highly interactive conversation cards, carousel sliders, quick action CTAs, video promotions, and complete payment checks right in the default smartphone messaging inbox. Move past traditional SMS open rates and convert users instantly.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#demo_form" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-violet-500/20 transition-all flex items-center gap-2 text-sm"
              >
                Book Demo <Sparkle className="h-4 w-4" />
              </a>
              <a 
                href="#interactive_demo" 
                className={`px-6 py-3 rounded-lg border transition-all flex items-center gap-2 text-sm font-semibold ${
                  darkMode 
                    ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#00C2FF]' 
                    : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                Launch Phone Mockup <Smartphone className="h-4 w-4 text-[#00C2FF]" />
              </a>
            </div>

            {/* Platform indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-6 text-[10px] font-mono text-gray-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#00C2FF]" /> Verified Sender Profiles</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-emerald-400" /> Carrier Smart-Fallback SMS</span>
            </div>
          </div>

          {/* Right Hero: HTML5 Canvas Mesh */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px]">
            <div className={`p-6 rounded-3xl border w-full max-w-[420px] relative overflow-hidden backdrop-blur-md ${
              darkMode ? 'bg-[#0E1524]/60 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xs font-mono uppercase text-gray-500 mb-2 tracking-wider flex items-center gap-1.5 justify-between">
                <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5 text-violet-400" /> RCS MESSAGE ECOSYSTEM</span>
                <span className="text-[10px] text-emerald-400 font-bold animate-pulse">● GATEWAY READY</span>
              </h3>

              {/* Particle Network Canvas */}
              <div className="h-[280px] w-full relative flex items-center justify-center rounded-2xl bg-black/25 overflow-hidden border border-white/5">
                <canvas ref={heroCanvasRef} className="absolute inset-0 w-full h-full object-cover" />
                
                {/* Floating telemetry block overlay */}
                <div className="absolute top-3 left-3 text-[8px] font-mono text-[#00C2FF] bg-black/60 px-2 py-1 rounded border border-white/5">
                  DELIVERY STACK: EDGE
                </div>
                <div className="absolute bottom-3 right-3 text-[8px] font-mono text-emerald-400 bg-black/60 px-2 py-1 rounded border border-white/5">
                  Avg Open Rate: 98%
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-gray-400 bg-black/30 p-2.5 rounded-lg border border-white/5">
                <span>⚡ Rich Commerce Engine</span>
                <span className="text-[#00C2FF] font-bold">100% Secure SSL</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. ECOSYSTEM BENTO GRID
           ========================================== */}
          <div id="ecosystem" className="mb-24 space-y-12 scroll-mt-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-[10px] font-mono tracking-wider text-[#8B5CF6] uppercase block font-bold">Core Capabilities</span>
              <h2 className="text-3xl font-bold font-display tracking-tight">
                Next Generation Messaging Platform
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Engage customers with tools that go far beyond standard plain text message limitations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Rich Cards", desc: "Embed custom branding, high-resolution header images, detailed product specifications, and action triggers.", icon: Smartphone, accent: "text-[#00C2FF] bg-[#00C2FF]/10" },
                { title: "Image Messages", desc: "Incorporate beautiful banner mockups and promotional graphics directly in line with real-time conversations.", icon: ImageIcon, accent: "text-violet-400 bg-violet-500/10" },
                { title: "Video Messages", desc: "Play product videos, step-by-step tutorial guidelines, or trailers natively inside the customer inbox.", icon: Video, accent: "text-emerald-400 bg-emerald-500/10" },
                { title: "Carousel Messages", desc: "Display scrollable collections of items with independent call-to-action buttons for multi-product catalogs.", icon: Layers, accent: "text-rose-400 bg-rose-500/10" },
                { title: "Suggested Replies", desc: "Reduce client friction with quick-reply bubble chips to automate user inputs with simple taps.", icon: MessageSquare, accent: "text-amber-400 bg-amber-500/10" },
                { title: "Action Buttons", desc: "Integrate native dialers, navigation map redirects, URL opens, and transaction triggers.", icon: Sliders, accent: "text-pink-400 bg-pink-500/10" },
                { title: "OTP Messages", desc: "Deploy ultra-secure verified transaction alerts, login codes, and alerts in under 2 seconds.", icon: Lock, accent: "text-cyan-400 bg-cyan-500/10" },
                { title: "Conversational Commerce", desc: "Bring checkout funnels directly into chat messages, supporting native UPI, card, and GPay options.", icon: ShoppingBag, accent: "text-purple-400 bg-purple-500/10" }
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
                    <span className="text-[10px] font-mono text-[#00C2FF] mt-4 block">Interactive Aspect →</span>
                  </div>
                );
              })}
            </div>
          </div>

        {/* ==========================================
            3. INTERACTIVE DEMO: Phone Simulator (5 Flows)
           ========================================== */}
        <div id="interactive_demo" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-[#00C2FF] uppercase block font-bold font-semibold">Live Experience Playground</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Interactive RCS Experience
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Experience real RCS conversational journeys. Toggle between the scenarios below and interact directly inside our smartphone mockup!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Flow Selectors */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-bold">SELECT CONVERSATIONAL FLOW</span>
                
                {[
                  { id: 'product_showcase', label: 'Product Showcase', desc: 'Browse catalog, swipe items, buy instantly.', icon: ShoppingBag, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
                  { id: 'book_appointment', label: 'Book Appointment', desc: 'Interact with AI assistant slot picker.', icon: Calendar, color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
                  { id: 'make_payment', label: 'Make Payment', desc: 'Simulate secure checkout invoice.', icon: CreditCard, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                  { id: 'track_order', label: 'Track Order', desc: 'Follow order progress steppers live.', icon: Truck, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                  { id: 'customer_support', label: 'Customer Support', desc: 'Tap quick response self-help menus.', icon: HelpCircle, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' }
                ].map((flow) => {
                  const isSelected = activeFlow === flow.id;
                  const Icon = flow.icon;
                  return (
                    <button
                      key={flow.id}
                      onClick={() => setActiveFlow(flow.id as any)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-4 ${
                        isSelected 
                          ? 'border-[#00C2FF] bg-[#00C2FF]/10 shadow-lg scale-[1.01]' 
                          : (darkMode ? 'border-white/5 hover:bg-white/[0.01]' : 'border-slate-200 hover:bg-slate-50')
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${flow.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-display">{flow.label}</h4>
                        <p className={`text-[10px] leading-relaxed mt-0.5 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{flow.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Technical readout block */}
              <div className={`p-4 rounded-xl border font-mono text-[9px] space-y-1.5 hidden lg:block ${
                darkMode ? 'bg-[#0E1524] border-white/5 text-gray-400' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                <div className="flex justify-between text-[10px] text-gray-500 font-bold border-b border-white/5 pb-1 uppercase">
                  <span>⚙️ RCS Payload Parameter</span>
                  <span className="text-[#00C2FF]">Live Sync</span>
                </div>
                <div>METHOD: <span className="text-emerald-400 font-bold">POST /v1/messages/rcs</span></div>
                <div>CARRIER: <span className="text-[#00C2FF]">Jio/Airtel/Google Jibe</span></div>
                <div>RECIPIENT_CAP: <span className="text-purple-400">RCS_UP_2.4</span></div>
              </div>
            </div>

            {/* Right: Phone Frame Simulator */}
            <div className="lg:col-span-7 flex justify-center">
              <div className={`w-full max-w-[360px] h-[580px] rounded-[40px] border-[10px] p-2 flex flex-col justify-between relative shadow-2xl overflow-hidden backdrop-blur-md ${
                darkMode ? 'border-slate-800 bg-[#070415] text-white shadow-violet-950/20' : 'border-slate-300 bg-white text-slate-900 shadow-slate-200'
              }`}>
                {/* Speaker pill */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-800 rounded-full z-20 flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-900 rounded-full mb-1" />
                </div>

                {/* Status Bar */}
                <div className="h-6 flex items-center justify-between px-6 pt-1 text-[10px] font-mono text-gray-500 z-10">
                  <span>Natton Net</span>
                  <div className="flex items-center gap-1">
                    <span>5G LTE</span>
                    <div className="w-4 h-2 bg-emerald-500 rounded-sm" />
                  </div>
                </div>

                {/* Message Header */}
                <div className={`px-4 py-2 border-b flex items-center gap-3 ${
                  darkMode ? 'border-white/5 bg-[#0D0A26]' : 'border-slate-100 bg-slate-50'
                }`}>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    N
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold flex items-center gap-1 font-display">
                      Natton Digital <span className="bg-blue-500 text-white p-0.5 rounded-full text-[6px]"><Check className="h-1.5 w-1.5" /></span>
                    </h5>
                    <span className="text-[8px] font-mono text-emerald-400 font-bold block leading-none">● Verified Business</span>
                  </div>
                </div>

                {/* Chat Message Window Area */}
                <div className={`flex-grow p-4 overflow-y-auto space-y-4 text-xs ${
                  darkMode ? 'bg-black/30' : 'bg-slate-50'
                }`}>
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.sender === 'bot' ? 'items-start' : 'items-end'} space-y-1`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                        msg.sender === 'bot' 
                          ? (darkMode ? 'bg-[#18133B] text-gray-200 border border-white/5' : 'bg-white border border-slate-200 text-slate-800')
                          : 'bg-[#00C2FF] text-slate-950 font-semibold'
                      }`}>
                        <p className="whitespace-pre-line text-[10px]">{msg.text}</p>
                      </div>

                      {/* Render Carousel Payload if Type is Carousel */}
                      {msg.type === 'carousel' && (
                        <div className="w-full overflow-x-auto flex gap-3 pb-2 mt-2 scrollbar-none">
                          {msg.payload.map((item: any) => (
                            <div key={item.id} className={`w-[170px] rounded-xl border p-2 flex-shrink-0 backdrop-blur-md ${
                              darkMode ? 'bg-[#0E0B25] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                            }`}>
                              <div className={`h-24 rounded-lg bg-gradient-to-tr ${item.imgGradient} mb-2 flex flex-col justify-end p-2 relative overflow-hidden`}>
                                <div className="absolute top-1 right-1 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-bold text-white uppercase">RCS Card</div>
                                <span className="text-[9px] font-bold font-mono text-white bg-black/40 px-1.5 py-0.5 rounded-sm w-max">{item.price}</span>
                              </div>
                              <h6 className="text-[9px] font-bold font-display truncate">{item.name}</h6>
                              <p className="text-[8px] text-gray-500 truncate mb-2">{item.desc}</p>
                              
                              <div className="grid grid-cols-2 gap-1">
                                <button 
                                  onClick={() => handleInteract('add_cart', item.name)}
                                  className="py-1 rounded bg-[#8B5CF6]/20 text-violet-300 hover:bg-[#8B5CF6]/30 font-bold text-[8px] border border-violet-500/20"
                                >
                                  Add Cart
                                </button>
                                <button 
                                  onClick={() => handleInteract('buy_now', item)}
                                  className="py-1 rounded bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-[8px]"
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Render Option Chips */}
                      {msg.type === 'options' && (
                        <div className="flex flex-col gap-1.5 w-full mt-2">
                          {msg.payload.map((opt: any, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => handleInteract('select_slot', opt)}
                              className={`w-full py-2 px-3 border rounded-xl text-left hover:border-violet-500 text-[10px] font-semibold transition-all ${
                                darkMode ? 'border-white/10 bg-[#0E0B25] text-violet-300 hover:bg-violet-500/10' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100'
                              }`}
                            >
                              📅 {opt.text}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Render Checkout Card */}
                      {msg.type === 'invoice' && (
                        <div className={`w-full border rounded-2xl p-4 mt-2 ${
                          darkMode ? 'bg-[#0E0B25] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                        }`}>
                          <div className="flex justify-between items-start border-b border-white/5 pb-2 mb-2">
                            <div>
                              <span className="text-[8px] font-mono text-gray-500 uppercase block">MERCHANT BILL</span>
                              <h6 className="text-[10px] font-bold">{msg.payload.item}</h6>
                            </div>
                            <span className="text-[11px] font-bold text-[#00C2FF] font-mono">{msg.payload.total}</span>
                          </div>

                          {paymentSuccess ? (
                            <div className="text-center py-2 text-emerald-400 font-bold flex items-center justify-center gap-1 text-[10px]">
                              <CheckCircle className="h-4 w-4" /> TRANSACTION COMPLETED
                            </div>
                          ) : (
                            <button
                              onClick={() => handleInteract('pay_upi', msg.payload)}
                              className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:opacity-90 font-bold rounded-lg text-[9px] uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all"
                            >
                              <CreditCard className="h-3 w-3" /> Pay Securely via UPI (Simulated)
                            </button>
                          )}
                        </div>
                      )}

                      {/* Render Tracker Stepper */}
                      {msg.type === 'tracker' && (
                        <div className={`w-full border rounded-2xl p-4 mt-2 text-left ${
                          darkMode ? 'bg-[#0E0B25] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                        }`}>
                          <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-3">
                            <span className="text-[9px] font-bold font-mono">STEPPER STATUS TRACKER</span>
                            <span className="text-[8px] font-bold text-amber-400">IN TRANSIT</span>
                          </div>

                          <div className="space-y-3 relative before:absolute before:top-2 before:left-[7px] before:bottom-2 before:w-[2px] before:bg-white/5">
                            {[
                              { label: 'Order Confirmed', time: '10:30 AM', active: orderStep >= 1 },
                              { label: 'Dispatched from Hub', time: '1:15 PM', active: orderStep >= 2 },
                              { label: 'In Transit to Recipient', time: 'Active Now', active: orderStep >= 3 },
                              { label: 'Delivered', time: 'Pending', active: orderStep >= 4 }
                            ].map((step, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className={`h-4 w-4 rounded-full border flex items-center justify-center z-10 ${
                                  step.active ? 'bg-amber-400 border-amber-400' : 'bg-slate-800 border-slate-700'
                                }`}>
                                  {step.active && <Check className="h-2 w-2 text-slate-950 font-bold" />}
                                </div>
                                <div className="leading-tight">
                                  <h6 className={`text-[9px] font-bold ${step.active ? 'text-white' : 'text-gray-500'}`}>{step.label}</h6>
                                  <span className="text-[7px] font-mono text-gray-500">{step.time}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {orderStep < 4 && (
                            <button
                              onClick={() => setOrderStep(prev => prev + 1)}
                              className="w-full mt-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[8px] uppercase"
                            >
                              Trigger Next Progress Stepper
                            </button>
                          )}
                        </div>
                      )}

                      {/* Render Support Actions */}
                      {msg.type === 'support_options' && (
                        <div className="flex flex-col gap-1.5 w-full mt-2">
                          {msg.payload.map((opt: any, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => handleInteract('support_action', opt.action)}
                              className={`w-full py-2 px-3 border rounded-xl text-left hover:border-pink-500 text-[10px] font-semibold transition-all ${
                                darkMode ? 'border-white/10 bg-[#0E0B25] text-pink-300 hover:bg-pink-500/10' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100'
                              }`}
                            >
                              💬 {opt.text}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Document Download Link */}
                      {msg.type === 'document_node' && (
                        <div className="p-3 border border-white/10 rounded-xl bg-black/40 flex items-center justify-between w-full mt-2 font-mono text-[9px]">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[#00C2FF]" />
                            <div>
                              <span className="font-bold block">rcs_api_doc_v2.pdf</span>
                              <span className="text-gray-500 text-[7px]">420 KB • Portable Document</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => alert("Simulation: Document download initialized.")} 
                            className="p-1.5 rounded bg-[#00C2FF]/10 text-[#00C2FF]"
                          >
                            <FileDown className="h-3 w-3" />
                          </button>
                        </div>
                      )}

                      <span className="text-[8px] font-mono text-gray-500">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Message Input box */}
                <div className={`p-2 border-t flex items-center gap-2 ${
                  darkMode ? 'border-white/5 bg-[#0D0A26]' : 'border-slate-100 bg-slate-50'
                }`}>
                  <input 
                    type="text" 
                    placeholder="Natton automated conversation..." 
                    disabled
                    className={`flex-grow p-2 text-[10px] rounded focus:outline-none font-mono ${
                      darkMode ? 'bg-black/40 border border-white/5 text-gray-400' : 'bg-white border border-slate-200 text-slate-500'
                    }`}
                  />
                  <button className="p-2 bg-gradient-to-r from-cyan-400 to-violet-500 text-white rounded" disabled>
                    <Send className="h-3 w-3" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            4. RICH MEDIA MESSAGING
           ========================================== */}
        <div id="rich_media" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Immersive Content Delivery</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Rich Media Messaging
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Capture visual interest natively. Stream rich assets, GIFs, and secure credentials without relying on links.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual description stack */}
            <div className="space-y-6">
              {[
                { title: "Dynamic Custom Banners", desc: "Embed high-contrast seasonal discount displays, sales alerts, and vector headers.", icon: ImageIcon },
                { title: "HD Video Product Demos", desc: "Autoplay high-performance instructional video segments directly in-thread.", icon: Video },
                { title: "Interactive QR & PDF Guides", desc: "Attach boarding passes, ticket barcodes, and custom transaction catalogs.", icon: FileText }
              ].map((f, idx) => {
                const Icon = f.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="h-10 w-10 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-display">{f.title}</h4>
                      <p className={`text-xs mt-1 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated 3D Interactive Media Panel */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <span className="text-[9px] font-mono text-pink-400 uppercase block mb-4">🎥 HIGH-DEFINITION MEDIA RENDER</span>
              
              <div className="h-48 rounded-xl bg-gradient-to-tr from-violet-600 via-pink-600 to-indigo-600 flex flex-col justify-end p-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> Live Streaming Active
                </div>

                <div className="z-10 space-y-1">
                  <h5 className="text-xs font-bold text-white">Natton GrowthOS™ Summer Boot</h5>
                  <p className="text-[10px] text-white/80">Deploying real-time enterprise intelligence across operations.</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-[9px]">
                <div className="p-2 bg-black/35 rounded border border-white/5">
                  <span className="block text-[#00C2FF] font-bold">1080p</span> Resolution
                </div>
                <div className="p-2 bg-black/35 rounded border border-white/5">
                  <span className="block text-emerald-400 font-bold">4.2 MB</span> Size Optimized
                </div>
                <div className="p-2 bg-black/35 rounded border border-white/5">
                  <span className="block text-violet-400 font-bold">Auto</span> Playback Enabled
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            5. INTERACTIVE CAROUSELS
           ========================================== */}
        <div id="carousel_messages" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">E-Commerce Conversions</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Interactive Carousels
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Showcase multiple services, products, or portfolios. Allow customers to swipe, explore, and transact directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Carousel Mockup Visual */}
            <div className="lg:col-span-6 flex justify-center">
              <div className={`p-4 rounded-3xl border w-full max-w-md ${
                darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-4 text-[9px] font-mono">
                  <span>SWIPABLE CAROUSEL MOCKUP</span>
                  <span className="text-[#00C2FF]">3 Cards Connected</span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                  {[
                    { title: "Standard Enterprise Key", desc: "Best for growing businesses looking for full pipelines.", price: "₹4,999/mo", grad: "from-blue-600 to-cyan-500" },
                    { title: "Growth Automation Key", desc: "Includes advanced n8n triggers and secure webhooks.", price: "₹14,999/mo", grad: "from-violet-600 to-indigo-500" },
                    { title: "Bespoke Enterprise Key", desc: "Tailored to high-volume messaging and carrier lines.", price: "Custom", grad: "from-purple-600 to-pink-500" }
                  ].map((c, i) => (
                    <div key={i} className={`w-[200px] p-3 rounded-xl border flex-shrink-0 ${
                      darkMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className={`h-24 rounded-lg bg-gradient-to-br ${c.grad} mb-3 flex items-end p-2`}>
                        <span className="text-[10px] font-bold font-mono text-white bg-black/50 px-2 py-0.5 rounded">{c.price}</span>
                      </div>
                      <h4 className="text-xs font-bold">{c.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-1 leading-normal line-clamp-2">{c.desc}</p>
                      
                      <button 
                        onClick={() => setActiveFlow('make_payment')}
                        className="w-full mt-3 py-1.5 bg-[#00C2FF] hover:bg-[#00b0e6] text-slate-950 font-bold rounded text-[9px] uppercase transition-all"
                      >
                        Select & Pay
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-1.5 mt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xl font-bold font-display">Maximize Conversion Rates</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Plain text links have a standard conversion click-through rate of less than 2%. By replacing these links with rich graphical sliders directly in the messenger stream, Natton Digital clients witness up to a 10x surge in transactional CTRs.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#00C2FF]/5 border border-[#00C2FF]/10 text-center">
                  <span className="block text-2xl font-bold text-[#00C2FF]">10x</span>
                  <span className="text-[9px] font-mono text-gray-400 block uppercase mt-1">CTR Multiplier</span>
                </div>
                <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 text-center">
                  <span className="block text-2xl font-bold text-violet-400">84%</span>
                  <span className="text-[9px] font-mono text-gray-400 block uppercase mt-1">E-Commerce Opt-In</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            6. OTP & TRANSACTIONAL MESSAGING
           ========================================== */}
        <div id="otp" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase block font-bold">Secure Transactions</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              OTP & Transactional Messaging
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Deliver secure verified OTP verifications, invoice alerts, and tracking links in under 1.8 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Interactive features list */}
            <div className="space-y-6">
              {[
                { title: "Dual Carrier Route Redundancy", desc: "No delays. Multi-operator dynamic routing guarantees OTP delivery.", icon: Zap },
                { title: "One-Click Quick Verify", desc: "Copy and verify directly from the native system overlay screen.", icon: CheckSquare },
                { title: "Branded Official Trust Badge", desc: "Verified sender profiles eliminate phishing and security alerts.", icon: ShieldCheck }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-display">{item.title}</h4>
                      <p className={`text-xs mt-1 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Animated OTP notification mockup */}
            <div className="flex justify-center">
              <div className={`p-4 rounded-2xl border w-full max-w-sm relative overflow-hidden backdrop-blur-md ${
                darkMode ? 'bg-[#0E0B25] border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <h4 className="text-[9px] font-mono text-gray-500 mb-3 uppercase tracking-wider flex justify-between">
                  <span>🔒 TRANSACTIONAL OTP GATEWAY</span>
                  <span className="text-emerald-400">STATUS: VERIFIED</span>
                </h4>

                {/* Simulated Notification Box */}
                <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl relative">
                  <div className="flex gap-2.5 items-start">
                    <div className="h-6 w-6 bg-emerald-500 rounded-full flex items-center justify-center text-slate-950 font-bold text-[10px]">✓</div>
                    <div className="flex-grow">
                      <h5 className="text-[10px] font-bold text-white">NATTON SECURE</h5>
                      <p className="text-[9px] text-gray-300 mt-0.5">Your Secure Banking Login OTP code is <span className="font-mono text-[#00C2FF] font-bold text-xs tracking-widest">982130</span>. Valid for 5 minutes.</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-2 justify-end">
                    <button 
                      onClick={() => alert("Simulation: OTP copied to clipboard!")}
                      className="px-2.5 py-1 bg-emerald-400 text-slate-950 font-bold rounded text-[8px] uppercase tracking-wide"
                    >
                      Copy OTP
                    </button>
                  </div>
                </div>

                <div className="mt-4 text-center font-mono text-[8px] text-gray-500">
                  ⚡ Delivery completed via smart-route trunk in 1.4 seconds.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            7. CONVERSATIONAL COMMERCE JOURNEY
           ========================================== */}
        <div id="conversational_commerce" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase block font-bold">Unified Journey Flows</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Conversational Commerce
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Map out complete customer discovery, support, checkout, and receipt journeys natively in a single continuous thread.
            </p>
          </div>

          <div className="relative border rounded-2xl p-6 overflow-hidden backdrop-blur-md bg-white/[0.01] border-white/10">
            <div className="absolute top-0 right-0 h-40 w-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Stepper Pipeline diagram */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center relative z-10">
              {[
                { step: "01", name: "Product Discovery", desc: "Swipe carousel collection cards", label: "Discovery" },
                { step: "02", name: "Interactive Chat", desc: "Inquire specifications with AI", label: "Consultation" },
                { step: "03", name: "Add To Cart", desc: "Instant custom card responses", label: "Basket" },
                { step: "04", name: "Instant Payment", desc: "Authorise GPay / UPI securely", label: "Checkout" },
                { step: "05", name: "Order Tracking", desc: "Real-time dispatch progress", label: "Fulfilment" }
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2 relative group hover:border-violet-500/40 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center mx-auto text-white font-bold text-xs">
                    {step.step}
                  </div>
                  <h4 className="text-xs font-bold font-display text-white">{step.name}</h4>
                  <p className="text-[10px] text-gray-400 leading-normal">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            8. CAMPAIGN ANALYTICS DASHBOARD
           ========================================== */}
        <div id="campaign_dashboard" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Platform Intelligence</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Campaign Analytics Dashboard
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Watch campaign opens, delivery ratios, CTR button interactions, and custom commerce revenue metrics update in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Live Stats side columns */}
            <div className="lg:col-span-4 grid grid-cols-1 gap-4">
              {[
                { title: "RCS Messages Dispatched", val: liveSendCount.toLocaleString(), delta: "+182 today", color: "text-[#00C2FF]" },
                { title: "Live Open/Read Rate", val: `${liveOpenRate}%`, delta: "98.4% target met", color: "text-emerald-400" },
                { title: "Engagement CTR Rate", val: `${liveCtr}%`, delta: "8x above standard SMS", color: "text-violet-400" }
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-xl border flex flex-col justify-between ${
                  darkMode ? 'bg-[#0E0B25] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">{item.title}</span>
                    <h4 className={`text-2xl font-bold font-mono mt-1 ${item.color}`}>{item.val}</h4>
                  </div>
                  <span className="text-[8px] font-mono text-emerald-400 block mt-2">● {item.delta}</span>
                </div>
              ))}
            </div>

            {/* Custom High-Fidelity SVG Charts Window */}
            <div className="lg:col-span-8">
              <div className={`p-6 rounded-2xl border flex flex-col justify-between h-full relative overflow-hidden backdrop-blur-md ${
                darkMode ? 'bg-[#070415] border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                  <h4 className="text-xs font-mono uppercase text-gray-500">LIVE CTR TREND PERFORMANCE</h4>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold animate-pulse">● UPDATING SECURE GRAPH...</span>
                </div>

                {/* Premium Animated custom SVG Graph */}
                <div className="h-44 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.04)" strokeDasharray="4" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.04)" strokeDasharray="4" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="4" />

                    {/* Filled Area */}
                    <path 
                      d="M 0 130 C 50 110, 100 80, 150 95 C 200 110, 250 50, 300 45 C 350 40, 400 20, 500 15 L 500 150 L 0 150 Z" 
                      fill="url(#chartGrad)" 
                    />

                    {/* Bold Line path */}
                    <path 
                      d="M 0 130 C 50 110, 100 80, 150 95 C 200 110, 250 50, 300 45 C 350 40, 400 20, 500 15" 
                      fill="none" 
                      stroke="#00C2FF" 
                      strokeWidth="3.5" 
                    />

                    {/* Active Pulsing Node */}
                    <circle cx="300" cy="45" r="5" fill="#00C2FF" />
                    <circle cx="300" cy="45" r="10" fill="none" stroke="#00C2FF" strokeWidth="1.5" className="animate-ping" />
                  </svg>
                </div>

                <div className="flex justify-between font-mono text-[8px] text-gray-500 pt-4 border-t border-white/5 mt-4">
                  <span>Campaign Launch</span>
                  <span>Verification Peak</span>
                  <span>Audience Conversion (Current)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            9. AUTOMATION WORKFLOW
           ========================================== */}
        <div id="workflow" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Programmatic Pipelines</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Automation Workflow
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Establish advanced triggers connecting CRM systems, messaging servers, payment checkouts, and reporting.
            </p>
          </div>

          <div className="relative border rounded-2xl p-6 overflow-hidden backdrop-blur-md bg-white/[0.01] border-white/10">
            <div className="absolute top-0 right-0 h-40 w-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Stepper block */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 text-center relative z-10">
              {[
                { name: "CRM Event", desc: "User registers or updates profile in GHL", icon: Database },
                { name: "Campaign Trigger", desc: "Webhook initiates n8n workflow", icon: Zap },
                { name: "RCS Delivery", desc: "Rich card sent to Google trunk", icon: Smartphone },
                { name: "Customer Action", desc: "Clicks CTA button inside chat window", icon: Sliders },
                { name: "Secured Payment", desc: "Triggers Razorpay/UPI gateway check", icon: CreditCard },
                { name: "Platform Log", desc: "Updates dashboard analytics instantly", icon: BarChart2 }
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2 relative group hover:border-violet-500/40 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#00C2FF] to-violet-600 flex items-center justify-center mx-auto text-white font-bold text-xs">
                    {idx + 1}
                  </div>
                  <h4 className="text-xs font-bold font-display text-white">{step.name}</h4>
                  <p className="text-[9px] text-gray-400 leading-normal">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            10. INDUSTRY SOLUTIONS
           ========================================== */}
        <div id="industry_use_cases" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold font-semibold font-mono">Specialized Layouts</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Industry Solutions
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Map out highly specialized RCS layouts customized for your particular business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { industry: "Retail & Ecommerce", useCase: "Product Promotions", desc: "Slide customized carousels of catalog items, supporting direct UPI/GPay checkout in chat.", icon: ShoppingBag, color: 'text-cyan-400 bg-cyan-500/10' },
              { industry: "Healthcare", useCase: "Appointment Reminders", desc: "Provide real-time date selector slots to help patients book or reschedule consultations.", icon: Calendar, color: 'text-violet-400 bg-violet-500/10' },
              { industry: "Education", useCase: "Admission Updates", desc: "Deliver verified onboarding files, structure checklists, fees logs, and receipt alerts.", icon: GraduationCap, color: 'text-emerald-400 bg-emerald-500/10' },
              { industry: "Real Estate", useCase: "Property Showcase", desc: "Swipe through active listing photos, and book localized site site tours directly.", icon: Building, color: 'text-rose-400 bg-rose-500/10' },
              { industry: "Finance & Fintech", useCase: "Transaction Alerts", desc: "Send secure transactional alerts, banking login codes, and billing parameter alerts.", icon: CreditCard, color: 'text-amber-400 bg-amber-500/10' },
              { industry: "Hospitality & Travel", useCase: "Booking Confirmation", desc: "Provide rich boarding tickets, hotel checkout details, and live maps directions.", icon: Briefcase, color: 'text-pink-400 bg-pink-500/10' }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:border-violet-500/40 group backdrop-blur-md ${
                  darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${card.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-violet-400 font-bold block uppercase mb-1">{card.industry}</span>
                  <h3 className="text-sm font-bold font-display mb-2">{card.useCase}</h3>
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            11. INTEGRATIONS: Connect Your Stack
           ========================================== */}
        <div id="integrations" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#00C2FF] uppercase block font-bold">Unified Tech Core</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Connect Your Stack
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Sync user records instantly. Natton Digital integrates with GHL, Salesforce, HubSpot, Shopify, Stripe, and n8n webhooks.
            </p>
          </div>

          {/* Logo cloud carousel */}
          <div className="relative overflow-hidden w-full py-4 border-y border-white/5 bg-black/10">
            <div className="flex flex-wrap justify-center gap-8 items-center max-w-5xl mx-auto px-4">
              {[
                "GoHighLevel", "HubSpot", "Salesforce", "Shopify", "WooCommerce", "Razorpay", "Stripe", "WhatsApp", "n8n"
              ].map((logo, i) => (
                <div key={i} className="px-5 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono font-bold text-gray-500 hover:text-white hover:border-violet-500/40 transition-all cursor-default">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            12. COMPARISON TABLE MATRIX
           ========================================== */}
        <div id="comparison" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Why Choose Us</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Why Choose Natton Digital
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              How our unified conversational engine holds up against traditional messaging platforms.
            </p>
          </div>

          <div className={`border rounded-2xl overflow-hidden backdrop-blur-md ${
            darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`font-mono text-gray-400 uppercase border-b ${
                  darkMode ? 'bg-black/35 border-white/5' : 'bg-slate-50 border-slate-200'
                }`}>
                  <tr>
                    <th className="p-4">Features</th>
                    <th className="p-4 text-[#00C2FF] font-bold">Natton Digital</th>
                    <th className="p-4">Twilio</th>
                    <th className="p-4">Infobip</th>
                    <th className="p-4">Gupshup</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-slate-200'}`}>
                  {[
                    { f: "Branded Verified Profile checkmark", n: true, t: true, i: true, g: true },
                    { f: "UPI / Stripe chat payments checkout", n: true, t: false, i: false, g: false },
                    { f: "Visual drag-drop campaign creator", n: true, t: false, i: true, g: false },
                    { f: "Smart carrier-fallback to standard SMS", n: true, t: true, i: true, g: true },
                    { f: "Direct n8n and GHL webhook setups", n: true, t: false, i: false, g: false },
                    { f: "HIPAA & SOC2 transaction storage", n: true, t: true, i: true, g: false }
                  ].map((row, i) => (
                    <tr key={i} className={`hover:bg-white/[0.01] transition-colors ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                      <td className="p-4 font-semibold">{row.f}</td>
                      <td className="p-4 text-emerald-400 font-bold">{row.n ? "✓ Fully Native" : "✕ No"}</td>
                      <td className="p-4">{row.t ? "✓ Yes" : "✕ No"}</td>
                      <td className="p-4">{row.i ? "✓ Yes" : "✕ No"}</td>
                      <td className="p-4">{row.g ? "✓ Yes" : "✕ No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ==========================================
            13. ROI METRICS: Business Impact
           ========================================== */}
        <div id="roi" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase block font-bold">Operational Value</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Business Impact
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Proven metrics delivered to our active clients deploying RCS profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: "98%", desc: "Open and Read Rates", context: "Compared to 20% in SMS" },
              { val: "5.2x", desc: "Higher CTR Engagement", context: "Rich buttons & swipe cards" },
              { val: "100%", desc: "Verified Trust Profile", context: "Blue trust badges on profiles" },
              { val: "34%", desc: "Direct Sales Checkout", context: "Conversions inside messages" }
            ].map((m, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border text-center transition-all hover:border-[#00C2FF]/40 ${
                darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200'
              }`}>
                <span className="text-3xl sm:text-4xl font-extrabold font-mono bg-gradient-to-r from-[#00C2FF] to-violet-500 bg-clip-text text-transparent block">
                  {m.val}
                </span>
                <h4 className="text-sm font-bold font-display mt-2 text-white">{m.desc}</h4>
                <p className="text-[10px] text-gray-500 mt-1">{m.context}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            14. PRICING PLANS
           ========================================== */}
        <div id="pricing" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Transparent Tiers</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Pricing Plans
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Select the pricing structure optimized for your monthly transactional and outreach campaign targets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {[
              { name: "Starter", price: "₹4,999/month", popular: false, desc: "Perfect for localized stores getting started with rich messaging.", features: ["Transactional Messages", "Basic Analytics Dashboard", "Verified Brand Profile Templates"] },
              { name: "Growth", price: "₹14,999/month", popular: true, desc: "Ideal for accelerating checkout conversions and lead tracking.", features: ["Everything in Starter", "Full swipeable Carousels", "Checkout payment gateways", "Unified n8n and GHL integrations"] },
              { name: "Enterprise", price: "Custom", popular: false, desc: "For global enterprises running high-frequency carrier routes.", features: ["Everything in Growth", "Bespoke checkout structures", "Carrier fallback SLA redundancy", "24/7 dedicated system engineer support"] }
            ].map((plan, i) => (
              <div key={i} className={`p-6 rounded-2xl border flex flex-col justify-between relative ${
                plan.popular 
                  ? 'border-violet-500 bg-gradient-to-b from-violet-950/20 to-transparent shadow-lg shadow-violet-950/10' 
                  : (darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-white border-slate-200')
              }`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-600 text-white font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div>
                  <h4 className="text-base font-bold font-display">{plan.name}</h4>
                  <h3 className="text-2xl font-bold font-mono mt-2 text-white">{plan.price}</h3>
                  <p className={`text-[11px] mt-2 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{plan.desc}</p>
                  
                  <div className="my-6 border-t border-white/5" />

                  <ul className="space-y-2.5 text-[11px]">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-gray-300">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="#demo_form" 
                  className={`w-full mt-8 py-3 text-center rounded-lg font-bold text-xs transition-all ${
                    plan.popular 
                      ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-md' 
                      : (darkMode ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-slate-900 text-white hover:bg-slate-800')
                  }`}
                >
                  Get Started with {plan.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            15. FREQUENTLY ASKED QUESTIONS (12 Items Accordion)
           ========================================== */}
        <div id="faq" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Frequently Asked Questions</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Exhaustive answers to all core platform inquiries. Click to expand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqsList.map((faq, i) => {
              const isExpanded = expandedFaq === i;
              return (
                <div 
                  key={i} 
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isExpanded 
                      ? 'border-[#00C2FF] bg-[#00C2FF]/5' 
                      : (darkMode ? 'border-white/5 hover:bg-white/[0.01]' : 'border-slate-200 hover:bg-slate-50')
                  }`}
                >
                  <button 
                    onClick={() => setExpandedFaq(isExpanded ? null : i)}
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="text-xs font-bold font-display pr-4">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className={`text-[11px] leading-relaxed mt-3 border-t border-white/5 pt-3 ${
                          darkMode ? 'text-gray-400' : 'text-slate-600'
                        }`}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            16. DEMO BOOKING FORM
           ========================================== */}
        <div id="demo_form" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase block font-bold">Get In Touch</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Book An RCS Messaging Demo
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Fill out your volume details below and one of our telecom routing experts will configure your verified sandbox.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className={`p-8 rounded-3xl border relative overflow-hidden backdrop-blur-md ${
              darkMode ? 'bg-[#0E0B25]/80 border-white/10 shadow-xl' : 'bg-white border-slate-200 shadow-lg'
            }`}>
              
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold">RCS Demo Request Submitted!</h3>
                  <p className="text-xs text-gray-400">Our enterprise onboarding engineers have flagged your request and will follow up with your custom sandbox instructions via email in under 4 hours.</p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/15 rounded text-xs font-semibold"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Shrikant Deshmukh"
                        className={`w-full p-3 text-xs rounded border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Company Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Natton Tech Private Limited"
                        className={`w-full p-3 text-xs rounded border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Business Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. info@nattondigital.com"
                        className={`w-full p-3 text-xs rounded border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 77955 12223"
                        className={`w-full p-3 text-xs rounded border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Country</label>
                      <select 
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className={`w-full p-3 text-xs rounded border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Industry</label>
                      <select 
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className={`w-full p-3 text-xs rounded border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      >
                        <option value="Retail & Ecommerce">Retail & Ecommerce</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Finance">Finance</option>
                        <option value="Hospitality">Hospitality</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Monthly Message Volume</label>
                      <select 
                        value={formData.monthlyMessageVolume}
                        onChange={(e) => setFormData({ ...formData, monthlyMessageVolume: e.target.value })}
                        className={`w-full p-3 text-xs rounded border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      >
                        <option value="< 50k messages">Less than 50k messages</option>
                        <option value="50k - 200k messages">50k - 200k messages</option>
                        <option value="200k - 1M messages">200k - 1M messages</option>
                        <option value="1M+ messages">More than 1M messages</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Current Messaging Platform</label>
                      <input 
                        type="text" 
                        value={formData.currentPlatform}
                        onChange={(e) => setFormData({ ...formData, currentPlatform: e.target.value })}
                        placeholder="e.g. Twilio / Infobip / SMS Gateway"
                        className={`w-full p-3 text-xs rounded border focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Requirements or Message</label>
                    <textarea 
                      rows={3}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="List any custom API sync or webhook expectations..."
                      className={`w-full p-3 text-xs rounded border focus:outline-none focus:border-[#00C2FF] ${
                        darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                      }`}
                    />
                  </div>

                  {/* Math Captcha Verification */}
                  <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                    darkMode ? 'bg-black/35 border-white/5' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-mono">Solve verification: {captchaNum1} + {captchaNum2} =</span>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <input 
                        type="number" 
                        disabled={captchaVerified}
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        placeholder="Answer"
                        className={`p-2 text-xs rounded w-20 text-center font-mono focus:outline-none focus:border-[#00C2FF] ${
                          darkMode ? 'bg-black/60 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-800'
                        }`}
                      />
                      {!captchaVerified ? (
                        <button 
                          type="button" 
                          onClick={handleCaptchaVerify}
                          className="px-3 py-2 bg-[#00C2FF] text-slate-950 font-bold rounded text-[10px] uppercase font-mono tracking-wider flex-shrink-0"
                        >
                          Verify
                        </button>
                      ) : (
                        <span className="px-3 py-2 bg-emerald-500/10 text-emerald-400 font-bold rounded text-[10px] uppercase font-mono tracking-wider flex-shrink-0 flex items-center gap-1">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !captchaVerified}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> Submitting request...
                      </>
                    ) : (
                      <>
                        Book My Secure Sandbox <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center font-mono text-[8px] text-gray-500">
                    * Connected natively via secure GoHighLevel CRM capture routes and webhook triggers.
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>

        {/* ==========================================
            17. FINAL CALL TO ACTION
           ========================================== */}
        <div id="final_cta" className="relative p-8 sm:p-12 rounded-3xl overflow-hidden border border-white/10 bg-[#0E0A2D] text-center max-w-4xl mx-auto mb-12 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-violet-600/10 via-[#00C2FF]/10 to-transparent pointer-events-none -z-10" />
          
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Upgrade From SMS To Rich Conversations
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Unlock Verified Trust badges, high-conversion swipe carousels, HD product videos, and frictionless instant UPI checkout within the smartphone messages app.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <a 
                href="#demo_form" 
                className="px-6 py-3 bg-[#00C2FF] hover:bg-[#00b0e6] text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 shadow-lg"
              >
                Book Demo <Sparkle className="h-4 w-4" />
              </a>
              <a 
                href="#interactive_demo" 
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-bold rounded-lg text-xs flex items-center gap-2 border border-white/10"
              >
                Launch Mockup <Smartphone className="h-4 w-4 text-[#00C2FF]" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
