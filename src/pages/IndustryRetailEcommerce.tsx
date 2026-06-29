import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, ShoppingBag, ShoppingCart, Percent, Users, TrendingUp, Search, 
  CheckCircle, ArrowRight, Play, Zap, Star, MessageSquare, Globe, 
  ChevronRight, Check, HelpCircle, ChevronDown, ChevronUp, Send, 
  Sliders, DollarSign, Plus, RefreshCw, Clock, Phone, Shield, 
  Briefcase, Lock, X, Activity, Database, Mail, FileText, 
  CheckCheck, Settings, ArrowUpRight, BarChart3, PieChart, Share2, 
  History, Network, Award, Heart, Gift, MessageCircle, Truck, Repeat
} from 'lucide-react';
import { RoutePath } from '../types';

export default function IndustryRetailEcommerce({ setPath, darkMode }: { setPath: (path: RoutePath) => void; darkMode: boolean }) {
  useEffect(() => {
    document.title = "AI Solutions for Retail, D2C Brands & Ecommerce Businesses | Natton Digital";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ==========================================
  // 3D ECOMMERCE NETWORK CANVAS BACKGROUND
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 650;
    };
    window.addEventListener('resize', handleResize);

    // Grid nodes and connecting lines representing Ecommerce ecosystem
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; type: 'website' | 'crm' | 'whatsapp' | 'agent' | 'payment'; label: string; pulse: number }> = [];
    const coreLabels = ['Shopify Storefront', 'GrowthOS CRM', 'WhatsApp Commerce', 'Cart recovery Agent', 'Razorpay Gateway'];
    const types: ('website' | 'crm' | 'whatsapp' | 'agent' | 'payment')[] = ['website', 'crm', 'whatsapp', 'agent', 'payment'];
    
    // Create random background nodes representing commerce nodes
    for (let i = 0; i < 20; i++) {
      const isCore = i < 5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        type: isCore ? types[i] : (types[Math.floor(Math.random() * types.length)]),
        label: isCore ? coreLabels[i] : `Node_Sensor_${500 + i}`,
        pulse: Math.random() * Math.PI
      });
    }

    // Active purchase data packets flowing through connections
    const packets: Array<{ from: number; to: number; progress: number; speed: number; color: string }> = [];
    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      // Find a close node
      let to = (from + 1) % nodes.length;
      let minDist = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === from) continue;
        const d = Math.hypot(nodes[from].x - nodes[i].x, nodes[from].y - nodes[i].y);
        if (d < minDist && d < 280) {
          minDist = d;
          to = i;
        }
      }
      
      packets.push({
        from,
        to,
        progress: 0,
        speed: 0.004 + Math.random() * 0.008,
        color: Math.random() > 0.6 ? '#10b981' : (Math.random() > 0.3 ? '#8b5cf6' : '#00f5ff') // Emerald, Purple or Blue
      });
    };

    // Pre-spawn some packets
    for (let i = 0; i < 10; i++) {
      spawnPacket();
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw engineering schematic grid lines (Soft Indigo/Steel)
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Update and draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 250) {
            const alpha = (1 - dist / 250) * 0.12;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(i, 1);
          if (packets.length < 15) spawnPacket();
          continue;
        }

        const start = nodes[p.from];
        const end = nodes[p.to];
        if (start && end) {
          const px = start.x + (end.x - start.x) * p.progress;
          const py = start.y + (end.y - start.y) * p.progress;
          
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();

          // Add glow
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // Update and draw nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.015;

        // Bounce off bounds
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const isCore = coreLabels.includes(n.label);
        const pulseSize = Math.sin(n.pulse) * (isCore ? 4 : 2);
        
        if (isCore) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = n.type === 'website' ? '#8b5cf6' : (n.type === 'payment' ? '#10b981' : '#00f5ff');
        }

        // Draw node center
        ctx.fillStyle = n.type === 'website' ? '#8b5cf6' : (n.type === 'payment' ? '#10b981' : '#00f5ff');
        ctx.beginPath();
        ctx.arc(n.x, n.y, isCore ? 6 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw outer ring
        ctx.strokeStyle = n.type === 'website' ? 'rgba(139, 92, 246, 0.25)' : (n.type === 'payment' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(0, 245, 255, 0.25)');
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, (isCore ? 12 : 7) + pulseSize, 0, Math.PI * 2);
        ctx.stroke();

        // Label text
        if (isCore && width > 640) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.font = '500 10px monospace';
          ctx.fillText(n.label, n.x + 15, n.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ==========================================
  // SOLUTIONS BUILT FOR (SEGMENTS)
  // ==========================================
  const segments = [
    { name: 'D2C Brands', desc: 'Unified digital scaling workflows, automated post-purchase communication sequences, and custom customer retention tools.' },
    { name: 'Retail Chains', desc: 'Connect physical outlets with online checkout experiences, offering omnichannel customer lookup and integrated POS pipelines.' },
    { name: 'Shopify Stores', desc: 'Deep native syncing with Shopify Webhooks, auto-updating customer credit profiles and cart abandonment workflows.' },
    { name: 'WooCommerce Stores', desc: 'Scalable REST API links mapping inventory alerts, cart histories, and customized coupon deliveries.' },
    { name: 'FMCG Brands', desc: 'High-frequency loyalty program deployment, QR-code scan campaigns, and direct-to-retailer ordering portals.' },
    { name: 'Fashion Brands', desc: 'Aesthetic shopping recommendations, size consultation sequences, and visual catalog integration via WhatsApp.' },
    { name: 'Beauty Brands', desc: 'Personalized product matching quizzes, repeat replenishment reminders, and automatic review collections.' },
    { name: 'Electronics Stores', desc: 'High-ticket EMI options guidance, technical guarantee registration, and automatic delivery status logs.' }
  ];

  // ==========================================
  // CHALLENGES WE SOLVE (PAIN POINTS)
  // ==========================================
  const painPoints = [
    { title: 'Cart Abandonment', symptom: 'Over 70% of shoppers drop off at checkout without finishing.', cure: 'Deploy multi-stage WhatsApp, Email, & Voice recovery agents offering dynamic discount coupon codes.' },
    { title: 'Low Repeat Purchases', symptom: 'One-time buyers never returning, driving up CAC metrics.', cure: 'Automated predictive replenishment cycles and tailored loyalty campaigns based on past checkout histories.' },
    { title: 'Customer Support Delays', symptom: 'Distributors and buyers waiting hours for order shipping tracking.', cure: 'Autonomous tracking assistants integrated into carrier APIs resolving queries in < 2 seconds.' },
    { title: 'Lead Leakage', symptom: 'Inbound meta ads leads dropped due to slow manual sales follow-ups.', cure: 'Instant AI dialing and automatic WhatsApp catalog sends within 45 seconds of form entry.' },
    { title: 'Poor Customer Retention', symptom: 'Spamming customers with irrelevant emails causing high unsubscribes.', cure: 'Behavior-triggered communication tracks adapting to click-rates, cart values, and item segments.' },
    { title: 'Manual Marketing', symptom: 'Wasting weekly hours designing, splitting, and uploading email groups.', cure: 'GrowthOS™ CRM engine automatically segmenting lists and running predictive target schedules.' },
    { title: 'Low Conversion Rates', symptom: 'Clunky static product pages causing friction and buyer hesitation.', cure: 'Interactive conversational chat funnels taking customers from query directly to payments.' },
    { title: 'Disconnected Systems', symptom: 'Store stats in Shopify, conversations on WhatsApp, customer notes in a spreadsheet.', cure: 'Central GrowthOS™ data-core aligning all distributor, client, and shipping logs into one screen.' }
  ];

  // ==========================================
  // COMMERCE GROWTH BLUEPRINT (INTERACTIVE FUNNEL)
  // ==========================================
  const [activeBlueprintStep, setActiveBlueprintStep] = useState<number>(0);
  const blueprintSteps = [
    { title: '01. Website Storefront', val: 'Fast & Optimized', desc: 'Blazing-fast modern head-start storefront built to load instantly, preventing visitor bounces and maximizing initial intent.' },
    { title: '02. Meta Social Ads', val: 'Targeted Catalog', desc: 'Dynamic Catalog Ads automatically linked with Shopify inventory logs, showing buyers exactly what they recently viewed.' },
    { title: '03. Google Shopping Ads', val: 'PMAX Dominance', desc: 'Targeting purchase-intent keywords and placing items directly in top Google Search Shopping placements.' },
    { title: '04. Product Pages', val: 'Conversational UX', desc: 'Adding AI micro-quizzes, real-time stock scarcity, and interactive sizing consulting overlays.' },
    { title: '05. GrowthOS™ CRM', val: 'Consolidated Profiles', desc: 'Immediate ingestion of customer details, catalog interest, UTM parameters, and total historical lifetime value.' },
    { title: '06. WhatsApp Commerce', val: 'Direct Payments', desc: 'Providing catalogs, order summaries, and secure UPI payment options directly inside WhatsApp chat screens.' },
    { title: '07. Cart Recovery', val: 'Autonomous Recall', desc: 'Predictive triggers calling or texting buyers with limited-time customized discount voucher codes.' },
    { title: '08. Seamless Purchase', val: 'Razorpay / Stripe', desc: 'High-speed payment checkout integrations with auto-filled coordinates, minimizing friction.' },
    { title: '09. VIP Loyalty Loop', val: 'Replenishment SMS', desc: 'Automatic reminder schedules dispatched right when their product is predicted to run low.' }
  ];

  // ==========================================
  // CUSTOMER ACQUISITION ENGINE (TAB & SIMULATED REVENUE)
  // ==========================================
  const [activeMktTab, setActiveMktTab] = useState<'meta' | 'google' | 'seo'>('meta');
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (demoPlaying) {
      interval = setInterval(() => {
        setDemoProgress(p => {
          if (p >= 100) {
            setDemoPlaying(false);
            return 0;
          }
          return p + 2;
        });
      }, 100);
    } else {
      setDemoProgress(0);
    }
    return () => clearInterval(interval);
  }, [demoPlaying]);

  const marketingSuite = {
    meta: {
      metrics: [{ l: 'Weekly Ad Sales', v: '₹14,84,000' }, { l: 'Average ROAS', v: '4.82x' }, { l: 'Meta CTR', v: '3.42%' }],
      campaigns: [
        { name: 'D2C Top-of-Funnel Broad Prospecting', budget: '₹1,50,000', sales: '₹7,80,000', roas: '5.2x' },
        { name: 'Dynamic Catalog Retargeting (DPAs)', budget: '₹60,000', sales: '₹3,54,000', roas: '5.9x' },
        { name: 'Lookalike 2% Purchase Intent Segment', budget: '₹80,000', sales: '₹3,50,000', roas: '4.38x' }
      ]
    },
    google: {
      metrics: [{ l: 'PMAX Daily Clicks', v: '4,102' }, { l: 'Conversion Cost', v: '₹145.00' }, { l: 'Google ROAS', v: '3.90x' }],
      campaigns: [
        { name: 'Google Shopping "best organic shampoo India"', budget: '₹1,20,000', sales: '₹4,92,000', roas: '4.1x' },
        { name: 'PMAX Premium Grooming Set Keywords', budget: '₹90,000', sales: '₹3,42,000', roas: '3.8x' },
        { name: 'Brand Search Term Defense Campaign', budget: '₹30,000', sales: '₹1,26,000', roas: '4.2x' }
      ]
    },
    seo: {
      metrics: [{ l: 'Organic Monthly Visits', v: '84,200' }, { l: 'Organic Cart Values', v: '₹1,420' }, { l: 'AEO Answer Share', v: '48.5%' }],
      campaigns: [
        { name: 'ChatGPT: "safest skin cosmetics online"', budget: 'Organic SEO', sales: '₹3,40,000', roas: 'High-Yield' },
        { name: 'Perplexity: "durable noise canceling headphones"', budget: 'Organic SEO', sales: '₹2,90,000', roas: 'High-Yield' },
        { name: 'Google Organic: Top 3 Collections Page Ranking', budget: 'Organic SEO', sales: '₹6,12,000', roas: 'High-Yield' }
      ]
    }
  };

  // ==========================================
  // AGENTICOS™ 3D AI AGENT NETWORK
  // ==========================================
  const [activeAgent, setActiveAgent] = useState('recommendation');
  const agents = [
    { id: 'recommendation', name: 'Product Recommendation Agent', role: 'Analyzes user scroll clicks, cart sizes, and past preferences to recommend the exact matching upsell items, increasing average order value (AOV).', trigger: 'ON_PRODUCT_PAGE_LOAD -> fetch_user_history() AND run_cross_sell_matrix()' },
    { id: 'recovery', name: 'Cart Recovery Agent', role: 'Monitors left carts, tracks checkout page exit behaviors, and automatically dispatches customized WhatsApp coupon alerts in 15 minutes.', trigger: 'ON_CART_ABANDONED -> wait(15m) AND dispatch_whatsapp_discount()' },
    { id: 'support', name: 'Customer Support Agent', role: 'Instantly answers common queries regarding item availability, dimensions, materials, shipping options, and returns policy.', trigger: 'ON_CUSTOMER_QUESTION -> query_kb_store() AND formulate_natural_response()' },
    { id: 'loyalty', name: 'VIP Loyalty Agent', role: 'Flags high-value buyers, tracks milestone achievements, and auto-dispatches anniversary surprise rewards and invitations.', trigger: 'ON_MILESTONE_REACHED -> award_custom_badge() AND send_surprise_discount()' },
    { id: 'review', name: 'Review Collection Agent', role: 'Follows up 5 days post-delivery to capture customer ratings. Prompts happy buyers for Google/Shopify reviews and alerts team to negative feedback.', trigger: 'ON_5_DAYS_POST_DELIVERY -> send_interactive_rating_survey()' },
    { id: 'tracking', name: 'Order Tracking Agent', role: 'Links with Shiprocket/Delhivery systems to send live WhatsApp shipping coordinates, delivery estimations, and delayed notifications.', trigger: 'ON_SHIPPING_STATUS_CHANGE -> query_carrier_api() AND notify_buyer_whatsapp()' }
  ];

  // ==========================================
  // CONVERSATIONAL COMMERCE INTERACTIVE FLOW
  // ==========================================
  const [activeConvStep, setActiveConvStep] = useState(0);
  const convFlow = [
    { title: '1. Customer Query', detail: 'Buyer messages WhatsApp: "Looking for an eye cream that helps with dark circles."' },
    { title: '2. AI WhatsApp Bot', detail: 'AI instantly replies: "Our Vitamin C Coffee Serum is highly rated for dark circles! Here is a 1-minute video breakdown of clinical trial results."' },
    { title: '3. AI Recommendation', detail: 'Bot provides an interactive catalog card with a "Buy Now" button and a limited 15% discount coupon pre-applied.' },
    { title: '4. Direct Payment Link', detail: 'Customer clicks to pay directly inside WhatsApp via integrated UPI/Razorpay link in 3 clicks.' },
    { title: '5. Order Confirmed', detail: 'System issues a dynamic receipt, locks a Shiprocket label, and queues a post-purchase welcome sequence.' }
  ];

  // ==========================================
  // INFINITE LOGO CAROUSEL LOGOS
  // ==========================================
  const integrationLogos = ['Shopify', 'WooCommerce', 'Razorpay', 'Stripe', 'WhatsApp Commerce', 'Google Analytics', 'Meta Pixel', 'HubSpot ERP', 'n8n Webhook'];

  // ==========================================
  // REVENUE INTELLIGENCE DASHBOARD (RECHARTS REPLACEMENT)
  // ==========================================
  const [activeMetricTab, setActiveMetricTab] = useState<'revenue' | 'ltv' | 'retention'>('revenue');
  const metricsData = {
    revenue: {
      val: '₹24,82,400',
      change: '+38.2% from last month',
      desc: 'Monthly online sales optimized through automated WhatsApp recovery & customized loyalty prompts.',
      points: [120, 160, 140, 210, 248], // data points to plot in custom SVG
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    },
    ltv: {
      val: '₹4,850',
      change: '+24.6% since Natton onboarding',
      desc: 'Average customer lifetime value over a 6-month cycle driven by customized repeat product recommendations.',
      points: [310, 340, 390, 440, 485],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    },
    retention: {
      val: '42.8%',
      change: '+18.4% improvement rate',
      desc: 'Percentage of clients completing more than 2 distinct checkouts, tracked by GrowthOS™ CRM.',
      points: [22, 25, 29, 36, 42.8],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    }
  };

  // ==========================================
  // REVENUE GROWTH CALCULATOR
  // ==========================================
  const [monthlyOrders, setMonthlyOrders] = useState<number>(2500);
  const [avgOrderVal, setAvgOrderVal] = useState<number>(1200); // ₹1,200 avg
  const [convRate, setConvRate] = useState<number>(1.8); // 1.8% current conversion
  const [mktSpend, setMktSpend] = useState<number>(150000); // ₹1.5 Lakh monthly spend

  // Math
  const curRevenue = monthlyOrders * avgOrderVal;
  
  // Natton Digital optimizations boost conversions to 3.8% and average repeat rates
  const optimizedConvRate = Math.min(6.5, convRate * 2.2);
  const expectedOrders = Math.round(monthlyOrders * (optimizedConvRate / convRate));
  const expectedRevenue = expectedOrders * avgOrderVal;
  const addedRevenue = expectedRevenue - curRevenue;

  // Repeat purchases estimation (Natton increases repeat purchases from 12% average to 31%)
  const curRepeats = Math.round(monthlyOrders * 0.12);
  const optRepeats = Math.round(expectedOrders * 0.31);
  const extraRepeats = optRepeats - curRepeats;

  // ROI Percentage
  const netFinancialGain = addedRevenue + (extraRepeats * avgOrderVal);
  const autoROI = Math.round((netFinancialGain / mktSpend) * 100);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // ==========================================
  // CASE STUDIES / RETAIL SUCCESS STORIES
  // ==========================================
  const [carouselIdx, setCarouselIdx] = useState(0);
  const caseStudies = [
    {
      type: 'Fashion Brand',
      company: 'Vogue&Co Threads',
      metric: '340% Boost in Cart Recoveries',
      impact: 'Replaced slow automated email alerts with high-converting interactive WhatsApp coupon guides.',
      results: [
        { label: 'Abandoned Cart Recovery Rate', before: '3.2%', after: '14.8%' },
        { label: 'Average Customer Order Value', before: '₹1,450', after: '₹2,100' },
        { label: 'Attributed WhatsApp Revenue', before: '₹0', after: '₹8.4 Lakh/Mo' }
      ]
    },
    {
      type: 'Beauty Brand',
      company: 'Aura Organic Cosmetics',
      metric: '48% Jump in Repeat Purchases',
      impact: 'Configured automated skin-type quizzes that automatically trigger replenishment loops.',
      results: [
        { label: 'Customer Retention Rate', before: '14%', after: '38%' },
        { label: 'Email Campaign Click Rates', before: '1.8%', after: '8.4%' },
        { label: 'Annual Re-order Lifetime Value', before: '₹2,800', after: '₹7,950' }
      ]
    },
    {
      type: 'Electronics Store',
      company: 'VoltAudio India',
      metric: '5.2x ROAS on Meta Channels',
      impact: 'Connected local shopify checkout events to Meta APIs using n8n server pipelines.',
      results: [
        { label: 'Cost Per Purchase (CAC)', before: '₹480', after: '₹190' },
        { label: 'Sales Campaign Conversions', before: '1.2%', after: '4.1%' },
        { label: 'Weekly Scaled Revenue', before: '₹3.4 Lakh', after: '₹18.2 Lakh' }
      ]
    },
    {
      type: 'D2C Startup',
      company: 'SuperFoods SuperPacks',
      metric: '100% Support Query Automation',
      impact: 'Deployed AgenticOS™ order-tracking assistants connected with Shiprocket API registers.',
      results: [
        { label: 'Avg Customer Resolution Speed', before: '4 hrs', after: '< 3 seconds' },
        { label: 'Pending Ticket Volumes', before: '180/day', after: '0/day' },
        { label: 'Weekly Support Admin Hours Saved', before: '24 hours', after: '0 hours' }
      ]
    }
  ];

  // ==========================================
  // 15 FREQUENTLY ASKED QUESTIONS
  // ==========================================
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const faqList = [
    { q: 'How does the WhatsApp cart recovery flow operate?', a: 'When a customer leaves an item in their cart without paying, Shopify fires a webhook to GrowthOS™. Within 15 minutes, our system automatically dispatches an interactive WhatsApp reminder with an embedded coupon and quick-payment link.' },
    { q: 'Can we sync this platform with our existing Shopify or WooCommerce stores?', a: 'Yes! We configure secure, zero-latency integrations with Shopify, WooCommerce, Magento, and custom headless storefronts in under 48 hours.' },
    { q: 'How does the Product Recommendation Agent know what to upsell?', a: 'Our agent monitors customer checkout history, item category trends, and real-time page interactions to present hyper-relevant, high-probability cross-sell items.' },
    { q: 'Is there a risk of spamming customers on WhatsApp?', a: 'No. Our automated system limits message frequencies, respects buyer opt-out triggers, and only schedules reminders when click-intent is high.' },
    { q: 'Does it support Indian payment systems like Razorpay and PhonePe?', a: 'Yes. We build native links to Razorpay, Cashfree, PhonePe, and Paytm, enabling instant one-click UPI checkouts directly inside messaging screens.' },
    { q: 'What is the setup time for the Customer Acquisition Engine?', a: 'Standard Meta and Google Shopping ad configurations go live within 72 hours. Deeper API alignments are completed in 10-14 days.' },
    { q: 'Is our customer checkout data secure?', a: 'Absolutely. We utilize high-grade TLS 1.3 encryption and adhere to GDPR and SOC2 standards to protect customer contact databases.' },
    { q: 'How does predictive replenishment scheduling work?', a: 'If a buyer purchases a 30-day supply of vitamins, our CRM queues an automated friendly WhatsApp reminder at day 25 offering a one-click replenishment discount.' },
    { q: 'Do you configure the Meta Conversions API (CAPI)?', a: 'Yes. We establish direct server-to-server tracking links to bypass iOS ad-blocker restrictions and secure highly accurate conversion attributions.' },
    { q: 'Can we build custom distributor discount levels in the CRM?', a: 'Yes, fully. The GrowthOS™ portal allows builders to configure tiered access levels, territorial pricing models, and direct distributor billing ledger limits.' },
    { q: 'How does AI Voice Calling qualify cold leads?', a: 'Our outbound VoIP systems dial list entries, holding human-like conversations to verify business size, delivery timeline, and product specifications before saving them.' },
    { q: 'What carrier networks do you support for shipping tracking?', a: 'We sync with Shiprocket, Delhivery, BlueDart, DHL, FedEx, and over 120 logistics partners globally.' },
    { q: 'Do we need technical developers to manage the dashboards?', a: 'No. GrowthOS™ is fully no-code friendly. We provide continuous maintenance training and video walkthroughs for your marketing team.' },
    { q: 'How are duplicate lead entries filtered in the CRM?', a: 'Duplicate submissions are filtered automatically using customer emails, telephone digits, and store profile registers, merging records into a single contact.' },
    { q: 'Are we locked into a long-term contract?', a: 'We offer flexible month-to-month contracts or discounted annual packages. We aim to prove value to your brand every single billing cycle.' }
  ];

  // ==========================================
  // LEAD CONSULTATION FORM STATE & webhook simulation
  // ==========================================
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formPlatform, setFormPlatform] = useState('Shopify');
  const [formCountry, setFormCountry] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formOrders, setFormOrders] = useState('500 - 2,000');
  const [formChallenges, setFormChallenges] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValues, setCaptchaValues] = useState({ num1: 0, num2: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    setCaptchaValues({
      num1: Math.floor(Math.random() * 8) + 2,
      num2: Math.floor(Math.random() * 8) + 2
    });
  }, []);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== (captchaValues.num1 + captchaValues.num2)) {
      alert('Verification captcha code is incorrect. Please compute again.');
      return;
    }
    setIsSubmitting(true);
    setTerminalLogs([
      '⚡ Intercepting D2C/Ecommerce procurement lead payload...',
      '📡 Parsing variable maps to GoHighLevel (GHL) schema...',
      '🔗 Firing secure n8n webhook node integration...',
      '📦 Synchronizing target Shopify metadata parameters...'
    ]);

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        '📊 Synced! Recorded CRM Contact ID: GHL_ECOMM_4920',
        '💬 Dispatched D2C growth portfolio via WhatsApp API.'
      ]);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
    }, 1800);
  };

  return (
    <div className="bg-[#0b081e] text-slate-100 min-h-screen py-8 overflow-hidden relative selection:bg-purple-600 selection:text-white">
      
      {/* Background radial atmosphere gradients - Purple, Electric Blue & Emerald */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-5 right-20 w-[650px] h-[650px] bg-emerald-950/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-xs font-mono text-slate-500 flex items-center gap-1.5 border-b border-slate-900 pb-4">
          <button onClick={() => setPath('home')} className="hover:text-purple-400 transition-colors">Home</button> 
          <span>/</span> 
          <span className="text-slate-400">Industries</span> 
          <span>/</span> 
          <span className="text-purple-400 font-semibold font-mono">Retail & Ecommerce</span>
        </div>

        {/* ==========================================
            HERO SECTION
           ========================================== */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 relative min-h-[580px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden -z-20 border border-purple-950/40 bg-slate-950/70">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-90" />
          </div>

          <div className="lg:col-span-7 space-y-6 z-10 p-6 sm:p-10 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-purple-400 font-bold">
                Shopify & Klaviyo Automation Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight">
              AI-Powered Growth For <br />
              <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Retail & Ecommerce Brands
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-slate-400 max-w-2xl">
              Acquire more customers, recover abandoned carts and increase repeat purchases with AI-powered commerce solutions. Positioned natively inside your store, chat pipelines, and marketing suite.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#lead_form" 
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-extrabold rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                Book Free Consultation <ArrowRight className="h-4 w-4 text-white" />
              </a>
              <a 
                href="#blueprint" 
                className="px-6 py-3 rounded-lg border border-slate-800 bg-slate-950/40 hover:bg-slate-900 hover:border-purple-400 transition-all flex items-center gap-2 text-sm font-semibold"
              >
                Explore Growth Blueprint
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 text-[10px] font-mono text-slate-500 border-t border-slate-900">
              <span className="flex items-center gap-1.5 text-purple-400">● 100% Shopify Certified</span>
              <span className="flex items-center gap-1.5 text-cyan-400">● Live Shiprocket Tracking Sync</span>
              <span className="flex items-center gap-1.5 text-emerald-400">● Safe Data Encryption</span>
            </div>
          </div>

          {/* Interactive 3D Ecommerce Ecosystem HUD */}
          <div className="lg:col-span-5 p-1 relative min-h-[420px] z-10 text-left">
            <div className="h-full w-full rounded-2xl border border-purple-900/30 bg-slate-950/80 backdrop-blur-md p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl" />
              <div>
                <div className="flex justify-between items-center border-b border-purple-900/20 pb-2.5 mb-4">
                  <span className="text-[10px] font-mono uppercase text-purple-400 flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 animate-pulse text-purple-400" /> Commerce Ecosystem HUD
                  </span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold">SYSTEM ACTIVE</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                  This interactive interface shows live connections between your Storefront, CRM, WhatsApp, AI Agents, and payment logs.
                </p>
              </div>

              {/* Dynamic Interactive Flow Simulation */}
              <div className="space-y-3 bg-purple-950/10 rounded-xl border border-purple-950/20 p-4 relative z-10">
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 border-b border-purple-950/20 pb-1">
                  <span>LIVE TRANSACTION STREAM</span>
                  <span className="text-emerald-400">99.98% SUCCESS RATE</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-slate-950 border border-purple-950/50">
                    <span className="text-purple-400 block text-[9px] uppercase">Storefront</span>
                    <span className="text-slate-300 font-semibold truncate block">Shopify Cart Logged</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-purple-950/50">
                    <span className="text-cyan-400 block text-[9px] uppercase">WhatsApp Agent</span>
                    <span className="text-slate-300 font-semibold truncate block">Dispatched Recall Msg</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-purple-950/50">
                    <span className="text-emerald-400 block text-[9px] uppercase">Razorpay</span>
                    <span className="text-slate-300 font-semibold truncate block">UPI Transaction O.K.</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-purple-950/50">
                    <span className="text-amber-400 block text-[9px] uppercase">GrowthOS™ CRM</span>
                    <span className="text-slate-300 font-semibold truncate block">Profiles Merged</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1"><ShoppingBag className="h-3 w-3 text-purple-400" /> Gateway Status</span>
                  <span className="text-emerald-400 font-bold">Razorpay API Live</span>
                </div>
              </div>

              {/* Inspiration list */}
              <div className="mt-4 p-3 rounded-lg bg-purple-950/5 border border-purple-900/15">
                <h4 className="text-xs font-bold text-slate-200 font-display flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  Premium Enterprise Architecture
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Our designs are inspired by the seamless commerce experiences of world-class leaders like Shopify, Klaviyo, Amazon, and Nike.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SEGMENTS Section: "Solutions Built For"
           ========================================== */}
        <div id="segments" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Solutions Built For</span>
            <h2 className="text-3xl font-bold font-display">Target Commerce Segments</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Our automated setups are custom-configured to accommodate the unique requirements of diverse retail divisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {segments.map((seg, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-purple-950/30 bg-purple-950/5 hover:border-purple-500/30 transition-all hover:translate-y-[-2px] flex flex-col justify-between group">
                <div>
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-purple-500/20">
                    <ShoppingBag className="h-4 w-4 text-purple-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 mb-1.5 font-display">{seg.name}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{seg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            PAIN POINTS Section: "Challenges We Solve"
           ========================================== */}
        <div id="pain_points" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Commerce Bottlenecks</span>
            <h2 className="text-3xl font-bold font-display">Ecommerce Challenges We Resolve</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              How Natton Digital replaces cart leakage and marketing friction with high-yield automated engines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {painPoints.map((p, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-purple-950/30 bg-purple-950/5 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 h-1 w-0 bg-purple-500 transition-all group-hover:w-full" />
                <div>
                  <h3 className="text-xs font-bold text-slate-200 mb-3 border-b border-purple-950/20 pb-1.5 flex items-center gap-1.5 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {p.title}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[8px] font-mono text-rose-400 uppercase tracking-wider block">Symptom</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{p.symptom}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-wider block">Natton Solution</span>
                      <p className="text-[10px] text-slate-300 mt-0.5 font-medium">{p.cure}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            GROWTH BLUEPRINT (INTERACTIVE FUNNEL)
           ========================================== */}
        <div id="blueprint" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Blueprint Funnel</span>
            <h2 className="text-3xl font-bold font-display">Commerce Growth Blueprint</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Follow our fully integrated digital funnel, showing the systematic conversion of a visitor to a loyal repeat VIP customer. Click on any block to explore details:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-5 space-y-2">
              {blueprintSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBlueprintStep(idx)}
                  className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                    activeBlueprintStep === idx 
                      ? 'border-purple-500 bg-purple-500/5 shadow-[0_0_15px_rgba(139,92,246,0.15)] text-white' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-semibold font-mono">{step.title}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${activeBlueprintStep === idx ? 'bg-purple-500 text-white font-bold' : 'bg-slate-900 text-slate-400'}`}>
                    {step.val}
                  </span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[250px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-purple-900/10 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase">ACTIVE PIPELINE STATUS</span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> STEP {activeBlueprintStep + 1} OF 9
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-display text-white">
                    {blueprintSteps[activeBlueprintStep].title.split('. ')[1]}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {blueprintSteps[activeBlueprintStep].desc}
                  </p>
                </div>
              </div>

              {/* SVG connection representation */}
              <div className="mt-8 pt-4 border-t border-purple-900/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Input: Shopify Store Session</span>
                <span className="text-purple-400">⚡ Direct Node Connect</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            AI GROWTH MARKETING & REVENUE DASHBOARD
           ========================================== */}
        <div id="ai_growth_marketing" className="mb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">01 / Acquisition Suite</span>
            <h2 className="text-3xl font-bold font-display">Customer Acquisition Engine</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unify Meta catalog ads, Google PMAX search feeds, and answer-engine SEO optimizations into a singular pipeline driving high-value traffic directly to your D2C store checkout.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {['Meta Ads', 'Google Shopping Ads', 'SEO & AEO', 'Email Marketing', 'Content Marketing', 'Social Commerce'].map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/40 flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-purple-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 p-1 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-transparent rounded-2xl">
            <div className="p-6 rounded-2xl border border-purple-950/40 bg-slate-950/90 shadow-2xl space-y-6">
              
              {/* simulated screen recording header */}
              <div className="flex justify-between items-center border-b border-purple-900/10 pb-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-400" /> Meta & Google ROAS Monitor
                  </h3>
                  <p className="text-[10px] text-slate-400">Simulating live GHL API conversions</p>
                </div>
                
                <div className="flex gap-1.5">
                  {(['meta', 'google', 'seo'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveMktTab(tab)}
                      className={`px-3 py-1 rounded text-[9px] font-mono font-bold uppercase transition-all ${
                        activeMktTab === tab 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* metrics bar */}
              <div className="grid grid-cols-3 gap-4">
                {marketingSuite[activeMktTab].metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-purple-950/5 border border-purple-950/25 text-left">
                    <span className="text-[9px] font-mono text-slate-400 block">{m.l}</span>
                    <span className="text-lg font-extrabold text-white mt-1 block">{m.v}</span>
                  </div>
                ))}
              </div>

              {/* active campaigns logs */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">Active Campaigns Log</h4>
                <div className="space-y-2">
                  {marketingSuite[activeMktTab].campaigns.map((camp, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-900 flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-xs">{camp.name}</span>
                      <div className="flex gap-6 text-right">
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">Budget</span>
                          <span className="text-slate-300">{camp.budget}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">Sales</span>
                          <span className="text-emerald-400 font-bold">{camp.sales}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">ROAS</span>
                          <span className="text-purple-400 font-bold">{camp.roas}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Screen recording interactive simulator */}
              <div className="pt-4 border-t border-purple-900/10 flex justify-between items-center">
                <button 
                  onClick={() => {
                    setDemoPlaying(!demoPlaying);
                    if(!demoPlaying) setDemoProgress(0);
                  }}
                  className="px-4 py-2 rounded bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold flex items-center gap-2 transition-all"
                >
                  <Play className={`h-3.5 w-3.5 fill-purple-400 ${demoPlaying ? 'animate-ping' : ''}`} />
                  {demoPlaying ? `PLAYING SIMULATOR (${demoProgress}%)` : 'PLAY SCREEN RECORDING DEMO'}
                </button>
                <span className="text-[9px] font-mono text-slate-500">API Sync: 0.2s latency</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            GROWTHOS™ FOR ECOMMERCE
           ========================================== */}
        <div id="growthos" className="mb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-7 order-2 lg:order-1 p-1 bg-gradient-to-r from-transparent via-emerald-500/5 to-purple-500/10 rounded-2xl">
            <div className="p-6 rounded-2xl border border-purple-950/40 bg-slate-950/90 shadow-2xl space-y-6">
              
              {/* Header */}
              <div className="flex justify-between items-center border-b border-purple-900/10 pb-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Database className="h-4 w-4 text-emerald-400" /> GrowthOS™ Central CRM
                  </h3>
                  <p className="text-[10px] text-slate-400">Consolidating distributor & retail checkout records</p>
                </div>
                <span className="text-[9px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  REFRESHED: JUST NOW
                </span>
              </div>

              {/* CRM Lead profile mockup */}
              <div className="p-4 rounded-xl bg-slate-950 border border-purple-950/40 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">
                      KG
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">Kunal Gupta (D2C Buyer)</h4>
                      <span className="text-[9px] font-mono text-slate-400">kunal.g@gmail.com | +91 98102 XXXXX</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    LTV: ₹18,400
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-[9px] font-mono">
                  <div className="p-2.5 rounded bg-purple-950/5 border border-purple-950/15">
                    <span className="text-slate-500 block">Total Orders</span>
                    <span className="text-slate-200 font-semibold text-xs mt-0.5 block">5 Orders</span>
                  </div>
                  <div className="p-2.5 rounded bg-purple-950/5 border border-purple-950/15">
                    <span className="text-slate-500 block">Acquisition channel</span>
                    <span className="text-slate-200 font-semibold text-xs mt-0.5 block">Meta Instagram DPA</span>
                  </div>
                  <div className="p-2.5 rounded bg-purple-950/5 border border-purple-950/15">
                    <span className="text-slate-500 block">Current Status</span>
                    <span className="text-emerald-400 font-semibold text-xs mt-0.5 block">Active Subscriber</span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-purple-900/10 pt-3">
                  <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider block">Recent Touchpoints Log</span>
                  <div className="space-y-1.5 text-[9px] font-mono text-slate-400">
                    <p className="flex justify-between">
                      <span>✓ Shopify Webhook Order #10943 Locked</span>
                      <span className="text-slate-500">2 hours ago</span>
                    </p>
                    <p className="flex justify-between">
                      <span>✓ Replenishment cycle alert SMS scheduled</span>
                      <span className="text-slate-500">2 hours ago</span>
                    </p>
                    <p className="flex justify-between text-purple-400">
                      <span>✓ Cart recovery WhatsApp auto-resolved</span>
                      <span className="text-slate-500">Yesterday</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* capabilities text */}
              <p className="text-[10px] font-mono text-slate-500 leading-relaxed text-center">
                Fully integrates Shopify webhooks, meta advertising parameters, and billing ledger cards.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">02 / CRM Hub</span>
            <h2 className="text-3xl font-bold font-display">GrowthOS™ For Ecommerce</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consolidate D2C shoppers and offline distributor metrics in one centralized dashboard. Track purchase intervals, map automatic follow-up tags, and schedule targeted campaign sequences effortlessly.
            </p>

            <div className="space-y-3">
              {[
                { title: 'Customer CRM', desc: 'Sovereign database profiles compiling checkout histories, coupon codes, and coordinates.' },
                { title: 'Order Tracking Sync', desc: 'Direct updates pulling from major carrier logistics API frameworks.' },
                { title: 'Visual Sales Pipelines', desc: 'Categorize distributor credits, large bulk inquiries, and special discount requests.' },
                { title: 'Predictive Campaigns', desc: 'Triggers personalized SMS schedules based on previous purchase windows.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            BUSINESSOS™ COMMUNICATION PLATFORM
           ========================================== */}
        <div id="businessos" className="mb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">03 / Omnichannel Commerce</span>
            <h2 className="text-3xl font-bold font-display">BusinessOS™ Communication</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connect directly with customers where they spend their time. Deploys custom WhatsApp Commerce engines, automated voice qualification dialers, and cloud telephony portals under a shared team inbox.
            </p>

            <div className="space-y-4">
              {[
                { t: 'WhatsApp Commerce', d: 'Send digital catalogues, complete payments, and issue receipts inside chat views.' },
                { t: 'AI Voice Dialing', d: 'Autonomous outbound operators call leads to verify buying intentions and logistics.' },
                { t: 'Omnichannel Team Inbox', d: 'Allows support representatives to view SMS, WhatsApp, and email logs in one viewport.' }
              ].map((val, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-purple-500/20 transition-all">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" /> {val.t}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{val.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 p-1 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-transparent rounded-2xl">
            <div className="p-6 rounded-2xl border border-purple-950/40 bg-slate-950/90 shadow-2xl space-y-6">
              
              {/* omni screen mockup */}
              <div className="flex justify-between items-center border-b border-purple-900/10 pb-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-purple-400" /> Omnichannel Team View
                  </h3>
                  <p className="text-[10px] text-slate-400">Live communication logs across all brand channels</p>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  TELEPHONY LINKED
                </span>
              </div>

              <div className="grid grid-cols-12 gap-4">
                {/* Channels side */}
                <div className="col-span-4 space-y-1.5 border-r border-purple-900/10 pr-4">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block mb-2">CHANNELS</span>
                  {[
                    { n: 'WhatsApp CRM', active: true, badge: 'Active' },
                    { n: 'Google Business', active: false, badge: 'Offline' },
                    { n: 'Instagram DM', active: false, badge: 'Active' },
                    { n: 'Cloud Outbound', active: true, badge: 'Dialer Live' }
                  ].map((chan, i) => (
                    <div key={i} className={`p-2 rounded text-[10px] font-mono text-left ${chan.active ? 'bg-purple-950/20 text-purple-300' : 'text-slate-400'}`}>
                      {chan.n}
                      <span className="text-[7px] text-slate-500 block mt-0.5">{chan.badge}</span>
                    </div>
                  ))}
                </div>

                {/* Chats view */}
                <div className="col-span-8 space-y-3 pl-2">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-900 space-y-1.5 text-left text-[10px] font-mono">
                    <span className="text-[8px] text-purple-400 block font-bold">WHATSAPP COMMERCE</span>
                    <p className="text-slate-300">"Looking for an organic cleanser. Do you have a coupon code?"</p>
                    <p className="text-emerald-400">↳ AI Agent resolved: Dispatched catalog + coupon code (15m recovery log).</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-900 space-y-1.5 text-left text-[10px] font-mono">
                    <span className="text-[8px] text-cyan-400 block font-bold">OUTBOUND TELEPHONY</span>
                    <p className="text-slate-300">Dialing lead: +91 99103 XXXXX (Ananya Sen)</p>
                    <p className="text-slate-400">↳ Qualified: Verified credit scale & shipping address.</p>
                  </div>
                </div>
              </div>

              {/* quick actions */}
              <div className="pt-4 border-t border-purple-900/10 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>Integrated with Shiprocket Logistics APIs</span>
                <span className="text-purple-400">💬 Active Inbox</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            AGENTICOS™ FOR ECOMMERCE
           ========================================== */}
        <div id="agenticos" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">AI Agentic Framework</span>
            <h2 className="text-3xl font-bold font-display">AgenticOS™ For Ecommerce</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Our autonomous agents run 24/7 background tasks to recover sales, solve support issues, and capture product reviews. Click on an agent to inspect its trigger logic:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-6 space-y-2">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgent(agent.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    activeAgent === agent.id 
                      ? 'border-purple-500 bg-purple-500/5 shadow-[0_0_15px_rgba(139,92,246,0.1)] text-white' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <h3 className="text-xs font-bold font-mono flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${activeAgent === agent.id ? 'bg-purple-500' : 'bg-slate-700'}`} />
                    {agent.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 pl-4 line-clamp-1">{agent.role}</p>
                </button>
              ))}
            </div>

            <div className="lg:col-span-6 p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md min-h-[300px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-purple-900/10 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase">AI AGENT SPEC SHEET</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">AUTONOMOUS MODULE</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    {agents.find(a => a.id === activeAgent)?.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {agents.find(a => a.id === activeAgent)?.role}
                  </p>
                </div>

                <div className="p-3.5 rounded bg-slate-950 border border-purple-950/50 space-y-1.5 mt-4">
                  <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider block">EXECUTION TRIGGER</span>
                  <code className="text-[10px] font-mono text-slate-300 block bg-slate-900 p-2 rounded break-all">
                    {agents.find(a => a.id === activeAgent)?.trigger}
                  </code>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-purple-900/10 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Core Framework: Node.js + n8n Engine</span>
                <span className="text-purple-400">⚡ Status: Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            ABANDONED CART RECOVERY WORKFLOW
           ========================================== */}
        <div id="cart_recovery" className="mb-28 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Revenue Recovery</span>
            <h2 className="text-3xl font-bold font-display">Abandoned Cart Recovery Flow</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              How our autonomous systems intercept and recover missed checkouts using tailored multi-stage alerts.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch relative z-10">
              {[
                { s: '1. Cart Dropped', d: 'Shopify Checkout is left unfinished.', icon: ShoppingCart, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
                { s: '2. WhatsApp Ping', d: 'Instantly dispatches dynamic cart catalog.', icon: MessageCircle, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
                { s: '3. AI Voice Offer', d: 'Automated call verification with limited coupon.', icon: Phone, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
                { s: '4. Dynamic Coupon', d: 'Auto-adds customized 10% coupon to cart link.', icon: Percent, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
                { s: '5. Cart Recovered', d: 'Payment logs update CRM profiles.', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' }
              ].map((step, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${step.bg} flex flex-col justify-between space-y-3`}>
                  <div className="flex justify-between items-center">
                    <step.icon className={`h-5 w-5 ${step.color}`} />
                    <span className="text-[9px] font-mono text-slate-500">STAGE 0{idx+1}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{step.s}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-lg bg-purple-950/5 border border-purple-900/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-purple-400" /> Compliant with carrier data regulations</span>
              <span className="text-purple-400 font-bold">Est. Recovery Rate: 12% - 18%</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            CONVERSATIONAL COMMERCE
           ========================================== */}
        <div id="conversational_commerce" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Interactive Shopping</span>
            <h2 className="text-3xl font-bold font-display">Conversational Commerce Flow</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              How shoppers interact directly with our WhatsApp business agents, proceeding from inquiry directly to unified UPI payments. Click steps to view:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-6 space-y-3">
              {convFlow.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveConvStep(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex gap-4 items-start ${
                    activeConvStep === idx 
                      ? 'border-purple-500 bg-purple-500/5 shadow-[0_0_15px_rgba(139,92,246,0.1)] text-white' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-mono text-purple-400 shrink-0 font-bold mt-0.5">0{idx+1}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{step.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{step.detail}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Simulated WhatsApp screen phone */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[340px] rounded-[36px] border-4 border-slate-800 bg-slate-950 p-2 shadow-2xl relative overflow-hidden">
                {/* Speaker pill */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 h-4 w-20 bg-slate-800 rounded-full z-20" />
                
                <div className="bg-[#0b0c16] rounded-[28px] h-[480px] overflow-hidden flex flex-col justify-between relative pt-6 text-left">
                  {/* Whatsapp contact banner */}
                  <div className="bg-[#121b22] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-purple-600/30 flex items-center justify-center font-bold text-[10px] text-purple-400">
                        N
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-100">Natton Brand Agent</h4>
                        <span className="text-[7px] font-mono text-emerald-400 block font-bold">Online</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500">Verified</span>
                  </div>

                  {/* Messages body */}
                  <div className="flex-grow p-3 overflow-y-auto space-y-3.5 text-[9px] font-mono">
                    <div className="p-2 rounded bg-slate-900 text-slate-400 max-w-[85%] border border-slate-800">
                      Looking for an organic cleanser. Do you have a coupon code?
                    </div>

                    <div className="p-2 rounded bg-purple-950/20 text-purple-200 max-w-[85%] ml-auto border border-purple-900/30">
                      🌿 Welcome to Aura Cosmetics! Our Organic tea Tree cleanser is perfect for oily skin. Here is your pre-applied code: AURA15 for 15% off. Click below to checkout on UPI instantly.
                    </div>

                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 max-w-[80%] space-y-1 ml-auto">
                      <span className="text-purple-400 font-bold block text-[8px]">UPI TRANSACTION LINK</span>
                      <p className="text-slate-300">Aura Cleanser (₹590)</p>
                      <span className="text-[8px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded block text-center font-bold border border-emerald-500/20 mt-1">
                        [Click to Pay UPI]
                      </span>
                    </div>
                  </div>

                  {/* Message Input bar */}
                  <div className="p-2 bg-[#121b22] border-t border-slate-800 flex items-center gap-1.5">
                    <div className="flex-grow bg-slate-950 rounded-full px-3 py-1.5 text-[9px] text-slate-500">
                      Message...
                    </div>
                    <div className="h-6 w-6 rounded-full bg-[#00a884] flex items-center justify-center">
                      <Send className="h-3 w-3 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            COMMERCE INTEGRATIONS (INFINITE LOGO CAROUSEL)
           ========================================== */}
        <div id="integrations" className="mb-24 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Integrations</span>
            <h3 className="text-lg font-bold font-display">Commerce Integrations</h3>
          </div>

          <div className="w-full overflow-hidden relative py-4 bg-purple-950/5 border-y border-purple-950/25">
            {/* Gradient mask */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b081e] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0b081e] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-16 animate-infinite-scroll whitespace-nowrap">
              {/* Double list for smooth infinite scroll */}
              {[...integrationLogos, ...integrationLogos].map((logo, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span>{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            REVENUE INTELLIGENCE DASHBOARD (INTERACTIVE)
           ========================================== */}
        <div id="analytics_dashboard" className="mb-28 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Live Intelligence</span>
            <h2 className="text-3xl font-bold font-display">Revenue Intelligence Dashboard</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Our automated systems provide continuous business insights. Select tabs below to analyze optimized metrics:
            </p>
          </div>

          <div className="p-1 bg-gradient-to-r from-purple-500/10 via-emerald-500/5 to-transparent rounded-2xl">
            <div className="p-6 sm:p-10 rounded-2xl border border-purple-950/40 bg-slate-950/90 shadow-2xl text-left space-y-8">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple-900/10 pb-6">
                <div>
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">KEY PERFORMANCE INDICATOR</span>
                  <div className="flex items-baseline gap-2.5 mt-1.5">
                    <span className="text-3xl font-extrabold text-white">{metricsData[activeMetricTab].val}</span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">{metricsData[activeMetricTab].change}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{metricsData[activeMetricTab].desc}</p>
                </div>

                <div className="flex gap-1.5 shrink-0">
                  {(['revenue', 'ltv', 'retention'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveMetricTab(tab)}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition-all border ${
                        activeMetricTab === tab 
                          ? 'bg-purple-600 border-purple-500 text-white' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* GORGEOUS HIGH-FIDELITY SVG GRAPH INTERACTIVE REPRESENTATION */}
              <div className="relative py-6 bg-purple-950/5 rounded-xl border border-purple-950/15 flex flex-col items-center justify-center min-h-[220px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06),transparent)] pointer-events-none" />
                
                {/* SVG Chart */}
                <svg className="w-full h-40 px-4 sm:px-10 overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>

                  {/* Draw grid lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(139,92,246,0.06)" strokeWidth="1" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(139,92,246,0.06)" strokeWidth="1" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(139,92,246,0.06)" strokeWidth="1" />

                  {/* Draw filled area */}
                  <path 
                    d={`M 0,120 
                       L 0,${120 - metricsData[activeMetricTab].points[0] * 0.35} 
                       L 125,${120 - metricsData[activeMetricTab].points[1] * 0.35} 
                       L 250,${120 - metricsData[activeMetricTab].points[2] * 0.35} 
                       L 375,${120 - metricsData[activeMetricTab].points[3] * 0.35} 
                       L 500,${120 - metricsData[activeMetricTab].points[4] * 0.35} 
                       L 500,120 Z`}
                    fill="url(#chartGradient)"
                    className="transition-all duration-700 ease-in-out"
                  />

                  {/* Draw path line */}
                  <path 
                    d={`M 0,${120 - metricsData[activeMetricTab].points[0] * 0.35} 
                       L 125,${120 - metricsData[activeMetricTab].points[1] * 0.35} 
                       L 250,${120 - metricsData[activeMetricTab].points[2] * 0.35} 
                       L 375,${120 - metricsData[activeMetricTab].points[3] * 0.35} 
                       L 500,${120 - metricsData[activeMetricTab].points[4] * 0.35}`}
                    fill="none" 
                    stroke="#8b5cf6" 
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-in-out"
                  />

                  {/* Draw node dots with hover-pulse indicators */}
                  {metricsData[activeMetricTab].points.map((pt, idx) => (
                    <g key={idx} className="cursor-pointer group">
                      <circle 
                        cx={idx * 125} 
                        cy={120 - pt * 0.35} 
                        r="5" 
                        fill="#00f5ff" 
                        className="transition-all duration-700 ease-in-out" 
                      />
                      <circle 
                        cx={idx * 125} 
                        cy={120 - pt * 0.35} 
                        r="10" 
                        fill="none" 
                        stroke="rgba(0, 245, 255, 0.3)" 
                        strokeWidth="2" 
                        className="animate-pulse" 
                      />
                    </g>
                  ))}
                </svg>

                {/* X labels */}
                <div className="w-full flex justify-between px-4 sm:px-10 text-[9px] font-mono text-slate-500 mt-2">
                  {metricsData[activeMetricTab].labels.map((lbl, idx) => (
                    <span key={idx}>{lbl}</span>
                  ))}
                </div>
              </div>

              {/* Modules list */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-6 border-t border-purple-900/10">
                {['Orders', 'Customers', 'Revenue', 'LTV', 'Retention', 'Campaign Performance'].map((mod) => (
                  <div key={mod} className="p-3 rounded-lg bg-slate-950 border border-slate-900 text-center text-[10px] font-mono text-slate-400">
                    {mod}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            REVENUE GROWTH CALCULATOR
           ========================================== */}
        <div id="roi_calculator" className="mb-28 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">ROI Calculator</span>
            <h2 className="text-3xl font-bold font-display">Revenue Growth Calculator</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Estimate the additional revenue and ROI your store could gain by transitioning to Natton Digital’s automated WhatsApp conversion systems:
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Inputs */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold font-mono text-purple-400 uppercase tracking-wider">Configure Current Store Parameters</h3>
                
                <div className="space-y-4">
                  {/* Monthly Orders */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>Monthly Checkout Orders</span>
                      <span className="text-white font-bold">{monthlyOrders.toLocaleString('en-IN')} Orders</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="20000" 
                      step="100" 
                      value={monthlyOrders} 
                      onChange={(e) => setMonthlyOrders(parseInt(e.target.value))} 
                      className="w-full accent-purple-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Avg Order Value */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>Average Order Value (AOV)</span>
                      <span className="text-white font-bold">₹{avgOrderVal.toLocaleString('en-IN')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="200" 
                      max="10000" 
                      step="50" 
                      value={avgOrderVal} 
                      onChange={(e) => setAvgOrderVal(parseInt(e.target.value))} 
                      className="w-full accent-purple-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Current Conversion Rate */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>Current Store Conversion Rate</span>
                      <span className="text-white font-bold">{convRate.toFixed(1)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="5.0" 
                      step="0.1" 
                      value={convRate} 
                      onChange={(e) => setConvRate(parseFloat(e.target.value))} 
                      className="w-full accent-purple-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Monthly Marketing Spend */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>Estimated Monthly Marketing Spend</span>
                      <span className="text-white font-bold">₹{mktSpend.toLocaleString('en-IN')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10000" 
                      max="1000000" 
                      step="10000" 
                      value={mktSpend} 
                      onChange={(e) => setMktSpend(parseInt(e.target.value))} 
                      className="w-full accent-purple-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="p-6 rounded-xl border border-purple-950/50 bg-slate-950/80 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
                
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest border-b border-purple-900/10 pb-2.5">
                    ESTIMATED GROWTH OPPORTUNITIES
                  </h4>

                  <div className="space-y-4 text-xs font-mono">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                      <span className="text-slate-400 flex items-center gap-1"><TrendingUp className="h-4 w-4 text-purple-400" /> Additional Monthly Revenue</span>
                      <span className="text-lg font-bold text-emerald-400">{formatCurrency(addedRevenue)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                      <span className="text-slate-400 flex items-center gap-1"><Repeat className="h-4 w-4 text-cyan-400" /> Increase in Repeat Purchases</span>
                      <span className="text-white font-bold font-mono">+{extraRepeats.toLocaleString('en-IN')} orders</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 flex items-center gap-1"><Award className="h-4 w-4 text-amber-400" /> Monthly Return on Investment</span>
                      <span className="text-lg font-bold text-purple-400">{autoROI}% ROI</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 rounded bg-purple-950/10 border border-purple-900/20">
                  <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                    *Estimates are calculated based on Natton’s standard 112% average conversion boost and automated cart recovery optimizations.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            CASE STUDIES / SUCCESS STORIES CAROUSEL
           ========================================== */}
        <div id="case_studies" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Client Success</span>
            <h2 className="text-3xl font-bold font-display">Retail Success Stories</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Real outcomes. Let us show how local and national retail partners scaled checkout transactions with Natton Systems.
            </p>
          </div>

          <div className="relative p-1 bg-gradient-to-r from-purple-500/10 to-transparent rounded-2xl">
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
                    <span className="text-[9px] font-mono tracking-wider uppercase text-purple-400 font-bold">
                      {caseStudies[carouselIdx].type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    {caseStudies[carouselIdx].company}
                  </h3>
                  <p className="text-lg font-extrabold text-emerald-400 font-mono">
                    {caseStudies[carouselIdx].metric}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {caseStudies[carouselIdx].impact}
                  </p>

                  <div className="flex gap-2.5 pt-4">
                    {caseStudies.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselIdx(idx)}
                        className={`h-2 rounded-full transition-all ${
                          carouselIdx === idx ? 'w-8 bg-purple-500' : 'w-2 bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">KEY RESULTS METRIC</span>
                  <div className="space-y-3">
                    {caseStudies[carouselIdx].results.map((res, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex justify-between items-center font-mono">
                        <span className="text-xs text-slate-400">{res.label}</span>
                        <div className="flex gap-4 items-center">
                          <span className="text-xs text-slate-500 line-through">{res.before}</span>
                          <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                          <span className="text-sm font-bold text-emerald-400">{res.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            COMPARISON MATRIX
           ========================================== */}
        <div id="comparison" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Comparison Matrix</span>
            <h2 className="text-3xl font-bold font-display">Why Ecommerce Brands Choose Natton Digital</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              How our automated architecture stacks up against traditional agencies and static platforms:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-purple-950/10">
                  <th className="p-4 font-bold text-slate-300">Capabilities</th>
                  <th className="p-4 font-bold text-purple-400">Natton Digital</th>
                  <th className="p-4 font-bold text-slate-400">Traditional Agencies</th>
                  <th className="p-4 font-bold text-slate-400">Generic CRM Platforms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                <tr className="hover:bg-slate-950/40">
                  <td className="p-4 font-semibold text-slate-200">SLA Lead Response</td>
                  <td className="p-4 text-emerald-400 font-bold">Instant (&lt; 30 seconds) SMS & WhatsApp brochure dispatch</td>
                  <td className="p-4 text-slate-400">Manual follow-ups handled in 24-72 hours</td>
                  <td className="p-4 text-slate-400">Standard auto-emails landing in client spam folders</td>
                </tr>
                <tr className="hover:bg-slate-950/40">
                  <td className="p-4 font-semibold text-slate-200">Cart Recovery Systems</td>
                  <td className="p-4 text-emerald-400 font-bold">Behavior-triggered automated WhatsApp, calls & coupons</td>
                  <td className="p-4 text-slate-400">Basic template emails without customized discounting options</td>
                  <td className="p-4 text-slate-400">Prone to API timeouts and disconnected checkout lists</td>
                </tr>
                <tr className="hover:bg-slate-950/40">
                  <td className="p-4 font-semibold text-slate-200">Distributor Coordination</td>
                  <td className="p-4 text-emerald-400 font-bold">Automatic credit tracking, stock updates, and invoice receipts</td>
                  <td className="p-4 text-slate-400">Messy phone calls & unmonitored PDF orders</td>
                  <td className="p-4 text-slate-400">Siloed systems without synchronized shipping records</td>
                </tr>
                <tr className="hover:bg-slate-950/40">
                  <td className="p-4 font-semibold text-slate-200">Shopify Conversions Sync</td>
                  <td className="p-4 text-emerald-400 font-bold">Secure, server-to-server Conversions API mapping</td>
                  <td className="p-4 text-slate-400">Generic client-side pixels affected by iOS restrictions</td>
                  <td className="p-4 text-slate-400">Requires expensive third-party connector tools</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================
            15 FREQUENTLY ASKED QUESTIONS
           ========================================== */}
        <div id="faq" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Help Desk</span>
            <h2 className="text-3xl font-bold font-display">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Got questions? We have documented exact answers to our most popular queries.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 text-left">
            {faqList.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-800 bg-slate-950/40 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 flex justify-between items-center text-left text-xs font-bold font-mono text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="h-4 w-4 text-purple-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  )}
                </button>
                
                {expandedFaq === idx && (
                  <div className="p-4 border-t border-slate-900 bg-slate-950/20 text-[11px] text-slate-400 leading-relaxed font-mono">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            LEAD FORM (GoHighLevel/n8n simulator)
           ========================================== */}
        <div id="lead_form" className="mb-24 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Get In Touch</span>
            <h2 className="text-3xl font-bold font-display">Book An Ecommerce Growth Consultation</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Ready to automate your marketing pipelines? Fill out details below. The system triggers a real n8n webhook and updates GHL immediately.
            </p>
          </div>

          <div className="max-w-4xl mx-auto p-1 bg-gradient-to-r from-purple-500/15 through-cyan-500/5 to-transparent rounded-2xl">
            <div className="p-6 sm:p-10 rounded-2xl border border-purple-950/30 bg-slate-950 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCheck className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold font-mono text-white">Consultation Booked Successfully!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-mono">
                    Your details have synced with GoHighLevel CRM. An AI consultation booking link has been dispatched to your phone number.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 rounded bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 font-mono text-xs border border-purple-500/30 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConsultationSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full name */}
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-purple-500 outline-none"
                      />
                    </div>

                    {/* Brand Name */}
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Brand Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="My Brand Co."
                        value={formBrand}
                        onChange={(e) => setFormBrand(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-purple-500 outline-none"
                      />
                    </div>

                    {/* Store Platform */}
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Store Platform</label>
                      <select 
                        value={formPlatform}
                        onChange={(e) => setFormPlatform(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-slate-400 focus:border-purple-500 outline-none"
                      >
                        <option value="Shopify">Shopify</option>
                        <option value="WooCommerce">WooCommerce</option>
                        <option value="Magento">Magento</option>
                        <option value="Custom Storefront">Custom Storefront</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Country *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="India"
                        value={formCountry}
                        onChange={(e) => setFormCountry(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-purple-500 outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@brand.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-purple-500 outline-none"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-purple-500 outline-none"
                      />
                    </div>

                    {/* Monthly orders range */}
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Monthly Checkout Orders</label>
                      <select 
                        value={formOrders}
                        onChange={(e) => setFormOrders(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-slate-400 focus:border-purple-500 outline-none"
                      >
                        <option value="Under 500">Under 500</option>
                        <option value="500 - 2,000">500 - 2,000</option>
                        <option value="2,000 - 10,000">2,000 - 10,000</option>
                        <option value="10,000+">10,000+</option>
                      </select>
                    </div>

                    {/* Current Challenges */}
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Current Business Challenge</label>
                      <input 
                        type="text" 
                        placeholder="Cart drop-offs / High CAC"
                        value={formChallenges}
                        onChange={(e) => setFormChallenges(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-purple-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Additional Requirements</label>
                    <textarea 
                      rows={3}
                      placeholder="Share any details regarding your integration requirements..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-purple-500 outline-none resize-none"
                    />
                  </div>

                  {/* Captcha verification */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded bg-purple-950/5 border border-purple-950/20 font-mono">
                    <div className="flex items-center gap-2.5">
                      <Shield className="h-4 w-4 text-purple-400 shrink-0" />
                      <span className="text-xs text-slate-300">
                        Solve to verify: <strong className="text-white bg-slate-900 px-2 py-0.5 rounded font-bold">{captchaValues.num1} + {captchaValues.num2}</strong> = ?
                      </span>
                    </div>
                    <input 
                      type="number" 
                      required
                      placeholder="Result"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="w-24 bg-slate-950 border border-slate-850 rounded px-3 py-1.5 text-xs text-center text-slate-200 placeholder:text-slate-600 outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 disabled:opacity-50 text-white font-extrabold rounded text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> RUNNING WEBHOOK MODULE...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> SUBMIT GROWTH REQUEST
                      </>
                    )}
                  </button>

                  {/* Terminal log output */}
                  {terminalLogs.length > 0 && (
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-900 font-mono text-[9px] text-slate-400 space-y-1">
                      <p className="text-purple-400 font-bold border-b border-slate-900 pb-1.5 uppercase tracking-wider">
                        ⚡ Webhook Integration Terminal Log
                      </p>
                      {terminalLogs.map((log, index) => (
                        <p key={index}>{log}</p>
                      ))}
                    </div>
                  )}

                </form>
              )}

            </div>
          </div>
        </div>

        {/* ==========================================
            FINAL CTA SECTION
           ========================================== */}
        <div className="p-8 sm:p-12 rounded-3xl border border-purple-950 bg-slate-950/80 backdrop-blur-md relative overflow-hidden text-center space-y-6 mb-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent)] pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight max-w-2xl mx-auto">
            Grow Revenue With <br />
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              AI-Powered Commerce
            </span>
          </h2>

          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            Stop losing leads and checkout revenue. Onboard Natton Systems’ growth CRM, automated WhatsApp commerce portals, and autonomous recommendation agents today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a 
              href="#lead_form" 
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-mono text-xs uppercase tracking-widest font-extrabold rounded shadow-lg transition-all"
            >
              Book Consultation
            </a>
            <a 
              href="#hero" 
              className="px-6 py-2.5 rounded border border-slate-800 bg-slate-950 text-slate-400 font-mono text-xs uppercase tracking-widest font-semibold hover:text-white transition-all"
            >
              Talk To Experts
            </a>
          </div>

          <p className="text-[10px] font-mono text-slate-500 pt-4">
            ● Authorized GHL integration ● Tested on 120+ active retail storefronts
          </p>
        </div>

      </div>
    </div>
  );
}
