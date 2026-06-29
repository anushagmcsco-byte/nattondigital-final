export type RoutePath =
  | 'home'
  | 'compare'
  | 'free-tools'
  | 'careers'
  | 'webinars'
  | 'guides'
  | 'solutions/ai-growth-marketing'
  | 'solutions/ai-marketing-saas'
  | 'solutions/crm-ai-automation'
  | 'solutions/conversational-ai'
  | 'solutions/whatsapp-automation'
  | 'solutions/ai-agents'
  | 'solutions/ai-calling-agents'
  | 'solutions/cloud-telephony'
  | 'solutions/rcs-messaging'
  | 'products/growth-os'
  | 'products/growthos'
  | 'products/ai-marketing-platform'
  | 'products/business-os'
  | 'products/agentic-os'
  | 'industries/healthcare'
  | 'industries/education'
  | 'industries/real-estate'
  | 'industries/manufacturing'
  | 'industries/retail'
  | 'industries/retail-ecommerce'
  | 'industries/professional-services'
  | 'case-studies'
  | 'blog'
  | 'ai-readiness-assessment'
  | 'roi-calculator'
  | 'about'
  | 'why-natton-digital'
  | 'our-process'
  | 'book-demo'
  | 'resources'
  | 'integrations'
  | 'pricing'
  | 'contact'
  | 'admin';

export interface BlogComment {
  id: string;
  authorName: string;
  authorEmail: string;
  commentText: string;
  createdAt: string;
}

export interface SolutionCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  path: RoutePath;
  icon: string;
  stats: string;
  features: string[];
}

export interface ProductDetail {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  keyFeatures: { title: string; desc: string }[];
  techStack: string[];
  capabilities: string[];
  imagePrompt: string;
}

export interface IndustryDetail {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  painPoints: string[];
  solutions: string[];
  results: { metric: string; desc: string }[];
  caseStudyTitle: string;
  workflowSteps: { title: string; desc: string }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: 'Healthcare' | 'Education' | 'Real Estate' | 'Retail' | 'Manufacturing' | 'Professional Services';
  tagline: string;
  challenge: string;
  solution: string;
  results: string[];
  roi: string;
  beforeMetrics: string;
  afterMetrics: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'AI Tech' | 'Marketing Automation' | 'SaaS Growth' | 'Business OS' | 'Agentic Workflows';
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featuredImage?: string;
  comments?: BlogComment[];
}
