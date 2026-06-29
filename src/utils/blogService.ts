import { BlogPost, BlogComment } from '../types';

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'How to Interlock n8n and GoHighLevel CRM for Local MSMEs',
    excerpt: 'Learn the exact webhook-first architecture we deploy to qualify paid Facebook lead ads under 45 seconds.',
    category: 'Marketing Automation' as any,
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
    category: 'AI Tech' as any,
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
    category: 'Business OS' as any,
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
    category: 'Agentic Workflows' as any,
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
    category: 'AI Calling' as any,
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
    category: 'AI Marketing' as any,
    author: 'Siddharth Roy, Growth Strategist',
    date: 'June 05, 2026',
    readTime: '11 min read',
    tags: ['SEO', 'AEO', 'Programmatic', 'Traffic'],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    content: 'Local businesses lose massive transaction volumes to national competitors simply because they fail to capture hyper-targeted geo queries.\n\nWith programmatic SEO, we map dynamic variables (Industry, City, Pain-Points) inside CSV models, generating hundreds of high-performance landing pages instantly. These pages load in milliseconds, are indexed automatically by Google Search, and leverage localized webhook routes matching regional CRM pipelines.',
    comments: []
  }
];

const LOCAL_STORAGE_KEY = 'natton_digital_blog_posts';

export function getBlogPosts(): BlogPost[] {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_BLOG_POSTS));
    return INITIAL_BLOG_POSTS;
  }
  try {
    const parsed = JSON.parse(stored) as BlogPost[];
    // Ensure all posts have comments initialized as arrays
    return parsed.map(post => ({
      ...post,
      comments: post.comments || []
    }));
  } catch (e) {
    return INITIAL_BLOG_POSTS;
  }
}

export function saveBlogPosts(posts: BlogPost[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
}

export function getBlogPostById(id: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(p => p.id === id);
}

export function addBlogPost(post: Omit<BlogPost, 'id' | 'comments'>): BlogPost {
  const posts = getBlogPosts();
  const newPost: BlogPost = {
    ...post,
    id: `post-${Date.now()}`,
    comments: []
  };
  posts.unshift(newPost); // Add to the top of the list
  saveBlogPosts(posts);
  return newPost;
}

export function updateBlogPost(id: string, updatedFields: Partial<BlogPost>): BlogPost | undefined {
  const posts = getBlogPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return undefined;

  const updatedPost = {
    ...posts[index],
    ...updatedFields,
    id // Keep original ID
  };
  posts[index] = updatedPost;
  saveBlogPosts(posts);
  return updatedPost;
}

export function deleteBlogPost(id: string): boolean {
  const posts = getBlogPosts();
  const filtered = posts.filter(p => p.id !== id);
  if (filtered.length === posts.length) return false;
  saveBlogPosts(filtered);
  return true;
}

export function addCommentToPost(postId: string, comment: Omit<BlogComment, 'id' | 'createdAt'>): BlogComment | undefined {
  const posts = getBlogPosts();
  const index = posts.findIndex(p => p.id === postId);
  if (index === -1) return undefined;

  const newComment: BlogComment = {
    ...comment,
    id: `comment-${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  const post = posts[index];
  post.comments = [...(post.comments || []), newComment];
  posts[index] = post;
  saveBlogPosts(posts);
  return newComment;
}

export const createBlogPost = addBlogPost;

export function deleteCommentFromPost(postId: string, commentId: string): boolean {
  const posts = getBlogPosts();
  const index = posts.findIndex(p => p.id === postId);
  if (index === -1) return false;

  const post = posts[index];
  const initialComments = post.comments || [];
  post.comments = initialComments.filter(c => c.id !== commentId);
  
  if (post.comments.length === initialComments.length) return false;
  
  posts[index] = post;
  saveBlogPosts(posts);
  return true;
}
