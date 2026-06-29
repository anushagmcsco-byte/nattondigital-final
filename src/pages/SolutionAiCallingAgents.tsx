import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Phone, 
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
  Headphones, 
  MessageSquare, 
  Clock, 
  ArrowUpRight, 
  BarChart2, 
  Settings, 
  Check, 
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
  Target
} from 'lucide-react';
import { RoutePath } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function SolutionAiCallingAgents({ setPath, darkMode, formSubmitted, setFormSubmitted, loading, setLoading }: any) {
  useEffect(() => {
    document.title = "AI Calling Agents | Inbound & Outbound Voice AI Automation";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Form input state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    industry: 'Healthcare',
    monthlyCalls: '1,000 - 5,000',
    preferredUseCase: 'Lead Qualification',
    currentSystem: 'Manual calling by staff',
    message: ''
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);

  // Generate random captcha on load
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
      alert("Incorrect math verification code. Please try again.");
      generateMathCaptcha();
    }
  };

  // 3D soundwave orb canvas ref & setup
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 300;
      canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;

      angle += 0.015;

      // Draw outer background glowing circles
      ctx.shadowBlur = 0;
      const gradientBg = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 1.5);
      gradientBg.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
      gradientBg.addColorStop(0.5, 'rgba(0, 194, 255, 0.03)');
      gradientBg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradientBg;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Draw orbital dashed rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 10]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.stroke();

      // Draw particle wave peaks
      ctx.setLineDash([]);
      ctx.shadowBlur = 15;
      const particleCount = 70;
      
      for (let j = 0; j < 3; j++) {
        // Multi layered waves for 3D effect
        ctx.beginPath();
        const waveScale = 1.0 + j * 0.15;
        const speedMultiplier = 1.0 + j * 0.3;
        
        if (j === 0) {
          ctx.strokeStyle = '#00C2FF'; // Cyan accent
          ctx.shadowColor = '#00C2FF';
        } else if (j === 1) {
          ctx.strokeStyle = '#8B5CF6'; // Purple accent
          ctx.shadowColor = '#8B5CF6';
        } else {
          ctx.strokeStyle = '#3B82F6'; // Blue accent
          ctx.shadowColor = '#3B82F6';
        }
        ctx.lineWidth = 1.5;

        for (let i = 0; i <= particleCount; i++) {
          const theta = (i / particleCount) * Math.PI * 2;
          
          // Generate 3D voice wave ripples using multiple sine combinations
          const freqOffset = Math.sin(theta * 8 + angle * speedMultiplier) * Math.cos(theta * 3 - angle * 0.5) * 12;
          const noise = Math.sin(theta * 15 - angle * 2) * 4;
          const r = radius * waveScale + freqOffset + noise;
          
          const x = centerX + Math.cos(theta) * r;
          const y = centerY + Math.sin(theta) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw core orb
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#8B5CF6';
      const orbGradient = ctx.createRadialGradient(centerX - 10, centerY - 10, radius * 0.1, centerX, centerY, radius * 0.6);
      orbGradient.addColorStop(0, '#a78bfa');
      orbGradient.addColorStop(0.5, '#6d28d9');
      orbGradient.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = orbGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Draw core overlay grid details
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - radius * 0.6, centerY);
      ctx.lineTo(centerX + radius * 0.6, centerY);
      ctx.moveTo(centerX, centerY - radius * 0.6);
      ctx.lineTo(centerX, centerY + radius * 0.6);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Scenario voice simulations
  const [selectedAgent, setSelectedAgent] = useState<'aria' | 'ethan' | 'sofia'>('aria');
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi' | 'spanish'>('english');
  const [voiceIsPlaying, setVoiceIsPlaying] = useState(false);
  const [voicePlaybackProgress, setVoicePlaybackProgress] = useState(0);
  const [interrupted, setInterrupted] = useState(false);
  const [activeSpeechText, setActiveSpeechText] = useState('');

  const voicesData = {
    aria: {
      name: "Aria",
      gender: "Female",
      role: "Patient Booking Assistant (Healthcare)",
      avatar: "👩‍⚕️",
      languages: {
        english: {
          transcript: "Hello! Thank you for calling Apollo Dental. I see your appointment is scheduled for tomorrow at 2:00 PM with Dr. Sharma. Would you like to confirm or reschedule this slot?",
          audioLength: 8 // simulated seconds
        },
        hindi: {
          transcript: "नमस्ते! अपोलो डेंटल में कॉल करने के लिए धन्यवाद। मैं देख सकती हूँ कि कल दोपहर 2:00 बजे डॉ. शर्मा के साथ आपका अपॉइंटमेंट तय है। क्या आप इस समय की पुष्टि करना चाहते हैं या इसे बदलना चाहते हैं?",
          audioLength: 9
        },
        spanish: {
          transcript: "¡Hola! Gracias por llamar a Apollo Dental. Veo que su cita está programada para mañana a las 2:00 PM con el Dr. Sharma. ¿Le gustaría confirmar o reprogramar este horario?",
          audioLength: 8
        }
      }
    },
    ethan: {
      name: "Ethan",
      gender: "Male",
      role: "B2B Sales Qualifier (Real Estate)",
      avatar: "👨‍💼",
      languages: {
        english: {
          transcript: "Hi there! I saw you requested details on our new premium apartments in Gurgaon. Before I connect you with our advisor, may I confirm if you are looking for a 2BHK or 3BHK layout?",
          audioLength: 9
        },
        hindi: {
          transcript: "नमस्कार! मैंने देखा कि आपने गुड़गांव में हमारे नए प्रीमियम फ्लैटों के बारे में विवरण मांगा है। हमारे सलाहकार से जुड़ने से पहले, क्या मैं पुष्टि कर सकता हूँ कि आप 2BHK या 3BHK लेआउट देख रहे हैं?",
          audioLength: 10
        },
        spanish: {
          transcript: "¡Hola! Vi que solicitó detalles sobre nuestros nuevos apartamentos premium en Gurgaon. Antes de conectarlo con nuestro asesor, ¿podría confirmarme si busca un diseño de 2 o 3 habitaciones?",
          audioLength: 9
        }
      }
    },
    sofia: {
      name: "Sofia",
      gender: "Female",
      role: "Admissions Counselor (Education)",
      avatar: "👩‍🎓",
      languages: {
        english: {
          transcript: "Hello! This is Sofia from Tech Academy. I noticed your interest in our Full-Stack AI Developer Bootcamp. Are you looking to join our weekday batch or the weekend professional schedule?",
          audioLength: 9
        },
        hindi: {
          transcript: "नमस्ते! मैं टेक एकेडमी से सोफिया बोल रही हूँ। मैंने हमारे फुल-स्टैक एआई डेवलपर बूटकैंप में आपकी रुचि देखी। क्या आप हमारे वर्किंग डेज बैच या वीकेंड प्रोफेशनल शेड्यूल में शामिल होना चाहते हैं?",
          audioLength: 10
        },
        spanish: {
          transcript: "¡Hola! Soy Sofía de la Tech Academy. Noté su interés en nuestro Bootcamp de Desarrollador de IA Full-Stack. ¿Desea unirse a nuestro grupo de días de semana o al horario profesional de fin de semana?",
          audioLength: 9
        }
      }
    }
  };

  // Play audio simulation timer
  useEffect(() => {
    let playTimer: number;
    if (voiceIsPlaying) {
      const currentVoice = voicesData[selectedAgent].languages[selectedLanguage];
      const step = 100 / (currentVoice.audioLength * 10); // step per 100ms
      
      let progress = 0;
      setInterrupted(false);
      
      playTimer = window.setInterval(() => {
        progress += step;
        if (progress >= 100) {
          progress = 100;
          setVoicePlaybackProgress(100);
          setVoiceIsPlaying(false);
          clearInterval(playTimer);
        } else {
          setVoicePlaybackProgress(progress);
          // Split transcript to show progressive words
          const words = currentVoice.transcript.split(' ');
          const wordsToShow = Math.ceil((progress / 100) * words.length);
          setActiveSpeechText(words.slice(0, wordsToShow).join(' '));
        }
      }, 100);
    } else {
      setVoicePlaybackProgress(0);
    }
    return () => clearInterval(playTimer);
  }, [voiceIsPlaying, selectedAgent, selectedLanguage]);

  const handleInterrupt = () => {
    if (voiceIsPlaying) {
      setVoiceIsPlaying(false);
      setInterrupted(true);
      setVoicePlaybackProgress(0);
      setActiveSpeechText("🚨 [System Interrupted] \"Sure, no problem! Let me pause right there. How can I help you instead?\" (Sub-800ms interruption response)");
    }
  };

  // Outbound campaign simulator states
  const [campaignStatus, setCampaignStatus] = useState<'idle' | 'calling' | 'paused' | 'completed'>('idle');
  const [campaignDials, setCampaignDials] = useState(0);
  const [campaignPickups, setCampaignPickups] = useState(0);
  const [campaignBooked, setCampaignBooked] = useState(0);
  const [campaignLogs, setCampaignLogs] = useState<Array<{ id: number; time: string; number: string; status: 'Pick up' | 'Busy' | 'DND' | 'No Answer'; agent: string; action: string }>>([]);

  const startOutboundCampaign = () => {
    if (campaignStatus === 'calling') return;
    setCampaignStatus('calling');
    if (campaignDials === 0) {
      setCampaignLogs([]);
    }

    const numbers = [
      "+91 98765 43210", "+91 91234 56789", "+91 93456 78901", 
      "+91 94567 89012", "+91 95678 90123", "+91 96789 01234",
      "+91 97890 12345", "+91 98901 23456", "+91 99012 34567"
    ];
    const statuses: ('Pick up' | 'Busy' | 'DND' | 'No Answer')[] = ['Pick up', 'Pick up', 'Pick up', 'Busy', 'No Answer', 'DND', 'Pick up'];
    const actions = [
      "Qualified lead - GHL Updated", 
      "Appointment Confirmed - Calendar Synced",
      "Requested follow-up SMS", 
      "No action", "Ringing timed out", "Carrier DND bypass failed",
      "Qualified lead - CRM updated"
    ];

    let dialCount = campaignDials;
    let pickupCount = campaignPickups;
    let bookedCount = campaignBooked;

    const interval = setInterval(() => {
      if (dialCount >= 100) {
        setCampaignStatus('completed');
        clearInterval(interval);
        return;
      }
      
      dialCount += Math.floor(Math.random() * 3) + 1;
      const isPickup = Math.random() > 0.35;
      const pickupStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      if (isPickup && pickupStatus === 'Pick up') {
        pickupCount += 1;
        if (Math.random() > 0.45) {
          bookedCount += 1;
        }
      }

      setCampaignDials(dialCount);
      setCampaignPickups(pickupCount);
      setCampaignBooked(bookedCount);

      // Add a live log row
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const randomNum = numbers[Math.floor(Math.random() * numbers.length)];
      const randomAction = isPickup && pickupStatus === 'Pick up' ? actions[Math.floor(Math.random() * 3)] : "Call failed / No response";

      setCampaignLogs(prev => [
        {
          id: Date.now(),
          time: timeStr,
          number: randomNum,
          status: isPickup ? pickupStatus : 'No Answer',
          agent: selectedAgent === 'aria' ? 'Aria Agent' : selectedAgent === 'ethan' ? 'Ethan Agent' : 'Sofia Agent',
          action: randomAction
        },
        ...prev.slice(0, 10) // keep last 10 logs
      ]);

    }, 1500);

    (window as any).campaignIntervalId = interval;
  };

  const pauseOutboundCampaign = () => {
    setCampaignStatus('paused');
    clearInterval((window as any).campaignIntervalId);
  };

  const resetOutboundCampaign = () => {
    setCampaignStatus('idle');
    setCampaignDials(0);
    setCampaignPickups(0);
    setCampaignBooked(0);
    setCampaignLogs([]);
    clearInterval((window as any).campaignIntervalId);
  };

  // Node based interactive workflow states
  const [selectedWorkflowNode, setSelectedWorkflowNode] = useState<string>('call');
  const workflowNodes = {
    call: {
      title: "Incoming Call Trunk",
      type: "Entry Gateway",
      latency: "Under 35ms",
      desc: "Call is routed via SIP trunk or carrier forwarding. Instant webhook triggers of GHL caller ID profile verification.",
      payload: "{\n  \"callerId\": \"+919876543210\",\n  \"sipTrunk\": \"natton_main_route\",\n  \"session\": \"sess_v8301\"\n}"
    },
    stt: {
      title: "Speech Recognition (STT)",
      type: "Translation Layer",
      latency: "110ms - 130ms",
      desc: "Audio stream is converted to text stream packets. Multi-lingual automatic language identifier determines native dialect (Hindi, English, etc.)",
      payload: "{\n  \"stt_model\": \"deepgram_nova_2\",\n  \"stream_type\": \"websockets\",\n  \"detected_lang\": \"en-IN\"\n}"
    },
    intent: {
      title: "Intent Detection (LLM)",
      type: "Decision Matrix",
      latency: "150ms - 180ms",
      desc: "Gemini 1.5 Flash processes structured dialogue criteria. Scrapes knowledge documents, matches user goals, and constructs contextual replies.",
      payload: "{\n  \"llm_engine\": \"gemini-1.5-flash\",\n  \"confidence_score\": 0.98,\n  \"intent\": \"book_appointment\",\n  \"variables\": {\"date\": \"tomorrow\", \"time\": \"2 PM\"}\n}"
    },
    tts: {
      title: "AI Voice Response (TTS)",
      type: "Synthesis Layer",
      latency: "120ms - 140ms",
      desc: "Translates structured response texts into lifelike human audio, adjusting tones, intonations, breaths, and sub-second interruptions dynamically.",
      payload: "{\n  \"tts_engine\": \"elevenlabs_v2\",\n  \"voice_style\": \"aria_warm\",\n  \"streaming_format\": \"pcm_24khz\"\n}"
    },
    crm: {
      title: "CRM Sync & Update",
      type: "Database Pipeline",
      latency: "45s (background n8n)",
      desc: "Updates active GHL contact opportunities, maps custom tags, and drops detailed conversation summaries with transcript files.",
      payload: "{\n  \"crm\": \"GoHighLevel\",\n  \"node\": \"ghl_contact_update\",\n  \"fields\": {\"lead_status\": \"Hot\", \"notes\": \"Confirmed Apollo slot Tomorrow at 2 PM\"}\n}"
    },
    appt: {
      title: "Appointment Booking",
      type: "Action Event",
      latency: "GCal/Outlook API Lock",
      desc: "Locks selected calendar slots, updates database index tables, and sends a localized WhatsApp reminder to the prospect.",
      payload: "{\n  \"calendar\": \"Google Calendar\",\n  \"slot_booked\": \"2026-06-28T14:00:00Z\",\n  \"whatsapp_reminder_template\": \"appointment_confirm_en\"\n}"
    },
    handover: {
      title: "Human Handover",
      type: "Fallback Gateway",
      latency: "Instant redirect",
      desc: "In case of escalation triggers, high negative sentiment, or explicit user request, the call is bridged directly to a human specialist with full transcripts.",
      payload: "{\n  \"escalate\": true,\n  \"route_to\": \"support_queue_india\",\n  \"transcript_snapshot\": \"Apollo suite sterilization confirmed...\"\n}"
    }
  };

  // Voice Analytics Dashboard simulated states
  const [analyticsCalls, setAnalyticsCalls] = useState(1420);
  const [analyticsConversion, setAnalyticsConversion] = useState(38.2);
  const [analyticsSatisfaction, setAnalyticsSatisfaction] = useState(94.6);
  const [analyticsDuration, setAnalyticsDuration] = useState("3m 12s");
  const [analyticsBookings, setAnalyticsBookings] = useState(542);

  // Dynamic dashboard updates simulating real-time activity
  useEffect(() => {
    const timer = setInterval(() => {
      setAnalyticsCalls(prev => prev + (Math.random() > 0.6 ? 1 : 0));
      setAnalyticsBookings(prev => prev + (Math.random() > 0.85 ? 1 : 0));
      setAnalyticsConversion(prev => {
        const delta = (Math.random() - 0.49) * 0.1;
        return parseFloat((prev + delta).toFixed(1));
      });
      setAnalyticsSatisfaction(prev => {
        const delta = (Math.random() - 0.49) * 0.05;
        return parseFloat((prev + delta).toFixed(1));
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // FAQs State - 12 items
  const [faqStates, setFaqStates] = useState<Record<number, boolean>>({});
  const toggleFaq = (index: number) => {
    setFaqStates(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const faqsList = [
    {
      q: "What is the voice response latency, and will customers notice it's an AI?",
      a: "Our system unifies low-latency speech-to-text models (like Deepgram Nova-2) with optimized LLMs and sub-150ms speech synthesis. The total latency ranges between 600ms to 850ms. Coupled with realistic voice-breaths, verbal filler nodes ('uh-huh', 'got it'), and real-time interruption handling, most customers experience it as a natural, fluid human representative."
    },
    {
      q: "Can the AI agents understand regional accents and multiple languages?",
      a: "Yes! Powered by advanced state-of-the-art multi-lingual models, our AI Callers recognize and adapt dynamically to 30+ international languages and major Indian regional accents (such as Hinglish, Tamil, Telugu, Hindi, and Bengali) without requiring manual retraining."
    },
    {
      q: "How does interruption handling work? Can the user speak over the AI?",
      a: "Absolutely. We stream audio packets bidirectionally. The moment the user speaks or makes a sound, our speech activity detector (SAD) immediately halts the outbound audio synthesizer and redirects the inputs back to the intent engine. This sub-second interruption feels exactly like a human taking a breath and yielding the floor."
    },
    {
      q: "Does this require complex telephony setups or expensive licenses?",
      a: "No telephony setup required on your part. We provide fully hosted, high-speed cloud SIP lines, VoIP endpoints, and virtual numbers globally. If you prefer to keep your current numbers, we support standard Call Forwarding, SIP Trunk register matching, or BYOC (Bring Your Own Carrier)."
    },
    {
      q: "Does it integrate with my GoHighLevel, HubSpot, or custom CRM?",
      a: "Yes. Our calling engine integrates natively via webhooks and custom-built n8n node branches. When a call completes, n8n automatically triggers downstream actions like updating pipeline stages, uploading transcription logs, booking calendar slots, and sending localized WhatsApp confirmations."
    },
    {
      q: "How secure is the patient/customer data logged during conversations?",
      a: "We implement SOC2 Type II compliance controls. All stream data, call recordings, and text summaries are fully encrypted at rest (AES-256) and in transit (SSL/TLS). Our servers are hosted on enterprise cloud containers with access controls, making us fully HIPAA and GDPR compliant."
    },
    {
      q: "What happens if the AI agent encounters a complex question or gets stuck?",
      a: "If the caller requests a supervisor, asks an un-knowledge-mapped question, or demonstrates high negative sentiment, the AI Caller executes a seamless human transfer. It bridges the call to your specified priority support line instantly, displaying full transcription history and key customer metrics to the human agent."
    },
    {
      q: "How much does outbound dialer credits cost?",
      a: "Outbound dialer calls are billed on clean, transparent raw carrier VoIP rates with no markups—ranging around ₹1.5 to ₹2.5 per minute depending on geographical carriers and volume bands. You only pay for successful connected seconds."
    },
    {
      q: "Can I clone my own team's voices for the AI calling agent?",
      a: "Yes! On our Growth and Enterprise tiers, you can upload a 2-minute clean audio clip of your founder or support lead. ElevenLabs-engineered clone pipelines will synthesize the voice pattern with 99.8% vocal similarity for immediate use."
    },
    {
      q: "How long does it take to deploy a custom voice calling agent?",
      a: "Standard pre-built agents (such as appointment confirmers or qualification bots) can be wired and active in under 3 hours. Completely customized enterprise agents with complex API webhooks, proprietary knowledge bases, and custom voice cloning typically take 7 to 10 days of guided setup."
    },
    {
      q: "Can the AI handle inbound call bursts during peak hours?",
      a: "Yes! That is one of our greatest strengths. Unlike human call centers that trigger 'please wait' queues, our cloud architecture scales horizontally. We can handle up to 10,000 concurrent inbound calls simultaneously without a single drop in latency, response quality, or uptime."
    },
    {
      q: "What kind of post-call analytics and statistics are tracked?",
      a: "Each call yields extensive analytical telemetry: average pick-up rates, call duration histograms, intent maps, lead qual scores, automated transcript logs, specific action-block logs (e.g. appointments confirmed), and comprehensive sentiment scoring."
    }
  ];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please solve the math verification to prove you are an authorized representative.");
      return;
    }
    setLoading(true);
    // Simulate n8n webhook ingestion
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1800);
  };

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
          <span>AI Calling Agents</span>
        </div>

        {/* ==========================================
            1. HERO SECTION (Animated Neural Network + Voice Sphere Canvas)
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative">
          
          {/* Background Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
              <span className="flex h-2 w-2 rounded-full bg-[#00C2FF] animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#00C2FF] font-bold">
                Enterprise Voice Automation
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight">
              AI Voice Agents <br />
              <span className="bg-gradient-to-r from-[#00C2FF] via-[#8B5CF6] to-cyan-400 bg-clip-text text-transparent">
                That Work 24×7
              </span>
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Automate inbound and outbound calls with intelligent AI voice agents that speak naturally, qualify leads, and schedule appointments instantly. Unify your Twilio or SIP telephony pipelines with sub-800ms natural conversations.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#demo_form" 
                className="px-6 py-3 bg-[#8B5CF6] hover:bg-[#7c4fe3] text-white font-semibold rounded-lg shadow-lg hover:shadow-[#8B5CF6]/20 transition-all flex items-center gap-2 text-sm"
              >
                Book Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#voice_demo" 
                className={`px-6 py-3 rounded-lg border transition-all flex items-center gap-2 text-sm font-semibold ${
                  darkMode 
                    ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#00C2FF]' 
                    : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                Listen To AI Voice <Volume2 className="h-4 w-4 text-[#00C2FF]" />
              </a>
            </div>

            {/* Platform Trust Logos */}
            <div className="flex items-center gap-6 pt-6 text-[11px] font-mono text-gray-500">
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-[#00C2FF]" /> SOC2 Enterprise Security</span>
              <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5 text-[#8B5CF6]" /> HIPAA compliant streaming</span>
            </div>
          </div>

          {/* Right Hero Visual: 3D Sound Wave Orb Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px]">
            <div className={`p-6 rounded-3xl border w-full max-w-[420px] relative overflow-hidden backdrop-blur-md ${
              darkMode ? 'bg-[#0E1524]/60 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
            }`}>
              <div className="absolute top-0 right-0 h-40 w-40 bg-[#00C2FF]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xs font-mono uppercase text-gray-500 mb-2 tracking-wider flex items-center gap-1.5 justify-between">
                <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5 text-[#8B5CF6]" /> 3D SOUNDWAVE ORB</span>
                <span className="text-[10px] text-emerald-400 font-bold animate-pulse">● SIP ONLINE</span>
              </h3>

              {/* HTML5 Canvas for stunning rotating 3D voice sphere */}
              <div className="h-[280px] w-full relative flex items-center justify-center rounded-2xl bg-black/25 overflow-hidden border border-white/5">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
                
                {/* Micro indicators overlays */}
                <div className="absolute bottom-3 left-3 text-[9px] font-mono text-gray-400 bg-black/40 px-2 py-1 rounded">
                  LATENCY: ~180ms LLM
                </div>
                <div className="absolute bottom-3 right-3 text-[9px] font-mono text-gray-400 bg-black/40 px-2 py-1 rounded">
                  SAMPLING: 24kHz
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-gray-500 bg-black/30 p-2 rounded-lg">
                <span>🔗 Twilio / SIP Trunk Connected</span>
                <span className="text-[#00C2FF] font-bold">BYOC Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. INTERACTIVE VOICE DEMO (Play Sample + Interrupt Simulator)
           ========================================== */}
        <div id="voice_demo" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-mono tracking-wider text-[#8B5CF6] uppercase block font-bold">Interactive Voice Simulator</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Experience Human-Like AI Conversations
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Select an specialized voice model, choose your language, and click play. Experience realistic speech synthesis, and try clicking <strong>"INTERRUPT AI VOICE"</strong> mid-speech to see our real-time conversation response!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Control Panel */}
            <div className={`lg:col-span-4 p-6 rounded-2xl border flex flex-col justify-between ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-mono text-gray-500 uppercase block mb-3">1. SELECT VOICE AGENT MODEL</label>
                  <div className="space-y-2">
                    {(Object.keys(voicesData) as Array<'aria' | 'ethan' | 'sofia'>).map((key) => {
                      const voice = voicesData[key];
                      const isSelected = selectedAgent === key;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedAgent(key);
                            setVoiceIsPlaying(false);
                            setVoicePlaybackProgress(0);
                            setActiveSpeechText('');
                            setInterrupted(false);
                          }}
                          className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                            isSelected 
                              ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 text-white' 
                              : (darkMode ? 'border-white/5 hover:bg-white/[0.02] text-gray-400' : 'border-slate-200 hover:bg-slate-50 text-slate-700')
                          }`}
                        >
                          <span className="text-xl">{voice.avatar}</span>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-xs">{voice.name} <span className="font-mono text-[9px] font-normal text-gray-500">({voice.gender})</span></h4>
                              {isSelected && <span className="text-[8px] bg-[#8B5CF6] text-white px-1.5 py-0.5 rounded uppercase font-mono font-bold">Active</span>}
                            </div>
                            <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{voice.role}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-500 uppercase block mb-3">2. CHOOSE DIALECT LANGUAGE</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { code: 'english', label: 'English' },
                      { code: 'hindi', label: 'Hindi' },
                      { code: 'spanish', label: 'Spanish' }
                    ].map((lang) => {
                      const isSelected = selectedLanguage === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang.code as any);
                            setVoiceIsPlaying(false);
                            setVoicePlaybackProgress(0);
                            setActiveSpeechText('');
                            setInterrupted(false);
                          }}
                          className={`py-2 px-3 rounded-lg border text-center text-xs font-mono transition-all uppercase ${
                            isSelected 
                              ? 'border-[#00C2FF] bg-[#00C2FF]/10 text-white font-bold' 
                              : (darkMode ? 'border-white/5 hover:bg-white/[0.01] text-gray-400' : 'border-slate-200 hover:bg-slate-50 text-slate-700')
                          }`}
                        >
                          {lang.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6">
                <span className="text-[9px] font-mono text-gray-500 block uppercase mb-1">VOICE SPEED CONTROL</span>
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>Normal</span>
                  <Sliders className="h-3.5 w-3.5 text-[#8B5CF6]" />
                  <span>1.0x (Standard)</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Player Frame */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className={`p-6 rounded-2xl border flex-grow flex flex-col justify-between backdrop-blur-md relative overflow-hidden ${
                darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-md'
              }`}>
                {/* Voice player header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-sm">
                      {voicesData[selectedAgent].avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold">{voicesData[selectedAgent].name} Voice Stream</h4>
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{voicesData[selectedAgent].role}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 bg-black/30 px-2 py-1 rounded">
                    SPEECH LATENCY: &lt;800ms
                  </div>
                </div>

                {/* Animated Voice Wave Area */}
                <div className="my-8 h-24 rounded-xl bg-black/30 border border-white/5 flex items-center justify-center gap-1 px-4 relative overflow-hidden">
                  {voiceIsPlaying ? (
                    Array.from({ length: 48 }).map((_, i) => {
                      const duration = 0.4 + Math.random() * 1.2;
                      const height = 8 + Math.random() * 65;
                      return (
                        <div 
                          key={i} 
                          className="w-[3.5px] bg-gradient-to-t from-[#8B5CF6] via-[#00C2FF] to-cyan-300 rounded-full"
                          style={{ 
                            height: `${height}px`,
                            animation: `wave ${duration}s ease-in-out infinite alternate`
                          }} 
                        />
                      );
                    })
                  ) : (
                    <div className="text-center space-y-1 z-10 text-xs font-mono text-gray-500">
                      <Volume2 className="h-6 w-6 mx-auto mb-2 animate-bounce text-[#8B5CF6]" />
                      <p>Click Play to initiate real-time synthetic voice streaming.</p>
                    </div>
                  )}
                </div>

                {/* Live Transcript Panel */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">LIVE VOICE SPEECH TRANSCRIPTION</span>
                  <div className={`p-4 rounded-xl min-h-[90px] text-xs leading-relaxed border ${
                    darkMode ? 'bg-black/50 border-white/5 text-gray-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    {activeSpeechText ? (
                      <p className="font-mono">
                        {activeSpeechText}
                        {voiceIsPlaying && <span className="inline-block h-3.5 w-1.5 bg-[#00C2FF] ml-1 animate-pulse" />}
                      </p>
                    ) : interrupted ? (
                      <p className="font-mono text-[#00C2FF]">{activeSpeechText}</p>
                    ) : (
                      <p className="font-mono text-gray-500 italic">No audio actively streaming. Click play below.</p>
                    )}
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Progress slider bar */}
                  <div className="w-full sm:flex-grow relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#00C2FF] transition-all duration-100"
                      style={{ width: `${voicePlaybackProgress}%` }}
                    />
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    {voiceIsPlaying ? (
                      <>
                        <button
                          onClick={handleInterrupt}
                          className="flex-grow sm:flex-grow-0 px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 font-semibold rounded-lg text-xs border border-rose-500/20 flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Square className="h-3.5 w-3.5" /> INTERRUPT AI VOICE
                        </button>
                        <button
                          onClick={() => {
                            setVoiceIsPlaying(false);
                            setVoicePlaybackProgress(0);
                            setActiveSpeechText('');
                          }}
                          className="px-4 py-2.5 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 rounded-lg text-xs border border-white/5 transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setVoiceIsPlaying(true)}
                        className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#00C2FF] hover:opacity-90 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Play className="h-3.5 w-3.5 text-white fill-white" /> PLAY AGENT VOICEOVER
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            3. ECOSYSTEM BENTO GRID
           ========================================== */}
        <div id="ecosystem" className="mb-24 space-y-12 scroll-mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#8B5CF6] uppercase block font-bold">Complete Capability Matrix</span>
            <h2 className="text-3xl font-bold font-display tracking-tight">
              Complete Voice AI Platform
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Everything you need to deploy enterprise-grade natural calling bots, automate outbound campaigns, and update CRM profiles with sub-second latencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Inbound AI Agent */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#8B5CF6]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Inbound AI Agent</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Instant response, zero holds, and full customer knowledge-base retrieval. Answer patient and buyer FAQs in under 800ms.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#8B5CF6] mt-4 block">Deployment ready →</span>
            </div>

            {/* 2. Outbound AI Agent */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#8B5CF6]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Outbound AI Agent</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Automate high-volume outbound calls for appointment confirmations, cold lead qualification, and localized product checkouts.
                </p>
              </div>
              <span className="text-[10px] font-mono text-blue-400 mt-4 block">Deployment ready →</span>
            </div>

            {/* 3. Lead Qualification */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#8B5CF6]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Lead Qualification</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Qualify budget size, timing suitability, and buyer interest parameters, then label qualified leads instantly inside your active CRM.
                </p>
              </div>
              <span className="text-[10px] font-mono text-purple-400 mt-4 block">Deployment ready →</span>
            </div>

            {/* 4. Appointment Booking */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#8B5CF6]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Appointment Booking</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Verbally present available calendar slots from Google or Outlook, then lock the appointment in real-time, sending SMS templates.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 mt-4 block">Deployment ready →</span>
            </div>

            {/* 5. Customer Support */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#8B5CF6]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <Headphones className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Customer Support</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Solve routine inquiries, handle cancellations, and route complex escalations smoothly to active live support reps.
                </p>
              </div>
              <span className="text-[10px] font-mono text-amber-400 mt-4 block">Deployment ready →</span>
            </div>

            {/* 6. Follow-Up Calls */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#8B5CF6]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Follow-Up Calls</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Call back inactive form entries or missed support tickets automatically in under 45 seconds to secure high-intent prospects.
                </p>
              </div>
              <span className="text-[10px] font-mono text-sky-400 mt-4 block">Deployment ready →</span>
            </div>

            {/* 7. Payment Reminders */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#8B5CF6]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Payment Reminders</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Detect unpaid invoice entries, trigger localized call notifications, verbally confirm invoice details, and dispatch Stripe payment nodes.
                </p>
              </div>
              <span className="text-[10px] font-mono text-rose-400 mt-4 block">Deployment ready →</span>
            </div>

            {/* 8. Analytics Dashboard */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:border-[#8B5CF6]/40 group backdrop-blur-md ${
              darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold font-display mb-2">Analytics Dashboard</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Track real-time dial pickup parameters, conversion ratios, average duration, sentiment indicators, and live transcript logs.
                </p>
              </div>
              <span className="text-[10px] font-mono text-violet-400 mt-4 block">Deployment ready →</span>
            </div>

          </div>
        </div>

        {/* ==========================================
            4. INBOUND AGENTS (Call Flow Visualizer)
           ========================================== */}
        <div id="inbound_agents" className="mb-24 scroll-mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <div className="h-9 w-9 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] border border-[#8B5CF6]/20">
                <Smartphone className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold font-display tracking-tight">
                Inbound AI Voice Agents
              </h2>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Scale your support operations 24/7 without adding headcount. Answer 10,000 simultaneous incoming phone calls instantly, answering clinical or booking FAQs, coordinating appointment transfers, and updating HubSpot or GoHighLevel pipeline records with zero data leakage.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-400">
                {["24×7 Availability", "Call Routing & Queues", "FAQ Handling", "Human Specialist Transfer", "GoHighLevel CRM Updates"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#00C2FF] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Visual: Interactive Inbound Call Router Simulation */}
            <div className={`p-6 rounded-2xl border ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.05]">
                <span className="text-xs font-mono uppercase text-[#00C2FF] font-bold">INBOUND ROUTING FLOW</span>
                <span className="text-[10px] font-mono text-gray-500">Live call node visualizer</span>
              </div>

              {/* Call Flow animation visual */}
              <div className="space-y-4">
                {[
                  { node: "Phone Call Rings", desc: "SIP trunk receives caller ID", status: "completed" },
                  { node: "STT Transcription", desc: "Converting voice packets to text stream", status: "completed" },
                  { node: "Intelligent AI Match", desc: "Querying Apollo clinical knowledge base", status: "active" },
                  { node: "CRM Auto-Sync", desc: "Checking existing HubSpot contact record", status: "pending" },
                  { node: "Voice Output Stream", desc: "Sending synthesized confirmation audio", status: "pending" }
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-center gap-4">
                    {/* Circle line connect */}
                    {idx < 4 && (
                      <div className="absolute left-[13px] top-7 bottom-[-13px] w-0.5 border-l border-dashed border-white/10" />
                    )}

                    <div className={`h-7 w-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold relative z-10 ${
                      item.status === 'completed' 
                        ? 'bg-[#00C2FF] text-slate-900' 
                        : item.status === 'active' 
                          ? 'bg-[#8B5CF6] text-white animate-pulse shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                          : 'bg-white/10 text-gray-500'
                    }`}>
                      {item.status === 'completed' ? '✓' : idx + 1}
                    </div>

                    <div className="flex-grow p-3 rounded-lg border border-white/5 bg-black/20 flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-white leading-none">{item.node}</h4>
                        <p className="text-[10px] text-gray-500 mt-1">{item.desc}</p>
                      </div>
                      <span className={`text-[9px] font-mono uppercase tracking-wider ${
                        item.status === 'completed' 
                          ? 'text-emerald-400' 
                          : item.status === 'active' 
                            ? 'text-purple-400 font-bold animate-pulse' 
                            : 'text-gray-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            5. OUTBOUND AGENTS (Outbound Campaign Dashboard)
           ========================================== */}
        <div id="outbound_agents" className="mb-24 scroll-mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Visual: Campaign dialer controller simulator */}
            <div className={`p-6 rounded-2xl border order-last lg:order-first ${
              darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/[0.05]">
                <span className="text-xs font-mono uppercase text-[#8B5CF6] font-bold">OUTBOUND CAMPAIGN DIALER</span>
                <span className="text-[10px] font-mono text-gray-500">Live outbound engine node</span>
              </div>

              {/* Counter status badges */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-black/20 border border-white/5 text-center">
                  <p className="text-[10px] font-mono text-gray-500">CALLS DIALED</p>
                  <p className="text-xl font-bold font-mono text-white mt-1">{campaignDials}/100</p>
                </div>
                <div className="p-3 rounded-lg bg-black/20 border border-white/5 text-center">
                  <p className="text-[10px] font-mono text-gray-500">LIVE PICKUPS</p>
                  <p className="text-xl font-bold font-mono text-[#00C2FF] mt-1">{campaignPickups}</p>
                </div>
                <div className="p-3 rounded-lg bg-black/20 border border-white/5 text-center">
                  <p className="text-[10px] font-mono text-gray-500">QUALIFIED/BOOKED</p>
                  <p className="text-xl font-bold font-mono text-emerald-400 mt-1">{campaignBooked}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mb-4">
                {campaignStatus === 'calling' ? (
                  <button
                    onClick={pauseOutboundCampaign}
                    className="flex-grow py-2 px-4 rounded bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold transition-all"
                  >
                    Pause Campaign
                  </button>
                ) : (
                  <button
                    onClick={startOutboundCampaign}
                    className="flex-grow py-2 px-4 rounded bg-[#8B5CF6] hover:bg-[#7c4fe3] text-white text-xs font-bold transition-all"
                  >
                    {campaignStatus === 'paused' ? 'Resume Campaign' : 'Start Dial Campaign'}
                  </button>
                )}
                <button
                  onClick={resetOutboundCampaign}
                  className="py-2 px-4 rounded bg-white/10 hover:bg-white/15 text-white text-xs transition-all border border-white/5"
                >
                  Reset
                </button>
              </div>

              {/* Outbound call stream terminal logs */}
              <div className="p-3 bg-black/50 border border-white/5 rounded-lg text-left">
                <span className="text-[9px] font-mono text-gray-500 uppercase block mb-2">LIVE OUTBOUND ACTIVITY STREAM</span>
                <div className="h-40 overflow-y-auto font-mono text-[9px] space-y-1.5 scrollbar-thin">
                  {campaignLogs.map((log) => (
                    <div key={log.id} className="flex justify-between border-b border-white/[0.03] pb-1">
                      <span className="text-gray-500">{log.time}</span>
                      <span className="text-white font-bold">{log.number}</span>
                      <span className={`px-1.5 py-0.2 rounded font-black ${
                        log.status === 'Pick up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {log.status}
                      </span>
                      <span className="text-gray-400 truncate max-w-[120px]">{log.action}</span>
                    </div>
                  ))}
                  {campaignLogs.length === 0 && (
                    <p className="text-center text-gray-500 py-12">Click "Start Dial Campaign" to initiate campaign.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6">
              <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold font-display tracking-tight">
                Outbound AI Calling
              </h2>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Trigger high-yield automated campaigns. Initiate 1,000 outbound dials within minutes to confirm weekend bookings, collect pre-requisite questionnaires, verbally follow up on abandoned checkout carts, or collect customer surveys.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-400">
                {["Automated Lead Qualification", "Appointment Confirmations", "Customer Feedback Collection", "Unpaid Invoice Collections", "Instant Rescheduling Sequences"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#8B5CF6]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ==========================================
            6. CONVERSATION WORKFLOW DIAGRAM (Node Based Diagram)
           ========================================== */}
        <div id="conversation_flow" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono text-[#00C2FF] uppercase tracking-widest">Architectural Node Wiring</span>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              AI Conversation Workflow Diagram
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Click each workflow node below to see its exact function, down-to-the-millisecond latency budgets, and standard GHL / n8n JSON output schemas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Diagram Nodes Column */}
            <div className="lg:col-span-5 space-y-2.5">
              {[
                { id: 'call', name: "1. Phone Call Inbound", badge: "SIP Gateway", color: "from-blue-500 to-indigo-500" },
                { id: 'stt', name: "2. Speech Recognition (STT)", badge: "Deepgram v2", color: "from-purple-500 to-pink-500" },
                { id: 'intent', name: "3. Intent Detection (LLM)", badge: "Gemini 1.5 Flash", color: "from-pink-500 to-[#8B5CF6]" },
                { id: 'tts', name: "4. Voice Response (TTS)", badge: "ElevenLabs warm", color: "from-[#8B5CF6] to-[#00C2FF]" },
                { id: 'crm', name: "5. CRM Sync & Update", badge: "HubSpot / GHL node", color: "from-[#00C2FF] to-emerald-500" },
                { id: 'appt', name: "6. Appointment Booking", badge: "Google Cal API", color: "from-emerald-500 to-teal-500" },
                { id: 'handover', name: "7. Human Handover Bridge", badge: "Escalation Trunk", color: "from-teal-500 to-amber-500" }
              ].map((node) => {
                const isSelected = selectedWorkflowNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedWorkflowNode(node.id)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'border-[#00C2FF] bg-[#00C2FF]/5 shadow-[0_0_15px_rgba(0,194,255,0.15)]' 
                        : (darkMode ? 'border-white/5 bg-white/[0.01] hover:bg-white/[0.04]' : 'border-slate-200 bg-white hover:bg-slate-50')
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-mono text-white bg-gradient-to-tr ${node.color} font-bold`}>
                        {node.id === 'call' ? '📞' : node.id === 'stt' ? '🎙️' : node.id === 'intent' ? '🧠' : node.id === 'tts' ? '🗣️' : node.id === 'crm' ? '🗄️' : node.id === 'appt' ? '📅' : '🤝'}
                      </span>
                      <div>
                        <h4 className="font-bold text-white text-xs">{node.name}</h4>
                        <span className="text-[9px] font-mono text-gray-500 uppercase">{node.badge}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500">Configured ✓</span>
                  </button>
                );
              })}
            </div>

            {/* Right Schema & Config Console Column */}
            <div className="lg:col-span-7 flex">
              <div className={`p-6 rounded-2xl border flex-grow flex flex-col justify-between ${
                darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] mb-4">
                    <span className="text-xs font-mono uppercase text-[#00C2FF] font-bold">NODE TELEMETRY CONTROL</span>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                      Budget: {workflowNodes[selectedWorkflowNode as keyof typeof workflowNodes].latency}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-display text-white mb-1">
                    {workflowNodes[selectedWorkflowNode as keyof typeof workflowNodes].title}
                  </h3>
                  <span className="text-[9px] font-mono text-gray-500 uppercase block mb-3">
                    Type: {workflowNodes[selectedWorkflowNode as keyof typeof workflowNodes].type}
                  </span>

                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {workflowNodes[selectedWorkflowNode as keyof typeof workflowNodes].desc}
                  </p>

                  <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">n8n payload webhook schema:</span>
                  <pre className="p-4 rounded-lg bg-black/60 border border-white/5 text-[10px] font-mono leading-relaxed text-emerald-400 overflow-x-auto whitespace-pre-wrap max-h-[160px]">
                    {workflowNodes[selectedWorkflowNode as keyof typeof workflowNodes].payload}
                  </pre>
                </div>

                <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs mt-4">
                  <span className="font-mono text-[9px] text-gray-500">Node Sync: GHL Webhook Node</span>
                  <span className="text-emerald-400 font-bold font-mono">Status: Connected to Node Server</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            7. ANALYTICS DASHBOARD
           ========================================== */}
        <div id="analytics" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest">Operations Monitoring</span>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              Voice Analytics Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Unify live call durations, conversion ratios, booking counters, and satisfaction scores. Watch numbers update dynamically representing simulated active trunk sessions.
            </p>
          </div>

          {/* Metrics grids */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { title: "Calls Handled", value: analyticsCalls, suffix: "", color: "text-[#00C2FF]" },
              { title: "Conversion Rate", value: analyticsConversion, suffix: "%", color: "text-purple-400" },
              { title: "Avg Call Duration", value: analyticsDuration, suffix: "", color: "text-amber-400", isString: true },
              { title: "Customer Satisfaction", value: analyticsSatisfaction, suffix: "%", color: "text-emerald-400" },
              { title: "Appointments Booked", value: analyticsBookings, suffix: "", color: "text-teal-400" }
            ].map((metric, i) => (
              <div key={i} className={`p-4 rounded-xl border text-center ${
                darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200'
              }`}>
                <p className="text-[10px] font-mono text-gray-500 uppercase">{metric.title}</p>
                <p className={`text-2xl font-bold font-mono mt-1.5 ${metric.color}`}>
                  {metric.value}{metric.suffix}
                </p>
              </div>
            ))}
          </div>

          {/* Premium Analytics SVG Chart Visual */}
          <div className={`p-6 rounded-2xl border ${
            darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.05] mb-6">
              <span className="text-xs font-mono uppercase text-[#00C2FF] font-bold">DAILY CALL TRAFFIC SUMMARY</span>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Aria & Ethan Agents Trunks</span>
            </div>

            {/* Custom SVG line chart representing traffic stats */}
            <div className="h-64 w-full relative flex items-end">
              <svg className="w-full h-full text-gray-500" viewBox="0 0 500 150">
                {/* Horizontal lines */}
                <line x1="0" y1="25" x2="500" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="0" y1="125" x2="500" y2="125" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                {/* Main smooth gradient line (Inbound calls) */}
                <path 
                  d="M 10 110 Q 80 40 160 85 T 320 20 T 490 60" 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />
                
                {/* Secondary line (Booked calls) */}
                <path 
                  d="M 10 130 Q 80 110 160 120 T 320 80 T 490 90" 
                  fill="none" 
                  stroke="#00C2FF" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  strokeDasharray="4 2"
                />

                {/* Nodes dots on chart */}
                <circle cx="160" cy="85" r="4.5" fill="#8B5CF6" />
                <circle cx="320" cy="20" r="4.5" fill="#8B5CF6" />
                <circle cx="490" cy="60" r="4.5" fill="#8B5CF6" />

                <circle cx="320" cy="80" r="3.5" fill="#00C2FF" />
              </svg>
            </div>

            <div className="grid grid-cols-5 text-center text-[10px] font-mono text-gray-500 mt-4">
              <span>9:00 AM</span>
              <span>12:00 PM</span>
              <span>3:00 PM</span>
              <span>6:00 PM</span>
              <span>9:00 PM IST</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            8. INDUSTRY SOLUTIONS
           ========================================== */}
        <div id="industry_use_cases" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono text-[#00C2FF] uppercase tracking-widest">Vertical Applicability</span>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              Industry Solutions
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Deploy specialized templates engineered with specific knowledge parameters for your particular industry verticals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { industry: "Healthcare", use: "Appointment Booking", avatar: "🏥", desc: "Patient appointment confirmations, medical questionnaire validations, pre-treatment instructions routing." },
              { industry: "Education", use: "Admission Enquiries", avatar: "🎓", desc: "Qualify bootcamp course applicants, coordinate weekday vs weekend batch selections, book consultations." },
              { industry: "Real Estate", use: "Lead Qualification", avatar: "🏢", desc: "Qualify budget thresholds, confirm flat configuration preferences (2BHK / 3BHK), schedule advisor visits." },
              { industry: "Retail", use: "Customer Support", avatar: "🛍️", desc: "Instant product checkouts, order processing cancellations tracking, abandoned cart verbal reminders." },
              { industry: "Finance", use: "Collections", avatar: "💵", desc: "Localized collection reminders, identify unpaid billing invoices, dispatch direct Razorpay invoices verbally." },
              { industry: "Professional Services", use: "Consultation Booking", avatar: "⚖️", desc: "Automate intake screening, confirm available consulting slots, sync calendar schedules with n8n." }
            ].map((item, i) => (
              <div key={i} className={`p-5 rounded-2xl border backdrop-blur-md flex flex-col justify-between ${
                darkMode ? 'bg-white/[0.01] border-white/5 hover:border-[#8B5CF6]/30' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <span className="text-2xl">{item.avatar}</span>
                  <h4 className="text-sm font-bold text-white mt-3">{item.industry}</h4>
                  <span className="text-[10px] font-mono text-[#00C2FF] uppercase block mt-0.5 mb-2">Use: {item.use}</span>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
                <span className="text-[10px] text-gray-500 font-mono mt-4 block">Deployment template ready ✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            9. INTEGRATIONS (Infinite sliding logo carousel)
           ========================================== */}
        <div id="integrations" className="mb-24 scroll-mt-12 overflow-hidden relative py-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono text-[#00C2FF] uppercase tracking-widest">Dynamic Ecosystem Sync</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
              Connect With Your Existing Stack
            </h2>
            <p className="text-xs text-gray-400">
              Our dialer integrates natively via webhooks, syncing calls and summaries directly to your CRM of choice.
            </p>
          </div>

          {/* Infinite carousel bar */}
          <div className="flex overflow-hidden select-none gap-6 relative w-full h-12 items-center">
            <div className="flex gap-6 animate-[marquee_20s_linear_infinite] whitespace-nowrap min-w-full">
              {[
                "GoHighLevel", "HubSpot", "Salesforce", "Google Calendar", "Zoom", "n8n", "WhatsApp", "Razorpay", "Stripe"
              ].map((logo, i) => (
                <div key={i} className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {logo}
                </div>
              ))}
              {/* Duplicate for infinite loop */}
              {[
                "GoHighLevel", "HubSpot", "Salesforce", "Google Calendar", "Zoom", "n8n", "WhatsApp", "Razorpay", "Stripe"
              ].map((logo, i) => (
                <div key={`dup-${i}`} className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            10. VOICE AI ARCHITECTURE
           ========================================== */}
        <div id="architecture" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest">3D System Layer Design</span>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              Voice AI Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Sovereign call synthesis and latency budget breakdown. Here is how your customer's voice matches and triggers data nodes in milliseconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative">
            {[
              { id: "phone", name: "1. Phone Call", desc: "Outbound / Inbound VOIP Dial" },
              { id: "stt", name: "2. Speech-to-Text", desc: "Convert stream in 110ms" },
              { id: "llm", name: "3. LLM Engine", desc: "Intent generation in 150ms" },
              { id: "kb", name: "4. Knowledge Base", desc: "Proprietary manual scrapers" },
              { id: "crm", name: "5. CRM Integration", desc: "HubSpot / GHL Update" },
              { id: "cal", name: "6. Calendar System", desc: "Real-time date check" },
              { id: "voice", name: "7. Voice Response", desc: "Audio synthesizer stream" }
            ].map((node, i) => (
              <div key={i} className={`p-4 rounded-xl border text-center relative flex flex-col justify-between ${
                darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <span className="h-6 w-6 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-mono font-bold flex items-center justify-center mx-auto mb-2">
                    {i + 1}
                  </span>
                  <h4 className="text-xs font-bold text-white">{node.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-1">{node.desc}</p>
                </div>
                {i < 6 && (
                  <div className="hidden md:block absolute right-[-10px] top-1/2 translate-y-[-50%] z-20 text-indigo-400">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            11. COMPARISON TABLE
           ========================================== */}
        <div id="comparison" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono text-[#00C2FF] uppercase tracking-widest">Market Comparison</span>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              Why Businesses Choose Natton Digital
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              See how GMC and Natton's Voice OS unifies low-latency calling with built-in n8n servers at raw provider rates.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className={`w-full text-xs text-left border ${
              darkMode ? 'border-white/10 bg-black/20' : 'border-slate-200 bg-white'
            }`}>
              <thead>
                <tr className={darkMode ? 'bg-white/[0.03] text-gray-300' : 'bg-slate-100 text-slate-700'}>
                  <th className="p-4 font-bold border-b border-white/10">Features</th>
                  <th className="p-4 font-bold text-[#00C2FF] border-b border-[#00C2FF]/30">Natton Digital</th>
                  <th className="p-4 font-bold border-b border-white/10">ElevenLabs</th>
                  <th className="p-4 font-bold border-b border-white/10">Retell AI</th>
                  <th className="p-4 font-bold border-b border-white/10">Bland AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {[
                  { feat: "Voice Stream Latency", natton: "600ms - 850ms", eleven: "750ms - 900ms", retell: "800ms - 1.2s", bland: "900ms - 1.3s" },
                  { feat: "Built-In CRM & n8n Servers", natton: "Yes (Bundled)", eleven: "No (API only)", retell: "No (Integration webhook)", bland: "No (API only)" },
                  { feat: "Raw Carrier Dialing Rates", natton: "Yes (No markups)", eleven: "No markups", retell: "Markup per minute", bland: "Markup per minute" },
                  { feat: "Interruption Response", natton: "Sub-second SAD", eleven: "Websockets SAD", retell: "SAD available", bland: "SAD available" },
                  { feat: "Voice Cloning Speeds", natton: "Under 2 minutes", eleven: "Instant", retell: "Requires upload", bland: "Requires upload" },
                  { feat: "Local Indian Carrier Lines", natton: "Yes (BYOC / Exotel)", eleven: "No (International only)", retell: "Twilio only", bland: "International only" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold text-gray-300 border-r border-white/5">{row.feat}</td>
                    <td className="p-4 font-bold text-[#00C2FF] border-r border-white/5 bg-[#00C2FF]/5">{row.natton}</td>
                    <td className="p-4 text-gray-400 border-r border-white/5">{row.eleven}</td>
                    <td className="p-4 text-gray-400 border-r border-white/5">{row.retell}</td>
                    <td className="p-4 text-gray-400">{row.bland}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            12. ROI METRICS (Business Impact / Count Ups)
           ========================================== */}
        <div id="roi_metrics" className="mb-24 scroll-mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { metric: "80% REDUCTION", label: "In Manual Call Staffing", desc: "Replace repetitive outbound confirmations with custom dialed bots." },
              { metric: "24×7 ACTIVE", label: "Availability Uptime", desc: "Zero missed appointments or patient bookings during offline slots." },
              { metric: "3X INCREASE", label: "Qualified Leads Ratio", desc: "Dial back form leads in under 45 seconds to score hot prospects." },
              { metric: "40% FASTER", label: "Operational Response Speed", desc: "No queues or holding lines. Instant answers in under 800ms." }
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-2xl border text-center ${
                darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200'
              }`}>
                <span className="text-xs font-mono text-[#00C2FF] uppercase block mb-2">Metrics</span>
                <h3 className="text-2xl font-black text-white font-mono tracking-tight leading-none">{item.metric}</h3>
                <h4 className="text-xs font-bold text-gray-300 mt-2">{item.label}</h4>
                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            13. PRICING PLANS
           ========================================== */}
        <div id="pricing" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest">Pricing Strategy</span>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              Flexible Pricing
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              No long commitments. Choose a volume scale plan that matches your operations, paying only raw carrier call fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "₹9,999", popular: false, features: ["Inbound Voice Agent", "Basic Analytics Dashboard", "HubSpot CRM Integration", "Single Call Trunk Pipeline"] },
              { name: "Growth", price: "₹24,999", popular: true, features: ["Inbound + Outbound Agents", "Appointment Booking Calendars", "Advanced Sentiment Analytics", "Sovereign n8n Webhook Node", "BYOC Telephony Integration"] },
              { name: "Enterprise", price: "Custom", popular: false, features: ["Custom AI Agent Synthesis", "Multi-language Dialect Support", "Proprietary Knowledge Base Scrapers", "Dedicated DevOps Setup Support", "Unlimited Concurrent Call Trunks"] }
            ].map((plan, i) => (
              <div key={i} className={`p-6 rounded-2xl border flex flex-col justify-between relative ${
                plan.popular 
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 shadow-[0_0_20px_rgba(139,92,246,0.15)]' 
                  : (darkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200')
              }`}>
                {plan.popular && (
                  <span className="absolute top-[-11px] left-1/2 translate-x-[-50%] px-3 py-1 bg-[#8B5CF6] text-white text-[9px] font-mono uppercase rounded-full font-bold">
                    MOST POPULAR
                  </span>
                )}
                <div>
                  <h4 className="text-sm font-bold text-white">{plan.name}</h4>
                  <p className="text-2xl font-black text-white mt-4 font-mono">
                    {plan.price}<span className="text-xs font-normal text-gray-500">{plan.price !== 'Custom' && '/month'}</span>
                  </p>
                  
                  <ul className="space-y-2.5 mt-6 border-t border-white/5 pt-6 text-xs text-gray-400">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="#demo_form" 
                  className={`w-full py-2.5 rounded text-center text-xs font-bold block mt-8 transition-all ${
                    plan.popular 
                      ? 'bg-[#8B5CF6] text-white hover:bg-[#7c4fe3]' 
                      : 'bg-white/10 text-white hover:bg-white/15 border border-white/5'
                  }`}
                >
                  Select Plan
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            14. FAQ ACCORDION (12 Items)
           ========================================== */}
        <div id="faqs" className="mb-24 scroll-mt-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono text-[#00C2FF] uppercase tracking-widest">Support Guidelines</span>
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Clear up questions on latency, carrier registration rules, custom voice cloning pipelines, and HIPAA compliance policies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2">
            {faqsList.map((faq, i) => {
              const isOpen = faqStates[i] || false;
              return (
                <div key={i} className={`border rounded-xl transition-all ${
                  darkMode ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-white'
                }`}>
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-white transition-all focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00C2FF]' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="p-4 border-t border-white/5 text-xs text-gray-400 leading-relaxed bg-black/10">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            15. DEMO BOOKING FORM (n8n Webhook Simulator Logs)
           ========================================= */}
        <div id="demo_form" className="mb-24 scroll-mt-12 max-w-3xl mx-auto">
          <div className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden backdrop-blur-md ${
            darkMode ? 'bg-[#0E1524]/60 border-white/10 animate-pulse-subtle' : 'bg-white border-slate-200 shadow-2xl'
          }`}>
            <div className="absolute top-0 right-0 h-40 w-40 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-40 w-40 bg-[#00C2FF]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">INBOUND WORKFLOW CAPTURE</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display mt-1 tracking-tight text-white">
                Book Your AI Voice Demo
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed mt-1">
                Fill in details to lock your customized consultant blueprint, and witness GHL lead ingestion logs instantly in our integrated sandbox console!
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h3 className="text-base font-bold font-display text-white">Dynamic GHL Capture Successfully Synced!</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  Your lead file is validated. An automated calling specialist (Aria / Ethan model) will dial your verified contact number in under 45 seconds to confirm calendar slots.
                </p>

                {/* Simulated JSON webhook logs */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/5 text-left max-w-lg mx-auto font-mono text-[9px] leading-relaxed text-[#00C2FF] overflow-x-auto">
                  <span className="text-gray-500 block mb-2">// n8n WEBHOOK DISPATCH SCHEMA Logs:</span>
                  <p className="text-gray-400">POST https://n8n.natton.digital/v1/webhooks/catch</p>
                  <pre className="mt-2 text-emerald-400">
                    {`{
  "event": "gmc_voice_demo_requested",
  "timestamp": "${new Date().toISOString()}",
  "source": "Solution Page AI Callers",
  "lead": {
    "name": "${formData.fullName || 'Verified Client'}",
    "company": "${formData.companyName || 'Apollo Biotech'}",
    "email": "${formData.email || 'partner@apollo.com'}",
    "phone": "${formData.phone || '+91 98765 43210'}",
    "industry": "${formData.industry}",
    "use_case": "${formData.preferredUseCase}"
  },
  "pipeline_routing": {
    "ghl_opportunity_id": "opp_v83021",
    "dialer_trigger": "immediate_outbound_dial_45s"
  }
}`}
                  </pre>
                </div>

                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      fullName: '',
                      companyName: '',
                      email: '',
                      phone: '',
                      country: 'India',
                      industry: 'Healthcare',
                      monthlyCalls: '1,000 - 5,000',
                      preferredUseCase: 'Lead Qualification',
                      currentSystem: 'Manual calling by staff',
                      message: ''
                    });
                  }}
                  className="px-5 py-2 rounded bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-all border border-white/5"
                >
                  Book Another Demo
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#00C2FF] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Company Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#00C2FF] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Business Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#00C2FF] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#00C2FF] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#00C2FF] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#00C2FF] transition-all ${
                        darkMode ? 'bg-dark border-white/10 text-white' : 'bg-white border-gray-200'
                      }`}
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Retail / E-commerce">Retail / E-commerce</option>
                      <option value="Finance">Finance</option>
                      <option value="Professional Services">Professional Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Monthly Call Volume</label>
                    <select
                      value={formData.monthlyCalls}
                      onChange={(e) => setFormData({ ...formData, monthlyCalls: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#00C2FF] transition-all ${
                        darkMode ? 'bg-dark border-white/10 text-white' : 'bg-white border-gray-200'
                      }`}
                    >
                      <option value="1,000 - 5,000">1,000 - 5,000</option>
                      <option value="5,000 - 20,000">5,000 - 20,000</option>
                      <option value="> 20,000">Over 20,000 calls</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Preferred Use Case</label>
                    <select
                      value={formData.preferredUseCase}
                      onChange={(e) => setFormData({ ...formData, preferredUseCase: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#00C2FF] transition-all ${
                        darkMode ? 'bg-dark border-white/10 text-white' : 'bg-white border-gray-200'
                      }`}
                    >
                      <option value="Lead Qualification">Inbound Lead Qualification</option>
                      <option value="Appointment Booking">Appointment Booking Coordinator</option>
                      <option value="FAQ Handling / Support">Customer FAQ & Support</option>
                      <option value="Unpaid Collections">Unpaid Billing Collections</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Current Telephony System</label>
                    <input
                      type="text"
                      value={formData.currentSystem}
                      onChange={(e) => setFormData({ ...formData, currentSystem: e.target.value })}
                      placeholder="e.g. Twilio, RingCentral, Manual dialing"
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#00C2FF] transition-all ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Message / Requirements</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on integrations or call scripting goals..."
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-[#00C2FF] transition-all ${
                      darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200'
                    }`}
                  />
                </div>

                {/* Captcha puzzle */}
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                    <span>Prove you are human:</span>
                    <strong className="text-[#00C2FF] text-sm font-black">{captchaNum1} + {captchaNum2} = ?</strong>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <input
                      type="number"
                      placeholder="Answer"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className={`p-1.5 text-xs text-center rounded focus:outline-none border w-24 ${
                        darkMode ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-gray-200'
                      }`}
                    />
                    {captchaVerified ? (
                      <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded">
                        ✓ Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleCaptchaVerify}
                        className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] font-mono font-bold rounded"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !captchaVerified}
                  className="w-full py-3 bg-gradient-to-r from-[#8B5CF6] to-[#00C2FF] disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg hover:shadow-[#8B5CF6]/20 cursor-pointer"
                >
                  {loading ? 'Dispatching Webhooks...' : 'Request Campaign Growth Strategy Blueprint'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ==========================================
            16. FINAL CTA (Animated wave background network)
           ========================================== */}
        <div id="final_cta" className="relative p-8 sm:p-12 rounded-3xl border overflow-hidden backdrop-blur-md text-center scroll-mt-12 bg-gradient-to-tr from-[#150B3F] via-[#0B0721] to-[#0E1524]">
          {/* Wave animated elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
            <svg className="w-full h-full" viewBox="0 0 800 300" fill="none">
              <motion.path 
                d="M 0 150 Q 200 50 400 150 T 800 150" 
                stroke="#8B5CF6" strokeWidth="2.5"
                animate={{ d: ["M 0 150 Q 200 50 400 150 T 800 150", "M 0 150 Q 200 250 400 150 T 800 150", "M 0 150 Q 200 50 400 150 T 800 150"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path 
                d="M 0 150 Q 200 200 400 100 T 800 150" 
                stroke="#00C2FF" strokeWidth="1.5"
                animate={{ d: ["M 0 150 Q 200 200 400 100 T 800 150", "M 0 150 Q 200 100 400 200 T 800 150", "M 0 150 Q 200 200 400 100 T 800 150"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white leading-tight">
              Never Miss Another Opportunity
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
              Automate inbound dental queries, real estate qualifies, or customer callbacks instantly at raw carrier rates with sub-800ms latencies.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <a 
                href="#demo_form" 
                className="px-6 py-3 bg-[#8B5CF6] hover:bg-[#7c4fe3] text-white font-semibold rounded-lg text-xs hover:shadow-lg transition-all"
              >
                Book Live Demo
              </a>
              <a 
                href="#demo_form" 
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg text-xs border border-white/5 transition-all"
              >
                Talk To AI Experts
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
