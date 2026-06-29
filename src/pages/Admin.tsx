import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  MessageSquare, 
  Check, 
  Search, 
  ArrowRight, 
  ExternalLink,
  LogOut,
  X,
  FileEdit,
  FolderOpen
} from 'lucide-react';
import { RoutePath, BlogPost } from '../types';
import { 
  getBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  deleteCommentFromPost 
} from '../utils/blogService';
import GoogleSheetsTab from '../components/GoogleSheetsTab';
import { FileSpreadsheet } from 'lucide-react';

interface AdminProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
  setSelectedBlogPostId?: (id: string | null) => void;
}

export default function Admin({ setPath, darkMode, setSelectedBlogPostId }: AdminProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('admin_authenticated') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Blog Management CRUD State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  
  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('AI Marketing');
  const [formReadTime, setFormReadTime] = useState('6 min read');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formFeaturedImage, setFormFeaturedImage] = useState('');
  
  // Search state for CRUD table
  const [crudSearchQuery, setCrudSearchQuery] = useState('');
  
  // Feedback States
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'comments' | 'sheets'>('list');

  // Load posts
  useEffect(() => {
    if (isAuthenticated) {
      setPosts(getBlogPosts());
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. (Hint: use admin / password)');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  // Convert uploaded image file to Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormError('Image size should be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormFeaturedImage(reader.result as string);
        setFormSuccess('Image uploaded and optimized as dynamic asset!');
        setTimeout(() => setFormSuccess(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Submit Form (Create / Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!formTitle || !formExcerpt || !formContent) {
      setFormError('Title, Excerpt, and Content are required fields.');
      return;
    }

    const tagsArray = formTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const postData = {
      title: formTitle,
      excerpt: formExcerpt,
      content: formContent,
      category: formCategory as any,
      readTime: formReadTime,
      tags: tagsArray.length > 0 ? tagsArray : ['Automation', 'MSME'],
      featuredImage: formFeaturedImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      author: 'Admin, Natton Digital Ops',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    if (isEditing && currentPostId) {
      // Update existing post
      updateBlogPost(currentPostId, postData);
      setFormSuccess('Blog post updated successfully!');
      setIsEditing(false);
      setCurrentPostId(null);
    } else {
      // Create new post
      const newPost = createBlogPost(postData);
      if (setSelectedBlogPostId) {
        setSelectedBlogPostId(newPost.id);
      }
      setFormSuccess('New blog post published successfully! Redirecting...');
      
      // Auto-redirect to the blog page after 2 seconds
      setTimeout(() => {
        setPath('blog');
      }, 2000);
    }

    // Refresh post list
    setPosts(getBlogPosts());
    resetForm();
    
    // Switch to listing after short delay
    setTimeout(() => {
      setFormSuccess('');
      setActiveTab('list');
    }, 2200);
  };

  // Edit post loader
  const handleEditClick = (post: BlogPost) => {
    setIsEditing(true);
    setCurrentPostId(post.id);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormReadTime(post.readTime);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormTags(post.tags.join(', '));
    setFormFeaturedImage(post.featuredImage || '');
    setActiveTab('create');
  };

  // Delete post
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you absolutely sure you want to delete this blueprint post?')) {
      deleteBlogPost(id);
      setPosts(getBlogPosts());
      setFormSuccess('Post deleted successfully.');
      setTimeout(() => setFormSuccess(''), 3000);
    }
  };

  // Delete comment from post
  const handleDeleteComment = (postId: string, commentId: string) => {
    if (window.confirm('Are you sure you want to moderate and delete this comment?')) {
      deleteCommentFromPost(postId, commentId);
      setPosts(getBlogPosts());
      setFormSuccess('Comment removed successfully.');
      setTimeout(() => setFormSuccess(''), 3000);
    }
  };

  const resetForm = () => {
    setFormTitle('');
    setFormCategory('AI Marketing');
    setFormReadTime('6 min read');
    setFormExcerpt('');
    setFormContent('');
    setFormTags('');
    setFormFeaturedImage('');
    setIsEditing(false);
    setCurrentPostId(null);
  };

  // Filtered posts for list
  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(crudSearchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(crudSearchQuery.toLowerCase())
  );

  // All comments across all posts
  const allComments = posts.flatMap(p => 
    (p.comments || []).map(c => ({
      ...c,
      postId: p.id,
      postTitle: p.title
    }))
  );

  return (
    <div className="min-h-screen bg-[#110B33] text-white py-12 relative overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/15 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header section */}
        <div className="text-left space-y-3">
          <span className="text-[10px] font-mono text-[#00C2FF] tracking-widest uppercase font-bold">NATTON SYSTEMS PANEL</span>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white">Editorial Admin Engine</h1>
          <p className="text-xs text-gray-400 max-w-xl">
            Configure dynamic database architectures, write blog entries, manage WordPress-style publishing loops, and moderate active commentary schemas.
          </p>
        </div>

        {/* Auth / Login Guard */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-6"
            >
              <div className="space-y-2 text-center">
                <Cpu className="h-10 w-10 text-[#00C2FF] mx-auto animate-pulse" />
                <h2 className="text-xl font-bold font-display text-white">System Authentication</h2>
                <p className="text-[11px] text-gray-400">Please authenticate with secure operator credentials</p>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-mono">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Username</label>
                  <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g., admin"
                    className="w-full px-4 py-2.5 bg-[#0B0721]/80 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Password</label>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="e.g., password"
                    className="w-full px-4 py-2.5 bg-[#0B0721]/80 border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:opacity-95 text-white font-mono font-black text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5"
                >
                  INITIALIZE SESSION <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="pt-4 border-t border-white/5 text-center">
                <p className="text-[10px] font-mono text-gray-500">
                  Default credentials: <strong className="text-gray-300">admin</strong> / <strong className="text-gray-300">password</strong>
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Main Admin Interface */
          <div className="space-y-8">
            
            {/* Operator Bar */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.01] flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-gray-400">Operator active: <strong className="text-white">Admin Session</strong></span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPath('blog')}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  View Blog Hub <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  Logout Session <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Tabs Selector & Title Form Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold font-display text-white">Blog Management & Automated Publisher</h2>
                <p className="text-xs text-gray-400">Perform real-time CRUD parameters on Natton Knowledge Blueprints.</p>
              </div>

              {/* Tab Buttons */}
              <div className="flex flex-wrap bg-[#0B0721] p-1 rounded-xl border border-white/10 gap-1 sm:gap-0">
                <button
                  onClick={() => { setActiveTab('list'); resetForm(); }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'list' ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Guides Database ({posts.length})
                </button>
                <button
                  onClick={() => setActiveTab('create')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                    activeTab === 'create' ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isEditing ? <FileEdit className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  {isEditing ? 'Modify Post' : 'Publish New'}
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                    activeTab === 'comments' ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Comments ({allComments.length})
                </button>
                <button
                  onClick={() => { setActiveTab('sheets'); resetForm(); }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                    activeTab === 'sheets' ? 'bg-[#00C2FF] text-black font-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  Google Sheets Sync
                </button>
              </div>
            </div>

            {/* Form Success / Error Banner */}
            {formSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
              >
                ✓ {formSuccess}
              </motion.div>
            )}
            {formError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono"
              >
                ⚠ {formError}
              </motion.div>
            )}

            {/* TAB CONTENTS */}
            <AnimatePresence mode="wait">
              
              {/* TAB 1: LIST / DATABASE READ OPERATOR */}
              {activeTab === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Search and Database Meta info */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div className="relative w-full sm:max-w-md">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                      <input 
                        type="text"
                        placeholder="Search blueprints by title or category..."
                        value={crudSearchQuery}
                        onChange={(e) => setCrudSearchQuery(e.target.value)}
                        className="w-full pl-10.5 pr-4 py-2 bg-[#0B0721] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase">
                      PERSISTENCE ENGINE: <strong className="text-gray-300">LOCALSTORAGE (ACTIVE)</strong>
                    </span>
                  </div>

                  {/* Table of posts */}
                  <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0B0721]/60">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-mono text-[10px] tracking-wider uppercase">
                          <th className="p-4">Post Info</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Date & Author</th>
                          <th className="p-4">Tags</th>
                          <th className="p-4">Comments</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredPosts.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-400 font-mono">
                              No matching blog posts found in databases. Publish some above!
                            </td>
                          </tr>
                        ) : (
                          filteredPosts.map((post) => (
                            <tr key={post.id} className="hover:bg-white/[0.01] transition-all">
                              <td className="p-4 max-w-sm">
                                <div className="flex items-center gap-3">
                                  {post.featuredImage ? (
                                    <img 
                                      src={post.featuredImage} 
                                      alt={post.title} 
                                      className="w-10 h-10 object-cover rounded-lg border border-white/10 shrink-0"
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                                      <ImageIcon className="h-4 w-4 text-gray-500" />
                                    </div>
                                  )}
                                  <div className="space-y-0.5">
                                    <h4 className="font-bold text-white hover:text-[#00C2FF] transition-colors leading-snug cursor-pointer" onClick={() => handleEditClick(post)}>
                                      {post.title}
                                    </h4>
                                    <p className="text-[10px] text-gray-400 line-clamp-1">{post.excerpt}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="text-[9px] font-mono text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20 px-2 py-0.5 rounded uppercase font-bold">
                                  {post.category}
                                </span>
                              </td>
                              <td className="p-4 text-[11px] font-mono space-y-0.5">
                                <p className="text-gray-300">{post.date}</p>
                                <p className="text-gray-500 text-[10px]">{post.author}</p>
                              </td>
                              <td className="p-4">
                                <div className="flex flex-wrap gap-1 max-w-[200px]">
                                  {post.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[8px] font-mono text-gray-500 bg-white/5 px-1 rounded">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="p-4 text-[11px] font-mono font-bold">
                                <span className="inline-flex items-center gap-1 text-gray-300">
                                  <MessageSquare className="h-3 w-3 text-purple-400" /> {post.comments?.length || 0}
                                </span>
                              </td>
                              <td className="p-4 text-right space-x-1 whitespace-nowrap">
                                <button
                                  onClick={() => handleEditClick(post)}
                                  className="p-1.5 rounded-lg border border-white/10 hover:border-yellow-500/30 text-yellow-500 bg-white/5 hover:bg-yellow-500/10 transition-all inline-flex items-center justify-center"
                                  title="Edit Guide"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(post.id)}
                                  className="p-1.5 rounded-lg border border-white/10 hover:border-rose-500/30 text-rose-500 bg-white/5 hover:bg-rose-500/10 transition-all inline-flex items-center justify-center"
                                  title="Delete Guide"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: CREATE / UPDATE WORDPRESS EDITORIAL FORM */}
              {activeTab === 'create' && (
                <motion.div
                  key="create"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <form onSubmit={handleSubmit} className="p-6 rounded-3xl border border-white/10 bg-[#0B0721]/50 backdrop-blur-md space-y-6">
                    
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold flex items-center gap-1">
                        <Sparkles className="h-4 w-4 text-[#00C2FF] animate-pulse" />
                        {isEditing ? 'Blueprints Modification Interface' : 'WordPress-Style Autonomous Publisher'}
                      </span>
                      {isEditing && (
                        <button 
                          type="button" 
                          onClick={resetForm}
                          className="text-xs font-mono text-rose-400 hover:underline flex items-center gap-1"
                        >
                          <X className="h-3.5 w-3.5" /> Cancel Edit Mode
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: Input parameters */}
                      <div className="lg:col-span-8 space-y-4">
                        
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Guide Title</label>
                          <input 
                            type="text"
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            placeholder="e.g., How to Integrate RCS messaging on High-Traffic E-commerce nodes"
                            className="w-full px-4 py-2.5 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Category</label>
                            <select
                              value={formCategory}
                              onChange={(e) => setFormCategory(e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                            >
                              <option value="AI Marketing">AI Marketing</option>
                              <option value="Automation">Automation</option>
                              <option value="CRM">CRM</option>
                              <option value="AI Agents">AI Agents</option>
                              <option value="SEO">SEO</option>
                              <option value="AEO">AEO</option>
                              <option value="WhatsApp">WhatsApp</option>
                              <option value="AI Calling">AI Calling</option>
                              <option value="Case Studies">Case Studies</option>
                              <option value="Industry Guides">Industry Guides</option>
                              <option value="Product Updates">Product Updates</option>
                              <option value="Tutorials">Tutorials</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Est. Read Time</label>
                            <input 
                              type="text"
                              value={formReadTime}
                              onChange={(e) => setFormReadTime(e.target.value)}
                              placeholder="e.g., 6 min read"
                              className="w-full px-4 py-2.5 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Excerpt / Summary</label>
                          <textarea 
                            value={formExcerpt}
                            onChange={(e) => setFormExcerpt(e.target.value)}
                            placeholder="Provide a highly scannable, punchy summary of what the reader learns in this blueprint."
                            rows={2}
                            className="w-full px-4 py-2.5 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none resize-none"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Blueprint Markdown/Body Content</label>
                          <textarea 
                            value={formContent}
                            onChange={(e) => setFormContent(e.target.value)}
                            placeholder="Write your comprehensive technical analysis here. Use paragraphs separated by blank lines."
                            rows={8}
                            className="w-full px-4 py-2.5 bg-[#110B33] border border-white/10 rounded-xl text-xs text-white focus:border-[#00C2FF] focus:outline-none font-mono leading-relaxed"
                            required
                          />
                        </div>

                      </div>

                      {/* Right: Assets uploading and metadata tags */}
                      <div className="lg:col-span-4 space-y-4">
                        
                        {/* Image asset uploader / URL paste */}
                        <div className="p-4 rounded-2xl border border-white/10 bg-[#110B33] space-y-4">
                          <span className="text-[10px] font-mono text-gray-400 uppercase block tracking-wider font-bold">Featured Image Asset</span>
                          
                          {formFeaturedImage ? (
                            <div className="relative rounded-xl overflow-hidden border border-white/10 h-36">
                              <img 
                                src={formFeaturedImage} 
                                alt="Featured preview" 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <button 
                                type="button"
                                onClick={() => setFormFeaturedImage('')}
                                className="absolute top-2 right-2 p-1 rounded-full bg-black/80 hover:bg-black text-gray-300 hover:text-white"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="border border-dashed border-white/10 rounded-xl p-4 text-center space-y-2 hover:bg-white/[0.01] transition-all relative cursor-pointer">
                              <Upload className="h-6 w-6 text-gray-400 mx-auto" />
                              <div className="space-y-0.5">
                                <p className="text-[10px] text-white font-bold">Click to Upload Dynamic Image</p>
                                <p className="text-[9px] text-gray-500 font-mono">JPG, PNG up to 2MB (converts to base64)</p>
                              </div>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                            </div>
                          )}

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block">Or Paste Image URL</label>
                            <input 
                              type="text"
                              value={formFeaturedImage}
                              onChange={(e) => setFormFeaturedImage(e.target.value)}
                              placeholder="e.g., https://images.unsplash.com/photo-..."
                              className="w-full px-3 py-1.5 bg-[#0B0721] border border-white/10 rounded-lg text-[10px] text-white focus:border-[#00C2FF] focus:outline-none font-mono"
                            />
                          </div>

                          <div className="pt-2 border-t border-white/5 space-y-1.5">
                            <span className="text-[8px] font-mono text-gray-500 uppercase block">RECOMMENDED ROYALTY-FREE GRAPHICS:</span>
                            <div className="grid grid-cols-2 gap-1.5">
                              <button 
                                type="button" 
                                onClick={() => setFormFeaturedImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80')}
                                className="px-1.5 py-1 text-[8px] font-mono bg-white/5 hover:bg-white/10 rounded text-gray-300 text-left truncate"
                              >
                                #1 Quantum Violet
                              </button>
                              <button 
                                type="button" 
                                onClick={() => setFormFeaturedImage('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80')}
                                className="px-1.5 py-1 text-[8px] font-mono bg-white/5 hover:bg-white/10 rounded text-gray-300 text-left truncate"
                              >
                                #2 Cybermatic Cyan
                              </button>
                              <button 
                                type="button" 
                                onClick={() => setFormFeaturedImage('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80')}
                                className="px-1.5 py-1 text-[8px] font-mono bg-white/5 hover:bg-white/10 rounded text-gray-300 text-left truncate"
                              >
                                #3 Grid Node
                              </button>
                              <button 
                                type="button" 
                                onClick={() => setFormFeaturedImage('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80')}
                                className="px-1.5 py-1 text-[8px] font-mono bg-white/5 hover:bg-white/10 rounded text-gray-300 text-left truncate"
                              >
                                #4 Neural Datacenter
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Metadata tags */}
                        <div className="p-4 rounded-2xl border border-white/10 bg-[#110B33] space-y-3">
                          <span className="text-[10px] font-mono text-gray-400 uppercase block tracking-wider font-bold">Metadata Tags</span>
                          <div className="space-y-1.5">
                            <input 
                              type="text"
                              value={formTags}
                              onChange={(e) => setFormTags(e.target.value)}
                              placeholder="n8n, CRM, GHL, WhatsApp"
                              className="w-full px-3 py-2 bg-[#0B0721] border border-white/10 rounded-lg text-xs text-white focus:border-[#00C2FF] focus:outline-none"
                            />
                            <p className="text-[9px] text-gray-500 font-mono">Separate tags with commas.</p>
                          </div>
                        </div>

                        {/* Submit Action Box */}
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#00C2FF] hover:bg-[#00C2FF]/95 text-black font-mono font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                        >
                          {isEditing ? 'UPDATE DURATION BLUEPRINT' : 'COMMIT & PUBLISH BLUEPRINT'} <ArrowRight className="h-4 w-4" />
                        </button>

                      </div>

                    </div>
                  </form>
                </motion.div>
              )}

              {/* TAB 3: COMMENTS MODERATION LIST */}
              {activeTab === 'comments' && (
                <motion.div
                  key="comments"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-3xl border border-white/10 bg-[#0B0721]/50 backdrop-blur-md space-y-4">
                    <h3 className="text-sm font-bold font-mono text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-purple-400" />
                      Dynamic Commentary Moderation Hub
                    </h3>
                    <p className="text-xs text-gray-400">Moderators review, approve, or delete comments submitted across the entire dynamic Guides platform.</p>
                    
                    <div className="space-y-3">
                      {allComments.length === 0 ? (
                        <div className="p-12 text-center border border-dashed border-white/5 rounded-2xl bg-white/[0.002]">
                          <p className="text-xs text-gray-400 font-mono">No active user comments found in the system logs.</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-white/5">
                          {allComments.map((comment) => (
                            <div key={comment.id} className="py-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                              <div className="space-y-2 text-left">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C2FF] to-purple-500 flex items-center justify-center text-[10px] font-bold text-white uppercase shrink-0">
                                    {comment.authorName.slice(0, 2)}
                                  </div>
                                  <div>
                                    <h5 className="text-xs font-bold text-white">{comment.authorName} <span className="text-[10px] text-gray-500 font-mono font-normal">({comment.authorEmail})</span></h5>
                                    <p className="text-[9px] font-mono text-gray-500">{new Date(comment.createdAt).toLocaleDateString()} on post: <span className="text-[#00C2FF] italic">"{comment.postTitle}"</span></p>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed pl-10.5">
                                  {comment.commentText}
                                </p>
                              </div>
                              <button
                                onClick={() => handleDeleteComment(comment.postId, comment.id)}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-[10px] font-mono flex items-center gap-1 transition-colors self-end sm:self-center"
                              >
                                <Trash2 className="h-3 w-3" /> Moderate / Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: GOOGLE SHEETS SYNC LOGS & SETTINGS */}
              {activeTab === 'sheets' && (
                <motion.div
                  key="sheets"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <GoogleSheetsTab />
                </motion.div>
              )}

            </AnimatePresence>

          </div>
        )}

      </div>
    </div>
  );
}
