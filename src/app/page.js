import Image from 'next/image';
import Link from 'next/link';
import { Shield, Users, Clock, ArrowRight, Check, Star, Zap, Calendar as Cal } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Navigation */}
      <nav className="ios-nav px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Image
            src="/logos/spareTme-logo-horizontal-header.png"
            alt="SpareTime Logo"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-[#64748b] font-medium hover:text-[#2e95f3] transition-colors">
            Sign In
          </Link>
          <Link href="/signup" className="ios-btn-primary py-2 px-6 h-10 text-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#2e95f3] text-sm font-semibold mb-8 animate-float">
            <Star size={14} fill="currentColor" />
            <span>Reclaim your schedule today</span>
          </div>

          <h1 className="text-display mb-6 text-[#1a202c] leading-tight tracking-tight">
            Your Time, <span className="text-[#2e95f3]">Protected.</span><br />
            Your Life, <span className="text-[#2e95f3]">Balanced.</span>
          </h1>

          <p className="text-xl text-[#64748b] mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            The modern calendar that helps you set boundaries, block distractions,
            and share your availability without overbooking yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="ios-btn-primary w-full sm:w-auto text-lg px-8 py-4">
              Start for Free <ArrowRight size={20} />
            </Link>
            <Link href="/login" className="ios-btn-secondary w-full sm:w-auto text-lg px-8 py-4">
              View Demo
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-[#10b981]" /> No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-[#10b981]" /> 14-day free trial
            </div>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-[#f8faff]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-title1 mb-4 text-[#1a202c]">Designed for Focus</h2>
            <p className="text-body max-w-xl mx-auto">
              Everything you need to manage your time effectively, wrapped in a beautiful, distraction-free interface.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="ios-card ios-card-hover">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2e95f3] mb-6">
                <Shield size={28} strokeWidth={2} />
              </div>
              <h3 className="text-title3 mb-3 text-[#1a202c]">Protected Time</h3>
              <p className="text-body leading-relaxed">
                Automatically block out time for deep work, family, or rest. Never get booked during your sacred hours again.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="ios-card ios-card-hover">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6">
                <Users size={28} strokeWidth={2} />
              </div>
              <h3 className="text-title3 mb-3 text-[#1a202c]">Smart Availability</h3>
              <p className="text-body leading-relaxed">
                Share custom booking links that respect your boundaries. Different links for work, friends, and family.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="ios-card ios-card-hover">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                <Zap size={28} strokeWidth={2} />
              </div>
              <h3 className="text-title3 mb-3 text-[#1a202c]">Instant Sync</h3>
              <p className="text-body leading-relaxed">
                Works seamlessly with Google Calendar, Outlook, and Apple Calendar. All your events in one beautiful view.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-[#2e95f3] rounded-[32px] p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="text-title1 mb-6 font-bold">Ready to take back your time?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have switched to SpareTime for a calmer, more organized life.
            </p>
            <Link href="/signup" className="inline-flex items-center justify-center bg-white text-[#2e95f3] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
              Get Started for Free
            </Link>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f8faff] py-16 px-6 border-t border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2e95f3] rounded-lg flex items-center justify-center text-white">
              <Cal size={18} />
            </div>
            <span className="font-bold text-lg text-[#1a202c]">SpareTime</span>
          </div>

          <div className="flex gap-8 text-sm font-medium text-[#64748b]">
            <Link href="/privacy" className="hover:text-[#2e95f3] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#2e95f3] transition-colors">Terms</Link>
            <Link href="/support" className="hover:text-[#2e95f3] transition-colors">Support</Link>
          </div>

          <div className="text-sm text-[#94a3b8]">
            © 2025 SpareTime Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
