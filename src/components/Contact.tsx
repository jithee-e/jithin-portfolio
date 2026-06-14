import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Linkedin, Github, Send, CheckCircle, MapPin, 
  User, MessageSquare, ExternalLink, Calendar, PlusCircle, Inbox,
  FileSpreadsheet, Link as LinkIcon, Lock, RefreshCw, LogOut, Check, Sparkles, AlertCircle
} from 'lucide-react';
import { contactInfo } from '../data';
import { Message } from '../types';
import { googleSignIn, logout, initAuth } from '../lib/firebaseAuth';
import { createSpreadsheet, appendRowData, checkSpreadsheetAccess } from '../lib/sheetsApi';
import { User as FirebaseUser } from 'firebase/auth';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Consultation',
    message: ''
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Google Sheets Integration State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [sheetId, setSheetId] = useState<string | null>(localStorage.getItem('jithin_portfolio_sheet_id'));
  const [isLinkingSheet, setIsLinkingSheet] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Initialize and track auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      async (currentUser, tokenValue) => {
        setUser(currentUser);
        setToken(tokenValue);
        setAuthError(null);

        // If sheetId exists, perform a quick accessibility check using the active token
        const savedSheetId = localStorage.getItem('jithin_portfolio_sheet_id');
        if (savedSheetId && tokenValue) {
          const hasAccess = await checkSpreadsheetAccess(savedSheetId, tokenValue);
          if (!hasAccess) {
            // Sheet is inaccessible or deleted on Drive, clear from local state
            localStorage.removeItem('jithin_portfolio_sheet_id');
            setSheetId(null);
          } else {
            setSheetId(savedSheetId);
          }
        }
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Seed sample messages to simulate active visitor registries
  useEffect(() => {
    const savedMessages = localStorage.getItem('jithin_portfolio_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const sampleMessages: Message[] = [
        {
          name: 'Sarah Joseph',
          email: 'sarah.j@techcorp.io',
          message: 'Loved your MedCore UI dashboards booklet! The spacing is pristine. Let’s talk about a wellness redesign next week.',
          date: '2026-06-12',
          subject: 'Project Consultation',
          syncedToSheets: false
        },
        {
          name: 'Ananthu Krishnan',
          email: 'ananthu@creativekerala.com',
          message: 'Excellent typography pairing and booklet aesthetics. Are you open to contractual freelance roles working with Figma variables?',
          date: '2026-06-13',
          subject: 'Freelance Contract',
          syncedToSheets: false
        }
      ];
      setMessages(sampleMessages);
      localStorage.setItem('jithin_portfolio_messages', JSON.stringify(sampleMessages));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    setAuthError(null);
    setIsSigningIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        
        // Check if there was an existing sheetId and check if accessible
        const savedSheetId = localStorage.getItem('jithin_portfolio_sheet_id');
        if (savedSheetId) {
          const hasAccess = await checkSpreadsheetAccess(savedSheetId, result.accessToken);
          if (hasAccess) {
            setSheetId(savedSheetId);
          } else {
            localStorage.removeItem('jithin_portfolio_sheet_id');
            setSheetId(null);
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Google Auth login failed.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleCreateSheet = async () => {
    if (!token) return;
    setIsLinkingSheet(true);
    setAuthError(null);
    try {
      const newSheetId = await createSpreadsheet(token);
      setSheetId(newSheetId);
      localStorage.setItem('jithin_portfolio_sheet_id', newSheetId);
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Failed to create Google Spreadsheet. Try again.');
    } finally {
      setIsLinkingSheet(false);
    }
  };

  const handleDisconnectSheet = () => {
    const confirmDisconnect = window.confirm('Are you sure you want to decouple this Google Sheet? Inquiries will remain stored locally in your portfolio registry.');
    if (confirmDisconnect) {
      setSheetId(null);
      localStorage.removeItem('jithin_portfolio_sheet_id');
    }
  };

  const handleSyncPending = async () => {
    if (!sheetId || !token) return;
    setIsSyncingAll(true);
    setAuthError(null);
    try {
      const updatedMessages = [...messages];
      let syncedCount = 0;
      
      for (let i = 0; i < updatedMessages.length; i++) {
        const msg = updatedMessages[i];
        if (!msg.syncedToSheets) {
          await appendRowData(sheetId, token, 'Sheet1!A:E', [
            new Date().toISOString(),
            msg.name,
            msg.email,
            msg.subject || 'Project Consultation',
            msg.message
          ]);
          updatedMessages[i] = {
            ...msg,
            syncedToSheets: true
          };
          syncedCount++;
        }
      }
      
      setMessages(updatedMessages);
      localStorage.setItem('jithin_portfolio_messages', JSON.stringify(updatedMessages));
      if (syncedCount > 0) {
        alert(`Successfully synchronized ${syncedCount} inquiries to your Google Sheet!`);
      } else {
        alert('All local inquiries are already synchronized.');
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Synchronization batch failed.');
    } finally {
      setIsSyncingAll(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setAuthError(null);

    let isSyncedNow = false;

    // Real-time direct synchronization to connected Google Sheet
    if (sheetId && token) {
      try {
        await appendRowData(sheetId, token, 'Sheet1!A:E', [
          new Date().toISOString(),
          formData.name,
          formData.email,
          formData.subject,
          formData.message
        ]);
        isSyncedNow = true;
      } catch (err) {
        console.error('Failed to append to Google Sheets in real-time:', err);
        // We do not block local submission if Sheets fails, we save locally so they can sync later!
      }
    }

    // Simulate database write delay
    setTimeout(() => {
      const newMessage: Message = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        date: new Date().toISOString().split('T')[0],
        subject: formData.subject,
        syncedToSheets: isSyncedNow
      };

      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      localStorage.setItem('jithin_portfolio_messages', JSON.stringify(updatedMessages));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Project Consultation',
        message: ''
      });

      // Clear successful banners after short span
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1200);
  };

  const handleClearSandboxMessages = () => {
    if (window.confirm('Wipe all local inbox logs? This is irreversible.')) {
      localStorage.removeItem('jithin_portfolio_messages');
      setMessages([]);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-stone-50 border-b border-neutral-200/60 booklet-grain relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Page Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-blue">PAGE 07</span>
          <span className="h-[1px] w-8 bg-neutral-300"></span>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">CONNECT WITH JITHIN</span>
        </div>

        {/* Section Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-neutral-900 leading-tight tracking-tight">
              Start a Conversation
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-neutral-500 text-sm md:text-base leading-relaxed">
              Based in Kasaragod, Kerala, working globally. Use the registry form below or tap direct socials channels to initiate design consultations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Direct Contacts & Social Directory */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-display font-bold text-xl text-neutral-900 mb-6">
                Direct Channels
              </h3>
              
              <div className="space-y-4">
                {/* Email Channel */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 p-3 rounded-xl border border-stone-100 hover:border-neutral-900 hover:bg-neutral-50/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-accent-blue flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block font-bold">EMAIL ADDRESS</span>
                    <span className="text-sm font-medium text-neutral-800 break-all group-hover:text-accent-blue transition-colors">{contactInfo.email}</span>
                  </div>
                </a>

                {/* LinkedIn Channel */}
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl border border-stone-100 hover:border-neutral-900 hover:bg-neutral-50/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-accent-blue flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block font-bold">PROFESSIONAL NETWORKS</span>
                    <span className="text-sm font-medium text-neutral-800 group-hover:text-accent-blue transition-colors flex items-center gap-1">
                      LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>

                {/* GitHub Channel */}
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl border border-stone-100 hover:border-neutral-900 hover:bg-neutral-50/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-accent-blue flex items-center justify-center shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block font-bold">CODE AND BLUEPRINTS</span>
                    <span className="text-sm font-medium text-neutral-800 group-hover:text-accent-blue transition-colors flex items-center gap-1">
                      GitHub Workspace <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>

              </div>
            </div>

            {/* Address booklet card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 flex items-start gap-4">
              <MapPin className="w-7 h-7 text-accent-blue shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display font-bold text-neutral-900 text-sm">COORDINATES LOCATION</h4>
                <p className="font-sans text-neutral-600 text-xs mt-1 leading-relaxed">
                  Jithin Rajan lives in <strong className="text-neutral-900 font-semibold">Kasaragod, Kerala, India</strong>. Highly available for remote collaborative assignments, site-directed consultancies and physical creative forums.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Visitor Consultation Form & Live messages list */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-display font-semibold text-xl text-neutral-900 mb-6 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-accent-blue" />
                Submit Consultation Request
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="font-mono text-[10px] text-stone-500 uppercase tracking-widest font-bold">NAME / IDENTITY</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Anand"
                      className="w-full bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 px-4 py-2.5 rounded-xl text-base md:text-sm font-sans transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="font-mono text-[10px] text-stone-500 uppercase tracking-widest font-bold">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. anand@studio.in"
                      className="w-full bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 px-4 py-2.5 rounded-xl text-base md:text-sm font-sans transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="font-mono text-[10px] text-stone-500 uppercase tracking-widest font-bold">SUBJECT MATTER</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 px-4 py-2.5 rounded-xl text-base md:text-sm font-sans transition-all outline-none text-neutral-700"
                  >
                    <option value="Project Consultation">Figma Design Project Consultation</option>
                    <option value="Freelance Contract">Freelance Contract / Team Addition</option>
                    <option value="General Query">General Design Inquiry</option>
                    <option value="Feedback">Feedback on Case Studies booklet</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="font-mono text-[10px] text-stone-500 uppercase tracking-widest font-bold">MESSAGE RECORD</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write details of your layout needs or interface problems..."
                    className="w-full bg-neutral-50 focus:bg-white border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 px-4 py-2.5 rounded-xl text-base md:text-sm font-sans transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-blue text-white hover:bg-accent-blue-hover text-sm font-mono tracking-wide px-6 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50 transition-all font-bold hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    'RECORDING TO INBOX...'
                  ) : (
                    <>
                      RECORD INBOX ENTRY
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-emerald-50 border border-emerald-200 px-4 py-3.5 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5 mt-4"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Inbox entry recorded successfully!</strong>
                        {sheetId ? (
                          <p className="mt-0.5 opacity-90">Thank you! Your query has been recorded locally and synchronized directly to your connected Google Sheet in real-time.</p>
                        ) : (
                          <p className="mt-0.5 opacity-90">Thank you for submitting. The query has been processed and saved locally. You can see it listed in Jithin's Sandbox Inbox, and sync it to Google Sheets anytime by logging in below.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Google Sheets Synchronization Hub Card */}
            <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-6 space-y-4 hover:border-accent-blue transition-colors">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-neutral-900 text-base leading-tight">
                      Google Sheets Integration Portal
                    </h3>
                    <p className="text-xs text-neutral-500 font-sans mt-0.5">
                      Transmit and synchronize inquiry registries to Google Sheets automatically
                    </p>
                  </div>
                </div>
                {user ? (
                  <span className="font-mono text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Connected
                  </span>
                ) : (
                  <span className="font-mono text-[9px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 font-semibold">
                    <Lock className="w-2.5 h-2.5" /> Offline
                  </span>
                )}
              </div>

              {authError && (
                <div className="bg-red-50 border border-red-100 text-red-800 text-xs px-3 py-2.5 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="leading-normal">{authError}</span>
                </div>
              )}

              {!user ? (
                <div className="flex flex-col items-center justify-center py-4 bg-neutral-50 border border-stone-100 rounded-xl px-4 text-center space-y-4">
                  <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
                    Log in with your Google Account to authorize spreadsheet initialization and enable automated inbox updates.
                  </p>
                  
                  {/* Styled GSI button */}
                  <button
                    onClick={handleLogin}
                    disabled={isSigningIn}
                    className="flex items-center justify-center gap-2.5 bg-white border border-neutral-300 rounded-xl px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer shadow-sm active:bg-neutral-100 transition-all font-sans disabled:opacity-50"
                  >
                    {isSigningIn ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-accent-blue" />
                    ) : (
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4.5 h-4.5 shrink-0">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    )}
                    Sign in with Google
                  </button>
                </div>
              ) : (
                <div className="space-y-4 font-sans">
                  {/* Account detail row */}
                  <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <div className="flex items-center gap-2.5">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-stone-200" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-accent-blue flex items-center justify-center font-bold text-sm">
                          {user.displayName?.[0] || 'U'}
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-semibold text-neutral-800">{user.displayName || 'Portfolio Administrator'}</div>
                        <div className="text-[10px] text-neutral-500 font-mono truncate">{user.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-neutral-500 hover:text-red-600 transition-colors cursor-pointer p-1.5 hover:bg-neutral-100 rounded-lg"
                      title="Deauthorize Google Account"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sheet details or Setup trigger */}
                  {!sheetId ? (
                    <div className="bg-stone-50 border border-stone-100 rounded-xl p-4 text-center space-y-3.5">
                      <p className="text-xs text-neutral-600">
                        Authorize spreadsheet initialization. We will automatically create a spreadsheet titled <strong className="text-neutral-900 font-medium">"Jithin Rajan Portfolio Inquiries"</strong> in your Google Drive.
                      </p>
                      <button
                        onClick={handleCreateSheet}
                        disabled={isLinkingSheet}
                        className="inline-flex items-center gap-2 bg-accent-blue hover:bg-accent-blue-hover text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isLinkingSheet ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Creating Spreadsheet...
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-3.5 h-3.5" />
                            Initialize Inquiries Google Sheet
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-2.5">
                          <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-neutral-900">Portfolio Inquiries Sheet</div>
                            <div className="text-[10px] text-emerald-700 font-mono select-all truncate max-w-[200px] sm:max-w-xs mt-0.5 border-b border-emerald-100">
                              ID: {sheetId}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleDisconnectSheet}
                          className="font-mono text-[9px] text-stone-400 hover:text-red-600 uppercase tracking-wider block font-bold transition-colors cursor-pointer"
                        >
                          Couple Off
                        </button>
                      </div>

                      {/* Spreadsheet action triggers */}
                      <div className="flex items-center gap-2 pt-1 flex-wrap font-sans">
                        <a
                          href={`https://docs.google.com/spreadsheets/d/${sheetId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 text-neutral-700 border border-stone-200 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors text-decoration-none"
                        >
                          View Sheet <ExternalLink className="w-3 h-3" />
                        </a>

                        {messages.some(m => !m.syncedToSheets) && (
                          <button
                            onClick={handleSyncPending}
                            disabled={isSyncingAll}
                            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer disabled:opacity-50 font-bold"
                          >
                            {isSyncingAll ? (
                              <>
                                <RefreshCw className="w-3" /> Syncing...
                              </>
                            ) : (
                              <>
                                <RefreshCw className="w-3 h-3" /> Sync Pending ({messages.filter(m => !m.syncedToSheets).length})
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sandbox Inbox list - beautiful realistic sandbox detail */}
            <div className="bg-neutral-900 border border-neutral-800 text-stone-100 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none">
                <Inbox className="w-40 h-40" />
              </div>

              <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shrink-0"></div>
                  <h4 className="font-mono text-xs font-bold uppercase text-neutral-300 tracking-wider">
                    Jithin's Portal Sandbox Inbox ({messages.length})
                  </h4>
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={handleClearSandboxMessages}
                    className="font-mono text-[9px] hover:text-white bg-neutral-800 hover:bg-neutral-700 px-2.5 py-1 rounded-md text-neutral-400 transition-all cursor-pointer"
                  >
                    WIPE MESSAGES
                  </button>
                )}
              </div>

              <AnimatePresence mode="popLayout">
                {messages.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-neutral-500 font-mono py-4 text-center"
                  >
                    No message logs in memory. Submit the form above to record elements.
                  </motion.p>
                ) : (
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1 relative z-10 scrollbar-thin scrollbar-thumb-neutral-800 font-sans">
                    {messages.map((msg, idx) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        key={idx}
                        className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2 flex flex-col justify-between"
                      >
                        <div className="flex items-baseline justify-between border-b border-neutral-900 pb-1.5 flex-wrap gap-2">
                          <span className="text-xs font-semibold text-white font-sans flex items-center gap-1.5 flex-wrap">
                            <User className="w-3 h-3 text-accent-blue" />
                            {msg.name}
                            
                            {/* Sync indicator badge inside messages list! */}
                            {msg.syncedToSheets ? (
                              <span className="inline-flex items-center gap-0.5 bg-emerald-900/40 text-emerald-400 border border-emerald-800/60 rounded px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest leading-none">
                                <Check className="w-2 h-2 text-emerald-400 stroke-[3]" /> Sheets Synced
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-0.5 bg-yellow-950/40 text-yellow-500 border border-yellow-800/40 rounded px-1.5 py-0.5 text-[8px] font-mono leading-none font-bold uppercase tracking-widest">
                                Local Only
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-[9px] text-neutral-500 flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" /> {msg.date}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed font-light italic font-sans pr-4 font-light">
                          "{msg.message}"
                        </p>
                        <div className="text-[9px] text-neutral-500 font-mono self-end truncate max-w-full">
                          RECEIVER_CHANNEL // {msg.email}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
