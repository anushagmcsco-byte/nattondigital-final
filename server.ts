import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_FILE = path.join(process.cwd(), 'blogs.json');

const INITIAL_BLOG_POSTS = [
  {
    id: 'post-7',
    title: 'aabx',
    excerpt: 'adcscscscsd',
    category: 'AI Marketing',
    author: 'Arjun Mehta, AI Solution Architect',
    date: 'Aug 20, 2026',
    readTime: '6 min read',
    tags: ['SEO', 'AEO', 'Programmatic'],
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    content: 'adcscscscsd',
    comments: []
  },
  {
    id: 'post-1',
    title: 'How to Interlock n8n and GoHighLevel CRM for Local MSMEs',
    excerpt: 'Learn the exact webhook-first architecture we deploy to qualify paid Facebook lead ads under 45 seconds.',
    category: 'Marketing Automation',
    author: 'Arjun Mehta, AI Solution Architect',
    date: 'June 28, 2026',
    readTime: '6 min read',
    tags: ['n8n', 'GoHighLevel', 'Automation', 'CRM'],
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    content: 'In modern business operations, response speed is the primary driver of conversions. If you contact a prospective lead in under 5 minutes, your close rate climbs by up to 391%. In this article, we outline our exact production-grade webhook-first architecture.\n\nFirst, configure a webhook interceptor node inside your n8n workflows panel. Set up the target URL to receive Meta Lead Forms. Next, map the incoming payload parameters (Name, Company, E-mail, Phone) to GoHighLevel CRM contacts fields.\n\nFinally, configure an automated dialer voice bot trigger or Meta WhatsApp template sequence. This ensures that the moment a lead clicks "Submit", their phone rings with an automated qualifier or their WhatsApp pings with course brochures, locking down booking slots on autopilot.',
    comments: [
      {
        id: 'c-1',
        authorName: 'Sarah Jenkins',
        authorEmail: 'sarah@jenkinsmarketing.co',
        commentText: 'This webhook setup saved us over 10 hours of manual data entry this week alone! n8n handles the GoHighLevel payload maps beautifully.',
        createdAt: '2026-06-28T14:30:00Z'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'The Rise of AEO: Is Your Website Optimized for ChatGPT & Gemini?',
    excerpt: 'Google Search is transitioning to AI. Explore how to format website metadata so LLMs cite your brand.',
    category: 'AI Tech',
    author: 'Siddharth Roy, Growth Strategist',
    date: 'June 24, 2026',
    readTime: '8 min read',
    tags: ['AEO', 'SEO', 'AI Search', 'ChatGPT', 'Gemini'],
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    content: 'Search Engine Optimization (SEO) is evolving into Answer Engine Optimization (AEO). Modern buyers search using conversational platforms like ChatGPT, Gemini, and Perplexity rather than clicking traditional blue links. To capture this high-intent traffic, your web development structure must be format-compatible.\n\nFirst, utilize highly detailed schema markup logs. Provide clear, absolute question-and-answer headers inside your webpage HTML structure. Ensure your site loads in under 1.5 seconds so crawlers capture content without indexing timeouts.\n\nSecond, write clear, modular summaries at the top of technical specifications. The more structured and human-readable your data, the higher the likelihood an LLM agent references your services as the prime answer.',
    comments: []
  },
  {
    id: 'post-3',
    title: 'Scaling WhatsApp Business API: Checklists for SOC2 & HIPAA Uptime',
    excerpt: 'A complete security compliance handbook for healthcare clinics deploying automated clinical triages.',
    category: 'Business OS',
    author: 'Priya Sharma, CRM Specialist',
    date: 'June 20, 2026',
    readTime: '10 min read',
    tags: ['WhatsApp', 'Security', 'Healthcare', 'HIPAA'],
    featuredImage: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80',
    content: 'Deploying automated clinical reminders or patient intake chatbots requires strict compliance under HIPAA and SOC2 regulations. Any data leakage can result in massive financial penalties and breach patient trust. Here is your baseline security deployment handbook.\n\nEnsure that all patient names, phone records, and symptom logs are encrypted locally via AES-256 before syncing with Firestore databases. Never transmit raw clinical diagnoses across native WhatsApp threads. Instead, use WhatsApp strictly as an intake routing trigger, linking patients to secure, authenticated local medical portals for clinical data transfers.',
    comments: []
  },
  {
    id: 'post-4',
    title: 'Building Multi-Agent Consensus: n8n Sandbox Orchestration Strategies',
    excerpt: 'Deploying autonomous AI agents (Sales, Support, HR) inside sandboxed n8n loops to double task accuracy.',
    category: 'Agentic Workflows',
    author: 'Arjun Mehta, AI Solution Architect',
    date: 'June 15, 2026',
    readTime: '9 min read',
    tags: ['n8n', 'AI Agents', 'Agentic OS', 'Sandbox'],
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    content: 'A single AI agent is prone to hallucination. However, by deploying a Multi-Agent Consensus Matrix, you can reduce error margins in automated business audits to zero.\n\nInside our AgenticOS framework, we deploy independent Sales, HR, and Finance nodes. When the Finance Agent parses an incoming dispatch ledger, its purchase order draft is sent to the Audit Agent for structural verification. Only after the auditing agent confirms total balance accuracy does the webhook release the Purchase Order to the supplier.',
    comments: []
  },
  {
    id: 'post-5',
    title: 'Voice AI Strategy: Integrating Low-Latency Calling Agents Natively',
    excerpt: 'Unlock conversion rates with sub-1.2 second voice bot telephony connected straight to your GHL pipelines.',
    category: 'AI Calling',
    author: 'Priya Sharma, CRM Specialist',
    date: 'June 10, 2026',
    readTime: '7 min read',
    tags: ['AI Calling', 'Telephony', 'GoHighLevel', 'Voice Bots'],
    featuredImage: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80',
    content: 'Voice automation is no longer clunky DTMF key-press menus. Modern low-latency conversational LLMs allow bots to qualify leads natively in under 1.2 seconds.\n\nBy binding Twilio regional routing numbers directly to GHL trigger events, incoming callers are answered immediately by a friendly, context-trained virtual advisor. The conversation is transcribed in real-time, categorized, and pushed to GHL notes so human specialists can review exact customer metrics prior to call-back sequences.',
    comments: []
  },
  {
    id: 'post-6',
    title: 'The Programmatic SEO Blueprint: Capturing Tier-2 Regional Markets',
    excerpt: 'How we generated over 2,500 programmatic city pages for regional services with zero manual templates.',
    category: 'AI Marketing',
    author: 'Siddharth Roy, Growth Strategist',
    date: 'June 05, 2026',
    readTime: '11 min read',
    tags: ['SEO', 'AEO', 'Programmatic', 'Traffic'],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    content: 'Local businesses lose massive transaction volumes to national competitors simply because they fail to capture hyper-targeted geo queries.\n\nWith programmatic SEO, we map dynamic variables (Industry, City, Pain-Points) inside CSV models, generating hundreds of high-performance landing pages instantly. These pages load in milliseconds, are indexed automatically by Google Search, and leverage localized webhook routes matching regional CRM pipelines.',
    comments: []
  }
];

let globalPostsCache: any[] | null = null;

function getStoredPosts() {
  if (globalPostsCache && globalPostsCache.length > 0) {
    return globalPostsCache;
  }
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (!parsed.some((p: any) => p.id === 'post-7')) {
          parsed.unshift(INITIAL_BLOG_POSTS[0]);
        }
        globalPostsCache = parsed;
        saveStoredPosts(parsed);
        return globalPostsCache;
      }
    }
  } catch (e) {
    console.error('Error reading blogs.json', e);
  }
  globalPostsCache = INITIAL_BLOG_POSTS;
  saveStoredPosts(INITIAL_BLOG_POSTS);
  return globalPostsCache;
}

function saveStoredPosts(posts: any[]) {
  globalPostsCache = posts;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  } catch (e) {
    console.error('Error writing blogs.json', e);
  }
}

// API Routes
app.get('/api/blogs', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const posts = getStoredPosts();
  res.json(posts);
});

app.post('/api/blogs', (req, res) => {
  const posts = getStoredPosts();
  const newPost = {
    ...req.body,
    id: `post-${Date.now()}`,
    comments: []
  };
  posts.unshift(newPost);
  saveStoredPosts(posts);
  res.json(newPost);
});

app.put('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const posts = getStoredPosts();
  const index = posts.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  posts[index] = {
    ...posts[index],
    ...req.body,
    id
  };
  saveStoredPosts(posts);
  res.json(posts[index]);
});

app.delete('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  let posts = getStoredPosts();
  const filtered = posts.filter((p: any) => p.id !== id);
  if (filtered.length === posts.length) {
    return res.status(404).json({ error: 'Post not found' });
  }
  saveStoredPosts(filtered);
  res.json({ success: true });
});

app.post('/api/blogs/:id/comments', (req, res) => {
  const { id } = req.params;
  const { authorName, authorEmail, commentText } = req.body;
  const posts = getStoredPosts();
  const post = posts.find((p: any) => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const newComment = {
    id: `comment-${Date.now()}`,
    authorName,
    authorEmail,
    commentText,
    createdAt: new Date().toISOString()
  };
  if (!post.comments) {
    post.comments = [];
  }
  post.comments.push(newComment);
  saveStoredPosts(posts);
  res.json(newComment);
});

app.delete('/api/blogs/:id/comments/:commentId', (req, res) => {
  const { id, commentId } = req.params;
  const posts = getStoredPosts();
  const post = posts.find((p: any) => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const originalLen = (post.comments || []).length;
  post.comments = (post.comments || []).filter((c: any) => c.id !== commentId);
  if (post.comments.length === originalLen) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  saveStoredPosts(posts);
  res.json({ success: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
