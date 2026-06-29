import React from 'react';
import { CheckCircle } from 'lucide-react';
import { RoutePath } from '../types';
import IndustryHealthcare from './IndustryHealthcare';
import IndustryEducation from './IndustryEducation';
import IndustryRealEstate from './IndustryRealEstate';
import IndustryManufacturing from './IndustryManufacturing';
import IndustryRetailEcommerce from './IndustryRetailEcommerce';
import IndustryProfessionalServices from './IndustryProfessionalServices';

interface IndustriesProps {
  subPath: string;
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Industries({ subPath, setPath, darkMode }: IndustriesProps) {
  if (subPath === 'healthcare') {
    return <IndustryHealthcare setPath={setPath} darkMode={darkMode} />;
  }
  
  if (subPath === 'education') {
    return <IndustryEducation setPath={setPath} darkMode={darkMode} />;
  }

  if (subPath === 'real-estate') {
    return <IndustryRealEstate setPath={setPath} darkMode={darkMode} />;
  }

  if (subPath === 'manufacturing') {
    return <IndustryManufacturing setPath={setPath} darkMode={darkMode} />;
  }

  if (subPath === 'retail' || subPath === 'retail-ecommerce') {
    return <IndustryRetailEcommerce setPath={setPath} darkMode={darkMode} />;
  }

  if (subPath === 'professional-services') {
    return <IndustryProfessionalServices setPath={setPath} darkMode={darkMode} />;
  }

  // Industries specs data
  const industryData: Record<string, {
    name: string;
    tagline: string;
    painPoints: string[];
    solutions: string[];
    results: string[];
    workflow: string[];
  }> = {
    'healthcare': {
      name: 'Healthcare Industry',
      tagline: 'Secure, HIPAA-Compliant Patient Intake & Scheduling',
      painPoints: [
        'High inbound appointment call load causing 3-day booking delays.',
        'Siloed staff records and manually typed clinic followups.',
        'High patient no-show rates for scheduled dental or clinical sessions.'
      ],
      solutions: [
        'WhatsApp patient intake chatbots linked with local EHR directories.',
        '24/7 autonomous nurse assistant to answer FAQ questions.',
        'Automated appointment text & voice reminders, reducing no-shows by 85%.'
      ],
      results: [
        'Booking time down from 45 mins to 6 mins.',
        '94% Patient Satisfaction rate.',
        'Saved over $8,500/mo in receptionist hours.'
      ],
      workflow: ['Patient Inquiry', 'AI Intake Triage', 'EHR Directory Log', 'WhatsApp Reminder', 'Site Visit Secured']
    },
    'education': {
      name: 'Education & EdTech',
      tagline: 'Instant Student Counseling & Programmatic Enrollment',
      painPoints: [
        'timezone lags causing abandoned student enrollment forms.',
        'Staff spending hours answering repetitive course syllabus questions.',
        'Low lead conversion rates on paid social brochure downloads.'
      ],
      solutions: [
        'Immediate AI counselor reply delivering pdf course structures on WhatsApp.',
        'Autonomous outbound voice agents calling back students within 45 seconds.',
        'Unified lead scoring to route hot corporate enrollments to native directors.'
      ],
      results: [
        '2.4x student enrollment rate.',
        'Zero night-time inquiries abandoned.',
        'Saved 120+ staff hours/week on brochure mailing.'
      ],
      workflow: ['Meta Brochure Download', 'AI WhatsApp Counselor', 'Outbound pre-qualification', 'Calendar Booking', 'Enrollment Done']
    },
    'real-estate': {
      name: 'Real Estate Segment',
      tagline: 'Pre-Qualified Voice Bot Site Tours & CRM Syncing',
      painPoints: [
        'Brokers waste 4 hours/day chasing unqualified buyer leads.',
        'Lost property inquiry spreadsheets across multiple listing portals.',
        'Low scheduling rate on site physical model viewings.'
      ],
      solutions: [
        'Integrated voice calling agent to dial leads under 45 seconds.',
        'Checks pre-approved loan status and buyer timeline parameters.',
        'Instantly schedules physical site visit, notifying local brokers via SMS.'
      ],
      results: [
        '72% booking rate on physical site visits.',
        'Realtor productivity boosted by 400%.',
        '3.4x average closed commission.'
      ],
      workflow: ['Portal Lead Captured', 'Voice Bot Call (Loan check)', 'Catalog SMS Send', 'Site Tour Scheduled', 'Deal Won']
    },
    'manufacturing': {
      name: 'Manufacturing & Supply Chain',
      tagline: 'Low-Stock Automated Ordering & Dispatch Logs',
      painPoints: [
        'Manual inventory paper logs causing dispatch raw material delays.',
        'Slow quoting cycles with global material suppliers.',
        'Siloed department pipelines causing admin overhead.'
      ],
      solutions: [
        'IoT inventory sensors triggering n8n autonomous quotation nodes.',
        'AI agents reading price catalogs, matching best quotes.',
        'Generates automated purchase orders, logging dispatch receipts.'
      ],
      results: [
        'Zero raw material dispatch delays.',
        'Saved 40 hours/week in manual procurement administration.',
        'Pruned overhead costs by 18%.'
      ],
      workflow: ['Low-Stock Alert', 'AI Supplier Quoting', 'Optimal Quote Selection', 'PO Generation', 'Dispatch Receipt Log']
    },
    'retail': {
      name: 'Retail & E-commerce',
      tagline: 'Cart Recovery Automation & Personalized Promo Agents',
      painPoints: [
        'High shopping cart abandonment rates (78% industry average).',
        'Manual email newsletters getting lost in customer spam folders.',
        'Support tickets overloading staff with simple shipping questions.'
      ],
      solutions: [
        'WhatsApp cart recovery loops sending personalized 10% coupon codes.',
        'Interactive support chatbot checking package tracking via API.',
        'RCS interactive product catalogs driven by purchase history.'
      ],
      results: [
        '18% abandoned cart recovery rate.',
        '70% reduction in simple support tickets.',
        '3.2x higher promotional click-throughs.'
      ],
      workflow: ['Cart Abandoned', 'WhatsApp Coupon Trigger', 'Shipping API Lookup', 'Interactive Catalog', 'Checkout Completed']
    },
    'professional-services': {
      name: 'Professional Services',
      tagline: 'Instant Quotation Proposals & Smart Onboarding',
      painPoints: [
        'Quoting lags of up to 24 hours causing clients to hire competitors.',
        'Hours spent chasing manual contract signatures and invoice payments.',
        'Inconsistent client onboarding checklists causing service lag.'
      ],
      solutions: [
        'Interactive proposal tool dynamically generating quotes instantly.',
        'Automated Stripe billing and digital contract signing links.',
        'n8n onboarding checklist dispatcher syncing work tools on payment.'
      ],
      results: [
        '3x higher proposal close rate.',
        '92% faster contract turnaround times.',
        'Zero invoice follow-up admin hours.'
      ],
      workflow: ['Proposal Request', 'Instant Proposal Sent', 'Stripe Payment Done', 'Contract Sign Log', 'Onboard Flow Fired']
    }
  };

  const currentInd = industryData[subPath] || industryData['healthcare'];

  return (
    <div className="py-12 animate-fade-in font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs font-mono text-gray-500">
          <button onClick={() => setPath('home')} className="hover:text-primary">Home</button> / <span className="text-primary">Industries</span> / <span>{currentInd.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">Sector Optimization Blueprint</span>
            <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight leading-tight">{currentInd.name} Blueprint</h1>
            <p className="text-sm font-semibold text-primary font-display">{currentInd.tagline}</p>
            
            {/* Pain points */}
            <div>
              <span className="text-[10px] font-mono text-rose-500 uppercase block mb-2">Primary Pain Points (Unoptimized)</span>
              <ul className="space-y-2">
                {currentInd.painPoints.map((pain, i) => (
                  <li key={i} className="text-xs flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">•</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Natton Solutions */}
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-2">Automated Target Solutions</span>
              <ul className="space-y-2">
                {currentInd.solutions.map((sol, i) => (
                  <li key={i} className="text-xs flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results Panel */}
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
            <span className="text-[10px] font-mono text-[#00C2FF] uppercase tracking-widest block mb-4">Verifiable Operational Outcomes</span>
            <div className="space-y-4">
              {currentInd.results.map((res, i) => (
                <div key={i} className={`p-3.5 rounded-xl border ${darkMode ? 'bg-black/30 border-white/[0.04]' : 'bg-gray-50 border-gray-100'}`}>
                  <p className="text-xs font-bold text-primary">{res.split(' ')[0] + ' ' + res.split(' ')[1]}</p>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>{res}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Operational Flowchart diagram */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-8 text-center">Optimized Operational Node Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="hidden md:block absolute top-[40%] left-[5%] right-[5%] h-0.5 border-t border-dashed border-primary/25 z-0" />
            {currentInd.workflow.map((step, idx) => (
              <div key={idx} className={`p-4 rounded-xl border text-center relative z-10 ${
                idx === 4 
                  ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                  : (darkMode ? 'bg-dark border-white/10' : 'bg-white border-gray-200 shadow-xs')
              }`}>
                <span className="text-[9px] font-mono text-gray-500 block">NODE 0{idx + 1}</span>
                <p className="text-xs font-bold mt-2 font-display">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action form */}
        <div className={`p-6 sm:p-10 rounded-2xl border max-w-xl mx-auto text-center ${darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
          <h3 className="text-base font-bold font-display mb-2">Deploy the {currentInd.name} Blueprint</h3>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>Our technicians specialize in customized sector mappings. Set up your pipeline in under 7 days.</p>
          <button onClick={() => setPath('contact')} className="py-2.5 px-6 rounded-lg bg-primary text-white font-semibold text-xs glow-primary hover:bg-opacity-95 transition-all">
            Schedule Integration Discovery Call
          </button>
        </div>
      </div>
    </div>
  );
}
